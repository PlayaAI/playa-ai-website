import { useEffect } from "react";

/** Static hosting fallback. Production also issues an HTTP 308. */
export function LegacyRouteRedirect({ to }: { to: string }) {
  useEffect(() => {
    window.location.replace(
      `${to}${window.location.search}${window.location.hash}`,
    );
  }, [to]);
  return (
    <p className="page-width">
      <a href={to}>Continue to {to.slice(1)}</a>
    </p>
  );
}
