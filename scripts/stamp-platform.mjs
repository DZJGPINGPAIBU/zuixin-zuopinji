// 给构建产物打「部署平台」标记，便于区分同一份作品集在不同平台的上线实例
// （GitHub Pages / Netlify 等）。改动仅限 dist/index.html，不碰源码与页面主体视觉：
//   1) 浏览器标签标题加后缀：<title>… · GH</title>
//   2) favicon（内联 SVG 的 ✧）换成平台专属颜色 —— 标签图标不会被截断，是最可靠的一眼区分点
//
// 用法：node scripts/stamp-platform.mjs GH   （GH=GitHub Pages，NF=Netlify）
// 未传参则跳过（普通 build / dev 不打标记）。幂等：重复运行不会叠加后缀。

import fs from 'node:fs';
import path from 'node:path';

const tag = process.argv[2];
if (!tag) {
  console.log('  [stamp] 未提供平台标记，跳过');
  process.exit(0);
}

// 平台专属 favicon 颜色（%23 = URL 编码的 #，data URI 里必须编码）
const COLORS = { GH: '%230055FF', NF: '%2300C7B7' }; // GitHub=电感蓝, Netlify=品牌青
const fill = COLORS[tag] || '%23111111';

const indexPath = path.resolve('dist/index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// 1) 标题后缀（先剥掉可能已存在的 · GH/NF，保证幂等）
html = html.replace(/<title>([\s\S]*?)<\/title>/, (_m, t) => {
  const base = t.replace(/\s·\s[A-Z]{2}\s*$/, '').trim();
  return `<title>${base} · ${tag}</title>`;
});

// 2) favicon 换色（保持原 ✧ 星形，仅加 fill）
const favicon =
  '<link rel="icon" href="data:image/svg+xml,' +
  '<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22>' +
  `<text y=%22.9em%22 font-size=%2290%22 fill=%22${fill}%22>✧</text></svg>" />`;
html = html.replace(/<link rel="icon"[^>]*>/, favicon);

fs.writeFileSync(indexPath, html);
console.log(`  [stamp] 平台标记 ${tag}：标题后缀「· ${tag}」，favicon 换色 ${fill.replace('%23', '#')}`);
