import OSS from 'ali-oss';
import fs from 'fs';
import path from 'path';

const envPath = path.resolve(import.meta.dirname, '../.env');
for (const line of fs.readFileSync(envPath,'utf-8').split('\n')) {
  const t = line.trim(); if (!t||t.startsWith('#')) continue;
  const i = t.indexOf('='); if (i===-1) continue;
  process.env[t.slice(0,i).trim()] = t.slice(i+1).trim();
}
const client = new OSS({
  region: process.env.OSS_REGION||'oss-cn-shenzhen',
  accessKeyId: process.env.OSS_ACCESS_KEY_ID,
  accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
  bucket: process.env.OSS_BUCKET||'zuopingjiii',
});

const distDir = path.resolve(import.meta.dirname, '../dist');

function walkDir(dir, base = '') {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = base ? `${base}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      results.push(...walkDir(path.join(dir, entry.name), rel));
    } else {
      results.push({ localPath: path.join(dir, entry.name), remotePath: rel });
    }
  }
  return results;
}

const files = walkDir(distDir);
console.log(`📦 共 ${files.length} 个文件待上传\n`);

const mimeMap = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.mp4': 'video/mp4',
  '.splinecode': 'application/octet-stream',
};

let uploaded = 0;
for (const { localPath, remotePath } of files) {
  const ext = path.extname(remotePath).toLowerCase();
  const mime = mimeMap[ext] || 'application/octet-stream';

  // HTML files: short cache for instant updates; assets: long cache (hashed filenames)
  const cacheControl = remotePath.endsWith('.html')
    ? 'public, max-age=60, must-revalidate'
    : 'public, max-age=31536000, immutable';

  await client.put(remotePath, localPath, {
    mime,
    headers: { 'Cache-Control': cacheControl },
  });
  uploaded++;
  if (uploaded % 10 === 0 || uploaded === files.length) {
    console.log(`  ${uploaded}/${files.length} ✅`);
  }
}

console.log(`\n🚀 部署完成! 共 ${uploaded} 个文件`);
console.log(`   访问地址: https://${process.env.OSS_BUCKET}.${process.env.OSS_REGION}.aliyuncs.com/index.html`);
