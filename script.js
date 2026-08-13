// ============================================================
//  CASTRO NEGRO DUERME
// ============================================================

const ROLES = {
  lobo:       {id:"lobo",        equipo:"lobos",    nombre:"Hombre Lobo",       emoji:"🐺",   expansion:"base",       lore:"Cada noche, junto a tu manada, devoráis a un aldeano. De día, finge ser uno más y despista las sospechas."},
  vidente:    {id:"vidente",     equipo:"aldeanos", nombre:"La Vidente",        emoji:"🔮",   expansion:"base",       lore:"Cada noche descubres la verdadera identidad secreta de un jugador: si es lobo o aldeano."},
  bruja:      {id:"bruja",       equipo:"aldeanos", nombre:"La Bruja",          emoji:"🧙‍♀️", expansion:"base",       lore:"Posees dos pociones de un solo uso: una para revivir a una víctima y otra para eliminar a alguien por la noche."},
  cazador:    {id:"cazador",     equipo:"aldeanos", nombre:"El Cazador",        emoji:"🏹",   expansion:"base",       lore:"Si mueres, tienes un último disparo para llevarte a cualquier jugador por delante."},
  cupido:     {id:"cupido",      equipo:"aldeanos", nombre:"Cupido",            emoji:"💘",   expansion:"base",       lore:"La primera noche eliges a dos jugadores para unirlos como Los Enamorados. Si uno muere, el otro muere de tristeza."},
  nina:       {id:"nina",        equipo:"aldeanos", nombre:"La Niña",           emoji:"👧",   expansion:"base",       lore:"Puedes abrir ligeramente los ojos por la noche para espiar a los lobos, con el riesgo de ser descubierta."},
  aldeano:    {id:"aldeano",     equipo:"aldeanos", nombre:"Aldeano (Simple)",  emoji:"🧑‍🌾", expansion:"base",       lore:"No tienes poderes especiales. Confía en tu lógica y tu voto para descubrir a los lobos."},

  anciano:    {id:"anciano",     equipo:"aldeanos", nombre:"El Anciano",        emoji:"👴",   expansion:"luna",       lore:"Sobrevives al primer ataque de los lobos. Si el pueblo te lincha por error, los aldeanos pierden sus poderes."},
  salvaje:    {id:"salvaje",     equipo:"aldeanos", nombre:"El Niño Salvaje",   emoji:"🧒",   expansion:"luna",       lore:"Al inicio eliges un mentor. Si este muere, te conviertes en un Hombre Lobo."},
  flautista:  {id:"flautista",   equipo:"solo",     nombre:"El Flautista",      emoji:"🎺",   expansion:"luna",       lore:"Juegas en solitario. Hechizas a dos jugadores cada noche y ganas si hechizas a todos al final."},
  comandante: {id:"comandante",  equipo:"aldeanos", nombre:"El Comandante",     emoji:"🪖",   expansion:"luna",       lore:"Organizas las milicias del pueblo y puedes imponer tu decisión en una votación."},

  lobo_feroz: {id:"lobo_feroz",  equipo:"lobos",    nombre:"El Lobo Feroz",     emoji:"🐺",   expansion:"personajes", lore:"Puedes devorar a una segunda víctima por la noche si ningún lobo ha muerto todavía."},
  infecto:    {id:"infecto",     equipo:"lobos",    nombre:"El Infecto Padre",  emoji:"🧛",   expansion:"personajes", lore:"Una vez por partida, infectas a tu víctima nocturna para convertirla en un nuevo lobo."},
  lobo_albino:{id:"lobo_albino", equipo:"lobos",    nombre:"El Lobo Albino",    emoji:"🐺",   expansion:"personajes", lore:"Cada dos noches intentas eliminar a otro lobo para ganar en solitario."},
  domador:    {id:"domador",     equipo:"aldeanos", nombre:"El Domador de Osos",emoji:"🐻",   expansion:"personajes", lore:"Tu oso gruñe por la mañana si hay un lobo sentado inmediatamente a tu lado."},
  zorro:      {id:"zorro",       equipo:"aldeanos", nombre:"El Zorro",          emoji:"🦊",   expansion:"personajes", lore:"Señalas a tres jugadores contiguos y el Narrador te confirma si hay al menos un lobo entre ellos."},
  juez:       {id:"juez",        equipo:"aldeanos", nombre:"El Juez",           emoji:"⚖️",   expansion:"personajes", lore:"Puedes imponer una segunda votación o decidir desempates una vez por partida."},
  hermanos:   {id:"hermanos",    equipo:"aldeanos", nombre:"Los Tres Hermanos", emoji:"👨‍👦‍👦", expansion:"personajes", lore:"Os reconocéis la primera noche para formar un bloque de confianza."},
  tonto:      {id:"tonto",       equipo:"aldeanos", nombre:"El Tonto del Pueblo",emoji:"🤪",  expansion:"personajes", lore:"Si el pueblo te lincha por error, te salvas pero pierdes tu derecho a votar."},
  caballero:  {id:"caballero",   equipo:"aldeanos", nombre:"El Caballero Oxidado",emoji:"🛡️", expansion:"personajes", lore:"El lobo que te devore perderá su turno de ataque la noche siguiente."},
  sirvienta:  {id:"sirvienta",   equipo:"aldeanos", nombre:"La Sirvienta Fiel", emoji:"🧹",   expansion:"personajes", lore:"Puedes mirar la carta del rol que iba a morir de noche y decidir intercambiar tu rol con él."},
  actor:      {id:"actor",       equipo:"aldeanos", nombre:"El Actor",          emoji:"🎭",   expansion:"personajes", lore:"Cada noche tomas prestado temporalmente el poder de un rol muerto o disponible."},
  angel:      {id:"angel",       equipo:"solo",     nombre:"El Ángel",         emoji:"👼",   expansion:"personajes", lore:"Ganas la partida inmediatamente si eres eliminado por votación el primer día."},

  ayuntamiento:{id:"ayuntamiento",equipo:"aldeanos", nombre:"El Ayuntamiento",  emoji:"🏛️",   expansion:"aldea",      lore:"Permite al Alguacil convocar votaciones especiales o decidir desempates."},
  posada:     {id:"posada",      equipo:"aldeanos", nombre:"La Posada",         emoji:"🏠",   expansion:"aldea",      lore:"El dueño puede vetar la participación de un jugador en el debate del día siguiente."},
  iglesia:    {id:"iglesia",     equipo:"aldeanos", nombre:"La Iglesia",        emoji:"⛪",   expansion:"aldea",      lore:"Permite al sacerdote realizar votaciones morales o proteger espacios."},
  molino:     {id:"molino",      equipo:"aldeanos", nombre:"El Molino",         emoji:"🌾",   expansion:"aldea",      lore:"Modifica las reglas de las mayorías en las votaciones del pueblo."},
  panadero:   {id:"panadero",    equipo:"aldeanos", nombre:"El Panadero",       emoji:"🥖",   expansion:"aldea",      lore:"Mientras estés vivo, el pueblo recibe una pizca de confianza. Si mueres, los debates se tensan."},
  abogado:    {id:"abogado",     equipo:"aldeanos", nombre:"El Abogado",        emoji:"📜",   expansion:"aldea",      lore:"Defiendes a un acusado durante un juicio, dándole una segunda oportunidad."},
  gitano:     {id:"gitano",      equipo:"aldeanos", nombre:"El Gitano",         emoji:"🔮",   expansion:"aldea",      lore:"Usas remedios de la aldea que neutralizan efectos extraños o maldiciones."},
  padrino:    {id:"padrino",     equipo:"aldeanos", nombre:"El Ladrón de la Aldea",emoji:"🕵️", expansion:"aldea",      lore:"Operas con doble cara en la economía de la aldea, robando ventajas o información."},
};

const EXPANSIONES = {
  base:       {nombre:"🐺 Juego Base",                     desc:"Los personajes clásicos."},
  luna:       {nombre:"🌕 Luna Nueva",                     desc:"Roles con reglas nocturnas únicas."},
  personajes: {nombre:"👥 Personajes",                     desc:"Nuevos bandos y amenazas."},
  aldea:      {nombre:"🏡 Aldea (Edificios y Oficios)",    desc:"Edificios y oficios de día."},
};

function isLoboId(id){return ROLES[id] && ROLES[id].equipo==="lobos";}

let state={
  fase:"setup", nombres:[], roles:[], idx:0, ronda:0, vivos:[],
  atacado:-1, narration:[], hablando:false,
  pocionSalvar:true, pocionVeneno:true, balaCazador:true,
  faseNoche:"dormir", ultimoMuerto:-1, causaMuerto:"",
  pareja:[], muertosPorAmor:[], mentor:-1, convertido:{},
  infectoUsado:false, loboFerozVivo:true, albinoUsado:false,
  ancianoSalvado:false, tontoSalvado:false,
};
const ORDEN_NOCHE=[];
const el=(id)=>document.getElementById(id);
function shuffle(a){const arr=a.slice();for(let i=arr.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];}return arr;}
function esLobo(i){const r=state.roles[i];if(isLoboId(r))return true;if(state.convertido[i])return true;return false;}

const synth=window.speechSynthesis||null;
let voix=null; let habilitarVoz=true; let vozCargada=false;
function escogerVoz(){
  if(!synth)return false;
  const vs=synth.getVoices();
  if(!vs.length)return false;
  const preferidos=vs.filter(v=>/es/i.test(v.lang));
  const p=preferidos.find(v=>/es[-_]ES/i.test(v.lang)&&/female|mujer|monica|elena|helena|lupe|maria|paulina|paola|rosa|sofia/i.test(v.name))
    || preferidos.find(v=>/es[-_]ES/i.test(v.lang))
    || preferidos.find(v=>/es[-_]MX/i.test(v.lang))
    || preferidos.find(v=>/google/i.test(v.name))
    || preferidos[0] || vs[0];
  if(p){voix=p;vozCargada=true;return true;}
  return false;
}
function asegurarVoz(){
  if(!synth)return false;
  if(!vozCargada)escogerVoz();
  if(!synth.speaking){try{synth.speak(new SpeechSynthesisUtterance(" "));synth.cancel();}catch(e){}}
  return !!voix;
}
if(synth){escogerVoz();if(synth.onvoiceschanged!==undefined){synth.onvoiceschanged=escogerVoz;}}
function activarAudio(){asegurarVoz();}
document.addEventListener("pointerdown",activarAudio,{once:false});
document.addEventListener("touchend",activarAudio,{once:false});
function hablar(t,onend){
  if(!synth||!habilitarVoz||!t){if(onend)onend();return;}
  asegurarVoz();
  try{synth.cancel();}catch(e){}
  const trozos=t.split(/(?<=[.,;:!?¿?¡])\s+/).filter(s=>s.trim());
  let i=0;
  function seguir(){
    if(i>=trozos.length){state.hablando=false;if(onend)onend();return;}
    const frag=trozos[i++].trim();
    const u=new SpeechSynthesisUtterance(frag);
    u.lang="es-ES"; if(voix)u.voice=voix;
    u.rate=0.95; u.pitch=0.75; u.volume=1;
    const pausa=/[.,;:!?¿?¡]$/.test(frag)?180:0;
    let aviso=0;
    u.onend=()=>{if(aviso)return;aviso=1;setTimeout(seguir,pausa);};
    u.onerror=()=>{if(aviso)return;aviso=1;seguir();};
    setTimeout(()=>{if(!synth.speaking&&i<trozos.length&&!aviso){aviso=1;seguir();}},2500);
    try{synth.speak(u);}catch(e){seguir();}
  }
  state.hablando=true; seguir();
}
function narra(t){state.narration.push(t);hablar(t);}
function releer(){const t=state.narration[state.narration.length-1];if(t)hablar(t);}
function narradorHTML(t){return `<div class="narrator"><div class="avatar">🎙️</div><div class="speech"><div class="says">NARRADOR</div><div>${t}</div><div style="margin-top:8px"><button class="secondary" style="padding:8px 12px;font-size:13px" onclick="releer()">🔊 Repetir</button></div></div></div>`;}
function secretoHTML(titulo,contenido){return `<div class="card secreto-card" style="text-align:center"><div class="subtitle">🔒 ${titulo}</div><div class="secreto-wrap"><div class="secreto-content">${contenido}</div><div class="secreto-cover"><div class="tap-aviso">👆 Toca y mantén para ver</div><div class="hint">Nadie más debe mirar. Suelta para tapar de nuevo.</div></div></div></div>`;}
function bindSecreto(){const c=document.querySelector(".secreto-card .secreto-cover");if(!c)return;const ocultar=()=>{c.style.opacity="1";};const mostrar=()=>{c.style.opacity="0";};c.addEventListener("pointerdown",mostrar);c.addEventListener("pointerup",ocultar);c.addEventListener("pointerleave",ocultar);c.addEventListener("pointercancel",ocultar);}

let cfgRoles={};
let activeExp={base:true};
const colorRol={lobo:"#ff6b5b",vidente:"#3ddc84",bruja:"#b23bff",cazador:"#f5c542",cupido:"#ff79c6",nina:"#ffb3c1",aldeano:"#9db1ff",anciano:"#c9a76b",salvaje:"#a0e57e",flautista:"#7ec8e3",comandante:"#8fa3ff",lobo_feroz:"#e05252",infecto:"#9b5de5",lobo_albino:"#e0e0e0",domador:"#c8b06a",zorro:"#ffb347",juez:"#f8f9fa",hermanos:"#7ee2a8",tonto:"#f781c3",caballero:"#b0b0b0",sirvienta:"#d291ff",actor:"#ffd166",angel:"#ffffff",ayuntamiento:"#d4af37",posada:"#cfa06a",iglesia:"#e6e0d4",molino:"#d9c58a",panadero:"#e8b06a",abogado:"#9aa7c7",gitano:"#c39bd3",padrino:"#8d9b6a"};
function initCfg(){cfgRoles={};Object.keys(ROLES).forEach(id=>cfgRoles[id]=0);}
initCfg();
const app=el("app");
function render(){if(state.fase==="setup")renderSetup();else if(state.fase==="roles")renderRolesConfig();else if(state.fase==="juego")renderJuego();}
// ---------- Setup de jugadores ----------
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
  el("warnJug").textContent="";
  c.innerHTML=state.nombres.map((n,i)=>`<div class="role-row"><div class="info"><div class="name">${n}</div></div><button class="secondary" style="padding:8px 14px;font-size:13px" onclick="quitarNombre(${i})">✖</button></div>`).join("");
  if(!state.nombres.length)c.innerHTML=`<div style="text-align:center;color:var(--muted);font-size:13px">Todavía no hay jugadores.</div>`;
}
function seguirARoles(){state.fase="roles";renderRolesConfig();}

// ---------- Config de roles (expansiones plegables) ----------
function renderRolesConfig(){
  const total=state.nombres.length;
  let secciones="";
  for(const exp in EXPANSIONES){
    const ids=Object.keys(ROLES).filter(id=>ROLES[id].expansion===exp);
    if(!ids.length)continue;
    const filas=ids.map(id=>{
      const r=ROLES[id];
      return '<div class="role-row"><div class="info"><div class="name" style="color:'+(colorRol[id]||'#fff')+'">'+r.emoji+' '+r.nombre+'</div><div class="desc">'+r.lore+'</div></div><div class="stepper"><button onclick="cambiarRol(\''+id+'\',-1)">−</button><span id="cnt_'+id+'">'+(cfgRoles[id]||0)+'</span><button onclick="cambiarRol(\''+id+'\',1)">+</button></div></div>';
    }).join("");
    const activa = activeExp[exp]!==false;
    secciones+='<details class="expansion" '+((exp==="base"||activa)?"open":"")+'><summary><label class="switch"><input type="checkbox" '+(activa?"checked":"")+' onchange="toggleExp(\''+exp+'\',this.checked)"><span class="switch-label">'+EXPANSIONES[exp].nombre+'</span></label><span class="exp-desc">'+EXPANSIONES[exp].desc+'</span></summary><div class="role-list">'+filas+'</div></details>';
  }

  app.innerHTML='<div class="screen active">'
   +'<h1>🃏 Roles</h1>'
   +'<div class="subtitle">'+total+' jugadores · activa las expansiones y reparte</div>'
   +'<div class="card"><h2><span class="emoji">⚡</span> Presets rápidos</h2><div class="preset-grid">'
     +'<button class="preset" onclick="preset(\'clasica\')">🌙 Clásica</button>'
     +'<button class="preset" onclick="preset(\'equilibrado\')">⚖️ Equilibrado</button>'
     +'<button class="preset" onclick="preset(\'caos\')">🎲 Caos total</button>'
     +'<button class="preset" onclick="preset(\'luna\')">🌕 Luna Nueva</button>'
     +'<button class="preset" onclick="preset(\'personajes\')">👥 Personajes</button>'
     +'<button class="preset" onclick="preset(\'aldea\')">🏡 Aldea</button>'
   +'</div></div>'
   +'<div class="card"><h2><span class="emoji">🎲</span> Modo aleatorio</h2><p style="font-size:13px;color:var(--muted)">Reparte al azar entre Lobos y Aldeanos.</p>'
     +'<div class="random-row"><label>🐺 Lobos</label><input type="number" id="randLobos" min="1" value="1"><label>🧑‍🌾 Aldeanos</label><input type="number" id="randAld" min="0" value="1"></div>'
     +'<button class="btn-big secondary" onclick="modoAleatorio()">🎲 Repartir aleatoriamente</button>'
   +'</div>'
   +'<div class="card"><h2><span class="emoji">🎭</span> Reparto de roles</h2><label>El total debe coincidir con '+total+' jugadores.</label>'
     +secciones
     +'<div class="warn" id="warnRoles"></div></div>'
   +'<button class="btn-big" onclick="empezar()">▶ Repartir roles</button></div>';
  actualizarWarnRoles();
}

function toggleExp(exp,on){
  activeExp[exp]=on;
  const ids=Object.keys(ROLES).filter(id=>ROLES[id].expansion===exp);
  if(!on){ ids.forEach(id=>cfgRoles[id]=0); }
  renderRolesConfig();
}

// Presets rápidos: reparte automáticamente según el estilo elegido
function preset(nombre){
  activeExp={base:true, luna:nombre==="luna"||nombre==="equilibrado"||nombre==="caos", personajes:nombre==="personajes"||nombre==="equilibrado"||nombre==="caos", aldea:nombre==="aldea"||nombre==="caos"};
  const n=state.nombres.length;
  const nlobos=Math.max(1, Math.floor(n/3));
  const nald=n-nlobos;
  const lobosPool=Object.keys(ROLES).filter(isLoboId);
  const aldeaPool=Object.keys(ROLES).filter(id=>ROLES[id].equipo==="aldeanos");
  function tomar(pool, preferidos, cant){
    let rest=cant; const out=[];
    preferidos.forEach(id=>{ if(rest>0 && pool.includes(id)){out.push(id);rest--;} });
    const copia=pool.slice();
    while(rest>0 && copia.length){
      const id=copia[Math.floor(Math.random()*copia.length)];
      out.push(id); rest--;
      if(id!=="aldeano"&&id!=="lobo") copia.splice(copia.indexOf(id),1);
    }
    while(rest>0){out.push("aldeano");rest--;}
    return out;
  }
  let lobos, aldeanos;
  if(nombre==="clasica"){
    lobos=tomar(lobosPool, ["lobo"], nlobos);
    aldeanos=tomar(["aldeano","vidente","bruja","cazador","cupido","nina"], ["vidente","bruja","cazador","cupido"], nald);
  } else if(nombre==="luna"){
    lobos=tomar(lobosPool, ["lobo"], nlobos);
    aldeanos=tomar(["aldeano","vidente","bruja","cazador","anciano","salvaje","comandante","flautista"], ["anciano","salvaje","comandante","vidente","bruja"], nald);
  } else if(nombre==="personajes"){
    lobos=tomar(["lobo","lobo_feroz","infecto","lobo_albino"], ["lobo","lobo_feroz","infecto"], nlobos);
    aldeanos=tomar(["aldeano","vidente","bruja","cazador","hermanos","zorro","juez","tonto","domador","sirvienta"], ["vidente","bruja","hermanos","zorro","juez"], nald);
  } else if(nombre==="aldea"){
    lobos=tomar(lobosPool, ["lobo"], nlobos);
    aldeanos=tomar(["aldeano","vidente","bruja","cazador","ayuntamiento","posada","iglesia","molino","panadero","abogado","gitano","padrino"], ["panadero","abogado","posada","iglesia"], nald);
  } else if(nombre==="equilibrado"){
    lobos=tomar(["lobo","lobo_feroz","infecto"], ["lobo"], nlobos);
    aldeanos=tomar(["aldeano","vidente","bruja","cazador","cupido","anciano","zorro","juez"], ["vidente","bruja","cazador","cupido"], nald);
  } else if(nombre==="caos"){
    lobos=tomar(lobosPool, [], nlobos);
    aldeanos=tomar(aldeaPool, [], nald);
  }
  initCfg();
  lobos.forEach(id=>cfgRoles[id]++);
  aldeanos.forEach(id=>cfgRoles[id]++);
  renderRolesConfig();
}

function cambiarRol(id,d){
  cfgRoles[id]=Math.max(0,(cfgRoles[id]||0)+d);
  const c=el("cnt_"+id); if(c)c.textContent=cfgRoles[id];
  actualizarWarnRoles();
}
function totalRoles(){return Object.keys(cfgRoles).reduce((a,id)=>a+(cfgRoles[id]||0),0);}
function actualizarWarnRoles(){
  const w=el("warnRoles");if(!w)return;
  const total=totalRoles();
  const lobos=Object.keys(cfgRoles).filter(isLoboId).reduce((a,id)=>a+(cfgRoles[id]||0),0);
  if(total!==state.nombres.length)w.textContent=`Total de roles: ${total} (faltan o sobran ${Math.abs(total-state.nombres.length)}).`;
  else if(lobos<1)w.textContent="Debe haber al menos 1 Lobo.";
  else w.textContent="✅ ¡Correcto! Puedes repartir.";
}

// Modo aleatorio: reparte N lobos y M aldeanos eligiendo roles al azar de cada bando
function modoAleatorio(){
  const nl=parseInt(el("randLobos").value)||0;
  const na=parseInt(el("randAld").value)||0;
  if(nl+na<=0){el("warnRoles").textContent="Indica cuántos lobos y aldeanos quieres.";return;}
  initCfg();
  let pl=nl, pa=na;
  let lobosIds=Object.keys(ROLES).filter(isLoboId);
  let aldeanosIds=Object.keys(ROLES).filter(id=>ROLES[id].equipo==="aldeanos");
  // lobos: reparte variados, reservando "lobo" como comodín
  while(pl>0 && lobosIds.length){
    const id=lobosIds[Math.floor(Math.random()*lobosIds.length)];
    cfgRoles[id]++; pl--;
    if(id!=="lobo") lobosIds.splice(lobosIds.indexOf(id),1);
  }
  while(pl>0){cfgRoles["lobo"]++; pl--;}
  // aldeanos: reparte variados, reservando "aldeano" como comodín
  while(pa>0 && aldeanosIds.length){
    const id=aldeanosIds[Math.floor(Math.random()*aldeanosIds.length)];
    cfgRoles[id]++; pa--;
    if(id!=="aldeano") aldeanosIds.splice(aldeanosIds.indexOf(id),1);
  }
  while(pa>0){cfgRoles["aldeano"]++; pa--;}
  // actualizar contadores visibles
  Object.keys(cfgRoles).forEach(id=>{const c=el("cnt_"+id);if(c)c.textContent=cfgRoles[id];});
  actualizarWarnRoles();
}

function empezar(){
  if(totalRoles()!==state.nombres.length){actualizarWarnRoles();return;}
  const lobos=Object.keys(cfgRoles).filter(isLoboId).reduce((a,id)=>a+(cfgRoles[id]||0),0);
  if(lobos<1){actualizarWarnRoles();return;}
  state.roles=shuffle(Object.entries(cfgRoles).flatMap(([id,c])=>Array(c).fill(id)));
  state.vivos=state.nombres.map((_,i)=>i);
  state.idx=0; state.ronda=1; state.pareja=[]; state.muertosPorAmor=[];
  state.mentor=-1; state.convertido={}; state.infectoUsado=false; state.loboFerozVivo=true; state.albinoUsado=false; state.ancianoSalvado=false; state.tontoSalvado=false;
  state.fase="juego";
  prepararNoche(); render();
}
// ---------- Entrega de roles y bucle de juego ----------
function renderJuego(){
  if(state.fase!=="juego")return;
  if(state.idx<state.nombres.length){renderRoles();return;}
  const deDia=state.faseNoche==="dia"||state.faseNoche==="votacion"||state.faseNoche==="fin";
  app.innerHTML=`<div class="screen active"><div class="phase-bar ${deDia?'phase-dia':'phase-noche'}">${deDia?'☀️ DÍA':'🌙 NOCHE'} · Ronda ${state.ronda}</div><div id="juegoBody"></div><div class="phase-bar phase-dia" style="font-size:12px">Vivos: ${state.vivos.length} · Lobos: ${state.vivos.filter(esLobo).length}</div></div>`;
  const body=el("juegoBody");if(deDia)renderDia(body);else renderNoche(body);
}
function renderRoles(){
  if(state.idx>=state.nombres.length)return;
  const nombre=state.nombres[state.idx];const rol=ROLES[state.roles[state.idx]];const lobo=esLobo(state.idx);
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
  var contenido=slider.querySelector(".reveal-content");
  var maxDrag=Math.max(slider.offsetHeight, contenido.scrollHeight)*0.98;
  var startY=0, drag=0; var arrastrando=false;
  function setDrag(v){cover.style.transform="translateY("+v+"px)";}
  cover.addEventListener("pointerdown",function(e){arrastrando=true;startY=e.clientY;drag=0;cover.style.transition="none";cover.setPointerCapture(e.pointerId);});
  cover.addEventListener("pointermove",function(e){if(!arrastrando)return;drag=e.clientY-startY;if(drag<0)drag=0;if(drag>maxDrag)drag=maxDrag;setDrag(drag);});
  cover.addEventListener("pointerup",function(){var abierto=drag>=maxDrag*0.6;cover.style.transition="transform .3s cubic-bezier(.4,0,.2,1)";setDrag(0);arrastrando=false;drag=0;if(abierto){cover.style.transition="transform .25s ease";setDrag(maxDrag);setTimeout(function(){cover.style.transition="transform .3s ease";setDrag(0);},1600);}});
  cover.addEventListener("pointercancel",function(){setDrag(0);arrastrando=false;});
}
function siguienteRol(){state.idx++;renderJuego();}

// ---------- Noche ----------
function prepararNoche(){
  state.faseNoche="dormir";state.atacado=-1;state.ultimoMuerto=-1;state.narration=[];ORDEN_NOCHE.length=0;
  if(state.ronda===1&&state.pareja.length===0&&state.vivos.some(i=>state.roles[i]==="cupido"))ORDEN_NOCHE.push("cupido");
  if(state.ronda===1&&state.vivos.some(i=>state.roles[i]==="hermanos"))ORDEN_NOCHE.push("hermanos");
  if(state.ronda===1&&state.vivos.some(i=>state.roles[i]==="salvaje")&&state.mentor<0)ORDEN_NOCHE.push("salvaje");
  if(state.vivos.some(esLobo))ORDEN_NOCHE.push("lobos");
  if((state.pocionSalvar||state.pocionVeneno)&&state.vivos.some(i=>state.roles[i]==="bruja"))ORDEN_NOCHE.push("bruja");
  if(state.vivos.some(i=>state.roles[i]==="vidente"))ORDEN_NOCHE.push("vidente");
  if(state.vivos.some(i=>state.roles[i]==="zorro"))ORDEN_NOCHE.push("zorro");
  if(state.vivos.some(i=>state.roles[i]==="actor"))ORDEN_NOCHE.push("actor");
  if(ORDEN_NOCHE.length===0)ORDEN_NOCHE.push("amanecer");
}
function renderNoche(body){
  switch(state.faseNoche){
   case "dormir":{
    var primerRol=ORDEN_NOCHE[0];
    var pala=primerRol==="cupido"?"Que despierte Cupido.":primerRol==="hermanos"?"Que despierten los Hermanos.":primerRol==="salvaje"?"Que despierte el Niño Salvaje.":primerRol==="lobos"?"Que despierten los Lobos.":"Que despierten los roles.";
    body.innerHTML=`<div class="card"><h2><span class="emoji">😴</span> El pueblo duerme</h2><div class="tap-zone">Todos cierran los ojos.<br>El narrador llamará a cada rol por turnos.</div></div>${narradorHTML(pala)}<button class="btn-big lobo" onclick="fasePrimerRol()">🌙 Despertar</button>`;
    hablar(pala);break;
   }
   case "cupido":renderCupido(body);break;
   case "hermanos":renderHermanos(body);break;
   case "salvaje":renderSalvaje(body);break;
   case "lobos":renderTurnoLobos(body);break;
   case "bruja":renderBruja();break;
   case "vidente":renderTurno(body,"vidente");break;
   case "zorro":renderZorro(body);break;
   case "actor":renderActor(body);break;
   case "amanecer":renderAmanecer(body);break;
  }
}
function fasePrimerRol(){state.faseNoche=ORDEN_NOCHE[0]||"amanecer";renderJuego();}
function siguienteFaseNoche(){
  const i=ORDEN_NOCHE.indexOf(state.faseNoche);
  if(i>=0&&i<ORDEN_NOCHE.length-1){state.faseNoche=ORDEN_NOCHE[i+1];}
  else{state.faseNoche="amanecer";}
  renderJuego();
}

// Hermandad: los hermanos se identifican la primera noche (secreto)
function renderHermanos(body){
  narra("Hermanos, despertad y reconoced a vuestros aliados.");
  const ids=state.vivos.filter(i=>state.roles[i]==="hermanos");
  const nombres=ids.map(i=>state.nombres[i]);
  body.innerHTML=`<div class="card" style="text-align:center"><h2><span class="emoji">👨‍👦‍👦</span> Los Hermanos se reconocen</h2></div>${secretoHTML("Vuestro grupo",`<div class="big">👨‍👦‍👦</div><div class="role-name">${nombres.join(" · ")}</div><div class="lore">Sois hermanos y confiáis el uno en el otro.</div>`)}<button class="btn-big" onclick="siguienteFaseNoche()">🙈 Continuar</button>`;
  bindSecreto();
}
// El Niño Salvaje elige a su mentor
function renderSalvaje(body){
  narra("Niño Salvaje, elige en secreto a tu mentor.");
  body.innerHTML=`<div class="card"><h2><span class="emoji">🧒</span> El Niño Salvaje</h2><p style="font-size:13px;color:var(--muted)">Elige a tu mentor. Si muere, te convertirás en Hombre Lobo.</p><div class="result-list" id="mentores"></div></div>${narradorHTML("Niño Salvaje, elige a tu mentor.")}`;
  const list=el("mentores");
  state.vivos.forEach(i=>{const d=document.createElement("div");d.className="result-item";d.innerHTML=`<span>${state.nombres[i]}</span>`;d.onclick=()=>{state.mentor=i;siguienteFaseNoche();};list.appendChild(d);});
}
// El Zorro señala tres contiguos
function renderZorro(body){
  narra("Zorro, señala a tres jugadores contiguos.");
  body.innerHTML=`<div class="card"><h2><span class="emoji">🦊</span> El Zorro olfatea</h2><p style="font-size:13px;color:var(--muted)">Selecciona a un jugador: revisará a él y sus dos vecinos más cercanos.</p><div class="result-list" id="zorroList"></div></div>${narradorHTML("Zorro, señala a un jugador.")}`;
  const list=el("zorroList");
  state.vivos.forEach(i=>{const d=document.createElement("div");d.className="result-item";d.innerHTML=`<span>${state.nombres[i]}</span>`;d.onclick=()=>{
    // tres contiguos por índice
    const vivos=state.vivos;
    const pos=vivos.indexOf(i);
    const trio=[vivos[pos], vivos[(pos+1)%vivos.length], vivos[(pos+2)%vivos.length]];
    const hayLobo=trio.some(esLobo);
    el("juegoBody").innerHTML=`<div class="card" style="text-align:center"><h2><span class="emoji">🦊</span> El Zorro olfatea</h2></div>${secretoHTML("Resultado",`<div class="big">${hayLobo?'🐺':'🌿'}</div><div class="role-name">${hayLobo?'HAY un lobo':'NO hay lobo'}</div><div class="lore">entre ${trio.map(x=>state.nombres[x]).join(", ")}</div>`)}<button class="btn-big" onclick="siguienteFaseNoche()">🙈 Continuar</button>`;
    bindSecreto();
  };list.appendChild(d);});
}
// El Actor toma un poder prestado (simplificado: ve un rol muerto)
function renderActor(body){
  narra("Actor, toma prestado un poder.");
  const muertos=state.nombres.map((_,i)=>i).filter(i=>!state.vivos.includes(i));
  body.innerHTML=`<div class="card"><h2><span class="emoji">🎭</span> El Actor</h2><p style="font-size:13px;color:var(--muted)">Observa los roles de los muertos y actúa como uno de ellos esta noche.</p><div class="result-list" id="actorList"></div></div>${narradorHTML("Actor, toma prestado un poder.")}<button class="btn-big secondary" onclick="siguienteFaseNoche()">😴 Pasar</button>`;
  const list=el("actorList");
  if(!muertos.length)list.innerHTML=`<div class="result-item"><span>No hay muertos todavía.</span></div>`;
  muertos.forEach(i=>{const d=document.createElement("div");d.className="result-item";d.innerHTML=`<span>${state.nombres[i]}</span><span class="status-pill" style="background:#333">${ROLES[state.roles[i]]?.emoji||"🎭"}</span>`;d.onclick=()=>siguienteFaseNoche();list.appendChild(d);});
}

// Turno de Lobos (genérico, incluye todos los tipos)
function renderTurnoLobos(body){
  narra("Lobos, despertad. Elegid en silencio a quién devorar esta noche.");
  body.innerHTML=`<div class="card"><h2><span class="emoji">🐺</span> Los Lobos eligen a su víctima</h2><p style="font-size:13px;color:var(--muted)">Los lobos eligen en silencio. Pulsa Confirmar.</p><div class="result-list" id="targets"></div></div>${narradorHTML("Lobos, elegid a vuestra víctima.")}<button class="btn-big lobo" id="confirmTurno" disabled>✔ Confirmar</button>`;
  const targets=el("targets");let sel=null;
  const elegibles=state.vivos.filter(i=>!esLobo(i));
  elegibles.forEach(i=>{const d=document.createElement("div");d.className="result-item";d.innerHTML=`<span>${state.nombres[i]}</span>`;d.onclick=()=>{document.querySelectorAll("#targets .result-item").forEach(x=>x.style.outline="none");d.style.outline="2px solid var(--lobo)";sel=i;el("confirmTurno").disabled=false;};targets.appendChild(d);});
  el("confirmTurno").onclick=()=>{
    state.atacado=sel;
    // Infecto: si está vivo y no ha usado su poder, ofrece infectar
    if(!state.infectoUsado && state.vivos.some(i=>state.roles[i]==="infecto")){
      el("juegoBody").innerHTML=`<div class="card"><h2><span class="emoji">🧛</span> El Infecto Padre</h2><p style="font-size:13px;color:var(--muted)">¿Quieres infectar a ${state.nombres[sel]} para convertirlo en lobo (en vez de matarlo)?</p><div class="action-btns"><button class="danger" onclick="infectar(${sel})">🧛 Infectar</button><button class="secondary" onclick="siguienteFaseNoche()">🐺 Devorar normalmente</button></div></div>`;
      return;
    }
    siguienteFaseNoche();
  };
}
function infectar(idx){
  state.infectoUsado=true; state.convertido[idx]=true; state.atacado=-1;
  siguienteFaseNoche();
}

function renderTurno(body,rolId){
  const datos={vidente:{emoji:"🔮",titulo:"La Vidente despierta",clase:"",txt:"Vidente, despierta. ¿A qué jugador deseas observar?"}}[rolId];
  narra(datos.txt);
  body.innerHTML=`<div class="card"><h2><span class="emoji">${datos.emoji}</span> ${datos.titulo}</h2><p style="font-size:13px;color:var(--muted)">Elige en silencio y pulsa Confirmar.</p><div class="result-list" id="targets"></div></div>${narradorHTML(datos.txt)}<button class="btn-big" id="confirmTurno" disabled>✔ Confirmar</button>`;
  const targets=el("targets");let sel=null;
  state.vivos.forEach(i=>{const d=document.createElement("div");d.className="result-item";d.innerHTML=`<span>${state.nombres[i]}</span>`;d.onclick=()=>{document.querySelectorAll("#targets .result-item").forEach(x=>x.style.outline="none");d.style.outline="2px solid var(--accent)";sel=i;el("confirmTurno").disabled=false;};targets.appendChild(d);});
  el("confirmTurno").onclick=()=>resolverTurno(rolId,sel);
}
function resolverTurno(rolId,objetivo){
  if(rolId==="vidente"){
    const lobo=esLobo(objetivo);
    el("juegoBody").innerHTML=`<div class="card" style="text-align:center"><h2><span class="emoji">🔮</span> La Vidente observa</h2></div>${secretoHTML("Resultado de la Vidente",`<div class="big">${lobo?'🐺':'🧑‍🌾'}</div><div class="role-name">${state.nombres[objetivo]}</div><div class="lore">${lobo?'es un LOBO':'es un aldeano'}</div>`)}<button class="btn-big" onclick="siguienteFaseNoche()">🙈 Ocultar y continuar</button>`;
    bindSecreto();
    narra("Vidente, guarda en secreto lo que has visto.");
  }
}

function renderBruja(){
  const body=el("juegoBody");
  narra("Bruja, despierta. Consulta en secreto la pantalla para ver a quién han atacado esta noche.");
  let html=`<div class="card"><h2><span class="emoji">🧙‍♀️</span> Pociones de la Bruja</h2>`;
  if(state.atacado>=0)html+=secretoHTML("¿A quién han atacado?",`<div class="big">🐺</div><div class="role-name">${state.nombres[state.atacado]}</div><div class="lore">Esta noche los lobos han atacado a esta persona.</div>`);
  const a=[];
  if(state.atacado>=0&&state.pocionSalvar)a.push(`<button class="ok" onclick="brujaSalvar()">💚 Salvar a ${state.nombres[state.atacado]}</button>`);
  if(state.pocionVeneno)a.push(`<button class="danger" onclick="brujaVeneno()">☠️ Envenenar a alguien</button>`);
  a.push(`<button class="secondary" onclick="siguienteFaseNoche()">😴 No usar pociones</button>`);
  html+=`<div class="action-btns" style="margin-top:12px">${a.join("")}</div></div>${narradorHTML(state.narration[state.narration.length-1])}`;
  body.innerHTML=html;
  if(state.atacado>=0)bindSecreto();
}
function brujaSalvar(){state.pocionSalvar=false;state.atacado=-1;siguienteFaseNoche();}
function brujaVeneno(){
  const body=el("juegoBody");narra("Bruja, elige a quién envenenar.");
  body.innerHTML=`<div class="card"><h2><span class="emoji">☠️</span> Veneno</h2><div class="result-list" id="venenos"></div></div>`;
  const list=el("venenos");
  state.vivos.forEach(i=>{const d=document.createElement("div");d.className="result-item";d.innerHTML=`<span>${state.nombres[i]}</span>`;d.onclick=()=>{state.pocionVeneno=false;marcarMuerto(i,"veneno");siguienteFaseNoche();};list.appendChild(d);});
}

function renderCupido(body){
  narra("Cupido, despierta. Elige a dos jugadores para enamorarlos.");
  body.innerHTML=`<div class="card"><h2><span class="emoji">💘</span> Cupido lanza sus flechas</h2><p style="font-size:13px;color:var(--muted)">Elige a dos jugadores (puedes incluirte). Selecciona dos y confirma.</p><div class="result-list" id="cupidoList"></div></div>${narradorHTML("Cupido, elige a dos jugadores.")}<button class="btn-big" id="cupidoBtn" disabled>✔ Enamorar</button>`;
  const list=el("cupidoList");let sel=[];
  state.vivos.forEach(i=>{const d=document.createElement("div");d.className="result-item";d.innerHTML=`<span>${state.nombres[i]}</span>`;d.onclick=()=>{if(sel.includes(i)){sel=sel.filter(x=>x!==i);d.style.outline="none";}else{if(sel.length>=2)return;sel.push(i);d.style.outline="2px solid #ff79c6";}el("cupidoBtn").disabled=sel.length!==2;};list.appendChild(d);});
  el("cupidoBtn").onclick=()=>{state.pareja=sel.slice();const names=state.pareja.map(i=>state.nombres[i]);el("juegoBody").innerHTML=`<div class="card" style="text-align:center"><h2><span class="emoji">💘</span> Enamorados</h2></div>${secretoHTML("La pareja enamorada",`<div class="big">💞</div><div class="role-name">${names[0]}</div><div class="lore">y</div><div class="role-name">${names[1]}</div>`)}<button class="btn-big" onclick="siguienteFaseNoche()">🙈 Ocultar y continuar</button>`;bindSecreto();};
}
function morirDeAmor(excluido){
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
  if(state.pareja.includes(idx))morirDeAmor(idx);
}
// ---------- Amanecer y día ----------
function renderAmanecer(body){
  let items="";let anuncio="";
  if(state.atacado>=0){
    const idx=state.atacado;
    const n=state.nombres[idx];
    // El Anciano sobrevive al primer ataque
    if(state.roles[idx]==="anciano" && !state.ancianoSalvado){
      items+=`<div class="result-item"><span>${n}</span><span class="status-pill" style="background:var(--ok)">🛡️ El Anciano sobrevivió</span></div>`;
      anuncio=`Amanece en Castronegro. Los lobos atacaron al Anciano, pero sobrevivió a la primera embestida.`;
      state.ancianoSalvado=true; state.atacado=-1;
    } else {
      items+=`<div class="result-item"><span>${n}</span><span class="status-pill" style="background:var(--lobo)">💀 Devorado</span></div>`;
      marcarMuerto(idx,"lobos");
      anuncio=`Amanece en Castronegro. Esta noche los lobos han devorado a ${n}.`;
    }
  }
  else if(state.causaMuerto==="veneno"){
    const n=state.nombres[state.ultimoMuerto];
    items+=`<div class="result-item"><span>${n}</span><span class="status-pill" style="background:var(--accent)">☠️ Envenenado</span></div>`;
    anuncio=`Amanece en Castronegro. Esta noche alguien ha sido envenenado: ${n}.`;
  }
  else{items+=`<div class="result-item"><span>Nadie ha muerto esta noche</span><span class="status-pill" style="background:var(--ok)">🌤️</span></div>`;anuncio=`Amanece en Castronegro. Nadie ha muerto esta noche.`;}

  // Muertos de amor
  if(state.muertosPorAmor&&state.muertosPorAmor.length){
    state.muertosPorAmor.forEach(ip=>{items+=`<div class="result-item"><span>${state.nombres[ip]}</span><span class="status-pill" style="background:#ff79c6">💔 Muerto de amor</span></div>`;});
    anuncio+=` Un enamorado ha muerto de pena.`;state.muertosPorAmor=[];
  }
  // El Niño Salvaje se convierte si su mentor murió
  state.vivos.filter(i=>state.roles[i]==="salvaje").forEach(s=>{
    if(state.mentor>=0 && !state.vivos.includes(state.mentor) && !state.convertido[s]){
      state.convertido[s]=true;
      items+=`<div class="result-item"><span>${state.nombres[s]}</span><span class="status-pill" style="background:var(--lobo)">🐺 El Salvaje se vuelve lobo</span></div>`;
    }
  });

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
function pasarAlDia(){if(comprobarYFin())return;state.faseNoche="dia";renderJuego();}
function renderDia(body){
  if(comprobarYFin())return;
  if(state.faseNoche==="fin"){renderFin();return;}
  narra("El pueblo despierta. Ha llegado el momento de debatir y votar.");
  body.innerHTML=`<div class="card"><h2><span class="emoji">🗣️</span> El pueblo debate</h2><p style="font-size:14px;line-height:1.6">Los aldeanos discuten quién puede ser lobo. Cuando hayáis decidido, id a la votación. Si no hay sospechosos claros, podéis pasar a la noche.</p></div>${narradorHTML("El pueblo despierta. Ha llegado el momento de debatir y votar.")}<div class="action-btns"><button class="btn-big" onclick="irAVotacion()">🗳️ Ir a la votación</button><button class="btn-big secondary" onclick="siguienteRonda()">🌙 Pasar esta votación</button></div>`;
}
function irAVotacion(){state.faseNoche="votacion";renderVotacion();}
function renderVotacion(){
  const body=el("juegoBody");narra("Es la hora de la votación. Cada aldeano vota en secreto al jugador que cree que es lobo.");let sel=null;
  body.innerHTML=`<div class="card"><h2><span class="emoji">🗳️</span> Votación del pueblo</h2><p style="font-size:13px;color:var(--muted)">Selecciona al jugador expulsado por mayoría.</p><div class="result-list" id="votantes"></div></div>${narradorHTML("Es la hora de la votación.")}<button class="btn-big danger" id="votarBtn" disabled>✅ Expulsar del pueblo</button>`;
  const list=el("votantes");
  state.vivos.forEach(i=>{const d=document.createElement("div");d.className="result-item";d.innerHTML=`<span>${state.nombres[i]}</span>`;d.onclick=()=>{document.querySelectorAll("#votantes .result-item").forEach(x=>x.style.outline="none");d.style.outline="2px solid var(--accent2)";sel=i;el("votarBtn").disabled=false;};list.appendChild(d);});
  el("votarBtn").onclick=()=>{
    const n=state.nombres[sel];
    // El Ángel gana si es linchado el primer día
    if(state.roles[sel]==="angel" && state.ronda===1){
      ganarSolo("angel");return;
    }
    // El Tonto del Pueblo se salva del linchamiento (una vez)
    if(state.roles[sel]==="tonto" && !state.tontoSalvado){
      state.tontoSalvado=true;
      hablar(`${n} era el Tonto del Pueblo, pero se salva del linchamiento. Pierde su derecho a votar.`);
      siguienteRonda();return;
    }
    // El Anciano linchado: todos pierden poderes (simplificado)
    marcarMuerto(sel,"votacion");
    const esCaz=state.roles[sel]==="cazador"&&state.balaCazador;
    hablar(`${n} ha sido expulsado del pueblo por la votación.${esCaz?' El Cazador disparará antes de caer.':''}`);
    if(esCaz)setTimeout(()=>disparoCazador(),900);else siguienteRonda();
  };
}
function siguienteRonda(){if(comprobarYFin())return;state.ronda++;prepararNoche();state.faseNoche="dormir";renderJuego();}

// ---------- Fin / victoria ----------
function estadoFin(){
  if(state.faseNoche==="fin")return true;
  const l=state.vivos.filter(esLobo).length;const a=state.vivos.length-l;
  if(l>=a)return true;
  if(l===0)return true;
  return false;
}
function comprobarYFin(){
  if(estadoFin()){state.faseNoche="fin";renderFin();return true;}
  return false;
}
function ganarSolo(rol){
  state.faseNoche="fin";
  const body=el("juegoBody");
  const msg=rol==="angel"?"El Ángel ha sido linchado y asciende a los cielos. 🕊️":"Victoria en solitario.";
  body.innerHTML=`<div class="card reveal" style="text-align:center"><div class="big">👼</div><div class="role-name" style="font-size:22px">Gana el Ángel</div><div class="lore">${msg}</div></div><button class="btn-big" onclick="location.reload()">🔄 Nueva partida</button>`;
  hablar(msg);
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
