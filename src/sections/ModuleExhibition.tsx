import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ========== Exhibition Detail Modal ========== */
export function ExhibitionModal({ onClose }: { onClose: () => void }) {
  const [lightbox, setLightbox] = useState<string | null>(null);

  const exhibitions = [
    { src: '/images/gen-04.jpg', title: '上海慕尼黑工业博览会', en: 'Shanghai Munich Industry Expo', desc: '主导国内外大型展会线上线下整体品牌视觉体系搭建，完成主视觉KV、宣传画册、海报展板、现场导视系统。' },
    { src: '/images/gen-05.jpg', title: '德国汉诺威工业博览会', en: 'Hannover Messe Germany', desc: '统筹展会现场设计物料落地对接、布置执行与协调管理，全程跟进物料安装、视觉呈现效果。' },
    { src: '/images/gen-06.jpg', title: '深圳国际光电博览会', en: 'Shenzhen CIOE Expo', desc: '精准把控品牌视觉调性，实现展会全渠道、全场景视觉风格高度统一，全方位赋能品牌展示。' },
  ];

  return (
    <motion.div className="fixed inset-0 z-[90] bg-white overflow-y-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md border-b border-black/5">
        <span className="text-xs font-mono text-black/30 tracking-wider">PROJECT 03</span>
        <button onClick={onClose} className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10 transition-colors">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
        </button>
      </div>

      <div className="max-w-[1000px] mx-auto px-6 pb-20">
        <motion.div className="py-10 text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h2 className="text-[clamp(28px,5vw,56px)] font-black tracking-tight">展会视觉体系</h2>
          <p className="font-mono text-xs text-black/25 mt-2 tracking-[0.2em] uppercase">Exhibition Visual System Design</p>
        </motion.div>

        <motion.p className="text-center text-black/45 max-w-[650px] mx-auto text-sm leading-relaxed mb-10"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          主导上海工业博览会、国际光电博览会、德国慕尼黑工业博览会、新加坡工业博览会等大型展会线上线下整体品牌视觉体系搭建，实现展会全渠道、全场景视觉风格高度统一。
        </motion.p>

        <div className="space-y-8 mb-10">
          {exhibitions.map((ex, i) => (
            <motion.div key={ex.title} className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center"
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + i * 0.1 }}>
              <div className="rounded-2xl overflow-hidden cursor-pointer border border-black/5" onClick={() => setLightbox(ex.src)}>
                <img src={ex.src} alt={ex.title} className="w-full h-52 md:h-64 object-cover" />
              </div>
              <div>
                <p className="text-[10px] font-mono text-black/25 tracking-wider uppercase">{ex.en}</p>
                <h3 className="text-xl font-bold mt-1 mb-3">{ex.title}</h3>
                <p className="text-sm text-black/45 leading-relaxed">{ex.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div className="rounded-2xl bg-gray-50 border border-black/5 p-6 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <div className="flex justify-center gap-8">
            <div><p className="text-2xl font-black text-black/80">4+</p><p className="text-[10px] font-mono text-black/25 mt-1">国际展会</p></div>
            <div><p className="text-2xl font-black text-black/80">100%</p><p className="text-[10px] font-mono text-black/25 mt-1">视觉统一</p></div>
            <div><p className="text-2xl font-black text-black/80">KV+导视</p><p className="text-[10px] font-mono text-black/25 mt-1">全品类设计</p></div>
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
export function ExhibitionCard({ onClick }: { onClick: () => void }) {
  return (
    <motion.div className="card-3d cursor-pointer group" whileHover={{ y: -6 }} transition={{ duration: 0.3 }} onClick={onClick}>
      <div className="card-3d-inner rounded-2xl overflow-hidden bg-white relative aspect-[4/5]">
        <img src="/images/gen-04.jpg" alt="展会视觉体系" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <span className="text-[10px] font-mono text-white/50 tracking-wider uppercase">PROJECT 03</span>
          <h3 className="text-white font-bold text-lg mt-1 leading-tight">展会视觉体系</h3>
          <p className="text-white/50 text-xs mt-1">上海 · 汉诺威 · 深圳</p>
        </div>
        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17" /></svg>
        </div>
      </div>
    </motion.div>
  );
}
