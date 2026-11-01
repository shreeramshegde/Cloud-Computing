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
  CheckCircle2,
  ServerOff
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
    <section id="architecture" className="section section-dark">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">System Design & Cloud Services</span>
          <h2 className="section-title">AWS Serverless Architecture Explorer</h2>
          <p className="section-desc">
            Explore how 14 native AWS services interconnect to power this portfolio with zero EC2 servers, enterprise-grade security, and zero operating cost.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="filter-pill-group">
          {['all', 'storage', 'backend', 'database', 'devops', 'security', 'monitoring'].map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${selectedFilter === cat ? 'active' : ''}`}
              onClick={() => setSelectedFilter(cat)}
            >
              {cat === 'all' ? 'All Services (14)' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Main Grid & Deep Dive Layout */}
        <div className="arch-layout">
          {/* Services Grid */}
          <div className="services-selector-grid">
            {filteredServices.map((service) => {
              const Icon = service.icon;
              const isSelected = activeService.id === service.id;
              return (
                <div
                  key={service.id}
                  className={`service-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => setActiveService(service)}
                >
                  <div className="service-card-top">
                    <div className="service-icon-box">
                      <Icon size={20} />
                    </div>
                    <span className="service-category-badge">{service.category}</span>
                  </div>
                  <h4 className="service-card-name">{service.name}</h4>
                  <p className="service-card-tagline">{service.tagline}</p>
                </div>
              );
            })}
          </div>

          {/* Active Service Deep Dive Details */}
          <div className="active-service-panel">
            <div className="panel-header">
              <div className="panel-icon-wrap">
                {React.createElement(activeService.icon, { size: 28 })}
              </div>
              <div>
                <span className="panel-category">{activeService.category.toUpperCase()}</span>
                <h3 className="panel-title">{activeService.name}</h3>
                <p className="panel-tagline">{activeService.tagline}</p>
              </div>
            </div>

            <div className="panel-body">
              <div className="detail-block">
                <h5>Role in this Architecture</h5>
                <p>{activeService.description}</p>
              </div>

              <div className="detail-block">
                <h5>Why Chosen Over Alternatives</h5>
                <p>{activeService.whyChosen}</p>
              </div>

              <div className="detail-block highlight">
                <h5>Security & IAM Hardening</h5>
                <p>{activeService.securityNote}</p>
              </div>

              <div className="detail-block cost">
                <h5>AWS Free Tier Optimization</h5>
                <p>{activeService.cost}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .filter-pill-group {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 40px;
        }

        .filter-btn {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          padding: 8px 18px;
          border-radius: 9999px;
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .filter-btn:hover {
          color: var(--text-primary);
          border-color: var(--border-hover);
        }

        .filter-btn.active {
          background: rgba(56, 189, 248, 0.15);
          color: var(--accent-cyan);
          border-color: var(--accent-cyan);
          font-weight: 600;
        }

        .arch-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          align-items: start;
        }

        .services-selector-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 16px;
          max-height: 580px;
          overflow-y: auto;
          padding-right: 8px;
        }

        .service-card {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 18px;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .service-card:hover {
          border-color: var(--border-hover);
          background: var(--bg-card-hover);
          transform: translateY(-2px);
        }

        .service-card.selected {
          border-color: var(--accent-cyan);
          background: rgba(56, 189, 248, 0.08);
          box-shadow: 0 0 20px rgba(56, 189, 248, 0.15);
        }

        .service-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .service-icon-box {
          color: var(--accent-cyan);
          background: rgba(56, 189, 248, 0.1);
          padding: 8px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .service-category-badge {
          font-size: 0.65rem;
          text-transform: uppercase;
          color: var(--text-muted);
          font-family: var(--font-mono);
          letter-spacing: 0.5px;
        }

        .service-card-name {
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 4px;
          color: var(--text-primary);
        }

        .service-card-tagline {
          font-size: 0.78rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        .active-service-panel {
          background: var(--bg-card);
          border: 1px solid var(--border-hover);
          border-radius: 18px;
          padding: 32px;
          position: sticky;
          top: 90px;
          box-shadow: var(--card-shadow);
        }

        .panel-header {
          display: flex;
          align-items: center;
          gap: 18px;
          padding-bottom: 24px;
          border-bottom: 1px solid var(--border-color);
          margin-bottom: 24px;
        }

        .panel-icon-wrap {
          color: var(--accent-cyan);
          background: rgba(56, 189, 248, 0.12);
          border: 1px solid rgba(56, 189, 248, 0.25);
          padding: 16px;
          border-radius: 14px;
        }

        .panel-category {
          font-size: 0.7rem;
          letter-spacing: 1.5px;
          color: var(--accent-cyan);
          font-family: var(--font-mono);
          font-weight: 700;
        }

        .panel-title {
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .panel-tagline {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .detail-block {
          margin-bottom: 20px;
        }

        .detail-block h5 {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--text-muted);
          margin-bottom: 6px;
        }

        .detail-block p {
          font-size: 0.92rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .detail-block.highlight {
          background: rgba(99, 102, 241, 0.08);
          border-left: 3px solid var(--accent-indigo);
          padding: 12px 16px;
          border-radius: 0 8px 8px 0;
        }

        .detail-block.highlight h5 {
          color: #a5b4fc;
        }

        .detail-block.cost {
          background: rgba(34, 197, 94, 0.08);
          border-left: 3px solid #22c55e;
          padding: 12px 16px;
          border-radius: 0 8px 8px 0;
          margin-bottom: 0;
        }

        .detail-block.cost h5 {
          color: #86efac;
        }

        @media (max-width: 900px) {
          .arch-layout {
            grid-template-columns: 1fr;
          }
          .services-selector-grid {
            max-height: 380px;
          }
        }
      `}</style>
    </section>
  );
}
