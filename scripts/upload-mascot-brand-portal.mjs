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

const dir = '/Users/mohe/Desktop/吉祥物视觉/1';

const files = [
  '1吉祥物-（封面） 1.jpg',
  '2吉祥物-设计说明（图例）-1 1.jpg',
  '3吉祥物-个人信息及表情-改 1.jpg',
  '4吉祥物-场景组合 1.jpg',
  '5吉祥物与激光剑组合示例 1.jpg',
  '6吉祥物与集团各服装组合展示示例 1.jpg',
  '7吉祥物服装组合展示示例 1.jpg',
  '8机器人-吉祥物（表情包） 1.jpg',
  '吉祥物与集团标志组合 1.jpg',
];

for (const f of files) {
  const fp = path.join(dir, f);
  const key = `images/mascot/brand-portal/${f}`;
  const s = fs.statSync(fp);
  console.log(`📤 ${f} (${(s.size/1024).toFixed(0)}KB) → ${key}`);
  await client.put(key, fp, {
    mime: 'image/jpeg',
    headers: { 'Cache-Control': 'public, max-age=31536000, immutable' },
  });
}
console.log('✅ 品牌门户 9 张图片上传完成!');
