import React, { useState } from 'react';
import { CONFIG } from '../config';
import { playTypewriterClick, playStampThud, playPaperRustle } from '../utils/sound';

export function Dispatch() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState('idle'); // idle | transmitting | confirmed | error
  const [responseMsg, setResponseMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    playTypewriterClick();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('transmitting');
    setResponseMsg('Transmitting dispatch via AWS API Gateway & Lambda...');

    try {
      const response = await fetch(`${CONFIG.API_BASE_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'Portfolio Wire Inquiry',
          message: formData.message,
        }),
      });

      if (!response.ok) {
        throw new Error(`Dispatch failed with HTTP ${response.status}`);
      }

      const result = await response.json().catch(() => ({}));
      playStampThud();
      setStatus('confirmed');
      setResponseMsg(result.message || 'Transmission successfully received and published to Amazon SNS & DynamoDB.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error('Dispatch error:', err);
      playStampThud();
      setStatus('error');
      setResponseMsg('Direct wire encounter latency. Kindly transmit directly to shreeramshegde05@gmail.com.');
    }
  };

  return (
    <section id="dispatch" className="py-20 border-b-2 border-[#1d1d1b] bg-[#cfc4ba]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Masthead */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b-2 border-[#1d1d1b] pb-4 mb-12">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-[#d35230] font-bold">
              [ SEC. 05 &mdash; TELEGRAPHIC SERVICE ]
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#1d1d1b] mt-1">
              The Dispatch Wire
            </h2>
          </div>
          <p className="font-mono text-xs text-[#1d1d1b]/70 sm:text-right mt-2 sm:mt-0 max-w-sm">
            DIRECT PIPELINE TO AWS SERVERLESS ARCHITECTURE &middot; DYNAMODB PERSISTENCE &middot; REAL-TIME SNS ALERT
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Vintage Telegram Form */}
          <div className="lg:col-span-7 bg-[#cfc4ba] border-2 border-[#1d1d1b] p-6 sm:p-8 relative shadow-[6px_6px_0px_#1d1d1b]">
            {/* Telegram decorative stamp */}
            <div className="flex justify-between items-center border-b border-[#1d1d1b]/40 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded-full bg-[#d35230] animate-pulse"></span>
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#1d1d1b]">
                  TRANSMISSION TERMINAL &middot; MYSURU STATION
                </span>
              </div>
              <span className="font-mono text-[10px] uppercase text-[#1d1d1b]/60 border border-[#1d1d1b]/40 px-2 py-0.5">
                ENCRYPTED TLS 1.3
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="dispatch-name" className="block font-mono text-xs uppercase tracking-wider text-[#1d1d1b] font-bold mb-1">
                    01. Sender Identity *
                  </label>
                  <input
                    type="text"
                    id="dispatch-name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Alan Turing"
                    className="w-full bg-[#cfc4ba]/80 border-2 border-[#1d1d1b] px-3.5 py-2.5 font-mono text-xs text-[#1d1d1b] placeholder-[#1d1d1b]/40 focus:bg-white focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="dispatch-email" className="block font-mono text-xs uppercase tracking-wider text-[#1d1d1b] font-bold mb-1">
                    02. Return Wire (Email) *
                  </label>
                  <input
                    type="email"
                    id="dispatch-email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. alan@bletchley.org"
                    className="w-full bg-[#cfc4ba]/80 border-2 border-[#1d1d1b] px-3.5 py-2.5 font-mono text-xs text-[#1d1d1b] placeholder-[#1d1d1b]/40 focus:bg-white focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="dispatch-subject" className="block font-mono text-xs uppercase tracking-wider text-[#1d1d1b] font-bold mb-1">
                  03. Subject / Transmission Topic
                </label>
                <input
                  type="text"
                  id="dispatch-subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Distributed Systems Architecture Inquiry"
                  className="w-full bg-[#cfc4ba]/80 border-2 border-[#1d1d1b] px-3.5 py-2.5 font-mono text-xs text-[#1d1d1b] placeholder-[#1d1d1b]/40 focus:bg-white focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="dispatch-message" className="block font-mono text-xs uppercase tracking-wider text-[#1d1d1b] font-bold mb-1">
                  04. Dispatch Payload (Message) *
                </label>
                <textarea
                  id="dispatch-message"
                  name="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Transmit your query, collaboration proposal, or technical problem statement here..."
                  className="w-full bg-[#cfc4ba]/80 border-2 border-[#1d1d1b] p-3.5 font-mono text-xs text-[#1d1d1b] placeholder-[#1d1d1b]/40 focus:bg-white focus:outline-none transition-colors resize-y"
                ></textarea>
              </div>

              {/* Status Banner */}
              {status !== 'idle' && (
                <div
                  className={`p-4 border-2 font-mono text-xs ${
                    status === 'confirmed'
                      ? 'bg-[#1d1d1b] text-[#cfc4ba] border-[#1d1d1b]'
                      : status === 'transmitting'
                      ? 'bg-amber-100 text-[#1d1d1b] border-[#1d1d1b]'
                      : 'bg-[#d35230] text-white border-[#1d1d1b]'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold mb-1">
                    {status === 'confirmed' && <span>[&#10003; DISPATCH RECORDED]</span>}
                    {status === 'transmitting' && <span className="animate-pulse">[TRANSMITTING OVER AWS...]</span>}
                    {status === 'error' && <span>[! TRANSMISSION RELAY WARN]</span>}
                  </div>
                  <p>{responseMsg}</p>
                </div>
              )}

              {/* Submission Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="submit"
                  disabled={status === 'transmitting'}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-[#1d1d1b] text-[#cfc4ba] font-mono text-xs uppercase font-bold tracking-widest hover:bg-[#d35230] hover:text-white transition-all duration-200 border-2 border-[#1d1d1b] active:translate-y-0.5 disabled:opacity-50"
                >
                  <span>Transmit Telegram</span>
                  <span className="font-serif text-base">&rarr;</span>
                </button>

                <div className="font-mono text-[11px] text-[#1d1d1b]/60 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-700"></span>
                  <span>AWS Lambda & SNS Active</span>
                </div>
              </div>
            </form>
          </div>

          {/* Right Column: Postmark & Direct Coordinates */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Postal Stamp & Origin Card */}
            <div className="bg-[#cfc4ba] border-2 border-[#1d1d1b] p-6 shadow-[6px_6px_0px_#1d1d1b]">
              <div className="flex items-center justify-between border-b border-[#1d1d1b]/40 pb-3 mb-4">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#d35230]">
                  OFFICIAL DISPATCH HEADQUARTERS
                </span>
                <span className="font-mono text-[10px] text-[#1d1d1b]/70">
                  REF # 2006-10-14
                </span>
              </div>

              <div className="flex gap-4 items-center mb-6">
                <div className="w-20 h-24 flex-shrink-0 border-2 border-dashed border-[#1d1d1b] p-1 bg-white/40 flex flex-col items-center justify-center text-center">
                  <div className="font-serif text-[10px] font-black uppercase text-[#d35230]">MYSURU</div>
                  <div className="font-mono text-[14px] font-black text-[#1d1d1b]">2006</div>
                  <div className="font-mono text-[8px] text-[#1d1d1b]/60 tracking-tighter">14.10.06</div>
                  <div className="w-6 h-0.5 bg-[#d35230] my-1"></div>
                  <div className="font-mono text-[7px] uppercase font-bold">AIR MAIL</div>
                </div>

                <div>
                  <h3 className="font-serif text-lg font-black uppercase tracking-tight text-[#1d1d1b]">
                    {CONFIG.AUTHOR.name}
                  </h3>
                  <p className="font-mono text-xs text-[#1d1d1b]/80 mt-0.5">
                    {CONFIG.AUTHOR.tagline}
                  </p>
                  <p className="font-mono text-xs text-[#d35230] font-bold mt-1">
                    &#9679; {CONFIG.AUTHOR.location}
                  </p>
                </div>
              </div>

              {/* Authentic Handwritten Signature Plate */}
              <div className="mb-4 p-3 bg-white/50 border border-[#1d1d1b] flex items-center justify-between">
                <div>
                  <div className="font-mono text-[9px] uppercase tracking-wider text-[#1d1d1b]/60">OFFICIAL SIGNATURE</div>
                  <div className="font-mono text-[11px] font-bold text-[#1d1d1b]">{CONFIG.AUTHOR.name}</div>
                </div>
                <img
                  src="/assets/shreeram_signature_blue.png?v=2"
                  alt="Shreeram S Hegde Authentic Signature"
                  className="h-10 object-contain drop-shadow-sm"
                />
              </div>

              {/* Direct Channels */}
              <div className="border-t border-[#1d1d1b]/40 pt-4 space-y-3 font-mono text-xs">
                
                {/* Email Direct */}
                <a
                  href={`mailto:${CONFIG.AUTHOR.email}`}
                  onClick={playPaperRustle}
                  className="group flex items-center justify-between p-2.5 bg-[#cfc4ba]/50 border border-[#1d1d1b] hover:bg-[#1d1d1b] hover:text-[#cfc4ba] transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#d35230] group-hover:text-white">[MAIL]</span>
                    <span className="truncate max-w-[200px]">{CONFIG.AUTHOR.email}</span>
                  </div>
                  <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                </a>

                {/* GitHub */}
                <a
                  href={CONFIG.AUTHOR.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playPaperRustle}
                  className="group flex items-center justify-between p-2.5 bg-[#cfc4ba]/50 border border-[#1d1d1b] hover:bg-[#1d1d1b] hover:text-[#cfc4ba] transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#d35230] group-hover:text-white">[GHUB]</span>
                    <span>github.com/shreeramshegde</span>
                  </div>
                  <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                </a>

                {/* LinkedIn */}
                <a
                  href={CONFIG.AUTHOR.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playPaperRustle}
                  className="group flex items-center justify-between p-2.5 bg-[#cfc4ba]/50 border border-[#1d1d1b] hover:bg-[#1d1d1b] hover:text-[#cfc4ba] transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#d35230] group-hover:text-white">[LINK]</span>
                    <span>linkedin.com/in/shreeram-suchetan-hegde</span>
                  </div>
                  <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                </a>

                {/* Curriculum Vitae (Resume) */}
                <a
                  href={CONFIG.AUTHOR.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playPaperRustle}
                  className="group flex items-center justify-between p-2.5 bg-[#d35230] text-white border border-[#1d1d1b] hover:bg-[#1d1d1b] transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-bold">[CV / RESUME]</span>
                    <span>Curriculum Vitae (PDF)</span>
                  </div>
                  <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                </a>
              </div>
            </div>

            {/* Vintage Teleprinter Note */}
            <div className="border border-[#1d1d1b]/40 p-4 bg-[#cfc4ba]/20 font-mono text-[11px] text-[#1d1d1b]/70 leading-relaxed">
              <span className="font-bold text-[#1d1d1b] uppercase">EDITORIAL NOTICE:</span> All communications transmitted via this telegraphic dispatch are relayed directly to Shreeram S Hegde's private serverless mailbox in Mysuru. Expect reply within 24 hours.
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Dispatch;

