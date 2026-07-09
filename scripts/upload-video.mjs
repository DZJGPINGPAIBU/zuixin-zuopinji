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
  const key = trimmed.slice(0, eqIdx).trim();
  const val = trimmed.slice(eqIdx + 1).trim();
  process.env[key] = val;
}

const client = new OSS({
  region: process.env.OSS_REGION || 'oss-cn-shenzhen',
  accessKeyId: process.env.OSS_ACCESS_KEY_ID,
  accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
  bucket: process.env.OSS_BUCKET || 'zuopingjiii',
});

const LOCAL_FILE = process.argv[2] || '/Users/mohe/Desktop/大族激光30周年.mp4';
const OSS_KEY = 'videos/anniversary-30th.mp4';

async function upload() {
  const stat = fs.statSync(LOCAL_FILE);
  const sizeMB = (stat.size / 1024 / 1024).toFixed(1);
  console.log(`📤 Uploading: ${LOCAL_FILE} (${sizeMB} MB)`);
  console.log(`📂 To: ${OSS_KEY}`);

  try {
    const result = await client.put(OSS_KEY, LOCAL_FILE, {
      mime: 'video/mp4',
      headers: { 'Cache-Control': 'public, max-age=31536000, immutable' },
    });
    console.log(`✅ Upload success!`);
    console.log(`🌐 URL: https://zuopingjiii.oss-cn-shenzhen.aliyuncs.com/${OSS_KEY}`);
  } catch (err) {
    console.error(`❌ Upload failed: ${err.message}`);
    process.exit(1);
  }
}

upload();
