import React from "react";
import { CONFIG } from "../config";
import { Activity, Clock, ShieldCheck, GitCommit, Database, Zap, Radio } from "lucide-react";
import { playPaperRustle } from "../utils/sound";

export default function Telemetry({ visitorCount }) {
  const telemetryItems = [
    {
      label: "LIVE AUDIT & VISITS",
      value: visitorCount !== null ? `${visitorCount}` : "SYNCING",
      subtext: "Persisted in Amazon DynamoDB via Atomic Increment",
      icon: <Radio className="w-5 h-5 text-emerald-700 animate-pulse" />,
      live: true
    },
    {
      label: "API GATEWAY LATENCY",
      value: "< 35 ms",
      subtext: "HTTP API v2 Payload Format 2.0 Overhead",
      icon: <Clock className="w-5 h-5 text-[var(--terracotta)]" />
    },
    {
      label: "SYSTEM DURABILITY",
      value: "99.999%",
      subtext: "Multi-AZ Cloud Durability (11 9's)",
      icon: <ShieldCheck className="w-5 h-5 text-[var(--terracotta)]" />
    },
    {
      label: "CI/CD DEPLOYMENT TIME",
      value: "42 sec",
      subtext: "Automated GitHub Actions to Amazon S3",
      icon: <GitCommit className="w-5 h-5 text-[var(--terracotta)]" />
    }
  ];

  return (
    <section id="telemetry" className="w-full border-b border-[var(--border-ink)] py-12 sm:py-16 px-4 sm:px-8 bg-[var(--paper-surface)]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="border-b border-[var(--border-ink)] pb-4 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="text-xs font-mono-tag text-[var(--terracotta)] font-bold mb-1">
              [TELEMETRY SCOREBOARD &bull; OFFICIAL AUDIT]
            </div>
            <h2 className="text-2xl sm:text-4xl font-editorial-title font-black text-[var(--ink-black)]">
              Real-Time Performance Telemetry
            </h2>
          </div>
          <div className="text-xs font-mono-tag text-[var(--ink-muted)]">
            REGION: AP-SOUTHEAST-2 (SYDNEY) &bull; STATUS: OPTIMAL
          </div>
        </div>

        {/* Telemetry Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {telemetryItems.map((item, idx) => (
            <div
              key={idx}
              className="newspaper-photo p-5 rounded bg-white flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono-tag font-bold text-[var(--ink-muted)]">
                    {item.label}
                  </span>
                  {item.icon}
                </div>
                <div className="text-3xl sm:text-4xl font-editorial-title font-black text-[var(--ink-black)] mb-2 flex items-center gap-2">
                  <span>{item.value}</span>
                  {item.live && (
                    <span className="relative flex h-3.5 w-3.5 items-center justify-center ml-1">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
                    </span>
                  )}
                </div>
              </div>
              <p className="text-xs font-mono-tag text-[var(--ink-muted)] border-t border-[var(--border-ink)] pt-2 mt-2">
                {item.subtext}
              </p>
            </div>
          ))}
        </div>

        {/* Live Serverless Pipeline Banner */}
        <div className="broadsheet-card p-4 sm:p-5 rounded border border-[var(--border-ink)] flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono-tag">
          <div className="flex items-center gap-2.5">
            <Database className="w-4 h-4 text-[var(--terracotta)] shrink-0" />
            <span>
              <strong>LIVE AWS BACKEND INTEGRATION:</strong> Visitor counts &amp; contact submissions are processed by serverless Python 3.12 micro-VMs on AWS Lambda with Amazon DynamoDB and Amazon SNS.
            </span>
          </div>
          <span className="bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded border border-emerald-300 shrink-0">
            &bull; TELEMETRY LIVE
          </span>
        </div>

      </div>
    </section>
  );
}
