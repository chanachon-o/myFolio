"use client";

import { useEffect, useRef } from "react";

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationFrame: number;

    const resize = () => {
      width = canvas.parentElement?.clientWidth || 0;
      height = canvas.parentElement?.clientHeight || 0;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", resize);
    resize();

    const nodeCount = 42;
    const nodes: Array<{ x: number; y: number; vx: number; vy: number; r: number }> = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: 1.2 + Math.random() * 2.5,
      });
    }

    const draw = () => {
      const dpr = window.devicePixelRatio || 1;
      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width / dpr, height / dpr);

      // subtle radial glow near center
      const grad = ctx.createRadialGradient(
        width / dpr / 2,
        height / dpr / 2,
        0,
        width / dpr / 2,
        height / dpr / 2,
        Math.max(width, height) / dpr,
      );
      grad.addColorStop(0, "rgba(16, 185, 129, 0.06)");
      grad.addColorStop(1, "rgba(16, 185, 129, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width / dpr, height / dpr);

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width / dpr) n.vx *= -1;
        if (n.y < 0 || n.y > height / dpr) n.vy *= -1;

        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const dx = n.x - m.x;
          const dy = n.y - m.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 140) {
            const opacity = 1 - dist / 140;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${opacity * 0.35})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = "#10b981";
        ctx.globalAlpha = 0.45;
        ctx.fill();
      }

      ctx.restore();
      animationFrame = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 -z-10 block w-full h-full bg-[#003B2B]"
      aria-hidden="true"
    />
  );
}
