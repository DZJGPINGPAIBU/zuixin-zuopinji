import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

export default defineConfig({
  base: './',
  plugins: [inspectAttr(), react()],
  server: {
    port: 3000,
    proxy: {
      '/images': 'https://zuopingjiii.oss-cn-shenzhen.aliyuncs.com',
      '/videos': 'https://zuopingjiii.oss-cn-shenzhen.aliyuncs.com',
      '/bilibili/zhanglong': 'https://zuopingjiii.oss-cn-shenzhen.aliyuncs.com',
      '/3c': 'https://zuopingjiii.oss-cn-shenzhen.aliyuncs.com',
    },
    // spline-viewer.js 硬编码了 ECS 子路径 /zuopinji/，dev 环境映射到根目录
    fs: { allow: ['..'] },
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});
