import { useState, useEffect, useRef, useCallback, useMemo, createElement } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

/* ===== SplashCursor — WebGL fluid cursor effect ===== */
const SplashCursor = ({
  SIM_RESOLUTION = 128,
  DYE_RESOLUTION = 1440,
  DENSITY_DISSIPATION = 3.5,
  VELOCITY_DISSIPATION = 2,
  PRESSURE = 0.1,
  PRESSURE_ITERATIONS = 20,
  CURL = 3,
  SPLAT_RADIUS = 0.2,
  SPLAT_FORCE = 6000,
  SHADING = true,
  COLOR_UPDATE_SPEED = 10,
  TRANSPARENT = true,
}: {
  SIM_RESOLUTION?: number;
  DYE_RESOLUTION?: number;
  DENSITY_DISSIPATION?: number;
  VELOCITY_DISSIPATION?: number;
  PRESSURE?: number;
  PRESSURE_ITERATIONS?: number;
  CURL?: number;
  SPLAT_RADIUS?: number;
  SPLAT_FORCE?: number;
  SHADING?: boolean;
  COLOR_UPDATE_SPEED?: number;
  TRANSPARENT?: boolean;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let isActive = true;

    const getWebGLContext = (canvas: HTMLCanvasElement) => {
      const params = { alpha: true, depth: false, stencil: false, antialias: false, preserveDrawingBuffer: false };
      let gl = canvas.getContext('webgl2', params) as WebGLRenderingContext | null;
      const isWebGL2 = !!gl;
      if (!isWebGL2) gl = canvas.getContext('webgl', params) || canvas.getContext('experimental-webgl', params) as WebGLRenderingContext | null;
      if (!gl) return null;
      let halfFloat: any, supportLinearFiltering: any;
      if (isWebGL2) {
        gl.getExtension('EXT_color_buffer_float');
        supportLinearFiltering = gl.getExtension('OES_texture_float_linear');
      } else {
        halfFloat = gl.getExtension('OES_texture_half_float');
        supportLinearFiltering = gl.getExtension('OES_texture_half_float_linear');
      }
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      const halfFloatTexType = isWebGL2 ? (gl as any).HALF_FLOAT : halfFloat?.HALF_FLOAT_OES;
      let formatRGBA: any, formatRG: any, formatR: any;
      if (isWebGL2) {
        formatRGBA = { internalFormat: (gl as any).RGBA16F, format: gl.RGBA };
        formatRG = { internalFormat: (gl as any).RG16F, format: (gl as any).RG };
        formatR = { internalFormat: (gl as any).R16F, format: (gl as any).RED };
      } else {
        formatRGBA = { internalFormat: gl.RGBA, format: gl.RGBA };
        formatRG = { internalFormat: gl.RGBA, format: gl.RGBA };
        formatR = { internalFormat: gl.RGBA, format: gl.RGBA };
      }
      return { gl, ext: { formatRGBA, formatRG, formatR, halfFloatTexType, supportLinearFiltering } };
    };

    const ctx = getWebGLContext(canvas);
    if (!ctx) return;
    const { gl, ext } = ctx;
    if (!ext.supportLinearFiltering) { /* DYE_RESOLUTION = 256; SHADING = false; */ }

    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };

    const baseVertexShader = compileShader(gl.VERTEX_SHADER, `
      precision highp float;
      attribute vec2 aPosition;
      varying vec2 vUv, vL, vR, vT, vB;
      uniform vec2 texelSize;
      void main () {
        vUv = aPosition * 0.5 + 0.5;
        vL = vUv - vec2(texelSize.x, 0.0);
        vR = vUv + vec2(texelSize.x, 0.0);
        vT = vUv + vec2(0.0, texelSize.y);
        vB = vUv - vec2(0.0, texelSize.y);
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `);

    // Simplified version — just clear and show subtle effect
    const clearShader = compileShader(gl.FRAGMENT_SHADER, `
      precision mediump float; precision mediump sampler2D;
      varying highp vec2 vUv; uniform sampler2D uTexture; uniform float value;
      void main () { gl_FragColor = value * texture2D(uTexture, vUv); }
    `);

    const displayShaderSource = `
      precision highp float; precision highp sampler2D;
      varying vec2 vUv;
      uniform sampler2D uTexture;
      void main(){
        vec3 c = texture2D(uTexture, vUv).rgb;
        float a = max(c.r, max(c.g, c.b));
        gl_FragColor = vec4(c, a);
      }
    `;

    const displayShader = compileShader(gl.FRAGMENT_SHADER, displayShaderSource);

    function createProgram(vs: WebGLShader, fs: WebGLShader) {
      const p = gl.createProgram()!;
      gl.attachShader(p, vs);
      gl.attachShader(p, fs);
      gl.linkProgram(p);
      return p;
    }

    function getUniforms(program: WebGLProgram) {
      const uniforms: Record<string, WebGLUniformLocation> = {};
      const count = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
      for (let i = 0; i < count; i++) {
        const name = gl.getActiveUniform(program, i)!.name;
        uniforms[name] = gl.getUniformLocation(program, name)!;
      }
      return uniforms;
    }

    const displayProgram = createProgram(baseVertexShader, displayShader);
    const displayUniforms = getUniforms(displayProgram);
    const clearProgram = createProgram(baseVertexShader, clearShader);
    const clearUniforms = getUniforms(clearProgram);

    const blit = (() => {
      gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(0);
      return (target: any) => {
        if (!target) {
          gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
          gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        } else {
          gl.viewport(0, 0, target.width, target.height);
          gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
        }
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
      };
    })();

    function createFBO(w: number, h: number): any {
      gl.activeTexture(gl.TEXTURE0);
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
      const fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
      gl.viewport(0, 0, w, h);
      gl.clear(gl.COLOR_BUFFER_BIT);
      return {
        texture,
        fbo,
        width: w,
        height: h,
        attach(id: number) { gl.activeTexture(gl.TEXTURE0 + id); gl.bindTexture(gl.TEXTURE_2D, texture); return id; },
      };
    }

    const dye = createFBO(1024, 1024);

    function resizeCanvas() {
      const w = Math.floor(canvas!.clientWidth * (window.devicePixelRatio || 1));
      const h = Math.floor(canvas!.clientHeight * (window.devicePixelRatio || 1));
      if (canvas!.width !== w || canvas!.height !== h) {
        canvas!.width = w;
        canvas!.height = h;
        return true;
      }
      return false;
    }

    resizeCanvas();

    // Simple subtle animation
    let animId: number;
    let t = 0;
    function update() {
      if (!isActive) return;
      t += 0.016;
      resizeCanvas();

      gl.disable(gl.BLEND);
      gl.useProgram(displayProgram);
      gl.uniform1i(displayUniforms.uTexture, dye.attach(0));
      blit(null);

      animId = requestAnimationFrame(update);
    }

    animId = requestAnimationFrame(update);

    return () => {
      isActive = false;
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, zIndex: 50, pointerEvents: 'none', width: '100%', height: '100%' }}>
      <canvas ref={canvasRef} style={{ width: '100vw', height: '100vh', display: 'block', opacity: 0.15 }} />
    </div>
  );
};

/* ===== ScrollProgress ===== */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return <motion.div className="scroll-progress" style={{ scaleX }} />;
}

/* ===== SplineViewer wrapper ===== */
function SplineViewer({ scene }: { scene: string }) {
  return createElement('spline-viewer', {
    url: scene,
    'events-target': 'global',
    style: { width: '100%', height: '100%', border: 'none', background: 'transparent', display: 'block' },
  });
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
      className={`fixed top-4 left-0 right-0 px-8 lg:px-16 z-50 transition-all duration-500 ${scrolled ? 'top-2' : ''}`}
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
        <span className="text-[10px] font-mono text-white/30 tracking-wider">PORTFOLIO</span>
      </div>
    </motion.nav>
  );
}

/* ===== Main Hero Section ===== */
export default function Hero() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 80]);

  const f = (d: number) => ({
    initial: { filter: 'blur(10px)', opacity: 0, y: 20 },
    animate: { filter: 'blur(0px)', opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: 'easeOut' as const, delay: d },
  });

  return (
    <section id="hero" className="relative w-full min-h-screen bg-black overflow-hidden" ref={heroRef}>
      {/* Spline 3D Robot Background */}
      <div id="hero-robot-container" className="hero-robot-bg" style={{ zIndex: 0 }}>
        <SplineViewer scene="/robot-scene.splinecode" />
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

      {/* WebGL fluid cursor (subtle) */}
      <SplashCursor />

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
            品牌平面设计师 · AIGC创意实践者 · 大族激光集团总部品牌部
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
