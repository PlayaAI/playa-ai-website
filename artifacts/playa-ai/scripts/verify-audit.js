#!/usr/bin/env node
/**
 * verify-audit.js — structural audit verification for the Playa AI build output.
 *
 * Inspects dist/ to verify all July 2026 audit requirements are met:
 *   - Seven canonical prerendered routes exist with correct structure
 *   - All alias / archive routes redirect or exist
 *   - llms.txt present
 *   - robots.txt with Sitemap directive
 *   - sitemap.xml exists
 *   - No Gmail compose URLs in any HTML
 *   - OG meta tags present on all canonical pages
 *   - Each canonical page has a unique <title>
 *
 * Usage: pnpm run build && node scripts/verify-audit.js
 *        pnpm run verify:audit
 */
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const DIST = new URL("../dist/public", import.meta.url).pathname;

let passed = 0;
let failed = 0;

function check(label, condition, detail = "") {
  if (condition) {
    console.log(`  ✅  ${label}`);
    passed++;
  } else {
    console.error(`  ❌  ${label}${detail ? `\n       ${detail}` : ""}`);
    failed++;
  }
}

function readHtml(relPath) {
  const full = join(DIST, relPath);
  if (!existsSync(full)) return null;
  const s = statSync(full);
  if (s.isDirectory()) {
    const idx = join(full, "index.html");
    if (existsSync(idx)) return readFileSync(idx, "utf-8");
    return null;
  }
  return readFileSync(full, "utf-8");
}

// ── 1. dist/ exists ─────────────────────────────────────────────────────────
console.log("\n── 1. Build output ─────────────────────────────────────────────");
check("dist/ directory exists", existsSync(DIST), "Run `pnpm run build` first.");
if (!existsSync(DIST)) {
  console.error("\nCannot continue — dist/ not found.\n");
  process.exit(1);
}

// ── 2. Canonical prerendered routes ─────────────────────────────────────────
console.log("\n── 2. Canonical prerendered routes ─────────────────────────────");
const CANONICAL_ROUTES = [
  { path: "index.html", label: "/" },
  { path: "work/index.html", label: "/work" },
  { path: "events/index.html", label: "/events" },
  { path: "team/index.html", label: "/team" },
  { path: "manifesto/index.html", label: "/manifesto" },
  { path: "eelp/index.html", label: "/eelp" },
  { path: "living-trust-framework/index.html", label: "/living-trust-framework" },
];

const titles = new Set();
for (const route of CANONICAL_ROUTES) {
  const html = readHtml(route.path);
  check(`${route.label} — file exists`, html !== null);
  if (!html) continue;

  const hasTitle = /<title>[^<]+<\/title>/.test(html);
  check(`${route.label} — has <title>`, hasTitle);

  const titleMatch = html.match(/<title>([^<]+)<\/title>/);
  const titleText = titleMatch?.[1] ?? "";
  if (titleText) {
    check(`${route.label} — unique <title>`, !titles.has(titleText), `Duplicate title: "${titleText}"`);
    titles.add(titleText);
  }

  const hasDesc = /name="description"/.test(html) || /name='description'/.test(html);
  check(`${route.label} — has meta description`, hasDesc);

  const hasOgUrl = /property="og:url"/.test(html) || /property='og:url'/.test(html);
  check(`${route.label} — has og:url`, hasOgUrl);

  const hasOgTitle = /property="og:title"/.test(html) || /property='og:title'/.test(html);
  check(`${route.label} — has og:title`, hasOgTitle);

  const hasCanonical = /rel="canonical"/.test(html) || /rel='canonical'/.test(html);
  check(`${route.label} — has canonical link`, hasCanonical);

  const hasRoot = html.includes('id="root"');
  check(`${route.label} — has #root`, hasRoot);

  const bodyText = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
  const hasContent = bodyText.length > 500;
  check(`${route.label} — has meaningful SSR content (>500 chars)`, hasContent);
}

// ── 3. llms.txt ──────────────────────────────────────────────────────────────
console.log("\n── 3. llms.txt ──────────────────────────────────────────────────");
const llmsPath = join(DIST, "llms.txt");
check("llms.txt exists in dist/", existsSync(llmsPath));
if (existsSync(llmsPath)) {
  const llms = readFileSync(llmsPath, "utf-8");
  check("llms.txt — mentions participant distinction", llms.includes("80,000") && llms.includes("80+"));
  check("llms.txt — mentions California nonprofit", llms.includes("California nonprofit"));
  check("llms.txt — has content freshness note", llms.includes("reviewed July 2026"));
}

// ── 4. robots.txt ────────────────────────────────────────────────────────────
console.log("\n── 4. robots.txt ────────────────────────────────────────────────");
const robotsPath = join(DIST, "robots.txt");
check("robots.txt exists", existsSync(robotsPath));
if (existsSync(robotsPath)) {
  const robots = readFileSync(robotsPath, "utf-8");
  check("robots.txt — has Sitemap directive", robots.includes("Sitemap:"));
  check("robots.txt — has User-agent", robots.includes("User-agent:"));
}

// ── 5. sitemap.xml ───────────────────────────────────────────────────────────
console.log("\n── 5. sitemap.xml ───────────────────────────────────────────────");
const sitemapPath = join(DIST, "sitemap.xml");
check("sitemap.xml exists", existsSync(sitemapPath));
if (existsSync(sitemapPath)) {
  const sitemap = readFileSync(sitemapPath, "utf-8");
  check("sitemap.xml — has /work URL", sitemap.includes("/work"));
  check("sitemap.xml — has /events URL", sitemap.includes("/events"));
  check("sitemap.xml — has /manifesto URL", sitemap.includes("/manifesto"));
  check("sitemap.xml — has /eelp URL", sitemap.includes("/eelp"));
}

// ── 6. No Gmail compose URLs in HTML output ─────────────────────────────────
console.log("\n── 6. Gmail compose URLs ────────────────────────────────────────");
let gmailFound = false;
function scanDir(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) { scanDir(full); continue; }
    if (!entry.endsWith(".html") && !entry.endsWith(".js")) continue;
    const content = readFileSync(full, "utf-8");
    if (content.includes("mail.google.com") || content.includes("gmail.com/mail")) {
      console.error(`  ❌  Gmail compose URL found in: ${full.replace(DIST, "dist")}`);
      gmailFound = true;
      failed++;
    }
  }
}
scanDir(DIST);
if (!gmailFound) {
  console.log("  ✅  No Gmail compose URLs found in build output.");
  passed++;
}

// ── 7. Archive / alias routes ────────────────────────────────────────────────
console.log("\n── 7. Archive / alias routes ────────────────────────────────────");
const ARCHIVE_ROUTES = [
  "privacy-toolkit/index.html",
  "classic/index.html",
  "classic/work/index.html",
  "classic/events/index.html",
  "classic/team/index.html",
  "playa-ai-living-trust-framework/index.html",
];
for (const r of ARCHIVE_ROUTES) {
  const exists = existsSync(join(DIST, r));
  check(`${r} exists (archive/alias)`, exists);
}

// ── 8. Summary ───────────────────────────────────────────────────────────────
console.log(`\n${"─".repeat(64)}`);
console.log(`  Passed: ${passed}   Failed: ${failed}`);
if (failed > 0) {
  console.error(`\nverify:audit FAILED — ${failed} check(s) did not pass.\n`);
  process.exit(1);
} else {
  console.log(`\n✅  verify:audit passed — all ${passed} checks passed.\n`);
  process.exit(0);
}
