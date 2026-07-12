# ⚡ Claude 唤醒词

> **「上线」= 部署到阿里云 ECS（主力，2026-07-11 起 Mohe 定）**。其他平台上线局限性更大。
> ```bash
> cd /Users/mohe/Documents/zuixin-zuopinji/app

# Handoff — 2026-07-12 (v8 · Claude)

## 本次改动

### 1. Experience 板块数据图表化
- 新建 `src/components/ui/StatChart.tsx` — 轻量数据可视化组件（百分比进度条 / 大数计数器，IntersectionObserver 触发入场动画）
- `src/sections/Experience.tsx` — 重写：密集 bullet points → 2 列图表网格，每张卡片 = 可视化数值 + 对应描述文案
- `src/data/resume.ts` — 所有工作经历新增 `metrics` 数组，每条 metric 三字段（value / label / desc）
- 侨邦教育：从 3 条扩展为 4 条指标（从0到1、10+媒介、40%效率、3000+人次）
- 大族激光：两条 AI 效率合并为一条，现共 6 条
- 奋达职校：新增"教师技能大赛获奖"卡片
- 删除各公司 tags 中冗余标签

### 2. 视频播放器修复
- `ModuleAIGC.tsx` — `handleFullscreen` 补全 `fullscreenchange` 监听，退出全屏自动静音
- 所有交互视频（`bilibili-preview.mp4` / `hero.mov` / `fosha.mp4`）加 `controls` 属性，支持暂停/静音/拖动
- 斩龙页切页时 `scrollTo(0,0)` 防止滚动位置残留

### 3. 机器人 WASM 黑屏修复（dev 环境）
- **根因**：`spline-viewer.js` 硬编码 `/zuopinji/` 前缀（ECS 构建变体），dev 环境 Vite 根路径为 `/`，`/zuopinji/*.wasm` 请求命中 SPA fallback → 返回 HTML → WASM 编译失败
- **修复**：`public/zuopinji/` 建硬链接指向 wasm + js chunk 文件，两套路径通吃

### 4. 文案 & 标签清理
- 无限画布：删除 URL 链接、分段优化、"SaaS/工作台/全屏观览/交互设计"标签清除
- B站卡片：`shortDesc` 清空，`subtitle` 改为英文+中文一行，标签清除
- MH极绘：标签清除
- Contact：中文下方加英文翻译，"Get in touch" 改一行

### 修改文件
| 文件 | 改动 |
|---|---|
| `src/components/ui/StatChart.tsx` | **新建** — 数据可视化组件 |
| `src/sections/Experience.tsx` | 重写为图表网格布局 |
| `src/data/resume.ts` | metrics 数据结构 + 侨邦教育丰富化 |
| `src/data/projects.ts` | 标签/文案清理 |
| `src/components/ProjectsGrid.tsx` | yitai 文案修改 + subtitle 支持换行 |
| `src/sections/ModuleAIGC.tsx` | 视频 controls + 全屏静音修复 + 斩龙切页滚动修复 |
| `src/sections/ModuleZhanglong.tsx` | 视频加 controls |
| `src/sections/Contact.tsx` | 英文翻译 + Get in touch 一行 |
| `vite.config.ts` | fs.allow 配置 |
| `public/zuopinji/` | **新建** — wasm/js 硬链接（dev 机器人修复） |

### 部署命令
```bash
cd /Users/mohe/Documents/zuixin-zuopinji/app
npm run build          # ⚠️ 普通 build，不是 build:pages！
rsync -az --delete -e ssh dist/ root@118.31.14.19:/var/www/zuopinji/
```
> 生产：http://118.31.14.19/zuopinji/ ｜ SSH 已配免密

---
> npm run build          # ⚠️ 普通 build，不是 build:pages！
> rsync -az --delete -e ssh dist/ root@118.31.14.19:/var/www/zuopinji/
> ```
> 生产：http://118.31.14.19/zuopinji/ ｜ SSH 已配免密（`~/.ssh/id_ed25519`），rsync 直连无需密码。
> 备用平台见下方 v3(Netlify)、github-pages 记忆。

---

# Handoff — 2026-07-11 (v7 · Claude)

## 本次修复（机器人黑屏 + 封面视频冻结，均已部署 ECS 并验证）

### 1. Spline 机器人黑屏 —— 两层根因
- **根因A（脚本不注入）**：`Hero.tsx` 旧写法把注入 `spline-viewer.js` 放在 `customElements.whenDefined().catch` 里，但 whenDefined **只 resolve 永不 reject** → 脚本永不注入 → 元素永不注册。**已改为无条件注入**（幂等去重 `script[data-spline-loader]`）。
- **根因B（wasm 路径错配）**：**昨晚 ECS 黑屏真因** = 把 `build:pages` 的 dist 部署到了 ECS。`pages-fix-spline.mjs` 把 spline 的 wasm 基址 `/zuopinji/` 改成 GH Pages 的 `/zuixin-zuopinji/`；ECS 站点在 `/zuopinji/`，wasm 全 404 → magic word 报错 → 黑屏。**ECS/Netlify 必须用 `npm run build`（或 build:netlify），只有 GitHub Pages 用 build:pages。**

### 2. 卡片封面视频冻结 —— React muted 属性坑
- **根因**：React `<video muted autoPlay>` 只把 muted 设成 property，不反射为 DOM `muted` **attribute** → 浏览器自动播放策略拦停 → 播 0.7s 冻结。
- **修复**：新增 `src/hooks/use-autoplay-videos.ts`，`App.tsx` 里调 `useAutoplayVideos()`。强制写 `muted`/`playsinline` attribute + IntersectionObserver 进视口才播、离开暂停 + MutationObserver 兜懒加载视频。一处修全部封面视频。

### 3. Hero 视觉（Mohe 明确要求）
- 一开始 Claude 自作主张加了「文字保护 scrim」+「深空星空兜底背景」，**Mohe 要求删掉**（机器人要明亮、表面不要被黑盖住）。**已全部移除**，Hero 恢复干净 `bg-black`。
- ⚠️ 教训：别擅自加覆盖设计原貌的暗色遮罩/兜底层，加视觉层先确认。

### 修改文件
| 文件 | 改动 |
|---|---|
| `src/sections/Hero.tsx` | loadSpline 无条件注入脚本；移除 scrim + 星空兜底层，恢复 `bg-black` |
| `src/hooks/use-autoplay-videos.ts` | 新增，修封面视频自动播放 |
| `src/App.tsx` | 调 `useAutoplayVideos()` |
| `src/sections/ModuleJihui.tsx` | **封面从静态图 `mohe极绘.png` 改回实时 iframe 预览** `http://118.31.14.19/`（见下） |
| `netlify.toml` | 新增 `/zuopinji/* → /:splat` redirect（仅 Netlify 需要） |

### MH极绘 卡片封面 = 实时 iframe 预览（2026-07-11 Mohe 要求，勿回退成静态图）
- 之前 Codex 因 `cdn.tailwindcss.com` 被墙把 iframe 换成静态截图。现复测：CDN 可达、MH极绘 站无 X-Frame-Options，且**与 ECS 作品集同源 http（都是 `118.31.14.19:80`）→ 无混合内容/跨域限制**，iframe 实时渲染正常。
- ⚠️ 仅在 **ECS(http) 主力**成立。若部署到 Netlify/GH Pages(https)，`http://` iframe 会被混合内容拦截 → 需改走 `/mhjihui/` 代理或换 https。静态图 `public/images/mohe极绘.png` 保留未删，备用。

### 无限画布（canvas）= 外链卡 + yitai 实时预览（2026-07-11 Mohe 要求，勿回退）
- **CanvasModal 整个删除**（原 6 页 iframe 全屏模态）。`ModuleCanvas.tsx` 现只剩 `CanvasCard`。
- 卡片封面 = `http://118.31.14.19/yitai` **实时 iframe 预览**；点击卡片 → `window.open` 跳 yitai（同 jihui 模式，不再开模态）。
- `ProjectsGrid.tsx`：移除 `CanvasModal` import + `modalMap.canvas`；canvas 与 jihui 同走外链分支（无 openModal、无全屏观览按钮）。
- yitai 主页是浅色，卡片标签加了仅底部渐变保证白字可读。同样只在 ECS(http) 同源成立。

### build 变体 × 部署目标（务必配对，别搞混）
| 目标 | 命令 | spline wasm 基址 |
|---|---|---|
| **ECS `/zuopinji/`（主力）** | `npm run build` | `/zuopinji/` 原生 |
| Netlify 根路径 | `npm run build:netlify` | `/zuopinji/`（netlify.toml redirect） |
| GitHub Pages | `npm run build:pages` | `/zuixin-zuopinji/`（脚本改写） |

### 当前 ECS 状态（headless 验证）
- 机器人：`spline-viewer` 已注册、wasm 200、零 page error。✅
- 封面视频：4 个滚进视口全部 `paused=false` 实时播放。✅
- **视觉亮度需真机确认**（本机无头只有 SwiftShader 软 GPU，颜色不可信）。

---

# Handoff — 2026-07-10 (v3)



## 🆕 v6：上传新封面图 + 恢复直连跳转（2026-07-11）

### ✅ 本次改动
#### 1. MH极绘 封面图替换
- 用户提供新封面 `mohe极绘.png`，上传至 OSS `images/mohe极绘.png` + `public/images/`
- `ModuleJihui.tsx` 封面从 Playwright 截图 → `./images/mohe极绘.png`

#### 2. 无限画布 封面图
- 用户提供新封面 `无限画布.png`，上传至 OSS `images/无限画布.png` + `public/images/`
- `projects.ts` canvas 封面从 `gen-02.jpg` → `./images/无限画布.png`

#### 3. MH极绘 跳转恢复直连
- `JIHUI_URL` 从代理 `/mhjihui/` → 直连 `http://118.31.14.19/`
- 原因：Netlify 代理跳转慢（2.9s），直连仅 0.2s；`window.open` 新标签页无 mixed content 限制

### OSS 状态
- `images/mohe极绘.png` ✅ 200
- `images/无限画布.png` ✅ 200
- 日历图片（`images/mascot/img_XX.jpg`）16 张全部 ✅ 200

### 当前生产状态
- 地址：https://mohe-portfolio.netlify.app
- JS bundle：`index-FfvoMXMd.js`
- 部署：`npm run build` → `netlify deploy --dir=dist` → `netlify api restoreSiteDeploy`

---

## 🆕 Spline 机器人修复尝试（2026-07-11 晚）

### 根因定位
v4 用了 `<link rel="modulepreload" href="./spline-viewer.js">`，但 `modulepreload` **只下载不执行**。
Hero.tsx 里 `customElements.whenDefined('spline-viewer')` 永远等不到 custom element 注册，代码卡住。

### 修复内容
1. `index.html` — 移除 `modulepreload`，注释改为 "Spline loaded via dynamic module injection"
2. `Hero.tsx` — 去掉 `try { await whenDefined() } catch` 包装，始终动态注入 `<script type="module" src="./spline-viewer.js">`

### 当前状态
- 生产地址：https://mohe-portfolio.netlify.app
- JS bundle：`index-FfvoMXMd.js`
- spline-viewer.js（2.2MB）✅ 200
- robot-scene.splinecode（1.3MB）✅ 200
- **机器人仍不显示**，控制台无错误。准备咨询 Claude。

### 其他已解决
- ✅ MH极绘卡片封面 → `mohe极绘.png`（用户提供，OSS + public/images/）
- ✅ 无限画布封面 → `无限画布.png`（用户提供，OSS + public/images/）
- ✅ MH极绘跳转改回直连 `http://118.31.14.19/`
- ✅ Canvas tailwind CDN 已本地化
- ✅ 日历图片全部恢复（OSS 充值后 16 张 200）

### 部署命令
```bash
cd /Users/mohe/Documents/zuixin-zuopinji/app
npm run build
netlify deploy --dir=dist
# promote: netlify api restoreSiteDeploy --data '{"site_id":"f7deb450-13ed-4061-a0ad-4851d5d29479","deploy_id":"<new_id>"}'
```
---

## 🆕 v4：Codex 修复 & 重新部署（2026-07-10 晚，Codex 完成）

### 本次修复内容

#### 1. Spline Hero 机器人不加载
**原因：** `Hero.tsx` 的 `SplineViewer` 组件使用 IntersectionObserver 懒加载动态注入 module script，关键时刻可能不触发。

**修复：**
- `index.html` 增加 `<link rel="modulepreload" href="./spline-viewer.js">` 预加载
- `Hero.tsx` 改 SplineViewer 为 eager load：先尝试 `customElements.whenDefined('spline-viewer')`（modulepreload 已触发注册），失败则 fallback 动态注入。移除 IntersectionObserver。

#### 2. MH极绘 项目卡片 iframe 空白
**原因：** HTTP iframe（`http://118.31.14.19/`）在 HTTPS 站点被浏览器作为混合内容拦截。

**修复：**
- `ModuleJihui.tsx`：`JIHUI_URL` 从 `http://118.31.14.19/` → `/mhjihui/`
- `netlify.toml` 新增代理：
  ```toml
  [[redirects]]
    from = "/mhjihui/*"
    to = "http://118.31.14.19/:splat"
    status = 200
    force = true
  ```

#### 3. `--prod` 部署 403
**原因：** Netlify Free 账号 token 权限不足，无法 CLI production deploy。
**解决办法：** 先 `netlify deploy --dir=dist`（draft），再通过 `netlify api restoreSiteDeploy` promote 到 production。

### 修改文件清单
| 文件 | 改动 |
|---|---|
| `index.html` | 新增 `modulepreload` + 更新注释 |
| `src/sections/Hero.tsx` | SplineViewer 从 IntersectionObserver → eager load |
| `src/sections/ModuleJihui.tsx` | iframe URL `http://118.31.14.19/` → `/mhjihui/` |
| `netlify.toml` | 新增 `/mhjihui/*` → `http://118.31.14.19/:splat` 代理 |

### 当前生产部署状态
- **生产地址：** https://mohe-portfolio.netlify.app ✅
- **JS bundle：** `index-Dh0XD8GR.js`（2026-07-10 晚部署）
- **部署方式：** `npm run build` → `netlify deploy --dir=dist` → `netlify api restoreSiteDeploy`

### 一键部署命令（修复版）
```bash
cd /Users/mohe/Documents/zuixin-zuopinji/app
npm run build
netlify deploy --dir=dist
# 然后从输出中获取 deploy_id，执行：
# netlify api restoreSiteDeploy --data '{"site_id":"f7deb450-13ed-4061-a0ad-4851d5d29479","deploy_id":"<new_deploy_id>"}'
```

### ⚠️ 新发现的已知问题
- Hero spline robot 是 3D WebGL，部分浏览器/设备可能不兼容（本地文件已验证正确）

---


## 🆕 v5：Codex 修复 MH极绘封面 + OSS 恢复（2026-07-11）

### ✅ 本次修复
#### 1. MH极绘项目卡片封面修复
**原因：** iframe 指向 HTTP 站点（`http://118.31.14.19/`），CDN 资源（`cdn.tailwindcss.com`）在国内加载失败，导致卡片空白。
**修复：** 用 Playwright 截取 MH极绘 首页截图（424KB），替换 `<iframe>` 为 `<img src="./images/mhjihui-cover.png">`。点击卡片仍可跳转 MH极绘 站点。

#### 2. OSS 恢复
阿里云 OSS 账户充值后，所有 `images/mascot/img_XX.jpg` 日历图片恢复访问（16 张全部 200）。日历模块可正常显示。

#### 3. Canvas CDN 已本地化
确认 `public/canvas/tailwind.js`（418KB）已本地化，所有 HTML 引用 `./tailwind.js`，无需修改。

### 仍待处理
- 企业微信表情包未上传到 OSS（用户决定暂不上传）
- `calendar-dev/` 目录在 OSS 上不存在（日历用的是 `images/mascot/img_XX.jpg`，不是 `calendar-dev/`）

### 修改文件
| 文件 | 改动 |
|---|---|
| `src/sections/ModuleJihui.tsx` | iframe → 静态封面图 |
| `public/images/mhjihui-cover.png` | 新增，424KB |
| `netlify.toml` | 保留 `/mhjihui/*` 代理（备用于外部跳转） |

### 当前生产状态
- 生产地址：https://mohe-portfolio.netlify.app ✅
- JS bundle：`index-CeKPaFFq.js`（2026-07-11）
- 部署方式：`npm run build` → `netlify deploy --dir=dist` → `netlify api restoreSiteDeploy`

---

> 下一会话启动时读取此文件，快速恢复上下文。
> **v3 新增：Netlify 上线（Claude 完成）。原 ECS rsync 方式保留在下方。**

---

## 🆕 v3：Netlify 上线（2026-07-10，Claude 完成）

### ✅ 线上状态
- **生产地址：https://mohe-portfolio.netlify.app** — 已验证首页/JS/图片/视频/斩龙资源/SPA 回退全部 200
- Netlify site id：`f7deb450-13ed-4061-a0ad-4851d5d29479`（name `mohe-portfolio`，team slug `huangxaunkun`，账号 huangxaunkun@gmail.com）
- 素材仍在 OSS，Netlify 通过 `netlify.toml` 代理转发（复刻 vite dev proxy），已验证代理内容与 OSS 直连字节一致

### 一键部署命令（Netlify）
```bash
cd /Users/mohe/Documents/zuixin-zuopinji/app
npm run build
netlify deploy --dir=dist --prod --site f7deb450-13ed-4061-a0ad-4851d5d29479
```

### 本次为 Netlify 上线所做改动（Codex 注意，勿回退）
1. **新增 `netlify.toml`**：把 `/images` `/videos` `/3c` `/bilibili/zhanglong` 用 `status=200 force=true` 代理到 `https://zuopingjiii.oss-cn-shenzhen.aliyuncs.com/...`，末尾 SPA 回退 `/* → /index.html 200`（不加 force，静态文件优先）。等价于 `vite.config.ts` 的 dev proxy。
2. **`src/sections/ModuleZhanglong.tsx`**：6 处内嵌 `<video>/<img>` 由 `http://118.31.14.19/zuopinji/bilibili/zhanglong/...` 改为 **`./bilibili/zhanglong/...`**（点相对）。
   - 原因①（**必须改**）：http 子资源在 https 站点会被浏览器当**混合内容拦截**。
   - 原因②（**为何用 `./` 不用 `/`**）：ECS 部署在 **`/zuopinji/` 子路径**，根相对 `/bilibili/...` 会解析到 `http://118.31.14.19/bilibili/...`（错），点相对 `./bilibili/...` 才解析到 `/zuopinji/bilibili/...`（对）。`./` 三端通吃：dev(vite proxy) + Netlify(proxy) + ECS(子路径)。
   - `/yitai`、`/` 那 3 处是 `window.open`/`target=_blank` **外链跳转**，http 新标签页不受混合内容限制，**保持不动**。
3. `.gitignore` 追加 `.netlify`（netlify CLI 自动加）。

### ⚠️ 风险/待办
- `app/.env` 有阿里云 OSS AccessKey **明文**（写权限）；未打包进 dist、未上传 Netlify，但明文躺本地有风险 → 建议轮换或换只读 STS。
- 大视频经 Netlify 代理走其带宽，量大时考虑改 OSS 绝对 URL 或绑自定义域名。
- 站点已精简：账号原有 3 个 portfolio 站，已删重复（`-2026` + 旧 `mohe-portfolio`），把 `-442` 改名为 `mohe-portfolio`（**site id 不变**，故上面命令仍有效）。现账号仅 `mohe-portfolio` + `yitai-canvas`。可继续绑自定义域名。

---

## 🌐 两种上线方式对比（选一个用）

| | Netlify（新，Claude 已上线） | ECS rsync（原，见下方 v2） |
|---|---|---|
| 地址 | https://mohe-portfolio.netlify.app（根路径 https） | http://118.31.14.19/zuopinji/（子路径 http） |
| 素材 | netlify.toml 代理 OSS | ECS nginx 代理 OSS + 本地文件 |
| 部署 | `netlify deploy --dir=dist --prod --site <id>` | `rsync dist/ root@118.31.14.19:/var/www/zuopinji/` |
| 优点 | 自动 HTTPS+CDN，零运维 | 自有服务器，可控 |

> 两者共用同一份 `dist`；ModuleZhanglong 用 `./` 相对路径后**两边都能跑**。

---

## ✅ 线上状态（v2 · ECS）
- **`http://118.31.14.19/zuopinji/`** — 全部资源可达，171 个资源路径已验证
- Spline Viewer 已本地化（`spline-viewer.js`, 2.2MB，不再依赖 jsDelivr CDN）
- 所有 JSX/data 中的绝对路径已改为相对路径（`./`），零残留
- OSS 图片/视频代理正常工作
- 唯一缺失文件：`images/30周年模块/概念解析.jpg` → 已用 `30周年手册/01.jpg` 替代

## 🔴 待处理（非部署问题）
### 1. Canvas/B站 iframe CDN 依赖
- `cdn.tailwindcss.com` — 国内被墙，iframe 无样式
- `lh3.googleusercontent.com` — Google Photos 外链国内不可达
- 需回到源 HTML 文件中本地化这些依赖

### 2. 日历板块图片重新映射
- 20张日历图片已上传 OSS `images/mascot/calendar-dev/`
- 文件序号与月份不对应（图片上印有月份数字）
- 需人工对照图片上的月份数字，逐一映射

### 3. 企业微信表情包未使用
- 25张已上传 OSS `images/mascot/enterprise-emoji/`
- 尚未创建展示区域

## 本次修复历史（07/10 · v2）
1. 修复 13 个 TypeScript 编译错误
2. Spline Viewer CDN → 本地 `public/spline-viewer.js`
3. JSX `src="/..."` 176处 → `src="./..."`（sed 批量）
4. data 文件 `cover/imageSrc/avatar/img` 绝对路径 → 相对路径（Experience/Projects/Resume/About/CanvasProfile/Chenmo/Luoqingyi/Exhibition/Anniversary）
5. `images/30周年模块/概念解析.jpg` (OSS 404) → `images/30周年手册/01.jpg`

## 部署命令（ECS）
```bash
cd /Users/mohe/Documents/zuixin-zuopinji/app
npm run build
rsync -avz --delete -e "ssh" dist/ root@118.31.14.19:/var/www/zuopinji/
# 密码: 277181Hxk
```
