import { Link } from "wouter";
import type { ReactNode } from "react";

type ActivePage = "home" | "events" | "teams";

interface SiteHeaderProps {
  active: ActivePage;
  contextLine?: ReactNode;
}

const NAV: { key: ActivePage; href: string; label: string }[] = [
  { key: "home", href: "/", label: "Dispatch" },
  { key: "events", href: "/events", label: "Events" },
  { key: "teams", href: "/teams", label: "Teams" },
];

export function SiteHeader({ active, contextLine }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md hairline-b border-border">
      <div className="max-w-[1400px] mx-auto px-4 py-4 flex items-center justify-between gap-6 font-mono text-xs uppercase tracking-widest">
        <Link
          href="/"
          className="flex items-center gap-3 font-bold text-foreground hover:text-muted-foreground transition-colors shrink-0"
          data-testid="link-home"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-foreground animate-pulse-slow"></span>
          <span className="hidden sm:inline">Playa AI Foundation</span>
          <span className="sm:hidden">Playa AI</span>
        </Link>

        <nav className="flex items-center gap-5 md:gap-8">
          {NAV.map((item) => {
            const isActive = item.key === active;
            return (
              <Link
                key={item.key}
                href={item.href}
                className={
                  isActive
                    ? "text-foreground border-b border-foreground pb-0.5"
                    : "text-muted-foreground hover:text-foreground transition-colors"
                }
                data-testid={`link-${item.key}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-4 shrink-0">
          <span className="text-muted-foreground hidden lg:inline">MMXXVI</span>
          <a
            href="/#fund"
            className="bg-foreground text-background px-4 py-2 hover:bg-background hover:text-foreground border border-foreground transition-colors"
            data-testid="link-contact"
          >
            Contact
          </a>
        </div>
      </div>

      {contextLine ? (
        <div className="hairline-t border-border">
          <div className="max-w-[1400px] mx-auto px-4 py-2.5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
            {contextLine}
          </div>
        </div>
      ) : null}
    </header>
  );
}
