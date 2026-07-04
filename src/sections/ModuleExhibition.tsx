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
          <div className="w-full cursor-pointer" onClick={() => setLightbox('https://lh3.googleusercontent.com/aida-public/AB6AXuCyGrzMx-tNJ5jUDT-4VtFtSqpzgJy673ArITNp3imLax7mOfNpwXY5EWK5VaJ1pMf3YvfAELVn62xv8YH_E89-TXIhxOIg1lYOVWlhH4SVkxS5tLAVaUzYWlm5UozOCr7RmPd6z6hpz84nR7B_ZOb6FOyZVwvM2nkDJ6h2VyEoKXL5Pln4orSsUEUFWbxF_RS2wHtl0vcyJ-E2bo3NfjRFUIvfDmcwVt_2mU-PeavrW5GNpvtwajdqdn2ebnHgIIwQfan6mw0_2BTp')}>
            <img
              alt="CIIF Main Billboard"
              className="w-full h-auto border border-[#c4c5da] shadow-sm"
              style={{ borderRadius: 0 }}
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyGrzMx-tNJ5jUDT-4VtFtSqpzgJy673ArITNp3imLax7mOfNpwXY5EWK5VaJ1pMf3YvfAELVn62xv8YH_E89-TXIhxOIg1lYOVWlhH4SVkxS5tLAVaUzYWlm5UozOCr7RmPd6z6hpz84nR7B_ZOb6FOyZVwvM2nkDJ6h2VyEoKXL5Pln4orSsUEUFWbxF_RS2wHtl0vcyJ-E2bo3NfjRFUIvfDmcwVt_2mU-PeavrW5GNpvtwajdqdn2ebnHgIIwQfan6mw0_2BTp"
            />
          </div>
          {/* Detail Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              'https://lh3.googleusercontent.com/aida-public/AB6AXuAgWcejchIsKJhO3pFD6-NALGcf6ArQD60WRNtdW-ML3WvXQY-WBI1w8ij7iV0yuEaOmZwub2ZRv469sV67MMfDzyMR4QXTYuR4-R-1Bdnky2zl8ZgYB1EqMWwWGHvDKN-wUfdNWRTwDOlOfCw5dJr9aFtGmO5ubJWaKYfIDBNAOL55znQLoyXZwmzIdxDs7ydMV30--_HF3NGXxP1dFZdFQkQ8s-SkL1XzVxZtMojmMW-kVXFRgy_qdw3v5t7XIuxPCC9TJHEjua4J',
              'https://lh3.googleusercontent.com/aida-public/AB6AXuCA-gD_G3ROrxC87epW_7AQPP9uG1HRMwlCR1qX9TCM2n0ZTtST8LLcAX40at_k0N2wzUPIWAl12OdVcFDxuDG_9aT_KY03zkRoVrvGHC9cTrU9Jx9_vhaupAS8TPM5ehQEabLSMjA2HeMQ0vx_vqR-SjbZIQWfHdaa3mUUeWUuvMS1aeLnovebP7MVQFDOg8xaYpunG5eARxRerUJb6kxgB1tJLUZTdKq7-QE0_8yvBo9k0j7XXB4-VkP_4bGLXiQcLa3ZDOdu7cdY',
              'https://lh3.googleusercontent.com/aida-public/AB6AXuD7_FCQj56FBz5gzGULq0BXp7h1ypEPZTyRzpawPicJzuzav46HQRUyFPsuys5GGejh8hlMhfbNhy60wxH1IPluqPG_hmAcNZ_LLlYp4VAZOkmzJMKkFtyhU6pnb_GaAXtDz_5ZNoBLc1JwYbZKZWqrc597fthgMIcG6mZ_qLbC_DA3FMOL--KrNuEUXtvtPRUbf4VybHviyHY9WOPm36TPS7dmR0LTVn_ROrjRXirUt3pBnMGM3x11jEtn4_gCKjvElQXeP6Gw2O9B',
              'https://lh3.googleusercontent.com/aida-public/AB6AXuCztkwZLq10WcWcZA_PKwwdMeMKFdLZVNZfrkuU3lF41uBCE8McqVbFCa-hmvbQjhiXYvELACfn584s79iAg2o50c25i6aJoRsRLvRSDfhVIbyxditOpFdkega3_GE9c_FuP5JXSPR3qe1kp4oJ4DoICBGkQ9ujih0AZ8qZ1Q9uEEGrQjLqnAp5Ltf5NpFTUtaz3i8o9gdvVC_O_F__IxtLmg0Nd2OT2rxWzeaElO0oin3VFZGN12-CQGFrhfkcylcvf110uI3xBUkO',
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
              'https://lh3.googleusercontent.com/aida-public/AB6AXuARvr5KqB9MoPCfR72M-DzF4aEKR9MBaIzB1RwXSpwUTl7kCRH2ME2M8YRdpdwHCCVZDGQCPaatL6AC0oRJajWsX7_Vdh0ZrCSV5v3htgp355yXCrHglS2aQgRlcKR8ZPhgdIY_CtS-z4j-cNB9App5Bv98UexIsBJ8PY8J-gid40SmtstWcJlWBHLBpUn_RINEB9IMzc5PuqhV1kbzoXO7nu3DwWiT4km-FnOTWomVaGWlLn1WOfpC2AmhapoB1SqKNjHNcjkvYmAv',
              'https://lh3.googleusercontent.com/aida-public/AB6AXuBkErGczCd51efXMy1joD9Y3L9to-1aAvej13XyA8QSpKwgLRxP36dx5bK2ck3DGFmqUXmk4qM4iqey5lBQERNirobBPdWoQmlX870oUpioo9fztI9q0FU5w1UtfE1NeD0NfibdBclehNQhlk_4c5kfdbsGc8nJ4U2q2oJVgWfRxHn_I8N0KzSyNu46uOnhL0TXEaVyGOcR3H5kY-keiU_9E7-lhnWWRrvtbXhE61AeUv259Qns__Wc7ljNMkvunoqa4T5GEvHaSuAF',
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
              'https://lh3.googleusercontent.com/aida-public/AB6AXuBaTrK3_KNxH8iq3_IfX9nr-pmITZXhOlT7LG4JxvCYJ8Aot3Ptdr-ZndBaGFLuQUaNwSPF_841T2mwyC46tojoq7_AE_XlG-ZvVyOwS4vQkuLdKa6IVDsAvXxvOgD_Tm8o1kPe4FIuIjY4GK4RsLlJJEjO-sF6gMznui8WN_m8IoivrdecmCWWpk00xk1wml602LTwpyMubJWxnLpLnlP1l4kdGCISZ9qUOTipidVPyGPVc57EQHFweZmz-vPfL3P2u4lkWDx0x5Bw',
              'https://lh3.googleusercontent.com/aida-public/AB6AXuCyreq-rw3i_i1wsALUOd1UH-VTwdno7pTs4vbgji6XfpNzLYP1jNFI4fI7zqKiral0xK2o1ShMWlbo0inh65OZ5uyvrmUrR8SNCG8jIGTqGJ9F7ArH29TXf_XU69dPv4oPUKVXBIOzYEJBwgBrEtjULHD9lrEULGD50P2AYiq3JVaD9vT8Q6i7rcAxS3yJRggCvjDkkyKTQ_jQG3Hor_9ZeLdzffZ3qlTLanW8d2SQ1AR7KOp29suvkJQV4W9PwxwwlIBYgb7Z2ok4',
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
              'https://lh3.googleusercontent.com/aida-public/AB6AXuBKXnKuy7tBM4o-ymcG9qAewRRBeopOhipvXsLec0ySU3IiF2ptGoXfWUL6QhKt29bXplL1Im4NqFIQTruCXkRlWP9hRH2PUWXq2hFdcVDmlguL0YE2Zww-mH8e9FjI-jISLNuonBItAIK-Jpax2VM2wmjUUD24UgRKws5fDil3yrCm1_tn6vTEdK2FNmMHnS6VDqtcfmXRxpYOS6vVkjuIDsDwOp0WO6s8TC5wHF2DqtwpoBDpboa1f-1I2tFtMxPU2SOL6nOoTR_v',
              'https://lh3.googleusercontent.com/aida-public/AB6AXuCBNSODiMFNq75dNOojOemDvMJpAMOdbp9-QOxo4vrkBOZI-5EqkjUxFMdt-sF1mKJzkb4nY1sqmYcIpb40G4UM10wVa7rZgP4ma03AWpMpiCL4VnsXDT0Nqv3vunN1_vu9_4CMcyiVoMVk0P5CIdj9tPoPIS-SXQIs7Ac1K0H4JlLfFVyXWMSA-itOfRVJ9wbBYgwz1TB6D5bI5ztOqgUJIpzYC6Xf53kS06JhG4D9qxRpehRa6RV5kP4oA30A0Y1KWYsK8uL6UVsi',
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
              'https://lh3.googleusercontent.com/aida-public/AB6AXuDVmC2BWBmlAS9Ryvm34WTGtXUWaldhz_H7t0FnYdMLN01J1olf5dYTwh4uoOUcdCYRDF2fJPQVeRb6ASLL67f-m1_tuhBey2AP0QQKCFM9Y2pGsNzeZhWS6F2ELDdN2fs5DpRj9QHvI4ZA_zL62dM-TBxMBM3iwmsNz4NsZY2chwHYn1EgQfPcwFCpCTn2LI46qjYJTt28TbgslJp76Nx4DVxwcelTl5DGxny62b8iC51Zr26Z_iibEV83f5oFXvXiEQt3Pz-4qdmO',
              'https://lh3.googleusercontent.com/aida-public/AB6AXuBpPxWhyxrwkzA6zwSI3W1qUUde0g8iTieo_bC5Z1VRE8_1txOFC0CSykfyudobPAvOtom_6cBnbTM88XlgsqaC0lyQL3XRekmjkw2rK6ApvdfWWSlUg1Jbz0xMkrcvrT_YXbPHZgaHMXTUZ7bfRp2h_zHsgPz-DnDzbZjj4OefrtvC7GhIqsyyAwrIFFrIBg7mJinzIdzMQYQPBB6koXaavBEBIaR1JHArGytFro5Tgv2P46KdiDaxx40x3AetgyT2WX9Sy8L0YphC',
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
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyGrzMx-tNJ5jUDT-4VtFtSqpzgJy673ArITNp3imLax7mOfNpwXY5EWK5VaJ1pMf3YvfAELVn62xv8YH_E89-TXIhxOIg1lYOVWlhH4SVkxS5tLAVaUzYWlm5UozOCr7RmPd6z6hpz84nR7B_ZOb6FOyZVwvM2nkDJ6h2VyEoKXL5Pln4orSsUEUFWbxF_RS2wHtl0vcyJ-E2bo3NfjRFUIvfDmcwVt_2mU-PeavrW5GNpvtwajdqdn2ebnHgIIwQfan6mw0_2BTp"
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
