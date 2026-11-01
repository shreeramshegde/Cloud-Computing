import React, { useState } from "react";
import { CONFIG } from "../config";
import { playTypewriterClick, playPaperRustle, playStampThud } from "../utils/sound";
import { ArrowDownRight, Sparkles, HeartCrack, Send, MapPin, Calendar, Award } from "lucide-react";

export default function Hero() {
  const [activeAvatar, setActiveAvatar] = useState("miranda"); // "miranda" | "photo"

  const toggleAvatar = () => {
    playTypewriterClick();
    setActiveAvatar((prev) => (prev === "miranda" ? "photo" : "miranda"));
  };

  const scrollToSection = (id) => {
    playPaperRustle();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="w-full border-b border-[var(--border-ink)] py-8 sm:py-14 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Column (Editorial Story & Bio) - 7 Columns */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            {/* Broadsheet Category Label */}
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-[var(--terracotta)] text-white text-[10px] font-mono-tag font-bold px-2 py-0.5 rounded tracking-wider">
                FEATURED EDITORIAL
              </span>
              <span className="text-xs font-mono-tag text-[var(--ink-muted)]">
                ISSUE 26 &bull; SECTION A-1
              </span>
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-editorial-title font-black text-[var(--ink-black)] leading-[1.12] mb-6 tracking-tight">
              I architect resilient distributed systems and iconic digital interfaces from raw cloud primitives.
            </h2>

            {/* Drop-cap Lead Paragraph */}
            <p className="drop-cap text-base sm:text-lg text-[var(--ink-black)] leading-relaxed text-justify mb-6 font-editorial-body">
              {CONFIG.AUTHOR.bio}
            </p>

            {/* Miranda-Style Role Badges */}
            <div className="flex flex-wrap gap-2.5 mb-8">
              {CONFIG.AUTHOR.rolePills.map((role, idx) => (
                <span
                  key={idx}
                  className="bg-[var(--paper-surface)] hover:bg-[var(--paper-light)] border border-[var(--border-ink)] px-3 py-1 rounded text-xs font-headline tracking-widest text-[var(--ink-black)] transition-colors cursor-default"
                >
                  &bull; {role}
                </span>
              ))}
            </div>

            {/* Romantic / Heartbroken Tech Philosophy Quote Box */}
            <div className="broadsheet-card p-5 sm:p-6 rounded border-l-4 border-l-[var(--terracotta)] mb-8 shadow-sm">
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-mono-tag font-bold text-[var(--terracotta)] flex items-center gap-1.5">
                  <HeartCrack className="w-4 h-4 text-[var(--terracotta)]" />
                  THE ARTISAN'S LOG &bull; INVARIANT
                </span>
                <span className="text-[11px] font-mono-tag text-[var(--ink-muted)]">
                  SYS_ERR: DISCONNECTED
                </span>
              </div>
              <blockquote className="text-base sm:text-lg italic font-editorial-body text-[var(--ink-black)] leading-relaxed mb-3">
                &ldquo;{CONFIG.AUTHOR.philosophyQuote}&rdquo;
              </blockquote>
              <div className="text-xs font-mono-tag text-[var(--ink-muted)] text-right font-bold">
                &mdash; {CONFIG.AUTHOR.philosophyAuthor}
              </div>
            </div>
          </div>

          {/* Quick Action Navigation Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => scrollToSection("works")}
              className="bg-[var(--ink-black)] text-[var(--paper-light)] hover:bg-[var(--terracotta)] transition-all px-5 py-2.5 rounded font-mono-tag text-xs font-bold flex items-center gap-2 cursor-pointer shadow"
            >
              <span>[02] EXPLORE ALL WORKS</span>
              <ArrowDownRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollToSection("dispatch")}
              className="bg-transparent hover:bg-[var(--paper-surface)] text-[var(--ink-black)] border border-[var(--border-ink)] transition-all px-5 py-2.5 rounded font-mono-tag text-xs font-bold flex items-center gap-2 cursor-pointer"
            >
              <span>[05] SEND DISPATCH</span>
              <Send className="w-3.5 h-3.5 text-[var(--terracotta)]" />
            </button>
          </div>
        </div>

        {/* Right Column (Miranda Style Avatar & Stamp Frame) - 5 Columns */}
        <div className="lg:col-span-5 flex flex-col items-center sm:items-end gap-8">
          
          {/* Newspaper Avatar Photo Frame with Interactive Art Toggle */}
          <div className="w-full max-w-sm newspaper-photo relative rounded">
            <div className="relative overflow-hidden aspect-square rounded border border-[var(--border-ink)] bg-[var(--paper-bg)]">
              <img
                src={activeAvatar === "miranda" ? "/assets/avatar_miranda.jpg" : "/assets/shreeram_photo.jpg"}
                alt="Shreeram S Hegde - Portrait"
                className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
              />
              
              {/* Star Badge Indicator */}
              <div className="absolute top-3 left-3 bg-[var(--ink-black)] text-[var(--paper-light)] text-[10px] font-mono-tag px-2 py-0.5 rounded flex items-center gap-1 shadow">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>{activeAvatar === "miranda" ? "MIRANDA ANIME ART" : "ORIGINAL PHOTOGRAPH"}</span>
              </div>
            </div>

            {/* Avatar Switcher Bar */}
            <div className="mt-3 flex items-center justify-between text-xs font-mono-tag pt-1 border-t border-[var(--border-ink)]">
              <span className="text-[var(--ink-muted)]">FIG. 01 &bull; SHREERAM S HEGDE</span>
              <button
                onClick={toggleAvatar}
                className="text-[var(--terracotta)] hover:underline font-bold cursor-pointer flex items-center gap-1"
                title="Toggle between illustrated anime art and original photograph"
              >
                <span>[TOGGLE {activeAvatar === "miranda" ? "PHOTO" : "ART"}]</span>
              </button>
            </div>
          </div>

          {/* Perforated Postage Stamp Card */}
          <div 
            onClick={playStampThud}
            className="w-full max-w-sm flex items-center justify-center p-2 cursor-pointer hover:scale-[1.02] transition-transform duration-300"
            title="Official Dispatch Stamp • Click for tactile stamp effect"
          >
            <img 
              src="/assets/stamp_shreeram.svg" 
              alt="Shreeram S Hegde - Official Postage Stamp" 
              className="w-full max-w-[280px] drop-shadow-md"
            />
          </div>

          {/* Quick Telegram Status Card */}
          <div className="w-full max-w-sm broadsheet-card p-4 rounded text-xs font-mono-tag">
            <div className="flex items-center justify-between border-b border-[var(--border-ink)] pb-2 mb-2">
              <span className="font-bold text-[var(--ink-black)] flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[var(--terracotta)]" />
                LOCATION
              </span>
              <span>{CONFIG.AUTHOR.locationShort}</span>
            </div>
            <div className="flex items-center justify-between border-b border-[var(--border-ink)] pb-2 mb-2">
              <span className="font-bold text-[var(--ink-black)] flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[var(--terracotta)]" />
                DATE OF BIRTH
              </span>
              <span>{CONFIG.AUTHOR.dob}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-bold text-[var(--ink-black)] flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-[var(--terracotta)]" />
                STATUS
              </span>
              <span className="text-emerald-700 font-bold">&bull; OPEN FOR ARCHITECTURE</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
