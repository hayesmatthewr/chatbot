const { chromium } = require('playwright');
const fs=require('fs');const F=n=>'data:font/woff2;base64,'+fs.readFileSync('/home/user/chatbot/public/fonts/'+n).toString('base64');
const RED='#b00a12', W=2000, H=3000;
const css=`
@font-face{font-family:RB;src:url(${F('Roobert-Bold.woff2')})}
@font-face{font-family:RM;src:url(${F('RoobertPRO-Medium.woff2')})}
@font-face{font-family:RR;src:url(${F('Roobert-Regular.woff2')})}
*{margin:0;padding:0;box-sizing:border-box}html,body{background:transparent}
#c{position:relative;overflow:hidden;width:${W}px;height:${H}px}
.t{position:absolute;white-space:nowrap;color:#fff;line-height:1;transform:translate(-50%,-50%)}`;
const fit=`for(const e of document.querySelectorAll('[data-w]')){const w=+e.dataset.w;e.style.fontSize='100px';const r=e.getBoundingClientRect();e.style.fontSize=(100*w/r.width)+'px';}`;
const bag=`<div id=c>
<div style="position:absolute;left:17.9%;top:7.6%;width:65.8%;height:3.9%;background:rgba(40,0,0,.42)"></div>
<div class=t data-w="${W*0.613}" style="left:50.8%;top:9.55%;font-family:RM;letter-spacing:.14em">BACKED BY 85+ HUMAN CLINICAL STUDIES</div>
<div class=t data-w="${W*0.66}" style="left:48.8%;top:39.2%;font-family:RM">Cellular Protection</div>
<div style="position:absolute;left:15.8%;top:43.75%;width:26.2%;height:4.1%;background:#fff;border-radius:999px"></div>
<div class=t data-w="${W*0.155}" style="left:28.9%;top:45.85%;font-family:RB;font-style:italic;color:${RED};transform:translate(-50%,-50%) skewX(-10deg)">AstaReal<span style="font-size:.5em;vertical-align:.7em">®</span></div>
<div class=t data-w="${W*0.386}" style="left:63.4%;top:45.8%;font-family:RR">Natural Astaxanthin 12mg</div>
<div class=t data-w="${W*0.735}" style="left:52.3%;top:79%;font-family:RB;letter-spacing:-.01em">AURA</div>
<div class=t data-w="${W*0.472}" style="left:52.2%;top:90.3%;font-family:RR">90 Softgels | Dietary Supplement</div>
</div>`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:W,height:H}});
await p.setContent(`<style>${css}</style>${bag}`);await p.evaluate(()=>document.fonts.ready);await p.evaluate(fit);
await p.screenshot({path:'tex/label.png',omitBackground:true,clip:{x:0,y:0,width:W,height:H}});await b.close();})();
