"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Calendar, Briefcase, ChevronRight } from "lucide-react";

interface ExpItem {
  id: string;
  company: string;
  position: string;
  dates: string;
  description: string;
}

export default function Experience() {
  const [history, setHistory] = useState<ExpItem[]>([]);

  useEffect(() => {
    async function loadExperience() {
      const { data, error } = await supabase.from("experience").select("*").order("order_index", { ascending: true });
      if (!error && data) {
        setHistory(data);
      }
    }
    loadExperience();
  }, []);

  return (
    <section id="experience" className="relative py-24 px-4 md:px-8 bg-zinc-950/20 border-t border-zinc-900/60">
      <div className="mx-auto max-w-5xl">
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="text-xs uppercase tracking-widest text-zinc-500 font-mono block mb-2">05 / Chronology</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
              Professional <span className="text-editorial italic text-zinc-400 font-normal">Timeline & Career.</span>
            </h2>
          </div>
          <div className="text-xs text-zinc-500 font-mono uppercase tracking-widest max-w-xs mt-4 md:mt-0 leading-relaxed">
            SYSTEM ARCHITECT & LEAD ENGINEER EXPERIENCE RECORD.
          </div>
        </div>

        {/* Timeline Line/Node flow */}
        <div className="relative border-l border-zinc-900 pl-6 md:pl-10 ml-2 md:ml-4 flex flex-col gap-12">
          {history.map((job) => (
            <div key={job.id} className="relative group">
              {/* Pulsing indicator node */}
              <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-black border-2 border-zinc-800 flex items-center justify-center group-hover:border-white transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-600 group-hover:bg-white transition-colors" />
              </div>

              {/* Box Details Card */}
              <div className="p-6 rounded-3xl glass-panel group-hover:border-zinc-800 transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4 pb-4 border-b border-zinc-900">
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-zinc-300 transition-colors">
                      {job.position}
                    </h3>
                    <span className="text-sm font-mono text-zinc-450">{job.company}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-mono">
                    <Calendar className="w-3.5 h-3.5" /> {job.dates}
                  </div>
                </div>

                <p className="text-xs md:text-sm text-zinc-500 leading-relaxed">
                  {job.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
