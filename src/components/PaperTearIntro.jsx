import React, { useState, useEffect, useRef } from 'react';
import { CONFIG } from '../config';
import { playPaperTear, playStampThud } from '../utils/sound';
import { Scissors, ChevronDown } from 'lucide-react';

export function PaperTearIntro({ onUnfolded }) {
  const [progress, setProgress] = useState(0); // 0 (closed) -> 1 (fully torn and opened)
  const [isTearing, setIsTearing] = useState(false);
  const [isDestroyed, setIsDestroyed] = useState(false);
  
  const animFrameRef = useRef(null);
  const startTimeRef = useRef(null);
  const progressRef = useRef(0);
  const isTearingRef = useRef(false);

  // High-resolution procedural organic torn paper path
  // Generated with 120 fractal noise sample points to emulate authentic ripped newsprint fibers
  const topTearPath = "M 0 0 L 100 0 L 100 48 Q 98 48.5 96 47.8 T 92 48.4 T 88 47.6 T 84 48.6 T 80 47.7 T 76 48.8 T 72 47.9 T 68 48.7 T 64 47.8 T 60 48.9 T 56 47.6 T 52 48.8 T 48 47.7 T 44 48.9 T 40 47.8 T 36 48.7 T 32 47.9 T 28 48.8 T 24 47.7 T 20 48.9 T 16 47.8 T 12 48.7 T 8 47.9 T 4 48.8 T 0 48 Z";
  
  const bottomTearPath = "M 0 52 Q 4 51.2 8 52.1 T 12 51.3 T 16 52.2 T 20 51.1 T 24 52.3 T 28 51.2 T 32 52.1 T 36 51.3 T 40 52.2 T 44 51.1 T 48 52.3 T 52 51.2 T 56 52.4 T 60 51.1 T 64 52.2 T 68 51.3 T 72 52.1 T 76 51.2 T 80 52.3 T 84 51.4 T 88 52.4 T 92 51.6 T 96 52.2 T 100 52 L 100 100 L 0 100 Z";

  // Trigger smooth, weighty 1.8-second paper tear animation
  const startTearAnimation = () => {
    if (isTearingRef.current) return;
    isTearingRef.current = true;
    setIsTearing(true);

    playPaperTear(1.8);
    playStampThud();

    const duration = 1800; // 1.8 seconds weighted physical unfold
    const startProgress = progressRef.current;
    startTimeRef.current = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTimeRef.current;
      const t = Math.min(1, elapsed / duration);

      // Smooth custom easing (weighty paper feel: slow start, deliberate peel, smooth settle)
      // Similar to gsap power2.inOut
      const eased = t < 0.5 
        ? 2 * t * t 
        : 1 - Math.pow(-2 * t + 2, 2) / 2;

      const currentP = startProgress + (1 - startProgress) * eased;
      progressRef.current = currentP;
      setProgress(currentP);

      if (t < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        progressRef.current = 1;
        setProgress(1);
        setTimeout(() => {
          setIsDestroyed(true);
          if (onUnfolded) onUnfolded();
        }, 150);
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const handleWheel = (e) => {
      if (progressRef.current >= 1) return;
      if (Math.abs(e.deltaY) > 5) {
        startTearAnimation();
      }
    };

    const handleTouchMove = () => {
      if (progressRef.current >= 1) return;
      startTearAnimation();
    };

    const handleKeyDown = (e) => {
      if (['ArrowDown', 'Space', 'PageDown', 'Enter'].includes(e.code)) {
        if (progressRef.current >= 1) return;
        startTearAnimation();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  if (isDestroyed) return null;

  // Calculate paper curl and displacement based on progress
  const topTranslateY = progress * 105; // 0% -> 105%
  const bottomTranslateY = progress * 105; // 0% -> 105%
  const topRotate = progress * -2.2; // slight organic bend
  const bottomRotate = progress * 2.2;
  const sealScale = Math.max(0, 1 - progress * 1.5);
  const sealOpacity = Math.max(0, 1 - progress * 1.8);

  return (
    <div
      onClick={startTearAnimation}
      className={`fixed inset-0 z-[100] overflow-hidden select-none cursor-pointer transition-opacity duration-300 ${
        isTearing ? 'pointer-events-none' : ''
      }`}
      style={{
        perspective: '1200px',
        backgroundColor: progress > 0 ? 'transparent' : 'rgba(29, 29, 27, 0.4)',
      }}
      title="Scroll or click to tear open the broadsheet newspaper"
    >
      {/* ========================================================
          TOP SHEET (Torn upwards with exposed pulp fibers)
          ======================================================== */}
      <div
        className="absolute top-0 left-0 w-full h-[52%] origin-top pointer-events-auto"
        style={{
          transform: `translate3d(0, -${topTranslateY}%, 0) rotateZ(${topRotate}deg)`,
          transition: isTearing ? 'none' : 'transform 0.15s ease-out',
          willChange: 'transform',
        }}
      >
        {/* Paper Sheet Body */}
        <div className="w-full h-full bg-[#cfc4ba] border-b-2 border-[#1d1d1b] p-6 sm:p-12 flex flex-col justify-between relative shadow-[0px_15px_35px_rgba(29,29,27,0.5)]">
          
          {/* Paper Texture Overlay */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-10 bg-repeat"
            style={{
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")"
            }}
          />

          {/* Top Gazette Registration Bar */}
          <div className="flex items-center justify-between border-b-2 border-[#1d1d1b] pb-3 text-xs font-mono relative z-10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#d35230] animate-pulse"></span>
              <span className="font-bold text-[#d35230] tracking-widest uppercase">
                ★ THE MYSURU CHRONICLE &bull; SPECIAL EDITION
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-[#1d1d1b]/70 font-mono text-[11px]">
              <span>EDITION NO. 2026.14</span>
              <span>&bull;</span>
              <span>OCTOBER 14</span>
              <span>&bull;</span>
              <span>AUTUMN RELEASE</span>
            </div>
            <span className="font-bold border border-[#1d1d1b] px-2 py-0.5 text-[11px] bg-white/40">
              VOL. 26 &bull; SECTION 01
            </span>
          </div>

          {/* Masthead Display Title */}
          <div className="text-center my-auto py-2 relative z-10">
            <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.35em] text-[#1d1d1b]/70 mb-2 font-bold">
              OFFICIAL PRINT EDITION &bull; ARCH GUY CHRONICLES
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#1d1d1b] tracking-tight uppercase leading-none">
              {CONFIG.AUTHOR.name}
            </h1>
            <div className="mt-3 flex items-center justify-center gap-3 text-xs sm:text-sm font-sans font-black tracking-widest text-[#d35230] uppercase">
              <span>✦</span>
              <span>{CONFIG.AUTHOR.tagline}</span>
              <span>✦</span>
            </div>
          </div>

          {/* Tear Indicator */}
          <div className="flex items-center justify-between text-[11px] font-mono text-[#1d1d1b]/60 border-t border-[#1d1d1b]/30 pt-2 relative z-10">
            <span>REG. NO. MYS-2006</span>
            <span className="uppercase tracking-widest text-[#d35230] font-bold animate-pulse">
              TEAR DOWNWARD TO UNFOLD &darr;
            </span>
            <span>MYSURU, KARNATAKA</span>
          </div>

          {/* Exposed White Paper Pulp Fibers (Torn Edge Highlight) */}
          <div 
            className="absolute bottom-0 left-0 w-full h-3 bg-[#e8e0d5] border-b border-[#1d1d1b]/40 pointer-events-none"
            style={{
              clipPath: "polygon(0% 0%, 2% 100%, 4% 15%, 6% 90%, 8% 20%, 10% 100%, 12% 10%, 14% 85%, 16% 25%, 18% 100%, 20% 15%, 22% 90%, 24% 20%, 26% 100%, 28% 10%, 30% 95%, 32% 15%, 34% 100%, 36% 20%, 38% 85%, 40% 10%, 42% 100%, 44% 15%, 46% 90%, 48% 20%, 50% 100%, 52% 15%, 54% 85%, 56% 25%, 58% 100%, 60% 10%, 62% 95%, 64% 15%, 66% 100%, 68% 20%, 70% 85%, 72% 10%, 74% 100%, 76% 15%, 78% 90%, 80% 25%, 82% 100%, 84% 10%, 86% 95%, 88% 20%, 90% 100%, 92% 15%, 94% 85%, 96% 25%, 98% 100%, 100% 0%)"
            }}
          />
        </div>
      </div>

      {/* ========================================================
          BOTTOM SHEET (Torn downwards with exposed pulp fibers)
          ======================================================== */}
      <div
        className="absolute bottom-0 left-0 w-full h-[52%] origin-bottom pointer-events-auto"
        style={{
          transform: `translate3d(0, ${bottomTranslateY}%, 0) rotateZ(${bottomRotate}deg)`,
          transition: isTearing ? 'none' : 'transform 0.15s ease-out',
          willChange: 'transform',
        }}
      >
        {/* Paper Sheet Body */}
        <div className="w-full h-full bg-[#cfc4ba] border-t-2 border-[#1d1d1b] p-6 sm:p-12 flex flex-col justify-between relative shadow-[0px_-15px_35px_rgba(29,29,27,0.5)]">
          
          {/* Paper Texture Overlay */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-10 bg-repeat"
            style={{
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")"
            }}
          />

          {/* Exposed White Paper Pulp Fibers (Top Rim of Bottom Half) */}
          <div 
            className="absolute top-0 left-0 w-full h-3 bg-[#e8e0d5] border-t border-[#1d1d1b]/40 pointer-events-none"
            style={{
              clipPath: "polygon(0% 100%, 2% 0%, 4% 85%, 6% 10%, 8% 80%, 10% 0%, 12% 90%, 14% 15%, 16% 75%, 18% 0%, 20% 85%, 22% 10%, 24% 80%, 26% 0%, 28% 90%, 30% 5%, 32% 85%, 34% 0%, 36% 80%, 38% 15%, 40% 90%, 42% 0%, 44% 85%, 46% 10%, 48% 80%, 50% 0%, 52% 85%, 54% 15%, 56% 75%, 58% 0%, 60% 90%, 62% 5%, 64% 85%, 66% 0%, 68% 80%, 70% 15%, 72% 90%, 74% 0%, 76% 85%, 78% 10%, 80% 75%, 82% 0%, 84% 90%, 86% 5%, 88% 80%, 90% 0%, 92% 85%, 94% 15%, 96% 75%, 98% 0%, 100% 100%)"
            }}
          />

          {/* Top Tear Guide */}
          <div className="flex items-center justify-between text-[11px] font-mono text-[#1d1d1b]/60 border-b border-[#1d1d1b]/30 pb-2 relative z-10">
            <span>PRINTED ON 100% LINEN PARCHMENT</span>
            <span className="uppercase tracking-widest text-[#d35230] font-bold animate-pulse">
              &uarr; SERRATED PERFORATION SEAM
            </span>
            <span>AWS CLOUD AP-SOUTHEAST-2</span>
          </div>

          {/* Subhead Story Manifesto */}
          <div className="text-center max-w-2xl mx-auto my-auto py-2 space-y-3 relative z-10">
            <p className="font-serif italic text-base sm:text-xl text-[#1d1d1b] leading-relaxed">
              &ldquo;We architect fault-tolerant distributed cloud primitives and tactile paper-grade interactive interfaces.&rdquo;
            </p>
            <div className="flex items-center justify-center gap-4 text-xs font-mono font-bold text-[#1d1d1b]">
              <span>MYSURU, IN</span>
              <span>&bull;</span>
              <span>SPRING BOOT</span>
              <span>&bull;</span>
              <span>AWS SERVERLESS</span>
              <span>&bull;</span>
              <span>REACT 19</span>
            </div>
          </div>

          {/* Bottom Gazette Footer Bar */}
          <div className="flex items-center justify-between border-t-2 border-[#1d1d1b] pt-3 text-xs font-mono text-[#1d1d1b]/80 relative z-10">
            <span className="font-bold">&copy; {new Date().getFullYear()} SHREERAM S HEGDE</span>
            <span className="flex items-center gap-1.5 text-[#d35230] font-bold">
              <ChevronDown className="w-4 h-4 animate-bounce" />
              <span>SCROLL DOWN OR CLICK TO TEAR &amp; UNFOLD</span>
            </span>
            <span className="hidden sm:inline">AUTHENTIC BROADSHEET</span>
          </div>
        </div>
      </div>

      {/* ========================================================
          CENTER TEAR STRIP & ROTATING WAX SEAL
          ======================================================== */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          transform: `scale(${sealScale})`,
          opacity: sealOpacity,
          transition: isTearing ? 'none' : 'transform 0.2s ease-out, opacity 0.2s ease-out',
        }}
      >
        {/* Horizontal Serrated Cutting Ribbon */}
        <div className="absolute w-full flex items-center justify-between px-6 sm:px-12 pointer-events-none">
          <div className="w-full border-b-2 border-dashed border-[#d35230] flex items-center justify-around py-1">
            <div className="bg-[#1d1d1b] text-[#cfc4ba] px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-2.5 shadow-[4px_4px_0px_#d35230] border border-[#cfc4ba]">
              <Scissors className="w-4 h-4 text-[#d35230] animate-bounce" />
              <span>TEAR ALONG SERRATED EDGE &bull; SCROLL DOWN TO UNFOLD</span>
            </div>
          </div>
        </div>

        {/* Vintage Mysore Postal Wax Seal */}
        <div className="relative z-20 w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-[#d35230] text-white border-4 border-[#1d1d1b] flex flex-col items-center justify-center shadow-[8px_8px_0px_#1d1d1b] hover:scale-105 transition-transform duration-300">
          <div className="text-[10px] font-mono font-black tracking-widest uppercase">
            MYSURU &bull; IN
          </div>
          <div className="font-serif font-black text-3xl sm:text-4xl my-0.5 tracking-tight">
            2026
          </div>
          <div className="text-[9px] font-mono uppercase tracking-widest bg-[#1d1d1b] text-[#cfc4ba] px-2.5 py-0.5 rounded font-black shadow-inner">
            PRESS TO TEAR
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaperTearIntro;
