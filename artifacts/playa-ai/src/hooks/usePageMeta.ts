import { useEffect } from "react";
import { useLocation } from "wouter";
import { ROUTES, SITE_URL, type RouteEntry } from "../routes";

// O(1) lookup from the canonical route table
const META_MAP = new Map<string, RouteEntry>(ROUTES.map((r) => [r.path, r]));

interface ResolvedMeta extends RouteEntry {
  /** true only for genuine unknown-path 404 responses */
  is404?: boolean;
}

function resolveMeta(rawPath: string): ResolvedMeta {
  const normalised = rawPath.replace(/\/$/, "") || "/";
  const entry = META_MAP.get(normalised);
  if (entry) return entry;
  // Genuine 404 — no canonical, stricter robots
  return {
    path: normalised,
    title: "Page Not Found — Playa AI",
    description: "The requested page could not be found.",
    canonical: "", // omit <link rel="canonical"> entirely
    noindex: true,
    is404: true,
  };
}

function setOrCreate(selector: string, createFn: () => Element): Element {
  return (
    document.querySelector(selector) ??
    (() => {
      const el = createFn();
      document.head.appendChild(el);
      return el;
    })()
  );
}

function applyMeta(entry: ResolvedMeta): void {
  const is404 = entry.is404 === true;

  document.title = entry.title;

  // description
  (
    setOrCreate(
      'meta[name="description"]',
      () =>
        Object.assign(document.createElement("meta"), { name: "description" }),
    ) as HTMLMetaElement
  ).content = entry.description;

  // canonical — omit entirely for 404 to avoid self-referencing canonicals
  if (entry.canonical) {
    (
      setOrCreate(
        'link[rel="canonical"]',
        () =>
          Object.assign(document.createElement("link"), { rel: "canonical" }),
      ) as HTMLLinkElement
    ).href = entry.canonical;
  } else {
    document.querySelector('link[rel="canonical"]')?.remove();
  }

  // robots
  // Known archive/alias routes  → "noindex, follow"  (allow link equity)
  // Genuine 404 unknown paths   → "noindex, nofollow" (harder block)
  // Normal indexable pages      → "index, follow"
  (
    setOrCreate(
      'meta[name="robots"]',
      () =>
        Object.assign(document.createElement("meta"), { name: "robots" }),
    ) as HTMLMetaElement
  ).content = !entry.noindex
    ? "index, follow"
    : is404
      ? "noindex, nofollow"
      : "noindex, follow";

  // og:title
  const ogTitle = setOrCreate('meta[property="og:title"]', () => {
    const m = document.createElement("meta");
    m.setAttribute("property", "og:title");
    return m;
  }) as HTMLMetaElement;
  ogTitle.setAttribute("content", entry.title);

  // og:description
  const ogDesc = setOrCreate('meta[property="og:description"]', () => {
    const m = document.createElement("meta");
    m.setAttribute("property", "og:description");
    return m;
  }) as HTMLMetaElement;
  ogDesc.setAttribute("content", entry.description);

  // og:url — fall back to constructed URL when canonical is absent (404)
  const ogUrl = setOrCreate('meta[property="og:url"]', () => {
    const m = document.createElement("meta");
    m.setAttribute("property", "og:url");
    return m;
  }) as HTMLMetaElement;
  ogUrl.setAttribute(
    "content",
    entry.canonical || `${SITE_URL}${entry.path}`,
  );

  // twitter:title
  (
    setOrCreate(
      'meta[name="twitter:title"]',
      () =>
        Object.assign(document.createElement("meta"), {
          name: "twitter:title",
        }),
    ) as HTMLMetaElement
  ).content = entry.title;

  // twitter:description
  (
    setOrCreate(
      'meta[name="twitter:description"]',
      () =>
        Object.assign(document.createElement("meta"), {
          name: "twitter:description",
        }),
    ) as HTMLMetaElement
  ).content = entry.description;
}

export function usePageMeta(): void {
  const [location] = useLocation();

  useEffect(() => {
    applyMeta(resolveMeta(location));
  }, [location]);
}
