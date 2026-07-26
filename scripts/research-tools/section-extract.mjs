import fs from 'node:fs';
import { launch, newPage } from './browser.mjs';

const URL = 'http://localhost:8123/scripts/research-tools/mirror-out/arq8-gummies.html';
const SHOTS_DIR = 'docs/design-references/arq-8.com';
const RESEARCH_DIR = 'docs/research/arq-8.com';

// selector, working name — IDs pinned from the topology scan (unambiguous,
// unlike theme CSS classes which are sometimes reused across sections)
const SECTIONS = [
  ['#shopify-section-sections--27726639923546__header_top_bar', 'header-top-bar'],
  ['#shopify-section-sections--27726639923546__header_2_FTbHzx', 'header-nav'],
  ['#shopify-section-template--28123754135898__product_info_mono_CMVPkP', 'product-info'],
  ['#shopify-section-template--28123754135898__backed_AYzy6D', 'backed'],
  ['#shopify-section-template--28123754135898__before_after_product_zYqA8q', 'before-after'],
  ['#shopify-section-template--28123754135898__scrolling_line_CNhC7T', 'scrolling-line'],
  ['#shopify-section-template--28123754135898__modern_redesign_xcTig9', 'modern-redesign'],
  ['#shopify-section-template--28123754135898__sicom_tastes_good_L4GY48', 'tastes-good'],
  ['#shopify-section-template--28123754135898__four_ingridients_epXaiG', 'four-ingredients'],
  ['#shopify-section-template--28123754135898__sicom_leave_out_AYcUtz', 'leave-out'],
  ['#shopify-section-template--28123754135898__pdp_video_reviews_DBAbWc', 'video-reviews'],
  ['#shopify-section-template--28123754135898__myth_pdp_bhdGWE', 'myth-pdp'],
  ['#shopify-section-template--28123754135898__benefits_HeJwDi', 'benefits'],
  ['#shopify-section-template--28123754135898__tested_KEWnQd', 'tested'],
  ['#shopify-section-template--28123754135898__scientist_mVQYKh', 'scientist'],
  ['#shopify-section-template--28123754135898__comparisons_new_nb69an', 'comparisons'],
  ['#shopify-section-template--28123754135898__design_9tecNX', 'design'],
  ['#shopify-section-template--28123754135898__certificate_J4tKpd', 'certificate'],
  ['#shopify-section-template--28123754135898__faq_bJH8tH', 'faq'],
  ['#shopify-section-sections--27726639890778__footer_2_ENU4dX', 'footer'],
];

const PROPS = [
  'fontSize', 'fontWeight', 'fontFamily', 'lineHeight', 'letterSpacing', 'color',
  'textTransform', 'backgroundColor', 'padding', 'display', 'flexDirection',
  'justifyContent', 'alignItems', 'gap', 'gridTemplateColumns', 'borderRadius',
  'border', 'boxShadow', 'maxWidth', 'width',
];

async function run() {
  const browser = await launch();
  const { page } = await newPage(browser, { width: 1440, height: 1000 });
  await page.goto(URL, { waitUntil: 'load', timeout: 30000 });
  await page.waitForTimeout(1200);

  const report = {};

  for (const [sel, name] of SECTIONS) {
    const el = await page.$(sel);
    if (!el) {
      report[name] = { found: false, selector: sel };
      continue;
    }
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(150);
    try {
      await el.screenshot({ path: `${SHOTS_DIR}/section-${name}.png` });
    } catch (e) {
      console.error('screenshot failed for', name, e.message);
    }

    const data = await el.evaluate((node, props) => {
      function extractStyles(element) {
        const cs = getComputedStyle(element);
        const out = {};
        props.forEach((p) => (out[p] = cs[p]));
        return out;
      }
      const headings = [...node.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((h) => ({
        tag: h.tagName.toLowerCase(),
        text: h.textContent.trim(),
      }));
      const images = [...node.querySelectorAll('img')].map((img) => ({
        src: img.currentSrc || img.src,
        alt: img.alt,
        w: img.naturalWidth,
        h: img.naturalHeight,
      })).filter((i) => i.src && !i.src.startsWith('data:'));
      const buttons = [...node.querySelectorAll('button, a.button, a[class*=btn]')].map((b) => b.textContent.trim()).filter(Boolean);
      const text = node.innerText.trim().slice(0, 3000);
      return {
        containerStyles: extractStyles(node),
        headings,
        images,
        buttons,
        text,
      };
    }, PROPS);

    report[name] = { found: true, selector: sel, ...data };
    console.log('extracted', name, '-', data.headings.length, 'headings,', data.images.length, 'images');
  }

  fs.writeFileSync(`${RESEARCH_DIR}/sections-extract.json`, JSON.stringify(report, null, 2));
  console.log('Wrote sections-extract.json');
  await browser.close();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
