import { useState, useEffect, useCallback, type RefObject } from 'react';
import { motion } from 'framer-motion';

const navItems = [
  { id: 'modal-brand-portal', num: '01', label: '品牌门户',   en: 'BRAND PORTAL' },
  { id: 'modal-gift-dev',     num: '02', label: '周边礼品',   en: 'GIFT DEV' },
  { id: 'modal-calendar-dev', num: '03', label: '日历开发',   en: 'CALENDAR' },
  { id: 'modal-emoji-pack',   num: '04', label: '表情包',     en: 'EMOJI PACK' },
  { id: 'modal-app-showcase',num: '05', label: 'APP',        en: 'APP' },
];

interface Props {
  containerRef: RefObject<HTMLDivElement | null>;
}

export default function MascotSideNav({ containerRef }: Props) {
  const [activeId, setActiveId] = useState('modal-brand-portal');

  const handleScroll = useCallback(() => {
    const container = containerRef?.current;
    if (!container) return;
    const viewHeight = container.clientHeight;
    let current = navItems[0].id;
    for (const item of navItems) {
      const el = document.getElementById(item.id);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (rect.top < viewHeight * 0.4) current = item.id;
    }
    setActiveId(current);
  }, [containerRef]);

  useEffect(() => {
    const container = containerRef?.current;
    if (!container) return;
    container.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => container.removeEventListener('scroll', handleScroll);
  }, [handleScroll, containerRef]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveId(id);
    }
  };

  return (
    <motion.div
      className="fixed top-14 left-0 right-0 z-[95] flex justify-center px-4 pointer-events-none"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* ═══ Horizontal Glass Pill Bar ═══ */}
      <nav
        className="relative flex items-center gap-1 px-2 py-1.5 rounded-full pointer-events-auto"
        style={{
          background: 'rgba(255, 255, 255, 0.6)',
          backdropFilter: 'blur(28px) saturate(180%)',
          WebkitBackdropFilter: 'blur(28px) saturate(180%)',
          border: '1px solid rgba(0, 71, 255, 0.1)',
          boxShadow: '0 8px 32px rgba(0, 53, 197, 0.05), 0 2px 8px rgba(0, 53, 197, 0.02), inset 0 1px 0 rgba(255,255,255,0.5)',
        }}
      >
        {/* ═══ Nav Items ═══ */}
        {navItems.map((item) => {
          const isActive = item.id === activeId;

          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="relative flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-2 rounded-full transition-colors duration-300 cursor-pointer"
            >
              {/* Active background pill — uses layoutId for smooth sliding */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-full z-0"
                  layoutId="active-pill"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0, 71, 255, 0.9) 0%, rgba(0, 53, 197, 0.85) 100%)',
                    boxShadow: '0 2px 12px rgba(0, 71, 255, 0.2)',
                  }}
                  transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                />
              )}

              {/* Number */}
              <span
                className="relative z-10 text-[11px] font-mono font-bold tracking-tight w-4.5 h-4.5 sm:w-5 sm:h-5 flex items-center justify-center rounded-full transition-colors duration-300 shrink-0"
                style={{
                  color: isActive ? '#fff' : 'rgba(0, 53, 197, 0.4)',
                  background: isActive ? 'transparent' : 'rgba(0, 53, 197, 0.04)',
                }}
              >
                {item.num}
              </span>
              {/* Label — hidden on small screens */}
              <span
                className="relative z-10 text-[11px] font-medium tracking-wide whitespace-nowrap transition-colors duration-300 hidden sm:inline"
                style={{ color: isActive ? '#fff' : 'rgba(0, 53, 197, 0.6)' }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </motion.div>
  );
}
