import { useRef } from 'react';
import { motion } from 'framer-motion';

/* ══════════════════════════════════════════════════════════════
   斩龙 · 其他作品 — Dark Shuimo Aesthetic
   ══════════════════════════════════════════════════════════════ */

const c = {
  bg: '#0a0a0a', bgDeep: '#0e0e0e', surface: '#1c1b1b',
  surfaceLow: '#1a1a1a', surfaceHigh: '#292a2a',
  primary: '#e3e2e2', secondary: '#e9c349',
  tertiary: '#00daf3', muted: '#8e9192',
  surfaceVariant: '#343535', outline: '#444748',
};

const B = "'STKaiti', 'Kaiti SC', 'Songti SC', 'Ma Shan Zheng', 'Zhi Mang Xing', 'Noto Serif SC', serif";
const L = "'JetBrains Mono', monospace";
const M = "'Manrope', sans-serif";

export function ZhanglongSections() {
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  const enterFullscreen = () => {
    const v = heroVideoRef.current;
    if (!v) return;
    v.muted = false;
    v.play().catch(() => {});
    const onFsChange = () => {
      if (!document.fullscreenElement && !(document as any).webkitFullscreenElement) {
        v.muted = true;
        document.removeEventListener('fullscreenchange', onFsChange);
        document.removeEventListener('webkitfullscreenchange', onFsChange);
      }
    };
    document.addEventListener('fullscreenchange', onFsChange);
    document.addEventListener('webkitfullscreenchange', onFsChange);
    if (v.requestFullscreen) v.requestFullscreen().catch(() => {});
    else if ((v as any).webkitEnterFullscreen) (v as any).webkitEnterFullscreen();
  };

  return (
    <>
      {/* ════════════ 斩龙 HERO ════════════ */}
      <section id="zl-hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <video
          ref={heroVideoRef}
          src="./bilibili/zhanglong/hero.mov"
          autoPlay muted loop playsInline controls
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.45)' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #0a0a0a, transparent 30%, rgba(10,10,10,0.4) 100%)' }} />

        {/* Centered text */}
        <div className="relative z-10 text-center px-6">
          <h1
            className="text-[clamp(48px,10vw,120px)] font-bold tracking-[0.15em] leading-tight mb-4"
            style={{
              fontFamily: B,
              color: c.primary,
              textShadow: '0 0 30px rgba(233,195,73,0.4)',
            }}
          >
            斩龙
          </h1>

<p
            className="text-base md:text-lg max-w-xl mx-auto leading-relaxed"
            style={{ fontFamily: M, color: c.muted }}
          >
            墨色翻涌，龙影惊天。在这片被遗忘的虚无之中，唯有剑刃的光芒能撕裂无尽的长夜。
          </p>
          <div className="pt-8">
            <svg className="mx-auto w-10 h-10 animate-bounce" viewBox="0 0 24 24" fill="currentColor" style={{ color: c.secondary, opacity: 0.5 }}>
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        </div>

        {/* Fullscreen button — bottom right */}
        <button
          onClick={enterFullscreen}
          className="absolute bottom-8 right-8 z-20 flex items-center gap-2 px-4 py-2.5 rounded-full backdrop-blur-md border border-white/15 hover:border-white/40 transition-all duration-300 group cursor-pointer"
          style={{ background: 'rgba(0,0,0,0.5)' }}
        >
          <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
          </svg>
          <span className="text-xs text-white/70 group-hover:text-white tracking-wider" style={{ fontFamily: L }}>全屏观看</span>
        </button>

      </section>

      {/* ════════════ SCENE 1: 龙之觉醒 ════════════ */}
      <section id="zl-awakening" className="py-24 md:py-32 px-4 md:px-16 relative">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-16 flex items-center gap-4">
            <span className="text-xl font-semibold" style={{ fontFamily: L, color: c.secondary }}>01</span>
            <div className="h-px w-12" style={{ background: 'rgba(233,195,73,0.5)' }} />
            <h3 className="text-[clamp(28px,5vw,48px)] font-semibold" style={{ fontFamily: B, color: c.primary }}>龙之觉醒</h3>
          </div>
          <div className="relative p-2" style={{ background: 'rgba(28,27,27,0.3)', backdropFilter: 'blur(8px)' }}>
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l" style={{ borderColor: c.secondary }} />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r" style={{ borderColor: c.secondary }} />
            <img
              src="./bilibili/zhanglong/2.jpg"
              alt="Dragon Awakening"
              className="w-full h-auto block opacity-90 hover:opacity-100 transition-opacity duration-700 border"
              style={{ borderColor: 'rgba(233,195,73,0.3)' }}
            />
          </div>
          <div className="mt-12 max-w-2xl mx-auto text-center">
            <p className="text-lg leading-relaxed" style={{ fontFamily: M, color: c.muted }}>
              云海翻腾，巨渊深处传来震颤。那不是雷鸣，而是古老生灵呼吸的余响。当金色的瞳孔在黑暗中点亮，整个世界的法则都在这一刻被重写。
            </p>
          </div>
        </div>
      </section>

      {/* ════════════ SCENE 2: 咫尺死斗 ════════════ */}
      <section id="zl-combat" className="py-24 md:py-32 px-4 md:px-16 relative" style={{ background: 'rgba(13,14,15,0.5)' }}>
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'rgba(255,255,255,0.05)' }} />
        <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: 'rgba(255,255,255,0.05)' }} />
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-16 flex items-center justify-end gap-4">
            <h3 className="text-[clamp(28px,5vw,48px)] font-semibold" style={{ fontFamily: B, color: c.primary }}>咫尺死斗</h3>
            <div className="h-px w-12" style={{ background: 'rgba(233,195,73,0.5)' }} />
            <span className="text-xl font-semibold" style={{ fontFamily: L, color: c.secondary }}>02</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-5 space-y-8 order-2 md:order-1">
              <p className="text-lg leading-relaxed border-l-2 pl-6 py-2" style={{ fontFamily: M, color: c.muted, borderColor: c.tertiary }}>
                没有任何退路。视线交汇的瞬间，杀意如实质般切割着空气。刀锋出鞘的声音，是这首挽歌的第一个音符。
              </p>
              <ul className="space-y-4 text-sm" style={{ fontFamily: L, color: c.primary }}>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-lg" style={{ color: c.tertiary }}>swords</span>
                  极意流·瞬杀
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-lg" style={{ color: c.tertiary }}>visibility</span>
                  心眼·无畏
                </li>
              </ul>
            </div>
            <div className="md:col-span-7 order-1 md:order-2">
              <div className="relative p-2" style={{ background: 'rgba(28,27,27,0.3)', backdropFilter: 'blur(8px)' }}>
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l" style={{ borderColor: c.secondary }} />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r" style={{ borderColor: c.secondary }} />
                <img
                  src="./bilibili/zhanglong/3.png"
                  alt="Close Combat Intensity"
                  className="w-full h-auto block grayscale hover:grayscale-0 transition-all duration-1000 border"
                  style={{ borderColor: 'rgba(233,195,73,0.3)' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ SCENE 3: 青墨刃 ════════════ */}
      <section id="zl-blade" className="py-24 md:py-32 px-4 md:px-16 relative">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-16 flex items-center gap-4">
            <span className="text-xl font-semibold" style={{ fontFamily: L, color: c.secondary }}>03</span>
            <div className="h-px w-12" style={{ background: 'rgba(233,195,73,0.5)' }} />
            <h3 className="text-[clamp(28px,5vw,48px)] font-semibold" style={{ fontFamily: B, color: c.primary }}>青墨刃</h3>
          </div>
          <div className="relative group">
            <div className="absolute inset-0 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(to right, rgba(0,218,243,0.1), transparent)' }} />
            <div className="relative p-2 z-10" style={{ background: 'rgba(28,27,27,0.3)', backdropFilter: 'blur(8px)' }}>
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l" style={{ borderColor: c.secondary }} />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r" style={{ borderColor: c.secondary }} />
              <img
                src="./bilibili/zhanglong/4.png"
                alt="The Ink Blade"
                className="w-full h-auto block border"
                style={{ borderColor: 'rgba(233,195,73,0.3)' }}
              />
            </div>
          </div>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: 'water_drop', title: '墨意', desc: '刀身淬以深渊之墨，挥舞时如书法家泼墨挥毫，虚实难测。' },
              { icon: 'bolt', title: '流光', desc: '刀镡铭刻上古符文，灵力注入时泛起幽蓝青光，可斩断虚妄。' },
              { icon: 'storm', title: '断空', desc: '重剑无锋，大巧不工。舍弃繁复技巧，以绝对的力量压制万物。' },
            ].map((item) => (
              <div
                key={item.title}
                className="p-6 border hover:border-cyan-500/50 transition-colors cursor-default"
                style={{ background: 'rgba(41,42,42,0.4)', borderColor: 'rgba(68,71,72,0.3)' }}
              >
                <h4 className="text-xl font-semibold mb-4 flex items-center gap-2" style={{ fontFamily: B, color: c.primary }}>
                  <span className="material-symbols-outlined" style={{ color: c.tertiary }}>{item.icon}</span>
                  {item.title}
                </h4>
                <p className="text-base leading-relaxed" style={{ fontFamily: M, color: c.muted }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ FINAL SCENE: 止水 ════════════ */}
      <section id="zl-zen" className="py-24 md:py-32 px-4 md:px-16 relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto text-center relative z-10">
          <div className="mb-12">
            <h3
              className="text-[clamp(60px,10vw,120px)] font-bold tracking-widest"
              style={{ fontFamily: B, color: 'rgba(227,226,226,0.2)' }}
            >
              止水
            </h3>
          </div>
          <div className="w-full max-w-4xl mx-auto relative p-2" style={{ background: 'rgba(28,27,27,0.3)', backdropFilter: 'blur(8px)' }}>
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l" style={{ borderColor: c.secondary }} />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r" style={{ borderColor: c.secondary }} />
            <img
              src="./bilibili/zhanglong/5.png"
              alt="Zen Reflection"
              className="w-full h-auto block opacity-80 border"
              style={{ borderColor: 'rgba(233,195,73,0.3)' }}
            />
          </div>
          <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: '0 0 50px rgba(0,218,243,0.1)' }} />
          <div className="mt-16">
            <p
              className="text-[clamp(32px,5vw,56px)] font-semibold tracking-[0.5em]"
              style={{ fontFamily: B, color: c.secondary }}
            >
              斩业非斩人
            </p>
            <p className="mt-4 text-base leading-relaxed" style={{ fontFamily: M, color: 'rgba(196,199,199,0.6)' }}>
              一滴墨落水，平息了所有的狂暴与杀戮。最终的胜利，是内心的平静。
            </p>
          </div>
        </div>
      </section>

      {/* ════════════ TRANSITION: 佛刹 ════════════ */}
      <section id="zl-fosha" className="relative h-screen flex items-center justify-center overflow-hidden" style={{ background: c.bg }}>
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(233,195,73,0.15) 0%, transparent 70%)' }} />
        <div className="relative z-10 text-center">
          <motion.h2
            className="text-[clamp(64px,12vw,160px)] font-bold tracking-[0.3em] leading-none"
            style={{ fontFamily: B, color: c.secondary, textShadow: '0 0 60px rgba(233,195,73,0.5)' }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            佛刹
          </motion.h2>
          <motion.div
            className="mt-8 h-px w-24 mx-auto"
            style={{ background: 'linear-gradient(to right, transparent, #e9c349, transparent)' }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        </div>
      </section>

      {/* ════════════ FULLSCREEN VIDEO: 佛刹视频 ════════════ */}
      <section id="zl-fosha-video" className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        <video
          src="./bilibili/zhanglong/fosha.mp4"
          autoPlay muted loop playsInline controls
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.55)' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #0a0a0a, transparent 20%, rgba(10,10,10,0.3) 80%)' }} />
        <div className="absolute bottom-8 right-8 z-20 flex items-center gap-2 px-4 py-2.5 rounded-full backdrop-blur-md border border-white/15 hover:border-white/40 transition-all duration-300 group cursor-pointer"
          style={{ background: 'rgba(0,0,0,0.5)' }}
          onClick={() => {
            const v = document.querySelector<HTMLVideoElement>('#zl-fosha-video video');
            if (!v) return;
            v.muted = false; v.play().catch(() => {});
            const onFsChange = () => {
              if (!document.fullscreenElement && !(document as any).webkitFullscreenElement) {
                v.muted = true;
                document.removeEventListener('fullscreenchange', onFsChange);
                document.removeEventListener('webkitfullscreenchange', onFsChange);
              }
            };
            document.addEventListener('fullscreenchange', onFsChange);
            document.addEventListener('webkitfullscreenchange', onFsChange);
            if (v.requestFullscreen) v.requestFullscreen().catch(() => {});
            else if ((v as any).webkitEnterFullscreen) (v as any).webkitEnterFullscreen();
          }}>
          <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
          </svg>
          <span className="text-xs text-white/70 group-hover:text-white tracking-wider" style={{ fontFamily: L }}>全屏观看</span>
        </div>
      </section>
    </>
  );
}
