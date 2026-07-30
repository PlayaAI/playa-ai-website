# Playa AI — Technical & Credibility Workstream: Blocker Register

_Updated: 2026-07-30. Owner: main agent (technical implementation)._

---

## A. Hosting — Genuine HTTP 404 Status

**What the issue is:**  
All unknown paths return HTTP 200 (not HTTP 404). The Replit static deployment serves every unrecognized URL by falling back to `/index.html` (configured in `artifact.toml` as `[[services.production.rewrites]] from="/*" to="/index.html"`). Replit's static hosting does not support a `404.html` document or status-code-preserving rewrites.

**What IS correct right now:**  
- The branded 404 page is rendered (client-side, via wouter's catch-all route)  
- The page sets `noindex, nofollow` via `usePageMeta`'s fallback  
- No canonical tag is emitted  
- The page is excluded from the sitemap  

**What requires external action to fix:**  
A genuine HTTP 404 status code requires one of:
1. Migrating the static hosting to a provider that supports custom 404 documents (Netlify, Vercel, Cloudflare Pages) — each supports a `404.html` or `_redirects` / `vercel.json` config that returns real 404 status
2. Requesting Replit platform support for `404.html` document handling in static deployments

**Evidence that it cannot be fixed without platform/hosting change:**  
See `.agents/memory/playa-ai-404-limitation.md`. The `artifact.toml` `rewrites` table only supports `from`/`to` with no `status` field — there is no mechanism to return a non-200 status from the current configuration.

**Owner:** Decision required — Hosting/Infrastructure  
**Blocked on:** Platform capability or hosting migration authorization

---

## B. Compression and Cache Headers — Requires Post-Deployment Verification

**What is configured:**  
Vite produces content-hashed assets (e.g., `assets/index-D2Vulg6-.js`). Replit's static file server controls compression and caching automatically; the repository cannot set `Cache-Control` headers directly via `artifact.toml` or build configuration.

**What requires post-deployment testing:**  
After publication, verify the following response headers on the live site:

| Resource | Expected |
|---|---|
| Hashed JS/CSS assets (`/assets/index-*.js`) | `Cache-Control: public, max-age=31536000, immutable` (or equivalent) |
| HTML documents (`/`, `/work`, etc.) | `Cache-Control: no-cache` or short `max-age` |
| `sitemap.xml` | `Cache-Control: max-age=3600` or similar |
| `robots.txt` | `Cache-Control: max-age=86400` or similar |
| Compressible responses | `Content-Encoding: br` (Brotli) or `Content-Encoding: gzip` |

**Test commands (run from any terminal after deployment):**  
```bash
curl -sI https://playa-ai.org/ | grep -i 'cache-control\|content-encoding'
curl -sI https://playa-ai.org/assets/ | grep -i 'cache-control\|content-encoding'
```

**Owner:** Post-deployment QA  
**Blocked on:** Site must be published to verify live HTTP headers

---

## C. Decision-Gated Items (do not implement without authorization)

These items are excluded from the Technical & Credibility workstream. They require content decisions, legal review, or external evidence before any code change.

| Item | Why blocked | Owner |
|---|---|---|
| Connect Protocol data recording, processing, retention, deletion, consent language | Requires legal review and product decision about what data is actually collected | Legal / Product |
| `/privacy` page content | Requires legal review; cannot be published using assumptions; currently a soft-404 that is linked from the live Connect app | Legal |
| Terms of Service content | Requires legal review | Legal |
| New forms or data collection endpoints | Requires privacy assessment and product authorization | Product |
| Legal-compliance claims | Cannot be asserted without verified legal basis | Legal |
| GitHub licence choice for Living Trust Framework repo | Requires organizational decision; repo currently has no LICENSE file — audit Finding 4 | Leadership |
| Participant or event metrics (counts, locations, dates) | Requires verification against actual records | Operations |
| Microgrant claims | Requires verification of amounts, recipients, and dates; removed from canonical copy pending program publication | Operations |
| Manifesto publication history | Requires verified record of versions and dates | Editorial |
| Crisis or mental-health protocols | Requires clinical review and legal assessment | Legal / Clinical |
| Team credentials or biographical claims | Requires individual consent and accuracy verification | Team members |
| Organizational or fiscal-sponsorship changes | Requires board or sponsor authorization | Leadership |
| "Founding Adopter" pathway | Currently a Gmail link; requires a real form or landing page to fulfill the promise | Product |
| Seven-audience "doors" collapse | All 7 audience CTAs route to one inbox; fix requires either building `/get-involved` with real sections or collapsing to one honest CTA | Product |
| Living Trust Framework licence | Repo README self-discloses "licence pending" — no code change until licence is chosen and published | Legal / Leadership |

---

## D. Post-Deployment QA Checklist

Items that cannot be verified without a published deployment:

1. **HTTP status codes** — Confirm 200 for known routes, and what code unknown routes actually return (expected: 200 with client-side 404 UI — documented limitation above)
2. **Compression** — Check `Content-Encoding: br` or `gzip` on HTML, JS, CSS responses
3. **Caching** — Verify `Cache-Control` headers on hashed assets vs. HTML documents
4. **Canonical tags** — Confirm `<link rel="canonical">` is present and correct in live responses
5. **Open Graph preview** — Test with [opengraph.xyz](https://www.opengraph.xyz/) or Twitter Card Validator for each indexable route
6. **Sitemap indexing** — Submit `https://playa-ai.org/sitemap.xml` to Google Search Console
7. **robots.txt** — Confirm `https://playa-ai.org/robots.txt` is accessible and correct
8. **Prerendered HTML** — Confirm each route serves its route-specific HTML (not the generic SPA shell) when fetched without JavaScript (`curl -sL https://playa-ai.org/work | grep '<title>'`)
9. **llms.txt** — Confirm `https://playa-ai.org/llms.txt` is accessible and returns correct content

---

## E. Audit Matrix — 36-Item Compliance Summary (July 2026)

Status as of 2026-07-30. Items marked ✅ are implemented in source. Items marked 🚫 are blocked (see above sections). Items marked ⬜ are post-deployment-only.

| # | Finding | Status | Notes |
|---|---|---|---|
| 1 | Replace Gmail compose links with mailto: | ✅ | All 45 replaced in prior sessions |
| 2 | Enable brotli/gzip compression | 🚫 | Platform-controlled; Blocker B |
| 3 | Add LICENSE to framework repo | 🚫 | Blocker C — licence choice pending |
| 4 | Remove "Privacy Toolkit in review" | ✅ | Removed in prior sessions |
| 5 | MotionConfig reducedMotion + CSS backstop | ✅ | Implemented in prior sessions |
| 6 | Remove "Born on the Playa. Gifted to the Planet." and "human-AI co-evolution" | ✅ | "Born on the Playa" — user-approved exception on homepage; "human-AI co-evolution" — not present in canonical source |
| 7 | Convert manifesto \<button\>s to \<a href="/manifesto"\> | ✅ | Implemented in prior sessions |
| 8 | Change artist Gmail subject to "Artist Interest List" | ✅ | Replaced with mailto: in prior sessions |
| 9 | Delete MMXXVI span | ✅ | Removed in prior sessions |
| 10 | Remove "artist microgrants" from donor CTA | ✅ | Removed in prior sessions |
| 11 | Fix manifesto year stamp (First published 2025) | ✅ | Implemented in prior sessions |
| 12 | noindex on /privacy-toolkit and /classic/* | ✅ | Configured via usePageMeta in prior sessions |
| 13 | Ship /privacy page | 🚫 | Blocker C — requires legal review |
| 14 | Rewrite Connect disclosure screen | 🚫 | Blocker C — requires product/legal decision |
| 15 | Prerender 7 routes with per-route meta | ✅ | Full prerender implemented in prior sessions |
| 16 | Real HTTP 404s + sitemap.xml + Sitemap: in robots.txt | Partial | robots.txt with Sitemap: ✅; sitemap.xml ✅; real 404 status 🚫 Blocker A |
| 17 | Fix participant aggregate to ≈520 | 🚫 | Blocker C — requires verified records |
| 18 | Add /about#origin origin block | 🚫 | Blocker C — requires Founding Story approval |
| 19 | Add focus management to pledge modal | ✅ | Fully implemented in prior sessions |
| 20 | Upcoming block on /events; Luma calendar link | 🚫 | Blocker C — requires verified upcoming content |
| 21 | Reconcile portfolio to 8 canonical workstreams | ✅ | 8-item index confirmed in Work.tsx |
| 22 | Label /manifesto "What We're Building" as intent | ✅ | Disclosure added to manifesto.txt this session |
| 23 | Publish /llms.txt | ✅ | Created public/llms.txt this session |
| 24 | Add mobile menu | ✅ | Hamburger menu implemented in prior sessions |
| 25 | Rewrite outbound vectors with conflated phrasing | 🚫 | Off-site documents; requires organizational action |
| 26 | Organizational wording consistency | ✅ | "Human-centered AI initiative" + "California nonprofit" applied this session |
| 27 | Homepage initiatives — show only 3 | ✅ | Items 04 and 05 removed this session |
| 28 | Remove stale Tools tally | ✅ | Replaced with WORKSTREAMS card this session |
| 29 | Move "What remains unresolved" before work cards | ✅ | Restructured this session |
| 30 | Add manifesto intent disclosure | ✅ | Added to manifesto.txt this session |
| 31 | Content review date in footers | ✅ | "Website content reviewed July 2026." added to all 7 canonical footers this session |
| 32 | Image accessibility sweep | ✅ | Team portraits have name alt text; event covers use event title; decorative images retain alt="" aria-hidden="true" |
| 33 | Pledge modal — honest wording + correct mailto: subject | ✅ | Subject → "Playa AI Pledge Interest"; button → "Express pledge interest"; description updated this session |
| 34 | check:copy prohibited-string script | ✅ | scripts/check-copy.js created this session |
| 35 | verify:audit structural check script | ✅ | scripts/verify-audit.js created this session |
| 36 | SiteFooter copyright — "California nonprofit and" | ✅ | Updated this session |
