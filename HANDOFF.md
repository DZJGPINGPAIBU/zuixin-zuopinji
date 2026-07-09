# Handoff — 2026-07-09

> 下一会话启动时读取此文件，快速恢复上下文。

## 当前状态
- 吉祥物IP模块：5/6 个板块已完成图片替换（日历待重新映射）
- 移动端自适应：4文件14处修改已完成，编译通过
- 品牌视觉：AI多媒体设计师 → AI品牌视觉设计 全局替换
- About卡片：分点简介已优化，照片裁剪已修复
- **代码已推送到 GitHub `main` 分支**（commit `f685153`）

## 🔴 待处理

### 1. 阿里云轻量服务器上线（未完成）
- 服务器: `118.31.14.19`，root 密码 `277181Hxk`
- `dist/` 已构建并上传到 `/var/www/zuopinji/`
- Nginx 配置: `/zuopinji/` → 内部 8081（静态+OSS代理）
- **问题**: 从服务器外部 curl 全部 HTTP 200 正常，但用户浏览器无法打开
- 可能原因: 阿里云安全组需放行、浏览器缓存、需进一步排查

### 2. 日历板块图片重新映射
- 20张日历图片已上传 OSS `images/mascot/calendar-dev/`
- 但文件序号与月份不对应（图片上印有月份数字）
- 当前代码已恢复为原始 `img_XX.jpg`
- 需人工对照图片上的月份数字，逐一映射

### 3. 企业微信表情包（文件夹6）未使用
- 25张已上传 OSS `images/mascot/enterprise-emoji/`
- 尚未创建展示区域

## 服务器 Nginx 架构
```
80端口 (aikoutu):
  /          → 127.0.0.1:8000 (无限画布 Python)
  /yitai     → 127.0.0.1:3000 (Next.js)
  /zuopinji/ → 127.0.0.1:8081 (作品集)

8081端口 (zuopinji, 仅内部):
  /          → /var/www/zuopinji (静态文件)
  /images/   → OSS代理
  /videos/   → OSS代理
  /3c/       → OSS代理
```

## 部署更新命令
```bash
# 构建 + 上传到服务器
npm run build   # 或 npx vite build
# 然后 SCP dist/ 到服务器 /var/www/zuopinji/
# SSH 连接: ssh root@118.31.14.19
```
