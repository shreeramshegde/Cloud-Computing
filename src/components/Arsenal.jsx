import React from "react";
import { CONFIG } from "../config";
import { Cloud, Cpu, Terminal, CheckCircle2 } from "lucide-react";

export default function Arsenal() {
  const getCategoryIcon = (category) => {
    if (category.includes("Cloud")) return <Cloud className="w-4 h-4 text-[var(--terracotta)]" />;
    if (category.includes("Backend")) return <Cpu className="w-4 h-4 text-[var(--terracotta)]" />;
    return <Terminal className="w-4 h-4 text-[var(--terracotta)]" />;
  };

  return (
    <section id="arsenal" className="w-full border-b border-[var(--border-ink)] py-14 sm:py-20 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="border-b border-[var(--border-ink)] pb-6 mb-10">
          <div className="flex items-center gap-2 mb-2 text-xs font-mono-tag text-[var(--terracotta)] font-bold">
            <span>[04] THE ARSENAL &bull; TECHNICAL DIRECTORY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-editorial-title font-black text-[var(--ink-black)] tracking-tight">
            Classified Registry of Technologies
          </h2>
          <p className="text-xs sm:text-sm font-headline text-[var(--terracotta)] tracking-widest mt-1">
            THE ARTISAN'S TOOLKIT &bull; VERIFIED IN PRODUCTION
          </p>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CONFIG.ARSENAL.map((group, idx) => (
            <div
              key={idx}
              className="broadsheet-card p-6 rounded flex flex-col justify-between border border-[var(--border-ink)]"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-[var(--border-ink)]">
                  {getCategoryIcon(group.category)}
                  <h3 className="text-lg font-editorial-title font-black text-[var(--ink-black)]">
                    {group.category}
                  </h3>
                </div>

                <p className="text-xs font-editorial-body italic text-[var(--ink-muted)] mb-5">
                  {group.lead}
                </p>

                {/* Skill Items */}
                <ul className="space-y-3.5">
                  {group.skills.map((skill, sIdx) => (
                    <li key={sIdx} className="flex flex-col border-b border-[var(--border-ink)]/60 pb-2 text-xs font-mono-tag">
                      <div className="flex items-center justify-between font-bold text-[var(--ink-black)]">
                        <span>{skill.name}</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                      </div>
                      <span className="text-[11px] text-[var(--ink-muted)] mt-0.5">
                        {skill.level}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 mt-6 border-t border-[var(--border-ink)] text-[10px] font-mono-tag text-[var(--ink-muted)] text-right">
                REGISTRY ID &bull; 0{idx + 1}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
