import React from 'react';
import { Cloud, Heart, Award } from 'lucide-react';
import { GithubIcon } from './GithubIcon';
import { CONFIG } from '../config';

export function Footer() {
  return (
    <footer className="footer-wrap">
      <div className="container">
        <div className="footer-content">
          <div className="footer-left">
            <div className="footer-brand">
              <Cloud size={20} className="cloud-icon" />
              <span className="brand-txt">Serverless Portfolio Hosting on AWS</span>
            </div>
            <p className="footer-desc">
              Developed for <strong>{CONFIG.STUDENT.course}</strong> at {CONFIG.STUDENT.institution}.
            </p>
            <p className="footer-meta">
              Student: <strong>{CONFIG.STUDENT.name}</strong> (USN: <span className="mono">{CONFIG.STUDENT.usn}</span>) • Guide: <strong>{CONFIG.STUDENT.guide}</strong>
            </p>
          </div>

          <div className="footer-right">
            <div className="aws-stat-badge">
              <Award size={16} />
              <span>100% Serverless &amp; Free-Tier Compliant</span>
            </div>
            <a 
              href={CONFIG.STUDENT.githubUrl} 
              target="_blank" 
              rel="noreferrer"
              className="footer-github"
            >
              <GithubIcon size={16} />
              <span>github.com/{CONFIG.STUDENT.githubUsername}</span>
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {CONFIG.STUDENT.name}. All rights reserved.</p>
          <p className="footer-tech">Engineered with React 19, AWS S3, CloudFront OAC, Lambda, DynamoDB, API Gateway, SNS &amp; CodePipeline.</p>
        </div>
      </div>

      <style>{`
        .footer-wrap {
          border-top: 1px solid var(--border-color);
          background: #070a10;
          padding: 60px 0 30px;
        }

        .footer-content {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 32px;
          padding-bottom: 40px;
          border-bottom: 1px solid var(--border-color);
        }

        .footer-brand {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 700;
          font-size: 1.05rem;
          margin-bottom: 8px;
        }

        .cloud-icon {
          color: var(--accent-cyan);
        }

        .footer-desc {
          color: var(--text-secondary);
          font-size: 0.9rem;
          margin-bottom: 6px;
        }

        .footer-meta {
          color: var(--text-muted);
          font-size: 0.85rem;
        }

        .footer-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 12px;
        }

        .aws-stat-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(34, 197, 94, 0.1);
          border: 1px solid rgba(34, 197, 94, 0.25);
          color: #4ade80;
          padding: 6px 14px;
          border-radius: 9999px;
          font-size: 0.82rem;
          font-weight: 600;
        }

        .footer-github {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-secondary);
          text-decoration: none;
          font-family: var(--font-mono);
          font-size: 0.85rem;
          transition: color 0.2s;
        }

        .footer-github:hover {
          color: var(--accent-cyan);
        }

        .footer-bottom {
          padding-top: 28px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: var(--text-muted);
          font-size: 0.82rem;
        }

        .footer-tech {
          font-family: var(--font-mono);
          font-size: 0.75rem;
        }

        @media (max-width: 820px) {
          .footer-content {
            flex-direction: column;
            align-items: flex-start;
          }
          .footer-right {
            align-items: flex-start;
          }
          .footer-bottom {
            flex-direction: column;
            gap: 12px;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}
