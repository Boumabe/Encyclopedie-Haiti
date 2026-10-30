let S,P,T,E,LK,M,FE,D,F;
const flag=(d,b)=>d.ic?`<span class="ic"${b?` style="font-size:2.4rem"`:``}>${d.ic}</span>`:`<span class="flg${b?` big`:``}" style="background:linear-gradient(${d.v?`to right`:`to bottom`},${d.fl.map((c,k)=>`${c} ${k*100/d.fl.length}% ${(k+1)*100/d.fl.length}%`).join()})"></span>`;
let L=`fr`,V=null,col=-1,act=0,drawn=false;
try{L=localStorage.getItem(`l`)||`fr`}catch(e){}
const $=id=>document.getElementById(id);
const at=(p,t)=>{for(const f of F){if(f.cell[0]==p&&f.cell[1]==t)return[f,f.planned?`plan`:`on`];if(f.rel.some(r=>r[0]==p&&r[1]==t))return[f,`rel`]}return[null,``]};
function meter(f){const c=[0,0,0,0,0],s=S[L];f.steps.forEach(p=>p[2].forEach(k=>c[k]++));
return`<h4>${s.mt}</h4><div class="mt">`+c.map((n,k)=>n?`<i class="k${k}" style="flex:${n}"></i>`:``).join(``)+`</div>`+c.map((n,k)=>n?`<span class="chip k${k}">${s.st[k]} ${n}</span>`:``).join(``)}
function home(){const s=S[L];
let h=`<p class="cap" id="cap" aria-live="polite">${col>=0?T[col].full:s.hint}</p><div class="heads">`;
T.forEach((x,j)=>h+=`<button class="hd${col==j?` on`:``}" data-hd="${j}" aria-label="${x.full}" aria-pressed="${col==j}">${E[j]}</button>`);
h+=`</div><div class="grid" id="g">`;
P.forEach((p,i)=>{const m=M[i],dt=D[i];h+=`<section class="band" data-m="${i}" style="--h:${m.h}"><div class="bl">${p[L]}<small>${p.d}</small>${dt?`<button class="dt" data-dt="${i}" aria-label="${S[L].det}">${flag(dt)}</button>`:``}<em class="em">${m.em[L]}</em></div><div class="row">`;
T.forEach((x,j)=>{const[f,k]=at(i,j),o=col>=0&&col!=j?` off`:``;
if(f)h+=`<button class="n ${k}${o}" data-f="${f.id}" aria-label="${f.title[L]}"><span>${E[j]}</span></button>`;
else h+=`<button class="n e${o}" data-e="${i},${j}" aria-label="${s.empty}"><span>${E[j]}</span></button>`});
h+=`</div></section>`});
return h+`<svg id="lk"></svg></div><div class="leg"><span><i style="background:var(--node)"></i>${s.l[0]}</span><span><i style="border:2px solid var(--node)"></i>${s.l[1]}</span><span><i style="border:2px dashed var(--node)"></i>${s.l[2]}</span><span><i style="opacity:.3;background:var(--mut)"></i>${s.l[3]}</span></div>`}
function links(){const g=$(`g`);if(!g)return;const sv=$(`lk`),r=g.getBoundingClientRect();sv.setAttribute(`width`,r.width);sv.setAttribute(`height`,r.height);let d=``;
const pos=id=>{const e=g.querySelector(`.n.on[data-f="${id}"],.n.plan[data-f="${id}"]`);if(!e)return null;const q=e.getBoundingClientRect();return[q.left-r.left+q.width/2,q.top-r.top+q.height/2,e.classList.contains(`plan`)]};
LK.forEach(([a,b])=>{const A=pos(a),B=pos(b);if(!A||!B)return;const m=(A[1]+B[1])/2;d+=`<path pathLength="1" class="${drawn?`st `:``}${B[2]?`pl`:``}" d="M${A[0]} ${A[1]}C${A[0]} ${m},${B[0]} ${m},${B[0]} ${B[1]}"/>`});
sv.innerHTML=d;drawn=true}
function story(f){const s=S[L];let h=`<button class="back" data-back="1">${s.back}</button><h2>${f.title[L]}</h2><p class="em">${FE[f.id][L]}</p>`;
if(f.planned)return h+`<p class="note">${s.pl}</p>`;
h+=`<span class="bad">${s.draft}</span>${meter(f)}<p>${f.bref[L]}</p>`+(L==`kr`?`<p class="note">${s.note}</p>`:``)+`<h3>${s.hist}</h3><ol class="tl">`;
f.steps.forEach((p,i)=>{const o=i==act;h+=`<li class="stp${o?` open`:``}"><button class="sb" data-i="${i}" aria-expanded="${o}"><i class="dot"></i><b>${p[0]}</b><span class="tx">${p[1]}</span><em>`+p[2].map(k=>`<span class="chip k${k}">${s.st[k]}</span>`).join(``)+`</em></button><div class="so"><h4>${s.org}</h4><p>${p[3]}</p>${i<f.steps.length-1?`<button class="nx" data-n="1">${s.next}</button>`:``}</div></li>`});
return h+`</ol><h3>${s.unk}</h3><ul class="u">`+f.unk.map(u=>`<li>${u}</li>`).join(``)+`</ul><h3>${s.src}</h3><p class="note">${f.src}</p>${f.url?`<p><a href="${f.url}">${s.full}</a></p>`:``}`}
function render(keep){const s=S[L],f=F.find(x=>x.id==V);document.documentElement.lang=L==`kr`?`ht`:`fr`;
$(`t`).textContent=s.t;$(`s`).textContent=s.s;$(`d`).textContent=s.d;$(`f`).textContent=s.f;
$(`bfr`).setAttribute(`aria-pressed`,L==`fr`);$(`bkr`).setAttribute(`aria-pressed`,L==`kr`);
$(`app`).innerHTML=f?story(f):home();$(`s`).style.display=f?`none`:``;if(!f)links();scene(f?f.cell[0]:-1);if(!keep)window.scrollTo(0,0);if(!f)onS()}
function sheet(f){const s=S[L];$(`sh`).innerHTML=`<h2>${f.title[L]}</h2><p class="em">${FE[f.id][L]}</p>`+(f.planned?`<p class="note">${s.pl}</p>`:`<span class="bad">${s.draft}</span>${meter(f)}<p>${f.bref[L]}</p>`)+`<div class="act">${f.planned?``:`<button class="go" data-go="${f.id}">${s.go}</button>`}<button data-x="1">${s.close}</button></div>`;
$(`sh`).classList.add(`open`);$(`bk`).classList.add(`open`)}
function detail(i){const s=S[L],d=D[i];$(`sh`).innerHTML=`<div class="dh">${flag(d,1)}<div><h4>${s.det}</h4><h2>${d.t}</h2></div></div><p>${d.x}</p>`+d.s.map(k=>`<span class="chip k${k}">${s.st[k]}</span>`).join(``)+(L==`kr`?`<p class="note">${s.note2}</p>`:``)+`<div class="act"><button data-x="1">${s.close}</button></div>`;$(`sh`).classList.add(`open`);$(`bk`).classList.add(`open`)}
function shut(){$(`sh`).classList.remove(`open`);$(`bk`).classList.remove(`open`)}
document.addEventListener(`click`,e=>{const b=e.target.closest(`button`),k=e.target.id==`bk`;if(k)return shut();if(!b)return;const d=b.dataset;
if(d.hd!==undefined){col=col==+d.hd?-1:+d.hd;render(true)}
else if(d.dt!==undefined){detail(+d.dt)}
else if(d.f){sheet(F.find(x=>x.id==d.f))}
else if(d.e){const[i,j]=d.e.split(`,`);$(`cap`).textContent=`${S[L].empty} : ${T[j].full}, ${P[i][L]}`}
else if(d.go){V=d.go;act=0;shut();render()}
else if(d.x){shut()}
else if(d.back){V=null;render()}
else if(d.i!==undefined){act=act==+d.i?-1:+d.i;render(true)}
else if(d.n){act++;render(true);const o=document.querySelector(`.stp.open`);if(o)o.scrollIntoView({block:`center`,behavior:`smooth`})}});
const setL=l=>{L=l;try{localStorage.setItem(`l`,L)}catch(e){}shut();render(true)};
$(`bfr`).onclick=()=>setL(`fr`);$(`bkr`).onclick=()=>setL(`kr`);
const cv=$(`cv`),cx=cv.getContext(`2d`),HM={a:`#0b1030`,b:`#3a0f2a`,n:`#e8505f`,p:{c:[200,210,255],n:40,vy:-.12,vx:0,s:[1,3],f:.3,sw:20}};
let cur=-2,cfg=HM.p,ps=[];
function scene(i){if(i==cur)return;cur=i;const m=i<0?HM:M[i],r=document.documentElement.style;r.setProperty(`--a`,m.a);r.setProperty(`--b`,m.b);r.setProperty(`--node`,m.n);cfg=m.p}
function size(){const r=devicePixelRatio||1;cv.width=innerWidth*r;cv.height=innerHeight*r;cx.setTransform(r,0,0,r,0,0)}
function spawn(){const c=cfg;return{x:Math.random()*innerWidth,y:Math.abs(c.vy)<.3?Math.random()*innerHeight:(c.vy<0?innerHeight+10:-10),r:c.s[0]+Math.random()*(c.s[1]-c.s[0]),ph:Math.random()*6.28,c:c.c,vy:c.vy*(.6+Math.random()*.8),vx:c.vx,f:c.f,sw:c.sw,l:0}}
function tick(){cx.clearRect(0,0,innerWidth,innerHeight);if(ps.length<cfg.n&&Math.random()<.6)ps.push(spawn());
ps=ps.filter(p=>{p.l++;p.ph+=.02;p.y+=p.vy;p.x+=p.vx+Math.sin(p.ph)*p.sw*.01;const a=.75*(1-p.f*.5*(1+Math.sin(p.ph*3)))*Math.min(1,p.l/60);cx.fillStyle=`rgba(${p.c},${a})`;cx.shadowColor=`rgb(${p.c})`;cx.shadowBlur=p.r*3;cx.beginPath();cx.arc(p.x,p.y,p.r,0,6.28);cx.fill();return p.y>-20&&p.y<innerHeight+20&&p.x>-20&&p.x<innerWidth+20});
requestAnimationFrame(tick)}
function onS(){if(V)return;const h=innerHeight/2;let k=-1;document.querySelectorAll(`.band`).forEach(b=>{const r=b.getBoundingClientRect();if(r.top<h&&r.bottom>h)k=+b.dataset.m});scene(scrollY<40?-1:k<0?(cur<0?-1:cur):k)}
size();if(!matchMedia(`(prefers-reduced-motion:reduce)`).matches)requestAnimationFrame(tick);
window.addEventListener(`resize`,()=>{size();if(!V)links()});
window.addEventListener(`scroll`,()=>requestAnimationFrame(onS),{passive:true});

async function boot(){const j=u=>fetch(u).then(r=>{if(!r.ok)throw new Error(u);return r.json()});try{const x=await j("data-index.json");({S,P,T,E,LK,M,FE,D}=x);F=await Promise.all(x.fiches.map(n=>j("fiche-"+n+".json")));render()}catch(e){document.getElementById("app").textContent="Erreur de chargement des données : "+e.message}}
boot();
