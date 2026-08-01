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
  { path: "about/index.html", label: "/about" },
  { path: "work/index.html", label: "/work" },
  { path: "events/index.html", label: "/events" },
  { path: "team/index.html", label: "/team" },
  { path: "manifesto/index.html", label: "/manifesto" },
  { path: "eelp/index.html", label: "/eelp" },
  { path: "living-trust-framework/index.html", label: "/living-trust-framework" },
  { path: "get-involved/index.html", label: "/get-involved" },
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
  check(`${route.label} — approved org wording present (U+2019 form)`,
    html.includes("part of Mystic Arts Foundation\u2019s California 501(c)(3)") ||
    html.includes("Part of Mystic Arts Foundation\u2019s California 501(c)(3)"),
    "Expected 'part of Mystic Arts Foundation\u2019s California 501(c)(3)' (U+2019) in prerendered HTML."
  );
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
  check("llms.txt — uses exact approved org wording (U+2019 curly apostrophe)",
    llms.includes("part of Mystic Arts Foundation\u2019s California 501(c)(3)"),
    "Expected literal U+2019 curly apostrophe in 'Foundation\u2019s'.");
  check("llms.txt — no ASCII apostrophe in Foundation's",
    !llms.includes("Foundation's California 501(c)(3)"),
    "ASCII apostrophe found — must be U+2019.");
  check("llms.txt — unapproved legal interpretation absent",
    !llms.includes("not a separately incorporated legal entity"),
    "Remove this sentence without replacement.");
  check("llms.txt — old fiscal-sponsorship construction absent",
    !llms.includes("fiscally sponsored by Mystic Arts Foundation"),
    "Remove old fiscal-sponsorship wording.");
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
  const expectedRoutes = ["/", "/work", "/events", "/team", "/manifesto", "/eelp", "/living-trust-framework", "/get-involved"];
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
  check("routes.ts — exact approved org wording present (U+2019 curly apostrophe)",
    routesSrc.includes("part of Mystic Arts Foundation\u2019s California 501(c)(3)"),
    "Expected literal U+2019 curly apostrophe in 'Foundation\u2019s'.");
  check("routes.ts — no ASCII apostrophe variant",
    !routesSrc.includes("Foundation's California 501(c)(3)"),
    "ASCII apostrophe found — must be U+2019.");
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
  "/about": "src/pages/About.tsx",
  "/work": "src/pages/Work.tsx",
  "/events": "src/pages/Events.tsx",
  "/team": "src/pages/Team.tsx",
  "/manifesto": "src/pages/Manifesto.tsx",
  "/eelp": "src/pages/EELP.tsx",
  "/living-trust-framework": "src/pages/LivingTrustFramework.tsx",
  "/get-involved": "src/pages/GetInvolved.tsx",
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
  check("SiteFooter.tsx — exact approved footer wording present (U+2019, capital P)",
    footerSrc.includes("Part of Mystic Arts Foundation\u2019s California 501(c)(3)"),
    "Expected 'Part of Mystic Arts Foundation\u2019s California 501(c)(3)' with literal U+2019.");
  check("SiteFooter.tsx — no ASCII apostrophe variant",
    !footerSrc.includes("Foundation's California 501(c)(3)"),
    "ASCII apostrophe found — must be U+2019.");
  check("SiteFooter.tsx — old fiscal-sponsorship construction absent",
    !footerSrc.includes("fiscally sponsored by Mystic Arts Foundation"),
    "Remove old fiscal-sponsorship wording.");
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

// ── 10. Get Involved page assertions ─────────────────────────────────────────
console.log("\n── 10. Get Involved page assertions ─────────────────────────────");
const giSrc = readSrc("src/pages/GetInvolved.tsx");
if (!giSrc) {
  check("/get-involved — GetInvolved.tsx exists in src/pages", false, "File not found.");
} else {
  // 7 anchored sections
  const anchors = ["builders", "artists", "researchers", "funders", "stewards", "institutions", "general"];
  for (const anchor of anchors) {
    check(`GetInvolved.tsx — anchor #${anchor} present`,
      giSrc.includes(`anchor: "${anchor}"`),
      `Add a section with anchor: "${anchor}" to the SECTIONS array.`);
  }

  // 7 participation path options
  const pathValues = ["builders", "artists", "researchers", "funders", "stewards", "institutions", "general"];
  for (const v of pathValues) {
    check(`GetInvolved.tsx — path option "${v}" present in PATHS`,
      giSrc.includes(`value: "${v}"`),
      `Add { value: "${v}", ... } to the PATHS array.`);
  }

  // Required form fields present
  check('GetInvolved.tsx — name input present (name="name")',
    giSrc.includes('name="name"'));
  check('GetInvolved.tsx — email input present (name="email")',
    giSrc.includes('name="email"'));
  check('GetInvolved.tsx — participation_path select present',
    giSrc.includes('name="participation_path"'));
  check('GetInvolved.tsx — message textarea present (name="message")',
    giSrc.includes('name="message"'));
  check('GetInvolved.tsx — consent checkbox present',
    giSrc.includes('name="consent"') && giSrc.includes('type="checkbox"'));

  // Consent wording
  check('GetInvolved.tsx — consent label wording present',
    giSrc.includes("I understand that Playa AI may use this information to respond to my inquiry."),
    "Exact consent wording missing — do not simplify it.");

  // Privacy microcopy — exact Formspree disclosure and deletion contact (no /privacy link — no route exists)
  check('GetInvolved.tsx — exact Formspree privacy disclosure present',
    giSrc.includes("processed through Formspree, delivered to Playa AI at") &&
    giSrc.includes("available to authorized Playa AI administrators in the Formspree account"),
    "Use the exact approved Formspree privacy disclosure on /get-involved.");
  check('GetInvolved.tsx — exact privacy/deletion contact wording present',
    giSrc.includes("For privacy or deletion questions related to this submission, email"),
    "Use the exact approved privacy/deletion contact sentence.");
  check('GetInvolved.tsx — privacy contact uses team@playa-ai.org',
    giSrc.includes("mailto:team@playa-ai.org") && giSrc.includes("team@playa-ai.org"));

  // Form endpoint integration
  check('GetInvolved.tsx — VITE_GET_INVOLVED_FORM_ENDPOINT referenced',
    giSrc.includes("VITE_GET_INVOLVED_FORM_ENDPOINT"),
    "The form must read VITE_GET_INVOLVED_FORM_ENDPOINT from import.meta.env.");

  // Honest unconfigured state
  check('GetInvolved.tsx — unconfigured state message present',
    giSrc.includes("Online submission temporarily unavailable") ||
    giSrc.includes("Online submission temporarily unavailable"),
    "Show an honest unavailable state when the endpoint is not configured.");

  // mailto fallback uses team@
  check('GetInvolved.tsx — mailto fallback uses mailto:team@playa-ai.org',
    giSrc.includes("mailto:team@playa-ai.org"),
    "Provide a mailto:team@playa-ai.org fallback.");
  // No hardcoded endpoint URL in the page component
  check('GetInvolved.tsx — no hardcoded Formspree endpoint URL',
    !giSrc.includes("formspree.io"),
    "Access the endpoint only through import.meta.env.VITE_GET_INVOLVED_FORM_ENDPOINT.");
  // No console.log with personal data
  check('GetInvolved.tsx — no console.log calls',
    !giSrc.includes("console.log"),
    "Do not log form data or personal information to the console.");

  // Honeypot field
  check('GetInvolved.tsx — honeypot field present',
    giSrc.includes("honeypot") || giSrc.includes("_gotcha") || giSrc.includes("_website"),
    "A honeypot hidden field is required for bot detection.");

  // No localStorage or sessionStorage
  check('GetInvolved.tsx — no localStorage usage',
    !giSrc.includes("localStorage"),
    "Do not persist form data to localStorage.");
  check('GetInvolved.tsx — no sessionStorage usage',
    !giSrc.includes("sessionStorage"),
    "Do not persist form data to sessionStorage.");

  // contentStatus and id="main-content" (already checked in 8e/8h — spot-check here too)
  check('GetInvolved.tsx — contentStatus present',
    giSrc.includes("Website content reviewed July 2026."));
  check('GetInvolved.tsx — id="main-content" landmark present',
    giSrc.includes('id="main-content"'));
}

// SiteHeader navigation links to /get-involved
const headerSrc2 = readSrc("src/components/SiteHeader.tsx");
if (headerSrc2) {
  check('SiteHeader.tsx — nav links to /get-involved (not /#participate)',
    headerSrc2.includes('href: "/get-involved"'),
    "The Participate/Get Involved nav entry must point to /get-involved, not /#participate.");
}

// Home.tsx DOORS link to /get-involved anchors (homeSrc already declared in section 8)
if (homeSrc) {
  const homeAnchors = ["builders", "artists", "researchers", "funders", "stewards", "institutions"];
  for (const anchor of homeAnchors) {
    check(`Home.tsx — PARTICIPATION card links to /get-involved#${anchor}`,
      homeSrc.includes(`/get-involved#${anchor}`),
      `Change the ${anchor} PARTICIPATION card href from mailto: to /get-involved#${anchor}.`);
  }
  check('Home.tsx — no PARTICIPATION card uses an obsolete mailto: subject-line href',
    !(homeSrc.includes("mailto:team@playa-ai.org?subject=Working%20Group%20Interest") ||
      homeSrc.includes("mailto:team@playa-ai.org?subject=Artist%20Interest%20List") ||
      homeSrc.includes("mailto:team@playa-ai.org?subject=Research%20Collaboration") ||
      homeSrc.includes("mailto:team@playa-ai.org?subject=Donor%20Inquiry") ||
      homeSrc.includes("mailto:team@playa-ai.org?subject=Cultural%20Stewardship") ||
      homeSrc.includes("mailto:team@playa-ai.org?subject=Founding%20Adopter%20Inquiry")),
    "All six PARTICIPATION card hrefs must be /get-involved#<anchor>.");
}

// /get-involved in llms.txt
const llmsSrc = existsSync(join(DIST, "llms.txt"))
  ? readFileSync(join(DIST, "llms.txt"), "utf-8")
  : null;
if (llmsSrc) {
  check("llms.txt — /get-involved canonical entry present",
    llmsSrc.includes("/get-involved"),
    "Add /get-involved to the canonical pages section of llms.txt.");
}

// ── 11. Contact address consolidation ────────────────────────────────────────
console.log("\n── 11. Contact address consolidation ────────────────────────────");

// hello@playa-ai.org must be absent from all current source files
// scripts/ is excluded: validator files legitimately reference the old address
// as a literal string in order to check for its absence in production sources.
const srcDirs = ["src/pages", "src/components", "public"];
const obsoleteAddr = "hello@playa-ai.org";
let helloFound = false;
for (const dir of srcDirs) {
  const absDir = join(ROOT, dir);
  if (!existsSync(absDir)) continue;
  for (const entry of readdirSync(absDir, { recursive: true })) {
    const fullPath = join(absDir, String(entry));
    try {
      if (!statSync(fullPath).isFile()) continue;
      const ext = fullPath.split(".").pop();
      if (!["tsx", "ts", "js", "txt", "md"].includes(ext)) continue;
      const content = readFileSync(fullPath, "utf-8");
      if (content.includes(obsoleteAddr)) {
        console.error(`  ❌  ${obsoleteAddr} found in: ${fullPath.replace(ROOT, "")}`);
        helloFound = true;
      }
    } catch { /* skip unreadable */ }
  }
}
check("No current source file contains hello@playa-ai.org",
  !helloFound,
  "All public contact addresses must be team@playa-ai.org.");

// Check routes.ts and .env.example
const routesSrc2 = readSrc("src/routes.ts");
check("src/routes.ts — no hello@playa-ai.org",
  routesSrc2 !== null && !routesSrc2.includes("hello@playa-ai.org"));
const envExamplePath = join(ROOT, ".env.example");
const envExample = existsSync(envExamplePath)
  ? readFileSync(envExamplePath, "utf-8")
  : null;
check(".env.example — no hello@playa-ai.org",
  envExample !== null && !envExample.includes("hello@playa-ai.org"));

// SiteFooter uses team@playa-ai.org
const footerSrc2 = readSrc("src/components/SiteFooter.tsx");
check("SiteFooter.tsx — footer contact link uses team@playa-ai.org",
  footerSrc2 !== null && footerSrc2.includes("mailto:team@playa-ai.org"),
  "SiteFooter contact link must point to team@playa-ai.org.");

// llms.txt uses team@playa-ai.org
const llmsTxtPath = join(ROOT, "public/llms.txt");
const llmsTxtSrc = existsSync(llmsTxtPath)
  ? readFileSync(llmsTxtPath, "utf-8")
  : null;
check("public/llms.txt — Contact uses team@playa-ai.org",
  llmsTxtSrc !== null && llmsTxtSrc.includes("team@playa-ai.org"),
  "llms.txt Contact field must be team@playa-ai.org.");

// ── 12. Manifesto date, /privacy redirect and 404.html ───────────────────────
console.log("\n── 12. Manifesto date, /privacy redirect and 404.html ──────────");

// Manifesto publication date assertions
const manifestoSrc2 = readSrc("src/pages/Manifesto.tsx");
if (manifestoSrc2) {
  check('Manifesto.tsx — "First Published 2025" publication stamp present',
    manifestoSrc2.toLowerCase().includes("first published 2025"),
    'Add "First Published 2025" to the top publication stamp on the Manifesto page.');
  check('Manifesto.tsx — "Manifesto · 2026" ambiguous publication stamp absent',
    !manifestoSrc2.includes("Manifesto · 2026") && !manifestoSrc2.includes("MANIFESTO · 2026"),
    'Remove the "Manifesto · 2026" stamp; replace with "First Published 2025".');
  check('Manifesto.tsx — MMXXVI absent',
    !manifestoSrc2.includes("MMXXVI"),
    '"MMXXVI" (Roman numerals for 2026) must not appear in the Manifesto page.');
}

// Prerendered manifesto HTML — verify route is built and has correct title meta
// ("First Published 2025" is in the React component, not the static prerender
//  skeleton; that text is checked by the Manifesto.tsx source assertions above
//  and confirmed visually. The prerender check here only verifies the HTML file
//  exists and carries the correct <title> tag.)
const manifestoDistHtml = existsSync(join(DIST, "manifesto/index.html"))
  ? readFileSync(join(DIST, "manifesto/index.html"), "utf-8")
  : null;
check('Manifesto prerender — dist/public/manifesto/index.html exists',
  manifestoDistHtml !== null,
  'Build must generate dist/public/manifesto/index.html.');
check('Manifesto prerender — <title> tag present in built HTML',
  manifestoDistHtml !== null && manifestoDistHtml.includes("Burner-AI Manifesto"),
  'Manifesto prerendered page must have the correct <title> tag.');

// /privacy redirect checks
const routesSrcForPrivacy = readSrc("src/routes.ts");
check('routes.ts — /privacy route present with noindex: true',
  routesSrcForPrivacy !== null &&
  routesSrcForPrivacy.includes('path: "/privacy"') &&
  routesSrcForPrivacy.includes("noindex: true"),
  'Add a /privacy route entry with noindex: true to routes.ts.');
check('routes.ts — /privacy canonical points to /living-trust-framework',
  routesSrcForPrivacy !== null &&
  routesSrcForPrivacy.includes('path: "/privacy"') &&
  routesSrcForPrivacy.includes("/living-trust-framework"),
  'Set /privacy canonical URL to /living-trust-framework.');
const privacyDist = existsSync(join(DIST, "privacy/index.html"))
  ? readFileSync(join(DIST, "privacy/index.html"), "utf-8")
  : null;
check('dist/public/privacy/index.html — generated (prerendered)',
  privacyDist !== null,
  'Build must generate dist/public/privacy/index.html for the /privacy alias.');
check('dist/public/privacy/index.html — noindex meta tag present',
  privacyDist !== null && privacyDist.includes("noindex"),
  'The /privacy prerendered page must carry a noindex robots meta.');
check('dist/public/privacy/index.html — canonical → /living-trust-framework',
  privacyDist !== null && privacyDist.includes("/living-trust-framework"),
  'The /privacy prerendered page canonical must point to /living-trust-framework.');

// 404.html checks
const dist404 = existsSync(join(DIST, "404.html"))
  ? readFileSync(join(DIST, "404.html"), "utf-8")
  : null;
check('dist/public/404.html — generated by build',
  dist404 !== null,
  'The prerender plugin must generate dist/public/404.html for the production server.');
check('dist/public/404.html — noindex, nofollow meta present',
  dist404 !== null && dist404.includes("noindex, nofollow"),
  '404.html must carry <meta name="robots" content="noindex, nofollow">.');
check('dist/public/404.html — no <link rel="canonical"> tag',
  dist404 !== null && !dist404.includes('<link rel="canonical"'),
  '404.html must not carry a canonical link tag.');

// ── 13. /about page assertions ───────────────────────────────────────────────
console.log("\n── 13. /about page ──────────────────────────────────────────────");
const aboutSrc = readSrc("src/pages/About.tsx");
const aboutHtml = readHtml("about/index.html");

// routes.ts
check('/about — route present in routes.ts',
  routesSrc !== null && routesSrc.includes('path: "/about"'),
  'Add /about to ROUTES in src/routes.ts.');
check('/about — not noindex (indexable)',
  routesSrc !== null && !routesSrc.includes('path: "/about"') ||
  (routesSrc !== null && routesSrc.includes('path: "/about"') && !routesSrc.match(/path: "\/about"[^}]*noindex: true/s)),
  'Remove noindex from the /about route entry.');
check('/about — canonical correct in routes.ts',
  routesSrc !== null &&
  (routesSrc.includes('"https://playa-ai.org/about"') ||
   routesSrc.includes('`${SITE_URL}/about`')),
  'Set canonical to https://playa-ai.org/about (or ${SITE_URL}/about) in routes.ts.');
check('/about — title correct in routes.ts',
  routesSrc !== null && routesSrc.includes('"About — Playa AI"'),
  'Set title to "About — Playa AI" in routes.ts.');

// Prerendered HTML
check('/about — dist/public/about/index.html exists',
  aboutHtml !== null,
  'Build must generate dist/public/about/index.html.');
check('/about — prerendered title correct',
  aboutHtml !== null && aboutHtml.includes('About — Playa AI'),
  'Prerendered HTML must have title "About — Playa AI".');
check('/about — not noindex in prerendered HTML',
  aboutHtml !== null && /name="robots" content="index/.test(aboutHtml),
  '/about must be indexable (not noindex) in prerendered HTML.');

// About.tsx source checks
if (aboutSrc) {
  check('About.tsx — exactly one H1 "About Playa AI"',
    // Counts both <h1> and <motion.h1> tags; checks text appears once
    (aboutSrc.match(/<(motion\.)?h1[\s>]/g) || []).length === 1 &&
    aboutSrc.includes('About Playa AI'),
    'About.tsx must contain exactly one H1 with text "About Playa AI".');
  check('About.tsx — id="origin" present',
    aboutSrc.includes('id="origin"'),
    'Add a section with id="origin" to About.tsx.');
  check('About.tsx — id="structure" present',
    aboutSrc.includes('id="structure"'),
    'Add a section with id="structure" to About.tsx.');
  check('About.tsx — id="people" present',
    aboutSrc.includes('id="people"'),
    'Add a section with id="people" to About.tsx.');
  check('About.tsx — id="governance" present',
    aboutSrc.includes('id="governance"'),
    'Add a section with id="governance" to About.tsx.');
  check('About.tsx — id="contact" present',
    aboutSrc.includes('id="contact"'),
    'Add a section with id="contact" to About.tsx.');
  check('About.tsx — approved org wording present (U+2019 or HTML entity)',
    // Accept the actual U+2019 character, HTML entity &#x2019;, or JSX JSX escape {'\u2019'}
    aboutSrc.includes("part of Mystic Arts Foundation\u2019s California 501(c)(3)") ||
    aboutSrc.includes("part of Mystic Arts Foundation&#x2019;s California 501(c)(3)") ||
    aboutSrc.includes("part of Mystic Arts Foundation&#8217;s California 501(c)(3)"),
    "Expected approved org sentence with U+2019 or HTML entity &#x2019;.");
  check('About.tsx — "fiscally sponsored" construction absent',
    !aboutSrc.includes("fiscally sponsored"),
    'Remove "fiscally sponsored" — use the approved org wording.');
  check('About.tsx — /team link present',
    aboutSrc.includes('href="/team"'),
    'Add a link to /team ("Meet the full team") in the People section.');
  check('About.tsx — team@playa-ai.org contact link present',
    aboutSrc.includes('href="mailto:team@playa-ai.org"'),
    'Add mailto:team@playa-ai.org in the contact section.');
  check('About.tsx — "80,000" not attributed to Playa AI as participant count',
    // Checks that "80,000" is not preceded by "Playa AI" (i.e., not Playa AI's count).
    // Burning Man's 80,000 attendance figure is permitted when correctly attributed.
    !aboutSrc.match(/Playa AI[^.]*80[,.]?000/i) &&
    !aboutSrc.match(/80[,.]?000[^.]*Playa AI participant/i),
    '"80,000" must not be described as Playa AI\'s participant count.');
  check('About.tsx — no EIN placeholder',
    !aboutSrc.match(/\d{2}-\d{7}/) && !aboutSrc.includes("EIN:"),
    'Remove any EIN placeholder — EIN publication decision is pending.');
  check('About.tsx — no invented MAF URL',
    !aboutSrc.match(/mysticarts\.(org|com|net)/i),
    'Remove any MAF URL — official URL is pending verification.');
  check('About.tsx — scroll-mt-20 on anchor sections',
    (aboutSrc.match(/scroll-mt-20/g) || []).length >= 4,
    'All anchored sections must have scroll-mt-20 for sticky header offset.');
}

// Navigation
const headerSrcForAbout = readSrc("src/components/SiteHeader.tsx");
check('SiteHeader.tsx — navigation includes /about',
  headerSrcForAbout !== null && headerSrcForAbout.includes('href: "/about"'),
  'Add /about to the NAV array in SiteHeader.tsx.');
check('SiteHeader.tsx — "Team" replaced by "About" in nav',
  headerSrcForAbout !== null &&
  !headerSrcForAbout.includes('href: "/team"') &&
  headerSrcForAbout.includes('href: "/about"'),
  'Replace the Team nav entry with About in the NAV array.');

// llms.txt
const llmsForAbout = readSrc("public/llms.txt");
check('llms.txt — /about entry present',
  llmsForAbout !== null && llmsForAbout.includes('/about'),
  'Add /about to the canonical pages section of llms.txt.');

// sitemap (re-use section-5 logic: just check presence in built HTML)
const sitemapForAbout = existsSync(join(DIST, "sitemap.xml"))
  ? readFileSync(join(DIST, "sitemap.xml"), "utf-8")
  : null;
check('sitemap.xml — /about URL present',
  sitemapForAbout !== null && sitemapForAbout.includes("/about"),
  'Add /about to INDEXABLE_ROUTES in routes.ts so it appears in the sitemap.');

// ── 14. Summary ──────────────────────────────────────────────────────────────
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
