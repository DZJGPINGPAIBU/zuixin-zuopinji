import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, projectOrder } from '@/data/projects';
import { AnniversaryCard, AnniversaryModal } from '@/sections/ModuleAnniversary_NEW';
import { MascotCard, MascotModal } from '@/sections/ModuleMascot';
import { ExhibitionCard, ExhibitionModal } from '@/sections/ModuleExhibition';
import { AIGCCard, AIGCModal } from '@/sections/ModuleAIGC';
import { Ecom3CCard, Ecom3CModal } from '@/sections/Module3C';
import ModalNavShell from '@/components/shared/ModalNavShell';

type ActiveModal = (typeof projectOrder)[number] | null;

const cardMap: Record<string, React.FC<{ onClick: () => void }>> = {
  anniversary: AnniversaryCard,
  mascot: MascotCard,
  exhibition: ExhibitionCard,
  aigc: AIGCCard,
  ecom3c: Ecom3CCard,
};

const modalMap: Record<string, React.FC<{ onClose: () => void }>> = {
  anniversary: AnniversaryModal,
  mascot: MascotModal,
  exhibition: ExhibitionModal,
  aigc: AIGCModal,
  ecom3c: Ecom3CModal,
};

export default function ProjectsGrid() {
  const [active, setActive] = useState<ActiveModal>(null);

  const openModal = useCallback((id: Exclude<ActiveModal, null>) => {
    setActive(id);
    window.history.pushState({ modal: id }, '', `#project=${id}`);
  }, []);

  const closeModal = useCallback(() => {
    setActive(null);
    if (window.history.state?.modal) window.history.back();
  }, []);

  const navigateProject = useCallback(
    (dir: number) => {
      if (!active) return;
      const idx = projectOrder.indexOf(active);
      const next = projectOrder[idx + dir] as Exclude<ActiveModal, null> | undefined;
      if (!next) return;
      window.history.replaceState({}, '', window.location.pathname);
      setActive(next);
      window.history.pushState({ modal: next }, '', `#project=${next}`);
    },
    [active]
  );

  useEffect(() => {
    const handleChange = () => {
      const state = window.history.state;
      const hash = window.location.hash;
      const match = hash.match(/project=(\w+)/);
      const id = state?.modal || (match ? match[1] : null);
      if (id && projectOrder.includes(id)) {
        setActive(id);
      } else {
        setActive(null);
      }
    };
    window.addEventListener('popstate', handleChange);
    window.addEventListener('hashchange', handleChange);
    handleChange();
    return () => {
      window.removeEventListener('popstate', handleChange);
      window.removeEventListener('hashchange', handleChange);
    };
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!active) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') navigateProject(-1);
      if (e.key === 'ArrowRight') navigateProject(1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [active, closeModal, navigateProject]);

  const currentIdx = active ? projectOrder.indexOf(active) : -1;
  const hasPrev = currentIdx > 0;
  const hasNext = currentIdx >= 0 && currentIdx < projectOrder.length - 1;

  const gridProjects = projects.filter((p) => p.id !== 'mascot');

  return (
    <>
      <div className="py-6 overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
        <div className="flex items-center justify-center gap-4">
          <div className="h-px flex-1 max-w-[120px]" style={{ background: 'linear-gradient(to right, transparent, var(--accent))' }} />
          <span className="text-[10px] font-mono tracking-[0.4em] uppercase" style={{ color: 'var(--accent)' }}>Selected Works</span>
          <div className="h-px flex-1 max-w-[120px]" style={{ background: 'linear-gradient(to left, transparent, var(--accent))' }} />
        </div>
      </div>

      <section id="projects" className="section-padded" style={{ background: 'var(--bg-primary)' }}>
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2 className="text-[clamp(32px,5vw,56px)] font-black tracking-tight mt-2 gradient-text" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>作品集</motion.h2>
          <motion.p className="text-sm mt-4 max-w-[500px] mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.5 }}>
            从品牌视觉系统到移动端界面，从AI生成到3C电商详情页——用设计连接商业与体验
          </motion.p>
        </motion.div>

        {/* Banner: Mascot */}
        <div className="max-w-[1100px] mx-auto mb-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <MascotCard onClick={() => openModal('mascot')} />
          </motion.div>
        </div>

        {/* Grid: other projects */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-[1100px] mx-auto">
          {gridProjects.map((p, i) => {
            const Card = cardMap[p.id];
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.06, 0.24) }}
              >
                <Card onClick={() => openModal(p.id as Exclude<ActiveModal, null>)} />
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Modals with nav */}
      <AnimatePresence>
        {active &&
          (() => {
            const Modal = modalMap[active];
            return Modal ? (
              <ModalNavShell
                key={active}
                hasPrev={hasPrev}
                hasNext={hasNext}
                onPrev={() => navigateProject(-1)}
                onNext={() => navigateProject(1)}
              >
                <Modal onClose={closeModal} />
              </ModalNavShell>
            ) : null;
          })()}
      </AnimatePresence>

      {/* Progress indicator */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[95] px-4 py-2 rounded-full bg-black/5 backdrop-blur-sm text-[11px] font-mono text-black/30 pointer-events-none"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            {projects.find((p) => p.id === active)?.title} · {currentIdx + 1} / {projectOrder.length}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
