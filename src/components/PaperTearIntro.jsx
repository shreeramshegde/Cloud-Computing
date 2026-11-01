import React, { useState, useEffect } from 'react';
import { CONFIG } from '../config';
import { playPaperTear, playStampThud } from '../utils/sound';
import { Scissors, Sparkles, ChevronDown } from 'lucide-react';

export function PaperTearIntro({ onUnfolded }) {
  const [isTorn, setIsTorn] = useState(false);
  const [isDestroyed, setIsDestroyed] = useState(false);

  const handleTear = () => {
    if (isTorn) return;
    setIsTorn(true);
    playPaperTear();
    playStampThud();

    // After animation completes, notify parent and unmount from layout
    setTimeout(() => {
      setIsDestroyed(true);
      if (onUnfolded) onUnfolded();
    }, 850);
  };

  useEffect(() => {
    const handleScrollOrWheel = (e) => {
      if (Math.abs(e.deltaY) > 8) {
        handleTear();
      }
    };

    const handleTouchMove = () => {
      handleTear();
    };

    const handleKeyDown = (e) => {
      if (['ArrowDown', 'Space', 'PageDown', 'Enter'].includes(e.code)) {
        handleTear();
      }
    };

    window.addEventListener('wheel', handleScrollOrWheel, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleScrollOrWheel);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isTorn]);

  if (isDestroyed) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] overflow-hidden select-none cursor-pointer transition-opacity duration-300 ${
        isTorn ? 'pointer-events-none' : ''
      }`}
      onClick={handleTear}
      title="Scroll or click anywhere to tear open the newspaper!"
    >
      {/* ========================================================
          TOP HALF OF TORN BROADSHEET
          ======================================================== */}
      <div
        className={`absolute top-0 left-0 w-full h-[51%] bg-[#cfc4ba] border-b-2 border-[#1d1d1b] flex flex-col justify-between p-6 sm:p-12 transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] shadow-[0px_10px_30px_rgba(29,29,27,0.4)] ${
          isTorn ? '-translate-y-[115%] -rotate-2 opacity-95' : 'translate-y-0'
        }`}
        style={{
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 97%, 95% 100%, 90% 96%, 85% 100%, 80% 97%, 75% 100%, 70% 96%, 65% 100%, 60% 97%, 55% 100%, 50% 96%, 45% 100%, 40% 97%, 35% 100%, 30% 96%, 25% 100%, 20% 97%, 15% 100%, 10% 96%, 5% 100%, 0% 97%)',
        }}
      >
        {/* Newspaper Top Gazette Bar */}
        <div className="flex items-center justify-between border-b-2 border-[#1d1d1b] pb-3 text-xs font-mono">
          <span className="font-bold text-[#d35230] tracking-widest uppercase">
            ★ THE MYSURU CHRONICLE &bull; SPECIAL EDITION
          </span>
          <span className="hidden sm:inline text-[#1d1d1b]/70">
            PRICE: GRATIS &bull; CIRCULATION: GLOBAL
          </span>
          <span className="font-bold border border-[#1d1d1b] px-2 py-0.5">
            VOL. 26 &bull; NO. 01
          </span>
        </div>

        {/* Masthead Display Title */}
        <div className="text-center my-auto py-2">
          <div className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.3em] text-[#1d1d1b]/70 mb-2">
            OFFICIAL DIGITAL BROADSHEET ARCHIVE
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#1d1d1b] tracking-tight uppercase">
            {CONFIG.AUTHOR.name}
          </h1>
          <p className="font-sans text-xs sm:text-sm font-bold tracking-widest text-[#d35230] uppercase mt-2">
            {CONFIG.AUTHOR.tagline}
          </p>
        </div>

        {/* Top half cut guide */}
        <div className="text-center pb-2 text-[10px] font-mono uppercase text-[#1d1d1b]/50 tracking-widest">
          TEAR ALONG THE SERRATED EDGE &darr;
        </div>
      </div>

      {/* ========================================================
          BOTTOM HALF OF TORN BROADSHEET
          ======================================================== */}
      <div
        className={`absolute bottom-0 left-0 w-full h-[51%] bg-[#cfc4ba] border-t-2 border-[#1d1d1b] flex flex-col justify-between p-6 sm:p-12 transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] shadow-[0px_-10px_30px_rgba(29,29,27,0.4)] ${
          isTorn ? 'translate-y-[115%] rotate-2 opacity-95' : 'translate-y-0'
        }`}
        style={{
          clipPath: 'polygon(0% 3%, 5% 0%, 10% 4%, 15% 0%, 20% 3%, 25% 0%, 30% 4%, 35% 0%, 40% 3%, 45% 0%, 50% 4%, 55% 0%, 60% 3%, 65% 0%, 70% 4%, 75% 0%, 80% 3%, 85% 0%, 90% 4%, 95% 0%, 100% 3%, 100% 100%, 0% 100%)',
        }}
      >
        {/* Bottom half cut guide */}
        <div className="text-center pt-2 text-[10px] font-mono uppercase text-[#1d1d1b]/50 tracking-widest">
          &uarr; SERRATED PERFORATION SEAM
        </div>

        {/* Subhead Manifesto */}
        <div className="text-center max-w-2xl mx-auto my-auto py-2 space-y-3">
          <p className="font-serif italic text-base sm:text-xl text-[#1d1d1b]">
            &ldquo;We architect fault-tolerant distributed cloud primitives and tactile paper-grade interactive interfaces.&rdquo;
          </p>
          <div className="flex items-center justify-center gap-3 text-xs font-mono font-bold text-[#1d1d1b]">
            <span>MYSURU, IN</span>
            <span>&bull;</span>
            <span>SPRING BOOT</span>
            <span>&bull;</span>
            <span>AWS SERVERLESS</span>
          </div>
        </div>

        {/* Bottom metadata */}
        <div className="flex items-center justify-between border-t-2 border-[#1d1d1b] pt-3 text-xs font-mono text-[#1d1d1b]/70">
          <span>&copy; {new Date().getFullYear()} SHREERAM S HEGDE</span>
          <span className="flex items-center gap-1 text-[#d35230] font-bold animate-pulse">
            <ChevronDown className="w-4 h-4" /> SCROLL OR TAP TO UNFOLD
          </span>
        </div>
      </div>

      {/* ========================================================
          CENTER TEAR STRIP & WAX SEAL EMBLEM
          ======================================================== */}
      <div
        className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-500 ${
          isTorn ? 'scale-125 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        {/* Horizontal Dashed Tear Line */}
        <div className="absolute w-full border-b-2 border-dashed border-[#d35230] flex items-center justify-around px-8">
          <div className="bg-[#cfc4ba] px-4 py-1 font-mono text-xs font-bold text-[#d35230] flex items-center gap-2 border border-[#d35230] shadow-[2px_2px_0px_#1d1d1b]">
            <Scissors className="w-3.5 h-3.5 animate-bounce" />
            <span>TEAR PERFORATION OR SCROLL DOWN TO OPEN</span>
          </div>
        </div>

        {/* Center Wax Seal / Postmark Stamp */}
        <div className="relative z-10 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#d35230] text-white border-4 border-[#1d1d1b] flex flex-col items-center justify-center shadow-[6px_6px_0px_#1d1d1b] animate-bounce hover:scale-105 transition-transform">
          <div className="text-[10px] font-mono font-bold tracking-widest uppercase">
            MYSURU
          </div>
          <div className="font-serif font-black text-2xl sm:text-3xl my-0.5">
            2026
          </div>
          <div className="text-[9px] font-mono uppercase tracking-tighter bg-[#1d1d1b] px-2 py-0.5 rounded text-white font-bold">
            TEAR &bull; OPEN
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaperTearIntro;
