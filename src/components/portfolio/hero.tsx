import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "./data";

/** Hero — name perfectly centered, tagline below, entrance animations. */
export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col items-center justify-center px-5 pb-20 pt-32 text-center sm:px-8"
    >
      <div
        className="reveal flex items-center gap-2 rounded-full border border-border bg-muted/40 px-4 py-1.5 text-xs text-muted-foreground backdrop-blur-md"
        data-visible="true"
        style={{ transitionDelay: "80ms" }}
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/70" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
        </span>
        {profile.availability}
      </div>

      <h1
        className="reveal mx-auto mt-8 max-w-4xl text-balance text-5xl font-bold leading-[1.05] sm:text-6xl md:text-7xl lg:text-8xl"
        data-visible="true"
        style={{ transitionDelay: "180ms" }}
      >
        <span className="text-gradient">{profile.name}</span>
      </h1>

      <p
        className="reveal mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
        data-visible="true"
        style={{ transitionDelay: "300ms" }}
      >
        {profile.tagline}
      </p>

      <p
        className="reveal mt-4 font-mono text-xs uppercase tracking-[0.28em] text-primary/90 sm:text-sm"
        data-visible="true"
        style={{ transitionDelay: "380ms" }}
      >
        {profile.role} · {profile.location}
      </p>

      <div
        className="reveal mt-10 flex flex-wrap items-center justify-center gap-3"
        data-visible="true"
        style={{ transitionDelay: "460ms" }}
      >
        <a
          href="#projects"
          className="group inline-flex min-h-11 items-center gap-2 rounded-xl border border-primary/40 bg-primary/15 px-6 text-sm font-semibold text-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/25 hover:shadow-[var(--shadow-glow)] active:translate-y-0"
        >
          View my work
          <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
        </a>
        <a
          href={profile.resumeUrl}
          className="inline-flex min-h-11 items-center rounded-xl border border-border bg-muted/40 px-6 text-sm font-medium text-foreground backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-secondary/50 hover:bg-muted/70"
        >
          Download résumé
        </a>
      </div>

      <div
        className="reveal mt-10 flex items-center justify-center gap-3"
        data-visible="true"
        style={{ transitionDelay: "540ms" }}
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
            className="grid min-h-11 min-w-11 place-items-center rounded-xl border border-border bg-muted/30 text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:text-primary"
          >
            <Icon className="h-5 w-5" />
          </a>
        ))}
      </div>
    </section>
  );
}
