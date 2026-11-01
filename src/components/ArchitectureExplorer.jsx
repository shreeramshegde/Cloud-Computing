import React, { useState } from 'react';
import { 
  Cloud, 
  Database, 
  Cpu, 
  ShieldCheck, 
  GitBranch, 
  Activity, 
  Mail, 
  Globe, 
  Lock, 
  DollarSign, 
  FileCode,
  ServerOff,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

const SERVICES = [
  {
    id: 's3',
    name: 'Amazon S3',
    category: 'storage',
    icon: Cloud,
    tagline: 'Private Static Object Store',
    description: 'Hosts the compiled React SPA bundles (HTML, JS, CSS, assets). Block Public Access is strictly enabled.',
    whyChosen: 'Replaces expensive provisioned web server hard disks with 99.999999999% durability and zero maintenance.',
    securityNote: 'Direct public access is 100% blocked; only CloudFront is granted s3:GetObject via Origin Access Control (OAC).',
    cost: '5 GB standard storage free under AWS Free Tier ($0.00/mo).'
  },
  {
    id: 'cloudfront',
    name: 'Amazon CloudFront',
    category: 'storage',
    icon: Globe,
    tagline: 'Global Low-Latency CDN',
    description: 'Caches static assets at 450+ Points of Presence worldwide, terminates TLS 1.3 HTTPS, and compresses payloads.',
    whyChosen: 'Eliminates latency across different continents, reducing asset load times to under 30ms globally.',
    securityNote: 'Enforces HTTPS redirect, restricts HTTP methods to GET/HEAD, and routes via TLS 1.3.',
    cost: '1 TB data transfer out per month completely free.'
  },
  {
    id: 'oac',
    name: 'Origin Access Control (OAC)',
    category: 'security',
    icon: Lock,
    tagline: 'Modern Origin Request Signing',
    description: 'Cryptographically signs requests between CloudFront and S3 using SigV4, ensuring zero direct S3 leakage.',
    whyChosen: 'Replaces deprecated Origin Access Identity (OAI) and supports all S3 regions, SSE-KMS encryption, and granular policy conditions.',
    securityNote: 'Validates AWS:SourceArn ensuring only your specific distribution ID can read the bucket.',
    cost: 'Included free with CloudFront.'
  },
  {
    id: 'lambda',
    name: 'AWS Lambda',
    category: 'backend',
    icon: Cpu,
    tagline: 'Serverless Event-Driven Microservices',
    description: 'Executes Python 3.12 microservices on demand for atomic visitor counting and contact form validation.',
    whyChosen: 'Zero idle running cost. Instances initialize in milliseconds upon incoming HTTP requests and terminate immediately.',
    securityNote: 'Execution roles follow least-privilege IAM principles without open network ports or SSH keys.',
    cost: '1,000,000 free requests & 3.2M seconds of compute time per month.'
  },
  {
    id: 'apigw',
    name: 'Amazon API Gateway',
    category: 'backend',
    icon: FileCode,
    tagline: 'High-Throughput HTTP API Gateway',
    description: 'Exposes managed RESTful endpoints (/visitor-count and /contact) with built-in CORS configuration.',
    whyChosen: 'HTTP API v2 is 70% cheaper and 50% faster than traditional REST API, with automated scaling.',
    securityNote: 'CORS origins restricted; integrated with AWS Lambda proxy integration.',
    cost: '1,000,000 API calls free per month.'
  },
  {
    id: 'dynamodb',
    name: 'Amazon DynamoDB',
    category: 'database',
    icon: Database,
    tagline: 'NoSQL Database with Single-Digit Milliseconds',
    description: 'Stores visitor counts atomically and logs contact form submissions with timestamps and UUIDs.',
    whyChosen: 'NoSQL key-value architecture avoids relational server overhead; On-Demand mode eliminates provisioned cost.',
    securityNote: 'Encrypted at rest with AWS-managed keys; IAM policies limit writes to specific table ARNs.',
    cost: '25 GB storage & 25 write/read capacity units free forever.'
  },
  {
    id: 'sns',
    name: 'Amazon SNS',
    category: 'database',
    icon: Mail,
    tagline: 'Serverless Pub/Sub & Email Delivery',
    description: 'Publishes instant notifications to Shreeram\'s inbox whenever a new portfolio message is submitted.',
    whyChosen: 'Decouples notification dispatch from contact form handling, providing guaranteed message delivery.',
    securityNote: 'Topic access restricted to Lambda publisher role; subscribers require token confirmation.',
    cost: '1,000,000 mobile push/email notifications free per month.'
  },
  {
    id: 'codepipeline',
    name: 'AWS CodePipeline',
    category: 'devops',
    icon: GitBranch,
    tagline: 'Continuous Delivery Orchestrator',
    description: 'Automatically triggers on every git push, pulling the latest React code and initiating automated build & deployment.',
    whyChosen: 'Removes human error from deployment workflows, ensuring zero-downtime blue/green style asset swap.',
    securityNote: 'Uses encrypted artifact buckets and dedicated service roles for pipeline stages.',
    cost: '1 active pipeline completely free per month.'
  },
  {
    id: 'codebuild',
    name: 'AWS CodeBuild',
    category: 'devops',
    icon: ServerOff,
    tagline: 'Managed Cloud Build Runner',
    description: 'Spins up an ephemeral Amazon Linux container, runs `npm run build`, syncs `dist/` to S3, and invalidates CloudFront.',
    whyChosen: 'Eliminates the need for maintaining a 24/7 Jenkins server VM.',
    securityNote: 'Ephemeral container destroyed immediately after execution; permissions scoped via IAM.',
    cost: '100 build minutes per month free.'
  },
  {
    id: 'waf',
    name: 'AWS WAF',
    category: 'security',
    icon: ShieldCheck,
    tagline: 'Web Application Firewall',
    description: 'Inspects web requests, blocks automated scrapers, and enforces rate limiting to protect the contact API.',
    whyChosen: 'Prevents denial-of-wallet attacks and protects the serverless backend from malicious spikes.',
    securityNote: 'AWS Managed Core Rule Set inspects for OWASP Top 10 vulnerabilities.',
    cost: 'Configurable with free trial or pay-per-rule.'
  },
  {
    id: 'cloudwatch',
    name: 'Amazon CloudWatch',
    category: 'monitoring',
    icon: Activity,
    tagline: 'Observability, Alarms & Logs',
    description: 'Captures Lambda execution logs, tracks API Gateway latencies, and triggers alarms on error spikes.',
    whyChosen: 'Out-of-the-box centralized observability without deploying third-party agents.',
    securityNote: 'Log groups configured with 7-day retention policy to prevent cost accrual.',
    cost: '10 custom metrics and 5 GB log ingestion free per month.'
  },
  {
    id: 'budgets',
    name: 'AWS Budgets',
    category: 'monitoring',
    icon: DollarSign,
    tagline: 'Zero-Cost Billing Guardrail',
    description: 'Monitors AWS spending in real time and sends automated email alerts if forecasted spend exceeds $1.00.',
    whyChosen: 'Essential cloud governance tool to guarantee zero unexpected cloud expenditure during learning.',
    securityNote: 'Evaluated continuously against AWS Billing data.',
    cost: 'First 2 budgets are 100% free.'
  }
];

export function ArchitectureExplorer() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [activeService, setActiveService] = useState(SERVICES[0]);

  const filteredServices = selectedFilter === 'all' 
    ? SERVICES 
    : SERVICES.filter(s => s.category === selectedFilter);

  return (
    <section id="architecture" className="section section-paper">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">System Architecture</span>
          <h2 className="section-title">Minimalist Cloud Infrastructure</h2>
          <p className="section-desc">
            Explore how 14 native AWS services coordinate seamlessly with zero virtual machines, enterprise-grade security, and zero monthly hosting cost.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="filter-pill-bar">
          {['all', 'storage', 'backend', 'database', 'devops', 'security', 'monitoring'].map((cat) => (
            <button
              key={cat}
              className={`pill-btn ${selectedFilter === cat ? 'active' : ''}`}
              onClick={() => setSelectedFilter(cat)}
            >
              {cat === 'all' ? 'All (14)' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Bento Split Layout */}
        <div className="zen-bento-layout">
          {/* Service Cards Grid */}
          <div className="zen-bento-grid">
            {filteredServices.map((service) => {
              const Icon = service.icon;
              const isSelected = activeService.id === service.id;
              return (
                <div
                  key={service.id}
                  className={`zen-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => setActiveService(service)}
                >
                  <div className="zen-card-top">
                    <div className="zen-icon-box">
                      <Icon size={18} />
                    </div>
                    <span className="zen-category-tag">{service.category}</span>
                  </div>
                  <h4 className="zen-card-title">{service.name}</h4>
                  <p className="zen-card-desc">{service.tagline}</p>
                </div>
              );
            })}
          </div>

          {/* Active Detail Panel */}
          <div className="zen-detail-panel">
            <div className="panel-top">
              <div className="panel-icon-circle">
                {React.createElement(activeService.icon, { size: 24 })}
              </div>
              <div>
                <span className="panel-badge-category">{activeService.category.toUpperCase()}</span>
                <h3 className="panel-service-name">{activeService.name}</h3>
                <p className="panel-service-tagline">{activeService.tagline}</p>
              </div>
            </div>

            <div className="panel-content">
              <div className="zen-info-block">
                <h5>Role in this Architecture</h5>
                <p>{activeService.description}</p>
              </div>

              <div className="zen-info-block">
                <h5>Why Chosen Over Alternatives</h5>
                <p>{activeService.whyChosen}</p>
              </div>

              <div className="zen-info-block zen-callout">
                <h5>Security &amp; IAM Hardening</h5>
                <p>{activeService.securityNote}</p>
              </div>

              <div className="zen-info-block zen-cost-box">
                <h5>AWS Free Tier Optimization</h5>
                <p>{activeService.cost}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .filter-pill-bar {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 38px;
        }

        .pill-btn {
          background: var(--pill-bg);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          padding: 8px 18px;
          border-radius: 9999px;
          font-size: 0.84rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .pill-btn:hover {
          color: var(--text-primary);
          border-color: var(--border-hover);
        }

        .pill-btn.active {
          background: var(--coral-soft);
          color: var(--coral-primary);
          border-color: var(--coral-border);
          font-weight: 600;
        }

        .zen-bento-layout {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          gap: 28px;
          align-items: start;
        }

        .zen-bento-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
          gap: 14px;
          max-height: 580px;
          overflow-y: auto;
          padding-right: 6px;
        }

        .zen-card {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: 18px;
          padding: 20px;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: var(--card-shadow);
        }

        .zen-card:hover {
          border-color: var(--border-hover);
          background: var(--bg-card-hover);
          transform: translateY(-2px);
          box-shadow: var(--card-shadow-hover);
        }

        .zen-card.selected {
          border-color: var(--coral-primary);
          background: var(--coral-soft);
          box-shadow: 0 4px 20px -2px var(--coral-soft);
        }

        .zen-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .zen-icon-box {
          color: var(--coral-primary);
          background: var(--pill-bg);
          padding: 8px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .zen-category-tag {
          font-size: 0.68rem;
          text-transform: uppercase;
          color: var(--text-muted);
          font-weight: 600;
          letter-spacing: 0.5px;
        }

        .zen-card-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 4px;
          letter-spacing: -0.01em;
        }

        .zen-card-desc {
          font-size: 0.8rem;
          color: var(--text-secondary);
          line-height: 1.45;
        }

        .zen-detail-panel {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: 24px;
          padding: 32px;
          position: sticky;
          top: 90px;
          box-shadow: var(--card-shadow);
        }

        .panel-top {
          display: flex;
          align-items: center;
          gap: 16px;
          padding-bottom: 22px;
          border-bottom: 1px solid var(--border-subtle);
          margin-bottom: 22px;
        }

        .panel-icon-circle {
          color: var(--coral-primary);
          background: var(--coral-soft);
          border: 1px solid var(--coral-border);
          padding: 14px;
          border-radius: 18px;
        }

        .panel-badge-category {
          font-size: 0.7rem;
          letter-spacing: 1.2px;
          color: var(--coral-primary);
          font-weight: 700;
        }

        .panel-service-name {
          font-size: 1.6rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: var(--text-primary);
        }

        .panel-service-tagline {
          font-size: 0.88rem;
          color: var(--text-secondary);
        }

        .zen-info-block {
          margin-bottom: 20px;
        }

        .zen-info-block h5 {
          font-size: 0.78rem;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          color: var(--text-muted);
          margin-bottom: 6px;
          font-weight: 700;
        }

        .zen-info-block p {
          font-size: 0.92rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .zen-callout {
          background: var(--pill-bg);
          border-left: 3px solid var(--coral-primary);
          padding: 12px 16px;
          border-radius: 0 12px 12px 0;
        }

        .zen-callout h5 {
          color: var(--coral-primary);
        }

        .zen-cost-box {
          background: rgba(16, 185, 129, 0.08);
          border-left: 3px solid #10b981;
          padding: 12px 16px;
          border-radius: 0 12px 12px 0;
          margin-bottom: 0;
        }

        .zen-cost-box h5 {
          color: #10b981;
        }

        @media (max-width: 900px) {
          .zen-bento-layout {
            grid-template-columns: 1fr;
          }
          .zen-bento-grid {
            max-height: 380px;
          }
        }
      `}</style>
    </section>
  );
}
