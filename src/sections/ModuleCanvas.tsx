import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CanvasProfileSection from '@/components/CanvasProfileSection';

const pages = [
  { id: 'sec-storyboard', file: 'page_6', label: '分镜创作', en: 'Storyboard Creation' },
  { id: 'sec-assets',     file: 'page_5', label: '素材资产库', en: 'Asset Library' },
  { id: 'sec-canvas',     file: 'page_4', label: '以太画布', en: 'Infinite Canvas' },
  { id: 'sec-team',       file: 'page_3', label: '团队协作', en: 'Team Collaboration' },
  { id: 'sec-profile',    file: 'page_2', label: '个人中心', en: 'Profile Center' },
  { id: 'sec-pricing',    file: 'page_1', label: '定价与订阅', en: 'Pricing & Subscription' },
];

/* ========== Full-Screen Canvas Modal — vertical iframe stack ========== */
export function CanvasModal({ onClose }: { onClose: () => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState('sec-storyboard');
  const [heights, setHeights] = useState<Record<string, number>>({});

  // Auto-resize iframe to content height on load
  const onIframeLoad = (id: string, e: React.SyntheticEvent<HTMLIFrameElement>) => {
    const iframe = e.currentTarget;
    try {
      const doc = iframe.contentDocument;
      if (doc) {
        const h = doc.documentElement.scrollHeight;
        if (h && h > 0) setHeights((prev) => ({ ...prev, [id]: h }));
      }
    } catch {
      // cross-origin fallback — keep default
    }
  };

  // Track which section is in view via scroll
  const handleScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    const vh = container.clientHeight;
    let current = pages[0].id;
    for (const p of pages) {
      const el = document.getElementById(p.id);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (rect.top < vh * 0.5) current = p.id;
    }
    setActiveId(current);
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    container.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => container.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const jumpTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div
      className="fixed inset-0 z-[90] bg-white flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Top bar — back + project num + centered nav + close */}
      <div className="relative flex items-center justify-center px-6 py-3 bg-white/90 backdrop-blur-md border-b border-black/5 shrink-0">
        <div className="absolute left-3 flex items-center gap-2">
          <button onClick={onClose} className="flex items-center gap-1 px-2 py-1 rounded-full bg-black/5 hover:bg-black/10 transition-colors cursor-pointer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
            <span className="text-[10px] font-medium hidden sm:inline">返回主页</span>
          </button>
          <span className="text-xs font-mono text-black/30 tracking-wider">PROJECT 02</span>
        </div>
        <nav className="flex items-center gap-1">
          {pages.map((p) => (
            <button
              key={p.id}
              onClick={() => jumpTo(p.id)}
              className={`px-3 py-1.5 text-[11px] font-mono tracking-wider transition-colors cursor-pointer border-b-2 ${
                activeId === p.id
                  ? 'text-black/80 border-black/80'
                  : 'text-black/25 border-transparent hover:text-black/50'
              }`}
            >
              {p.label}
            </button>
          ))}
        </nav>
        <button
          onClick={onClose}
          className="absolute right-6 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10 transition-colors cursor-pointer"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Scrollable content — one scrollbar drives everything */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto bg-white">
        {pages.map((p, idx) => {
          const isLast = idx === pages.length - 1;
          const h = heights[p.id] || window.innerHeight;

          // Profile page: render React component instead of iframe
          if (p.id === 'sec-profile') {
            return (
              <section
                key={p.id}
                id={p.id}
                className="relative w-full"
                style={{ minHeight: h }}
              >
                <CanvasProfileSection />
                {isLast && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm text-[10px] font-mono text-white/60 tracking-wider pointer-events-none">
                    {p.label} · {p.en}
                  </div>
                )}
              </section>
            );
          }

          return (
            <section
              key={p.id}
              id={p.id}
              className="relative w-full"
              style={{ height: h }}
            >
              <iframe
                src={`/canvas/${p.file}.html`}
                className="w-full h-full border-0 pointer-events-none"
                title={p.label}
                scrolling="no"
                onLoad={(e) => onIframeLoad(p.id, e)}
              />
              {isLast && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm text-[10px] font-mono text-white/60 tracking-wider pointer-events-none">
                  {p.label} · {p.en}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ========== Dynamic Preview Card — live iframe of first page ========== */
export function CanvasCard({ onClick }: { onClick: () => void }) {
  return (
    <motion.div
      className="card-3d cursor-target cursor-pointer group"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
    >
      <div className="card-3d-inner overflow-hidden bg-white relative aspect-[21/9] md:aspect-[21/9]" style={{ borderRadius: '0.5rem' }}>
        {/* Live iframe — renders page_6 (分镜创作) hero section, shifted up 3 grid units */}
        <iframe
          src="/canvas/page_6.html"
          className="absolute inset-0 w-full h-full border-0 pointer-events-none"
          style={{ transform: 'translateY(-40px)', transformOrigin: 'top left' }}
          scrolling="no"
          title="分镜创作预览"
        />
        {/* Text overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5 pointer-events-none">
          <span className="text-[10px] font-mono text-white/50 tracking-wider uppercase">PROJECT 02</span>
          <h3 className="text-white font-bold text-lg mt-1 leading-tight">无限画布</h3>
          <p className="text-white/50 text-xs mt-1">AetherWorkbench · 全屏观览</p>
        </div>
        {/* Expand icon */}
        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}
