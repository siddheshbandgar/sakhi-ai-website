"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

/**
 * Reveals its children with a soft fade/blur/rise the first time they
 * scroll into view. Stagger groups of items with the `delay` prop.
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  as: TagProp = "div",
  img = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
  img?: boolean;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Tag = TagProp as any;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`${img ? "reveal-img" : "reveal"} ${shown ? "is-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
