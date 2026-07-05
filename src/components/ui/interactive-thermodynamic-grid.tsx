"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface ThermodynamicGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Distance in px between grid dots. */
  spacing?: number;
  /** Radius in px around the pointer that receives heat. */
  heatRadius?: number;
  /** 0..1 — how quickly heat fades each frame (higher = longer trail). */
  decay?: number;
}

/**
 * Color stops for the "thermal" ramp, from cold to hot:
 * near-black → dark gray → brand blue → brand cyan → near-white.
 */
const STOPS: Array<{ t: number; color: [number, number, number] }> = [
  { t: 0.0, color: [16, 16, 18] }, // cold: near black
  { t: 0.18, color: [38, 44, 52] }, // low: dark gray
  { t: 0.45, color: [72, 153, 234] }, // medium: #4899EA
  { t: 0.75, color: [103, 243, 206] }, // high: #67F3CE
  { t: 1.0, color: [235, 255, 250] }, // highlight: very light cyan
];

function getThermalColor(t: number): string {
  const clamped = Math.min(1, Math.max(0, t));
  for (let i = 1; i < STOPS.length; i++) {
    if (clamped <= STOPS[i].t) {
      const a = STOPS[i - 1];
      const b = STOPS[i];
      const local = (clamped - a.t) / (b.t - a.t);
      const r = Math.round(a.color[0] + (b.color[0] - a.color[0]) * local);
      const g = Math.round(a.color[1] + (b.color[1] - a.color[1]) * local);
      const bl = Math.round(a.color[2] + (b.color[2] - a.color[2]) * local);
      return `rgb(${r},${g},${bl})`;
    }
  }
  return "rgb(235,255,250)";
}

export default function ThermodynamicGrid({
  spacing = 26,
  heatRadius = 130,
  decay = 0.94,
  className,
  ...props
}: ThermodynamicGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let heat = new Float32Array(0);
    let raf = 0;
    const pointer = { x: -9999, y: -9999, active: false };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(width / spacing) + 1;
      rows = Math.ceil(height / spacing) + 1;
      heat = new Float32Array(cols * rows);
    };

    const injectHeat = () => {
      if (!pointer.active) return;
      const r = heatRadius;
      const minCol = Math.max(0, Math.floor((pointer.x - r) / spacing));
      const maxCol = Math.min(cols - 1, Math.ceil((pointer.x + r) / spacing));
      const minRow = Math.max(0, Math.floor((pointer.y - r) / spacing));
      const maxRow = Math.min(rows - 1, Math.ceil((pointer.y + r) / spacing));
      for (let row = minRow; row <= maxRow; row++) {
        for (let col = minCol; col <= maxCol; col++) {
          const dx = col * spacing - pointer.x;
          const dy = row * spacing - pointer.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < r) {
            const falloff = 1 - dist / r;
            const idx = row * cols + col;
            heat[idx] = Math.min(1, heat[idx] + falloff * falloff * 0.55);
          }
        }
      }
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      const t = time * 0.001;
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const idx = row * cols + col;
          // Gentle ambient shimmer so the grid feels alive without the mouse.
          const ambient =
            0.045 +
            0.035 * Math.sin(t * 0.8 + col * 0.35 + row * 0.22) *
              Math.cos(t * 0.5 + row * 0.4);
          const value = Math.min(1, heat[idx] + Math.max(0, ambient));
          const x = col * spacing;
          const y = row * spacing;
          const radius = 1 + value * 2.4;
          ctx.fillStyle = getThermalColor(value);
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const tick = (time: number) => {
      injectHeat();
      for (let i = 0; i < heat.length; i++) heat[i] *= decay;
      draw(time);
      raf = requestAnimationFrame(tick);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active =
        pointer.x >= 0 &&
        pointer.y >= 0 &&
        pointer.x <= rect.width &&
        pointer.y <= rect.height;
    };
    const onPointerLeave = () => {
      pointer.active = false;
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(container);

    if (reducedMotion) {
      draw(0);
    } else {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerleave", onPointerLeave);
      raf = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [spacing, heatRadius, decay]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      {...props}
    >
      <canvas ref={canvasRef} className="block" />
      {/* Soft vignette so content stays readable over the grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,#050505_100%)]" />
    </div>
  );
}
