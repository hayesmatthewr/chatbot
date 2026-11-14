/**
 * Records a page scrolling along a fixed path, one frame at a time, so scroll-linked and
 * time-based animations (reveals, the softgel slide-in, canvases) play exactly as they do live.
 *
 *   node scripts/record-scroll.cjs <page.html> <out.mp4> <path.json>
 *
 * Determinism:
 *  - JS time (Date, timers, requestAnimationFrame) is a fake clock advanced 1/FPS per frame.
 *  - CSS transitions/animations run on the document timeline, slowed by RATE; each frame is
 *    paced to PERIOD ms of real time, so RATE * PERIOD == 1000 / FPS.
 *  - Frames stream to ffmpeg (no PNGs on disk).
 */
const { chromium } = require('playwright');
const { spawn } = require('child_process');
const fs = require('fs');

const [file, out, pathFile] = process.argv.slice(2);
const P = JSON.parse(fs.readFileSync(pathFile, 'utf8'));
const FPS = P.fps;
const FRAMES = Math.round(P.duration * FPS);
const PERIOD = 400; // ms of real time per frame
const RATE = 1000 / FPS / PERIOD; // CSS timeline playback rate
const VW = 390;
const VH = 693;
const DPR = 1080 / VW;

const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
/** scroll position at time s from keyframes [[t, y, 'ease'|'lin'], ...] */
const yAt = (s) => {
  const K = P.keys;
  if (s <= K[0][0]) return K[0][1];
  for (let i = 0; i < K.length - 1; i++) {
    const [t0, y0] = K[i];
    const [t1, y1, kind] = K[i + 1];
    if (s <= t1) {
      const u = (s - t0) / (t1 - t0);
      return y0 + (y1 - y0) * (kind === 'lin' ? u : ease(u));
    }
  }
  return K[K.length - 1][1];
};

(async () => {
  const ff = spawn('ffmpeg', ['-v', 'error', '-y', '-f', 'image2pipe', '-framerate', String(FPS), '-i', '-', '-vf', 'scale=1080:1920:flags=lanczos', '-c:v', 'libx264', '-crf', '12', '-preset', 'slow', '-pix_fmt', 'yuv420p', out], { stdio: ['pipe', 'inherit', 'inherit'] });

  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: VW, height: VH }, deviceScaleFactor: DPR });
  const p = await ctx.newPage();
  await p.route('**/*', (r) => {
    const u = r.request().url();
    return u.startsWith('file:') || u.startsWith('data:') ? r.continue() : r.abort();
  });
  await p.clock.install({ time: new Date('2026-11-14T12:00:00Z') });
  await p.goto('file://' + file, { waitUntil: 'load' });
  await p.addStyleTag({ content: 'html{scroll-behavior:auto!important}' });
  await p.clock.runFor(1500); // let load-time scripts settle in fake time
  await p.waitForTimeout(800);

  const cdp = await ctx.newCDPSession(p);
  await cdp.send('Animation.enable');
  await cdp.send('Animation.setPlaybackRate', { playbackRate: RATE });

  const rects = {};
  let last = Date.now();
  for (let f = 0; f < FRAMES; f++) {
    const s = f / FPS;
    await p.evaluate((y) => window.scrollTo(0, y), Math.round(yAt(s) * 100) / 100);
    await p.clock.runFor(1000 / FPS);
    // record highlight rects (viewport css px) at the frames that ask for them
    for (const h of P.highlights) {
      if (Math.abs(s - h.measureAt) < 0.5 / FPS) {
        rects[h.id] = await p.evaluate((sel) => {
          const e = document.querySelector(sel);
          if (!e) return null;
          const r = e.getBoundingClientRect();
          return { x: r.left, y: r.top, w: r.width, h: r.height };
        }, h.selector);
      }
    }
    const wait = last + PERIOD - Date.now();
    if (wait > 0) await new Promise((r) => setTimeout(r, wait));
    last = Date.now();
    const buf = await p.screenshot({ type: 'jpeg', quality: 95 });
    if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r));
    if (f % 60 === 0) console.log(`frame ${f}/${FRAMES} y=${yAt(s).toFixed(0)}`);
  }
  ff.stdin.end();
  await new Promise((r) => ff.on('close', r));
  fs.writeFileSync(out.replace(/\.mp4$/, '.rects.json'), JSON.stringify({ viewport: { w: VW, h: VH }, rects }, null, 2));
  await b.close();
  console.log('done', FRAMES, 'frames');
})();
