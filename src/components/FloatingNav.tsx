import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { projects } from '@/data/projects';

const mainNavItems = [
  { id: 'hero', label: '首页·简历' },
  { id: 'projects', label: '作品集' },
  { id: 'contact', label: '联系' },
];

export default function FloatingNav() {
  const { activeSection, isMenuOpen, setIsMenuOpen } = useTheme();
  const [isWorkMenuOpen, setIsWorkMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    setIsMenuOpen(false);
    setIsWorkMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleProjectClick = (projectId: string) => {
    setIsMenuOpen(false);
    setIsWorkMenuOpen(false);
    // Scroll to projects section then open modal via hash
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      window.location.hash = `project=${projectId}`;
    }, 400);
  };

  return (
    <>
      {/* Top-right floating menu button */}
      <motion.button
        className="cursor-target fixed top-6 right-6 z-50 w-12 h-12 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center transition-colors backdrop-blur-sm"
        onClick={() => {
          setIsMenuOpen(!isMenuOpen);
          setIsWorkMenuOpen(false);
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {isMenuOpen ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        )}
      </motion.button>

      {/* Full-screen menu overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center"
            initial={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 48px) 48px)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at calc(100% - 48px) 48px)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 48px) 48px)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav className="flex flex-col items-center gap-5">
              {mainNavItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  className={`text-[clamp(28px,6vw,60px)] font-black tracking-tight transition-opacity ${
                    activeSection === item.id ? 'opacity-100' : 'opacity-25 hover:opacity-60'
                  }`}
                  onClick={() => handleNavClick(item.id)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  whileHover={{ x: 10 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top-left eye/work button */}
      <motion.button
        className="fixed top-6 left-6 z-50 w-12 h-12 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center transition-colors backdrop-blur-sm"
        onClick={() => setIsWorkMenuOpen(!isWorkMenuOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </motion.button>

      {/* Work submenu — project list */}
      <AnimatePresence>
        {isWorkMenuOpen && (
          <motion.div
            className="fixed top-20 left-6 z-50 bg-white rounded-2xl shadow-xl p-2 min-w-[200px] border border-black/5"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
          >
            <p className="px-3 py-1.5 text-[10px] font-mono text-black/25 tracking-wider uppercase">作品列表</p>
            {projects.map((p) => (
              <button
                key={p.id}
                className="block w-full text-left px-3 py-2 rounded-lg hover:bg-black/5 text-sm font-medium transition-colors"
                onClick={() => handleProjectClick(p.id)}
              >
                <span className="text-[10px] font-mono text-black/30 mr-2">{p.num.replace('PROJECT ', '')}</span>
                {p.title}
              </button>
            ))}
            <div className="border-t border-black/5 mt-1 pt-1">
              <button
                className="block w-full text-left px-3 py-2 rounded-lg hover:bg-black/5 text-sm text-black/40 transition-colors"
                onClick={() => handleNavClick('contact')}
              >
                联系我
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
