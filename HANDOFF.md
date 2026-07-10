# Handoff — 2026-07-10 (v2)

> 下一会话启动时读取此文件，快速恢复上下文。

## ✅ 线上状态
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

## 本次修复历史（07/10）
1. 修复 13 个 TypeScript 编译错误
2. Spline Viewer CDN → 本地 `public/spline-viewer.js`
3. JSX `src="/..."` 176处 → `src="./..."`（sed 批量）
4. data 文件 `cover/imageSrc/avatar/img` 绝对路径 → 相对路径（Experience/Projects/Resume/About/CanvasProfile/Chenmo/Luoqingyi/Exhibition/Anniversary）
5. `images/30周年模块/概念解析.jpg` (OSS 404) → `images/30周年手册/01.jpg`

## 部署命令
```bash
cd /Users/mohe/Documents/zuixin-zuopinji/app
npm run build
rsync -avz --delete -e "ssh" dist/ root@118.31.14.19:/var/www/zuopinji/
# 密码: 277181Hxk
```
