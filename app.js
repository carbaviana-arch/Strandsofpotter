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
}

// Lógica de Dados Fate (4dF)
function rollWithSkill(bonus) {
    let rolls = [];
    let sum = 0;
    for (let i = 0; i < 4; i++) {
        let r = Math.floor(Math.random() * 3) - 1; // -1, 0, 1
        sum += r;
        rolls.push(r === 1 ? "[+]" : r === -1 ? "[-]" : "[  ]");
    }
    const final = sum + bonus;
    const resultDiv = document.getElementById('dice-result');
    resultDiv.innerHTML = `
        <span style="color:#740001">Dados:</span> ${rolls.join(' ')} (${sum}) <br>
        <span style="font-size: 1.5rem">Total: <strong>${final > 0 ? '+' + final : final}</strong></span>
    `;
}

// EXPORTAR A ARCHIVO JSON
function exportCharacter() {
    const aspects = Array.from(document.querySelectorAll('.aspect-input')).map(t => t.value);
    const skills = Array.from(document.querySelectorAll('.skill-ladder input')).map(t => t.value);
    
    const characterData = {
        name: document.getElementById('char-name').value,
        age: document.getElementById('char-age').value,
        concept: document.getElementById('char-concept').value,
        job: document.getElementById('char-job').value,
        recovery: document.getElementById('recovery-val').value,
        imgUrl: document.getElementById('char-img-url').value,
        fate: document.getElementById('fate-display').innerText,
        aspects: aspects,
        skills: skills,
        stunts: document.getElementById('stunts-text').value,
        notes: document.getElementById('notes-area').value
    };

    const blob = new Blob([JSON.stringify(characterData, null, 2)], {type : 'application/json'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${characterData.name || 'Personaje'}_Strands.json`;
    a.click();
}

// IMPORTAR DESDE ARCHIVO JSON
function importCharacter(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const data = JSON.parse(e.target.result);
        
        document.getElementById('char-name').value = data.name || "";
        document.getElementById('char-age').value = data.age || "";
        document.getElementById('char-concept').value = data.concept || "";
        document.getElementById('char-job').value = data.job || "";
        document.getElementById('recovery-val').value = data.recovery || "";
        document.getElementById('char-img-url').value = data.imgUrl || "";
        document.getElementById('fate-display').innerText = data.fate || "3";
        document.getElementById('stunts-text').value = data.stunts || "";
        document.getElementById('notes-area').value = data.notes || "";

        const aspectTextareas = document.querySelectorAll('.aspect-input');
        if(data.aspects) data.aspects.forEach((val, i) => { if(aspectTextareas[i]) aspectTextareas[i].value = val; });

        const skillInputs = document.querySelectorAll('.skill-ladder input');
        if(data.skills) data.skills.forEach((val, i) => { if(skillInputs[i]) skillInputs[i].value = val; });

        updateImage();
        alert("¡Pergamino leído correctamente!");
    };
    reader.readAsText(file);
}
