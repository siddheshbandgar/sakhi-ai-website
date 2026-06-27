"use client";

import { useEffect, useRef } from "react";

/**
 * The hero's sunrise glow, gently parallaxed by the pointer and by scroll.
 * Movement is subtle and disabled for reduced-motion users.
 */
export default function HeroGlow() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let tx = 0, ty = 0, sx = 0, sy = 0;

    const onMove = (e: PointerEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      tx = nx * 28;
      ty = ny * 18;
    };
    const onScroll = () => {
      sy = Math.min(window.scrollY, 600) * 0.06;
    };
    const tick = () => {
      const cur = el.style.transform;
      // ease toward target
      const m = cur.match(/translate3d\(([-\d.]+)px, ([-\d.]+)px/);
      const cx = m ? parseFloat(m[1]) : 0;
      const cy = m ? parseFloat(m[2]) : 0;
      const nx = cx + (tx - cx) * 0.06;
      const ny = cy + (ty + sy - cy) * 0.06;
      el.style.transform = `translate3d(${nx.toFixed(2)}px, ${ny.toFixed(2)}px, 0) scale(1.05)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="glow-hero pointer-events-none absolute inset-x-0 top-0 h-[640px] -z-10"
      style={{ transform: "translate3d(0,0,0) scale(1.05)" }}
    />
  );
}
