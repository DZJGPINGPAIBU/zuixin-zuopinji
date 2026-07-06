import { useEffect } from 'react';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Experience from '@/sections/Experience';
import ProjectsGrid from '@/components/ProjectsGrid';
import Contact from '@/sections/Contact';

function AppContent() {
  const { setActiveSection } = useTheme();
  useEffect(() => {
    const sections = ['hero', 'about', 'experience', 'projects', 'contact'];
    const observers: IntersectionObserver[] = [];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) setActiveSection(id); }); },
        { threshold: 0.3 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [setActiveSection]);

  return (
    <div className="relative min-h-screen">
      <main>
        <Hero />
        <div style={{ position: 'relative' }}>
            <About />
            <Experience />
            <ProjectsGrid />
            <Contact />
          </div>
      </main>
      <footer className="py-8 text-center border-t border-white/5 bg-black">
        <p className="text-xs text-white/20 font-mono tracking-wider">
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
