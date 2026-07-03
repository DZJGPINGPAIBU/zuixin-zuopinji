import { useState } from 'react';
import { motion } from 'framer-motion';
import { workData } from '@/data/resume';

const fadeUp = (d: number) => ({
  initial: { filter: 'blur(10px)', opacity: 0, y: 20 },
  whileInView: { filter: 'blur(0px)', opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: 'easeOut' as const, delay: d },
});

export default function Experience() {
  const [hoveredIdx, setHoveredIdx] = useState(-1);

  return (
    <section id="experience" className="relative px-8 md:px-16 lg:px-20 pt-28 pb-10" style={{ background: 'var(--bg-primary)' }}>
      <div className="relative z-10 max-w-[1200px] mx-auto">
        <motion.p {...fadeUp(0.4)} className="text-xs font-body tracking-[0.2em] uppercase mb-6" style={{ color: 'var(--text-muted)' }}>
          {'// Experience'}
        </motion.p>
        <motion.h2 {...fadeUp(0.5)} className="font-heading italic text-6xl md:text-7xl lg:text-[6rem] leading-[0.9] tracking-[-3px] mb-16" style={{ color: 'var(--text-primary)' }}>
          Work<br />experience
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {workData.map((item, idx) => {
            const isHovered = hoveredIdx === idx;
            const isCurrent = idx === 0;
            const covers = ['/images/大族科技.jpg', '/images/奋达科技.jpg', '/images/乔邦教育.jpg'];
            return (
              <motion.div
                key={item.company}
                {...fadeUp(0.6 + idx * 0.15)}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(-1)}
                className="rounded-[1.25rem] border flex flex-col cursor-pointer transition-all relative overflow-hidden min-h-[360px]"
                style={{ borderColor: 'var(--bg-warm)' }}
              >
                {/* Cover image — full opacity by default */}
                <img
                  src={covers[idx]}
                  alt={item.company}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                  style={{ opacity: isHovered ? 0.15 : 1 }}
                />

                {/* Warm overlay — fades in on hover */}
                <div
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{
                    background: 'rgba(250,248,245,0.88)',
                    opacity: isHovered ? 1 : 0,
                  }}
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col flex-1 p-6">
                  {/* Header — always visible */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="w-11 h-11 rounded-[0.75rem] flex items-center justify-center shrink-0 transition-colors duration-500"
                      style={{
                        background: isHovered
                          ? (isCurrent ? 'var(--accent-light)' : 'var(--bg-secondary)')
                          : 'rgba(255,255,255,0.2)',
                        backdropFilter: isHovered ? 'none' : 'blur(4px)',
                      }}>
                      <span className="font-heading italic text-lg transition-colors duration-500"
                        style={{
                          color: isHovered
                            ? (isCurrent ? 'var(--accent)' : 'var(--text-muted)')
                            : 'white',
                        }}>
                        {isCurrent ? '★' : '○'}
                      </span>
                    </div>
                    <span className="rounded-full px-2.5 py-1 text-[10px] font-body whitespace-nowrap border transition-colors duration-500"
                      style={{
                        background: isHovered ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.25)',
                        borderColor: 'var(--bg-warm)',
                        color: isHovered ? 'var(--text-muted)' : 'white',
                      }}>
                      {item.year}
                    </span>
                  </div>

                  <div className="flex-1" />

                  {/* Company & Role — always visible */}
                  <div className="mt-6">
                    <h3 className="font-bold text-xl md:text-2xl leading-tight whitespace-nowrap transition-colors duration-500"
                      style={{ color: isHovered ? 'var(--text-primary)' : 'white' }}>
                      {item.company}
                    </h3>
                    <p className="mt-2 text-sm font-body font-light transition-colors duration-500"
                      style={{ color: isHovered ? 'var(--text-secondary)' : 'rgba(255,255,255,0.8)' }}>
                      {item.role}
                    </p>
                  </div>

                  {/* Expandable highlights — only on hover */}
                  <motion.div
                    initial={false}
                    animate={{
                      opacity: isHovered ? 1 : 0,
                      height: isHovered ? 'auto' : 0,
                    }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 pt-3 border-t" style={{ borderColor: 'var(--bg-warm)' }}>
                      {item.highlights.map((h, i) => (
                        <p key={i} className="text-xs font-body font-light leading-relaxed mb-2" style={{ color: 'var(--text-secondary)' }}>
                          · {h}
                        </p>
                      ))}
                      {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {item.tags.map((t) => (
                            <span key={t} className="rounded-full px-2 py-0.5 text-[9px] font-body border"
                              style={{ background: 'var(--accent-light)', color: 'var(--accent)', borderColor: 'var(--bg-warm)' }}>
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
