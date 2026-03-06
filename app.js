// Navegación de la App
function showSection(sectionId, element) {
    document.querySelectorAll('.app-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    
    document.getElementById(sectionId).classList.add('active');
    element.classList.add('active');
    
    if(sectionId === 'lanzar') updateSkillSelector();
}

// Reutilizamos la lógica de tiradas y guardado de versiones anteriores
// [Incluir aquí funciones: updateImage, updateFate, updateSkillBudget, addSkill, executeSelectedRoll, exportCharacter, etc.]
// (Asegúrate de copiar las funciones del app.js anterior para que todo sea funcional)
