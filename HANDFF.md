# HANDFF.md — 沉浸式品牌视觉设计师作品集

> 最后更新: 2026-07-03 · 下次恢复时读此文件即可无缝继续
>
> ⚠️ **上线/部署请看 [`HANDOFF.md`](./HANDOFF.md)（v3，2026-07-10）** — 已加 Netlify 上线（https://mohe-portfolio.netlify.app）+ 原 ECS rsync 两种方式。本文件仅记项目结构。

---

## 项目背景 & 目标

黄选坤 (Huang Xuankun) 品牌视觉设计师个人作品集网站。展示 5 个核心设计项目，融合暗色沉浸式 Hero + 暖色内容区双设计系统。

## 技术栈

- **框架**: React 19 + TypeScript
- **构建**: Vite 7
- **样式**: Tailwind CSS 3.4 + 全局 CSS 变量
- **动效**: Framer Motion
- **3D**: Spline Viewer (`@splinetool/viewer` CDN)
- **组件库**: shadcn/ui (40+ 组件)
- **字体**: Instrument Serif + Barlow + Plus Jakarta Sans + Inter + Material Symbols

## 页面结构

```
Hero (暗色 Spline 3D 机器人 + SplashCursor + GooeyNav)
  → About (暖色个人介绍 + 数据统计)
  → Experience (三张工作经历卡片，hover 展开)
  → Projects (5个交替横排卡片)
  → Contact (Get in touch + 3 TiltCards + PDF下载)
```

## 关键组件

| 组件 | 路径 | 说明 |
|------|------|------|
| Hero | `src/sections/Hero.tsx` | Spline 3D + GooeyNav + TextType + SplashCursor |
| About | `src/sections/About.tsx` | 个人信息卡片 + 教育荣誉 |
| Experience | `src/sections/Experience.tsx` | 三张封面卡片 hover 展开详情 |
| ProjectsGrid | `src/components/ProjectsGrid.tsx` | 交替横排卡片布局 |
| Contact | `src/sections/Contact.tsx` | TiltCards + PDF 下载 |
| Module3C | `src/sections/Module3C.tsx` | AeroSound Pro 3C电商详情页，三页合一滚动模态，中文锚点导航 |
| ModuleAnniversary | `src/sections/ModuleAnniversary.tsx` | 30周年庆典模态，视频Hero + 五段式中文锚点导航 |
| ModuleMascot | `src/sections/ModuleMascot.tsx` | 吉祥物IP全案模态 |
| ModuleAIGC | `src/sections/ModuleAIGC.tsx` | AI创意视觉模态 |
| ModuleExhibition | `src/sections/ModuleExhibition.tsx` | 展会视觉模态 |

## 设计系统

### 暖色主题（全局）
- 底色: `#FAF8F5`
- 强调色: `#D4563C`（陶土红）
- 深色文字: `#1C1C1E`
- 字体: Instrument Serif（标题斜体）+ Barlow（正文）

### 暗色 Hero
- 底色: `#000`
- 液态玻璃效果（`liquid-glass` / `liquid-glass-strong`）
- 白色文字

### 3C 模块（Sonic Ethereal）
- 主色: `#0050cb`（电感蓝）
- 独立设计令牌 `C` 常量，glassPanel 样式

### 30周年模块
- 电光蓝强调色 `#0047FF`
- 白色底色，Sora 字体标题

## 数据文件

- `src/data/resume.ts` — 个人信息、工作经历（3条）、技能、教育、荣誉
- `src/data/projects.ts` — 5个项目元数据（mascot/anniversary/exhibition/aigc/ecom3c）

## 静态资源

- `public/robot-scene.splinecode` — Spline 3D 机器人场景 (~1.3MB)
- `public/videos/大族宣传.mp4` — 30周年 Hero 视频 (~17MB)
- `public/videos/airm.mp4` — 3C 电商 Hero 视频
- `public/videos/airm_opt.mp4` — 3C 卡片封面视频
- `public/videos/hero-bg.mp4` — AI创意视觉卡片封面
- `public/videos/小族_opt.mp4` — 吉祥物卡片封面
- `public/images/` — 各类图片资源（30周年手册 30页、应用样机、Experience 封面）

## 端口

`http://localhost:3000/`

## 已知问题

1. **30周年视频播放器缺失** — Hero 页面有播放按钮 `setVideoOpen(true)` 但 VideoPlayer 组件未渲染。需在 `<motion.div>` 内部末尾添加 `<AnimatePresence>{videoOpen && <VideoPlayer onClose={() => setVideoOpen(false)} />}</AnimatePresence>`（参照 Module3C 第441行的写法）

## 待办

- [ ] 修复 30周年视频播放器
- [ ] 其余模块顶栏中文化（如有需要）
- [ ] 多端响应式细节优化
- [ ] 性能优化（Spline 场景懒加载）

## Git 历史

```
2e6b0ae 🔗 3C模块顶栏中文化 + 锚点跳转导航
7326313 🎨 v2 重构 — 沉浸式作品集完整版
27e9efd 🎨 沉浸式作品集 v2 — 整体重构
```
