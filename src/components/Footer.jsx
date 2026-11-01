import React from 'react';
import { Award } from 'lucide-react';
import { ZenLogo } from './ZenLogo';
import { GithubIcon } from './GithubIcon';
import { CONFIG } from '../config';

export function Footer() {
  return (
    <footer className="zen-footer">
      <div className="container zen-footer-inner">
        <div className="zen-footer-top">
          <div className="zen-footer-left">
            <div className="zen-footer-brand">
              <ZenLogo size={22} />
              <span className="zen-brand-text">Serverless Portfolio Hosting on AWS</span>
            </div>
            <p className="zen-footer-meta">
              Built for <strong>{CONFIG.STUDENT.course}</strong> at {CONFIG.STUDENT.institution}.
            </p>
            <p className="zen-footer-credits">
              Student: <strong>{CONFIG.STUDENT.name}</strong> (USN: <span className="mono">{CONFIG.STUDENT.usn}</span>) • Guide: <strong>{CONFIG.STUDENT.guide}</strong>
            </p>
          </div>

          <div className="zen-footer-right">
            <div className="zen-free-tier-pill">
              <Award size={15} />
              <span>100% Serverless &amp; Free Tier</span>
            </div>
            <a 
              href={CONFIG.STUDENT.githubUrl} 
              target="_blank" 
              rel="noreferrer"
              className="zen-github-link"
            >
              <GithubIcon size={16} />
              <span>github.com/{CONFIG.STUDENT.githubUsername}</span>
            </a>
          </div>
        </div>

        <div className="zen-footer-bottom">
          <p>© {new Date().getFullYear()} {CONFIG.STUDENT.name}. Department of Information Science &amp; Engineering, NIE Mysuru.</p>
          <p className="zen-stack-text mono">React 19 • S3 • CloudFront • Lambda • DynamoDB • API Gateway • SNS</p>
        </div>

        {/* Signature Zen Concentric Circles Decoration */}
        <div className="zen-concentric-circles" aria-hidden="true">
          <div className="zen-circle circle-1"></div>
          <div className="zen-circle circle-2"></div>
          <div className="zen-circle circle-3"></div>
          <div className="zen-circle circle-4"></div>
        </div>
      </div>

      <style>{`
        .zen-footer {
          border-top: 1px solid var(--border-subtle);
          background-color: var(--bg-surface);
          padding: 64px 0 32px;
          position: relative;
          overflow: hidden;
        }

        .zen-footer-inner {
          position: relative;
          z-index: 2;
        }

        .zen-footer-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 32px;
          padding-bottom: 36px;
          border-bottom: 1px solid var(--border-subtle);
        }

        .zen-footer-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 700;
          font-size: 1.05rem;
          margin-bottom: 8px;
          color: var(--text-primary);
        }

        .zen-footer-meta {
          color: var(--text-secondary);
          font-size: 0.9rem;
          margin-bottom: 4px;
        }

        .zen-footer-credits {
          color: var(--text-muted);
          font-size: 0.85rem;
        }

        .zen-footer-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 12px;
        }

        .zen-free-tier-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(16, 185, 129, 0.08);
          border: 1px solid rgba(16, 185, 129, 0.25);
          color: #10b981;
          padding: 5px 14px;
          border-radius: 9999px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .zen-github-link {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 0.84rem;
          font-family: var(--font-mono);
          transition: color 0.15s;
        }

        .zen-github-link:hover {
          color: var(--coral-primary);
        }

        .zen-footer-bottom {
          padding-top: 26px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: var(--text-muted);
          font-size: 0.82rem;
        }

        .zen-stack-text {
          font-size: 0.74rem;
        }

        /* Zen Concentric Watermark */
        .zen-concentric-circles {
          position: absolute;
          right: -80px;
          bottom: -100px;
          pointer-events: none;
          z-index: 1;
          opacity: 0.4;
        }

        .zen-circle {
          position: absolute;
          border-radius: 50%;
          border: 1px solid var(--coral-border);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .circle-1 { width: 140px; height: 140px; }
        .circle-2 { width: 260px; height: 260px; }
        .circle-3 { width: 380px; height: 380px; }
        .circle-4 { width: 500px; height: 500px; }

        @media (max-width: 820px) {
          .zen-footer-top {
            flex-direction: column;
            align-items: flex-start;
          }
          .zen-footer-right {
            align-items: flex-start;
          }
          .zen-footer-bottom {
            flex-direction: column;
            gap: 10px;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}
