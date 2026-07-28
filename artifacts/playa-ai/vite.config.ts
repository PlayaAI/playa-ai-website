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

  // Inject meaningful visible content into #root for non-JS crawlers.
  // React's createRoot() replaces this content on mount — no hydration mismatch.
  // Only injected for indexable routes that carry a summary; noindex/archive
  // routes get the noscript fallback only.
  if (route.summary && !route.noindex) {
    const summaryHtml = `<main data-ssr="1"><h1>${escHtml(route.title)}</h1><p>${escHtml(route.description)}</p><p>${escHtml(route.summary)}</p></main>`;
    html = html.replace(
      '<div id="root"></div>',
      `<div id="root">${summaryHtml}</div>`,
    );
  }

  // Inject <noscript> — provides fallback text when JS is entirely disabled.
  // Includes the summary for indexable routes to give non-JS crawlers more signal.
  const noscriptBody = route.summary && !route.noindex
    ? `<h1>${escHtml(route.title)}</h1><p>${escHtml(route.description)}</p><p>${escHtml(route.summary)}</p>`
    : `<h1>${escHtml(route.title)}</h1><p>${escHtml(route.description)}</p>`;
  html = html.replace(
    "</body>",
    `  <noscript>${noscriptBody}</noscript>\n</body>`,
  );

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
