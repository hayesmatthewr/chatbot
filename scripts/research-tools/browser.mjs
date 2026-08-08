import { chromium } from 'playwright';

export async function launch({ useProxy = true } = {}) {
  const browser = await chromium.launch({
    executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    proxy: useProxy ? { server: process.env.HTTPS_PROXY || 'http://127.0.0.1:37377', bypass: 'localhost,127.0.0.1' } : undefined,
    args: [
      '--ignore-certificate-errors',
      '--disable-quic',
      '--disable-http2',
      '--ssl-version-max=tls1.2',
      '--disable-background-networking',
      '--disable-component-update',
      '--disable-domain-reliability',
      '--disable-sync',
      '--disable-client-side-phishing-detection',
      '--disable-default-apps',
      '--no-first-run',
      '--safebrowsing-disable-auto-update',
      '--disable-background-timer-throttling',
      '--disable-features=PostQuantumKyber,EncryptedClientHello,UseDnsHttpsSvcbAlpn,DnsOverHttps,UseMLKEM,OptimizationHints,MediaRouter,InterestFeedContentSuggestions,Translate,AutofillServerCommunication',
    ],
  });
  return browser;
}

export async function newPage(browser, viewport = { width: 1440, height: 900 }) {
  const context = await browser.newContext({ ignoreHTTPSErrors: true, viewport });
  const page = await context.newPage();
  return { context, page };
}

// The sandbox egress proxy applies a concurrency-based rate limit that a
// normal browser's flood of simultaneous requests trips (returns 429
// "local_rate_limited"). Gate outgoing requests through a small semaphore
// with a short stagger so the page still loads fully, just more slowly.
export function installThrottle(context, { intervalMs = 250 } = {}) {
  // Strict rate limiter: starts at most one new request every intervalMs,
  // regardless of how many are in flight or how long they take.
  let chain = Promise.resolve();
  context.route('**/*', async (route) => {
    chain = chain.then(() => new Promise((r) => setTimeout(r, intervalMs)));
    await chain;
    route.continue().catch(() => {});
  });
}
