// GitHub Pages 素材重写：把「本地不存在」的素材引用改写为阿里云 OSS 绝对 URL。
//
// 背景：素材主要存在阿里云 OSS，本地 public/videos、public/3c 为空，images 只有少量顶层图。
// dev/Netlify 靠 proxy 把 /images /videos /3c /bilibili/zhanglong 转发到 OSS，但 GitHub Pages
// 是纯静态、没有代理，这些相对路径会全部 404。
//
// 策略（逐条判断，最稳）：扫描主 bundle + index.html，对每个素材引用：
//   - dist 里存在该文件      → 保持本地（GitHub Pages 直接托管，例如 images/mohe极绘.png、
//                              bilibili/zhanglong/ 的图、canvas/bilibili 独立页的同级素材）
//   - dist 里不存在（大视频等）→ 改写为 OSS 绝对 URL
//
// 只处理主 bundle 与入口 HTML。canvas/*.html、bilibili/screen-*.html 这些独立 iframe 页里的
// ./images/gphoto*.jpg 是相对它们「自己目录」的本地同级素材，全部随仓库托管，不能按顶层重写，
// 因此这里刻意不碰它们。

import fs from 'node:fs';
import path from 'node:path';

const OSS = 'https://zuopingjiii.oss-cn-shenzhen.aliyuncs.com';
const DIST = path.resolve('dist');

// 可能落在 OSS 的前缀。bilibili 仅限 zhanglong 子目录（其余 bilibili/* 都是本地文件）。
// 前缀（含斜杠）+ 文件名字符（排除引号/括号/空白/反斜杠）。中文字符不在排除集内，可正常匹配。
const RE = /(["'`(=\s])(\.?\/)?((?:images|videos|3c|bilibili\/zhanglong)\/[^"'`)\s\\]*)/g;

function walk(dir) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

const targets = [
  path.join(DIST, 'index.html'),
  ...walk(path.join(DIST, 'assets')).filter((f) => /\.(js|css)$/.test(f)),
].filter((f) => fs.existsSync(f));

let totalKept = 0;
let totalMoved = 0;
const movedKeys = new Set();

for (const file of targets) {
  let kept = 0;
  let moved = 0;
  const src = fs.readFileSync(file, 'utf8');
  const out = src.replace(RE, (match, delim, _lead, key) => {
    // 已经是绝对 OSS/URL 的不动（保险：key 前若紧跟协议片段则跳过）
    const localPath = path.join(DIST, key);
    if (fs.existsSync(localPath)) {
      kept++;
      return match; // 本地存在 → 原样保留
    }
    moved++;
    movedKeys.add(key);
    return `${delim}${OSS}/${key}`;
  });
  if (out !== src) fs.writeFileSync(file, out);
  totalKept += kept;
  totalMoved += moved;
  console.log(`  ${path.relative(DIST, file)}: 保留本地 ${kept} 处，改写 OSS ${moved} 处`);
}

console.log(`\n✅ OSS 重写完成：本地保留 ${totalKept} 处，改写 ${totalMoved} 处（去重 ${movedKeys.size} 个素材）`);
