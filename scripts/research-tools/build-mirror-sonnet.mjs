import fs from 'node:fs';
import path from 'node:path';
import * as cheerio from 'cheerio';

const ROOT = process.cwd();
const SITE = 'takesonnet.com';
const HTML_PATH = path.join(ROOT, `docs/research/${SITE}/page.html`);
const MANIFEST_PATH = path.join(ROOT, `docs/research/${SITE}/assets-manifest.json`);
const OUT_PATH = path.join(ROOT, 'scripts/research-tools/mirror-out/sonnet-core-sleep.html');

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
  return '/docs/research/' + SITE + '/theme-assets/' + rel;
}

// Drop all scripts entirely - we only need static styled markup for CSS/screenshot extraction
$('script').each((i, el) => $(el).remove());

// keep only allowlisted stylesheets, drop the rest (analytics/preload/etc)
$('link[rel=stylesheet]').each((i, el) => {
  const u = abs($(el).attr('href') || $(el).attr('data-href'));
  if (u && manifest.stylesheets[u]) {
    $(el).attr('href', localUrl(manifest.stylesheets[u]));
    $(el).removeAttr('data-href');
    $(el).removeAttr('media');
  } else {
    $(el).remove();
  }
});

$('link[rel=preload]').each((i, el) => $(el).remove());
$('link[rel=dns-prefetch], link[rel=preconnect]').each((i, el) => $(el).remove());
$('link[rel=modulepreload]').each((i, el) => $(el).remove());
$('noscript').each((i, el) => $(el).remove());

// absolute-ify all image/source urls so they resolve to the live CDN regardless of local origin
$('img').each((i, el) => {
  ['src', 'data-src'].forEach((attr) => {
    const v = $(el).attr(attr);
    if (v) $(el).attr(attr, abs(v));
  });
  ['srcset', 'data-srcset'].forEach((attr) => {
    const v = $(el).attr(attr);
    if (!v) return;
    const rewritten = v
      .split(',')
      .map((part) => {
        const [u, size] = part.trim().split(/\s+/);
        const a = abs(u);
        return a ? `${a} ${size || ''}`.trim() : null;
      })
      .filter(Boolean)
      .join(', ');
    if (rewritten) $(el).attr(attr, rewritten);
  });
});
$('source').each((i, el) => {
  const v = $(el).attr('srcset');
  if (!v) return;
  const rewritten = v
    .split(',')
    .map((part) => {
      const [u, size] = part.trim().split(/\s+/);
      const a = abs(u);
      return a ? `${a} ${size || ''}`.trim() : null;
    })
    .filter(Boolean)
    .join(', ');
  if (rewritten) $(el).attr('srcset', rewritten);
});
$('link[rel*=icon], link[rel=apple-touch-icon]').each((i, el) => {
  const v = $(el).attr('href');
  if (v) $(el).attr('href', abs(v));
});

// remove the "no-js" class since we're not running JS - force the styled state
$('html').attr('class', 'js');

fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
fs.writeFileSync(OUT_PATH, $.html());
console.log('Wrote', OUT_PATH);
