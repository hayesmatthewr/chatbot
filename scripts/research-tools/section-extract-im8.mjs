import fs from 'node:fs';
import { launch, newPage } from './browser.mjs';

const URL = 'http://localhost:8123/scripts/research-tools/mirror-out/im8-longevity.html';
const SHOTS_DIR = 'docs/design-references/im8health.com';
const RESEARCH_DIR = 'docs/research/im8health.com';

const SECTIONS = [
  ['#shopify-section-sections--17653237219495__im8_announcement_bar_timer_UgrHrt', 'announcement-bar'],
  ['#shopify-section-sections--17653237219495__header', 'header'],
  ['#shopify-section-template--20788162134183__main', 'product-main'],
  ['#shopify-section-template--20788162134183__longevity_doctors_grid', 'doctors-grid'],
  ['#shopify-section-template--20788162134183__longevity_nad_decline', 'nad-decline'],
  ['#shopify-section-template--20788162134183__longevity_mitochondria', 'mitochondria'],
  ['#shopify-section-template--20788162134183__longevity_evidence_stats', 'evidence-stats'],
  ['#shopify-section-template--20788162134183__longevity_hallmarks_grid', 'hallmarks-grid'],
  ['#shopify-section-template--20788162134183__longevity_decades_timeline', 'decades-timeline'],
  ['#shopify-section-template--20788162134183__longevity_comparison', 'comparison'],
  ['#shopify-section-template--20788162134183__longevity_stack_synergy', 'stack-synergy'],
  ['#shopify-section-template--20788162134183__longevity_risk_free', 'risk-free'],
  ['#shopify-section-template--20788162134183__longevity_faq', 'faq'],
  ['#shopify-section-sections--17653237252263__footer', 'footer'],
];

const PROPS = [
  'fontSize', 'fontWeight', 'fontFamily', 'lineHeight', 'letterSpacing', 'color',
  'textTransform', 'backgroundColor', 'padding', 'display', 'flexDirection',
  'justifyContent', 'alignItems', 'gap', 'gridTemplateColumns', 'borderRadius',
  'border', 'boxShadow', 'maxWidth',
];

async function run() {
  const browser = await launch({ useProxy: false });
  const { page } = await newPage(browser, { width: 1440, height: 1000 });
  await page.goto(URL, { waitUntil: 'load', timeout: 30000 });
  await page.waitForTimeout(1200);

  const report = {};
  for (const [sel, name] of SECTIONS) {
    const el = await page.$(sel);
    if (!el) { report[name] = { found: false, selector: sel }; continue; }
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    try {
      await el.screenshot({ path: `${SHOTS_DIR}/section-${name}.png` });
    } catch (e) { console.error('screenshot failed', name, e.message); }

    const data = await el.evaluate((node, props) => {
      function extractStyles(element) {
        const cs = getComputedStyle(element);
        const out = {};
        props.forEach((p) => (out[p] = cs[p]));
        return out;
      }
      const headings = [...node.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((h) => ({ tag: h.tagName.toLowerCase(), text: h.textContent.trim() }));
      const buttons = [...node.querySelectorAll('button, a.button, a[class*=btn]')].map((b) => b.textContent.trim()).filter(Boolean);
      const text = node.innerText.trim().slice(0, 3500);
      return { containerStyles: extractStyles(node), headings, buttons, text };
    }, PROPS);

    report[name] = { found: true, selector: sel, ...data };
    console.log('extracted', name, '-', data.headings.length, 'headings');
  }

  fs.writeFileSync(`${RESEARCH_DIR}/sections-extract.json`, JSON.stringify(report, null, 2));
  console.log('Wrote sections-extract.json');
  await browser.close();
}

run().catch((e) => { console.error(e); process.exit(1); });
