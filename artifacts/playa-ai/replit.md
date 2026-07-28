# Playa AI — Project Notes

## Architecture

- **Framework:** React 19 + Vite 7 + Wouter 3.3.5 (SPA, static output)
- **Styling:** Tailwind CSS v4 via `@tailwindcss/vite`
- **Animation:** Framer Motion v12 (`<MotionConfig reducedMotion="user">` in App.tsx)
- **Output:** `dist/public/` — served by Replit static hosting
- **Routing:** Wouter SPA catch-all; `artifact.toml` rewrites `/*` → `/index.html`

## Route inventory

Single source of truth: `src/routes.ts` — consumed by:
- `src/hooks/usePageMeta.ts` (client-side meta updates per navigation)
- `vite.config.ts` `prerenderPlugin` (build-time per-route HTML generation)
- `public/sitemap.xml` (manually maintained; 7 indexable routes)

## Build-time prerendering

`vite.config.ts` includes a `prerenderPlugin` that runs in `closeBundle` after `vite build`. For every route in `ROUTES`, it writes `dist/public/<path>/index.html` with:

- Route-specific `<title>`, `<meta name="description">`, `<meta name="robots">`, `<link rel="canonical">`, OG tags, Twitter Card tags
- `<noscript>` block with visible page heading and description (non-JS crawlers)
- Asset paths are root-relative (`/assets/…`) so subdirectory HTML works correctly

Run `pnpm run build` to regenerate all prerendered pages after changing `src/routes.ts`.

## Known limitation: HTTP 404 status

**Genuine HTTP 404 responses are not achievable with the current hosting configuration.**

`artifact.toml` contains:
```
[[redirects]]
from = "/*"
to   = "/index.html"
```
No `statusCode` is specified. Replit's static hosting serves this rewrite with HTTP 200 for every path, including paths that don't match any app route. There is no mechanism in the current hosting layer to return HTTP 404 for SPA-handled 404 pages without modifying `artifact.toml`.

**Best available fallback (implemented):**
- `NotFound.tsx` provides a clear visual 404 experience
- `usePageMeta.ts` emits `noindex, nofollow` and omits `<link rel="canonical">` for all unknown paths
- This prevents the SPA 404 from appearing in search indexes or passing link equity, even though the HTTP status is 200

**To achieve genuine HTTP 404:** A `statusCode: 404` rule would need to be added to `artifact.toml` for the catch-all rewrite, which requires either a custom hosting configuration or a server-side component. This is out of scope for the current static deployment.

## Accessibility

- `PledgeModal` and `ManifestoDrawer` both implement full keyboard trap, Escape close, focus restore to trigger, and scroll lock
- `PledgeModal` renders via `createPortal` into `#modal-host` (outside `#root`) so `inert` can be set on `#root` without trapping the modal itself

## User preferences

- Controlled, batch-based remediation process — each batch verified before the next begins
- No redesigns, no framework migrations, no deployment changes within remediation scope
- Gmail compose URLs → `mailto:hello@playa-ai.org?subject=…` (completed Batch 1)
