"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface FlowFieldBackgroundProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Overall opacity of the effect layer. */
  intensity?: number;
}

const BLUE: [number, number, number] = [72, 153, 234]; // #4899EA
const CYAN: [number, number, number] = [103, 243, 206]; // #67F3CE

interface Particle {
  x: number;
  y: number;
  speed: number;
  color: string;
}

/**
 * Full-page flow-field particle background: particles drift along a
 * sine/cosine vector field leaving soft blue-cyan trails on near-black.
 */
export default function FlowFieldBackground({
  intensity = 0.5,
  className,
  ...props
}: FlowFieldBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let raf = 0;
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];

    const makeColor = () => {
      const t = Math.random();
      const r = Math.round(BLUE[0] + (CYAN[0] - BLUE[0]) * t);
      const g = Math.round(BLUE[1] + (CYAN[1] - BLUE[1]) * t);
      const b = Math.round(BLUE[2] + (CYAN[2] - BLUE[2]) * t);
      return `rgba(${r},${g},${b},0.4)`;
    };

    const spawn = (): Particle => ({
      x: Math.random() * width,
      y: Math.random() * height,
      speed: 0.5 + Math.random() * 1.1,
      color: makeColor(),
    });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth * dpr;
      height = window.innerHeight * dpr;
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      const count = Math.max(
        180,
        Math.min(650, Math.round((width * height) / 9000))
      );
      particles = Array.from({ length: count }, spawn);
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, width, height);
    };

    const flowAngle = (x: number, y: number, t: number) =>
      Math.sin(x * 0.0016 + t * 0.00012) * 1.9 +
      Math.cos(y * 0.0019 - t * 0.00009) * 1.9 +
      Math.sin((x + y) * 0.0007 + t * 0.00005);

    const step = (t: number) => {
      ctx.fillStyle = "rgba(5,5,5,0.055)";
      ctx.fillRect(0, 0, width, height);
      ctx.lineWidth = 1;
      for (const p of particles) {
        const angle = flowAngle(p.x, p.y, t);
        const nx = p.x + Math.cos(angle) * p.speed;
        const ny = p.y + Math.sin(angle) * p.speed;
        if (nx < 0 || nx > width || ny < 0 || ny > height) {
          // Respawn instead of wrapping to avoid full-screen streak lines.
          Object.assign(p, spawn());
          continue;
        }
        ctx.strokeStyle = p.color;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(nx, ny);
        ctx.stroke();
        p.x = nx;
        p.y = ny;
      }
    };

    const tick = (time: number) => {
      step(time);
      raf = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);

    if (reducedMotion) {
      // Render one static, pre-advanced frame instead of animating.
      for (let i = 0; i < 240; i++) step(i * 16);
    } else {
      raf = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none fixed inset-0", className)}
      style={{ opacity: intensity }}
      {...props}
    >
      <canvas ref={canvasRef} className="block" />
    </div>
  );
}
