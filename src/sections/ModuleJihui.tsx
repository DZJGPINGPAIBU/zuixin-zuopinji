import { motion } from 'framer-motion';

const JIHUI_URL = 'http://118.31.14.19/';

/* ========== Jihui Card -- live iframe preview of MH极绘 homepage + external link ========== */
export function JihuiCard({ onClick: _onClick }: { onClick: () => void }) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(JIHUI_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      className="card-3d cursor-target cursor-pointer group"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      onClick={handleClick}
    >
      <div
        className="card-3d-inner overflow-hidden bg-black relative aspect-[21/9] md:aspect-[21/9]"
        style={{ borderRadius: '0.5rem' }}
      >
        {/* Live dynamic preview — MH极绘 主页实时 iframe（ECS 同源 http，无混合内容/跨域限制） */}
        <iframe
          src={JIHUI_URL}
          title="MH极绘 主页实时预览"
          className="absolute inset-0 w-full h-full border-0 pointer-events-none"
          scrolling="no"
          loading="lazy"
          tabIndex={-1}
          aria-hidden="true"
        />

        {/* Bottom text overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5 pointer-events-none">
          <span className="text-[10px] font-mono text-white/40 tracking-wider uppercase">
            PROJECT 01
          </span>
          <h3 className="text-white font-bold text-lg mt-1 leading-tight">MH极绘</h3>
          <p className="text-white/50 text-xs mt-1">自研设计集成平台 · 在线体验</p>
        </div>

        {/* External link icon */}
        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}
