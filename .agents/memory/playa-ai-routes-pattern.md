---
name: Playa AI route inventory pattern
description: src/routes.ts is the single source of truth for all route metadata; changing routes requires updating it, not just the router.
---

## The pattern

`src/routes.ts` exports `ROUTES` (all 13 routes) and `INDEXABLE_ROUTES` (7 non-noindex routes). It is consumed by:

1. `src/hooks/usePageMeta.ts` — updates `<head>` tags on client-side navigation
2. `vite.config.ts` `prerenderPlugin` — writes per-route `index.html` at build time
3. `public/sitemap.xml` — manually maintained, should reflect `INDEXABLE_ROUTES`

## Rules

- Adding a new route → add entry to `ROUTES`, update `public/sitemap.xml` if indexable, then rebuild
- Archive/alias routes → set `noindex: true`; alias routes point `canonical` to the primary URL
- Removing a route → remove from `ROUTES` and from `sitemap.xml`; the prerendered file becomes orphaned and should be cleaned from `dist/` (or just rebuild from scratch)

**Why:** Before this pattern, route metadata was scattered across `usePageMeta.ts` inline logic. Any new route required editing multiple files and could silently miss noindex or canonical settings. Central table + build-time enforcement closes that gap.

## 404 fallback

The 404 entry is NOT in `ROUTES`. `usePageMeta.ts` has a hardcoded fallback for unknown paths: `canonical: ""`, `noindex: true`, `is404: true` → robots = `noindex, nofollow`.
