import React, { useEffect } from "react";
import { X, ExternalLink, CheckCircle2, Layers, Cpu, Database, Cloud } from "lucide-react";
import GithubIcon from "./GithubIcon";
import { playTypewriterClick, playPaperRustle } from "../utils/sound";

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[var(--paper-bg)] border-2 border-[var(--ink-black)] rounded shadow-2xl p-6 sm:p-8 relative font-editorial-body text-[var(--ink-black)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Gazette Bar */}
        <div className="flex items-center justify-between border-b border-[var(--border-ink)] pb-3 mb-6">
          <div className="flex items-center gap-2 text-xs font-mono-tag">
            <span className="bg-[var(--terracotta)] text-white px-2 py-0.5 rounded font-bold">
              {project.number}
            </span>
            <span className="text-[var(--ink-muted)]">
              {project.category.toUpperCase()} &bull; {project.year}
            </span>
          </div>

          <button
            onClick={() => {
              playTypewriterClick();
              onClose();
            }}
            className="p-1.5 rounded-full hover:bg-[var(--paper-surface)] text-[var(--ink-black)] transition-colors cursor-pointer"
            title="Close architectural dispatch"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Project Headline */}
        <h3 className="text-2xl sm:text-4xl font-editorial-title font-black mb-2 leading-tight">
          {project.title}
        </h3>
        <p className="text-sm sm:text-base font-headline text-[var(--terracotta)] tracking-wider mb-6">
          {project.tagline}
        </p>

        {/* Main Editorial Body */}
        <div className="space-y-4 text-justify text-sm sm:text-base leading-relaxed border-b border-[var(--border-ink)] pb-6 mb-6">
          <p>{project.description}</p>
          <div className="bg-[var(--paper-surface)] p-4 rounded border border-[var(--border-ink)]">
            <h4 className="font-mono-tag font-bold text-xs text-[var(--terracotta)] mb-2 flex items-center gap-1.5">
              <Layers className="w-4 h-4" />
              SYSTEM HIGHLIGHTS &amp; DESIGN DECISIONS
            </h4>
            <ul className="text-xs sm:text-sm space-y-1.5 font-mono-tag text-[var(--ink-black)]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span>Engineered for sub-second response times and zero idle operational footprint.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span>Stateless execution model preventing cross-request memory contamination.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span>Declarative configuration, cryptographic hashing, and automated continuous delivery.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Tech Stack Pills */}
        <div className="mb-8">
          <div className="text-xs font-mono-tag font-bold text-[var(--ink-muted)] mb-2.5">
            TECHNOLOGY ARSENAL
          </div>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-[var(--paper-surface)] border border-[var(--border-ink)] px-2.5 py-1 rounded text-xs font-mono-tag"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <div className="text-xs font-mono-tag text-[var(--ink-muted)]">
            STATUS: <span className="text-[var(--terracotta)] font-bold">{project.status}</span>
          </div>

          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playPaperRustle}
                className="bg-[var(--ink-black)] text-[var(--paper-light)] hover:bg-[var(--terracotta)] transition-colors px-4 py-2 rounded text-xs font-mono-tag font-bold flex items-center gap-1.5"
              >
                <GithubIcon size={14} className="w-3.5 h-3.5" />
                <span>GITHUB REPOSITORY</span>
              </a>
            )}
            <button
              onClick={() => {
                playTypewriterClick();
                onClose();
              }}
              className="border border-[var(--border-ink)] hover:bg-[var(--paper-surface)] transition-colors px-4 py-2 rounded text-xs font-mono-tag font-bold cursor-pointer"
            >
              DISMISS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
