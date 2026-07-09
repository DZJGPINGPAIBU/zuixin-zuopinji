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

const dir = '/Users/mohe/Desktop/吉祥物视觉/2';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jpg'));

for (const f of files) {
  const fp = path.join(dir, f);
  const key = `images/mascot/gift-dev/${f}`;
  const s = fs.statSync(fp);
  console.log(`📤 ${f} (${(s.size/1024).toFixed(0)}KB) → ${key}`);
  await client.put(key, fp, {
    mime: 'image/jpeg',
    headers: { 'Cache-Control': 'public, max-age=31536000, immutable' },
  });
}
console.log(`✅ 周边礼品 ${files.length} 张图片上传完成!`);
