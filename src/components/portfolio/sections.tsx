import {
  Award,
  Briefcase,
  ExternalLink,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Target,
} from "lucide-react";
import { useState } from "react";
import { about, education, experience, profile, projects, skillGroups, softSkills } from "./data";
import { Reveal, SectionLabel } from "./primitives";
import { useReveal } from "./use-reveal";

/* ------------------------------------------------------------------ */
/* ABOUT + SKILLS (skills sit on the right side of the layout)         */
/* ------------------------------------------------------------------ */

export function AboutAndSkills() {
  return (
    <section
      id="about"
      className="relative mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28"
      aria-label="About me and skills"
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Left: About Me */}
        <div className="lg:col-span-7">
          <Reveal>
            <SectionLabel>About me</SectionLabel>
            <h2 className="mt-5 text-3xl font-bold sm:text-4xl">
              Building thoughtful software, <span className="text-gradient">one detail at a time</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {about.paragraph}
            </p>
          </Reveal>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {about.highlights.map((h, i) => (
              <Reveal key={h.label} delay={i * 90}>
                <div className="glass card-hover h-full rounded-2xl p-4">
                  <p className="font-display text-lg font-bold text-primary">{h.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{h.label}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={140}>
            <div className="glass mt-6 flex flex-wrap items-center gap-3 rounded-2xl p-5">
              <Target className="h-5 w-5 shrink-0 text-secondary" />
              <p className="min-w-0 text-sm text-muted-foreground">
                Currently focused on{" "}
                <span className="text-foreground">[YOUR CURRENT FOCUS]</span> and open to{" "}
                <span className="text-foreground">[YOUR IDEAL ROLE]</span>.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Right: Skills */}
        <div id="skills" className="scroll-mt-28 lg:col-span-5">
          <Reveal>
            <SectionLabel>Skills</SectionLabel>
            <h2 className="mt-5 text-2xl font-bold sm:text-3xl">Technical toolkit</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Strongest areas are highlighted first.
            </p>
          </Reveal>

          <div className="mt-8 space-y-4">
            {skillGroups.map((group, gi) => (
              <SkillGroupCard key={group.title} group={group} delay={gi * 110} />
            ))}

            <Reveal delay={340}>
              <div className="glass card-hover rounded-2xl p-5">
                <p className="font-display text-sm font-semibold">Professional strengths</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {softSkills.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-border bg-muted/40 px-3 py-1 text-xs text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-secondary/50 hover:text-foreground"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillGroupCard({
  group,
  delay,
}: {
  group: (typeof skillGroups)[number];
  delay: number;
}) {
  const { ref, visible } = useReveal(0.25);
  return (
    <div
      ref={ref}
      data-visible={visible}
      className="reveal"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div
        className={`glass card-hover rounded-2xl p-5 ${
          group.featured ? "glow-ring" : ""
        }`}
      >
        <div className="flex items-center gap-2">
          {group.featured ? <Sparkles className="h-4 w-4 shrink-0 text-primary" /> : null}
          <p className="min-w-0 font-display text-sm font-semibold">{group.title}</p>
        </div>
        <ul className="mt-4 space-y-3">
          {group.skills.map((skill) => (
            <li key={skill.name}>
              <div className="flex items-center justify-between gap-3 text-xs">
                <span className="min-w-0 truncate text-foreground">{skill.name}</span>
                <span className="shrink-0 font-mono text-muted-foreground">{skill.level}%</span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full transition-[width] duration-1000 ease-out"
                  style={{
                    width: visible ? `${skill.level}%` : "0%",
                    background: "var(--gradient-accent)",
                  }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* EDUCATION                                                           */
/* ------------------------------------------------------------------ */

export function Education() {
  return (
    <section id="education" className="relative mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <Reveal>
        <SectionLabel>Education</SectionLabel>
        <h2 className="mt-5 text-3xl font-bold sm:text-4xl">Academic background</h2>
      </Reveal>

      <ol className="relative mt-12 space-y-4 border-l border-border pl-6 sm:pl-8">
        {education.map((item, i) => (
          <li key={item.degree} className="relative">
            <span className="absolute -left-[31px] top-6 grid h-3 w-3 place-items-center rounded-full bg-primary ring-4 ring-background sm:-left-[39px]" />
            <Reveal delay={i * 110}>
              <article className="glass card-hover rounded-2xl p-6">
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
                  <div className="flex min-w-0 items-start gap-3">
                    <GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold">{item.degree}</h3>
                      <p className="mt-1 text-sm text-primary/90">{item.institution}</p>
                    </div>
                  </div>
                  <span className="shrink-0 rounded-full border border-border bg-muted/40 px-3 py-1 font-mono text-xs text-muted-foreground">
                    {item.duration}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* EXPERIENCE                                                          */
/* ------------------------------------------------------------------ */

export function Experience() {
  return (
    <section
      id="experience"
      className="relative mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28"
    >
      <Reveal>
        <SectionLabel>Experience</SectionLabel>
        <h2 className="mt-5 text-3xl font-bold sm:text-4xl">
          Where I&apos;ve <span className="text-gradient">built and shipped</span>
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-4 lg:grid-cols-2">
        {experience.map((job, i) => (
          <Reveal key={`${job.role}-${i}`} delay={i * 110}>
            <article className="glass card-hover flex h-full flex-col rounded-2xl p-6">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
                <div className="flex min-w-0 items-start gap-3">
                  <Briefcase className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold">{job.role}</h3>
                    <p className="mt-1 text-sm text-primary/90">{job.company}</p>
                  </div>
                </div>
                <span className="shrink-0 rounded-full border border-border bg-muted/40 px-3 py-1 font-mono text-xs text-muted-foreground">
                  {job.duration}
                </span>
              </div>

              <p className="mt-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {job.type}
              </p>

              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {job.responsibilities.map((r) => (
                  <li key={r} className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                    <span className="min-w-0">{r}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 space-y-2">
                {job.achievements.map((a) => (
                  <p
                    key={a}
                    className="flex gap-2 rounded-xl border border-primary/25 bg-primary/10 p-3 text-sm text-foreground"
                  >
                    <Award className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="min-w-0">{a}</span>
                  </p>
                ))}
              </div>

              <ul className="mt-auto flex flex-wrap gap-2 pt-5">
                {job.stack.map((t, ti) => (
                  <li
                    key={`${t}-${ti}`}
                    className="rounded-md border border-border bg-muted/40 px-2 py-1 font-mono text-xs text-muted-foreground"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* PROJECTS                                                            */
/* ------------------------------------------------------------------ */

export function Projects() {
  return (
    <section id="projects" className="relative mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <Reveal>
        <SectionLabel>Projects</SectionLabel>
        <h2 className="mt-5 text-3xl font-bold sm:text-4xl">Selected work</h2>
        <p className="mt-3 max-w-2xl text-base text-muted-foreground">
          Academic, personal and technical projects — each one built end to end.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={i * 100}>
            <article className="group glass card-hover relative flex h-full flex-col overflow-hidden rounded-2xl p-6">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-secondary/20 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                <h3 className="min-w-0 text-lg font-semibold">{p.title}</h3>
                <span className="shrink-0 rounded-full border border-border bg-muted/40 px-3 py-1 font-mono text-xs text-muted-foreground">
                  {p.kind}
                </span>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.description}</p>

              <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-secondary" />
                    <span className="min-w-0">{f}</span>
                  </li>
                ))}
              </ul>

              <ul className="mt-5 flex flex-wrap gap-2">
                {p.tech.map((t, ti) => (
                  <li
                    key={`${t}-${ti}`}
                    className="rounded-md border border-primary/25 bg-primary/10 px-2 py-1 font-mono text-xs text-primary"
                  >
                    {t}
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex flex-wrap gap-2 pt-6">
                <a
                  href={p.repo}
                  className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-border bg-muted/40 px-4 text-sm text-foreground transition-all duration-300 hover:border-primary/40 hover:text-primary"
                >
                  <Github className="h-4 w-4" /> Code
                </a>
                <a
                  href={p.link}
                  className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-primary/40 bg-primary/15 px-4 text-sm font-medium text-primary transition-all duration-300 hover:bg-primary/25 hover:shadow-[var(--shadow-glow)]"
                >
                  <ExternalLink className="h-4 w-4" /> Live
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* CONTACT                                                             */
/* ------------------------------------------------------------------ */

export function Contact() {
  const [sent, setSent] = useState(false);

  const details = [
    { label: "Email", value: profile.email, href: `mailto:${profile.email}`, Icon: Mail },
    { label: "Phone", value: profile.phone, href: `tel:${profile.phone}`, Icon: Phone },
    { label: "LinkedIn", value: profile.linkedin, href: profile.linkedin, Icon: Linkedin },
    { label: "GitHub", value: profile.github, href: profile.github, Icon: Github },
    {
      label: profile.extraLink.label,
      value: profile.extraLink.url,
      href: profile.extraLink.url,
      Icon: ExternalLink,
    },
    { label: "Location", value: profile.location, href: undefined, Icon: MapPin },
  ];

  return (
    <section id="contact" className="relative mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <Reveal>
        <SectionLabel>Contact</SectionLabel>
        <h2 className="mt-5 text-3xl font-bold sm:text-4xl">
          Let&apos;s <span className="text-gradient">work together</span>
        </h2>
        <p className="mt-3 max-w-2xl text-base text-muted-foreground">
          Recruiters and collaborators welcome — I usually reply within a day.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-4 lg:grid-cols-12">
        <div className="grid gap-3 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
          {details.map((d, i) => (
            <Reveal key={d.label} delay={i * 70}>
              {d.href ? (
                <a
                  href={d.href}
                  className="glass card-hover flex items-center gap-3 rounded-2xl p-4"
                >
                  <d.Icon className="h-5 w-5 shrink-0 text-primary" />
                  <span className="min-w-0">
                    <span className="block text-xs text-muted-foreground">{d.label}</span>
                    <span className="block truncate text-sm text-foreground">{d.value}</span>
                  </span>
                </a>
              ) : (
                <div className="glass flex items-center gap-3 rounded-2xl p-4">
                  <d.Icon className="h-5 w-5 shrink-0 text-secondary" />
                  <span className="min-w-0">
                    <span className="block text-xs text-muted-foreground">{d.label}</span>
                    <span className="block truncate text-sm text-foreground">{d.value}</span>
                  </span>
                </div>
              )}
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="lg:col-span-7">
          <form
            className="glass glow-ring h-full rounded-3xl p-6 sm:p-8"
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget);
              // Opens the visitor's mail client — swap for an API call if you add a backend.
              const subject = encodeURIComponent(`Portfolio enquiry from ${data.get("name")}`);
              const body = encodeURIComponent(
                `${data.get("message")}\n\nReply to: ${data.get("email")}`,
              );
              window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
              setSent(true);
            }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block" htmlFor="contact-name">
                <span className="mb-2 block text-xs text-muted-foreground">Your name</span>
                <input
                  id="contact-name"
                  name="name"
                  required
                  placeholder="Jane Doe"
                  className="min-h-11 w-full rounded-xl border border-input bg-muted/40 px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60 focus:ring-2 focus:ring-ring/40"
                />
              </label>
              <label className="block" htmlFor="contact-email">
                <span className="mb-2 block text-xs text-muted-foreground">Your email</span>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  placeholder="jane@company.com"
                  className="min-h-11 w-full rounded-xl border border-input bg-muted/40 px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60 focus:ring-2 focus:ring-ring/40"
                />
              </label>
            </div>
            <label className="mt-4 block" htmlFor="contact-message">
              <span className="mb-2 block text-xs text-muted-foreground">Message</span>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={6}
                placeholder="Tell me about the role or project…"
                className="w-full resize-y rounded-xl border border-input bg-muted/40 p-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60 focus:ring-2 focus:ring-ring/40"
              />
            </label>
            <button
              type="submit"
              className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-primary/40 bg-primary/20 px-6 text-sm font-semibold text-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/30 hover:shadow-[var(--shadow-glow)] active:translate-y-0"
            >
              <Mail className="h-4 w-4" /> Send message
            </button>
            {sent ? (
              <p className="mt-4 text-sm text-primary" role="status">
                Your mail client should be open — thank you for reaching out.
              </p>
            ) : null}
          </form>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-8 sm:px-8">
        <p className="min-w-0 truncate text-sm text-muted-foreground">
          © {new Date().getFullYear()} {profile.name}
        </p>
        <a href="#top" className="shrink-0 text-sm text-muted-foreground hover:text-primary">
          Back to top
        </a>
      </div>
    </footer>
  );
}
