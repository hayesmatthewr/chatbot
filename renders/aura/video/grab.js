const { chromium } = require('playwright'); const fs = require('fs');
const [,, mode, W, H, SS] = process.argv;
(async () => {
  const b = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const p = await b.newPage({ viewport: { width: +W, height: +H }, deviceScaleFactor: 1 });
  p.on('console', m => m.type() === 'error' && console.log('ERR', m.text())); p.on('pageerror', e => console.log('PAGEERR', e.message));
  await p.goto(`http://localhost:8770/aura-shoot.html?still=1&w=${W}&h=${H}&ss=${SS}`);
  await p.waitForFunction(() => window.isReady && window.isReady(), null, { timeout: 60000 });
  const times = mode === 'test' ? [1.5, 3.9, 8.5] : Array.from({ length: 285 }, (_, i) => i / 30);
  const t0 = Date.now();
  for (let i = 0; i < times.length; i++) {
    const data = await p.evaluate(s => { window.renderAt(s); return document.getElementById('cv').toDataURL('image/png'); }, times[i]);
    fs.writeFileSync(`frames/${mode}_${String(i).padStart(4, '0')}.png`, Buffer.from(data.split(',')[1], 'base64'));
    if (mode !== 'test' && i % 40 === 0) console.log('frame', i, ((Date.now() - t0) / 1000).toFixed(0) + 's');
  }
  console.log('done', times.length, ((Date.now() - t0) / 1000).toFixed(0) + 's'); await b.close();
})();
