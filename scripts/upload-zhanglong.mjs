import OSS from 'ali-oss';
import fs from 'fs';
import path from 'path';

// Parse .env manually
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

// Map desktop files to OSS paths (order matches HTML sections 1-5)
const FILES = [
  { local: '/Users/mohe/Desktop/斩龙/1.jpg', oss: 'bilibili/zhanglong/1.jpg', mime: 'image/jpeg' },
  { local: '/Users/mohe/Desktop/斩龙/2.jpg', oss: 'bilibili/zhanglong/2.jpg', mime: 'image/jpeg' },
  { local: '/Users/mohe/Desktop/斩龙/3.png', oss: 'bilibili/zhanglong/3.png', mime: 'image/png' },
  { local: '/Users/mohe/Desktop/斩龙/4.png', oss: 'bilibili/zhanglong/4.png', mime: 'image/png' },
  { local: '/Users/mohe/Desktop/斩龙/5.png', oss: 'bilibili/zhanglong/5.png', mime: 'image/png' },
];

async function uploadAll() {
  console.log(`📤 Uploading ${FILES.length} images to OSS...\n`);

  for (const { local, oss, mime } of FILES) {
    const stat = fs.statSync(local);
    const mb = (stat.size / 1024 / 1024).toFixed(1);
    console.log(`  📤 ${oss} (${mb} MB)`);
    try {
      await client.put(oss, local, {
        mime,
        headers: { 'Cache-Control': 'public, max-age=31536000, immutable' },
      });
      console.log(`  ✅ ${oss}`);
    } catch (err) {
      console.error(`  ❌ ${oss}: ${err.message}`);
      process.exit(1);
    }
  }

  console.log(`\n✨ All done! CDN: https://zuopingjiii.oss-cn-shenzhen.aliyuncs.com/bilibili/zhanglong/`);
}

uploadAll().catch(err => { console.error(err); process.exit(1); });
