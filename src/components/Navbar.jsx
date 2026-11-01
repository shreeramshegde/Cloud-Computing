import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { ZenLogo } from './ZenLogo';
import { GithubIcon } from './GithubIcon';
import { CONFIG } from '../config';

export function Navbar({ visitorCount, isLoadingVisitor, theme, onToggleTheme }) {
  return (
    <header className="navbar-wrapper">
      <div className="nav-container">
        {/* Brand */}
        <a href="#hero" className="nav-brand">
          <ZenLogo size={24} />
          <span className="brand-name">Shreeram</span>
          <span className="brand-badge">Serverless</span>
        </a>

        {/* Links */}
        <nav className="nav-links">
          <a href="#about">About</a>
          <a href="#architecture">Architecture</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>

        {/* Actions */}
        <div className="nav-actions">
          {/* Live Visitor Pill */}
          <div className="visitor-pill" title="Live Serverless Counter powered by AWS Lambda & DynamoDB">
            <span className="live-dot"></span>
            <span className="pill-text">Live:</span>
            <span className="pill-count mono">
              {isLoadingVisitor ? '...' : (visitorCount !== null ? visitorCount.toLocaleString() : '1')}
            </span>
          </div>

          {/* Theme Toggle (Zen Light / Dark) */}
          <button 
            onClick={onToggleTheme} 
            className="theme-toggle-btn"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* GitHub link */}
          <a 
            href={CONFIG.STUDENT.githubUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="icon-btn"
            title="GitHub Profile"
          >
            <GithubIcon size={17} />
          </a>
        </div>
      </div>

      <style>{`
        .navbar-wrapper {
          position: sticky;
          top: 0;
          z-index: 1000;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          background-color: var(--nav-backdrop);
          border-bottom: 1px solid var(--border-subtle);
          padding: 14px 0;
        }

        .nav-container {
          max-width: 1140px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .nav-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: var(--text-primary);
          font-weight: 700;
          font-size: 1.1rem;
          letter-spacing: -0.02em;
        }

        .brand-name {
          font-weight: 800;
        }

        .brand-badge {
          font-size: 0.7rem;
          font-weight: 600;
          color: var(--coral-primary);
          background: var(--coral-soft);
          border: 1px solid var(--coral-border);
          padding: 2px 10px;
          border-radius: 9999px;
        }

        .nav-links {
          display: flex;
          gap: 24px;
        }

        .nav-links a {
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          transition: color 0.15s;
        }

        .nav-links a:hover {
          color: var(--coral-primary);
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .visitor-pill {
          display: flex;
          align-items: center;
          gap: 7px;
          background: var(--pill-bg);
          border: 1px solid var(--border-subtle);
          padding: 6px 14px;
          border-radius: 9999px;
          font-size: 0.82rem;
        }

        .live-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 8px #10b981;
          animation: pulseGlow 2s infinite;
        }

        .pill-text {
          color: var(--text-muted);
        }

        .pill-count {
          color: var(--text-primary);
          font-weight: 700;
        }

        .theme-toggle-btn,
        .icon-btn {
          color: var(--text-secondary);
          background: var(--pill-bg);
          border: 1px solid var(--border-subtle);
          padding: 8px;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .theme-toggle-btn:hover,
        .icon-btn:hover {
          color: var(--coral-primary);
          border-color: var(--coral-border);
          background: var(--coral-soft);
          transform: translateY(-1px);
        }

        @media (max-width: 820px) {
          .nav-links {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
