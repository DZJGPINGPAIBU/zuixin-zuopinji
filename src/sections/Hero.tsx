import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
/* ===== ScrollProgress ===== */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return <motion.div className="scroll-progress" style={{ scaleX }} />;
}

/* ===== SplineViewer wrapper — lazy load spline runtime ===== */
function SplineViewer({ scene }: { scene: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<HTMLElement | null>(null);
  const [ready, setReady] = useState(false);

  // Lazy load spline-viewer.js only when component enters viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setReady(true);
        obs.disconnect();
      }
    }, { rootMargin: '200px' });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Load spline runtime and create viewer
  useEffect(() => {
    if (!ready || !containerRef.current || viewerRef.current) return;

    const loadSpline = async () => {
      // Dynamically inject spline-viewer script if not already loaded
      if (!customElements.get('spline-viewer')) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement('script');
          script.type = 'module';
          script.src = './spline-viewer.js';
          script.onload = () => resolve();
          script.onerror = () => reject(new Error('Failed to load spline-viewer'));
          document.head.appendChild(script);
        });
        // Wait for custom element to be defined
        await customElements.whenDefined('spline-viewer');
      }

      const viewer = document.createElement('spline-viewer') as HTMLElement;
      viewer.setAttribute('url', scene);
      viewer.setAttribute('events-target', 'global');
      Object.assign(viewer.style, { width: '100%', height: '100%', border: 'none', background: 'transparent', display: 'block' });
      containerRef.current?.appendChild(viewer);
      viewerRef.current = viewer;
    };

    loadSpline().catch(console.error);

    return () => {
      viewerRef.current?.remove();
      viewerRef.current = null;
    };
  }, [ready, scene]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
}

/* ===== TextType — typewriter component ===== */
function TextType({
  text,
  typingSpeed = 50,
  initialDelay = 0,
  pauseDuration = 2000,
  deletingSpeed = 30,
  loop = true,
  showCursor = true,
  cursorCharacter = '|',
  className = '',
}: {
  text: string[];
  typingSpeed?: number;
  initialDelay?: number;
  pauseDuration?: number;
  deletingSpeed?: number;
  loop?: boolean;
  showCursor?: boolean;
  cursorCharacter?: string;
  className?: string;
}) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const textArray = useMemo(() => text, [text]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const currentText = textArray[currentTextIndex];

    if (isDeleting) {
      if (displayedText === '') {
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % textArray.length);
        setCurrentCharIndex(0);
      } else {
        timeout = setTimeout(() => {
          setDisplayedText((prev) => prev.slice(0, -1));
        }, deletingSpeed);
      }
    } else {
      if (currentCharIndex < currentText.length) {
        timeout = setTimeout(() => {
          setDisplayedText((prev) => prev + currentText[currentCharIndex]);
          setCurrentCharIndex((prev) => prev + 1);
        }, typingSpeed);
      } else if (textArray.length >= 1) {
        if (!loop && currentTextIndex === textArray.length - 1) return;
        timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
      }
    }

    if (currentCharIndex === 0 && !isDeleting && displayedText === '') {
      timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + currentText[0]);
        setCurrentCharIndex(1);
      }, initialDelay);
    }

    return () => clearTimeout(timeout);
  }, [currentCharIndex, displayedText, isDeleting, typingSpeed, deletingSpeed, pauseDuration, textArray, currentTextIndex, loop, initialDelay]);

  return (
    <span className={`text-type ${className || ''}`}>
      <span>{displayedText}</span>
      {showCursor && <span className="text-type__cursor">{cursorCharacter}</span>}
    </span>
  );
}

/* ===== GooeyNav — gooey particle navigation ===== */
function GooeyNav({
  items,
  animationTime = 600,
  particleCount = 15,
  particleDistances = [90, 10],
  particleR = 100,
  timeVariance = 300,
  initialActiveIndex = 0,
}: {
  items: { label: string; href: string }[];
  animationTime?: number;
  particleCount?: number;
  particleDistances?: [number, number];
  particleR?: number;
  timeVariance?: number;
  initialActiveIndex?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const filterRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);

  const noise = (n: number = 1) => (n / 2) - Math.random() * n;
  const colors = [1, 2, 3, 1, 2, 3, 1, 4];

  const getXY = (distance: number, pointIndex: number, totalPoints: number): [number, number] => {
    const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
    return [distance * Math.cos(angle), distance * Math.sin(angle)];
  };

  const createParticle = (i: number, t: number, d: number[], r: number) => {
    const rotate = noise(r / 10);
    return {
      start: getXY(d[0], particleCount - i, particleCount),
      end: getXY(d[1] + noise(7), particleCount - i, particleCount),
      time: t,
      scale: 1 + noise(0.2),
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10,
    };
  };

  const makeParticles = useCallback((element: HTMLElement) => {
    const d = particleDistances;
    const r = particleR;
    const bubbleTime = animationTime * 2 + timeVariance;
    element.style.setProperty('--time', bubbleTime + 'ms');

    for (let i = 0; i < particleCount; i++) {
      const t = animationTime * 2 + noise(timeVariance * 2);
      const p = createParticle(i, t, d, r);
      element.classList.remove('active');

      setTimeout(() => {
        const particle = document.createElement('span');
        const point = document.createElement('span');
        particle.classList.add('particle');
        particle.style.setProperty('--start-x', p.start[0] + 'px');
        particle.style.setProperty('--start-y', p.start[1] + 'px');
        particle.style.setProperty('--end-x', p.end[0] + 'px');
        particle.style.setProperty('--end-y', p.end[1] + 'px');
        particle.style.setProperty('--time', p.time + 'ms');
        particle.style.setProperty('--scale', String(p.scale));
        particle.style.setProperty('--color', `var(--color-${p.color}, white)`);
        particle.style.setProperty('--rotate', p.rotate + 'deg');
        point.classList.add('point');
        particle.appendChild(point);
        element.appendChild(particle);
        requestAnimationFrame(() => element.classList.add('active'));
        setTimeout(() => { try { element.removeChild(particle); } catch (_) {} }, t);
      }, 30);
    }
  }, [animationTime, particleCount, particleDistances, particleR, timeVariance]);

  const updateEffectPosition = useCallback((element: HTMLElement) => {
    if (!containerRef.current || !filterRef.current || !textRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const pos = element.getBoundingClientRect();
    const styles: Partial<CSSStyleDeclaration> = {
      left: (pos.x - containerRect.x) + 'px',
      top: (pos.y - containerRect.y) + 'px',
      width: pos.width + 'px',
      height: pos.height + 'px',
    };
    Object.assign(filterRef.current.style, styles);
    Object.assign(textRef.current.style, styles);
    textRef.current.innerText = element.innerText;
  }, []);

  const handleClick = useCallback((e: React.MouseEvent<HTMLLIElement>, index: number) => {
    const liEl = e.currentTarget;
    if (activeIndex === index) return;
    setActiveIndex(index);
    updateEffectPosition(liEl);
    if (filterRef.current) {
      filterRef.current.querySelectorAll('.particle').forEach((p) => filterRef.current!.removeChild(p));
    }
    if (textRef.current) {
      textRef.current.classList.remove('active');
      void textRef.current.offsetWidth;
      textRef.current.classList.add('active');
    }
    if (filterRef.current) makeParticles(filterRef.current);
  }, [activeIndex, makeParticles, updateEffectPosition]);

  useEffect(() => {
    if (!navRef.current || !containerRef.current) return;
    const activeLi = navRef.current.querySelectorAll('li')[activeIndex];
    if (activeLi) {
      updateEffectPosition(activeLi);
      if (textRef.current) textRef.current.classList.add('active');
    }
    const resizeObserver = new ResizeObserver(() => {
      const currentActiveLi = navRef.current?.querySelectorAll('li')[activeIndex];
      if (currentActiveLi) updateEffectPosition(currentActiveLi);
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [activeIndex, updateEffectPosition]);

  return (
    <div className="gooey-nav-container" ref={containerRef}>
      <nav>
        <ul ref={navRef}>
          {items.map((item, index) => (
            <li
              key={index}
              className={`cursor-target ${activeIndex === index ? 'active' : ''}`}
              onClick={(e) => { handleClick(e, index); document.getElementById(item.href.slice(1))?.scrollIntoView({ behavior: 'smooth' }); }}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick(e as any, index); } }}
            >
              <a href={item.href} onClick={(e) => e.preventDefault()}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>
      <span className="effect filter" ref={filterRef} />
      <span className="effect text" ref={textRef} />
    </div>
  );
}

/* ===== Navbar ===== */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navItems = [
    { label: '首页', href: '#hero' },
    { label: '关于', href: '#about' },
    { label: '经历', href: '#experience' },
    { label: '作品', href: '#projects' },
    { label: '联系', href: '#contact' },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className={`fixed top-4 left-0 right-0 px-4 md:px-8 lg:px-16 z-50 transition-all duration-500 ${scrolled ? 'top-2' : ''}`}
    >
      <div
        style={{ overflow: 'visible' }}
        className={`flex items-center justify-between max-w-[1440px] mx-auto py-3 px-4 md:px-6 rounded-full transition-all duration-500 ${
          scrolled ? 'liquid-glass-strong' : 'liquid-glass'
        }`}
      >
        <span className="font-heading italic text-white text-xl leading-none tracking-tight">H</span>
        <div className="hidden lg:flex items-center">
          <GooeyNav items={navItems} particleCount={12} animationTime={600} timeVariance={300} particleDistances={[80, 10]} particleR={100} initialActiveIndex={0} />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-white/30 tracking-wider">PORTFOLIO</span>
          {/* Mobile hamburger */}
          <button
            className="lg:hidden cursor-target w-8 h-8 flex flex-col items-center justify-center gap-1.5 p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
              className="block w-5 h-[1.5px] bg-white/60 rounded-full"
              transition={{ duration: 0.2 }}
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-5 h-[1.5px] bg-white/60 rounded-full"
              transition={{ duration: 0.15 }}
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
              className="block w-5 h-[1.5px] bg-white/60 rounded-full"
              transition={{ duration: 0.2 }}
            />
          </button>
        </div>
      </div>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[60] bg-black flex flex-col items-center justify-center lg:hidden"
            initial={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 48px) 48px)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at calc(100% - 48px) 48px)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 48px) 48px)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Close button */}
            <button
              className="absolute top-8 right-8 w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <nav className="flex flex-col items-center gap-6">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileOpen(false);
                    document.getElementById(item.href.slice(1))?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-4xl font-bold text-white/80 hover:text-white transition-colors tracking-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.05 + i * 0.06, duration: 0.4 }}
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
            <motion.p
              className="absolute bottom-12 text-[10px] font-mono text-white/20 tracking-wider"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              &copy; 2025 黄选坤
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ===== Main Hero Section ===== */
export default function Hero() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 80]);
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  const f = (d: number) => ({
    initial: { filter: 'blur(10px)', opacity: 0, y: 20 },
    animate: { filter: 'blur(0px)', opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: 'easeOut' as const, delay: d },
  });

  return (
    <section id="hero" className="relative w-full min-h-screen bg-black overflow-hidden" ref={heroRef}>
      {/* Spline 3D Robot Background */}
      <div id="hero-robot-container" className="hero-robot-bg" style={{ zIndex: 0 }}>
        <SplineViewer scene="./robot-scene.splinecode" />
      </div>

      {/* Bottom gradient overlay */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[55vh] pointer-events-none z-[5]"
        style={{
          background:
            'linear-gradient(to bottom, transparent 0%, transparent 10%, rgba(250,248,245,0.01) 18%, rgba(250,248,245,0.02) 25%, rgba(250,248,245,0.04) 32%, rgba(250,248,245,0.06) 38%, rgba(250,248,245,0.09) 44%, rgba(250,248,245,0.13) 50%, rgba(250,248,245,0.18) 56%, rgba(250,248,245,0.24) 62%, rgba(250,248,245,0.32) 68%, rgba(250,248,245,0.42) 74%, rgba(250,248,245,0.55) 80%, rgba(250,248,245,0.7) 86%, rgba(250,248,245,0.85) 92%, #FAF8F5 100%)',
        }}
      />

      {/* Subtle radial light */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.02) 0%, transparent 70%)',
          y: useTransform(scrollYProgress, [0, 0.3], [0, -60]),
        }}
      />


      {/* Scroll progress bar */}
      <ScrollProgress />

      {/* Navbar */}
      <Navbar />

      {/* Content overlay */}
      <motion.div className="relative z-10 flex flex-col h-screen pointer-events-none" style={{ y: heroY }}>
        <div className="flex-1 flex flex-col items-center justify-center px-4 pointer-events-auto">
          {/* Badge */}
          <motion.div {...f(0.3)} className="liquid-glass rounded-full inline-flex items-center gap-0 mb-4">
            <span className="bg-white text-black px-3 py-1 text-xs font-semibold rounded-full">Portfolio</span>
            <span className="text-sm text-white/90 pr-3 font-body">Brand Visual Designer</span>
          </motion.div>

          {/* Typing title */}
          <motion.div {...f(0.4)} className="text-center">
            <TextType
              text={['Xuankun Huang']}
              typingSpeed={80}
              pauseDuration={1500}
              deletingSpeed={35}
              loop={true}
              showCursor={true}
              cursorCharacter="|"
              initialDelay={400}
            />
          </motion.div>

          {/* Subtitle */}
          <motion.p {...f(0.7)} className="mt-4 text-sm md:text-base text-white max-w-2xl font-body font-light leading-tight text-center opacity-70">
            AI品牌视觉设计 · AIGC创意实践者 · 大族激光集团总部
          </motion.p>

          {/* CTA */}
          <motion.div {...f(1.0)} className="flex items-center gap-6 mt-6">
            <a
              href="#projects"
              className="cursor-target liquid-glass-strong rounded-full px-6 py-3 text-sm font-medium text-white font-body flex items-center gap-2"
            >
              探索作品
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M7 17L17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* SCROLL indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ opacity: scrollOpacity }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-[10px] font-mono text-white/20 tracking-wider">SCROLL</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
          <svg className="h-5 w-5 text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
