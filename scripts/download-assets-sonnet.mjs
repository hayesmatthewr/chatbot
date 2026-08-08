import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const ROOT = process.cwd();
const IMG_URLS = JSON.parse(fs.readFileSync(path.join(ROOT, 'docs/research/takesonnet.com/image-urls.json'), 'utf8'));
const OUT_IMAGES = path.join(ROOT, 'public/images/sonnet');
const OUT_FONTS = path.join(ROOT, 'public/fonts/sonnet');

const FONTS = [
  ['https://takesonnet.com/cdn/shop/files/TT_Commons_Regular.otf?v=1691576043', 'TT-Commons-Regular.otf'],
  ['https://takesonnet.com/cdn/shop/files/TT_Commons_Medium.otf?v=1691576042', 'TT-Commons-Medium.otf'],
  ['https://takesonnet.com/cdn/shop/files/TT_Commons_DemiBold.otf?v=1691576043', 'TT-Commons-Semibold.otf'],
  ['https://takesonnet.com/cdn/shop/files/TT_Commons_Bold.otf?v=1691576043', 'TT-Commons-Bold.otf'],
];

// dedupe images by basename (without width param), keep the largest width variant
function baseKey(u) {
  const url = new URL(u);
  const file = path.basename(url.pathname);
  return file;
}
function widthOf(u) {
  const m = u.match(/[?&]width=(\d+)/);
  return m ? parseInt(m[1], 10) : 0;
}
const best = new Map();
for (const u of IMG_URLS) {
  const k = baseKey(u);
  if (!best.has(k) || widthOf(u) > widthOf(best.get(k))) best.set(k, u);
}
console.log('Unique image files:', best.size);

function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

function download(url, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  try {
    execFileSync(
      'curl',
      ['-sS', '-x', process.env.HTTPS_PROXY, '-A', 'Mozilla/5.0', '-L', '--connect-timeout', '15', '-o', dest, url],
      { stdio: ['ignore', 'ignore', 'pipe'] }
    );
    return true;
  } catch (e) {
    console.error('  FAILED', url, e.message);
    return false;
  }
}

async function run() {
  let i = 0;
  const total = best.size + FONTS.length;
  for (const [file, url] of best) {
    i++;
    const dest = path.join(OUT_IMAGES, file);
    process.stdout.write(`[${i}/${total}] ${url} -> images/sonnet/${file}\n`);
    download(url, dest);
    await sleep(150);
  }
  for (const [url, filename] of FONTS) {
    i++;
    const dest = path.join(OUT_FONTS, filename);
    process.stdout.write(`[${i}/${total}] ${url} -> fonts/sonnet/${filename}\n`);
    download(url, dest);
    await sleep(150);
  }
  console.log('Done.');
}

run();
