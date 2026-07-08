import { motion } from 'framer-motion';

const c = {
  bg: '#050505',
  bgDeep: '#0e0e0e',
  surface: '#131313',
  surfaceLow: '#1c1b1b',
  primary: '#f2ca50',
  secondary: '#ffb4ac',
  tertiary: '#86e1a5',
  error: '#ffb4ab',
  onSurface: '#e5e2e1',
  muted: '#d0c5af',
  dim: '#99907c',
  outline: '#4d4635',
};
const CALLIGRAPHY = "'Zhi Mang Xing', 'STKaiti', 'Kaiti SC', 'Ma Shan Zheng', cursive";
const SERIF = "'Noto Serif SC', 'Songti SC', 'STSong', serif";
const MONO = "'Space Grotesk', monospace";

const SECTIONS = [
  {
    id: 'state',
    title: '暴走 · 态',
    titleClass: 'text-white',
    lineColor: 'rgba(242,202,80,0.5)',
    img: '/images/chenmo/bz1_暴走档案.png',
    imgClass: 'object-cover object-center',
    desc: '神识溃散，真气逆流。形态在狂乱中重组，展现出超越常理的扭曲之美与毁灭之力。此为暴走之初态，混沌之始。',
    align: 'right' as const,
  },
  {
    id: 'trigger',
    title: '触发 · 机',
    titleClass: 'text-red-300',
    lineColor: 'rgba(255,180,172,0.5)',
    img: '/images/chenmo/bz2_触发机制.png',
    imgClass: 'object-cover object-center opacity-70',
    desc: '极怒、绝望或执念触及灵根底线。心魔引燃，如同星火燎原，瞬间吞噬理智的堤坝。',
    align: 'right' as const,
  },
  {
    id: 'power',
    title: '力 · 变',
    titleClass: 'text-amber-400',
    img: '/images/chenmo/bz3_能力暴增.png',
    imgClass: 'object-center object-contain',
    desc: '',
    align: 'center' as const,
  },
  {
    id: 'cost',
    title: '失控 · 价',
    titleClass: 'text-red-400',
    img: '/images/chenmo/bz4_失控代价.png',
    imgClass: 'object-cover object-right filter grayscale',
    align: 'vertical' as const,
  },
  {
    id: 'form',
    title: '形态 · 异',
    titleClass: 'text-white',
    img: '/images/chenmo/bz5_形态对比.png',
    imgClass: 'object-cover object-center',
    desc: '',
    align: 'dual' as const,
  },
  {
    id: 'depth',
    title: '觉醒 · 深',
    titleClass: 'text-green-300',
    img: '/images/chenmo/bz6_觉醒深度.png',
    imgClass: 'object-cover object-bottom',
    desc: '在暴走的深渊中，触及灵境的真实界限。理智虽失，却可能窥见大道法则的本源残片。',
    align: 'center' as const,
  },
  {
    id: 'convergence',
    title: '收束 · 路',
    titleClass: 'text-white',
    img: '/images/chenmo/bz7_收束之路.png',
    imgClass: 'object-cover object-center opacity-60',
    desc: '是浴火重生，还是彻底消亡？收束狂暴的真气，找回自我，方能将暴走转化为真正的觉醒蜕变。',
    align: 'center' as const,
  },
];

/* ════════════════════════════════════════════════════
   ChenmoSections — 可复用的暴走卷段落
   既可作为独立 Modal 使用，也可嵌入其他模块
   ════════════════════════════════════════════════════ */

export function ChenmoSections() {
  return (
    <>
      {/* ═══ Hero: 神化.暴走 ═══ */}
      <section id="bz-hero" className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: c.bg }}>
        <div className="relative z-10 text-center">
          <h1
            className="text-7xl md:text-[10rem] tracking-widest opacity-90 leading-none"
            style={{
              fontFamily: CALLIGRAPHY,
              background: 'linear-gradient(to bottom, #ffffff 0%, #d0c5af 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 20px rgba(255,255,255,0.1)',
            }}
          >
            神化.暴走
          </h1>
          <p
            className="mt-8 text-lg md:text-2xl tracking-[0.5em] font-light"
            style={{ fontFamily: SERIF, color: c.muted }}
          >
            辰墨 · 暴走卷
          </p>
        </div>
        <div
          className="absolute bottom-0 left-0 w-full h-[150px] z-10"
          style={{ background: `linear-gradient(to top, ${c.bg} 0%, transparent 100%)` }}
        />
      </section>

      {/* ═══ 7 大暴走形态滚动章节 ═══ */}
      {SECTIONS.map((s) => (
        <section
          key={s.id}
          id={`bz-${s.id}`}
          className="relative min-h-screen flex items-center overflow-hidden"
          style={{ background: c.bg }}
        >
          <div className="absolute inset-0 z-0">
            <img
              src={s.img}
              alt=""
              className={`w-full h-full ${s.imgClass}`}
              style={{
                maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
              }}
            />
          </div>

          <div
            className="relative z-10 w-full h-full flex flex-col px-8 md:px-16 py-16 md:py-32"
          >
            {s.align === 'left' && (
              <div className="flex flex-col justify-end h-full pb-12 max-w-lg">
                <h2 className="text-5xl md:text-7xl mb-4 leading-none" style={{ fontFamily: CALLIGRAPHY, background: 'linear-gradient(to bottom, #ffffff 0%, #d0c5af 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{s.title}</h2>
                <div className="h-px w-32 mb-6" style={{ background: s.lineColor }} />
                <p className="text-lg leading-loose tracking-widest" style={{ color: c.muted }}>{s.desc}</p>
              </div>
            )}

            {s.align === 'right' && (
              <div className="flex flex-col items-end justify-end h-full pb-12 ml-auto max-w-lg text-right">
                <h2 className="text-5xl md:text-7xl mb-4 leading-none" style={{ fontFamily: CALLIGRAPHY, color: '#ffdad6' }}>{s.title}</h2>
                <div className="h-px w-32 mb-6 ml-auto" style={{ background: s.lineColor }} />
                <p className="text-lg leading-loose tracking-widest text-right" style={{ color: c.muted }}>{s.desc}</p>
              </div>
            )}

            {s.align === 'center' && (
              <div className="flex flex-col items-center justify-center h-full text-center max-w-2xl mx-auto">
                {s.id === 'power' ? (
                  <div className="p-8 md:p-12 text-center max-w-2xl">
                    <h2 className="text-6xl md:text-8xl mb-8 leading-none" style={{ fontFamily: CALLIGRAPHY, color: c.primary, textShadow: '0 0 15px rgba(242,202,80,0.5)' }}>{s.title}</h2>
                  </div>
                ) : s.id === 'depth' ? (
                  <div className="flex flex-col items-center justify-end h-full pb-16">
                    <h2 className="text-6xl md:text-8xl mb-6 leading-none" style={{ fontFamily: CALLIGRAPHY, color: '#9af6b8', textShadow: '0 0 20px rgba(154,246,184,0.3)' }}>{s.title}</h2>
                    <p className="text-xl leading-loose tracking-widest text-center" style={{ color: c.muted }}>{s.desc}</p>
                  </div>
                ) : s.id === 'convergence' ? (
                  <div className="flex flex-col items-center text-center">
                    <h2 className="text-5xl md:text-7xl mb-8 tracking-widest leading-none" style={{ fontFamily: CALLIGRAPHY, background: 'linear-gradient(to bottom, #ffffff 0%, #d0c5af 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textShadow: '0 0 20px rgba(255,255,255,0.1)' }}>{s.title}</h2>
                    <div className="w-px h-32 mb-8" style={{ background: `linear-gradient(to bottom, ${c.primary}, transparent)` }} />
                    <p className="text-xl leading-relaxed tracking-widest font-light max-w-xl" style={{ color: c.onSurface }}>{s.desc}</p>
                  </div>
                ) : null}
              </div>
            )}

            {s.align === 'vertical' && (
              <div className="flex flex-row items-center justify-center h-full gap-8">
                <h2 className="text-5xl md:text-7xl leading-none" style={{ fontFamily: CALLIGRAPHY, color: '#ffb4ab', writingMode: 'vertical-rl' as any, textOrientation: 'upright' as any, textShadow: '0 0 10px rgba(255,180,171,0.5)' }}>{s.title}</h2>
                <div className="h-48 w-px" style={{ background: 'rgba(255,180,171,0.3)' }} />
              </div>
            )}

            {s.align === 'dual' && (
              <div className="flex flex-col justify-center h-full max-w-4xl mx-auto w-full">
                <h2 className="text-5xl md:text-7xl mb-10 leading-none" style={{ fontFamily: CALLIGRAPHY, background: 'linear-gradient(to bottom, #ffffff 0%, #d0c5af 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{s.title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
                  <div className="border-t pt-4" style={{ borderColor: 'rgba(153,144,124,0.3)' }}>
                    <h3 className="text-xl mb-4 tracking-widest font-bold" style={{ color: c.onSurface, fontFamily: 'Syne, sans-serif' }}>本相</h3>
                    <p className="font-light" style={{ color: 'rgba(229,226,225,0.7)' }}>清明内敛，顺应天道循环。</p>
                  </div>
                  <div className="border-t pt-4" style={{ borderColor: 'rgba(255,180,172,0.5)' }}>
                    <h3 className="text-xl mb-4 tracking-widest font-bold text-right" style={{ color: '#ffdad6', fontFamily: 'Syne, sans-serif' }}>狂渊</h3>
                    <p className="font-light text-right" style={{ color: 'rgba(255,218,214,0.8)' }}>肢体异化，真气具象化为暗影与血火。</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="absolute bottom-0 left-0 w-full h-[150px] z-10" style={{ background: `linear-gradient(to top, ${c.bg} 0%, transparent 100%)` }} />
        </section>
      ))}

    </>
  );
}

export function ChenmoModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[90] overflow-y-auto overflow-x-hidden"
      style={{ background: c.bg, color: c.onSurface, scrollBehavior: 'smooth' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Ink texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 10, opacity: 0.04, mixBlendMode: 'overlay' as any, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
      />

      <button
        onClick={onClose}
        className="fixed top-4 right-4 z-[100] w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md hover:bg-white/10 transition-colors"
        style={{ background: 'rgba(255,255,255,0.06)' }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button>

      <nav
        className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 md:px-16 py-4 backdrop-blur-xl"
        style={{ background: 'rgba(19,19,19,0.3)', mixBlendMode: 'difference' }}
      >
        <span className="text-2xl md:text-3xl tracking-tighter font-bold" style={{ fontFamily: 'Syne, sans-serif', color: c.onSurface }}>辰墨</span>
      </nav>

      <ChenmoSections />
    </motion.div>
  );
}

export function ChenmoCard({ onClick }: { onClick: () => void }) {
  return (
    <motion.div
      className="card-3d cursor-pointer group"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
    >
      <div
        className="card-3d-inner rounded-2xl overflow-hidden relative aspect-[4/5]"
        style={{ background: c.bg }}
      >
        <img
          src="/images/chenmo/screen.png"
          alt=""
          className="w-full h-full object-cover object-top opacity-70 group-hover:opacity-90 transition-opacity duration-500"
        />
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(to top, ${c.bg} 0%, transparent 45%)` }}
        />
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ background: c.primary }} />
          <span className="text-[9px] font-mono text-white/30 tracking-wider uppercase">Ink & Soul</span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <span className="text-[10px] font-mono text-white/40 tracking-wider uppercase">PROJECT 08</span>
          <h3 className="text-white font-bold text-lg mt-1 leading-tight">辰墨暴走</h3>
          <p className="text-white/40 text-xs mt-1 font-light">Ink & Soul · 暴走卷 水墨武侠</p>
        </div>
      </div>
    </motion.div>
  );
}
