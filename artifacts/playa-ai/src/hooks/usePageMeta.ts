import { useEffect } from "react";
import { useLocation } from "wouter";

const BASE = "https://playa-ai.org";

interface MetaEntry {
  title: string;
  description: string;
  canonical: string;
  noindex?: boolean;
}

const META_MAP: Record<string, MetaEntry> = {
  "/": {
    title: "Playa AI — AI Needs Culture",
    description:
      "Playa AI is a philanthropic, public-interest initiative developing human-centered AI tools, practices, frameworks, and community experiments.",
    canonical: `${BASE}/`,
  },
  "/work": {
    title: "Our Work — Playa AI",
    description:
      "Explore Playa AI tools, field experiments, research prototypes, consent protocols, governance work, and public learning.",
    canonical: `${BASE}/work`,
  },
  "/living-trust-framework": {
    title: "Living Trust Framework — Playa AI",
    description:
      "A public working framework for consent, data dignity, privacy, and human agency in AI-mediated experiences.",
    canonical: `${BASE}/living-trust-framework`,
  },
  "/playa-ai-living-trust-framework": {
    title: "Living Trust Framework — Playa AI",
    description:
      "A public working framework for consent, data dignity, privacy, and human agency in AI-mediated experiences.",
    canonical: `${BASE}/living-trust-framework`,
  },
  "/eelp": {
    title: "EELP — Playa AI",
    description:
      "A public draft protocol for consent, disclosure, data minimization, and human override in AI-mediated experiences.",
    canonical: `${BASE}/eelp`,
  },
  "/events": {
    title: "Events — Playa AI",
    description:
      "Explore Playa AI salons, workshops, hackathons, and community gatherings focused on human-centered AI.",
    canonical: `${BASE}/events`,
  },
  "/team": {
    title: "Team — Playa AI",
    description: "Meet the people building, guiding, and operating Playa AI.",
    canonical: `${BASE}/team`,
  },
  "/manifesto": {
    title: "Burner-AI Manifesto — Playa AI",
    description:
      "Read Playa AI's founding cultural text on AI, creativity, consent, participation, and human agency.",
    canonical: `${BASE}/manifesto`,
  },
  "/privacy-toolkit": {
    title: "Privacy Toolkit Archive — Playa AI",
    description:
      "An archived Playa AI privacy-framework page retained for historical continuity and migration context.",
    canonical: `${BASE}/privacy-toolkit`,
  },
  "/classic": {
    title: "Classic Homepage — Playa AI",
    description: "The preserved classic version of the Playa AI homepage.",
    canonical: `${BASE}/classic`,
  },
  "/classic/work": {
    title: "Classic Work Page — Playa AI",
    description: "The preserved classic version of the Playa AI work page.",
    canonical: `${BASE}/classic/work`,
  },
  "/classic/events": {
    title: "Classic Events Page — Playa AI",
    description:
      "The preserved classic version of the Playa AI events page.",
    canonical: `${BASE}/classic/events`,
  },
  "/classic/team": {
    title: "Classic Team Page — Playa AI",
    description: "The preserved classic version of the Playa AI team page.",
    canonical: `${BASE}/classic/team`,
  },
};

function resolveMeta(path: string): MetaEntry {
  const normalised = path.replace(/\/$/, "") || "/";
  return (
    META_MAP[normalised] ?? {
      title: "Page Not Found — Playa AI",
      description: "The requested page could not be found.",
      canonical: `${BASE}${normalised}`,
      noindex: true,
    }
  );
}

function setOrCreate(selector: string, createFn: () => Element): Element {
  return document.querySelector(selector) ?? (() => {
    const el = createFn();
    document.head.appendChild(el);
    return el;
  })();
}

function applyMeta(entry: MetaEntry): void {
  document.title = entry.title;

  const descEl = setOrCreate(
    'meta[name="description"]',
    () => Object.assign(document.createElement("meta"), { name: "description" })
  ) as HTMLMetaElement;
  descEl.content = entry.description;

  const canonEl = setOrCreate(
    'link[rel="canonical"]',
    () => Object.assign(document.createElement("link"), { rel: "canonical" })
  ) as HTMLLinkElement;
  canonEl.href = entry.canonical;

  const robotsEl = setOrCreate(
    'meta[name="robots"]',
    () => Object.assign(document.createElement("meta"), { name: "robots" })
  ) as HTMLMetaElement;
  robotsEl.content = entry.noindex ? "noindex, nofollow" : "index, follow";

  const ogTitle = setOrCreate(
    'meta[property="og:title"]',
    () => { const m = document.createElement("meta"); m.setAttribute("property", "og:title"); return m; }
  ) as HTMLMetaElement;
  ogTitle.setAttribute("content", entry.title);

  const ogDesc = setOrCreate(
    'meta[property="og:description"]',
    () => { const m = document.createElement("meta"); m.setAttribute("property", "og:description"); return m; }
  ) as HTMLMetaElement;
  ogDesc.setAttribute("content", entry.description);

  const ogUrl = setOrCreate(
    'meta[property="og:url"]',
    () => { const m = document.createElement("meta"); m.setAttribute("property", "og:url"); return m; }
  ) as HTMLMetaElement;
  ogUrl.setAttribute("content", entry.canonical);

  const twTitle = setOrCreate(
    'meta[name="twitter:title"]',
    () => Object.assign(document.createElement("meta"), { name: "twitter:title" })
  ) as HTMLMetaElement;
  twTitle.content = entry.title;

  const twDesc = setOrCreate(
    'meta[name="twitter:description"]',
    () => Object.assign(document.createElement("meta"), { name: "twitter:description" })
  ) as HTMLMetaElement;
  twDesc.content = entry.description;
}

export function usePageMeta(): void {
  const [location] = useLocation();

  useEffect(() => {
    applyMeta(resolveMeta(location));
  }, [location]);
}
