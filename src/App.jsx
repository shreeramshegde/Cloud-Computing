import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ArchitectureExplorer } from './components/ArchitectureExplorer';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Education } from './components/Education';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { CONFIG } from './config';

export function App() {
  const [visitorCount, setVisitorCount] = useState(null);
  const [isLoadingVisitor, setIsLoadingVisitor] = useState(true);

  // Theme Management (Light vs Dark)
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedTheme = localStorage.getItem('portfolio-theme');
      if (savedTheme) return savedTheme;
      if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
      }
    }
    return 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    async function fetchVisitor() {
      if (!CONFIG.API_BASE_URL || CONFIG.API_BASE_URL === 'YOUR_API_GATEWAY_INVOKE_URL') {
        setVisitorCount(42);
        setIsLoadingVisitor(false);
        return;
      }

      try {
        const res = await fetch(`${CONFIG.API_BASE_URL}/visitor-count`);
        if (!res.ok) throw new Error('API Gateway error');
        const data = await res.json();
        if (data && data.count !== undefined) {
          setVisitorCount(data.count);
        } else {
          setVisitorCount(1);
        }
      } catch (err) {
        console.warn('Failed to reach visitor counter Lambda:', err);
        setVisitorCount(1);
      } finally {
        setIsLoadingVisitor(false);
      }
    }

    fetchVisitor();
  }, []);

  return (
    <div className="portfolio-app">
      <Navbar 
        visitorCount={visitorCount} 
        isLoadingVisitor={isLoadingVisitor} 
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      <main>
        <Hero />
        <ArchitectureExplorer />
        <Projects />
        <Skills />
        <Education />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
export default App;
