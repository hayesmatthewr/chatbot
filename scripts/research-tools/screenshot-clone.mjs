import { launch, newPage } from './browser.mjs';

async function scrollThrough(page) {
  const height = await page.evaluate(() => document.body.scrollHeight);
  const vh = page.viewportSize().height;
  for (let y = 0; y < height; y += vh) {
    await page.evaluate((y) => window.scrollTo(0, y), y);
    await page.waitForTimeout(250);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
}

async function run() {
  const browser = await launch({ useProxy: false });
  const { page } = await newPage(browser, { width: 1440, height: 1000 });
  await page.goto('http://localhost:3000/sonnet-core-sleep', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(500);
  await scrollThrough(page);
  await page.screenshot({ path: '/tmp/clone-desktop-full.png', fullPage: true });

  const { page: mobilePage, context: mobileCtx } = await newPage(browser, { width: 390, height: 844 });
  await mobilePage.goto('http://localhost:3000/sonnet-core-sleep', { waitUntil: 'networkidle', timeout: 30000 });
  await mobilePage.waitForTimeout(500);
  await scrollThrough(mobilePage);
  await mobilePage.screenshot({ path: '/tmp/clone-mobile-full.png', fullPage: true });
  await mobileCtx.close();

  await browser.close();
  console.log('done');
}
run().catch((e) => { console.error(e); process.exit(1); });
