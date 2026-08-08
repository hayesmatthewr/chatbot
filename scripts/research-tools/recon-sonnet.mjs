import fs from 'node:fs';
import { launch, newPage, installThrottle } from './browser.mjs';

const URL = 'https://takesonnet.com/products/core-sleep';
const DESIGN_DIR = 'docs/design-references/takesonnet.com';
const RESEARCH_DIR = 'docs/research/takesonnet.com';

async function capture(browser, viewport, name) {
  const { context, page } = await newPage(browser, viewport);
  installThrottle(context, { intervalMs: 200 });
  await page.goto(URL, { waitUntil: 'load', timeout: 60000 });
  await page.waitForTimeout(2500);
  await page.screenshot({ path: `${DESIGN_DIR}/${name}-top.png` });
  // scroll through in steps to trigger lazy content, then full page screenshot
  const height = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < height; y += viewport.height) {
    await page.evaluate((y) => window.scrollTo(0, y), y);
    await page.waitForTimeout(400);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${DESIGN_DIR}/${name}-full.png`, fullPage: true });

  let assets = null;
  if (name === 'desktop') {
    assets = await page.evaluate(() => {
      return {
        images: [...document.querySelectorAll('img')].map((img) => ({
          src: img.currentSrc || img.src,
          alt: img.alt,
          width: img.naturalWidth,
          height: img.naturalHeight,
          parentClasses: img.parentElement?.className,
          position: getComputedStyle(img).position,
          zIndex: getComputedStyle(img).zIndex,
        })),
        videos: [...document.querySelectorAll('video')].map((v) => ({
          src: v.src || v.querySelector('source')?.src,
          poster: v.poster,
          autoplay: v.autoplay,
          loop: v.loop,
          muted: v.muted,
        })),
        backgroundImages: [...document.querySelectorAll('*')]
          .filter((el) => {
            const bg = getComputedStyle(el).backgroundImage;
            return bg && bg !== 'none';
          })
          .map((el) => ({
            url: getComputedStyle(el).backgroundImage,
            element: el.tagName + '.' + (el.className?.toString().split(' ')[0] || ''),
          })),
        svgCount: document.querySelectorAll('svg').length,
        fonts: [...new Set([...document.querySelectorAll('*')].slice(0, 400).map((el) => getComputedStyle(el).fontFamily))],
        favicons: [...document.querySelectorAll('link[rel*="icon"]')].map((l) => ({ href: l.href, sizes: l.sizes?.toString() })),
        sections: [...document.querySelectorAll('body > *, main > *, [id^="shopify-section"]')].map((el) => ({
          tag: el.tagName,
          id: el.id,
          classes: el.className?.toString().slice(0, 200),
        })),
      };
    });
    fs.writeFileSync(`${RESEARCH_DIR}/assets-discovery.json`, JSON.stringify(assets, null, 2));
    fs.writeFileSync(`${RESEARCH_DIR}/page-full.html`, await page.content());
  }

  await context.close();
}

async function run() {
  fs.mkdirSync(DESIGN_DIR, { recursive: true });
  fs.mkdirSync(RESEARCH_DIR, { recursive: true });
  const browser = await launch();
  await capture(browser, { width: 1440, height: 900 }, 'desktop');
  await capture(browser, { width: 390, height: 844 }, 'mobile');
  await browser.close();
  console.log('Recon complete.');
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
