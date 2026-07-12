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
                <p className="mt-1 text-sm font-body font-light flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4" style={{ color: 'var(--text-secondary)' }}>
                  <span>{personalInfo.role} · {personalInfo.age}岁 · {personalInfo.city}</span>
                  <span className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>{personalInfo.email} · {personalInfo.phone} · 期望薪资 20-30K</span>
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

                        <ul className="space-y-3.5 text-sm lg:text-[15px] font-body font-light leading-relaxed mt-4" style={{ color: 'var(--text-secondary)' }}>
              <li className="flex items-start gap-3">
                <span className="shrink-0 mt-1 w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }}></span>
                <span><strong style={{ color: 'var(--text-primary)' }}>5年品牌视觉与AI多媒体设计经验</strong>，从品牌设计师到总部AI品牌视觉设计，覆盖平面视觉全链路</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="shrink-0 mt-1 w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }}></span>
                <span>深度运用<strong style={{ color: 'var(--text-primary)' }}>即梦、Lovart、Nano Banana、Seedance</strong>等多款AI视觉模型，熟练驾驭<strong style={{ color: 'var(--text-primary)' }}>PS、AI、Figma</strong>等专业设计工具</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="shrink-0 mt-1 w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }}></span>
                <span>接入<strong style={{ color: 'var(--text-primary)' }}>Claude Code/Codex</strong>等前沿Agent工具，<strong style={{ color: 'var(--text-primary)' }}>自研集团内部AI设计平台</strong>，沉淀20+套可复用设计资产模板，削减70%重复工作量，部门设计产能提升50%以上</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="shrink-0 mt-1 w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }}></span>
                <span>主导<strong style={{ color: 'var(--text-primary)' }}>集团30周年庆典</strong>总视觉设计（覆盖全国20+子公司、30+应用场景）、<strong style={{ color: 'var(--text-primary)' }}>大族激光×飞书AI全域落地</strong>视觉规范（输出配套物料50+套，覆盖12+核心事业部）</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="shrink-0 mt-1 w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }}></span>
                <span>全权负责<strong style={{ color: 'var(--text-primary)' }}>深圳光博会、上海工博会、德国慕尼黑工博会、新加坡工博会等10+场国际顶级大展</strong>，单场输出标准化物料200+件，落地准确率99%</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="shrink-0 mt-1 w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }}></span>
                <span>主导集团吉祥物<strong style={{ color: 'var(--text-primary)' }}>"小族"IP全案设计</strong>，拓展8大应用场景、50+衍生设计版本，成功申请3项国家版权与外观专利，物料累计应用超2万份</span>
              </li>
            </ul>
          </motion.div>

          {/* Right — education card with TiltedCard */}
          <motion.div {...fadeUp(0.7)} className="cursor-target rounded-[1.25rem] p-6 border flex flex-col gap-5"
            style={{ background: 'rgba(255,255,255,0.6)', borderColor: 'var(--bg-warm)' }}>
            {/* TiltedCard 资料卡 */}
            <div className="w-full flex justify-center">
              <TiltedCard
                imageSrc="./canvas/profile-photo.jpg"
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
                displayOverlayContent={false}
                objectPosition="50% 20%"
              />
            </div>

            {/* 姓名 + 职位（照片下方） */}
            <div className="text-center -mt-2">
              <p className="text-base font-heading italic font-semibold" style={{ color: 'var(--text-primary)' }}>{personalInfo.name}</p>
              <p className="text-xs font-body mt-0.5" style={{ color: 'var(--accent)' }}>{personalInfo.role}</p>
            </div>

            {/* 资料信息卡 */}
            <div className="rounded-xl p-5 space-y-3 mt-4" style={{ background: 'rgba(255,255,255,0.85)', border: '1px solid var(--bg-warm)' }}>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
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
