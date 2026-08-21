import type { ReactNode } from "react";
import { useReveal } from "./use-reveal";

/** Scroll-reveal wrapper — fades content up as it enters the viewport. */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      data-visible={visible}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/** Small uppercase label used above each section title. */
export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1 font-mono text-xs uppercase tracking-[0.2em] text-primary">
      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
      {children}
    </span>
  );
}

/** Consistent section shell with heading + optional description. */
export function Section({
  id,
  label,
  title,
  description,
  children,
}: {
  id: string;
  label: string;
  title: ReactNode;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="relative mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <Reveal>
        <div className="max-w-2xl">
          <SectionLabel>{label}</SectionLabel>
          <h2 className="mt-5 text-3xl font-bold sm:text-4xl">{title}</h2>
          {description ? (
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">{description}</p>
          ) : null}
        </div>
      </Reveal>
      <div className="mt-12">{children}</div>
    </section>
  );
}
