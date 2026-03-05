let rollHistory = [];

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

// LÓGICA DE TIRADA Y HISTORIAL
function executeSelectedRoll() {
    const selector = document.getElementById('skill-selector');
    const bonus = parseInt(selector.value);
    const skillName = selector.options[selector.selectedIndex].text;
    
    let rolls = [];
    let sum = 0;
    for (let i = 0; i < 4; i++) {
        let r = Math.floor(Math.random() * 3) - 1; 
        sum += r;
        rolls.push(r === 1 ? '[+]' : r === -1 ? '[-]' : '[  ]');
    }
    const final = sum + bonus;
    
    // Visualización en el cuadro principal
    const resultDiv = document.getElementById('dice-result-v2');
    resultDiv.classList.remove('roll-animation');
    void resultDiv.offsetWidth; 
    resultDiv.classList.add('roll-animation');

    resultDiv.innerHTML = `
        <div class="dice-display">${rolls.join(' ')}</div>
        <div class="final-score">${final > 0 ? '+' + final : final}</div>
        <div class="roll-details">Total: Dados (${sum}) + Bono (${bonus})</div>
    `;

    // Añadir al historial (Max 5)
    addToHistory(skillName, final);
}

function addToHistory(skill, total) {
    const historyList = document.getElementById('roll-history');
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    rollHistory.unshift(`<li><strong>${timestamp}</strong> - ${skill}: <span>${total > 0 ? '+' + total : total}</span></li>`);
    if (rollHistory.length > 5) rollHistory.pop();
    
    historyList.innerHTML = rollHistory.join('');
}

// GESTIÓN DE INVENTARIO
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
    itemDiv.querySelectorAll('input, textarea').forEach(el => el.addEventListener('input', saveToLocalStorage));
}

// PERSISTENCIA
function saveToLocalStorage() {
    const data = {
        name: document.getElementById('char-name').value,
        age: document.getElementById('char-age').value,
        concept: document.getElementById('char-concept').value,
        job: document.getElementById('char-job').value,
        recovery: document.getElementById('recovery-val').value,
        imgUrl: document.getElementById('char-img-url').value,
        fate: document.getElementById('fate-display').innerText,
        aspects: Array.from(document.querySelectorAll('.aspect-input')).map(t => t.value),
        notes: document.getElementById('notes-area').value,
        items: Array.from(document.querySelectorAll('.magic-item')).map(item => ({
            name: item.querySelector('.item-name').value,
            mod: item.querySelector('.item-mod').value,
            desc: item.querySelector('.item-desc').value
        }))
    };
    localStorage.setItem('strands_v2_data', JSON.stringify(data));
}

function loadFromLocalStorage() {
    const saved = localStorage.getItem('strands_v2_data');
    if(!saved) return;
    const data = JSON.parse(saved);
    
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

    if(data.items) {
        document.getElementById('items-list').innerHTML = "";
        data.items.forEach(item => addItem(item.name, item.desc, item.mod));
    }
    updateImage();
}

// EXPORTAR / IMPORTAR
function exportCharacter() {
    saveToLocalStorage();
    const data = localStorage.getItem('strands_v2_data');
    const blob = new Blob([data], {type : 'application/json'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `Ficha_${document.getElementById('char-name').value || 'Personaje'}.json`;
    a.click();
}

function importCharacter(event) {
    const reader = new FileReader();
    reader.onload = (e) => {
        localStorage.setItem('strands_v2_data', e.target.result);
        loadFromLocalStorage();
    };
    reader.readAsText(event.target.files[0]);
}

document.addEventListener('DOMContentLoaded', () => {
    loadFromLocalStorage();
    document.body.addEventListener('input', saveToLocalStorage);
});
