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
import { CONFIG } from './config';

export function App() {
  const [visitorCount, setVisitorCount] = useState(null);
  const [isLoadingVisitor, setIsLoadingVisitor] = useState(true);

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
    <div className="min-h-screen bg-[var(--paper-bg)] text-[var(--ink-black)] flex flex-col font-sans selection:bg-[var(--terracotta)] selection:text-white">
      {/* Top Header & Gazette Masthead */}
      <Header visitorCount={visitorCount} />

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
      <Footer />
    </div>
  );
}

export default App;
