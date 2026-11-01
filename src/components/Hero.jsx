import React from 'react';
import { ArrowRight, Layers, Sparkles, Terminal, ShieldCheck, Zap } from 'lucide-react';
import { CONFIG } from '../config';

export function Hero() {
  return (
    <section id="hero" className="hero-container">
      <div className="container">
        <div className="hero-inner">
          {/* Status badge */}
          <div className="hero-badge">
            <Sparkles size={14} className="badge-icon" />
            <span>BIS505 Cloud Computing Experiential Learning • NIE Mysuru</span>
          </div>

          <h1 className="hero-title">
            Architecting <span className="gradient-text">Serverless Systems</span> at Global Scale
          </h1>

          <p className="hero-tagline">
            I'm <strong>{CONFIG.STUDENT.name}</strong> (USN: <span className="mono">{CONFIG.STUDENT.usn}</span>), 
            studying Information Science & Engineering at <strong>{CONFIG.STUDENT.institution}</strong>. 
            This portfolio demonstrates enterprise cloud infrastructure deployed entirely on AWS without provisioning a single virtual machine.
          </p>

          <div className="hero-actions">
            <a href="#architecture" className="btn btn-primary">
              <Layers size={18} />
              Explore AWS Architecture (14 Services)
            </a>
            <a href="#projects" className="btn btn-secondary">
              <Terminal size={18} />
              GitHub Projects
            </a>
          </div>

          {/* Quick Metrics Bar */}
          <div className="metrics-strip">
            <div className="metric-item">
              <span className="metric-val">0</span>
              <span className="metric-label">EC2 Virtual Machines</span>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-item">
              <span className="metric-val">14</span>
              <span className="metric-label">Native AWS Services</span>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-item">
              <span className="metric-val">&lt; 30ms</span>
              <span className="metric-label">Global CDN Latency</span>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-item">
              <span className="metric-val">$0.00</span>
              <span className="metric-label">AWS Free Tier Cost</span>
            </div>
          </div>

          {/* Service tags */}
          <div className="service-tags-carousel">
            <span className="tag-pill"><Zap size={12} /> AWS S3 (Private)</span>
            <span className="tag-pill"><ShieldCheck size={12} /> CloudFront OAC</span>
            <span className="tag-pill">AWS Lambda (Python 3.12)</span>
            <span className="tag-pill">Amazon DynamoDB</span>
            <span className="tag-pill">Amazon API Gateway</span>
            <span className="tag-pill">Amazon SNS</span>
            <span className="tag-pill">AWS CodePipeline</span>
            <span className="tag-pill">AWS CodeBuild</span>
            <span className="tag-pill">AWS WAF</span>
            <span className="tag-pill">CloudWatch</span>
          </div>
        </div>
      </div>

      <style>{`
        .hero-container {
          padding: 100px 0 70px;
          position: relative;
        }

        .hero-inner {
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(168, 85, 247, 0.12);
          border: 1px solid rgba(168, 85, 247, 0.25);
          color: #c084fc;
          padding: 6px 18px;
          border-radius: 9999px;
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 24px;
        }

        .badge-icon {
          color: #c084fc;
        }

        .hero-title {
          font-size: 3.6rem;
          font-weight: 800;
          letter-spacing: -1px;
          line-height: 1.15;
          margin-bottom: 24px;
        }

        .hero-tagline {
          font-size: 1.2rem;
          color: var(--text-secondary);
          line-height: 1.75;
          margin-bottom: 36px;
        }

        .hero-actions {
          display: flex;
          justify-content: center;
          gap: 16px;
          margin-bottom: 50px;
          flex-wrap: wrap;
        }

        .metrics-strip {
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          padding: 20px 32px;
          margin-bottom: 36px;
          backdrop-filter: blur(12px);
          box-shadow: var(--card-shadow);
        }

        .metric-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 24px;
        }

        .metric-val {
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--accent-cyan);
          font-family: var(--font-mono);
        }

        .metric-label {
          font-size: 0.8rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-top: 4px;
        }

        .metric-divider {
          width: 1px;
          height: 36px;
          background: var(--border-color);
        }

        .service-tags-carousel {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
        }

        .tag-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-color);
          padding: 6px 14px;
          border-radius: 8px;
          font-size: 0.8rem;
          font-family: var(--font-mono);
          color: var(--text-secondary);
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }
          .metrics-strip {
            flex-direction: column;
            gap: 16px;
          }
          .metric-divider {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
