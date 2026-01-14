// Función para lanzar dados (se mantiene igual)
function rollFate() {
    let results = [];
    let total = 0;
    for (let i = 0; i < 4; i++) {
        const roll = Math.floor(Math.random() * 3) - 1;
        results.push(roll === 1 ? "[+]" : roll === -1 ? "[-]" : "[  ]");
        total += roll;
    }
    const resultDiv = document.getElementById('dice-result');
    resultDiv.innerHTML = `<p>Dados: ${results.join(' ')} | <strong>Total: ${total > 0 ? '+' + total : total}</strong></p>`;
}

// Función para guardar los datos en el navegador
function saveCharacter() {
    const charData = {
        name: document.getElementById('char-name').value,
        age: document.getElementById('char-age').value,
        house: document.getElementById('char-house').value,
        job: document.getElementById('char-job').value,
        // Aquí podrías añadir lógica para guardar todos los campos
    };
    
    localStorage.setItem('fateCharacter', JSON.stringify(charData));
    alert("¡Personaje guardado en este navegador!");
}

// Al cargar la página, podrías recuperar los datos (Opcional)
window.onload = function() {
    const saved = localStorage.getItem('fateCharacter');
    if (saved) {
        const data = JSON.parse(saved);
        document.getElementById('char-name').value = data.name;
        // ... cargar el resto
    }
};
