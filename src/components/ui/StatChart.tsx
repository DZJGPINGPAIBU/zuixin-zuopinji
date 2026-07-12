import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

/* ===== Types ===== */
export interface MetricItem {
  value: string;   // e.g. "35%", "50+", "320+人次"
  label: string;   // short label, e.g. "品牌辨识度提升"
  desc: string;    // full description text shown below the chart
}

interface StatChartProps {
  metric: MetricItem;
  index: number;
}

/* ===== Helpers ===== */
/** Parse "35%" → { num:35, suffix:"%", isPercent:true }, "50+" → { num:50, suffix:"+", isPercent:false } */
function parseValue(raw: string): { num: number; suffix: string; isPercent: boolean } {
  const pct = raw.match(/^(\d+)\s*%$/);
  if (pct) return { num: Number(pct[1]), suffix: '%', isPercent: true };

  const plus = raw.match(/^(\d+)\s*\+/);
  if (plus) return { num: Number(plus[1]), suffix: '+', isPercent: false };

  const numOnly = raw.match(/^(\d+)/);
  if (numOnly) {
    const rest = raw.slice(numOnly[0].length);
    return { num: Number(numOnly[1]), suffix: rest || '', isPercent: false };
  }

  // Non-numeric value like "从0到1"
  return { num: 0, suffix: '', isPercent: false };
}

/* ===== Animated Counter ===== */
function AnimatedCounter({ target, suffix, trigger }: { target: number; suffix: string; trigger: boolean }) {
  const [count, setCount] = useState(0);
  const ref = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!trigger) return;
    const duration = 1200;
    const steps = 40;
    const increment = target / steps;
    let current = 0;
    let step = 0;

    ref.current = setInterval(() => {
      step++;
      current = Math.min(increment * step + (increment * 0.5 * Math.sin(step / steps * Math.PI)), target);
      if (step >= steps) {
        setCount(target);
        if (ref.current) clearInterval(ref.current);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => { if (ref.current) clearInterval(ref.current); };
  }, [target, trigger]);

  return (
    <span className="tabular-nums font-bold" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--accent)', lineHeight: 1 }}>
      {count}{suffix}
    </span>
  );
}

/* ===== MetricBar (percentage variant) ===== */
function MetricBar({ metric, inView }: { metric: MetricItem; inView: boolean }) {
  const { num } = parseValue(metric.value);

  return (
    <div className="space-y-2">
      {/* Bar track */}
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-warm)' }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'var(--accent)', width: '0%' }}
          animate={{ width: inView ? `${Math.min(num, 100)}%` : '0%' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        />
      </div>
      {/* Value */}
      <div className="flex items-baseline gap-1">
        <AnimatedCounter target={num} suffix="%" trigger={inView} />
      </div>
      {/* Label */}
      <p className="text-xs font-medium tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>
        {metric.label}
      </p>
    </div>
  );
}

/* ===== MetricNumber (count variant) ===== */
function MetricNumber({ metric, inView }: { metric: MetricItem; inView: boolean }) {
  const { num, suffix } = parseValue(metric.value);

  if (num === 0) {
    // Non-numeric value like "从0到1"
    return (
      <div className="space-y-1">
        <span className="font-bold" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', color: 'var(--accent)', lineHeight: 1.1 }}>
          {metric.value}
        </span>
        <p className="text-xs font-medium tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>
          {metric.label}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <AnimatedCounter target={num} suffix={suffix} trigger={inView} />
      <p className="text-xs font-medium tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>
        {metric.label}
      </p>
    </div>
  );
}

/* ===== StatChart Card (wrapper) ===== */
export default function StatChart({ metric, index }: StatChartProps) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isPct = metric.value.includes('%');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ filter: 'blur(8px)', opacity: 0, y: 16 }}
      whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.08 }}
      className="group rounded-2xl p-5 md:p-6 flex flex-col justify-between gap-4 transition-shadow duration-300 hover:shadow-lg"
      style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid var(--bg-warm)' }}
    >
      {/* Chart visual */}
      <div>
        {isPct ? (
          <MetricBar metric={metric} inView={inView} />
        ) : (
          <MetricNumber metric={metric} inView={inView} />
        )}
      </div>

      {/* Description text — the "why this number matters" */}
      <p className="text-sm leading-relaxed font-body" style={{ color: 'var(--text-secondary)' }}>
        {metric.desc}
      </p>
    </motion.div>
  );
}
