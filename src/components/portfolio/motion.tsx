import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import { profile } from "./data";
import { useInteractivePointer } from "./use-tilt";

/* ------------------------------------------------------------------ */
/* A. Page loading layer                                               */
/* ------------------------------------------------------------------ */

function initials(name: string) {
  const clean = name.replace(/[[\]]/g, "").trim();
  const parts = clean.split(/\s+/).filter(Boolean);
  if (!parts.length) return "•";
  return parts
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

/** Short, lightweight full-screen loader that fades out on load. */
export function Preloader() {
  const [hidden, setHidden] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const delay = reduce ? 0 : 750;
    const t1 = window.setTimeout(() => setHidden(true), delay);
    const t2 = window.setTimeout(() => setGone(true), delay + 600);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  if (gone) return null;

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[100] grid place-items-center bg-background transition-all duration-500 ease-out ${
        hidden ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-6">
        <span className="font-display text-4xl font-bold tracking-[0.2em] text-primary [text-shadow:0_0_28px_var(--glow)] animate-pulse-soft">
          {initials(profile.name)}
        </span>
        <span className="relative block h-px w-40 overflow-hidden bg-border">
          <span
            className="animate-loader-sweep absolute inset-y-0 left-0 w-1/2"
            style={{ background: "var(--gradient-accent)" }}
          />
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* P. Scroll progress indicator                                        */
/* ------------------------------------------------------------------ */

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const frame = useRef(0);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    const onScroll = () => {
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div aria-hidden className="fixed inset-x-0 top-0 z-[60] h-0.5 bg-transparent">
      <div
        className="h-full origin-left"
        style={{
          transform: `scaleX(${progress})`,
          background: "var(--gradient-accent)",
          boxShadow: "0 0 12px var(--glow)",
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Q. Back-to-top button                                               */
/* ------------------------------------------------------------------ */

export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
        })
      }
      className={`glass fixed bottom-6 right-5 z-50 grid min-h-11 min-w-11 place-items-center rounded-full text-muted-foreground transition-all duration-400 ease-out hover:-translate-y-1 hover:text-primary hover:shadow-[var(--shadow-glow)] sm:right-8 ${
        show ? "scale-100 opacity-100" : "pointer-events-none scale-90 opacity-0"
      }`}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* K. Custom cursor (dot + easing ring), desktop only                  */
/* ------------------------------------------------------------------ */

export function CustomCursor() {
  const enabled = useInteractivePointer();
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled) return;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;
    let visible = false;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!visible) {
        visible = true;
        if (dotRef.current) dotRef.current.style.opacity = "1";
        if (ringRef.current) ringRef.current.style.opacity = "1";
      }
      const target = e.target as HTMLElement | null;
      const interactive = Boolean(target?.closest("a, button, input, textarea, [role='button']"));
      if (ringRef.current) {
        ringRef.current.style.width = interactive ? "44px" : "28px";
        ringRef.current.style.height = interactive ? "44px" : "28px";
        ringRef.current.style.borderColor = interactive
          ? "var(--primary)"
          : "oklch(0.98 0.01 250 / 35%)";
      }
    };

    const tick = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[90] h-1.5 w-1.5 rounded-full bg-primary opacity-0"
      />
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[90] h-7 w-7 rounded-full border opacity-0 transition-[width,height,border-color] duration-300 ease-out"
      />
    </>
  );
}
