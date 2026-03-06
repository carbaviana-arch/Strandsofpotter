// NAVEGACIÓN DE PESTAÑAS
function showTab(tabId, btn) {
    document.querySelectorAll('.app-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.tab-item').forEach(b => b.classList.remove('active'));
    
    document.getElementById(tabId).classList.add('active');
    btn.classList.add('active');
}

// GESTIÓN DE HABILIDADES
function updateSkillBudget() {
    const recovery = parseInt(document.getElementById('recovery-val').value) || 0;
    const skills = document.querySelectorAll('.skill-val-input');
    let spent = 0;
    skills.forEach(s => spent += (parseInt(s.value) || 0));
    
    const budgetSpan = document.getElementById('skill-budget');
    budgetSpan.innerText = recovery - spent;
    budgetSpan.style.color = (recovery - spent) < 0 ? "red" : "var(--ink)";
    updateSkillSelector();
}

function addSkill(name = '', val = 0) {
    const container = document.getElementById('skills-dynamic-list');
    const div = document.createElement('div');
    div.style.display = "flex";
    div.style.gap = "5px";
    div.style.marginBottom = "5px";
    div.innerHTML = `
        <input type="text" class="skill-name-input" placeholder="Arte" value="${name}" oninput="updateSkillSelector()">
        <input type="number" class="skill-val-input" value="${val}" style="width:50px" oninput="updateSkillBudget()">
        <button onclick="this.parentElement.remove(); updateSkillBudget();" style="background:none; border:none; color:red">×</button>
    `;
    container.appendChild(div);
}

function updateSkillSelector() {
    const selector = document.getElementById('skill-selector');
    selector.innerHTML = '<option value="0">Concentración Pura (+0)</option>';
    const names = document.querySelectorAll('.skill-name-input');
    const vals = document.querySelectorAll('.skill-val-input');
    names.forEach((n, i) => {
        if(n.value) {
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

// PERSISTENCIA SIMPLE
function exportCharacter() {
    const data = {
        name: document.getElementById('char-name').value,
        recovery: document.getElementById('recovery-val').value,
        aspects: Array.from(document.querySelectorAll('.aspect-input')).map(a => a.value),
        skills: Array.from(document.querySelectorAll('.skill-name-input')).map((n, i) => ({n: n.value, v: document.querySelectorAll('.skill-val-input')[i].value}))
    };
    const blob = new Blob([JSON.stringify(data)], {type: 'application/json'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = "mago.json";
    a.click();
}
