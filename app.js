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

// ASPECTOS DINÁMICOS
function addAspect(text = '', mod = 0) {
    const container = document.getElementById('aspects-dynamic-list');
    const div = document.createElement('div');
    div.className = 'dynamic-row';
    div.innerHTML = `
        <input type="text" class="aspect-text" placeholder="Vínculo o Aspecto" value="${text}" style="flex:1">
        <input type="number" class="mod-input" value="${mod}">
        <button onclick="this.parentElement.remove()" style="background:none; border:none; color:var(--blood); font-size:1.2rem;">✕</button>
    `;
    container.appendChild(div);
}

// HABILIDADES Y PRESUPUESTO
function addSkill(name = '', val = 0) {
    const container = document.getElementById('skills-dynamic-list');
    const div = document.createElement('div');
    div.className = 'dynamic-row';
    div.innerHTML = `
        <input type="text" class="skill-name-input" placeholder="Nombre Arte" value="${name}" oninput="updateSkillSelector()">
        <input type="number" class="skill-val-input" value="${val}" style="width:60px" oninput="updateSkillBudget()">
        <button onclick="this.parentElement.remove(); updateSkillBudget();" style="background:none; border:none; color:var(--blood)">✕</button>
    `;
    container.appendChild(div);
    updateSkillBudget();
}

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
    names.forEach((n, i) => {
        if (n.value) {
            const opt = document.createElement('option');
            opt.value = vals[i].value;
            opt.text = `${n.value} (+${vals[i].value})`;
            selector.add(opt);
        }
    });
}

// DADOS
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

// IMAGEN Y FATE
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
        aspects: Array.from(document.querySelectorAll('#aspects-dynamic-list .dynamic-row')).map(r => ({t: r.querySelector('.aspect-text').value, m: r.querySelector('.mod-input').value})),
        skills: Array.from(document.querySelectorAll('#skills-dynamic-list .dynamic-row')).map(r => ({n: r.querySelector('.skill-name-input').value, v: r.querySelector('.skill-val-input').value}))
    };
    const blob = new Blob([JSON.stringify(data)], {type: 'application/json'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = "grimorio.json";
    a.click();
}

function importCharacter(event) {
    const reader = new FileReader();
    reader.onload = (e) => {
        const d = JSON.parse(e.target.result);
        document.getElementById('char-name').value = d.name || "";
        document.getElementById('recovery-val').value = d.recovery || 0;
        document.getElementById('fate-display').innerText = d.fate || 3;
        document.getElementById('aspects-dynamic-list').innerHTML = "";
        if(d.aspects) d.aspects.forEach(a => addAspect(a.t, a.m));
        document.getElementById('skills-dynamic-list').innerHTML = "";
        if(d.skills) d.skills.forEach(s => addSkill(s.n, s.v));
        updateSkillBudget();
    };
    reader.readAsText(event.target.files[0]);
}

// INICIO
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('aspects-dynamic-list').children.length === 0) {
        addAspect('Aspecto Definidor', 0);
        addAspect('Vínculo', 0);
    }
});
