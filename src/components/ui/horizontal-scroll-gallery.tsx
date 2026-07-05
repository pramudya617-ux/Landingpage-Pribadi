"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface GalleryItem {
  image: string;
  title: string;
  caption: string;
}

interface HorizontalScrollGalleryProps {
  items: GalleryItem[];
  className?: string;
  /** Rendered in the sticky viewport below the caption (e.g. a CTA link). */
  children?: React.ReactNode;
  /** Rendered pinned to the bottom of the sticky viewport (e.g. nav links). */
  footer?: React.ReactNode;
}

/**
 * Scroll-hijacked hero: the section provides a tall vertical scroll runway
 * while its sticky viewport translates the gallery horizontally with smooth
 * inertia (lerp). The card nearest the center scales up into focus; the
 * others stay small, dimmed and desaturated.
 */
export default function HorizontalScrollGallery({
  items,
  className,
  children,
  footer,
}: HorizontalScrollGalleryProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [viewport, setViewport] = useState({ w: 1280, h: 800 });

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const onResize = () =>
      setViewport({ w: window.innerWidth, h: window.innerHeight });
    onResize();
    window.addEventListener("resize", onResize);

    let raf = 0;
    let current = 0;
    const tick = () => {
      const el = sectionRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const total = el.offsetHeight - window.innerHeight;
        const target =
          total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
        const next = reducedMotion
          ? target
          : current + (target - current) * 0.075;
        if (Math.abs(next - current) > 0.00015 || current === 0) {
          current = next;
          setProgress(next);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const n = items.length;
  const spacing = Math.max(220, Math.min(viewport.w * 0.26, 440));
  const baseWidth = Math.max(84, Math.min(viewport.w * 0.09, 120));
  const activeIndex = Math.min(n - 1, Math.max(0, Math.round(progress * (n - 1))));
  const active = items[activeIndex];

  return (
    <section
      ref={sectionRef}
      className={cn("relative", className)}
      style={{ height: `${Math.max(300, n * 62)}vh` }}
    >
      <div className="sticky top-0 flex h-dvh flex-col items-center justify-center overflow-hidden">
        {/* Corner bracket ornament, like a viewfinder */}
        <span
          aria-hidden="true"
          className="absolute right-[12%] top-[18%] font-mono text-sm tracking-[0.5em] text-white/25"
        >
          [ ]
        </span>

        {/* Gallery stage */}
        <div className="relative h-[46vh] min-h-[300px] w-full">
          {items.map((item, i) => {
            const x = (i - progress * (n - 1)) * spacing;
            const d = Math.abs(x) / spacing; // distance in card units
            const focus = Math.max(0, 1 - Math.min(d, 1));
            const scale = 1 + focus * 1.25;
            // Slight parallax: outer cards drift a touch faster
            const px = x * (1 + 0.09 * Math.min(d, 3));
            const py = Math.min(d, 3) * 7;
            const isActive = focus > 0.55;
            return (
              <div
                key={item.title}
                className="absolute left-1/2 top-1/2 will-change-transform"
                style={{
                  transform: `translate(-50%, -50%) translate3d(${px}px, ${py}px, 0) scale(${scale})`,
                  zIndex: 50 - Math.round(d * 10),
                }}
              >
                <div
                  className={cn(
                    "relative overflow-hidden rounded-lg border",
                    "transition-[filter,border-color,box-shadow] duration-500",
                    isActive
                      ? "border-[#67F3CE]/50 shadow-[0_0_50px_-12px_rgba(72,153,234,0.6)]"
                      : "border-white/10"
                  )}
                  style={{
                    width: baseWidth,
                    height: Math.round(baseWidth * 1.25),
                    filter: isActive
                      ? "grayscale(0) brightness(1)"
                      : "grayscale(1) brightness(0.5)",
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    draggable={false}
                    loading={i < 3 ? "eager" : "lazy"}
                    className="h-full w-full select-none object-cover"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Active item caption — remounts on change to replay the fade */}
        <div
          key={activeIndex}
          className="pointer-events-none mt-2 flex flex-col items-center gap-2 px-6 text-center"
          style={{ animation: "hero-caption 0.5s ease-out both" }}
        >
          <p className="font-mono text-xs tracking-[0.35em] text-[#67F3CE]/80">
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(n).padStart(2, "0")}
          </p>
          <p className="font-display text-lg font-semibold text-white sm:text-xl">
            {active.title}
          </p>
          <p className="max-w-md text-sm leading-relaxed text-white/50">
            {active.caption}
          </p>
        </div>

        {children}

        {footer && (
          <div className="absolute inset-x-0 bottom-0">{footer}</div>
        )}
      </div>
    </section>
  );
}
