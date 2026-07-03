import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ecomImages = [
  { src: '/images/3c/ecom_01.jpg', title: '场景化主KV', desc: 'AeroSound Pro 真无线降噪耳机 · 场景化视觉主图' },
  { src: '/images/3c/ecom_02.jpg', title: '首屏产品展示', desc: '核心卖点总览 · -42dB ANC / HiFi Sound / 32H Battery' },
  { src: '/images/3c/ecom_03.jpg', title: '六大核心卖点', desc: '降噪·音质·延迟·防水·续航·舒适 · 全维度参数一览' },
  { src: '/images/3c/ecom_04.jpg', title: 'ANC主动降噪', desc: '深度降噪-42dB · 智能识别环境噪音 · 三阶段降噪输出' },
  { src: '/images/3c/ecom_05.jpg', title: '人体工学佩戴', desc: '4.2g超轻设计 · 仿生耳廓造型 · 全天佩戴无疲劳' },
  { src: '/images/3c/ecom_06.jpg', title: '技术爆炸图', desc: '13mm动圈单元 · 蓝牙5.3芯片 · 精密电路板拆解' },
  { src: '/images/3c/ecom_07.jpg', title: 'IPX5防水防尘', desc: '运动防汗 · 雨天无忧 · 日常清洁放心使用' },
  { src: '/images/3c/ecom_08.jpg', title: '32H超长续航', desc: '单次8小时 + 充电盒32小时 · 快充10分钟播放2小时' },
  { src: '/images/3c/ecom_09.jpg', title: '朋友圈分享', desc: '社交媒体传播图 · Pure Sound, Perfect Fit' },
  { src: '/images/3c/ecom_10.jpg', title: '品牌售后保障', desc: '100%正品 · 1年质保 · 30天无忧退换 · 专属客服支持' },
];

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

/* ========== 3C E-Commerce Detail Modal ========== */
export function Ecom3CModal({ onClose }: { onClose: () => void }) {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <motion.div className="fixed inset-0 z-[90] bg-white overflow-y-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* Close bar */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md border-b border-white/10"
        style={{ background: 'rgba(255,255,255,0.85)' }}>
        <span className="text-xs font-mono text-black/30 tracking-wider">PROJECT 06 · 3C电商</span>
        <button onClick={onClose} className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10 transition-colors">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* ===== Fullscreen Video Background (same as Mascot IP) ===== */}
      <div className="relative min-h-screen overflow-hidden">
        {/* Video Background */}
        <video
          src="/videos/airm.mp4"
          muted
          loop
          autoPlay
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.45)' }}
        />
        {/* Top gradient for readability */}
        <div className="absolute inset-x-0 top-0 h-[30%] bg-gradient-to-b from-black/40 to-transparent z-0" />

        {/* Center Content - floating over video */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6 pt-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <span className="text-[10px] font-mono text-white/30 tracking-[0.3em] uppercase">3C E-Commerce</span>
            <h2 className="text-[clamp(36px,7vw,72px)] font-black tracking-tight text-white mt-3">AeroSound Pro</h2>
            <p className="text-sm text-white/35 mt-4 max-w-[500px] mx-auto leading-relaxed">
              真无线降噪耳机电商详情页全案设计 · 主KV场景图 · 卖点可视化 · 技术爆炸图 · 品牌售后保障
            </p>
          </motion.div>

          {/* Animated down arrow */}
          <motion.div className="mt-10 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
            <span className="text-[10px] font-mono text-white/25 tracking-wider">向下滑动查看</span>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" className="text-white/40">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </motion.div>
          </motion.div>

          {/* Play button */}
          <motion.button
            className="absolute bottom-10 right-8 flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full border border-white/15 hover:bg-white/20 transition-colors"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={(e) => { e.stopPropagation(); setVideoOpen(true); }}
          >
            <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="black"><path d="M8 5v14l11-7z" /></svg>
            </span>
            <span className="text-xs font-bold text-white">播放完整视频</span>
          </motion.button>
        </div>

        {/* Bottom gradient - video fades to white */}
        <div className="absolute inset-x-0 bottom-0 h-[25%] z-0"
          style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.15) 30%, rgba(255,255,255,0.5) 60%, rgba(255,255,255,0.85) 85%, rgb(255,255,255) 100%)' }} />
      </div>

      {/* ===== Scrolling Content (white background) ===== */}
      <div className="relative z-20 bg-white">
        <div className="max-w-[900px] mx-auto px-6 pt-16 pb-20">
          {/* Section header */}
          <motion.div className="mb-10 text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <h3 className="text-2xl font-bold text-black">3C 电商视觉</h3>
            <p className="font-mono text-xs text-black/25 mt-2 tracking-[0.2em] uppercase">3C E-Commerce Visual Design</p>
            <p className="text-sm text-black/45 mt-4 max-w-[650px] mx-auto leading-relaxed">
              AeroSound Pro 真无线降噪耳机电商详情页全案设计，覆盖主KV场景图、首屏卖点展示、六大核心参数、功能详解页、技术爆炸图及品牌售后保障。从吸引点击到建立信任，完整电商转化链路视觉设计。
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {['电商详情页', '3C数码', '产品渲染', '卖点可视化', '品牌设计'].map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded-md bg-black/[0.05] text-[11px] font-mono text-black/40">{tag}</span>
              ))}
            </div>
          </motion.div>

          {/* Image gallery - natural vertical scroll */}
          <div className="space-y-8">
            {ecomImages.map((img, i) => (
              <motion.div
                key={img.src}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: 0.05, duration: 0.5 }}
              >
                <div className="rounded-2xl overflow-hidden bg-gray-50 border border-black/5 hover:shadow-lg transition-shadow">
                  <img src={img.src} alt={img.title} className="w-full h-auto object-cover" loading="lazy" />
                </div>
                <div className="flex items-center gap-3 mt-2 px-1">
                  <span className="text-[10px] font-mono text-black/20 tracking-wider">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-sm font-medium text-black/50">{img.title}</span>
                  <span className="text-[10px] text-black/25">·</span>
                  <span className="text-[11px] text-black/30">{img.desc}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom stats */}
          <motion.div className="rounded-2xl bg-gray-50 border border-black/5 p-6 text-center mt-16" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <div className="flex justify-center gap-8 md:gap-12">
              <div><p className="text-2xl font-black text-black/80">10</p><p className="text-[10px] font-mono text-black/25 mt-1">详情页屏数</p></div>
              <div><p className="text-2xl font-black text-black/80">TWS</p><p className="text-[10px] font-mono text-black/25 mt-1">产品类目</p></div>
              <div><p className="text-2xl font-black text-black/80">Full</p><p className="text-[10px] font-mono text-black/25 mt-1">全链路覆盖</p></div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Video Player */}
      <AnimatePresence>
        {videoOpen && <VideoPlayer onClose={() => setVideoOpen(false)} />}
      </AnimatePresence>
    </motion.div>
  );
}

/* ========== Small Preview Card ========== */
export function Ecom3CCard({ onClick }: { onClick: () => void }) {
  return (
    <motion.div className="card-3d cursor-pointer group" whileHover={{ y: -6 }} transition={{ duration: 0.3 }} onClick={onClick}>
      <div className="card-3d-inner rounded-2xl overflow-hidden bg-white relative aspect-[4/5]">
        <video src="/videos/airm_opt.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <span className="text-[10px] font-mono text-white/50 tracking-wider uppercase">PROJECT 06</span>
          <h3 className="text-white font-bold text-lg mt-1 leading-tight">3C 电商视觉</h3>
          <p className="text-white/50 text-xs mt-1">AeroSound Pro · 全屏视频 · 10屏详情</p>
        </div>
        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}
