import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ===== Video Fullscreen Player ===== */
function VideoPlayer({ onClose }: { onClose: () => void }) {
  return (
    <motion.div className="fixed inset-0 z-[110] bg-black/95 flex items-center justify-center p-4 md:p-8 cursor-pointer"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div className="w-full max-w-[1200px] aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl"
        initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }}
        transition={{ type: 'spring', damping: 25 }} onClick={(e) => e.stopPropagation()}>
        <video src="./videos/anniversary-30th.mp4" controls playsInline className="w-full h-full object-contain" />
      </motion.div>
      <button className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
        onClick={(e) => { e.stopPropagation(); onClose(); }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
      </button>
      <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/30 text-xs font-mono">点击任意区域关闭</p>
    </motion.div>
  );
}

const navItems = [
  { id: 'sec-concept', label: '标志解析', num: '01' },
  { id: 'sec-geometry', label: '几何分析', num: '02' },
  { id: 'sec-contents', label: '目录导言', num: '03' },
  { id: 'sec-manual', label: '手册归档', num: '04' },
  { id: 'sec-mockups', label: '应用样机', num: '05' },
];

/* ═══════════════════════════════════════════════════════
   大族激光30周年 · STUDIO30
   ═══════════════════════════════════════════════════════ */

export function AnniversaryModal({ onClose }: { onClose: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState('sec-concept');
  const [videoOpen, setVideoOpen] = useState(false);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const viewHeight = container.clientHeight;
    let current = navItems[0].id;
    for (const item of navItems) {
      const el = document.getElementById(item.id);
      if (!el) continue;
      if (el.getBoundingClientRect().top < viewHeight * 0.4) current = item.id;
    }
    setActiveId(current);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => container.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 z-[90] bg-white overflow-y-auto overflow-x-hidden"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >

{/* ═══ Hero Video Background ═══ */}
<div className="relative min-h-screen overflow-hidden">
  <video src="./videos/anniversary-30th.mp4" muted loop autoPlay playsInline
    className="absolute inset-0 w-full h-full object-cover"
    style={{ filter: 'brightness(0.45)' }} />
  <div className="absolute inset-x-0 top-0 h-[30%] bg-gradient-to-b from-black/40 to-transparent z-0" />
  <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6 pt-20">
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
      <span className="text-[10px] font-mono text-white/30 tracking-[0.3em] uppercase">30th Anniversary</span>
      <h2 className="text-[clamp(36px,7vw,72px)] font-black tracking-tight text-white mt-3">大族激光30周年</h2>
      <p className="text-sm text-white/35 mt-4 max-w-[500px] mx-auto leading-relaxed">
        LOGO Design Guidelines · 30-Page Brand Manual · Visual Applications · Gold/Silver Foil Stamping · Office Stationery System · Gift Box Packaging
      </p>
    </motion.div>
    <motion.div className="mt-10 flex flex-col items-center gap-2"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
      <span className="text-[10px] font-mono text-white/25 tracking-wider">向下滑动查看</span>
      <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" className="text-white/40">
          <path d="M12 5v14M5 12l7 7 7-7" /></svg>
      </motion.div>
    </motion.div>
    {/* Play button */}
    <motion.button
      className="absolute bottom-10 right-8 flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full border border-white/15 hover:bg-white/20 transition-colors"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
      whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
      onClick={(e) => { e.stopPropagation(); setVideoOpen(true); }}>
      <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="black"><path d="M8 5v14l11-7z" /></svg>
      </span>
      <span className="text-xs font-bold text-white">播放完整视频</span>
    </motion.button>
  </div>
  <div className="absolute inset-x-0 bottom-0 h-[25%] z-0"
    style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.15) 30%, rgba(255,255,255,0.5) 60%, rgba(255,255,255,0.85) 85%, rgb(255,255,255) 100%)' }} />
</div>

{/* ═══ 返回主页 ═══ */}
      <button onClick={onClose} className="fixed top-4 left-4 z-[100] flex items-center gap-1.5 px-3 py-2 rounded-full bg-black/10 backdrop-blur-md hover:bg-black/20 transition-colors cursor-pointer">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
        <span className="text-xs font-medium hidden sm:inline">返回主页</span>
      </button>

{/* ═══ 关闭按钮 ═══ */}
      <button onClick={onClose} className="fixed top-4 right-4 z-[100] w-10 h-10 rounded-full bg-black/10 backdrop-blur-md flex items-center justify-center hover:bg-black/20 transition-colors cursor-pointer">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
      </button>

{/* ═══ 磨砂玻璃顶栏 ═══ */}
<div className="fixed top-0 pt-6 z-50 flex justify-center px-4 pointer-events-none w-full">
<div className="flex items-center gap-1 px-3 py-2 rounded-full pointer-events-auto"
  style={{
    background: 'rgba(255,255,255,0.65)',
    backdropFilter: 'blur(24px) saturate(180%)',
    WebkitBackdropFilter: 'blur(24px) saturate(180%)',
    border: '1px solid rgba(0,71,255,0.08)',
    boxShadow: '0 8px 32px rgba(0,53,197,0.04), 0 2px 8px rgba(0,0,0,0.02)',
  }}>
{navItems.map((item) => {
  const isActive = item.id === activeId;
  return (
    <button key={item.id} onClick={() => scrollTo(item.id)}
      className="relative flex items-center gap-1.5 px-3 py-2 rounded-full transition-colors duration-300 cursor-pointer">
      {isActive && (
        <motion.div className="absolute inset-0 rounded-full z-0"
          layoutId="anni-active-pill"
          style={{ background: 'linear-gradient(135deg, rgba(0,71,255,0.9), rgba(0,53,197,0.85))' }}
          transition={{ type: 'spring', stiffness: 380, damping: 28 }} />
      )}
      <span className="relative z-10 text-[11px] font-mono font-bold tracking-tight"
        style={{ color: isActive ? '#fff' : 'rgba(0,53,197,0.35)' }}>{item.num}</span>
      <span className="relative z-10 text-[11px] font-medium tracking-wide whitespace-nowrap hidden sm:inline"
        style={{ color: isActive ? '#fff' : 'rgba(0,53,197,0.5)' }}>{item.label}</span>
    </button>
  );
})}
</div>
</div>

{/* ═══ 1. 标志解析 HERO ═══ */}
<section id="sec-concept" className="w-full px-margin-mobile md:px-margin-desktop pt-10 pb-16">
<div className="max-w-[1400px] mx-auto">
<div className="flex items-center gap-3 mb-4">
<span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-electric-blue">Design Philosophy</span>
<div className="h-px flex-1 bg-on-surface/20" />
</div>
<h2 className="text-[clamp(32px,6vw,64px)] font-black uppercase tracking-[-0.03em] leading-[1.05] mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
大族激光<span className="text-electric-blue">30周年</span>
</h2>
<p className="text-base text-on-surface-variant max-w-[600px] mb-8 leading-relaxed">
以数字「30」为核心符号，将激光光路抽象为几何线条，虚实交织中传递品牌三十载技术积淀与未来探索。
</p>
<div className="gallery-img-wrapper border border-on-surface bg-surface-container-lowest mb-6">
<img alt="" className="gallery-img w-full h-auto" style={{ objectFit: "contain" }} src="./images/30周年手册/design-philosophy.jpg" />
</div>
<div className="gallery-img-wrapper border border-on-surface bg-surface-container-lowest">
<img alt="" className="gallery-img w-full h-auto" style={{ objectFit: "contain" }} src="./images/30周年手册/concept.jpg" />
</div>
<div className="flex flex-wrap gap-6 mt-6 pt-4 border-t border-on-surface/10">
<div className="flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-electric-blue" />
<span className="text-xs font-mono text-on-surface-variant uppercase tracking-wider">Project: 30th Anniversary VI</span>
</div>
<div className="flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-on-surface/20" />
<span className="text-xs font-mono text-on-surface-variant uppercase tracking-wider">Grid: 12×12 · Ratio: 1:1.618</span>
</div>
<div className="flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-on-surface/20" />
<span className="text-xs font-mono text-on-surface-variant uppercase tracking-wider">Pages: 30 Sheets</span>
</div>
</div>
</div>
</section>

{/* ═══ 2. GEOMETRY ANALYSIS ═══ */}
<section id="sec-geometry" className="w-full px-margin-mobile md:px-margin-desktop py-16 border-t border-on-surface">
<div className="deconstructed-grid items-center">
<div className="col-span-12 md:col-span-8">
<div className="gallery-img-wrapper border border-on-surface">
<img alt="" className="gallery-img w-full h-auto" style={{ objectFit: "contain" }} src="./images/30周年手册/02.jpg" />
</div>
</div>
<div className="col-span-12 md:col-span-4 flex flex-col gap-8 md:pl-12 mt-8 md:mt-0">
<h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-4">GEOMETRY<br />ANALYSIS</h2>
<div className="w-12 h-1 bg-primary-container mb-6"></div>
</div>
</div>
</section>

{/* ═══ 3. 目录 + 手册封面 拼合排版 ═══ */}
<section id="sec-contents" className="w-full px-margin-mobile md:px-margin-desktop py-20 bg-surface-container-lowest relative overflow-hidden border-t border-b border-on-surface">
<div className="absolute top-0 right-0 w-1/2 h-full bg-surface-container-low border-l border-on-surface hidden md:block" />
<div className="max-w-[1400px] mx-auto relative z-10">
<div className="grid grid-cols-12 gap-4 items-start">
{/* 左：手册封面 */}
<div className="col-span-12 md:col-span-7">
<div className="gallery-img-wrapper border border-on-surface">
<img alt="" className="gallery-img w-full h-auto" style={{ objectFit: "contain" }} src="./images/30周年手册/01.jpg" />
</div>
</div>
{/* 右：目录页 03.jpg + 04.jpg 错位 */}
<div className="col-span-12 md:col-span-5 flex flex-col mt-4 md:mt-0">
<div className="gallery-img-wrapper border border-on-surface">
<img alt="" className="gallery-img w-full h-auto" style={{ objectFit: "contain" }} src="./images/30周年手册/03.jpg" />
</div>
<div className="gallery-img-wrapper border border-on-surface offset-shadow -mt-6 -ml-6 md:-ml-10 z-10">
<img alt="" className="gallery-img w-full h-auto" style={{ objectFit: "contain" }} src="./images/30周年手册/04.jpg" />
</div>
</div>
</div>
</div>
</section>

{/* ═══ 4. MANUAL ARCHIVE + 使用规范 + 品牌联合 ═══ */}
<section id="sec-manual" className="w-full px-margin-mobile md:px-margin-desktop py-16">
<div className="deconstructed-grid">

{/* Row 1 */}
<div className="col-span-12 md:col-span-8">
<div className="gallery-img-wrapper border border-on-surface">
<img alt="" className="gallery-img w-full h-auto" style={{ objectFit: "contain" }} src="./images/30周年手册/05.jpg" />
</div>
</div>
<div className="col-span-12 md:col-span-4 flex flex-col gap-4 mt-4 md:mt-0">
<div className="gallery-img-wrapper border border-on-surface flex-1">
<img alt="" className="gallery-img w-full h-auto" style={{ objectFit: "contain" }} src="./images/30周年手册/06.jpg" />
</div>
<div className="gallery-img-wrapper border border-on-surface flex-1">
<img alt="" className="gallery-img w-full h-auto" style={{ objectFit: "contain" }} src="./images/30周年手册/07.jpg" />
</div>
</div>

{/* Row 2 */}
<div className="col-span-12 md:col-span-4 mt-4 gallery-img-wrapper border border-on-surface">
<img alt="" className="gallery-img w-full h-auto" style={{ objectFit: "contain" }} src="./images/30周年手册/08.jpg" />
</div>
<div className="col-span-12 md:col-span-4 mt-4 gallery-img-wrapper border border-on-surface">
<img alt="" className="gallery-img w-full h-auto" style={{ objectFit: "contain" }} src="./images/30周年手册/09.jpg" />
</div>
<div className="col-span-12 md:col-span-4 mt-4 gallery-img-wrapper border border-on-surface">
<img alt="" className="gallery-img w-full h-auto" style={{ objectFit: "contain" }} src="./images/30周年手册/10.jpg" />
</div>

{/* Row 3 */}
<div className="col-span-12 md:col-span-4 flex flex-col gap-4 mt-4">
<div className="gallery-img-wrapper border border-on-surface flex-1">
<img alt="" className="gallery-img w-full h-auto" style={{ objectFit: "contain" }} src="./images/30周年手册/11.jpg" />
</div>
<div className="gallery-img-wrapper border border-on-surface flex-1">
<img alt="" className="gallery-img w-full h-auto" style={{ objectFit: "contain" }} src="./images/30周年手册/12.jpg" />
</div>
</div>
<div className="col-span-12 md:col-span-8 mt-4">
<div className="gallery-img-wrapper border border-on-surface">
<img alt="" className="gallery-img w-full h-auto" style={{ objectFit: "contain" }} src="./images/30周年手册/13.jpg" />
</div>
</div>

{/* Dense grid 14-28 */}
<div className="col-span-12 mt-8">
<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
{[14,15,16,17,18,19,20,21,22,23,24,25,26,27,28].map(n => (
<div key={n} className="gallery-img-wrapper border border-on-surface">
<img alt="" className="gallery-img w-full h-auto" style={{ objectFit: "contain" }} src={'./images/30周年手册/' + String(n).padStart(2,'0') + '.jpg'} />
</div>
))}
</div>
</div>

{/* 使用规范 + 错误示范 — 并列 */}
<div className="col-span-12 mt-8">
<div className="grid grid-cols-2 gap-4">
<div className="gallery-img-wrapper border border-on-surface bg-surface">
<img alt="" className="gallery-img w-full h-auto" style={{ objectFit: "contain" }} src="./images/30周年手册/29.jpg" />
</div>
<div className="gallery-img-wrapper border border-on-surface bg-surface">
<img alt="" className="gallery-img w-full h-auto" style={{ objectFit: "contain" }} src="./images/30周年手册/30.jpg" />
</div>
</div>
</div>


</div>
</section>

{/* ═══ 5. 应用样机展示 ═══ */}
<section id="sec-mockups" className="w-full px-margin-mobile md:px-margin-desktop py-16 bg-surface border-t border-on-surface">
<div className="max-w-[1400px] mx-auto">
{/* ── 标题区 ── */}
<div className="mb-12">
<div className="flex items-center gap-3 mb-4">
<span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-electric-blue">Brand Applications</span>
<div className="h-px flex-1 bg-on-surface/20" />
</div>
<h2 className="text-[clamp(28px,5vw,48px)] font-black uppercase tracking-[-0.03em] leading-[1.05]" style={{ fontFamily: 'Sora, sans-serif' }}>
应用<span className="text-electric-blue">样机</span>
</h2>
<p className="text-sm text-on-surface-variant mt-3 max-w-[500px] leading-relaxed">
品牌视觉识别系统在实际场景中的落地应用，涵盖办公用品、礼盒包装、空间导视等多触点物料展示。
</p>
</div>
<div className="grid grid-cols-12 gap-4">
<div className="col-span-12 md:col-span-7">
<div className="gallery-img-wrapper border border-on-surface bg-surface" style={{ aspectRatio: "1.54" }}>
<img alt="" className="gallery-img w-full h-auto" style={{ objectFit: "contain" }} src="./images/30周年应用/v2.jpg" />
</div>
</div>
<div className="col-span-12 md:col-span-5">
<div className="gallery-img-wrapper border border-on-surface bg-surface" style={{ aspectRatio: "1.22" }}>
<img alt="" className="gallery-img w-full h-auto" style={{ objectFit: "contain" }} src="./images/30周年应用/v3.png" />
</div>
</div>
<div className="col-span-12 md:col-span-4 mt-4">
<div className="gallery-img-wrapper border border-on-surface bg-surface" style={{ aspectRatio: "0.56" }}>
<img alt="" className="gallery-img w-full h-auto" style={{ objectFit: "contain" }} src="./images/30周年应用/v4.jpg" />
</div>
</div>
<div className="col-span-12 md:col-span-8 mt-4">
<div className="gallery-img-wrapper border border-on-surface bg-surface offset-shadow" style={{ aspectRatio: "2.05" }}>
<img alt="" className="gallery-img w-full h-auto" style={{ objectFit: "contain" }} src="./images/30周年应用/h1.png" />
</div>
</div>
<div className="col-span-12 md:col-span-6 mt-4">
<div className="gallery-img-wrapper border border-on-surface bg-surface" style={{ aspectRatio: "1.54" }}>
<img alt="" className="gallery-img w-full h-auto" style={{ objectFit: "contain" }} src="./images/30周年应用/h2.png" />
</div>
</div>
<div className="col-span-12 md:col-span-6 mt-4">
<div className="gallery-img-wrapper border border-on-surface bg-surface" style={{ aspectRatio: "1.54" }}>
<img alt="" className="gallery-img w-full h-auto" style={{ objectFit: "contain" }} src="./images/30周年应用/h3.png" />
</div>
</div>
<div className="col-span-12 md:col-span-5 mt-4">
<div className="gallery-img-wrapper border border-on-surface bg-surface" style={{ aspectRatio: "1" }}>
<img alt="" className="gallery-img w-full h-auto" style={{ objectFit: "contain" }} src="./images/30周年应用/h4.png" />
</div>
</div>
<div className="col-span-12 md:col-span-7 mt-4">
<div className="gallery-img-wrapper border border-on-surface bg-surface" style={{ aspectRatio: "0.56" }}>
<img alt="" className="gallery-img w-full h-auto" style={{ objectFit: "contain" }} src="./images/30周年应用/v1.jpg" />
</div>
</div>
</div>
</div>
</section>

      <AnimatePresence>{videoOpen && <VideoPlayer onClose={() => setVideoOpen(false)} />}</AnimatePresence>
    </motion.div>
  );
}

export function AnniversaryCard({ onClick }: { onClick: () => void }) {
  return (
    <motion.div className="card-3d cursor-target cursor-pointer group" whileHover={{ y: -6 }} transition={{ duration: 0.3 }} onClick={onClick}>
      <div className="card-3d-inner rounded-2xl overflow-hidden bg-white relative aspect-[21/9]">
        <video src="./videos/anniversary-30th.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <span className="text-[10px] font-mono text-white/50 tracking-wider uppercase">PROJECT 02</span>
          <h3 className="text-white font-bold text-lg mt-1 leading-tight">大族激光30周年</h3>
          <p className="text-white/50 text-xs mt-1">LOGO设计规范 · 30页手册 · 视觉应用</p>
        </div>
        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17" /></svg>
        </div>
      </div>
    </motion.div>
  );
}
