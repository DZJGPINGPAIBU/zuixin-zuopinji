import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navSections = [
  { id: 'ex-cif', label: 'CIIF' },
  { id: 'ex-cio', label: 'CIOE' },
  { id: 'ex-cht', label: 'CHTF' },
];

/* ========== Exhibition Detail Modal ========== */
export function ExhibitionModal({ onClose }: { onClose: () => void }) {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [activeNav, setActiveNav] = useState('ex-cif');
  const contentRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver to track which section is in view
  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;
    const observers: IntersectionObserver[] = [];
    navSections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const io = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) setActiveNav(id);
        },
        { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
      );
      io.observe(el);
      observers.push(io);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <motion.div
      ref={contentRef}
      className="fixed inset-0 z-[90] bg-white overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Top bar: project label + close */}
      <div className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md border-b border-black/5">
        <span className="text-xs font-mono text-black/30 tracking-wider">PROJECT 03</span>
        <button onClick={onClose} className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10 transition-colors">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Sub-nav: section jump links */}
      <nav className="sticky top-[57px] z-40 border-b border-black/5 bg-white/90 backdrop-blur-md px-6 py-0">
        <div className="flex gap-0">
          {navSections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollToSection(s.id)}
              className={`relative px-4 py-2.5 text-xs font-mono tracking-wider transition-colors cursor-pointer ${
                activeNav === s.id
                  ? 'text-black/80 border-b-2 border-black/80'
                  : 'text-black/25 hover:text-black/50 border-b-2 border-transparent'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </nav>

      {/* ===== Hero Section ===== */}
      <section
        className="border-b border-[#c4c5da]"
        style={{ padding: '128px 24px 96px', maxWidth: 1440, margin: '0 auto' }}
      >
        <div style={{ maxWidth: '56rem' }}>
          <h1
            className="uppercase mb-6 leading-none"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 72,
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.04em',
              color: '#0024c1',
            }}
          >
            Exhibition<br />Archive
          </h1>
          <p
            className="max-w-xl"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 18,
              lineHeight: 1.6,
              fontWeight: 400,
              color: '#5f5e5f',
            }}
          >
            A documentation of spatial narrative and technical precision across industrial, optoelectronic, and high-tech sectors.
          </p>
        </div>
      </section>

      {/* ===== SECTION 1: CIIF ===== */}
      <section
        id="ex-cif"
        className="border-b border-[#c4c5da]"
        style={{ padding: '96px 24px', maxWidth: 1440, margin: '0 auto' }}
      >
        <div style={{ maxWidth: '48rem', marginBottom: 48 }}>
          <h2
            className="uppercase mb-4 tracking-tight"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 48,
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              color: '#0024c1',
            }}
          >
            CIIF: Industrial Precision
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 18,
              lineHeight: 1.6,
              fontWeight: 400,
              color: '#5f5e5f',
            }}
          >
            Strategic spatial design for advanced manufacturing and laser technology. Highlighting precision and industrial capability.
          </p>
        </div>

        <div className="flex flex-col gap-12">
          {/* Hero Image */}
          <div className="w-full cursor-pointer" onClick={() => setLightbox('/images/exhibition/ciif_01_main.jpg')}>
            <img
              alt="CIIF Main Billboard"
              className="w-full h-auto border border-[#c4c5da] shadow-sm"
              style={{ borderRadius: 0 }}
              src="/images/exhibition/ciif_01_main.jpg"
            />
          </div>
          {/* Detail Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              '/images/exhibition/ciif_02_keyvisual.jpg',
              '/images/exhibition/ciif_03_guide.jpg',
              '/images/exhibition/ciif_04_visitor.jpg',
              '/images/exhibition/ciif_05_invite.jpg',
            ].map((src, i) => (
              <img
                key={i}
                alt={`CIIF ${i === 0 ? 'Key Visual' : i === 1 ? 'Guide' : i === 2 ? 'Visitor Guide' : 'Invite'}`}
                className="w-full h-auto border border-[#c4c5da] shadow-sm cursor-pointer"
                style={{ borderRadius: 0 }}
                src={src}
                onClick={() => setLightbox(src)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: CIOE ===== */}
      <section
        id="ex-cio"
        className="border-b border-[#c4c5da]"
        style={{ padding: '96px 24px', maxWidth: 1440, margin: '0 auto' }}
      >
        <div style={{ maxWidth: '48rem', marginBottom: 48 }}>
          <h2
            className="uppercase mb-4 tracking-tight"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 48,
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              color: '#0024c1',
            }}
          >
            CIOE: Optoelectronic Vision
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 18,
              lineHeight: 1.6,
              fontWeight: 400,
              color: '#5f5e5f',
            }}
          >
            Minimalist spatial graphics focused on the interaction between light and technology. Clean layouts paired with deep tech accents.
          </p>
        </div>

        <div className="flex flex-col gap-12">
          <div className="grid grid-cols-1 gap-8">
            {[
              '/images/exhibition/cioe_01_banner.jpg',
              '/images/exhibition/cioe_02_banner.jpg',
            ].map((src, i) => (
              <img
                key={i}
                alt={`CIOE Banner ${i + 1}`}
                className="w-full h-auto border border-[#c4c5da] shadow-sm cursor-pointer"
                style={{ borderRadius: 0 }}
                src={src}
                onClick={() => setLightbox(src)}
              />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              '/images/exhibition/cioe_03_mobile_a.jpg',
              '/images/exhibition/cioe_04_mobile_b.jpg',
            ].map((src, i) => (
              <img
                key={i}
                alt={`CIOE Mobile ${i === 0 ? 'A' : 'B'}`}
                className="w-full h-auto border border-[#c4c5da] shadow-sm cursor-pointer"
                style={{ borderRadius: 0 }}
                src={src}
                onClick={() => setLightbox(src)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: CHTF ===== */}
      <section
        id="ex-cht"
        className="border-b border-[#c4c5da]"
        style={{ padding: '96px 24px', maxWidth: 1440, margin: '0 auto' }}
      >
        <div style={{ maxWidth: '48rem', marginBottom: 48 }}>
          <h2
            className="uppercase mb-4 tracking-tight"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 48,
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              color: '#0024c1',
            }}
          >
            CHTF: High-Tech Ecosystem
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 18,
              lineHeight: 1.6,
              fontWeight: 400,
              color: '#5f5e5f',
            }}
          >
            Dynamic and energetic visual systems designed for the high-tech sector, translating complex innovations into accessible touchpoints.
          </p>
        </div>

        <div className="flex flex-col gap-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              '/images/exhibition/chtf_01_banner.jpg',
              '/images/exhibition/chtf_02_banner.jpg',
            ].map((src, i) => (
              <img
                key={i}
                alt={`CHTF Banner ${i + 1}`}
                className="w-full h-auto border border-[#c4c5da] shadow-sm cursor-pointer"
                style={{ borderRadius: 0 }}
                src={src}
                onClick={() => setLightbox(src)}
              />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              '/images/exhibition/chtf_03_mobile_a.jpg',
              '/images/exhibition/chtf_04_mobile_b.jpg',
            ].map((src, i) => (
              <img
                key={i}
                alt={`CHTF Mobile ${i === 0 ? 'A' : 'B'}`}
                className="w-full h-auto border border-[#c4c5da] shadow-sm cursor-pointer"
                style={{ borderRadius: 0 }}
                src={src}
                onClick={() => setLightbox(src)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== Studio Philosophy / CTA ===== */}
      <section
        style={{ padding: '96px 24px', maxWidth: 1440, margin: '0 auto' }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
          <div style={{ maxWidth: '42rem' }}>
            <h3
              className="uppercase mb-4"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: 32,
                fontWeight: 700,
                lineHeight: 1.3,
                color: '#0024c1',
              }}
            >
              Spatial Storytelling
            </h3>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 18,
                lineHeight: 1.6,
                fontWeight: 400,
                color: '#5f5e5f',
              }}
            >
              We bridge the gap between architectural structure and brand identity. From the first touchpoint to the final immersive environment.
            </p>
          </div>
          <button
            className="text-white px-12 py-5 tracking-widest transition-all duration-300 cursor-pointer hover:opacity-90"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 12,
              lineHeight: 1.2,
              letterSpacing: '0.1em',
              fontWeight: 600,
              backgroundColor: '#0024c1',
              borderRadius: 0,
              border: 'none',
            }}
          >
            START A PROJECT
          </button>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 cursor-pointer"
            style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.img
              src={lightbox}
              alt=""
              className="max-w-full max-h-[90vh] object-contain"
              style={{ borderRadius: 0 }}
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ========== Small Preview Card ========== */
export function ExhibitionCard({ onClick }: { onClick: () => void }) {
  return (
    <motion.div
      className="card-3d cursor-target cursor-pointer group"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
    >
      <div className="card-3d-inner overflow-hidden bg-white relative aspect-[4/5]" style={{ borderRadius: 0 }}>
        <img
          src="/images/exhibition/ciif_01_main.jpg"
          alt="展会视觉体系"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <span
            className="text-white/50 tracking-wider uppercase"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 10,
              letterSpacing: '0.1em',
              fontWeight: 600,
            }}
          >
            PROJECT 03
          </span>
          <h3 className="text-white font-bold text-lg mt-1 leading-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            展会视觉体系
          </h3>
          <p className="text-white/50 text-xs mt-1">CIIF · CIOE · CHTF</p>
        </div>
        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}
