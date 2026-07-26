import fs from 'node:fs';
import path from 'node:path';
import * as cheerio from 'cheerio';

const ROOT = process.cwd();
const HTML_PATH = path.join(ROOT, 'docs/research/arq-8.com/page.html');
const MANIFEST_PATH = path.join(ROOT, 'docs/research/arq-8.com/assets-manifest.json');
const OUT_PATH = path.join(ROOT, 'scripts/research-tools/mirror-out/arq8-gummies.html');

const html = fs.readFileSync(HTML_PATH, 'utf8');
const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
const $ = cheerio.load(html, { decodeEntities: false });

function abs(url) {
  if (!url) return null;
  if (url.startsWith('//')) return 'https:' + url;
  if (url.startsWith('http')) return url;
  if (url.startsWith('/')) return 'https://arq-8.com' + url;
  return null;
}


function localUrl(rel) {
  if (!rel) return rel;
  if (rel.startsWith('css/') || rel.startsWith('js/')) {
    return '/docs/research/arq-8.com/theme-assets/' + rel;
  }
  return '/public/' + rel;
}

function stripQuery(u) {
  try {
    const parsed = new URL(u);
    return parsed.origin + parsed.pathname;
  } catch {
    return u;
  }
}

// remove all scripts/stylesheets not in our allowlist mirror (third-party
// trackers etc.) so the local page doesn't try (and fail) to hit the network
$('script[src]').each((i, el) => {
  const u = abs($(el).attr('src'));
  if (u && manifest.scripts[u]) {
    $(el).attr('src', localUrl(manifest.scripts[u]));
  } else {
    $(el).remove();
  }
});
// inline scripts referencing shopify analytics APIs are harmless to keep or drop; drop to avoid console noise/hangs
$('script:not([src])').each((i, el) => {
  const content = $(el).html() || '';
  if (/analytics|klaviyo|gtag|dataLayer|Shopify\.analytics|monorail/i.test(content)) {
    $(el).remove();
  }
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
  if (u && manifest.stylesheets[u]) {
    $(el).attr('href', localUrl(manifest.stylesheets[u]));
  } else {
    $(el).remove();
  }
});

$('link[rel=preload]').each((i, el) => $(el).remove());
$('link[rel=dns-prefetch], link[rel=preconnect]').each((i, el) => $(el).remove());
$('link[rel=modulepreload]').each((i, el) => {
  const u = abs($(el).attr('href'));
  const local = u && manifest.scripts[u];
  if (local) {
    $(el).attr('href', localUrl(local));
  } else {
    $(el).remove();
  }
});

function localImageFor(rawUrl) {
  const u = abs(rawUrl);
  if (!u) return null;
  const base = stripQuery(u);
  return manifest.images[base] || null;
}

$('img').each((i, el) => {
  const src = $(el).attr('src') || $(el).attr('data-src');
  const local = localImageFor(src);
  if (local) $(el).attr('src', localUrl(local));
  ['srcset', 'data-srcset'].forEach((attr) => {
    const val = $(el).attr(attr);
    if (!val) return;
    const rewritten = val
      .split(',')
      .map((part) => {
        const [u, size] = part.trim().split(/\s+/);
        const l = localImageFor(u);
        return l ? `${localUrl(l)} ${size || ''}`.trim() : null;
      })
      .filter(Boolean)
      .join(', ');
    if (rewritten) $(el).attr(attr, rewritten);
  });
});

$('source').each((i, el) => {
  const val = $(el).attr('srcset');
  if (!val) return;
  const rewritten = val
    .split(',')
    .map((part) => {
      const [u, size] = part.trim().split(/\s+/);
      const l = localImageFor(u);
      return l ? `${localUrl(l)} ${size || ''}`.trim() : null;
    })
    .filter(Boolean)
    .join(', ');
  if (rewritten) $(el).attr('srcset', rewritten);
});

$('link[rel*=icon], link[rel=apple-touch-icon]').each((i, el) => {
  const u = abs($(el).attr('href'));
  if (u && manifest.icons[u]) $(el).attr('href', localUrl(manifest.icons[u]));
});

fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
fs.writeFileSync(OUT_PATH, $.html());
console.log('Wrote', OUT_PATH);
