// ============================================================
//  LOS HOMBRES LOBO DE CASTRONEGRO
//  Roles ocultos por turnos · pasa el móvil
// ============================================================

const ROLES = {
  // ---- Juego Base ----
  lobo:       {id:"lobo",        equipo:"lobos",   nombre:"Hombre Lobo",        emoji:"🐺", expansion:"base", lore:"Cada noche, junto a tu manada, elegís en secreto a una víctima. De día, finge ser un aldeano más y despista las sospechas. Objetivo: eliminar a todos los aldeanos."},
  aldeano:    {id:"aldeano",     equipo:"aldeanos", nombre:"Aldeano (Simple)",   emoji:"🧑‍🌾", expansion:"base", lore:"No tienes poderes especiales. Usa la lógica y tu voto para descubrir a los lobos."},
  vidente:    {id:"vidente",     equipo:"aldeanos", nombre:"La Vidente",         emoji:"🔮", expansion:"base", lore:"Cada noche despiertas y pides al narrador ver en secreto la carta de un jugador."},
  bruja:      {id:"bruja",       equipo:"aldeanos", nombre:"La Bruja",           emoji:"🧙‍♀️", expansion:"base", lore:"Tienes 2 pociones de un solo uso: una de curación (salva a la víctima) y otra de muerte (elimina a un jugador)."},
  cazador:    {id:"cazador",     equipo:"aldeanos", nombre:"El Cazador",         emoji:"🏹", expansion:"base", lore:"Si eres eliminado (por los lobos o en votación), disparas de inmediato a un jugador a tu elección."},
  cupido:     {id:"cupido",      equipo:"aldeanos", nombre:"Cupido",             emoji:"💘", expansion:"base", lore:"La primera noche eliges a dos jugadores como Enamorados. Si uno muere, el otro muere de pena."},
  nina:       {id:"nina",        equipo:"aldeanos", nombre:"La Niña Pequeña",    emoji:"👧", expansion:"base", lore:"Puedes entreabrir los ojos durante el turno de los lobos. Si te descubren, mueres en lugar de la víctima."},

  // ---- Expansión: Personajes ----
  salvaje:    {id:"salvaje",     equipo:"aldeanos", nombre:"El Niño Salvaje",    emoji:"🧒", expansion:"personajes", lore:"La primera noche eliges un mentor. Mientras viva, eres aldeano. Si muere, te conviertes en Hombre Lobo."},
  zorro:      {id:"zorro",       equipo:"aldeanos", nombre:"El Zorro",           emoji:"🦊", expansion:"personajes", lore:"Cada noche eliges 3 jugadores sentados juntos. El narrador te dice si hay al menos un lobo (sin decir quién). Si fallas (los 3 inocentes), pierdes tu poder."},
  sirvienta:  {id:"sirvienta",   equipo:"aldeanos", nombre:"La Sirvienta Fiel",  emoji:"🧹", expansion:"personajes", lore:"Cuando alguien va a ser linchado, puedes revelar tu carta y sacrificarte: el condenado se salva e intercambia su carta contigo."},
  hermanos:   {id:"hermanos",    equipo:"aldeanos", nombre:"Los Hermanos",       emoji:"👨‍👦‍👦", expansion:"personajes", lore:"Sois aldeanos que os despertáis juntos la primera noche para reconoceros. Confiad ciegamente los unos en los otros."},
  feriante:   {id:"feriante",    equipo:"aldeanos", nombre:"El Feriante y su Oso",emoji:"🐻", expansion:"personajes", lore:"Cada mañana, antes del debate, el narrador gruñe si hay un lobo a tu derecha o a tu izquierda."},
  actor:      {id:"actor",       equipo:"aldeanos", nombre:"El Actor",           emoji:"🎭", expansion:"personajes", lore:"Se apartan 3 cartas de poder. Cada noche puedes usar el poder de una de esas cartas sobrantes hasta el amanecer."},
  caballero:  {id:"caballero",   equipo:"aldeanos", nombre:"Caballero de la Espada Oxidada",emoji:"🛡️", expansion:"personajes", lore:"Si los lobos te matan, contagias tétanos al primer lobo a tu izquierda, que morirá la noche siguiente."},
  angel:      {id:"angel",       equipo:"solo",    nombre:"El Ángel",           emoji:"👼", expansion:"personajes", lore:"Quieres perder rápido: ganas en solitario si te linchan el primer día o te devoran la primera noche. Si sobrevives, eres aldeano normal."},
  sectario:   {id:"sectario",    equipo:"solo",    nombre:"El Sectario Abominable",emoji:"🕯️", expansion:"personajes", lore:"La primera noche la aldea se divide en secreto en dos grupos. Ganas en solitario si eliminas a todos los del otro grupo."},
  infecto:    {id:"infecto",     equipo:"lobos",   nombre:"El Infecto Padre",    emoji:"🧛", expansion:"personajes", lore:"Una vez por partida, puedes infectar (en vez de matar) a la víctima: conserva su rol pero pasa al bando lobo y despierta con ellos."},
  perro:      {id:"perro",       equipo:"aldeanos", nombre:"El Perro Lobo",      emoji:"🐕", expansion:"personajes", lore:"La primera noche decides en secreto si jugarás toda la partida como aldeano o como Hombre Lobo."},
  juez:       {id:"juez",        equipo:"aldeanos", nombre:"El Juez Tartamudo",  emoji:"⚖️", expansion:"personajes", lore:"Una vez por partida, tras un linchamiento, puedes hacer una señal para forzar una segunda votación inmediata."},
  aldeanoaldeano:{id:"aldeanoaldeano",equipo:"aldeanos",nombre:"El Aldeano-Aldeano",emoji:"🙂", expansion:"personajes", lore:"Tu carta es de aldeano por ambas caras y es pública: todos saben que eres inocente."},
  gitana:     {id:"gitana",      equipo:"aldeanos", nombre:"La Gitana",          emoji:"🔮", expansion:"personajes", lore:"Apoyo de Luna Nueva: permite el Espiritismo, haciendo preguntas de Sí/No a los muertos con cartas de evento."},
  guarda:     {id:"guarda",      equipo:"aldeanos", nombre:"El Guarda Campestre",emoji:"🪵", expansion:"personajes", lore:"Apoyo de Luna Nueva: el narrador te ofrece cartas de evento y decides en secreto cuál aplicar."},

  // ---- Expansión: Luna Nueva ----
  protector:  {id:"protector",   equipo:"aldeanos", nombre:"El Protector",       emoji:"🛟", expansion:"luna", lore:"Cada noche despiertas antes que los lobos y proteges a un jugador. No puedes proteger al mismo dos noches seguidas (puedes protegerte a ti)."},
  flautista:  {id:"flautista",   equipo:"solo",    nombre:"El Flautista",       emoji:"🎺", expansion:"luna", lore:"Cada noche hechizas a dos jugadores, que despiertan juntos para reconocerse. Ganas en solitario si todos los vivos están hechizados."},
  anciano:    {id:"anciano",     equipo:"aldeanos", nombre:"El Anciano del Pueblo",emoji:"👴", expansion:"luna", lore:"Sobrevives al primer ataque de los lobos. Si te matan los aldeanos, todos pierden sus poderes."},
  expiatorio: {id:"expiatorio",  equipo:"aldeanos", nombre:"El Cabeza de Turco", emoji:"🐐", expansion:"luna", lore:"Si hay empate en la votación, tú eres linchado en su lugar. Al morir, decides quién vota al día siguiente."},
  tonto:      {id:"tonto",       equipo:"aldeanos", nombre:"El Tonto del Pueblo",emoji:"🤪", expansion:"luna", lore:"Si te linchan, revelas tu carta y te salvas, pero pierdes tu derecho a votar el resto de la partida."},
};

const EXPANSIONES = {
  base:       {nombre:"🐺 Juego Base",     desc:"Los personajes clásicos."},
  personajes: {nombre:"👥 Personajes",     desc:"Nuevos bandos, amenazas y estrategias."},
  luna:       {nombre:"🌕 Luna Nueva",     desc:"Roles de eventos y 36 cartas de evento."},
};

function isLoboId(id){return ROLES[id] && ROLES[id].equipo==="lobos";}

// ---- Cartas de evento de Luna Nueva ----
const EVENTOS = [
  {id:"milagro", nombre:"El Milagro", emoji:"✨", tipo:"amanecer", desc:"La víctima de los lobos de la última noche despierta milagrosamente ilesa."},
  {id:"eclipse", nombre:"Eclipse", emoji:"🌑", tipo:"votacion", desc:"El pueblo vota con los ojos cerrados o de espaldas."},
  {id:"sonambulismo", nombre:"Sonambulismo", emoji:"😴", tipo:"noche", desc:"La Vidente entra en trance: el narrador anuncia en voz alta el rol que acaba de descubrir."},
  {id:"peste_negra", nombre:"Peste Negra", emoji:"☠️", tipo:"dia", desc:"Si la aldea lincha a un inocente, la plaga mata al jugador de su izquierda."},
  {id:"intuicion", nombre:"Sombría Intuición", emoji:"🔮", tipo:"dia", desc:"El condenado puede señalar a otro para que el narrador revele su identidad en secreto."},
  {id:"san_cristobal", nombre:"San Cristóbal", emoji:"⛪", tipo:"dia", desc:"Prohibido votar a los dos vecinos del último jugador eliminado."},
  {id:"espectro", nombre:"El Espectro", emoji:"👻", tipo:"dia", desc:"La víctima de los lobos vuelve como fantasma para emitir un último voto."},
  {id:"inquisicion", nombre:"Inquisición", emoji:"⚖️", tipo:"dia", desc:"El narrador elige a un jugador para que revele públicamente su carta."},
  {id:"pacto", nombre:"Pacto con el Diablo", emoji:"😈", tipo:"dia", desc:"Durante el debate se pueden negociar públicamente promesas y alianzas."},
  {id:"entusiasmo", nombre:"Entusiasmo", emoji:"🎉", tipo:"dia", desc:"Si hoy se lincha a un lobo, mañana no hay fase nocturna."},
  {id:"radio", nombre:"Radio Macuto", emoji:"📻", tipo:"dia", desc:"El narrador susurra un rumor (verdad o mentira) al oído de un jugador."},
  {id:"alegria", nombre:"Alegría de Vivir", emoji:"😊", tipo:"dia", desc:"Hoy no se realiza ningún linchamiento: se pasa directo a la noche."},
  {id:"mala_noche", nombre:"Mala Noche", emoji:"🌧️", tipo:"noche", desc:"Los lobos sufren torpeza: deben elegir en absoluto silencio."},
  {id:"pasion", nombre:"Pasión Vengativa", emoji:"🔥", tipo:"dia", desc:"Si el condenado es inocente, se lleva al jugador que dio el voto decisivo."},
  {id:"ultima_oportunidad", nombre:"La Última Oportunidad", emoji:"🗣️", tipo:"votacion", desc:"Tras votar, el condenado da un discurso y la aldea repite la votación."},
  {id:"inquietud", nombre:"Inquietud", emoji:"😱", tipo:"dia", desc:"Prohibido decir 'Lobo', 'Inocente' y 'Voto' o se pierde el voto."},
  {id:"duelo", nombre:"El Duelo", emoji:"🤺", tipo:"votacion", desc:"Se eligen dos jugadores: la aldea solo podrá votar entre ellos."},
  {id:"castigo", nombre:"Castigo", emoji:"🤐", tipo:"dia", desc:"El que más habló ayer no puede hablar ni votar hoy."},
  {id:"desconfianza", nombre:"Gran Desconfianza", emoji:"😒", tipo:"votacion", desc:"Solo puedes votar a uno de tus dos vecinos inmediatos."},
  {id:"tension", nombre:"Tensión Urbana", emoji:"😤", tipo:"dia", desc:"Si linchan a un inocente, la aldea destituye y elige un nuevo líder."},
  {id:"gracia", nombre:"Tocado por la Gracia", emoji:"🕊️", tipo:"amanecer", desc:"La víctima de los lobos es salvada y obtiene inmunidad todo el día."},
  {id:"cuervo", nombre:"Vuelo del Cuervo", emoji:"🐦‍⬛", tipo:"dia", desc:"El narrador indica abiertamente la dirección del lobo más cercano."},
  {id:"pesadilla", nombre:"Pesadilla", emoji:"💤", tipo:"noche", desc:"Un jugador elegido tendrá pesadillas y no podrá usar su poder esta noche."},
  {id:"delirio", nombre:"Delirio", emoji:"🌀", tipo:"noche", desc:"Esta noche el narrador da información falsa a la Vidente."},
  {id:"perdon", nombre:"Día del Perdón", emoji:"🤝", tipo:"votacion", desc:"Si el condenado obtiene mayoría absoluta de perdón, se libra del linchamiento."},
  {id:"resurreccion", nombre:"Resurrección", emoji:"🌱", tipo:"inmediato", desc:"Resucita al primer aldeano simple eliminado de la partida."},
  {id:"mascaras", nombre:"Baile de Máscaras", emoji:"🎭", tipo:"inmediato", desc:"Todos los jugadores cambian libremente sus asientos."},
  {id:"juicio_final", nombre:"Juicio Final", emoji:"⚡", tipo:"dia", desc:"Todos deben declarar en voz alta si su carta tiene poder o no."},
  {id:"peste", nombre:"Peste", emoji:"🦠", tipo:"inmediato", desc:"Todos los personajes con poderes los pierden durante las próximas 24h."},
  {id:"fin_cosecha", nombre:"Fin de la Cosecha", emoji:"🌾", tipo:"inmediato", desc:"No ocurre nada extraño: jornada habitual."},
  {id:"espiritismo1", nombre:"Espiritismo I", emoji:"👻", tipo:"espiritismo", desc:"'¿Hay algún lobo sentado al lado del líder?' (Sí/No)."},
  {id:"espiritismo2", nombre:"Espiritismo II", emoji:"👻", tipo:"espiritismo", desc:"'¿Los lobos están sentados juntos?' (Sí/No)."},
  {id:"espiritismo3", nombre:"Espiritismo III", emoji:"👻", tipo:"espiritismo", desc:"'¿El jugador designado es inocente?' (Sí/No)."},
  {id:"espiritismo4", nombre:"Espiritismo IV", emoji:"👻", tipo:"espiritismo", desc:"'¿La Vidente o el Cazador siguen vivos?' (Sí/No)."},
  {id:"espiritismo5", nombre:"Espiritismo V", emoji:"👻", tipo:"espiritismo", desc:"'¿Hay más lobos a la derecha o a la izquierda del líder?'"},
  {id:"espiritismo6", nombre:"Espiritismo VI", emoji:"👻", tipo:"espiritismo", desc:"'¿Algún lobo viste de rojo hoy?' (Sí/No)."},
];

// ---------- Estado ----------
let state={
  fase:"setup", nombres:[], roles:[], idx:0, ronda:0, vivos:[],
  atacado:-1, narration:[], hablando:false,
  pocionSalvar:true, pocionVeneno:true, balaCazador:true,
  faseNoche:"dormir", ultimoMuerto:-1, causaMuerto:"",
  pareja:[], muertosPorAmor:[], mentor:-1, convertido:{},
  infectoUsado:false, loboFerozVivo:true, albinoUsado:false,
  ancianoSalvado:false, tontoSalvado:false,
  protectorUltimo:-1, hechizados:[], eventoActual:null,
  zorroFallado:false, perroDecidido:false, angelVivo:true,
  protegido:-1, sinVotacion:false,
  grupoSectario:{}, sectarioListo:false, juezUsado:false, protectorHistorial:[], sinVoto:[],
  eventoMensaje:"", eventoAplicado:false, sinNoche:false, entusiasmo:false, delirio:false,
};
const ORDEN_NOCHE=[];
const el=(id)=>document.getElementById(id);
function shuffle(a){const arr=a.slice();for(let i=arr.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];}return arr;}
function esLobo(i){const r=state.roles[i];if(isLoboId(r))return true;if(state.convertido[i])return true;return false;}

// ---------- Voz / narración ----------
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
function narradorHTML(t){return '<div class="narrator"><div class="avatar">🎙️</div><div class="speech"><div class="says">NARRADOR</div><div>'+t+'</div><div style="margin-top:8px"><button class="secondary" style="padding:8px 12px;font-size:13px" onclick="releer()">🔊 Repetir</button></div></div></div>';}
function secretoHTML(titulo,contenido){return '<div class="card secreto-card" style="text-align:center"><div class="subtitle">🔒 '+titulo+'</div><div class="secreto-wrap"><div class="secreto-content">'+contenido+'</div><div class="secreto-cover"><div class="tap-aviso">👆 Toca y mantén para ver</div><div class="hint">Nadie más debe mirar. Suelta para tapar de nuevo.</div></div></div></div>';}
function bindSecreto(){const c=document.querySelector(".secreto-card .secreto-cover");if(!c)return;const ocultar=()=>{c.style.opacity="1";};const mostrar=()=>{c.style.opacity="0";};c.addEventListener("pointerdown",mostrar);c.addEventListener("pointerup",ocultar);c.addEventListener("pointerleave",ocultar);c.addEventListener("pointercancel",ocultar);}

// ---------- Config de roles ----------
let cfgRoles={};
let activeExp={base:true, personajes:false, luna:false};
const colorRol={lobo:"#ff6b5b",aldeano:"#9db1ff",vidente:"#3ddc84",bruja:"#b23bff",cazador:"#f5c542",cupido:"#ff79c6",nina:"#ffb3c1",salvaje:"#a0e57e",zorro:"#ffb347",sirvienta:"#d291ff",hermanos:"#7ee2a8",feriante:"#c8b06a",actor:"#ffd166",caballero:"#b0b0b0",angel:"#ffffff",sectario:"#c99",infecto:"#9b5de5",perro:"#d9a066",juez:"#f8f9fa",aldeanoaldeano:"#e8e8e8",gitana:"#c39bd3",guarda:"#8fa3ff",protector:"#6ec6ff",flautista:"#7ec8e3",anciano:"#c9a76b",expiatorio:"#d9c58a",tonto:"#f781c3"};
function initCfg(){cfgRoles={};Object.keys(ROLES).forEach(id=>cfgRoles[id]=0);}
initCfg();
const app=el("app");
function render(){if(state.fase==="setup")renderSetup();else if(state.fase==="roles")renderRolesConfig();else if(state.fase==="juego")renderJuego();}

// ---------- Setup de jugadores ----------
function renderSetup(){
  app.innerHTML='<div class="screen active">'
   +'<h1><span class="moon">🌕</span> Castronegro Duerme</h1>'
   +'<div class="subtitle">Roles ocultos por turnos · pasa el móvil</div>'
   +'<div class="card"><h2><span class="emoji">👥</span> Jugadores</h2><label>Añade a los jugadores uno a uno.</label>'
   +'<input type="text" id="nuevoNombre" placeholder="Escribe un nombre...">'
   +'<button class="secondary" onclick="anadirNombre()">➕ Añadir jugador</button>'
   +'<div id="listaNombres" class="role-list"></div>'
   +'<div class="warn" id="warnJug"></div></div>'
   +'<button class="btn-big" onclick="seguirARoles()">Continuar →</button></div>';
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
  c.innerHTML=state.nombres.map((n,i)=>'<div class="role-row"><div class="info"><div class="name">'+n+'</div></div><button class="secondary" style="padding:8px 14px;font-size:13px" onclick="quitarNombre('+i+')">✖</button></div>').join("");
  if(!state.nombres.length)c.innerHTML='<div style="text-align:center;color:var(--muted);font-size:13px">Todavía no hay jugadores.</div>';
}
function seguirARoles(){state.fase="roles";renderRolesConfig();}

// ---------- Config de roles (expansiones plegables) ----------
function renderRolesConfig(){
  const total=state.nombres.length;
  let secciones="";
  for(const exp in EXPANSIONES){
    const ids=Object.keys(ROLES).filter(id=>ROLES[id].expansion===exp);
    if(!ids.length)continue;
    const activa = activeExp[exp]!==false;
    const usados = ids.reduce((s,id)=>s+(cfgRoles[id]||0),0);
    const chipEquipo=(eq)=>{
      if(eq==="lobos")return '<span class="chip chip-lobo">🐺 Lobo</span>';
      if(eq==="solo")return '<span class="chip chip-solo">🎯 Solo</span>';
      return '<span class="chip chip-aldeano">🏘️ Aldeano</span>';
    };
    const tarjetas=ids.map(id=>{
      const r=ROLES[id];
      const cant=cfgRoles[id]||0;
      return '<div class="role-card'+(cant>0?' role-card-on':'')+'">'
        +'<div class="role-card-top"><span class="rc-emoji">'+r.emoji+'</span><span class="rc-count'+(cant>0?' rc-count-on':'')+'" id="cnt_'+id+'">'+cant+'</span></div>'
        +'<div class="rc-name" style="color:'+(colorRol[id]||'#fff')+'">'+r.nombre+'</div>'
        +chipEquipo(r.equipo)
        +'<div class="stepper"><button onclick="cambiarRol(\''+id+'\',-1)">−</button><button class="plus" onclick="cambiarRol(\''+id+'\',1)">+</button></div>'
        +'</div>';
    }).join("");
    secciones+='<details class="expansion" '+(activa?"open":"")+'><summary>'
      +'<label class="switch"><input type="checkbox" '+(activa?"checked":"")+' onchange="toggleExp(\''+exp+'\',this.checked)"><span class="switch-label">'+EXPANSIONES[exp].nombre+'</span></label>'
      +'<span class="exp-meta">'+usados+'/'+ids.length+' roles · '+EXPANSIONES[exp].desc+'</span>'
      +'</summary><div class="role-grid">'+tarjetas+'</div></details>';
  }

  app.innerHTML='<div class="screen active">'
   +'<h1>🃏 Roles</h1>'
   +'<div class="subtitle">'+total+' jugadores · activa expansiones y toca <b>+</b> para añadir</div>'
   +'<div class="card"><h2><span class="emoji">🎲</span> Modo aleatorio</h2><p style="font-size:13px;color:var(--muted)">Reparte al azar entre Lobos y Aldeanos.</p>'
     +'<div class="random-row"><label>🐺 Lobos</label><input type="number" id="randLobos" min="1" value="1"><label>🧑‍🌾 Aldeanos</label><input type="number" id="randAld" min="0" value="1"></div>'
     +'<button class="btn-big secondary" onclick="modoAleatorio()">🎲 Repartir aleatoriamente</button></div>'
   +'<div class="card"><h2><span class="emoji">🎭</span> Reparto de roles</h2><label>El total debe coincidir con '+total+' jugadores.</label>'
     +secciones
     +'<div class="warn" id="warnRoles"></div></div>'
   +'<button class="btn-big" onclick="empezar()">▶ Repartir roles</button></div>';
  actualizarWarnRoles();
}

function toggleExp(exp,on){
  activeExp[exp]=on;
  if(!on){Object.keys(ROLES).filter(id=>ROLES[id].expansion===exp).forEach(id=>cfgRoles[id]=0);}
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
  if(total!==state.nombres.length)w.textContent='Total de roles: '+total+' (faltan o sobran '+Math.abs(total-state.nombres.length)+').';
  else if(lobos<1)w.textContent='Debe haber al menos 1 Lobo.';
  else w.textContent='✅ ¡Correcto! Puedes repartir.';
}
function modoAleatorio(){
  const nl=parseInt(el("randLobos").value)||0;
  const na=parseInt(el("randAld").value)||0;
  if(nl+na<=0){el("warnRoles").textContent='Indica cuántos lobos y aldeanos quieres.';return;}
  initCfg();
  let pl=nl, pa=na;
  let lobosIds=Object.keys(ROLES).filter(isLoboId);
  let aldeanosIds=Object.keys(ROLES).filter(id=>ROLES[id].equipo==="aldeanos");
  while(pl>0 && lobosIds.length){const id=lobosIds[Math.floor(Math.random()*lobosIds.length)];cfgRoles[id]++;pl--;if(id!=="lobo")lobosIds.splice(lobosIds.indexOf(id),1);}
  while(pl>0){cfgRoles["lobo"]++;pl--;}
  while(pa>0 && aldeanosIds.length){const id=aldeanosIds[Math.floor(Math.random()*aldeanosIds.length)];cfgRoles[id]++;pa--;if(id!=="aldeano")aldeanosIds.splice(aldeanosIds.indexOf(id),1);}
  while(pa>0){cfgRoles["aldeano"]++;pa--;}
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
  state.mentor=-1; state.convertido={}; state.infectoUsado=false; state.loboFerozVivo=true; state.albinoUsado=false;
  state.ancianoSalvado=false; state.tontoSalvado=false; state.protectorUltimo=-1; state.hechizados=[]; state.zorroFallado=false; state.perroDecidido=false; state.angelVivo=true; state.eventoActual=null; state.protegido=-1; state.sinVotacion=false; state.grupoSectario={}; state.sectarioListo=false; state.juezUsado=false; state.protectorHistorial=[]; state.sinVoto=[]; state.eventoMensaje=""; state.eventoAplicado=false; state.sinNoche=false; state.entusiasmo=false; state.delirio=false;
  state.fase="juego";
  prepararNoche(); render();
}

// ---------- Entrega de roles y bucle de juego ----------
function renderJuego(){
  if(state.fase!=="juego")return;
  if(state.idx<state.nombres.length){renderRoles();return;}
  const deDia=state.faseNoche==="dia"||state.faseNoche==="votacion"||state.faseNoche==="fin";
  app.innerHTML='<div class="screen active"><div class="phase-bar '+(deDia?'phase-dia':'phase-noche')+'">'+(deDia?'☀️ DÍA':'🌙 NOCHE')+' · Ronda '+state.ronda+'</div><div id="juegoBody"></div><div class="phase-bar phase-dia" style="font-size:12px">Vivos: '+state.vivos.length+' · Lobos: '+state.vivos.filter(esLobo).length+'</div></div>';
  const body=el("juegoBody");if(deDia)renderDia(body);else renderNoche(body);
}
function renderRoles(){
  if(state.idx>=state.nombres.length)return;
  const nombre=state.nombres[state.idx];const rol=ROLES[state.roles[state.idx]];const lobo=esLobo(state.idx);
  const equipoLbl=lobo?'🐺 MANADA DE LOBOS':'🏘️ PUEBLO DE CASTRONEGRO';
  const nomColor=lobo?'#ff8a7a':'#7ee2a8';
  const equipoClase=lobo?'team-lobo':'team-aldeano';
  app.innerHTML='<div class="screen active">'
   +'<div class="progress">'+state.nombres.map((_,i)=>'<div class="dot '+(i<state.idx?'done':'')+' '+(i===state.idx?'on':'')+'"></div>').join("")+'</div>'
   +'<div class="card reveal-wrap">'
   +'<div class="subtitle">📱 Entrega el móvil a la persona <b>#'+(state.idx+1)+'</b></div>'
   +'<div class="privacy-note">🔒 Nadie más debe mirar. Tapa la pantalla con la mano.</div>'
   +'<div class="reveal-slider" id="slider">'
   +'<div class="reveal-content '+equipoClase+'">'
   +'<div class="tu-nombre">'+nombre+'</div>'
   +'<div class="big">'+rol.emoji+'</div>'
   +'<div class="role-name" style="color:'+nomColor+'">'+rol.nombre+'</div>'
   +'<div class="team">'+equipoLbl+'</div>'
   +'<div class="lore">'+rol.lore+'</div>'
   +'</div>'
   +'<div class="reveal-cover" id="cover">'
   +'<div class="nombre-tapa">'+nombre+'</div>'
   +'<div class="tap-aviso">👆 Toca y manten para revelar</div>'
   +'<div class="flecha">👇 desliza hacia abajo</div>'
   +'<div class="hint">Solo tú debes verlo. Al soltar se tapará de nuevo.</div>'
   +'</div>'
   +'</div>'
   +'</div>'
   +'<button class="btn-big" onclick="siguienteRol()">🙈 Ocultar y pasar el móvil</button></div>';
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
  if(state.ronda===1){
    if(state.vivos.some(i=>state.roles[i]==="cupido"))ORDEN_NOCHE.push("cupido");
    if(state.vivos.some(i=>state.roles[i]==="salvaje")&&state.mentor<0)ORDEN_NOCHE.push("salvaje");
    if(state.vivos.some(i=>state.roles[i]==="hermanos"))ORDEN_NOCHE.push("hermanos");
    if(state.vivos.some(i=>state.roles[i]==="perro"))ORDEN_NOCHE.push("perro");
    if(state.vivos.some(i=>state.roles[i]==="sectario")&&!state.sectarioListo)ORDEN_NOCHE.push("sectario");
  }
  if(state.vivos.some(i=>state.roles[i]==="protector"))ORDEN_NOCHE.push("protector");
  if(state.vivos.some(esLobo))ORDEN_NOCHE.push("lobos");
  if((state.pocionSalvar||state.pocionVeneno)&&state.vivos.some(i=>state.roles[i]==="bruja"))ORDEN_NOCHE.push("bruja");
  if(state.vivos.some(i=>state.roles[i]==="vidente"))ORDEN_NOCHE.push("vidente");
  if(state.vivos.some(i=>state.roles[i]==="zorro")&&!state.zorroFallado)ORDEN_NOCHE.push("zorro");
  if(state.vivos.some(i=>state.roles[i]==="flautista"))ORDEN_NOCHE.push("flautista");
  if(state.vivos.some(i=>state.roles[i]==="actor"))ORDEN_NOCHE.push("actor");
  if(state.vivos.some(i=>state.roles[i]==="gitana"))ORDEN_NOCHE.push("gitana");
  if(ORDEN_NOCHE.length===0)ORDEN_NOCHE.push("amanecer");
}
function renderNoche(body){
  switch(state.faseNoche){
   case "dormir":{
    var primerRol=ORDEN_NOCHE[0];
    var pala=primerRol==="cupido"?"Que despierte Cupido.":primerRol==="salvaje"?"Que despierte el Niño Salvaje.":primerRol==="hermanos"?"Que despierten los Hermanos.":primerRol==="perro"?"Que despierte el Perro Lobo.":primerRol==="sectario"?"Que despierte el Sectario.":primerRol==="protector"?"Que despierte el Protector.":primerRol==="lobos"?"Que despierten los Lobos.":"Que despierten los roles.";
    body.innerHTML='<div class="card"><h2><span class="emoji">😴</span> El pueblo duerme</h2><div class="tap-zone">Todos cierran los ojos.<br>El narrador llamará a cada rol por turnos.</div></div>'+narradorHTML(pala)+'<button class="btn-big lobo" onclick="fasePrimerRol()">🌙 Despertar</button>';
    hablar(pala);break;
   }
   case "cupido":renderCupido(body);break;
   case "salvaje":renderSalvaje(body);break;
   case "hermanos":renderHermanos(body);break;
   case "perro":renderPerro(body);break;
   case "sectario":renderSectario(body);break;
   case "protector":renderProtector(body);break;
   case "lobos":renderTurnoLobos(body);break;
   case "bruja":renderBruja();break;
   case "vidente":renderVidente(body);break;
   case "zorro":renderZorro(body);break;
   case "flautista":renderFlautista(body);break;
   case "actor":renderActor(body);break;
   case "gitana":renderGitana(body);break;
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

// ---------- Roles nocturnos individuales ----------
function renderCupido(body){
  narra("Cupido, despierta. Elige a dos jugadores para enamorarlos.");
  body.innerHTML='<div class="card"><h2><span class="emoji">💘</span> Cupido lanza sus flechas</h2><p style="font-size:13px;color:var(--muted)">Elige a dos jugadores (puedes incluirte). Selecciona dos y confirma.</p><div class="result-list" id="cupidoList"></div></div>'+narradorHTML("Cupido, elige a dos jugadores.")+'<button class="btn-big" id="cupidoBtn" disabled>✔ Enamorar</button>';
  const list=el("cupidoList");let sel=[];
  state.vivos.forEach(i=>{const d=document.createElement("div");d.className="result-item";d.innerHTML='<span>'+state.nombres[i]+'</span>';d.onclick=()=>{if(sel.includes(i)){sel=sel.filter(x=>x!==i);d.style.outline="none";}else{if(sel.length>=2)return;sel.push(i);d.style.outline="2px solid #ff79c6";}el("cupidoBtn").disabled=sel.length!==2;};list.appendChild(d);});
  el("cupidoBtn").onclick=()=>{state.pareja=sel.slice();const names=state.pareja.map(i=>state.nombres[i]);el("juegoBody").innerHTML='<div class="card" style="text-align:center"><h2><span class="emoji">💘</span> Enamorados</h2></div>'+secretoHTML("La pareja enamorada",'<div class="big">💞</div><div class="role-name">'+names[0]+'</div><div class="lore">y</div><div class="role-name">'+names[1]+'</div>')+'<button class="btn-big" onclick="siguienteFaseNoche()">🙈 Ocultar y continuar</button>';bindSecreto();};
}
function renderSalvaje(body){
  narra("Niño Salvaje, elige en secreto a tu mentor.");
  body.innerHTML='<div class="card"><h2><span class="emoji">🧒</span> El Niño Salvaje</h2><p style="font-size:13px;color:var(--muted)">Elige a tu mentor. Si muere, te convertirás en Hombre Lobo.</p><div class="result-list" id="mentores"></div></div>'+narradorHTML("Niño Salvaje, elige a tu mentor.");
  const list=el("mentores");
  state.vivos.forEach(i=>{const d=document.createElement("div");d.className="result-item";d.innerHTML='<span>'+state.nombres[i]+'</span>';d.onclick=()=>{state.mentor=i;siguienteFaseNoche();};list.appendChild(d);});
}
function renderHermanos(body){
  narra("Hermanos, despertad y reconoced a vuestros aliados.");
  const ids=state.vivos.filter(i=>state.roles[i]==="hermanos");
  const nombres=ids.map(i=>state.nombres[i]);
  body.innerHTML='<div class="card" style="text-align:center"><h2><span class="emoji">👨‍👦‍👦</span> Los Hermanos se reconocen</h2></div>'+secretoHTML("Vuestro grupo",'<div class="big">👨‍👦‍👦</div><div class="role-name">'+nombres.join(" · ")+'</div><div class="lore">Sois hermanos y confiáis el uno en el otro.</div>')+'<button class="btn-big" onclick="siguienteFaseNoche()">🙈 Continuar</button>';
  bindSecreto();
}
function renderPerro(body){
  narra("Perro Lobo, decide tu destino.");
  body.innerHTML='<div class="card"><h2><span class="emoji">🐕</span> El Perro Lobo</h2><p style="font-size:13px;color:var(--muted)">Decide en secreto si jugarás toda la partida como aldeano o como Hombre Lobo.</p><div class="action-btns"><button class="ok" onclick="perroElegir(false)">🧑‍🌾 Ser Aldeano</button><button class="lobo" onclick="perroElegir(true)">🐺 Ser Lobo</button></div></div>';
}
function perroElegir(esLob){if(esLob)state.convertido[state.vivos.find(i=>state.roles[i]==="perro")]=true;state.perroDecidido=true;siguienteFaseNoche();}

// El Sectario Abominable: divide en secreto la aldea en dos grupos la 1.ª noche
function renderSectario(body){
  narra("Sectario, despierta y divide en secreto la aldea en dos grupos.");
  body.innerHTML="<div class=\"card\"><h2><span class=\"emoji\">🕯️</span> El Sectario Abominable</h2><p style=\"font-size:13px;color:var(--muted)\">Toca a los jugadores que formarán el GRUPO A. El resto serán el GRUPO B. Ganas si eliminas a todos los del grupo contrario.</p><div class=\"result-list\" id=\"sectList\"></div></div>"+narradorHTML("Sectario, divide la aldea en dos grupos.")+"<button class=\"btn-big\" id=\"sectBtn\">✔ Confirmar grupos</button>";
  const list=el("sectList");let sel=[];
  state.vivos.forEach(i=>{const d=document.createElement("div");d.className="result-item";d.innerHTML="<span>"+state.nombres[i]+"</span>";d.onclick=()=>{if(sel.includes(i)){sel=sel.filter(x=>x!==i);d.style.outline="none";}else{sel.push(i);d.style.outline="2px solid #c99";};list.appendChild(d);};});
  el("sectBtn").onclick=()=>{
    const grupo={};state.nombres.forEach((_,i)=>{grupo[i]=sel.includes(i)?"A":"B";});
    state.grupoSectario=grupo;state.sectarioListo=true;
    siguienteFaseNoche();
  };
}
// Juez Tartamudo: fuerza una segunda votación tras el linchamiento
function juezSegundaVotacion(){
  state.juezUsado=true;
  marcarMuerto(state.ultimoMuerto===-1?0:state.ultimoMuerto, "votacion");
  state.faseNoche="votacion";renderVotacion();
}
// Chivo Expiatorio: si hay empate, muere él y decide quién vota
function empateVotacion(){
  const exp=state.vivos.find(i=>state.roles[i]==="expiatorio");
  if(exp===undefined){siguienteRonda();return;}
  marcarMuerto(exp,"expiatorio");
  hablar(state.nombres[exp]+" era el Cabeza de Turco: al haber empate, es linchado. Decide quién NO podrá votar mañana.");
  const body=el("juegoBody");
  body.innerHTML="<div class=\"card\"><h2><span class=\"emoji\">🐐</span> El Cabeza de Turco</h2><p style=\"font-size:13px;color:var(--muted)\">Elige a quién prohibir votar el próximo día.</p><div class=\"result-list\" id=\"expList\"></div></div>";
  const list=el("expList");
  state.vivos.forEach(i=>{const d=document.createElement("div");d.className="result-item";d.innerHTML="<span>"+state.nombres[i]+"</span>";d.onclick=()=>{state.sinVoto.push(i);siguienteRonda();};list.appendChild(d);});
}
function renderProtector(body){
  narra("Protector, despierta y elige a quién proteger.");
  body.innerHTML='<div class="card"><h2><span class="emoji">🛟</span> El Protector</h2><p style="font-size:13px;color:var(--muted)">Elige a un jugador para protegerlo de los lobos esta noche.</p><div class="result-list" id="protList"></div></div>'+narradorHTML("Protector, elige a quién proteger.");
  const list=el("protList");
  state.vivos.forEach(i=>{const d=document.createElement("div");d.className="result-item";d.innerHTML='<span>'+state.nombres[i]+'</span>'+(state.protectorHistorial.includes(i)?' <span style="color:var(--muted);font-size:11px">(protegido anoche)</span>':'');d.onclick=()=>{if(state.protectorHistorial.includes(i)){narra("No puedes proteger al mismo jugador dos noches seguidas.");return;}state.protegido=i;state.protectorHistorial=[i];siguienteFaseNoche();};list.appendChild(d);});
}
function renderTurnoLobos(body){
  narra("Lobos, despertad. Elegid en silencio a quién devorar esta noche.");
  body.innerHTML='<div class="card"><h2><span class="emoji">🐺</span> Los Lobos eligen a su víctima</h2><p style="font-size:13px;color:var(--muted)">Los lobos eligen en silencio. Pulsa Confirmar.</p><div class="result-list" id="targets"></div></div>'+narradorHTML("Lobos, elegid a vuestra víctima.")+'<button class="btn-big lobo" id="confirmTurno" disabled>✔ Confirmar</button>';
  const targets=el("targets");let sel=null;
  const elegibles=state.vivos.filter(i=>!esLobo(i));
  elegibles.forEach(i=>{const d=document.createElement("div");d.className="result-item";d.innerHTML='<span>'+state.nombres[i]+'</span>';d.onclick=()=>{document.querySelectorAll("#targets .result-item").forEach(x=>x.style.outline="none");d.style.outline="2px solid var(--lobo)";sel=i;el("confirmTurno").disabled=false;};targets.appendChild(d);});
  el("confirmTurno").onclick=()=>{
    state.atacado=sel;
    if(!state.infectoUsado && state.vivos.some(i=>state.roles[i]==="infecto")){
      el("juegoBody").innerHTML='<div class="card"><h2><span class="emoji">🧛</span> El Infecto Padre</h2><p style="font-size:13px;color:var(--muted)">¿Quieres infectar a '+state.nombres[sel]+' para convertirlo en lobo (en vez de matarlo)?</p><div class="action-btns"><button class="danger" onclick="infectar('+sel+')">🧛 Infectar</button><button class="secondary" onclick="siguienteFaseNoche()">🐺 Devorar normalmente</button></div></div>';
      return;
    }
    siguienteFaseNoche();
  };
}
function infectar(idx){state.infectoUsado=true;state.convertido[idx]=true;state.atacado=-1;siguienteFaseNoche();}
function renderBruja(){
  const body=el("juegoBody");
  narra("Bruja, despierta. Consulta en secreto la pantalla para ver a quién han atacado esta noche.");
  let html='<div class="card"><h2><span class="emoji">🧙‍♀️</span> Pociones de la Bruja</h2>';
  if(state.atacado>=0)html+=secretoHTML("¿A quién han atacado?",'<div class="big">🐺</div><div class="role-name">'+state.nombres[state.atacado]+'</div><div class="lore">Esta noche los lobos han atacado a esta persona.</div>');
  const a=[];
  if(state.atacado>=0&&state.pocionSalvar)a.push('<button class="ok" onclick="brujaSalvar()">💚 Salvar a '+state.nombres[state.atacado]+'</button>');
  if(state.pocionVeneno)a.push('<button class="danger" onclick="brujaVeneno()">☠️ Envenenar a alguien</button>');
  a.push('<button class="secondary" onclick="siguienteFaseNoche()">😴 No usar pociones</button>');
  html+='<div class="action-btns" style="margin-top:12px">'+a.join("")+'</div></div>'+narradorHTML(state.narration[state.narration.length-1]);
  body.innerHTML=html;
  if(state.atacado>=0)bindSecreto();
}
function brujaSalvar(){state.pocionSalvar=false;state.atacado=-1;siguienteFaseNoche();}
function brujaVeneno(){
  const body=el("juegoBody");narra("Bruja, elige a quién envenenar.");
  body.innerHTML='<div class="card"><h2><span class="emoji">☠️</span> Veneno</h2><div class="result-list" id="venenos"></div></div>';
  const list=el("venenos");
  state.vivos.forEach(i=>{const d=document.createElement("div");d.className="result-item";d.innerHTML='<span>'+state.nombres[i]+'</span>';d.onclick=()=>{state.pocionVeneno=false;marcarMuerto(i,"veneno");siguienteFaseNoche();};list.appendChild(d);});
}
function renderVidente(body){
  narra("Vidente, despierta y elige a quién observar.");
  body.innerHTML='<div class="card"><h2><span class="emoji">🔮</span> La Vidente</h2><p style="font-size:13px;color:var(--muted)">Elige a un jugador para ver en secreto su carta.</p><div class="result-list" id="vidList"></div></div>'+narradorHTML("Vidente, elige a quién observar.");
  const list=el("vidList");
  state.vivos.forEach(i=>{const d=document.createElement("div");d.className="result-item";d.innerHTML='<span>'+state.nombres[i]+'</span>';d.onclick=()=>resolverVidente(i);list.appendChild(d);});
}
function resolverVidente(objetivo){
  let lobo=esLobo(objetivo);
  if(state.delirio){lobo=!lobo;}
  el("juegoBody").innerHTML='<div class="card" style="text-align:center"><h2><span class="emoji">🔮</span> La Vidente observa</h2></div>'+secretoHTML("Resultado de la Vidente",'<div class="big">'+(lobo?'🐺':'🧑‍🌾')+'</div><div class="role-name">'+state.nombres[objetivo]+'</div><div class="lore">'+(lobo?'es un LOBO':'es un aldeano')+'</div>')+'<button class="btn-big" onclick="siguienteFaseNoche()">🙈 Ocultar y continuar</button>';
  bindSecreto();
  narra("Vidente, guarda en secreto lo que has visto.");
}
function renderZorro(body){
  narra("Zorro, señala a tres jugadores contiguos.");
  body.innerHTML='<div class="card"><h2><span class="emoji">🦊</span> El Zorro olfatea</h2><p style="font-size:13px;color:var(--muted)">Selecciona a un jugador: revisará a él y sus dos vecinos más cercanos.</p><div class="result-list" id="zorroList"></div></div>'+narradorHTML("Zorro, señala a un jugador.");
  const list=el("zorroList");
  state.vivos.forEach(i=>{const d=document.createElement("div");d.className="result-item";d.innerHTML='<span>'+state.nombres[i]+'</span>';d.onclick=()=>{
    const vivos=state.vivos;const pos=vivos.indexOf(i);
    const trio=[vivos[pos],vivos[(pos+1)%vivos.length],vivos[(pos+2)%vivos.length]];
    const hayLobo=trio.some(esLobo);
    if(!hayLobo)state.zorroFallado=true;
    el("juegoBody").innerHTML='<div class="card" style="text-align:center"><h2><span class="emoji">🦊</span> El Zorro olfatea</h2></div>'+secretoHTML("Resultado",'<div class="big">'+(hayLobo?'🐺':'🌿')+'</div><div class="role-name">'+(hayLobo?'HAY un lobo':'NO hay lobo')+'</div><div class="lore">entre '+trio.map(x=>state.nombres[x]).join(", ")+(hayLobo?'':'. Has fallado: pierdes tu poder.')+'</div>')+'<button class="btn-big" onclick="siguienteFaseNoche()">🙈 Continuar</button>';
    bindSecreto();
  };list.appendChild(d);});
}
function renderFlautista(body){
  narra("Flautista, hechiza a dos jugadores.");
  body.innerHTML='<div class="card"><h2><span class="emoji">🎺</span> El Flautista</h2><p style="font-size:13px;color:var(--muted)">Elige a dos jugadores para hechizarlos. Los hechizados despertarán juntos.</p><div class="result-list" id="flautList"></div></div>'+narradorHTML("Flautista, elige a dos jugadores.")+'<button class="btn-big" id="flautBtn" disabled>✔ Hechizar</button>';
  const list=el("flautList");let sel=[];
  state.vivos.forEach(i=>{const d=document.createElement("div");d.className="result-item";d.innerHTML='<span>'+state.nombres[i]+'</span>';d.onclick=()=>{if(sel.includes(i)){sel=sel.filter(x=>x!==i);d.style.outline="none";}else{if(sel.length>=2)return;sel.push(i);d.style.outline="2px solid #7ec8e3";}el("flautBtn").disabled=sel.length!==2;};list.appendChild(d);});
  el("flautBtn").onclick=()=>{sel.forEach(i=>{if(!state.hechizados.includes(i))state.hechizados.push(i);});siguienteFaseNoche();};
}
function renderActor(body){
  narra("Actor, toma prestado un poder.");
  const muertos=state.nombres.map((_,i)=>i).filter(i=>!state.vivos.includes(i));
  body.innerHTML='<div class="card"><h2><span class="emoji">🎭</span> El Actor</h2><p style="font-size:13px;color:var(--muted)">Observa los roles de los muertos y actúa como uno de ellos esta noche.</p><div class="result-list" id="actorList"></div></div>'+narradorHTML("Actor, toma prestado un poder.")+'<button class="btn-big secondary" onclick="siguienteFaseNoche()">😴 Pasar</button>';
  const list=el("actorList");
  if(!muertos.length)list.innerHTML='<div class="result-item"><span>No hay muertos todavía.</span></div>';
  muertos.forEach(i=>{const d=document.createElement("div");d.className="result-item";d.innerHTML='<span>'+state.nombres[i]+'</span><span class="status-pill" style="background:#333">'+(ROLES[state.roles[i]]?ROLES[state.roles[i]].emoji:"🎭")+'</span>';d.onclick=()=>siguienteFaseNoche();list.appendChild(d);});
}
function renderGitana(body){
  narra("Gitana, invoca a los espíritus.");
  body.innerHTML='<div class="card"><h2><span class="emoji">🔮</span> La Gitana</h2><p style="font-size:13px;color:var(--muted)">Haz una pregunta de Sí/No a los muertos (Espiritismo).</p><p style="font-size:12px;color:var(--gold)">Pregunta en voz alta y el narrador consultará la carta de evento correspondiente.</p></div>'+narradorHTML("Gitana, invoca a los espíritus.")+'<button class="btn-big" onclick="siguienteFaseNoche()">🌙 Continuar</button>';
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

// ---------- Eventos de Luna Nueva ----------
function robarEvento(){
  if(!activeExp.luna)return null;
  const e=EVENTOS[Math.floor(Math.random()*EVENTOS.length)];
  state.eventoActual=e;
  state.eventoAplicado=false;
  return e;
}
function aplicarEvento(ev){
  if(!ev)return;
  switch(ev.id){
    case "milagro": // la víctima de la noche revive
      if(state.ultimoMuerto>=0 && state.causaMuerto==="lobos"){state.vivos.push(state.ultimoMuerto); state.ultimoMuerto=-1; state.eventoMensaje="✨ ¡Milagro! La víctima de los lobos despierta ilesa.";}
      break;
    case "gracia": // la víctima es salvada y obtiene inmunidad
      if(state.ultimoMuerto>=0 && state.causaMuerto==="lobos"){state.vivos.push(state.ultimoMuerto); state.ultimoMuerto=-1; state.eventoMensaje="🕊️ ¡Tocado por la Gracia! La víctima es salvada.";}
      break;
    case "resurreccion": // resucita al primer aldeano simple muerto
      { const vivos=state.vivos; let revivido=-1;
        state.nombres.forEach((_,i)=>{ if(!vivos.includes(i) && state.roles[i]==="aldeano" && revivido<0){revivido=i;} });
        if(revivido>=0){state.vivos.push(revivido); state.eventoMensaje="🌱 "+(state.nombres[revivido])+" ha resucitado.";} }
      break;
    case "alegria": state.sinVotacion=true; break;
    case "fin_cosecha": state.eventoMensaje="🌾 Jornada habitual, sin eventos."; break;
    case "mala_noche": state.sinNoche=true; break;
    case "entusiasmo": state.entusiasmo=true; break;
    case "delirio": state.delirio=true; break;
  }
}

// ---------- Amanecer ----------
function renderAmanecer(body){
  let items="";let anuncio="";
  let protegido=state.protegido;

  if(state.atacado>=0){
    const idx=state.atacado;
    const n=state.nombres[idx];
    // Protección del Protector
    if(protegido===idx){
      items+='<div class="result-item"><span>'+n+'</span><span class="status-pill" style="background:var(--ok)">🛟 Protegido</span></div>';
      anuncio='Amanece en Castronegro. Los lobos atacaron, pero la víctima estaba protegida y nadie ha muerto.';
    }
    // Anciano sobrevive al primer ataque
    else if(state.roles[idx]==="anciano" && !state.ancianoSalvado){
      items+='<div class="result-item"><span>'+n+'</span><span class="status-pill" style="background:var(--ok)">🛡️ El Anciano sobrevivió</span></div>';
      anuncio='Amanece en Castronegro. Los lobos atacaron al Anciano, pero sobrevivió a la primera embestida.';
      state.ancianoSalvado=true;
    }
    // Ángel devorado la primera noche gana
    else if(state.roles[idx]==="angel" && state.ronda===1){
      ganarSolo("angel");return;
    }
    else{
      items+='<div class="result-item"><span>'+n+'</span><span class="status-pill" style="background:var(--lobo)">💀 Devorado</span></div>';
      marcarMuerto(idx,"lobos");
      anuncio='Amanece en Castronegro. Esta noche los lobos han devorado a '+n+'.';
      // Caballero Oxidado: contagia tétanos al lobo de su izquierda (simplificado: lo anunciamos)
      if(state.roles[idx]==="caballero"){
        anuncio+=' El Caballero ha contagiado el tétanos a un lobo.';
      }
    }
  }
  else if(state.causaMuerto==="veneno"){
    const n=state.nombres[state.ultimoMuerto];
    items+='<div class="result-item"><span>'+n+'</span><span class="status-pill" style="background:var(--accent)">☠️ Envenenado</span></div>';
    anuncio='Amanece en Castronegro. Esta noche alguien ha sido envenenado: '+n+'.';
  }
  else{
    items+='<div class="result-item"><span>Nadie ha muerto esta noche</span><span class="status-pill" style="background:var(--ok)">🌤️</span></div>';
    anuncio='Amanece en Castronegro. Nadie ha muerto esta noche.';
  }

  // Muertos de amor
  if(state.muertosPorAmor&&state.muertosPorAmor.length){
    state.muertosPorAmor.forEach(ip=>{items+='<div class="result-item"><span>'+state.nombres[ip]+'</span><span class="status-pill" style="background:#ff79c6">💔 Muerto de amor</span></div>';});
    anuncio+=' Un enamorado ha muerto de pena.';state.muertosPorAmor=[];
  }

  // Niño Salvaje se convierte si su mentor murió
  state.vivos.filter(i=>state.roles[i]==="salvaje").forEach(s=>{
    if(state.mentor>=0 && !state.vivos.includes(state.mentor) && !state.convertido[s]){
      state.convertido[s]=true;
      items+='<div class="result-item"><span>'+state.nombres[s]+'</span><span class="status-pill" style="background:var(--lobo)">🐺 El Salvaje se vuelve lobo</span></div>';
    }
  });

  // Feriante: el oso gruñe si hay lobo a su lado
  state.vivos.filter(i=>state.roles[i]==="feriante").forEach(f=>{
    const vi=state.vivos;const pos=vi.indexOf(f);
    const izq=vi[(pos-1+vi.length)%vi.length];const der=vi[(pos+1)%vi.length];
    if(esLobo(izq)||esLobo(der)){
      items+='<div class="result-item"><span>🐻 ¡El oso gruñe! (hay un lobo junto al Feriante)</span><span class="status-pill" style="background:var(--gold)">🐻</span></div>';
    }
  });

  // El Ángel que sobrevive se vuelve aldeano
  if(state.ronda>1)state.angelVivo=false;

  if(state.ultimoMuerto>=0&&state.roles[state.ultimoMuerto]==="cazador"&&state.balaCazador)items+='<button class="danger" style="margin-top:8px" onclick="disparoCazador()">🏹 El Cazador usa su última bala</button>';

  state.delirio=false;
  narra(anuncio);
  body.innerHTML='<div class="card"><h2><span class="emoji">🌅</span> Amanece en Castronegro</h2><div class="result-list" id="resAmanecer"></div></div>'+narradorHTML(anuncio)+'<button class="btn-big" onclick="pasarAlDia()">☀️ Anunciar el día</button>';
  el("resAmanecer").innerHTML=items;
}
function disparoCazador(){
  state.balaCazador=false;const body=el("juegoBody");narra("El Cazador, antes de caer, dispara su última bala contra alguien.");
  body.innerHTML='<div class="card"><h2><span class="emoji">🏹</span> Disparo del Cazador</h2><div class="result-list" id="disparos"></div></div>';
  const list=el("disparos");
  state.vivos.forEach(i=>{const d=document.createElement("div");d.className="result-item";d.innerHTML='<span>'+state.nombres[i]+'</span>';d.onclick=()=>{marcarMuerto(i,"cazador");pasarAlDia();};list.appendChild(d);});
}
function pasarAlDia(){
  if(comprobarYFin())return;
  state.faseNoche="dia";
  // robar y aplicar carta de evento de Luna Nueva
  const ev=robarEvento();
  if(ev){ aplicarEvento(ev); }
  renderJuego();
}

// ---------- Día / votación ----------
// ---------- Día / votación ----------
function renderDia(body){
  if(comprobarYFin())return;
  let eventoHTML="";
  if(state.eventoActual){
    const ev=state.eventoActual;
    eventoHTML="<div class=\"evento-card evento-\"+ev.tipo+\"\"><span class=\"ev-emoji\">"+ev.emoji+"</span><div class=\"ev-head\"><span class=\"ev-nombre\">"+ev.nombre+"</span><span class=\"ev-tipo\">"+etiquetaTipo(ev.tipo)+"</span></div><p>"+ev.desc+"</p>"+(state.eventoMensaje?"<div class=\"ev-mensaje\">"+state.eventoMensaje+"</div>":"")+"</div>";
  }
  body.innerHTML="<div class=\"card\"><h2><span class=\"emoji\">🗣️</span> El pueblo debate</h2><p style=\"font-size:14px;line-height:1.6\">Los aldeanos discuten quién puede ser lobo. Cuando hayáis decidido, id a la votación.</p>"+eventoHTML+"</div>"+narradorHTML("El pueblo despierta. Ha llegado el momento de debatir y votar.")+"<div class=\"action-btns\"><button class=\"btn-big\" onclick=\"irAVotacion()\">🗳️ Ir a la votación</button><button class=\"btn-big secondary\" onclick=\"siguienteRonda()\">🌙 Pasar esta votación</button></div>";
  narra("El pueblo despierta. Ha llegado el momento de debatir y votar.");
}
function etiquetaTipo(t){return t==="votacion"?"🗳️ votación":t==="noche"?"🌙 noche":t==="espiritismo"?"👻 espiritismo":t==="inmediato"?"⚡ inmediato":t==="amanecer"?"🌅 amanecer":"☀️ día";}

function irAVotacion(){
  if(state.sinVotacion){state.sinVotacion=false;siguienteRonda();return;}
  state.faseNoche="votacion";renderVotacion();
}
function renderVotacion(){
  const body=el("juegoBody");narra("Es la hora de la votación. Cada aldeano vota en secreto al jugador que cree que es lobo.");let sel=null;
  body.innerHTML='<div class="card"><h2><span class="emoji">🗳️</span> Votación del pueblo</h2><p style="font-size:13px;color:var(--muted)">Selecciona al jugador expulsado por mayoría.</p><div class="result-list" id="votantes"></div></div>'+narradorHTML("Es la hora de la votación.")+'<button class="btn-big danger" id="votarBtn" disabled>✅ Expulsar del pueblo</button>'+(state.vivos.some(i=>state.roles[i]==="expiatorio")?'<button class="btn-big secondary" onclick="empateVotacion()">⚖️ Hay empate</button>':'');
  const list=el("votantes");
  state.vivos.forEach(i=>{const d=document.createElement("div");d.className="result-item";d.innerHTML='<span>'+state.nombres[i]+'</span>';d.onclick=()=>{document.querySelectorAll("#votantes .result-item").forEach(x=>x.style.outline="none");d.style.outline="2px solid var(--accent2)";sel=i;el("votarBtn").disabled=false;};list.appendChild(d);});
  el("votarBtn").onclick=()=>{
    const n=state.nombres[sel];
    if(state.roles[sel]==="angel" && state.ronda===1){ganarSolo("angel");return;}
    if(state.roles[sel]==="tonto" && !state.tontoSalvado){
      state.tontoSalvado=true;
      hablar(n+' era el Tonto del Pueblo, pero se salva del linchamiento. Pierde su derecho a votar.');
      siguienteRonda();return;
    }
    // Sirvienta Fiel: puede sacrificarse por el condenado
    if(state.vivos.some(i=>state.roles[i]==="sirvienta") && state.roles[sel]!=="sirvienta"){
      const sirv=state.vivos.find(i=>state.roles[i]==="sirvienta");
      el("juegoBody").innerHTML='<div class="card"><h2><span class="emoji">🧹</span> La Sirvienta Fiel</h2><p style="font-size:13px;color:var(--muted)">¿Quieres sacrificarte para salvar a '+n+'? Intercambiará su carta contigo.</p><div class="action-btns"><button class="danger" onclick="sirvientaSacrificar('+sirv+','+sel+')">🧹 Sacrificarme</button><button class="secondary" onclick="linchar('+sel+')">⚖️ Linchar normalmente</button></div></div>';
      return;
    }
    linchar(sel);
  };
}
function sirvientaSacrificar(sirv, condenado){
  // la sirvienta muere, el condenado asume su rol
  marcarMuerto(sirv,"sirvienta");
  state.roles[condenado]="sirvienta";
  hablar(state.nombres[sirv]+' se ha sacrificado. '+state.nombres[condenado]+' se salva y asume su rol.');
  siguienteRonda();
}
function linchar(sel){
  const n=state.nombres[sel];
  const eraLobo=esLobo(sel);
  marcarMuerto(sel,"votacion");
  if(state.entusiasmo && eraLobo){state.sinNoche=true;}
  const esCaz=state.roles[sel]==="cazador"&&state.balaCazador;
  hablar(n+' ha sido expulsado del pueblo por la votación.'+(esCaz?' El Cazador disparará antes de caer.':''));
  // Juez Tartamudo: puede forzar una segunda votación
  if(!state.juezUsado && state.vivos.some(i=>state.roles[i]==="juez")){
    el("juegoBody").innerHTML='<div class="card"><h2><span class="emoji">⚖️</span> El Juez Tartamudo</h2><p style="font-size:13px;color:var(--muted)">¿Quieres forzar una segunda votación y linchamiento inmediatos?</p><div class="action-btns"><button class="danger" onclick="juezSegundaVotacion()">⚖️ Segunda votación</button><button class="secondary" onclick="siguienteRonda()">🕊️ Pasar</button></div></div>';
    return;
  }
  if(esCaz)setTimeout(()=>disparoCazador(),900);else siguienteRonda();
}
function siguienteRonda(){
  if(comprobarYFin())return;
  state.ronda++;
  if(state.sinNoche){
    // Mala Noche / Entusiasmo: no hay fase nocturna
    state.sinNoche=false; state.entusiasmo=false;
    state.eventoActual=null; state.eventoMensaje="";
    state.faseNoche="dia"; renderJuego(); return;
  }
  state.entusiasmo=false;
  state.eventoActual=null; state.eventoMensaje="";
  prepararNoche(); state.faseNoche="dormir"; renderJuego();
}

// ---------- Fin / victoria ----------
function estadoFin(){
  if(state.faseNoche==="fin")return true;
  const l=state.vivos.filter(esLobo).length;const a=state.vivos.length-l;
  if(l>=a)return true;
  if(l===0)return true;
  // Sectario: gana si elimina a todos los del grupo contrario
  if(state.sectarioListo){
    const g=state.grupoSectario;
    const si=state.vivos.find(i=>state.roles[i]==="sectario");
    if(si!==undefined){
      const miGrupo=g[si];
      const opuestos=state.vivos.filter(i=>g[i]!==miGrupo);
      if(opuestos.length===0)return true;
    }
  }
  // Flautista gana si todos los vivos están hechizados
  const hechizados=state.hechizados||[];
  if(state.vivos.some(i=>state.roles[i]==="flautista")){
    const todosHechizados=state.vivos.every(i=>hechizados.includes(i));
    if(todosHechizados)return true;
  }
  return false;
}
function comprobarYFin(){
  if(estadoFin()){state.faseNoche="fin";renderFin();return true;}
  return false;
}
function ganarSolo(rol){
  state.faseNoche="fin";
  const body=el("juegoBody");
  const esAngel=rol==="angel";
  body.innerHTML='<div class="card reveal" style="text-align:center"><div class="big">'+(esAngel?'👼':'🎺')+'</div><div class="role-name" style="font-size:22px">'+(esAngel?'Gana el Ángel':'Gana el Flautista')+'</div><div class="lore">'+(esAngel?'El Ángel ha conseguido ser eliminado y gana en solitario.':'El Flautista ha hechizado a todos.')+'</div></div><button class="btn-big" onclick="location.reload()">🔄 Nueva partida</button>';
  hablar(esAngel?'El Ángel gana la partida en solitario.':'El Flautista gana la partida en solitario.');
}
function renderFin(){
  const l=state.vivos.filter(esLobo).length;const a=state.vivos.length-l;
  const hechizados=state.hechizados||[];
  const flautistaGana=state.vivos.some(i=>state.roles[i]==="flautista")&&state.vivos.every(i=>hechizados.includes(i));
  let titulo, emoji, msg;
  if(flautistaGana){titulo='Gana el Flautista';emoji='🎺';msg='El Flautista ha hechizado a todos los supervivientes.';}
  else if(l>0&&l>=a){titulo='Ganan los Lobos';emoji='🐺';msg='La manada de los Lobos ha conquistado Castronegro.';}
  else{titulo='Gana el Pueblo';emoji='🎉';msg='El pueblo de Castronegro ha sobrevivido.';}
  const body=el("juegoBody");
  body.innerHTML='<div class="card reveal" style="text-align:center"><div class="big">'+emoji+'</div><div class="role-name" style="font-size:22px">'+titulo+'</div><div class="lore">'+msg+'</div></div><button class="btn-big" onclick="location.reload()">🔄 Nueva partida</button>';
  hablar(msg);
}
render();
