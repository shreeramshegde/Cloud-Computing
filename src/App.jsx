import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import MarqueeTicker from './components/MarqueeTicker';
import Hero from './components/Hero';
import Works from './components/Works';
import Philosophy from './components/Philosophy';
import Arsenal from './components/Arsenal';
import Telemetry from './components/Telemetry';
import Dispatch from './components/Dispatch';
import Footer from './components/Footer';
import PaperTearIntro from './components/PaperTearIntro';
import { CONFIG } from './config';

export function App() {
  const [visitorCount, setVisitorCount] = useState(null);
  const [isLoadingVisitor, setIsLoadingVisitor] = useState(true);
  const [showIntro, setShowIntro] = useState(true);

  const triggerRefold = () => {
    setShowIntro(false);
    setTimeout(() => {
      setShowIntro(true);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 50);
  };

  useEffect(() => {
    async function fetchVisitor() {
      if (!CONFIG.API_BASE_URL) {
        setIsLoadingVisitor(false);
        return;
      }

      try {
        const res = await fetch(`${CONFIG.API_BASE_URL}/visitor-count`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.count !== undefined) {
            setVisitorCount(data.count);
          }
        }
      } catch (err) {
        console.warn('Visitor counter fetch error:', err);
      } finally {
        setIsLoadingVisitor(false);
      }
    }

    fetchVisitor();
  }, []);

  return (
    <div className="min-h-screen bg-[var(--paper-bg)] text-[var(--ink-black)] flex flex-col font-sans selection:bg-[var(--terracotta)] selection:text-white relative">
      
      {/* Interactive Paper Tearing / Unfolding Broadsheet Intro */}
      {showIntro && (
        <PaperTearIntro onUnfolded={() => setShowIntro(false)} />
      )}

      {/* Top Header & Gazette Masthead */}
      <Header visitorCount={visitorCount} onRefold={triggerRefold} />

      {/* Looping Marquee Ticker */}
      <MarqueeTicker />

      {/* Main Broadsheet Newspaper Sections */}
      <main className="flex-1">
        <Hero />
        <Works />
        <Philosophy />
        <Arsenal />
        <Telemetry visitorCount={visitorCount} isLoadingVisitor={isLoadingVisitor} />
        <Dispatch />
      </main>

      {/* Colophon & Newspaper Footer */}
      <Footer onRefold={triggerRefold} />
    </div>
  );
}

export default App;
