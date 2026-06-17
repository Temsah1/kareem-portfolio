"use client";

import React, { useEffect, useState, use } from "react";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, GitBranch, Play, Cpu, Server, Layout, Calendar, Sparkles } from "lucide-react";
import Link from "next/link";

interface ProjectItem {
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
  problem: string;
  solution: string;
  architecture: string;
  results: string;
  screenshots: string[];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProjectDetail({ params }: PageProps) {
  const resolvedParams = use(params);
  const [project, setProject] = useState<ProjectItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProject() {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("slug", resolvedParams.slug)
        .single();
      
      if (!error && data) {
        setProject(data);
      }
      setLoading(false);
    }
    loadProject();
  }, [resolvedParams.slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-zinc-500 font-mono text-xs">
        LOADING CASE STUDY ARCHIVE...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4 text-center">
        <h1 className="text-xl font-bold text-white">Case Study Not Found</h1>
        <p className="text-xs text-zinc-500">The requested project slug does not exist.</p>
        <Link href="/" className="text-xs text-white border-b border-zinc-700 pb-0.5 mt-4">
          Return to home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 py-16 px-4 md:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Navigation Return */}
        <Link href="/" className="inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-white transition-colors mb-12">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to projects
        </Link>

        {/* Hero details */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase text-zinc-550 tracking-wider">
              {project.category}
            </span>
            <span className="text-[10px] bg-zinc-900 border border-zinc-850 px-2 py-0.5 rounded-full text-zinc-400">
              {project.status}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
            {project.title}
          </h1>

          <p className="text-base md:text-lg text-zinc-400 font-light leading-relaxed">
            {project.tagline}
          </p>
        </div>

        {/* Action controls */}
        <div className="flex flex-wrap items-center gap-4 mb-12 pb-8 border-b border-zinc-900">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white px-5 py-2.5 text-xs font-semibold text-black hover:bg-zinc-200 transition-colors flex items-center gap-1.5"
            >
              <GitBranch className="w-4 h-4" /> View Source Code
            </a>
          )}
          {project.demo_url && (
            <a
              href={project.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-zinc-800 bg-zinc-950/40 hover:bg-zinc-900/60 px-5 py-2.5 text-xs font-semibold text-zinc-300 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5" /> Launch Live Application
            </a>
          )}
        </div>

        {/* Large mockup cover banner */}
        <div className="w-full aspect-[16/9] rounded-3xl overflow-hidden border border-zinc-850 bg-zinc-900 mb-16 shadow-2xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image_url || "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Detailed case study section grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Left panel info */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-zinc-550 font-mono block mb-1">Technologies</span>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag, i) => (
                  <span key={i} className="text-[10px] font-mono text-zinc-350 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-wider text-zinc-550 font-mono block mb-1">Project Status</span>
              <span className="text-xs text-zinc-350">{project.status}</span>
            </div>
          </div>

          {/* Right Case details */}
          <div className="md:col-span-8 flex flex-col gap-10">
            {/* Problem section */}
            {project.problem && (
              <div className="flex flex-col gap-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" /> The Challenge
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {project.problem}
                </p>
              </div>
            )}

            {/* Solution section */}
            {project.solution && (
              <div className="flex flex-col gap-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" /> The Solution
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {project.solution}
                </p>
              </div>
            )}

            {/* Architecture section */}
            {project.architecture && (
              <div className="flex flex-col gap-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-500" /> System Architecture
                </h3>
                <div className="p-5 rounded-2xl border border-zinc-850 bg-zinc-950/40 text-xs font-mono text-zinc-400 leading-relaxed">
                  {project.architecture}
                </div>
              </div>
            )}

            {/* Results section */}
            {project.results && (
              <div className="flex flex-col gap-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Key Outcomes
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {project.results}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
