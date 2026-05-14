import { Link } from "wouter";

interface SiteFooterProps {
  contextLine?: string;
  showBackLink?: boolean;
}

export function SiteFooter({
  contextLine = "Field guide · Edition 01 · 2026",
  showBackLink = true,
}: SiteFooterProps) {
  return (
    <footer className="bg-foreground text-background px-4 pt-16 pb-12">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 font-mono text-xs uppercase tracking-widest">
        <div>
          <div className="mb-4 text-[#E2D9C5]">Playa AI Foundation</div>
          {showBackLink ? (
            <Link
              href="/"
              className="text-[#A7A39A] hover:text-background transition-colors"
              data-testid="footer-back"
            >
              ← Back to dispatch
            </Link>
          ) : (
            <div className="text-[#A7A39A]">© 2026 Playa AI Foundation</div>
          )}
        </div>
        <div className="text-[#A7A39A]">{contextLine}</div>
        <div className="text-[#A7A39A]">
          © 2026 Playa AI Foundation · Fiscal sponsorship via Mystic Arts Foundation · 501(c)(3)
        </div>
      </div>
    </footer>
  );
}
