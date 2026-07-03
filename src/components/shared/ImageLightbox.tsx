import { motion, AnimatePresence } from 'framer-motion';

interface ImageLightboxProps {
  src: string;
  title: string;
  page?: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ImageLightbox({ src, title, page, isOpen, onClose }: ImageLightboxProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-10 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.img
            src={src}
            alt={title}
            className="max-w-full max-h-[92vh] object-contain rounded-lg shadow-2xl"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          />
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-center">
            <p className="text-xs text-black/30 font-mono">
              {title} {page ? `· P.${page}` : ''}
            </p>
          </div>
          <button
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10 transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); onClose(); }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
