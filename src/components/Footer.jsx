import React from 'react';
import { CONFIG } from '../config';
import { playPaperRustle } from '../utils/sound';

export function Footer() {
  const scrollToTop = () => {
    playPaperRustle();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#cfc4ba] border-t-4 border-[#1d1d1b] pt-16 pb-12 text-[#1d1d1b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Newspaper Colophon Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 border-b-2 border-[#1d1d1b] pb-12 mb-10">
          
          {/* Main Masthead Credit */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-4 h-4 bg-[#d35230] inline-block"></span>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#1d1d1b]">
                COLOPHON &middot; ISSUE VOL. XXIV &mdash; 2026
              </span>
            </div>
            
            <h3 className="font-serif text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#1d1d1b]">
              {CONFIG.AUTHOR.name}
            </h3>

            <p className="font-mono text-xs text-[#1d1d1b]/80 max-w-md leading-relaxed">
              Arch Guy with deep knowledge of Full-Stack &amp; Spring Boot. Architecting distributed serverless systems on AWS and crafting tactile, paper-grade digital artifacts from Mysuru, Karnataka, India.
            </p>

            <div className="font-mono text-[11px] text-[#1d1d1b]/60 space-y-1">
              <p>&bull; TYPESET IN: CINZEL, PLAYFAIR DISPLAY, SPACE MONO &amp; OSWALD</p>
              <p>&bull; PALETTE: AGED NEWSPRINT (#cfc4ba), CARBON BLACK (#1d1d1b), TERRACOTTA (#d35230)</p>
              <p>&bull; INFRASTRUCTURE: AWS AP-SOUTHEAST-2 (S3, API GATEWAY, DYNAMODB, SNS)</p>
            </div>
          </div>

          {/* Quick Index */}
          <div className="md:col-span-3 space-y-3">
            <div className="font-mono text-xs font-bold uppercase tracking-widest text-[#d35230] border-b border-[#1d1d1b]/40 pb-2">
              EDITION DIRECTORY
            </div>
            <ul className="space-y-2 font-mono text-xs">
              <li>
                <a href="#hero" onClick={playPaperRustle} className="hover:text-[#d35230] transition-colors flex items-center justify-between">
                  <span>I. Front Page</span>
                  <span>&rarr;</span>
                </a>
              </li>
              <li>
                <a href="#works" onClick={playPaperRustle} className="hover:text-[#d35230] transition-colors flex items-center justify-between">
                  <span>II. Selected Works</span>
                  <span>&rarr;</span>
                </a>
              </li>
              <li>
                <a href="#philosophy" onClick={playPaperRustle} className="hover:text-[#d35230] transition-colors flex items-center justify-between">
                  <span>III. Philosophy</span>
                  <span>&rarr;</span>
                </a>
              </li>
              <li>
                <a href="#arsenal" onClick={playPaperRustle} className="hover:text-[#d35230] transition-colors flex items-center justify-between">
                  <span>IV. Technical Arsenal</span>
                  <span>&rarr;</span>
                </a>
              </li>
              <li>
                <a href="#telemetry" onClick={playPaperRustle} className="hover:text-[#d35230] transition-colors flex items-center justify-between">
                  <span>V. Live Telemetry</span>
                  <span>&rarr;</span>
                </a>
              </li>
              <li>
                <a href="#contact" onClick={playPaperRustle} className="hover:text-[#d35230] transition-colors flex items-center justify-between">
                  <span>VI. Telegraphic Wire</span>
                  <span>&rarr;</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Coordinates & Back-To-Top */}
          <div className="md:col-span-3 space-y-3 flex flex-col justify-between">
            <div>
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-[#d35230] border-b border-[#1d1d1b]/40 pb-2 mb-3">
                DIRECT WIRES
              </div>
              <ul className="space-y-2 font-mono text-xs">
                <li>
                  <a
                    href={CONFIG.AUTHOR.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#d35230] transition-colors flex items-center justify-between"
                  >
                    <span>GitHub /shreeramshegde</span>
                    <span>&nearr;</span>
                  </a>
                </li>
                <li>
                  <a
                    href={CONFIG.AUTHOR.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#d35230] transition-colors flex items-center justify-between"
                  >
                    <span>LinkedIn /in/shreeram-suchetan</span>
                    <span>&nearr;</span>
                  </a>
                </li>
                <li>
                  <a
                    href={CONFIG.AUTHOR.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#d35230] transition-colors flex items-center justify-between font-bold text-[#d35230]"
                  >
                    <span>Curriculum Vitae (PDF)</span>
                    <span>&nearr;</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${CONFIG.AUTHOR.email}`}
                    className="hover:text-[#d35230] transition-colors flex items-center justify-between truncate"
                  >
                    <span className="truncate">{CONFIG.AUTHOR.email}</span>
                    <span>&nearr;</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Back to top button */}
            <div className="pt-4">
              <button
                type="button"
                onClick={scrollToTop}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 border-2 border-[#1d1d1b] bg-[#cfc4ba] hover:bg-[#1d1d1b] hover:text-[#cfc4ba] font-mono text-xs uppercase font-bold tracking-widest transition-colors shadow-[3px_3px_0px_#1d1d1b] active:translate-y-0.5"
              >
                <span>&uarr; Return to Top</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Banner */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#1d1d1b]/70">
          <div>
            &copy; {new Date().getFullYear()} {CONFIG.AUTHOR.name}. ALL RIGHTS RESERVED &middot; CRAFTED IN MYSURU, IN.
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            <span>AMAZON S3 &bull; CLOUD RUN &bull; API GATEWAY &bull; DYNAMODB</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;

