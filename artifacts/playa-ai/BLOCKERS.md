# Playa AI — Technical & Credibility Workstream: Blocker Register

_Updated: 2026-07-28. Owner: main agent (technical implementation)._

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
| Privacy Policy page content | Requires legal review; cannot be published using assumptions | Legal |
| Terms of Service content | Requires legal review | Legal |
| New forms or data collection endpoints | Requires privacy assessment and product authorization | Product |
| Legal-compliance claims | Cannot be asserted without verified legal basis | Legal |
| GitHub licence or "open-source" claims | Requires organizational decision about licensing approach | Leadership |
| Participant or event metrics (counts, locations, dates) | Requires verification against actual records | Operations |
| Microgrant claims | Requires verification of amounts, recipients, and dates | Operations |
| Manifesto publication history | Requires verified record of versions and dates | Editorial |
| Crisis or mental-health protocols | Requires clinical review and legal assessment | Legal / Clinical |
| Team credentials or biographical claims | Requires individual consent and accuracy verification | Team members |
| Organizational or fiscal-sponsorship changes | Requires board or sponsor authorization | Leadership |

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
