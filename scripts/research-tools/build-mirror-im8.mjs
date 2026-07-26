import fs from 'node:fs';
import path from 'node:path';
import * as cheerio from 'cheerio';

const ROOT = process.cwd();
const SITE = 'im8health.com';
const HTML_PATH = path.join(ROOT, `docs/research/${SITE}/page.html`);
const MANIFEST_PATH = path.join(ROOT, `docs/research/${SITE}/assets-manifest.json`);
const OUT_PATH = path.join(ROOT, 'scripts/research-tools/mirror-out/im8-longevity.html');
const PLACEHOLDER = '/scripts/research-tools/placeholder.svg';

const html = fs.readFileSync(HTML_PATH, 'utf8');
const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
const $ = cheerio.load(html, { decodeEntities: false });

function abs(url) {
  if (!url) return null;
  if (url.startsWith('//')) return 'https:' + url;
  if (url.startsWith('http')) return url;
  if (url.startsWith('/')) return 'https://' + SITE + url;
  return null;
}

function localUrl(rel) {
  if (!rel) return rel;
  return `/docs/research/${SITE}/theme-assets/` + rel;
}

// scripts: keep only mirrored theme JS, drop everything else (third-party trackers etc.)
$('script[src]').each((i, el) => {
  const u = abs($(el).attr('src'));
  if (u && manifest.scripts[u]) $(el).attr('src', localUrl(manifest.scripts[u]));
  else $(el).remove();
});
$('script:not([src])').each((i, el) => {
  const content = $(el).html() || '';
  if (/analytics|klaviyo|gtag|dataLayer|Shopify\.analytics|monorail/i.test(content)) $(el).remove();
});

$('script[type=importmap]').each((i, el) => {
  const map = JSON.parse($(el).html());
  for (const specifier of Object.keys(map.imports || {})) {
    const u = abs(map.imports[specifier]);
    const local = u && manifest.scripts[u];
    if (local) map.imports[specifier] = localUrl(local);
  }
  $(el).html(JSON.stringify(map, null, 2));
});

$('link[rel=stylesheet]').each((i, el) => {
  const u = abs($(el).attr('href'));
  if (u && manifest.stylesheets[u]) $(el).attr('href', localUrl(manifest.stylesheets[u]));
  else $(el).remove();
});
$('link[rel=preload], link[rel=dns-prefetch], link[rel=preconnect]').each((i, el) => $(el).remove());
$('link[rel=modulepreload]').each((i, el) => {
  const u = abs($(el).attr('href'));
  const local = u && manifest.scripts[u];
  if (local) $(el).attr('href', localUrl(local));
  else $(el).remove();
});

// images: swap EVERY real image for the placeholder graphic (per instruction:
// use placeholders instead of real images). Keep width/height/alt so layout
// metrics stay accurate during extraction.
$('img').each((i, el) => {
  $(el).attr('src', PLACEHOLDER);
  $(el).removeAttr('srcset');
  $(el).removeAttr('data-src');
  $(el).removeAttr('data-srcset');
});
$('source').each((i, el) => {
  $(el).removeAttr('srcset');
});
$('link[rel*=icon], link[rel=apple-touch-icon]').each((i, el) => $(el).remove());

fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
fs.writeFileSync(OUT_PATH, $.html());
console.log('Wrote', OUT_PATH);
