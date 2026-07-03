import { useEffect } from 'react';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import Hero from '@/sections/Hero';
import ProjectsGrid from '@/components/ProjectsGrid_NEW';
import Contact from '@/sections/Contact';
import FloatingNav from '@/components/FloatingNav';

function AppContent() {
  const { setActiveSection } = useTheme();

  useEffect(() => {
    const sections = ['hero', 'projects', 'contact'];
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveSection(id);
          });
        },
        { threshold: 0.3 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [setActiveSection]);

  return (
    <div className="relative min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <FloatingNav />

      <main>
        <Hero />
        <ProjectsGrid />
        <Contact />
      </main>

      <footer className="py-8 text-center border-t border-black/5">
        <p className="text-xs text-black/20 font-mono tracking-wider">
          &copy; 2025 黄选坤 &middot; 品牌视觉设计师 &middot; ALL RIGHTS RESERVED
        </p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
