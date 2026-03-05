// Actualizar la vista previa de la imagen
function updateImage() {
    const url = document.getElementById('char-img-url').value;
    const img = document.getElementById('char-img-display');
    if (url) img.src = url;
}

// Puntos de Destino
function updateFate(val) {
    const display = document.getElementById('fate-display');
    let current = parseInt(display.innerText);
    display.innerText = Math.max(0, current + val);
    saveToLocalStorage();
}

// Lógica de Dados Fate (4dF) con estilo visual
function rollWithSkill(bonus) {
    let rolls = [];
    let sum = 0;
    for (let i = 0; i < 4; i++) {
        let r = Math.floor(Math.random() * 3) - 1; 
        sum += r;
        let symbol = r === 1 ? '<span class="dice-plus">[+]</span>' : 
                     r === -1 ? '<span class="dice-minus">[-]</span>' : 
                     '<span class="dice-empty">[  ]</span>';
        rolls.push(symbol);
    }
    const final = sum + bonus;
    const resultDiv = document.getElementById('dice-result');
    resultDiv.innerHTML = `
        <div class="dice-roll-container">
            <div class="dice-individual">${rolls.join(' ')}</div>
            <div class="total-result">Total: <strong>${final > 0 ? '+' + final : final}</strong></div>
            <small>(Dados: ${sum} + Bono: ${bonus})</small>
        </div>
    `;
}

// Gestión de Inventario
function addItem(name = '', desc = '', mod = 0) {
    const container = document.getElementById('items-list');
    const itemDiv = document.createElement('div');
    itemDiv.className = 'magic-item';
    itemDiv.innerHTML = `
        <div class="item-row">
            <input type="text" class="item-name" placeholder="Objeto" value="${name}">
            <input type="number" class="item-mod" placeholder="Mod" value="${mod}">
            <button onclick="this.parentElement.parentElement.remove(); saveToLocalStorage();" class="btn-delete">×</button>
        </div>
        <textarea class="item-desc" placeholder="Descripción...">${desc}</textarea>
    `;
    container.appendChild(itemDiv);
    itemDiv.querySelectorAll('input, textarea').forEach(el => {
        el.addEventListener('input', saveToLocalStorage);
    });
}

function getItemsData() {
    return Array.from(document.querySelectorAll('.magic-item')).map(item => ({
        name: item.querySelector('.item-name').value,
        mod: item.querySelector('.item-mod').value,
        desc: item.querySelector('.item-desc').value
    }));
}

// PERSISTENCIA LOCAL Y EXPORTACIÓN
function saveToLocalStorage() {
    const characterData = captureData();
    localStorage.setItem('strands_character_v2', JSON.stringify(characterData));
}

function captureData() {
    return {
        name: document.getElementById('char-name').value,
        age: document.getElementById('char-age').value,
        concept: document.getElementById('char-concept').value,
        job: document.getElementById('char-job').value,
        recovery: document.getElementById('recovery-val').value,
        imgUrl: document.getElementById('char-img-url').value,
        fate: document.getElementById('fate-display').innerText,
        aspects: Array.from(document.querySelectorAll('.aspect-input')).map(t => t.value),
        skills: Array.from(document.querySelectorAll('.skill-ladder input')).map(t => t.value),
        notes: document.getElementById('notes-area').value,
        items: getItemsData()
    };
}

function fillForm(data) {
    if(!data) return;
    document.getElementById('char-name').value = data.name || "";
    document.getElementById('char-age').value = data.age || "";
    document.getElementById('char-concept').value = data.concept || "";
    document.getElementById('char-job').value = data.job || "";
    document.getElementById('recovery-val').value = data.recovery || "";
    document.getElementById('char-img-url').value = data.imgUrl || "";
    document.getElementById('fate-display').innerText = data.fate || "3";
    document.getElementById('notes-area').value = data.notes || "";

    const aspects = document.querySelectorAll('.aspect-input');
    if(data.aspects) data.aspects.forEach((v, i) => { if(aspects[i]) aspects[i].value = v; });

    const skills = document.querySelectorAll('.skill-ladder input');
    if(data.skills) data.skills.forEach((v, i) => { if(skills[i]) skills[i].value = v; });

    const itemsList = document.getElementById('items-list');
    itemsList.innerHTML = "";
    if(data.items) data.items.forEach(item => addItem(item.name, item.desc, item.mod));

    updateImage();
}

function exportCharacter() {
    const data = captureData();
    const blob = new Blob([JSON.stringify(data, null, 2)], {type : 'application/json'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${data.name || 'Héroe'}_StrandsV2.json`;
    a.click();
}

function importCharacter(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        fillForm(JSON.parse(e.target.result));
        saveToLocalStorage();
    };
    reader.readAsText(file);
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('strands_character_v2');
    if(saved) fillForm(JSON.parse(saved));
    document.body.addEventListener('input', saveToLocalStorage);
});
