// ═══════════════════════════════════════════════════════
//  GRIMORIO COMPLETO
// ═══════════════════════════════════════════════════════
const GRIMORIO = [
    { nombre: 'Accio', efecto: 'Invoca objetos hacia el mago', dificultad: 2, tipo: 'Utilidad' },
    { nombre: 'Aguamenti', efecto: 'Genera agua', dificultad: 2, tipo: 'Utilidad' },
    { nombre: 'Alohomora', efecto: 'Abre cerraduras', dificultad: 1, tipo: 'Utilidad' },
    { nombre: 'Anapneo', efecto: 'Desobstruye vías respiratorias', dificultad: 2, tipo: 'Curación' },
    { nombre: 'Apparate', efecto: 'Teletransporte', dificultad: 3, tipo: 'Transporte' },
    { nombre: 'Ascendio', efecto: 'Impulsa hacia arriba', dificultad: 2, tipo: 'Utilidad' },
    { nombre: 'Avada Kedavra', efecto: 'Maldición asesina', dificultad: 3, tipo: 'Ataque' },
    { nombre: 'Bombarda', efecto: 'Provoca explosión', dificultad: 2, tipo: 'Ataque' },
    { nombre: 'Confundo', efecto: 'Confunde al objetivo', dificultad: 2, tipo: 'Mental' },
    { nombre: 'Crucio', efecto: 'Inflije dolor insoportable', dificultad: 3, tipo: 'Ataque' },
    { nombre: 'Diffindo', efecto: 'Corta objetos', dificultad: 1, tipo: 'Utilidad' },
    { nombre: 'Expecto Patronum', efecto: 'Invoca un guardián contra dementores', dificultad: 3, tipo: 'Defensa' },
    { nombre: 'Expelliarmus', efecto: 'Desarma al oponente', dificultad: 2, tipo: 'Defensa' },
    { nombre: 'Finite Incantatem', efecto: 'Cesa encantamientos', dificultad: 2, tipo: 'Defensa' },
    { nombre: 'Impedimenta', efecto: 'Ralentiza al objetivo', dificultad: 2, tipo: 'Defensa' },
    { nombre: 'Lumos', efecto: 'Crea luz en la varita', dificultad: 1, tipo: 'Utilidad' },
    { nombre: 'Protego', efecto: 'Escudo mágico', dificultad: 2, tipo: 'Defensa' },
    { nombre: 'Stupefy', efecto: 'Aturde al objetivo', dificultad: 2, tipo: 'Ataque' },
    { nombre: 'Wingardium Leviosa', efecto: 'Hace flotar objetos', dificultad: 1, tipo: 'Utilidad' }
];

// ═══════════════════════════════════════════════════════
//  GESTIÓN DE ESTADO Y NAVEGACIÓN
// ═══════════════════════════════════════════════════════

function showTab(tabId, element) {
    document.querySelectorAll('.app-section').forEach(s => s.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    
    document.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
    element.classList.add('active');
    window.scrollTo(0, 0);
}

// ═══════════════════════════════════════════════════════
//  SISTEMA DE DADOS (FATE/STRANDS)
// ═══════════════════════════════════════════════════════

function rollDice() {
    const bonus = parseInt(document.getElementById('roll-bonus').value) || 0;
    let total = 0;
    let diceResults = [];

    // 4 dados Fudge (-1, 0, +1)
    for (let i = 0; i < 4; i++) {
        const r = Math.floor(Math.random() * 3) - 1;
        diceResults.push(r === 1 ? '+' : (r === -1 ? '-' : '0'));
        total += r;
    }

    const finalResult = total + bonus;
    document.getElementById('dice-result').innerText = (finalResult >= 0 ? '+' : '') + finalResult;
    document.getElementById('dice-formula').innerText = `[${diceResults.join(' ')}] + ${bonus}`;

    // Historial
    const history = document.getElementById('roll-history');
    const entry = document.createElement('div');
    entry.className = 'history-item';
    entry.innerHTML = `<span>Resultado: <strong>${finalResult}</strong></span> <small>${new Date().toLocaleTimeString()}</small>`;
    history.prepend(entry);
}

// ═══════════════════════════════════════════════════════
//  PRESUPUESTO Y HABILIDADES
// ═══════════════════════════════════════════════════════

function updateSkillBudget() {
    const rec = parseInt(document.getElementById('rec-val').value) || 0;
    const skillInputs = document.querySelectorAll('.skill-val');
    let spent = 0;
    skillInputs.forEach(input => {
        spent += (parseInt(input.value) || 0);
    });

    const remaining = rec - spent;
    const display = document.getElementById('budget-count');
    display.innerText = remaining;
    display.style.color = remaining < 0 ? '#ff4d4d' : 'var(--gold)';
}

function addSkill(name = '', val = 0) {
    const container = document.getElementById('skills-dynamic-list');
    const div = document.createElement('div');
    div.className = 'dynamic-row skill-row';
    div.innerHTML = `
        <input type="text" placeholder="Habilidad..." value="${name}" class="skill-name">
        <input type="number" value="${val}" class="skill-val" onchange="updateSkillBudget()">
        <button onclick="this.parentElement.remove(); updateSkillBudget();" class="btn-del">×</button>
    `;
    container.appendChild(div);
    updateSkillBudget();
}

function addAspect(title = '', desc = '') {
    const container = document.getElementById('aspects-dynamic-list');
    const div = document.createElement('div');
    div.className = 'dynamic-row';
    div.innerHTML = `
        <input type="text" placeholder="Vínculo..." value="${title}" class="asp-t">
        <input type="text" placeholder="Descripción..." value="${desc}" class="asp-m">
        <button onclick="this.parentElement.remove()" class="btn-del">×</button>
    `;
    container.appendChild(div);
}

// ═══════════════════════════════════════════════════════
//  GRIMORIO Y HECHIZOS
// ═══════════════════════════════════════════════════════

function filterSpells() {
    const query = document.getElementById('spell-search').value.toLowerCase();
    const results = document.getElementById('spell-results');
    results.innerHTML = '';
    
    if (query.length < 2) return;

    const filtered = GRIMORIO.filter(s => s.nombre.toLowerCase().includes(query));
    filtered.forEach(s => {
        const div = document.createElement('div');
        div.className = 'spell-item';
        div.innerText = s.nombre;
        div.onclick = () => learnSpell(s);
        results.appendChild(div);
    });
}

function learnSpell(spell) {
    let aprendidos = JSON.parse(localStorage.getItem('aprendidos') || '[]');
    if (!aprendidos.find(s => s.nombre === spell.nombre)) {
        aprendidos.push(spell);
        localStorage.setItem('aprendidos', JSON.stringify(aprendidos));
        renderHechizosAprendidos();
    }
    document.getElementById('spell-search').value = '';
    document.getElementById('spell-results').innerHTML = '';
}

function renderHechizosAprendidos() {
    const list = document.getElementById('aprendidos-list');
    const aprendidos = JSON.parse(localStorage.getItem('aprendidos') || '[]');
    list.innerHTML = '';

    aprendidos.forEach((s, index) => {
        const card = document.createElement('div');
        card.className = 'spell-card';
        card.innerHTML = `
            <strong>${s.nombre}</strong>
            <small>${s.tipo} (Dif: ${s.dificultad})</small>
            <p>${s.efecto}</p>
            <button onclick="removeSpell(${index})">Eliminar</button>
        `;
        list.appendChild(card);
    });
}

function removeSpell(index) {
    let aprendidos = JSON.parse(localStorage.getItem('aprendidos') || '[]');
    aprendidos.splice(index, 1);
    localStorage.setItem('aprendidos', JSON.stringify(aprendidos));
    renderHechizosAprendidos();
}

// ═══════════════════════════════════════════════════════
//  IMPORTACIÓN / EXPORTACIÓN
// ═══════════════════════════════════════════════════════

function exportCharacter() {
    const data = {
        name: document.getElementById('char-name').value,
        age: document.getElementById('char-age').value,
        concept: document.getElementById('char-concept').value,
        fate: document.getElementById('fate-points').value,
        rec: document.getElementById('rec-val').value,
        notes: document.getElementById('notes-area').value,
        charImg: document.getElementById('char-img-url').value,
        aspects: Array.from(document.querySelectorAll('#aspects-dynamic-list .dynamic-row')).map(r => ({
            t: r.querySelector('.asp-t').value,
            m: r.querySelector('.asp-m').value
        })),
        skills: Array.from(document.querySelectorAll('.skill-row')).map(r => ({
            n: r.querySelector('.skill-name').value,
            v: r.querySelector('.skill-val').value
        })),
        consequences: {
            pMild: document.getElementById('phys-mild').value,
            pMod: document.getElementById('phys-mod').value,
            pSev: document.getElementById('phys-sev').value,
            mMild: document.getElementById('ment-mild').value,
            mMod: document.getElementById('ment-mod').value,
            mSev: document.getElementById('ment-sev').value
        },
        spells: JSON.parse(localStorage.getItem('aprendidos') || '[]')
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.name || 'mago'}_ficha.json`;
    a.click();
}

function importCharacter(event) {
    const reader = new FileReader();
    reader.onload = (e) => {
        const d = JSON.parse(e.target.result);
        
        document.getElementById('char-name').value = d.name || '';
        document.getElementById('char-age').value = d.age || '';
        document.getElementById('char-concept').value = d.concept || '';
        document.getElementById('fate-points').value = d.fate || 3;
        document.getElementById('rec-val').value = d.rec || 5;
        document.getElementById('notes-area').value = d.notes || '';
        document.getElementById('char-img-url').value = d.charImg || '';
        
        if (d.consequences) {
            document.getElementById('phys-mild').value = d.consequences.pMild || '';
            document.getElementById('phys-mod').value = d.consequences.pMod || '';
            document.getElementById('phys-sev').value = d.consequences.pSev || '';
            document.getElementById('ment-mild').value = d.consequences.mMild || '';
            document.getElementById('ment-mod').value = d.consequences.mMod || '';
            document.getElementById('ment-sev').value = d.consequences.mSev || '';
        }

        document.getElementById('aspects-dynamic-list').innerHTML = '';
        if (d.aspects) d.aspects.forEach(a => addAspect(a.t, a.m));

        document.getElementById('skills-dynamic-list').innerHTML = '';
        if (d.skills) d.skills.forEach(s => addSkill(s.n, s.v));

        localStorage.setItem('aprendidos', JSON.stringify(d.spells || []));
        renderHechizosAprendidos();
        updateImage();
        updateSkillBudget();
    };
    reader.readAsText(event.target.files[0]);
}

function updateImage() {
    const url = document.getElementById('char-img-url').value;
    if (url) document.getElementById('char-img-display').src = url;
}

// ═══════════════════════════════════════════════════════
//  INICIALIZACIÓN
// ═══════════════════════════════════════════════════════

window.onload = () => {
    renderHechizosAprendidos();
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
};
