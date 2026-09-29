import { useEffect } from "react";
import { useLocation } from "wouter";

/** Restore the expected entry point after client navigation or a deep link. */
export function RouteScroll() {
  const [location] = useLocation();
  useEffect(() => {
    let frame: number;
    function scrollToDestination() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const hash = window.location.hash.slice(1);
        if (hash) {
          let id = hash;
          try {
            id = decodeURIComponent(hash);
          } catch {
            /* Preserve malformed legacy fragments. */
          }
          document
            .getElementById(id)
            ?.scrollIntoView({ behavior: "instant", block: "start" });
        } else {
          window.scrollTo({ top: 0, behavior: "instant" });
        }
      });
    }
    scrollToDestination();
    window.addEventListener("hashchange", scrollToDestination);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", scrollToDestination);
    };
  }, [location]);
  return null;
}
