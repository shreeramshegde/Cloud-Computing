import React, { useState } from "react";
import { CONFIG } from "../config";
import { playTypewriterClick, playPaperRustle, playStampThud } from "../utils/sound";
import { smoothScrollTo } from "../utils/scroll";
import { ArrowDownRight, Sparkles, HeartCrack, Send, MapPin, Calendar, Award, RefreshCw } from "lucide-react";
import RotatingSeal from "./RotatingSeal";

export default function Hero() {
  const [activeAvatar, setActiveAvatar] = useState("anime"); // "anime" | "photo"
  const [stampPounded, setStampPounded] = useState(false);

  const toggleAvatar = () => {
    playTypewriterClick();
    setActiveAvatar((prev) => (prev === "anime" ? "photo" : "anime"));
  };

  const handleStampClick = () => {
    playStampThud();
    setStampPounded(true);
    setTimeout(() => setStampPounded(false), 500);
  };

  const handleNavClick = (id) => {
    playPaperRustle();
    smoothScrollTo(id, 28);
  };

  return (
    <section id="hero" className="w-full border-b-2 border-[var(--ink-black)] py-10 sm:py-16 px-4 sm:px-8 relative overflow-hidden">
      {/* Background Subtle Watermark */}
      <div className="absolute right-0 top-1/4 -z-10 opacity-5 pointer-events-none select-none font-editorial-title font-black text-8xl sm:text-9xl tracking-tighter">
        MYSURU 2026
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Column (Editorial Story & Bio) - 7 Columns */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            {/* Broadsheet Category Label & Date Stamp */}
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-[var(--terracotta)] text-white text-[10px] font-mono-tag font-bold px-2.5 py-1 rounded tracking-wider shadow-[2px_2px_0px_#1d1d1b]">
                ★ FEATURED BROADSHEET
              </span>
              <span className="text-xs font-mono-tag text-[var(--ink-muted)]">
                VOL. 26 &bull; SECTION A-1 &bull; MYSURU EDITION
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
                  className="bg-[var(--paper-surface)] hover:bg-[var(--paper-light)] border-2 border-[var(--ink-black)] px-3 py-1 text-xs font-headline tracking-widest text-[var(--ink-black)] transition-all shadow-[2px_2px_0px_#1d1d1b] hover:-translate-y-0.5 cursor-default"
                >
                  &bull; {role}
                </span>
              ))}
            </div>

            {/* Romantic / Heartbroken Tech Philosophy Quote Box */}
            <div className="broadsheet-card p-5 sm:p-7 rounded border-l-8 border-l-[var(--terracotta)] mb-8 shadow-[6px_6px_0px_#1d1d1b]">
              <div className="flex items-center justify-between gap-2 mb-3 border-b border-[var(--border-ink)] pb-2">
                <span className="text-xs font-mono-tag font-bold text-[var(--terracotta)] flex items-center gap-1.5">
                  <HeartCrack className="w-4 h-4 text-[var(--terracotta)] animate-pulse" />
                  THE ARTISAN'S LOG &bull; INVARIANT
                </span>
                <span className="text-[10px] font-mono-tag uppercase tracking-wider bg-[#1d1d1b] text-white px-2 py-0.5">
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
              onClick={() => handleNavClick("works")}
              className="bg-[var(--ink-black)] text-[var(--paper-light)] hover:bg-[var(--terracotta)] hover:text-white transition-all px-6 py-3 border-2 border-[var(--ink-black)] font-mono-tag text-xs font-bold flex items-center gap-2 cursor-pointer shadow-[4px_4px_0px_#1d1d1b] active:translate-y-0.5"
            >
              <span>[02] EXPLORE ALL WORKS</span>
              <ArrowDownRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleNavClick("dispatch")}
              className="bg-transparent hover:bg-white text-[var(--ink-black)] border-2 border-[var(--ink-black)] transition-all px-6 py-3 font-mono-tag text-xs font-bold flex items-center gap-2 cursor-pointer shadow-[4px_4px_0px_#1d1d1b] active:translate-y-0.5"
            >
              <span>[05] WIRE DISPATCH</span>
              <Send className="w-3.5 h-3.5 text-[var(--terracotta)]" />
            </button>
          </div>
        </div>

        {/* Right Column (Miranda Style Avatar, Rotating Seal & Stamp Frame) - 5 Columns */}
        <div className="lg:col-span-5 flex flex-col items-center sm:items-end gap-7">
          
          {/* Avatar Photo Frame with Interactive Toggle */}
          <div className="w-full max-w-sm newspaper-photo relative rounded">
            
            {/* Top Badge */}
            <div className="flex items-center justify-between border-b-2 border-[var(--ink-black)] pb-2 mb-2 font-mono-tag text-[11px]">
              <span className="font-bold flex items-center gap-1.5 text-[var(--terracotta)]">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                PORTRAIT PLATE &bull; FIG. 01
              </span>
              <span className="bg-[#1d1d1b] text-white px-1.5 py-0.5 text-[10px]">
                {activeAvatar === "anime" ? "ANIME ART" : "AUTHENTIC PHOTO"}
              </span>
            </div>

            {/* Image Frame */}
            <div className="relative overflow-hidden aspect-square border-2 border-[var(--ink-black)] bg-[var(--paper-bg)]">
              <img
                src={activeAvatar === "anime" ? "/assets/avatar_anime.jpg" : "/assets/shreeram_photo.jpg"}
                alt="Shreeram S Hegde - Portrait"
                className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
              />
            </div>

            {/* Avatar Switcher Bar with Tactile Button */}
            <div className="mt-3 flex items-center justify-between text-xs font-mono-tag pt-2 border-t-2 border-[var(--ink-black)]">
              <span className="text-[var(--ink-muted)]">SHREERAM S HEGDE</span>
              <button
                onClick={toggleAvatar}
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold px-2.5 py-1 bg-[var(--ink-black)] text-[var(--paper-light)] hover:bg-[var(--terracotta)] hover:text-white transition-colors cursor-pointer border border-[var(--ink-black)] active:scale-95"
                title="Switch between Anime Art and Real Camera Photo"
              >
                <RefreshCw className="w-3 h-3" />
                <span>SWITCH TO {activeAvatar === "anime" ? "REAL PHOTO" : "ANIME ART"}</span>
              </button>
            </div>
          </div>

          {/* Miranda Rotating Seal & Postage Stamp Row */}
          <div className="w-full max-w-sm flex items-center justify-between gap-4 p-2">
            
            {/* Miranda Signature Rotating Circular Seal */}
            <div className="flex-shrink-0">
              <RotatingSeal size={105} centerIcon="✦" />
            </div>

            {/* Perforated Postage Stamp Card with Floating Physics */}
            <div 
              onClick={handleStampClick}
              className={`flex-1 flex items-center justify-center cursor-pointer transition-transform duration-300 ${
                stampPounded ? 'animate-stamp-impact' : 'animate-paper-float hover:scale-105'
              }`}
              title="Official Dispatch Stamp • Click for tactile stamp thud"
            >
              <img 
                src="/assets/stamp_shreeram.svg" 
                alt="Shreeram S Hegde - Official Postage Stamp" 
                className="w-full max-w-[210px] drop-shadow-[4px_6px_0px_#1d1d1b]"
              />
            </div>
          </div>

          {/* Quick Telegram Status Card */}
          <div className="w-full max-w-sm broadsheet-card p-4 rounded text-xs font-mono-tag">
            <div className="flex items-center justify-between border-b border-[var(--border-ink)] pb-2 mb-2">
              <span className="font-bold text-[var(--ink-black)] flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[var(--terracotta)]" />
                STATION
              </span>
              <span className="font-bold">{CONFIG.AUTHOR.locationShort}</span>
            </div>
            <div className="flex items-center justify-between border-b border-[var(--border-ink)] pb-2 mb-2">
              <span className="font-bold text-[var(--ink-black)] flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[var(--terracotta)]" />
                POSTAL DATE
              </span>
              <span>{CONFIG.AUTHOR.dob}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-bold text-[var(--ink-black)] flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-[var(--terracotta)]" />
                AVAILABILITY
              </span>
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping inline-block"></span>
                OPEN FOR ARCHITECTURE
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
