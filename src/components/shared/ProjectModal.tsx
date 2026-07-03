import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface ProjectModalProps {
  projectId: string;
  title: string;
  subtitle: string;
  children: ReactNode;
  onClose: () => void;
}

export default function ProjectModal({ projectId, title, subtitle, children, onClose }: ProjectModalProps) {
  return (
    <motion.div
      className="fixed inset-0 z-[90] bg-white overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Sticky close bar */}
      <div className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md border-b border-black/5">
        <span className="text-xs font-mono text-black/30 tracking-wider">{projectId}</span>
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10 transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Header */}
      <div className="max-w-[1100px] mx-auto px-6">
        <motion.div
          className="py-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-[clamp(28px,5vw,48px)] font-black tracking-tight">{title}</h2>
          <p className="font-mono text-xs text-black/25 mt-2 tracking-[0.2em] uppercase">{subtitle}</p>
        </motion.div>
      </div>

      {/* Content */}
      <div className="max-w-[1100px] mx-auto px-6 pb-20">
        {children}
      </div>
    </motion.div>
  );
}
