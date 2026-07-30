#!/usr/bin/env node
/**
 * check-copy.js — prohibited copy checker for canonical Playa AI source files.
 *
 * Scans canonical source (src/pages/*.tsx) excluding Classic/archive pages.
 * Exits non-zero if any prohibited string is found.
 *
 * Usage: node scripts/check-copy.js
 *        pnpm run check:copy
 */
import { readFileSync, readdirSync } from "node:fs";
import { join, basename } from "node:path";

const CANONICAL_DIR = new URL("../src/pages", import.meta.url).pathname;

// Pages to skip (Classic/archive)
const SKIP_FILES = new Set([
  "EventsClassic.tsx",
  "WorkClassic.tsx",
  "TeamClassic.tsx",
  "HomeClassic.tsx",
]);

// Prohibited strings with explanatory context.
// Each entry: { pattern, reason, exactMatch? }
// exactMatch=true uses full-string includes; otherwise substring.
const PROHIBITED = [
  {
    pattern: "human-AI co-evolution",
    reason: "Jargon phrase removed per audit finding 14; use plain description instead.",
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
    reason: "Roman numeral year span removed per audit finding 18.",
  },
  {
    pattern: "running monthly",
    reason: "Stale claim about Agent Labs; replaced by WORKSTREAMS card.",
  },
  {
    pattern: "philanthropic initiative fiscally sponsored",
    reason: "Deprecated wording; use 'human-centered AI initiative fiscally sponsored'.",
  },
  {
    pattern: "a U.S. 501(c)(3) public charity",
    reason: "Must read 'a California nonprofit and U.S. 501(c)(3) public charity' in fiscal-sponsorship sentences.",
    // Note: this pattern is intentionally narrow — it flags the old form.
    // The correct form contains 'California nonprofit and' before 'U.S. 501'.
    // We check for the short form which would only appear if 'California nonprofit' is missing.
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
];

// Special-case: "a U.S. 501(c)(3)" is fine ONLY when preceded by "California nonprofit and "
// We refine the check below.

let anyFailed = false;
const files = readdirSync(CANONICAL_DIR).filter(
  (f) => f.endsWith(".tsx") && !SKIP_FILES.has(basename(f))
);

for (const file of files) {
  const filePath = join(CANONICAL_DIR, file);
  const content = readFileSync(filePath, "utf-8");

  for (const { pattern, reason } of PROHIBITED) {
    // Special refinement for the 501(c)(3) check: allow it if preceded by 'California nonprofit and '
    if (pattern === "a U.S. 501(c)(3) public charity") {
      // Find all occurrences
      let idx = content.indexOf(pattern);
      while (idx !== -1) {
        const prefix = content.slice(Math.max(0, idx - 30), idx);
        if (!prefix.includes("California nonprofit and")) {
          console.error(
            `\n❌  ${file}\n   Found: "${pattern}"\n   Reason: ${reason}\n   Fix: ensure the phrase is preceded by 'California nonprofit and'\n`
          );
          anyFailed = true;
        }
        idx = content.indexOf(pattern, idx + 1);
      }
      continue;
    }

    if (content.includes(pattern)) {
      const lineNumber = content.slice(0, content.indexOf(pattern)).split("\n").length;
      console.error(
        `\n❌  ${file}:${lineNumber}\n   Found: "${pattern}"\n   Reason: ${reason}\n`
      );
      anyFailed = true;
    }
  }
}

if (anyFailed) {
  console.error("check:copy FAILED — prohibited strings found in canonical source.\n");
  process.exit(1);
} else {
  console.log(`✅  check:copy passed — ${files.length} canonical files scanned, no prohibited strings found.`);
  process.exit(0);
}
