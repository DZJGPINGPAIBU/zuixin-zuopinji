import OSS from 'ali-oss';
import fs from 'fs';
import path from 'path';
import os from 'os';

const BACKUP_DIR = path.resolve(os.homedir(), 'zuopinji-backup');

const client = new OSS({
  region: process.env.OSS_REGION || 'oss-cn-shenzhen',
  accessKeyId: process.env.OSS_ACCESS_KEY_ID,
  accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
  bucket: process.env.OSS_BUCKET || 'zuopingjiii',
});

const MIME_MAP = {
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
  '.webp': 'image/webp', '.gif': 'image/gif', '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4', '.mov': 'video/quicktime', '.webm': 'video/webm',
  '.pdf': 'application/pdf',
};

function getMime(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return MIME_MAP[ext] || 'application/octet-stream';
}

function walkSync(dir, baseDir) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      files.push(...walkSync(full, baseDir));
    } else {
      files.push({ localPath: full, ossPath: path.relative(baseDir, full) });
    }
  }
  return files;
}

async function uploadAll() {
  console.log('🔍 Scanning files...');
  const imagesFiles = walkSync(path.join(BACKUP_DIR, 'images'), BACKUP_DIR);
  const videosFiles = walkSync(path.join(BACKUP_DIR, 'videos'), BACKUP_DIR);
  const allFiles = [...imagesFiles, ...videosFiles];
  console.log(`📦 Found ${allFiles.length} files to upload\n`);

  let uploaded = 0, skipped = 0, errors = 0;
  const totalSize = allFiles.reduce((s, f) => s + fs.statSync(f.localPath).size, 0);
  console.log(`📊 Total: ${(totalSize / 1024 / 1024).toFixed(1)} MB\n`);

  for (const { localPath, ossPath } of allFiles) {
    const ossKey = ossPath; // e.g. "images/3c/ecom_01.jpg"
    try {
      // Check if file already exists with same size
      try {
        const head = await client.head(ossKey);
        const localSize = fs.statSync(localPath).size;
        if (head.res?.headers?.['content-length'] && parseInt(head.res.headers['content-length']) === localSize) {
          console.log(`  ⏭️  ${ossKey} (unchanged)`);
          skipped++;
          continue;
        }
      } catch (_) { /* not exists, upload */ }

      await client.put(ossKey, localPath, {
        mime: getMime(localPath),
        headers: { 'Cache-Control': 'public, max-age=31536000, immutable' },
      });
      const mb = (fs.statSync(localPath).size / 1024 / 1024).toFixed(1);
      console.log(`  ✅ ${ossKey} (${mb} MB)`);
      uploaded++;
    } catch (err) {
      console.error(`  ❌ ${ossKey}: ${err.message}`);
      errors++;
    }
  }

  console.log(`\n✨ Done! Uploaded: ${uploaded} | Skipped: ${skipped} | Errors: ${errors}`);
  console.log(`🌐 CDN URL: https://zuopingjiii.oss-cn-shenzhen.aliyuncs.com/`);
}

uploadAll().catch(err => { console.error('Upload failed:', err); process.exit(1); });
