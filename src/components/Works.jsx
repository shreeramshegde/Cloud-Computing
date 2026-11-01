import React, { useState } from "react";
import { CONFIG } from "../config";
import ProjectModal from "./ProjectModal";
import { playTypewriterClick, playPaperRustle } from "../utils/sound";
import { ExternalLink, Layers, ArrowUpRight, Filter } from "lucide-react";

export default function Works() {
  const [selectedFilter, setSelectedFilter] = useState("ALL");
  const [activeModalProject, setActiveModalProject] = useState(null);

  const filters = ["ALL", "FEATURED", "CLOUD & ARCHITECTURE", "ENTERPRISE & SYSTEMS"];

  const filteredProjects = CONFIG.PROJECTS.filter((project) => {
    if (selectedFilter === "ALL") return true;
    if (selectedFilter === "FEATURED") return project.featured;
    if (selectedFilter === "CLOUD & ARCHITECTURE") {
      return project.category.includes("Cloud") || project.category.includes("Security");
    }
    if (selectedFilter === "ENTERPRISE & SYSTEMS") {
      return project.category.includes("Enterprise") || project.category.includes("Full-Stack") || project.category.includes("AI");
    }
    return true;
  });

  const handleProjectClick = (project) => {
    playPaperRustle();
    setActiveModalProject(project);
  };

  return (
    <section id="works" className="w-full border-b border-[var(--border-ink)] py-12 sm:py-16 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[var(--border-ink)] pb-6 mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 text-xs font-mono-tag text-[var(--terracotta)] font-bold">
              <span>[02] THE WORKS &bull; CHRONICLES &amp; ARCHIVES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-editorial-title font-black text-[var(--ink-black)] tracking-tight">
              Selected Works &amp; Architectural Builds
            </h2>
          </div>

          <div className="text-xs font-mono-tag text-[var(--ink-muted)] md:text-right">
            <span>TIP! CLICK ANY ARTICLE TO INSPECT FULL ARCHITECTURE</span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <span className="text-xs font-mono-tag font-bold mr-2 text-[var(--ink-muted)] flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> FILTER:
          </span>
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => {
                playTypewriterClick();
                setSelectedFilter(filter);
              }}
              className={`text-xs font-mono-tag px-3 py-1 rounded transition-all cursor-pointer ${
                selectedFilter === filter
                  ? "bg-[var(--ink-black)] text-[var(--paper-light)] font-bold shadow"
                  : "bg-[var(--paper-surface)] hover:bg-[var(--paper-light)] text-[var(--ink-black)] border border-[var(--border-ink)]"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Newspaper Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="broadsheet-card p-6 sm:p-7 rounded flex flex-col justify-between group"
            >
              <div>
                {/* Article Masthead */}
                <div className="flex items-center justify-between border-b border-[var(--border-ink)] pb-2.5 mb-4 text-xs font-mono-tag">
                  <div className="flex items-center gap-2">
                    <span className="bg-[var(--terracotta)] text-white font-bold px-2 py-0.5 rounded text-[11px]">
                      {project.number}
                    </span>
                    <span className="text-[var(--ink-muted)]">{project.year}</span>
                  </div>
                  <span className="text-[var(--ink-muted)] tracking-wider">
                    {project.category.toUpperCase()}
                  </span>
                </div>

                {/* Article Headline */}
                <h3 
                  onClick={() => handleProjectClick(project)}
                  className="text-2xl sm:text-3xl font-editorial-title font-black text-[var(--ink-black)] group-hover:text-[var(--terracotta)] transition-colors cursor-pointer mb-2 leading-tight"
                >
                  {project.title}
                </h3>

                {/* Tagline */}
                <p className="text-xs sm:text-sm font-headline text-[var(--terracotta)] tracking-wider mb-4">
                  {project.tagline}
                </p>

                {/* Article Body */}
                <p className="text-sm text-[var(--ink-black)] leading-relaxed text-justify mb-6 font-editorial-body">
                  {project.description}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-[var(--paper-bg)] border border-[var(--border-ink)] px-2 py-0.5 rounded text-[11px] font-mono-tag"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Action Footer */}
              <div className="pt-4 border-t border-[var(--border-ink)] flex items-center justify-between gap-3 text-xs font-mono-tag">
                <button
                  onClick={() => handleProjectClick(project)}
                  className="text-[var(--ink-black)] hover:text-[var(--terracotta)] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>INSPECT ARCHITECTURE</span>
                </button>

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playPaperRustle}
                    className="flex items-center gap-1 text-[var(--ink-muted)] hover:text-[var(--ink-black)] transition-colors font-bold"
                  >
                    <span>GITHUB</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Architectural Deep Dive Modal */}
      {activeModalProject && (
        <ProjectModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />
      )}
    </section>
  );
}
