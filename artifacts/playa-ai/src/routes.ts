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
 *  - summary is injected as visible HTML into #root during prerendering so
 *    non-JS crawlers see meaningful page content; omit for noindex routes
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
  /**
   * Static HTML summary injected into #root for non-JS crawlers.
   * Plain text only (no HTML tags); the prerender plugin wraps it in semantic
   * markup. Provide for every indexable canonical route; omit for noindex routes.
   */
  summary?: string;
}

export const ROUTES: RouteEntry[] = [
  // ── Indexable canonical routes ────────────────────────────────────────────
  {
    path: "/",
    title: "Playa AI — AI Needs Culture",
    description:
      "Playa AI is a human-centered AI initiative developing consent frameworks, community experiments, tools, and public-interest research rooted in creativity and participation.",
    canonical: `${SITE_URL}/`,
    summary:
      "Playa AI is a human-centered AI initiative, part of Mystic Arts Foundation’s California 501(c)(3). We develop human-centered AI tools, consent frameworks, community experiments, and public-interest research rooted in creativity, participation, and human flourishing. Our work includes the EELP consent protocol, the Living Trust Framework for data dignity, field experiments, salons, and an open working group for builders, artists, researchers, and cultural stewards.",
  },
  {
    path: "/work",
    title: "Our Work — Playa AI",
    description:
      "Explore Playa AI tools, field experiments, research prototypes, consent protocols, governance work, and public learning.",
    canonical: `${SITE_URL}/work`,
    summary:
      "Playa AI's work spans consent protocols, human connection research, community-governed data tools, and open frameworks. Active projects include the EELP (Ethical Experience Lifecycle Protocol) for AI consent and disclosure, the Living Trust Framework for data dignity and privacy, relational tools built under open consent standards, and facilitated community experiments. Our field notes, briefs, and working drafts are published as public learning resources.",
  },
  {
    path: "/events",
    title: "Events — Playa AI",
    description:
      "Explore Playa AI salons, workshops, hackathons, and community gatherings focused on human-centered AI.",
    canonical: `${SITE_URL}/events`,
    summary:
      "Playa AI hosts salons, workshops, hackathons, and community gatherings that bring together builders, artists, researchers, and cultural stewards to explore human-centered AI. Events focus on practical consent design, creative AI applications, community governance, and the cultural conditions that make AI trustworthy. Past and upcoming gatherings are open to collaborators and the interested public.",
  },
  {
    path: "/team",
    title: "Team — Playa AI",
    description: "Meet the people building, guiding, and operating Playa AI.",
    canonical: `${SITE_URL}/team`,
    summary:
      "Playa AI is built by a small operating team supported by an advisory circle and an open working group. Our contributors include builders, artists, researchers, facilitators, and cultural stewards who share a commitment to human-centered AI. Playa AI is a human-centered AI initiative, part of Mystic Arts Foundation’s California 501(c)(3).",
  },
  {
    path: "/manifesto",
    title: "Burner-AI Manifesto — Playa AI",
    description:
      "Read Playa AI's founding cultural text on AI, creativity, consent, participation, and human agency.",
    canonical: `${SITE_URL}/manifesto`,
    summary:
      "The Burner-AI Manifesto is Playa AI's founding cultural text. It articulates a vision for AI rooted in creativity, consent, participation, and human agency — drawing on the values of radical self-reliance, gifting, communal effort, and civic responsibility. The manifesto argues that the next era of AI needs more than intelligence: it needs culture, and that culture must be built by the communities who will live with it.",
  },
  {
    path: "/eelp",
    title: "EELP — Playa AI",
    description:
      "A public draft protocol for consent, disclosure, data minimization, and human override in AI-mediated experiences.",
    canonical: `${SITE_URL}/eelp`,
    summary:
      "EELP (Ethical Experience Lifecycle Protocol) is a public draft protocol developed by Playa AI. It establishes principles and practices for consent, disclosure, data minimization, and human override in AI-mediated experiences. EELP is designed to be adopted by event organizers, community platforms, and AI practitioners who want to handle participant data with dignity and transparency. The full draft is available for community review and feedback.",
  },
  {
    path: "/living-trust-framework",
    title: "Living Trust Framework — Playa AI",
    description:
      "A public working framework for consent, data dignity, privacy, and human agency in AI-mediated experiences.",
    canonical: `${SITE_URL}/living-trust-framework`,
    summary:
      "The Living Trust Framework is Playa AI's public working framework for consent, data dignity, privacy, and human agency in AI-mediated experiences. It provides principles, patterns, and implementation guidance for organizations that collect, process, or act on personal data in AI contexts. The framework is a living document — updated as community feedback and real-world implementation inform its development.",
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
