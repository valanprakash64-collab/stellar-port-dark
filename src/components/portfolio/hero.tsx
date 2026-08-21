import { useEffect, useRef, useState } from "react";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "./data";

/**
 * Hero — name perfectly centered, entrance choreography:
 * background → name → tagline → role → CTAs → socials.
 * Text uses fade-up + blur-to-sharp only; no large movement.
 */
export function Hero() {
  const [ready, setReady] = useState(false);
  const bgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 780);
    return () => window.clearTimeout(t);
  }, []);

  // Gentle parallax on the hero's own gradient wash.
  useEffect(() => {
    const el = bgRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, 900);
        el.style.transform = `translate3d(0, ${y * 0.12}px, 0)`;
        el.style.opacity = String(Math.max(0, 1 - y / 900));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const step = (delay: number) =>
    ({
      transitionDelay: `${delay}ms`,
    }) as const;

  const cls = (extra = "") =>
    `reveal ${extra}`;

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col items-center justify-center px-5 pb-20 pt-32 text-center sm:px-8"
    >
      {/* Subtle animated gradient wash behind the hero */}
      <div
        ref={bgRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 will-change-transform"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 45% at 50% 32%, oklch(0.8 0.14 190 / 12%), transparent 70%), radial-gradient(45% 40% at 70% 70%, oklch(0.68 0.16 292 / 10%), transparent 72%)",
          }}
        />
      </div>

      <div
        className={cls(
          "flex items-center gap-2 rounded-full border border-border bg-muted/40 px-4 py-1.5 text-xs text-muted-foreground backdrop-blur-md",
        )}
        data-visible={ready}
        style={step(0)}
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/70" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
        </span>
        {profile.availability}
      </div>

      <h1
        className={cls(
          "mx-auto mt-8 max-w-4xl text-balance text-5xl font-bold leading-[1.05] sm:text-6xl md:text-7xl lg:text-8xl",
        )}
        data-visible={ready}
        style={step(120)}
      >
        <span className="text-shimmer">{profile.name}</span>
      </h1>

      <p
        className={cls(
          "mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg",
        )}
        data-visible={ready}
        style={step(320)}
      >
        {profile.tagline}
      </p>

      <p
        className={cls("mt-4 font-mono text-xs uppercase tracking-[0.28em] text-primary/90 sm:text-sm")}
        data-visible={ready}
        style={step(440)}
      >
        {profile.role} · {profile.location}
      </p>

      <div
        className={cls("mt-10 flex flex-wrap items-center justify-center gap-3")}
        data-visible={ready}
        style={step(560)}
      >
        <a
          href="#projects"
          className="group inline-flex min-h-11 items-center gap-2 rounded-xl border border-primary/40 bg-primary/15 px-6 text-sm font-semibold text-primary transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-primary/25 hover:shadow-[var(--shadow-glow)] active:translate-y-0 active:scale-[0.97]"
        >
          View my work
          <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
        </a>
        <a
          href={profile.resumeUrl}
          className="inline-flex min-h-11 items-center rounded-xl border border-border bg-muted/40 px-6 text-sm font-medium text-foreground backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-secondary/50 hover:bg-muted/70 active:translate-y-0 active:scale-[0.97]"
        >
          Download résumé
        </a>
      </div>

      <div
        className={cls("mt-10 flex items-center justify-center gap-3")}
        data-visible={ready}
        style={step(680)}
      >
        {[
          { href: profile.github, label: "GitHub", Icon: Github },
          { href: profile.linkedin, label: "LinkedIn", Icon: Linkedin },
          { href: `mailto:${profile.email}`, label: "Email", Icon: Mail },
        ].map(({ href, label, Icon }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            className="group grid min-h-11 min-w-11 place-items-center rounded-xl border border-border bg-muted/30 text-muted-foreground transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary/40 hover:text-primary hover:shadow-[var(--shadow-glow)] active:scale-95"
          >
            <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
          </a>
        ))}
      </div>
    </section>
  );
}
