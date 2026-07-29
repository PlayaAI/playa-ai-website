interface ContinueExploringLink {
  label: string;
  href: string;
}

interface ContinueExploringProps {
  links: [ContinueExploringLink, ContinueExploringLink];
}

export function ContinueExploring({ links }: ContinueExploringProps) {
  return (
    <section className="px-4 max-w-[1400px] mx-auto py-12 md:py-16 hairline-t border-border">
      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-6">
        Continue exploring
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-10">
        {links.map(({ label, href }) => (
          <a
            key={href}
            href={href}
            className="font-mono text-sm border-b border-foreground pb-0.5 w-fit hover:text-muted-foreground hover:border-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
          >
            {label} →
          </a>
        ))}
      </div>
    </section>
  );
}
