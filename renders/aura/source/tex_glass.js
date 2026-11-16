const { chromium } = require('playwright');
const fs=require('fs');const F=n=>'data:font/woff2;base64,'+fs.readFileSync('/home/user/chatbot/public/fonts/'+n).toString('base64');
const BASE='#0d2212', INK='#f4f1ee', INK2='#e2b9b6';
const css=`
@font-face{font-family:RB;src:url(${F('Roobert-Bold.woff2')})}
@font-face{font-family:AR;src:url(${F('aeonik_regular-webfont.woff2')})}
@font-face{font-family:AM;src:url(${F('Aeonik-Medium.woff2')})}
*{margin:0;padding:0;box-sizing:border-box}
#c{position:relative;overflow:hidden}
html,body{background:transparent}
.t{position:absolute;white-space:nowrap;color:${INK};line-height:1;transform:translate(-50%,-50%)}
.l{position:absolute;white-space:nowrap;color:${INK};line-height:1;transform:translate(0,-50%)}
.g{position:absolute;border-radius:50%;transform:translate(-50%,-50%)}
sup{font-size:.42em;vertical-align:.95em;margin-left:.06em}
`;
const fit=`for(const e of document.querySelectorAll('[data-w]')){const w=+e.dataset.w;e.style.fontSize='100px';const r=e.getBoundingClientRect();const cur=e.dataset.rot?r.height:r.width;e.style.fontSize=(100*w/cur)+'px';}`;
function rnd(seed){let s=seed;return()=>(s=(s*16807)%2147483647)/2147483647;}
function glow(W,cx,cy,sx,sy,n,seed,blur){const r=rnd(seed);let h=`<div style="position:absolute;inset:0;filter:blur(${blur}px)">`;
  for(let i=0;i<n;i++){const x=cx+(r()-.5)*sx,y=cy+(r()-.5)*sy,w=sx*(.18+r()*.35),hh=sy*(.3+r()*.5),a=.3+r()*.4;
    h+=`<div class=g style="left:${x}px;top:${y}px;width:${w}px;height:${hh}px;background:rgba(${16+r()*10|0},${120+r()*45|0},${34+r()*16|0},${a})"></div>`;}
  return h+'</div>';}
const JW=5740,JH=2000,jc=JW/2;
const jar=`<div id=c style="width:${JW}px;height:${JH}px">
<div class=t data-w="430" style="left:${jc}px;top:214px;font-family:RB;letter-spacing:-.01em">AURA</div>
<div class=g style="left:${jc}px;top:940px;width:137px;height:137px;background:${INK}"></div>
<div class=l data-w="931" style="left:${jc-461}px;top:1640px;font-family:AM;letter-spacing:.06em">CELLULAR PROTECTION<span style="font-size:.7em;vertical-align:.3em">‡</span></div>
<div class=l data-w="760" style="left:${jc-461}px;top:1759px;font-family:AR;letter-spacing:.07em;color:${INK2}">NATURAL ASTAXANTHIN 12MG</div>
<div class=l data-w="1010" style="left:${jc-461}px;top:1836px;font-family:AR;letter-spacing:.07em;color:${INK2}">30 SOFTGELS • DIETARY SUPPLEMENT</div>
</div>`;
const VW=2000,VH=2345,vc=VW/2;
const vial=`<div id=c style="width:${VW}px;height:${VH}px">
<div class=t data-w="370" style="left:${vc}px;top:235px;font-family:RB;letter-spacing:-.01em">AURA</div>
<div class=t data-w="470" data-rot=1 style="left:${vc}px;top:1161px;font-family:AM;letter-spacing:.07em;transform:translate(-50%,-50%) rotate(-90deg)">ASTAXANTHIN</div>
</div>`;
(async()=>{const b=await chromium.launch();
for(const [n,h,w,hh] of [['aura_jar_label',jar,JW,JH],['aura_vial_label',vial,VW,VH]]){const p=await b.newPage({viewport:{width:w,height:hh}});
await p.setContent(`<style>${css}</style>${h}`);await p.evaluate(()=>document.fonts.ready);await p.evaluate(fit);
await p.screenshot({path:`tex/${n}.png`,omitBackground:true,clip:{x:0,y:0,width:w,height:hh}});await p.close();}
await b.close();})();
