import React from 'react';
import { Cloud, Activity } from 'lucide-react';
import { GithubIcon } from './GithubIcon';
import { CONFIG } from '../config';

export function Navbar({ visitorCount, isLoadingVisitor }) {
  return (
    <header className="navbar-wrapper">
      <div className="nav-container">
        <a href="#hero" className="nav-brand">
          <span className="brand-bracket">&lt;</span>
          <span className="brand-name">Shreeram</span>
          <span className="brand-bracket">/&gt;</span>
          <span className="brand-badge">AWS Serverless</span>
        </a>

        <nav className="nav-links">
          <a href="#about">About</a>
          <a href="#architecture">AWS Architecture</a>
          <a href="#skills">Skills</a>
          <a href="#projects">GitHub Projects</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="nav-actions">
          {/* Live Visitor Counter Pill */}
          <div className="visitor-pill" title="Live visitor counter powered by AWS Lambda & DynamoDB">
            <span className="live-dot"></span>
            <span className="pill-text">Live Views:</span>
            <span className="pill-count mono">
              {isLoadingVisitor ? '...' : (visitorCount !== null ? visitorCount.toLocaleString() : '1')}
            </span>
          </div>

          <a 
            href={CONFIG.STUDENT.githubUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="github-btn"
            title="GitHub Profile"
          >
            <GithubIcon size={18} />
          </a>
        </div>
      </div>

      <style>{`
        .navbar-wrapper {
          position: sticky;
          top: 0;
          z-index: 1000;
          backdrop-filter: blur(20px);
          background: rgba(10, 14, 23, 0.85);
          border-bottom: 1px solid var(--border-color);
          padding: 14px 0;
        }

        .nav-container {
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .nav-brand {
          display: flex;
          align-items: center;
          gap: 6px;
          text-decoration: none;
          color: var(--text-primary);
          font-family: var(--font-mono);
          font-size: 1.15rem;
          font-weight: 700;
        }

        .brand-bracket {
          color: var(--accent-cyan);
        }

        .brand-badge {
          font-size: 0.65rem;
          text-transform: uppercase;
          background: rgba(56, 189, 248, 0.12);
          color: var(--accent-cyan);
          border: 1px solid rgba(56, 189, 248, 0.3);
          padding: 2px 8px;
          border-radius: 9999px;
          letter-spacing: 0.5px;
          margin-left: 8px;
        }

        .nav-links {
          display: flex;
          gap: 28px;
        }

        .nav-links a {
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          transition: color 0.2s;
        }

        .nav-links a:hover {
          color: var(--accent-cyan);
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .visitor-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(15, 23, 42, 0.9);
          border: 1px solid rgba(56, 189, 248, 0.25);
          padding: 5px 14px;
          border-radius: 9999px;
          font-size: 0.82rem;
        }

        .live-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 10px #22c55e;
          animation: pulse 2s infinite;
        }

        .pill-text {
          color: var(--text-muted);
        }

        .pill-count {
          color: var(--accent-cyan);
          font-weight: 700;
        }

        .github-btn {
          color: var(--text-secondary);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-color);
          padding: 8px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .github-btn:hover {
          color: var(--text-primary);
          border-color: var(--border-hover);
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-1px);
        }

        @media (max-width: 860px) {
          .nav-links {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
