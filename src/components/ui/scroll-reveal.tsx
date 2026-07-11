"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Direction = "auto" | "left" | "right" | "up";

interface ScrollRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** Delay before the pop-in starts, in ms. */
  delay?: number;
  /**
   * Slide-in direction. "auto" picks by horizontal dominance:
   * left-leaning elements slide from the left, right-leaning from the
   * right, centered ones rise from below.
   */
  direction?: Direction;
}

const hiddenByDir: Record<Exclude<Direction, "auto">, string> = {
  left: "-translate-x-24 scale-95 opacity-0",
  right: "translate-x-24 scale-95 opacity-0",
  up: "translate-y-14 scale-90 opacity-0",
};

/**
 * Slides its children in (with a slight overshoot) the first time they
 * scroll into view.
 */
export default function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "auto",
  ...props
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [dir, setDir] = useState<Exclude<Direction, "auto">>(
    direction === "auto" ? "up" : direction
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    if (direction === "auto") {
      // Initial hidden state only offsets Y, so X measurement is unaffected.
      const rect = el.getBoundingClientRect();
      const centerRatio = (rect.left + rect.width / 2) / window.innerWidth;
      setDir(centerRatio < 0.45 ? "left" : centerRatio > 0.55 ? "right" : "up");
    } else {
      setDir(direction);
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [direction]);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.34,1.4,0.64,1)]",
        visible ? "translate-x-0 translate-y-0 scale-100 opacity-100" : hiddenByDir[dir],
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
      {...props}
    >
      {children}
    </div>
  );
}
