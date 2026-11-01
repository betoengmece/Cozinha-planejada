import { makeHardwareList } from './catalog.mjs';
import * as T from 'three';
import {OrbitControls} from './vendor/OrbitControls.js';
const $=id=>document.getElementById(id),view=$('view');let renderer;
try{renderer=new T.WebGLRenderer({antialias:true,preserveDrawingBuffer:true})}catch(e){$('error').hidden=false;throw e}
renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;renderer.setClearColor(0xeeeee7);view.appendChild(renderer.domElement);
const scene=new T.Scene(),camera=new T.PerspectiveCamera(40,1,.01,100);const controls=new OrbitControls(camera,renderer.domElement);controls.enableDamping=true;controls.maxPolarAngle=Math.PI*.49;controls.target.set(1.5,1,.4);scene.add(new T.HemisphereLight(0xffffff,0x9caa8b,2.5));const sun=new T.DirectionalLight(0xfff7e5,3);sun.position.set(1,6,4);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);sun.shadow.camera.left=-5;sun.shadow.camera.right=5;sun.shadow.camera.top=5;sun.shadow.camera.bottom=-5;scene.add(sun);
let cabinetCount=0,legCount=0,geo={},toePanels=[],doorPivots=[],hardwareMeshes=[],screws=[],screwZoom=false;let group=new T.Group(),dimensions=new T.Group(),pieces=[],color='#b9b5a5',selected=null;scene.add(group,dimensions);let refs=new T.Group();scene.add(refs);
const fmt=n=>(n*100).toLocaleString('pt-BR',{maximumFractionDigits:1}),dim=p=>p.size.map(fmt).join(' × ')+' cm';
function box(w,h,d,x,y,z,c,parent=group){const m=new T.Mesh(new T.BoxGeometry(w,h,d),new T.MeshStandardMaterial({color:c,roughness:.75}));m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m}
function part(name,w,h,d,x,y,z,offset,material='MDF 18 mm',c=color){const m=box(w,h,d,x,y,z,c);const p={name,size:[w,h,d],base:new T.Vector3(x,y,z),offset:new T.Vector3(...offset),mesh:m,material};m.userData.p=p;pieces.push(p);const edge=new T.LineSegments(new T.EdgesGeometry(m.geometry),new T.LineBasicMaterial({color:0x666353,transparent:true,opacity:.18}));m.add(edge);return m}
function label(text,x,y,z){const cvs=document.createElement('canvas');cvs.width=512;cvs.height=96;const c=cvs.getContext('2d');c.fillStyle='#fffef7';c.fillRect(0,0,512,96);c.fillStyle='#4c6144';c.font='500 44px sans-serif';c.textAlign='center';c.fillText(text,256,64);const sprite=new T.Sprite(new T.SpriteMaterial({map:new T.CanvasTexture(cvs),depthTest:false}));sprite.scale.set(.67,.126,1);sprite.position.set(x,y,z);dimensions.add(sprite)}
function line(a,b,text){dimensions.add(new T.Line(new T.BufferGeometry().setFromPoints([new T.Vector3(...a),new T.Vector3(...b)]),new T.LineBasicMaterial({color:0x708564})));for(const p of [a,b]){const tick=new T.Mesh(new T.SphereGeometry(.014),new T.MeshBasicMaterial({color:0x708564}));tick.position.set(...p);dimensions.add(tick)}label(text,...a.map((n,i)=>(n+b[i])/2))}
// Geometria — revisão 02. Unidades em metros. A face da parede principal é z = 0 e a da parede lateral é x = 0.
const T_CHAPA=.018,T_FUNDO=.006,PE=.12,H_CAIXA=.72,RODAPE_H=.115,RODAPE_RECUO=.04,FOLGA_PORTA=.002;
// cabinet(nome, x, z, largura, profundidade da caixa, opções)
// opções.door: [início, fim] da porta no eixo local da largura; null = sem porta.
function cabinet(name,x,z,w,d,opts={}){cabinetCount++;const t=T_CHAPA,b=PE,h=H_CAIXA;
  part(name+' · lateral E',t,h,d,x+t/2,b+h/2,z+d/2,[-.2,0,0]);
  part(name+' · lateral D',t,h,d,x+w-t/2,b+h/2,z+d/2,[.2,0,0]);
  part(name+' · base',w-2*t,t,d,x+w/2,b+t/2,z+d/2,[0,-.1,0]);
  part(name+' · prateleira',w-2*t,t,d-.04,x+w/2,b+.36,z+(d-.04)/2,[0,.12,.12]);
  part(name+' · fundo',w,h,T_FUNDO,x+w/2,b+h/2,z-T_FUNDO/2,[0,0,-.22],'MDF 6 mm','#b99770');
  part(name+' · travessa traseira',w-2*t,t,.09,x+w/2,b+h-t/2,z+.055,[0,.24,-.08]);
  part(name+' · travessa frontal',w-2*t,t,.09,x+w/2,b+h-t/2,z+d-.055,[0,.24,.08]);
  const span=opts.door===undefined?[0,w]:opts.door;
  if(span&&span[1]-span[0]>.15){const dw=span[1]-span[0]-2*FOLGA_PORTA,cx=x+(span[0]+span[1])/2,right=!!opts.hingeRight,hx=right?cx+dw/2:cx-dw/2;
    const pivot=new T.Group();pivot.position.set(hx,0,z+d+t/2);group.add(pivot);
    const door=part(name+' · porta',dw,h-.004,t,cx,b+h/2,z+d+t/2,[right?.08:-.08,.04,.38]);group.remove(door);pivot.add(door);
    const p=door.userData.p;p.base.set(cx-hx,b+h/2,0);
    const hs=right?1:-1;box(.145,.009,.024,(cx-hx)-hs*(dw/2-.09),b+h-.07,.019,'#454b42',pivot);
    for(const yy of [b+.1,b+h-.1]){const hinge=box(.045,.065,.012,-hs*.025,yy,-.014,'#9b9f9b',pivot);hardwareMeshes.push(hinge);
      for(const dy of [-.018,.018]){const screw=box(.007,.007,.004,-hs*.025,yy+dy,-.023,'#555e5c',pivot);hardwareMeshes.push(screw);screws.push(screw)}
      const plate=box(.018,.065,.04,hx-hs*.012,yy,z+d-.025,'#9b9f9b');hardwareMeshes.push(plate)}
    doorPivots.push({pivot,right,door,name:p.name,angle:0,base:pivot.position.clone(),offset:p.offset.clone()});p.offset.set(0,0,0)}
  // Pés reguláveis ilustrados (corpo 30 mm, 120 mm), recuados 80 mm da frente para ficar atrás do rodapé. Caixas acima de 80 cm recebem um par central.
  const xs=w>.8?[x+.06,x+w/2,x+w-.06]:[x+.06,x+w-.06];
  for(const px of xs)for(const pz of [z+.07,z+d-.08]){const leg=new T.Mesh(new T.CylinderGeometry(.015,.018,PE,16),new T.MeshStandardMaterial({color:'#353b36'}));leg.position.set(px,PE/2,pz);group.add(leg);hardwareMeshes.push(leg);legCount++;const foot=box(.045,.008,.045,px,.004,pz,'#353b36');hardwareMeshes.push(foot)}
  // Parafusos estruturais exemplificativos: 4 × 50 mm, eixo horizontal.
  for(const px of [x+.025,x+w-.025])for(const pz of [z+.08,z+d-.08])for(const py of [b+.009,b+h-.009]){const screw=new T.Mesh(new T.CylinderGeometry(.002,.002,.05,8),new T.MeshStandardMaterial({color:'#9c9f9b'}));screw.rotation.z=Math.PI/2;screw.position.set(px,py,pz);group.add(screw);hardwareMeshes.push(screw);screws.push(screw)}}
function clear(g){g.traverse(o=>{o.geometry?.dispose();if(o.material){o.material.map?.dispose();o.material.dispose()}});g.clear()}
function build(){clear(group);clear(dimensions);clear(refs);pieces=[];toePanels=[];cabinetCount=0;legCount=0;doorPivots=[];hardwareMeshes=[];screws=[];selected=null;const W=+$('width').value/100,wallW=+$('wallWidth').value/100,H=+$('height').value/100,D=+$('depth').value/100,R=+$('return').value/100;$('total').textContent=fmt(D+R)+' cm';$('wallGap').textContent=fmt(wallW-W)+' cm';box(wallW+.06,H,.06,wallW/2-.03,H/2,-.03,'#e6e2d8');box(.06,H,D+R+.6,-.03,H/2,(D+R+.6)/2,'#e6e2d8');box(W+1.3,.04,D+R+1.2,W/2,-.03,(D+R)/2,'#dadbcd');const grid=new T.GridHelper(8,40,0xc6cbbd,0xd6d9cd);grid.position.set(W/2,-.007,.5);group.add(grid);
// Revisão 02: sem caixa de canto cego. A caixa do retorno vai da parede principal até o fim do L;
// a parte junto ao canto fica atrás do fechamento e é acessada pela porta do retorno.
const mm=v=>Math.round(v*1000)/1000;
const cabinetDepth=Math.max(.40,Math.floor((D*1000-T_FUNDO*1000-T_CHAPA*1000-25)/10)/100);// caixa; tampo avança ~25 mm além da porta
const doorFront=T_FUNDO+cabinetDepth+T_CHAPA;// plano frontal das portas
const n=3,minFiller=.05,w=Math.floor((W-doorFront-minFiller)*1000/n)/1000,filler=mm(W-doorFront-n*w),x0=doorFront+filler;
geo={cabinetDepth,doorFront,w,filler,L:D+R};
for(let i=0;i<n;i++)cabinet('Módulo '+(i+1),x0+i*w,T_FUNDO,w,cabinetDepth,{hingeRight:true});// dobradiças à direita: portas vizinhas e a do retorno abrem a 90° sem se tocar
part('Fechamento do canto',filler,.716,T_CHAPA,doorFront+filler/2,PE+.36,doorFront-T_CHAPA/2,[0,.04,.22]);
const L=D+R,before=group.children.length;
// Retorno em coordenadas locais: largura ao longo do L. Após a rotação, x local 0 = fim do L e x local L = parede principal.
const doorStart=L-(doorFront+.004);// a porta começa 4 mm à frente do plano das portas do trecho principal
cabinet('Retorno',0,T_FUNDO,L,cabinetDepth,{door:[0,doorStart]});
const returnGroup=new T.Group();for(const child of group.children.slice(before))returnGroup.add(child);group.add(returnGroup);returnGroup.position.set(0,0,L);returnGroup.rotation.y=Math.PI/2;
// Rodapés contínuos de 115 mm, recuados 40 mm do frontal das caixas e cortados na obra.
const toeZ=T_FUNDO+cabinetDepth-RODAPE_RECUO-T_CHAPA/2;
for(const toe of [part('Rodapé principal',W-(toeZ-T_CHAPA/2),RODAPE_H,T_CHAPA,(W+toeZ-T_CHAPA/2)/2,RODAPE_H/2,toeZ,[0,-.08,.2]),
  part('Rodapé do retorno',T_CHAPA,RODAPE_H,L-(toeZ+T_CHAPA/2),toeZ,RODAPE_H/2,(L+toeZ+T_CHAPA/2)/2,[.2,-.08,0])]){toePanels.push(toe);toe.visible=$('toe').checked}
// Tampos encostados nas paredes; avançam além das portas.
part('Tampo principal',W,.025,D,W/2,PE+H_CAIXA+.0125,D/2,[0,.45,0],'MDF 25 mm','#e4ded1');
part('Tampo retorno',D,.025,R,D/2,PE+H_CAIXA+.0125,D+R/2,[0,.45,.15],'MDF 25 mm','#e4ded1');
// Countertop microwave, nominal 50 × 30 × 40 cm.
const mx=W-.42;box(.50,.30,.40,mx,1.015,.26,'#555a54');box(.39,.21,.012,mx-.035,1.015,.466,'#202b2b');box(.022,.17,.025,mx+.14,1.015,.49,'#b7b9b0');box(.055,.035,.014,mx+.215,1.075,.47,'#a2ae89');
// External references only; dimensions and arrangement are assumptions.
box(.50,.86,.60,.30,.43,D+R+.30,'#ededdf',refs);box(.42,.42,.015,.30,.40,D+R+.61,'#3b443e',refs);box(.50,.025,.60,.30,.87,D+R+.30,'#555b53',refs);for(const x of [.16,.44])for(const z of [D+R+.14,D+R+.42]){const ring=new T.Mesh(new T.TorusGeometry(.065,.008,8,24),new T.MeshStandardMaterial({color:'#1f2825'}));ring.rotation.x=Math.PI/2;ring.position.set(x,.893,z);refs.add(ring)}box(.60,.87,.60,.87,.435,D+R+.30,'#c8c9bf',refs);box(.40,.015,.40,.87,.88,D+R+.30,'#7f918e',refs);refs.visible=$('refs').checked;
line([0,.04,D+R+.18],[W,.04,D+R+.18],fmt(W)+' cm móveis');line([0,H+.12,0],[wallW,H+.12,0],fmt(wallW)+' cm parede');line([W+.12,0,0],[W+.12,H,0],fmt(H)+' cm');line([-.18,.93,D],[-.18,.93,D+R],'+ '+fmt(R)+' cm');line([W+.12,.9,0],[W+.12,.9,D],fmt(D)+' cm');line([doorFront,.03,D+.12],[x0,.03,D+.12],'fech. '+fmt(filler)+' cm');for(let i=0;i<n;i++)line([x0+i*w,.97,D+.05],[x0+(i+1)*w,.97,D+.05],fmt(w)+' cm');dimensions.visible=$('dims').checked;hardwareMeshes.forEach(m=>m.visible=$('hardware').checked);screws.forEach(m=>m.scale.setScalar(screwZoom?4:1));makeDoorControls();$('count').textContent=pieces.length+' PEÇAS';$('parts').replaceChildren(...pieces.map(p=>{const tr=document.createElement('tr');for(const text of [p.name,dim(p),p.material]){const td=document.createElement('td');td.textContent=text;tr.append(td)}tr.onclick=()=>select(p);return tr}));renderHardware();explode();}
function corners(d){const g=d.door.geometry.parameters,m=d.door.matrixWorld;return [[-g.width/2,-g.depth/2],[g.width/2,-g.depth/2],[g.width/2,g.depth/2],[-g.width/2,g.depth/2]].map(([x,z])=>{const v=new T.Vector3(x,0,z).applyMatrix4(m);return [v.x,v.z]})}
function overlaps(a,b){for(const poly of [a,b])for(let i=0;i<4;i++){const p=poly[i],q=poly[(i+1)%4],ax=-(q[1]-p[1]),az=q[0]-p[0],pa=a.map(v=>v[0]*ax+v[1]*az),pb=b.map(v=>v[0]*ax+v[1]*az);if(Math.max(...pa)<=Math.min(...pb)+1e-8||Math.max(...pb)<=Math.min(...pa)+1e-8)return false}return true}
function collisionCheck(){scene.updateMatrixWorld(true);const hits=[],affected=new Set();for(let i=0;i<doorPivots.length;i++)for(let j=i+1;j<doorPivots.length;j++)if(overlaps(corners(doorPivots[i]),corners(doorPivots[j]))){hits.push(doorPivots[i].name+' / '+doorPivots[j].name);affected.add(doorPivots[i]);affected.add(doorPivots[j])}for(const d of doorPivots){d.door.material.color.set(affected.has(d)?'#e22b25':color);d.door.material.emissive.set(affected.has(d)?'#7d0a06':(selected===d.door.userData.p?'#4b582f':'#000000'));d.door.material.emissiveIntensity=affected.has(d)?.35:.3}$('collisions').textContent=hits.length?'Em vermelho: interferência entre '+hits.join('; '):'Sem sobreposição entre portas neste ângulo. Outros objetos, puxadores e dobradiças não são verificados.'}
function makeDoorControls(){const list=$('doorSelect');list.replaceChildren();doorPivots.forEach((d,i)=>{const option=document.createElement('option');option.value=i;option.textContent=d.name;list.append(option)});syncDoor();collisionCheck()}
// Trajetória conceitual: translação empírica de até 10 mm para dentro e 6 mm para fora. Não corresponde a dados medidos de uma dobradiça.
function poseDoor(d){const a=d.angle*Math.PI/180,travel=Math.sin(a),t=+$('explode').value/100;d.pivot.position.copy(d.base).addScaledVector(d.offset,t);d.pivot.position.x+=(d.right?-1:1)*.010*travel;d.pivot.position.z+=.006*travel;d.pivot.rotation.y=(d.right?1:-1)*a}
function syncDoor(){const d=doorPivots[+$('doorSelect').value];if(!d)return;$('doorAngle').value=d.angle;$('doorValue').value=d.angle+'°'}
$('action').onchange=()=>{for(const mode of ['explode','door','other'])$('tool-'+mode).hidden=$('action').value!==mode};$('doorSelect').onchange=syncDoor;$('doorAngle').oninput=()=>{const d=doorPivots[+$('doorSelect').value];if(!d)return;d.angle=+$('doorAngle').value;poseDoor(d);$('doorValue').value=d.angle+'°';collisionCheck()};
function select(p){if(selected)selected.mesh.material.emissive.set(0);selected=p;p.mesh.material.emissive.set('#4b582f');p.mesh.material.emissiveIntensity=.3;collisionCheck();$('selection').textContent=p.name+' · '+dim(p)}
function explode(){const t=+$('explode').value/100;for(const p of pieces)p.mesh.position.copy(p.base).addScaledVector(p.offset,t);for(const d of doorPivots)poseDoor(d);$('percent').value=Math.round(t*100)+'%';collisionCheck()}
function preset(type){const W=+$('width').value/100;controls.target.set(W/2,1,.35);camera.up.set(0,1,0);if(type==='top'){camera.position.set(W/2,6,.351);controls.target.set(W/2,0,.35)}else if(type==='front')camera.position.set(W/2,1.3,6.5);else camera.position.set(W+2.6,3.5,5);controls.update();for(const id of ['perspective','front','top'])$(id).classList.toggle('active',id===type)}
for(const id of ['wallWidth','width','height','depth','return'])$(id).onchange=()=>{const e=$(id);e.value=Math.max(+e.min,Math.min(+e.max,+e.value||+e.min));$('width').value=Math.min(+$('width').value,+$('wallWidth').value);build()};$('explode').oninput=explode;$('screwZoom').onclick=()=>{screwZoom=!screwZoom;screws.forEach(m=>m.scale.setScalar(screwZoom?4:1));$('screwZoom').textContent='Destacar parafusos: '+(screwZoom?'ligado':'desligado')};$('hardware').onchange=()=>hardwareMeshes.forEach(m=>m.visible=$('hardware').checked);$('toe').onchange=()=>toePanels.forEach(m=>m.visible=$('toe').checked);$('dims').onchange=()=>dimensions.visible=$('dims').checked;$('refs').onchange=()=>refs.visible=$('refs').checked;document.querySelectorAll('[data-color]').forEach(b=>b.onclick=()=>{color=b.dataset.color;document.querySelectorAll('[data-color]').forEach(v=>v.classList.toggle('active',v===b));build()});for(const id of ['perspective','front','top'])$(id).onclick=()=>preset(id);
let down;renderer.domElement.onpointerdown=e=>down=[e.clientX,e.clientY];renderer.domElement.onpointerup=e=>{if(!down||Math.hypot(e.clientX-down[0],e.clientY-down[1])>5)return;const r=renderer.domElement.getBoundingClientRect(),ray=new T.Raycaster();ray.setFromCamera(new T.Vector2((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1),camera);const hit=ray.intersectObjects(pieces.map(p=>p.mesh),false)[0];if(hit)select(hit.object.userData.p)};
let hardwareRows=[];
function renderHardware(){const shelves=pieces.filter(p=>p.name.includes(' · prateleira')).length;hardwareRows=makeHardwareList({cabinetCount,doorCount:doorPivots.length,shelves,pieces,legCount});$('modelSummary').textContent=`${cabinetCount} caixas · ${doorPivots.length} portas · ${shelves} prateleiras · ${legCount} pés · caixas com ${fmt(geo.cabinetDepth)} cm de profundidade`;$('hardwareList').replaceChildren(...hardwareRows.map(row=>{const tr=document.createElement('tr'),name=document.createElement('td'),quantity=document.createElement('td'),note=document.createElement('td');if(row.url){const a=document.createElement('a');a.href=row.url;a.target='_blank';a.rel='noopener noreferrer';a.textContent=row.name;name.append(a)}else name.textContent=row.name;quantity.textContent=row.qty;note.textContent=row.note;tr.append(name,quantity,note);return tr}))}
function csvCell(v){return '"'+String(v).replaceAll('"','""')+'"'}
$('csvHardware').onclick=()=>{const lines=[['Componente','Quantidade prevista','Aplicação e conferência','Fonte'],...hardwareRows.map(r=>[r.name,r.qty,r.note,r.url||''])];const content='\ufeff'+lines.map(row=>row.map(csvCell).join(';')).join('\r\n');const url=URL.createObjectURL(new Blob([content],{type:'text/csv;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='cozinha-materiais-preliminares.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)};
$('csv').onclick=()=>{const rows=['Peça;Largura (cm);Altura (cm);Profundidade (cm);Material',...pieces.map(p=>[p.name,...p.size.map(fmt),p.material].join(';')),'Estudo conceitual — validar antes de fabricar'];const url=URL.createObjectURL(new Blob(['\ufeff'+rows.join('\r\n')],{type:'text/csv;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='cozinha-medidas.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)};
new ResizeObserver(()=>{camera.aspect=view.clientWidth/view.clientHeight;camera.updateProjectionMatrix();renderer.setSize(view.clientWidth,view.clientHeight)}).observe(view);build();preset('perspective');renderer.setAnimationLoop(()=>{controls.update();renderer.render(scene,camera)});
