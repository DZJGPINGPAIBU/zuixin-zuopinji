import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ========== Data ========== */
const mascotScreens = Array.from({ length: 10 }, (_, i) => ({
  src: `/images/uiux/mascot_${String(i + 1).padStart(2, '0')}.jpg`,
  title: ['启动页 Splash', '登录页 Login', '首页 Home', 'IP档案 IP Info', '壁纸素材库 Wallpapers', '社区同人 Community', '周边商城 Store', '个人中心 Profile', '每日签到 Sign In', '空状态页 Empty State'][i],
}));

const financeScreens = Array.from({ length: 13 }, (_, i) => ({
  src: `/images/uiux/finance_${String(i + 1).padStart(2, '0')}.jpg`,
  title: ['总览 Dashboard', '资产 Portfolio', '交易 Transactions', '分析 Analytics', '监控 Watchlist', '数字资产 Digital Assets', '房地产 Real Estate', '财富目标 Wealth Goals', '税务中心 Tax Center', '顾问 Advisory', '保险库 Vault', '市场洞察 Market Intel', '设置 Settings'][i],
}));

/* ========== Vertical Scroll Gallery - natural page scroll ========== */
function VerticalScrollGallery({
  images,
  cols = 2,
}: {
  images: { src: string; title: string }[];
  cols?: number;
}) {
  return (
    <div className="relative">
      <div className={cols === 2 ? 'grid grid-cols-2 gap-4' : 'grid grid-cols-1 gap-4 max-w-[700px] mx-auto'}>
        {images.map((img, i) => (
          <motion.div
            key={img.src}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: i * 0.04, duration: 0.5 }}
          >
            <div className="cursor-target rounded-2xl overflow-hidden bg-gray-50 border border-black/5 hover:shadow-lg transition-shadow">
              <img src={img.src} alt={img.title} className="w-full h-auto object-cover" loading="lazy" />
            </div>
            <p className="text-[11px] text-black/30 mt-2 mb-1 font-mono tracking-wider text-center">{img.title}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ========== UI/UX Detail Modal ========== */
export function UIUXModal({ onClose }: { onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<'mascot' | 'finance'>('mascot');

  const tabs = [
    { id: 'mascot' as const, label: '吉祥物IP APP设计', num: '01' },
    { id: 'finance' as const, label: '金融管理系统', num: '02' },
  ];

  return (
    <motion.div className="fixed inset-0 z-[90] bg-white overflow-y-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* Close bar */}
      <div className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md border-b border-black/5">
        <span className="text-xs font-mono text-black/30 tracking-wider">PROJECT 05 · UI/UX</span>
        <button onClick={onClose} className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10 transition-colors">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 pb-20">
        {/* Header */}
        <motion.div className="py-8 text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h2 className="text-[clamp(28px,5vw,48px)] font-black tracking-tight">UI / UX 设计</h2>
          <p className="font-mono text-xs text-black/25 mt-2 tracking-[0.2em] uppercase">Interface & Experience Design</p>
        </motion.div>

        {/* Tabs */}
        <motion.div className="flex gap-1 mb-10 p-1 bg-black/[0.04] rounded-2xl max-w-[480px] mx-auto"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeTab === tab.id ? 'text-black' : 'text-black/30 hover:text-black/60'
              }`}
            >
              {activeTab === tab.id && (
                <motion.div className="absolute inset-0 bg-white rounded-xl shadow-sm border border-black/5"
                  layoutId="uiux-tab" transition={{ type: 'spring', damping: 25, stiffness: 300 }} />
              )}
              <span className="relative z-10 text-[10px] font-mono opacity-40 mr-2">{tab.num}</span>
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'mascot' && (
            <motion.div key="mascot" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }}>
              {/* Section header */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-black">大族激光吉祥物IP · 手机端APP</h3>
                <p className="text-sm text-black/40 mt-1 leading-relaxed max-w-[700px]">
                  为大族激光吉祥物"小族"打造的移动端APP全案设计，涵盖启动页、登录注册、首页、IP档案、壁纸素材库、社区同人、周边商城、个人中心、每日签到及空状态页等10个核心页面。
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {['Figma', '移动端UI', 'IP设计', '电商', '社区'].map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-md bg-black/[0.05] text-[11px] font-mono text-black/40">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              {/* Gallery with 2-col vertical layout */}
              <VerticalScrollGallery images={mascotScreens} cols={2} />
            </motion.div>
          )}

          {activeTab === 'finance' && (
            <motion.div key="finance" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }}>
              {/* Section header */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-black">金融管理系统 · B端后台界面</h3>
                <p className="text-sm text-black/40 mt-1 leading-relaxed max-w-[700px]">
                  面向金融投资管理场景设计的B端后台管理系统，采用深色模式降低长时间操作视觉疲劳。涵盖Dashboard总览、资产组合、交易记录、数据分析、监控列表、数字资产、房地产、财富目标、税务中心等13个核心功能模块。
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {['Figma', 'B端后台', 'Dark Mode', '数据可视化', 'Design System'].map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-md bg-black/[0.05] text-[11px] font-mono text-black/40">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              {/* Gallery single-col vertical */}
              <VerticalScrollGallery images={financeScreens} cols={1} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom stats */}
        <motion.div className="rounded-2xl bg-gray-50 border border-black/5 p-6 text-center mt-16" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <div className="flex justify-center gap-8 md:gap-12">
            <div><p className="text-2xl font-black text-black/80">23</p><p className="text-[10px] font-mono text-black/25 mt-1">总页面数</p></div>
            <div><p className="text-2xl font-black text-black/80">B+C</p><p className="text-[10px] font-mono text-black/25 mt-1">端全覆盖</p></div>
            <div><p className="text-2xl font-black text-black/80">Figma</p><p className="text-[10px] font-mono text-black/25 mt-1">主力工具</p></div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ========== Small Preview Card ========== */
export function UIUXCard({ onClick }: { onClick: () => void }) {
  return (
    <motion.div className="card-3d cursor-pointer group" whileHover={{ y: -6 }} transition={{ duration: 0.3 }} onClick={onClick}>
      <div className="card-3d-inner rounded-2xl overflow-hidden bg-white relative aspect-[4/5]">
        <img src="./images/uiux/mascot_01.jpg" alt="UI/UX设计" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <span className="text-[10px] font-mono text-white/50 tracking-wider uppercase">PROJECT 05</span>
          <h3 className="text-white font-bold text-lg mt-1 leading-tight">UI / UX 设计</h3>
          <p className="text-white/50 text-xs mt-1">吉祥物APP · 金融后台</p>
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
