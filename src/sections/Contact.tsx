import { useState } from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '@/data/resume';

/* ===== fadeUp helper ===== */
const fadeUp = (d: number) => ({
  initial: { filter: 'blur(10px)', opacity: 0, y: 20 },
  whileInView: { filter: 'blur(0px)', opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: 'easeOut' as const, delay: d },
});

/* ===== TiltCard — 3D hover effect ===== */
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
  };
  const handleLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg)';
  };
  return (
    <div className={`tilt-card ${className}`} onMouseMove={handleMouse} onMouseLeave={handleLeave}>
      {children}
    </div>
  );
}

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const contactCards = [
    { label: 'Email', value: personalInfo.email, copiable: true, svg: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 7l-10 7L2 7" />
      </svg>
    )},
    { label: 'Phone', value: personalInfo.phone, copiable: true, svg: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    )},
    { label: 'Location', value: personalInfo.city, copiable: false, svg: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    )},
  ];

  return (
    <section id="contact" className="relative w-full px-8 md:px-16 lg:px-20 flex items-center justify-center py-24" style={{ background: 'var(--bg-primary)' }}>
      <div className="relative z-10 w-full max-w-5xl">
        {/* Section header */}
        <motion.div className="text-center mb-12" {...fadeUp(0.3)}>
          <motion.p {...fadeUp(0.2)} className="text-xs font-body tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--text-muted)' }}>
            {'// Contact'}
          </motion.p>
          <motion.h2 {...fadeUp(0.4)} className="font-heading italic text-black text-7xl md:text-8xl lg:text-[8rem] leading-[0.85] tracking-[-4px]">
            Get in touch
          </motion.h2>
        </motion.div>

        {/* Subtitle */}
        <motion.p {...fadeUp(0.6)} className="text-sm md:text-base max-w-3xl mx-auto text-center mb-14" style={{ color: 'var(--text-secondary)' }}>
          目前在职大族激光，对品牌视觉、IP设计、AIGC创意方向的机会保持开放。期待与有趣的项目相遇。
          <br />
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Currently at Han's Laser, open to opportunities in brand visual, IP design &amp; AIGC creative. Looking forward to interesting projects.</span>
        </motion.p>

        {/* Contact cards */}
        <motion.div {...fadeUp(0.8)} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {contactCards.map((item, idx) => (
            <TiltCard key={item.label}>
              <motion.div
                {...fadeUp(0.9 + idx * 0.1)}
                onClick={() => { if (item.copiable) handleCopy(item.value); }}
                className={`cursor-target p-10 rounded-[1.5rem] text-center border transition-colors ${
                  item.copiable ? 'cursor-pointer hover:bg-[#FDF0EC]' : ''
                }`}
                style={{ background: 'rgba(255, 255, 255, 0.6)', borderColor: 'var(--bg-warm)' }}
              >
                <div className="flex justify-center mb-5 opacity-70" style={{ color: 'var(--accent)' }}>
                  {item.svg}
                </div>
                <div className="text-2xl font-heading italic tracking-[-1px]" style={{ color: 'var(--text-primary)' }}>
                  {item.label}
                </div>
                <div className="text-sm mt-3 font-body font-light" style={{ color: 'var(--text-secondary)' }}>
                  {item.value}
                </div>
              </motion.div>
            </TiltCard>
          ))}
        </motion.div>

        {/* PDF Download — full width */}
        <motion.div className="flex justify-center mt-10" {...fadeUp(1.0)}>
          <a
            href="./resume.pdf"
            download="黄选坤-AI多媒体设计师-简历.pdf"
            className="flex items-center justify-center gap-4 px-10 py-4 rounded-2xl text-white transition-colors hover:opacity-90 w-full max-w-md"
            style={{ background: 'var(--accent)' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
            </svg>
            <div>
              <p className="text-[11px] text-white/60 font-mono uppercase tracking-wider">下载简历</p>
              <p className="text-base font-bold">PDF 简历</p>
            </div>
          </a>
        </motion.div>
      </div>

      {/* Copy toast */}
      {copied && (
        <motion.div
          className="fixed bottom-10 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/80 backdrop-blur-md text-white text-xs font-body z-[100]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          已复制到剪贴板
        </motion.div>
      )}
    </section>
  );
}
