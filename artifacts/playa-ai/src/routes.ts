/**
 * Canonical route inventory — single source of truth used by:
 *  - usePageMeta (client-side meta updates)
 *  - vite.config.ts prerenderPlugin (build-time HTML generation)
 *  - sitemap.xml (static, derived from INDEXABLE_ROUTES)
 *
 * Rules:
 *  - Add noindex: true to suppress indexing (archives, aliases, private pages)
 *  - For alias routes (same content, different path) set canonical to the
 *    primary route's URL and noindex: true to avoid duplicate-content penalty
 *  - 404 is NOT listed here; usePageMeta's fallback handles it separately
 */

export const SITE_URL = "https://playa-ai.org";

export interface RouteEntry {
  /** Wouter app path */
  path: string;
  /** Page <title> */
  title: string;
  /** <meta name="description">, og:description, twitter:description */
  description: string;
  /**
   * Canonical URL used in <link rel="canonical"> and og:url.
   * Empty string → omit canonical tag (only used for the 404 fallback,
   * never set here in the table itself).
   */
  canonical: string;
  /** true → robots "noindex, follow"; false/omitted → "index, follow" */
  noindex?: boolean;
}

export const ROUTES: RouteEntry[] = [
  // ── Indexable canonical routes ────────────────────────────────────────────
  {
    path: "/",
    title: "Playa AI — AI Needs Culture",
    description:
      "Playa AI is a philanthropic, public-interest initiative developing human-centered AI tools, practices, frameworks, and community experiments.",
    canonical: `${SITE_URL}/`,
  },
  {
    path: "/work",
    title: "Our Work — Playa AI",
    description:
      "Explore Playa AI tools, field experiments, research prototypes, consent protocols, governance work, and public learning.",
    canonical: `${SITE_URL}/work`,
  },
  {
    path: "/events",
    title: "Events — Playa AI",
    description:
      "Explore Playa AI salons, workshops, hackathons, and community gatherings focused on human-centered AI.",
    canonical: `${SITE_URL}/events`,
  },
  {
    path: "/team",
    title: "Team — Playa AI",
    description: "Meet the people building, guiding, and operating Playa AI.",
    canonical: `${SITE_URL}/team`,
  },
  {
    path: "/manifesto",
    title: "Burner-AI Manifesto — Playa AI",
    description:
      "Read Playa AI's founding cultural text on AI, creativity, consent, participation, and human agency.",
    canonical: `${SITE_URL}/manifesto`,
  },
  {
    path: "/eelp",
    title: "EELP — Playa AI",
    description:
      "A public draft protocol for consent, disclosure, data minimization, and human override in AI-mediated experiences.",
    canonical: `${SITE_URL}/eelp`,
  },
  {
    path: "/living-trust-framework",
    title: "Living Trust Framework — Playa AI",
    description:
      "A public working framework for consent, data dignity, privacy, and human agency in AI-mediated experiences.",
    canonical: `${SITE_URL}/living-trust-framework`,
  },

  // ── Non-indexable archive routes ──────────────────────────────────────────
  {
    path: "/privacy-toolkit",
    title: "Privacy Toolkit Archive — Playa AI",
    description:
      "An archived Playa AI privacy-framework page retained for historical continuity and migration context.",
    canonical: `${SITE_URL}/privacy-toolkit`,
    noindex: true,
  },
  {
    path: "/classic",
    title: "Classic Homepage — Playa AI",
    description: "The preserved classic version of the Playa AI homepage.",
    canonical: `${SITE_URL}/classic`,
    noindex: true,
  },
  {
    path: "/classic/work",
    title: "Classic Work Page — Playa AI",
    description: "The preserved classic version of the Playa AI work page.",
    canonical: `${SITE_URL}/classic/work`,
    noindex: true,
  },
  {
    path: "/classic/events",
    title: "Classic Events Page — Playa AI",
    description: "The preserved classic version of the Playa AI events page.",
    canonical: `${SITE_URL}/classic/events`,
    noindex: true,
  },
  {
    path: "/classic/team",
    title: "Classic Team Page — Playa AI",
    description: "The preserved classic version of the Playa AI team page.",
    canonical: `${SITE_URL}/classic/team`,
    noindex: true,
  },

  // ── Alias route ───────────────────────────────────────────────────────────
  // /playa-ai-living-trust-framework renders the same component as
  // /living-trust-framework. Canonical points to the primary URL; noindex
  // prevents duplicate-content penalty.
  {
    path: "/playa-ai-living-trust-framework",
    title: "Living Trust Framework — Playa AI",
    description:
      "A public working framework for consent, data dignity, privacy, and human agency in AI-mediated experiences.",
    canonical: `${SITE_URL}/living-trust-framework`,
    noindex: true,
  },
];

/** Routes included in sitemap.xml — indexable canonicals only */
export const INDEXABLE_ROUTES = ROUTES.filter((r) => !r.noindex);
