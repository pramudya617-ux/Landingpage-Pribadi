"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface AnimatedGradientFrameProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function AnimatedGradientFrame({
  children,
  className,
  ...props
}: AnimatedGradientFrameProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl p-[1.5px]",
        "bg-black/60",
        className
      )}
      {...props}
    >
      <div
        className="
          absolute inset-[-50%]
          animate-[spin_6s_linear_infinite]
          bg-[conic-gradient(from_0deg,transparent_0deg,#67F3CE_80deg,#4899EA_150deg,transparent_240deg,#67F3CE_320deg,transparent_360deg)]
        "
      />

      <div
        className="
          absolute inset-0
          rounded-3xl
          bg-[linear-gradient(135deg,#67F3CE,#4899EA)]
          opacity-20
          blur-xl
        "
      />

      <div
        className="
          relative z-10
          rounded-3xl
          bg-[#050505]/90
          backdrop-blur-xl
        "
      >
        {children}
      </div>
    </div>
  );
}
