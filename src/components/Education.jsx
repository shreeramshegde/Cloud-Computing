import React from 'react';
import { GraduationCap, Award, BookOpen, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { CONFIG } from '../config';

export function Education() {
  return (
    <section id="education" className="section section-surface">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Academic Credentials</span>
          <h2 className="section-title">Education &amp; Coursework</h2>
          <p className="section-desc">
            Pursuing formal undergraduate engineering education with a specialization in Cloud Computing and Information Systems.
          </p>
        </div>

        <div className="edu-bento-grid">
          {/* Main Academic Card */}
          <div className="edu-card main-card">
            <div className="edu-top">
              <div className="edu-icon-wrap">
                <GraduationCap size={24} />
              </div>
              <div className="edu-status-pill">
                <span className="status-dot"></span>
                <span>Current Degree</span>
              </div>
            </div>

            <div className="edu-body">
              <span className="edu-degree">Bachelor of Engineering (B.E.)</span>
              <h3 className="edu-dept">{CONFIG.STUDENT.department}</h3>
              <h4 className="edu-inst">{CONFIG.STUDENT.institution}</h4>
              <p className="edu-inst-sub">(An Autonomous Institution, affiliated to VTU, Belagavi)</p>

              <div className="edu-meta-strip">
                <div className="meta-badge">
                  <Calendar size={14} />
                  <span>A.Y. {CONFIG.STUDENT.academicYear} (Semester 5)</span>
                </div>
                <div className="meta-badge">
                  <MapPin size={14} />
                  <span>Mysuru, Karnataka, India</span>
                </div>
                <div className="meta-badge mono highlight">
                  <span>USN: {CONFIG.STUDENT.usn}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Experiential Learning Project Card */}
          <div className="edu-card project-context-card">
            <div className="edu-top">
              <div className="edu-icon-wrap project-icon">
                <Award size={24} />
              </div>
              <span className="course-code-pill mono">BIS505</span>
            </div>

            <div className="edu-body">
              <span className="edu-degree">Experiential Learning Curriculum</span>
              <h3 className="edu-dept">Cloud Computing Prototype</h3>
              
              <div className="guide-box">
                <span className="guide-label">Academic Faculty Guide:</span>
                <span className="guide-name">{CONFIG.STUDENT.guide}</span>
                <span className="guide-dept">Department of Information Science &amp; Engineering</span>
              </div>

              <div className="coursework-highlights">
                <span className="cw-title">Core Competency Areas:</span>
                <div className="cw-tags">
                  <span className="cw-tag">Cloud Infrastructure Design</span>
                  <span className="cw-tag">Serverless Event-Driven Systems</span>
                  <span className="cw-tag">Identity &amp; Access Management (IAM)</span>
                  <span className="cw-tag">Continuous Delivery Automation</span>
                  <span className="cw-tag">NoSQL Database Architecture</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .edu-bento-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 28px;
        }

        .edu-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: 24px;
          padding: 36px;
          box-shadow: var(--shadow-sm);
          transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .edu-card:hover {
          transform: translateY(-2px);
          border-color: var(--border-hover);
          box-shadow: var(--shadow-md);
        }

        .edu-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
        }

        .edu-icon-wrap {
          color: var(--accent-primary);
          background-color: var(--accent-soft);
          border: 1px solid var(--accent-border);
          padding: 12px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .project-icon {
          color: var(--emerald);
          background-color: var(--emerald-soft);
          border-color: var(--emerald-border);
        }

        .edu-status-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--pill-bg);
          border: 1px solid var(--border-subtle);
          padding: 4px 12px;
          border-radius: 9999px;
          font-size: 0.78rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--emerald);
        }

        .course-code-pill {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--emerald);
          background: var(--emerald-soft);
          border: 1px solid var(--emerald-border);
          padding: 4px 12px;
          border-radius: 9999px;
        }

        .edu-degree {
          font-size: 0.82rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--accent-primary);
          font-weight: 700;
          display: block;
          margin-bottom: 4px;
        }

        .edu-dept {
          font-size: 1.45rem;
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.02em;
          margin-bottom: 6px;
        }

        .edu-inst {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-secondary);
          margin-bottom: 2px;
        }

        .edu-inst-sub {
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 24px;
        }

        .edu-meta-strip {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          border-top: 1px solid var(--border-subtle);
          padding-top: 20px;
        }

        .meta-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--pill-bg);
          border: 1px solid var(--border-subtle);
          padding: 6px 14px;
          border-radius: 9999px;
          font-size: 0.82rem;
          color: var(--text-secondary);
        }

        .meta-badge.highlight {
          color: var(--accent-primary);
          border-color: var(--accent-border);
          background: var(--accent-soft);
          font-weight: 600;
        }

        .guide-box {
          background: var(--pill-bg);
          border: 1px solid var(--border-subtle);
          border-radius: 16px;
          padding: 16px 20px;
          margin-bottom: 20px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .guide-label {
          font-size: 0.76rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--text-muted);
          font-weight: 700;
        }

        .guide-name {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .guide-dept {
          font-size: 0.82rem;
          color: var(--text-secondary);
        }

        .coursework-highlights {
          border-top: 1px solid var(--border-subtle);
          padding-top: 18px;
        }

        .cw-title {
          font-size: 0.78rem;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          color: var(--text-muted);
          font-weight: 700;
          display: block;
          margin-bottom: 10px;
        }

        .cw-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .cw-tag {
          font-size: 0.78rem;
          background: var(--pill-bg);
          border: 1px solid var(--border-subtle);
          padding: 4px 12px;
          border-radius: 9999px;
          color: var(--text-secondary);
        }

        @media (max-width: 860px) {
          .edu-bento-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
