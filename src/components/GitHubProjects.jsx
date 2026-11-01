import React, { useEffect, useState } from 'react';
import { Star, GitFork, ExternalLink, Code2, RefreshCw } from 'lucide-react';
import { GithubIcon } from './GithubIcon';
import { CONFIG } from '../config';

const FALLBACK_REPOS = [
  {
    id: 1,
    name: 'Cloud-Computing',
    description: 'Serverless Portfolio Hosting on AWS using S3, CloudFront, Lambda, DynamoDB, API Gateway, and CI/CD.',
    html_url: 'https://github.com/shreeramshegde/Cloud-Computing',
    language: 'JavaScript / Python',
    stargazers_count: 1,
    forks_count: 0,
    updated_at: new Date().toISOString()
  },
  {
    id: 2,
    name: 'MeaowMatch',
    description: 'Interactive web application designed with modern UI principles.',
    html_url: 'https://github.com/shreeramshegde/MeaowMatch',
    language: 'TypeScript / React',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: new Date().toISOString()
  },
  {
    id: 3,
    name: 'Css-Generator',
    description: 'Utility web tool to generate custom CSS styles, gradients, and UI components visually.',
    html_url: 'https://github.com/shreeramshegde/Css-Generator',
    language: 'JavaScript',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: new Date().toISOString()
  },
  {
    id: 4,
    name: 'Omarchy-Edits',
    description: 'Configurations and custom enhancements for Linux / Omarchy environments.',
    html_url: 'https://github.com/shreeramshegde/Omarchy-Edits',
    language: 'Shell',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: new Date().toISOString()
  }
];

export function GitHubProjects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRepos() {
      try {
        const res = await fetch(`https://api.github.com/users/${CONFIG.STUDENT.githubUsername}/repos?sort=updated&per_page=6`);
        if (!res.ok) throw new Error('GitHub API rate limit or error');
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setRepos(data);
        } else {
          setRepos(FALLBACK_REPOS);
        }
      } catch (err) {
        console.warn('Using fallback repository list:', err);
        setRepos(FALLBACK_REPOS);
      } finally {
        setLoading(false);
      }
    }
    fetchRepos();
  }, []);

  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Live GitHub Showcase</span>
          <h2 className="section-title">Open Source & Projects</h2>
          <p className="section-desc">
            Directly synced from <a href={CONFIG.STUDENT.githubUrl} target="_blank" rel="noreferrer" className="inline-link">@shreeramshegde</a> on GitHub.
          </p>
        </div>

        {loading ? (
          <div className="loading-state">
            <RefreshCw className="spin-icon" size={24} />
            <span>Fetching repositories from GitHub...</span>
          </div>
        ) : (
          <div className="repos-grid">
            {repos.map((repo) => (
              <div key={repo.id} className="repo-card">
                <div className="repo-header">
                  <div className="repo-title-wrap">
                    <Code2 size={18} className="repo-code-icon" />
                    <h4 className="repo-name">{repo.name}</h4>
                  </div>
                  <a 
                    href={repo.html_url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="repo-ext-link"
                    title="View on GitHub"
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>

                <p className="repo-desc">
                  {repo.description || 'Public repository by Shreeram S Hegde.'}
                </p>

                <div className="repo-meta">
                  {repo.language && (
                    <span className="repo-lang">
                      <span className="lang-dot"></span>
                      {repo.language}
                    </span>
                  )}
                  <div className="repo-stats">
                    <span title="Stars"><Star size={14} /> {repo.stargazers_count}</span>
                    <span title="Forks"><GitFork size={14} /> {repo.forks_count}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="view-more-wrap">
          <a 
            href={CONFIG.STUDENT.githubUrl} 
            target="_blank" 
            rel="noreferrer"
            className="btn btn-secondary"
          >
            <GithubIcon size={18} />
            View All Repositories on GitHub
          </a>
        </div>
      </div>

      <style>{`
        .inline-link {
          color: var(--accent-cyan);
          text-decoration: underline;
        }

        .loading-state {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          color: var(--text-secondary);
          padding: 60px 0;
        }

        .spin-icon {
          animation: spin 1s linear infinite;
          color: var(--accent-cyan);
        }

        .repos-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 24px;
          margin-bottom: 40px;
        }

        .repo-card {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 14px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: all 0.25s ease;
        }

        .repo-card:hover {
          border-color: var(--border-hover);
          transform: translateY(-4px);
          box-shadow: var(--card-shadow);
        }

        .repo-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }

        .repo-title-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .repo-code-icon {
          color: var(--accent-cyan);
        }

        .repo-name {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-primary);
          font-family: var(--font-mono);
        }

        .repo-ext-link {
          color: var(--text-muted);
          transition: color 0.2s;
        }

        .repo-ext-link:hover {
          color: var(--accent-cyan);
        }

        .repo-desc {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 20px;
          flex-grow: 1;
        }

        .repo-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid var(--border-color);
          padding-top: 14px;
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .repo-lang {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          color: var(--text-secondary);
        }

        .lang-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--accent-indigo);
        }

        .repo-stats {
          display: flex;
          gap: 14px;
        }

        .repo-stats span {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .view-more-wrap {
          text-align: center;
        }
      `}</style>
    </section>
  );
}
