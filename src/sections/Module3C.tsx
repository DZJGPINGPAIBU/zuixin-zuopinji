import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ===== Video Fullscreen Player ===== */
function VideoPlayer({ onClose }: { onClose: () => void }) {
  return (
    <motion.div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-8 cursor-pointer"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div className="w-full max-w-[1200px] aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl"
        initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }}
        transition={{ type: 'spring', damping: 25 }} onClick={(e) => e.stopPropagation()}>
        <video src="/videos/airm.mp4" controls playsInline className="w-full h-full object-contain" />
      </motion.div>
      <button className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
        onClick={(e) => { e.stopPropagation(); onClose(); }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
      </button>
      <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/30 text-xs font-mono">点击任意区域关闭</p>
    </motion.div>
  );
}

/* ===== Material Icon helper ===== */
function Icon({ name, size = 'text-2xl', filled = false }: { name: string; size?: string; filled?: boolean }) {
  return (
    <span className={`material-symbols-outlined ${size}`} style={{ fontVariationSettings: `'FILL' ${filled ? 1 : 0}` }}>
      {name}
    </span>
  );
}

/* ===== Sonic Ethereal Design Tokens ===== */
const C = {
  primary: '#0050cb', primaryContainer: '#0066ff', primaryFixed: '#dae1ff',
  onPrimary: '#ffffff', background: '#f9f9fb', onBackground: '#1a1c1d',
  surface: '#f9f9fb', onSurface: '#1a1c1d', onSurfaceVariant: '#424656',
  surfaceContainerLow: '#f3f3f5', surfaceContainerLowest: '#ffffff',
  surfaceContainer: '#eeeef0', surfaceVariant: '#e2e2e4', outlineVariant: '#c2c6d8',
  secondary: '#00677f', secondaryContainer: '#00ccf9', secondaryFixed: '#b7eaff',
  secondaryFixedDim: '#4cd6ff',
};

const glassPanel: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.6)', backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.4)',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.04)',
};

/* ========== 3C E-Commerce Detail Modal ========== */
const c3NavItems = [
  { id: 'c3-features', label: '核心卖点', num: '01' },
  { id: 'c3-lifestyle', label: '场景体验', num: '02' },
  { id: 'c3-specs', label: '技术规格', num: '03' },
  { id: 'c3-engineering', label: '声学工程', num: '04' },
  { id: 'c3-support', label: '售后保障', num: '05' },
];

export function Ecom3CModal({ onClose }: { onClose: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [videoOpen, setVideoOpen] = useState(false);
  const [c3Active, setC3Active] = useState('c3-features');

  const handleC3Scroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const viewHeight = container.clientHeight;
    let current = c3NavItems[0].id;
    for (const item of c3NavItems) {
      const el = document.getElementById(item.id);
      if (!el) continue;
      if (el.getBoundingClientRect().top < viewHeight * 0.4) current = item.id;
    }
    setC3Active(current);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener('scroll', handleC3Scroll, { passive: true });
    handleC3Scroll();
    return () => container.removeEventListener('scroll', handleC3Scroll);
  }, [handleC3Scroll]);

  const scrollToC3 = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 z-[90] overflow-y-auto" style={{ background: C.background }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

      {/* Back + Close buttons */}
      <button onClick={onClose} className="fixed top-4 left-4 z-50 flex items-center gap-1.5 px-3 py-2 rounded-full bg-black/10 backdrop-blur-md hover:bg-black/20 transition-colors cursor-pointer">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
        <span className="text-xs font-medium text-white hidden sm:inline">返回主页</span>
      </button>
      <button onClick={onClose} className="fixed top-4 right-4 z-50 w-10 h-10 rounded-full bg-black/10 backdrop-blur-md flex items-center justify-center hover:bg-black/20 transition-colors">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      {/* TopNavBar — scroll-to-section navigation */}
      <div className="fixed top-0 pt-4 z-50 flex justify-center px-4 pointer-events-none w-full">
        <div className="flex items-center gap-1 px-3 py-2 rounded-full pointer-events-auto"
          style={{
            background: 'rgba(255,255,255,0.65)',
            backdropFilter: 'blur(24px) saturate(180%)',
            WebkitBackdropFilter: 'blur(24px) saturate(180%)',
            border: '1px solid rgba(0,80,203,0.08)',
            boxShadow: '0 8px 32px rgba(0,53,197,0.04), 0 2px 8px rgba(0,0,0,0.02)',
          }}>
          {c3NavItems.map((item) => {
            const isActive = item.id === c3Active;
            return (
              <button key={item.id} onClick={() => scrollToC3(item.id)}
                className="relative flex items-center gap-1.5 px-3 py-2 rounded-full transition-colors duration-300 cursor-pointer">
                {isActive && (
                  <motion.div className="absolute inset-0 rounded-full z-0"
                    layoutId="c3-active-pill"
                    style={{ background: `linear-gradient(135deg, ${C.primary}, ${C.primaryContainer})` }}
                    transition={{ type: 'spring', stiffness: 380, damping: 28 }} />
                )}
                <span className="relative z-10 text-[11px] font-mono font-bold tracking-tight"
                  style={{ color: isActive ? '#fff' : `${C.primary}59` }}>{item.num}</span>
                <span className="relative z-10 text-[11px] font-medium tracking-wide whitespace-nowrap hidden sm:inline"
                  style={{ color: isActive ? '#fff' : `${C.primary}80` }}>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ===== Hero Video (unchanged) ===== */}
      <div className="relative min-h-screen overflow-hidden">
        <video src="/videos/airm.mp4" muted loop autoPlay playsInline className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.45)' }} />
        <div className="absolute inset-x-0 top-0 h-[30%] bg-gradient-to-b from-black/40 to-transparent z-0" />
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6 pt-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <span className="text-[10px] font-mono text-white/30 tracking-[0.3em] uppercase">3C E-Commerce</span>
            <h2 className="text-[clamp(36px,7vw,72px)] font-black tracking-tight text-white mt-3">AeroSound Pro</h2>
            <p className="text-sm text-white/35 mt-4 max-w-[500px] mx-auto leading-relaxed">
              True Wireless Noise-Cancelling Earbuds · Full E-Commerce Detail Page Design · Key Visual Scenes · Selling Point Visualization · Technical Exploded View · Brand After-Sales
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
          <motion.button className="absolute bottom-10 right-8 flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full border border-white/15 hover:bg-white/20 transition-colors"
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

      {/* ===== 1:1 Content Below Hero ===== */}
      <div style={{ fontFamily: "'Inter', sans-serif", color: C.onBackground, background: C.background }}>

        {/* ═══════════ PAGE 1: OFFICIAL STORE ═══════════ */}

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center pt-24 pb-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[100px]"
              style={{ background: `${C.primary}0d` }} />
          </div>
          <div className="max-w-7xl mx-auto px-5 md:px-16 relative z-10 w-full flex flex-col items-center text-center">
            <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-sm"
              style={{ borderColor: `${C.primary}33`, background: `${C.primary}0d` }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: C.primary }} />
              <span className="text-xs font-semibold tracking-wider uppercase" style={{ fontFamily: "'Inter', sans-serif", color: C.primary }}>AeroSound Pro</span>
            </div>
            <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(40px, 7vw, 72px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', color: C.onSurface, maxWidth: '900px', marginBottom: '1.5rem' }}>
              Visionary Sound.<br />Absolute Clarity.
            </h1>
            <p className="max-w-2xl mb-12 text-lg" style={{ color: C.onSurfaceVariant }}>
              Experience technological magic with the next generation of high-fidelity audio. Engineered for the precise, designed for the ethereal.
            </p>
            <div className="flex gap-4 mb-20">
              <button className="px-8 py-4 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300"
                style={{ fontFamily: "'Inter', sans-serif", background: C.primary, color: C.onPrimary, boxShadow: `0 0 20px ${C.primary}4d` }}>Pre-order Now</button>
              <button className="px-8 py-4 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 hover:bg-white/80"
                style={{ ...glassPanel, color: C.primary, fontFamily: "'Inter', sans-serif" }}>Watch Film</button>
            </div>
            <div className="w-full max-w-5xl relative" style={{ animation: 'float 6s ease-in-out infinite' }}>
              <img alt="AeroSound Pro earbuds" className="w-full h-auto object-contain drop-shadow-2xl" style={{ mixBlendMode: 'multiply' }}
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBu7d7MgtHe3OP9TS1hMskQZ19cf73VpGpuiskmZuc-B_0q7fhNCQPhK3s3frDXw6YOazn1vNC3l1zyQRKBk0ja0-XqT-b46aoJHVt7EfSJ3kR9yck7GY5M-Vm-jMja0Wp5UtL_8ZOCOSpjXUYfk9H6go4fQ8WJoGjf76TdncJYGp0MjLkDQxtCv8vf7VGB8cka5CUzJ_yQj6ZXoyhsaFYPVY6e-iNEUmmVKtMMtY2f-HErxNAS2SVBJMrdVZm_XDeACCb4Nv-1x-0I" />
            </div>
          </div>
        </section>

        {/* Core Selling Points (Bento Grid) */}
        <section id="c3-features" className="py-20" style={{ background: C.surface }}>
          <div className="max-w-7xl mx-auto px-5 md:px-16">
            <div className="text-center mb-20">
              <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '40px', fontWeight: 600, lineHeight: 1.2, letterSpacing: '-0.01em', color: C.onSurface, marginBottom: '1rem' }}>Engineered Perfection</h2>
              <p className="max-w-2xl mx-auto" style={{ color: C.onSurfaceVariant }}>Every component, meticulously crafted to deliver an unparalleled acoustic experience.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]">
              {/* Main Feature Card */}
              <div className="rounded-xl p-8 col-span-1 md:col-span-2 relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500 flex flex-col justify-between" style={glassPanel}>
                <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at top right, ${C.primary}, transparent)` }} />
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                    style={{ background: `radial-gradient(circle, ${C.primary}1a 0%, transparent 70%)` }}>
                    <Icon name="graphic_eq" size="text-3xl" />
                  </div>
                  <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '32px', fontWeight: 600, color: C.onSurface, marginBottom: '0.5rem' }}>Adaptive ANC</h3>
                  <p className="max-w-md" style={{ color: C.onSurfaceVariant }}>Silence the world with -42dB of intelligent noise cancellation that adapts to your environment in real-time.</p>
                </div>
                <div className="relative z-10 flex gap-3 mt-6">
                  {['-42dB Reduction', 'Real-time AI'].map((t) => (
                    <span key={t} className="px-4 py-1.5 rounded-full border text-xs font-semibold tracking-wider uppercase bg-white/50 backdrop-blur-sm"
                      style={{ fontFamily: "'Inter', sans-serif", borderColor: `${C.primary}33`, color: C.primary }}>{t}</span>
                  ))}
                </div>
              </div>
              {/* Vertical Image Card */}
              <div className="rounded-xl overflow-hidden relative col-span-1 row-span-2 group">
                <img alt="Close-up of AeroSound Pro earbud internals" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDi4Y7vnbaQ9OybLXFBB0j0mio8vYzKQWSGl-Ac2Z6c9RLnr4azBITLAN7XSEVIpNUPq0SvvyBHoYlwZEcxGqFTVfHXhPnh5-w3PebOqJ3k6BWgIEsdWDU2B8j-_piznkRbS49q6Fxh4ZUQVzwawzmnq30E_SxGj7bXsPpl9RBzTw6nUZs05vZhKSa9nIzNNnT6PLvxoYxzFTkhR8Kh87yb9xg8Z5Eo2colqYNJMVNa-VBbXB9pjGhd8pvLqJJRjAFfCQEt4s4LGNZJ" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <h3 className="mb-2 text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '32px', fontWeight: 600 }}>Hi-Fi Architecture</h3>
                  <p className="text-white/80">Custom 11mm dynamic drivers deliver studio-grade clarity across every frequency.</p>
                </div>
              </div>
              {/* Feature Card 2 */}
              <div className="rounded-xl p-8 relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500" style={glassPanel}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                  style={{ background: `radial-gradient(circle, ${C.primary}1a 0%, transparent 70%)` }}>
                  <Icon name="speed" size="text-3xl" />
                </div>
                <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '32px', fontWeight: 600, color: C.onSurface, marginBottom: '0.5rem' }}>Ultra-Low Latency</h3>
                <p style={{ color: C.onSurfaceVariant }}>45ms gaming mode ensures flawless audio-visual synchronization.</p>
              </div>
              {/* Feature Card 3 */}
              <div className="rounded-xl p-8 relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500" style={glassPanel}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                  style={{ background: `radial-gradient(circle, ${C.primary}1a 0%, transparent 70%)` }}>
                  <Icon name="battery_charging_full" size="text-3xl" />
                </div>
                <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '32px', fontWeight: 600, color: C.onSurface, marginBottom: '0.5rem' }}>Endless Energy</h3>
                <p style={{ color: C.onSurfaceVariant }}>36 hours of total playtime with rapid wireless charging capabilities.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Lifestyle Section */}
        <section id="c3-lifestyle" className="py-20 relative overflow-hidden" style={{ background: C.background }}>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"
            style={{ background: `${C.secondaryFixed}33` }} />
          <div className="max-w-7xl mx-auto px-5 md:px-16">
            <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="w-full md:w-1/2 relative">
                <div className="aspect-[4/5] rounded-xl overflow-hidden relative shadow-2xl">
                  <img alt="Professional wearing AeroSound Pro" className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoobK29ifNwmXzeL2iV6n4HSt7IZ52ANckudS1Cwk8-qVY-96VsgVwxd-s0a8iCFZJ0oVXel2Wy9-tJNjO_2g-M19NjYAr6OiNsl4wgtQqblxfYnLv8VQQS1w7Q7I83daEW3aKBt4IQ97C6A1mxhQTpNueITd0xLHNuivzvOC7gzKGG_sjvp7nZ_07vHS7F5ZbA_0bujEJ9SHwFiUA4rMEMOzgzxJwLENLj5uBv9ixjNhkwct3ZghVu-cbO4aLirETkNFSp62i8i8M" />
                  <div className="absolute inset-0 border border-white/20 rounded-xl pointer-events-none" style={{ mixBlendMode: 'overlay' }} />
                </div>
                <div className="absolute -bottom-10 -right-10 p-6 rounded-xl max-w-xs" style={{ ...glassPanel, animation: 'float 6s ease-in-out infinite', animationDelay: '1s' }}>
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: C.primary }} />
                    <span className="text-xs font-semibold tracking-wider uppercase" style={{ fontFamily: "'Inter', sans-serif", color: C.onSurface }}>Spatial Audio Active</span>
                  </div>
                  <div className="h-1 w-full rounded-full overflow-hidden" style={{ background: C.surfaceVariant }}>
                    <div className="h-full w-3/4" style={{ background: C.primary }} />
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(40px,7vw,72px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', color: C.onSurface, marginBottom: '1.5rem' }}>Designed for the Movement.</h2>
                <p className="mb-8 text-lg" style={{ color: C.onSurfaceVariant }}>
                  Whether you're navigating urban landscapes or diving deep into focus work, AeroSound Pro adapts. The ergonomic acoustic architecture provides a weightless fit, while intuitive touch controls put mastery of your environment at your fingertips.
                </p>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <div className="mt-1 w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: `${C.primary}1a` }}>
                      <Icon name="water_drop" size="text-sm" /></div>
                    <div><h4 className="font-semibold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: C.onSurface }}>IPX5 Resistance</h4>
                      <p className="text-sm" style={{ color: C.onSurfaceVariant }}>Built to withstand intense workouts and sudden downpours.</p></div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="mt-1 w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: `${C.primary}1a` }}>
                      <Icon name="touch_app" size="text-sm" /></div>
                    <div><h4 className="font-semibold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: C.onSurface }}>Force Sensor Control</h4>
                      <p className="text-sm" style={{ color: C.onSurfaceVariant }}>Precise control over media and calls with simple gestures.</p></div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ PAGE 2: TECHNICAL SPECS & SUPPORT ═══════════ */}

        {/* Hero Product Overview */}
        <section id="c3-specs" className="max-w-7xl mx-auto px-5 md:px-16 pt-32 pb-20">
          <div className="text-center mb-16">
            <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(32px,7vw,72px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', color: C.onSurface, marginBottom: '1.5rem' }}>Precision Engineering.</h1>
            <p className="max-w-2xl mx-auto" style={{ color: C.onSurfaceVariant }}>Discover the meticulous specifications and comprehensive support that define the AeroSound Pro experience.</p>
          </div>
          <div className="relative rounded-xl overflow-hidden aspect-[16/9] md:aspect-[21/9]" style={{ ...glassPanel, boxShadow: `0 0 20px ${C.primary}26` }}>
            <img alt="AeroSound Pro Overview" className="w-full h-full object-cover opacity-90"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtBYuDnWQ3fbXNWi0UPMmDbPoAaOy74ewfs-1R97wiyrXlELjWdB8GVfZ8wfrYfnHeewl82MN2bSI-eQqK6N6RYt0JSDJX_wr_lfNQbZNZrtIOi6GHWarXowiVhUFdlvldtiUTTZQLyNRMuJdSxO4TMPs_k6qjBNQbG_J3256rnl1lJ-ge81rPuMMZZhkZ5YUx3WQPu1jKVAmJnIF_pYyTxVUhn_ipuuBNqaEwcH-ZiWfSHTlTkeQW2oAb86AU-VqmXetKsjRtPFB3Ig4" />
          </div>
        </section>

        {/* Technical Specifications Grid */}
        <section className="max-w-7xl mx-auto px-5 md:px-16 pb-20">
          <h2 className="text-left mb-8" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(32px,5vw,40px)', fontWeight: 600, lineHeight: 1.2, letterSpacing: '-0.01em', color: C.onSurface }}>
            Technical <span style={{ color: C.primary }}>Specifications.</span></h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: 'bluetooth', label: 'Connectivity', val: 'Bluetooth 5.3' },
              { icon: 'battery_charging_full', label: 'Battery Life', val: 'Up to 40 Hours' },
              { icon: 'noise_control_on', label: 'ANC Depth', val: '-42dB Active' },
              { icon: 'weight', label: 'Weight', val: '254 Grams' },
            ].map((spec) => (
              <div key={spec.label} className="rounded-lg p-4 border hover:-translate-y-1 transition-transform duration-300"
                style={{ background: C.surfaceContainerLowest, borderColor: C.outlineVariant }}>
                <Icon name={spec.icon} filled />
                <div className="text-xs font-semibold tracking-wider uppercase mt-2 mb-1" style={{ fontFamily: "'Inter', sans-serif", color: C.onSurfaceVariant }}>{spec.label}</div>
                <div className="font-semibold" style={{ color: C.onSurface }}>{spec.val}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Service & Commitment */}
        <section id="c3-support" className="py-20" style={{ background: C.surfaceContainerLow }}>
          <div className="max-w-7xl mx-auto px-5 md:px-16">
            <div className="text-center mb-16">
              <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(32px,5vw,40px)', fontWeight: 600, letterSpacing: '-0.01em', color: C.onSurface, marginBottom: '1rem' }}>Service &amp; Commitment.</h2>
              <p style={{ color: C.onSurfaceVariant }}>Uncompromising quality, backed by dedicated support.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {[
                { icon: 'verified', title: '2-Year Warranty', desc: 'Comprehensive coverage against manufacturing defects.' },
                { icon: 'replay', title: '30-Day Returns', desc: 'Experience AeroSound risk-free. Easy returns if you aren\'t satisfied.' },
                { icon: 'support_agent', title: '24/7 Support', desc: 'Our audio experts are always available to assist you.' },
              ].map((svc) => (
                <div key={svc.title} className="p-8 rounded-xl text-center hover:shadow-lg transition-shadow duration-300" style={glassPanel}>
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: `${C.primaryFixed}33` }}>
                    <Icon name={svc.icon} size="text-3xl" /></div>
                  <h3 className="font-semibold mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: C.onSurface }}>{svc.title}</h3>
                  <p className="text-sm" style={{ color: C.onSurfaceVariant }}>{svc.desc}</p>
                </div>
              ))}
            </div>
            <div className="text-center">
              <button className="px-10 py-4 rounded-full text-xs font-semibold tracking-wider uppercase transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                style={{ fontFamily: "'Inter', sans-serif", background: C.primary, color: C.onPrimary }}>Buy Now</button>
            </div>
          </div>
        </section>

        {/* ═══════════ PAGE 3: TECHNOLOGY FEATURES ═══════════ */}

        {/* Hero — Pure Acoustic Engineering */}
        <section id="c3-engineering" className="px-5 md:px-16 max-w-7xl mx-auto text-center pt-20 pb-20">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-8"
            style={{ background: `${C.primary}1a`, boxShadow: `0 0 30px ${C.primary}26` }}>
            <Icon name="memory" size="text-3xl" /></div>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(40px,7vw,72px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', color: C.onSurface, maxWidth: '800px', margin: '0 auto 1.5rem' }}>
            Pure Acoustic<br /><span style={{ background: `linear-gradient(to right, ${C.primary}, ${C.secondaryContainer})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Engineering.</span></h1>
          <p className="max-w-2xl mx-auto" style={{ color: C.onSurfaceVariant }}>An uncompromising approach to sound architecture. Every component meticulously crafted to deliver an ethereal audio experience that defies expectations.</p>
        </section>

        {/* Technical Exploded View */}
        <section className="px-5 md:px-16 max-w-7xl mx-auto pb-20">
          <div className="rounded-xl p-8 md:p-16 relative group transition-transform duration-500 hover:-translate-y-2" style={glassPanel}>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl rounded-xl pointer-events-none"
              style={{ background: `${C.primary}0d` }} />
            <div className="text-center mb-16 relative z-10">
              <span className="inline-block px-4 py-1.5 rounded-full border text-xs font-semibold tracking-wider uppercase mb-4"
                style={{ fontFamily: "'Inter', sans-serif", borderColor: `${C.primary}33`, color: C.primary, background: C.surfaceContainerLowest }}>Acoustic Architecture</span>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(32px,5vw,40px)', fontWeight: 600, color: C.onSurface }}>Precision in Every Layer.</h2>
            </div>
            <div className="relative w-full aspect-[1.78] rounded-lg overflow-hidden z-10 flex items-center justify-center"
              style={{ background: C.surfaceContainerLowest }}>
              <img alt="Exploded view" className="w-full h-full object-contain"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7LK325dTIX3mIFTYOEVK5vbyIGpz21L6sjRgGjvzNxuTZYO2ycXRwSEU6YBPZLNrD_c_7q-c9uglECBnQSOiZ9PDsXh63mwnrFXn2H9Dnq6hQWoZFTlyePM86ju7lZFVJc5hLyOQF74bK8suV3QQysvO0IbmouVJKCDNqx_QsMEFHoHWgZ_upi53pH7bUWCCmNyph3sEiA0kydTfcbwjb2dDSGBJRBRSA2qm_V1mg_MXfagrkcW7o2v5fkcHZW28fJCRHC5NeVntz" />
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[30%] left-[20%] flex flex-col items-center animate-pulse">
                  <div className="w-3 h-3 rounded-full" style={{ background: C.primary, boxShadow: `0 0 15px ${C.primary}cc` }} />
                  <div className="h-16 w-[1px] mt-2" style={{ background: `${C.primary}66` }} /></div>
                <div className="absolute top-[60%] right-[30%] flex flex-col items-center animate-pulse" style={{ animationDelay: '1s' }}>
                  <div className="w-3 h-3 rounded-full" style={{ background: C.secondaryContainer, boxShadow: `0 0 15px ${C.secondaryContainer}cc` }} />
                  <div className="h-12 w-[1px] mt-2" style={{ background: `${C.secondaryContainer}66` }} /></div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 relative z-10">
              {[
                { title: 'Beryllium Driver', desc: 'Ultra-rigid 11mm diaphragm for lightning-fast transient response and zero distortion.' },
                { title: 'Acoustic Mesh', desc: 'Laser-etched titanium grille regulates internal air pressure for expansive soundstaging.' },
                { title: 'H1 Chipset', desc: 'Custom silicon processing 200,000 operations per second for real-time audio tuning.' },
              ].map((item) => (
                <div key={item.title}>
                  <h3 className="text-xs font-semibold tracking-wider uppercase mb-2" style={{ fontFamily: "'Inter', sans-serif", color: C.onSurface }}>{item.title}</h3>
                  <p className="text-sm" style={{ color: C.onSurfaceVariant }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Active Noise Cancellation */}
        <section className="px-5 md:px-16 max-w-7xl mx-auto pb-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-5 order-2 md:order-1 pr-0 md:pr-12">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold tracking-wider uppercase mb-8"
                style={{ fontFamily: "'Inter', sans-serif", borderColor: `${C.primary}33`, color: C.primary, background: C.surfaceContainerLowest }}>
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: C.primary }} />-42dB Depth</span>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(32px,5vw,40px)', fontWeight: 600, letterSpacing: '-0.01em', color: C.onSurface, marginBottom: '1.5rem' }}>Absolute Silence.</h2>
              <p className="mb-10" style={{ color: C.onSurfaceVariant }}>Advanced adaptive algorithms continuously monitor your environment, generating precise anti-noise frequencies to cancel out the chaos of the world.</p>
              <div className="space-y-6">
                {[
                  { icon: 'graphic_eq', title: 'Adaptive Algorithm', desc: 'Adjusts cancellation curves 400 times per second.' },
                  { icon: 'air', title: 'Transparency Mode', desc: 'Let the outside world in with zero latency pass-through.' },
                ].map((feat) => (
                  <div key={feat.title} className="flex items-start gap-4">
                    <div className="mt-1 w-8 h-8 rounded-full flex items-center justify-center border"
                      style={{ background: `${C.primary}0d`, borderColor: `${C.primary}1a` }}><Icon name={feat.icon} size="text-sm" /></div>
                    <div><h4 className="text-xs font-semibold tracking-wider uppercase" style={{ fontFamily: "'Inter', sans-serif", color: C.onSurface }}>{feat.title}</h4>
                      <p className="text-sm mt-1" style={{ color: C.onSurfaceVariant }}>{feat.desc}</p></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:col-span-7 order-1 md:order-2 flex justify-center md:justify-end mb-12 md:mb-0 relative">
              <div className="w-full max-w-[400px] aspect-[0.56] rounded-2xl overflow-hidden relative group" style={glassPanel}>
                <img alt="ANC" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAx9MfEeo_FizhrE5Y5vhyihV9eC0hY13Ch5DZM9hqqDGbHOSy522vQeCEJEZUmEodoaZhEzCFblYBpeOzuXn-xNx3z5hEa9e7aJjqpkFj7rW1lPVbCWPKoZiNqmT43IZJuy7eI3FosdeIpZppDPK-v_Ctm0GVeSLGyJ5gI0by8ADbSH3UxwOJtTIQMp-AkeLIBoFJaOBA-O19exBNC6aivxy8rDtw315u1pP7WD6MeouYBOJ7ecKkDJ3-I9a5IXBs7Ca4mrCCvtAkY" />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${C.background}cc, transparent)` }} /></div>
            </div>
          </div>
        </section>

        {/* Water Resistance */}
        <section className="px-5 md:px-16 max-w-7xl mx-auto pb-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 flex justify-center md:justify-start mb-12 md:mb-0 relative">
              <div className="w-full max-w-[400px] aspect-[0.56] rounded-2xl overflow-hidden relative group" style={glassPanel}>
                <img alt="Water resistance" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6ndDOyCB2plUDUXRTh0k4h0F_TsPEB2YwZ2owu82LrRKqiWbxUc40djCNn9cSBv09jPdtpN4Mb55QO45CKmHR8474QwXKtWlgdGDiD-Jfcvdw9uFb90J9b5pyFtvaSDLlDrouenA-aLxzmgG4rlwlY2G4GYn5XEkjGQlr9cWPFNgL8xpThR082dvEq6hokcAPbfIyIQDffJVFlA1ZySveyvB2g6ke2sk6R8-AMokA8e9HDjXiQ-qOgytm4-h6MNR_gDGm5mIOVVA7" />
                <div className="absolute inset-0 mix-blend-overlay" style={{ background: `linear-gradient(to bottom, ${C.secondaryFixed}33, transparent)` }} /></div>
            </div>
            <div className="md:col-span-5 pl-0 md:pl-12">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold tracking-wider uppercase mb-8"
                style={{ fontFamily: "'Inter', sans-serif", borderColor: `${C.secondaryContainer}4d`, color: C.secondary, background: `${C.secondaryFixedDim}1a` }}>
                <Icon name="water_drop" size="text-sm" />IPX5 Rated</span>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(32px,5vw,40px)', fontWeight: 600, letterSpacing: '-0.01em', color: C.onSurface, marginBottom: '1.5rem' }}>Defy the Elements.</h2>
              <p className="mb-10" style={{ color: C.onSurfaceVariant }}>Engineered with acoustic mesh and a reinforced polymer shell, AeroSound repels water and sweat effortlessly.</p>
              <button className="px-8 py-4 rounded-full text-xs font-semibold tracking-wider uppercase border transition-all duration-300 hover:bg-opacity-10"
                style={{ ...glassPanel, color: C.primary, fontFamily: "'Inter', sans-serif", borderColor: `${C.primary}33` }}>Explore Durability Specs</button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full py-12 px-5 md:px-16 border-t mt-20"
          style={{ background: C.surface, borderColor: C.outlineVariant }}>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-xl" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, color: C.onSurface }}>AeroSound</div>
            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
              {['Privacy Policy', 'Terms of Service', 'Warranty', 'Sustainability'].map((link) => (
                <a key={link} className="text-sm hover:opacity-70 transition-colors cursor-pointer" style={{ color: C.onSurfaceVariant }}>{link}</a>
              ))}
            </div>
            <div className="text-sm opacity-80" style={{ color: C.onSurfaceVariant }}>&copy; 2026 AeroSound Technologies. All rights reserved.</div>
          </div>
        </footer>
      </div>

      <AnimatePresence>{videoOpen && <VideoPlayer onClose={() => setVideoOpen(false)} />}</AnimatePresence>
      <style>{`@keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-20px); } 100% { transform: translateY(0px); } }`}</style>
    </motion.div>
  );
}

/* ========== Small Preview Card (unchanged) ========== */
export function Ecom3CCard({ onClick }: { onClick: () => void }) {
  return (
    <motion.div className="card-3d cursor-pointer group" whileHover={{ y: -6 }} transition={{ duration: 0.3 }} onClick={onClick}>
      <div className="card-3d-inner rounded-2xl overflow-hidden bg-white relative aspect-[21/9]">
        <video src="/videos/airm_opt.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <span className="text-[10px] font-mono text-white/50 tracking-wider uppercase">PROJECT 05</span>
          <h3 className="text-white font-bold text-lg mt-1 leading-tight">3C 电商视觉</h3>
          <p className="text-white/50 text-xs mt-1">AeroSound Pro · 全屏视频 · 10屏详情</p>
        </div>
        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17" /></svg>
        </div>
      </div>
    </motion.div>
  );
}
