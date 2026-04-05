# 🧙‍♂️ Strands of Fate — Marauder App
### *I solemnly swear that I am up to no good*

**Versión 8.0** · Aplicación web móvil para gestión de fichas de personaje

---

## 📋 Ficha Técnica

| Campo | Valor |
|---|---|
| **Versión** | 8.0 |
| **Plataforma** | Web — GitHub Pages (móvil, tablet, escritorio) |
| **Archivos** | `index.html` · `style.css` · `app.js` |
| **Sistema de juego** | Strands of Fate (Fate Core adaptado) |
| **Temática** | Harry Potter / Mundo Mágico |
| **Fuentes** | Playfair Display · Lato (Google Fonts) |
| **Iconos** | Lucide Icons (unpkg CDN) |
| **Audio** | Web Audio API (sin dependencias externas) |
| **Autor** | Francisco Carballo (Supervisor) |

---

## 1. Descripción General

Strands of Fate es una aplicación web para gestionar fichas de personaje del sistema de rol **Strands of Fate**, ambientada en el universo del Mundo Mágico de Harry Potter.

Optimizada para uso en smartphone durante partidas presenciales, pero completamente funcional en tablet y escritorio. Permite crear, editar, guardar y cargar personajes completos mediante archivos JSON portables.

La **versión 8.0** introduce un sistema de habilidades distribuibles, aspectos fijos estructurados, listas predefinidas de Artes Arcanas y Varitas cargadas desde Excel, un panel de modificadores desglosado para las tiradas, efectos visuales animados y sonidos generados por Web Audio API.

---

## 2. Arquitectura de Archivos

```
├── index.html                       # Estructura HTML — cuatro secciones + tab bar
├── style.css                        # Hoja de estilos — paleta, tipografía, responsive
├── app.js                           # Lógica JavaScript vanilla — estado, dados, JSON
├── artes_arcanas_harry_potter.xlsx  # Fuente de datos — Artes Arcanas (13 entradas)
├── varitas_magicas_3x3x3.xlsx       # Fuente de datos — Varitas (27 combinaciones)
└── README.md                        # Este documento
```

---

## 3. Sistema de Diseño Visual (v8.0)

### 3.1 Paleta de Colores

| Variable CSS | Hex | Uso |
|---|---|---|
| `--bg` | `#0d0d0d` | Fondo base |
| `--surface` | `#161616` | Superficie del contenedor |
| `--surface2` | `#1e1e1e` | Tarjetas y secciones |
| `--surface3` | `#252525` | Elementos interactivos |
| `--border` | `#2a2a2a` | Borde por defecto |
| `--border-light` | `#363636` | Borde en hover/énfasis |
| `--cream` | `#e8dcc8` | Texto principal |
| `--cream-dim` | `#a09080` | Texto secundario |
| `--gold` | `#c9a84c` | Acento principal |
| `--gold-dim` | `#7a6530` | Dorado apagado |
| `--gold-glow` | `rgba(201,168,76,0.12)` | Fondo dorado sutil |
| `--text` | `#cfc4b0` | Texto cuerpo |
| `--text-dim` | `#5e5650` | Labels y metadatos |
| `--blood` | `#8b2a2a` | Botón de dados, desventajas |
| `--blood-light` | `#b03a3a` | Hover del botón de dados |
| `--green` | `#2a6a3a` | Éxito (interno) |
| `--green-light` | `#70c890` | Resultado exitoso en dados |

### 3.2 Tipografía

| Familia | Pesos | Uso |
|---|---|---|
| **Playfair Display** | 400, 400i, 600 | Títulos, nombre, resultado de dados, contador de destino |
| **Lato** | 300 (default), 400, 700 | Todo el texto de interfaz, labels, botones, inputs |

### 3.3 Breakpoints Responsive

| Breakpoint | Ancho | Comportamiento |
|---|---|---|
| Móvil pequeño | < 380px | Padding reducido, iconos 16px, fuentes compactas |
| Móvil estándar | < 600px | Layout base — columnas 2×2, tab bar pastilla |
| Tablet | ≥ 600px | Stats grid de 4 columnas, contenedor 640px |
| Escritorio | ≥ 900px | Contenedor 800px flotante con sombra, estrés en dos columnas |

---

## 4. Secciones de la Aplicación

### 4.1 Pestaña Perfil

**Avatar y nombre**
- Imagen circular (72×72px) configurable por URL
- Campo de nombre en Playfair Display

**Stats básicos** — grid 2×2
- Origen · Concepto · Recuperación · Puntos de Destino (contador +/−)

**Habilidades** *(nuevo en v8.0)*
- 8 habilidades distribuidas en dos grupos:
  - **Físicas**: Atletismo, Combate, Sigilo, Resistencia
  - **Mentales**: Conocimiento, Percepción, Voluntad, Social
- Escala de niveles por selector:

| Nivel | Nombre | Bonus |
|---|---|---|
| 0 | Sin entrenar | +0 |
| 1 | Aprendiz | +1 |
| 2 | Alumno | +2 |
| 3 | Avanzado | +3 |
| 4 | Mago | +4 |
| 5 | Auror | +5 |

**Vínculos y Esencia** *(rediseñado en v8.0)*
- 5 campos fijos con texto + modificador numérico:
  - Aspecto Definidor
  - Aspecto de Trasfondo
  - Aspecto de Conflicto
  - Aspecto Libre
  - **Desventaja** (borde rojo lateral, badge de advertencia)

### 4.2 Pestaña Magia

**Artes Arcanas** *(rediseñado en v8.0)*
- 5 slots fijos con `<select>` que carga las 13 artes del Excel
- Al seleccionar un arte se muestra su descripción en cursiva
- Campo numérico de nivel por arte (descuenta del presupuesto de Esencia)
- Esencia libre = Recuperación − Σ niveles de artes

| Arte | Dificultad |
|---|---|
| Encantamientos (Charms) | 1 |
| Herbología (Herbology) | 1 |
| Cuidado de Criaturas Mágicas | 1 |
| Vuelo (Flying) | 1 |
| Pociones (Potions) | 2 |
| Defensa Contra las Artes Oscuras | 2 |
| Aritmancia (Arithmancy) | 2 |
| Adivinación (Divination) | 2 |
| Runas Antiguas (Ancient Runes) | 2 |
| Transformaciones (Transfiguration) | 3 |
| Artes Oscuras (Dark Arts) | 3 |
| Oclumancia | 3 |
| Legeremancia | 3 |

**Varita Mágica** *(nuevo en v8.0)*
- 1 selector con las 27 combinaciones del sistema 3×3×3:
  - **Madera**: Roble, Acebo, Sauce
  - **Núcleo**: Pluma de fénix, Fibra de corazón de dragón, Pelo de unicornio
  - **Decoración**: Empuñadura de plata grabada, Incrustaciones de cristal, Runas talladas
- Al seleccionar se muestran los chips de ventajas (ataque / defensa / control)
- El bono total de la varita se suma automáticamente a las tiradas

**Reliquias y Objetos** — lista dinámica con texto y modificador

**Libro de Hechizos** — hechizos aprendidos con nombre, tipo, estrellas y efecto. Acceso al Grimorio completo (63 hechizos, filtros por tipo y dificultad)

**Proezas y Talentos** — textarea libre

### 4.3 Pestaña Juego

**Esfera de Adivinación** *(ampliado en v8.0)*

El jugador elige el Arte con la que actúa y pulsa *Invocar*. Antes de lanzar puede revisar y ajustar el panel de modificadores:

| Modificador | Fuente | Comportamiento |
|---|---|---|
| Arte Arcana | Nivel del arte seleccionado | Automático al elegir en el selector |
| Aspecto Definidor | Mod del Aspecto Definidor (Perfil) | Automático |
| Hechizo | Dificultad del hechizo seleccionado | Selector de hechizos aprendidos |
| Varita | Suma de ventajas de la varita | Automático al tener varita equipada |
| Punto de Destino | +1 opcional | Checkbox — consume 1 PD al invocar |

**Fórmula de tirada:**
```
Final = 4dF + Arte + Aspecto + Hechizo + Varita + PD(opcional)
```

**Efectos visuales:**
- Animación de 8 frames rápidos simulando el azar antes del resultado
- Resultado coloreado: 🟢 verde si ≥ +3, 🔴 rojo si ≤ 0, dorado en rango intermedio
- Desglose `Dados: [...] | Mods: +X = Total` bajo el resultado

**Efectos de sonido (Web Audio API):**
- Éxito (≥ +3): tono ascendente 440→880 Hz
- Fracaso (≤ −1): tono descendente 300→150 Hz
- Neutro: tono medio 330→550 Hz
- Aprender hechizo: acorde de tres notas (ascendente en éxito, descendente en fallo)

**Estrés Físico y Mental**
- 5 checkboxes por pista
- Consecuencias leve / moderada / grave con fondos rojizos de intensidad creciente

### 4.4 Pestaña Archivo
- **Crónicas de Viaje** — textarea para notas de campaña
- **Configuración** — URL de avatar, botón *Guardar* (JSON) y *Cargar* (JSON)

---

## 5. Lógica JavaScript (`app.js`)

### Datos embebidos

| Constante | Entradas | Fuente |
|---|---|---|
| `ARTES_ARCANAS` | 13 artes | `artes_arcanas_harry_potter.xlsx` |
| `VARITAS` | 27 combinaciones | `varitas_magicas_3x3x3.xlsx` |
| `HABILIDADES_DEF` | 8 habilidades | Definición interna |
| `NIVELES_HAB` | 6 niveles (0–5) | Definición interna |
| `GRIMORIO` | 63 hechizos | Catálogo interno |
| `TIPO_COLORES` | 7 tipos | Paleta interna |

### Navegación

| Función | Descripción |
|---|---|
| `showTab(tabId, el)` | Activa sección y tab. Llama a `buildRollPanel()` al entrar en Juego |

### Habilidades

| Función | Descripción |
|---|---|
| `buildHabilidades()` | Genera los 8 selectores agrupados en Físicas / Mentales |
| `getHabilidadesData()` | Devuelve objeto `{key: valor}` de todas las habilidades |

### Aspectos

| Función | Descripción |
|---|---|
| `buildAspectos()` | Renderiza 5 campos fijos (4 + 1 desventaja) |
| `getAspectosData()` | Devuelve array `[{t, m, tipo}]` |
| `setAspectosData(arr)` | Restaura datos al importar |

### Artes Arcanas

| Función | Descripción |
|---|---|
| `buildArtesArcanas()` | Genera 5 slots con selector del catálogo |
| `onArteChange(i)` | Actualiza descripción y reconstruye panel de tirada |
| `getArtesData()` | Devuelve array `[{n, v}]` |
| `setArtesData(arr)` | Restaura datos al importar |
| `updateSkillBudget()` | Recalcula Esencia libre y refresca panel |

### Varita

| Función | Descripción |
|---|---|
| `buildVaritaSelector()` | Genera selector con las 27 varitas |
| `onVaritaChange()` | Muestra chips de ventajas y actualiza panel de tirada |
| `getVaritaBonusTotal()` | Suma numérica de todas las ventajas de la varita activa |

### Panel de Tirada

| Función | Descripción |
|---|---|
| `buildRollPanel()` | Orquesta `buildSkillSelector()` + `buildRollModifiers()` |
| `buildSkillSelector()` | Reconstruye el `<select>` de artes en Juego |
| `buildRollModifiers()` | Renderiza el panel de modificadores desglosados |
| `updateRollTotals()` | Recalcula el total de mods en tiempo real |

### Dados y Audio

| Función | Descripción |
|---|---|
| `executeSelectedRoll()` | Lanza 4dF, aplica todos los mods, consume PD si aplica |
| `animateDice(dice, final, bonus)` | 8 frames de animación antes del resultado final |
| `getRollClass(val)` | Devuelve clase CSS según resultado (`roll-exito`, `roll-fallo`, `roll-neutral`) |
| `playDiceSound(resultado)` | Genera sonido via Web Audio API según el resultado |
| `playLearnSound(exito)` | Acorde de tres notas al aprender hechizo |

### Persistencia (JSON completo)

| Función | Descripción |
|---|---|
| `exportCharacter()` | Serializa toda la ficha (v8.0) y descarga `.json` |
| `importCharacter(event)` | Restaura completamente el estado desde un archivo JSON |

---

## 6. Formato de Exportación JSON (v8.0)

```json
{
  "version": "8.0",
  "campaign": "Nombre de la campaña",
  "name":     "Nombre del personaje",
  "recovery": 3,
  "fate":     3,
  "age":      "Origen",
  "concept":  "Concepto",
  "stunts":   "Proezas",
  "notes":    "Crónicas",
  "charImg":  "https://url-imagen.jpg",
  "consequences": {
    "pMild": "", "pMod": "", "pSev": "",
    "mMild": "", "mMod": "", "mSev": ""
  },
  "habilidades": {
    "atletismo": 2, "combate": 1, "sigilo": 0, "resistencia": 1,
    "conocimiento": 3, "percepcion": 2, "voluntad": 1, "social": 0
  },
  "aspects": [
    { "t": "Aspecto Definidor", "m": 2, "tipo": "positivo" },
    { "t": "Trasfondo",        "m": 1, "tipo": "positivo" },
    { "t": "Conflicto",        "m": 0, "tipo": "positivo" },
    { "t": "Libre",            "m": 1, "tipo": "positivo" },
    { "t": "Mi desventaja",    "m": -1, "tipo": "negativo" }
  ],
  "skills": [
    { "n": "Encantamientos (Charms)", "v": 3 },
    { "n": "Pociones (Potions)",      "v": 2 }
  ],
  "varita": 18,
  "items":  [{ "t": "Capa de invisibilidad", "m": 1 }],
  "spells": [
    { "nombre": "Expelliarmus", "efecto": "Desarma al oponente",
      "dificultad": 1, "tipo": "Defensivo" }
  ],
  "stressPhys": [false, false, false, false, false],
  "stressMent": [false, false, false, false, false]
}
```

> El campo `varita` es el índice (0–26) del array `VARITAS` en `app.js`.

---

## 7. Barra de Navegación

```
Posición:   absolute, bottom: 12px, left/right: 10px
Forma:      border-radius: 18px (pastilla flotante)
Fondo:      var(--surface) con borde var(--border-light)
Sombra:     0 4px 24px rgba(0,0,0,0.6)
Iconos:     user · wand-2 · dices · scroll  (Lucide Icons)
Tab activo: color var(--gold) + fondo var(--gold-glow)
```

---

## 8. Despliegue

1. Subir `index.html`, `style.css` y `app.js` a la rama `main`
2. Ir a **Settings → Pages → Branch: main, carpeta: / (root)**
3. La URL pública será `https://<usuario>.github.io/<repositorio>/`

No requiere backend, base de datos ni proceso de build. Compatible con cualquier navegador moderno en iOS, Android y escritorio.

🔗 **Demo:** https://carbaviana-arch.github.io/Strandsofpotter/

---

## 9. Changelog

### v8.0 — Sistema de Habilidades, Artes, Varita y Tirada Compleja
- **Habilidades**: 8 habilidades (4 físicas + 4 mentales) con escala Aprendiz→Auror (+1 a +5)
- **Vínculos y Esencia**: 5 campos fijos estructurales (4 positivos + 1 Desventaja con borde rojo)
- **Artes Arcanas**: 5 slots predefinidos con selector de las 13 artes del Excel, descripción inline y nivel individual
- **Varita Mágica**: selector de las 27 combinaciones 3×3×3 del Excel, con chips de ventajas y bono automático a tiradas
- **Panel de modificadores**: desglose completo en la Esfera — Arte, Aspecto Definidor, Hechizo, Varita, Punto de Destino opcional con consumo automático
- **Efectos visuales de dados**: animación de 8 frames pre-resultado; color del número según resultado (verde / rojo / dorado)
- **Efectos de sonido**: Web Audio API sin dependencias — tonos adaptativos al resultado y al aprendizaje de hechizos
- **JSON completo**: habilidades, aspectos estructurados, artes, índice de varita, hechizos (en memoria), estado de checkboxes de estrés, campo `version`
- **Responsive**: breakpoints para móvil pequeño (<380px), tablet (≥600px) y escritorio (≥900px) con contenedor flotante
- Eliminado `localStorage` para hechizos — fuente de verdad en memoria, persistencia 100% en JSON

### v7.1 — Rediseño Visual Completo
- Sistema de diseño oscuro: `#0d0d0d`, paleta crema/dorado, sin imagen de fondo
- Tipografía: Playfair Display + Lato
- Tab bar como pastilla flotante; tarjetas `.card` con borde fino
- Grimorio con filtros por tipo y dificultad, aprendizaje por Reto o Puntos de Destino

### v6.9
- Estética de pergamino con `backdrop-filter: blur`
- Tipografía MedievalSharp

---

## 10. Créditos

| Rol | Nombre |
|---|---|
| Supervisor | Francisco Carballo |
| Desarrollo v6.x | Gemini (Google) |
| Rediseño v7.1 | Claude (Anthropic) |
| Desarrollo v8.0 | Claude (Anthropic) |
| Sistema de juego | Strands of Fate — Evil Hat Productions |
| Universo | Harry Potter — J.K. Rowling / Wizarding World |
| Iconos | [Lucide](https://lucide.dev) — licencia ISC |
| Fuentes | [Google Fonts](https://fonts.google.com) — Open Font License |
