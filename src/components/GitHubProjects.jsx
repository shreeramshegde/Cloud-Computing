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
        if (!res.ok) throw new Error('GitHub API rate limit');
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
          <span className="section-badge">Open Source Work</span>
          <h2 className="section-title">Featured GitHub Projects</h2>
          <p className="section-desc">
            Directly synced from <a href={CONFIG.STUDENT.githubUrl} target="_blank" rel="noreferrer" className="zen-link">@shreeramshegde</a> on GitHub.
          </p>
        </div>

        {loading ? (
          <div className="zen-loading">
            <RefreshCw className="spin-icon" size={20} />
            <span>Syncing repositories from GitHub...</span>
          </div>
        ) : (
          <div className="zen-repos-grid">
            {repos.map((repo) => (
              <div key={repo.id} className="zen-repo-card">
                <div>
                  <div className="repo-top">
                    <div className="repo-title-box">
                      <Code2 size={16} className="code-icon" />
                      <h4 className="repo-name">{repo.name}</h4>
                    </div>
                    <a 
                      href={repo.html_url} 
                      target="_blank" 
                      rel="noreferrer"
                      className="repo-link-btn"
                      title="Open on GitHub"
                    >
                      <ExternalLink size={15} />
                    </a>
                  </div>

                  <p className="repo-desc">
                    {repo.description || 'Public repository by Shreeram S Hegde.'}
                  </p>
                </div>

                <div className="repo-bottom">
                  {repo.language && (
                    <span className="lang-tag">
                      <span className="lang-circle"></span>
                      {repo.language}
                    </span>
                  )}
                  <div className="stat-tags">
                    <span><Star size={13} /> {repo.stargazers_count}</span>
                    <span><GitFork size={13} /> {repo.forks_count}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="view-more-container">
          <a 
            href={CONFIG.STUDENT.githubUrl} 
            target="_blank" 
            rel="noreferrer"
            className="btn btn-secondary"
          >
            <GithubIcon size={16} />
            View All on GitHub
          </a>
        </div>
      </div>

      <style>{`
        .zen-link {
          color: var(--coral-primary);
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        .zen-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          color: var(--text-muted);
          padding: 60px 0;
          font-size: 0.92rem;
        }

        .spin-icon {
          animation: spin 1s linear infinite;
          color: var(--coral-primary);
        }

        .zen-repos-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
          gap: 20px;
          margin-bottom: 36px;
        }

        .zen-repo-card {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: 20px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: var(--card-shadow);
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .zen-repo-card:hover {
          border-color: var(--border-hover);
          transform: translateY(-2px);
          box-shadow: var(--card-shadow-hover);
        }

        .repo-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .repo-title-box {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .code-icon {
          color: var(--coral-primary);
        }

        .repo-name {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.01em;
          font-family: var(--font-mono);
        }

        .repo-link-btn {
          color: var(--text-muted);
          padding: 6px;
          border-radius: 9999px;
          transition: color 0.15s, background 0.15s;
        }

        .repo-link-btn:hover {
          color: var(--coral-primary);
          background: var(--coral-soft);
        }

        .repo-desc {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 24px;
        }

        .repo-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid var(--border-subtle);
          padding-top: 14px;
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        .lang-tag {
          display: flex;
          align-items: center;
          gap: 6px;
          font-weight: 500;
        }

        .lang-circle {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--coral-primary);
        }

        .stat-tags {
          display: flex;
          gap: 12px;
        }

        .stat-tags span {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .view-more-container {
          text-align: center;
        }
      `}</style>
    </section>
  );
}
