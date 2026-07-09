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
const f = '/Users/mohe/Desktop/佛刹.mp4', k = 'bilibili/zhanglong/fosha.mp4';
const s = fs.statSync(f);
console.log(`📤 ${(s.size/1024/1024).toFixed(1)} MB → ${k}`);
await client.put(k, f, { mime: 'video/mp4', headers: { 'Cache-Control': 'public, max-age=31536000, immutable' } });
console.log(`✅ https://zuopingjiii.oss-cn-shenzhen.aliyuncs.com/${k}`);
