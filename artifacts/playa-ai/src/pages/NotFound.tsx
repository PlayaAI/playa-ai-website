import { Link } from "wouter";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden flex flex-col">
      <SiteHeader />

      <section className="flex-1 px-4 max-w-[1400px] mx-auto w-full pt-16 md:pt-24 pb-20">
        <div className="hairline-b border-border pb-6 mb-12 md:mb-20 flex flex-wrap items-center justify-between gap-4 font-mono text-xs uppercase tracking-widest">
          <span>404 · Page Not Found</span>
          <span className="text-muted-foreground">Playa AI</span>
        </div>

        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6">
            404 · Page Not Found
          </p>

          <h1 className="font-serif text-5xl md:text-7xl leading-[0.95] tracking-tight mb-8">
            This page has left the map.
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-12">
            The page may have moved, changed, or never existed.
          </p>

          <nav aria-label="Recovery navigation">
            <ul className="flex flex-col sm:flex-row flex-wrap gap-4 list-none p-0 m-0">
              <li>
                <Link
                  href="/"
                  className="inline-block bg-foreground text-background font-mono text-xs uppercase tracking-widest px-6 py-3 hover:bg-background hover:text-foreground border border-foreground transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
                >
                  Return home
                </Link>
              </li>
              <li>
                <Link
                  href="/build"
                  className="inline-block font-mono text-xs uppercase tracking-widest px-6 py-3 border border-foreground hover:bg-foreground hover:text-background transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
                >
                  Explore the work
                </Link>
              </li>
              <li>
                <Link
                  href="/convene"
                  className="inline-block font-mono text-xs uppercase tracking-widest px-6 py-3 border border-foreground hover:bg-foreground hover:text-background transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
                >
                  View events
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </section>

      <SiteFooter contextLine="404 · Playa AI · 2026" showBackLink={false} />
    </main>
  );
}
