# 🧙‍♂️ Strands of Fate — Marauder App
### *I solemnly swear that I am up to no good*

**Versión 7.1** · Aplicación web móvil para gestión de fichas de personaje

---

## 📋 Ficha Técnica

| Campo | Valor |
|---|---|
| **Versión** | 7.1 |
| **Plataforma** | Web — GitHub Pages (móvil, PWA-ready) |
| **Archivos** | `index.html` · `style.css` · `app.js` |
| **Sistema de juego** | Strands of Fate (Fate Core adaptado) |
| **Temática** | Harry Potter / Mundo Mágico |
| **Fuentes** | Playfair Display · Lato (Google Fonts) |
| **Iconos** | Lucide Icons (unpkg CDN) |
| **Autor** | Francisco Carballo (Supervisor) |

---

## 1. Descripción General

Strands of Fate es una aplicación web móvil para gestionar fichas de personaje del sistema de rol **Strands of Fate**, ambientada en el universo del Mundo Mágico de Harry Potter.

Está optimizada para uso en smartphone durante partidas presenciales. Permite crear, editar, guardar y cargar personajes completos mediante archivos JSON portables.

La **versión 7.1** introduce un rediseño visual completo basado en una estética oscura y elegante — fondo negro, acentos en crema y dorado — en sustitución del anterior diseño de pergamino con transparencias y glassmorphism.

---

## 2. Arquitectura de Archivos

```
├── index.html       # Estructura HTML — cuatro secciones + tab bar
├── style.css        # Hoja de estilos — paleta, tipografía, componentes
├── app.js           # Lógica JavaScript vanilla — estado, dados, JSON
└── README.md        # Este documento
```

---

## 3. Sistema de Diseño Visual (v7.1)

### 3.1 Paleta de Colores

| Variable CSS | Hex | Uso |
|---|---|---|
| `--bg` | `#0d0d0d` | Fondo base de la aplicación |
| `--surface` | `#161616` | Superficie principal del contenedor |
| `--surface2` | `#1e1e1e` | Tarjetas y secciones internas |
| `--surface3` | `#252525` | Elementos interactivos (botones, inputs) |
| `--border` | `#2a2a2a` | Borde por defecto, sutil |
| `--border-light` | `#363636` | Borde en hover/énfasis |
| `--cream` | `#e8dcc8` | Texto principal |
| `--cream-dim` | `#a09080` | Texto secundario y placeholders |
| `--gold` | `#c9a84c` | Acento principal — titulillos, contadores |
| `--gold-dim` | `#7a6530` | Dorado apagado — bordes activos |
| `--text` | `#cfc4b0` | Texto general de cuerpo |
| `--text-dim` | `#5e5650` | Labels y metadatos |
| `--blood` | `#8b2a2a` | Botón de lanzamiento de dados |
| `--blood-light` | `#b03a3a` | Hover del botón de dados |

### 3.2 Tipografía

| Familia | Pesos | Uso |
|---|---|---|
| **Playfair Display** | 400, 400i, 600 | Títulos, nombre del personaje, resultado de dados, contador de destino |
| **Lato** | 300 (default), 400, 700 | Todo el texto de interfaz, labels, botones, inputs |

### 3.3 Componentes de Tarjeta (`.card`)

```css
background:    var(--surface2)  /* #1e1e1e */
border:        1px solid var(--border)
border-radius: 12px
padding:       14px 16px
margin-bottom: 14px
```

---

## 4. Secciones de la Aplicación

### 4.1 Pestaña Perfil
- Avatar circular (78×78px) con URL de imagen personalizable
- Campo de nombre del personaje — tipografía Playfair Display
- Grid 2×2 de stats básicos:
  - **Origen** — texto libre
  - **Concepto** — texto libre
  - **Recuperación** — número (controla el presupuesto de Artes)
  - **Puntos de Destino** — contador +/− con display dorado
- **Vínculos y Esencia** — lista dinámica de aspectos con texto y modificador numérico

### 4.2 Pestaña Magia
- **Artes Arcanas** — lista dinámica de habilidades con nombre y valor. Muestra la Esencia Libre en tiempo real (`Recuperación − Σ valores`)
- **Reliquias y Objetos** — lista dinámica con texto y modificador
- **Libro de Hechizos** — lista de hechizos con nombre y textarea de efecto. Borde izquierdo dorado como marcador visual
- **Proezas y Talentos** — textarea libre

### 4.3 Pestaña Juego
- **Esfera de Adivinación** — lanzador de dados 4dF. Selecciona un Arte y pulsa *Invocar*. Muestra la puntuación final y los símbolos individuales `[+]` `[  ]` `[-]`
- **Estrés Físico** — 5 checkboxes + consecuencias leve / moderada / grave
- **Estrés Mental** — idéntica estructura al estrés físico

> Los fondos de las consecuencias son rojos semitransparentes de intensidad creciente: leve `rgba(139,42,42,0.18)` → moderada `0.35` → grave `0.55`

### 4.4 Pestaña Archivo
- **Crónicas de Viaje** — textarea para notas de campaña
- **Configuración** — URL de imagen del avatar, botón *Guardar* (exporta JSON) y botón *Cargar* (importa JSON)

---

## 5. Lógica JavaScript (`app.js`)

### Navegación
| Función | Descripción |
|---|---|
| `showTab(tabId, element)` | Activa la sección indicada y marca el tab. Dispara `updateSkillSelector()` al entrar en Juego |

### Filas Dinámicas
| Función | Descripción |
|---|---|
| `addAspect(text, mod)` | Añade fila a Vínculos y Esencia |
| `addItem(text, mod)` | Añade fila a Reliquias y Objetos |
| `createRow(containerId, text, mod, placeholder)` | Función base — input texto + input numérico + botón eliminar |
| `addSkill(name, val)` | Añade fila a Artes Arcanas. Dispara `updateSkillBudget()` |
| `addSpell(name, desc)` | Añade entrada al Libro de Hechizos |

### Presupuesto de Esencia
| Función | Descripción |
|---|---|
| `updateSkillBudget()` | Calcula `Esencia Libre = Recuperación − Σ valores`. Colorea en rojo si es negativo |
| `updateSkillSelector()` | Reconstruye el `<select>` de la Esfera con todas las Artes activas |

### Dados
| Función | Descripción |
|---|---|
| `executeSelectedRoll()` | Lanza 4 dados Fate (−1, 0, +1), suma el bonus del Arte seleccionado y muestra resultado |

### Persistencia
| Función | Descripción |
|---|---|
| `exportCharacter()` | Serializa toda la ficha a JSON y descarga como `<nombre>_<campaña>.json` |
| `importCharacter(event)` | Lee un JSON y restaura completamente el estado de la app |
| `updateImage()` | Actualiza el src del avatar con la URL introducida |
| `updateFate(val)` | Incrementa/decrementa Puntos de Destino (mínimo 0) |

---

## 6. Barra de Navegación

```
Posición:      absolute, bottom: 14px, left/right: 12px
Forma:         border-radius: 18px (pastilla flotante)
Fondo:         var(--surface) con borde var(--border-light)
Sombra:        0 4px 24px rgba(0,0,0,0.6)
Iconos:        user · wand-2 · dices · scroll  (Lucide Icons)
Tab activo:    color var(--gold)
Tab inactivo:  color var(--text-dim)
```

---

## 7. Formato de Exportación JSON

```json
{
  "campaign": "Nombre de la campaña",
  "name":     "Nombre del personaje",
  "recovery": 3,
  "fate":     3,
  "age":      "Origen",
  "concept":  "Concepto",
  "stunts":   "Texto de proezas",
  "notes":    "Crónicas de viaje",
  "charImg":  "https://url-imagen.jpg",
  "consequences": {
    "pMild": "", "pMod": "", "pSev": "",
    "mMild": "", "mMod": "", "mSev": ""
  },
  "aspects": [ { "t": "Aspecto", "m": 0 } ],
  "skills":  [ { "n": "Arte", "v": 2 } ],
  "items":   [ { "t": "Objeto", "m": 1 } ],
  "spells":  [ { "n": "Hechizo", "d": "Efecto..." } ]
}
```

---

## 8. Despliegue

1. Subir `index.html`, `style.css` y `app.js` a la rama `main`
2. Ir a **Settings → Pages → Branch: main, carpeta: / (root)**
3. La URL pública será `https://<usuario>.github.io/<repositorio>/`

No requiere backend, base de datos ni proceso de build. Compatible con cualquier navegador moderno en iOS y Android.

🔗 **Demo:** https://carbaviana-arch.github.io/Strandsofpotter/

---

## 9. Changelog

### v7.1 — Rediseño Visual Completo
- Nuevo sistema de diseño: fondo oscuro `#0d0d0d`, paleta crema/dorado, sin imagen de fondo
- Tipografía: **Playfair Display** (títulos) + **Lato** (cuerpo) — elimina MedievalSharp e Inter
- Componentes en tarjetas `.card` con borde fino y `border-radius: 12px`
- Tab bar rediseñada: pastilla flotante con borde fino, sin glassmorphism
- Botones: transparentes con borde dorado fino, hover sutil
- Inputs: borde inferior fino, sin fondo visible, transición al foco
- Contador de Puntos de Destino: botones circulares con borde fino
- Selector de Artes: estilo nativo con chevron SVG personalizado
- Resultado de dados: Playfair Display dorado a 3.2rem
- Consecuencias: fondos rojizos semitransparentes con `border-radius`
- `index.html`: secciones Magia y Archivo envueltas en `.card`

### v6.9
- Estética de pergamino con `backdrop-filter: blur`
- Imagen de fondo: `oath-of-the-marauders-map-rty5hmjpco2j92s6.jpg`
- Tipografía MedievalSharp para títulos
- Tab bar con fondo oscuro y blur

---

## 10. Créditos

| Rol | Nombre |
|---|---|
| Supervisor | Francisco Carballo |
| Desarrollo v6.x | Gemini (Google) |
| Rediseño v7.1 | Claude (Anthropic) |
| Sistema de juego | Strands of Fate — Evil Hat Productions |
| Universo | Harry Potter — J.K. Rowling / Wizarding World |
| Iconos | [Lucide](https://lucide.dev) — licencia ISC |
| Fuentes | [Google Fonts](https://fonts.google.com) — Open Font License |
