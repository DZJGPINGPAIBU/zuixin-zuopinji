import OSS from 'ali-oss';
import fs from 'fs';
import path from 'path';
const envPath = path.resolve(import.meta.dirname, '../.env');
for (const line of fs.readFileSync(envPath,'utf-8').split('\n')) {
  const t = line.trim(); if (!t||t.startsWith('#')) continue;
  const i = t.indexOf('='); if (i===-1) continue;
  process.env[t.slice(0,i).trim()] = t.slice(i+1).trim();
}
const client = new OSS({ region: process.env.OSS_REGION||'oss-cn-shenzhen', accessKeyId: process.env.OSS_ACCESS_KEY_ID, accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET, bucket: process.env.OSS_BUCKET||'zuopingjiii' });
const f = '/Users/mohe/Library/Containers/com.tencent.xinWeChat/Data/Documents/xwechat_files/wxid_po5ylv45rbxh21_8d2e/temp/RWTemp/2026-07/8c185ea549ce2992b67d858c6c5fd8c9/f2b20411124366a3dcc15c4a5a779d5e.jpg', k = 'images/30周年手册/design-philosophy.jpg';
const s = fs.statSync(f);
console.log(`📤 ${(s.size/1024/1024).toFixed(1)} MB → ${k}`);
await client.put(k, f, { mime: 'image/jpeg', headers: { 'Cache-Control': 'public, max-age=31536000, immutable' } });
console.log(`✅ https://zuopingjiii.oss-cn-shenzhen.aliyuncs.com/${k}`);
