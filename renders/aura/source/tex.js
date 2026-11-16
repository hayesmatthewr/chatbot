const { chromium } = require('playwright');
const fs=require('fs');const F=n=>'data:font/woff2;base64,'+fs.readFileSync('/home/user/chatbot/public/fonts/'+n).toString('base64');
const RED = '#b00a12';
const css = `
@font-face{font-family:RB;src:url(${F('Roobert-Bold.woff2')})}
@font-face{font-family:RM;src:url(${F('RoobertPRO-Medium.woff2')})}
@font-face{font-family:RR;src:url(${F('Roobert-Regular.woff2')})}
*{margin:0;padding:0;box-sizing:border-box}
html,body{background:transparent}
#c{position:relative;overflow:hidden}
.t{position:absolute;white-space:nowrap;color:#fff;line-height:1;transform:translate(-50%,-50%)}
`;
const fit = `
for(const e of document.querySelectorAll('[data-w]')){
  const w=+e.dataset.w; let fs=100; e.style.fontSize=fs+'px';
  const r=e.getBoundingClientRect(); const cur=e.dataset.rot?r.height:r.width;
  e.style.fontSize=(fs*w/cur)+'px';
}`;
const W=2000,H=2898;
const bag = `<div id=c style="width:${W}px;height:${H}px">
<div style="position:absolute;left:17.9%;top:7.2%;width:65.8%;height:4.1%;background:rgba(40,0,0,.42)"></div>
<div class=t data-w="${W*0.613}" style="left:50.8%;top:9.3%;font-family:RM;letter-spacing:.14em">BACKED BY 85+ HUMAN CLINICAL STUDIES</div>
<div class=t data-w="${W*0.69}" style="left:49.8%;top:38.8%;font-family:RM">Cellular Protection<span style="font-size:.6em;vertical-align:.12em;font-family:RR">‡</span></div>
<div style="position:absolute;left:15.8%;top:43.55%;width:26.2%;height:4.3%;background:#fff;border-radius:999px"></div>
<div class=t data-w="${W*0.155}" style="left:28.9%;top:45.75%;font-family:RB;font-style:italic;color:${RED};transform:translate(-50%,-50%) skewX(-10deg)">AstaReal<span style="font-size:.5em;vertical-align:.7em">®</span></div>
<div class=t data-w="${W*0.386}" style="left:63.4%;top:45.7%;font-family:RR">Natural Astaxanthin 12mg</div>
<div class=t data-w="${W*0.735}" style="left:52.3%;top:79%;font-family:RB;letter-spacing:-.01em">AURA</div>
<div class=t data-w="${W*0.472}" style="left:52.2%;top:90.3%;font-family:RR">30 Softgels | Dietary Supplement</div>
</div>`;
// bump map: mid grey, zipper ridges, crimped seals
const bump = `<div id=c style="width:${W}px;height:${H}px;background:#808080">
<div style="position:absolute;left:0;top:0;width:100%;height:5%;background:repeating-linear-gradient(0deg,#6a6a6a 0 10px,#969696 10px 20px);opacity:.5"></div>
<div style="position:absolute;left:0;bottom:0;width:100%;height:2.2%;background:repeating-linear-gradient(0deg,#6a6a6a 0 10px,#969696 10px 20px);opacity:.5"></div>
${[16.9,18.1,19.3].map(y=>`<div style="position:absolute;left:8%;width:84%;top:${y}%;height:.7%;background:linear-gradient(180deg,#808080,#e8e8e8 45%,#fff 55%,#505050 90%,#808080);border-radius:10px"></div>`).join('')}
<div style="position:absolute;left:7.6%;top:0;width:.25%;height:100%;background:#5a5a5a"></div>
<div style="position:absolute;right:7.6%;top:0;width:.25%;height:100%;background:#5a5a5a"></div>
</div>`;
// cutout mask: white=keep, black=cut (tear notches)
const cut = `<div id=c style="width:${W}px;height:${H}px;background:#fff">
<svg width=${W} height=${H} style="position:absolute;left:0;top:0">
<polygon points="0,${H*0.092} ${W*0.03},${H*0.102} 0,${H*0.112}" fill="#000"/>
<polygon points="${W},${H*0.092} ${W*0.97},${H*0.102} ${W},${H*0.112}" fill="#000"/>
</svg></div>`;
const VW=3000,VH=3104;
const vial = `<div id=c style="width:${VW}px;height:${VH}px">
<div class=t data-w="658" style="left:50%;top:407px;font-family:RB;letter-spacing:-.01em">AURA</div>
<div style="position:absolute;left:${VW/2-86}px;top:${1159-86}px;width:172px;height:172px;border-radius:50%;background:#fff"></div>
<div class=t data-w="1041" data-rot=1 style="left:50%;top:2122px;font-family:RM;letter-spacing:.09em;transform:translate(-50%,-50%) rotate(-90deg)">ASTAXANTHIN</div>
</div>`;
(async()=>{
  const b=await chromium.launch();
  for(const [name,html,w,h] of [['bag_label',bag,W,H],['bag_bump',bump,W,H],['bag_cut',cut,W,H],['vial_label',vial,VW,VH]]){
    const p=await b.newPage({viewport:{width:w,height:h}});
    await p.setContent(`<style>${css}</style>${html}`);
    await p.evaluate(()=>document.fonts.ready);
    await p.evaluate(fit);
    await p.screenshot({path:`tex/${name}.png`,omitBackground:true,clip:{x:0,y:0,width:w,height:h}});
    await p.close();
  }
  await b.close();
})();
