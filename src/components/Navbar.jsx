import React from 'react';
import { Sun, Moon, ArrowUpRight } from 'lucide-react';
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
          <span className="brand-pill">Serverless</span>
        </a>

        {/* Links */}
        <nav className="nav-links">
          <a href="#about">About</a>
          <a href="#architecture">Architecture</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#education">Education</a>
        </nav>

        {/* Actions */}
        <div className="nav-actions">
          {/* Live Visitor Pill */}
          <div className="visitor-pill" title="Live Serverless Counter powered by AWS Lambda & DynamoDB">
            <span className="live-dot"></span>
            <span className="pill-text">Live Views:</span>
            <span className="pill-count mono">
              {isLoadingVisitor ? '...' : (visitorCount !== null ? visitorCount.toLocaleString() : '1')}
            </span>
          </div>

          {/* Theme Toggle (Light / Dark) */}
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

          {/* Contact Pill Button */}
          <a href="#contact" className="btn btn-primary nav-contact-btn">
            Contact
          </a>
        </div>
      </div>

      <style>{`
        .navbar-wrapper {
          position: sticky;
          top: 0;
          z-index: 1000;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          background-color: var(--nav-backdrop);
          border-bottom: 1px solid var(--border-subtle);
          padding: 14px 0;
        }

        .nav-container {
          max-width: 1160px;
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
          font-size: 1.15rem;
          letter-spacing: -0.02em;
        }

        .brand-name {
          font-weight: 800;
        }

        .brand-pill {
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--accent-primary);
          background: var(--accent-soft);
          border: 1px solid var(--accent-border);
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
          color: var(--accent-primary);
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
          background: var(--emerald);
          box-shadow: 0 0 10px var(--emerald);
          animation: pulseRing 2s infinite;
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
          color: var(--accent-primary);
          border-color: var(--accent-border);
          background: var(--accent-soft);
          transform: translateY(-1px);
        }

        .nav-contact-btn {
          padding: 8px 18px;
          font-size: 0.85rem;
        }

        @media (max-width: 900px) {
          .nav-links {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
