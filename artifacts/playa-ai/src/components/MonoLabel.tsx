import type { ReactNode } from "react";

export function MonoLabel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`font-mono text-xs uppercase tracking-widest text-muted-foreground ${className}`}
    >
      {children}
    </div>
  );
}
