import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MascotSideNav from '@/components/MascotSideNav';

/* ══════════════════════════════════════════════════════════════
   SHARED — exact match with original HTML design tokens
   ══════════════════════════════════════════════════════════════ */


/* ══════════════════════════════════════════════════════════════
   SECTION 1 — 品牌门户
   ══════════════════════════════════════════════════════════════ */
export function BrandPortal() {
  return (
    <div>

{/* TopNavBar */}
<nav className="fixed w-full flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 max-w-[1920px] mx-auto bg-mascot-surface/60 backdrop-blur-xl border-b border-mascot-primary/10 top-0 z-50 transition-transform">
<div className="font-display-xl text-body-md font-black text-mascot-primary uppercase tracking-widest scale-95 transition-transform active:scale-90 cursor-pointer">
            MASCOT.SYS
        </div>
<div className="hidden md:flex gap-8">
<a className="text-mascot-primary font-bold border-b-2 border-mascot-primary font-label-mono text-label-mono uppercase tracking-widest pb-1 hover:text-mascot-primary transition-colors duration-300" href="#">INDEX</a>
<a className="text-mascot-on-surface-variant/70 font-label-mono text-label-mono uppercase tracking-widest pb-1 hover:text-mascot-primary transition-colors duration-300" href="#blueprint">BLUEPRINT</a>
<a className="text-mascot-on-surface-variant/70 font-label-mono text-label-mono uppercase tracking-widest pb-1 hover:text-mascot-primary transition-colors duration-300" href="#scenes">SCENES</a>
<a className="text-mascot-on-surface-variant/70 font-label-mono text-label-mono uppercase tracking-widest pb-1 hover:text-mascot-primary transition-colors duration-300" href="#spec">SPEC</a>
</div>
<button className="font-label-mono text-label-mono uppercase tracking-widest text-mascot-primary border border-mascot-primary px-4 py-2 rounded hover:bg-mascot-primary hover:text-mascot-on-primary transition-colors duration-300 hidden md:block">
            LAUNCH PORTAL
        </button>
</nav>
{/* Hero Section */}
<header className="relative min-h-screen pt-24 pb-16 px-margin-mobile md:px-margin-desktop flex items-center bg-grid-pattern">
<div className="absolute left-0 top-1/2 -translate-y-1/2 px-4 hidden lg:block z-0 opacity-10 pointer-events-none">
<h1 className="font-display-xl text-[180px] writing-vertical-rl rotate-180 text-mascot-on-surface-variant leading-none tracking-tighter">XIAOZU</h1>
</div>
<div className="w-full max-w-[1100px] mx-auto grid grid-cols-4 md:grid-cols-12 gap-gutter relative z-10">
<div className="col-span-12 lg:col-span-5 flex flex-col justify-center gap-8 relative z-20">
<div className="flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-mascot-primary animate-pulse"></span>
<span className="font-label-mono text-label-mono text-mascot-primary uppercase tracking-widest">SYS.INIT // CORE_ONLINE</span>
</div>
<h1 className="font-headline-lg-mobile md:font-headline-lg text-mascot-on-surface uppercase leading-[0.9]">
                    Precision<br />
<span className="text-mascot-primary">Engineered</span><br />
                    Identity
                </h1>
<p className="font-body-md text-mascot-on-surface-variant max-w-md">
                    Deploying the next iteration of brand avatar technology. XIAOZU represents the synthesis of industrial laser precision and approachable, high-fidelity robotics.
                </p>
<div className="flex gap-4">
<button className="font-label-mono text-label-mono uppercase tracking-widest text-mascot-primary border border-mascot-primary px-6 py-3 rounded hover:bg-mascot-primary hover:text-mascot-on-primary transition-colors duration-300 w-fit">
                        INITIALIZE SEQUENCE
                    </button>
<button className="font-label-mono text-label-mono uppercase tracking-widest text-mascot-on-surface-variant hover:text-mascot-primary transition-colors duration-300 flex items-center gap-2">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "&quot" }}>arrow_downward</span>
                        SCROLL
                    </button>
</div>
</div>
<div className="col-span-12 lg:col-span-7 relative h-[60vh] lg:h-[80vh] flex items-center justify-center">
<div className="absolute inset-0 bg-mascot-primary/5 rounded-full blur-[100px] -z-10"></div>
<img alt="A high-fidelity 3D render of a futuristic, spherical robot mascot with a white and metallic orange chassis, featuring glowing blue digital eyes, suspended mid-air against a pristine white studio background with soft ambient lighting." className="w-full h-full object-contain mix-blend-multiply scale-110 drop-shadow-2xl z-10" src="./images/mascot/brand-portal/吉祥物与集团标志组合 1.jpg"  loading="lazy" />
</div>
</div>
</header>
{/* The Blueprint Section */}
<section className="py-24 px-margin-mobile md:px-margin-desktop relative border-t border-mascot-outline-variant/20" id="blueprint">
<div className="w-full max-w-[1100px] mx-auto grid grid-cols-12 gap-gutter">
<div className="col-span-12 lg:col-span-4 flex flex-col gap-8">
<h2 className="font-headline-lg-mobile md:font-headline-lg text-mascot-on-surface">THE<br />BLUEPRINT</h2>
<div className="h-[1px] w-16 bg-mascot-primary"></div>
<p className="font-body-md text-mascot-on-surface-variant">
                    Architectural teardown of the XIAOZU unit. The design language is strictly derived from industrial utility, fusing the corporate 'H' motif with functional warning indicators.
                </p>
<ul className="space-y-4">
<li className="flex items-center gap-4">
<span className="w-6 h-6 rounded-full border border-mascot-primary flex items-center justify-center font-label-mono text-[10px] text-mascot-primary">01</span>
<span className="font-label-mono text-label-mono text-mascot-on-surface">GEOMETRIC SYNTHESIS</span>
</li>
<li className="flex items-center gap-4">
<span className="w-6 h-6 rounded-full border border-mascot-primary flex items-center justify-center font-label-mono text-[10px] text-mascot-primary">02</span>
<span className="font-label-mono text-label-mono text-mascot-on-surface">BRAND INTEGRATION</span>
</li>
<li className="flex items-center gap-4">
<span className="w-6 h-6 rounded-full border border-mascot-primary flex items-center justify-center font-label-mono text-[10px] text-mascot-primary">03</span>
<span className="font-label-mono text-label-mono text-mascot-on-surface">HIERARCHICAL FOCUS</span>
</li>
</ul>
</div>
<div className="cursor-target col-span-12 lg:col-span-8 bg-mascot-surface-container/50 rounded-xl border border-mascot-outline-variant/20 p-6 md:p-8 relative overflow-hidden flex items-center justify-center min-h-[300px] md:min-h-[500px]">
<img alt="A detailed technical blueprint and branding guidelines document for the robot mascot, displaying geometric breakdown of the face to form the letter H, color palette specifications in Pantone and RGB, and a diagram showing a literal laser machine." className="w-full h-full object-contain mix-blend-multiply z-10" src="./images/mascot/brand-portal/2吉祥物-设计说明（图例）-1 1.jpg"  loading="lazy" />
<div className="absolute top-4 right-4 font-label-mono text-label-mono text-mascot-primary/50">DOC_REF: SPEC_01</div>
</div>
</div>
</section>
{/* Situational Deployment Section */}
<section className="py-24 px-margin-mobile md:px-margin-desktop bg-mascot-surface-container-low relative" id="scenes">
<div className="w-full max-w-[1100px] mx-auto">
<div className="flex justify-between items-end mb-16">
<div>
<h2 className="font-headline-lg-mobile md:font-headline-lg text-mascot-on-surface mb-4">SITUATIONAL<br />DEPLOYMENT</h2>
<p className="font-label-mono text-label-mono text-mascot-primary">ENVIRONMENTAL CONTEXT TESTS</p>
</div>
<div className="hidden md:block font-label-mono text-label-mono text-mascot-on-surface-variant text-right">
                    GRID_SYS: ACTIVE<br />STATUS: NOMINAL
                </div>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 relative">
<img alt="A composite grid image showing multiple real-world environments like office lobbies, factory floors, gymnasiums, and outdoor corporate campuses, with the 2D illustrated version of the robot mascot inserted into each scene exhibiting different contextual emotions." className="w-full h-auto col-span-full object-cover rounded shadow-sm border border-mascot-outline-variant/10" src="./images/mascot/brand-portal/4吉祥物-场景组合 1.jpg"  loading="lazy" />
</div>
</div>
</section>
{/* Dynamic Variations Section */}
<section className="py-24 px-margin-mobile md:px-margin-desktop bg-white relative border-t border-mascot-outline-variant/20" id="spec">
<div className="w-full max-w-[1100px] mx-auto">
<div className="mb-16 text-center">
<h2 className="font-headline-lg-mobile md:font-headline-lg text-mascot-on-surface">DYNAMIC VARIATIONS</h2>
<div className="w-24 h-[2px] bg-mascot-primary mx-auto mt-6"></div>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-gutter items-center">
<div className="bg-mascot-surface-container/30 border border-mascot-primary/10 rounded-xl p-6 md:p-8 flex items-center justify-center min-h-[250px] md:min-h-[400px]">
<img alt="Three variations of the 2D illustrated robot mascot holding different styles of glowing light sabers or industrial laser pointers, showing different facial expressions from neutral to winking." className="w-full h-full object-contain mix-blend-multiply" src="./images/mascot/brand-portal/5吉祥物与激光剑组合示例 1.jpg"  loading="lazy" />
</div>
<div className="bg-mascot-surface-container/30 border border-mascot-primary/10 rounded-xl p-6 md:p-8 flex items-center justify-center min-h-[250px] md:min-h-[400px]">
<img alt="Six variations of the 2D illustrated robot mascot wearing different corporate uniforms or professional attire, demonstrating the mascot's adaptability across different business units." className="w-full h-full object-contain mix-blend-multiply" src="./images/mascot/brand-portal/6吉祥物与集团各服装组合展示示例 1.jpg"  loading="lazy" />
</div>
</div>
</div>
</section>





    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   SECTION 2 — 周边礼品开发
   ══════════════════════════════════════════════════════════════ */
export function GiftDev() {
  return (
    <div>


<main className="pt-24 px-margin-mobile md:px-margin-desktop max-w-[1100px] mx-auto">
{/* Header Section */}
<section className="mb-20">
<div className="mb-4">
<span className="technical-tag">ARCHIVE // INDEX.001</span>
</div>
<h1 className="text-[clamp(40px,10vw,80px)] leading-[0.9] font-black tracking-tighter mb-8 md:mb-12 max-w-4xl">
                AVANT-GARDE<br/>MERCH DEVELOPMENT
            </h1>
{/* 2x2 Hero Grid */}
<div className="grid grid-cols-2 gap-4">
<div className="img-container aspect-video">
<img alt="Archive View 01" className="w-full h-full object-cover" src="./images/mascot/img_22.jpg" loading="lazy" />
</div>
<div className="img-container aspect-video">
<img alt="Archive View 02" className="w-full h-full object-cover" src="./images/mascot/img_48.jpg" loading="lazy" />
</div>
<div className="img-container aspect-video">
<img alt="Archive View 03" className="w-full h-full object-cover" src="./images/mascot/img_16.jpg" loading="lazy" />
</div>
<div className="img-container aspect-video">
<img alt="Archive View 04" className="w-full h-full object-cover" src="./images/mascot/img_50.jpg" loading="lazy" />
</div>
</div>
</section>
{/* Manual Section */}
<section className="folder-module">
<div className="flex justify-between items-end mb-8">
<div>
<span className="technical-tag">DOCUMENTATION.SYS</span>
<h2 className="text-3xl font-bold mt-2">小族礼品手册</h2>
</div>
<div className="text-right">
<span className="text-xs text-mascot-on-surface-variant label-tracking">REF: LITTLE_H_MANUAL_v1.0</span>
</div>
</div>
<div className="grid grid-cols-2 gap-gutter">
<div className="img-container">
<img alt="Manual Cover" className="w-full h-auto block" src="./images/mascot/gift-dev/大族激光礼品本 25-12-5_画板 1 1.jpg" loading="lazy" />
</div>
<div className="img-container">
<img alt="Manual Contents" className="w-full h-auto block" src="./images/mascot/gift-dev/大族激光礼品本 25-12-5_画板 1 副本 2 1.jpg" loading="lazy" />
</div>
</div>
</section>
{/* Section 1: Product Index [01-06] */}
<section className="folder-module">
<div className="flex justify-between items-end mb-8">
<div>
<span className="technical-tag">ARCHIVE.SECTION_01</span>
</div>
</div>
<div className="grid grid-cols-1 gap-gutter">
<div className="img-container">
<img alt="Products 01-02" className="w-full h-auto block" src="./images/mascot/gift-dev/大族激光礼品本 25-12-5_画板 1 副本 3 1.jpg" loading="lazy" />
</div>
<div className="img-container">
<img alt="Products 03-04" className="w-full h-auto block" src="./images/mascot/gift-dev/大族激光礼品本 25-12-5_画板 1 副本 4 1.jpg" loading="lazy" />
</div>
<div className="img-container">
<img alt="Products 05-06" className="w-full h-auto block" src="./images/mascot/gift-dev/大族激光礼品本 25-12-5_画板 1 副本 5 1.jpg" loading="lazy" />
</div>
</div>
</section>
{/* Section 2: Product Index [07-12] */}
<section className="folder-module">
<div className="flex justify-between items-end mb-8">
<div>
<span className="technical-tag">ARCHIVE.SECTION_02</span>
</div>
</div>
<div className="grid grid-cols-1 gap-gutter">
<div className="img-container">
<img alt="Products 07-08" className="w-full h-auto block" src="./images/mascot/gift-dev/大族激光礼品本 25-12-5_画板 1 副本 6 1.jpg" loading="lazy" />
</div>
<div className="img-container">
<img alt="Products 09-10" className="w-full h-auto block" src="./images/mascot/gift-dev/大族激光礼品本 25-12-5_画板 1 副本 7 1.jpg" loading="lazy" />
</div>
<div className="img-container">
<img alt="Products 11-12" className="w-full h-auto block" src="./images/mascot/gift-dev/大族激光礼品本 25-12-5_画板 1 副本 10 1.jpg" loading="lazy" />
</div>
</div>
</section>
{/* Section 3: Product Index [13-18] */}
<section className="folder-module">
<div className="flex justify-between items-end mb-8">
<div>
<span className="technical-tag">ARCHIVE.SECTION_03</span>
</div>
</div>
<div className="grid grid-cols-1 gap-gutter">
<div className="img-container">
<img alt="Products 13-14" className="w-full h-auto block" src="./images/mascot/gift-dev/大族激光礼品本 25-12-5_画板 1 副本 11 1.jpg" loading="lazy" />
</div>
<div className="img-container">
<img alt="Products 15-16" className="w-full h-auto block" src="./images/mascot/gift-dev/大族激光礼品本 25-12-5_画板 1 副本 12 1.jpg" loading="lazy" />
</div>
<div className="img-container">
<img alt="Products 17-18" className="w-full h-auto block" src="./images/mascot/gift-dev/大族激光礼品本 25-12-5_画板 1 副本 13 1.jpg" loading="lazy" />
</div>
</div>
</section>
</main>

    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   SECTION 3 — 日历开发
   ══════════════════════════════════════════════════════════════ */
export function CalendarDev() {
  return (
    <div>

{/* Ambient Background Elements */}
<div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
<div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-mascot-primary/5 rounded-full blur-[120px]"></div>
<div className="absolute bottom-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-mascot-surface-variant/20 rounded-full blur-[100px]"></div>
{/* Grid pattern overlay */}
<div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(#0035c5 1px, transparent 1px), linear-gradient(to right, #0035c5 1px, transparent 1px)", backgroundSize: "40px 40px" }}></div>
</div>

{/* Main Content Canvas */}
<main className="flex-grow pt-32 pb-24 z-10 relative max-w-[1100px] mx-auto">
{/* HERO SECTION */}
<section className="px-margin-mobile md:px-margin-desktop mb-32 grid grid-cols-12 gap-gutter relative">
<div className="col-span-12 lg:col-span-8 flex flex-col justify-end pb-12 z-20">
<div className="flex items-center gap-4 mb-6">
<span className="px-3 py-1 bg-mascot-primary/10 text-mascot-primary font-label-mono text-label-mono rounded-full flex items-center gap-2">
<span className="w-2 h-2 bg-mascot-primary rounded-full"></span>
                        ARCHIVAL_ENTRY: 小族系列日历开发
                    </span>
<span className="text-mascot-outline font-label-mono text-label-mono">REV_01</span>
</div>
<h1 className="font-display-xl text-[clamp(48px,12vw,120px)] leading-[0.85] md:leading-[100px] tracking-tighter mb-4 mix-blend-multiply">
                    CALENDAR<br /><span className="text-mascot-primary">/ 2026</span>
</h1>
<p className="font-body-md text-body-md text-mascot-on-surface-variant max-w-xl">
                    A clinical-futuristic synthesis of corporate identity and functional timekeeping. The 2026 Mascot Calendar project transforms the 'Little H' IP into a series of technical dioramas, bridging industrial precision with festive narrative.
                </p>
</div>
<div className="col-span-12 lg:col-span-4 relative h-[50vh] md:h-[60vh] min-h-[280px] md:min-h-[500px]">
<div className="absolute inset-0 glass-panel ambient-shadow rounded-xl overflow-hidden flex items-center justify-center p-6 transform rotate-2 hover:rotate-0 transition-transform duration-700">
<img alt="Year of the Horse Cover" className="w-full h-auto object-cover rounded shadow-lg mix-blend-multiply opacity-90" src="./images/mascot/img_57.jpg"  loading="lazy" />
</div>
{/* Technical corner markers */}
<div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-mascot-primary/40"></div>
<div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-mascot-primary/40"></div>
</div>
</section>
{/* SECTION 1: Design Narrative */}
<section className="px-margin-mobile md:px-margin-desktop mb-32">
<div className="grid grid-cols-12 gap-gutter">
<div className="col-span-12 lg:col-span-4">
<h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-mascot-on-surface mb-6">
                        设计理念<br /><span className="text-mascot-primary text-3xl md:text-5xl">NARRATIVE</span>
</h2>
</div>
<div className="col-span-12 lg:col-span-8 flex flex-col justify-center">
<div className="tech-line w-full mb-8"></div>
<p className="font-body-md text-body-md text-mascot-on-surface-variant columns-1 md:columns-2 gap-12">
                        2026年日历设计以“小族”（Little H）为核心视觉锚点，将这一工业机器人的拟人化形象置入十二个精密构筑的独立场景中。设计摒弃了传统节庆的冗余装饰，采用大面积留白与系统化的网格布局，旨在呈现一种“档案陈列室”般的高级感。每个月份不仅是时间的刻度，更是大族激光工业美学与品牌温情的交汇点。我们通过结构化的图文排版、技术感强烈的无衬线字体以及品牌标准蓝色的克制运用，确保整套日历在保持高度专业性的同时，传达出吉祥物独有的亲和力。
                    </p>
</div>
</div>
</section>
{/* SECTION 2: The 12 Months Grid */}
<section className="px-margin-mobile md:px-margin-desktop mb-32">
<div className="flex items-center justify-between mb-12 tech-line pb-4">
<h3 className="font-headline-lg-mobile text-headline-lg-mobile text-mascot-on-surface">THE 12 MONTHS</h3>
<span className="font-label-mono text-label-mono text-mascot-primary bg-mascot-primary/10 px-4 py-2 rounded-full">GRID_VIEW: ENABLED</span>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter">
{/* Grid Items (Months) */}
{/* Jan */}
<div className="glass-panel p-4 rounded-xl ambient-shadow group">
<div className="flex justify-between items-start mb-4">
<span className="font-label-mono text-label-mono text-mascot-outline group-hover:text-mascot-primary transition-colors">01 / JAN</span>
<span className="material-symbols-outlined text-mascot-primary text-sm opacity-50">calendar_month</span>
</div>
<img alt="January Calendar Page" className="w-full h-auto object-cover rounded opacity-90 group-hover:opacity-100 transition-opacity grayscale-[20%] group-hover:grayscale-0" src="./images/mascot/img_05.jpg"  loading="lazy" />
</div>
{/* Feb */}
<div className="glass-panel p-4 rounded-xl ambient-shadow group mt-0 lg:mt-8">
<div className="flex justify-between items-start mb-4">
<span className="font-label-mono text-label-mono text-mascot-outline group-hover:text-mascot-primary transition-colors">02 / FEB</span>
<span className="material-symbols-outlined text-mascot-primary text-sm opacity-50">calendar_month</span>
</div>
<img alt="February Calendar Page" className="w-full h-auto object-cover rounded opacity-90 group-hover:opacity-100 transition-opacity grayscale-[20%] group-hover:grayscale-0" src="./images/mascot/img_11.jpg"  loading="lazy" />
</div>
{/* Mar */}
<div className="glass-panel p-4 rounded-xl ambient-shadow group">
<div className="flex justify-between items-start mb-4">
<span className="font-label-mono text-label-mono text-mascot-outline group-hover:text-mascot-primary transition-colors">03 / MAR</span>
<span className="material-symbols-outlined text-mascot-primary text-sm opacity-50">calendar_month</span>
</div>
<img alt="March Calendar Page" className="w-full h-auto object-cover rounded opacity-90 group-hover:opacity-100 transition-opacity grayscale-[20%] group-hover:grayscale-0" src="./images/mascot/img_34.jpg"  loading="lazy" />
</div>
{/* Apr */}
<div className="glass-panel p-4 rounded-xl ambient-shadow group mt-0 lg:mt-16">
<div className="flex justify-between items-start mb-4">
<span className="font-label-mono text-label-mono text-mascot-outline group-hover:text-mascot-primary transition-colors">04 / APR</span>
<span className="material-symbols-outlined text-mascot-primary text-sm opacity-50">calendar_month</span>
</div>
<img alt="April Calendar Page" className="w-full h-auto object-cover rounded opacity-90 group-hover:opacity-100 transition-opacity grayscale-[20%] group-hover:grayscale-0" src="./images/mascot/img_44.jpg"  loading="lazy" />
</div>
{/* Repeat for remaining months */}
<div className="glass-panel p-4 rounded-xl ambient-shadow group"><img alt="May" className="w-full h-auto object-cover rounded" src="./images/mascot/img_14.jpg"  loading="lazy" /><div className="mt-2 font-label-mono text-label-mono text-center">05 / MAY</div></div>
<div className="glass-panel p-4 rounded-xl ambient-shadow group"><img alt="Jun" className="w-full h-auto object-cover rounded" src="./images/mascot/img_33.jpg"  loading="lazy" /><div className="mt-2 font-label-mono text-label-mono text-center">06 / JUN</div></div>
<div className="glass-panel p-4 rounded-xl ambient-shadow group"><img alt="Jul" className="w-full h-auto object-cover rounded" src="./images/mascot/img_25.jpg"  loading="lazy" /><div className="mt-2 font-label-mono text-label-mono text-center">07 / JUL</div></div>
<div className="glass-panel p-4 rounded-xl ambient-shadow group"><img alt="Aug" className="w-full h-auto object-cover rounded" src="./images/mascot/img_20.jpg"  loading="lazy" /><div className="mt-2 font-label-mono text-label-mono text-center">08 / AUG</div></div>
<div className="glass-panel p-4 rounded-xl ambient-shadow group"><img alt="Sep" className="w-full h-auto object-cover rounded" src="./images/mascot/img_10.jpg"  loading="lazy" /><div className="mt-2 font-label-mono text-label-mono text-center">09 / SEP</div></div>
<div className="glass-panel p-4 rounded-xl ambient-shadow group"><img alt="Oct" className="w-full h-auto object-cover rounded" src="./images/mascot/img_42.jpg"  loading="lazy" /><div className="mt-2 font-label-mono text-label-mono text-center">10 / OCT</div></div>
<div className="glass-panel p-4 rounded-xl ambient-shadow group"><img alt="Nov" className="w-full h-auto object-cover rounded" src="./images/mascot/img_19.jpg"  loading="lazy" /><div className="mt-2 font-label-mono text-label-mono text-center">11 / NOV</div></div>
<div className="glass-panel p-4 rounded-xl ambient-shadow group"><img alt="Dec" className="w-full h-auto object-cover rounded" src="./images/mascot/img_35.jpg"  loading="lazy" /><div className="mt-2 font-label-mono text-label-mono text-center">12 / DEC</div></div>
</div>
</section>
{/* SECTION 3 & 4: Supplementary & Specs (Bento Layout) */}
<section className="px-margin-mobile md:px-margin-desktop">
<div className="grid grid-cols-12 gap-gutter">
{/* Corporate Vision Block */}
<div className="col-span-12 lg:col-span-8 glass-panel rounded-xl p-8 flex flex-col relative overflow-hidden">
<div className="absolute top-0 right-0 p-4 opacity-10">
<span className="material-symbols-outlined text-[100px]" style={{ fontVariationSettings: "'FILL' 1" }}>corporate_fare</span>
</div>
<h3 className="font-headline-lg-mobile text-headline-lg-mobile text-mascot-on-surface mb-6 z-10">CORPORATE &amp; VISION</h3>
<div className="grid grid-cols-2 gap-4 z-10">
<img alt="Corporate Profile" className="w-full h-full object-cover rounded shadow-sm" src="./images/mascot/img_53.jpg"  loading="lazy" />
<img alt="R&amp;D Status" className="w-full h-full object-cover rounded shadow-sm" src="./images/mascot/img_04.jpg"  loading="lazy" />
</div>
<p className="font-body-md text-body-md text-mascot-on-surface-variant mt-6 z-10">
                        辅助页面设计延续了主体的技术冷峻风格。企业简述（Corporate Profile）与研发动态（R&amp;D Status）页面通过信息图表化处理，将繁杂的文本转化为易于扫描的模块。
                    </p>
</div>
{/* Technical Specs Block */}
<div className="col-span-12 lg:col-span-4 bg-mascot-surface-container-low border border-mascot-primary/10 rounded-xl p-8 flex flex-col">
<h3 className="font-label-mono text-label-mono text-mascot-primary mb-6 flex items-center gap-2">
<span className="material-symbols-outlined text-sm">precision_manufacturing</span>
                        TECHNICAL_SPECS
                    </h3>
<ul className="space-y-4 font-label-mono text-label-mono text-mascot-on-surface-variant">
<li className="flex justify-between border-b border-mascot-primary/5 pb-2">
<span className="">DIMENSIONS</span>
<span className="text-mascot-on-surface">210 x 285 mm</span>
</li>
<li className="flex justify-between border-b border-mascot-primary/5 pb-2">
<span className="">PAPER_STOCK</span>
<span className="text-mascot-on-surface">250g Art Paper (Matte)</span>
</li>
<li className="flex justify-between border-b border-mascot-primary/5 pb-2">
<span className="">BINDING</span>
<span className="text-mascot-on-surface">Wire-O (Silver)</span>
</li>
<li className="flex flex-col gap-2 mt-4">
<span className="">BRAND_COLORS</span>
<div className="flex gap-2">
<div className="w-8 h-8 bg-[#0047ff] rounded-sm" title="Electric Blue"></div>
<div className="w-8 h-8 bg-[#e60012] rounded-sm" title="Brand Red"></div>
<div className="w-8 h-8 bg-[#ffffff] border border-mascot-outline/20 rounded-sm" title="Pure White"></div>
<div className="w-8 h-8 bg-[#191c1e] rounded-sm" title="Onyx Black"></div>
</div>
</li>
</ul>
<div className="mt-auto pt-8">
<img alt="New Year Greetings" className="w-full h-auto rounded border border-mascot-primary/10 mix-blend-multiply" src="./images/mascot/img_55.jpg"  loading="lazy" />
</div>
</div>
</div>
</section>
</main>



    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   SECTION 4 — 马年表情包
   ══════════════════════════════════════════════════════════════ */
export function EmojiPack() {
  return (
    <div>


<main className="pt-[80px]">
{/* 1. Hero Section */}
<section className="relative min-h-[90vh] flex items-center px-margin-mobile md:px-margin-desktop py-24 max-w-[1100px] mx-auto overflow-hidden">
{/* Asymmetrical Grid Background Elements */}
<div className="absolute top-1/4 left-[10%] w-[1px] h-[50vh] bg-mascot-primary/10"></div>
<div className="absolute top-1/3 right-[20%] w-[1px] h-[30vh] bg-mascot-primary/10"></div>
<div className="grid grid-cols-1 md:grid-cols-12 gap-gutter w-full z-10 relative">
{/* Large Typography Left */}
<div className="md:col-span-5 flex flex-col justify-center order-2 md:order-1 relative z-20">
<div className="inline-flex items-center gap-2 mb-6 border border-mascot-primary rounded-full px-4 py-1 w-fit bg-mascot-surface-container-lowest/80 backdrop-blur-sm">
<span className="w-2 h-2 rounded-full bg-mascot-primary animate-pulse"></span>
<span className="font-label-mono text-label-mono text-mascot-primary uppercase">SYS.INIT.2026</span>
</div>
<h1 className="font-display-xl text-[80px] md:text-display-xl text-mascot-primary leading-none tracking-tighter mb-4 mix-blend-multiply">
                        2026<br />
<span className="text-mascot-on-surface">马年</span>
</h1>
<p className="font-body-md text-mascot-on-surface-variant max-w-md mt-6">
                        XIAOZU MASCOT IDENTITY UPDATE. INTEGRATING TRADITIONAL CHINESE ZODIAC AESTHETICS WITH HIGH-TECH ROBOTICS IP. THE "YEAR OF THE HORSE" PROTOCOL.
                    </p>
</div>
{/* Hero Image Center/Right offset */}
<div className="md:col-span-7 relative h-[50vh] md:h-[70vh] order-1 md:order-2 flex items-center justify-center md:justify-end">
{/* Glass panel backing */}
<div className="absolute inset-0 md:inset-auto md:w-3/4 md:h-full right-0 glass-panel -z-10 rounded-2xl transform md:translate-x-[20px] md:translate-y-[20px]"></div>
<img alt="Xiaozu mascot banner" className="w-full h-full object-contain md:object-cover rounded-xl shadow-2xl relative z-10" src="./images/mascot/emoji-pack/吉祥物表情包(4期-祝福)-banner 1.jpg"  loading="lazy" />
{/* Vertical Technical Label */}
<div className="absolute -right-12 top-1/2 -translate-y-1/2 hidden md:block">
<span className="font-label-vertical text-label-vertical text-mascot-primary text-vertical uppercase tracking-widest">
                            MODEL.XIAOZU // VER.26
                        </span>
</div>
</div>
</div>
</section>
{/* 3. Emoji Archive Grid */}
<section className="py-32 px-margin-mobile md:px-margin-desktop bg-mascot-surface-bright relative border-t border-mascot-primary/10">
{/* Background Typography watermark */}
<div className="absolute inset-0 overflow-hidden pointer-events-none z-0 flex items-center justify-center opacity-5">
<span className="font-display-xl text-[20vw] text-mascot-primary whitespace-nowrap">EMOJI ARCHIVE</span>
</div>
<div className="max-w-[1100px] mx-auto relative z-10">
<div className="flex justify-between items-end mb-16">
<div>
<div className="inline-flex items-center gap-2 mb-4 border border-mascot-primary/30 rounded-full px-3 py-1">
<span className="font-label-mono text-label-mono text-mascot-primary">DATABASE.QUERY</span>
</div>
<h2 className="font-headline-lg-mobile md:font-headline-lg text-mascot-on-surface tracking-tight">
                            DATA STREAM
                        </h2>
</div>
<span className="font-label-mono text-label-mono text-mascot-on-surface-variant hidden md:block">20 ASSETS LOADED</span>
</div>
{/* Asymmetric Masonry-style Grid (simulated with standard grid and spanning) */}
<div className="grid grid-cols-4 md:grid-cols-12 gap-4 md:gap-6">
  {/* Featured 1 (4x4) */}
  <div className="flex flex-col gap-2 group md:col-span-4 md:row-span-4">
    <div className="glass-panel rounded-lg overflow-hidden relative h-full p-6 flex items-center justify-center hover:border-mascot-primary/80 transition-colors border-mascot-primary/30">
      <div className="absolute top-4 left-4 font-label-mono text-label-mono text-mascot-primary border border-mascot-primary px-2 rounded-sm">FEATURED</div>
      <img alt="Emoji: 节日快乐" className="w-3/4 h-3/4 object-contain transform group-hover:scale-105 transition-transform duration-500" src="./images/mascot/emoji-pack/节日快乐 1.jpg"  loading="lazy" />
    </div>
    <div className="flex justify-center items-center px-1">
      <span className="font-label-mono text-[10px] text-mascot-on-surface-variant">节日快乐</span>
    </div>
  </div>

  {/* Standard 1 (2x2) */}
  <div className="flex flex-col gap-2 group md:col-span-2 md:row-span-2">
    <div className="glass-panel rounded-lg overflow-hidden relative aspect-square p-4 flex items-center justify-center hover:border-mascot-primary/50 transition-colors">
      <img alt="Emoji: 八方来财" className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-300" src="./images/mascot/emoji-pack/八方来财 1.jpg"  loading="lazy" />
    </div>
    <div className="flex justify-center items-center px-1">
      <span className="font-label-mono text-[10px] text-mascot-on-surface-variant">八方来财</span>
    </div>
  </div>

  {/* Standard 2 (2x2) */}
  <div className="flex flex-col gap-2 group md:col-span-2 md:row-span-2">
    <div className="glass-panel rounded-lg overflow-hidden relative aspect-square p-4 flex items-center justify-center hover:border-mascot-primary/50 transition-colors">
      <img alt="Emoji: 多才多艺" className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-300" src="./images/mascot/emoji-pack/多才多艺 1.jpg"  loading="lazy" />
    </div>
    <div className="flex justify-center items-center px-1">
      <span className="font-label-mono text-[10px] text-mascot-on-surface-variant">多才多艺</span>
    </div>
  </div>

  {/* Standard 3 (2x2) */}
  <div className="flex flex-col gap-2 group md:col-span-2 md:row-span-2">
    <div className="glass-panel rounded-lg overflow-hidden relative aspect-square p-4 flex items-center justify-center hover:border-mascot-primary/50 transition-colors">
      <img alt="Emoji: 多财多亿" className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-300" src="./images/mascot/emoji-pack/多财多亿 1.jpg"  loading="lazy" />
    </div>
    <div className="flex justify-center items-center px-1">
      <span className="font-label-mono text-[10px] text-mascot-on-surface-variant">多财多亿</span>
    </div>
  </div>

  {/* Standard 4 (2x2) */}
  <div className="flex flex-col gap-2 group md:col-span-2 md:row-span-2">
    <div className="glass-panel rounded-lg overflow-hidden relative aspect-square p-4 flex items-center justify-center hover:border-mascot-primary/50 transition-colors bg-mascot-primary/5">
      <img alt="Emoji: 高瞻远瞩" className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-300" src="./images/mascot/emoji-pack/高瞻远瞩 1.jpg"  loading="lazy" />
    </div>
    <div className="flex justify-center items-center px-1">
      <span className="font-label-mono text-[10px] text-mascot-on-surface-variant">高瞻远瞩</span>
    </div>
  </div>

  {/* Featured 2 (4x4) */}
  <div className="flex flex-col gap-2 group md:col-span-4 md:row-span-4">
    <div className="glass-panel rounded-lg overflow-hidden relative h-full p-6 flex items-center justify-center hover:border-mascot-primary/80 transition-colors border-mascot-primary/30">
      <div className="absolute top-4 left-4 font-label-mono text-label-mono text-mascot-primary border border-mascot-primary px-2 rounded-sm">FEATURED</div>
      <img alt="Emoji: 开足马力" className="w-3/4 h-3/4 object-contain transform group-hover:scale-105 transition-transform duration-500" src="./images/mascot/emoji-pack/开足马力 1.jpg"  loading="lazy" />
    </div>
    <div className="flex justify-center items-center px-1">
      <span className="font-label-mono text-[10px] text-mascot-on-surface-variant">开足马力</span>
    </div>
  </div>

  {/* Standard 5 (2x2) */}
  <div className="flex flex-col gap-2 group md:col-span-2 md:row-span-2">
    <div className="glass-panel rounded-lg overflow-hidden relative aspect-square p-4 flex items-center justify-center hover:border-mascot-primary/50 transition-colors">
      <img alt="Emoji: 龙马精神" className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-300" src="./images/mascot/emoji-pack/龙马精神 1.jpg"  loading="lazy" />
    </div>
    <div className="flex justify-center items-center px-1">
      <span className="font-label-mono text-[10px] text-mascot-on-surface-variant">龙马精神</span>
    </div>
  </div>

  {/* Standard 6 (2x2) */}
  <div className="flex flex-col gap-2 group md:col-span-2 md:row-span-2">
    <div className="glass-panel rounded-lg overflow-hidden relative aspect-square p-4 flex items-center justify-center hover:border-mascot-primary/50 transition-colors">
      <img alt="Emoji: 稳了稳了/马到成功" className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-300" src="./images/mascot/emoji-pack/马到成功 1.jpg"  loading="lazy" />
    </div>
    <div className="flex justify-center items-center px-1">
      <span className="font-label-mono text-[10px] text-mascot-on-surface-variant">马到成功</span>
    </div>
  </div>

  {/* Standard 7 (2x2) */}
  <div className="flex flex-col gap-2 group md:col-span-2 md:row-span-2">
    <div className="glass-panel rounded-lg overflow-hidden relative aspect-square p-4 flex items-center justify-center hover:border-mascot-primary/50 transition-colors">
      <img alt="Emoji: 金榜题名/高考加油" className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-300" src="./images/mascot/emoji-pack/金榜题名 1.jpg"  loading="lazy" />
    </div>
    <div className="flex justify-center items-center px-1">
      <span className="font-label-mono text-[10px] text-mascot-on-surface-variant">金榜题名</span>
    </div>
  </div>

  {/* Standard 8 (2x2) */}
  <div className="flex flex-col gap-2 group md:col-span-2 md:row-span-2">
    <div className="glass-panel rounded-lg overflow-hidden relative aspect-square p-4 flex items-center justify-center hover:border-mascot-primary/50 transition-colors">
      <img alt="Emoji: 平安喜乐" className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-300" src="./images/mascot/emoji-pack/平安喜乐 1.jpg"  loading="lazy" />
    </div>
    <div className="flex justify-center items-center px-1">
      <span className="font-label-mono text-[10px] text-mascot-on-surface-variant">平安喜乐</span>
    </div>
  </div>

  {/* Featured 3 (4x4) */}
  <div className="flex flex-col gap-2 group md:col-span-4 md:row-span-4">
    <div className="glass-panel rounded-lg overflow-hidden relative h-full p-6 flex items-center justify-center hover:border-mascot-primary/80 transition-colors border-mascot-primary/30">
      <div className="absolute top-4 left-4 font-label-mono text-label-mono text-mascot-primary border border-mascot-primary px-2 rounded-sm">FEATURED</div>
      <img alt="Emoji: 身体倍儿棒" className="w-3/4 h-3/4 object-contain transform group-hover:scale-105 transition-transform duration-500" src="./images/mascot/emoji-pack/身体健康 1.jpg"  loading="lazy" />
    </div>
    <div className="flex justify-center items-center px-1">
      <span className="font-label-mono text-[10px] text-mascot-on-surface-variant">身体健康</span>
    </div>
  </div>

  {/* Standard 9 (2x2) */}
  <div className="flex flex-col gap-2 group md:col-span-2 md:row-span-2">
    <div className="glass-panel rounded-lg overflow-hidden relative aspect-square p-4 flex items-center justify-center hover:border-mascot-primary/50 transition-colors">
      <img alt="Emoji: 生意兴隆" className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-300" src="./images/mascot/emoji-pack/生意兴隆 1.jpg"  loading="lazy" />
    </div>
    <div className="flex justify-center items-center px-1">
      <span className="font-label-mono text-[10px] text-mascot-on-surface-variant">生意兴隆</span>
    </div>
  </div>

  {/* Standard 10 (2x2) */}
  <div className="flex flex-col gap-2 group md:col-span-2 md:row-span-2">
    <div className="glass-panel rounded-lg overflow-hidden relative aspect-square p-4 flex items-center justify-center hover:border-mascot-primary/50 transition-colors">
      <img alt="Emoji: 岁岁平安" className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-300" src="./images/mascot/emoji-pack/岁岁平安 1.jpg"  loading="lazy" />
    </div>
    <div className="flex justify-center items-center px-1">
      <span className="font-label-mono text-[10px] text-mascot-on-surface-variant">岁岁平安</span>
    </div>
  </div>

  {/* Standard 11 (2x2) */}
  <div className="flex flex-col gap-2 group md:col-span-2 md:row-span-2">
    <div className="glass-panel rounded-lg overflow-hidden relative aspect-square p-4 flex items-center justify-center hover:border-mascot-primary/50 transition-colors">
      <img alt="Emoji: 万事如意" className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-300" src="./images/mascot/emoji-pack/万事如意 1.jpg"  loading="lazy" />
    </div>
    <div className="flex justify-center items-center px-1">
      <span className="font-label-mono text-[10px] text-mascot-on-surface-variant">万事如意</span>
    </div>
  </div>

  {/* Standard 12 (2x2) */}
  <div className="flex flex-col gap-2 group md:col-span-2 md:row-span-2">
    <div className="glass-panel rounded-lg overflow-hidden relative aspect-square p-4 flex items-center justify-center hover:border-mascot-primary/50 transition-colors">
      <img alt="Emoji: 五福临门" className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-300" src="./images/mascot/emoji-pack/五福临门 1.jpg"  loading="lazy" />
    </div>
    <div className="flex justify-center items-center px-1">
      <span className="font-label-mono text-[10px] text-mascot-on-surface-variant">五福临门</span>
    </div>
  </div>

  {/* Standard 13 (2x2) */}
  <div className="flex flex-col gap-2 group md:col-span-2 md:row-span-2">
    <div className="glass-panel rounded-lg overflow-hidden relative aspect-square p-4 flex items-center justify-center hover:border-mascot-primary/50 transition-colors">
      <img alt="Emoji: 心想事成" className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-300" src="./images/mascot/emoji-pack/心想事成 1.jpg"  loading="lazy" />
    </div>
    <div className="flex justify-center items-center px-1">
      <span className="font-label-mono text-[10px] text-mascot-on-surface-variant">心想事成</span>
    </div>
  </div>

  {/* Standard 14 (2x2) */}
  <div className="flex flex-col gap-2 group md:col-span-2 md:row-span-2">
    <div className="glass-panel rounded-lg overflow-hidden relative aspect-square p-4 flex items-center justify-center hover:border-mascot-primary/50 transition-colors">
      <img alt="Emoji: 一路平安" className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-300" src="./images/mascot/emoji-pack/一路平安 1.jpg"  loading="lazy" />
    </div>
    <div className="flex justify-center items-center px-1">
      <span className="font-label-mono text-[10px] text-mascot-on-surface-variant">一路平安</span>
    </div>
  </div>

  {/* Standard 15 (2x2) */}
  <div className="flex flex-col gap-2 group md:col-span-2 md:row-span-2">
    <div className="glass-panel rounded-lg overflow-hidden relative aspect-square p-4 flex items-center justify-center hover:border-mascot-primary/50 transition-colors">
      <img alt="Emoji: 再来一单" className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-300" src="./images/mascot/emoji-pack/再来一单 1.jpg"  loading="lazy" />
    </div>
    <div className="flex justify-center items-center px-1">
      <span className="font-label-mono text-[10px] text-mascot-on-surface-variant">再来一单</span>
    </div>
  </div>

  {/* Standard 16 (2x2) */}
  <div className="flex flex-col gap-2 group md:col-span-2 md:row-span-2">
    <div className="glass-panel rounded-lg overflow-hidden relative aspect-square p-4 flex items-center justify-center hover:border-mascot-primary/50 transition-colors">
      <img alt="Emoji: 蒸蒸日上" className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-300" src="./images/mascot/emoji-pack/蒸蒸日上 1.jpg"  loading="lazy" />
    </div>
    <div className="flex justify-center items-center px-1">
      <span className="font-label-mono text-[10px] text-mascot-on-surface-variant">蒸蒸日上</span>
    </div>
  </div>

  {/* Standard 17 (2x2) */}
  <div className="flex flex-col gap-2 group md:col-span-2 md:row-span-2">
    <div className="glass-panel rounded-lg overflow-hidden relative aspect-square p-4 flex items-center justify-center hover:border-mascot-primary/50 transition-colors">
      <img alt="Emoji: 鸿运当头" className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-300" src="./images/mascot/emoji-pack/鸿运当头 1.jpg"  loading="lazy" />
    </div>
    <div className="flex justify-center items-center px-1">
      <span className="font-label-mono text-[10px] text-mascot-on-surface-variant">鸿运当头</span>
    </div>
  </div>
</div>
</div>
</section>
{/* 4. Blind Box & Merch Showcase */}
<section className="py-32 px-margin-mobile md:px-margin-desktop max-w-[1100px] mx-auto border-t border-mascot-primary/10">
<div className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-16">
<div className="md:col-span-8 flex flex-col justify-end">
<h2 className="font-headline-lg-mobile md:font-headline-lg text-mascot-on-surface tracking-tighter leading-tight">
                        PHYSICAL<br />DEPLOYMENT
                    </h2>
</div>
<div className="md:col-span-4 flex items-end">
<p className="font-body-md text-mascot-on-surface-variant border-l-2 border-mascot-primary pl-4 py-2">
                        Translating digital IP into premium tactile experiences. The 2026 limited edition blind box series and corporate merchandise sets.
                    </p>
</div>
</div>
{/* Bento Grid layout for Merch */}
<div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 h-auto">
{/* Main Feature Box */}
<div className="md:col-span-8 glass-panel rounded-2xl overflow-hidden relative group">
<div className="absolute inset-0 bg-gradient-to-t from-mascot-surface-container-lowest via-transparent to-transparent z-10 pointer-events-none"></div>
<img alt="Premium 3D render of a festive Xiaozu blind box figure, styled with Chinese New Year motifs in a high-tech finish." className="w-full h-auto block" src="./images/mascot/blind-box/gemini-3-pro-image-preview-2k (nano-banana-pro)_a_根据形象设计盲盒，要以中国春节，发财，吉 (1) 2.jpg" />
<div className="absolute bottom-0 left-0 p-8 z-20 w-full flex justify-between items-end">
<div>
<span className="font-label-mono text-label-mono text-mascot-primary block mb-2">MERCH.SERIES_A</span>
<h3 className="font-headline-lg-mobile text-[32px] text-mascot-on-surface leading-none">BLIND BOX<br />COLLECTION</h3>
</div>
<button className="border border-mascot-on-surface text-mascot-on-surface hover:bg-mascot-on-surface hover:text-mascot-surface-container-lowest font-label-mono px-4 py-2 rounded-sm transition-colors">VIEW SPEC</button>
</div>
</div>
{/* Right Column — GIFT SET top, FIG.01 bottom (flush with blind box bottom) */}
<div className="md:col-span-4 flex flex-col gap-4 md:gap-8">
<div className="glass-panel rounded-2xl overflow-hidden relative group">
<img alt="GIFT SET — two mango mascot figures" className="w-full h-auto block" src="./images/mascot/blind-box/gemini-3-pro-image-preview-2k (nano-banana-pro)_a_根据形象设计盲盒，要以中国春节，发财，吉 (2) 2.jpg"  loading="lazy" />
</div>
<div className="glass-panel rounded-2xl overflow-hidden relative group mt-auto">
<img alt="Secondary render of Xiaozu blind box figure focusing on detailed textures and festive coloring." className="w-full h-auto block" src="./images/mascot/blind-box/gemini-3-pro-image-preview-2k (nano-banana-pro)_a_根据形象设计盲盒，要以中国春节，发财，吉 (2) 1.jpg"  loading="lazy" />
</div>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mt-8">
<div className="glass-panel rounded-2xl overflow-hidden relative group">
<img alt="Additional blind box variations" className="w-full h-auto block" src="./images/mascot/blind-box/gemini-3-pro-image-preview-2k (nano-banana-pro)_a_根据形象设计盲盒，要以中国春节，发财，吉 1.jpg"  loading="lazy" />
</div>
<div className="glass-panel rounded-2xl overflow-hidden relative group">
<img alt="Merchandise mockups" className="w-full h-auto block" src="./images/mascot/blind-box/gemini-3-pro-image-preview-2k (nano-banana-pro)_a_根据形象生成不同的样机礼盒，包括但不限于 (1) 1.jpg"  loading="lazy" />
</div>
</div></section>
</main>
{/* Footer (Shared Component translated) */}
<footer className="bg-mascot-background dark:bg-mascot-on-background w-full border-t border-mascot-outline-variant/20 py-gutter px-margin-mobile md:px-margin-desktop mt-24">
<div className="max-w-[1100px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
{/* Brand Logo / Copyright */}
<div className="flex flex-col md:flex-row items-center md:items-start gap-4">
<span className="font-label-mono text-body-md text-mascot-on-surface dark:text-mascot-on-primary-container font-black">
                    MASCOT.SYS
                </span>
<span className="font-label-mono text-[10px] text-mascot-on-surface-variant dark:text-mascot-on-tertiary-fixed-variant hidden md:inline-block">|</span>
<span className="font-label-mono text-[10px] text-mascot-on-surface-variant dark:text-mascot-on-tertiary-fixed-variant text-center md:text-left">
                    ©2026HAN'S LASER BRANDING DIV. ALL RIGHTS RESERVED.
                </span>
</div>
{/* Footer Links */}
<div className="flex gap-6 items-center">
<a className="font-label-mono text-label-mono text-mascot-on-surface-variant dark:text-mascot-on-tertiary-fixed-variant hover:bg-mascot-primary hover:text-mascot-on-primary px-2 py-1 transition-all duration-300 opacity-80 hover:opacity-100 rounded-sm" href="#">TERMINAL</a>
<a className="font-label-mono text-label-mono text-mascot-on-surface-variant dark:text-mascot-on-tertiary-fixed-variant hover:bg-mascot-primary hover:text-mascot-on-primary px-2 py-1 transition-all duration-300 opacity-80 hover:opacity-100 rounded-sm" href="#">STREAMS</a>
<a className="font-label-mono text-label-mono text-mascot-on-surface-variant dark:text-mascot-on-tertiary-fixed-variant hover:bg-mascot-primary hover:text-mascot-on-primary px-2 py-1 transition-all duration-300 opacity-80 hover:opacity-100 rounded-sm" href="#">DECRYPT</a>
</div>
</div>
</footer>







    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   VIDEO PLAYER
   ══════════════════════════════════════════════════════════════ */
function VideoPlayer({ onClose }: { onClose: () => void }) {
  return (
    <motion.div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-8 cursor-pointer"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div className="w-full max-w-[1200px] aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl"
        initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }}
        transition={{ type: 'spring', damping: 25 }} onClick={(e) => e.stopPropagation()}>
        <video src="./videos/小族五一视频.mp4" controls className="w-full h-full object-contain" />
      </motion.div>
      <button className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
        onClick={(e) => { e.stopPropagation(); onClose(); }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
      </button>
      <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/30 text-xs font-mono">点击任意区域关闭</p>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MASCOT MODAL — Hero Video + 4 sections
   ══════════════════════════════════════════════════════════════ */

/* ══════════════════════════════════════════════════════════════
   SECTION 5 — APP 落地页
   ══════════════════════════════════════════════════════════════ */
export function AppShowcase() {
  return (
    <div>

<main className="pt-24">
{/* 1. Hero Section */}
<section className="relative min-h-[90vh] flex items-center pt-20 pb-24 overflow-hidden">
<div className="absolute inset-0 pointer-events-none overflow-hidden">
<div className="absolute top-1/4 -right-1/4 w-1/2 h-1/2 bg-mascot-primary/5 rounded-full blur-[120px]"></div>
<div className="absolute bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-mascot-primary/5 rounded-full blur-[120px]"></div>
</div>
<div className="max-w-[1100px] mx-auto px-margin-mobile md:px-gutter grid md:grid-cols-2 gap-12 items-center relative z-10">
<div className="space-y-8 max-w-2xl">
<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mascot-primary/10 border border-mascot-primary/20">
<span className="w-2 h-2 rounded-full bg-mascot-primary animate-pulse"></span>
<span className="font-label-mono text-label-mono text-mascot-primary uppercase tracking-wider">全新升级 IP形象</span>
</div>
<h1 className="font-display-xl text-display-xl text-mascot-on-surface leading-tight">
                        探索<br />
<span className="text-mascot-primary text-[88px] md:text-[96px]">小族世界</span>
</h1>
<p className="font-body-lg text-body-lg text-mascot-on-surface-variant max-w-xl">
                        Discover the avant-garde futuristic world of Han's Laser's official mascot, Xiaozu. A seamless blend of high-tech precision and friendly digital companionship.
                    </p>
<div className="flex flex-wrap items-center gap-4 pt-4">
<button className="inline-flex items-center justify-center px-8 py-4 bg-mascot-primary text-mascot-on-primary font-label-mono text-label-mono rounded-lg hover:shadow-[0_0_30px_rgba(0,102,255,0.4)] transition-all duration-300 transform hover:-translate-y-1">
                            下载体验
                        </button>
<button className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-mascot-outline-variant text-mascot-on-surface hover:border-mascot-primary hover:text-mascot-primary font-label-mono text-label-mono rounded-lg transition-all duration-300">
                            了解更多
                        </button>
</div>
</div>
<div className="relative h-[400px] sm:h-[500px] md:h-[600px] w-full flex items-center justify-center">
<div className="relative w-full h-full max-w-[280px] sm:max-w-[340px] md:max-w-[400px] mx-auto group">
<div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10 bottom-0 h-1/4"></div>
<img alt="Han's Laser Mascot Hero Image" className="w-full h-full object-contain filter drop-shadow-2xl transform group-hover:scale-105 transition-transform duration-700 ease-out z-0 relative" src="./images/mascot/app-showcase/Container-7.png" loading="lazy" />
</div>
</div>
</div>
</section>

{/* 2. App Showcase */}
<section className="py-24 relative">
<div className="max-w-[1100px] mx-auto px-margin-mobile md:px-gutter">
<div className="text-center mb-20 space-y-4">
<h2 className="font-headline-lg text-headline-lg text-mascot-on-surface">全场景智能体验</h2>
<p className="font-body-md text-body-md text-mascot-on-surface-variant max-w-2xl mx-auto">Seamlessly integrated features designed to enhance your connection with the Han's Laser ecosystem.</p>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
{/* Feature 1 */}
<div className="glass-panel rounded-xl p-8 flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-300">
<h3 className="font-headline-md text-headline-md text-mascot-on-surface mb-4">智能首页</h3>
<p className="font-body-md text-body-md text-mascot-on-surface-variant mb-8 flex-grow">Your personalized gateway to laser technology solutions and services.</p>
<div className="relative w-full aspect-[0.48] rounded-[2rem] overflow-hidden border-4 border-mascot-surface-container shadow-2xl">
<img alt="App Home Screen Showcase" className="w-full h-full object-cover" src="./images/mascot/app-showcase/Container-1.png" loading="lazy" />
</div>
</div>
{/* Feature 2 */}
<div className="glass-panel rounded-xl p-8 flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-300 md:-translate-y-8">
<h3 className="font-headline-md text-headline-md text-mascot-on-surface mb-4">便捷登录</h3>
<p className="font-body-md text-body-md text-mascot-on-surface-variant mb-8 flex-grow">Secure and fast access to your account and personalized settings.</p>
<div className="relative w-full aspect-[0.48] rounded-[2rem] overflow-hidden border-4 border-mascot-surface-container shadow-2xl">
<img alt="App Login Screen Showcase" className="w-full h-full object-cover" src="./images/mascot/app-showcase/Container-2.png" loading="lazy" />
</div>
</div>
{/* Feature 3 */}
<div className="glass-panel rounded-xl p-8 flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-300">
<h3 className="font-headline-md text-headline-md text-mascot-on-surface mb-4">个人中心</h3>
<p className="font-body-md text-body-md text-mascot-on-surface-variant mb-8 flex-grow">Manage your profile, track interactions, and customize your experience.</p>
<div className="relative w-full aspect-[0.48] rounded-[2rem] overflow-hidden border-4 border-mascot-surface-container shadow-2xl">
<img alt="App Profile Screen Showcase" className="w-full h-full object-cover" src="./images/mascot/app-showcase/Container-3.png" loading="lazy" />
</div>
</div>
</div>
</div>
</section>

{/* 3. Community & Store Bento Grid */}
<section className="py-24 bg-mascot-surface-container-low/50">
<div className="max-w-[1100px] mx-auto px-margin-mobile md:px-gutter">
<div className="grid grid-cols-1 md:grid-cols-12 gap-8 auto-rows-[minmax(300px,auto)]">
{/* Community Block */}
<div className="md:col-span-8 glass-panel rounded-xl overflow-hidden flex flex-col md:flex-row shadow-sm hover:shadow-md transition-shadow relative">
<div className="p-10 flex flex-col justify-center w-full md:w-1/2 z-10">
<span className="font-label-mono text-label-mono text-mascot-primary mb-2">COMMUNITY</span>
<h3 className="font-headline-lg text-headline-lg text-mascot-on-surface mb-4">互动社区</h3>
<p className="font-body-md text-body-md text-mascot-on-surface-variant mb-8">Join the conversation. Share your experiences, find technical support, and connect with other Han's Laser enthusiasts.</p>
<span className="inline-flex items-center text-mascot-primary font-label-mono text-label-mono">探索社区</span>
</div>
<div className="w-full md:w-1/2 relative bg-mascot-surface-variant/30 flex justify-center items-center p-8">
<div className="relative w-full max-w-[300px] aspect-[0.48] rounded-[2rem] overflow-hidden border-4 border-white shadow-xl rotate-3 hover:rotate-0 transition-transform duration-500">
<img alt="Community App Screen" className="w-full h-full object-cover" src="./images/mascot/app-showcase/Group 34.png" loading="lazy" />
</div>
</div>
</div>
{/* Rewards Block */}
<div className="md:col-span-4 glass-panel rounded-xl overflow-hidden relative flex flex-col justify-end p-8 group">
<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
<img alt="Daily Sign-in Gamification" className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" src="./images/mascot/app-showcase/Container.png" loading="lazy" />
<div className="relative z-20 text-white">
<span className="font-label-mono text-label-mono text-mascot-primary-fixed mb-2 inline-block">REWARDS</span>
<h3 className="font-headline-md text-headline-md mb-2">每日签到</h3>
<p className="font-body-md text-body-md text-white/80">Earn points and unlock exclusive mystery boxes.</p>
</div>
</div>
{/* IP Archive Block */}
<div className="md:col-span-4 glass-panel rounded-xl overflow-hidden relative flex flex-col p-8 bg-mascot-surface">
<span className="font-label-mono text-label-mono text-mascot-primary mb-2">IP ARCHIVE</span>
<h3 className="font-headline-md text-headline-md text-mascot-on-surface mb-4">大族文化</h3>
<p className="font-body-md text-body-md text-mascot-on-surface-variant mb-6">Delve into the history and lore of the Xiaozu IP.</p>
<div className="mt-auto flex justify-center">
<div className="relative w-[200px] aspect-[0.48] rounded-[1.5rem] overflow-hidden border-2 border-mascot-surface-container shadow-lg -mb-12">
<img alt="IP Archival Information Screen" className="w-full h-full object-cover" src="./images/mascot/app-showcase/Container-6.png" loading="lazy" />
</div>
</div>
</div>
{/* Store Block */}
<div className="md:col-span-8 glass-panel rounded-xl overflow-hidden flex flex-col md:flex-row-reverse shadow-sm hover:shadow-md transition-shadow">
<div className="p-10 flex flex-col justify-center w-full md:w-1/2 z-10">
<span className="font-label-mono text-label-mono text-mascot-primary mb-2">STORE</span>
<h3 className="font-headline-lg text-headline-lg text-mascot-on-surface mb-4">周边商城</h3>
<p className="font-body-md text-body-md text-mascot-on-surface-variant mb-8">Bring Xiaozu to the physical world. Shop exclusive merchandise, limited edition blind boxes, and customized apparel.</p>
<span className="inline-flex items-center text-mascot-primary font-label-mono text-label-mono">立即购买</span>
</div>
<div className="w-full md:w-1/2 relative bg-mascot-surface-variant/30 flex justify-center items-center p-8">
<div className="relative w-full max-w-[300px] aspect-[0.48] rounded-[2rem] overflow-hidden border-4 border-white shadow-xl -rotate-3 hover:rotate-0 transition-transform duration-500">
<img alt="Merchandise Store App Screen" className="w-full h-full object-cover" src="./images/mascot/app-showcase/Container-5.png" loading="lazy" />
</div>
</div>
</div>
</div>
</div>
</section>

{/* 4. Download Section */}
<section className="py-24 relative overflow-hidden bg-mascot-primary">
<div className="max-w-4xl mx-auto px-margin-mobile md:px-gutter relative z-10 text-center text-mascot-on-primary">
<h2 className="font-display-xl text-display-xl mb-6">Ready to Explore?</h2>
<p className="font-body-lg text-body-lg text-mascot-on-primary/80 mb-12 max-w-2xl mx-auto">Download the Han's Laser app today and step into the smart manufacturing future with Xiaozu as your guide.</p>
<div className="flex flex-col sm:flex-row items-center justify-center gap-6">
<button className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-white text-mascot-on-surface rounded-xl hover:scale-105 transition-transform duration-300 shadow-xl">
<div className="text-left">
<div className="font-label-mono text-[10px] uppercase tracking-wider text-mascot-on-surface-variant">Download on the</div>
<div className="font-headline-md text-[20px] leading-none mt-1">App Store</div>
</div>
</button>
<button className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-white text-mascot-on-surface rounded-xl hover:scale-105 transition-transform duration-300 shadow-xl">
<div className="text-left">
<div className="font-label-mono text-[10px] uppercase tracking-wider text-mascot-on-surface-variant">Get it on</div>
<div className="font-headline-md text-[20px] leading-none mt-1">Google Play</div>
</div>
</button>
</div>
</div>
</section>
</main>

    </div>
  );
}

export function MascotModal({ onClose }: { onClose: () => void }) {
  const [videoOpen, setVideoOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div ref={containerRef} className="fixed inset-0 z-[90] bg-white overflow-y-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ background: '#ffffff' }}>
      {/* Close bar */}
      <div className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 py-4 backdrop-blur-md border-b border-white/10"
        style={{ background: 'rgba(255,255,255,0.85)' }}>
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-black/5 hover:bg-black/10 transition-colors cursor-pointer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
            <span className="text-[11px] font-medium hidden sm:inline">返回主页</span>
          </button>
          <span className="text-xs font-mono text-black/30 tracking-wider">PROJECT 01 · 集团吉祥物IP</span>
        </div>
        <button onClick={onClose} className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10 transition-colors">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
        </button>
      </div>

      {/* ═══════ HERO (VIDEO BACKGROUND - KEPT) ═══════ */}
      <div className="relative min-h-screen overflow-hidden">
        <video src="./videos/小族_opt.mp4" muted loop autoPlay playsInline
          className="absolute inset-0 w-full h-full object-cover" style={{ filter: 'brightness(0.45)' }} />
        <div className="absolute inset-x-0 top-0 h-[30%] bg-gradient-to-b from-black/40 to-transparent z-0" />
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6 pt-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <span className="text-[10px] font-mono text-white/30 tracking-[0.3em] uppercase">Mascot IP</span>
            <h2 className="text-[clamp(36px,7vw,72px)] font-black tracking-tight text-white mt-3">集团吉祥物"小族"</h2>
            <p className="text-sm text-white/35 mt-4 max-w-[500px] mx-auto leading-relaxed">
              负责大族激光吉祥物"小族"系列视觉物料全案设计，覆盖品牌门户、周边礼品、日历开发、马年表情包及盲盒系列
            </p>
          </motion.div>
          <motion.div className="mt-10 flex flex-col items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
            <span className="text-[10px] font-mono text-white/25 tracking-wider">向下滑动查看</span>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" className="text-white/40"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
            </motion.div>
          </motion.div>
          <motion.button
            className="absolute bottom-10 right-8 flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full border border-white/15 hover:bg-white/20 transition-colors"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={(e) => { e.stopPropagation(); setVideoOpen(true); }}>
            <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="black"><path d="M8 5v14l11-7z" /></svg>
            </span>
            <span className="text-xs font-bold text-white">播放完整视频</span>
          </motion.button>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-[25%] z-0"
          style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.15) 30%, rgba(255,255,255,0.5) 60%, rgba(255,255,255,0.85) 85%, #ffffff 100%)' }} />
      </div>

      {/* ═══════ 4 SECTIONS ═══════ */}
      <div className="relative z-20 bg-white">
        <section id="modal-brand-portal"><BrandPortal /></section>
        <div className="py-8 flex items-center justify-center gap-4 bg-white"><div className="h-px flex-1 max-w-[80px]" style={{ background: 'linear-gradient(to right, transparent, #0035c5)' }} /><span className="text-[10px] font-mono tracking-[0.3em] uppercase text-mascot-primary">Brand · Portal</span><div className="h-px flex-1 max-w-[80px]" style={{ background: 'linear-gradient(to left, transparent, #0035c5)' }} /></div>
        <section id="modal-gift-dev"><GiftDev /></section>
        <div className="py-8 flex items-center justify-center gap-4 bg-white"><div className="h-px flex-1 max-w-[80px]" style={{ background: 'linear-gradient(to right, transparent, #0035c5)' }} /><span className="text-[10px] font-mono tracking-[0.3em] uppercase text-mascot-primary">Gift · Development</span><div className="h-px flex-1 max-w-[80px]" style={{ background: 'linear-gradient(to left, transparent, #0035c5)' }} /></div>
        <section id="modal-calendar-dev"><CalendarDev /></section>
        <div className="py-8 flex items-center justify-center gap-4 bg-white"><div className="h-px flex-1 max-w-[80px]" style={{ background: 'linear-gradient(to right, transparent, #0035c5)' }} /><span className="text-[10px] font-mono tracking-[0.3em] uppercase text-mascot-primary">Calendar · 2026</span><div className="h-px flex-1 max-w-[80px]" style={{ background: 'linear-gradient(to left, transparent, #0035c5)' }} /></div>
        <section id="modal-emoji-pack"><EmojiPack /></section>
        <div className="py-8 flex items-center justify-center gap-4 bg-white"><div className="h-px flex-1 max-w-[80px]" style={{ background: 'linear-gradient(to right, transparent, #0035c5)' }} /><span className="text-[10px] font-mono tracking-[0.3em] uppercase text-mascot-primary">App · Showcase</span><div className="h-px flex-1 max-w-[80px]" style={{ background: 'linear-gradient(to left, transparent, #0035c5)' }} /></div>
        <section id="modal-app-showcase"><AppShowcase /></section>
        <footer className="py-12 text-center border-t border-mascot-outline-variant/20 bg-white">
          <p className="text-[10px] font-mono tracking-wider text-mascot-on-surface-variant">©2026 MASCOT.SYS ARCHIVAL DIVISION. ALL RIGHTS RESERVED.</p>
          <p className="text-[10px] font-mono tracking-wider mt-1 text-mascot-primary">HAN'S LASER BRANDING DIV.</p>
        </footer>
      </div>

      {/* ═══════ Side Navigation (inside modal) ═══════ */}
      <MascotSideNav containerRef={containerRef} />

      <AnimatePresence>{videoOpen && <VideoPlayer onClose={() => setVideoOpen(false)} />}</AnimatePresence>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MASCOT CARD
   ══════════════════════════════════════════════════════════════ */
export function MascotCard({ onClick }: { onClick: () => void }) {
  return (
    <motion.div className="card-3d cursor-pointer group" whileHover={{ y: -4 }} transition={{ duration: 0.3 }} onClick={onClick}>
      <div className="card-3d-inner rounded-2xl overflow-hidden bg-white relative aspect-[21/9]">
        <video src="./videos/小族_opt.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 flex items-end justify-between">
          <div>
            <span className="text-[10px] font-mono text-white/50 tracking-wider uppercase">PROJECT 01</span>
            <h3 className="text-white font-bold text-xl md:text-2xl mt-1 leading-tight">集团吉祥物IP</h3>
            <p className="text-white/50 text-xs mt-1">品牌门户 · 周边礼品 · 日历开发 · 马年表情包 · 盲盒系列</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-4">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17" /></svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
