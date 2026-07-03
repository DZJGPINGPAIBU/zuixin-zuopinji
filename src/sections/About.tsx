import { useState } from 'react';
import { motion } from 'framer-motion';
import { personalInfo, stats, education, awards } from '@/data/resume';

const fadeUp = (d: number) => ({
  initial: { filter: 'blur(10px)', opacity: 0, y: 20 },
  whileInView: { filter: 'blur(0px)', opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: 'easeOut' as const, delay: d },
});

function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState('0');
  const [started, setStarted] = useState(false);

  return (
    <motion.span
      className="tabular-nums"
      onViewportEnter={() => {
        if (!started) {
          setStarted(true);
          const dur = 2000;
          const start = Date.now();
          const step = () => {
            const t = Math.min((Date.now() - start) / dur, 1);
            const e = 1 - Math.pow(1 - t, 3);
            setDisplay(String(Math.round(e * value)));
            if (t < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      }}
    >
      {display}{suffix}
    </motion.span>
  );
}

export default function About() {
  return (
    <section id="about" className="relative px-8 md:px-16 lg:px-20 pt-28 pb-10" style={{ background: 'var(--bg-primary)' }}>
      <div className="relative z-10 max-w-[1200px] mx-auto">
        <motion.p {...fadeUp(0.4)} className="text-xs font-body tracking-[0.2em] uppercase mb-6" style={{ color: 'var(--text-muted)' }}>
          {'// About'}
        </motion.p>
        <motion.h2 {...fadeUp(0.5)} className="font-heading italic text-6xl md:text-7xl lg:text-[6rem] leading-[0.9] tracking-[-3px] mb-16" style={{ color: 'var(--text-primary)' }}>
          About<br />me
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Left — personal info + bio */}
          <motion.div {...fadeUp(0.6)} className="col-span-1 lg:col-span-2 rounded-[1.25rem] p-6 md:p-8 border flex flex-col"
            style={{ background: 'rgba(255,255,255,0.6)', borderColor: 'var(--bg-warm)' }}>
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 rounded-[0.75rem] flex items-center justify-center shrink-0 overflow-hidden" style={{ background: 'var(--accent-light)' }}>
                <span className="font-heading italic text-2xl" style={{ color: 'var(--accent)' }}>H</span>
              </div>
              <div>
                <h3 className="font-heading italic text-2xl tracking-[-1px]" style={{ color: 'var(--text-primary)' }}>
                  {personalInfo.nameEn || 'Xuankun Huang'}
                </h3>
                <p className="mt-1 text-sm font-body font-light" style={{ color: 'var(--text-secondary)' }}>
                  {personalInfo.role} · {personalInfo.age}岁 · {personalInfo.city}
                </p>
                <p className="text-[10px] font-body mt-1" style={{ color: 'var(--text-muted)' }}>
                  {personalInfo.email} · {personalInfo.phone}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {stats.map((s) => (
                <div key={s.label} className="rounded-[0.75rem] p-3 text-center border" style={{ background: 'rgba(255,255,255,0.8)', borderColor: 'var(--bg-warm)' }}>
                  <div className="text-2xl font-heading italic" style={{ color: 'var(--accent)' }}>
                    <AnimatedCounter value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-[10px] font-body font-light mt-0.5" style={{ color: 'var(--text-muted)' }}>{s.label}</div>
                </div>
              ))}
            </div>

            <div className="text-sm lg:text-base font-body font-light leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              拥有5年品牌视觉设计经验，现任大族激光集团总部品牌部设计师。熟练运用PS、AI、Figma、即梦、Lovart、Nano Banana、ChatGPT Image2、Seedance等多款AI视觉模型，将AIGC深度应用于IP、VI、LOGO、创意视频等全流程设计，赋能部门设计效率提升50%以上。
            </div>
          </motion.div>

          {/* Right — education + awards */}
          <motion.div {...fadeUp(0.7)} className="rounded-[1.25rem] p-6 border flex flex-col"
            style={{ background: 'rgba(255,255,255,0.6)', borderColor: 'var(--bg-warm)' }}>
            <div className="w-11 h-11 rounded-[0.75rem] flex items-center justify-center shrink-0 mb-4" style={{ background: 'var(--accent-light)' }}>
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--accent)' }}>
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
            </div>
            <h3 className="font-heading italic text-2xl md:text-3xl tracking-[-1px] leading-none" style={{ color: 'var(--text-primary)' }}>
              {education.school}
            </h3>
            <p className="mt-2 text-sm font-body font-light" style={{ color: 'var(--text-secondary)' }}>{education.degree}</p>
            <p className="mt-1 text-[11px] font-body" style={{ color: 'var(--text-muted)' }}>{education.year}</p>

            <div className="mt-6 pt-4 border-t" style={{ borderColor: 'var(--bg-warm)' }}>
              <div className="flex flex-wrap gap-1.5">
                {awards.map((a) => (
                  <span key={a} className="rounded-full px-2.5 py-1 text-[10px] font-body whitespace-nowrap border"
                    style={{ background: 'var(--accent-light)', color: 'var(--accent)', borderColor: 'var(--bg-warm)' }}>
                    {a}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
