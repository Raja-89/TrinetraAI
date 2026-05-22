import { useEffect, useRef, useCallback } from "react";

interface DotGridProps {
  dotSize?: number;
  gap?: number;
  baseColor?: string;
  activeColor?: string;
  proximity?: number;
  speedTrigger?: number;
  shockRadius?: number;
  shockStrength?: number;
  maxSpeed?: number;
  resistance?: number;
  returnDuration?: number;
  className?: string;
}

interface Dot {
  ox: number;
  oy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  active: number;
}

interface ShockWave {
  x: number;
  y: number;
  r: number;
  maxR: number;
  strength: number;
}

function parseColor(hex: string): [number, number, number] {
  const c = hex.replace("#", "");
  if (c.length === 3) {
    return [
      parseInt(c[0] + c[0], 16),
      parseInt(c[1] + c[1], 16),
      parseInt(c[2] + c[2], 16),
    ];
  }
  return [parseInt(c.slice(0, 2), 16), parseInt(c.slice(2, 4), 16), parseInt(c.slice(4, 6), 16)];
}

function lerpColor(a: [number, number, number], b: [number, number, number], t: number): string {
  const r = Math.round(a[0] + (b[0] - a[0]) * t);
  const g = Math.round(a[1] + (b[1] - a[1]) * t);
  const bl = Math.round(a[2] + (b[2] - a[2]) * t);
  return `rgb(${r},${g},${bl})`;
}

export function DotGrid({
  dotSize = 4,
  gap = 34,
  baseColor = "#716565",
  activeColor = "#5227FF",
  proximity = 120,
  speedTrigger = 250,
  shockRadius = 300,
  shockStrength = 5,
  maxSpeed = 5000,
  resistance = 600,
  returnDuration = 1.5,
  className = "",
}: DotGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const shockWavesRef = useRef<ShockWave[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999, vx: 0, vy: 0, lastX: -9999, lastY: -9999, lastTime: 0 });
  const rafRef = useRef<number>(0);
  const baseRgb = parseColor(baseColor);
  const activeRgb = parseColor(activeColor);

  const buildGrid = useCallback((canvas: HTMLCanvasElement) => {
    const W = canvas.width;
    const H = canvas.height;
    const step = dotSize + gap;
    const cols = Math.ceil(W / step);
    const rows = Math.ceil(H / step);
    const dots: Dot[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const ox = c * step + step / 2;
        const oy = r * step + step / 2;
        dots.push({ ox, oy, x: ox, y: oy, vx: 0, vy: 0, active: 0 });
      }
    }
    dotsRef.current = dots;
  }, [dotSize, gap]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      buildGrid(canvas);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement!);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const nx = e.clientX - rect.left;
      const ny = e.clientY - rect.top;
      const now = performance.now();
      const dt = Math.max(now - mouseRef.current.lastTime, 1);
      const dx = nx - mouseRef.current.lastX;
      const dy = ny - mouseRef.current.lastY;
      mouseRef.current.vx = (dx / dt) * 1000;
      mouseRef.current.vy = (dy / dt) * 1000;
      const speed = Math.sqrt(mouseRef.current.vx ** 2 + mouseRef.current.vy ** 2);

      if (speed > speedTrigger) {
        shockWavesRef.current.push({ x: nx, y: ny, r: 0, maxR: shockRadius, strength: shockStrength });
      }

      mouseRef.current.lastX = nx;
      mouseRef.current.lastY = ny;
      mouseRef.current.lastTime = now;
      mouseRef.current.x = nx;
      mouseRef.current.y = ny;
    };

    const onMouseLeave = () => {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    let last = performance.now();

    const animate = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const sw = shockWavesRef.current;
      for (let i = sw.length - 1; i >= 0; i--) {
        sw[i].r += 800 * dt;
        if (sw[i].r > sw[i].maxR) sw.splice(i, 1);
      }

      const dots = dotsRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const returnForce = 1 / returnDuration;

      for (const dot of dots) {
        let fx = 0;
        let fy = 0;

        const dxm = dot.x - mx;
        const dym = dot.y - my;
        const distM = Math.sqrt(dxm * dxm + dym * dym);
        if (distM < proximity && distM > 0) {
          const force = ((proximity - distM) / proximity) * maxSpeed * dt;
          fx += (dxm / distM) * force;
          fy += (dym / distM) * force;
          dot.active = Math.min(1, dot.active + dt * 4);
        } else {
          dot.active = Math.max(0, dot.active - dt * 2);
        }

        for (const s of sw) {
          const dxs = dot.ox - s.x;
          const dys = dot.oy - s.y;
          const distS = Math.sqrt(dxs * dxs + dys * dys);
          const ring = Math.abs(distS - s.r);
          if (ring < 40) {
            const factor = (1 - ring / 40) * s.strength * (1 - s.r / s.maxR);
            const norm = distS > 0 ? distS : 1;
            fx += (dxs / norm) * factor * 60;
            fy += (dys / norm) * factor * 60;
          }
        }

        dot.vx += fx;
        dot.vy += fy;

        const toOx = dot.ox - dot.x;
        const toOy = dot.oy - dot.y;
        dot.vx += toOx * returnForce * resistance * dt;
        dot.vy += toOy * returnForce * resistance * dt;

        const dampening = Math.exp(-resistance * dt * 0.008);
        dot.vx *= dampening;
        dot.vy *= dampening;

        dot.x += dot.vx * dt;
        dot.y += dot.vy * dt;

        const disp = Math.sqrt((dot.x - dot.ox) ** 2 + (dot.y - dot.oy) ** 2);
        const t = Math.min(disp / 20, 1) * 0.5 + dot.active * 0.5;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dotSize / 2, 0, Math.PI * 2);
        ctx.fillStyle = lerpColor(baseRgb, activeRgb, t);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [buildGrid, proximity, speedTrigger, shockRadius, shockStrength, maxSpeed, resistance, returnDuration, dotSize, baseRgb, activeRgb]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ display: "block" }}
    />
  );
}
