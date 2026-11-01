import React from 'react';
import { Cloud, Code2, Wrench } from 'lucide-react';

export function Skills() {
  const skillGroups = [
    {
      title: 'AWS Cloud & Serverless',
      icon: Cloud,
      skills: [
        'Amazon S3 (Private & OAC)',
        'Amazon CloudFront (CDN)',
        'AWS Lambda (Python 3.12)',
        'Amazon DynamoDB (NoSQL)',
        'Amazon API Gateway (HTTP API)',
        'Amazon SNS (Event Pub/Sub)',
        'AWS CodePipeline (CI/CD)',
        'AWS CodeBuild',
        'AWS CodeCommit',
        'AWS WAF (Web Firewall)',
        'Amazon CloudWatch',
        'AWS Budgets & Cost Guardrails',
        'AWS IAM (Least Privilege)'
      ]
    },
    {
      title: 'Languages & Frameworks',
      icon: Code2,
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
      skills: [
        'Git Version Control',
        'GitHub Actions (CI/CD)',
        'Linux Environment & Bash',
        'Origin Access Control (OAC)',
        'Single Page Applications (SPA)',
        'YAML Buildspecs',
        'Cloud Security Hardening'
      ]
    }
  ];

  return (
    <section id="skills" className="section section-paper">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Skill Matrix</span>
          <h2 className="section-title">Technical Capabilities</h2>
          <p className="section-desc">
            Focused on cloud-native serverless systems, infrastructure automation, and modern web applications.
          </p>
        </div>

        <div className="skills-bento-grid">
          {skillGroups.map((group) => {
            const Icon = group.icon;
            return (
              <div key={group.title} className="skill-bento-card">
                <div className="skill-bento-header">
                  <div className="skill-bento-icon">
                    <Icon size={20} />
                  </div>
                  <h3 className="skill-bento-title">{group.title}</h3>
                </div>
                <div className="skill-bento-tags">
                  {group.skills.map((skill) => (
                    <span key={skill} className="zen-skill-pill mono">
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
        .skills-bento-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 24px;
        }

        .skill-bento-card {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: 20px;
          padding: 30px;
          box-shadow: var(--card-shadow);
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .skill-bento-card:hover {
          border-color: var(--border-hover);
          transform: translateY(-2px);
          box-shadow: var(--card-shadow-hover);
        }

        .skill-bento-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 22px;
        }

        .skill-bento-icon {
          color: var(--coral-primary);
          background: var(--coral-soft);
          border: 1px solid var(--coral-border);
          padding: 10px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .skill-bento-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.01em;
        }

        .skill-bento-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .zen-skill-pill {
          background: var(--pill-bg);
          border: 1px solid var(--border-subtle);
          padding: 6px 14px;
          border-radius: 9999px;
          font-size: 0.8rem;
          color: var(--text-secondary);
          transition: all 0.15s;
        }

        .zen-skill-pill:hover {
          color: var(--text-primary);
          border-color: var(--coral-border);
          background: var(--coral-soft);
        }
      `}</style>
    </section>
  );
}
