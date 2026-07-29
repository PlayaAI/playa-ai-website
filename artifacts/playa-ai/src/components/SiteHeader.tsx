import { Link } from "wouter";
import type { ReactNode } from "react";
import { useState, useEffect, useRef } from "react";

type ActivePage = "home" | "events" | "team" | "work" | "manifesto";

interface SiteHeaderProps {
  active?: ActivePage;
  contextLine?: ReactNode;
}

const NAV: { key: string; href: string; label: string }[] = [
  { key: "home", href: "/", label: "Overview" },
  { key: "events", href: "/events", label: "Events" },
  { key: "team", href: "/team", label: "Team" },
  { key: "work", href: "/work", label: "Work" },
  { key: "manifesto", href: "/manifesto", label: "Manifesto" },
  { key: "participate", href: "/#participate", label: "Participate" },
];

const MENU_ID = "mobile-nav-menu";

const NAV_LINK_BASE =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-1";

export function SiteHeader({ active, contextLine }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Close on Escape and return focus to trigger
  useEffect(() => {
    if (!menuOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMenuOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md hairline-b border-border">
      <div className="site-header-inner max-w-[1400px] mx-auto px-4 py-4 flex items-center justify-between gap-6 font-mono text-xs uppercase tracking-widest">
        <Link
          href="/"
          className={`flex items-center gap-3 font-bold text-foreground hover:text-muted-foreground transition-colors shrink-0 ${NAV_LINK_BASE}`}
          data-testid="link-home"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-foreground animate-pulse-slow"></span>
          <span>Playa AI</span>
        </Link>

        {/* Desktop navigation — hidden below md */}
        <nav
          aria-label="Main navigation"
          className="site-header-nav hidden md:flex items-center gap-5 md:gap-8"
        >
          {NAV.map((item) => {
            const isActive = item.key === active;
            return (
              <Link
                key={item.key}
                href={item.href}
                className={`${
                  isActive
                    ? "text-foreground border-b border-foreground pb-0.5"
                    : "text-muted-foreground hover:text-foreground transition-colors"
                } ${NAV_LINK_BASE}`}
                data-testid={`link-${item.key}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4 shrink-0">
          {/* Desktop Contact */}
          <a
            href="/#contact"
            className={`hidden md:inline-flex bg-foreground text-background px-4 py-2 hover:bg-background hover:text-foreground border border-foreground transition-colors ${NAV_LINK_BASE}`}
            data-testid="link-contact"
          >
            Contact
          </a>

          {/* Mobile menu toggle — hidden at md and above */}
          <button
            ref={triggerRef}
            type="button"
            aria-expanded={menuOpen}
            aria-controls={MENU_ID}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setMenuOpen((o) => !o)}
            className={`md:hidden text-muted-foreground hover:text-foreground transition-colors ${NAV_LINK_BASE}`}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {/* Mobile navigation menu */}
      {menuOpen && (
        <div
          id={MENU_ID}
          className="md:hidden hairline-t border-border bg-background"
        >
          <nav aria-label="Mobile navigation">
            <ul className="max-w-[1400px] mx-auto px-4 py-2 font-mono text-xs uppercase tracking-widest">
              {NAV.map((item) => {
                const isActive = item.key === active;
                return (
                  <li key={item.key} className="hairline-b border-border">
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      className={`block py-3 ${
                        isActive
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground transition-colors"
                      } ${NAV_LINK_BASE}`}
                      data-testid={`mobile-link-${item.key}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
              <li>
                <a
                  href="/#contact"
                  onClick={closeMenu}
                  className={`block py-3 text-muted-foreground hover:text-foreground transition-colors ${NAV_LINK_BASE}`}
                  data-testid="mobile-link-contact"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}

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
