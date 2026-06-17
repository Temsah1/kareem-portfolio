"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code2, Database, Cpu, GraduationCap, Award } from "lucide-react";

export default function About() {
  const bio = {
    headline: "Engineering clean predictive pipelines & high-throughput architectures.",
    paragraph1: "I am Kareem Tamer, a Software Engineer & Data Analytics Specialist pursuing my Bachelor of Engineering at Cairo University (2025–2030). I build and deploy high-performance Python backends, predictive machine learning pipelines (such as industrial maintenance systems with AUC scores of 0.95), and modern full-stack web products using Next.js, React 19, and Node.js.",
    paragraph2: "Through remote collaborations across international time zones with Decodelabs and CodeAlpha, I design secure RESTful APIs serving hundreds of concurrent requests in under 200ms. I focus on technical documentation, Agile mindsets, and producing robust tools tailored for corporate environments."
  };

  const principles = [
    {
      icon: <Cpu className="w-5 h-5 text-white" />,
      title: "Predictive Analytics & AI",
      description: "Applying isolation forest classifiers, ensemble models, and data pipelines to translate complex variables into operational strategies."
    },
    {
      icon: <Code2 className="w-5 h-5 text-white" />,
      title: "Full-Stack System Engineering",
      description: "Building interfaces with Next.js 16, React 19, Express, and Zustand state management, securing routes through JWT validation."
    },
    {
      icon: <Database className="w-5 h-5 text-white" />,
      title: "Database Performance & Modeling",
      description: "Optimizing relational SQLite and non-relational MongoDB data models to sustain high transactional performance."
    }
  ];

  return (
    <section id="about" className="relative py-24 md:py-32 px-4 md:px-8 bg-zinc-950/20 border-t border-zinc-900/60 overflow-hidden">
      {/* Aurora Background Effect */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-zinc-850/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          {/* Left Title Grid + Portrait presentation */}
          <div className="md:col-span-5 flex flex-col gap-8">
            <div>
              <span className="text-xs uppercase tracking-widest text-zinc-500 font-mono block mb-2">01 / Profile</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
                Personal <br/>
                <span className="text-editorial italic text-zinc-400 font-normal">Brand & Bio.</span>
              </h2>
              <div className="w-12 h-[1px] bg-zinc-700 mb-4" />
            </div>

            {/* Portrait Container - Dynamic glass treatment */}
            <div className="relative group w-full aspect-[4/5] rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/kareem.jpg"
                alt="Kareem Tamer"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 contrast-[1.05] brightness-95 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block mb-1">Current Residency</span>
                <span className="text-xs text-white font-semibold flex items-center gap-1.5">
                  Cairo University B.Eng Student
                </span>
              </div>
            </div>
          </div>

          {/* Right Content Grid */}
          <div className="md:col-span-7 flex flex-col gap-6">
            <h3 className="text-xl md:text-2xl text-zinc-200 font-medium">
              {bio.headline}
            </h3>
            <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
              {bio.paragraph1}
            </p>
            <p className="text-zinc-550 leading-relaxed text-sm">
              {bio.paragraph2}
            </p>

            {/* Sub-principles list */}
            <div className="grid grid-cols-1 gap-4 mt-4">
              {principles.map((pr, idx) => (
                <div key={idx} className="flex gap-4 p-5 rounded-2xl glass-panel hover:bg-zinc-900/20 transition-all duration-300">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center border border-zinc-800">
                    {pr.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-zinc-200 mb-1">{pr.title}</h4>
                    <p className="text-xs text-zinc-500 leading-relaxed">{pr.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Education & Certifications quick preview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-zinc-900">
              <div>
                <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-zinc-400" /> Academic Route
                </h4>
                <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-900">
                  <span className="text-xs font-bold text-white block">Bachelor of Engineering</span>
                  <span className="text-[10px] text-zinc-500 block">Cairo University (2025 – 2030)</span>
                </div>
              </div>
              <div>
                <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-zinc-400" /> Key Certifications
                </h4>
                <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-900">
                  <span className="text-xs font-bold text-white block">Google AI Professional</span>
                  <span className="text-[10px] text-zinc-500 block">AWS Cloud Data Analytics (2026)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
