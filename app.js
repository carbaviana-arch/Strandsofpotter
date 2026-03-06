let rollHistory = [];

function updateImage() {
    const url = document.getElementById('char-img-url').value;
    document.getElementById('char-img-display').src = url || "https://via.placeholder.com/150?text=Retrato";
}

function updateFate(val) {
    const display = document.getElementById('fate-display');
    display.innerText = Math.max(0, parseInt(display.innerText) + val);
    saveToLocalStorage();
}

function updateSkillBudget() {
    const recovery = parseInt(document.getElementById('recovery-val').value) || 0;
    const skills = document.querySelectorAll('.skill-val-input');
    let spent = 0;
    skills.forEach(s => spent += (parseInt(s.value) || 0));
    const budgetSpan = document.getElementById('skill-budget');
    const remaining = recovery - spent;
    budgetSpan.innerText = remaining;
    budgetSpan.className = remaining < 0 ? "budget-negative" : "";
    updateSkillSelector();
}

function addSkill(name = '', val = 0) {
    const container = document.getElementById('skills-dynamic-list');
    const div = document.createElement('div');
    div.className = 'skill-item-row';
    div.innerHTML = `
        <input type="text" class="skill-name-input" placeholder="Arte" value="${name}" oninput="updateSkillSelector()">
        <input type="number" class="skill-val-input" value="${val}" min="0" max="5" oninput="updateSkillBudget()">
        <button class="delete-small" onclick="this.parentElement.remove(); updateSkillBudget(); saveToLocalStorage();">×</button>
    `;
    container.appendChild(div);
    saveToLocalStorage();
}

function updateSkillSelector() {
    const selector = document.getElementById('skill-selector');
    selector.innerHTML = '<option value="0">Tirada Pura (+0)</option>';
    document.querySelectorAll('.skill-item-row').forEach(row => {
        const name = row.querySelector('.skill-name-input').value;
        const val = row.querySelector('.skill-val-input').value;
        if(name) {
            const opt = document.createElement('option');
            opt.value = val;
            opt.text = `${name} (+${val})`;
            selector.add(opt);
        }
    });
}

function executeSelectedRoll() {
    const selector = document.getElementById('skill-selector');
    const bonus = parseInt(selector.value);
    const skillName = selector.options[selector.selectedIndex].text.split(' (')[0];
    let sum = 0, dice = [];
    for(let i=0; i<4; i++) {
        let r = Math.floor(Math.random() * 3) - 1;
        sum += r;
        dice.push(r === 1 ? '[+]' : r === -1 ? '[-]' : '[  ]');
    }
    const final = sum + bonus;
    const resBox = document.getElementById('dice-result-v2');
    resBox.classList.remove('roll-anim');
    void resBox.offsetWidth;
    resBox.classList.add('roll-anim');
    resBox.innerHTML = `<div class="dice-display">${dice.join(' ')}</div><div class="final-score">${final > 0 ? '+'+final : final}</div>`;

    const hist = document.getElementById('roll-history');
    rollHistory.unshift(`<li><strong>${skillName}</strong>: ${final > 0 ? '+'+final : final}</li>`);
    if(rollHistory.length > 5) rollHistory.pop();
    hist.innerHTML = rollHistory.join('');
    saveToLocalStorage();
}

function addItem(name='', desc='', mod=0) {
    const container = document.getElementById('items-list');
    const div = document.createElement('div');
    div.className = 'magic-item-card';
    div.innerHTML = `<div class="item-header"><input type="text" class="i-name" placeholder="Reliquia" value="${name}"><input type="number" class="i-mod" value="${mod}"><button onclick="this.parentElement.parentElement.remove(); saveToLocalStorage();">×</button></div><input type="text" class="i-desc" placeholder="Efecto..." value="${desc}">`;
    container.appendChild(div);
    saveToLocalStorage();
}

function saveToLocalStorage() {
    const data = {
        name: document.getElementById('char-name').value,
        age: document.getElementById('char-age').value,
        concept: document.getElementById('char-concept').value,
        recovery: document.getElementById('recovery-val').value,
        fate: document.getElementById('fate-display').innerText,
        stunts: document.getElementById('stunts-area').value,
        aspects: Array.from(document.querySelectorAll('.aspect-input')).map(a => a.value),
        skills: Array.from(document.querySelectorAll('.skill-item-row')).map(s => ({n: s.querySelector('.skill-name-input').value, v: s.querySelector('.skill-val-input').value})),
        items: Array.from(document.querySelectorAll('.magic-item-card')).map(i => ({n: i.querySelector('.i-name').value, m: i.querySelector('.i-mod').value, d: i.querySelector('.i-desc').value})),
        cons: Array.from(document.querySelectorAll('.consequences-list input')).map(c => c.value),
        notes: document.getElementById('notes-area').value,
        imgUrl: document.getElementById('char-img-url').value
    };
    localStorage.setItem('strands_v35', JSON.stringify(data));
}

function loadFromLocalStorage() {
    const saved = localStorage.getItem('strands_v35');
    if(!saved) return;
    const d = JSON.parse(saved);
    document.getElementById('char-name').value = d.name || "";
    document.getElementById('char-age').value = d.age || "";
    document.getElementById('char-concept').value = d.concept || "";
    document.getElementById('recovery-val').value = d.recovery || 0;
    document.getElementById('fate-display').innerText = d.fate || 3;
    document.getElementById('stunts-area').value = d.stunts || "";
    document.getElementById('notes-area').value = d.notes || "";
    document.getElementById('char-img-url').value = d.imgUrl || "";
    if(d.aspects) d.aspects.forEach((val, i) => { if(document.querySelectorAll('.aspect-input')[i]) document.querySelectorAll('.aspect-input')[i].value = val; });
    document.getElementById('skills-dynamic-list').innerHTML = "";
    if(d.skills) d.skills.forEach(s => addSkill(s.n, s.v));
    document.getElementById('items-list').innerHTML = "";
    if(d.items) d.items.forEach(i => addItem(i.n, i.d, i.m));
    if(d.cons) d.cons.forEach((val, i) => { if(document.querySelectorAll('.consequences-list input')[i]) document.querySelectorAll('.consequences-list input')[i].value = val; });
    updateImage();
    updateSkillBudget();
}

document.addEventListener('DOMContentLoaded', () => {
    loadFromLocalStorage();
    document.body.addEventListener('input', saveToLocalStorage);
});

function exportCharacter() {
    saveToLocalStorage();
    const data = localStorage.getItem('strands_v35');
    const blob = new Blob([data], {type: 'application/json'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `Grimorio_${document.getElementById('char-name').value || 'Personaje'}.json`;
    a.click();
}

function importCharacter(e) {
    const reader = new FileReader();
    reader.onload = (event) => { localStorage.setItem('strands_v35', event.target.result); loadFromLocalStorage(); };
    reader.readAsText(e.target.files[0]);
}
