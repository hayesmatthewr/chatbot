import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const ROOT = process.cwd();
const CSS_DIR = path.join(ROOT, 'docs/research/arq-8.com/theme-assets/css');
const PUBLIC_IMAGES = path.join(ROOT, 'public/images');

const urlRe = /url\((['"]?)(\/cdn\/[^)'"]+|\/\/arq-8\.com\/cdn\/[^)'"]+|https:\/\/arq-8\.com\/cdn\/[^)'"]+)\1\)/g;

const files = fs.readdirSync(CSS_DIR).filter((f) => f.endsWith('.css'));
const refs = new Map(); // absUrl -> Set(cssFile)

for (const file of files) {
  const full = path.join(CSS_DIR, file);
  const content = fs.readFileSync(full, 'utf8');
  let m;
  while ((m = urlRe.exec(content))) {
    let u = m[2];
    if (u.startsWith('/cdn/')) u = 'https://arq-8.com' + u;
    else if (u.startsWith('//')) u = 'https:' + u;
    if (!refs.has(u)) refs.set(u, new Set());
    refs.get(u).add(file);
  }
}

console.log('Found', refs.size, 'unique url() refs across', files.length, 'CSS files');

// only download the image ones (fonts already fetched separately)
const imageExt = /\.(jpe?g|png|webp|svg|gif|avif)(\?|$)/i;
const toDownload = [...refs.keys()].filter((u) => imageExt.test(u));
console.log('Downloading', toDownload.length, 'CSS-referenced images');

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

const rewriteMap = new Map(); // originalUrlPath (as it appears in css, e.g. /cdn/shop/files/x.jpg?v=..) -> local path

async function run() {
  let i = 0;
  for (const url of toDownload) {
    i++;
    const u = new URL(url);
    const filename = path.basename(u.pathname);
    const dest = path.join(PUBLIC_IMAGES, filename);
    process.stdout.write(`[${i}/${toDownload.length}] ${url} -> images/${filename}\n`);
    try {
      execFileSync(
        'curl',
        ['-sS', '-x', 'http://127.0.0.1:37377', '-A', 'Mozilla/5.0', '--connect-timeout', '15', '-o', dest, url],
        { stdio: ['ignore', 'ignore', 'pipe'] }
      );
      rewriteMap.set(url, `/public/images/${filename}`);
    } catch (e) {
      console.error('  FAILED', url, e.message);
    }
    await sleep(250);
  }

  // rewrite CSS files in place
  for (const file of files) {
    const full = path.join(CSS_DIR, file);
    let content = fs.readFileSync(full, 'utf8');
    let changed = false;
    content = content.replace(urlRe, (full0, quote, rawPath) => {
      let abs = rawPath;
      if (abs.startsWith('/cdn/')) abs = 'https://arq-8.com' + abs;
      else if (abs.startsWith('//')) abs = 'https:' + abs;
      const local = rewriteMap.get(abs);
      if (local) {
        changed = true;
        return `url(${local})`;
      }
      return full0;
    });
    if (changed) fs.writeFileSync(full, content);
  }

  console.log('Done. Rewrote', rewriteMap.size, 'references across CSS files.');
}

run();
