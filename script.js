const ROLES={
 lobo:{id:"lobo",equipo:"lobos",nombre:"Lobo",emoji:"🐺",lore:"Eres un lobo de Castronegro. Cada noche, junto a tu manada, devoráis a un aldeano. De día, finge ser uno más y despista las sospechas."},
 bruja:{id:"bruja",equipo:"aldeanos",nombre:"Bruja",emoji:"🧙‍♀️",lore:"Posees dos pociones: una de salvación (revive al atacado por los lobos) y otra de veneno (mata a un jugador). Úsalas con astucia."},
 cazador:{id:"cazador",equipo:"aldeanos",nombre:"Cazador",emoji:"🏹",lore:"Si mueres (por los lobos o por votación), tu última bala te permite llevarte a otro jugador contigo antes de caer."},
 vidente:{id:"vidente",equipo:"aldeanos",nombre:"Vidente",emoji:"🔮",lore:"Cada noche puedes observar a un jugador y descubrir si es lobo o aldeano. Tu información es clave para salvar al pueblo."},
 cupido:{id:"cupido",equipo:"aldeanos",nombre:"Cupido",emoji:"💘",lore:"La primera noche flechas a dos jugadores (puedes incluirte). Los enamorados se aman: si uno muere, el otro muere de pena."},
 aldeano:{id:"aldeano",equipo:"aldeanos",nombre:"Aldeano",emoji:"🧑‍🌾",lore:"Eres un simple habitante de Castronegro. Sin poderes, usa la lógica y la observación para desenmascarar a los lobos en la votación."}
};
let state={fase:"setup",nombres:[],roles:[],idx:0,ronda:0,vivos:[],atacado:-1,narration:[],hablando:false,pocionSalvar:true,pocionVeneno:true,balaCazador:true,faseNoche:"dormir",ultimoMuerto:-1,causaMuerto:"",pareja:[]};
const ORDEN_NOCHE=[];
const el=(id)=>document.getElementById(id);
function shuffle(a){const arr=a.slice();for(let i=arr.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];}return arr;}
function esLobo(i){return state.roles[i]==="lobo";}
const synth=window.speechSynthesis||null;
let voix=null;
let habilitarVoz=true;
let vozCargada=false;
function escogerVoz(){
 if(!synth)return false;
 const vs=synth.getVoices();
 if(!vs.length)return false;
 const preferidos=vs.filter(v=>/es/i.test(v.lang));
 const p=preferidos.find(v=>/es[-_]ES/i.test(v.lang)&&/female|mujer|monica|elena|helena|lupe|maria|paulina|paola|rosa|sofia/i.test(v.name))
   || preferidos.find(v=>/es[-_]ES/i.test(v.lang))
   || (preferidos.find(v=>/es[-_]MX/i.test(v.lang)))
   || (preferidos.find(v=>/google/i.test(v.name)))
   || preferidos[0]
   || vs[0];
 if(p){voix=p;vozCargada=true;return true;}
 return false;
}
function asegurarVoz(){
 if(!synth)return false;
 if(!vozCargada)escogerVoz();
 // A veces el motor se "duerme" en Chrome; despiértalo con un utter vacío.
 if(!synth.speaking){try{synth.speak(new SpeechSynthesisUtterance(" "));synth.cancel();}catch(e){}}
 return !!voix;
}
if(synth){escogerVoz();if(synth.onvoiceschanged!==undefined){synth.onvoiceschanged=escogerVoz;}}
// Primer gesto del usuario: los navegadores exigen interacción para permitir el audio.
function activarAudio(){asegurarVoz();}
document.addEventListener("pointerdown",activarAudio,{once:false});
document.addEventListener("touchend",activarAudio,{once:false});
function hablar(t,onend){
 if(!synth||!habilitarVoz||!t){if(onend)onend();return;}
 asegurarVoz();
 try{synth.cancel();}catch(e){}
 // Trocea por signos de puntuación para evitar el corte de Chrome en frases largas.
 const trozos=t.split(/(?<=[.,;:!?¿?¡])\s+/).filter(s=>s.trim());
 let i=0;
 function seguir(){
  if(i>=trozos.length){state.hablando=false;if(onend)onend();return;}
  const frag=trozos[i++].trim();
  const u=new SpeechSynthesisUtterance(frag);
  u.lang="es-ES";if(voix)u.voice=voix;
  u.rate=0.95;u.pitch=0.75;u.volume=1;
  const pausa=/[.,;:!?¿?¡]$/.test(frag)?180:0;
  let aviso=0;
  u.onend=()=>{if(aviso)return;aviso=1;setTimeout(seguir,pausa);};
  u.onerror=()=>{if(aviso)return;aviso=1;seguir();};
  // Marca segura: si la voz se cuelga sin onend, continúa igualmente.
  setTimeout(()=>{if(!synth.speaking&&i<trozos.length&&!aviso){aviso=1;seguir();}},2500);
  try{synth.speak(u);}catch(e){seguir();}
 }
 state.hablando=true;seguir();
}
function narra(t){state.narration.push(t);hablar(t);}
function releer(){const t=state.narration[state.narration.length-1];if(t)hablar(t);}
function narradorHTML(t){return `<div class="narrator"><div class="avatar">🎙️</div><div class="speech"><div class="says">NARRADOR</div><div>${t}</div><div style="margin-top:8px"><button class="secondary" style="padding:8px 12px;font-size:13px" onclick="releer()">🔊 Repetir</button></div></div></div>`;}
const app=el("app");
function render(){if(state.fase==="setup")renderSetup();else if(state.fase==="nombres")renderNombres();else if(state.fase==="roles")renderRoles();else if(state.fase==="juego")renderJuego();}
let cfgRoles={lobo:1,bruja:0,cazador:0,vidente:0,cupido:0,aldeano:2};
const colorRol={lobo:"#ff6b5b",bruja:"#b23bff",cazador:"#f5c542",vidente:"#3ddc84",cupido:"#ff79c6",aldeano:"#9db1ff"};
function renderSetup(){
 app.innerHTML=`<div class="screen active">
  <h1><span class="moon">🌕</span> Castronegro Duerme</h1>
  <div class="subtitle">Roles ocultos por turnos · pasa el móvil</div>
  <div class="card"><h2><span class="emoji">👥</span> Jugadores</h2><label>Añade a los jugadores uno a uno.</label>
   <input type="text" id="nuevoNombre" placeholder="Escribe un nombre...">
   <button class="secondary" onclick="anadirNombre()">➕ Añadir jugador</button>
   <div id="listaNombres" class="role-list"></div>
   <div class="warn" id="warnJug"></div></div>
  <button class="btn-big" onclick="seguirARoles()">Continuar →</button></div>`;
 actualizarListaNombres();
}
function anadirNombre(){
 const inp=el("nuevoNombre");const v=inp.value.trim();
 if(!v)return;
 state.nombres.push(v);inp.value="";
 actualizarListaNombres();
}
function quitarNombre(i){state.nombres.splice(i,1);actualizarListaNombres();}
function actualizarListaNombres(){
 const c=el("listaNombres");
 if(!c)return;
 const warn=el("warnJug");
 warn.textContent="";
 c.innerHTML=state.nombres.map((n,i)=>`<div class="role-row"><div class="info"><div class="name">${n}</div></div><button class="secondary" style="padding:8px 14px;font-size:13px" onclick="quitarNombre(${i})">✖</button></div>`).join("");
 if(!state.nombres.length)c.innerHTML=`<div style="text-align:center;color:var(--muted);font-size:13px">Todavía no hay jugadores.</div>`;
}
function seguirARoles(){
 const warn=el("warnJug");

 state.fase="roles";renderRolesConfig();
}
function renderRolesConfig(){
 app.innerHTML=`<div class="screen active">
  <h1>🃏 Roles</h1>
  <div class="subtitle">${state.nombres.length} jugadores · elige cuántos hay de cada rol</div>
  <div class="card"><h2><span class="emoji">🎭</span> Reparto de roles</h2><label>El total debe coincidir con ${state.nombres.length} jugadores.</label>
   <div class="role-list" id="roleConfig"></div>
   <div class="warn" id="warnRoles"></div></div>
  <button class="btn-big" onclick="empezar()">▶ Repartir roles</button></div>`;
 const cont=el("roleConfig");
 for(const id in ROLES){const r=ROLES[id];cont.insertAdjacentHTML("beforeend",`<div class="role-row"><div class="info"><div class="name" style="color:${colorRol[id]}">${r.emoji} ${r.nombre}</div><div class="desc">${r.equipo==="lobos"?"Manada de los Lobos":"Pueblo de Castronegro"}</div></div><div class="stepper"><button onclick="cambiarRol('${id}',-1)">−</button><span id="cnt_${id}">${cfgRoles[id]}</span><button onclick="cambiarRol('${id}',1)">+</button></div></div>`);}
}
function cambiarRol(id,d){cfgRoles[id]=Math.max(0,cfgRoles[id]+d);el("cnt_"+id).textContent=cfgRoles[id];actualizarWarnRoles();}
function actualizarWarnRoles(){
 const total=Object.values(cfgRoles).reduce((a,b)=>a+b,0);
 const w=el("warnRoles");if(!w)return;
 if(total!==state.nombres.length)w.textContent=`Total de roles: ${total} (faltan o sobran ${Math.abs(total-state.nombres.length)}).`;
 else if(cfgRoles.lobo<1)w.textContent="Debe haber al menos 1 Lobo.";
 else w.textContent="✅ ¡Correcto! Puedes repartir.";
}
function empezar(){
 const total=Object.values(cfgRoles).reduce((a,b)=>a+b,0);
 if(total!==state.nombres.length){actualizarWarnRoles();return;}
 if(cfgRoles.lobo<1){actualizarWarnRoles();return;}
 state.roles=shuffle(Object.entries(cfgRoles).flatMap(([id,c])=>Array(c).fill(id)));
 state.vivos=state.nombres.map((_,i)=>i);state.idx=0;state.ronda=1;state.pareja=[];state.fase="roles";render();
}
function renderRoles(){
 if(state.idx>=state.nombres.length){state.fase="juego";prepararNoche();render();return;}
 const nombre=state.nombres[state.idx];const rol=ROLES[state.roles[state.idx]];const lobo=rol.equipo==="lobos";
 const equipoLbl=lobo?'🐺 MANADA DE LOBOS':'🏘️ PUEBLO DE CASTRONEGRO';
 const nomColor=lobo?'#ff8a7a':'#7ee2a8';
 const equipoClase=lobo?'team-lobo':'team-aldeano';
 app.innerHTML=`<div class="screen active">
  <div class="progress">${state.nombres.map((_,i)=>`<div class="dot ${i<state.idx?'done':''} ${i===state.idx?'on':''}"></div>`).join("")}</div>
  <div class="card reveal-wrap">
   <div class="subtitle">📱 Entrega el móvil a la persona <b>#${state.idx+1}</b></div>
   <div class="privacy-note">🔒 Nadie más debe mirar. Tapa la pantalla con la mano.</div>
   <div class="reveal-slider" id="slider">
    <div class="reveal-content ${equipoClase}">
     <div class="tu-nombre">${nombre}</div>
     <div class="big">${rol.emoji}</div>
     <div class="role-name" style="color:${nomColor}">${rol.nombre}</div>
     <div class="team">${equipoLbl}</div>
     <div class="lore">${rol.lore}</div>
    </div>
    <div class="reveal-cover" id="cover">
     <div class="nombre-tapa">${nombre}</div>
     <div class="tap-aviso">👆 Toca y manten para revelar</div>
     <div class="flecha">👇 desliza hacia abajo</div>
     <div class="hint">Solo tú debes verlo. Al soltar se tapará de nuevo.</div>
    </div>
   </div>
  </div>
  <button class="btn-big" onclick="siguienteRol()">🙈 Ocultar y pasar el móvil</button></div>`;
 var slider=el("slider"), cover=el("cover");
 var maxDrag=slider.offsetHeight*0.85;
 var startY=0, drag=0; var arrastrando=false;
 cover.addEventListener("pointerdown",function(e){arrastrando=true;startY=e.clientY;drag=0;cover.style.transition="none";cover.setPointerCapture(e.pointerId);});
 cover.addEventListener("pointermove",function(e){if(!arrastrando)return;drag=e.clientY-startY;if(drag<0)drag=0;if(drag>maxDrag)drag=maxDrag;cover.style.transform=`translateY(${drag}px)`;});
 function cerrar(){cover.style.transition="transform .3s ease";cover.style.transform="translateY(0)";arrastrando=false;}
 cover.addEventListener("pointerup",cerrar);
 cover.addEventListener("pointercancel",cerrar);
}
function siguienteRol(){state.idx++;renderRoles();}
function prepararNoche(){
 state.faseNoche="dormir";state.atacado=-1;state.ultimoMuerto=-1;state.narration=[];ORDEN_NOCHE.length=0;
 // Cupido actúa la primera noche, antes que todos
 if(state.ronda===1&&state.pareja.length===0&&state.vivos.some(i=>state.roles[i]==="cupido"))ORDEN_NOCHE.push("cupido");
 if(state.vivos.some(esLobo))ORDEN_NOCHE.push("lobos");
 if((state.pocionSalvar||state.pocionVeneno)&&state.vivos.some(i=>state.roles[i]==="bruja"))ORDEN_NOCHE.push("bruja");
 if(state.vivos.some(i=>state.roles[i]==="vidente"))ORDEN_NOCHE.push("vidente");
 if(ORDEN_NOCHE.length===0)ORDEN_NOCHE.push("amanecer");
}
function renderJuego(){
 const deDia=state.faseNoche==="dia"||state.faseNoche==="votacion"||state.faseNoche==="fin";
 app.innerHTML=`<div class="screen active"><div class="phase-bar ${deDia?'phase-dia':'phase-noche'}">${deDia?'☀️ DÍA':'🌙 NOCHE'} · Ronda ${state.ronda}</div><div id="juegoBody"></div><div class="phase-bar phase-dia" style="font-size:12px">Vivos: ${state.vivos.length} · Lobos: ${state.vivos.filter(esLobo).length}</div></div>`;
 const body=el("juegoBody");if(deDia)renderDia(body);else renderNoche(body);
}
function renderNoche(body){
 switch(state.faseNoche){
  case "dormir":
   var primerRol=ORDEN_NOCHE[0];
   var pala=primerRol==="cupido"?"Que despierte Cupido.":primerRol==="lobos"?"Que despierten los Lobos.":"Que despierten los roles.";
   body.innerHTML=`<div class="card"><h2><span class="emoji">😴</span> El pueblo duerme</h2><div class="tap-zone">Todos cierran los ojos.<br>El narrador llamará a cada rol por turnos.</div></div>${narradorHTML(pala)}<button class="btn-big lobo" onclick="fasePrimerRol()">🌙 Despertar</button>`;
   hablar(pala);break;
  case "cupido":renderCupido(body);break;
  case "lobos":renderTurno(body,"lobos");break;
  case "bruja":renderBruja();break;
  case "vidente":renderTurno(body,"vidente");break;
  case "amanecer":renderAmanecer(body);break;
 }
}
function renderTurno(body,rolId){
 const datos={lobos:{emoji:"🐺",titulo:"Los Lobos eligen a su víctima",clase:"lobo",txt:"Lobos, despertad. Elegid en silencio a quién devorar esta noche."},bruja:{emoji:"🧙‍♀️",titulo:"La Bruja despierta",clase:"",txt:"Bruja, despierta. ¿Usarás alguna de tus pociones?"},vidente:{emoji:"🔮",titulo:"La Vidente despierta",clase:"",txt:"Vidente, despierta. ¿A qué jugador deseas observar?"}}[rolId];
 narra(datos.txt);
 body.innerHTML=`<div class="card"><h2><span class="emoji">${datos.emoji}</span> ${datos.titulo}</h2><p style="font-size:13px;color:var(--muted)">Pasa el móvil a quien tenga este rol. Elige en silencio y pulsa Confirmar.</p><div class="result-list" id="targets"></div></div>${narradorHTML(datos.txt)}<button class="btn-big ${datos.clase}" id="confirmTurno" disabled>✔ Confirmar</button>`;
 const targets=el("targets");let sel=null;
 const elegibles=rolId==="lobos"?state.vivos.filter(i=>!esLobo(i)):state.vivos.slice();
 elegibles.forEach(i=>{const d=document.createElement("div");d.className="result-item";d.innerHTML=`<span>${state.nombres[i]}</span>`;d.onclick=()=>{document.querySelectorAll("#targets .result-item").forEach(x=>x.style.outline="none");d.style.outline=`2px solid ${rolId==="lobos"?"var(--lobo)":"var(--accent)"}`;sel=i;el("confirmTurno").disabled=false;};targets.appendChild(d);});
 el("confirmTurno").onclick=()=>resolverTurno(rolId,sel);
}
function resolverTurno(rolId,objetivo){
 if(rolId==="lobos"){state.atacado=objetivo;siguienteFaseNoche();}
 else if(rolId==="bruja"){renderBruja();}
 else if(rolId==="vidente"){
  const lobo=esLobo(objetivo);
  el("juegoBody").innerHTML=`<div class="card reveal" style="text-align:center"><h2><span class="emoji">🔮</span> La Vidente observa</h2><div class="tap-zone" style="margin-top:8px"><div class="big">${lobo?'🐺':'🧑‍🌾'}</div><div style="font-size:26px;font-weight:800">${state.nombres[objetivo]}</div><div style="margin-top:8px;font-size:18px">${lobo?'es un LOBO':'es un aldeano'}</div></div></div><button class="btn-big" onclick="ocultarVidente()">🙈 Ocultar y continuar</button>`;
  hablar(lobo?`${state.nombres[objetivo]} es un lobo.`:`${state.nombres[objetivo]} es un aldeano.`);
 }
}
function ocultarVidente(){siguienteFaseNoche();}
function renderBruja(){
 const body=el("juegoBody");
 narra(state.atacado>=0?`Bruja, esta noche los lobos han atacado a ${state.nombres[state.atacado]}. ¿Usarás tu poción de salvación o de veneno?`:`Bruja, despierta. ¿Usarás alguna de tus pociones?`);
 let html=`<div class="card"><h2><span class="emoji">🧙‍♀️</span> Pociones de la Bruja</h2>`;
 if(state.atacado>=0)html+=`<div style="margin-top:10px;padding:12px;border-radius:10px;background:rgba(192,57,43,.18);border:1px solid var(--lobo);font-size:15px">🐺 Esta noche los lobos han atacado a <b>${state.nombres[state.atacado]}</b>.</div>`;
 const a=[];
 if(state.atacado>=0&&state.pocionSalvar)a.push(`<button class="ok" onclick="brujaSalvar()">💚 Salvar a ${state.nombres[state.atacado]}</button>`);
 if(state.pocionVeneno)a.push(`<button class="danger" onclick="brujaVeneno()">☠️ Envenenar a alguien</button>`);
 a.push(`<button class="secondary" onclick="siguienteFaseNoche()">😴 No usar pociones</button>`);
 html+=`<div class="action-btns" style="margin-top:12px">${a.join("")}</div></div>${narradorHTML(state.narration[state.narration.length-1])}`;
 body.innerHTML=html;
}
function brujaSalvar(){state.pocionSalvar=false;state.atacado=-1;siguienteFaseNoche();}
function brujaVeneno(){
 const body=el("juegoBody");narra("Bruja, elige a quién envenenar.");
 body.innerHTML=`<div class="card"><h2><span class="emoji">☠️</span> Veneno</h2><div class="result-list" id="venenos"></div></div>`;
 const list=el("venenos");
 state.vivos.forEach(i=>{const d=document.createElement("div");d.className="result-item";d.innerHTML=`<span>${state.nombres[i]}</span>`;d.onclick=()=>{state.pocionVeneno=false;marcarMuerto(i,"veneno");siguienteFaseNoche();};list.appendChild(d);});
}
function siguienteFaseNoche(){
 const i=ORDEN_NOCHE.indexOf(state.faseNoche);
 if(state.faseNoche==="bruja"){state.faseNoche=ORDEN_NOCHE.includes("vidente")?"vidente":"amanecer";}
 else if(i>=0&&i<ORDEN_NOCHE.length-1){state.faseNoche=ORDEN_NOCHE[i+1];}
 else{state.faseNoche="amanecer";}
 renderJuego();
}
function fasePrimerRol(){state.faseNoche=ORDEN_NOCHE[0]||"amanecer";renderJuego();}
function renderCupido(body){
 narra("Cupido, despierta. Elige a dos jugadores para enamorarlos esta noche.");
 body.innerHTML=`<div class="card"><h2><span class="emoji">💘</span> Cupido lanza sus flechas</h2><p style="font-size:13px;color:var(--muted)">Elige a dos jugadores (puedes incluirte y puede haber un lobo). Selecciona dos y confirma.</p><div class="result-list" id="cupidoList"></div></div>${narradorHTML("Cupido, despierta. Elige a dos jugadores para enamorarlos.")}<button class="btn-big" id="cupidoBtn" disabled>✔ Enamorar</button>`;
 const list=el("cupidoList");let sel=[];
 state.vivos.forEach(i=>{const d=document.createElement("div");d.className="result-item";d.innerHTML=`<span>${state.nombres[i]}</span>`;d.onclick=()=>{if(sel.includes(i)){sel=sel.filter(x=>x!==i);d.style.outline="none";}else{if(sel.length>=2)return;sel.push(i);d.style.outline="2px solid #ff79c6";}el("cupidoBtn").disabled=sel.length!==2;};list.appendChild(d);});
 el("cupidoBtn").onclick=()=>{state.pareja=sel.slice();siguienteFaseNoche();};
}
function morirDeAmor(excluido){
 // mata al enamorado que sigue vivo
 state.pareja.forEach(ip=>{
  if(ip!==excluido&&state.vivos.includes(ip)){
   state.vivos=state.vivos.filter(i=>i!==ip);
   state.muertosPorAmor=(state.muertosPorAmor||[]).concat([ip]);
  }
 });
}
function marcarMuerto(idx,causa){
 if(state.vivos.includes(idx))state.vivos=state.vivos.filter(i=>i!==idx);
 state.ultimoMuerto=idx;state.causaMuerto=causa;
 // si estaba enamorado, su pareja muere de pena
 if(state.pareja.includes(idx))morirDeAmor(idx);
}
function renderAmanecer(body){
 let items="";let anuncio="";
 if(state.atacado>=0){const n=state.nombres[state.atacado];items+=`<div class="result-item"><span>${n}</span><span class="status-pill" style="background:var(--lobo)">💀 Devorado</span></div>`;marcarMuerto(state.atacado,"lobos");anuncio=`Amanece en Castronegro. Esta noche los lobos han devorado a ${n}.`;}
 else if(state.causaMuerto==="veneno"){const n=state.nombres[state.ultimoMuerto];items+=`<div class="result-item"><span>${n}</span><span class="status-pill" style="background:var(--accent)">☠️ Envenenado</span></div>`;anuncio=`Amanece en Castronegro. Esta noche alguien ha sido envenenado: ${n}.`;}
 else{items+=`<div class="result-item"><span>Nadie ha muerto esta noche</span><span class="status-pill" style="background:var(--ok)">🌤️</span></div>`;anuncio=`Amanece en Castronegro. Nadie ha muerto esta noche.`;}
 if(state.muertosPorAmor&&state.muertosPorAmor.length){state.muertosPorAmor.forEach(ip=>{items+=`<div class="result-item"><span>${state.nombres[ip]}</span><span class="status-pill" style="background:#ff79c6">💔 Muerto de amor</span></div>`;});anuncio+=` Un enamorado ha muerto de pena.`;state.muertosPorAmor=[];}
 if(state.ultimoMuerto>=0&&state.roles[state.ultimoMuerto]==="cazador"&&state.balaCazador)items+=`<button class="danger" style="margin-top:8px" onclick="disparoCazador()">🏹 El Cazador usa su última bala</button>`;
 narra(anuncio);
 body.innerHTML=`<div class="card"><h2><span class="emoji">🌅</span> Amanece en Castronegro</h2><div class="result-list" id="resAmanecer"></div></div>${narradorHTML(anuncio)}<button class="btn-big" onclick="pasarAlDia()">☀️ Anunciar el día</button>`;
 el("resAmanecer").innerHTML=items;
}
function disparoCazador(){
 state.balaCazador=false;const body=el("juegoBody");narra("El Cazador, antes de caer, dispara su última bala contra alguien.");
 body.innerHTML=`<div class="card"><h2><span class="emoji">🏹</span> Disparo del Cazador</h2><div class="result-list" id="disparos"></div></div>`;
 const list=el("disparos");
 state.vivos.forEach(i=>{const d=document.createElement("div");d.className="result-item";d.innerHTML=`<span>${state.nombres[i]}</span>`;d.onclick=()=>{marcarMuerto(i,"cazador");pasarAlDia();};list.appendChild(d);});
}
function pasarAlDia(){if(estadoFin())return;state.faseNoche="dia";renderJuego();}
function renderDia(body){
 if(estadoFin())return;
 if(state.faseNoche==="fin"){renderFin();return;}
 narra("El pueblo despierta. Ha llegado el momento de debatir y votar.");
 body.innerHTML=`<div class="card"><h2><span class="emoji">🗣️</span> El pueblo debate</h2><p style="font-size:14px;line-height:1.6">Los aldeanos discuten quién puede ser lobo. Cuando hayáis decidido, id a la votación. Si no hay sospechosos claros, podéis pasar a la noche.</p></div>${narradorHTML("El pueblo despierta. Ha llegado el momento de debatir y votar.")}<div class="action-btns"><button class="btn-big" onclick="irAVotacion()">🗳️ Ir a la votación</button><button class="btn-big secondary" onclick="siguienteRonda()">🌙 Pasar esta votación</button></div>`;
}
function irAVotacion(){state.faseNoche="votacion";renderVotacion();}
function renderVotacion(){
 const body=el("juegoBody");narra("Es la hora de la votación. Cada aldeano vota en secreto al jugador que cree que es lobo.");let sel=null;
 body.innerHTML=`<div class="card"><h2><span class="emoji">🗳️</span> Votación del pueblo</h2><p style="font-size:13px;color:var(--muted)">Selecciona al jugador expulsado por mayoría.</p><div class="result-list" id="votantes"></div></div>${narradorHTML("Es la hora de la votación. Cada aldeano vota en secreto.")}<button class="btn-big danger" id="votarBtn" disabled>✅ Expulsar del pueblo</button>`;
 const list=el("votantes");
 state.vivos.forEach(i=>{const d=document.createElement("div");d.className="result-item";d.innerHTML=`<span>${state.nombres[i]}</span>`;d.onclick=()=>{document.querySelectorAll("#votantes .result-item").forEach(x=>x.style.outline="none");d.style.outline="2px solid var(--accent2)";sel=i;el("votarBtn").disabled=false;};list.appendChild(d);});
 el("votarBtn").onclick=()=>{
  const n=state.nombres[sel];marcarMuerto(sel,"votacion");
  const esCaz=state.roles[sel]==="cazador"&&state.balaCazador;
  hablar(`${n} ha sido expulsado del pueblo por la votación.${esCaz?' El Cazador disparará antes de caer.':''}`);
  if(esCaz)setTimeout(()=>disparoCazador(),900);else siguienteRonda();
 };
}
function siguienteRonda(){if(estadoFin())return;state.ronda++;prepararNoche();state.faseNoche="dormir";renderJuego();}
function estadoFin(){
 const l=state.vivos.filter(esLobo).length;const a=state.vivos.length-l;
 if(l>=a){state.faseNoche="fin";renderFin();return true;}
 if(l===0){state.faseNoche="fin";renderFin();return true;}
 return false;
}
function renderFin(){
 const l=state.vivos.filter(esLobo).length;const a=state.vivos.length-l;
 const gananLobos=l>0&&l>=a;
 const body=el("juegoBody");
 const msg=gananLobos?`La manada de los Lobos ha conquistado Castronegro. 🐺`:`El pueblo de Castronegro ha sobrevivido. 🏘️`;
 body.innerHTML=`<div class="card reveal" style="text-align:center"><div class="big">${gananLobos?'🐺':'🎉'}</div><div class="role-name" style="font-size:22px">${gananLobos?'Ganan los Lobos':'Gana el Pueblo'}</div><div class="lore">${msg}</div></div><button class="btn-big" onclick="location.reload()">🔄 Nueva partida</button>`;
 hablar(msg);
}
render();
