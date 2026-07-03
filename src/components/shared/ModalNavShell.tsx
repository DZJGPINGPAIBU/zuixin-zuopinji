import { motion, AnimatePresence } from 'framer-motion';
import type { ReactNode } from 'react';

interface ModalNavShellProps {
  children: ReactNode;
  hasPrev: boolean;
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
}

export default function ModalNavShell({ children, hasPrev, hasNext, onPrev, onNext }: ModalNavShellProps) {
  return (
    <>
      {children}

      {/* Prev button */}
      <AnimatePresence>
        {hasPrev && (
          <motion.button
            className="fixed left-4 top-1/2 -translate-y-1/2 z-[95] w-11 h-11 rounded-full bg-black/5 hover:bg-black/10 backdrop-blur-sm flex items-center justify-center transition-colors border border-black/5"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ delay: 0.3 }}
            onClick={onPrev}
            title="上一个作品"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-black/40">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Next button */}
      <AnimatePresence>
        {hasNext && (
          <motion.button
            className="fixed right-4 top-1/2 -translate-y-1/2 z-[95] w-11 h-11 rounded-full bg-black/5 hover:bg-black/10 backdrop-blur-sm flex items-center justify-center transition-colors border border-black/5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ delay: 0.3 }}
            onClick={onNext}
            title="下一个作品"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-black/40">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
