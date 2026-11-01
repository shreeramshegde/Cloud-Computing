import React, { useEffect, useState } from 'react';
import { ExternalLink, Star, GitFork, Code2, Cloud, Sparkles, Terminal, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './GithubIcon';
import { CONFIG } from '../config';

const FEATURED_PROJECTS = [
  {
    id: 'serverless-portfolio',
    title: 'Serverless Portfolio on AWS',
    tagline: 'Enterprise Event-Driven Architecture',
    description: 'An enterprise-grade serverless web application deployed across 14 native AWS services without virtual machines. Includes atomic DynamoDB visitor counting, SNS contact dispatch, and automated CI/CD.',
    tags: ['AWS S3', 'CloudFront OAC', 'AWS Lambda', 'DynamoDB', 'API Gateway', 'React 19', 'CI/CD'],
    featured: true,
    githubUrl: 'https://github.com/shreeramshegde/Cloud-Computing',
    liveUrl: 'http://shreeram-portfolio-storage-2026.s3-website-ap-southeast-2.amazonaws.com'
  },
  {
    id: 'meaowmatch',
    title: 'MeaowMatch',
    tagline: 'Interactive Modern Web Application',
    description: 'A responsive, engaging web platform focused on modern user experience, responsive state management, and component-driven architecture.',
    tags: ['TypeScript', 'React', 'CSS Modules', 'State Management'],
    featured: false,
    githubUrl: 'https://github.com/shreeramshegde/MeaowMatch',
    liveUrl: null
  },
  {
    id: 'css-generator',
    title: 'CSS Generator Studio',
    tagline: 'Developer Productivity Utility',
    description: 'An intuitive tool enabling developers to visually generate, preview, and export modern CSS gradients, glassmorphism filters, and complex box-shadows.',
    tags: ['JavaScript', 'HTML5 Canvas', 'Modern CSS', 'Tooling'],
    featured: false,
    githubUrl: 'https://github.com/shreeramshegde/Css-Generator',
    liveUrl: null
  },
  {
    id: 'omarchy-edits',
    title: 'Omarchy Linux System Suite',
    tagline: 'OS Customization & Shell Engineering',
    description: 'Automated configuration suites, dotfiles, and shell workflow enhancements for Linux environments, focusing on developer ergonomic efficiency.',
    tags: ['Shell / Bash', 'Linux Kernel', 'Automation', 'DevOps'],
    featured: false,
    githubUrl: 'https://github.com/shreeramshegde/Omarchy-Edits',
    liveUrl: null
  }
];

export function Projects() {
  const [githubRepos, setGithubRepos] = useState([]);

  useEffect(() => {
    async function fetchRepos() {
      try {
        const res = await fetch(`https://api.github.com/users/${CONFIG.STUDENT.githubUsername}/repos?sort=updated&per_page=4`);
        if (!res.ok) return;
        const data = await res.json();
        if (Array.isArray(data)) {
          setGithubRepos(data);
        }
      } catch (err) {
        console.warn('GitHub API sync skipped:', err);
      }
    }
    fetchRepos();
  }, []);

  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Featured Engineering</span>
          <h2 className="section-title">Projects &amp; Systems</h2>
          <p className="section-desc">
            A selection of cloud infrastructure systems, web applications, and developer software tools.
          </p>
        </div>

        {/* Featured Projects Bento Grid */}
        <div className="projects-grid">
          {FEATURED_PROJECTS.map((project) => (
            <div 
              key={project.id} 
              className={`project-bento-card ${project.featured ? 'flagship' : ''}`}
            >
              <div className="project-card-top">
                <div className="project-badge-wrap">
                  {project.featured ? (
                    <span className="flagship-pill">
                      <Sparkles size={12} />
                      Academic Flagship Project
                    </span>
                  ) : (
                    <span className="category-pill">{project.tagline}</span>
                  )}
                </div>

                <div className="project-links">
                  {project.liveUrl && (
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="icon-link"
                      title="Open Live Website"
                    >
                      <ArrowUpRight size={17} />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="icon-link"
                      title="View GitHub Repository"
                    >
                      <GithubIcon size={16} />
                    </a>
                  )}
                </div>
              </div>

              <div className="project-card-body">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>
              </div>

              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag-chip mono">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Live GitHub Sync Sub-Bar */}
        {githubRepos.length > 0 && (
          <div className="github-sync-section">
            <div className="sync-header">
              <div className="sync-title-wrap">
                <GithubIcon size={18} />
                <h4>Live Sync from GitHub (@{CONFIG.STUDENT.githubUsername})</h4>
              </div>
              <a 
                href={CONFIG.STUDENT.githubUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="view-all-link"
              >
                View all repositories &rarr;
              </a>
            </div>

            <div className="mini-repos-grid">
              {githubRepos.map((repo) => (
                <a 
                  key={repo.id} 
                  href={repo.html_url} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="mini-repo-card"
                >
                  <div className="mini-repo-title">
                    <span className="mono">{repo.name}</span>
                    <ExternalLink size={13} className="mini-icon" />
                  </div>
                  <p className="mini-repo-desc">{repo.description || 'Public GitHub repository'}</p>
                  <div className="mini-repo-stats">
                    {repo.language && <span className="mini-lang">{repo.language}</span>}
                    <span className="mini-stars"><Star size={12} /> {repo.stargazers_count}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
          margin-bottom: 48px;
        }

        .project-bento-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: 24px;
          padding: 32px;
          box-shadow: var(--shadow-sm);
          transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .project-bento-card:hover {
          transform: translateY(-2px);
          border-color: var(--border-hover);
          box-shadow: var(--shadow-md);
        }

        .project-bento-card.flagship {
          grid-column: span 2;
          background: linear-gradient(135deg, var(--bg-card) 0%, var(--bg-surface) 100%);
          border-color: var(--accent-border);
        }

        .project-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .flagship-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--accent-soft);
          border: 1px solid var(--accent-border);
          color: var(--accent-primary);
          padding: 4px 14px;
          border-radius: 9999px;
          font-size: 0.8rem;
          font-weight: 700;
        }

        .category-pill {
          font-size: 0.78rem;
          color: var(--text-muted);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .project-links {
          display: flex;
          gap: 8px;
        }

        .icon-link {
          color: var(--text-secondary);
          background: var(--pill-bg);
          border: 1px solid var(--border-subtle);
          padding: 8px;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s;
        }

        .icon-link:hover {
          color: var(--accent-primary);
          border-color: var(--accent-border);
          background: var(--accent-soft);
          transform: translateY(-1px);
        }

        .project-title {
          font-size: 1.5rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          margin-bottom: 10px;
        }

        .project-desc {
          font-size: 0.94rem;
          color: var(--text-secondary);
          line-height: 1.65;
          margin-bottom: 24px;
        }

        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          border-top: 1px solid var(--border-subtle);
          padding-top: 18px;
        }

        .tag-chip {
          font-size: 0.78rem;
          background: var(--pill-bg);
          border: 1px solid var(--border-subtle);
          padding: 4px 12px;
          border-radius: 9999px;
          color: var(--text-muted);
        }

        /* GitHub Sync */
        .github-sync-section {
          background-color: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: 24px;
          padding: 28px 32px;
        }

        .sync-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .sync-title-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--text-primary);
          font-weight: 700;
        }

        .view-all-link {
          font-size: 0.85rem;
          color: var(--accent-primary);
          text-decoration: none;
          font-weight: 600;
        }

        .view-all-link:hover {
          text-decoration: underline;
        }

        .mini-repos-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 14px;
        }

        .mini-repo-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: 16px;
          padding: 16px;
          text-decoration: none;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: all 0.15s;
        }

        .mini-repo-card:hover {
          border-color: var(--accent-border);
          transform: translateY(-2px);
        }

        .mini-repo-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: var(--text-primary);
          font-weight: 600;
          font-size: 0.92rem;
          margin-bottom: 6px;
        }

        .mini-icon {
          color: var(--text-muted);
        }

        .mini-repo-desc {
          font-size: 0.8rem;
          color: var(--text-muted);
          line-height: 1.4;
          margin-bottom: 12px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .mini-repo-stats {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .mini-stars {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        @media (max-width: 860px) {
          .projects-grid {
            grid-template-columns: 1fr;
          }
          .project-bento-card.flagship {
            grid-column: span 1;
          }
        }
      `}</style>
    </section>
  );
}
