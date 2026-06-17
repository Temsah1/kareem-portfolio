"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface TestimonialItem {
  id: string;
  client_name: string;
  client_image: string;
  company: string;
  rating: number;
  testimonial: string;
}

export default function Testimonials() {
  const [reviews, setReviews] = useState<TestimonialItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    async function loadTestimonials() {
      const { data, error } = await supabase.from("testimonials").select("*");
      if (!error && data) {
        setReviews(data);
      }
    }
    loadTestimonials();
  }, []);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  if (reviews.length === 0) return null;

  const current = reviews[activeIndex];

  return (
    <section className="relative py-24 px-4 md:px-8 bg-black overflow-hidden">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col items-center text-center">
          <Quote className="w-10 h-10 text-zinc-800 mb-8" />

          {/* Carousel Frame */}
          <div className="min-h-[200px] flex items-center justify-center px-4">
            <p className="text-xl md:text-2xl text-zinc-300 font-light leading-relaxed max-w-2xl text-editorial italic">
              "{current.testimonial}"
            </p>
          </div>

          {/* Client Profile details */}
          <div className="mt-8 flex flex-col items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={current.client_image || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"}
              alt={current.client_name}
              className="w-12 h-12 rounded-full border border-zinc-800 object-cover mb-3 grayscale"
            />
            <h4 className="text-sm font-semibold text-white">{current.client_name}</h4>
            <span className="text-xs text-zinc-500 font-mono uppercase tracking-wider">{current.company}</span>
            
            {/* Rating Stars */}
            <div className="flex gap-0.5 mt-2.5">
              {Array.from({ length: current.rating }).map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-white text-white" />
              ))}
            </div>
          </div>

          {/* Control Arrows */}
          <div className="flex items-center gap-3 mt-10">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full border border-zinc-850 bg-zinc-950/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-mono text-zinc-650 uppercase tracking-widest">
              {activeIndex + 1} / {reviews.length}
            </span>
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full border border-zinc-850 bg-zinc-950/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
