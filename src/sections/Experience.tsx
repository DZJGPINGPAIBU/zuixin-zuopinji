import { motion } from 'framer-motion';
import { workData } from '@/data/resume';

const fadeUp = (d: number) => ({
  initial: { filter: 'blur(10px)', opacity: 0, y: 20 },
  whileInView: { filter: 'blur(0px)', opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: 'easeOut' as const, delay: d },
});

const covers = ['/images/大族科技.jpg', '/images/奋达科技.jpg', '/images/乔邦教育.jpg'];

/** Bold key metrics in highlight text: percentages, numbers with +, large figures */
function boldMetrics(text: string): React.ReactNode {
  // Match patterns like: 35%, 50+套, 200+件, 320+人次, 98%, 3天, 8小时, 70%, 300人天
  const re = /(\d+[+套件人次天小时人天个家场个月年万亿百千]*(?:%以上)?)/g;
  const parts: React.ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = re.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    parts.push(<strong key={match.index} style={{ color: 'var(--accent)', fontWeight: 700 }}>{match[0]}</strong>);
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.length > 0 ? <>{parts}</> : text;
}

export default function Experience() {
  return (
    <section id="experience" className="relative px-8 md:px-16 lg:px-20 pt-28 pb-10" style={{ background: 'var(--bg-primary)' }}>
      <div className="relative z-10 max-w-[1200px] mx-auto">
        <motion.p {...fadeUp(0.4)} className="text-xs font-body tracking-[0.2em] uppercase mb-6" style={{ color: 'var(--text-muted)' }}>
          {'// Experience'}
        </motion.p>
        <motion.h2 {...fadeUp(0.5)} className="font-heading italic text-6xl md:text-7xl lg:text-[6rem] leading-[0.9] tracking-[-3px] mb-16" style={{ color: 'var(--text-primary)' }}>
          Work<br />experience
        </motion.h2>

        <div className="flex flex-col gap-12 md:gap-20">
          {workData.map((item, idx) => {
            const isOdd = idx % 2 === 1;

            return (
              <motion.div
                key={item.company}
                {...fadeUp(0.6 + idx * 0.15)}
                className={`flex flex-col md:flex-row gap-6 md:gap-10 items-stretch ${
                  isOdd ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Cover image side */}
                <div className="md:w-5/12 shrink-0">
                  <div className="rounded-[1.25rem] overflow-hidden border h-full min-h-[280px]" style={{ borderColor: 'var(--bg-warm)' }}>
                    <img
                      src={covers[idx]}
                      alt={item.company}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Content side */}
                <div className={`md:w-7/12 flex flex-col justify-center ${
                  isOdd ? 'md:text-left md:items-start' : 'md:text-left md:items-start'
                }`}>
                  {/* Year badge */}
                  <span className="inline-block rounded-full px-3.5 py-1.5 text-xs font-medium border mb-4"
                    style={{ background: 'rgba(255,255,255,0.8)', borderColor: 'var(--bg-warm)', color: 'var(--text-muted)' }}>
                    {item.year}
                  </span>

                  {/* Company + Role */}
                  <h3 className="font-heading italic text-3xl md:text-4xl lg:text-5xl tracking-[-1px] leading-tight" style={{ color: 'var(--text-primary)' }}>
                    {item.company}
                  </h3>
                  <p className="mt-2.5 text-base md:text-lg font-bold" style={{ color: 'var(--accent)' }}>
                    {item.role}
                  </p>

                  {/* Highlights — all visible as bullet points */}
                  <ul className="mt-5 space-y-3">
                    {item.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-3 text-base font-body leading-relaxed"
                        style={{ color: 'var(--text-secondary)' }}>
                        <span className="mt-[0.4em] w-2 h-2 rounded-full shrink-0" style={{ background: 'var(--accent)' }} />
                        <span style={h.includes('获评优秀教师') ? { fontWeight: 700, color: 'var(--accent)' } : undefined}>
                          {boldMetrics(h)}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Tags */}
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-5">
                      {item.tags.map((t) => (
                        <span key={t} className="rounded-full px-3 py-1 text-xs font-medium border"
                          style={{ background: 'var(--accent-light)', color: 'var(--accent)', borderColor: 'var(--bg-warm)' }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
