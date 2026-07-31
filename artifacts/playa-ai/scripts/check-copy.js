#!/usr/bin/env node
/**
 * check-copy.js — prohibited copy checker for canonical Playa AI source files.
 *
 * Scans:
 *   src/pages/*.tsx        — canonical pages (Classic/archive files excluded)
 *   src/components/*.tsx   — shared components
 *   src/routes.ts          — route metadata (titles, descriptions, summaries)
 *   public/llms.txt        — machine-readable site summary
 *
 * Exits non-zero if any prohibited string is found.
 * Approved exceptions are noted inline and only permitted in their designated files.
 *
 * Usage: node scripts/check-copy.js
 *        pnpm run check:copy
 */
import { readFileSync, readdirSync } from "node:fs";
import { join, basename } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const PAGES_DIR = join(ROOT, "src", "pages");
const COMPONENTS_DIR = join(ROOT, "src", "components");
const ROUTES_FILE = join(ROOT, "src", "routes.ts");
const LLMS_FILE = join(ROOT, "public", "llms.txt");

// Pages to skip (Classic/archive — these files intentionally preserve historical language)
const SKIP_PAGE_FILES = new Set([
  "EventsClassic.tsx",
  "WorkClassic.tsx",
  "TeamClassic.tsx",
  "HomeClassic.tsx",
]);

// ── Prohibited patterns ───────────────────────────────────────────────────────
// Each entry: { pattern, reason, allowedIn? }
// allowedIn: array of basenames where the pattern is an approved exception.
// Do not put canonical string literals here — patterns below must not appear
// in canonical source except as explicitly noted.
const PROHIBITED = [
  {
    pattern: "human-AI co-evolution",
    reason: "Jargon phrase removed per audit finding; use plain description instead.",
  },
  {
    pattern: "Artist%20Grant%20Interest",
    reason: "Gmail subject line that advertises an unpublished artist microgrant program.",
  },
  {
    pattern: "artist microgrants",
    reason: "Advertises a program without published eligibility, budget, or review process.",
  },
  {
    pattern: "Privacy Toolkit in review",
    reason: "Stale status label; Privacy Toolkit is no longer in review.",
  },
  {
    pattern: "MMXXVI",
    reason: "Roman numeral year span removed per audit finding.",
  },
  {
    pattern: "running monthly",
    reason: "Stale claim about Agent Labs; program is not confirmed as running monthly.",
  },
  {
    pattern: "philanthropic initiative",
    reason:
      "Deprecated organizational construction. Use 'human-centered AI initiative' " +
      "(and add fiscal-sponsorship sentence separately where appropriate).",
  },
  {
    pattern: "philanthropic, public-interest",
    reason:
      "Stale homepage metadata construction. Use the approved human-centered AI " +
      "initiative wording in all canonical metadata.",
  },
  {
    pattern: "Published 2026",
    reason: "Incorrect manifesto date stamp; must read 'First published 2025'.",
  },
  {
    pattern: "gmail.com/mail/u/0/#compose",
    reason: "Gmail compose URLs must be replaced with mailto: links.",
  },
  {
    pattern: "mail.google.com",
    reason: "Gmail compose URLs must be replaced with mailto: links.",
  },
  {
    pattern: "fiscally sponsored by Mystic Arts Foundation",
    reason:
      "Obsolete fiscal-sponsorship construction. Use the approved wording: " +
      "'Playa AI is a human-centered AI initiative, part of Mystic Arts Foundation\u2019s California 501(c)(3)'.",
  },
  {
    pattern: "California nonprofit and U.S. 501(c)(3) public charity",
    reason:
      "Obsolete organizational description (old wording). Use the approved wording: " +
      "'Playa AI is a human-centered AI initiative, part of Mystic Arts Foundation\u2019s California 501(c)(3)'.",
  },
  {
    pattern: "Foundation's California 501(c)(3)",
    reason:
      "ASCII apostrophe in org wording. Canonical source must use the actual U+2019 curly apostrophe: Foundation\u2019s California 501(c)(3).",
  },
  {
    pattern: "not a separately incorporated legal entity",
    reason:
      "Unapproved legal interpretation. Remove without replacement.",
  },
  {
    pattern: "Sign it as",
    reason:
      "False pledge-signing wording. The pledge is an expression-of-interest flow, " +
      "not a legally binding signature. Use 'Express pledge interest' or equivalent.",
  },
  {
    pattern: "sign it as",
    reason:
      "False pledge-signing wording. The pledge is an expression-of-interest flow, " +
      "not a legally binding signature. Use 'Express pledge interest' or equivalent.",
  },
  {
    pattern: "sign the pledge",
    reason:
      "False pledge-signing wording. The pledge is an expression-of-interest flow.",
  },
  {
    pattern: "hello@playa-ai.org",
    reason:
      "Obsolete public contact address. All public contact surfaces must use team@playa-ai.org.",
  },
];

// ── Approved canonical exception ──────────────────────────────────────────────
// "Born on the Playa. Gifted to the Planet." is an approved homepage slogan
// (user decision 2026-07-30). It is permitted ONLY in Home.tsx. If found in
// any other canonical source file, the validator will fail.
const BORN_ON_PLAYA_EXCEPTION = "Born on the Playa. Gifted to the Planet.";
const BORN_ON_PLAYA_ALLOWED_IN = new Set(["Home.tsx"]);

// ── Helpers ───────────────────────────────────────────────────────────────────
let anyFailed = false;

function lineNumber(content, index) {
  return content.slice(0, index).split("\n").length;
}

function checkFile(filePath, content) {
  const name = basename(filePath);

  for (const { pattern, reason } of PROHIBITED) {
    const idx = content.indexOf(pattern);
    if (idx !== -1) {
      console.error(
        `\n❌  ${name}:${lineNumber(content, idx)}\n   Found: "${pattern}"\n   Reason: ${reason}\n`
      );
      anyFailed = true;
    }
  }

  // Approved exception check for "Born on the Playa. Gifted to the Planet."
  if (!BORN_ON_PLAYA_ALLOWED_IN.has(name) && content.includes(BORN_ON_PLAYA_EXCEPTION)) {
    const idx = content.indexOf(BORN_ON_PLAYA_EXCEPTION);
    console.error(
      `\n❌  ${name}:${lineNumber(content, idx)}\n   Found: "${BORN_ON_PLAYA_EXCEPTION}"\n` +
      `   Reason: This slogan is an approved exception only in Home.tsx. ` +
      `Found unexpectedly in another canonical source file.\n`
    );
    anyFailed = true;
  }
}

// ── Scan src/pages/ (excluding Classic/archive) ───────────────────────────────
const pageFiles = readdirSync(PAGES_DIR).filter(
  (f) => f.endsWith(".tsx") && !SKIP_PAGE_FILES.has(f)
);
let scanned = 0;
for (const file of pageFiles) {
  const fp = join(PAGES_DIR, file);
  checkFile(fp, readFileSync(fp, "utf-8"));
  scanned++;
}

// ── Scan src/components/ (all .tsx files) ────────────────────────────────────
const componentFiles = readdirSync(COMPONENTS_DIR).filter((f) => f.endsWith(".tsx"));
for (const file of componentFiles) {
  const fp = join(COMPONENTS_DIR, file);
  checkFile(fp, readFileSync(fp, "utf-8"));
  scanned++;
}

// ── Scan src/routes.ts ────────────────────────────────────────────────────────
{
  const content = readFileSync(ROUTES_FILE, "utf-8");
  checkFile(ROUTES_FILE, content);
  scanned++;
}

// ── Scan public/llms.txt ──────────────────────────────────────────────────────
{
  const content = readFileSync(LLMS_FILE, "utf-8");
  // For llms.txt, only check for Gmail URLs and the stale org construction.
  // The file is authored separately and may use different phrasing by design.
  // We check only the patterns that should never appear here.
  const llmsProhibited = [
    "gmail.com/mail/u/0/#compose",
    "mail.google.com",
    "philanthropic initiative",
    "philanthropic, public-interest",
    "human-AI co-evolution",
    "fiscally sponsored by Mystic Arts Foundation",
    "California nonprofit and U.S. 501(c)(3) public charity",
    "Foundation's California 501(c)(3)",
    "not a separately incorporated legal entity",
  ];
  for (const pattern of llmsProhibited) {
    const idx = content.indexOf(pattern);
    if (idx !== -1) {
      console.error(
        `\n❌  llms.txt:${lineNumber(content, idx)}\n   Found: "${pattern}"\n` +
        `   Reason: Prohibited string found in public/llms.txt\n`
      );
      anyFailed = true;
    }
  }
  scanned++;
}

// ── Positive organizational wording assertion ─────────────────────────────────
// The exact approved wording (with real U+2019 curly apostrophe) must appear
// on each canonical surface. Per-surface strings are used to avoid accepting
// a generic presence of "Mystic Arts Foundation" as proof of correct wording.
// Body copy uses lowercase "part of"; footer uses capital "Part of".
const APPROVED_BODY_WORDING = "part of Mystic Arts Foundation\u2019s California 501(c)(3)";
const APPROVED_FOOTER_WORDING = "Part of Mystic Arts Foundation\u2019s California 501(c)(3)";

const ORG_ASSERTION_SURFACES = [
  {
    path: join(PAGES_DIR, "Home.tsx"),
    label: "Home.tsx",
    expected: APPROVED_BODY_WORDING,
    description: "approved body-copy wording (U+2019)",
  },
  {
    path: join(PAGES_DIR, "Team.tsx"),
    label: "Team.tsx",
    expected: APPROVED_BODY_WORDING,
    description: "approved body-copy wording (U+2019)",
  },
  {
    path: join(COMPONENTS_DIR, "SiteFooter.tsx"),
    label: "SiteFooter.tsx",
    expected: APPROVED_FOOTER_WORDING,
    description: "approved footer wording with capital P and U+2019",
  },
  {
    path: ROUTES_FILE,
    label: "routes.ts",
    expected: APPROVED_BODY_WORDING,
    description: "approved wording in route summaries (U+2019)",
  },
  {
    path: LLMS_FILE,
    label: "llms.txt",
    expected: APPROVED_BODY_WORDING,
    description: "approved wording in llms.txt (U+2019)",
  },
];
for (const { path: filePath, label, expected, description } of ORG_ASSERTION_SURFACES) {
  const content = readFileSync(filePath, "utf-8");
  if (!content.includes(expected)) {
    console.error(
      `\n❌  ${label}\n   Missing ${description}: "${expected}"\n` +
      `   Canonical source must use the exact U+2019 curly apostrophe in the approved construction.\n`
    );
    anyFailed = true;
  }
}

// ── Result ────────────────────────────────────────────────────────────────────
if (anyFailed) {
  console.error(`check:copy FAILED — prohibited strings found. ${scanned} files scanned.\n`);
  process.exit(1);
} else {
  const pageCount = pageFiles.length;
  const componentCount = componentFiles.length;
  console.log(
    `✅  check:copy passed — ${scanned} files scanned ` +
    `(${pageCount} canonical pages, ${componentCount} components, routes.ts, llms.txt). ` +
    `No prohibited strings found.`
  );
  process.exit(0);
}
