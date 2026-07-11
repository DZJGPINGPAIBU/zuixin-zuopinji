// GitHub Pages 子路径修复：机器人（Spline）运行时依赖路径。
//
// 现象：机器人黑屏/不显示。
// 根因：public/spline-viewer.js 里硬编码了 ECS 部署前缀 /zuopinji/（ui.wasm、navmesh.js/wasm、
//   CanvasKit wasm 等运行时依赖），有两种写法：字符串基址 "/zuopinji/xxx" 与拼接 n.origin+'/zuopinji/xxx'。
//   GitHub 项目站部署在子路径 /zuixin-zuopinji/，这些绝对路径全部指向 /zuopinji/（不存在）→ 404
//   → 命中 SPA 回退返回 index.html（HTML）→ WebAssembly 拿到 HTML 报 magic word 错误 → 机器人黑屏。
// 解决：把 /zuopinji/ 前缀整体替换为 GitHub Pages 的 base（= 仓库名子路径），9 处两种写法都能正确解析。
//   注意不能改成 ./：n.origin+'./xxx' 是字符串拼接会得到 https://host./xxx，反而更错，必须用带 base 的绝对路径。
//   （Netlify 根路径靠 netlify.toml 的 /zuopinji/* → /:splat redirect 解决，与此互不影响。）

import fs from 'node:fs';
import path from 'node:path';

const BASE = '/zuixin-zuopinji/'; // GitHub Pages 项目站 base，= 仓库名。若仓库改名需同步这里
const file = path.resolve('dist/spline-viewer.js');

if (!fs.existsSync(file)) {
  console.log('  [spline] dist/spline-viewer.js 不存在，跳过');
  process.exit(0);
}

const src = fs.readFileSync(file, 'utf8');
const count = (src.match(/\/zuopinji\//g) || []).length;
if (count === 0) {
  console.log('  [spline] 未发现 /zuopinji/ 前缀，跳过（可能已修复或版本变化）');
  process.exit(0);
}
fs.writeFileSync(file, src.split('/zuopinji/').join(BASE));
console.log(`  [spline] 机器人运行时依赖路径修复：/zuopinji/ → ${BASE}（${count} 处）`);
