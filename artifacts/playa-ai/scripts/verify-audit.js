#!/usr/bin/env node
/**
 * verify-audit.js — structural audit verification for the Playa AI build output
 * and canonical source files.
 *
 * Checks build output (dist/) AND source files (src/) against July 2026 audit
 * acceptance criteria. These are implementation assertions — see the audit PDF
 * for the original 36-item requirement list.
 *
 * Usage: pnpm run build && node scripts/verify-audit.js
 *        pnpm run verify:audit
 */
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const DIST = new URL("../dist/public", import.meta.url).pathname;
const ROOT = new URL("..", import.meta.url).pathname;

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

function readSrc(relPath) {
  const full = join(ROOT, relPath);
  if (!existsSync(full)) return null;
  return readFileSync(full, "utf-8");
}

// ── 1. Build output exists ───────────────────────────────────────────────────
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
const allCanonicalHtml = {};
for (const route of CANONICAL_ROUTES) {
  const html = readHtml(route.path);
  allCanonicalHtml[route.label] = html;
  check(`${route.label} — file exists`, html !== null);
  if (!html) continue;

  const titleMatch = html.match(/<title>([^<]+)<\/title>/);
  const titleText = titleMatch?.[1] ?? "";
  check(`${route.label} — has <title>`, !!titleText);
  check(`${route.label} — unique <title>`, !titles.has(titleText), `Duplicate: "${titleText}"`);
  if (titleText) titles.add(titleText);

  check(`${route.label} — has meta description`, /name="description"/.test(html));
  check(`${route.label} — has og:url`, /property="og:url"/.test(html));
  check(`${route.label} — has og:title`, /property="og:title"/.test(html));
  check(`${route.label} — has canonical link`, /rel="canonical"/.test(html));
  check(`${route.label} — has #root`, html.includes('id="root"'));
  check(`${route.label} — has static H1`, /<h1>/.test(html), "Static content must include an H1 for non-JS crawlers.");
  check(`${route.label} — has 'Website content reviewed July 2026.'`, html.includes("Website content reviewed July 2026."));
  check(`${route.label} — has Mystic Arts Foundation wording`, html.includes("Mystic Arts Foundation"));
  check(`${route.label} — has navigation links`, html.includes('href="/work"') || html.includes('href="/"'));
  check(`${route.label} — meta not noindex`, /name="robots" content="index/.test(html));
}

// ── 3. llms.txt ──────────────────────────────────────────────────────────────
console.log("\n── 3. llms.txt ──────────────────────────────────────────────────");
const llmsPath = join(DIST, "llms.txt");
check("llms.txt exists in dist/", existsSync(llmsPath));
if (existsSync(llmsPath)) {
  const llms = readFileSync(llmsPath, "utf-8");
  check("llms.txt — has Burning Man vs. Playa AI distinction (80,000 vs 80+)",
    llms.includes("80,000") && llms.includes("80+"));
  check("llms.txt — uses approved org wording ('part of Mystic Arts Foundation')",
    llms.includes("part of Mystic Arts Foundation"));
  check("llms.txt — has content freshness note",
    llms.includes("reviewed July 2026"));
  check("llms.txt — mentions human-centered AI initiative (not 'philanthropic')",
    llms.includes("human-centered AI initiative") && !llms.includes("philanthropic initiative"));
}

// ── 4. robots.txt ────────────────────────────────────────────────────────────
console.log("\n── 4. robots.txt ────────────────────────────────────────────────");
const robotsPath = join(DIST, "robots.txt");
check("robots.txt exists", existsSync(robotsPath));
if (existsSync(robotsPath)) {
  const robots = readFileSync(robotsPath, "utf-8");
  check("robots.txt — has Sitemap directive", robots.includes("Sitemap:"));
  check("robots.txt — Sitemap points to playa-ai.org",
    robots.includes("https://playa-ai.org/sitemap.xml"));
  check("robots.txt — has User-agent", robots.includes("User-agent:"));
}

// ── 5. sitemap.xml ───────────────────────────────────────────────────────────
console.log("\n── 5. sitemap.xml ───────────────────────────────────────────────");
const sitemapPath = join(DIST, "sitemap.xml");
check("sitemap.xml exists", existsSync(sitemapPath));
if (existsSync(sitemapPath)) {
  const sitemap = readFileSync(sitemapPath, "utf-8");
  const expectedRoutes = ["/", "/work", "/events", "/team", "/manifesto", "/eelp", "/living-trust-framework"];
  for (const r of expectedRoutes) {
    check(`sitemap.xml — contains ${r}`, sitemap.includes(`playa-ai.org${r}`));
  }
  // Archive routes must NOT be in the sitemap
  const archiveRoutes = ["/privacy-toolkit", "/classic", "/playa-ai-living-trust-framework"];
  for (const r of archiveRoutes) {
    check(`sitemap.xml — excludes archive route ${r}`, !sitemap.includes(r));
  }
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
  { path: "privacy-toolkit/index.html", label: "/privacy-toolkit" },
  { path: "classic/index.html", label: "/classic" },
  { path: "classic/work/index.html", label: "/classic/work" },
  { path: "classic/events/index.html", label: "/classic/events" },
  { path: "classic/team/index.html", label: "/classic/team" },
  { path: "playa-ai-living-trust-framework/index.html", label: "/playa-ai-living-trust-framework" },
];
for (const r of ARCHIVE_ROUTES) {
  const html = readHtml(r.path);
  check(`${r.label} — file exists`, html !== null);
  if (html) {
    check(`${r.label} — is noindex`, /name="robots" content="noindex/.test(html));
  }
}

// ── 8. Source-file content checks ────────────────────────────────────────────
console.log("\n── 8. Source-file content assertions ───────────────────────────");

// 8a. Homepage source claims
const homeSrc = readSrc("src/pages/Home.tsx");
if (homeSrc) {
  check("Home.tsx — 'Three of eight workstreams' present",
    homeSrc.includes("Three of eight workstreams"));
  check("Home.tsx — pledge subject is 'Playa%20AI%20Pledge%20Interest'",
    homeSrc.includes("Playa%20AI%20Pledge%20Interest"));
  check("Home.tsx — pledge button uses interest wording ('Express pledge interest')",
    homeSrc.includes("Express pledge interest"));
  check("Home.tsx — no 'Sign it as' (false pledge-signing wording)",
    !homeSrc.includes("Sign it as") && !homeSrc.includes("sign it as"));
  check("Home.tsx — 'human-centered AI initiative' present (not 'philanthropic initiative')",
    homeSrc.includes("human-centered AI initiative") && !homeSrc.includes("philanthropic initiative"));
  // INITIATIVES array count: exactly 3 items (01, 02, 03 inside INITIATIVES array)
  // We look for the section between 'const INITIATIVES' and the next 'const '
  const initiativesMatch = homeSrc.match(/const INITIATIVES[\s\S]*?(?=\nconst [A-Z])/);
  const initiativesBlock = initiativesMatch ? initiativesMatch[0] : "";
  const initiativeCount = (initiativesBlock.match(/n:\s*"/g) || []).length;
  check(`Home.tsx — INITIATIVES array has exactly 3 items (found ${initiativeCount})`,
    initiativeCount === 3, "Expected exactly 3 initiatives: Connect, EELP, Living Trust Framework.");
  check("Home.tsx — Connect app initiative present",
    initiativesBlock.includes("Connect"));
  check("Home.tsx — EELP initiative present",
    initiativesBlock.includes("EELP") || initiativesBlock.includes("Ethical Experience"));
  check("Home.tsx — Living Trust Framework initiative present",
    initiativesBlock.includes("Living Trust"));
  check("Home.tsx — 'Born on the Playa. Gifted to the Planet.' present (approved homepage exception)",
    homeSrc.includes("Born on the Playa. Gifted to the Planet."));
}

// 8b. Work.tsx — eight workstreams
const workSrc = readSrc("src/pages/Work.tsx");
if (workSrc) {
  const wsMatches = (workSrc.match(/id:\s*"ws-[a-z0-9-]+"/g) || []);
  check(`Work.tsx — eight canonical workstreams (found ${wsMatches.length})`,
    wsMatches.length === 8, "Expected 8 workstream entries with id: 'ws-*' slugs.");
  check("Work.tsx — 'What remains unresolved' section present",
    workSrc.includes("What remains unresolved") || workSrc.includes("what-remains-unresolved"));
}

// 8c. routes.ts metadata — approved wording, stale wording absent
const routesSrc = readSrc("src/routes.ts");
if (routesSrc) {
  check("routes.ts — homepage description uses 'human-centered AI initiative'",
    routesSrc.includes("human-centered AI initiative"));
  check("routes.ts — 'philanthropic, public-interest' absent from canonical metadata",
    !routesSrc.includes("philanthropic, public-interest"));
  check("routes.ts — 'philanthropic initiative' absent from canonical metadata",
    !routesSrc.includes("philanthropic initiative"));
  check("routes.ts — approved org wording present ('part of Mystic Arts Foundation')",
    routesSrc.includes("part of Mystic Arts Foundation"));
  check("routes.ts — /privacy-toolkit is noindex", routesSrc.includes(`path: "/privacy-toolkit"`) &&
    routesSrc.includes("noindex: true"));
}

// 8d. Manifesto source
const manifestoSrc = readSrc("src/pages/Manifesto.tsx");
const manifestoTxt = readSrc("src/pages/manifesto.txt");
if (manifestoSrc) {
  check("Manifesto.tsx — 'First published 2025' present",
    manifestoSrc.includes("First published 2025"));
}
if (manifestoTxt) {
  check("manifesto.txt — intent disclosure present ('intends to explore')",
    manifestoTxt.includes("intends to explore"));
}

// 8e. Canonical pages have id="main-content"
const canonicalPageFiles = {
  "/": "src/pages/Home.tsx",
  "/work": "src/pages/Work.tsx",
  "/events": "src/pages/Events.tsx",
  "/team": "src/pages/Team.tsx",
  "/manifesto": "src/pages/Manifesto.tsx",
  "/eelp": "src/pages/EELP.tsx",
  "/living-trust-framework": "src/pages/LivingTrustFramework.tsx",
};
for (const [route, srcPath] of Object.entries(canonicalPageFiles)) {
  const src = readSrc(srcPath);
  check(`${route} — has id="main-content" landmark`,
    src !== null && src.includes('id="main-content"'),
    `Add id="main-content" to the first content section after SiteHeader in ${srcPath}`);
}

// 8f. SiteHeader has skip link
const headerSrc = readSrc("src/components/SiteHeader.tsx");
if (headerSrc) {
  check("SiteHeader.tsx — skip link to #main-content present",
    headerSrc.includes('href="#main-content"'));
}

// 8g. SiteFooter copyright wording
const footerSrc = readSrc("src/components/SiteFooter.tsx");
if (footerSrc) {
  check("SiteFooter.tsx — approved org wording present ('Mystic Arts Foundation')",
    footerSrc.includes("Mystic Arts Foundation"));
}

// 8h. All 7 canonical pages have contentStatus prop in source
const contentStatusFiles = Object.values(canonicalPageFiles);
for (const srcPath of contentStatusFiles) {
  const src = readSrc(srcPath);
  const name = srcPath.split("/").pop();
  check(`${name} — contentStatus="Website content reviewed July 2026." present`,
    src !== null && src.includes("Website content reviewed July 2026."));
}

// ── 9. Build HTML content assertions ─────────────────────────────────────────
console.log("\n── 9. Build HTML content assertions ─────────────────────────────");

// Check 'Website content reviewed July 2026.' in prerendered HTML (now in static injection)
for (const route of CANONICAL_ROUTES) {
  const html = allCanonicalHtml[route.label];
  if (!html) continue;
  check(`${route.label} — 'Website content reviewed July 2026.' in prerendered HTML`,
    html.includes("Website content reviewed July 2026."));
}

// Homepage static injection includes org wording
const homeHtml = allCanonicalHtml["/"];
if (homeHtml) {
  check("/ — static injection has 'human-centered AI initiative'",
    homeHtml.includes("human-centered AI initiative"));
  check("/ — static H1 matches page title",
    homeHtml.includes("<h1>Playa AI — AI Needs Culture</h1>"));
  check("/ — 'philanthropic' absent from prerendered metadata",
    !homeHtml.includes("philanthropic, public-interest"));
}

// ── 10. Summary ──────────────────────────────────────────────────────────────
console.log(`\n${"─".repeat(64)}`);
console.log(`  Passed: ${passed}   Failed: ${failed}`);
if (failed > 0) {
  console.error(`\nverify:audit FAILED — ${failed} check(s) did not pass.\n`);
  process.exit(1);
} else {
  console.log(`\n✅  verify:audit passed — all ${passed} checks passed.\n`);
  console.log("  Note: These are implementation assertions against build output and");
  console.log("  source files. They do not represent the original PDF's 36 audit items.");
  console.log("  See BLOCKERS.md for the original audit item matrix and blocker register.\n");
  process.exit(0);
}
