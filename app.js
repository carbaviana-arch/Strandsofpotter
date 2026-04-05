// ═══════════════════════════════════════════════════════
//  STRANDS OF FATE — v8.0
// ═══════════════════════════════════════════════════════

// ── ARTES ARCANAS ────────────────────────────────────────
const ARTES_ARCANAS = [
    { nombre: 'Encantamientos (Charms)',               descripcion: 'Magia que añade propiedades sin cambiar la esencia.',    dificultad: 1 },
    { nombre: 'Transformaciones (Transfiguration)',    descripcion: 'Cambia la forma o naturaleza de objetos y seres.',        dificultad: 3 },
    { nombre: 'Pociones (Potions)',                    descripcion: 'Elaboración de mezclas mágicas con efectos variados.',    dificultad: 2 },
    { nombre: 'Defensa Contra las Artes Oscuras',      descripcion: 'Protección frente a magia oscura y criaturas.',           dificultad: 2 },
    { nombre: 'Artes Oscuras (Dark Arts)',             descripcion: 'Magia dañina o prohibida.',                               dificultad: 3 },
    { nombre: 'Oclumancia',                            descripcion: 'Protección de la mente contra invasiones.',               dificultad: 3 },
    { nombre: 'Legeremancia',                          descripcion: 'Lectura de la mente de otros.',                           dificultad: 3 },
    { nombre: 'Herbología (Herbology)',                descripcion: 'Estudio de plantas mágicas.',                             dificultad: 1 },
    { nombre: 'Cuidado de Criaturas Mágicas',          descripcion: 'Manejo de animales mágicos.',                             dificultad: 1 },
    { nombre: 'Aritmancia (Arithmancy)',               descripcion: 'Magia basada en números.',                                dificultad: 2 },
    { nombre: 'Adivinación (Divination)',              descripcion: 'Predicción del futuro.',                                  dificultad: 2 },
    { nombre: 'Runas Antiguas (Ancient Runes)',        descripcion: 'Lenguajes mágicos antiguos.',                             dificultad: 2 },
    { nombre: 'Vuelo (Flying)',                        descripcion: 'Uso de escobas y vuelo mágico.',                          dificultad: 1 },
];

// ── VARITAS MÁGICAS ──────────────────────────────────────
const VARITAS = [
    { madera:'Roble',  nucleo:'Pluma de fénix',           decoracion:'Empuñadura de plata grabada', ventajas:['+1 defensa','+3 control'] },
    { madera:'Roble',  nucleo:'Pluma de fénix',           decoracion:'Incrustaciones de cristal',   ventajas:['+1 ataque','+1 defensa','+2 control'] },
    { madera:'Roble',  nucleo:'Pluma de fénix',           decoracion:'Runas talladas',              ventajas:['+2 defensa','+2 control'] },
    { madera:'Roble',  nucleo:'Fibra de corazón de dragón', decoracion:'Empuñadura de plata grabada', ventajas:['+2 ataque','+1 defensa','+1 control'] },
    { madera:'Roble',  nucleo:'Fibra de corazón de dragón', decoracion:'Incrustaciones de cristal', ventajas:['+3 ataque','+1 defensa'] },
    { madera:'Roble',  nucleo:'Fibra de corazón de dragón', decoracion:'Runas talladas',            ventajas:['+2 ataque','+2 defensa'] },
    { madera:'Roble',  nucleo:'Pelo de unicornio',        decoracion:'Empuñadura de plata grabada', ventajas:['+3 defensa','+1 control'] },
    { madera:'Roble',  nucleo:'Pelo de unicornio',        decoracion:'Incrustaciones de cristal',   ventajas:['+1 ataque','+3 defensa'] },
    { madera:'Roble',  nucleo:'Pelo de unicornio',        decoracion:'Runas talladas',              ventajas:['+4 defensa'] },
    { madera:'Acebo',  nucleo:'Pluma de fénix',           decoracion:'Empuñadura de plata grabada', ventajas:['+1 defensa','+4 control'] },
    { madera:'Acebo',  nucleo:'Pluma de fénix',           decoracion:'Incrustaciones de cristal',   ventajas:['+1 ataque','+1 defensa','+3 control'] },
    { madera:'Acebo',  nucleo:'Pluma de fénix',           decoracion:'Runas talladas',              ventajas:['+2 defensa','+3 control'] },
    { madera:'Acebo',  nucleo:'Fibra de corazón de dragón', decoracion:'Empuñadura de plata grabada', ventajas:['+2 ataque','+1 defensa','+2 control'] },
    { madera:'Acebo',  nucleo:'Fibra de corazón de dragón', decoracion:'Incrustaciones de cristal', ventajas:['+3 ataque','+1 defensa','+1 control'] },
    { madera:'Acebo',  nucleo:'Fibra de corazón de dragón', decoracion:'Runas talladas',            ventajas:['+2 ataque','+2 defensa','+1 control'] },
    { madera:'Acebo',  nucleo:'Pelo de unicornio',        decoracion:'Empuñadura de plata grabada', ventajas:['+3 defensa','+2 control'] },
    { madera:'Acebo',  nucleo:'Pelo de unicornio',        decoracion:'Incrustaciones de cristal',   ventajas:['+1 ataque','+3 defensa','+1 control'] },
    { madera:'Acebo',  nucleo:'Pelo de unicornio',        decoracion:'Runas talladas',              ventajas:['+4 defensa','+1 control'] },
    { madera:'Sauce', nucleo:'Pluma de fénix',            decoracion:'Empuñadura de plata grabada', ventajas:['+5 control'] },
    { madera:'Sauce', nucleo:'Pluma de fénix',            decoracion:'Incrustaciones de cristal',   ventajas:['+1 ataque','+4 control'] },
    { madera:'Sauce', nucleo:'Pluma de fénix',            decoracion:'Runas talladas',              ventajas:['+1 defensa','+4 control'] },
    { madera:'Sauce', nucleo:'Fibra de corazón de dragón', decoracion:'Empuñadura de plata grabada', ventajas:['+2 ataque','+3 control'] },
    { madera:'Sauce', nucleo:'Fibra de corazón de dragón', decoracion:'Incrustaciones de cristal',  ventajas:['+3 ataque','+2 control'] },
    { madera:'Sauce', nucleo:'Fibra de corazón de dragón', decoracion:'Runas talladas',             ventajas:['+2 ataque','+1 defensa','+2 control'] },
    { madera:'Sauce', nucleo:'Pelo de unicornio',         decoracion:'Empuñadura de plata grabada', ventajas:['+2 defensa','+3 control'] },
    { madera:'Sauce', nucleo:'Pelo de unicornio',         decoracion:'Incrustaciones de cristal',   ventajas:['+1 ataque','+2 defensa','+2 control'] },
    { madera:'Sauce', nucleo:'Pelo de unicornio',         decoracion:'Runas talladas',              ventajas:['+3 defensa','+2 control'] },
];

// ── HABILIDADES ──────────────────────────────────────────
const HABILIDADES_DEF = [
    // Físicas
    { key:'atletismo',   label:'Atletismo',    grupo:'Físicas' },
    { key:'combate',     label:'Combate',      grupo:'Físicas' },
    { key:'sigilo',      label:'Sigilo',       grupo:'Físicas' },
    { key:'resistencia', label:'Resistencia',  grupo:'Físicas' },
    // Mentales
    { key:'conocimiento',label:'Conocimiento', grupo:'Mentales' },
    { key:'percepcion',  label:'Percepción',   grupo:'Mentales' },
    { key:'voluntad',    label:'Voluntad',     grupo:'Mentales' },
    { key:'social',      label:'Social',       grupo:'Mentales' },
];

const NIVELES_HAB = [
    { valor:0, nombre:'Sin entrenar' },
    { valor:1, nombre:'Aprendiz' },
    { valor:2, nombre:'Alumno' },
    { valor:3, nombre:'Avanzado' },
    { valor:4, nombre:'Mago' },
    { valor:5, nombre:'Auror' },
];

// ── GRIMORIO ─────────────────────────────────────────────
const GRIMORIO = [
    { nombre:'Accio',               efecto:'Invoca objetos hacia el mago',              dificultad:2, tipo:'Utilidad' },
    { nombre:'Aguamenti',           efecto:'Genera agua',                               dificultad:2, tipo:'Utilidad' },
    { nombre:'Alohomora',           efecto:'Abre cerraduras',                           dificultad:1, tipo:'Utilidad' },
    { nombre:'Anapneo',             efecto:'Desobstruye vías respiratorias',             dificultad:2, tipo:'Curación' },
    { nombre:'Apparate',            efecto:'Teletransporte',                            dificultad:3, tipo:'Transporte' },
    { nombre:'Ascendio',            efecto:'Impulsa hacia arriba',                      dificultad:2, tipo:'Utilidad' },
    { nombre:'Avada Kedavra',       efecto:'Maldición asesina',                         dificultad:3, tipo:'Ataque' },
    { nombre:'Bombarda',            efecto:'Provoca explosión',                         dificultad:2, tipo:'Ataque' },
    { nombre:'Brackium Emendo',     efecto:'Repara huesos (puede fallar)',               dificultad:3, tipo:'Curación' },
    { nombre:'Capacious Extremis',  efecto:'Expande capacidad interna',                 dificultad:3, tipo:'Utilidad' },
    { nombre:'Colloportus',         efecto:'Sella puertas',                             dificultad:2, tipo:'Defensivo' },
    { nombre:'Confundo',            efecto:'Confunde a la víctima',                     dificultad:2, tipo:'Control' },
    { nombre:'Confringo',           efecto:'Maldición explosiva',                       dificultad:3, tipo:'Ataque' },
    { nombre:'Crucio',              efecto:'Maldición de tortura',                      dificultad:3, tipo:'Ataque' },
    { nombre:'Depulso',             efecto:'Empuja objetos',                            dificultad:2, tipo:'Ataque' },
    { nombre:'Diffindo',            efecto:'Corta objetos',                             dificultad:2, tipo:'Ataque' },
    { nombre:'Dissendium',          efecto:'Abre pasajes secretos',                     dificultad:2, tipo:'Utilidad' },
    { nombre:'Engorgio',            efecto:'Aumenta tamaño',                            dificultad:2, tipo:'Transformación' },
    { nombre:'Episkey',             efecto:'Cura heridas leves',                        dificultad:1, tipo:'Curación' },
    { nombre:'Expecto Patronum',    efecto:'Invoca Patronus',                           dificultad:3, tipo:'Defensivo' },
    { nombre:'Expelliarmus',        efecto:'Desarma al oponente',                       dificultad:1, tipo:'Defensivo' },
    { nombre:'Expulso',             efecto:'Explosión violenta',                        dificultad:3, tipo:'Ataque' },
    { nombre:'Ferula',              efecto:'Crea vendajes',                             dificultad:1, tipo:'Curación' },
    { nombre:'Fidelius Charm',      efecto:'Oculta información en guardián secreto',    dificultad:3, tipo:'Defensivo' },
    { nombre:'Finite Incantatem',   efecto:'Detiene hechizos',                         dificultad:2, tipo:'Defensivo' },
    { nombre:'Flagrate',            efecto:'Dibuja fuego en el aire',                   dificultad:2, tipo:'Utilidad' },
    { nombre:'Flipendo',            efecto:'Empuja / derriba',                          dificultad:1, tipo:'Ataque' },
    { nombre:'Furnunculus',         efecto:'Provoca erupciones',                        dificultad:2, tipo:'Ataque' },
    { nombre:'Geminio',             efecto:'Duplica objetos',                           dificultad:3, tipo:'Transformación' },
    { nombre:'Glisseo',             efecto:'Convierte escaleras en rampas',             dificultad:3, tipo:'Transformación' },
    { nombre:'Homenum Revelio',     efecto:'Detecta presencia humana',                  dificultad:2, tipo:'Utilidad' },
    { nombre:'Impedimenta',         efecto:'Ralentiza enemigos',                        dificultad:2, tipo:'Defensivo' },
    { nombre:'Imperio',             efecto:'Control mental',                            dificultad:3, tipo:'Control' },
    { nombre:'Impervius',           efecto:'Repele agua',                               dificultad:1, tipo:'Defensivo' },
    { nombre:'Incendio',            efecto:'Produce fuego',                             dificultad:1, tipo:'Ataque' },
    { nombre:'Langlock',            efecto:'Bloquea la lengua',                         dificultad:2, tipo:'Control' },
    { nombre:'Legilimens',          efecto:'Lee la mente',                              dificultad:3, tipo:'Control' },
    { nombre:'Levicorpus',          efecto:'Suspende a la víctima boca abajo',          dificultad:2, tipo:'Control' },
    { nombre:'Liberacorpus',        efecto:'Contraconjuro de Levicorpus',               dificultad:2, tipo:'Defensivo' },
    { nombre:'Locomotor',           efecto:'Mueve objetos',                             dificultad:2, tipo:'Utilidad' },
    { nombre:'Lumos',               efecto:'Ilumina la varita',                         dificultad:1, tipo:'Utilidad' },
    { nombre:'Muffliato',           efecto:'Bloquea sonido alrededor',                  dificultad:2, tipo:'Defensivo' },
    { nombre:'Nox',                 efecto:'Apaga la luz de Lumos',                     dificultad:1, tipo:'Utilidad' },
    { nombre:'Obliviate',           efecto:'Borra recuerdos',                           dificultad:3, tipo:'Control' },
    { nombre:'Oppugno',             efecto:'Ordena atacar a objetos',                   dificultad:2, tipo:'Ataque' },
    { nombre:'Petrificus Totalus',  efecto:'Paraliza completamente',                    dificultad:2, tipo:'Control' },
    { nombre:'Piertotum Locomotor', efecto:'Da vida a estatuas',                        dificultad:3, tipo:'Transformación' },
    { nombre:'Protego',             efecto:'Escudo mágico',                             dificultad:2, tipo:'Defensivo' },
    { nombre:'Protego Maxima',      efecto:'Escudo avanzado',                           dificultad:3, tipo:'Defensivo' },
    { nombre:'Reducio',             efecto:'Reduce tamaño',                             dificultad:2, tipo:'Transformación' },
    { nombre:'Reducto',             efecto:'Desintegra objetos',                        dificultad:3, tipo:'Ataque' },
    { nombre:'Reparo',              efecto:'Repara objetos',                            dificultad:1, tipo:'Utilidad' },
    { nombre:'Rictusempra',         efecto:'Provoca cosquillas',                        dificultad:1, tipo:'Control' },
    { nombre:'Ridikulus',           efecto:'Neutraliza boggart',                        dificultad:2, tipo:'Defensivo' },
    { nombre:'Scourgify',           efecto:'Limpieza mágica',                          dificultad:1, tipo:'Utilidad' },
    { nombre:'Sectumsempra',        efecto:'Causa cortes graves',                       dificultad:3, tipo:'Ataque' },
    { nombre:'Serpensortia',        efecto:'Invoca serpiente',                          dificultad:2, tipo:'Ataque' },
    { nombre:'Silencio',            efecto:'Silencia objetivo',                         dificultad:2, tipo:'Control' },
    { nombre:'Sonorus',             efecto:'Amplifica voz',                             dificultad:1, tipo:'Utilidad' },
    { nombre:'Specialis Revelio',   efecto:'Revela propiedades mágicas',                dificultad:3, tipo:'Utilidad' },
    { nombre:'Stupefy',             efecto:'Aturde',                                    dificultad:2, tipo:'Ataque' },
    { nombre:'Tarantallegra',       efecto:'Hace bailar sin control',                   dificultad:2, tipo:'Control' },
    { nombre:'Wingardium Leviosa',  efecto:'Levita objetos',                            dificultad:1, tipo:'Utilidad' },
];

const TIPO_COLORES = {
    'Ataque':        '#6b2020', 'Defensivo':'#1a3a5c', 'Control':  '#3a1a5c',
    'Curación':      '#1a4a2a', 'Utilidad': '#3a3010', 'Transformación':'#2a2a4a',
    'Transporte':    '#1a3a3a',
};
const COSTO_DESTINO = { 1:1, 2:2, 3:3 };

// ── ESTADO ───────────────────────────────────────────────
let grimorioFiltro  = { tipo:'Todos', dificultad:0, busqueda:'' };
let grimorioAbierto = false;
let spellsAprendidos = [];   // fuente de verdad en memoria

// ── AUDIO ─────────────────────────────────────────────────
const AudioCtx = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

function getAudioCtx() {
    if (!audioCtx) audioCtx = new AudioCtx();
    return audioCtx;
}

function playDiceSound(resultado) {
    try {
        const ctx = getAudioCtx();
        const t = ctx.currentTime;
        // Oscilador base — varita zumbando
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        if (resultado >= 3) {
            osc.frequency.setValueAtTime(440, t);
            osc.frequency.exponentialRampToValueAtTime(880, t + 0.3);
            gain.gain.setValueAtTime(0.3, t);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.8);
        } else if (resultado <= -1) {
            osc.frequency.setValueAtTime(300, t);
            osc.frequency.exponentialRampToValueAtTime(150, t + 0.4);
            gain.gain.setValueAtTime(0.25, t);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.7);
        } else {
            osc.frequency.setValueAtTime(330, t);
            osc.frequency.exponentialRampToValueAtTime(550, t + 0.2);
            gain.gain.setValueAtTime(0.2, t);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
        }
        osc.start(t);
        osc.stop(t + 1);
    } catch(e) {}
}

function playLearnSound(exito) {
    try {
        const ctx = getAudioCtx();
        const t = ctx.currentTime;
        [0, 0.15, 0.3].forEach((delay, i) => {
            const osc  = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = exito ? 'sine' : 'sawtooth';
            const freqs = exito ? [523, 659, 784] : [220, 196, 175];
            osc.frequency.setValueAtTime(freqs[i], t + delay);
            gain.gain.setValueAtTime(0.2, t + delay);
            gain.gain.exponentialRampToValueAtTime(0.001, t + delay + 0.3);
            osc.start(t + delay);
            osc.stop(t + delay + 0.35);
        });
    } catch(e) {}
}

// ═══════════════════════════════════════════════════════
//  NAVEGACIÓN
// ═══════════════════════════════════════════════════════
function showTab(tabId, element) {
    const targetBtn = element.closest('.tab-item');
    if (!targetBtn) return;
    document.querySelectorAll('.app-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.tab-item').forEach(b => b.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    targetBtn.classList.add('active');
    if (tabId === 'lanzar') buildRollPanel();
}

// ═══════════════════════════════════════════════════════
//  HABILIDADES — sección en Perfil
// ═══════════════════════════════════════════════════════
function buildHabilidades() {
    const container = document.getElementById('habilidades-container');
    container.innerHTML = '';
    ['Físicas','Mentales'].forEach(grupo => {
        const groupDiv = document.createElement('div');
        groupDiv.className = 'hab-group';
        groupDiv.innerHTML = `<div class="hab-group-label">${grupo}</div>`;
        HABILIDADES_DEF.filter(h => h.grupo === grupo).forEach(h => {
            const row = document.createElement('div');
            row.className = 'hab-row';
            const opts = NIVELES_HAB.map(n =>
                `<option value="${n.valor}">${n.nombre}${n.valor > 0 ? ' (+'+n.valor+')' : ''}</option>`
            ).join('');
            row.innerHTML = `
                <label class="hab-label">${h.label}</label>
                <select class="hab-select" id="hab-${h.key}" onchange="updateRollPanel()">
                    ${opts}
                </select>
            `;
            groupDiv.appendChild(row);
        });
        container.appendChild(groupDiv);
    });
}

function getHabilidadesData() {
    const data = {};
    HABILIDADES_DEF.forEach(h => {
        const el = document.getElementById('hab-' + h.key);
        data[h.key] = el ? parseInt(el.value) || 0 : 0;
    });
    return data;
}

function setHabilidadesData(data) {
    if (!data) return;
    HABILIDADES_DEF.forEach(h => {
        const el = document.getElementById('hab-' + h.key);
        if (el && data[h.key] !== undefined) el.value = data[h.key];
    });
}

// ═══════════════════════════════════════════════════════
//  ASPECTOS — 5 fijos (4 positivos + 1 desventaja)
// ═══════════════════════════════════════════════════════
const ASPECT_DEFS = [
    { id:'asp-0', placeholder:'Aspecto Definidor',    tipo:'positivo' },
    { id:'asp-1', placeholder:'Aspecto de Trasfondo', tipo:'positivo' },
    { id:'asp-2', placeholder:'Aspecto de Conflicto', tipo:'positivo' },
    { id:'asp-3', placeholder:'Aspecto Libre',        tipo:'positivo' },
    { id:'asp-4', placeholder:'Desventaja',           tipo:'negativo' },
];

function buildAspectos() {
    const container = document.getElementById('aspects-dynamic-list');
    container.innerHTML = '';
    ASPECT_DEFS.forEach(def => {
        const div = document.createElement('div');
        div.className = 'dynamic-row aspect-fixed' + (def.tipo === 'negativo' ? ' aspect-negativo' : '');
        div.innerHTML = `
            <div class="aspect-tipo-badge">${def.tipo === 'negativo' ? '⚠ Desventaja' : '✦'}</div>
            <input type="text" class="text-input" id="${def.id}" placeholder="${def.placeholder}" style="flex:1">
            <input type="number" class="mod-input" id="${def.id}-mod" value="0" min="-5" max="5">
        `;
        container.appendChild(div);
    });
}

function getAspectosData() {
    return ASPECT_DEFS.map(def => ({
        t: document.getElementById(def.id)?.value || '',
        m: parseInt(document.getElementById(def.id + '-mod')?.value) || 0,
        tipo: def.tipo,
    }));
}

function setAspectosData(arr) {
    if (!arr) return;
    arr.forEach((a, i) => {
        if (!ASPECT_DEFS[i]) return;
        const id = ASPECT_DEFS[i].id;
        const el = document.getElementById(id);
        const mel = document.getElementById(id + '-mod');
        if (el) el.value = a.t || '';
        if (mel) mel.value = a.m || 0;
    });
}

// ═══════════════════════════════════════════════════════
//  ARTES ARCANAS — 5 slots con selector
// ═══════════════════════════════════════════════════════
function buildArtesArcanas() {
    const container = document.getElementById('skills-dynamic-list');
    container.innerHTML = '';
    for (let i = 0; i < 5; i++) {
        const div = document.createElement('div');
        div.className = 'dynamic-row arte-slot';
        const opts = `<option value="">— Selecciona Arte —</option>` +
            ARTES_ARCANAS.map(a =>
                `<option value="${a.nombre}" data-dif="${a.dificultad}">${a.nombre} (Dif. ${a.dificultad})</option>`
            ).join('');
        div.innerHTML = `
            <div class="arte-select-wrap" style="flex:1;min-width:0">
                <select class="arte-select" id="arte-${i}" onchange="onArteChange(${i})">
                    ${opts}
                </select>
                <div class="arte-desc" id="arte-desc-${i}"></div>
            </div>
            <input type="number" class="skill-val-input arte-nivel" id="arte-nivel-${i}" value="0" min="0" max="5" style="width:55px" oninput="updateSkillBudget()">
        `;
        container.appendChild(div);
    }
    updateSkillBudget();
}

function onArteChange(i) {
    const sel = document.getElementById('arte-' + i);
    const desc = document.getElementById('arte-desc-' + i);
    const arte = ARTES_ARCANAS.find(a => a.nombre === sel.value);
    desc.textContent = arte ? arte.descripcion : '';
    updateSkillBudget();
    buildRollPanel();
}

function getArtesData() {
    const arr = [];
    for (let i = 0; i < 5; i++) {
        const sel = document.getElementById('arte-' + i);
        const niv = document.getElementById('arte-nivel-' + i);
        arr.push({ n: sel?.value || '', v: parseInt(niv?.value) || 0 });
    }
    return arr;
}

function setArtesData(arr) {
    if (!arr) return;
    arr.forEach((a, i) => {
        if (i >= 5) return;
        const sel = document.getElementById('arte-' + i);
        const niv = document.getElementById('arte-nivel-' + i);
        if (sel) { sel.value = a.n || ''; onArteChange(i); }
        if (niv) niv.value = a.v || 0;
    });
    updateSkillBudget();
}

function updateSkillBudget() {
    const recovery = parseInt(document.getElementById('recovery-val').value) || 0;
    let spent = 0;
    document.querySelectorAll('.arte-nivel').forEach(s => spent += parseInt(s.value) || 0);
    const total = recovery - spent;
    const span = document.getElementById('skill-budget');
    if (span) {
        span.innerText = total;
        span.style.color = total < 0 ? 'var(--blood-light)' : 'inherit';
    }
    buildRollPanel();
}

// ═══════════════════════════════════════════════════════
//  VARITA — 1 slot con selector
// ═══════════════════════════════════════════════════════
function buildVaritaSelector() {
    const container = document.getElementById('varita-container');
    container.innerHTML = '';
    const opts = `<option value="-1">— Elige tu varita —</option>` +
        VARITAS.map((v, i) =>
            `<option value="${i}">${v.madera} · ${v.nucleo} · ${v.decoracion}</option>`
        ).join('');
    container.innerHTML = `
        <select id="varita-select" class="varita-select" onchange="onVaritaChange()">
            ${opts}
        </select>
        <div id="varita-ventajas" class="varita-ventajas"></div>
    `;
}

function onVaritaChange() {
    const idx = parseInt(document.getElementById('varita-select').value);
    const panel = document.getElementById('varita-ventajas');
    if (idx < 0 || isNaN(idx)) { panel.innerHTML = ''; buildRollPanel(); return; }
    const v = VARITAS[idx];
    panel.innerHTML = `
        <div class="varita-info">
            <span class="varita-detail">🪄 ${v.madera}</span>
            <span class="varita-detail">✦ ${v.nucleo}</span>
            <span class="varita-detail">💎 ${v.decoracion}</span>
        </div>
        <div class="varita-tags">
            ${v.ventajas.map(vt => `<span class="varita-tag">${vt}</span>`).join('')}
        </div>
    `;
    buildRollPanel();
}

function getVaritaData() {
    const sel = document.getElementById('varita-select');
    return sel ? parseInt(sel.value) : -1;
}

function getVaritaBonusTotal() {
    const idx = getVaritaData();
    if (idx < 0) return 0;
    const v = VARITAS[idx];
    let total = 0;
    v.ventajas.forEach(vent => {
        const m = vent.match(/\+(\d+)/);
        if (m) total += parseInt(m[1]);
    });
    return total;
}

// ═══════════════════════════════════════════════════════
//  PANEL DE TIRADA — Esfera de Adivinación
// ═══════════════════════════════════════════════════════
function buildRollPanel() {
    buildSkillSelector();
    buildRollModifiers();
}

function buildSkillSelector() {
    const selector = document.getElementById('skill-selector');
    if (!selector) return;
    selector.innerHTML = '<option value="0">Concentración (+0)</option>';
    for (let i = 0; i < 5; i++) {
        const sel = document.getElementById('arte-' + i);
        const niv = document.getElementById('arte-nivel-' + i);
        if (sel && sel.value) {
            const opt = document.createElement('option');
            opt.value = niv ? (parseInt(niv.value) || 0) : 0;
            opt.text  = `${sel.value} (+${opt.value})`;
            selector.add(opt);
        }
    }
}

function buildRollModifiers() {
    const panel = document.getElementById('roll-modifiers');
    if (!panel) return;
    panel.innerHTML = '';

    // Aspecto definidor
    const asp0 = document.getElementById('asp-0');
    const asp0mod = document.getElementById('asp-0-mod');
    const aspVal = asp0mod ? parseInt(asp0mod.value) || 0 : 0;
    const aspName = asp0 ? (asp0.value || 'Aspecto Definidor') : 'Aspecto Definidor';
    panel.innerHTML += `
        <div class="mod-row">
            <label class="mod-label">✦ ${aspName}</label>
            <input type="number" class="mod-input-roll" id="rm-aspecto" value="${aspVal}" readonly>
        </div>`;

    // Arte seleccionada — se actualiza al cambiar el select
    panel.innerHTML += `
        <div class="mod-row">
            <label class="mod-label">🔮 Arte Arcana</label>
            <input type="number" class="mod-input-roll" id="rm-arte" value="0" readonly>
        </div>`;

    // Hechizo aprendido
    const hechizosOpts = `<option value="0">— Sin hechizo —</option>` +
        spellsAprendidos.map(s =>
            `<option value="${s.dificultad}">${s.nombre} (Dif. ${s.dificultad})</option>`
        ).join('');
    panel.innerHTML += `
        <div class="mod-row">
            <label class="mod-label">📖 Hechizo</label>
            <select class="mod-select-roll" id="rm-hechizo" onchange="updateRollTotals()">
                ${hechizosOpts}
            </select>
        </div>`;

    // Varita
    const varitaBonus = getVaritaBonusTotal();
    const varitaLabel = getVaritaData() >= 0
        ? `🪄 ${VARITAS[getVaritaData()].madera}`
        : '🪄 Varita';
    panel.innerHTML += `
        <div class="mod-row">
            <label class="mod-label">${varitaLabel}</label>
            <input type="number" class="mod-input-roll" id="rm-varita" value="${varitaBonus}" readonly>
        </div>`;

    // Punto de Destino (opcional)
    panel.innerHTML += `
        <div class="mod-row mod-row-pd">
            <label class="mod-label">
                <input type="checkbox" id="rm-pd-check" onchange="updateRollTotals()">
                ✦ Punto de Destino
                <span class="pd-available">(Disponibles: <span id="rm-pd-count">${document.getElementById('fate-display')?.innerText || 0}</span>)</span>
            </label>
            <input type="number" class="mod-input-roll" id="rm-pd" value="1" readonly>
        </div>`;

    panel.innerHTML += `<div class="mod-total-row"><span>Total modificadores</span><span id="rm-total" class="mod-total-val">+0</span></div>`;

    // Sync arte selector
    document.getElementById('skill-selector')?.addEventListener('change', updateRollTotals);
    updateRollTotals();
}

function updateRollTotals() {
    const arteVal  = parseInt(document.getElementById('skill-selector')?.value) || 0;
    const arteEl   = document.getElementById('rm-arte');
    if (arteEl) arteEl.value = arteVal;

    const aspVal   = parseInt(document.getElementById('rm-aspecto')?.value)  || 0;
    const hecVal   = parseInt(document.getElementById('rm-hechizo')?.value)   || 0;
    const varVal   = parseInt(document.getElementById('rm-varita')?.value)    || 0;
    const pdCheck  = document.getElementById('rm-pd-check')?.checked;
    const pdVal    = pdCheck ? 1 : 0;

    // Actualizar count de PD
    const pdCount = document.getElementById('rm-pd-count');
    if (pdCount) pdCount.textContent = document.getElementById('fate-display')?.innerText || 0;

    const total    = arteVal + aspVal + hecVal + varVal + pdVal;
    const totalEl  = document.getElementById('rm-total');
    if (totalEl) totalEl.textContent = (total >= 0 ? '+' : '') + total;
}

function updateRollPanel() { buildRollPanel(); }

// ═══════════════════════════════════════════════════════
//  DADOS
// ═══════════════════════════════════════════════════════
function executeSelectedRoll() {
    const arteMod  = parseInt(document.getElementById('skill-selector')?.value) || 0;
    const aspMod   = parseInt(document.getElementById('rm-aspecto')?.value)     || 0;
    const hecMod   = parseInt(document.getElementById('rm-hechizo')?.value)     || 0;
    const varMod   = parseInt(document.getElementById('rm-varita')?.value)      || 0;
    const pdCheck  = document.getElementById('rm-pd-check')?.checked;

    // Consumir PD si aplica
    if (pdCheck) {
        const fateEl = document.getElementById('fate-display');
        const fateVal = parseInt(fateEl?.innerText) || 0;
        if (fateVal < 1) {
            showToast('✦ No tienes Puntos de Destino disponibles.', 'fallo');
            document.getElementById('rm-pd-check').checked = false;
            updateRollTotals();
            return;
        }
        fateEl.innerText = fateVal - 1;
        updateRollTotals();
    }
    const pdMod = pdCheck ? 1 : 0;

    let sum = 0, dice = [];
    for (let i = 0; i < 4; i++) {
        const r = Math.floor(Math.random() * 3) - 1;
        sum += r;
        dice.push(r === 1 ? '[+]' : r === -1 ? '[-]' : '[  ]');
    }

    const bonus = arteMod + aspMod + hecMod + varMod + pdMod;
    const final = sum + bonus;

    // Animación dados
    animateDice(dice, final, bonus);
    playDiceSound(final);
}

function animateDice(diceArr, final, bonus) {
    const resultDiv = document.getElementById('dice-result-v2');
    const scoreEl   = resultDiv.querySelector('.final-score');
    const iconsEl   = resultDiv.querySelector('.dice-icons');
    const breakdownEl = document.getElementById('roll-breakdown');

    // Fase de animación
    scoreEl.classList.add('rolling');
    iconsEl.classList.add('rolling');
    let frame = 0;
    const interval = setInterval(() => {
        const tmp = [];
        let tmpSum = 0;
        for (let i = 0; i < 4; i++) {
            const r = Math.floor(Math.random() * 3) - 1;
            tmpSum += r;
            tmp.push(r === 1 ? '[+]' : r === -1 ? '[-]' : '[  ]');
        }
        iconsEl.textContent = tmp.join(' ');
        scoreEl.textContent = (tmpSum + bonus >= 0 ? '+' : '') + (tmpSum + bonus);
        frame++;
        if (frame >= 8) {
            clearInterval(interval);
            scoreEl.classList.remove('rolling');
            iconsEl.classList.remove('rolling');
            // Resultado real
            iconsEl.textContent = diceArr.join(' ');
            scoreEl.textContent = (final >= 0 ? '+' : '') + final;
            scoreEl.className = 'final-score ' + getRollClass(final);
            if (breakdownEl) {
                breakdownEl.textContent = `Dados: ${diceArr.join(' ')} | Mods: ${bonus >= 0 ? '+' : ''}${bonus} = ${final >= 0 ? '+' : ''}${final}`;
            }
        }
    }, 80);
}

function getRollClass(val) {
    if (val >= 3) return 'roll-exito';
    if (val >= 1) return 'roll-neutral';
    return 'roll-fallo';
}

// ═══════════════════════════════════════════════════════
//  RELIQUIAS — fila dinámica legacy
// ═══════════════════════════════════════════════════════
function addItem(text = '', mod = 0) { createRow('items-dynamic-list', text, mod, 'Objeto Mágico'); }

function createRow(containerId, text, mod, placeholder) {
    const container = document.getElementById(containerId);
    const div = document.createElement('div');
    div.className = 'dynamic-row';
    div.innerHTML = `
        <input type="text" class="text-input" placeholder="${placeholder}" value="${text}" style="flex:1">
        <input type="number" class="mod-input" value="${mod}">
        <button onclick="this.parentElement.remove()" style="background:none;border:none;color:var(--blood);cursor:pointer;flex-shrink:0">✕</button>
    `;
    container.appendChild(div);
}

// ═══════════════════════════════════════════════════════
//  LIBRO DE HECHIZOS
// ═══════════════════════════════════════════════════════
function renderHechizosAprendidos() {
    const container = document.getElementById('spells-dynamic-list');
    container.innerHTML = '';
    if (spellsAprendidos.length === 0) {
        container.innerHTML = '<p class="spell-empty">Aún no has aprendido ningún hechizo.<br>Abre el Grimorio para explorar.</p>';
        return;
    }
    spellsAprendidos.forEach(sp => renderSpellCard(sp, container));
    buildRollPanel();
}

function renderSpellCard(sp, container) {
    const color = TIPO_COLORES[sp.tipo] || '#333';
    const estrellas = '★'.repeat(sp.dificultad) + '☆'.repeat(3 - sp.dificultad);
    const div = document.createElement('div');
    div.className = 'spell-card';
    div.dataset.nombre = sp.nombre;
    div.innerHTML = `
        <div class="spell-card-header" style="border-left:3px solid ${color}40;padding-left:10px;">
            <div class="spell-card-top">
                <span class="spell-card-name">${sp.nombre}</span>
                <button class="spell-forget-btn" onclick="olvidarHechizo('${sp.nombre}')" title="Olvidar">✕</button>
            </div>
            <div class="spell-card-meta">
                <span class="spell-tipo-badge" style="background:${color}40;color:${lightenColor(color)}">${sp.tipo}</span>
                <span class="spell-stars">${estrellas}</span>
            </div>
            <p class="spell-card-efecto">${sp.efecto}</p>
        </div>`;
    container.appendChild(div);
}

function lightenColor(hex) {
    const map = {
        '#6b2020':'#e87070','#1a3a5c':'#70a8e8','#3a1a5c':'#a870e8',
        '#1a4a2a':'#70c890','#3a3010':'#c9a84c','#2a2a4a':'#8888dd','#1a3a3a':'#70c8c8',
    };
    return map[hex] || '#e8dcc8';
}

function olvidarHechizo(nombre) {
    spellsAprendidos = spellsAprendidos.filter(s => s.nombre !== nombre);
    renderHechizosAprendidos();
}

// ── GRIMORIO ──────────────────────────────────────────
function toggleGrimorio() {
    const panel = document.getElementById('grimorio-panel');
    grimorioAbierto = !grimorioAbierto;
    panel.classList.toggle('open', grimorioAbierto);
    if (grimorioAbierto) renderGrimorio();
}

function renderGrimorio() {
    const { tipo, dificultad, busqueda } = grimorioFiltro;
    const aprendidos = spellsAprendidos.map(s => s.nombre);
    const filtrados = GRIMORIO.filter(h => {
        if (tipo !== 'Todos' && h.tipo !== tipo) return false;
        if (dificultad > 0 && h.dificultad !== dificultad) return false;
        if (busqueda && !h.nombre.toLowerCase().includes(busqueda.toLowerCase())) return false;
        return true;
    });
    const lista = document.getElementById('grimorio-lista');
    lista.innerHTML = '';
    if (filtrados.length === 0) {
        lista.innerHTML = '<p class="spell-empty">Ningún hechizo coincide.</p>';
        return;
    }
    filtrados.forEach(h => {
        const yaAprendido = aprendidos.includes(h.nombre);
        const color = TIPO_COLORES[h.tipo] || '#333';
        const estrellas = '★'.repeat(h.dificultad) + '☆'.repeat(3 - h.dificultad);
        const costoPD = COSTO_DESTINO[h.dificultad];
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
                       <button class="btn-aprender-reto" onclick="aprenderPorReto('${h.nombre}')">
                           🎲 Reto<br><span style="font-size:0.65rem;opacity:0.7">Dif. ${h.dificultad}</span>
                       </button>
                       <button class="btn-aprender-pd" onclick="aprenderPorDestino('${h.nombre}')">
                           ✦ ${costoPD} PD
                       </button>
                   </div>`
            }`;
        lista.appendChild(div);
    });
}

function setFiltroTipo(tipo) {
    grimorioFiltro.tipo = tipo;
    document.querySelectorAll('.filtro-tipo-btn').forEach(b => b.classList.toggle('active', b.dataset.tipo === tipo));
    renderGrimorio();
}
function setFiltroDif(dif) {
    grimorioFiltro.dificultad = dif;
    document.querySelectorAll('.filtro-dif-btn').forEach(b => b.classList.toggle('active', parseInt(b.dataset.dif) === dif));
    renderGrimorio();
}
function setBusqueda(val) { grimorioFiltro.busqueda = val; renderGrimorio(); }

// ── APRENDIZAJE ───────────────────────────────────────
function aprenderPorReto(nombre) {
    const hechizo = GRIMORIO.find(h => h.nombre === nombre);
    if (!hechizo) return;
    let sum = 0, dice = [];
    for (let i = 0; i < 4; i++) {
        const r = Math.floor(Math.random() * 3) - 1;
        sum += r;
        dice.push(r === 1 ? '[+]' : r === -1 ? '[-]' : '[ ]');
    }
    const exito = sum >= hechizo.dificultad;
    playLearnSound(exito);
    const msg = exito
        ? `✨ ¡Éxito! (${sum >= 0 ? '+' : ''}${sum})\n${dice.join(' ')}\n\nHas aprendido ${nombre}.`
        : `💫 Fracaso (${sum >= 0 ? '+' : ''}${sum})\n${dice.join(' ')}\n\nNecesitabas ${hechizo.dificultad} o más.`;
    showToast(msg, exito ? 'exito' : 'fallo');
    if (exito) aprenderHechizo(hechizo);
}

function aprenderPorDestino(nombre) {
    const hechizo = GRIMORIO.find(h => h.nombre === nombre);
    if (!hechizo) return;
    const costo = COSTO_DESTINO[hechizo.dificultad];
    const fateEl = document.getElementById('fate-display');
    const fateAct = parseInt(fateEl.innerText) || 0;
    if (fateAct < costo) {
        showToast(`✦ Necesitas ${costo} PD.\nTienes ${fateAct}.`, 'fallo');
        return;
    }
    fateEl.innerText = fateAct - costo;
    playLearnSound(true);
    aprenderHechizo(hechizo);
    showToast(`✦ Gastaste ${costo} PD.\nHas aprendido ${nombre}.`, 'exito');
    updateRollTotals();
}

function aprenderHechizo(hechizo) {
    if (spellsAprendidos.find(s => s.nombre === hechizo.nombre)) return;
    spellsAprendidos.push(hechizo);
    renderHechizosAprendidos();
    renderGrimorio();
}

// ═══════════════════════════════════════════════════════
//  TOAST
// ═══════════════════════════════════════════════════════
function showToast(msg, tipo = 'neutro') {
    let toast = document.getElementById('spell-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'spell-toast';
        document.body.appendChild(toast);
    }
    toast.className = `spell-toast spell-toast-${tipo}`;
    toast.innerText = msg;
    toast.classList.add('visible');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove('visible'), 3200);
}

// ═══════════════════════════════════════════════════════
//  IMAGEN / DESTINO
// ═══════════════════════════════════════════════════════
function updateImage() {
    const url = document.getElementById('char-img-url').value;
    document.getElementById('char-img-display').src = url || 'https://via.placeholder.com/150?text=Mago';
}

function updateFate(val) {
    const d = document.getElementById('fate-display');
    const nuevo = Math.max(0, parseInt(d.innerText) + val);
    d.innerText = nuevo;
    updateRollTotals();
}

// ═══════════════════════════════════════════════════════
//  EXPORT / IMPORT JSON — COMPLETO
// ═══════════════════════════════════════════════════════
function exportCharacter() {
    const data = {
        version:      '8.0',
        campaign:     document.getElementById('campaign-name').value,
        name:         document.getElementById('char-name').value,
        recovery:     document.getElementById('recovery-val').value,
        fate:         document.getElementById('fate-display').innerText,
        age:          document.getElementById('char-age').value,
        concept:      document.getElementById('char-concept').value,
        stunts:       document.getElementById('stunts-area').value,
        notes:        document.getElementById('notes-area').value,
        charImg:      document.getElementById('char-img-url').value,
        consequences: {
            pMild: document.getElementById('phys-mild').value,
            pMod:  document.getElementById('phys-mod').value,
            pSev:  document.getElementById('phys-sev').value,
            mMild: document.getElementById('ment-mild').value,
            mMod:  document.getElementById('ment-mod').value,
            mSev:  document.getElementById('ment-sev').value,
        },
        habilidades: getHabilidadesData(),
        aspects:     getAspectosData(),
        skills:      getArtesData(),
        varita:      getVaritaData(),
        items:       Array.from(document.querySelectorAll('#items-dynamic-list .dynamic-row'))
                         .map(r => ({ t: r.querySelector('.text-input').value, m: r.querySelector('.mod-input').value })),
        spells:      spellsAprendidos,
        stressPhys:  Array.from(document.querySelectorAll('.track-group:first-child .checks input[type=checkbox]')).map(cb => cb.checked),
        stressMent:  Array.from(document.querySelectorAll('.track-group:last-child .checks input[type=checkbox]')).map(cb => cb.checked),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${data.name || 'mago'}_${data.campaign || 'ficha'}.json`;
    a.click();
}

function importCharacter(event) {
    const reader = new FileReader();
    reader.onload = (e) => {
        const d = JSON.parse(e.target.result);
        document.getElementById('campaign-name').value    = d.campaign || '';
        document.getElementById('char-name').value        = d.name     || '';
        document.getElementById('char-age').value         = d.age      || '';
        document.getElementById('char-concept').value     = d.concept  || '';
        document.getElementById('recovery-val').value     = d.recovery || 0;
        document.getElementById('fate-display').innerText = d.fate     || 3;
        document.getElementById('stunts-area').value      = d.stunts   || '';
        document.getElementById('notes-area').value       = d.notes    || '';
        document.getElementById('char-img-url').value     = d.charImg  || '';
        if (d.consequences) {
            document.getElementById('phys-mild').value = d.consequences.pMild || '';
            document.getElementById('phys-mod').value  = d.consequences.pMod  || '';
            document.getElementById('phys-sev').value  = d.consequences.pSev  || '';
            document.getElementById('ment-mild').value = d.consequences.mMild || '';
            document.getElementById('ment-mod').value  = d.consequences.mMod  || '';
            document.getElementById('ment-sev').value  = d.consequences.mSev  || '';
        }
        // Habilidades
        if (d.habilidades) {
            HABILIDADES_DEF.forEach(h => {
                const el = document.getElementById('hab-' + h.key);
                if (el && d.habilidades[h.key] !== undefined) el.value = d.habilidades[h.key];
            });
        }
        // Aspectos
        setAspectosData(d.aspects);
        // Artes
        setArtesData(d.skills);
        // Varita
        if (d.varita !== undefined) {
            const sel = document.getElementById('varita-select');
            if (sel) { sel.value = d.varita; onVaritaChange(); }
        }
        // Items
        document.getElementById('items-dynamic-list').innerHTML = '';
        if (d.items) d.items.forEach(i => addItem(i.t, i.m));
        // Hechizos
        spellsAprendidos = d.spells || [];
        renderHechizosAprendidos();
        // Estrés
        if (d.stressPhys) {
            document.querySelectorAll('.track-group:first-child .checks input[type=checkbox]')
                .forEach((cb, i) => { if (d.stressPhys[i] !== undefined) cb.checked = d.stressPhys[i]; });
        }
        if (d.stressMent) {
            document.querySelectorAll('.track-group:last-child .checks input[type=checkbox]')
                .forEach((cb, i) => { if (d.stressMent[i] !== undefined) cb.checked = d.stressMent[i]; });
        }
        updateImage();
        updateSkillBudget();
    };
    reader.readAsText(event.target.files[0]);
}

// ═══════════════════════════════════════════════════════
//  INIT
// ═══════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
    buildHabilidades();
    buildAspectos();
    buildArtesArcanas();
    buildVaritaSelector();
    buildRollPanel();
    renderHechizosAprendidos();
});
