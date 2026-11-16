const { chromium } = require('playwright');
const fs=require('fs');const F=n=>'data:font/woff2;base64,'+fs.readFileSync('/home/user/chatbot/public/fonts/'+n).toString('base64');
const RED='#b00a12', W=4400, H=2180, c=W/2;
const css=`
@font-face{font-family:RB;src:url(${F('Roobert-Bold.woff2')})}
@font-face{font-family:RM;src:url(${F('RoobertPRO-Medium.woff2')})}
@font-face{font-family:RR;src:url(${F('Roobert-Regular.woff2')})}
*{margin:0;padding:0;box-sizing:border-box}html,body{background:transparent}
#c{position:relative;overflow:hidden;width:${W}px;height:${H}px}
.t{position:absolute;white-space:nowrap;color:#fff;line-height:1;transform:translate(-50%,-50%)}
.l{position:absolute;white-space:nowrap;color:#fff;line-height:1;transform:translate(0,-50%)}
`;
const fit=`for(const e of document.querySelectorAll('[data-w]')){const w=+e.dataset.w;e.style.fontSize='100px';const r=e.getBoundingClientRect();e.style.fontSize=(100*w/r.width)+'px';}`;
const L=c-600;
const html=`<div id=c>
<div style="position:absolute;left:${c-470}px;top:150px;width:940px;height:86px;background:rgba(40,0,0,.42)"></div>
<div class=t data-w="860" style="left:${c}px;top:193px;font-family:RM;letter-spacing:.14em">BACKED BY 85+ HUMAN CLINICAL STUDIES</div>
<div class=t data-w="1000" style="left:${c}px;top:520px;font-family:RB;letter-spacing:-.01em">AURA</div>
<div class=l data-w="1200" style="left:${L}px;top:1130px;font-family:RM">Cellular Protection<span style="font-size:.6em;vertical-align:.12em;font-family:RR">‡</span></div>
<div style="position:absolute;left:${L}px;top:1245px;width:420px;height:104px;background:#fff;border-radius:999px"></div>
<div class=t data-w="268" style="left:${L+210}px;top:1298px;font-family:RB;font-style:italic;color:${RED};transform:translate(-50%,-50%) skewX(-10deg)">AstaReal<span style="font-size:.5em;vertical-align:.7em">®</span></div>
<div class=l data-w="660" style="left:${L+460}px;top:1297px;font-family:RR">Natural Astaxanthin 12mg</div>
<div class=l data-w="760" style="left:${L}px;top:1960px;font-family:RR;letter-spacing:.02em">90 Softgels | Dietary Supplement</div>
</div>`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:W,height:H}});
await p.setContent(`<style>${css}</style>${html}`);await p.evaluate(()=>document.fonts.ready);await p.evaluate(fit);
await p.screenshot({path:'tex/tube_label.png',omitBackground:true,clip:{x:0,y:0,width:W,height:H}});await b.close();})();
