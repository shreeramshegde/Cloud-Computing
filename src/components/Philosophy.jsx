import React from "react";
import { CONFIG } from "../config";
import { HeartCrack, ShieldCheck, Zap, Sparkles, Quote } from "lucide-react";

export default function Philosophy() {
  const pillars = [
    {
      num: "01",
      title: "Zero-Idle Architecture",
      summary: "A system must breathe with the world. When silent, it consumes zero compute cycles; when traffic surges, it scales horizontally across availability zones without human intervention.",
      icon: <Zap className="w-5 h-5 text-[var(--terracotta)]" />
    },
    {
      num: "02",
      title: "Storage-Level Atomicity",
      summary: "Never trust client-side state. Evaluate invariants and increments directly inside the database engine (e.g. DynamoDB ADD expressions) to eliminate race conditions without complex locks.",
      icon: <ShieldCheck className="w-5 h-5 text-[var(--terracotta)]" />
    },
    {
      num: "03",
      title: "Artisanal Integrity",
      summary: "Code is literature and systems are architecture. Every API route, every error payload, and every user interaction is sculpted with rigorous care and uncompromising pride.",
      icon: <Sparkles className="w-5 h-5 text-[var(--terracotta)]" />
    }
  ];

  return (
    <section id="philosophy" className="w-full border-b border-[var(--border-ink)] py-14 sm:py-20 px-4 sm:px-8 bg-[var(--paper-surface)]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="border-b border-[var(--border-ink)] pb-6 mb-12">
          <div className="flex items-center gap-2 mb-2 text-xs font-mono-tag text-[var(--terracotta)] font-bold">
            <span>[03] THE PHILOSOPHY &bull; FIRST PRINCIPLES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-editorial-title font-black text-[var(--ink-black)] tracking-tight">
            Think. Architect. Deliver.
          </h2>
          <p className="text-sm sm:text-base font-headline text-[var(--terracotta)] tracking-widest mt-1">
            THE ARTISANAL CREED OF AN ARCHITECTURE-FIRST ENGINEER
          </p>
        </div>

        {/* Featured Pull-Quote: Romantic / Heartbroken Tech Quote */}
        <div className="newspaper-photo p-8 sm:p-12 mb-16 rounded relative overflow-hidden bg-white">
          <div className="flex items-center gap-2 text-xs font-mono-tag text-[var(--terracotta)] font-bold mb-4">
            <HeartCrack className="w-4 h-4 text-[var(--terracotta)]" />
            <span>DISPATCH FROM THE INVARIANT LOG &bull; SPECIAL EDITION</span>
          </div>

          <Quote className="w-12 h-12 text-[var(--border-ink)] opacity-40 mb-2" />

          <blockquote className="text-xl sm:text-2xl md:text-3xl font-editorial-title font-semibold italic text-[var(--ink-black)] leading-relaxed mb-6">
            &ldquo;{CONFIG.AUTHOR.philosophyQuote}&rdquo;
          </blockquote>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-[var(--border-ink)] pt-4 text-xs font-mono-tag text-[var(--ink-muted)]">
            <span className="font-bold text-[var(--ink-black)]">
              AUTHOR: {CONFIG.AUTHOR.name.toUpperCase()} &bull; MYSURU, IN
            </span>
            <span>SYSTEM CONTEXT: DISTRIBUTED RECONCILIATION</span>
          </div>
        </div>

        {/* Three Architectural Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
          {pillars.map((pillar) => (
            <div
              key={pillar.num}
              className="broadsheet-card p-6 sm:p-7 rounded border border-[var(--border-ink)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono-tag font-bold text-[var(--terracotta)] bg-[var(--paper-bg)] px-2 py-0.5 rounded border border-[var(--border-ink)]">
                    PILLAR {pillar.num}
                  </span>
                  {pillar.icon}
                </div>
                <h3 className="text-xl font-editorial-title font-black text-[var(--ink-black)] mb-3">
                  {pillar.title}
                </h3>
                <p className="text-sm font-editorial-body text-[var(--ink-black)] leading-relaxed text-justify">
                  {pillar.summary}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Editorial Testimonials / Accolades */}
        <div className="border-t border-[var(--border-ink)] pt-8">
          <div className="text-xs font-mono-tag font-bold text-[var(--ink-muted)] mb-4">
            EDITORIAL DISPATCHES &amp; ACADEMIC RECOGNITION
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CONFIG.EDITORIAL_TESTIMONIALS.map((item, idx) => (
              <div key={idx} className="bg-[var(--paper-bg)] p-5 rounded border border-[var(--border-ink)]">
                <p className="italic text-sm sm:text-base font-editorial-body text-[var(--ink-black)] mb-3 leading-relaxed">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <div className="text-xs font-mono-tag text-[var(--terracotta)] font-bold">
                  {item.author} &bull; <span className="text-[var(--ink-muted)] font-normal">{item.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
