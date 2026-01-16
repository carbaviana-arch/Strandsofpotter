// Actualizar imagen en tiempo real
function updateImage() {
    const url = document.getElementById('char-img-url').value;
    const imgDisplay = document.getElementById('char-img-display');
    if (url) imgDisplay.src = url;
}

// Tirada de dados Fate (4dF)
function rollFate() {
    let total = 0;
    let icons = [];
    for (let i = 0; i < 4; i++) {
        const r = Math.floor(Math.random() * 3) - 1;
        total += r;
        icons.push(r === 1 ? "➕" : r === -1 ? "➖" : "⚪");
    }
    const resultDiv = document.getElementById('dice-result');
    resultDiv.innerHTML = `${icons.join(' ')} | Total: <strong>${total > 0 ? '+'+total : total}</strong>`;
}

// Guardado persistente
function saveCharacter() {
    const character = {
        name: document.getElementById('char-name').value,
        image: document.getElementById('char-img-url').value,
        notes: document.getElementById('session-notes-area').value,
        // (Añadir aquí el resto de campos para guardado completo)
    };
    localStorage.setItem('fate_char_data', JSON.stringify(character));
    alert("¡Ficha guardada con éxito!");
}

// Cargar al iniciar
window.onload = function() {
    const saved = localStorage.getItem('fate_char_data');
    if (saved) {
        const data = JSON.parse(saved);
        document.getElementById('char-name').value = data.name || "Neville Longbottom";
        document.getElementById('char-img-url').value = data.image || "";
        document.getElementById('session-notes-area').value = data.notes || "";
        updateImage();
    }
};
