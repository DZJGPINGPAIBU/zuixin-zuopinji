import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const tools = [
  { name: 'PS', color: '#001E36' }, { name: 'AI', color: '#330000' }, { name: 'Figma', color: '#1E1E1E' },
  { name: '即梦', color: '#FF2442' }, { name: 'Lovart', color: '#7C4DFF' }, { name: 'Nano Banana', color: '#FF6E40' },
  { name: 'ChatGPT Image2', color: '#10A37F' }, { name: 'Seedance', color: '#E91E63' },
  { name: 'Coze', color: '#4285F4' }, { name: 'Dify', color: '#1565C0' }, { name: 'SD2', color: '#FF9800' },
];

/* ========== AIGC Detail Modal ========== */
export function AIGCModal({ onClose }: { onClose: () => void }) {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <motion.div className="fixed inset-0 z-[90] bg-white overflow-y-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* Video Hero */}
      <div className="relative w-full h-[45vh] md:h-[55vh] bg-black overflow-hidden">
        <video
          src="/videos/hero-bg.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
        <div className="absolute bottom-8 left-0 right-0 text-center z-10">
          <motion.h2
            className="text-[clamp(32px,6vw,64px)] font-black tracking-tight text-black"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            B站独家签约创作者
          </motion.h2>
          <motion.p
            className="font-mono text-xs text-black/40 mt-2 tracking-[0.2em] uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
          >
            Bilibili Anime Visual Creator
          </motion.p>
        </div>
        {/* Close button — overlaid on video */}
        <button onClick={onClose} className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/40 transition-colors">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
        </button>
      </div>

      {/* Sticky nav bar */}
      <div className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md border-b border-black/5">
        <span className="text-xs font-mono text-black/30 tracking-wider">PROJECT 05</span>
        <button onClick={onClose} className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10 transition-colors">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
        </button>
      </div>

      <div className="max-w-[900px] mx-auto px-6 pb-20">
        <motion.p className="text-center text-black/45 max-w-[600px] mx-auto text-sm leading-relaxed mb-10"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          熟练运用PS、AI、Figma、即梦、Lovart、Nano Banana、ChatGPT Image2、Seedance等多款AI视觉模型，将AIGC深度应用于IP、VI、LOGO、创意视频等全流程设计，赋能部门设计效率提升50%以上。
        </motion.p>

        {/* Works */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {[
            { src: '/images/gen-07.jpg', title: 'AI创意视觉作品', desc: '赛博朋克风格激光切割机概念图' },
            { src: '/images/gen-08.jpg', title: 'AIGC协同工作流', desc: '设计师与AI神经网络融合' },
          ].map((img, i) => (
            <motion.div key={img.src} className="cursor-target rounded-2xl overflow-hidden cursor-pointer border border-black/5" whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + i * 0.1 }}
              onClick={() => setLightbox(img.src)}>
              <img src={img.src} alt={img.title} className="w-full h-48 md:h-60 object-cover" />
              <div className="p-3 bg-white">
                <p className="text-xs font-bold text-black/60">{img.title}</p>
                <p className="text-[10px] text-black/30 mt-0.5">{img.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div className="flex justify-center gap-10 mb-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <div className="text-center"><p className="text-3xl font-black text-black/80">50%</p><p className="text-[10px] font-mono text-black/25 mt-1">效率提升</p></div>
          <div className="text-center"><p className="text-3xl font-black text-black/80">30%</p><p className="text-[10px] font-mono text-black/25 mt-1">交付缩短</p></div>
        </motion.div>

        {/* Tools */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <h4 className="text-xs font-mono text-black/25 tracking-widest uppercase mb-4 text-center">AI TOOLKIT</h4>
          <div className="flex flex-wrap justify-center gap-2">
            {tools.map((tool) => (
              <span key={tool.name} className="px-3 py-1.5 rounded-full text-[11px] font-mono text-white" style={{ backgroundColor: tool.color }}>
                {tool.name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div className="fixed inset-0 z-[100] bg-white/95 flex items-center justify-center p-6 cursor-pointer"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLightbox(null)}>
            <motion.img src={lightbox} alt="" className="max-w-full max-h-[90vh] object-contain rounded-lg" initial={{ scale: 0.85 }} animate={{ scale: 1 }} exit={{ scale: 0.85 }} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ========== Small Preview Card ========== */
export function AIGCCard({ onClick }: { onClick: () => void }) {
  return (
    <motion.div className="card-3d cursor-pointer group" whileHover={{ y: -6 }} transition={{ duration: 0.3 }} onClick={onClick}>
      <div className="card-3d-inner rounded-2xl overflow-hidden bg-white relative aspect-[4/5]">
        <video src="/videos/hero-bg.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <span className="text-[10px] font-mono text-white/50 tracking-wider uppercase">PROJECT 05</span>
          <h3 className="text-white font-bold text-lg mt-1 leading-tight">B站独家签约创作者</h3>
          <p className="text-white/50 text-xs mt-1">动漫视觉 · 内容创作</p>
        </div>
        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17" /></svg>
        </div>
      </div>
    </motion.div>
  );
}
