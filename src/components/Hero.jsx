import React from 'react';
import { ArrowUpRight, Sparkles, Server, Zap, Shield, Globe } from 'lucide-react';
import { CONFIG } from '../config';

export function Hero() {
  return (
    <section id="hero" className="hero-wrap">
      <div className="container">
        <div className="hero-content">
          {/* Zen Calm Badge */}
          <div className="hero-pill-badge">
            <Sparkles size={14} className="badge-sparkle" />
            <span>A Calmer Cloud Experience • BIS505 Experiential Learning</span>
          </div>

          <h1 className="hero-title">
            Architecting Serverless Systems with <span className="coral-highlight">Zen Simplicity.</span>
          </h1>

          <p className="hero-intro">
            I'm <strong>{CONFIG.STUDENT.name}</strong>, Information Science &amp; Engineering undergraduate 
            at <strong>{CONFIG.STUDENT.institution}</strong> (USN: <span className="mono">{CONFIG.STUDENT.usn}</span>). 
            Guided by <strong>{CONFIG.STUDENT.guide}</strong>, this project eliminates server maintenance overhead 
            by deploying an enterprise event-driven portfolio entirely across 14 native AWS services.
          </p>

          <div className="hero-cta-group">
            <a href="#architecture" className="btn btn-primary">
              Explore AWS Architecture
              <ArrowUpRight size={16} />
            </a>
            <a href="#projects" className="btn btn-secondary">
              View GitHub Projects
            </a>
          </div>

          {/* Zen Bento Metric Cards */}
          <div className="bento-metrics">
            <div className="bento-metric-card">
              <span className="bento-num mono">0</span>
              <span className="bento-label">Virtual Machines (No EC2)</span>
            </div>
            <div className="bento-metric-card">
              <span className="bento-num mono">14</span>
              <span className="bento-label">Native AWS Services</span>
            </div>
            <div className="bento-metric-card">
              <span className="bento-num mono">&lt; 30ms</span>
              <span className="bento-label">Edge CDN Latency</span>
            </div>
            <div className="bento-metric-card highlight">
              <span className="bento-num mono">$0.00</span>
              <span className="bento-label">Free-Tier Cost</span>
            </div>
          </div>

          {/* Minimalist Service Pill Strip */}
          <div className="service-strip">
            <span className="zen-tag">Amazon S3</span>
            <span className="zen-tag">CloudFront CDN</span>
            <span className="zen-tag">Origin Access Control (OAC)</span>
            <span className="zen-tag">AWS Lambda</span>
            <span className="zen-tag">Amazon DynamoDB</span>
            <span className="zen-tag">Amazon API Gateway</span>
            <span className="zen-tag">Amazon SNS</span>
            <span className="zen-tag">AWS CodePipeline</span>
          </div>
        </div>
      </div>

      <style>{`
        .hero-wrap {
          padding: 100px 0 60px;
          text-align: center;
        }

        .hero-content {
          max-width: 860px;
          margin: 0 auto;
        }

        .hero-pill-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--coral-soft);
          border: 1px solid var(--coral-border);
          color: var(--coral-primary);
          padding: 6px 18px;
          border-radius: 9999px;
          font-size: 0.83rem;
          font-weight: 600;
          margin-bottom: 24px;
        }

        .badge-sparkle {
          color: var(--coral-primary);
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          letter-spacing: -0.035em;
          line-height: 1.15;
          margin-bottom: 24px;
        }

        .coral-highlight {
          color: var(--coral-primary);
        }

        .hero-intro {
          font-size: 1.15rem;
          color: var(--text-secondary);
          line-height: 1.75;
          margin-bottom: 38px;
        }

        .hero-cta-group {
          display: flex;
          justify-content: center;
          gap: 14px;
          margin-bottom: 48px;
          flex-wrap: wrap;
        }

        .bento-metrics {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 36px;
        }

        .bento-metric-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: 20px;
          padding: 22px 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          box-shadow: var(--card-shadow);
          transition: transform 0.2s, border-color 0.2s;
        }

        .bento-metric-card:hover {
          transform: translateY(-2px);
          border-color: var(--border-hover);
        }

        .bento-metric-card.highlight {
          background: var(--coral-soft);
          border-color: var(--coral-border);
        }

        .bento-metric-card.highlight .bento-num {
          color: var(--coral-primary);
        }

        .bento-num {
          font-size: 1.65rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 4px;
        }

        .bento-label {
          font-size: 0.78rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        .service-strip {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 8px;
        }

        .zen-tag {
          font-size: 0.78rem;
          color: var(--text-muted);
          background: var(--pill-bg);
          border: 1px solid var(--border-subtle);
          padding: 5px 14px;
          border-radius: 9999px;
          font-family: var(--font-mono);
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.4rem;
          }
          .bento-metrics {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </section>
  );
}
