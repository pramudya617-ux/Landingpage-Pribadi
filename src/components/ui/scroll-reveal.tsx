"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** Delay before the pop-in starts, in ms. */
  delay?: number;
}

/**
 * Pops its children in (scale + rise + fade with a slight overshoot)
 * the first time they scroll into view.
 */
export default function ScrollReveal({
  children,
  className,
  delay = 0,
  ...props
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
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
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.34,1.4,0.64,1)]",
        visible
          ? "translate-y-0 scale-100 opacity-100"
          : "translate-y-14 scale-90 opacity-0",
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
      {...props}
    >
      {children}
    </div>
  );
}
