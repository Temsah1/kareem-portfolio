"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight, Sparkles, Code2, Database, Terminal, ArrowUpRight } from "lucide-react";
import confetti from "canvas-confetti";

export default function Hero() {
  const roles = [
    "Python Developer",
    "AI Engineer",
    "Full-Stack Developer",
    "Backend Developer",
    "Data Analyst"
  ];
  const [roleIndex, setRoleIndex] = useState(0);

  // Mouse reactive motion parallax hook reference
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left - width / 2) / 25;
      const y = (e.clientY - top - height / 2) / 25;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [roles.length]);

  const stats = [
    { value: "0.95", label: "Predictive Model AUC", suffix: "Score" },
    { value: "38%", label: "Pipeline Latency reduction", suffix: "Rate" },
    { value: "100%", label: "Protected Auth Routes", suffix: "Secure" },
    { value: "500+", label: "Concurrent Backend Users", suffix: "Load" }
  ];

  const handleStatsClick = () => {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.85 },
      colors: ["#ffffff", "#27272a", "#d4d4d8"]
    });
  };

  // Entrance Timelines Config
  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", delay: custom }
    })
  } as any;

  return (
    <section 
      ref={containerRef}
      id="home" 
      className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden bg-black pt-28 px-4 md:px-8"
    >
      {/* Background Cinematic Visual Effect - Luxury Gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[45vw] h-[45vw] bg-zinc-800/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[55vw] h-[55vw] bg-zinc-900/15 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl w-full grid grid-cols-1 md:grid-cols-12 gap-10 items-center pt-8">
        
        {/* Left Columns - Text content */}
        <div className="md:col-span-8 flex flex-col items-start">
          
          {/* Top Tag */}
          <motion.div
            custom={0.2}
            initial="hidden"
            animate="visible"
            variants={contentVariants}
            className="flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-850 bg-zinc-950/80 text-[10px] tracking-wider text-zinc-450 font-mono mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" /> Cairo University Engineering Scholar
          </motion.div>

          {/* Name Header */}
          <motion.h1
            custom={0.3}
            initial="hidden"
            animate="visible"
            variants={contentVariants}
            className="text-6xl md:text-8xl font-bold tracking-tight text-white mb-2 leading-none"
          >
            Kareem Tamer
          </motion.h1>

          {/* Role selector animation */}
          <motion.div
            custom={0.4}
            initial="hidden"
            animate="visible"
            variants={contentVariants}
            className="text-2xl md:text-4xl tracking-tight text-zinc-400 font-light flex flex-wrap items-center gap-2 mb-6"
          >
            <span>Architecting as a</span>
            <div className="h-[48px] relative overflow-hidden inline-block text-editorial text-white italic min-w-[240px]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  initial={{ y: 25, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -25, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="absolute left-0 top-0 block"
                >
                  {roles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Pitch statement */}
          <motion.p
            custom={0.5}
            initial="hidden"
            animate="visible"
            variants={contentVariants}
            className="text-sm md:text-base text-zinc-550 max-w-xl leading-relaxed mb-8"
          >
            I build high-throughput data pipelines, zero-code enterprise analytics engines, and modern full-stack web platforms. Specializing in secure Node.js APIs and performance-optimized Python architectures.
          </motion.p>

          {/* Actions */}
          <motion.div
            custom={0.6}
            initial="hidden"
            animate="visible"
            variants={contentVariants}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href="#projects"
              className="rounded-full bg-white px-6 py-3 text-xs font-bold text-black hover:bg-zinc-200 transition-all flex items-center gap-1 shadow-lg"
            >
              Explore Portfolio <ArrowDownRight className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="rounded-full border border-zinc-800 bg-zinc-950/40 hover:bg-zinc-900/60 px-6 py-3 text-xs font-bold text-zinc-350 hover:text-white transition-all"
            >
              Order Service
            </a>
          </motion.div>

        </div>

        {/* Right Columns - High-end Floating Photo Card with Parallax Mouse Reactions */}
        <div className="md:col-span-4 flex justify-center items-center">
          <motion.div
            custom={0.75}
            initial="hidden"
            animate="visible"
            variants={contentVariants}
            style={{ x: mousePosition.x, y: mousePosition.y }}
            className="relative group w-64 md:w-full aspect-[4/5] rounded-3xl overflow-hidden border border-zinc-850 bg-zinc-950 shadow-2xl transition-all duration-300 hover:border-zinc-700"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/kareem.jpg"
              alt="Kareem Tamer Portrait"
              className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-all duration-700 ease-out"
            />
            {/* Linear-Stripe inspired Glass Reflection overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-transparent to-transparent opacity-90" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-[linear-gradient(45deg,transparent_45%,rgba(255,255,255,0.6)_50%,transparent_55%)] bg-[size:200%_200%] animate-pulse" />
            
            {/* Floating Profile Widget Badge */}
            <div className="absolute bottom-5 left-5 right-5 p-3 rounded-2xl glass-panel text-left flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800 flex-shrink-0">
                <Code2 className="w-3.5 h-3.5 text-zinc-350" />
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-wider font-mono text-zinc-500 block">Status</span>
                <span className="text-[10px] text-zinc-300 font-bold block">Active Freelance Consultant</span>
              </div>
            </div>
          </motion.div>
        </div>

      </div>

      {/* Analytics stats section */}
      <div className="relative z-10 mx-auto max-w-5xl w-full border-t border-zinc-950 mt-16 pt-8 pb-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              onClick={handleStatsClick}
              className="group cursor-pointer select-none p-4 rounded-xl border border-transparent hover:border-zinc-900 hover:bg-zinc-950/20 transition-all duration-300"
            >
              <div className="text-zinc-650 font-mono text-[9px] uppercase tracking-wider mb-1 flex items-center justify-between">
                <span>{stat.label}</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-[8px]">✨ stats</span>
              </div>
              <div className="text-2xl md:text-3xl font-bold tracking-tight text-white font-mono flex items-baseline gap-1">
                {stat.value}
                <span className="text-[10px] font-normal text-zinc-605 font-sans">{stat.suffix}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

    </section>
  );
}
