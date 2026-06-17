"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight, ShieldAlert, GitBranch, Link2 } from "lucide-react";
import Link from "next/link";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Services", href: "#services" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <>
      <nav className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'py-3' : 'py-6'}`}>
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className={`mx-auto flex max-w-5xl items-center justify-between px-6 py-2.5 transition-all duration-300 rounded-full ${scrolled ? 'glass-nav shadow-lg scale-95 border-zinc-800' : 'bg-transparent border-b border-transparent'}`}>
            {/* Logo Icon / Text Logo Kareem Tamer Studio */}
            <Link href="/" className="text-sm font-bold tracking-wider text-white flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center font-mono text-xs font-black text-cyan-400">
                KT
              </div>
              <span className="font-semibold uppercase text-xs tracking-widest hidden sm:inline">Kareem Tamer Studio</span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-6 text-xs font-medium tracking-wide">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="text-zinc-400 hover:text-white transition-colors">
                  {link.name}
                </a>
              ))}
            </div>

            {/* CTAs */}
            <div className="hidden md:flex items-center gap-3">
              <a 
                href="https://linkedin.com/in/kareemeltemsah" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-zinc-500 hover:text-white transition-colors"
              >
                <Link2 className="w-4 h-4" />
              </a>
              <a 
                href="https://github.com/Temsah1" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-zinc-500 hover:text-white transition-colors"
              >
                <GitBranch className="w-4 h-4" />
              </a>
              <Link href="/admin" className="text-[10px] text-zinc-400 hover:text-white px-3 py-1.5 transition-all border border-zinc-800 rounded-full flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5 text-zinc-500" /> Admin
              </Link>
              <a href="#contact" className="rounded-full bg-white px-4 py-1.5 text-[10px] font-bold text-black hover:bg-zinc-200 transition-colors flex items-center gap-0.5 uppercase tracking-wider">
                Hire Me <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-1 text-zinc-400 hover:text-white md:hidden"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="absolute top-full left-0 right-0 glass-nav m-4 p-6 rounded-2xl flex flex-col gap-4 text-center md:hidden animate-in fade-in slide-in-from-top-5 duration-300 border-zinc-800">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm text-zinc-300 hover:text-white py-2 block border-b border-zinc-800/40 last:border-0"
              >
                {link.name}
              </a>
            ))}
            <div className="flex flex-col gap-2 mt-4">
              <Link
                href="/admin"
                onClick={() => setMobileOpen(false)}
                className="rounded-full border border-zinc-800 py-2.5 text-xs font-semibold text-zinc-300 hover:text-white flex justify-center items-center gap-1.5"
              >
                <ShieldAlert className="w-4 h-4" /> Admin Portal
              </Link>
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="rounded-full bg-white py-2.5 text-xs font-semibold text-black hover:bg-zinc-200 transition-colors flex justify-center items-center"
              >
                Hire Me
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
