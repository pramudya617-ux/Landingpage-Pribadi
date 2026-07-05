"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface CardStackItem {
  title: string;
  category: string;
  description: string;
  image: string;
}

interface CardStackProps {
  items: CardStackItem[];
  /** Auto-advance interval in ms. */
  interval?: number;
  className?: string;
}

/**
 * Stacked portfolio cards: the front card slides out to the right and
 * re-enters at the back of the stack, auto-advancing on a timer
 * (paused on hover) or on click/keyboard.
 */
export default function CardStack({
  items,
  interval = 4500,
  className,
}: CardStackProps) {
  const [order, setOrder] = useState<number[]>(() =>
    items.map((_, i) => i)
  );
  const [leaving, setLeaving] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const busyRef = useRef(false);

  const advance = () => {
    if (busyRef.current) return;
    busyRef.current = true;
    setLeaving(order[0]);
    window.setTimeout(() => {
      setOrder((prev) => [...prev.slice(1), prev[0]]);
      setLeaving(null);
      busyRef.current = false;
    }, 450);
  };

  useEffect(() => {
    if (paused) return;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reducedMotion) return;
    const id = window.setInterval(advance, interval);
    return () => window.clearInterval(id);
  });

  return (
    <div
      className={cn("flex flex-col items-center gap-6", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative h-[430px] w-full max-w-sm">
        {order.map((itemIndex, pos) => {
          const item = items[itemIndex];
          const isLeaving = leaving === itemIndex;
          const isFront = pos === 0 && !isLeaving;
          return (
            <button
              key={item.title}
              type="button"
              onClick={advance}
              aria-label={
                isFront ? `${item.title} — tampilkan kartu berikutnya` : item.title
              }
              tabIndex={isFront ? 0 : -1}
              className={cn(
                "absolute inset-0 cursor-pointer overflow-hidden rounded-2xl border text-left",
                "bg-[#0D0D0D]/95 backdrop-blur-md",
                "transition-all duration-[450ms] ease-[cubic-bezier(0.34,1.2,0.64,1)]",
                isFront
                  ? "border-[#67F3CE]/40 shadow-[0_0_45px_-10px_rgba(72,153,234,0.5)]"
                  : "border-white/10"
              )}
              style={{
                zIndex: items.length - pos,
                transform: isLeaving
                  ? "translateX(115%) rotate(7deg)"
                  : `translateY(${pos * -16}px) scale(${1 - pos * 0.05})`,
                opacity: isLeaving ? 0 : Math.max(0.35, 1 - pos * 0.18),
              }}
            >
              <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#67F3CE]/60 to-transparent" />
              <div className="h-44 w-full overflow-hidden">
                <img
                  src={item.image}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-3 p-6">
                <span className="w-fit rounded-full border border-[#4899EA]/40 bg-[#4899EA]/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-[#67F3CE]">
                  {item.category}
                </span>
                <h3 className="font-display text-lg font-semibold leading-snug text-white">
                  {item.title}
                </h3>
                <p className="line-clamp-4 text-sm leading-relaxed text-white/55">
                  {item.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Position dots */}
      <div className="flex items-center gap-2" aria-hidden="true">
        {items.map((item, i) => (
          <span
            key={item.title}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              order[0] === i
                ? "w-6 bg-[linear-gradient(90deg,#67F3CE,#4899EA)]"
                : "w-1.5 bg-white/20"
            )}
          />
        ))}
      </div>
    </div>
  );
}
