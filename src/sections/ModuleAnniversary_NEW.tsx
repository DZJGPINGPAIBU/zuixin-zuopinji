import { motion } from 'framer-motion';

/* ═══════════════════════════════════════════════════════
   STITCH_30 1:1 REPLICA
   All images: local high-res
   ═══════════════════════════════════════════════════════ */

export function AnniversaryModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[90] bg-white overflow-y-auto overflow-x-hidden"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >

{/* 1. TopNavBar */}
<nav className="bg-surface sticky top-0 z-50 border-b border-on-surface flex justify-between items-center px-margin-mobile md:px-margin-desktop h-20">
<div className="font-display-lg text-headline-lg-mobile tracking-tighter text-on-surface uppercase">
            STUDIO30
        </div>
<div className="hidden md:flex gap-8 items-center">
<a className="font-meta-bold text-meta-bold text-primary border-b-2 border-primary pb-1" href="#">Work</a>
<a className="font-meta-bold text-meta-bold text-on-surface hover:text-primary transition-colors pb-1 border-b-2 border-transparent hover:border-primary" href="#">Process</a>
<a className="font-meta-bold text-meta-bold text-on-surface hover:text-primary transition-colors pb-1 border-b-2 border-transparent hover:border-primary" href="#">About</a>
<a className="font-meta-bold text-meta-bold text-on-surface hover:text-primary transition-colors pb-1 border-b-2 border-transparent hover:border-primary" href="#">Contact</a>
</div>
<button className="hidden md:block bg-primary-container text-on-primary font-meta-bold text-meta-bold uppercase px-6 py-3 border border-on-surface hover:bg-on-surface hover:text-surface transition-colors">
            Hire Us
        </button>
<button className="md:hidden text-on-surface">

</button>
</nav>
{/* Spacer for fixed nav */}

{/* 2. Hero Section */}
<header className="w-full px-margin-mobile md:px-margin-desktop pt-32 pb-16 deconstructed-grid relative">
<div className="col-span-12 md:col-span-10 relative z-10">
<h1 className="font-display-lg text-display-lg uppercase tracking-tighter leading-none mb-4 mix-blend-difference text-surface-container-lowest">
                30TH <br />
<span className="text-electric-blue mix-blend-normal">ANNIVERSARY</span>
</h1>
<div className="font-meta-bold text-meta-bold text-on-surface max-w-md mt-8 border-l-2 border-primary pl-4">
                HAN'S LASER VISUAL IDENTITY GUIDELINES. A COMPREHENSIVE RECONSTRUCTION OF BRAND ARCHITECTURE.
            </div>
</div>
<div className="col-span-12 md:col-span-8 md:col-start-5 mt-12 md:-mt-32 relative z-0">
<div className="gallery-img-wrapper border border-on-surface aspect-[1.54]">
<img alt="" className="gallery-img" src="/images/30周年手册/01.jpg" />
</div>
{/* Technical Meta Data overlays */}
<div className="absolute -bottom-4 -left-4 bg-surface border border-on-surface p-2 font-meta-sm text-meta-sm">
                [DOC: V1.0] / REF: 48
            </div>
<div className="absolute -top-4 -right-4 bg-primary-container text-on-primary px-3 py-1 font-meta-bold text-meta-bold uppercase border border-on-surface">
                Cover Spec
            </div>
</div>
</header>
{/* 3. Concept Breakdown */}
<section className="w-full px-margin-mobile md:px-margin-desktop py-32 border-t border-on-surface">
<div className="deconstructed-grid items-center">
<div className="col-span-12 md:col-span-8">
<div className="gallery-img-wrapper border border-on-surface aspect-[3.38]">
<img alt="" className="gallery-img object-contain bg-surface-container-low p-4" src="/images/30周年手册/02.jpg" />
</div>
</div>
<div className="col-span-12 md:col-span-4 flex flex-col gap-8 md:pl-12">
<div>
<h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-4">GEOMETRY<br />ANALYSIS</h2>
<div className="w-12 h-1 bg-primary-container mb-6"></div>
<div className="font-meta-sm text-meta-sm text-on-surface-variant bg-surface-container-low p-6 border border-on-surface">
<code>
                            &gt; GRID_SYSTEM: 12x12<br />
                            &gt; ANGLE_CONSTRAINT: 45° / 90°<br />
                            &gt; STROKE_WEIGHT: 0.125X<br />
                            &gt; LOGO_MARK_RATIO: 1:1.618<br />
<br />
                            [EXECUTION_NOTE]<br />
                            The symbol construction relies entirely on absolute geometric primitives. No optical adjustments permitted beyond specified grid intersections.
                        </code>
</div>
</div>
</div>
</div>
</section>
{/* 4. Contents */}
<section className="w-full px-margin-mobile md:px-margin-desktop py-32 bg-surface-container-lowest relative overflow-hidden border-t border-b border-on-surface">
{/* Abstract background element */}
<div className="absolute top-0 right-0 w-1/2 h-full bg-surface-container-low -z-10 border-l border-on-surface"></div>
<div className="deconstructed-grid relative z-10">
<div className="col-span-12 md:col-span-3">
<h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg uppercase mb-4">
<span className="text-electric-blue">Contents</span>
</h2>
<p className="font-body-md text-body-md mb-12">
                    Establishing the definitive architecture for visual communication across all global touchpoints.
                </p>
<div className="border border-on-surface p-4 inline-block hover:bg-electric-blue hover:text-on-primary transition-colors cursor-pointer group">
<span className="font-meta-bold text-meta-bold uppercase flex items-center gap-2">
                        Read Prologue 
                        
</span>
</div>
</div>
<div className="col-span-12 md:col-span-8 md:col-start-5 space-y-24 mt-16 md:mt-0">
{/* Image 47 Intro */}
<div className="relative">
<div className="gallery-img-wrapper border border-on-surface aspect-[1.54] w-[85%]">
<img alt="" className="gallery-img" src="/images/30周年手册/03.jpg" />
</div>
<div className="absolute -right-4 md:-right-12 bottom-12 bg-surface border border-on-surface p-6 max-w-xs offset-shadow">
<h3 className="font-meta-bold text-meta-bold text-electric-blue mb-2">01. INTRODUCTION</h3>
<p className="font-meta-sm text-meta-sm">The philosophy behind the 30-year evolution. Stripping away the non-essential to reveal pure function.</p>
</div>
</div>
{/* Image 46 Contents */}
<div className="relative flex justify-end">
<div className="absolute left-0 top-1/4 bg-surface border border-on-surface p-6 max-w-xs offset-shadow z-20">
<h3 className="font-meta-bold text-meta-bold text-electric-blue mb-2">02. CONTENTS</h3>
<p className="font-meta-sm text-meta-sm">Taxonomy of identity assets. Strict categorization of permissible logo variations, color hierarchies, and typographic rules.</p>
</div>
<div className="gallery-img-wrapper border border-on-surface aspect-[1.54] w-[85%] z-10">
<img alt="" className="gallery-img" src="/images/30周年手册/04.jpg" />
</div>
</div>
</div>
</div>
</section>
{/* 5. The Grid (The Core) */}
<section className="w-full px-margin-mobile md:px-margin-desktop py-32">
<div className="mb-16 border-b border-on-surface pb-4 flex justify-between items-end">
<h2 className="font-display-lg text-headline-lg md:text-display-lg uppercase tracking-tighter">
                MANUAL <span className="text-electric-blue">ARCHIVE</span>
</h2>
<div className="font-meta-bold text-meta-bold text-on-surface-variant hidden md:block">
                TOTAL_PAGES: 30 / VIEW_MODE: GRID
            </div>
</div>
<div className="deconstructed-grid">
{/* Row 1: Feature + 2 Small */}
<div className="col-span-12 md:col-span-8">
<div className="gallery-img-wrapper border border-on-surface h-full">
<img alt="" className="gallery-img" src="/images/30周年手册/05.jpg" />
<div className="absolute top-4 left-4 bg-surface border border-on-surface px-2 py-1 font-meta-bold text-meta-bold text-xs">P.04</div>
</div>
</div>
<div className="col-span-12 md:col-span-4 flex flex-col gap-6">
<div className="gallery-img-wrapper border border-on-surface flex-1">
<img alt="" className="gallery-img" src="/images/30周年手册/06.jpg" />
<div className="absolute top-4 left-4 bg-surface border border-on-surface px-2 py-1 font-meta-bold text-meta-bold text-xs">P.07</div>
</div>
<div className="gallery-img-wrapper border border-on-surface flex-1">
<img alt="" className="gallery-img" src="/images/30周年手册/07.jpg" />
<div className="absolute top-4 left-4 bg-surface border border-on-surface px-2 py-1 font-meta-bold text-meta-bold text-xs">P.08</div>
</div>
</div>
{/* Text Break */}
<div className="col-span-12 py-12 border-t border-b border-on-surface my-8">
<div className="font-meta-sm text-meta-sm text-center uppercase tracking-widest text-electric-blue">
                    SECTION_02: COLOR &amp; TYPOGRAPHY STANDARDS
                </div>
</div>
{/* Row 2: 3 Equal */}
<div className="col-span-12 md:col-span-4 gallery-img-wrapper border border-on-surface aspect-[1.54]">
<img alt="" className="gallery-img" src="/images/30周年手册/08.jpg" />
<div className="absolute top-4 left-4 bg-surface border border-on-surface px-2 py-1 font-meta-bold text-meta-bold text-xs">P.09</div>
</div>
<div className="col-span-12 md:col-span-4 gallery-img-wrapper border border-on-surface aspect-[1.54]">
<img alt="" className="gallery-img" src="/images/30周年手册/09.jpg" />
<div className="absolute top-4 left-4 bg-surface border border-on-surface px-2 py-1 font-meta-bold text-meta-bold text-xs">P.12</div>
</div>
<div className="col-span-12 md:col-span-4 gallery-img-wrapper border border-on-surface aspect-[1.54]">
<img alt="" className="gallery-img" src="/images/30周年手册/10.jpg" />
<div className="absolute top-4 left-4 bg-surface border border-on-surface px-2 py-1 font-meta-bold text-meta-bold text-xs">P.11</div>
</div>
{/* Row 3: 2 Small + Feature Right */}
<div className="col-span-12 md:col-span-4 flex flex-col gap-6 mt-8">
<div className="gallery-img-wrapper border border-on-surface flex-1 aspect-[1.54]">
<img alt="" className="gallery-img" src="/images/30周年手册/11.jpg" />
<div className="absolute top-4 left-4 bg-surface border border-on-surface px-2 py-1 font-meta-bold text-meta-bold text-xs">P.14</div>
</div>
<div className="gallery-img-wrapper border border-on-surface flex-1 aspect-[1.54]">
<img alt="" className="gallery-img" src="/images/30周年手册/12.jpg" />
<div className="absolute top-4 left-4 bg-surface border border-on-surface px-2 py-1 font-meta-bold text-meta-bold text-xs">P.13</div>
</div>
</div>
<div className="col-span-12 md:col-span-8 mt-8">
<div className="gallery-img-wrapper border border-on-surface h-full">
<img alt="" className="gallery-img" src="/images/30周年手册/13.jpg" />
<div className="absolute top-4 left-4 bg-surface border border-on-surface px-2 py-1 font-meta-bold text-meta-bold text-xs">P.15</div>
</div>
</div>
{/* Dense Grid for remaining */}
<div className="col-span-12 mt-16">
<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
<div className="gallery-img-wrapper border border-on-surface"><img alt="" className="gallery-img" src="/images/30周年手册/14.jpg" /></div>
<div className="gallery-img-wrapper border border-on-surface"><img alt="" className="gallery-img" src="/images/30周年手册/15.jpg" /></div>
<div className="gallery-img-wrapper border border-on-surface"><img alt="" className="gallery-img" src="/images/30周年手册/16.jpg" /></div>
<div className="gallery-img-wrapper border border-on-surface"><img alt="" className="gallery-img" src="/images/30周年手册/17.jpg" /></div>
<div className="gallery-img-wrapper border border-on-surface"><img alt="" className="gallery-img" src="/images/30周年手册/18.jpg" /></div>
<div className="gallery-img-wrapper border border-on-surface"><img alt="" className="gallery-img" src="/images/30周年手册/19.jpg" /></div>
<div className="gallery-img-wrapper border border-on-surface"><img alt="" className="gallery-img" src="/images/30周年手册/20.jpg" /></div>
<div className="gallery-img-wrapper border border-on-surface"><img alt="" className="gallery-img" src="/images/30周年手册/21.jpg" /></div>
<div className="gallery-img-wrapper border border-on-surface"><img alt="" className="gallery-img" src="/images/30周年手册/22.jpg" /></div>
<div className="gallery-img-wrapper border border-on-surface"><img alt="" className="gallery-img" src="/images/30周年手册/23.jpg" /></div>
<div className="gallery-img-wrapper border border-on-surface"><img alt="" className="gallery-img" src="/images/30周年手册/24.jpg" /></div>
<div className="gallery-img-wrapper border border-on-surface"><img alt="" className="gallery-img" src="/images/30周年手册/25.jpg" /></div>
<div className="gallery-img-wrapper border border-on-surface"><img alt="" className="gallery-img" src="/images/30周年手册/26.jpg" /></div>
<div className="gallery-img-wrapper border border-on-surface"><img alt="" className="gallery-img" src="/images/30周年手册/27.jpg" /></div>
<div className="gallery-img-wrapper border border-on-surface col-span-2"><img alt="" className="gallery-img" src="/images/30周年手册/28.jpg" /></div>
</div>
</div>
</div>
</section>
{/* 6. Application Showcase */}
<section className="w-full px-margin-mobile md:px-margin-desktop py-32 bg-surface-container-low border-t border-on-surface">
<div className="text-center mb-24">
<h2 className="font-display-lg text-headline-lg md:text-display-lg uppercase tracking-tighter">
                IN <span className="text-electric-blue">CONTEXT</span>
</h2>
<p className="font-meta-sm text-meta-sm mt-4 uppercase">Environmental &amp; Digital Application Studies</p>
</div>
<div className="deconstructed-grid items-center gap-12">
{/* Large Feature */}
<div className="col-span-12 md:col-span-8">
<div className="gallery-img-wrapper border border-on-surface aspect-[2.05] offset-shadow bg-surface">
<img alt="" className="gallery-img object-contain" src="/images/30周年手册/29.jpg" />
</div>
<div className="mt-4 font-meta-bold text-meta-bold text-xs uppercase flex justify-between border-b border-on-surface pb-2">
<span className="">APP_01: Architecture Signage</span>
<span className="text-electric-blue">SCALE: 1:100</span>
</div>
</div>
{/* Tall Portrait */}
<div className="col-span-12 md:col-span-4">
<div className="gallery-img-wrapper border border-on-surface aspect-[0.56] bg-surface h-[600px]">
<img alt="" className="gallery-img object-contain" src="/images/30周年手册/30.jpg" />
</div>
<div className="mt-4 font-meta-bold text-meta-bold text-xs uppercase flex justify-between border-b border-on-surface pb-2">
<span className="">APP_02: Vertical Banner</span>
<span className="text-electric-blue">PRINT</span>
</div>
</div>
{/* Square + Landscape Bottom Row */}
<div className="col-span-12 md:col-span-5 mt-12 md:mt-0">
<div className="gallery-img-wrapper border border-on-surface aspect-square bg-surface">
<img alt="" className="gallery-img object-contain" src="/images/30周年手册/concept.jpg" />
</div>
<div className="mt-4 font-meta-bold text-meta-bold text-xs uppercase flex justify-between border-b border-on-surface pb-2">
<span className="">APP_03: Iconography Box</span>
<span className="text-electric-blue">DIGITAL</span>
</div>
</div>
<div className="col-span-12 md:col-span-7 mt-12 md:mt-0">
<div className="gallery-img-wrapper border border-on-surface aspect-[1.22] bg-surface">
<img alt="" className="gallery-img object-contain" src="/images/30周年应用/v1.jpg" />
</div>
<div className="mt-4 font-meta-bold text-meta-bold text-xs uppercase flex justify-between border-b border-on-surface pb-2">
<span className="">APP_04: Stationery System</span>
<span className="text-electric-blue">PRINT</span>
</div>
</div>
</div>
</section>
{/* 7. Footer */}
<section className="w-full px-margin-mobile md:px-margin-desktop py-32 bg-surface border-t border-on-surface relative z-10">
  <div className="mb-24">
    <h2 className="font-display-lg text-headline-lg md:text-display-lg uppercase tracking-tighter">
      VISUAL <span className="text-electric-blue">APPLICATION</span>
    </h2>
    <p className="font-meta-sm text-meta-sm mt-4 uppercase tracking-widest">Extended Brand Mockup Studies</p>
  </div>
  
  <div className="deconstructed-grid gap-8">
    {/* Row 1: Gold Foil & Silver Foil */}
    <div className="col-span-12 md:col-span-7">
      <div className="gallery-img-wrapper border border-on-surface aspect-[1.54] bg-surface">
        <img src="/images/30周年应用/v2.jpg" alt="办公用品烫金" className="gallery-img object-contain" />
      </div>
      <div className="mt-4 font-meta-bold text-meta-bold text-xs uppercase flex justify-between border-b border-on-surface pb-2">
        <span className="">APP_05: 办公用品烫金工艺</span>
        <span className="text-electric-blue">GOLD_FOIL</span>
      </div>
    </div>
    <div className="col-span-12 md:col-span-5">
      <div className="gallery-img-wrapper border border-on-surface aspect-[1.22] bg-surface">
        <img src="/images/30周年应用/v3.png" alt="笔记本烫银" className="gallery-img object-contain" />
      </div>
      <div className="mt-4 font-meta-bold text-meta-bold text-xs uppercase flex justify-between border-b border-on-surface pb-2">
        <span className="">APP_06: 笔记本烫银工艺</span>
        <span className="text-electric-blue">SILVER_FOIL</span>
      </div>
    </div>

    {/* Row 2: Lifestyle & Gift Box */}
    <div className="col-span-12 md:col-span-4">
      <div className="gallery-img-wrapper border border-on-surface aspect-[0.56] h-[600px] bg-surface">
        <img src="/images/30周年应用/v4.jpg" alt="生活方式样机" className="gallery-img object-contain" />
      </div>
      <div className="mt-4 font-meta-bold text-meta-bold text-xs uppercase flex justify-between border-b border-on-surface pb-2">
        <span className="">APP_07: 生活方式应用</span>
        <span className="text-electric-blue">LIFESTYLE</span>
      </div>
    </div>
    <div className="col-span-12 md:col-span-8">
      <div className="gallery-img-wrapper border border-on-surface aspect-[2.05] bg-surface offset-shadow">
        <img src="/images/30周年应用/h1.png" alt="礼盒包装" className="gallery-img object-contain" />
      </div>
      <div className="mt-4 font-meta-bold text-meta-bold text-xs uppercase flex justify-between border-b border-on-surface pb-2">
        <span className="">APP_08: 礼盒包装彩色印刷</span>
        <span className="text-electric-blue">PACKAGING</span>
      </div>
    </div>

    {/* Row 3: Embossing & Stationery */}
    <div className="col-span-12 md:col-span-6">
      <div className="gallery-img-wrapper border border-on-surface aspect-[1.54] bg-surface">
        <img src="/images/30周年应用/h2.png" alt="日常用品压纹" className="gallery-img object-contain" />
      </div>
      <div className="mt-4 font-meta-bold text-meta-bold text-xs uppercase flex justify-between border-b border-on-surface pb-2">
        <span className="">APP_09: 日常用品压纹工艺</span>
        <span className="text-electric-blue">EMBOSSING</span>
      </div>
    </div>
    <div className="col-span-12 md:col-span-6">
      <div className="gallery-img-wrapper border border-on-surface aspect-[1.54] bg-surface">
        <img src="/images/30周年应用/h3.png" alt="办公文具系统" className="gallery-img object-contain" />
      </div>
      <div className="mt-4 font-meta-bold text-meta-bold text-xs uppercase flex justify-between border-b border-on-surface pb-2">
        <span className="">APP_10: 办公文具系统</span>
        <span className="text-electric-blue">STATIONERY</span>
      </div>
    </div>

    {/* Row 4: Desktop & Notebook Detail */}
    <div className="col-span-12 md:col-span-5">
      <div className="gallery-img-wrapper border border-on-surface aspect-square bg-surface">
        <img src="/images/30周年应用/h4.png" alt="桌面办公场景" className="gallery-img object-contain" />
      </div>
      <div className="mt-4 font-meta-bold text-meta-bold text-xs uppercase flex justify-between border-b border-on-surface pb-2">
        <span className="">APP_11: 桌面办公场景</span>
        <span className="text-electric-blue">DESKTOP</span>
      </div>
    </div>
    <div className="col-span-12 md:col-span-7">
      <div className="gallery-img-wrapper border border-on-surface aspect-[0.56] h-[600px] bg-surface">
        <img src="/images/30周年手册/01.jpg" alt="笔记本细节" className="gallery-img object-contain" />
      </div>
      <div className="mt-4 font-meta-bold text-meta-bold text-xs uppercase flex justify-between border-b border-on-surface pb-2">
        <span className="">APP_12: 笔记本细节展示</span>
        <span className="text-electric-blue">DETAIL</span>
      </div>
    </div>
  </div>
</section><footer className="bg-surface border-t border-on-surface w-full mt-overlap-offset relative z-20">
<div className="flex flex-col md:flex-row justify-between items-start md:items-center px-margin-mobile md:px-margin-desktop py-gutter w-full">
<div className="font-meta-bold text-meta-bold uppercase text-on-surface mb-6 md:mb-0">
                ©2026 STUDIO30 RADICAL ARCHIVE
            </div>
<div className="flex flex-wrap gap-6 font-meta-sm text-meta-sm">
<a className="text-on-surface-variant hover:text-primary opacity-80 hover:opacity-100 transition-opacity" href="#">Privacy</a>
<a className="text-on-surface-variant hover:text-primary opacity-80 hover:opacity-100 transition-opacity" href="#">Terms</a>
<a className="text-primary underline hover:text-primary opacity-80 hover:opacity-100 transition-opacity" href="#">Archive</a>
<a className="text-on-surface-variant hover:text-primary opacity-80 hover:opacity-100 transition-opacity" href="#">Instagram</a>
</div>
</div>
</footer>





    </motion.div>
  );
}

export function AnniversaryCard({ onClick }: { onClick: () => void }) {
  return (
    <motion.div className="card-3d cursor-pointer group" whileHover={{ y: -6 }} transition={{ duration: 0.3 }} onClick={onClick}>
      <div className="card-3d-inner rounded-2xl overflow-hidden bg-white relative aspect-[4/5]">
        <img src="/images/30周年手册/concept.jpg" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <span className="text-[10px] font-mono text-white/50 tracking-wider uppercase">PROJECT 02</span>
          <h3 className="text-white font-bold text-lg mt-1 leading-tight">大族激光30周年</h3>
          <p className="text-white/50 text-xs mt-1">LOGO设计规范 · 30页手册 · 视觉应用</p>
        </div>
        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17" /></svg>
        </div>
      </div>
    </motion.div>
  );
}
