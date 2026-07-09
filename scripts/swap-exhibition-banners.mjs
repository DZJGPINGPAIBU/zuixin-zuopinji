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

// Copy to temp keys, then swap
const pairs = [
  ['images/exhibition/cioe_01_banner.jpg', 'images/exhibition/chtf_01_banner.jpg'],
  ['images/exhibition/cioe_02_banner.jpg', 'images/exhibition/chtf_02_banner.jpg'],
];

for (const [a, b] of pairs) {
  const tmpA = a + '.tmp_swap';
  const tmpB = b + '.tmp_swap';

  console.log(`📋 ${a} → ${tmpA}`);
  await client.copy(tmpA, a);
  console.log(`📋 ${b} → ${tmpB}`);
  await client.copy(tmpB, b);

  console.log(`🔄 ${b} ← ${tmpA}`);
  await client.copy(b, tmpA);
  console.log(`🔄 ${a} ← ${tmpB}`);
  await client.copy(a, tmpB);

  await client.delete(tmpA);
  await client.delete(tmpB);
}
console.log('✅ Swapped!');
