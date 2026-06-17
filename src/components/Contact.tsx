"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const { error } = await supabase.from("messages").insert({
        name,
        email,
        subject,
        message
      });

      if (error) throw error;

      // Track contact message analytics trigger
      await supabase.from("analytics").insert({
        event_type: "contact_message",
        path: window.location.pathname
      });

      setStatus("success");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative py-24 px-4 md:px-8 bg-zinc-950/20 border-t border-zinc-900/60">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Left Column Information */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase tracking-widest text-zinc-500 font-mono block mb-2">06 / Message</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
                Start a <br/>
                <span className="text-editorial italic text-zinc-400 font-normal">Conversation.</span>
              </h2>
              <div className="w-12 h-[1px] bg-zinc-700 mb-8" />
              <p className="text-sm text-zinc-550 leading-relaxed max-w-sm">
                Have a freelance consulting opportunity, custom API build request, data pipeline system, or general inquiry? Feel free to drop a message. I will review and reply within 24 hours.
              </p>
            </div>

            <div className="mt-12 md:mt-0 pt-8 border-t border-zinc-900 flex flex-col gap-2.5">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-mono block">Primary Email</span>
                <a href="mailto:kareemeltemsah7@gmail.com" className="text-sm text-zinc-300 hover:text-white transition-colors">
                  kareemeltemsah7@gmail.com
                </a>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-mono block">Location</span>
                <span className="text-sm text-zinc-300">Cairo, Egypt (GMT+2) / Remote</span>
              </div>
            </div>
          </div>

          {/* Right Column Form */}
          <div className="md:col-span-7">
            <div className="p-8 rounded-3xl glass-panel relative overflow-hidden">
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-zinc-500 font-mono">Your Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="rounded-xl border border-zinc-800 bg-zinc-950/40 hover:bg-zinc-900/10 focus:border-zinc-500/80 px-4 py-3 text-xs text-white focus:outline-none transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-zinc-500 font-mono">Your Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. john@company.com"
                      className="rounded-xl border border-zinc-800 bg-zinc-950/40 hover:bg-zinc-900/10 focus:border-zinc-500/80 px-4 py-3 text-xs text-white focus:outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-zinc-500 font-mono">Subject</label>
                  <input
                    type="text"
                    id="form_subject"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Project Consultation Offer"
                    className="rounded-xl border border-zinc-800 bg-zinc-950/40 hover:bg-zinc-900/10 focus:border-zinc-500/80 px-4 py-3 text-xs text-white focus:outline-none transition-all"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-zinc-500 font-mono">Detailed Message</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your details here..."
                    className="rounded-xl border border-zinc-800 bg-zinc-950/40 hover:bg-zinc-900/10 focus:border-zinc-500/80 px-4 py-3 text-xs text-white focus:outline-none transition-all resize-none"
                  />
                </div>

                {/* Action button */}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="rounded-xl bg-white hover:bg-zinc-200 text-black py-3.5 text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                >
                  {status === "sending" ? (
                    "Sending Message..."
                  ) : (
                    <>
                      Send Message <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>

              {/* Status overlays */}
              {status === "success" && (
                <div className="absolute inset-0 bg-[#070709]/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300">
                  <CheckCircle2 className="w-12 h-12 text-zinc-200 mb-4" />
                  <h3 className="text-base font-bold text-white mb-2">Message Sent Successfully</h3>
                  <p className="text-xs text-zinc-500 max-w-xs leading-relaxed">
                    Thank you. Your message has been stored in our backend CRM database. Kareem Tamer will get back to you shortly.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-6 text-xs text-zinc-400 hover:text-white border-b border-zinc-700 pb-0.5"
                  >
                    Send another message
                  </button>
                </div>
              )}

              {status === "error" && (
                <div className="absolute inset-0 bg-[#070709]/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300">
                  <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                  <h3 className="text-base font-bold text-white mb-2">Submission Error</h3>
                  <p className="text-xs text-red-400 max-w-xs leading-relaxed">
                    An error occurred while connecting to our database. Please retry or email directly.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-6 text-xs text-zinc-400 hover:text-white border-b border-zinc-700 pb-0.5"
                  >
                    Go back
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
