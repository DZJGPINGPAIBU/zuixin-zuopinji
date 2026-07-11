import { motion } from 'framer-motion';

const YITAI_URL = 'http://118.31.14.19/yitai';

/* ========== Canvas Card — yitai 平台主页实时预览 + 外链跳转（模态内容已整体移除） ========== */
export function CanvasCard({ onClick: _onClick }: { onClick: () => void }) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(YITAI_URL, '_blank', 'noopener,noreferrer');
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
        {/* Live dynamic preview — yitai 平台主页实时 iframe（与作品集 ECS 同源 http，无混合内容/跨域限制） */}
        <iframe
          src={YITAI_URL}
          title="无限画布 · yitai 平台主页实时预览"
          className="absolute inset-0 w-full h-full border-0 pointer-events-none"
          scrolling="no"
          loading="lazy"
          tabIndex={-1}
          aria-hidden="true"
        />

        {/* Text overlay — 仅底部渐变，保证白字标签在浅色实时预览上可读 */}
        <div className="absolute bottom-0 left-0 right-0 p-5 pointer-events-none bg-gradient-to-t from-black/75 via-black/35 to-transparent">
          <span className="text-[10px] font-mono text-white/60 tracking-wider uppercase">PROJECT 02</span>
          <h3 className="text-white font-bold text-lg mt-1 leading-tight">无限画布</h3>
          <p className="text-white/60 text-xs mt-1">AetherWorkbench · 在线体验</p>
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
