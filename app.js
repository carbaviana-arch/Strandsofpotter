// NAVEGACIÓN
function showTab(tabId, element) {
    const targetBtn = element.closest('.tab-item');
    if (!targetBtn) return;
    document.querySelectorAll('.app-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.tab-item').forEach(b => b.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    targetBtn.classList.add('active');
    if (tabId === 'lanzar') updateSkillSelector();
}

// FUNCIONES DINÁMICAS (Añadir Aspecto, Arte, Objeto, Hechizo)
function addAspect(text = '', mod = 0) {
    createRow('aspects-dynamic-list', text, mod, 'Aspecto/Vínculo');
}

function addItem(text = '', mod = 0) {
    createRow('items-dynamic-list', text, mod, 'Nombre del Objeto');
}

function createRow(containerId, text, mod, placeholder) {
    const container = document.getElementById(containerId);
    const div = document.createElement('div');
    div.className = 'dynamic-row';
    div.innerHTML = `
        <input type="text" class="text-input" placeholder="${placeholder}" value="${text}" style="flex:1">
        <input type="number" class="mod-input" value="${mod}">
        <button onclick="this.parentElement.remove()" style="background:none; border:none; color:var(--blood); font-size:1.1rem; cursor:pointer">✕</button>
    `;
    container.appendChild(div);
}

function addSkill(name = '', val = 0) {
    const container = document.getElementById('skills-dynamic-list');
    const div = document.createElement('div');
    div.className = 'dynamic-row';
    div.innerHTML = `
        <input type="text" class="skill-name-input" placeholder="Nombre Arte" value="${name}" oninput="updateSkillSelector()">
        <input type="number" class="skill-val-input" value="${val}" style="width:55px" oninput="updateSkillBudget()">
        <button onclick="this.parentElement.remove(); updateSkillBudget();" style="background:none; border:none; color:var(--blood); cursor:pointer">✕</button>
    `;
    container.appendChild(div);
    updateSkillBudget();
}

function addSpell(name = '', desc = '') {
    const container = document.getElementById('spells-dynamic-list');
    const div = document.createElement('div');
    div.className = 'spell-row';
    div.innerHTML = `
        <div class="dynamic-row">
            <input type="text" class="spell-name" placeholder="Hechizo" value="${name}" style="font-weight:bold">
            <button onclick="this.parentElement.parentElement.remove()" style="background:none; border:none; color:var(--blood); cursor:pointer">✕</button>
        </div>
        <textarea placeholder="Efecto del hechizo..." style="font-size:0.9rem; height:45px">${desc}</textarea>
    `;
    container.appendChild(div);
}

// LOGICA DE REGLAS
function updateSkillBudget() {
    const recovery = parseInt(document.getElementById('recovery-val').value) || 0;
    const skills = document.querySelectorAll('.skill-val-input');
    let spent = 0;
    skills.forEach(s => spent += (parseInt(s.value) || 0));
    const total = recovery - spent;
    const budgetSpan = document.getElementById('skill-budget');
    budgetSpan.innerText = total;
    budgetSpan.style.color = total < 0 ? "red" : "inherit";
    updateSkillSelector();
}

function updateSkillSelector() {
    const selector = document.getElementById('skill-selector');
    if (!selector) return;
    selector.innerHTML = '<option value="0">Concentración (+0)</option>';
    const names = document.querySelectorAll('.skill-name-input');
    const vals = document.querySelectorAll('.skill-val-input');
    names.forEach((n, i) => { if (n.value) {
        const opt = document.createElement('option');
        opt.value = vals[i].value;
        opt.text = `${n.value} (+${vals[i].value})`;
        selector.add(opt);
    }});
}

// DADOS Y VARIOS
function executeSelectedRoll() {
    const selector = document.getElementById('skill-selector');
    const bonus = parseInt(selector.value);
    let sum = 0, dice = [];
    for(let i=0; i<4; i++) {
        let r = Math.floor(Math.random() * 3) - 1;
        sum += r;
        dice.push(r === 1 ? '[+]' : r === -1 ? '[-]' : '[  ]');
    }
    const final = sum + bonus;
    document.querySelector('.final-score').innerText = (final > 0 ? '+' : '') + final;
    document.querySelector('.dice-icons').innerText = dice.join(' ');
}

function updateImage() {
    const url = document.getElementById('char-img-url').value;
    document.getElementById('char-img-display').src = url || "https://via.placeholder.com/150?text=Mago";
}

function updateFate(val) {
    const d = document.getElementById('fate-display');
    d.innerText = Math.max(0, parseInt(d.innerText) + val);
}

// PERSISTENCIA
function exportCharacter() {
    const data = {
        name: document.getElementById('char-name').value,
        recovery: document.getElementById('recovery-val').value,
        fate: document.getElementById('fate-display').innerText,
        age: document.getElementById('char-age').value,
        concept: document.getElementById('char-concept').value,
        stunts: document.getElementById('stunts-area').value,
        notes: document.getElementById('notes-area').value,
        aspects: Array.from(document.querySelectorAll('#aspects-dynamic-list .dynamic-row')).map(r => ({t: r.querySelector('.text-input').value, m: r.querySelector('.mod-input').value})),
        skills: Array.from(document.querySelectorAll('#skills-dynamic-list .dynamic-row')).map(r => ({n: r.querySelector('.skill-name-input').value, v: r.querySelector('.skill-val-input').value})),
        items: Array.from(document.querySelectorAll('#items-dynamic-list .dynamic-row')).map(r => ({t: r.querySelector('.text-input').value, m: r.querySelector('.mod-input').value})),
        spells: Array.from(document.querySelectorAll('.spell-row')).map(r => ({n: r.querySelector('.spell-name').value, d: r.querySelector('textarea').value}))
    };
    const blob = new Blob([JSON.stringify(data)], {type: 'application/json'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${data.name || 'mago'}.json`;
    a.click();
}

function importCharacter(event) {
    const reader = new FileReader();
    reader.onload = (e) => {
        const d = JSON.parse(e.target.result);
        document.getElementById('char-name').value = d.name || "";
        document.getElementById('char-age').value = d.age || "";
        document.getElementById('char-concept').value = d.concept || "";
        document.getElementById('recovery-val').value = d.recovery || 0;
        document.getElementById('fate-display').innerText = d.fate || 3;
        document.getElementById('stunts-area').value = d.stunts || "";
        document.getElementById('notes-area').value = d.notes || "";
        
        document.getElementById('aspects-dynamic-list').innerHTML = "";
        if(d.aspects) d.aspects.forEach(a => addAspect(a.t, a.m));
        document.getElementById('skills-dynamic-list').innerHTML = "";
        if(d.skills) d.skills.forEach(s => addSkill(s.n, s.v));
        document.getElementById('items-dynamic-list').innerHTML = "";
        if(d.items) d.items.forEach(i => addItem(i.t, i.m));
        document.getElementById('spells-dynamic-list').innerHTML = "";
        if(d.spells) d.spells.forEach(s => addSpell(s.n, s.d));
        
        updateSkillBudget();
    };
    reader.readAsText(event.target.files[0]);
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('aspects-dynamic-list').children.length === 0) {
        addAspect('Aspecto Definidor', 0);
        addAspect('Vínculo', 0);
    }
});
