/**
 * MARAUDER APP - STRANDS OF FATE v6.0
 * Lógica de negocio y persistencia
 */

// --- CONFIGURACIÓN DE NAVEGACIÓN ---
function showTab(tabId, btn) {
    // Ocultar todas las secciones
    document.querySelectorAll('.app-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Desactivar todos los botones del dock
    document.querySelectorAll('.tab-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Activar sección y botón seleccionado
    document.getElementById(tabId).classList.add('active');
    btn.classList.add('active');

    // Si entramos a la sección de juego, actualizamos el selector de dados
    if (tabId === 'lanzar') {
        updateSkillSelector();
    }
}

// --- GESTIÓN DE VÍNCULOS Y ASPECTOS (NUEVO v6.0) ---
function addAspect(text = '', mod = 0) {
    const container = document.getElementById('aspects-dynamic-list');
    const div = document.createElement('div');
    div.className = 'dynamic-row';
    div.innerHTML = `
        <input type="text" class="aspect-text" placeholder="Vínculo o Aspecto" value="${text}" style="flex:1">
        <input type="number" class="mod-input" value="${mod}" title="Modificador">
        <button onclick="this.parentElement.remove()" style="background:none; border:none; color:var(--blood); cursor:pointer; font-size:1.2rem;">✕</button>
    `;
    container.appendChild(div);
}

// --- GESTIÓN DE ARTES (HABILIDADES) ---
function addSkill(name = '', val = 0) {
    const container = document.getElementById('skills-dynamic-list');
    const div = document.createElement('div');
    div.className = 'dynamic-row';
    div.innerHTML = `
        <input type="text" class="skill-name-input" placeholder="Nombre del Arte" value="${name}" oninput="updateSkillSelector()">
        <input type="number" class="skill-val-input" value="${val}" style="width:60px; text-align:center;" oninput="updateSkillBudget()">
        <button onclick="this.parentElement.remove(); updateSkillBudget();" style="background:none; border:none; color:var(--blood); cursor:pointer;">✕</button>
    `;
    container.appendChild(div);
    updateSkillBudget();
}

function updateSkillBudget() {
    const recovery = parseInt(document.getElementById('recovery-val').value) || 0;
    const skills = document.querySelectorAll('.skill-val-input');
    let spent = 0;
    skills.forEach(s => spent += (parseInt(s.value) || 0));
    
    const budgetSpan = document.getElementById('skill-budget');
    const total = recovery - spent;
    budgetSpan.innerText = total;
    budgetSpan.style.color = total < 0 ? "#740001" : "#3b1f13";
    updateSkillSelector();
}

function updateSkillSelector() {
    const selector = document.getElementById('skill-selector');
    if (!selector) return;

    selector.innerHTML = '<option value="0">Concentración Pura (+0)</option>';
    
    const names = document.querySelectorAll('.skill-name-input');
    const vals = document.querySelectorAll('.skill-val-input');
    
    names.forEach((n, i) => {
        if (n.value.trim() !== "") {
            const opt = document.createElement('option');
            opt.value = vals[i].value;
            opt.text = `${n.value} (+${vals[i].value})`;
            selector.add(opt);
        }
    });
}

// --- SISTEMA DE DADOS (4dF) ---
function executeSelectedRoll() {
    const selector = document.getElementById('skill-selector');
    const bonus = parseInt(selector.value);
    const skillName = selector.options[selector.selectedIndex].text.split(' (')[0];
    
    let sum = 0;
    let dice = [];
    for (let i = 0; i < 4; i++) {
        let r = Math.floor(Math.random() * 3) - 1; // -1, 0, 1
        sum += r;
        dice.push(r === 1 ? '[+]' : r === -1 ? '[-]' : '[  ]');
    }
    
    const final = sum + bonus;
    const resultDiv = document.getElementById('dice-result-v2');
    
    // Animación de impacto
    resultDiv.style.animation = 'none';
    void resultDiv.offsetWidth; 
    resultDiv.style.animation = 'slideIn 0.3s ease-out';

    resultDiv.innerHTML = `
        <div class="final-score" style="color: ${final >= 0 ? '#3b1f13' : '#740001'}">
            ${final > 0 ? '+' + final : final}
        </div>
        <div style="font-family: monospace; letter-spacing: 5px; opacity: 0.6;">${dice.join(' ')}</div>
        <div style="font-size: 0.8rem; margin-top: 5px;">Base: ${sum} + Bono: ${bonus}</div>
    `;

    // Agregar al historial
    const history = document.getElementById('roll-history');
    const entry = document.createElement('li');
    entry.style.borderBottom = "1px solid rgba(0,0,0,0.1)";
    entry.style.padding = "5px 0";
    entry.innerHTML = `<strong>${skillName}:</strong> ${final > 0 ? '+' + final : final} <small style="float:right; opacity:0.5">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</small>`;
    history.prepend(entry);
}

// --- UTILIDADES ---
function updateImage() {
    const url = document.getElementById('char-img-url').value;
    const img = document.getElementById('char-img-display');
    img.src = url || "https://via.placeholder.com/150?text=Mago";
}

function updateFate(val) {
    const display = document.getElementById('fate-display');
    let current = parseInt(display.innerText) || 0;
    display.innerText = Math.max(0, current + val);
}

// --- PERSISTENCIA (JSON) ---
function exportCharacter() {
    const data = {
        name: document.getElementById('char-name').value,
        age: document.getElementById('char-age').value,
        concept: document.getElementById('char-concept').value,
        recovery: document.getElementById('recovery-val').value,
        imgUrl: document.getElementById('char-img-url').value,
        fate: document.getElementById('fate-display').innerText,
        notes: document.getElementById('notes-area').value,
        stunts: document.getElementById('stunts-area').value,
        // Guardar Aspectos Dinámicos
        aspects: Array.from(document.querySelectorAll('#aspects-dynamic-list .dynamic-row')).map(row => ({
            t: row.querySelector('.aspect-text').value,
            m: row.querySelector('.mod-input').value
        })),
        // Guardar Artes Dinámicas
        skills: Array.from(document.querySelectorAll('#skills-dynamic-list .dynamic-row')).map(row => ({
            n: row.querySelector('.skill-name-input').value,
            v: row.querySelector('.skill-val-input').value
        }))
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${data.name || 'Mago'}_Marauder_V6.json`;
    a.click();
}

function importCharacter(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const data = JSON.parse(e.target.result);
        
        document.getElementById('char-name').value = data.name || "";
        document.getElementById('char-age').value = data.age || "";
        document.getElementById('char-concept').value = data.concept || "";
        document.getElementById('recovery-val').value = data.recovery || 0;
        document.getElementById('char-img-url').value = data.imgUrl || "";
        document.getElementById('fate-display').innerText = data.fate || "3";
        document.getElementById('notes-area').value = data.notes || "";
        document.getElementById('stunts-area').value = data.stunts || "";

        // Limpiar y cargar Aspectos
        document.getElementById('aspects-dynamic-list').innerHTML = "";
        if(data.aspects) data.aspects.forEach(asp => addAspect(asp.t, asp.m));

        // Limpiar y cargar Artes
        document.getElementById('skills-dynamic-list').innerHTML = "";
        if(data.skills) data.skills.forEach(sk => addSkill(sk.n, sk.v));

        updateImage();
        updateSkillBudget();
        alert("¡Grimorio cargado con éxito!");
    };
    reader.readAsText(file);
}

// --- INICIALIZACIÓN ---
document.addEventListener('DOMContentLoaded', () => {
    // Si la lista de aspectos está vacía, añadimos los básicos
    if (document.getElementById('aspects-dynamic-list').children.length === 0) {
        addAspect('Aspecto Definidor', 0);
        addAspect('Vínculo de Sangre', 0);
        addAspect('Debilidad Oculta', 0);
    }
    
    // Inicializar iconos de Lucide
    if (window.lucide) {
        lucide.createIcons();
    }
});
