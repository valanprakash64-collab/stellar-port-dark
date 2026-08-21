import { useCallback, useEffect, useRef, useState } from "react";

/** True on fine-pointer devices with motion allowed (desktop / laptop). */
export function useInteractivePointer() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wide = window.matchMedia("(min-width: 768px)").matches;
    setOk(fine && wide && !reduce);
  }, []);
  return ok;
}

/**
 * Subtle 3D tilt + cursor-following glow, driven by requestAnimationFrame.
 * Disabled on touch devices, small screens and reduced-motion setups.
 */
export function useTilt(maxDeg = 5) {
  const ref = useRef<HTMLDivElement | null>(null);
  const frame = useRef(0);
  const enabled = useInteractivePointer();

  const onMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!enabled) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        el.style.transform = `perspective(900px) rotateX(${(0.5 - py) * maxDeg}deg) rotateY(${
          (px - 0.5) * maxDeg
        }deg) translateY(-6px)`;
        el.style.setProperty("--mx", `${px * 100}%`);
        el.style.setProperty("--my", `${py * 100}%`);
      });
    },
    [enabled, maxDeg],
  );

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(frame.current);
    el.style.transform = "";
  }, []);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  return { ref, onPointerMove: onMove, onPointerLeave: onLeave, enabled } as const;
}
