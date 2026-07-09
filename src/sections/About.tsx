import { useState } from 'react';
import { motion } from 'framer-motion';
import { personalInfo, stats, education, awards } from '@/data/resume';
import TiltedCard from '@/components/TiltedCard';

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
          <motion.div {...fadeUp(0.6)} className="cursor-target col-span-1 lg:col-span-2 rounded-[1.25rem] p-6 md:p-8 border flex flex-col"
            style={{ background: 'rgba(255,255,255,0.6)', borderColor: 'var(--bg-warm)' }}>
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 rounded-[0.75rem] flex items-center justify-center shrink-0 overflow-hidden" style={{ background: 'var(--accent-light)' }}>
                <span className="font-heading italic text-2xl" style={{ color: 'var(--accent)' }}>H</span>
              </div>
              <div>
                <h3 className="font-heading italic text-2xl tracking-[-1px]" style={{ color: 'var(--text-primary)' }}>
                  {personalInfo.nameEn || '黄选坤'}
                </h3>
                <p className="mt-1 text-sm font-body font-light flex items-center justify-between gap-4" style={{ color: 'var(--text-secondary)' }}>
                  <span>{personalInfo.role} · {personalInfo.age}岁 · {personalInfo.city}</span>
                  <span className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>{personalInfo.email} · {personalInfo.phone}</span>
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
              拥有5年品牌视觉与AI多媒体设计实战经验，现任大族激光集团总部AI多媒体设计师。深度运用即梦、Lovart、Nano Banana、Seedance等多款AI视觉模型，精通Claude Codex等前沿Agent工具，可独立覆盖从需求拆解到落地交付的全链路设计工作。主导集团30周年庆典、大族激光×飞书AI全域落地等多项重磅项目，10+场国际顶级大展全案负责人。
            </div>
          </motion.div>

          {/* Right — education card with TiltedCard */}
          <motion.div {...fadeUp(0.7)} className="cursor-target rounded-[1.25rem] p-6 border flex flex-col gap-5"
            style={{ background: 'rgba(255,255,255,0.6)', borderColor: 'var(--bg-warm)' }}>
            {/* TiltedCard 资料卡 */}
            <div className="w-full flex justify-center">
              <TiltedCard
                imageSrc="/canvas/profile-photo.jpg"
                altText="黄选坤 个人照片"
                captionText="广东白云学院 · 环境艺术设计"
                containerHeight="320px"
                containerWidth="100%"
                imageHeight="280px"
                imageWidth="280px"
                rotateAmplitude={12}
                scaleOnHover={1.08}
                showMobileWarning={false}
                showTooltip={true}
                displayOverlayContent={true}
                overlayContent={
                  <div className="absolute inset-0 flex flex-col justify-end p-5 bg-gradient-to-t from-black/50 to-transparent rounded-[15px]">
                    <p className="text-white/90 text-sm font-semibold tracking-wide">{personalInfo.name}</p>
                    <p className="text-white/70 text-xs mt-0.5">{personalInfo.role}</p>
                  </div>
                }
              />
            </div>

            {/* 资料信息卡 */}
            <div className="rounded-xl p-5 space-y-3" style={{ background: 'rgba(255,255,255,0.85)', border: '1px solid var(--bg-warm)' }}>
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>院校</span>
                <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{education.school}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>专业</span>
                <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{education.degree}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>就读时间</span>
                <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{education.year}</span>
              </div>
            </div>

            {/* 荣誉标签 */}
            <div className="pt-1">
              <div className="grid grid-cols-2 gap-1.5">
                {awards.map((a) => {
                  const isBilibili = a.includes('B站') || a.includes('全网粉丝');
                  return (
                    <span key={a}
                      className="rounded-full px-2.5 py-1 text-[10px] font-body text-center border col-span-2"
                      style={{
                        background: isBilibili ? 'var(--accent)' : 'var(--accent-light)',
                        color: isBilibili ? '#fff' : 'var(--accent)',
                        borderColor: isBilibili ? 'var(--accent)' : 'var(--bg-warm)',
                        fontWeight: isBilibili ? 700 : 400,
                        gridColumn: isBilibili ? 'span 2' : 'span 1',
                      }}>
                      {a}
                    </span>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
