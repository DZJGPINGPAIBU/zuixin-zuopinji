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

const mapping = {
  // === CIIF: 深蓝色系 (文件名含工博会/MWCS) ===
  '25工博会-主K.jpg':                 'images/exhibition/ciif_01_main.jpg',
  '北大厅南出口广告落地看板.jpg':      'images/exhibition/ciif_02_keyvisual.jpg',
  'MWCS参观指南广告（封二对页）.jpg':   'images/exhibition/ciif_03_guide.jpg',
  'MWCS观众指南广告.jpg':              'images/exhibition/ciif_04_visitor.jpg',
  '工博会-邀请函(转曲)_画板 1 副本.jpg':'images/exhibition/ciif_05_invite.jpg',

  // === CIOE Banner: 浅蓝灰色系 (文件名含光博会) ===
  '光博会-族启未来，光驭世界 1.png':    'images/exhibition/cioe_01_banner.jpg',
  '01f8da990b58c7aceb773390be62cd7a 1.png': 'images/exhibition/cioe_02_banner.jpg',
  // === CIOE Mobile: 蓝灰色系 ===
  '535680476c6eb896de13890f1d43cf4e 1.png':'images/exhibition/cioe_03_mobile_a.jpg',
  'cf8984d557352894d193d0c1375e1b9e 1.png':'images/exhibition/cioe_04_mobile_b.jpg',

  // === CHTF Banner: 红/暖色系 (文件名含高交会) ===
  '24年高交会---官网banner-02 1.png':  'images/exhibition/chtf_01_banner.jpg',
  '效果1 1.png':                       'images/exhibition/chtf_02_banner.jpg',
  // === CHTF Mobile: 粉灰色系 ===
  '移动效果1 1.png':                   'images/exhibition/chtf_03_mobile_a.jpg',
  '移动效果2 1.png':                   'images/exhibition/chtf_04_mobile_b.jpg',
};

const dir = '/Users/mohe/Desktop/展会视觉';
for (const [src, key] of Object.entries(mapping)) {
  const fp = path.join(dir, src);
  const ext = path.extname(src).toLowerCase();
  const mime = ext === '.png' ? 'image/png' : 'image/jpeg';
  const s = fs.statSync(fp);
  const colorNote = {
    '25工博会-主K.jpg':'🔵深蓝','光博会-族启未来，光驭世界 1.png':'🔵浅蓝灰',
    '535680476c6eb896de13890f1d43cf4e 1.png':'🔵蓝灰','24年高交会---官网banner-02 1.png':'🔴暖红',
    '移动效果1 1.png':'🔴粉灰'
  }[src] || '';
  console.log(`${colorNote} 📤 ${src} → ${key}`);
  await client.put(key, fp, { mime, headers: { 'Cache-Control': 'public, max-age=31536000, immutable' } });
}
console.log('✅ Done! 颜色+内容精准匹配');
