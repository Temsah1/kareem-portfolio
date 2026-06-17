"use client";

import React, { useState } from "react";
import Loader from "@/components/Loader";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Experience from "@/components/Experience";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import CustomCursor from "@/components/CustomCursor";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [loading, setLoading] = useState(true);

  // Trigger page views analytics track
  React.useEffect(() => {
    async function trackPageView() {
      try {
        await supabase.from("analytics").insert({
          event_type: "page_view",
          path: "/"
        });
      } catch {}
    }
    if (!loading) {
      trackPageView();
    }
  }, [loading]);

  return (
    <>
      {loading ? (
        <Loader onComplete={() => setLoading(false)} />
      ) : (
        <SmoothScrollProvider>
          {/* Custom mouse tracker */}
          <CustomCursor />
          
          {/* Noise filter background overlay */}
          <div className="noise-overlay" />

          <div className="w-full relative min-h-screen bg-[#07111F] overflow-x-hidden">
            {/* Header navigation bar */}
            <Navigation />

            {/* Page Sections Stack */}
            <main>
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Services />
              <Experience />
              <Testimonials />
              <Contact />
            </main>

            {/* Luxury Minimal Footer */}
            <footer className="w-full border-t border-zinc-900 bg-[#0C1728] py-12 px-4 md:px-8 text-center text-xs text-zinc-500 font-mono">
              <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-zinc-950 border border-zinc-850 flex items-center justify-center font-mono text-[10px] font-black text-cyan-400">
                    KT
                  </div>
                  <span>© {new Date().getFullYear()} Kareem Tamer Studio. All rights reserved.</span>
                </div>
                <div className="flex gap-4">
                  <a href="#home" className="hover:text-white transition-colors">Back to top</a>
                  <span>·</span>
                  <a href="/admin" className="hover:text-white transition-colors">Admin Dashboard</a>
                </div>
              </div>
            </footer>
          </div>
        </SmoothScrollProvider>
      )}
    </>
  );
}
