"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Code, Database, Globe, BrainCircuit, Terminal, ArrowUpRight } from "lucide-react";

interface SkillItem {
  id: string;
  name: string;
  category: string;
  proficiency: number;
}

export default function Skills() {
  const [skills, setSkills] = useState<SkillItem[]>([]);
  const [activeTab, setActiveTab] = useState<string>("All");

  useEffect(() => {
    async function loadSkills() {
      const { data, error } = await supabase.from("skills").select("*");
      if (!error && data) {
        setSkills(data);
      }
    }
    loadSkills();
  }, []);

  const categories = ["All", "Backend", "Frontend", "Databases", "AI", "Tools"];

  const filteredSkills = activeTab === "All"
    ? skills
    : skills.filter(s => s.category.toLowerCase() === activeTab.toLowerCase());

  // Category Icon Resolver
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "backend":
        return <Terminal className="w-4 h-4 text-zinc-400" />;
      case "frontend":
        return <Globe className="w-4 h-4 text-zinc-400" />;
      case "databases":
        return <Database className="w-4 h-4 text-zinc-400" />;
      case "ai":
        return <BrainCircuit className="w-4 h-4 text-zinc-400" />;
      default:
        return <Code className="w-4 h-4 text-zinc-400" />;
    }
  };

  return (
    <section id="skills" className="relative py-24 px-4 md:px-8 bg-black">
      <div className="mx-auto max-w-5xl">
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs uppercase tracking-widest text-zinc-500 font-mono block mb-2">02 / Expertise</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
              Tech Stack <span className="text-editorial italic text-zinc-400 font-normal">& Skillset.</span>
            </h2>
          </div>
          <div className="text-xs text-zinc-500 font-mono uppercase tracking-widest max-w-xs mt-4 md:mt-0 leading-relaxed">
            EDITABLE VIA CMS. POWERED BY DYNAMIC RELATIONAL ENTITIES.
          </div>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap gap-2 mb-10 pb-4 border-b border-zinc-900/60">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-2 text-xs font-semibold rounded-full transition-all duration-300 border ${
                activeTab === cat
                  ? "bg-white text-black border-white"
                  : "bg-zinc-950/40 text-zinc-400 border-zinc-800 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skill Matrix Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="p-5 rounded-2xl glass-panel group hover:border-zinc-700/60 transition-all duration-300 flex flex-col justify-between min-h-[140px]"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-850 group-hover:bg-zinc-850 transition-colors">
                  {getCategoryIcon(skill.category)}
                </div>
                <span className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider">
                  {skill.category}
                </span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-zinc-200 group-hover:text-white mb-2 transition-colors">
                  {skill.name}
                </h3>
                <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-zinc-400 h-full rounded-full transition-all duration-1000"
                    style={{ width: `${skill.proficiency}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
