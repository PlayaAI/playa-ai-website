/**
 * PrivacyRedirect — /privacy
 *
 * Issues a client-side redirect to /living-trust-framework on mount.
 * The production HTTP server also emits HTTP 308 at the network layer,
 * so JavaScript-disabled visitors see the fallback link below.
 *
 * Metadata: noindex, follow; canonical → /living-trust-framework
 */
import { useEffect } from "react";
import { Link } from "wouter";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export default function PrivacyRedirect() {
  useEffect(() => {
    // Redirect immediately; use replace() so /privacy does not stay in history
    window.location.replace("/living-trust-framework");
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden flex flex-col">
      <SiteHeader />

      <section className="flex-1 px-4 max-w-[1400px] mx-auto w-full pt-16 md:pt-24 pb-20">
        <div className="hairline-b border-border pb-6 mb-12 flex flex-wrap items-center justify-between gap-4 font-mono text-xs uppercase tracking-widest">
          <span>Privacy · Redirecting</span>
          <span className="text-muted-foreground">Playa AI</span>
        </div>

        <div className="max-w-2xl">
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            This address has moved to the{" "}
            <Link
              href="/living-trust-framework"
              className="text-foreground border-b border-current pb-0.5 hover:text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
            >
              Living Trust Framework
            </Link>
            .
          </p>
          <p className="text-sm text-muted-foreground">
            You will be redirected automatically. If nothing happens,{" "}
            <Link
              href="/living-trust-framework"
              className="border-b border-current pb-0.5 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
            >
              click here
            </Link>
            .
          </p>
        </div>
      </section>

      <SiteFooter
        contextLine="Privacy · Playa AI"
        contentStatus="Website content reviewed July 2026."
      />
    </main>
  );
}
