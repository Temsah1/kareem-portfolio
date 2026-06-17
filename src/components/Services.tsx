"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { ShieldCheck, ShoppingCart, Calendar, Check, ArrowRight } from "lucide-react";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  price: string;
  delivery_time: string;
  features: string[];
  image_url: string;
}

export default function Services() {
  const [services, setServices] = useState<ServiceItem[]>([]);

  useEffect(() => {
    async function loadServices() {
      const { data, error } = await supabase.from("services").select("*");
      if (!error && data) {
        setServices(data);
      }
    }
    loadServices();
  }, []);

  const handleServiceClick = async (title: string) => {
    try {
      await supabase.from("analytics").insert({
        event_type: "service_click",
        target_id: title,
        path: window.location.pathname
      });
    } catch {}
    // Scroll to contact form
    const contactSec = document.getElementById("contact");
    if (contactSec) {
      contactSec.scrollIntoView({ behavior: "smooth" });
      // Set subject input to focus and prefill
      setTimeout(() => {
        const subjectInput = document.getElementById("form_subject") as HTMLInputElement;
        if (subjectInput) {
          subjectInput.value = `Inquiry: ${title}`;
          subjectInput.focus();
        }
      }, 800);
    }
  };

  return (
    <section id="services" className="relative py-24 px-4 md:px-8 bg-black">
      <div className="mx-auto max-w-5xl">
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="text-xs uppercase tracking-widest text-zinc-500 font-mono block mb-2">04 / Consulting Marketplace</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
              Freelance <span className="text-editorial italic text-zinc-400 font-normal">Services Marketplace.</span>
            </h2>
          </div>
          <div className="text-xs text-zinc-500 font-mono uppercase tracking-widest max-w-xs mt-4 md:mt-0 leading-relaxed">
            PRE-SET ENGAGEMENTS AND PRODUCTION SCALE HANDOFFS.
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="group p-6 rounded-3xl glass-panel hover:border-zinc-700/60 hover:bg-zinc-900/10 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header Info */}
                <div className="flex items-center justify-between mb-6 pb-6 border-b border-zinc-900/80">
                  <div>
                    <h3 className="text-base font-bold text-zinc-100 group-hover:text-white mb-1">
                      {service.title}
                    </h3>
                    <div className="flex items-center gap-1 text-[10px] text-zinc-500 font-mono uppercase">
                      <Calendar className="w-3 h-3 text-zinc-650" /> {service.delivery_time || "Flexible"}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-white font-mono">{service.price}</div>
                    <div className="text-[9px] uppercase tracking-wider text-zinc-500 font-mono">Starter pricing</div>
                  </div>
                </div>

                <p className="text-xs text-zinc-450 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Features Bullet List */}
                <div className="flex flex-col gap-2.5 mb-8">
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-zinc-400">
                      <Check className="w-3.5 h-3.5 text-zinc-200 mt-0.5 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom CTA trigger */}
              <button
                onClick={() => handleServiceClick(service.title)}
                className="w-full rounded-2xl bg-zinc-900 group-hover:bg-white text-zinc-300 group-hover:text-black py-3 text-xs font-semibold transition-all duration-300 flex items-center justify-center gap-1.5 border border-zinc-805 group-hover:border-white"
              >
                Order Service <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
