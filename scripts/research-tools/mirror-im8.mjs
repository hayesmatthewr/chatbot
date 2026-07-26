import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import * as cheerio from 'cheerio';

const ROOT = process.cwd();
const SITE = 'im8health.com';
const HTML_PATH = path.join(ROOT, `docs/research/${SITE}/page.html`);
const CSS_JS_DIR = path.join(ROOT, `docs/research/${SITE}/theme-assets`);
const FONTS_DIR = path.join(ROOT, 'public/fonts');
const MANIFEST_PATH = path.join(ROOT, `docs/research/${SITE}/assets-manifest.json`);

const html = fs.readFileSync(HTML_PATH, 'utf8');
const $ = cheerio.load(html);

function abs(url) {
  if (!url) return null;
  if (url.startsWith('//')) return 'https:' + url;
  if (url.startsWith('http')) return url;
  if (url.startsWith('/')) return 'https://' + SITE + url;
  return null;
}

const ALLOWED_HOSTS = new Set([SITE, 'cdn.jsdelivr.net']);
function inScope(u) {
  try {
    return ALLOWED_HOSTS.has(new URL(u).hostname);
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
const importmapScript = $('script[type=importmap]').first().html();
const importmap = importmapScript ? JSON.parse(importmapScript) : { imports: {} };
for (const specifier of Object.keys(importmap.imports || {})) {
  const u = abs(importmap.imports[specifier]);
  if (u && inScope(u)) scripts.add(u);
}

console.log('Stylesheets:', stylesheets.size, ' Scripts:', scripts.size);

function localPathFor(url, kind) {
  const u = new URL(url);
  const base = path.basename(u.pathname).split('?')[0];
  return path.join(kind, base);
}

const manifest = { stylesheets: {}, scripts: {} };
let count = 0;
const total = stylesheets.size + scripts.size;

function download(url, destDir, destRel) {
  const dest = path.join(destDir, destRel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  count++;
  process.stdout.write(`[${count}/${total}] ${url} -> ${destRel}\n`);
  try {
    execFileSync(
      'curl',
      ['-sS', '-x', process.env.HTTPS_PROXY, '-A', 'Mozilla/5.0', '-L', '--connect-timeout', '15', '-o', dest, url],
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
    const ok = download(url, CSS_JS_DIR, rel);
    if (ok) manifest.stylesheets[url] = rel;
    await sleep(250);
  }
  for (const url of scripts) {
    const rel = localPathFor(url, 'js');
    const ok = download(url, CSS_JS_DIR, rel);
    if (ok) manifest.scripts[url] = rel;
    await sleep(250);
  }
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  console.log('Done. Manifest written to', MANIFEST_PATH);
}

run();
