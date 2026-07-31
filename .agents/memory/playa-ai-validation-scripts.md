---
name: Playa AI validation scripts
description: check-copy.js and verify-audit.js — scope, patterns, and key design decisions
---

## check-copy.js (scripts/check-copy.js)

Scans 15 files total:
- `src/pages/*.tsx` — excludes HomeClassic.tsx, EventsClassic.tsx, WorkClassic.tsx, TeamClassic.tsx
- `src/components/*.tsx` — all components
- `src/routes.ts` — single file (full prohibited-pattern check)
- `public/llms.txt` — limited subset of patterns only

Prohibited patterns (14 total): human-AI co-evolution, Artist%20Grant%20Interest, artist microgrants, Privacy Toolkit in review, MMXXVI, running monthly, philanthropic initiative, philanthropic, public-interest, Published 2026, gmail.com/mail/u/0/#compose, mail.google.com, a U.S. 501(c)(3) public charity (proximity check — must be preceded by "California nonprofit and" within 35 chars), Sign it as, sign it as, sign the pledge.

**Approved canonical exception:** "Born on the Playa. Gifted to the Planet." is allowed ONLY in Home.tsx. Found anywhere else in canonical source → fails. User-approved decision 2026-07-30.

**Why:** Classic/archive pages (HomeClassic.tsx etc.) are excluded because they intentionally preserve historical language. The check-copy script only scans src/ and public/ — never scripts/ — so its own string literals cannot trigger false positives.

## verify-audit.js (scripts/verify-audit.js)

170 checks (as of 2026-07-31 pass). Sections:
1. Build output exists
2. Canonical routes (7 routes × 13 assertions = 91 checks)
3. llms.txt (5 checks)
4. robots.txt (3 checks)
5. sitemap.xml (10 checks: 7 present + 3 excluded archive routes)
6. Gmail compose URLs in build output (1 check — scans all .html/.js)
7. Archive/alias routes noindex (12 checks)
8. Source-file assertions (42 checks — INITIATIVES count/names, workstream slugs via ws-*, skip link, id=main-content ×7, pledge wording, org wording, manifesto year/disclosure, contentStatus ×7)
9. Build HTML assertions (10 checks — review date in prerendered HTML ×7, static injection org wording, H1, no stale metadata)

**Workstream IDs** in Work.tsx use slug format (`id: "ws-connect-app"`, `id: "ws-eelp"`, etc.) — NOT numeric (`id: "ws-01"`). Regex must be `/id:\s*"ws-[a-z0-9-]+"/g`.

**INITIATIVES regex** — match by scanning the block between `const INITIATIVES` and the next `const [A-Z]`, counting `n: "` occurrences (3 expected).
