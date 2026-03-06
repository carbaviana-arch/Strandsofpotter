let rollHistory = [];

function updateImage() {
    const url = document.getElementById('char-img-url').value;
    document.getElementById('char-img-display').src = url || "https://via.placeholder.com/150?text=Avatar";
}

function updateFate(val) {
    const display = document.getElementById('fate-display');
    display.innerText = Math.max(0, parseInt(display.innerText) + val);
    saveToLocalStorage();
}

// GESTIÓN DE HABILIDADES Y PRESUPUESTO
function updateSkillBudget() {
    const recovery = parseInt(document.getElementById('recovery-val').value) || 0;
    const skills = document.querySelectorAll('.skill-val-input');
    let spent = 0;
    skills.forEach(s => spent += (parseInt(s.value) || 0));
    
    const budgetSpan = document.getElementById('skill-budget');
    const remaining = recovery - spent;
    budgetSpan.innerText = remaining;
    
    // Alerta visual de presupuesto
    if (remaining < 0) {
        budgetSpan.style.color = "var(--blood)";
        budgetSpan.style.fontWeight = "bold";
    } else {
        budgetSpan.style.color = "var(--ink)";
        budgetSpan.style.fontWeight = "normal";
    }
    updateSkillSelector();
}

function addSkill(name = '', val = 0) {
    const container = document.getElementById('skills-dynamic-list');
    const div = document.createElement('div');
    div.className = 'skill-item';
    div.innerHTML = `
        <input type="text" class="skill-name-input" placeholder="Habilidad" value="${name}" oninput="updateSkillSelector()">
        <input type="number" class="skill-val-input" value="${val}" min="0" max="5" oninput="updateSkillBudget()">
        <button class="delete-small" onclick="this.parentElement.remove(); updateSkillBudget(); saveToLocalStorage();">×</button>
    `;
    container.appendChild(div);
    saveToLocalStorage();
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

// TIRADAS CON EFECTO VISUAL
function executeSelectedRoll() {
    const selector = document.getElementById('skill-selector');
    const bonus = parseInt(selector.value);
    const skillName = selector.options[selector.selectedIndex].text;
    
    let sum = 0;
    let dice = [];
    for(let i=0; i<4; i++) {
        let r = Math.floor(Math.random() * 3) - 1;
        sum += r;
        dice.push(r === 1 ? '<span>[+]</span>' : r === -1 ? '<span>[-]</span>' : '<span>[  ]</span>');
    }
    
    const final = sum + bonus;
    const resBox = document.getElementById('dice-result-v2');
    
    // Animación de sacudida
    resBox.classList.remove('roll-animation');
    void resBox.offsetWidth; // Truco para reiniciar animación CSS
    resBox.classList.add('roll-animation');

    // Renderizado del resultado
    resBox.innerHTML = `
        <div class="dice-display">${dice.join(' ')}</div>
        <div class="final-score">${final > 0 ? '+'+final : final}</div>
        <div class="roll-details">Base: ${sum} | Bono: ${bonus}</div>
    `;

    // Cambio de color dinámico del resultado
    const scoreDisplay = resBox.querySelector('.final-score');
    if (final > 0) scoreDisplay.style.color = "#1b4d3e"; // Verde esmeralda místico
    else if (final < 0) scoreDisplay.style.color = "#740001"; // Rojo sangre
    else scoreDisplay.style.color = "#1a120f"; // Tinta negra

    // Historial
    const hist = document.getElementById('roll-history');
    const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    rollHistory.unshift(`<li><strong>${time}</strong> - ${skillName}: <span>${final}</span></li>`);
    if(rollHistory.length > 5) rollHistory.pop();
    hist.innerHTML = rollHistory.join('');
    saveToLocalStorage();
}

// INVENTARIO
function addItem(name='', desc='', mod=0) {
    const container = document.getElementById('items-list');
    const div = document.createElement('div');
    div.className = 'magic-item';
    div.innerHTML = `
        <div class="item-row">
            <input type="text" class="i-name" placeholder="Item" value="${name}">
            <input type="number" class="i-mod" value="${mod}">
            <button onclick="this.parentElement.parentElement.remove(); saveToLocalStorage();">×</button>
        </div>
        <input type="text" class="i-desc" placeholder="Efecto..." value="${desc}">
    `;
    container.appendChild(div);
    saveToLocalStorage();
}

// PERSISTENCIA
function saveToLocalStorage() {
    const data = {
        name: document.getElementById('char-name').value,
        recovery: document.getElementById('recovery-val').value,
        fate: document.getElementById('fate-display').innerText,
        stunts: document.getElementById('stunts-area').value,
        aspects: Array.from(document.querySelectorAll('.aspect-input')).map(a => a.value),
        skills: Array.from(document.querySelectorAll('.skill-item')).map(s => ({
            n: s.querySelector('.skill-name-input').value,
            v: s.querySelector('.skill-val-input').value
        })),
        items: Array.from(document.querySelectorAll('.magic-item')).map(i => ({
            n: i.querySelector('.i-name').value,
            m: i.querySelector('.i-mod').value,
            d: i.querySelector('.i-desc').value
        })),
        cons: Array.from(document.querySelectorAll('.consequences-list input')).map(c => c.value),
        notes: document.getElementById('notes-area').value
    };
    localStorage.setItem('strands_mystic_data', JSON.stringify(data));
}

function loadFromLocalStorage() {
    const saved = localStorage.getItem('strands_mystic_data');
    if(!saved) return;
    const d = JSON.parse(saved);
    
    document.getElementById('char-name').value = d.name || "";
    document.getElementById('recovery-val').value = d.recovery || 0;
    document.getElementById('fate-display').innerText = d.fate || 3;
    document.getElementById('stunts-area').value = d.stunts || "";
    
    if(d.aspects) d.aspects.forEach((val, i) => { 
        const el = document.querySelectorAll('.aspect-input')[i];
        if(el) el.value = val;
    });

    const skillCont = document.getElementById('skills-dynamic-list');
    skillCont.innerHTML = "";
    if(d.skills) d.skills.forEach(s => addSkill(s.n, s.v));

    const itemCont = document.getElementById('items-list');
    itemCont.innerHTML = "";
    if(d.items) d.items.forEach(i => addItem(i.n, i.d, i.m));

    if(d.cons) d.cons.forEach((val, i) => {
        const el = document.querySelectorAll('.consequences-list input')[i];
        if(el) el.value = val;
    });

    document.getElementById('notes-area').value = d.notes || "";
    updateSkillBudget();
}

document.addEventListener('DOMContentLoaded', () => {
    loadFromLocalStorage();
    document.body.addEventListener('input', saveToLocalStorage);
});

// EXPORT/IMPORT
function exportCharacter() {
    const data = localStorage.getItem('strands_mystic_data');
    const blob = new Blob([data], {type: 'application/json'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `Ficha_Mystic_${document.getElementById('char-name').value || 'Personaje'}.json`;
    a.click();
}

function importCharacter(e) {
    const reader = new FileReader();
    reader.onload = (event) => {
        localStorage.setItem('strands_mystic_data', event.target.result);
        loadFromLocalStorage();
    };
    reader.readAsText(e.target.files[0]);
}
