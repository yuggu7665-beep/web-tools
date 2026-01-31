"use client";

import { useEffect, useRef } from "react";

export function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Star properties
    const STAR_COUNT = 150;
    const CONNECT_DISTANCE = 120;
    const stars: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];

    // Mouse interaction
    const mouse = { x: -1000, y: -1000 };

    // Initialize stars
    for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.5, // Slow movement
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 2,
        });
    }

    const animate = () => {
        ctx.clearRect(0, 0, width, height);
        
        // Update and draw stars
        ctx.fillStyle = "rgba(100, 149, 237, 0.8)"; // Cornflower Blue ish
        
        stars.forEach((star, i) => {
            // Move
            star.x += star.vx;
            star.y += star.vy;

            // Bounce off edges
            if (star.x < 0 || star.x > width) star.vx *= -1;
            if (star.y < 0 || star.y > height) star.vy *= -1;

            // Mouse repulsion/attraction? Let's do slight attraction
            const dx = mouse.x - star.x;
            const dy = mouse.y - star.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 200) {
                 const force = (200 - distance) / 200;
                 star.vx += (dx / distance) * force * 0.02;
                 star.vy += (dy / distance) * force * 0.02;
            }

            // Draw star
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fill();

            // Connections
            for (let j = i + 1; j < stars.length; j++) {
                const other = stars[j];
                const dx = star.x - other.x;
                const dy = star.y - other.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < CONNECT_DISTANCE) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(100, 149, 237, ${1 - dist / CONNECT_DISTANCE})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(star.x, star.y);
                    ctx.lineTo(other.x, other.y);
                    ctx.stroke();
                }
            }
        });

        requestAnimationFrame(animate);
    };

    const handleResize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    const animationId = requestAnimationFrame(animate);

    return () => {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("mousemove", handleMouseMove);
        cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-10 bg-gradient-to-br from-slate-900 to-black dark:from-black dark:to-slate-900" 
      // Starting with dark background for "Universe" feel, but need to handle Light mode appropriately if toggled.
      // Actually, for "Universe" feel, it usually implies dark. 
      // If Light mode, maybe white bg with dark stars? 
      // Let's stick to CSS classes for bg control.
    />
  );
}
