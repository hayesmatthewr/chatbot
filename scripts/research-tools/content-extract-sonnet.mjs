import fs from 'node:fs';
import { launch, newPage } from './browser.mjs';

const URL = 'http://localhost:8123/scripts/research-tools/mirror-out/sonnet-core-sleep.html';
const RESEARCH_DIR = 'docs/research/takesonnet.com';

const PROPS = [
  'fontSize', 'fontWeight', 'fontFamily', 'lineHeight', 'letterSpacing', 'color',
  'textTransform', 'backgroundColor', 'padding', 'margin', 'display',
  'flexDirection', 'justifyContent', 'alignItems', 'gap', 'gridTemplateColumns',
  'borderRadius', 'border', 'boxShadow', 'maxWidth', 'width',
];

const SECTIONS = [
  ['#header-group', 'header-group'],
  ['[id*=usp_table]', 'usp-table'],
  ['[id*=product_ingredients]', 'product-ingredients'],
  ['main#MainContent', 'main-content'],
  ['footer[id*=footer]', 'footer'],
];

function extractStyles(el, props) {
  const cs = getComputedStyle(el);
  const out = {};
  props.forEach((p) => (out[p] = cs[p]));
  return out;
}

async function run() {
  const browser = await launch({ useProxy: false });
  const { page } = await newPage(browser, { width: 1440, height: 1000 });
  await page.goto(URL, { waitUntil: 'load', timeout: 30000 });
  await page.waitForTimeout(800);

  const report = {};
  for (const [sel, name] of SECTIONS) {
    const els = await page.$$(sel);
    report[name] = [];
    for (const el of els) {
      const data = await el.evaluate((node, props) => {
        function extractStyles(element) {
          const cs = getComputedStyle(element);
          const out = {};
          props.forEach((p) => { const v = cs[p]; if (v) out[p] = v; });
          return out;
        }
        const headings = [...node.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((h) => ({ tag: h.tagName.toLowerCase(), text: h.textContent.trim() }));
        return {
          id: node.id,
          classes: node.className?.toString().slice(0, 200),
          containerStyles: extractStyles(node),
          headings,
          text: node.innerText ? node.innerText.trim().slice(0, 6000) : '',
        };
      }, PROPS);
      report[name].push(data);
    }
  }

  fs.writeFileSync(`${RESEARCH_DIR}/content-extract.json`, JSON.stringify(report, null, 2));
  console.log('Wrote content-extract.json');

  // Also dump full body innerText for reference
  const fullText = await page.evaluate(() => document.body.innerText);
  fs.writeFileSync(`${RESEARCH_DIR}/full-text.txt`, fullText);
  console.log('Wrote full-text.txt');

  await browser.close();
}

run().catch((e) => { console.error(e); process.exit(1); });
