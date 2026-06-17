"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

interface LoaderProps {
  onComplete: () => void;
}

/* ─── Status messages that rotate during loading ────────────────── */
const STATUS_MESSAGES = [
  "Initializing Systems…",
  "Loading Projects…",
  "Preparing Experience…",
  "Loading AI Portfolio…",
  "Rendering Interface…",
];

/* ─── Floating tech labels ──────────────────────────────────────── */
const TECH_LABELS = [
  "Python", "React", "Next.js", "FastAPI", "Supabase",
  "Machine Learning", "Data Analytics", "TypeScript",
];

export default function Loader({ onComplete }: LoaderProps) {
  const [count, setCount] = useState(0);
  const [statusIdx, setStatusIdx] = useState(0);
  const [phase, setPhase] = useState<"brand" | "counter" | "tech" | "exit">("brand");

  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  const glassRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<Array<HTMLDivElement | null>>([]);

  /* ─── Phase 1: Brand reveal ─────────────────────────────────── */
  useEffect(() => {
    if (!logoRef.current) return;
    const tl = gsap.timeline();

    // KT letters: blur → focus, scale up, opacity in
    tl.fromTo(
      logoRef.current,
      { filter: "blur(40px)", opacity: 0, scale: 0.85 },
      { filter: "blur(0px)", opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" }
    );

    // Subtle glow pulse
    tl.to(logoRef.current, {
      textShadow: "0 0 80px rgba(93, 139, 255, 0.3), 0 0 160px rgba(110, 231, 249, 0.15)",
      duration: 0.6,
      ease: "power2.inOut",
    }, "-=0.3");

    // Start particles
    tl.call(() => setPhase("counter"), [], "+=0.2");

    return () => { tl.kill(); };
  }, []);

  /* ─── Phase 2: Counter + status messages ────────────────────── */
  useEffect(() => {
    if (phase !== "counter") return;

    const duration = 2200;
    const intervalTime = 22;
    const totalSteps = duration / intervalTime;
    let step = 0;

    const timer = setInterval(() => {
      step += 1;
      const progress = Math.min(Math.round((step / totalSteps) * 100), 100);
      setCount(progress);

      // Cycle status messages
      const msgIdx = Math.min(
        Math.floor((progress / 100) * STATUS_MESSAGES.length),
        STATUS_MESSAGES.length - 1
      );
      setStatusIdx(msgIdx);

      if (progress >= 100) {
        clearInterval(timer);
        setPhase("tech");
      }
    }, intervalTime);

    // Animate counter entry
    if (counterRef.current) {
      gsap.fromTo(counterRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
      );
    }

    // Animate construction lines
    lineRefs.current.forEach((line, i) => {
      if (!line) return;
      gsap.fromTo(line,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 0.15, duration: 1.5, delay: i * 0.3, ease: "power2.inOut" }
      );
    });

    return () => clearInterval(timer);
  }, [phase]);

  /* ─── Phase 3: Tech labels float in ─────────────────────────── */
  useEffect(() => {
    if (phase !== "tech" || !techRef.current) return;

    const labels = techRef.current.querySelectorAll(".tech-label");
    const tl = gsap.timeline();

    labels.forEach((label, i) => {
      const angle = (i / labels.length) * Math.PI * 2;
      const radius = 120 + Math.random() * 80;
      tl.fromTo(
        label,
        {
          x: Math.cos(angle) * radius * 2,
          y: Math.sin(angle) * radius * 2,
          opacity: 0,
          scale: 0.5,
          filter: "blur(6px)",
        },
        {
          x: Math.cos(angle) * radius * 0.3,
          y: Math.sin(angle) * radius * 0.3,
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.5,
          ease: "power2.out",
        },
        i * 0.06
      );
    });

    // Hold briefly then exit
    tl.to(labels, {
      opacity: 0,
      scale: 0.8,
      filter: "blur(4px)",
      duration: 0.4,
      stagger: 0.03,
      ease: "power2.in",
      delay: 0.5,
    });

    tl.call(() => setPhase("exit"));

    return () => { tl.kill(); };
  }, [phase]);

  /* ─── Phase 4: Cinematic exit ───────────────────────────────── */
  useEffect(() => {
    if (phase !== "exit" || !containerRef.current) return;

    const tl = gsap.timeline({ onComplete: onComplete });

    // Logo expands and fades
    if (logoRef.current) {
      tl.to(logoRef.current, {
        scale: 1.5,
        opacity: 0,
        filter: "blur(20px)",
        duration: 0.7,
        ease: "power3.in",
      }, 0);
    }

    // Counter fades
    if (counterRef.current) {
      tl.to(counterRef.current, { opacity: 0, y: -20, duration: 0.5, ease: "power2.in" }, 0);
    }

    // Status fades
    if (statusRef.current) {
      tl.to(statusRef.current, { opacity: 0, duration: 0.4 }, 0);
    }

    // Glass panels slide away
    if (glassRef.current) {
      const panels = glassRef.current.querySelectorAll(".glass-shard");
      tl.to(panels, {
        y: (i: number) => (i % 2 === 0 ? -200 : 200),
        x: (i: number) => (i % 3 === 0 ? -150 : 150),
        opacity: 0,
        rotation: (i: number) => (i % 2 === 0 ? 15 : -15),
        duration: 0.8,
        stagger: 0.05,
        ease: "power3.in",
      }, 0.1);
    }

    // Construction lines dissolve
    lineRefs.current.forEach((line) => {
      if (!line) return;
      tl.to(line, { opacity: 0, scaleX: 0, duration: 0.5 }, 0);
    });

    // Container itself
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.in",
    }, 0.5);

    return () => { tl.kill(); };
  }, [phase, onComplete]);

  /* ─── Mouse‑reactive 3D tilt on loader ──────────────────────── */
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = e;
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (clientX - cx) / cx;
    const dy = (clientY - cy) / cy;

    gsap.to(containerRef.current, {
      rotationY: dx * 2,
      rotationX: -dy * 2,
      duration: 0.8,
      ease: "power2.out",
      overwrite: "auto",
    });
  }, []);

  /* ════════════════════════════════════════════════════════════════ */
  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col justify-between overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #07111F 0%, #0a1525 40%, #07111F 100%)",
        perspective: "1500px",
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
    >
      {/* ── Ambient glow orbs ─────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #5D8BFF 0%, transparent 70%)", animation: "pulse 4s ease-in-out infinite" }} />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle, #6EE7F9 0%, transparent 70%)", animation: "pulse 5s ease-in-out infinite 1s" }} />
      </div>

      {/* ── Construction lines (digital world building) ────────── */}
      <div className="absolute inset-0 pointer-events-none">
        {[15, 30, 50, 70, 85].map((top, i) => (
          <div
            key={i}
            ref={(el) => { lineRefs.current[i] = el; }}
            className="absolute left-0 right-0 h-px origin-left"
            style={{
              top: `${top}%`,
              background: `linear-gradient(90deg, transparent 0%, rgba(93, 139, 255, 0.12) 50%, transparent 100%)`,
              opacity: 0,
            }}
          />
        ))}
      </div>

      {/* ── Glass shards (decorative panels) ───────────────────── */}
      <div ref={glassRef} className="absolute inset-0 pointer-events-none">
        {[
          { top: "10%", left: "5%",   w: 120, h: 80,  rot: 12 },
          { top: "20%", right: "8%",  w: 100, h: 140, rot: -8 },
          { top: "60%", left: "10%",  w: 150, h: 60,  rot: 5 },
          { top: "70%", right: "15%", w: 80,  h: 100, rot: -15 },
          { top: "40%", left: "40%",  w: 60,  h: 90,  rot: 20 },
        ].map((s, i) => (
          <div
            key={i}
            className="glass-shard absolute rounded-lg"
            style={{
              top: s.top,
              left: (s as any).left,
              right: (s as any).right,
              width: s.w,
              height: s.h,
              transform: `rotate(${s.rot}deg)`,
              background: "rgba(18, 31, 52, 0.25)",
              border: "1px solid rgba(255, 255, 255, 0.04)",
              backdropFilter: "blur(4px)",
            }}
          />
        ))}
      </div>

      {/* ── Top bar ───────────────────────────────────────────── */}
      <div className="relative z-10 flex justify-between items-start p-6 md:p-12">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center font-mono text-xs font-black"
            style={{ color: "#6EE7F9" }}>
            KT
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-[0.3em] text-zinc-600 font-mono">
              Engineering Studio
            </span>
            <span className="text-xs font-medium text-zinc-400">Kareem Tamer</span>
          </div>
        </div>
        <div className="text-right hidden sm:block">
          <span className="text-[9px] uppercase tracking-[0.3em] text-zinc-600 font-mono block">
            Focus Stack
          </span>
          <span className="text-xs text-zinc-500">AI Pipelines · Full‑Stack · SaaS</span>
        </div>
      </div>

      {/* ── Center: Logo + Tech reveal ────────────────────────── */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center">
        {/* Brand logo */}
        <div ref={logoRef} className="mb-8 select-none" style={{ opacity: 0 }}>
          <div className="text-8xl md:text-[10rem] font-bold tracking-tighter leading-none text-white"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}>
            KT
          </div>
          <div className="text-center mt-2">
            <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-zinc-500 font-mono">
              Kareem Tamer Studio
            </span>
          </div>
        </div>

        {/* Tech labels floating ring */}
        <div ref={techRef} className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ display: phase === "tech" ? "flex" : "none" }}>
          {TECH_LABELS.map((tech, i) => (
            <span
              key={i}
              className="tech-label absolute text-[10px] md:text-xs font-mono uppercase tracking-wider px-3 py-1.5 rounded-full border"
              style={{
                background: "rgba(93, 139, 255, 0.08)",
                borderColor: "rgba(93, 139, 255, 0.15)",
                color: "#5D8BFF",
                opacity: 0,
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* ── Bottom: Status + Counter ──────────────────────────── */}
      <div className="relative z-10 p-6 md:p-12">
        {/* Status message */}
        <div ref={statusRef} className="mb-4">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-600 transition-all duration-300">
            {STATUS_MESSAGES[statusIdx]}
          </span>
        </div>

        <div className="flex justify-between items-end border-t border-white/[0.04] pt-6">
          <div ref={counterRef} className="flex items-baseline gap-1" style={{ opacity: 0 }}>
            <span className="text-6xl md:text-8xl tracking-tighter text-white font-mono font-light tabular-nums">
              {String(count).padStart(3, "0")}
            </span>
            <span className="text-xl md:text-3xl text-zinc-600 font-mono">%</span>
          </div>
          <div className="hidden md:block max-w-xs text-right">
            <span className="text-[9px] font-mono uppercase tracking-wider text-zinc-700 leading-relaxed block">
              Built with Next.js 16 · React 19
            </span>
            <span className="text-[9px] font-mono uppercase tracking-wider text-zinc-700">
              Midnight Navy Design System
            </span>
          </div>
        </div>
      </div>

      {/* ── Keyframes ─────────────────────────────────────────── */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.06; }
          50% { transform: scale(1.15); opacity: 0.1; }
        }
      `}</style>
    </div>
  );
}
