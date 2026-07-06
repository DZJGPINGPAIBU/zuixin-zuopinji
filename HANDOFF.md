# Handoff — 2026-07-06（OSS 素材上云）

> 下一会话启动时读取此文件，快速恢复上下文。

## 当前状态

- **Git**: `6c811c6` chore: 清理8个孤儿视频文件 + OSS 素材上云，待推送
- **分支**: main
- **开发服务器**: `npm run dev` → `http://localhost:3000/`（vite.config 改为 3000）

## ⚠️ 重要：OSS 云端素材方案

图片/视频已上传阿里云 OSS，Vite dev server 通过 proxy 透明代理。**本地 `public/` 无 images/videos**。

| 项 | 值 |
|----|-----|
| Bucket | `zuopingjiii` (oss-cn-shenzhen) |
| CDN | `https://zuopingjiii.oss-cn-shenzhen.aliyuncs.com/` |
| 上传脚本 | `scripts/oss-upload.mjs` |
| 本地备份 | `~/zuopinji-backup/images/` + `~/zuopinji-backup/videos/` |

**构建前需恢复本地素材**：`cp -r ~/zuopinji-backup/images public/ && cp -r ~/zuopinji-backup/videos public/`

## Git 待推送

- 清理 8 个孤儿视频文件（斩龙×2 + vid-01~06，省 39MB）
- vite.config.ts proxy 配置
- 新增 scripts/oss-upload.mjs

## 待办

- [ ] Spline viewer 渲染修复
- [ ] 移动端响应式适配测试
- [ ] Git 配置 user.name / user.email
- [ ] 生产构建时的 OSS URL 替换方案（当前仅 dev proxy 可用）
