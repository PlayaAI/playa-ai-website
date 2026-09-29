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
    title: "Home · Playa AI",
    description:
      "Playa AI brings artists, researchers, and communities together to build AI around human creativity, consent, and choice.",
    canonical: `${SITE_URL}/`,
    summary:
      "AI shaped by the people who live with it. Human-centered means people shape the experience and decide how their data is used. We convene. We build. We fund. We publish. Explore Connect, the Living Trust Framework research draft, and the EELP review candidate. Playa AI is part of Mystic Arts Foundation’s California 501(c)(3).",
  },
  {
    path: "/build",
    title: "Build · Playa AI",
    description:
      "Explore Playa AI tools, field experiments, research prototypes, consent protocols, governance work, and public learning.",
    canonical: `${SITE_URL}/build`,
    summary:
      "Playa AI's work spans consent protocols, human connection research, community-governed data tools, and open frameworks. Active projects include the EELP (Ethical Experience Lab Protocol) for AI consent and disclosure, the Living Trust Framework for data dignity and privacy, relational tools built under open consent standards, and facilitated community experiments. Our field notes, briefs, and working drafts are published as public learning resources.",
  },
  {
    path: "/convene",
    title: "Convene · Playa AI",
    description:
      "Explore Playa AI salons, workshops, hackathons, and community gatherings focused on human-centered AI.",
    canonical: `${SITE_URL}/convene`,
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
      "EELP (Ethical Experience Lab Protocol) is a public draft protocol developed by Playa AI. It establishes principles and practices for consent, disclosure, data minimization, and human override in AI-mediated experiences. EELP is designed to be adopted by event organizers, community platforms, and AI practitioners who want to handle participant data with dignity and transparency. The full draft is available for community review and feedback.",
  },
  {
    path: "/living-trust-framework",
    title: "Living Trust Framework — Playa AI",
    description:
      "An openly licensed public working draft for consent, data dignity, privacy, and human agency in AI-mediated experiences. Licensed CC BY-SA 4.0 / Apache 2.0.",
    canonical: `${SITE_URL}/living-trust-framework`,
    summary:
      "The Living Trust Framework is Playa AI's openly licensed public working draft for consent, data dignity, privacy, and human agency in AI-mediated experiences. Framework content is licensed under CC BY-SA 4.0; software and code under Apache 2.0. It provides principles, patterns, and implementation guidance for organizations that collect, process, or act on personal data in AI contexts. The framework is a living document — updated as community feedback and real-world implementation inform its development.",
  },

  {
    path: "/get-involved",
    title: "Get Involved — Playa AI",
    description:
      "Participate in building human-centered AI. Seven paths for builders, artists, researchers, funders, cultural stewards, institutions, and general participation.",
    canonical: `${SITE_URL}/get-involved`,
    summary:
      "Playa AI invites builders, artists, researchers, funders, cultural stewards, and institutions to participate in building human-centered AI infrastructure. The Get Involved page provides seven participation paths — each with a concise invitation and a direct message form delivered to team@playa-ai.org. Playa AI is a human-centered AI initiative, part of Mystic Arts Foundation\u2019s California 501(c)(3).",
  },

  {
    path: "/fund", title: "Fund · Playa AI",
    description: "Support the people and initiatives developing AI around creativity, consent, and human choice.",
    canonical: `${SITE_URL}/fund`,
    summary: "Discuss funding a specific Playa AI initiative or supporting shared consent research, documentation, and community work. Start a conversation with team@playa-ai.org about the initiative, its needs, and a suitable contribution route.",
  },
  {
    path: "/publish", title: "Publish · Playa AI",
    description: "Read Playa AI’s openly licensed methods, research drafts, and implementation resources.",
    canonical: `${SITE_URL}/publish`,
    summary: "Read the Ethical Experience Lab Protocol (EELP) v0.1.0-rc.1 public review candidate, licensed CC BY 4.0, and the Living Trust Framework public-review research draft, licensed CC BY-SA 4.0 with code under Apache 2.0. Explore implementation resources and the founding Burner-AI Manifesto. No public dataset is listed.",
  },
  { path: "/events", title: "Convene · Playa AI", description: "Continue to Playa AI gatherings.", canonical: `${SITE_URL}/convene`, noindex: true },
  { path: "/work", title: "Build · Playa AI", description: "Continue to Playa AI initiatives.", canonical: `${SITE_URL}/build`, noindex: true },

  // ── /privacy — permanent redirect alias ──────────────────────────────────
  // The production HTTP server emits HTTP 308 → /living-trust-framework.
  // This entry causes a prerendered /privacy/index.html to be generated with:
  //   • noindex, follow (search engines must not index this alias)
  //   • canonical → /living-trust-framework (correct canonical signalled)
  //   • client-side window.location.replace() via PrivacyRedirect component
  // Do NOT add /privacy to the sitemap — the canonical destination is already there.
  {
    path: "/privacy",
    title: "Privacy — Playa AI",
    description:
      "This address redirects to the Living Trust Framework, Playa AI's public framework for consent, data dignity, and privacy.",
    canonical: `${SITE_URL}/living-trust-framework`,
    noindex: true,
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

  {
    path: "/about",
    title: "About · Playa AI",
    description:
      "About Playa AI — origin, structure, the people behind the initiative, how the work is organized, and how to participate.",
    canonical: `${SITE_URL}/about`,
    summary:
      "Playa AI is a human-centered AI initiative developing consent frameworks, community experiments, tools, and public-interest research rooted in creativity and participation. Playa AI is a human-centered AI initiative, part of Mystic Arts Foundation\u2019s California 501(c)(3). The initiative grew out of field work at Burning Man and operates year-round, building open frameworks for consent-first AI design.",
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
