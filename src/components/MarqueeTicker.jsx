import React from "react";

export default function MarqueeTicker() {
  const tickerItems = [
    "ARCH GUY & SYSTEMS ARTISAN",
    "SPRING BOOT & DISTRIBUTED ENTERPRISE SERVICES",
    "RESILIENT AWS SERVERLESS CLOUD ARCHITECTURE",
    "REACT 19 & TACTILE HIGH-FIDELITY WEB EXPERIENCES",
    "ATOMIC CONCURRENCY & SUB-35MS TELEMETRY",
    "OPEN FOR HIGH-IMPACT COLLABORATIONS",
    "MYSURU, KARNATAKA, INDIA",
  ];

  return (
    <div className="w-full bg-[var(--ink-black)] text-[var(--paper-light)] py-2.5 overflow-hidden border-y border-[var(--ink-black)] select-none">
      <div className="animate-marquee whitespace-nowrap flex items-center font-headline text-xs sm:text-sm tracking-widest uppercase">
        {/* Double array to create seamless loop */}
        {[...tickerItems, ...tickerItems, ...tickerItems].map((item, idx) => (
          <div key={idx} className="flex items-center">
            <span className="mx-4 text-[var(--terracotta)] font-bold text-base">&bull;</span>
            <span className="hover:text-[var(--terracotta)] transition-colors cursor-default">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
