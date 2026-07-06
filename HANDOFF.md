# Handoff — 2026-07-06 阶段结束

> 下一会话启动时读取此文件，快速恢复上下文。

## 当前状态

- **Git**: `467a114` fix: 展会视觉模块图片本地化，已推送 origin/main
- **分支**: main（无未提交更改）
- **开发服务器**: `npm run dev` → `http://localhost:3001/`

## 本次完成

### 展会视觉模块图片本地化
- **问题**: `ModuleExhibition.tsx` 中 13 张图片全部使用 Google Photos 外链 (`lh3.googleusercontent.com`)，国内网络直连超时，导致展会模块图片全部空白
- **修复**: 通过系统代理 `127.0.0.1:33210` 下载全部 13 张图片到 `public/images/exhibition/`
- 替换 15 处 Google URL → 本地路径 `/images/exhibition/`
- 图片分组：CIIF (5张) / CIOE (4张) / CHTF (4张)

## 关键文件

| 文件 | 用途 |
|------|------|
| `src/sections/ModuleExhibition.tsx` | 展会视觉 Card + Modal（13张图片已本地化） |
| `public/images/exhibition/` | 展会模块本地图片（ciif_*/cioe_*/chtf_*） |
| `src/components/ProjectsGrid.tsx` | 项目网格，cardMap + modalMap 映射 |
| `src/data/projects.ts` | 项目元数据，编号 01-07 |

## 架构要点

- 新增模块流程：Section 组件 → projects.ts → ProjectsGrid cardMap
- 外部图片下载需过代理：curl `-x http://127.0.0.1:33210`（系统 SOCKS/HTTP 代理）
- 外链卡片（jihui）：无 modal，card 内部处理 `window.open`
- iframe 展示：`pointer-events: none` 防止光标冻结
- 前两张卡片（i=0, i=1）均为全宽横幅布局

## 待办

- [ ] Spline viewer 渲染修复（旧任务，未处理）
- [ ] 移动端响应式适配测试
- [ ] Git 配置 user.name / user.email（当前为自动生成的 MOHE@MacBook-Air）

## 记忆库

所有踩坑记录在 `/Users/mohe/.claude/projects/-Users-mohe/memory/`，`MEMORY.md` 为索引。
