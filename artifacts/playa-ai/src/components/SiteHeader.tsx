import { Link } from "wouter";
import type { ReactNode } from "react";
import { useState, useEffect, useRef } from "react";

type ActivePage =
  | "home"
  | "events"
  | "team"
  | "about"
  | "work"
  | "manifesto"
  | "get-involved"
  | "fund"
  | "publish";
interface SiteHeaderProps {
  active?: ActivePage;
  contextLine?: ReactNode;
}
const NAV = [
  { key: "home", href: "/", label: "Home" },
  { key: "events", href: "/convene", label: "Convene" },
  { key: "work", href: "/build", label: "Build" },
  { key: "fund", href: "/fund", label: "Fund" },
  { key: "publish", href: "/publish", label: "Publish" },
  { key: "about", href: "/about", label: "About" },
];

export function SiteHeader({ active, contextLine }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!menuOpen) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);
  const selected =
    active === "team" ? "about" : active === "manifesto" ? "publish" : active;
  return (
    <>
      <a href="#main-content" className="site-skip-link">
        Skip to main content
      </a>
      <header className="editorial-header">
        <div className="page-width editorial-header-inner">
          <Link href="/" className="editorial-brand" aria-label="Playa AI home">
            Playa AI
          </Link>
          <nav aria-label="Main navigation" className="editorial-nav">
            {NAV.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                aria-current={selected === item.key ? "page" : undefined}
                className={item.key === "fund" ? "nav-fund" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="editorial-mobile-controls">
            <Link
              href="/fund"
              className="nav-fund"
              aria-current={selected === "fund" ? "page" : undefined}
            >
              Fund
            </Link>
            <button
              ref={triggerRef}
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav
            id="mobile-nav-menu"
            aria-label="Mobile navigation"
            className="editorial-mobile-nav page-width"
          >
            {NAV.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                aria-current={selected === item.key ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
        {contextLine && (
          <div className="page-width editorial-context">{contextLine}</div>
        )}
      </header>
    </>
  );
}
