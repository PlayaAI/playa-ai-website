import { Link } from "wouter";

interface SiteFooterProps {
  contextLine?: string;
  showBackLink?: boolean;
  contentStatus?: string;
}

export function SiteFooter({
  contextLine = "Field guide · Edition 01 · 2026",
  showBackLink = true,
  contentStatus,
}: SiteFooterProps) {
  return (
    <footer className="bg-foreground text-background px-4 pt-16 pb-12">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 font-mono text-xs uppercase tracking-widest">
        <div>
          <div className="mb-4 text-[#E2D9C5]">Playa AI</div>
          {showBackLink ? (
            <Link
              href="/"
              className="text-[#A7A39A] hover:text-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background"
              data-testid="footer-back"
            >
              ← Back to Playa AI home
            </Link>
          ) : (
            <div className="text-[#A7A39A]">© 2026 Playa AI</div>
          )}
        </div>
        <div className="text-[#A7A39A]">
          <div>{contextLine}</div>
          {contentStatus && (
            <div className="mt-2 text-[#7A7570]">{contentStatus}</div>
          )}
        </div>
        <div className="text-[#A7A39A]">
          <div>© 2026 Playa AI · Fiscally sponsored by Mystic Arts Foundation, a California nonprofit and U.S. 501(c)(3) public charity.</div>
          <div className="mt-2"><a href="mailto:hello@playa-ai.org?subject=General%20Inquiry" target="_blank" rel="noopener noreferrer" className="hover:text-background transition-colors">hello@playa-ai.org</a></div>
        </div>
      </div>
    </footer>
  );
}
