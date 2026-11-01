import React, { useState, useEffect } from "react";
import { CONFIG } from "../config";
import { playTypewriterClick, playPaperRustle, toggleSound, isSoundEnabled } from "../utils/sound";
import { smoothScrollTo } from "../utils/scroll";
import { Volume2, VolumeX, ArrowUpRight, Radio } from "lucide-react";

export default function Header({ visitorCount, onRefold }) {
  const [soundOn, setSoundOn] = useState(false);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentDate(now.toLocaleDateString('en-US', options).toUpperCase());
  }, []);

  const handleSoundToggle = () => {
    const nextState = toggleSound();
    setSoundOn(nextState);
    if (nextState) {
      playTypewriterClick();
    }
  };

  const scrollToSection = (id) => {
    playPaperRustle();
    smoothScrollTo(id, 28);
  };

  return (
    <header className="w-full border-b border-[var(--border-ink)] bg-[var(--paper-bg)] sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      {/* Top Gazette Metadata Bar */}
      <div className="w-full border-b border-[var(--border-ink)] py-1.5 px-4 sm:px-8 text-[11px] sm:text-xs font-mono-tag flex flex-wrap items-center justify-between gap-2 text-[var(--ink-muted)]">
        <div className="flex items-center gap-3">
          <span className="font-bold text-[var(--terracotta)] flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 animate-pulse text-[var(--terracotta)]" />
            VOL. 26 &bull; NO. 01
          </span>
          <span className="hidden md:inline-block border-l border-[var(--border-ink)] pl-3">
            {CONFIG.AUTHOR.location.toUpperCase()}
          </span>
          <span className="hidden lg:inline-block border-l border-[var(--border-ink)] pl-3">
            WEATHER: 24&deg;C &bull; SYSTEMS OPERATIONAL
          </span>
        </div>

        <div className="flex items-center gap-4">
          {/* Live Visitor Counter Badge */}
          <div className="flex items-center gap-1.5 bg-[var(--paper-surface)] px-2.5 py-0.5 rounded border border-[var(--border-ink)]">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
            <span className="text-[var(--ink-black)] font-bold">
              {visitorCount !== null ? `VISITORS: ${visitorCount}` : "VISITORS: TELEMETRY ACTIVE"}
            </span>
          </div>

          {/* Re-fold Newspaper Button */}
          {onRefold && (
            <button
              onClick={onRefold}
              className="hidden sm:flex items-center gap-1 text-[var(--ink-black)] hover:text-[var(--terracotta)] transition-colors cursor-pointer px-1.5 py-0.5 rounded text-[11px] font-bold border border-[var(--border-ink)]"
              title="Re-fold and tear the broadsheet newspaper cover"
            >
              <span>↺ REFOLD</span>
            </button>
          )}

          {/* Sound Toggle Button */}
          <button
            onClick={handleSoundToggle}
            className="flex items-center gap-1 text-[var(--ink-black)] hover:text-[var(--terracotta)] transition-colors cursor-pointer px-1.5 py-0.5 rounded"
            title={soundOn ? "Mute tactile sound effects" : "Enable tactile typewriter & paper sounds"}
          >
            {soundOn ? <Volume2 className="w-3.5 h-3.5 text-[var(--terracotta)]" /> : <VolumeX className="w-3.5 h-3.5 text-[var(--ink-muted)]" />}
            <span className="hidden sm:inline">{soundOn ? "SOUND ON" : "SOUND OFF"}</span>
          </button>
        </div>
      </div>

      {/* Main Newspaper Masthead */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-4 pb-3 text-center">
        <div className="text-[10px] sm:text-xs font-mono-tag tracking-[0.25em] text-[var(--ink-muted)] mb-1">
          {currentDate || "EDITION 2026 &bull; OFFICIAL PRINT JOURNAL"}
        </div>

        <h1 
          onClick={() => scrollToSection('hero')}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-editorial-title font-black text-[var(--ink-black)] tracking-tight cursor-pointer hover:opacity-90 transition-opacity uppercase"
        >
          {CONFIG.AUTHOR.name}
        </h1>

        <div className="mt-1 flex items-center justify-center gap-3 text-xs sm:text-sm font-headline tracking-widest text-[var(--terracotta)]">
          <span>{CONFIG.AUTHOR.tagline}</span>
        </div>
      </div>

      {/* Editorial Navigation Menu */}
      <nav className="w-full border-t border-[var(--border-ink)] py-2 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto no-scrollbar gap-6 text-xs sm:text-sm font-mono-tag">
          <div className="flex items-center gap-5 sm:gap-8 whitespace-nowrap">
            <button 
              onClick={() => scrollToSection('hero')} 
              className="hover:text-[var(--terracotta)] hover:underline decoration-1 underline-offset-4 transition-colors cursor-pointer font-bold"
            >
              [01] INDEX
            </button>
            <button 
              onClick={() => scrollToSection('works')} 
              className="hover:text-[var(--terracotta)] hover:underline decoration-1 underline-offset-4 transition-colors cursor-pointer"
            >
              [02] WORKS
            </button>
            <button 
              onClick={() => scrollToSection('philosophy')} 
              className="hover:text-[var(--terracotta)] hover:underline decoration-1 underline-offset-4 transition-colors cursor-pointer"
            >
              [03] PHILOSOPHY
            </button>
            <button 
              onClick={() => scrollToSection('arsenal')} 
              className="hover:text-[var(--terracotta)] hover:underline decoration-1 underline-offset-4 transition-colors cursor-pointer"
            >
              [04] ARSENAL
            </button>
            <button 
              onClick={() => scrollToSection('dispatch')} 
              className="hover:text-[var(--terracotta)] hover:underline decoration-1 underline-offset-4 transition-colors cursor-pointer"
            >
              [05] DISPATCH
            </button>
          </div>

          <div className="flex items-center gap-4 whitespace-nowrap pl-4 border-l border-[var(--border-ink)]">
            <a
              href={CONFIG.AUTHOR.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playTypewriterClick}
              className="bg-[var(--ink-black)] text-[var(--paper-light)] hover:bg-[var(--terracotta)] transition-colors px-3 py-1 rounded text-xs flex items-center gap-1 font-bold tracking-wider"
            >
              <span>RESUME</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
