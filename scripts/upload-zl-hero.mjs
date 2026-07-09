import OSS from 'ali-oss';
import fs from 'fs';
import path from 'path';

const envPath = path.resolve(import.meta.dirname, '../.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
for (const line of envContent.split('\n')) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const eqIdx = trimmed.indexOf('=');
  if (eqIdx === -1) continue;
  process.env[trimmed.slice(0, eqIdx).trim()] = trimmed.slice(eqIdx + 1).trim();
}

const client = new OSS({
  region: process.env.OSS_REGION || 'oss-cn-shenzhen',
  accessKeyId: process.env.OSS_ACCESS_KEY_ID,
  accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
  bucket: process.env.OSS_BUCKET || 'zuopingjiii',
});

const LOCAL = '/Users/mohe/Desktop/斩龙(1)/斩龙(1).mov';
const OSS_KEY = 'bilibili/zhanglong/hero.mov';

async function upload() {
  const stat = fs.statSync(LOCAL);
  const mb = (stat.size / 1024 / 1024).toFixed(1);
  console.log(`📤 Uploading: ${LOCAL} (${mb} MB) → ${OSS_KEY} ...`);
  try {
    await client.put(OSS_KEY, LOCAL, {
      mime: 'video/quicktime',
      headers: { 'Cache-Control': 'public, max-age=31536000, immutable' },
    });
    console.log(`✅ Done! https://zuopingjiii.oss-cn-shenzhen.aliyuncs.com/${OSS_KEY}`);
  } catch (err) {
    console.error(`❌ ${err.message}`);
    process.exit(1);
  }
}
upload();
