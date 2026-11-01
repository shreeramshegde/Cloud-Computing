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

    // If API Gateway URL is still placeholder
    if (!CONFIG.API_BASE_URL || CONFIG.API_BASE_URL === 'YOUR_API_GATEWAY_INVOKE_URL') {
      setTimeout(() => {
        setStatus({
          submitting: false,
          success: true,
          error: null,
          message: 'Frontend Demo Mode: Once you deploy your API Gateway, this will invoke Lambda, insert a record into DynamoDB, and send an instant SNS email alert!'
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 900);
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
          message: 'Thank you! Your message was securely recorded in Amazon DynamoDB and dispatched via Amazon SNS.'
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
        message: `Error: ${err.message}. Please check API Gateway status or CORS.`
      });
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="contact-grid">
          {/* Information Column */}
          <div className="contact-info-col">
            <span className="section-badge">Direct Communication</span>
            <h2 className="section-title">Let's Connect</h2>
            <p className="contact-lead">
              Have inquiries regarding this serverless architecture, academic experiential learning, or cloud engineering collaborations? Send a serverless dispatch below!
            </p>

            <div className="info-cards">
              <div className="info-card">
                <GraduationCap className="info-icon" size={20} />
                <div>
                  <h5>Academic Institution</h5>
                  <p>{CONFIG.STUDENT.institution}</p>
                  <p className="sub-meta">{CONFIG.STUDENT.department}</p>
                  <p className="sub-meta mono">USN: {CONFIG.STUDENT.usn} | Sem: 5</p>
                </div>
              </div>

              <div className="info-card">
                <UserCheck className="info-icon" size={20} />
                <div>
                  <h5>Faculty Guide</h5>
                  <p>{CONFIG.STUDENT.guide}</p>
                  <p className="sub-meta">Course: {CONFIG.STUDENT.course}</p>
                </div>
              </div>

              <div className="info-card">
                <Mail className="info-icon" size={20} />
                <div>
                  <h5>Direct Email</h5>
                  <p className="mono">{CONFIG.STUDENT.email}</p>
                </div>
              </div>

              <div className="info-card">
                <MapPin className="info-icon" size={20} />
                <div>
                  <h5>Location</h5>
                  <p>Mysuru, Karnataka, India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="contact-form-col">
            <div className="form-card">
              <h3 className="form-title">Send a Serverless Message</h3>
              <p className="form-subtitle">
                Payload routes via <strong>Amazon API Gateway &rarr; AWS Lambda &rarr; DynamoDB &amp; SNS</strong>.
              </p>

              <form onSubmit={handleSubmit} className="actual-form">
                <div className="form-row">
                  <div className="form-group">
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
                  <div className="form-group">
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

                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject" 
                    value={formData.subject} 
                    onChange={handleChange}
                    placeholder="Project Inquiry / Cloud Computing" 
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={4} 
                    required 
                    value={formData.message} 
                    onChange={handleChange}
                    placeholder="Your inquiry or feedback..."
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={status.submitting} 
                  className="btn btn-primary submit-btn"
                >
                  {status.submitting ? (
                    <>
                      <RefreshCw className="spin-icon" size={16} />
                      Processing on AWS Lambda...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Serverless Dispatch
                    </>
                  )}
                </button>

                {status.success && (
                  <div className="alert alert-success">
                    <CheckCircle2 size={18} />
                    <span>{status.message}</span>
                  </div>
                )}

                {status.error && (
                  <div className="alert alert-error">
                    <AlertCircle size={18} />
                    <span>{status.message}</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.25fr;
          gap: 48px;
          align-items: start;
        }

        .contact-lead {
          font-size: 1.05rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 32px;
        }

        .info-cards {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .info-card {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 18px 20px;
        }

        .info-icon {
          color: var(--accent-cyan);
          background: rgba(56, 189, 248, 0.1);
          padding: 8px;
          border-radius: 8px;
          flex-shrink: 0;
          box-sizing: content-box;
        }

        .info-card h5 {
          font-size: 0.9rem;
          color: var(--text-primary);
          margin-bottom: 2px;
        }

        .info-card p {
          font-size: 0.88rem;
          color: var(--text-secondary);
        }

        .sub-meta {
          font-size: 0.78rem !important;
          color: var(--text-muted) !important;
          margin-top: 2px;
        }

        .form-card {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 18px;
          padding: 36px;
          box-shadow: var(--card-shadow);
        }

        .form-title {
          font-size: 1.45rem;
          font-weight: 700;
          margin-bottom: 6px;
        }

        .form-subtitle {
          font-size: 0.88rem;
          color: var(--text-secondary);
          margin-bottom: 28px;
        }

        .actual-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-group label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          background: rgba(10, 14, 23, 0.7);
          border: 1px solid var(--border-color);
          border-radius: 10px;
          padding: 12px 16px;
          color: var(--text-primary);
          font-family: var(--font-sans);
          font-size: 0.92rem;
          transition: all 0.2s;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: var(--accent-cyan);
          box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.15);
        }

        .submit-btn {
          width: 100%;
          justify-content: center;
          padding: 14px;
        }

        .alert {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 14px 18px;
          border-radius: 10px;
          font-size: 0.88rem;
          line-height: 1.5;
        }

        .alert-success {
          background: rgba(34, 197, 94, 0.12);
          border: 1px solid rgba(34, 197, 94, 0.3);
          color: #4ade80;
        }

        .alert-error {
          background: rgba(239, 68, 68, 0.12);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #f87171;
        }

        @media (max-width: 860px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }
          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
