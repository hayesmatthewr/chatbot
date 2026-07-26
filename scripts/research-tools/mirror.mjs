import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import * as cheerio from 'cheerio';

const ROOT = process.cwd();
const HTML_PATH = path.join(ROOT, 'docs/research/arq-8.com/page.html');
const PUBLIC_DIR = path.join(ROOT, 'public');
const MANIFEST_PATH = path.join(ROOT, 'docs/research/arq-8.com/assets-manifest.json');

const html = fs.readFileSync(HTML_PATH, 'utf8');
const $ = cheerio.load(html);

function abs(url) {
  if (!url) return null;
  if (url.startsWith('//')) return 'https:' + url;
  if (url.startsWith('http')) return url;
  if (url.startsWith('/')) return 'https://arq-8.com' + url;
  return null;
}

// same-origin theme assets + a curated allowlist of CDN libs actually used for
// visible UI (carousel/gallery). Third-party trackers/widgets/upsell apps are
// out of scope per the skill defaults (real backend / real-time features).
const ALLOWED_HOSTS = new Set(['arq-8.com', 'cdn.jsdelivr.net']);

function inScope(u) {
  try {
    const h = new URL(u).hostname;
    return ALLOWED_HOSTS.has(h);
  } catch {
    return false;
  }
}

const stylesheets = new Set();
$('link[rel=stylesheet]').each((i, el) => {
  const u = abs($(el).attr('href'));
  if (u && inScope(u)) stylesheets.add(u);
});

const scripts = new Set();
$('script[src]').each((i, el) => {
  const u = abs($(el).attr('src'));
  if (u && inScope(u)) scripts.add(u);
});

// importmap: theme JS modules loaded dynamically via `import('@theme/x')`,
// not as <script src> tags — must be mirrored too or behaviors break.
const importmapScript = $('script[type=importmap]').first().html();
const importmap = importmapScript ? JSON.parse(importmapScript) : { imports: {} };
for (const specifier of Object.keys(importmap.imports || {})) {
  const u = abs(importmap.imports[specifier]);
  if (u && inScope(u)) scripts.add(u);
}

// images: dedupe by base path (strip width/height query params), keep the
// largest width variant actually referenced.
const imageBest = new Map(); // basePath -> { url, width }
function considerImage(rawUrl) {
  const u = abs(rawUrl);
  if (!u) return;
  let parsed;
  try {
    parsed = new URL(u);
  } catch {
    return;
  }
  if (!inScope(u) && parsed.hostname !== 'arq-8.com') return;
  const width = parseInt(parsed.searchParams.get('width') || '0', 10);
  const basePath = parsed.origin + parsed.pathname;
  const existing = imageBest.get(basePath);
  if (!existing || width > existing.width) {
    imageBest.set(basePath, { url: u, width });
  }
}

$('img').each((i, el) => {
  considerImage($(el).attr('src') || $(el).attr('data-src'));
  const srcset = $(el).attr('srcset') || $(el).attr('data-srcset');
  if (srcset) srcset.split(',').forEach((s) => considerImage(s.trim().split(' ')[0]));
});
$('source').each((i, el) => {
  const srcset = $(el).attr('srcset');
  if (srcset) srcset.split(',').forEach((s) => considerImage(s.trim().split(' ')[0]));
});

const icons = new Set();
$('link[rel*=icon], link[rel=apple-touch-icon]').each((i, el) => {
  const u = abs($(el).attr('href'));
  if (u) icons.add(u);
});

console.log('Stylesheets:', stylesheets.size);
console.log('Scripts:', scripts.size);
console.log('Unique images:', imageBest.size);
console.log('Icons:', icons.size);

function localPathFor(url, kind) {
  const u = new URL(url);
  let p = u.pathname;
  // strip shopify cache-busting query, keep filename
  const base = path.basename(p).split('?')[0];
  const dir = { css: 'css', js: 'js', img: 'images', icon: 'seo' }[kind];
  return path.join(dir, base);
}

const manifest = { stylesheets: {}, scripts: {}, images: {}, icons: {} };
let count = 0;
const total = stylesheets.size + scripts.size + imageBest.size + icons.size;

function download(url, destRel) {
  const dest = path.join(PUBLIC_DIR, destRel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  count++;
  process.stdout.write(`[${count}/${total}] ${url} -> ${destRel}\n`);
  try {
    execFileSync(
      'curl',
      ['-sS', '-x', 'http://127.0.0.1:37377', '-A', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36', '-L', '--connect-timeout', '15', '-o', dest, url],
      { stdio: ['ignore', 'ignore', 'pipe'] }
    );
  } catch (e) {
    console.error('  FAILED', url, e.message);
    return null;
  }
  return destRel;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function run() {
  for (const url of stylesheets) {
    const rel = localPathFor(url, 'css');
    const ok = download(url, rel);
    if (ok) manifest.stylesheets[url] = rel;
    await sleep(250);
  }
  for (const url of scripts) {
    const rel = localPathFor(url, 'js');
    const ok = download(url, rel);
    if (ok) manifest.scripts[url] = rel;
    await sleep(250);
  }
  for (const [basePath, { url }] of imageBest) {
    const rel = localPathFor(url, 'img');
    const ok = download(url, rel);
    if (ok) manifest.images[basePath] = rel;
    await sleep(250);
  }
  for (const url of icons) {
    const rel = localPathFor(url, 'icon');
    const ok = download(url, rel);
    if (ok) manifest.icons[url] = rel;
    await sleep(250);
  }
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  console.log('Done. Manifest written to', MANIFEST_PATH);
}

run();
