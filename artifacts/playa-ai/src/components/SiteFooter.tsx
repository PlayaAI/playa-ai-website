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
          {/* Part of Mystic Arts Foundation’s California 501(c)(3) */}
          <div>© 2026 Playa AI · Part of{" "}
            <a
              href="https://www.mysticartsfoundation.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-current pb-0.5 hover:text-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background"
            >Mystic Arts Foundation</a>’s California 501(c)(3)</div>
          <div className="mt-2"><a href="mailto:team@playa-ai.org?subject=General%20Inquiry" rel="noopener noreferrer" className="hover:text-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background focus-visible:ring-offset-1">team@playa-ai.org</a></div>
        </div>
      </div>
    </footer>
  );
}
