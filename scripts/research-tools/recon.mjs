import fs from 'node:fs';
import { launch, newPage } from './browser.mjs';

const URL = 'http://localhost:8123/mirror/arq8-gummies.html';
const OUT_DIR = 'docs/design-references/arq-8.com';
const RESEARCH_DIR = 'docs/research/arq-8.com';

const PROPS = [
  'fontSize', 'fontWeight', 'fontFamily', 'lineHeight', 'letterSpacing', 'color',
  'textTransform', 'backgroundColor', 'padding', 'margin', 'display',
  'flexDirection', 'justifyContent', 'alignItems', 'gap', 'gridTemplateColumns',
  'borderRadius', 'border', 'boxShadow', 'position', 'top', 'zIndex', 'transition',
];

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function run() {
  const browser = await launch();
  const { page } = await newPage(browser, { width: 1440, height: 900 });
  await page.goto(URL, { waitUntil: 'load', timeout: 30000 });
  await page.waitForTimeout(1500);

  const report = {};

  // --- global computed styles ---
  report.globals = await page.evaluate((props) => {
    function extract(sel) {
      const el = document.querySelector(sel);
      if (!el) return null;
      const cs = getComputedStyle(el);
      const out = {};
      props.forEach((p) => (out[p] = cs[p]));
      return out;
    }
    return {
      body: extract('body'),
      h1: extract('h1'),
      h2: extract('.backed h2, section h2'),
      h3: extract('h3'),
      p: extract('p'),
      primaryButton: extract('button, .button, a.button'),
    };
  }, PROPS);

  // --- header scroll behavior ---
  const headerBefore = await page.evaluate((props) => {
    const el = document.querySelector('#shopify-section-sections--27726639923546__header_2_FTbHzx, .header, header');
    if (!el) return null;
    const cs = getComputedStyle(el);
    const out = {};
    props.forEach((p) => (out[p] = cs[p]));
    return out;
  }, PROPS);
  await page.evaluate(() => window.scrollTo(0, 400));
  await page.waitForTimeout(600);
  const headerAfter = await page.evaluate((props) => {
    const el = document.querySelector('#shopify-section-sections--27726639923546__header_2_FTbHzx, .header, header');
    if (!el) return null;
    const cs = getComputedStyle(el);
    const out = {};
    props.forEach((p) => (out[p] = cs[p]));
    return out;
  }, PROPS);
  report.headerScroll = { before: headerBefore, after: headerAfter };
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);

  fs.writeFileSync(`${RESEARCH_DIR}/global-styles.json`, JSON.stringify(report, null, 2));
  console.log('Wrote global-styles.json');

  await browser.close();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
