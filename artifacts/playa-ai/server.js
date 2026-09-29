#!/usr/bin/env node
/**
 * Playa AI production server
 *
 * Serves the prebuilt static output from dist/public/ with semantically
 * correct HTTP statuses. Intended for use after `pnpm run build`.
 *
 * Route semantics:
 *   Known prerendered paths        → HTTP 200
 *   /privacy and /privacy/         → HTTP 308 → /living-trust-framework
 *   Unknown paths                  → HTTP 404 + branded 404.html
 *   /assets/** (hashed filenames)  → HTTP 200 + immutable cache
 *   sitemap.xml, robots.txt, llms.txt → HTTP 200 + short-lived cache
 *
 * Binds to 0.0.0.0:$PORT (defaults to 5173 if PORT is unset).
 * Supports GET and HEAD only. Path-traversal protected.
 * Logs "METHOD /path → STATUS" to stdout; never logs form data.
 */

import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST      = path.resolve(__dirname, "dist", "public");
const PORT      = parseInt(process.env.PORT ?? "5173", 10);

if (!fs.existsSync(DIST)) {
  console.error(
    `[server] dist/public not found at ${DIST}.\n` +
    `Run "pnpm run build" inside artifacts/playa-ai before starting the server.`
  );
  process.exit(1);
}

// ── MIME types ────────────────────────────────────────────────────────────────
const MIME_TYPES = {
  ".html":  "text/html; charset=utf-8",
  ".css":   "text/css; charset=utf-8",
  ".js":    "text/javascript; charset=utf-8",
  ".mjs":   "text/javascript; charset=utf-8",
  ".json":  "application/json; charset=utf-8",
  ".xml":   "application/xml; charset=utf-8",
  ".txt":   "text/plain; charset=utf-8",
  ".svg":   "image/svg+xml",
  ".png":   "image/png",
  ".jpg":   "image/jpeg",
  ".jpeg":  "image/jpeg",
  ".webp":  "image/webp",
  ".ico":   "image/x-icon",
  ".woff":  "font/woff",
  ".woff2": "font/woff2",
  ".ttf":   "font/ttf",
  ".otf":   "font/otf",
};

function getMime(filepath) {
  return MIME_TYPES[path.extname(filepath).toLowerCase()] ?? "application/octet-stream";
}

function readFileSafe(filepath) {
  try   { return fs.readFileSync(filepath); }
  catch { return null; }
}

// ── Cache policy ──────────────────────────────────────────────────────────────
function getCacheControl(filepath) {
  const rel = filepath.slice(DIST.length);
  // Hashed /assets/** filenames are content-addressed — cache forever.
  if (rel.startsWith("/assets/")) return "public, max-age=31536000, immutable";
  const ext = path.extname(filepath).toLowerCase();
  if (ext === ".html")              return "no-cache, no-store, must-revalidate";
  if (ext === ".xml" || ext === ".txt") return "public, max-age=300";
  return "public, max-age=600";
}

// ── Compression ───────────────────────────────────────────────────────────────
// Compressible MIME type prefixes / substrings.
const COMPRESSIBLE = /text\/|\/javascript|\/json|\/xml|\/svg\+xml|font\/(woff|woff2|ttf|otf)/;

/**
 * Synchronously compress `content` according to the request's Accept-Encoding.
 * Prefers Brotli (best ratio for static assets), falls back to gzip.
 * Returns { body: Buffer, encoding: string | null }.
 */
function compressContent(content, acceptEncoding) {
  if (/\bbr\b/.test(acceptEncoding)) {
    return { body: zlib.brotliCompressSync(content), encoding: "br" };
  }
  if (/\bgzip\b/.test(acceptEncoding)) {
    return { body: zlib.gzipSync(content),            encoding: "gzip" };
  }
  return { body: content, encoding: null };
}

// ── Response helpers ──────────────────────────────────────────────────────────
function sendFile(res, filepath, status, acceptEncoding = "") {
  const raw = readFileSafe(filepath);
  if (raw === null) { send404(res, acceptEncoding); return; }

  const mime = getMime(filepath);
  const shouldCompress = COMPRESSIBLE.test(mime);
  const { body, encoding } = shouldCompress && acceptEncoding
    ? compressContent(raw, acceptEncoding)
    : { body: raw, encoding: null };

  const headers = {
    "Content-Type":           mime,
    "Cache-Control":          getCacheControl(filepath),
    "Vary":                   "Accept-Encoding",
    "X-Content-Type-Options": "nosniff",
  };
  if (encoding) headers["Content-Encoding"] = encoding;

  res.writeHead(status, headers);
  res.end(body);
}

function send404(res, acceptEncoding = "") {
  const raw = readFileSafe(path.join(DIST, "404.html"))
    ?? Buffer.from("<!doctype html><title>404</title><p>Page not found.</p>");

  const { body, encoding } = acceptEncoding
    ? compressContent(raw, acceptEncoding)
    : { body: raw, encoding: null };

  const headers = {
    "Content-Type":           "text/html; charset=utf-8",
    "Cache-Control":          "no-cache, no-store, must-revalidate",
    "X-Robots-Tag":           "noindex, nofollow",
    "Vary":                   "Accept-Encoding",
    "X-Content-Type-Options": "nosniff",
  };
  if (encoding) headers["Content-Encoding"] = encoding;

  res.writeHead(404, headers);
  res.end(body);
}

// ── Request handler ───────────────────────────────────────────────────────────
const server = http.createServer((req, res) => {
  const method = (req.method ?? "GET").toUpperCase();
  const acceptEncoding = req.headers["accept-encoding"] ?? "";

  if (method !== "GET" && method !== "HEAD") {
    res.writeHead(405, { Allow: "GET, HEAD", "Content-Type": "text/plain" });
    res.end("Method Not Allowed");
    return;
  }

  // Parse pathname (strip query string and fragment)
  let pathname;
  try {
    pathname = new URL(req.url ?? "/", "http://x").pathname;
  } catch {
    pathname = "/";
  }

  // Normalise trailing slash (preserve root "/")
  if (pathname !== "/" && pathname.endsWith("/")) {
    pathname = pathname.slice(0, -1);
  }

  // Path-traversal guard: resolved path must stay inside DIST
  const resolved = path.resolve(DIST, "." + pathname);
  if (!resolved.startsWith(DIST)) {
    console.log(`${method} ${pathname} → 403`);
    res.writeHead(403, { "Content-Type": "text/plain" });
    res.end("Forbidden");
    return;
  }

  // ── 308 redirect for /privacy ─────────────────────────────────────────────
  const redirects = { "/privacy": "/living-trust-framework", "/events": "/convene", "/work": "/build" };
  if (Object.hasOwn(redirects, pathname)) {
    const dest = redirects[pathname] + new URL(req.url, "http://x").search;
    console.log(`${method} ${pathname} → 308 ${dest}`);
    res.writeHead(308, {
      Location:       dest,
      "Cache-Control": "public, max-age=86400",
    });
    res.end();
    return;
  }

  // ── Exact file match (/assets/index-abc.js, /sitemap.xml, /favicon.svg …) ──
  const directFile = path.join(DIST, pathname);
  let stat;
  try { stat = fs.statSync(directFile); } catch { stat = null; }

  if (stat?.isFile()) {
    console.log(`${method} ${pathname} → 200`);
    if (method === "HEAD") {
      res.writeHead(200, {
        "Content-Type":  getMime(directFile),
        "Cache-Control": getCacheControl(directFile),
        "Vary":          "Accept-Encoding",
      });
      res.end();
    } else {
      sendFile(res, directFile, 200, acceptEncoding);
    }
    return;
  }

  // ── Prerendered route HTML (/work → /work/index.html, / → /index.html) ─────
  const htmlFile = pathname === "/"
    ? path.join(DIST, "index.html")
    : path.join(DIST, pathname, "index.html");

  let htmlStat;
  try { htmlStat = fs.statSync(htmlFile); } catch { htmlStat = null; }

  if (htmlStat?.isFile()) {
    console.log(`${method} ${pathname} → 200`);
    if (method === "HEAD") {
      res.writeHead(200, {
        "Content-Type":  "text/html; charset=utf-8",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Vary":          "Accept-Encoding",
      });
      res.end();
    } else {
      sendFile(res, htmlFile, 200, acceptEncoding);
    }
    return;
  }

  // ── Unknown route → 404 ───────────────────────────────────────────────────
  console.log(`${method} ${pathname} → 404`);
  if (method === "HEAD") {
    res.writeHead(404, {
      "Content-Type":  "text/html; charset=utf-8",
      "X-Robots-Tag":  "noindex, nofollow",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "Vary":          "Accept-Encoding",
    });
    res.end();
  } else {
    send404(res, acceptEncoding);
  }
});

// ── Start ─────────────────────────────────────────────────────────────────────
server.listen(PORT, "0.0.0.0", () => {
  console.log(`[server] Playa AI production server listening on port ${PORT}`);
  console.log(`[server] Serving from ${DIST}`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("[server] SIGTERM received — shutting down");
  server.close(() => process.exit(0));
});
process.on("SIGINT", () => {
  console.log("[server] SIGINT received — shutting down");
  server.close(() => process.exit(0));
});
