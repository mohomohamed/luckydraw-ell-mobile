"use client";
import React, { useEffect, useRef } from "react";

interface ConfettiCanvasProps {
  active: boolean;
}

class Flake {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  decay: number;
  gravity: number;
  friction: number;
  isGold: boolean;
  rotation: number;
  rotSpeed: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 9 + 4;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed - 3.2;
    this.size = Math.random() * 5 + 2.5;
    this.life = 1;
    this.decay = Math.random() * 0.007 + 0.005;
    this.gravity = 0.14;
    this.friction = 0.985;
    this.isGold = Math.random() > 0.4;
    this.rotation = Math.random() * Math.PI;
    this.rotSpeed = (Math.random() - 0.5) * 0.14;
  }

  update() {
    this.vx *= this.friction;
    this.vy *= this.friction;
    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;
    this.rotation += this.rotSpeed;
    this.life -= this.decay;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.globalAlpha = Math.max(0, this.life);

    if (this.isGold) {
      ctx.fillStyle = "#e5c158";
      ctx.shadowColor = "rgba(229, 193, 88, 0.6)";
    } else {
      ctx.fillStyle = "#e2e4e1";
      ctx.shadowColor = "rgba(255, 255, 255, 0.4)";
    }
    ctx.shadowBlur = 8;
    ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * 1.5);
    ctx.restore();
  }
}

export default function ConfettiCanvas({ active }: ConfettiCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Flake[] = [];
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    for (let i = 0; i < 160; i++) {
      particles.push(
        new Flake(
          centerX + (Math.random() - 0.5) * 90,
          centerY + (Math.random() - 0.5) * 70
        )
      );
    }

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw(ctx);
        if (p.life <= 0) {
          particles.splice(i, 1);
        }
      }

      if (particles.length > 0) {
        animId = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    animId = requestAnimationFrame(render);

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-screen h-screen pointer-events-none z-[10001]"
    />
  );
}
