import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ArchitectureExplorer } from './components/ArchitectureExplorer';
import { GitHubProjects } from './components/GitHubProjects';
import { Skills } from './components/Skills';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { CONFIG } from './config';

export function App() {
  const [visitorCount, setVisitorCount] = useState(null);
  const [isLoadingVisitor, setIsLoadingVisitor] = useState(true);

  useEffect(() => {
    async function fetchVisitor() {
      if (!CONFIG.API_BASE_URL || CONFIG.API_BASE_URL === 'YOUR_API_GATEWAY_INVOKE_URL') {
        // Fallback for local demo preview
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
      <Navbar visitorCount={visitorCount} isLoadingVisitor={isLoadingVisitor} />
      <main>
        <Hero />
        <ArchitectureExplorer />
        <GitHubProjects />
        <Skills />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
export default App;
