import React, { useState } from 'react';
import { Send, Mail, MapPin, GraduationCap, CheckCircle2, AlertCircle, RefreshCw, UserCheck } from 'lucide-react';
import { CONFIG } from '../config';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null,
    message: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: null, message: '' });

    if (!CONFIG.API_BASE_URL || CONFIG.API_BASE_URL === 'YOUR_API_GATEWAY_INVOKE_URL') {
      setTimeout(() => {
        setStatus({
          submitting: false,
          success: true,
          error: null,
          message: 'Frontend Demo: Once deployed to AWS, this dispatches via Lambda to DynamoDB & SNS!'
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 800);
      return;
    }

    try {
      const response = await fetch(`${CONFIG.API_BASE_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus({
          submitting: false,
          success: true,
          error: null,
          message: 'Thank you! Your message was saved in Amazon DynamoDB and delivered to Shreeram via Amazon SNS.'
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error(data.error || 'Server rejected message.');
      }
    } catch (err) {
      console.error('Submission failed:', err);
      setStatus({
        submitting: false,
        success: false,
        error: err.message,
        message: `Error: ${err.message}. Please verify API Gateway status.`
      });
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="zen-contact-grid">
          {/* Information Column */}
          <div className="zen-contact-info">
            <span className="section-badge">Get in Touch</span>
            <h2 className="section-title">Direct Connection</h2>
            <p className="zen-contact-lead">
              Have questions regarding this serverless architecture, experiential learning at NIE Mysuru, or cloud collaborations?
            </p>

            <div className="zen-info-list">
              <div className="zen-info-item">
                <div className="zen-item-icon">
                  <GraduationCap size={18} />
                </div>
                <div>
                  <h6>Academic Institution</h6>
                  <p>{CONFIG.STUDENT.institution}</p>
                  <p className="zen-sub-meta">{CONFIG.STUDENT.department}</p>
                  <p className="zen-sub-meta mono">USN: {CONFIG.STUDENT.usn} | Sem: 5</p>
                </div>
              </div>

              <div className="zen-info-item">
                <div className="zen-item-icon">
                  <UserCheck size={18} />
                </div>
                <div>
                  <h6>Faculty Guide</h6>
                  <p>{CONFIG.STUDENT.guide}</p>
                  <p className="zen-sub-meta">Course: {CONFIG.STUDENT.course}</p>
                </div>
              </div>

              <div className="zen-info-item">
                <div className="zen-item-icon">
                  <Mail size={18} />
                </div>
                <div>
                  <h6>Institutional Email</h6>
                  <p className="mono">{CONFIG.STUDENT.email}</p>
                </div>
              </div>

              <div className="zen-info-item">
                <div className="zen-item-icon">
                  <MapPin size={18} />
                </div>
                <div>
                  <h6>Location</h6>
                  <p>Mysuru, Karnataka, India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="zen-form-card">
            <h3 className="zen-form-title">Send a Serverless Message</h3>
            <p className="zen-form-desc">
              Routes via <strong>API Gateway &rarr; AWS Lambda &rarr; DynamoDB &amp; SNS</strong>.
            </p>

            <form onSubmit={handleSubmit} className="zen-form">
              <div className="zen-form-row">
                <div className="zen-field">
                  <label htmlFor="name">Your Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required 
                    value={formData.name} 
                    onChange={handleChange}
                    placeholder="Jane Doe" 
                  />
                </div>
                <div className="zen-field">
                  <label htmlFor="email">Your Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    value={formData.email} 
                    onChange={handleChange}
                    placeholder="jane@example.com" 
                  />
                </div>
              </div>

              <div className="zen-field">
                <label htmlFor="subject">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  value={formData.subject} 
                  onChange={handleChange}
                  placeholder="Cloud Computing / Collaboration" 
                />
              </div>

              <div className="zen-field">
                <label htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={4} 
                  required 
                  value={formData.message} 
                  onChange={handleChange}
                  placeholder="Type your message here..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={status.submitting} 
                className="btn btn-primary zen-submit-btn"
              >
                {status.submitting ? (
                  <>
                    <RefreshCw className="spin-icon" size={16} />
                    Processing on AWS...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Serverless Dispatch
                  </>
                )}
              </button>

              {status.success && (
                <div className="zen-alert zen-alert-success">
                  <CheckCircle2 size={18} />
                  <span>{status.message}</span>
                </div>
              )}

              {status.error && (
                <div className="zen-alert zen-alert-error">
                  <AlertCircle size={18} />
                  <span>{status.message}</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      <style>{`
        .zen-contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.25fr;
          gap: 48px;
          align-items: start;
        }

        .zen-contact-lead {
          font-size: 1.05rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 30px;
        }

        .zen-info-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .zen-info-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: 16px;
          padding: 16px 20px;
          box-shadow: var(--card-shadow);
        }

        .zen-item-icon {
          color: var(--coral-primary);
          background: var(--coral-soft);
          border: 1px solid var(--coral-border);
          padding: 8px;
          border-radius: 10px;
          flex-shrink: 0;
        }

        .zen-info-item h6 {
          font-size: 0.85rem;
          color: var(--text-primary);
          font-weight: 700;
          margin-bottom: 2px;
        }

        .zen-info-item p {
          font-size: 0.88rem;
          color: var(--text-secondary);
        }

        .zen-sub-meta {
          font-size: 0.78rem !important;
          color: var(--text-muted) !important;
        }

        .zen-form-card {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: 24px;
          padding: 36px;
          box-shadow: var(--card-shadow);
        }

        .zen-form-title {
          font-size: 1.4rem;
          font-weight: 700;
          letter-spacing: -0.01em;
          margin-bottom: 4px;
        }

        .zen-form-desc {
          font-size: 0.88rem;
          color: var(--text-secondary);
          margin-bottom: 26px;
        }

        .zen-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .zen-form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .zen-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .zen-field label {
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .zen-field input,
        .zen-field textarea {
          width: 100%;
          background: var(--bg-paper);
          border: 1px solid var(--border-subtle);
          border-radius: 12px;
          padding: 12px 16px;
          color: var(--text-primary);
          font-family: inherit;
          font-size: 0.92rem;
          transition: border-color 0.15s, box-shadow 0.15s;
        }

        .zen-field input:focus,
        .zen-field textarea:focus {
          outline: none;
          border-color: var(--coral-primary);
          box-shadow: 0 0 0 3px var(--coral-soft);
        }

        .zen-submit-btn {
          width: 100%;
          padding: 14px;
          font-size: 0.95rem;
        }

        .zen-alert {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 14px 18px;
          border-radius: 14px;
          font-size: 0.88rem;
        }

        .zen-alert-success {
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.25);
          color: #10b981;
        }

        .zen-alert-error {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.25);
          color: #ef4444;
        }

        @media (max-width: 860px) {
          .zen-contact-grid {
            grid-template-columns: 1fr;
          }
          .zen-form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
