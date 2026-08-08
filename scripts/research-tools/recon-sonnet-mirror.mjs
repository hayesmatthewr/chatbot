import fs from 'node:fs';
import { launch, newPage } from './browser.mjs';

const URL = 'http://localhost:8123/scripts/research-tools/mirror-out/sonnet-core-sleep.html';
const DESIGN_DIR = 'docs/design-references/takesonnet.com';
const RESEARCH_DIR = 'docs/research/takesonnet.com';

async function capture(browser, viewport, name) {
  const { context, page } = await newPage(browser, viewport);
  await page.goto(URL, { waitUntil: 'load', timeout: 30000 });
  await page.waitForTimeout(1000);
  const height = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < height; y += viewport.height) {
    await page.evaluate((y) => window.scrollTo(0, y), y);
    await page.waitForTimeout(200);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${DESIGN_DIR}/mirror-${name}-full.png`, fullPage: true });

  if (name === 'desktop') {
    const info = await page.evaluate(() => {
      const cs = getComputedStyle(document.body);
      return {
        bodyFont: cs.fontFamily,
        htmlClass: document.documentElement.className,
        h1: document.querySelector('h1') ? getComputedStyle(document.querySelector('h1')).fontFamily : null,
      };
    });
    console.log('sanity check:', JSON.stringify(info));
  }
  await context.close();
}

async function run() {
  const browser = await launch({ useProxy: false });
  await capture(browser, { width: 1440, height: 1000 }, 'desktop');
  await capture(browser, { width: 390, height: 900 }, 'mobile');
  await browser.close();
  console.log('Mirror recon complete.');
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
