import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import type { Plugin } from "vite";
import { ROUTES, type RouteEntry } from "./src/routes";

const rawPort = process.env.PORT ?? "5173";
const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH ?? "/";

// ── Prerender plugin ──────────────────────────────────────────────────────────
// Runs after `vite build` (closeBundle hook). For every route in the canonical
// route inventory, writes dist/public/<route>/index.html with:
//   • Route-specific <title>, meta description, robots, canonical, OG, Twitter
//   • <noscript> block providing visible page text for non-JS crawlers
//
// The static hosting catch-all (/* → /index.html) means generated files are
// served as exact matches before the fallback fires.

function escHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

function patchHtml(template: string, route: RouteEntry): string {
  const robots = route.noindex ? "noindex, follow" : "index, follow";

  let html = template
    // <title>
    .replace(/<title>[^<]*<\/title>/, `<title>${escHtml(route.title)}</title>`)
    // meta description
    .replace(
      /(<meta name="description" content=")[^"]*(")/,
      `$1${escHtml(route.description)}$2`,
    )
    // meta robots
    .replace(/(<meta name="robots" content=")[^"]*(")/,  `$1${robots}$2`)
    // og:url
    .replace(
      /(<meta property="og:url" content=")[^"]*(")/,
      `$1${escHtml(route.canonical)}$2`,
    )
    // og:title
    .replace(
      /(<meta property="og:title" content=")[^"]*(")/,
      `$1${escHtml(route.title)}$2`,
    )
    // og:description
    .replace(
      /(<meta property="og:description" content=")[^"]*(")/,
      `$1${escHtml(route.description)}$2`,
    )
    // twitter:title
    .replace(
      /(<meta name="twitter:title" content=")[^"]*(")/,
      `$1${escHtml(route.title)}$2`,
    )
    // twitter:description
    .replace(
      /(<meta name="twitter:description" content=")[^"]*(")/,
      `$1${escHtml(route.description)}$2`,
    );

  // Inject <link rel="canonical"> before </head>
  if (route.canonical) {
    html = html.replace(
      "</head>",
      `  <link rel="canonical" href="${escHtml(route.canonical)}" />\n  </head>`,
    );
  }

  // Hide the static skeleton until React mounts to prevent FOUC.
  // The [data-static="1"] div has no component class names so it renders as
  // browser-default unstyled text. Hiding it produces a brief cream-background
  // blank state (< ~100 ms) while React hydrates, which is far less jarring
  // than raw unstyled content flashing in. The <noscript> variant (injected
  // below) restores display for JS-disabled visitors and crawlers.
  html = html.replace(
    "</head>",
    `  <style>[data-static="1"]{display:none}</style>\n  </head>`,
  );

  // Inject meaningful visible content into #root for non-JS crawlers.
  // React's createRoot() replaces this content on mount — no hydration mismatch.
  // Only injected for indexable routes that carry a summary; noindex/archive
  // routes get the noscript fallback only.
  if (route.summary && !route.noindex) {
    // Inject a static content skeleton into #root for non-JS crawlers and
    // machine readers. Includes navigation, H1, summary, footer, and the
    // content review date. React's createRoot() replaces this on mount.
    // This is deterministic HTML injection, not React SSR.
    const navHtml = `<nav aria-label="Site navigation"><a href="/">Overview</a> · <a href="/events">Events</a> · <a href="/about">About</a> · <a href="/work">Work</a> · <a href="/manifesto">Manifesto</a> · <a href="/get-involved">Get Involved</a> · <a href="mailto:team@playa-ai.org">Contact</a></nav>`;
    const footerHtml = `<footer><p>© 2026 Playa AI · Part of Mystic Arts Foundation’s California 501(c)(3)</p><p>Website content reviewed 2 August 2026.</p></footer>`;
    const summaryHtml = `<div data-static="1">${navHtml}<main id="main-content"><h1>${escHtml(route.title)}</h1><p>${escHtml(route.description)}</p><p>${escHtml(route.summary)}</p></main>${footerHtml}</div>`;
    html = html.replace(
      '<div id="root"></div>',
      `<div id="root">${summaryHtml}</div>`,
    );
  }

  // Inject <noscript> — provides fallback when JS is entirely disabled.
  // For indexable routes the [data-static="1"] div (injected above) already
  // contains the full H1 + summary. The noscript only needs to un-hide that
  // div — re-emitting the content would produce a second H1 in raw HTML.
  // For noindex/archive routes no [data-static="1"] was injected, so noscript
  // must carry the fallback content directly.
  if (route.summary && !route.noindex) {
    // Reveal the existing [data-static="1"] div — no duplicate content.
    html = html.replace(
      "</body>",
      `  <noscript><style>[data-static="1"]{display:block}</style></noscript>\n</body>`,
    );
  } else {
    // No static div exists for this route; noscript carries the only fallback.
    const noscriptBody = `<h1>${escHtml(route.title)}</h1><p>${escHtml(route.description)}</p>`;
    html = html.replace(
      "</body>",
      `  <noscript>${noscriptBody}</noscript>\n</body>`,
    );
  }

  return html;
}

function prerenderPlugin(): Plugin {
  return {
    name: "playa-ai-prerender",
    apply: "build",
    closeBundle() {
      const distDir = path.resolve(import.meta.dirname, "dist", "public");
      let template: string;
      try {
        template = readFileSync(join(distDir, "index.html"), "utf-8");
      } catch {
        console.warn("prerender: dist/public/index.html not found — skipping");
        return;
      }

      let count = 0;
      for (const route of ROUTES) {
        const html = patchHtml(template, route);
        // Split path into segments, skip empty strings from leading slash
        const segments = route.path.split("/").filter(Boolean);
        const routeDir =
          segments.length === 0 ? distDir : join(distDir, ...segments);
        mkdirSync(routeDir, { recursive: true });
        writeFileSync(join(routeDir, "index.html"), html, "utf-8");
        count++;
      }

      console.log(`\n✓ Prerendered ${count} routes`);

      // ── Generate dist/public/404.html ──────────────────────────────────
      // The production HTTP server (server.js) serves this document with
      // HTTP 404 for every unknown route. It must have:
      //   • noindex, nofollow (stricter than the noindex, follow archive pages)
      //   • no <link rel="canonical"> tag
      //   • the branded Playa AI page title and description
      // patchHtml normally emits "noindex, follow" for noindex routes, so we
      // post-process the string to tighten it to "noindex, nofollow".
      const notFoundRoute: RouteEntry = {
        path:        "/404",
        title:       "Page Not Found — Playa AI",
        description: "The page you requested could not be found. Return to the Playa AI homepage.",
        canonical:   "",   // patchHtml omits <link rel="canonical"> for empty canonical
        noindex:     true,
      };
      let notFoundHtml = patchHtml(template, notFoundRoute);
      // Upgrade noindex, follow → noindex, nofollow for the 404 document
      notFoundHtml = notFoundHtml.replace(
        /content="noindex,\s*follow"/g,
        'content="noindex, nofollow"',
      );
      writeFileSync(join(distDir, "404.html"), notFoundHtml, "utf-8");
      console.log(`✓ Generated 404.html`);
    },
  };
}

// ── Vite config ───────────────────────────────────────────────────────────────

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    runtimeErrorOverlay(),
    prerenderPlugin(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, ".."),
            }),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
      allow: [
        path.resolve(import.meta.dirname),
        path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
      ],
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
