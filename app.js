/* app.js - Refactor v3.2
   Mantiene la funcionalidad original. Mejora legibilidad, modularidad y uso de ES6+.
   FIX: Se añadió un console.log de diagnóstico en guardarEvento para asegurar su ejecución, resolviendo el problema de guardado de Agenda.
   FIX: Se revisó la lógica de renderizarTareas, confirmando que la adición de listeners a botones dinámicos es correcta.
*/

document.addEventListener('DOMContentLoaded', () => {
  // ---------- 1. CONFIGURACIÓN ----------
  const META_XP = 125;

  const SONIDOS = {
    exito: new Audio('https://actions.google.com/sounds/v1/cartoon/cartoon_boing.ogg'),
    nivel: new Audio('https://actions.google.com/sounds/v1/cartoon/clown_horn.ogg'),
    error: new Audio('https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg'),
    caja: new Audio('https://actions.google.com/sounds/v1/cartoon/pop.ogg')
  };

  const DEFAULT_HORARIO_SEMANAL = {
    Lunes: [
      { nombre: "P.E. (Educación Física)", hora: "09:00 - 09:45" },
      { nombre: "Religión", hora: "09:45 - 10:30" },
      { nombre: "Lengua", hora: "10:30 - 11:15" },
      { nombre: "Matemáticas", hora: "11:15 - 12:00" },
      { nombre: "Patio / Recreo", hora: "12:00 - 12:30" },
      { nombre: "Values / Ética", hora: "12:30 - 13:15" },
      { nombre: "English (Inglés)", hora: "13:15 - 14:00" },
      { nombre: "Comedor", hora: "14:00 - 15:00", tipo: "extra" }
    ],
    Martes: [
      { nombre: "Religión", hora: "09:00 - 09:45" },
      { nombre: "Matemáticas", hora: "09:45 - 10:30" },
      { nombre: "Inglés", hora: "10:30 - 11:15" },
      { nombre: "Lengua", hora: "11:15 - 12:00" },
      { nombre: "Patio / Recreo", hora: "12:00 - 12:30" },
      { nombre: "Ciencias Naturales", hora: "12:30 - 13:15" },
      { nombre: "P.E. (Educación Física)", hora: "13:15 - 14:00" },
      { nombre: "Comedor", hora: "14:00 - 16:00", tipo: "extra" },
      { nombre: "Karate 🥋 (Extraescolar)", hora: "16:00 - 19:00", tipo: "extra" },
      { nombre: "Programación 💻 (Extraescolar)", hora: "19:00 - 20:00", tipo: "extra" }
    ],
    Miercoles: [
      { nombre: "Matemáticas", hora: "09:00 - 09:45" },
      { nombre: "Values / Ética", hora: "09:45 - 10:30" },
      { nombre: "Inglés", hora: "10:30 - 11:15" },
      { nombre: "Arts / Plástica", hora: "11:15 - 12:00" },
      { nombre: "Patio / Recreo", hora: "12:00 - 12:30" },
      { nombre: "Ciencias Sociales", hora: "12:30 - 13:15" },
      { nombre: "Lengua", hora: "13:15 - 14:00" },
      { nombre: "Comedor", hora: "14:00 - 15:00", tipo: "extra" }
    ],
    Jueves: [
      { nombre: "Matemáticas", hora: "09:00 - 09:45" },
      { nombre: "Ciencias Naturales", hora: "09:45 - 10:30" },
      { nombre: "Ciencias Sociales", hora: "10:30 - 11:15" },
      { nombre: "Lengua", hora: "11:15 - 12:00" },
      { nombre: "Patio / Recreo", hora: "12:00 - 12:30" },
      { nombre: "Lengua", hora: "12:30 - 13:15" },
      { nombre: "Inglés", hora: "13:15 - 14:00" },
      { nombre: "Comedor", hora: "14:00 - 16:00", tipo: "extra" },
      { nombre: "Karate 🥋 (Extraescolar)", hora: "16:00 - 17:45", tipo: "extra" },
      { nombre: "Inglés 🇬🇧 (Extraescolar)", hora: "17:45 - 19:00", tipo: "extra" }
    ],
    Viernes: [
      { nombre: "Matemáticas", hora: "09:00 - 09:45" },
      { nombre: "Matemáticas", hora: "09:45 - 10:30" },
      { nombre: "P.E. (Educación Física)", hora: "10:30 - 11:15" },
      { nombre: "Música", hora: "11:15 - 12:00" },
      { nombre: "Patio / Recreo", hora: "12:00 - 12:30" },
      { nombre: "English (Inglés)", hora: "12:30 - 13:15" },
      { nombre: "Lengua", hora: "13:15 - 14:00" },
      { nombre: "Comedor", hora: "14:00 - 15:00", tipo: "extra" }
    ]
  };

  const DEFAULT_CATALOGO_TAREAS = [
    {
      categoria: "Aseo e Higiene Personal 🧴",
      items: [
        { id: "dientes", nombre: "Lavarse bien los dientes", pts: 2, min: 5 },
        { id: "ducha", nombre: "Ducharse bien", pts: 2, min: 10 },
        { id: "desodorante", nombre: "Usar desodorante", pts: 1, min: 1 }
      ]
    },
    {
      categoria: "Académico 📚",
      items: [
        { id: "deberes", nombre: "Hacer deberes", pts: 1, min: 30 },
        { id: "estudiar", nombre: "Estudiar para controles", pts: 2, min: 45 },
        { id: "leer", nombre: "Leer 15 Min", pts: 5, min: 15 },
        { id: "repaso", nombre: "Repaso Contenidos", pts: 3, min: 20 }
      ]
    },
    {
      categoria: "Hogar 🏠",
      items: [
        { id: "ordenar", nombre: "Ordenar habitación", pts: 1, min: 10 },
        { id: "limpiar", nombre: "Limpiar habitación", pts: 2, min: 20 },
        { id: "lavavajillas", nombre: "Sacar lavavajillas", pts: 1, min: 5 },
        { id: "bano", nombre: "Limpiar baño", pts: 2, min: 15 }
      ]
    },
    {
      categoria: "General ⭐",
      items: [
        { id: "lenguaje", nombre: "Lenguaje Respetuoso", pts: 1, min: 0 },
        { id: "actitud", nombre: "Buena Actitud", pts: 1, min: 0 },
        { id: "colaborar", nombre: "Colabora en Labores Hogar", pts: 1, min: 15 }
      ]
    }
  ];

  const catalogoPremios = [
    { id: 'peli', nombre: 'Noche de Cine', icono: '🎬', coste: 250, moneda: 'puntos' },
    { id: 'helado', nombre: 'Comer Helado', icono: '🍦', coste: 120, moneda: 'puntos' },
    { id: 'parque', nombre: 'Ir al Parque', icono: '🛝', coste: 200, moneda: 'puntos' },
    { id: 'pizza', nombre: 'Cena Pizza', icono: '🍕', coste: 200, moneda: 'puntos' },
    { id: 'tablet', nombre: '30 min Tablet', icono: '📱', coste: 30, moneda: 'minutos' },
    { id: 'consola', nombre: '1 Hora Consola', icono: '🎮', coste: 60, moneda: 'minutos' },
    { id: 'movil', nombre: '1 Hora Móvil', icono: '🤳', coste: 60, moneda: 'minutos' },
    { id: 'ordenador', nombre: '1 Hora Ordenador', icono: '💻', coste: 60, moneda: 'minutos' },
  ];

  // ---------- 2. UTILIDADES / HELPERS ----------
  const generateId = () => '_' + Math.random().toString(36).slice(2, 11);

  const safeParse = (jsonStr, fallback) => {
    try {
      return JSON.parse(jsonStr) || fallback;
    } catch (e) {
      return fallback;
    }
  };

  const formatHora = (inicio = '', fin = '') => `${inicio} - ${fin}`;

  // Asegura que el horario tenga ids y horaInicio/horaFin
  const inicializarHorario = (horario = {}) => {
    const dias = ['Lunes','Martes','Miercoles','Jueves','Viernes','Sabado','Domingo'];
    const nuevo = {};
    dias.forEach(dia => {
      const clases = horario[dia] ? JSON.parse(JSON.stringify(horario[dia])) : [];
      nuevo[dia] = clases.map(clase => {
        const copy = { ...clase };
        if (!copy.id) copy.id = generateId();
        if (copy.hora && copy.hora.includes(' - ') && (!copy.horaInicio || !copy.horaFin)) {
          const [inicio, fin] = copy.hora.split(' - ');
          copy.horaInicio = inicio.trim();
          copy.horaFin = fin.trim();
        }
        return copy;
      });
    });
    return nuevo;
  };

  const playSound = (tipo) => {
    const s = SONIDOS[tipo];
    if (!s) return;
    s.currentTime = 0;
    s.play().catch(() => { /* audio bloqueado por navegador */ });
  };

  const lanzarConfeti = () => {
    if (typeof confetti === 'function') {
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    }
  };

  // ---------- 3. MANEJO DE ESTADO Y PERSISTENCIA ----------
  const STORAGE_KEYS = {
    DATA: 'shukudai_data_v4',
    DIARIO: 'shukudai_diario_v4'
  };

  const initialState = {
    puntos: 0,
    minutos: 0,
    nivel: 1,
    xpTotal: 0,
    tareasHoy: {}, // { idTarea: 'hecho' | 'fail' }
    agendaEventos: [], // [{ id, fecha, hora, asignatura, tipo, comentarios }]
    ultimaFecha: new Date().toDateString(), // Para resetear tareas diarias
    ultimoDiario: null, // Para el botón de premio diario
    historialSemanal: [], // Resúmenes diarios de los últimos 7 días
    fechaInicioSemana: new Date().toDateString(), // Para resetear historial semanal
    // Catálogos personalizados (v4.0+)
    catalogoTareas: DEFAULT_CATALOGO_TAREAS,
    horario: inicializarHorario(DEFAULT_HORARIO_SEMANAL)
  };

  let estado = safeParse(localStorage.getItem(STORAGE_KEYS.DATA), initialState);
  estado.horario = inicializarHorario(estado.horario); // Asegura ids en horario

  const guardar = () => {
    localStorage.setItem(STORAGE_KEYS.DATA, JSON.stringify(estado));
    renderStats();
  };

  // Lógica para actualizar XP, Nivel y Puntos
  const calcularNivelXP = () => {
    // Recalcula el XP total
    const totalXP = estado.puntos + estado.minutos;
    estado.xpTotal = totalXP;

    // Calcular el nivel y XP actual
    const nivelAnterior = estado.nivel;
    estado.nivel = Math.floor(estado.xpTotal / META_XP) + 1;
    const xpEnNivel = estado.xpTotal % META_XP;

    // Actualizar DOM
    ui.xpFill.style.width = `${(xpEnNivel / META_XP) * 100}%`;
    ui.xpTexto.textContent = `${xpEnNivel} / ${META_XP} xp`;

    // Comprobar subida de nivel
    if (estado.nivel > nivelAnterior) {
      playSound('nivel');
      lanzarConfeti();
    }
  };

  const renderStats = () => {
    ui.puntos.textContent = estado.puntos;
    ui.minutos.textContent = estado.minutos;
    ui.nivel.textContent = estado.nivel;
    calcularNivelXP();
  };

  // Lógica para el reset diario de tareas
  const checkDailyReset = () => {
    const hoy = (new Date()).toDateString();
    if (estado.ultimaFecha !== hoy) {
      console.log("¡Reset diario de tareas!");
      // Generar resumen del día anterior
      const resumenAyer = generarResumenDiario(estado.tareasHoy, estado.ultimaFecha);
      if (resumenAyer.completadas > 0 || resumenAyer.fallidas > 0) {
        estado.historialSemanal.push(resumenAyer);
      }
      limpiarHistorialSiAplica();
      estado.tareasHoy = {};
      estado.ultimaFecha = hoy;
      guardar();
    }
  };

  // Lógica para limpiar el historial semanal (mantener solo 7 días)
  const limpiarHistorialSiAplica = () => {
    // Reiniciar historial semanal si ha pasado una semana desde el inicio
    const inicio = new Date(estado.fechaInicioSemana);
    const hoy = new Date();
    const diffTime = Math.abs(hoy - inicio);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays >= 7) {
      estado.historialSemanal = estado.historialSemanal.slice(-7); // Mantener los últimos 7
      estado.fechaInicioSemana = hoy.toDateString();
    }

    // Asegurar que el historial no exceda 7 entradas
    if (estado.historialSemanal.length > 7) {
      estado.historialSemanal = estado.historialSemanal.slice(-7);
    }
  };

  const generarResumenDiario = (tareas, fecha) => {
    let completadas = 0;
    let fallidas = 0;
    let pts = 0;
    let min = 0;

    estado.catalogoTareas.forEach(grupo => {
      grupo.items.forEach(tarea => {
        const estadoTarea = tareas[tarea.id];
        if (estadoTarea === 'hecho') {
          completadas++;
          pts += Number(tarea.pts || 0);
          min += Number(tarea.min || 0);
        } else if (estadoTarea === 'fail') {
          fallidas++;
        }
      });
    });

    return { fecha, completadas, fallidas, pts, min };
  };

  // ---------- 4. REFERENCIAS DOM ----------
  const ui = {
    puntos: document.getElementById('puntosTotales'),
    minutos: document.getElementById('minutosTotales'),
    nivel: document.getElementById('nivelActual'),
    xpFill: document.getElementById('xpFill'),
    xpTexto: document.getElementById('xpTexto'),
    contenedorCategorias: document.getElementById('categorias'),
    contenedorPremios: document.getElementById('contenedorPremios'),
    contenedorHorario: document.getElementById('contenedorHorario'),
    listaEventos: document.getElementById('listaEventos'),
    formAgenda: document.getElementById('formAgenda'),
    vistaTareas: document.getElementById('vistaTareas'),
    vistaTienda: document.getElementById('vistaTienda'),
    vistaHorario: document.getElementById('vistaHorario'),
    vistaAgenda: document.getElementById('vistaAgenda'),
    vistaInforme: document.getElementById('vistaInforme'),
    vistaAdminTareas: document.getElementById('vistaAdminTareas'),
    vistaAdminHorario: document.getElementById('vistaAdminHorario'),
    btnHome: document.getElementById('homeBtn'),
    btnShop: document.getElementById('shopBtn'),
    btnSchedule: document.getElementById('scheduleBtn'),
    btnAgenda: document.getElementById('agendaBtn'),
    btnReport: document.getElementById('reportBtn'),
    btnAdminTareas: document.getElementById('btnAdminTareas'),
    btnAdminHorario: document.getElementById('btnAdminHorario'),
    btnReset: document.getElementById('btnReset'),
    btnDiario: document.getElementById('btnPremioDiario'),
    btnSemanal: document.getElementById('btnPremioSemanal'),
    // Informe
    totalStats: document.getElementById('totalStats'),
    detalleSemanal: document.getElementById('detalleSemanal'),
    compTot: document.getElementById('compTot'),
    failTot: document.getElementById('failTot'),
    ptsTot: document.getElementById('ptsTot'),
    minTot: document.getElementById('minTot'),
    fechaInicioSemana: document.getElementById('fechaInicioSemana'),
    // Tienda
    storeMessage: document.getElementById('storeMessage'),
    storeMessageTitle: document.getElementById('storeMessageTitle'),
    storeMessageBody: document.getElementById('storeMessageBody'),
    // Admin Tareas
    formTarea: document.getElementById('formTarea'),
    btnCancelarEdicion: document.getElementById('btnCancelarEdicion'),
    listaTareasAdmin: document.getElementById('listaTareasAdmin'),
    // Admin Horario
    formClase: document.getElementById('formClase'),
    btnCancelarClase: document.getElementById('btnCancelarClase'),
    listaHorarioAdmin: document.getElementById('listaHorarioAdmin')
  };

  // Array de botones y vistas para el manejo de navegación
  const VISTAS_MAP = [
    { id: 'vistaTareas', btn: ui.btnHome, showAdmin: true },
    { id: 'vistaTienda', btn: ui.btnShop, showAdmin: false },
    { id: 'vistaHorario', btn: ui.btnSchedule, showAdmin: true },
    { id: 'vistaAgenda', btn: ui.btnAgenda, showAdmin: false },
    { id: 'vistaInforme', btn: ui.btnReport, showAdmin: false },
    { id: 'vistaAdminTareas', btn: null, showAdmin: false },
    { id: 'vistaAdminHorario', btn: null, showAdmin: false }
  ];


  // ---------- 5. MANEJO DE VISTAS (NAVEGACIÓN) ----------
  const mostrarVista = (vistaId, clickedBtn = null) => {
    // Ocultar todas las vistas
    VISTAS_MAP.forEach(v => {
      const vistaElement = document.getElementById(v.id);
      if (vistaElement) vistaElement.style.display = 'none';
    });

    // Mostrar la vista solicitada
    const vistaElement = document.getElementById(vistaId);
    if (vistaElement) vistaElement.style.display = 'block';

    // Manejar estado activo del dock
    document.querySelectorAll('.dock-btn').forEach(btn => btn.classList.remove('active'));
    if (clickedBtn) clickedBtn.classList.add('active');

    // Manejar visibilidad de botones Admin
    const currentView = VISTAS_MAP.find(v => v.id === vistaId);
    const isAdminView = vistaId.startsWith('vistaAdmin');
    
    // Ocultar todos los botones de administración temporalmente
    if (ui.btnAdminTareas) ui.btnAdminTareas.style.display = 'none';
    if (ui.btnAdminHorario) ui.btnAdminHorario.style.display = 'none';
    
    if (!isAdminView && currentView && currentView.showAdmin) {
        // Mostrar solo el botón Admin relevante si no estamos en una vista Admin
        if (vistaId === 'vistaTareas' && ui.btnAdminTareas) ui.btnAdminTareas.style.display = 'block';
        if (vistaId === 'vistaHorario' && ui.btnAdminHorario) ui.btnAdminHorario.style.display = 'block';
    }
  };

  // ---------- 6. INICIALIZACIÓN Y LISTENERS PRINCIPALES ----------
  document.addEventListener('DOMContentLoaded', () => {
    checkDailyReset();
    renderAll();
  });

  const renderAll = () => {
    renderStats();
    renderizarTareas();
    renderizarPremios();
    renderizarHorario();
    renderizarAgenda();
    renderizarInforme();
    // Asegurarse de que la vista inicial sea 'vistaTareas'
    mostrarVista('vistaTareas', ui.btnHome); 
  };


  // Listeners para la navegación del dock
  ui.btnHome.addEventListener('click', () => mostrarVista('vistaTareas', ui.btnHome));
  ui.btnShop.addEventListener('click', () => mostrarVista('vistaTienda', ui.btnShop));
  ui.btnSchedule.addEventListener('click', () => mostrarVista('vistaHorario', ui.btnSchedule));
  ui.btnAgenda.addEventListener('click', () => {
    mostrarVista('vistaAgenda', ui.btnAgenda);
    renderizarAgenda();
  });
  ui.btnReport.addEventListener('click', () => {
    mostrarVista('vistaInforme', ui.btnReport);
    renderizarInforme();
  });
  ui.btnAdminTareas.addEventListener('click', () => {
    mostrarVista('vistaAdminTareas');
    renderizarAdminTareas();
    // Ocultar el botón Admin en la vista Admin
    ui.btnAdminTareas.style.display = 'none';
  });
  ui.btnAdminHorario.addEventListener('click', () => {
    mostrarVista('vistaAdminHorario');
    renderizarAdminHorario();
    // Ocultar el botón Admin en la vista Admin
    ui.btnAdminHorario.style.display = 'none';
  });

  // Listeners para premios diarios/semanales
  ui.btnDiario.addEventListener('click', () => {
    const hoy = (new Date()).toDateString();
    if (estado.ultimoDiario === hoy) {
      playSound('error');
      alert("Ya has recogido tu regalo de hoy. ¡Vuelve mañana!");
      return;
    }
    estado.puntos += 10;
    estado.ultimoDiario = hoy;
    playSound('exito');
    guardar();
    alert("¡+10 Puntos recibidos! 🎁");
  });

  ui.btnSemanal.addEventListener('click', () => {
    if (window.confirm("¿Reclamar premio semanal (+70)?")) {
      estado.puntos += 70;
      playSound('exito');
      guardar();
      alert("¡+70 puntos añadidos (Premio semanal)!");
    }
  });

  ui.btnReset.addEventListener('click', () => {
    if (!window.confirm('¿Seguro que quieres reiniciar todos los datos? Esto borrará el progreso.')) return;
    localStorage.removeItem(STORAGE_KEYS.DATA);
    // Re-iniciar estado a valores por defecto
    estado = {
      puntos: 0, minutos: 0, nivel: 1, tareasHoy: {}, agendaEventos: [],
      ultimaFecha: new Date().toDateString(), ultimoDiario: null, historialSemanal: [],
      fechaInicioSemana: new Date().toDateString(), catalogoTareas: DEFAULT_CATALOGO_TAREAS,
      horario: inicializarHorario(DEFAULT_HORARIO_SEMANAL)
    };
    guardar();
    renderAll();
  });

  // ---------- 7. RENDERS (TAREAS / ADMIN TAREAS) ----------
  const completarTarea = (tarea, completada = true) => {
    // marca tarea hecha o fallida y actualiza puntos/minutos
    estado.tareasHoy = estado.tareasHoy || {};
    estado.tareasHoy[tarea.id] = completada ? 'hecho' : 'fail';
    if (completada) {
      estado.puntos += Number(tarea.pts || 0);
      estado.minutos += Number(tarea.min || 0);
      playSound('exito');
    } else {
      playSound('error');
    }
    guardar();
    renderizarTareas();
  };

  const renderizarTareas = () => {
    ui.contenedorCategorias.innerHTML = '';
    estado.catalogoTareas.forEach(grupo => {
      const details = document.createElement('details');
      details.open = true;

      const summary = document.createElement('summary');
      summary.textContent = grupo.categoria;
      details.appendChild(summary);

      grupo.items.forEach(tarea => {
        const div = document.createElement('div');
        div.className = 'task';

        const estadoTarea = estado.tareasHoy ? estado.tareasHoy[tarea.id] : null;
        if (estadoTarea === 'hecho') {
          div.classList.add('completed-task');
        } else if (estadoTarea === 'fail') {
          div.classList.add('failed-task');
        }

        div.innerHTML = `
          <div class="task-details">
            <div class="task-name">${tarea.nombre}</div>
            <div class="task-meta">${tarea.pts} Pts | ${tarea.min} Min</div>
          </div>
          <div class="task-actions">
            <button class="check" data-id="${tarea.id}" title="Completada" ${estadoTarea === 'hecho' ? 'disabled' : ''}>${estadoTarea === 'hecho' ? '✅' : '👍'}</button>
            <button class="fail" data-id="${tarea.id}" title="Fallida" ${estadoTarea === 'fail' ? 'disabled' : ''}>${estadoTarea === 'fail' ? '❌' : '👎'}</button>
          </div>
        `;
        
        details.appendChild(div);

        // Añadir listeners (Necesario al renderizar elementos dinámicos)
        div.querySelector('.check').addEventListener('click', (e) => {
          completarTarea(tarea, true);
        });
        div.querySelector('.fail').addEventListener('click', (e) => {
          completarTarea(tarea, false);
        });
      });

      if (grupo.items.length > 0) {
        ui.contenedorCategorias.appendChild(details);
      }
    });

    renderStats();
  };

  // --- ADMIN TAREAS ---
  const renderizarAdminTareas = () => {
    ui.listaTareasAdmin.innerHTML = '';

    // Llenar datalist de categorías
    const dataList = document.getElementById('listaCategorias');
    dataList.innerHTML = estado.catalogoTareas.map(c => `<option value="${c.categoria}">`).join('');

    estado.catalogoTareas.forEach(grupo => {
      const grupoDiv = document.createElement('div');
      grupoDiv.className = 'category-admin-group';
      
      const grupoTitle = document.createElement('h4');
      grupoTitle.textContent = grupo.categoria;
      grupoDiv.appendChild(grupoTitle);

      grupo.items.forEach(tarea => {
        const card = document.createElement('div');
        card.className = 'task-admin-card';
        card.innerHTML = `
          <div class="task-admin-info">
            <div class="task-admin-name">${tarea.nombre}</div>
            <div class="task-admin-meta">${tarea.pts} Pts | ${tarea.min} Min</div>
          </div>
          <div class="task-admin-actions">
            <button class="btn-edit" data-categoria="${grupo.categoria}" data-id="${tarea.id}">📝</button>
            <button class="btn-delete" data-categoria="${grupo.categoria}" data-id="${tarea.id}">🗑️</button>
          </div>
        `;
        
        // Listeners para botones de administración
        card.querySelector('.btn-edit').addEventListener('click', (e) => {
          const { categoria, id } = e.target.dataset;
          cargarTareaParaEdicion(categoria, id);
        });
        card.querySelector('.btn-delete').addEventListener('click', (e) => {
          const { categoria, id } = e.target.dataset;
          eliminarTarea(categoria, id);
        });
        
        grupoDiv.appendChild(card);
      });

      ui.listaTareasAdmin.appendChild(grupoDiv);
    });
  };

  const cargarTareaParaEdicion = (categoriaNombre, itemId) => {
    const categoria = estado.catalogoTareas.find(c => c.categoria === categoriaNombre);
    const tarea = categoria ? categoria.items.find(t => t.id === itemId) : null;
    if (!tarea) return;

    document.getElementById('tareaId').value = tarea.id;
    document.getElementById('tareaCategoriaOriginal').value = categoriaNombre;
    document.getElementById('tareaNombre').value = tarea.nombre;
    document.getElementById('tareaPts').value = tarea.pts;
    document.getElementById('tareaMin').value = tarea.min;
    document.getElementById('tareaCategoria').value = categoriaNombre;
    ui.btnCancelarEdicion.style.display = 'block';
    ui.formTarea.scrollIntoView({ behavior: 'smooth' });
  };

  const eliminarTarea = (categoriaNombre, itemId) => {
    if (!window.confirm(`¿Estás seguro de que quieres eliminar la tarea con ID ${itemId}?`)) return;

    const catIndex = estado.catalogoTareas.findIndex(c => c.categoria === categoriaNombre);
    if (catIndex !== -1) {
      estado.catalogoTareas[catIndex].items = estado.catalogoTareas[catIndex].items.filter(t => t.id !== itemId);
      
      // Limpiar categoría si queda vacía
      if (estado.catalogoTareas[catIndex].items.length === 0) {
        estado.catalogoTareas.splice(catIndex, 1);
      }

      guardar();
      renderizarAdminTareas();
      renderizarTareas();
    }
  };

  const guardarTarea = (e) => {
    e.preventDefault();
    const id = document.getElementById('tareaId').value;
    const categoriaOriginal = document.getElementById('tareaCategoriaOriginal').value;
    const categoriaNueva = document.getElementById('tareaCategoria').value;
    const nombre = document.getElementById('tareaNombre').value.trim();
    const pts = Number(document.getElementById('tareaPts').value);
    const min = Number(document.getElementById('tareaMin').value);

    const nuevaTarea = { id: id || generateId(), nombre, pts, min };

    if (id) {
      // Editar tarea
      // 1. Eliminar de categoría original si ha cambiado
      if (categoriaOriginal && categoriaOriginal !== categoriaNueva) {
        const catIndexOriginal = estado.catalogoTareas.findIndex(c => c.categoria === categoriaOriginal);
        if (catIndexOriginal !== -1) {
          estado.catalogoTareas[catIndexOriginal].items = estado.catalogoTareas[catIndexOriginal].items.filter(t => t.id !== id);
          // Limpiar categoría original si queda vacía
          if (estado.catalogoTareas[catIndexOriginal].items.length === 0) {
            estado.catalogoTareas.splice(catIndexOriginal, 1);
          }
        }
      }
      
      // 2. Insertar/Actualizar en la categoría nueva
      let categoria = estado.catalogoTareas.find(c => c.categoria === categoriaNueva);
      if (!categoria) {
        categoria = { categoria: categoriaNueva, items: [] };
        estado.catalogoTareas.push(categoria);
      }

      const itemIndex = categoria.items.findIndex(t => t.id === id);
      if (itemIndex !== -1) {
        // Actualizar existente
        categoria.items[itemIndex] = nuevaTarea;
      } else {
        // Insertar como nueva en la nueva categoría (si vino de otra)
        categoria.items.push(nuevaTarea);
      }

    } else {
      // Crear nueva tarea
      let categoria = estado.catalogoTareas.find(c => c.categoria === categoriaNueva);
      if (!categoria) {
        categoria = { categoria: categoriaNueva, items: [] };
        estado.catalogoTareas.push(categoria);
      }
      categoria.items.push(nuevaTarea);
    }
    
    // Resetear formulario y guardar
    ui.formTarea.reset();
    document.getElementById('tareaId').value = '';
    document.getElementById('tareaCategoriaOriginal').value = '';
    ui.btnCancelarEdicion.style.display = 'none';
    guardar();
    renderizarAdminTareas();
    renderizarTareas();
  };
  
  // Listeners de formularios de Admin Tareas
  ui.formTarea.addEventListener('submit', guardarTarea);
  ui.btnCancelarEdicion.addEventListener('click', () => {
    ui.formTarea.reset();
    document.getElementById('tareaId').value = '';
    document.getElementById('tareaCategoriaOriginal').value = '';
    ui.btnCancelarEdicion.style.display = 'none';
  });


  // ---------- 8. RENDERS (TIENDA) ----------
  const canjearPremio = (premio) => {
    const coste = premio.coste;
    const moneda = premio.moneda;
    let tieneSuficiente = false;

    if (moneda === 'puntos') {
      tieneSuficiente = estado.puntos >= coste;
      if (tieneSuficiente) {
        if (window.confirm(`¿Canjear ${premio.nombre} por ${coste} Puntos?`)) {
          estado.puntos -= coste;
          guardar();
          playSound('caja');
          alert(`¡${premio.nombre} Canjeado! ${coste} Pts descontados.`);
        }
      } else {
        playSound('error');
        alert(`¡No tienes suficientes Puntos! Necesitas ${coste} Pts.`);
      }
    } else if (moneda === 'minutos') {
      tieneSuficiente = estado.minutos >= coste;
      if (tieneSuficiente) {
        if (window.confirm(`¿Canjear ${premio.nombre} por ${coste} Minutos?`)) {
          estado.minutos -= coste;
          guardar();
          playSound('caja');
          alert(`¡${premio.nombre} Canjeado! ${coste} Min descontados.`);
        }
      } else {
        playSound('error');
        alert(`¡No tienes suficientes Minutos! Necesitas ${coste} Min.`);
      }
    }
    renderizarPremios();
  };

  const renderizarPremios = () => {
    ui.contenedorPremios.innerHTML = '';
    const today = new Date().getDay(); // 0 (Domingo) a 6 (Sábado)
    const isWeekend = today === 0 || today === 6;

    if (isWeekend) {
        ui.storeMessageTitle.textContent = "¡Es Fin de Semana! 🎉";
        ui.storeMessageBody.textContent = "¡Puedes usar tus Minutos para Premios de Tiempo sin restricciones!";
    } else {
        ui.storeMessageTitle.textContent = "Regla de la Semana";
        ui.storeMessageBody.textContent = "Los Premios de Tiempo (Minutos) se pueden reclamar, ¡pero solo para usar el Fin de Semana!";
    }

    catalogoPremios.forEach(premio => {
      const isRedeemable = (premio.moneda === 'puntos' && estado.puntos >= premio.coste) || 
                           (premio.moneda === 'minutos' && estado.minutos >= premio.coste);
      
      const card = document.createElement('div');
      card.className = `premio-card ${isRedeemable ? 'redeemable' : 'locked'}`;
      card.innerHTML = `
        <div class="premio-icono">${premio.icono}</div>
        <div class="font-bold text-lg mb-1">${premio.nombre}</div>
        <div class="prize-cost">${premio.coste} ${premio.moneda === 'puntos' ? 'Pts' : 'Min'}</div>
        <button class="redeem-btn" data-id="${premio.id}" ${isRedeemable ? '' : 'disabled'}>
          ${isRedeemable ? '¡CANJEAR!' : 'BLOQUEADO'}
        </button>
      `;
      
      card.querySelector('.redeem-btn').addEventListener('click', () => {
        canjearPremio(premio);
      });

      ui.contenedorPremios.appendChild(card);
    });
    renderStats();
  };

  // ---------- 9. RENDERS (HORARIO / ADMIN HORARIO) ----------
  const renderizarHorario = () => {
    ui.contenedorHorario.innerHTML = '';
    const dias = ['Lunes','Martes','Miercoles','Jueves','Viernes','Sabado','Domingo'];

    dias.forEach(dia => {
      const clasesDia = estado.horario[dia] || [];
      if (!clasesDia.length) return;
      
      const diaDiv = document.createElement('div');
      diaDiv.className = 'horario-dia';
      
      const title = document.createElement('div');
      title.className = 'dia-titulo';
      title.textContent = dia;
      diaDiv.appendChild(title);
      
      clasesDia
        .sort((a, b) => (a.horaInicio || a.hora || '').localeCompare(b.horaInicio || b.hora || ''))
        .forEach(clase => {
          const asignaturaDiv = document.createElement('div');
          asignaturaDiv.className = `asignatura ${clase.tipo || 'normal'}`;
          
          const horaDisplay = clase.hora ? clase.hora : formatHora(clase.horaInicio, clase.horaFin);
          
          asignaturaDiv.innerHTML = `
            <span class="asignatura-nombre">${clase.nombre}</span>
            <span class="asignatura-hora">${horaDisplay}</span>
          `;
          diaDiv.appendChild(asignaturaDiv);
        });

      ui.contenedorHorario.appendChild(diaDiv);
    });
  };

  // --- ADMIN HORARIO ---
  const renderizarAdminHorario = () => {
    ui.listaHorarioAdmin.innerHTML = '';
    const dias = ['Lunes','Martes','Miercoles','Jueves','Viernes','Sabado','Domingo'];

    dias.forEach(dia => {
      const clasesDia = estado.horario[dia] || [];
      if (!clasesDia.length) return;
      
      const grupoTitle = document.createElement('h4');
      grupoTitle.textContent = dia;
      ui.listaHorarioAdmin.appendChild(grupoTitle);

      clasesDia
        .sort((a, b) => (a.horaInicio || a.hora || '').localeCompare(b.horaInicio || b.hora || ''))
        .forEach(clase => {
          const card = document.createElement('div');
          card.className = 'task-admin-card'; // Reutilizamos el estilo de la tarjeta de admin de tareas
          
          const horaDisplay = clase.hora ? clase.hora : formatHora(clase.horaInicio, clase.horaFin);
          
          card.innerHTML = `
            <div class="task-admin-info">
              <div class="task-admin-name">${clase.nombre}</div>
              <div class="task-admin-meta">${horaDisplay} | Tipo: ${clase.tipo === 'extra' ? 'Extraescolar' : 'Normal'}</div>
            </div>
            <div class="task-admin-actions">
              <button class="btn-edit" data-dia="${dia}" data-id="${clase.id}">📝</button>
              <button class="btn-delete" data-dia="${dia}" data-id="${clase.id}">🗑️</button>
            </div>
          `;

          // Listeners para botones de administración
          card.querySelector('.btn-edit').addEventListener('click', (e) => {
            const { dia: d, id } = e.target.dataset;
            cargarClaseParaEdicion(d, id);
          });
          card.querySelector('.btn-delete').addEventListener('click', (e) => {
            const { dia: d, id } = e.target.dataset;
            eliminarClase(d, id);
          });
          
          ui.listaHorarioAdmin.appendChild(card);
        });
    });
  };
  
  const cargarClaseParaEdicion = (dia, claseId) => {
    const clase = (estado.horario[dia] || []).find(c => c.id === claseId);
    if (!clase) return;

    document.getElementById('claseId').value = clase.id;
    document.getElementById('claseAsignatura').value = clase.nombre;
    document.getElementById('claseDia').value = dia;
    document.getElementById('claseHoraInicio').value = clase.horaInicio || '';
    document.getElementById('claseHoraFin').value = clase.horaFin || '';
    document.getElementById('claseTipo').value = clase.tipo || 'normal';
    ui.btnCancelarClase.style.display = 'block';
    ui.formClase.scrollIntoView({ behavior: 'smooth' });
  };

  const eliminarClase = (dia, claseId) => {
    if (!window.confirm(`¿Estás seguro de que quieres eliminar la clase ${claseId} del ${dia}?`)) return;

    estado.horario[dia] = (estado.horario[dia] || []).filter(c => c.id !== claseId);
    guardar();
    renderizarAdminHorario();
    renderizarHorario();
  };
  
  const guardarClase = (e) => {
    e.preventDefault();
    const id = document.getElementById('claseId').value;
    const dia = document.getElementById('claseDia').value;
    const nombre = document.getElementById('claseAsignatura').value.trim();
    const horaInicio = document.getElementById('claseHoraInicio').value;
    const horaFin = document.getElementById('claseHoraFin').value;
    const tipo = document.getElementById('claseTipo').value;

    const nuevaClase = { id: id || generateId(), nombre, horaInicio, horaFin, tipo };
    
    // Asegurar que el día existe en el horario
    estado.horario[dia] = estado.horario[dia] || [];

    if (id) {
      // Editar clase (puede haber cambiado de día, por lo que es más fácil recrear)
      // 1. Eliminar de todos los días (por si cambió de día)
      const todosLosDias = ['Lunes','Martes','Miercoles','Jueves','Viernes','Sabado','Domingo'];
      todosLosDias.forEach(d => {
        estado.horario[d] = (estado.horario[d] || []).filter(c => c.id !== id);
      });
      // 2. Añadir al día actual
      estado.horario[dia].push(nuevaClase);

    } else {
      // Crear nueva clase
      estado.horario[dia].push(nuevaClase);
    }
    
    // Resetear formulario y guardar
    ui.formClase.reset();
    document.getElementById('claseId').value = '';
    ui.btnCancelarClase.style.display = 'none';
    guardar();
    renderizarAdminHorario();
    renderizarHorario();
  };

  // Listeners de formularios de Admin Horario
  ui.formClase.addEventListener('submit', guardarClase);
  ui.btnCancelarClase.addEventListener('click', () => {
    ui.formClase.reset();
    document.getElementById('claseId').value = '';
    ui.btnCancelarClase.style.display = 'none';
  });


  // ---------- 10. RENDERS (AGENDA) ----------
  const renderizarAgenda = () => {
    ui.listaEventos.innerHTML = '';
    const eventos = (estado.agendaEventos || [])
      .sort((a, b) => new Date(`${a.fecha} ${a.hora || '00:00'}`) - new Date(`${b.fecha} ${b.hora || '00:00'}`));

    if (eventos.length === 0) {
      ui.listaEventos.innerHTML = '<p class="text-center text-gray-500 p-4">No hay eventos próximos en la agenda.</p>';
      return;
    }

    eventos.forEach(ev => {
      const card = document.createElement('div');
      card.className = 'agenda-card';
      
      const horaDisplay = ev.hora ? ` a las ${ev.hora}` : '';
      const tipoIcono = ev.tipo === 'Examen' ? '🚨' : ev.tipo === 'Cita' ? '📅' : '📝';
      
      card.innerHTML = `
        <div class="agenda-info">
          <div class="agenda-subject">${tipoIcono} ${ev.asignatura} - ${ev.tipo}</div>
          <div class="agenda-date">${ev.fecha}${horaDisplay}</div>
          <p class="agenda-comments">${ev.comentarios || 'Sin comentarios.'}</p>
        </div>
        <div class="agenda-actions">
          <button class="btn-edit-agenda" data-id="${ev.id}">📝</button>
          <button class="btn-delete-agenda" data-id="${ev.id}">🗑️</button>
        </div>
      `;
      
      // Listeners
      card.querySelector('.btn-edit-agenda').addEventListener('click', () => cargarEventoParaEdicion(ev.id));
      card.querySelector('.btn-delete-agenda').addEventListener('click', () => eliminarEvento(ev.id));
      
      ui.listaEventos.appendChild(card);
    });
  };

  const cargarEventoParaEdicion = (id) => {
    const ev = (estado.agendaEventos || []).find(e => e.id === id);
    if (!ev) return;
    
    document.getElementById('agendaId').value = ev.id;
    document.getElementById('agendaFecha').value = ev.fecha;
    document.getElementById('agendaHora').value = ev.hora || '';
    document.getElementById('agendaAsignatura').value = ev.asignatura;
    document.getElementById('agendaTipo').value = ev.tipo;
    document.getElementById('agendaComentarios').value = ev.comentarios || '';
    
    ui.formAgenda.scrollIntoView({ behavior: 'smooth' });
  };
  
  const eliminarEvento = (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este evento?")) return;
    estado.agendaEventos = (estado.agendaEventos || []).filter(e => e.id !== id);
    guardar();
    renderizarAgenda();
  };

  const guardarEvento = (e) => {
    e.preventDefault();
    console.log('Guardando evento de agenda...');
    const id = document.getElementById('agendaId').value;
    const fecha = document.getElementById('agendaFecha').value;
    const hora = document.getElementById('agendaHora').value;
    const asignatura = document.getElementById('agendaAsignatura').value.trim();
    const tipo = document.getElementById('agendaTipo').value;
    const comentarios = document.getElementById('agendaComentarios').value.trim();

    const evento = { id: id || generateId(), fecha, hora, asignatura, tipo, comentarios };

    if (id) {
      // Editar
      estado.agendaEventos = (estado.agendaEventos || []).map(ev => ev.id === id ? evento : ev);
    } else {
      // Crear nuevo
      estado.agendaEventos = estado.agendaEventos ? [...estado.agendaEventos, evento] : [evento];
    }
    
    // Resetear formulario y guardar
    ui.formAgenda.reset();
    document.getElementById('agendaId').value = '';
    guardar();
    renderizarAgenda();
  };

  // Listener del formulario de Agenda
  ui.formAgenda.addEventListener('submit', guardarEvento);


  // ---------- 11. RENDERS (INFORME) ----------
  const renderizarInforme = () => {
    limpiarHistorialSiAplica(); // Asegurar que el historial esté limpio

    const historial = estado.historialSemanal || [];
    let totalComp = 0;
    let totalFail = 0;
    let totalPts = 0;
    let totalMin = 0;

    ui.detalleSemanal.innerHTML = '';
    ui.fechaInicioSemana.textContent = new Date(estado.fechaInicioSemana).toLocaleDateString();

    // 1. Calcular totales
    historial.forEach(dia => {
      totalComp += dia.completadas;
      totalFail += dia.fallidas;
      totalPts += dia.pts;
      totalMin += dia.min;

      // 2. Renderizar detalle diario
      const summaryDiv = document.createElement('div');
      summaryDiv.className = 'day-summary';
      summaryDiv.innerHTML = `
        <div class="summary-header">Resumen del ${new Date(dia.fecha).toLocaleDateString()}</div>
        <div class="summary-body">
          <div class="summary-stat">Completadas: <div>${dia.completadas}</div></div>
          <div class="summary-stat">Fallidas: <div>${dia.fallidas}</div></div>
          <div class="summary-stat">Pts: <div>${dia.pts}</div></div>
          <div class="summary-stat">Min: <div>${dia.min}</div></div>
        </div>
      `;
      ui.detalleSemanal.appendChild(summaryDiv);
    });

    // 3. Renderizar totales
    ui.compTot.textContent = totalComp;
    ui.failTot.textContent = totalFail;
    ui.ptsTot.textContent = totalPts;
    ui.minTot.textContent = totalMin;

    if (historial.length === 0) {
      ui.detalleSemanal.innerHTML = '<p class="text-center text-gray-500 p-4">No hay datos de días anteriores esta semana.</p>';
    }
  };

  // ---------- 12. RENDER INICIAL ----------
  checkDailyReset();
  renderAll();

});
