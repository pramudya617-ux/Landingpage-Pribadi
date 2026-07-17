"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

export interface GalleryItem {
  image: string;
  title: string;
  caption: string;
}

interface HorizontalScrollGalleryProps {
  /** Rendered as faces on a 3D cylinder — pass at most 5 for a balanced spin. */
  items: GalleryItem[];
  className?: string;
  /** Rendered in the sticky viewport below the caption (e.g. a CTA link). */
  children?: React.ReactNode;
  /** Rendered pinned to the bottom of the sticky viewport (e.g. nav links). */
  footer?: React.ReactNode;
}

const imgTransition = { duration: 0.15, ease: [0.32, 0.72, 0, 1] as const };

/**
 * Scroll-hijacked hero: the section provides a tall vertical scroll runway
 * while its sticky viewport spins a 3D cylinder of image cards driven by
 * scroll progress (no drag — dragging on the x-axis is what breaks native
 * vertical scrolling on mobile). The card facing the viewer is the active
 * one; once the last card comes to front, the runway ends and normal page
 * scroll continues into the next section.
 */
export default function HorizontalScrollGallery({
  items,
  className,
  children,
  footer,
}: HorizontalScrollGalleryProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const rotation = useMotionValue(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomed, setZoomed] = useState<number | null>(null);
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const update = () => setIsSmall(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const n = items.length;
  const stepDeg = 360 / n;
  const faceWidth = isSmall ? 118 : 210;
  // Desktop gets extra spread between faces so cards read as separated,
  // like a wide carousel, instead of overlapping; mobile keeps the tight fit.
  const cylinderWidth = isSmall ? faceWidth * n : faceWidth * n * 1.6;
  const radius = cylinderWidth / (2 * Math.PI);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

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
        if (Math.abs(next - current) > 0.0002 || current === 0) {
          current = next;
          rotation.set(-next * stepDeg * (n - 1));
          setActiveIndex(Math.round(next * (n - 1)));
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [n, stepDeg, rotation]);

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

        {/* Cylinder stage */}
        <div
          className="flex h-[46vh] min-h-[280px] w-full items-center justify-center"
          style={{ perspective: "1200px" }}
        >
          <motion.div
            className="relative flex h-full items-center justify-center"
            style={{
              width: cylinderWidth,
              rotateY: rotation,
              transformStyle: "preserve-3d",
            }}
          >
            {items.map((item, i) => {
              const isActive = i === activeIndex;
              return (
                <button
                  type="button"
                  key={item.title}
                  onClick={() => setZoomed(i)}
                  aria-label={`Perbesar ${item.title}`}
                  className={cn(
                    "absolute flex items-center justify-center overflow-hidden rounded-xl border",
                    "cursor-pointer transition-[filter,border-color] duration-500"
                  )}
                  style={{
                    width: faceWidth,
                    aspectRatio: "3 / 4",
                    transform: `rotateY(${i * stepDeg}deg) translateZ(${radius}px)`,
                    borderColor: isActive
                      ? "rgba(103,243,206,0.5)"
                      : "rgba(255,255,255,0.1)",
                    boxShadow: isActive
                      ? "0 0 50px -12px rgba(72,153,234,0.6)"
                      : "none",
                    filter: isActive
                      ? "grayscale(0) brightness(1)"
                      : "grayscale(0.7) brightness(0.55)",
                  }}
                >
                  <motion.img
                    layoutId={`hero-img-${i}`}
                    src={item.image}
                    alt={item.title}
                    draggable={false}
                    loading={i === 0 ? "eager" : "lazy"}
                    className="pointer-events-none h-full w-full select-none object-cover"
                    initial={{ filter: "blur(4px)" }}
                    animate={{ filter: "blur(0px)" }}
                    transition={imgTransition}
                  />
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* Active item caption — remounts on change to replay the fade */}
        <div
          key={activeIndex}
          className="pointer-events-none mt-6 flex flex-col items-center gap-2 px-6 text-center"
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

      {/* Tap-to-zoom overlay */}
      <AnimatePresence>
        {zoomed !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomed(null)}
            className="fixed inset-0 z-[60] flex cursor-zoom-out items-center justify-center bg-black/80 p-6 backdrop-blur-sm"
          >
            <motion.img
              layoutId={`hero-img-${zoomed}`}
              src={items[zoomed].image}
              alt={items[zoomed].title}
              className="max-h-[80vh] max-w-full rounded-2xl border border-[#67F3CE]/30 object-contain shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
