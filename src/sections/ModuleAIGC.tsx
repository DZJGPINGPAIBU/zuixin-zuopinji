import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const c = {
  bg: '#131313', bgDeep: '#0e0e0e', surface: '#1c1b1b',
  primary: '#f2ca50', secondary: '#ffb4ac',
  secondaryContainer: '#960711', onSurface: '#e5e2e1',
  muted: '#d0c5af', dim: '#99907c',
};
const B = "'STKaiti', 'Kaiti SC', 'Songti SC', 'Ma Shan Zheng', 'Zhi Mang Xing', serif";
const L = "'Space Grotesk', monospace";

export function AIGCModal({ onClose }: { onClose: () => void }) {
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  const [videoPlaying, setVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setVideoPlaying(true);
    }
  };

  return (
    <motion.div className="fixed inset-0 z-[90] overflow-y-auto overflow-x-hidden" style={{ background: c.bgDeep }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

      {/* Ink brush texture SVG filter */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <filter id="ink-bleed" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" result="noise"/>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G"/>
          </filter>
          <filter id="ink-rough" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="5" result="noise"/>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G"/>
          </filter>
        </defs>
      </svg>

      <button onClick={onClose} className="fixed top-4 right-4 z-[100] w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md hover:bg-white/10 transition-colors" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button>

      {/* ════════════ 墨刃纪 主页 ════════════ */}
      <section className="relative h-screen overflow-hidden">
        <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 md:px-16 py-6" style={{ background: 'rgba(14,14,14,0.85)', backdropFilter: 'blur(12px)' }}>
          <span className="ink-brush text-2xl md:text-3xl uppercase tracking-widest font-bold" style={{ color: '#fff', fontFamily: B, textShadow: 'rgba(0,0,0,0.8) 2px 2px 4px, rgba(255,255,255,0.2) 0px 0px 10px', filter: 'url(#ink-bleed) contrast(1.5)' }}>墨刃纪</span>
          <div className="hidden md:flex flex-row items-center gap-8">
            <a href="#" className="ink-brush text-lg font-bold cursor-pointer pb-1" style={{ color: '#fff', fontFamily: B, filter: 'url(#ink-bleed)', textShadow: 'rgba(0,0,0,0.8) 1px 1px 3px, rgba(255,255,255,0.2) 0px 0px 8px' }} onClick={e => e.preventDefault()}>首页</a>
            <div className="group relative">
              <a href="#" className="ink-brush text-lg font-bold cursor-pointer pb-1 flex items-center" style={{ color: '#fff', fontFamily: B, filter: 'url(#ink-bleed)', textShadow: 'rgba(0,0,0,0.8) 1px 1px 3px, rgba(255,255,255,0.2) 0px 0px 8px' }} onClick={e => e.preventDefault()}>角色档案<svg className="ml-1 w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg></a>
              <div className="absolute top-full left-0 mt-2 w-48 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 border rounded-sm" style={{ background: 'rgba(19,19,19,0.9)', backdropFilter: 'blur(20px)', borderColor: 'rgba(242,202,80,0.3)' }}>
                {['辰墨','暴走 辰墨','洛清漪'].map(n => <a key={n} href="#" className="ink-brush block px-4 py-2 text-base font-bold hover:bg-primary/10 transition-colors text-white" style={{ fontFamily: B, filter: 'url(#ink-bleed)' }} onClick={e => e.preventDefault()}>{n}</a>)}
              </div>
            </div>
            <a href="#" className="ink-brush text-lg font-bold cursor-pointer pb-1" style={{ color: '#fff', fontFamily: B, filter: 'url(#ink-bleed)', textShadow: 'rgba(0,0,0,0.8) 1px 1px 3px, rgba(255,255,255,0.2) 0px 0px 8px' }} onClick={e => e.preventDefault()}>势力谱系</a>
          </div>
          <div className="flex items-center gap-4">
            <button className="hover:scale-105 transition-transform" style={{ color: c.onSurface }} onClick={onClose}><svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.3-4.3"/></svg></button>
            <button className="hover:scale-105 transition-transform" style={{ color: c.onSurface }} onClick={onClose}><svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg></button>
          </div>
        </nav>
        <div className="absolute inset-0"><video src="/bilibili/hero-bg.mp4" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover"/></div>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(19,19,19,0.4) 0%, transparent 40%, rgba(19,19,19,0.8) 100%)' }}/>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 0%, rgba(19,19,19,0.2) 40%, rgba(19,19,19,0.6) 100%)' }}/>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce opacity-40" onClick={() => go('cm-header')}>
          <svg className="w-6 h-6 text-white cursor-pointer" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 9l6 6 6-6"/></svg>
        </div>
      </section>

      {/* ════════════ 辰墨 Mobile Header ════════════ */}
      <header id="cm-header" className="md:hidden flex justify-between items-center px-8 py-3 w-full z-50 backdrop-blur-xl border-b-2 border-white/20" style={{ background: 'rgba(19,19,19,0.3)', color: '#fff' }}>
        <h1 className="text-3xl font-extrabold tracking-widest" style={{ fontFamily: B, filter: 'url(#ink-bleed)', textShadow: '0 0 10px rgba(255,255,255,0.5)' }}>辰墨</h1>
        <button className="p-2 rounded-full hover:bg-white/10"><svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg></button>
      </header>

      {/* ════════════ S1: video-preview ════════════ */}
      <section id="cm-video" className="relative h-screen flex items-center justify-center overflow-hidden" style={{ background: c.bgDeep }}>
        <div className="absolute inset-0 z-0">
          <img src="/bilibili/m1_角色档案.png" alt="" className="w-full h-full object-cover opacity-30 blur-sm"/>
          <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at center, transparent 0%, rgba(14,14,14,0.8) 70%, #0e0e0e 100%)' }}/>
        </div>
        {/* Video player */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4">
          <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50" style={{ background: '#000' }}>
            <video
              ref={videoRef}
              src="/videos/bilibili-preview.mp4"
              controls={videoPlaying}
              playsInline
              preload="metadata"
              className="w-full h-auto max-h-[70vh] object-contain"
              style={{ display: 'block' }}
            />
            {/* Play overlay */}
            {!videoPlaying && (
              <div
                className="absolute inset-0 flex flex-col items-center justify-center gap-6 cursor-pointer group"
                onClick={handlePlay}
                style={{ background: 'rgba(0,0,0,0.35)' }}
              >
                <div className="w-24 h-24 rounded-full border-2 border-white/30 flex items-center justify-center backdrop-blur-md group-hover:scale-110 group-hover:border-white transition-all duration-500">
                  <svg className="w-12 h-12 text-white ml-1" viewBox="0 0 24 24" fill="currentColor" style={{ filter: 'drop-shadow(0 0 15px rgba(255,255,255,0.5))' }}><path d="M8 5v14l11-7z"/></svg>
                </div>
                <div className="text-center">
                  <span className="text-2xl font-bold tracking-widest" style={{ fontFamily: B, color: '#fff' }}>视频预览</span>
                  <p className="text-sm text-gray-400 uppercase tracking-[0.3em] mt-2" style={{ fontFamily: L }}>Video Preview</p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-50" onClick={() => go('cm-hero')}>
          <svg className="w-8 h-8 text-white cursor-pointer" viewBox="0 0 24 24" fill="currentColor"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
        </div>
      </section>

      {/* ════════════ S2: hero 辰墨 ════════════ */}
      <section id="cm-hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <img src="/bilibili/m1_角色档案.png" alt="" className="absolute inset-0 w-full h-full object-cover object-center"/>
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at center, transparent 0%, rgba(14,14,14,0.8) 70%, #0e0e0e 100%)' }}/>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-6xl md:text-8xl font-black leading-none tracking-widest mb-6 text-white" style={{ fontFamily: B, filter: 'url(#ink-bleed)', textShadow: '0 0 20px rgba(255,255,255,0.6), 2px 4px 8px rgba(0,0,0,0.8)' }}>辰墨</h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-12">虚空铸命，墨染灵脉。</p>
          <a onClick={e => { e.preventDefault(); go('cm-origin'); }} className="flex flex-col items-center text-gray-400 hover:text-white transition-colors cursor-pointer">
            <span className="text-sm mb-2 tracking-[0.2em] uppercase" style={{ fontFamily: L }}>开启修仙之路</span>
            <svg className="w-8 h-8 animate-bounce" viewBox="0 0 24 24" fill="currentColor"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
          </a>
        </div>
      </section>

      {/* ════════════ S3: origin 本源 ════════════ */}
      <section id="cm-origin" className="relative min-h-screen flex flex-col justify-center" style={{ background: c.bgDeep }}>
        <div className="w-full py-16">
          <div className="mb-12 px-8 md:px-16">
            <h2 className="text-5xl md:text-6xl font-black mb-2 tracking-widest text-white" style={{ fontFamily: B, filter: 'url(#ink-bleed)' }}>本源</h2>
            <div className="w-24 h-1 rounded-full opacity-50" style={{ background: '#fff' }}/>
          </div>
          <div className="relative w-full overflow-hidden">
            <img src="/bilibili/m3身世之谜.png" alt="" className="w-full h-auto object-cover"/>
          </div>
        </div>
      </section>

      {/* ════════════ S4: seals & artifacts 印记 & 法器 ════════════ */}
      <section id="cm-seals" className="relative min-h-screen flex items-center py-16 overflow-hidden" style={{ background: c.surface }}>
        <div className="absolute inset-0 pointer-events-none opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 60%)' }}/>
        <div className="w-full px-6 md:px-12 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* 印记 */}
            <div className="lg:col-span-6 flex flex-col">
              <h2 className="text-5xl md:text-6xl font-black mb-6 text-center md:text-left tracking-widest text-white" style={{ fontFamily: B, filter: 'url(#ink-bleed)' }}>印记</h2>
              <div className="relative group cursor-pointer">
                <div className="absolute -inset-1 rounded-xl blur opacity-5 group-hover:opacity-50 transition duration-1000" style={{ background: 'linear-gradient(to right, #374151, #111827)' }}/>
                <div className="relative p-2 rounded-xl border overflow-hidden" style={{ background: c.bg, borderColor: 'rgba(77,70,53,0.5)' }}>
                  <img src="/bilibili/m4_印记档案.png" alt="" className="w-full aspect-square object-cover rounded-lg"/>
                  <div className="absolute bottom-4 left-4 right-4 text-center">
                    <span className="inline-block px-4 py-1 rounded-sm border backdrop-blur-md text-sm font-bold tracking-wider text-white" style={{ background: '#1f2937', borderColor: '#4b5563', fontFamily: B, filter: 'url(#ink-bleed)' }}>阴阳共鸣</span>
                  </div>
                </div>
              </div>
            </div>
            {/* 法器 */}
            <div className="lg:col-span-6 flex flex-col pt-12 lg:pt-0">
              <h2 className="text-5xl md:text-6xl font-black mb-6 text-center md:text-right tracking-widest text-white" style={{ fontFamily: B, filter: 'url(#ink-bleed)' }}>法器</h2>
              <div className="relative group cursor-pointer">
                <div className="absolute -inset-1 rounded-xl blur opacity-5 group-hover:opacity-50 transition duration-1000" style={{ background: 'linear-gradient(to left, #374151, #131313)' }}/>
                <div className="relative p-2 rounded-xl border overflow-hidden" style={{ background: c.bg, borderColor: 'rgba(77,70,53,0.5)' }}>
                  <img src="/bilibili/m2_神器档案.png" alt="" className="w-full aspect-square object-cover rounded-lg"/>
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #131313, transparent)' }}/>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold mb-2 tracking-wider text-white" style={{ fontFamily: B, filter: 'url(#ink-bleed)' }}>墨月弯刀</h3>
                    <p className="text-sm text-gray-300 line-clamp-2">神心碎片的结晶，化为斩断因果之刃。</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ S5: connections 因果图谱 ════════════ */}
      <section id="cm-connections" className="relative min-h-screen flex items-center py-16" style={{ background: c.bgDeep }}>
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #ffffff 0, #ffffff 1px, transparent 0, transparent 50%)', backgroundSize: '10px 10px' }}/>
        <div className="w-full px-6 flex flex-col items-center">
          <h2 className="text-5xl md:text-6xl font-black mb-12 text-center tracking-widest text-white" style={{ fontFamily: B, filter: 'url(#ink-bleed)' }}>因果图谱</h2>
          <div className="relative w-full max-w-5xl overflow-hidden border p-4 backdrop-blur-sm" style={{ borderColor: 'rgba(77,70,53,0.5)', background: 'rgba(28,27,27,0.5)' }}>
            <img src="/bilibili/m5_关系图谱.png" alt="" className="w-full h-auto"/>
            <div className="absolute inset-0 flex flex-col justify-between p-8 pointer-events-none">
              <div className="self-start text-sm tracking-widest border-b border-white/30 pb-2" style={{ color: c.dim, fontFamily: B, filter: 'url(#ink-bleed)' }}>同盟与宿敌</div>
              <div className="self-end text-right">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-md" style={{ background: 'rgba(42,42,42,0.8)', borderColor: 'rgba(77,70,53,0.5)' }}>
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"/>
                  <span className="text-sm tracking-wider text-white" style={{ fontFamily: B, filter: 'url(#ink-bleed)' }}>侦测到杀意</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ S6: awakening 觉醒之阶 ════════════ */}
      <section id="cm-awakening" className="relative min-h-screen flex items-center py-16" style={{ background: c.surface }}>
        <div className="w-full max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-8xl font-black leading-none tracking-widest text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]" style={{ fontFamily: B, filter: 'url(#ink-bleed)' }}>觉醒之阶</h1>
            <p className="text-sm text-gray-400 mt-4 tracking-[0.2em] uppercase" style={{ fontFamily: L }}>潜能评级: SSS</p>
          </div>
          <div className="relative px-4">
            <div className="absolute top-1/2 left-0 w-full h-1 -translate-y-1/2 hidden md:block" style={{ background: 'rgba(153,144,124,0.3)' }}/>
            <img src="/bilibili/m6_能力觉醒轴.png" alt="" className="relative z-10 w-full object-cover shadow-2xl"/>
          </div>
        </div>
      </section>

      {/* ════════════ S7: hunt 诛杀令 ════════════ */}
      <section id="cm-hunt" className="relative min-h-screen flex items-center overflow-hidden bg-black">
        <img src="/bilibili/m7_五行追杀令.png" alt="" className="absolute inset-0 w-full h-full object-cover object-right md:object-center opacity-60" style={{ mixBlendMode: 'screen' }}/>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, black, rgba(0,0,0,0.8), transparent)' }}/>
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-16 py-16 flex flex-col md:w-1/2 md:mr-auto">
          <div className="inline-block mb-4 px-3 py-1 rounded-sm border text-sm w-max text-white" style={{ background: 'rgba(127,29,29,0.8)', borderColor: 'rgba(185,28,28,0.5)', fontFamily: B, filter: 'url(#ink-bleed)' }}>威胁等级：寂灭</div>
          <h1 className="font-extrabold leading-none tracking-widest text-6xl md:text-8xl mb-8 text-white flex flex-col gap-2" style={{ fontFamily: B, filter: 'url(#ink-bleed)', textShadow: '0 0 30px rgba(255,255,255,0.15)' }}>
            <span>诛杀令</span>
            <span className="text-3xl text-gray-300 opacity-80">五行追缉通缉</span>
          </h1>
          <div className="space-y-6">
            {[
              { color: '#ef4444', name: '火之宗族', desc: '目标：全面追捕。斩草除根，重塑秩序。' },
              { color: '#3b82f6', name: '水之宗族', desc: '目标：暗中监视。预判因果波澜。' },
            ].map(clan => (
              <div key={clan.name} className="p-6 rounded-lg border backdrop-blur-md hover:border-red-500/50 transition-colors group" style={{ background: 'rgba(28,27,27,0.8)', borderColor: 'rgba(77,70,53,0.5)' }}>
                <h3 className="text-xl font-bold flex items-center gap-3 text-white group-hover:text-red-400 transition-colors" style={{ fontFamily: B, filter: 'url(#ink-bleed)' }}><span className="w-3 h-3 rounded-full" style={{ background: clan.color }}/>{clan.name}</h3>
                <p className="text-sm text-gray-300 mt-2">{clan.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ Footer ════════════ */}
      <footer className="py-16 flex flex-col items-center gap-4 text-center" style={{ background: 'linear-gradient(to top, #000, #0e0e0e)' }}>
        <h3 className="text-2xl font-bold mb-4 tracking-widest text-white" style={{ fontFamily: B, filter: 'url(#ink-bleed)' }}>辰墨卷宗</h3>
        <div className="flex gap-6 mb-8">
          {['天机秘卷','命运法则','联络尊者'].map(l => <a key={l} href="#" className="text-sm text-gray-400 hover:text-white transition-colors tracking-widest" style={{ fontFamily: B, filter: 'url(#ink-bleed)' }} onClick={e => e.preventDefault()}>{l}</a>)}
        </div>
        <p className="text-xs text-gray-500 opacity-60" style={{ fontFamily: L }}>© 辰墨卷宗 — 虚空纪元</p>
      </footer>
    </motion.div>
  );
}

export function AIGCCard({ onClick }: { onClick: () => void }) {
  return (
    <motion.div className="card-3d cursor-pointer group" whileHover={{ y: -6 }} transition={{ duration: 0.3 }} onClick={onClick}>
      <div className="card-3d-inner rounded-2xl overflow-hidden relative aspect-[4/5]" style={{ background: c.bg }}>
        <img src="/bilibili/screen-home.png" alt="" className="w-full h-full object-cover object-top opacity-70 group-hover:opacity-90 transition-opacity duration-500"/>
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${c.bg} 0%, transparent 45%)` }}/>
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ background: c.primary }}/>
          <span className="text-[9px] font-mono text-white/30 tracking-wider uppercase">Ink & Soul</span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <span className="text-[10px] font-mono text-white/40 tracking-wider uppercase">PROJECT 03</span>
          <h3 className="text-white font-bold text-lg mt-1 leading-tight">B站独家签约创作者</h3>
          <p className="text-white/40 text-xs mt-1 font-light">Ink & Soul · 墨刃纪 水墨武侠</p>
        </div>
      </div>
    </motion.div>
  );
}
