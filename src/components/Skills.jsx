import React from 'react';
import { Cloud, Code2, Wrench, Shield } from 'lucide-react';

export function Skills() {
  const skillGroups = [
    {
      title: 'AWS Cloud & Serverless',
      icon: Cloud,
      color: '#38bdf8',
      skills: [
        'Amazon S3 (Private & OAC)',
        'Amazon CloudFront (CDN)',
        'AWS Lambda (Serverless Compute)',
        'Amazon DynamoDB (NoSQL)',
        'Amazon API Gateway (HTTP API)',
        'Amazon SNS (Event Pub/Sub)',
        'AWS CodePipeline (CI/CD)',
        'AWS CodeBuild',
        'AWS CodeCommit',
        'AWS WAF (Web Firewall)',
        'Amazon CloudWatch',
        'AWS Budgets & Cost Explorer',
        'AWS IAM (Least Privilege)'
      ]
    },
    {
      title: 'Languages & Frameworks',
      icon: Code2,
      color: '#a855f7',
      skills: [
        'React 19 & Vite',
        'Python 3.12 (Boto3 SDK)',
        'JavaScript (ES6+)',
        'HTML5 / Modern CSS3',
        'C / C++',
        'Node.js & npm',
        'RESTful API Design'
      ]
    },
    {
      title: 'DevOps & Development Tools',
      icon: Wrench,
      color: '#6366f1',
      skills: [
        'Git Version Control',
        'GitHub Actions / CI/CD',
        'Linux Environment & Bash',
        'JSON / YAML Buildspecs',
        'Origin Access Control (OAC)',
        'Single Page Applications (SPA)',
        'Cloud Security Hardening'
      ]
    }
  ];

  return (
    <section id="skills" className="section section-dark">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Core Competencies</span>
          <h2 className="section-title">Technical Skill Matrix</h2>
          <p className="section-desc">
            Focusing on serverless cloud engineering, infrastructure automation, and modern web application development.
          </p>
        </div>

        <div className="skills-grid">
          {skillGroups.map((group) => {
            const Icon = group.icon;
            return (
              <div key={group.title} className="skill-card">
                <div className="skill-header">
                  <div className="skill-icon" style={{ color: group.color, backgroundColor: `${group.color}15` }}>
                    <Icon size={22} />
                  </div>
                  <h3 className="skill-group-title">{group.title}</h3>
                </div>
                <div className="skill-tags">
                  {group.skills.map((skill) => (
                    <span key={skill} className="skill-chip mono">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 28px;
        }

        .skill-card {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          padding: 32px;
          box-shadow: var(--card-shadow);
          transition: all 0.25s ease;
        }

        .skill-card:hover {
          border-color: var(--border-hover);
          transform: translateY(-3px);
        }

        .skill-header {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 24px;
        }

        .skill-icon {
          padding: 10px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .skill-group-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .skill-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .skill-chip {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-color);
          padding: 6px 14px;
          border-radius: 8px;
          font-size: 0.82rem;
          color: var(--text-secondary);
          transition: all 0.2s;
        }

        .skill-chip:hover {
          color: var(--text-primary);
          border-color: var(--border-hover);
          background: rgba(255, 255, 255, 0.08);
        }
      `}</style>
    </section>
  );
}
