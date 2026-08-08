import fs from 'node:fs';

const SCRATCH = '/tmp/claude-0/-home-user-chatbot/5760d5a6-fe56-558c-98b6-ad2e23a1eb59/scratchpad';
const IMG = '/home/user/chatbot/public/images/sonnet';
const FONT = '/home/user/chatbot/public/fonts/sonnet';

function dataUri(path, mime) {
  const buf = fs.readFileSync(path);
  return `data:${mime};base64,${buf.toString('base64')}`;
}

let html = fs.readFileSync(`${SCRATCH}/sonnet-core-sleep.template.html`, 'utf8');

const replacements = {
  '{{FONT_REGULAR}}': dataUri(`${FONT}/TT-Commons-Regular.otf`, 'font/otf'),
  '{{FONT_MEDIUM}}': dataUri(`${FONT}/TT-Commons-Medium.otf`, 'font/otf'),
  '{{FONT_SEMIBOLD}}': dataUri(`${FONT}/TT-Commons-Semibold.otf`, 'font/otf'),
  '{{FONT_BOLD}}': dataUri(`${FONT}/TT-Commons-Bold.otf`, 'font/otf'),
  '{{LOGO}}': dataUri(`${IMG}/Logo.png`, 'image/png'),
  '{{LOGO_WHITE}}': dataUri(`${IMG}/Logo_1.png`, 'image/png'),
  '{{HERO}}': dataUri(`${IMG}/sonnet-core-sleep-bottle-capsules.jpg`, 'image/jpeg'),
  '{{CALM}}': dataUri(`${IMG}/sonnet-sleep-calm-bottle-capsules.jpg`, 'image/jpeg'),
  '{{CORE}}': dataUri(`${IMG}/sonnet-core-sleep-bottle-capsules.jpg`, 'image/jpeg'),
  '{{RESTORE}}': dataUri(`${IMG}/sonnet-sleep-restore-bottle-capsules.jpg`, 'image/jpeg'),
};

for (const [token, value] of Object.entries(replacements)) {
  html = html.split(token).join(value);
}

const outPath = `${SCRATCH}/sonnet-core-sleep.html`;
fs.writeFileSync(outPath, html);
console.log('Wrote', outPath, '-', (html.length / 1024 / 1024).toFixed(2), 'MB');
