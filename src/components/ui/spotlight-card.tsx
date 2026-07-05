"use client";

import React, { useRef } from "react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * Dark glass card with a blue-cyan spotlight that follows the pointer
 * and a gradient border glow on hover.
 */
export default function SpotlightCard({
  children,
  className,
  ...props
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    card.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={cn(
        "group relative overflow-hidden rounded-2xl",
        "border border-white/10 bg-[#0D0D0D]/80 backdrop-blur-md",
        "transition-all duration-300",
        "hover:border-[#67F3CE]/40 hover:shadow-[0_0_40px_-8px_rgba(72,153,234,0.45)]",
        className
      )}
      {...props}
    >
      {/* Pointer-following spotlight */}
      <div
        className="
          pointer-events-none absolute inset-0 z-0
          opacity-0 transition-opacity duration-300 group-hover:opacity-100
        "
        style={{
          background:
            "radial-gradient(420px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(103,243,206,0.12), rgba(72,153,234,0.08) 40%, transparent 70%)",
        }}
      />
      {/* Static top edge highlight */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-px bg-gradient-to-r from-transparent via-[#67F3CE]/50 to-transparent" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
