function rollFate() {
    let results = [];
    let total = 0;

    for (let i = 0; i < 4; i++) {
        // Genera un número entre -1, 0 y 1
        const roll = Math.floor(Math.random() * 3) - 1;
        results.push(roll === 1 ? "[+]" : roll === -1 ? "[-]" : "[  ]");
        total += roll;
    }

    const resultDiv = document.getElementById('dice-result');
    resultDiv.innerHTML = `
        <p>Dados: ${results.join(' ')}</p>
        <p><strong>Resultado Total: ${total > 0 ? '+' + total : total}</strong></p>
    `;
}
