import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, projectOrder } from '@/data/projects';
import { AnniversaryCard, AnniversaryModal } from '@/sections/ModuleAnniversary';
import { MascotCard, MascotModal } from '@/sections/ModuleMascot';
import { ExhibitionCard, ExhibitionModal } from '@/sections/ModuleExhibition';
import { AIGCCard, AIGCModal } from '@/sections/ModuleAIGC';
import { Ecom3CCard, Ecom3CModal } from '@/sections/Module3C';
import { CanvasCard } from '@/sections/ModuleCanvas';
import { JihuiCard } from '@/sections/ModuleJihui';
import ModalNavShell from '@/components/shared/ModalNavShell';

type ActiveModal = (typeof projectOrder)[number] | null;

const cardMap: Record<string, React.FC<{ onClick: () => void }>> = {
  jihui: JihuiCard, canvas: CanvasCard, anniversary: AnniversaryCard, mascot: MascotCard, exhibition: ExhibitionCard,
  aigc: AIGCCard, ecom3c: Ecom3CCard,
};
const modalMap: Record<string, React.FC<{ onClose: () => void }>> = {
  anniversary: AnniversaryModal, mascot: MascotModal, exhibition: ExhibitionModal,
  aigc: AIGCModal, ecom3c: Ecom3CModal,
};

/* ===== fadeUp helper ===== */
const fadeUp = (d: number) => ({
  initial: { filter: 'blur(10px)', opacity: 0, y: 20 },
  whileInView: { filter: 'blur(0px)', opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: 'easeOut' as const, delay: d },
});

/** Parse **bold** markers in text into JSX */
function renderRichText(text: string): React.ReactNode {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="text-black/80 font-semibold">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

export default function ProjectsGrid() {
  const [active, setActive] = useState<ActiveModal>(null);
  const openModal = useCallback((id: Exclude<ActiveModal, null>) => {
    setActive(id); window.history.pushState({ modal: id }, '', '#project=' + id);
  }, []);
  const closeModal = useCallback(() => {
    setActive(null);
    window.history.replaceState(null, '', window.location.pathname);
  }, []);
  const navigateProject = useCallback((dir: number) => {
    if (!active) return;
    const idx = projectOrder.indexOf(active);
    const next = projectOrder[idx + dir] as Exclude<ActiveModal, null> | undefined;
    if (!next) return;
    window.history.replaceState({}, '', window.location.pathname);
    setActive(next); window.history.pushState({ modal: next }, '', '#project=' + next);
  }, [active]);
  useEffect(() => {
    const handleChange = () => { const state = window.history.state; const hash = window.location.hash; const match = hash.match(/project=(\w+)/); const id = state?.modal || (match ? match[1] : null); if (id && projectOrder.includes(id)) setActive(id); else setActive(null); };
    window.addEventListener('popstate', handleChange); window.addEventListener('hashchange', handleChange);
    handleChange(); return () => { window.removeEventListener('popstate', handleChange); window.removeEventListener('hashchange', handleChange); };
  }, []);
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (!active) return; if (e.key === 'Escape') closeModal(); if (e.key === 'ArrowLeft') navigateProject(-1); if (e.key === 'ArrowRight') navigateProject(1); };
    window.addEventListener('keydown', handleKey); return () => window.removeEventListener('keydown', handleKey);
  }, [active, closeModal, navigateProject]);
  const currentIdx = active ? projectOrder.indexOf(active) : -1;
  const hasPrev = currentIdx > 0; const hasNext = currentIdx >= 0 && currentIdx < projectOrder.length - 1;
  return (<>
    {/* Section header */}
    <div className="py-6 overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      <div className="flex items-center justify-center gap-4">
        <div className="h-px flex-1 max-w-[120px]" style={{ background: 'linear-gradient(to right, transparent, var(--accent))' }} />
        <span className="text-[10px] font-mono tracking-[0.4em] uppercase" style={{ color: 'var(--accent)' }}>Selected Works</span>
        <div className="h-px flex-1 max-w-[120px]" style={{ background: 'linear-gradient(to left, transparent, var(--accent))' }} />
      </div>
    </div>

    <section id="projects" className="section-padded" style={{ background: 'var(--bg-primary)' }}>
      {/* Title */}
      <motion.div className="text-center mb-12" {...fadeUp(0.2)}>
        <motion.h2 className="font-heading italic text-black text-6xl md:text-7xl lg:text-[6.5rem] leading-[0.85] tracking-[-4px] mb-4"
          {...fadeUp(0.3)}>
          Selected works
        </motion.h2>
        <motion.p className="text-sm mt-4 max-w-[640px] mx-auto leading-relaxed px-4"
          style={{ color: 'var(--text-secondary)' }} {...fadeUp(0.4)}>
          从品牌视觉系统到移动端界面，从AI生成到3C电商详情页——用设计连接商业与体验
        </motion.p>
      </motion.div>

      <div className="max-w-[1200px] mx-auto">
        {projects.map((p, i) => {
          const Card = cardMap[p.id];
          const isOdd = i % 2 === 1;

          // Full-width banner: first two + B站
          if (i === 0 || i === 1 || p.id === 'aigc') {
            const isJihui = p.id === 'jihui';
            const isCanvas = p.id === 'canvas';

            return (
              <motion.div key={p.id} {...fadeUp(0.3 + i * 0.1)} className="mb-16 md:mb-24">
                {/* Jihui & Canvas: card handles its own external-link click; others open modal */}
                {isJihui || isCanvas ? (
                  <div className="cursor-pointer cursor-target w-full">
                    <Card onClick={() => {}} />
                  </div>
                ) : (
                  <div className="cursor-pointer cursor-target w-full" onClick={() => openModal(p.id as Exclude<ActiveModal, null>)}>
                    <Card onClick={() => openModal(p.id as Exclude<ActiveModal, null>)} />
                  </div>
                )}
                <div className="text-center mt-6">
                  <div className="flex flex-wrap gap-1.5 mb-4 justify-center">
                    {p.tags.map((t) => (
                      <span key={t} className="text-[10px] font-body text-black/40 font-light tracking-[0.15em] uppercase">
                        {t}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-heading italic text-black text-3xl md:text-4xl lg:text-5xl tracking-[-2px] leading-[0.9]">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-xs lg:text-sm text-black/50 font-body font-light tracking-[0.1em] uppercase whitespace-pre-line">
                    {p.subtitle}
                  </p>
                  {isCanvas ? (
                    <div className="mt-4 space-y-3">
                      <p className="text-sm lg:text-base text-black/60 font-body font-light leading-relaxed max-w-2xl mx-auto">
                        目前该平台还在内测调试中，部分功能暂无法使用，敬请期待开放！
                      </p>
                      <p className="text-sm lg:text-base text-black/60 font-body font-light leading-relaxed max-w-2xl mx-auto">
                        点击卡片可直接进入平台在线体验。
                      </p>
                    </div>
                  ) : (
                    <p className="mt-4 text-sm lg:text-base text-black/60 font-body font-light leading-relaxed whitespace-pre-line">
                      {renderRichText(p.shortDesc)}
                    </p>
                  )}
                  {isJihui ? (
                    <a
                      href="http://118.31.14.19/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-target mt-5 liquid-glass-strong rounded-full px-5 py-2.5 text-xs font-medium text-black/70 font-body inline-flex items-center gap-2 hover:bg-black/5 transition-colors no-underline"
                    >
                      访问平台
                      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M7 17L17 7" />
                        <path d="M7 7h10v10" />
                      </svg>
                    </a>
                  ) : isCanvas ? null : (
                    <button
                      onClick={() => openModal(p.id as Exclude<ActiveModal, null>)}
                      className="cursor-target mt-5 liquid-glass-strong rounded-full px-5 py-2.5 text-xs font-medium text-black/70 font-body inline-flex items-center gap-2 hover:bg-black/5 transition-colors"
                    >
                      全屏观览
                      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M7 17L17 7" />
                        <path d="M7 7h10v10" />
                      </svg>
                    </button>
                  )}
                </div>
              </motion.div>
            );
          }

          return (
            <motion.div
              key={p.id}
              {...fadeUp(0.3 + i * 0.1)}
              className={`flex flex-col md:flex-row gap-6 md:gap-10 mb-16 md:mb-24 items-stretch ${
                isOdd ? 'md:flex-row-reverse' : ''
              }`}
            >
              <div className="md:w-1/2 cursor-pointer cursor-target" onClick={() => openModal(p.id as Exclude<ActiveModal, null>)}>
                <Card onClick={() => openModal(p.id as Exclude<ActiveModal, null>)} />
              </div>

              <div className={`md:w-1/2 flex flex-col justify-center ${
                isOdd ? 'md:text-left md:items-start' : 'md:text-right md:items-end'
              }`}>
                <div className={`flex flex-wrap gap-1.5 mb-4 ${
                  isOdd ? 'md:justify-start' : 'md:justify-end'
                }`}>
                  {p.tags.map((t) => (
                    <span key={t} className="text-[10px] font-body text-black/40 font-light tracking-[0.15em] uppercase">
                      {t}
                    </span>
                  ))}
                </div>
                <h3 className="font-heading italic text-black text-3xl md:text-4xl lg:text-5xl tracking-[-2px] leading-[0.9]">
                  {p.title}
                </h3>
                <p className="mt-3 text-xs lg:text-sm text-black/50 font-body font-light tracking-[0.1em] uppercase whitespace-pre-line">
                  {p.subtitle}
                </p>
                <p className="mt-4 text-sm lg:text-base text-black/60 font-body font-light leading-relaxed whitespace-pre-line">
                  {renderRichText(p.shortDesc)}
                </p>
                <button
                  onClick={() => openModal(p.id as Exclude<ActiveModal, null>)}
                  className={`cursor-target mt-5 liquid-glass-strong rounded-full px-5 py-2.5 text-xs font-medium text-black/70 font-body flex items-center gap-2 hover:bg-black/5 transition-colors ${
                    isOdd ? 'md:self-start' : 'md:self-end'
                  }`}
                >
                  全屏预览
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M7 17L17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>

    <AnimatePresence>{active && (() => { const Modal = modalMap[active]; return Modal ? <ModalNavShell key={active} hasPrev={hasPrev} hasNext={hasNext} onPrev={() => navigateProject(-1)} onNext={() => navigateProject(1)}><Modal onClose={closeModal} /></ModalNavShell> : null; })()}</AnimatePresence>
    <AnimatePresence>{active && <motion.div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[95] px-4 py-2 rounded-full bg-black/5 backdrop-blur-sm text-[11px] font-mono text-black/30 pointer-events-none" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}>{projects.find((p) => p.id === active)?.title} · {currentIdx + 1} / {projectOrder.length}</motion.div>}</AnimatePresence>
  </>);
}
