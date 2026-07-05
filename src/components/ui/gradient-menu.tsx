"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface GradientMenuItem {
  title: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
}

interface GradientMenuProps extends React.HTMLAttributes<HTMLUListElement> {
  items: GradientMenuItem[];
}

/**
 * Circular icon buttons that expand on hover/focus to reveal their label,
 * with the brand blue-cyan gradient and a soft glow behind each button.
 */
export default function GradientMenu({
  items,
  className,
  ...props
}: GradientMenuProps) {
  return (
    <ul
      className={cn("flex flex-wrap items-center justify-center gap-4", className)}
      {...props}
    >
      {items.map((item) => (
        <li key={item.title} className="group relative">
          {/* Soft glow blur behind the button */}
          <span
            aria-hidden="true"
            className="
              pointer-events-none absolute inset-0 rounded-full
              bg-[linear-gradient(135deg,#67F3CE,#4899EA)]
              opacity-0 blur-xl transition-opacity duration-300
              group-hover:opacity-70 group-focus-within:opacity-70
            "
          />
          <a
            href={item.href ?? "#"}
            onClick={item.onClick}
            aria-label={item.title}
            className="
              relative flex h-14 w-14 items-center justify-center
              overflow-hidden rounded-full border border-white/15 bg-[#0D0D0D]
              text-white
              transition-all duration-300 ease-out
              group-hover:w-44 group-hover:shadow-[0_0_35px_-5px_rgba(72,153,234,0.6)]
              focus-visible:w-44 focus-visible:outline-none
              focus-visible:ring-2 focus-visible:ring-[#67F3CE]
            "
          >
            {/* Gradient fill revealed on hover / keyboard focus */}
            <span
              aria-hidden="true"
              className="
                absolute inset-0 rounded-full
                bg-[linear-gradient(135deg,#67F3CE,#4899EA)]
                opacity-0 transition-opacity duration-300
                group-hover:opacity-100 group-focus-within:opacity-100
              "
            />
            <span
              aria-hidden="true"
              className="
                relative z-10 flex items-center justify-center text-[22px]
                transition-all duration-300
                group-hover:scale-0 group-hover:opacity-0
                group-focus-within:scale-0 group-focus-within:opacity-0
              "
            >
              {item.icon}
            </span>
            {/* Dark label on the light gradient for readable contrast */}
            <span
              className="
                absolute z-10 scale-0 whitespace-nowrap font-display text-sm
                font-semibold uppercase tracking-wider text-[#050505] opacity-0
                transition-all duration-300 delay-75
                group-hover:scale-100 group-hover:opacity-100
                group-focus-within:scale-100 group-focus-within:opacity-100
              "
            >
              {item.title}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
