---
name: Playa AI static hosting 404 limitation
description: Why genuine HTTP 404 is impossible with the current artifact.toml catch-all rewrite, and what the best available fallback is.
---

## The constraint

`artifact.toml` for playa-ai contains a catch-all rewrite (`/*` → `/index.html`) with no `statusCode`. Replit static hosting returns HTTP 200 for every path, including unmatched ones. There is no way to return HTTP 404 at the server level without modifying the hosting config.

## Best available fallback (implemented)

- `NotFound.tsx` provides a clear visual 404 experience
- `usePageMeta.ts` detects unknown paths (not in `ROUTES`) and emits `noindex, nofollow` + omits `<link rel="canonical">` for those paths
- This prevents unmatched URLs from appearing in search indexes or passing link equity

**Why:** Without `noindex, nofollow` on 404 paths, crawlers could index "soft 404" pages and pollute search results with empty error pages.

## To fix properly

Add `statusCode: 404` to the catch-all redirect rule in `artifact.toml`, or introduce a server-side component that can return proper status codes. This is out of scope for the current static deployment.
