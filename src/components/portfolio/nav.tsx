import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { navItems, profile } from "./data";

/**
 * Sticky glass navigation: shrinks on scroll, hides when scrolling down,
 * reveals when scrolling up, tracks the active section with a glowing
 * indicator and animates the mobile sheet open/closed.
 */
export function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hiddenNav, setHiddenNav] = useState(false);
  const [active, setActive] = useState<string>("");
  const [entered, setEntered] = useState(false);
  const lastY = useRef(0);
  const frame = useRef(0);

  useEffect(() => {
    const t = window.setTimeout(() => setEntered(true), 900);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHiddenNav(y > 240 && y > lastY.current + 4);
      lastY.current = y;
    };
    const onScroll = () => {
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame.current);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.6] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out ${
        scrolled ? "py-1.5" : "py-4"
      } ${hiddenNav && !open ? "-translate-y-[130%]" : "translate-y-0"} ${
        entered ? "opacity-100" : "opacity-0"
      }`}
    >
      <nav
        className={`mx-3 grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-2xl px-4 transition-all duration-500 ease-out sm:mx-auto sm:px-6 ${
          scrolled ? "glass py-2" : "border border-transparent py-3"
        }`}
        aria-label="Main navigation"
      >
        <a
          href="#top"
          className="min-w-0 truncate font-display text-sm font-bold tracking-tight text-foreground transition-colors hover:text-primary sm:text-base"
        >
          {profile.name}
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item, i) => (
            <li
              key={item.id}
              className={`transition-all duration-500 ease-out ${
                entered ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
              }`}
              style={{ transitionDelay: `${900 + i * 70}ms` }}
            >
              <a
                href={`#${item.id}`}
                data-active={active === item.id}
                className="group relative rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground data-[active=true]:text-primary"
              >
                {item.label}
                <span
                  aria-hidden
                  className="absolute inset-x-3 -bottom-0.5 h-px origin-center scale-x-0 bg-primary opacity-0 transition-all duration-400 ease-out group-hover:scale-x-100 group-hover:opacity-60 group-data-[active=true]:scale-x-100 group-data-[active=true]:opacity-100 group-data-[active=true]:shadow-[0_0_10px_var(--glow)]"
                />
              </a>
            </li>
          ))}
          <li
            className={`transition-all duration-500 ease-out ${
              entered ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
            }`}
            style={{ transitionDelay: `${900 + navItems.length * 70}ms` }}
          >
            <a
              href={`mailto:${profile.email}`}
              className="ml-2 inline-flex min-h-10 items-center rounded-lg border border-primary/40 bg-primary/10 px-4 text-sm font-medium text-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/20 hover:shadow-[var(--shadow-glow)] active:translate-y-0 active:scale-[0.98]"
            >
              Hire me
            </a>
          </li>
        </ul>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="grid min-h-11 min-w-11 shrink-0 place-items-center rounded-lg border border-border bg-muted/40 text-foreground transition-all duration-300 hover:bg-muted active:scale-95 md:hidden"
        >
          <span className="relative grid h-5 w-5 place-items-center">
            <Menu
              className={`absolute h-5 w-5 transition-all duration-300 ${
                open ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
              }`}
            />
            <X
              className={`absolute h-5 w-5 transition-all duration-300 ${
                open ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
              }`}
            />
          </span>
        </button>
      </nav>

      <div
        className={`mx-3 overflow-hidden transition-all duration-400 ease-out md:hidden ${
          open ? "mt-2 max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="glass flex flex-col rounded-2xl p-3">
          {navItems.map((item, i) => (
            <li
              key={item.id}
              className={`transition-all duration-300 ease-out ${
                open ? "translate-x-0 opacity-100" : "translate-x-3 opacity-0"
              }`}
              style={{ transitionDelay: open ? `${80 + i * 50}ms` : "0ms" }}
            >
              <a
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                data-active={active === item.id}
                className="flex min-h-11 items-center rounded-lg px-3 text-sm text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground data-[active=true]:text-primary"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
