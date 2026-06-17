"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { ArrowUpRight, GitBranch, Play, Sparkles, ExternalLink } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─── Types ────────────────────────────────────────────────────────── */
type ProjectItem = {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  category: string;
  status: string;
  featured: boolean;
  image_url: string;
  github_url: string;
  demo_url: string;
  tags: string[];
  mockup_type?: string;
  problem?: string;
  solution?: string;
  architecture?: string;
  results?: string;
};

/* ─── Ambient accent colours per project category ──────────────────── */
const CATEGORY_ACCENTS: Record<string, { glow: string; bg: string; text: string }> = {
  "AI / Backend": { glow: "rgba(93, 139, 255, 0.15)", bg: "#0d1a3a", text: "#5D8BFF" },
  "Full-Stack":   { glow: "rgba(110, 231, 249, 0.12)", bg: "#0a1e2e", text: "#6EE7F9" },
  "SaaS":         { glow: "rgba(139, 92, 246, 0.12)",  bg: "#140e2e", text: "#8B5CF6" },
  "Mobile":       { glow: "rgba(168, 85, 247, 0.12)",  bg: "#1a0e2e", text: "#A855F7" },
};
const DEFAULT_ACCENT = { glow: "rgba(93, 139, 255, 0.10)", bg: "#07111F", text: "#5D8BFF" };

/* ─── Animation entry patterns (cycle every 5) ─────────────────────── */
const ENTRY_PATTERNS = [
  { x: -220, opacity: 0 },                          // left slide
  { x: 220,  opacity: 0 },                          // right slide
  { y: 180,  opacity: 0 },                          // bottom slide
  { rotationY: 30, opacity: 0, transformPerspective: 1200 }, // 3D rotate
  { scale: 0.75, filter: "blur(12px)", opacity: 0 }, // scale + blur
];

/* ═══════════════════════════════════════════════════════════════════ */
export default function Projects() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [modalProject, setModalProject] = useState<ProjectItem | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const heroRefs = useRef<Array<HTMLDivElement | null>>([]);
  const storyRefs = useRef<Array<HTMLDivElement | null>>([]);

  /* ─── Data ─────────────────────────────────────────────────────── */
  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.from("projects").select("*");
      if (!error && data) setProjects(data);
    })();
  }, []);

  /* ─── GSAP scroll‑driven reveal for each project hero ──────────── */
  useEffect(() => {
    if (projects.length === 0) return;

    const ctx = gsap.context(() => {
      heroRefs.current.forEach((el, idx) => {
        if (!el) return;
        const pattern = ENTRY_PATTERNS[idx % ENTRY_PATTERNS.length];

        gsap.from(el, {
          ...pattern,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "top 30%",
            toggleActions: "play none none reverse",
            onEnter: () => setActiveIdx(idx),
            onEnterBack: () => setActiveIdx(idx),
          },
        });

        /* Storytelling blocks inside each project */
        const storyBlocks = el.querySelectorAll(".story-block");
        storyBlocks.forEach((block, bIdx) => {
          const dirs = [
            { x: -120 }, { x: 120 }, { y: 80 }, { x: -80, rotationZ: 3 },
          ];
          gsap.from(block, {
            ...dirs[bIdx % dirs.length],
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: block,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [projects]);

  /* ─── Analytics ────────────────────────────────────────────────── */
  const handleStatTrack = useCallback(async (slug: string, eventType: string) => {
    try {
      await supabase.from("analytics").insert({
        event_type: eventType,
        target_id: slug,
        path: window.location.pathname,
      });
    } catch {}
  }, []);

  /* ─── Hover tilt handler ───────────────────────────────────────── */
  const handleTilt = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    e.currentTarget.style.transform =
      `perspective(1500px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(12px)`;
  }, []);

  const resetTilt = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "perspective(1500px) rotateY(0deg) rotateX(0deg) translateZ(0px)";
  }, []);

  /* ─── Accent for active project ─────────────────────────────────── */
  const activeAccent = projects[activeIdx]
    ? CATEGORY_ACCENTS[projects[activeIdx].category] || DEFAULT_ACCENT
    : DEFAULT_ACCENT;

  /* ═══════════════════════════════════════════════════════════════ */
  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative overflow-hidden"
      style={{
        background: `linear-gradient(180deg, ${activeAccent.bg} 0%, #07111F 100%)`,
        transition: "background 0.9s ease",
      }}
    >
      {/* Ambient glow layer */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 20%, ${activeAccent.glow}, transparent 70%)`,
          transition: "background 0.9s ease",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8 pt-32 pb-24">
        {/* ── Section header ─────────────────────────────────────── */}
        <div className="mb-24 max-w-3xl">
          <span className="text-xs uppercase tracking-[0.3em] font-mono block mb-4"
            style={{ color: activeAccent.text, transition: "color 0.9s" }}>
            03 / Featured Work
          </span>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.08] mb-6">
            Product<br />
            <span className="text-editorial italic font-normal text-zinc-400">
              Showcase.
            </span>
          </h2>
          <p className="text-base md:text-lg text-zinc-500 max-w-xl leading-relaxed">
            Enterprise deployments, AI pipelines, and full‑stack architectures — each project engineered
            with production‑grade quality and premium attention to detail.
          </p>
        </div>

        {/* ── Project heroes ─────────────────────────────────────── */}
        <div className="flex flex-col gap-48">
          {projects.map((project, idx) => {
            const isEven = idx % 2 === 0;
            const accent = CATEGORY_ACCENTS[project.category] || DEFAULT_ACCENT;

            return (
              <div
                key={project.id}
                ref={(el) => { heroRefs.current[idx] = el; }}
                className="relative"
              >
                {/* ── Main hero row ──────────────────────────────── */}
                <div className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-8 md:gap-16 items-center`}>

                  {/* ── Image / Mockup ────────────────────────────── */}
                  <div
                    className="w-full md:w-[55%] relative group cursor-pointer"
                    onMouseMove={handleTilt}
                    onMouseLeave={resetTilt}
                    onClick={() => setModalProject(project)}
                    style={{
                      transition: "transform 0.25s ease-out",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {/* Macbook bezel mockup frame */}
                    <div className="relative rounded-xl overflow-hidden border border-white/[0.06] bg-[#0e1a2e] shadow-2xl">
                      {/* Browser‑style top bar */}
                      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#0a1525] border-b border-white/[0.04]">
                        <div className="flex gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                        </div>
                        <div className="flex-1 flex justify-center">
                          <div className="bg-[#07111F] rounded-md px-4 py-1 text-[10px] font-mono text-zinc-500 max-w-[260px] truncate border border-white/[0.04]">
                            {project.demo_url || `${project.slug}.kareemtamer.com`}
                          </div>
                        </div>
                      </div>

                      {/* Screenshot — vibrant, no grayscale */}
                      <div className="relative aspect-[16/10] overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={project.image_url}
                          alt={project.title}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                        />
                        {/* Subtle vignette — never desaturate */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity duration-600" />

                        {/* Glass highlight on hover */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                          style={{
                            background: "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.04) 45%, transparent 60%)",
                          }}
                        />
                      </div>
                    </div>

                    {/* Featured badge */}
                    {project.featured && (
                      <div className="absolute -top-3 -right-3 z-20 flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-white/10 backdrop-blur-md"
                        style={{ background: `linear-gradient(135deg, ${accent.text}22, ${accent.text}08)`, color: accent.text }}>
                        <Sparkles className="w-3 h-3" /> Featured
                      </div>
                    )}

                    {/* Floating tech tags near image */}
                    <div className={`absolute -bottom-4 ${isEven ? "right-4" : "left-4"} flex flex-wrap gap-1.5 max-w-[280px]`}>
                      {project.tags.slice(0, 4).map((tag, i) => (
                        <span
                          key={i}
                          className="text-[9px] font-mono uppercase tracking-wider px-2 py-1 rounded-md border backdrop-blur-md"
                          style={{
                            background: `${accent.text}10`,
                            borderColor: `${accent.text}20`,
                            color: accent.text,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* ── Content column ─────────────────────────────── */}
                  <div className="w-full md:w-[45%] flex flex-col justify-center py-8">
                    <div className="story-block">
                      <span className="text-[10px] font-mono uppercase tracking-[0.3em] mb-3 block"
                        style={{ color: accent.text }}>
                        {project.category} · {project.status}
                      </span>
                      <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 leading-[1.1]">
                        {project.title}
                      </h3>
                      <p className="text-base text-zinc-400 mb-8 leading-relaxed max-w-md">
                        {project.description || project.tagline}
                      </p>
                    </div>

                    {/* Storytelling blocks */}
                    {project.problem && (
                      <div className="story-block mb-6 pl-4 border-l-2" style={{ borderColor: `${accent.text}30` }}>
                        <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500 block mb-1">Problem</span>
                        <p className="text-sm text-zinc-400 leading-relaxed">{project.problem}</p>
                      </div>
                    )}
                    {project.solution && (
                      <div className="story-block mb-6 pl-4 border-l-2" style={{ borderColor: `${accent.text}30` }}>
                        <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500 block mb-1">Solution</span>
                        <p className="text-sm text-zinc-400 leading-relaxed">{project.solution}</p>
                      </div>
                    )}
                    {project.results && (
                      <div className="story-block mb-8 pl-4 border-l-2" style={{ borderColor: `${accent.text}30` }}>
                        <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500 block mb-1">Results</span>
                        <p className="text-sm text-zinc-400 leading-relaxed">{project.results}</p>
                      </div>
                    )}

                    {/* All tech tags */}
                    <div className="story-block flex flex-wrap gap-1.5 mb-8">
                      {project.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-mono text-zinc-400 bg-white/[0.03] border border-white/[0.06] px-2.5 py-1 rounded-full transition-colors duration-300 hover:border-white/10 hover:text-zinc-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action buttons */}
                    <div className="story-block flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => setModalProject(project)}
                        className="group/btn flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold transition-all duration-300 border"
                        style={{
                          background: `${accent.text}12`,
                          borderColor: `${accent.text}25`,
                          color: accent.text,
                        }}
                      >
                        View Case Study
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                      </button>

                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => handleStatTrack(project.slug, "github_click")}
                          className="group/btn flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium text-zinc-400 border border-white/[0.06] hover:border-white/10 hover:text-white transition-all duration-300 bg-white/[0.02]"
                        >
                          <GitBranch className="w-3.5 h-3.5" /> Source
                        </a>
                      )}

                      {project.demo_url && (
                        <a
                          href={project.demo_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => handleStatTrack(project.slug, "demo_click")}
                          className="group/btn flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium text-zinc-400 border border-white/[0.06] hover:border-white/10 hover:text-white transition-all duration-300 bg-white/[0.02]"
                        >
                          <Play className="w-3 h-3" /> Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ═════ Fullscreen Project Modal ════════════════════════════ */}
      {modalProject && (
        <ProjectModal
          project={modalProject}
          onClose={() => setModalProject(null)}
          onStatTrack={handleStatTrack}
        />
      )}
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  Project Detail Modal                                              */
/* ═══════════════════════════════════════════════════════════════════ */
function ProjectModal({
  project,
  onClose,
  onStatTrack,
}: {
  project: ProjectItem;
  onClose: () => void;
  onStatTrack: (slug: string, event: string) => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const accent = CATEGORY_ACCENTS[project.category] || DEFAULT_ACCENT;

  useEffect(() => {
    // Animate in
    if (overlayRef.current) {
      gsap.fromTo(overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power2.out" }
      );
    }
    if (contentRef.current) {
      gsap.fromTo(contentRef.current,
        { y: 60, opacity: 0, scale: 0.97 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "power3.out", delay: 0.15 }
      );
    }
    // Track
    onStatTrack(project.slug, "project_modal_open");

    // Prevent body scroll
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [project.slug, onStatTrack]);

  const handleClose = () => {
    if (overlayRef.current) {
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3 });
    }
    if (contentRef.current) {
      gsap.to(contentRef.current, {
        y: 40, opacity: 0, scale: 0.97, duration: 0.35, ease: "power2.in",
        onComplete: onClose,
      });
    }
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9998] flex items-start justify-center overflow-y-auto"
      style={{ background: "rgba(7, 17, 31, 0.92)", backdropFilter: "blur(20px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div ref={contentRef} className="relative w-full max-w-5xl mx-4 my-8 md:my-16">
        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute -top-2 right-0 md:-right-12 z-10 w-10 h-10 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/20 transition-all"
        >
          ✕
        </button>

        {/* Hero image */}
        <div className="relative rounded-2xl overflow-hidden border border-white/[0.06] mb-10 shadow-2xl">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-[#0a1525] border-b border-white/[0.04]">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="bg-[#07111F] rounded-md px-4 py-1 text-[10px] font-mono text-zinc-500 border border-white/[0.04]">
                {project.demo_url || `${project.slug}.kareemtamer.com`}
              </div>
            </div>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image_url}
            alt={project.title}
            className="w-full aspect-[16/9] object-cover"
          />
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div className="md:col-span-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] mb-3 block" style={{ color: accent.text }}>
              {project.category}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight leading-[1.1]">
              {project.title}
            </h2>
            <p className="text-base text-zinc-400 leading-relaxed mb-8 max-w-xl">
              {project.description || project.tagline}
            </p>

            {/* Storytelling sections */}
            {[
              { label: "Problem", content: project.problem },
              { label: "Solution", content: project.solution },
              { label: "Architecture", content: project.architecture },
              { label: "Results & Impact", content: project.results },
            ].filter(s => s.content).map((section, i) => (
              <div key={i} className="mb-6 pl-5 border-l-2" style={{ borderColor: `${accent.text}40` }}>
                <span className="text-[10px] font-mono uppercase tracking-widest block mb-1" style={{ color: accent.text }}>
                  {section.label}
                </span>
                <p className="text-sm text-zinc-400 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6">
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block mb-3">Tech Stack</span>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag, i) => (
                  <span key={i} className="text-[10px] font-mono px-2.5 py-1 rounded-md border"
                    style={{ background: `${accent.text}08`, borderColor: `${accent.text}18`, color: accent.text }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block mb-3">Status</span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm text-zinc-300">{project.status}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-3">
              {project.demo_url && (
                <a
                  href={project.demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold transition-all duration-300 border"
                  style={{
                    background: `linear-gradient(135deg, ${accent.text}20, ${accent.text}08)`,
                    borderColor: `${accent.text}30`,
                    color: accent.text,
                  }}
                >
                  <ExternalLink className="w-4 h-4" /> Live Demo
                </a>
              )}
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-medium text-zinc-400 border border-white/[0.06] hover:border-white/10 hover:text-white transition-all duration-300 bg-white/[0.02]"
                >
                  <GitBranch className="w-4 h-4" /> View Source
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
