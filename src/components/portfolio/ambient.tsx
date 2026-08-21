import { useEffect, useRef } from "react";

/**
 * Ambient background: faint grid, two slowly drifting gradient orbs
 * (with light parallax) and a low-density particle field with occasional
 * connecting lines. Pauses when the tab is hidden, thins out on small
 * screens and stops entirely for prefers-reduced-motion.
 */
export function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const orbsRef = useRef<HTMLDivElement | null>(null);

  /* --- particles --- */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let raf = 0;
    let running = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    type P = { x: number; y: number; vx: number; vy: number; r: number; a: number };
    let particles: P[] = [];
    let linkDistance = 120;

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Responsive density: fewer particles on tablet / mobile.
      const tier = width >= 1024 ? 26000 : width >= 640 ? 40000 : 58000;
      const cap = width >= 1024 ? 64 : width >= 640 ? 34 : 20;
      linkDistance = width >= 1024 ? 120 : 90;
      const count = Math.round(Math.min(cap, Math.max(14, (width * height) / tier)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.14,
        vy: (Math.random() - 0.5) * 0.14,
        r: Math.random() * 1.5 + 0.5,
        a: Math.random() * 0.35 + 0.12,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
        ctx.beginPath();
        ctx.fillStyle = `rgba(180, 235, 255, ${p.a})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Connecting lines only where density is worth it (desktop / tablet).
      if (width >= 640) {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const a = particles[i]!;
            const b = particles[j]!;
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const dist = Math.hypot(dx, dy);
            if (dist < linkDistance) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(150, 220, 255, ${0.07 * (1 - dist / linkDistance)})`;
              ctx.lineWidth = 1;
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
      }

      if (running) raf = requestAnimationFrame(draw);
    };

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!reduce) {
        running = true;
        raf = requestAnimationFrame(draw);
      }
    };

    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);

    if (reduce) {
      running = false;
      draw();
    } else {
      raf = requestAnimationFrame(draw);
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  /* --- orb parallax --- */
  useEffect(() => {
    const el = orbsRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const intensity = window.matchMedia("(min-width: 1024px)").matches ? 0.06 : 0.03;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate3d(0, ${-window.scrollY * intensity}px, 0)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 grid-backdrop" />
      <div ref={orbsRef} className="absolute inset-0 will-change-transform">
        <div
          className="ambient-orb animate-drift-slow h-[38rem] w-[38rem] -left-40 -top-52 bg-primary"
          style={{ opacity: 0.2 }}
        />
        <div
          className="ambient-orb animate-drift-slow h-[30rem] w-[30rem] -right-32 top-1/3 bg-secondary"
          style={{ opacity: 0.16, animationDelay: "-12s" }}
        />
        <div
          className="ambient-orb animate-float-slow bottom-10 left-1/3 h-[24rem] w-[24rem] bg-primary"
          style={{ opacity: 0.1, animationDelay: "-6s" }}
        />
      </div>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}

/** Soft mouse-following glow (fine pointers only), eased with rAF. */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let x = tx;
    let y = ty;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      el.style.opacity = "1";
    };
    const tick = () => {
      x += (tx - x) * 0.07;
      y += (ty - y) * 0.07;
      el.style.transform = `translate3d(${x - 176}px, ${y - 176}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 -z-10 h-88 w-88 rounded-full bg-primary/10 opacity-0 blur-3xl transition-opacity duration-700"
      style={{ height: "22rem", width: "22rem" }}
    />
  );
}
