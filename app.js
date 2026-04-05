// ═══════════════════════════════════════════════════════
//  GRIMORIO COMPLETO — hechizos_harry_potter_v2.xlsx
// ═══════════════════════════════════════════════════════
const GRIMORIO = [
{ nombre: ‘Accio’,                efecto: ‘Invoca objetos hacia el mago’,              dificultad: 2, tipo: ‘Utilidad’       },
{ nombre: ‘Aguamenti’,            efecto: ‘Genera agua’,                               dificultad: 2, tipo: ‘Utilidad’       },
{ nombre: ‘Alohomora’,            efecto: ‘Abre cerraduras’,                           dificultad: 1, tipo: ‘Utilidad’       },
{ nombre: ‘Anapneo’,              efecto: ‘Desobstruye vías respiratorias’,             dificultad: 2, tipo: ‘Curación’       },
{ nombre: ‘Apparate’,             efecto: ‘Teletransporte’,                            dificultad: 3, tipo: ‘Transporte’     },
{ nombre: ‘Ascendio’,             efecto: ‘Impulsa hacia arriba’,                      dificultad: 2, tipo: ‘Utilidad’       },
{ nombre: ‘Avada Kedavra’,        efecto: ‘Maldición asesina’,                         dificultad: 3, tipo: ‘Ataque’         },
{ nombre: ‘Bombarda’,             efecto: ‘Provoca explosión’,                         dificultad: 2, tipo: ‘Ataque’         },
{ nombre: ‘Brackium Emendo’,      efecto: ‘Repara huesos (puede fallar)’,               dificultad: 3, tipo: ‘Curación’       },
{ nombre: ‘Capacious Extremis’,   efecto: ‘Expande capacidad interna’,                 dificultad: 3, tipo: ‘Utilidad’       },
{ nombre: ‘Colloportus’,          efecto: ‘Sella puertas’,                             dificultad: 2, tipo: ‘Defensivo’      },
{ nombre: ‘Confundo’,             efecto: ‘Confunde a la víctima’,                     dificultad: 2, tipo: ‘Control’        },
{ nombre: ‘Confringo’,            efecto: ‘Maldición explosiva’,                       dificultad: 3, tipo: ‘Ataque’         },
{ nombre: ‘Crucio’,               efecto: ‘Maldición de tortura’,                      dificultad: 3, tipo: ‘Ataque’         },
{ nombre: ‘Depulso’,              efecto: ‘Empuja objetos’,                            dificultad: 2, tipo: ‘Ataque’         },
{ nombre: ‘Diffindo’,             efecto: ‘Corta objetos’,                             dificultad: 2, tipo: ‘Ataque’         },
{ nombre: ‘Dissendium’,           efecto: ‘Abre pasajes secretos’,                     dificultad: 2, tipo: ‘Utilidad’       },
{ nombre: ‘Engorgio’,             efecto: ‘Aumenta tamaño’,                            dificultad: 2, tipo: ‘Transformación’ },
{ nombre: ‘Episkey’,              efecto: ‘Cura heridas leves’,                        dificultad: 1, tipo: ‘Curación’       },
{ nombre: ‘Expecto Patronum’,     efecto: ‘Invoca Patronus’,                           dificultad: 3, tipo: ‘Defensivo’      },
{ nombre: ‘Expelliarmus’,         efecto: ‘Desarma al oponente’,                       dificultad: 1, tipo: ‘Defensivo’      },
{ nombre: ‘Expulso’,              efecto: ‘Explosión violenta’,                        dificultad: 3, tipo: ‘Ataque’         },
{ nombre: ‘Ferula’,               efecto: ‘Crea vendajes’,                             dificultad: 1, tipo: ‘Curación’       },
{ nombre: ‘Fidelius Charm’,       efecto: ‘Oculta información en guardián secreto’,    dificultad: 3, tipo: ‘Defensivo’      },
{ nombre: ‘Finite Incantatem’,    efecto: ‘Detiene hechizos’,                          dificultad: 2, tipo: ‘Defensivo’      },
{ nombre: ‘Flagrate’,             efecto: ‘Dibuja fuego en el aire’,                   dificultad: 2, tipo: ‘Utilidad’       },
{ nombre: ‘Flipendo’,             efecto: ‘Empuja / derriba’,                          dificultad: 1, tipo: ‘Ataque’         },
{ nombre: ‘Furnunculus’,          efecto: ‘Provoca erupciones’,                        dificultad: 2, tipo: ‘Ataque’         },
{ nombre: ‘Geminio’,              efecto: ‘Duplica objetos’,                           dificultad: 3, tipo: ‘Transformación’ },
{ nombre: ‘Glisseo’,              efecto: ‘Convierte escaleras en rampas’,             dificultad: 3, tipo: ‘Transformación’ },
{ nombre: ‘Homenum Revelio’,      efecto: ‘Detecta presencia humana’,                  dificultad: 2, tipo: ‘Utilidad’       },
{ nombre: ‘Impedimenta’,          efecto: ‘Ralentiza enemigos’,                        dificultad: 2, tipo: ‘Defensivo’      },
{ nombre: ‘Imperio’,              efecto: ‘Control mental’,                            dificultad: 3, tipo: ‘Control’        },
{ nombre: ‘Impervius’,            efecto: ‘Repele agua’,                               dificultad: 1, tipo: ‘Defensivo’      },
{ nombre: ‘Incendio’,             efecto: ‘Produce fuego’,                             dificultad: 1, tipo: ‘Ataque’         },
{ nombre: ‘Langlock’,             efecto: ‘Bloquea la lengua’,                         dificultad: 2, tipo: ‘Control’        },
{ nombre: ‘Legilimens’,           efecto: ‘Lee la mente’,                              dificultad: 3, tipo: ‘Control’        },
{ nombre: ‘Levicorpus’,           efecto: ‘Suspende a la víctima boca abajo’,          dificultad: 2, tipo: ‘Control’        },
{ nombre: ‘Liberacorpus’,         efecto: ‘Contraconjuro de Levicorpus’,               dificultad: 2, tipo: ‘Defensivo’      },
{ nombre: ‘Locomotor’,            efecto: ‘Mueve objetos’,                             dificultad: 2, tipo: ‘Utilidad’       },
{ nombre: ‘Lumos’,                efecto: ‘Ilumina la varita’,                         dificultad: 1, tipo: ‘Utilidad’       },
{ nombre: ‘Muffliato’,            efecto: ‘Bloquea sonido alrededor’,                  dificultad: 2, tipo: ‘Defensivo’      },
{ nombre: ‘Nox’,                  efecto: ‘Apaga la luz de Lumos’,                     dificultad: 1, tipo: ‘Utilidad’       },
{ nombre: ‘Obliviate’,            efecto: ‘Borra recuerdos’,                           dificultad: 3, tipo: ‘Control’        },
{ nombre: ‘Oppugno’,              efecto: ‘Ordena atacar a objetos’,                   dificultad: 2, tipo: ‘Ataque’         },
{ nombre: ‘Petrificus Totalus’,   efecto: ‘Paraliza completamente’,                    dificultad: 2, tipo: ‘Control’        },
{ nombre: ‘Piertotum Locomotor’,  efecto: ‘Da vida a estatuas’,                        dificultad: 3, tipo: ‘Transformación’ },
{ nombre: ‘Protego’,              efecto: ‘Escudo mágico’,                             dificultad: 2, tipo: ‘Defensivo’      },
{ nombre: ‘Protego Maxima’,       efecto: ‘Escudo avanzado’,                           dificultad: 3, tipo: ‘Defensivo’      },
{ nombre: ‘Reducio’,              efecto: ‘Reduce tamaño’,                             dificultad: 2, tipo: ‘Transformación’ },
{ nombre: ‘Reducto’,              efecto: ‘Desintegra objetos’,                        dificultad: 3, tipo: ‘Ataque’         },
{ nombre: ‘Reparo’,               efecto: ‘Repara objetos’,                            dificultad: 1, tipo: ‘Utilidad’       },
{ nombre: ‘Rictusempra’,          efecto: ‘Provoca cosquillas’,                        dificultad: 1, tipo: ‘Control’        },
{ nombre: ‘Ridikulus’,            efecto: ‘Neutraliza boggart’,                        dificultad: 2, tipo: ‘Defensivo’      },
{ nombre: ‘Scourgify’,            efecto: ‘Limpieza mágica’,                           dificultad: 1, tipo: ‘Utilidad’       },
{ nombre: ‘Sectumsempra’,         efecto: ‘Causa cortes graves’,                       dificultad: 3, tipo: ‘Ataque’         },
{ nombre: ‘Serpensortia’,         efecto: ‘Invoca serpiente’,                          dificultad: 2, tipo: ‘Ataque’         },
{ nombre: ‘Silencio’,             efecto: ‘Silencia objetivo’,                         dificultad: 2, tipo: ‘Control’        },
{ nombre: ‘Sonorus’,              efecto: ‘Amplifica voz’,                             dificultad: 1, tipo: ‘Utilidad’       },
{ nombre: ‘Specialis Revelio’,    efecto: ‘Revela propiedades mágicas’,                dificultad: 3, tipo: ‘Utilidad’       },
{ nombre: ‘Stupefy’,              efecto: ‘Aturde’,                                    dificultad: 2, tipo: ‘Ataque’         },
{ nombre: ‘Tarantallegra’,        efecto: ‘Hace bailar sin control’,                   dificultad: 2, tipo: ‘Control’        },
{ nombre: ‘Wingardium Leviosa’,   efecto: ‘Levita objetos’,                            dificultad: 1, tipo: ‘Utilidad’       },
];

const TIPO_COLORES = {
‘Ataque’:         ‘#6b2020’,
‘Defensivo’:      ‘#1a3a5c’,
‘Control’:        ‘#3a1a5c’,
‘Curación’:       ‘#1a4a2a’,
‘Utilidad’:       ‘#3a3010’,
‘Transformación’: ‘#2a2a4a’,
‘Transporte’:     ‘#1a3a3a’,
};

const COSTO_DESTINO = { 1: 1, 2: 2, 3: 3 };

// ── Estado ──────────────────────────────────────────────
let grimorioFiltro  = { tipo: ‘Todos’, dificultad: 0, busqueda: ‘’ };
let grimorioAbierto = false;

// ═══════════════════════════════════════════════════════
//  AUDIO ENGINE — Web Audio API
// ═══════════════════════════════════════════════════════
let audioCtx = null;

function getAudioCtx() {
if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
return audioCtx;
}

function playSpellSound(tipo) {
try {
const ctx = getAudioCtx();
if (ctx.state === ‘suspended’) ctx.resume();

```
    switch (tipo) {
        case 'Ataque':        playAtaqueSound(ctx);        break;
        case 'Defensivo':     playDefensivoSound(ctx);     break;
        case 'Curación':      playCuracionSound(ctx);      break;
        case 'Control':       playControlSound(ctx);       break;
        case 'Transformación':playTransformacionSound(ctx);break;
        case 'Transporte':    playTransporteSound(ctx);    break;
        default:              playUtilidadSound(ctx);      break;
    }
} catch(e) { /* silencioso si el navegador bloquea */ }
```

}

function makeOsc(ctx, type, freq, gainVal, startTime, duration) {
const osc  = ctx.createOscillator();
const gain = ctx.createGain();
osc.type = type;
osc.frequency.setValueAtTime(freq, startTime);
gain.gain.setValueAtTime(gainVal, startTime);
gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
osc.connect(gain);
gain.connect(ctx.destination);
osc.start(startTime);
osc.stop(startTime + duration);
}

function playAtaqueSound(ctx) {
// Grave explosivo + chispazo agudo
const t = ctx.currentTime;
makeOsc(ctx, ‘sawtooth’, 120, 0.4, t,       0.3);
makeOsc(ctx, ‘sawtooth’, 60,  0.5, t,       0.5);
makeOsc(ctx, ‘square’,   800, 0.2, t + 0.05,0.15);
makeOsc(ctx, ‘square’,   1200,0.15,t + 0.1, 0.1);
// Rumble de baja frecuencia
const noise = ctx.createOscillator();
const ng = ctx.createGain();
noise.type = ‘sawtooth’;
noise.frequency.setValueAtTime(40, t);
noise.frequency.exponentialRampToValueAtTime(20, t + 0.4);
ng.gain.setValueAtTime(0.3, t);
ng.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
noise.connect(ng); ng.connect(ctx.destination);
noise.start(t); noise.stop(t + 0.4);
}

function playDefensivoSound(ctx) {
// Escudo cristalino — harmónicos ascendentes
const t = ctx.currentTime;
[400, 600, 800, 1000, 1200].forEach((f, i) => {
makeOsc(ctx, ‘sine’, f, 0.18 - i*0.02, t + i*0.06, 0.6 - i*0.05);
});
makeOsc(ctx, ‘triangle’, 300, 0.25, t, 0.8);
}

function playCuracionSound(ctx) {
// Campanillas suaves + arpeggio mayor
const t = ctx.currentTime;
const notes = [523, 659, 784, 1047, 1319]; // Do-Mi-Sol-Do-Mi
notes.forEach((f, i) => {
makeOsc(ctx, ‘sine’,     f,     0.2,  t + i*0.1, 0.5);
makeOsc(ctx, ‘triangle’, f*2,   0.08, t + i*0.1, 0.3);
});
}

function playControlSound(ctx) {
// Espiral hipnótica — frecuencia oscilante
const t = ctx.currentTime;
const osc  = ctx.createOscillator();
const gain = ctx.createGain();
osc.type = ‘sine’;
osc.frequency.setValueAtTime(300, t);
osc.frequency.linearRampToValueAtTime(600, t + 0.3);
osc.frequency.linearRampToValueAtTime(200, t + 0.6);
osc.frequency.linearRampToValueAtTime(500, t + 0.9);
gain.gain.setValueAtTime(0.3, t);
gain.gain.exponentialRampToValueAtTime(0.001, t + 1.0);
osc.connect(gain); gain.connect(ctx.destination);
osc.start(t); osc.stop(t + 1.0);
makeOsc(ctx, ‘square’, 150, 0.15, t, 0.8);
}

function playTransformacionSound(ctx) {
// Glissando mágico + burbujas
const t = ctx.currentTime;
const osc  = ctx.createOscillator();
const gain = ctx.createGain();
osc.type = ‘triangle’;
osc.frequency.setValueAtTime(200, t);
osc.frequency.exponentialRampToValueAtTime(1600, t + 0.6);
gain.gain.setValueAtTime(0.3, t);
gain.gain.exponentialRampToValueAtTime(0.001, t + 0.7);
osc.connect(gain); gain.connect(ctx.destination);
osc.start(t); osc.stop(t + 0.7);
[0.1, 0.25, 0.4, 0.55].forEach(delay => {
makeOsc(ctx, ‘sine’, 800 + Math.random()*400, 0.12, t + delay, 0.15);
});
}

function playTransporteSound(ctx) {
// Whoosh + destello
const t = ctx.currentTime;
const osc  = ctx.createOscillator();
const gain = ctx.createGain();
osc.type = ‘sawtooth’;
osc.frequency.setValueAtTime(1000, t);
osc.frequency.exponentialRampToValueAtTime(100, t + 0.4);
gain.gain.setValueAtTime(0.0, t);
gain.gain.linearRampToValueAtTime(0.4, t + 0.05);
gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
osc.connect(gain); gain.connect(ctx.destination);
osc.start(t); osc.stop(t + 0.5);
makeOsc(ctx, ‘sine’, 2000, 0.2, t + 0.4, 0.3);
}

function playUtilidadSound(ctx) {
// Tono simple amigable
const t = ctx.currentTime;
makeOsc(ctx, ‘sine’, 440, 0.25, t,      0.2);
makeOsc(ctx, ‘sine’, 660, 0.2,  t+0.15, 0.2);
makeOsc(ctx, ‘sine’, 880, 0.15, t+0.3,  0.25);
}

// ═══════════════════════════════════════════════════════
//  PARTÍCULAS MÁGICAS
// ═══════════════════════════════════════════════════════
const TIPO_PARTICULAS = {
‘Ataque’:         { colors: [’#ff4444’,’#ff8800’,’#ffcc00’], shape: ‘spark’,  count: 40 },
‘Defensivo’:      { colors: [’#4488ff’,’#88ccff’,’#ffffff’], shape: ‘shield’, count: 35 },
‘Curación’:       { colors: [’#44ff88’,’#88ffcc’,’#ccffee’], shape: ‘heart’,  count: 30 },
‘Control’:        { colors: [’#aa44ff’,’#dd88ff’,’#ff44dd’], shape: ‘spiral’, count: 35 },
‘Transformación’: { colors: [’#ffaa00’,’#ff44aa’,’#44ffff’], shape: ‘star’,   count: 32 },
‘Transporte’:     { colors: [’#ffffff’,’#aaddff’,’#4488ff’], shape: ‘streak’, count: 38 },
‘Utilidad’:       { colors: [’#c9a84c’,’#e8dcc8’,’#ffeeaa’], shape: ‘spark’,  count: 25 },
};

function launchParticles(tipo, originEl) {
const cfg = TIPO_PARTICULAS[tipo] || TIPO_PARTICULAS[‘Utilidad’];
const rect = originEl ? originEl.getBoundingClientRect() : { left: window.innerWidth/2, top: window.innerHeight/2, width: 0, height: 0 };
const ox = rect.left + rect.width / 2;
const oy = rect.top  + rect.height / 2;

```
const container = document.getElementById('particle-layer') || createParticleLayer();

for (let i = 0; i < cfg.count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';

    const color = cfg.colors[Math.floor(Math.random() * cfg.colors.length)];
    const angle = Math.random() * Math.PI * 2;
    const speed = 60 + Math.random() * 180;
    const size  = 3 + Math.random() * 7;
    const dur   = 600 + Math.random() * 800;
    const tx    = Math.cos(angle) * speed;
    const ty    = Math.sin(angle) * speed;

    p.style.cssText = `
        left: ${ox}px;
        top: ${oy}px;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        box-shadow: 0 0 ${size*2}px ${color};
        border-radius: ${cfg.shape === 'spark' ? '2px' : '50%'};
        transform: translate(-50%, -50%);
        animation: particle-fly ${dur}ms ease-out forwards;
        --tx: ${tx}px;
        --ty: ${ty}px;
    `;

    container.appendChild(p);
    setTimeout(() => p.remove(), dur + 50);
}

// Flash de luz central
const flash = document.createElement('div');
flash.className = 'spell-flash';
flash.style.cssText = `
    left: ${ox}px;
    top: ${oy}px;
    background: radial-gradient(circle, ${cfg.colors[0]}88 0%, transparent 70%);
`;
container.appendChild(flash);
setTimeout(() => flash.remove(), 500);
```

}

function createParticleLayer() {
const layer = document.createElement(‘div’);
layer.id = ‘particle-layer’;
layer.style.cssText = `position: fixed; inset: 0; pointer-events: none; z-index: 9998; overflow: hidden;`;
document.body.appendChild(layer);
return layer;
}

// ═══════════════════════════════════════════════════════
//  NAVEGACIÓN
// ═══════════════════════════════════════════════════════
function showTab(tabId, element) {
const targetBtn = element.closest(’.tab-item’);
if (!targetBtn) return;
document.querySelectorAll(’.app-section’).forEach(s => s.classList.remove(‘active’));
document.querySelectorAll(’.tab-item’).forEach(b => b.classList.remove(‘active’));
document.getElementById(tabId).classList.add(‘active’);
targetBtn.classList.add(‘active’);
if (tabId === ‘lanzar’) updateSkillSelector();
}

// ═══════════════════════════════════════════════════════
//  FILAS DINÁMICAS — Aspectos / Objetos
// ═══════════════════════════════════════════════════════
function addAspect(text = ‘’, mod = 0) { createRow(‘aspects-dynamic-list’, text, mod, ‘Aspecto/Vínculo’); }
function addItem(text = ‘’, mod = 0)   { createRow(‘items-dynamic-list’,   text, mod, ‘Objeto Mágico’);  }

function createRow(containerId, text, mod, placeholder) {
const container = document.getElementById(containerId);
const div = document.createElement(‘div’);
div.className = ‘dynamic-row’;
div.innerHTML = `<input type="text" class="text-input" placeholder="${placeholder}" value="${text}" style="flex:1"> <input type="number" class="mod-input" value="${mod}"> <button onclick="this.parentElement.remove()" style="background:none;border:none;color:var(--blood);cursor:pointer">✕</button>`;
container.appendChild(div);
}

// ═══════════════════════════════════════════════════════
//  ARTES ARCANAS
// ═══════════════════════════════════════════════════════
function addSkill(name = ‘’, val = 0) {
const container = document.getElementById(‘skills-dynamic-list’);
const div = document.createElement(‘div’);
div.className = ‘dynamic-row’;
div.innerHTML = `<input type="text" class="skill-name-input" placeholder="Nombre Arte" value="${name}" oninput="updateSkillSelector()"> <input type="number" class="skill-val-input" value="${val}" style="width:55px" oninput="updateSkillBudget()"> <button onclick="this.parentElement.remove(); updateSkillBudget();" style="background:none;border:none;color:var(--blood);cursor:pointer">✕</button>`;
container.appendChild(div);
updateSkillBudget();
}

function updateSkillBudget() {
const recovery = parseInt(document.getElementById(‘recovery-val’).value) || 0;
let spent = 0;
document.querySelectorAll(’.skill-val-input’).forEach(s => spent += (parseInt(s.value) || 0));
const total = recovery - spent;
const span = document.getElementById(‘skill-budget’);
span.innerText = total;
span.style.color = total < 0 ? ‘var(–blood-light)’ : ‘inherit’;
updateSkillSelector();
}

function updateSkillSelector() {
const selector = document.getElementById(‘skill-selector’);
if (!selector) return;
selector.innerHTML = ‘<option value="0">Concentración (+0)</option>’;
document.querySelectorAll(’.skill-name-input’).forEach((n, i) => {
if (n.value) {
const opt = document.createElement(‘option’);
opt.value = document.querySelectorAll(’.skill-val-input’)[i].value;
opt.text  = `${n.value} (+${opt.value})`;
selector.add(opt);
}
});
updateAspectSelector();
}

// ═══════════════════════════════════════════════════════
//  SELECTOR DE ASPECTOS para la Esfera
// ═══════════════════════════════════════════════════════
function updateAspectSelector() {
const sel = document.getElementById(‘aspect-selector’);
if (!sel) return;
sel.innerHTML = ‘<option value="0">— Ninguno —</option>’;
document.querySelectorAll(’#aspects-dynamic-list .dynamic-row’).forEach(row => {
const name = row.querySelector(’.text-input’)?.value;
const mod  = row.querySelector(’.mod-input’)?.value || 0;
if (name) {
const opt = document.createElement(‘option’);
opt.value = mod;
opt.text  = `${name} (+${mod})`;
sel.add(opt);
}
});
updateWandSelector();
}

function updateWandSelector() {
const sel = document.getElementById(‘wand-selector’);
if (!sel) return;
sel.innerHTML = ‘<option value="0">— Sin varita —</option>’;
document.querySelectorAll(’#items-dynamic-list .dynamic-row’).forEach(row => {
const name = row.querySelector(’.text-input’)?.value;
const mod  = row.querySelector(’.mod-input’)?.value || 0;
if (name) {
const opt = document.createElement(‘option’);
opt.value = mod;
opt.text  = `${name} (+${mod})`;
sel.add(opt);
}
});
}

// ═══════════════════════════════════════════════════════
//  ESFERA DE ADIVINACIÓN — Acción Compuesta
// ═══════════════════════════════════════════════════════
function executeSelectedRoll() {
// Recoger valores
const skillBonus  = parseInt(document.getElementById(‘skill-selector’)?.value)  || 0;
const aspectBonus = parseInt(document.getElementById(‘aspect-selector’)?.value) || 0;
const wandBonus   = parseInt(document.getElementById(‘wand-selector’)?.value)   || 0;
const extraArte   = parseInt(document.getElementById(‘extra-arte-input’)?.value)|| 0;
const opBonus     = parseInt(document.getElementById(‘op-condition-input’)?.value)|| 0;

```
// Lanzar 4dF
let diceSum = 0;
const diceArr = [];
for (let i = 0; i < 4; i++) {
    const r = Math.floor(Math.random() * 3) - 1;
    diceSum += r;
    diceArr.push(r);
}

const total = diceSum + skillBonus + aspectBonus + wandBonus + extraArte + opBonus;

// Mostrar resultado animado
renderRollResult(total, diceArr, {
    skillBonus, aspectBonus, wandBonus, extraArte, opBonus
});

// Comprobar si hay hechizo seleccionado para efectos
const spellEl = document.getElementById('spell-action-selector');
if (spellEl && spellEl.value) {
    const hechizo = GRIMORIO.find(h => h.nombre === spellEl.value);
    if (hechizo) {
        const btn = document.querySelector('.btn-roll');
        launchParticles(hechizo.tipo, btn);
        playSpellSound(hechizo.tipo);
    }
}
```

}

function renderRollResult(total, diceArr, bonuses) {
const faceMap = { ‘-1’: ‘[-]’, ‘0’: ‘[ ]’, ‘1’: ‘[+]’ };
const diceStr = diceArr.map(d => faceMap[d]).join(’ ’);
const diceSum = diceArr.reduce((a,b) => a+b, 0);

```
// Construir desglose
const lines = [];
lines.push(`🎲 Dados: ${diceSum >= 0 ? '+' : ''}${diceSum}`);
if (bonuses.skillBonus)  lines.push(`⚡ Habilidad: +${bonuses.skillBonus}`);
if (bonuses.aspectBonus) lines.push(`✦ Aspecto: +${bonuses.aspectBonus}`);
if (bonuses.wandBonus)   lines.push(`🪄 Varita: +${bonuses.wandBonus}`);
if (bonuses.extraArte)   lines.push(`📚 Arte extra: +${bonuses.extraArte}`);
if (bonuses.opBonus)     lines.push(`⚔️ Cond. oponente: +${bonuses.opBonus}`);

const scoreEl    = document.querySelector('.final-score');
const diceEl     = document.querySelector('.dice-icons');
const breakEl    = document.getElementById('roll-breakdown');

// Animación del número
scoreEl.classList.remove('score-pop');
void scoreEl.offsetWidth;
scoreEl.classList.add('score-pop');

scoreEl.innerText = (total > 0 ? '+' : '') + total;
diceEl.innerText  = diceStr;

if (breakEl) {
    breakEl.innerHTML = lines.map(l => `<span class="breakdown-line">${l}</span>`).join('');
    breakEl.style.display = lines.length > 1 ? 'flex' : 'none';
}

// Color del resultado
if (total >= 3)       scoreEl.style.color = 'var(--gold)';
else if (total >= 0)  scoreEl.style.color = 'var(--cream)';
else                  scoreEl.style.color = 'var(--blood-light)';
```

}

// ═══════════════════════════════════════════════════════
//  LIBRO DE HECHIZOS — hechizos aprendidos
// ═══════════════════════════════════════════════════════
function getHechizosAprendidos() {
return Array.from(document.querySelectorAll(’.spell-card’))
.map(c => c.dataset.nombre);
}

function renderHechizosAprendidos() {
const container = document.getElementById(‘spells-dynamic-list’);
const aprendidos = JSON.parse(localStorage.getItem(’_spells_temp’) || ‘[]’);
container.innerHTML = ‘’;
if (aprendidos.length === 0) {
container.innerHTML = ‘<p class="spell-empty">Aún no has aprendido ningún hechizo.<br>Abre el Grimorio para explorar.</p>’;
} else {
aprendidos.forEach(sp => renderSpellCard(sp, container));
}
// Actualizar selector de hechizo en la esfera
updateSpellActionSelector(aprendidos);
}

function updateSpellActionSelector(aprendidos) {
const sel = document.getElementById(‘spell-action-selector’);
if (!sel) return;
sel.innerHTML = ‘<option value="">— Sin hechizo —</option>’;
(aprendidos || []).forEach(sp => {
const opt = document.createElement(‘option’);
opt.value = sp.nombre;
opt.text  = `${sp.nombre} (${sp.tipo})`;
sel.add(opt);
});
}

function renderSpellCard(sp, container) {
const color = TIPO_COLORES[sp.tipo] || ‘#333’;
const estrellas = ‘★’.repeat(sp.dificultad) + ‘☆’.repeat(3 - sp.dificultad);
const div = document.createElement(‘div’);
div.className = ‘spell-card’;
div.dataset.nombre = sp.nombre;
div.innerHTML = `<div class="spell-card-header" style="border-left: 3px solid ${color}40; padding-left:10px;"> <div class="spell-card-top"> <span class="spell-card-name">${sp.nombre}</span> <button class="spell-forget-btn" onclick="olvidarHechizo('${sp.nombre}')" title="Olvidar hechizo">✕</button> </div> <div class="spell-card-meta"> <span class="spell-tipo-badge" style="background:${color}40;color:${color === '#3a3010' ? '#c9a84c' : lightenColor(color)}">${sp.tipo}</span> <span class="spell-stars">${estrellas}</span> </div> <p class="spell-card-efecto">${sp.efecto}</p> </div>`;
container.appendChild(div);
}

function lightenColor(hex) {
const map = {
‘#6b2020’: ‘#e87070’, ‘#1a3a5c’: ‘#70a8e8’, ‘#3a1a5c’: ‘#a870e8’,
‘#1a4a2a’: ‘#70c890’, ‘#3a3010’: ‘#c9a84c’, ‘#2a2a4a’: ‘#8888dd’,
‘#1a3a3a’: ‘#70c8c8’,
};
return map[hex] || ‘#e8dcc8’;
}

function olvidarHechizo(nombre) {
let aprendidos = getAprendidosData();
aprendidos = aprendidos.filter(s => s.nombre !== nombre);
saveAprendidos(aprendidos);
renderHechizosAprendidos();
}

function getAprendidosData() {
return JSON.parse(localStorage.getItem(’_spells_temp’) || ‘[]’);
}

function saveAprendidos(arr) {
localStorage.setItem(’_spells_temp’, JSON.stringify(arr));
}

// ═══════════════════════════════════════════════════════
//  GRIMORIO — panel de selección
// ═══════════════════════════════════════════════════════
function toggleGrimorio() {
const panel = document.getElementById(‘grimorio-panel’);
grimorioAbierto = !grimorioAbierto;
panel.classList.toggle(‘open’, grimorioAbierto);
if (grimorioAbierto) renderGrimorio();
}

function renderGrimorio() {
const { tipo, dificultad, busqueda } = grimorioFiltro;
const aprendidos = getAprendidosData().map(s => s.nombre);

```
const filtrados = GRIMORIO.filter(h => {
    if (tipo !== 'Todos' && h.tipo !== tipo) return false;
    if (dificultad > 0 && h.dificultad !== dificultad) return false;
    if (busqueda && !h.nombre.toLowerCase().includes(busqueda.toLowerCase())) return false;
    return true;
});

const lista = document.getElementById('grimorio-lista');
lista.innerHTML = '';

if (filtrados.length === 0) {
    lista.innerHTML = '<p class="spell-empty">Ningún hechizo coincide con los filtros.</p>';
    return;
}

filtrados.forEach(h => {
    const yaAprendido = aprendidos.includes(h.nombre);
    const color       = TIPO_COLORES[h.tipo] || '#333';
    const estrellas   = '★'.repeat(h.dificultad) + '☆'.repeat(3 - h.dificultad);
    const costoPD     = COSTO_DESTINO[h.dificultad];

    const div = document.createElement('div');
    div.className = 'grimorio-item' + (yaAprendido ? ' ya-aprendido' : '');
    div.innerHTML = `
        <div class="grimorio-item-left" style="border-left:3px solid ${color}60;padding-left:10px;">
            <div class="grimorio-item-top">
                <span class="spell-card-name">${h.nombre}</span>
                <span class="spell-stars">${estrellas}</span>
            </div>
            <div class="spell-card-meta">
                <span class="spell-tipo-badge" style="background:${color}40;color:${lightenColor(color)}">${h.tipo}</span>
                <span class="grimorio-dif">Dif. ${h.dificultad}</span>
            </div>
            <p class="spell-card-efecto">${h.efecto}</p>
        </div>
        ${yaAprendido
            ? `<div class="grimorio-aprendido-tag">✓ Aprendido</div>`
            : `<div class="grimorio-item-actions">
                   <button class="btn-aprender-reto" onclick="aprenderPorReto('${h.nombre}')" title="Superar un reto (tirada de dados)">
                       🎲 Reto<br><span style="font-size:0.65rem;opacity:0.7">Dif. ${h.dificultad}</span>
                   </button>
                   <button class="btn-aprender-pd" onclick="aprenderPorDestino('${h.nombre}')" title="Gastar Puntos de Destino">
                       ✦ ${costoPD} PD
                   </button>
               </div>`
        }
    `;
    lista.appendChild(div);
});
```

}

function setFiltroTipo(tipo) {
grimorioFiltro.tipo = tipo;
document.querySelectorAll(’.filtro-tipo-btn’).forEach(b => b.classList.toggle(‘active’, b.dataset.tipo === tipo));
renderGrimorio();
}

function setFiltroDif(dif) {
grimorioFiltro.dificultad = dif;
document.querySelectorAll(’.filtro-dif-btn’).forEach(b => b.classList.toggle(‘active’, parseInt(b.dataset.dif) === dif));
renderGrimorio();
}

function setBusqueda(val) {
grimorioFiltro.busqueda = val;
renderGrimorio();
}

// ═══════════════════════════════════════════════════════
//  APRENDIZAJE DE HECHIZOS
// ═══════════════════════════════════════════════════════
function aprenderPorReto(nombre) {
const hechizo = GRIMORIO.find(h => h.nombre === nombre);
if (!hechizo) return;

```
let sum = 0, dice = [];
for (let i = 0; i < 4; i++) {
    const r = Math.floor(Math.random() * 3) - 1;
    sum += r;
    dice.push(r === 1 ? '[+]' : r === -1 ? '[-]' : '[ ]');
}

const resultado = sum;
const exito     = resultado >= hechizo.dificultad;
const diceStr   = dice.join(' ');

const msg = exito
    ? `✨ ¡Éxito! (${resultado >= 0 ? '+' : ''}${resultado})\n${diceStr}\n\nHas aprendido ${nombre}.`
    : `💫 Fracaso (${resultado >= 0 ? '+' : ''}${resultado})\n${diceStr}\n\nNecesitabas ${hechizo.dificultad} o más.`;

showToast(msg, exito ? 'exito' : 'fallo');
if (exito) aprenderHechizo(hechizo);
```

}

function aprenderPorDestino(nombre) {
const hechizo  = GRIMORIO.find(h => h.nombre === nombre);
if (!hechizo) return;
const costo    = COSTO_DESTINO[hechizo.dificultad];
const fateEl   = document.getElementById(‘fate-display’);
const fateAct  = parseInt(fateEl.innerText) || 0;

```
if (fateAct < costo) {
    showToast(`✦ Necesitas ${costo} Puntos de Destino.\nTienes ${fateAct}.`, 'fallo');
    return;
}

fateEl.innerText = fateAct - costo;
aprenderHechizo(hechizo);
showToast(`✦ Gastaste ${costo} PD.\nHas aprendido ${nombre}.`, 'exito');
```

}

function aprenderHechizo(hechizo) {
const aprendidos = getAprendidosData();
if (aprendidos.find(s => s.nombre === hechizo.nombre)) return;
aprendidos.push(hechizo);
saveAprendidos(aprendidos);
renderHechizosAprendidos();
renderGrimorio();
}

// ═══════════════════════════════════════════════════════
//  TOAST
// ═══════════════════════════════════════════════════════
function showToast(msg, tipo = ‘neutro’) {
let toast = document.getElementById(‘spell-toast’);
if (!toast) {
toast = document.createElement(‘div’);
toast.id = ‘spell-toast’;
document.body.appendChild(toast);
}
toast.className = `spell-toast spell-toast-${tipo}`;
toast.innerText = msg;
toast.classList.add(‘visible’);
clearTimeout(toast._timer);
toast._timer = setTimeout(() => toast.classList.remove(‘visible’), 3200);
}

// ═══════════════════════════════════════════════════════
//  IMAGEN / DESTINO
// ═══════════════════════════════════════════════════════
function updateImage() {
const url = document.getElementById(‘char-img-url’).value;
document.getElementById(‘char-img-display’).src = url || ‘https://via.placeholder.com/150?text=Mago’;
}

function updateFate(val) {
const d = document.getElementById(‘fate-display’);
d.innerText = Math.max(0, parseInt(d.innerText) + val);
}

// ═══════════════════════════════════════════════════════
//  EXPORT / IMPORT JSON
// ═══════════════════════════════════════════════════════
function exportCharacter() {
const data = {
campaign:     document.getElementById(‘campaign-name’).value,
name:         document.getElementById(‘char-name’).value,
recovery:     document.getElementById(‘recovery-val’).value,
fate:         document.getElementById(‘fate-display’).innerText,
age:          document.getElementById(‘char-age’).value,
concept:      document.getElementById(‘char-concept’).value,
stunts:       document.getElementById(‘stunts-area’).value,
notes:        document.getElementById(‘notes-area’).value,
charImg:      document.getElementById(‘char-img-url’).value,
consequences: {
pMild: document.getElementById(‘phys-mild’).value,
pMod:  document.getElementById(‘phys-mod’).value,
pSev:  document.getElementById(‘phys-sev’).value,
mMild: document.getElementById(‘ment-mild’).value,
mMod:  document.getElementById(‘ment-mod’).value,
mSev:  document.getElementById(‘ment-sev’).value,
},
aspects: Array.from(document.querySelectorAll(’#aspects-dynamic-list .dynamic-row’))
.map(r => ({ t: r.querySelector(’.text-input’).value, m: r.querySelector(’.mod-input’).value })),
skills:  Array.from(document.querySelectorAll(’#skills-dynamic-list .dynamic-row’))
.map(r => ({ n: r.querySelector(’.skill-name-input’).value, v: r.querySelector(’.skill-val-input’).value })),
items:   Array.from(document.querySelectorAll(’#items-dynamic-list .dynamic-row’))
.map(r => ({ t: r.querySelector(’.text-input’).value, m: r.querySelector(’.mod-input’).value })),
spells:  getAprendidosData(),
};
const blob = new Blob([JSON.stringify(data, null, 2)], { type: ‘application/json’ });
const a = document.createElement(‘a’);
a.href = URL.createObjectURL(blob);
a.download = `${data.name || 'mago'}_${data.campaign || 'ficha'}.json`;
a.click();
}

function importCharacter(event) {
const reader = new FileReader();
reader.onload = (e) => {
const d = JSON.parse(e.target.result);
document.getElementById(‘campaign-name’).value  = d.campaign || ‘’;
document.getElementById(‘char-name’).value      = d.name     || ‘’;
document.getElementById(‘char-age’).value       = d.age      || ‘’;
document.getElementById(‘char-concept’).value   = d.concept  || ‘’;
document.getElementById(‘recovery-val’).value   = d.recovery || 0;
document.getElementById(‘fate-display’).innerText = d.fate   || 3;
document.getElementById(‘stunts-area’).value    = d.stunts   || ‘’;
document.getElementById(‘notes-area’).value     = d.notes    || ‘’;
document.getElementById(‘char-img-url’).value   = d.charImg  || ‘’;

```
    if (d.consequences) {
        document.getElementById('phys-mild').value = d.consequences.pMild || '';
        document.getElementById('phys-mod').value  = d.consequences.pMod  || '';
        document.getElementById('phys-sev').value  = d.consequences.pSev  || '';
        document.getElementById('ment-mild').value = d.consequences.mMild || '';
        document.getElementById('ment-mod').value  = d.consequences.mMod  || '';
        document.getElementById('ment-sev').value  = d.consequences.mSev  || '';
    }

    document.getElementById('aspects-dynamic-list').innerHTML = '';
    if (d.aspects) d.aspects.forEach(a => addAspect(a.t, a.m));

    document.getElementById('skills-dynamic-list').innerHTML = '';
    if (d.skills) d.skills.forEach(s => addSkill(s.n, s.v));

    document.getElementById('items-dynamic-list').innerHTML = '';
    if (d.items) d.items.forEach(i => addItem(i.t, i.m));

    saveAprendidos(d.spells || []);
    renderHechizosAprendidos();
    updateImage();
    updateSkillBudget();
};
reader.readAsText(event.target.files[0]);
```

}

// ═══════════════════════════════════════════════════════
//  INIT
// ═══════════════════════════════════════════════════════
document.addEventListener(‘DOMContentLoaded’, () => {
if (document.getElementById(‘aspects-dynamic-list’).children.length === 0) {
addAspect(‘Aspecto Definidor’, 0);
}
renderHechizosAprendidos();
updateSkillSelector();
});