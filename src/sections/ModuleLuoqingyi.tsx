import { motion } from 'framer-motion';

const c = {
  bg: '#131313',
  bgDeep: '#0e0e0e',
  surface: '#1c1b1b',
  primary: '#f2ca50',
  secondary: '#ffb4ac',
  onSurface: '#e5e2e1',
  muted: '#d0c5af',
};
const CALLIGRAPHY = "'Zhi Mang Xing', 'Ma Shan Zheng', 'STKaiti', 'Kaiti SC', cursive";
const SERIF = "'Noto Serif SC', 'Songti SC', 'STSong', serif";

const SECTIONS = [
  { id: 'profile', label: '角色档案', img: './images/luoqingyi/ly1_角色档案.png' },
  { id: 'lineage', label: '水脉传承', img: './images/luoqingyi/ly2_水脉传承.png' },
  { id: 'technique', label: '清漪诀', img: './images/luoqingyi/ly3_清漪诀.png' },
  { id: 'origin', label: '身世之卷', img: './images/luoqingyi/ly4_身世之卷.png' },
  { id: 'network', label: '关系网络', img: './images/luoqingyi/ly5_关系网络.png' },
  { id: 'elements', label: '五行格局', img: './images/luoqingyi/ly7_五行格局.png' },
  { id: 'choice', label: '抉择', img: './images/luoqingyi/ly6_抉择.png' },
];

export function LuoqingyiSections() {
  return (
    <>
      {/* ═══ Hero ═══ */}
      <section id="lq-hero" className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: c.bgDeep }}>
        <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(ellipse at center, rgba(242,202,80,0.12) 0%, transparent 70%)' }} />
        <div className="relative z-10 text-center flex flex-col items-center">
          <h1
            className="text-[5rem] md:text-[8rem] leading-none tracking-[0.15em] font-black"
            style={{
              fontFamily: CALLIGRAPHY,
              color: '#fff',
              textShadow: '2px 2px 0px rgba(0,0,0,0.5), 0 10px 30px rgba(0,0,0,0.8)',
            }}
          >
            洛清漪
          </h1>
          <p className="text-lg md:text-xl mt-6 tracking-[0.3em] uppercase opacity-80" style={{ fontFamily: SERIF, color: c.primary }}>
            洛清漪的碧水长卷
          </p>
        </div>
      </section>

      {/* ═══ 7 Full-screen Image Sections ═══ */}
      {SECTIONS.map((s) => (
        <section key={s.id} id={`lq-${s.id}`} className="relative w-full h-screen overflow-hidden" style={{ background: c.bg }}>
          <img
            src={s.img}
            alt={s.label}
            className="w-full h-full object-cover object-center"
            style={{
              maskImage: 'linear-gradient(to bottom, black 90%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 90%, transparent 100%)',
            }}
          />
          <div className="absolute bottom-8 left-8 z-10">
            <span className="text-xs tracking-[0.3em] uppercase opacity-40" style={{ fontFamily: 'Space Grotesk, monospace', color: c.muted }}>
              {s.label}
            </span>
          </div>
        </section>
      ))}
    </>
  );
}

export function LuoqingyiModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[90] overflow-y-auto overflow-x-hidden"
      style={{ background: c.bg, color: c.onSurface }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button
        onClick={onClose}
        className="fixed top-4 right-4 z-[100] w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md hover:bg-white/10 transition-colors"
        style={{ background: 'rgba(255,255,255,0.06)' }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button>
      <LuoqingyiSections />
    </motion.div>
  );
}

export function LuoqingyiCard({ onClick }: { onClick: () => void }) {
  return (
    <motion.div className="card-3d cursor-pointer group" whileHover={{ y: -6 }} transition={{ duration: 0.3 }} onClick={onClick}>
      <div className="card-3d-inner rounded-2xl overflow-hidden relative aspect-[4/5]" style={{ background: c.bg }}>
        <img src="./images/luoqingyi/screen.png" alt="" className="w-full h-full object-cover object-top opacity-70 group-hover:opacity-90 transition-opacity duration-500"/>
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${c.bg} 0%, transparent 45%)` }}/>
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ background: c.primary }}/>
          <span className="text-[9px] font-mono text-white/30 tracking-wider uppercase">Ink & Soul</span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <span className="text-[10px] font-mono text-white/40 tracking-wider uppercase">PROJECT 09</span>
          <h3 className="text-white font-bold text-lg mt-1 leading-tight">洛清漪</h3>
          <p className="text-white/40 text-xs mt-1 font-light">Ink & Soul · 碧水长卷 角色视觉</p>
        </div>
      </div>
    </motion.div>
  );
}
