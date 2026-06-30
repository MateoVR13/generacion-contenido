# SCORM/PDF JSON Contract

Use this contract for JSON consumed by the SCORM/PDF template app.

## Root Shape

New asignatura generation produces **N independent JSON files** (one per tema; AG uses a VARIABLE N derived from the syllabus and validated by the docente, NOT a fixed count):

- `<slug-asignatura>-contenido-01.json`
- `<slug-asignatura>-contenido-02.json`
- … hasta …
- `<slug-asignatura>-contenido-NN.json` (numeración con dos dígitos)

Each file must be valid on its own and must follow this root shape:

```json
{
  "subject": {},
  "scorm": {
    "labels": {},
    "sectionOrder": [],
    "sections": {}
  },
  "pdf": {
    "sectionOrder": [],
    "sections": {}
  }
}
```

Required:

- `subject.title`
- `subject.program`
- `subject.contentNumber`
- `subject.contentTotal`
- `pdf.title`
- `scorm.sectionOrder`
- `scorm.sections`
- `pdf.sectionOrder`
- `pdf.sections`

Do not use `course`.

## Subject

```json
"subject": {
  "id": "stable-id",
  "title": "Nombre de la Asignatura",
  "program": "Programa Académico",
  "faculty": "ingenieria",
  "contentNumber": "01",
  "contentTotal": "NN",
  "unitLabel": "Tema",
  "description": "Descripción breve",
  "syllabus": {
    "source": {"type": "pdf", "fileName": "syllabus.pdf"},
    "extractedFields": {},
    "learningOutcomes": [],
    "priorKnowledge": [],
    "competencies": [],
    "evaluationCriteria": [],
    "topics": [],
    "methodologyNotes": [],
    "evaluationPlan": [],
    "bibliography": {"basic": [], "complementary": []},
    "missingFields": []
  },
  "methodology": {
    "code": "AG",
    "name": "Aprendizaje Guiado",
    "rationale": "Justificación breve.",
    "moments": ["Fase 1", "Fase 2"]
  }
}
```

`subject.syllabus` is required when a syllabus PDF or syllabus text was provided. Keep `missingFields` explicit instead of inventing data.

`subject.unitLabel` (opcional) es el rótulo con que la plantilla nombra cada unidad numerada en la sidebar y el banner: la plantilla muestra `"<unitLabel> <contentNumber>"` (p. ej. `"Tema 01"`). Para AG, cuya unidad oficial es el **tema**, usar `"Tema"`. Si se omite, la plantilla usa el rótulo histórico `"Escenario de aprendizaje"`. (Otras metodologías usan `"Momento"`.)

`subject.faculty` define el **tema visual editorial del PDF** (documento de saberes tamaño carta) según la facultad de la Universidad de América. Valores válidos: `"ingenieria"` (Ingeniería, ciencia y tecnología), `"economicas"` (Ciencias económicas, administrativas y empresariales) o `"arquitectura"` (Arquitectura, diseño, creatividad, territorio y sostenibilidad). **Derívalo del programa académico del syllabus** (`subject.program` / `extractedFields.faculty`): ingenierías, sistemas, software, industrial, civil, química, ambiental, tecnología → `ingenieria`; economía, administración, negocios, contaduría, finanzas, mercadeo → `economicas`; arquitectura, diseño, urbanismo, creatividad, territorio, sostenibilidad → `arquitectura`. Si el programa no encaja claramente, omite el campo (el PDF usa el tema verde institucional por defecto). Cada facultad aplica su paleta y sus imágenes base (portada/separador) desde `assets/pdf/<faculty>/`; los prompts de esas imágenes están en `pdf-design/`. El motor también puede inferir la facultad desde `subject.program` si `faculty` se omite, pero es preferible declararla.

`subject.methodology` is required for full asignatura package generation. For virtual asignaturas, always use AG - Aprendizaje Guiado:

```json
"methodology": {
  "code": "AG",
  "name": "Aprendizaje Guiado",
  "rationale": "Ruta guiada para aprendizaje virtual autónomo con acompañamiento, práctica y retroalimentación.",
  "moments": ["Fase 1", "Fase 2", "Fase 3", "Fase 4"]
}
```

Do not use other methodology codes, names, or moments for generated virtual asignatura JSON.

Optional instructional metadata may appear on sections and components:

```json
{
  "learningOutcomeIds": ["RA1"],
  "methodologyMoment": "Fase 1",
  "estimatedTime": "45 minutos",
  "studentAction": "Leer, resolver y contrastar.",
  "evidence": "Respuesta argumentada o producto esperado.",
  "feedbackRoute": "Retroalimentación automática, docente o entre pares."
}
```

## SCORM Branch

SCORM is the interactive web branch. It may include video, podcast, listening, quizzes, matching, multi-select, fill-blank, tabs, carousel, flashcards, and downloadable material.

Each key in `scorm.sections` is the HTML id. It must appear in `scorm.sectionOrder`.

For each of the N content JSON files, `scorm.sectionOrder` must contain exactly six ids:

```json
["intro", "seccion-1", "seccion-2", "seccion-3", "seccion-4", "seccion-5"]
```

```json
"scorm": {
  "labels": {
    "theoryNav": "Contenido Teórico",
    "materialNav": "Material Complementario"
  },
  "sectionOrder": ["intro", "seccion-1", "seccion-2", "seccion-3", "seccion-4", "seccion-5"],
  "sections": {
    "intro": {
      "kind": "theory",
      "theme": "Intro",
      "badge": "Intro",
      "navLabel": "Introducción",
      "title": "Presentación del contenido",
      "intro": ["Párrafo introductorio."],
      "componentOrder": ["intro-objetivos"],
      "components": {}
    }
  }
}
```

Use `kind: "material"` for SCORM references/downloads panels.

For complete asignatura packages, SCORM sections should behave as active Moodle HTML resources: each section or major component should make clear the purpose, student action, estimated time, evidence/reflection, and feedback/evaluation route when applicable.

For thematic SCORM sections, keep media and activities behind conceptual context. Before choosing non-theory components, apply `component-selection.md` and select from the supported component catalog according to the discipline, concept, RA, and evidence need. Each `seccion-1` through `seccion-5` must contain at least three `theory-block` or `concept-block` components. A typical `componentOrder` should use repeated cycles:

```json
[
  "tema-teoria-1",
  "tema-visual-1",
  "tema-formula-1",
  "tema-practica-1",
  "tema-teoria-2",
  "tema-tabla-2",
  "tema-codigo-2",
  "tema-validacion-2",
  "tema-teoria-3",
  "tema-sintesis-3",
  "tema-transferencia-3"
]
```

Use two or three complementary components after each theory block when they add value. Do not stack three theory blocks at the beginning only to satisfy the count; each theory block should contextualize the components that follow it. Do not force a chart, formula, image, code block, or interaction if another supported component teaches the concept better.

## Package Uniqueness Contract

For complete asignatura generation, the package contains **N × 5** thematic sections: N contents (temas) times five thematic sections each. All these sections must be unique in concept, explanation, example, activity, visual support, assessment, and RA evidence.

Before generating JSON, create an internal **N × 5** diversity blueprint. Each row must define a distinct disciplinary concept, RA evidence, learner action, example/case, visual artifact, code or trace task when relevant, misconception, guided practice, and feedback. If two sections can exchange their titles without changing the body, the content fails the contract.

Production JSON must not contain repeated learner-facing paragraph shells. The following are contract violations:

- Repeated explanatory paragraphs across sections or contents.
- Repeated `keyIdeas`, bullets, table rows, exercise prompts, expected answers, quiz feedback, closing prompts, examples, stepper steps, or image prompts.
- Repeated code or pseudocode scaffolds that do not demonstrate a section-specific operation, structure, control flow, memory behavior, or debugging task.
- Repeated PDF section openings with only the topic name changed.
- Generic RA alignment such as "desde la perspectiva de RA1..." repeated across sections without section-specific evidence.

Only fixed metadata may repeat: institution, methodology labels, RA wording, rubric level names, references, UI labels, file names, and stable navigation labels.

## PDF Branch

PDF is the printable guide. It must not use interactive components.

Allowed PDF components:

- `text` / `theory`
- `theory-block` / `concept-block`
- `list`
- `formula`
- `table`
- `chart`
- `image` / `figure`
- `code`
- `callout`
- `example`
- `exercise` / `exercise-set`
- `evaluation-activity`
- `references`
- `summary`
- `objectives`
- `reflection`

Disallowed in PDF:

- `video`
- `podcast`
- `listening` / `listening-true-false`
- `quiz` / `knowledge-check`
- `matching`
- `multi-select`
- `fill-blank`
- `flashcards`
- `carousel`
- `tabs`

Put exercises near the end of `pdf.sectionOrder`, before references.

For each of the N content JSON files, `pdf.sectionOrder` must contain exactly six ids:

```json
["pdf-intro", "pdf-seccion-1", "pdf-seccion-2", "pdf-seccion-3", "pdf-seccion-4", "pdf-seccion-5"]
```

Each PDF uses the same minimum page extension requested by the user. Do not divide the requested pages across the N files.

Each PDF section must be a unique printable chapter. It must include concept-specific theory, examples, exercises, expected answers, visuals, and evaluation criteria. Do not repeat a generic "study guide" paragraph pattern across all five sections.

**Narrativa guiada (el PDF es el Documento de Saberes, no un volcado de bullets).** Cada sección temática del PDF debe
leerse como un capítulo con hilo conductor:
- **Abre con un párrafo-puente** que conecte con el tema anterior y anuncie qué se aprenderá (en la primera
  sección, conecta con el escenario inicial / propósito del documento).
- **Desarrolla la teoría como prosa guiada** (`theory-block` con varios párrafos que progresan), no como
  listas sueltas; integra las definiciones en el relato y **cita en APA 7** donde corresponda.
- **Integra los apoyos en el relato**: una figura/`image` con su pie y su lectura, un `example` o `code`
  contextualizado (no decorativo) y, cuando aporte, un `chart` con hilo conductor + nota.
- **Cierra con una transición** (`callout` o párrafo de cierre) que sintetice y prepare el siguiente tema.
- **No numeres los títulos de sección PDF** ("1. ", "2. ", …): la plantilla ya numera cada sección en el
  separador y el encabezado. Un título con prefijo numérico produce DOBLE numeración ("02  1. ..."). Escribe
  el título sin número (p. ej. "Concepto y propiedades del algoritmo", no "1. Concepto...").
- **El título de sección PDF es SOLO el nombre del saber**, sin etiqueta de "Saber N", "Tema N", "Unidad N"
  delante (la portada de cada sección no debe decir "Saber 4 · ..."). Ej.: `"Control de iteración: condición
  de parada, break y continue"`, NO `"Saber 4 · Control de iteración..."`.
- **Controla la densidad de texto** (parámetro de calidad del PDF): ningún párrafo debe superar ~4–5 líneas
  (≈ 65–80 palabras). Si una idea es más larga, **divídela en varios párrafos** o convierte parte en una
  `key-box`, una lista o un `two-column`. Una sección PDF no debe ser un muro de prosa: alterna párrafos
  cortos con componentes de variación visual. Evita secciones con > 5–6 párrafos seguidos sin un quiebre
  visual (caja, columnas, imagen, lista o subtítulo).
- **Varía la jerarquía de subtítulos**: usa `theory-block`/`pdf-h3` para subtemas de modo que el documento
  tenga ritmo (título de sección grande → subtítulos medianos → prosa). No conviertas todo en párrafos al
  mismo nivel; segmenta cada saber en 2–4 subtemas con su propio subtítulo.
- Los **ejercicios** van al final como `exercise-set` con `kind` variados (practico/codigo/consulta/
  investigacion/reflexion/analisis), presentados de forma diferenciada — no un bloque uniforme de "Ejercicio
  1, 2, 3". El bloque de RA/Saberes/Evidencias se declara explícito por sección cuando aplique.
La meta es un documento de saberes con voz docente, progresión clara y lectura agradable, no una ficha.

> **Nunca llames "guía" al PDF.** El PDF es el **Documento de Saberes** de la asignatura. No uses "esta guía", "la guía", "guía de estudio", "libro-guía" ni "guía PDF" para referirte a él (ni en títulos, callouts, portada o prosa): di "este documento", "el Documento de Saberes" o "el documento". La palabra "guiado/guiada" solo aplica a la metodología (Aprendizaje Guiado), no al PDF.

```json
"pdf": {
  "guideLabel": "DOCUMENTO DE SABERES",
  "kicker": "Aprendizaje guiado · Práctica aplicada · Autoevaluación",
  "institution": "Universidad de América",
  "year": "2026",
  "title": "Título principal del PDF",
  "subtitle": "Subtítulo o alcance",
  "purpose": "Propósito formativo.",
  "structure": "Teoría · ejemplos · ejercicios · referencias.",
  "sectionOrder": ["pdf-teoria", "pdf-ejercicios"],
  "sections": {
    "pdf-teoria": {
      "title": "Desarrollo teórico",
      "intro": ["Párrafo introductorio."],
      "componentOrder": ["pdf-texto"],
      "components": {
        "pdf-texto": {
          "type": "text",
          "title": "Concepto central",
          "body": ["Contenido teórico."]
        }
      }
    },
    "pdf-ejercicios": {
      "title": "Ejercicios",
      "intro": ["Indicaciones."],
      "componentOrder": ["pdf-banco"],
      "components": {
        "pdf-banco": {
          "type": "exercise-set",
          "title": "Banco de ejercicios",
          "items": [{"prompt": "Ejercicio."}]
        }
      }
    }
  }
}
```

## Universal Component Fields

Every component needs:

```json
{
  "type": "component-type",
  "title": "Título visible",
  "description": "Descripción opcional"
}
```

The component key must be stable, descriptive, and unique inside its section.

## Supported Components

The supported components below are a catalog, not a checklist. Select them through the expert component-selection gate in `component-selection.md`. A generated section should never include a generic chart, decorative formula, irrelevant image, or code snippet without execution value merely to vary the layout.

> **Nomenclatura canónica (fuente de verdad: la plantilla SCORM/PDF).** El valor de `type` debe ser **exactamente** uno de los soportados por el motor de render de la plantilla (`assets/content-renderer.js` para SCORM y `assets/editor.js` para PDF), documentados en el `README.md` del proyecto. **No inventes** tipos de componente ni uses los nombres de recursos pedagógicos de `lineamientos_virtualidad.md` o `estrategias_didacticas_comunicativas.md` (p. ej. "infografía", "mapa conceptual", "OVA") como `type`: esos son ideas didácticas que se materializan con los componentes soportados (una infografía → `image`/`figure`; un mapa conceptual → `image`/`figure` o `accordion`; una línea de tiempo → `timeline`; etc.).
>
> Tipos válidos:
> - **Compartidos (SCORM y PDF):** `objectives`, `theory-block` / `concept-block` / `theory`, `text`, `list`, `formula`, `table`, `chart`, `image` / `figure`, `code`, `callout`, `example`, `exercise-set`, `references`, `summary`, `reflection`, `prior-knowledge`, `evaluation-activity`.
> - **Solo SCORM (interactivos / multimedia):** `accordion`, `flashcards`, `carousel`, `tabs`, `stepper`, `video`, `podcast`, `metrics`, `timeline`, `quiz`, `listening-true-false`, `matching`, `multi-select`, `fill-blank`, `downloads`, `visual-prompt`, `saberes-link`.
> - **Solo PDF (rama imprimible):** ver "PDF Branch". No pongas componentes interactivos (`video`, `podcast`, `listening`, `quiz`, `matching`, `multi-select`, `fill-blank`, `flashcards`, `carousel`, `tabs`) en `pdf.sections`.
> - **Componentes de presentación SOLO PDF (variación visual):** `key-box` (caja llamativa destacada),
>   `two-column` (disposición a 2 columnas) y `data-highlight` (cifras destacadas). Úsalos para **romper la
>   monotonía de párrafos** y dar ritmo editorial moderno al documento.

### Componentes de variación visual del PDF (úsalos para que NO sea todo párrafos)

El PDF debe variar la disposición y la jerarquía: alterna texto a 1 columna con bloques a 2 columnas, intercala
cajas llamativas y cifras destacadas. **No** uses solo `theory-block` + `example` repetidos.

- **`key-box`** — caja destacada para una idea clave, dato, advertencia o tip. Campo `variant`:
  `clave` | `dato` | `industria` | `alerta` | `tip` | `definicion` (cada uno con color e ícono propios).
  Campos: `variant`, `title` (opcional), `body` (párrafos). Ej.:
  ```json
  { "type": "key-box", "variant": "clave", "title": "Las 5 propiedades", "body": ["Un algoritmo debe ser finito, preciso, definido, con entrada y con salida."] }
  ```
- **`two-column`** — dos columnas lado a lado (comparaciones, ventajas/desventajas, antes/después). Campos:
  `columns: [{title, body}, {title, body}]` (o `left`/`right`). Ej.:
  ```json
  { "type": "two-column", "title": "for vs. while", "columns": [ {"title": "for", "body": ["Recorre un rango conocido."]}, {"title": "while", "body": ["Repite mientras se cumple una condición."]} ] }
  ```
- **`data-highlight`** — fila de cifras grandes (número + etiqueta), para magnitudes/comparaciones. Campos:
  `items: [{value, label}]`. Ej.:
  ```json
  { "type": "data-highlight", "items": [ {"value": "O(n)", "label": "Búsqueda lineal"}, {"value": "O(log n)", "label": "Búsqueda binaria"} ] }
  ```
- **`column-flow`** — prosa larga maquetada a **2 columnas tipo periódico** (el texto fluye de una columna a
  la otra). Úsalo para una explicación teórica extensa que, a 1 columna, sería un muro; a 2 columnas se lee
  más ágil y moderno. Distinto de `two-column` (que son 2 tarjetas comparativas lado a lado). Campos:
  `body: ["párrafo 1", "párrafo 2", …]`. Cada `value` de `data-highlight` debe ser corto (≤ 9 caracteres):
  para cifras larguísimas usa una forma compacta (p. ej. `"≈0.3"` y explica el detalle en el label), no
  `0.30000000000000004`. Ej.:
  ```json
  { "type": "column-flow", "body": ["Una librería es un conjunto de funciones ya probadas...", "Python distingue la biblioteca estándar del ecosistema externo...", "Importar admite matices de sintaxis..."] }
  ```

**Pauta de uso por sección PDF (densidad y ritmo — REGLA DURA):** una sección NUNCA debe tener más de
**3 párrafos de prosa seguidos** sin un quiebre visual (key-box, two-column, column-flow, data-highlight,
lista, tabla, imagen o subtítulo). Si una explicación necesita más de 3 párrafos seguidos, conviértela en un
`column-flow` (2 columnas) o trocea con un subtítulo `theory-block`. Cada sección incluye **al menos 1**
elemento de variación visual. Prosa ligera: párrafos de 40–70 palabras. El objetivo es un PDF que respira, no
un muro de texto.
>
> Nota: `text`, `list`, `example` y `exercise-set` se renderizan tanto en SCORM como en PDF (la plantilla los soporta en ambas ramas), así que un `list` en una sección SCORM es válido y no rompe el render.

### objectives (SCORM or PDF)

```json
{
  "type": "objectives",
  "title": "Objetivos",
  "items": [{"icon": "track_changes", "text": "Objetivo observable."}]
}
```

### prior-knowledge (SCORM)

```json
{
  "type": "prior-knowledge",
  "title": "Saberes previos",
  "eyebrow": "Antes de empezar",
  "prompts": ["Pregunta detonadora."]
}
```

### theory-block / concept-block (SCORM or PDF static)

Use for real theoretical development inside SCORM. This component should precede formulas, code, charts, or activities when the learner needs conceptual context.
In SCORM, this component must also appear before complementary media components such as `image`, `figure`, `visual-prompt`, `video`, `podcast`, `audio`, `listening`, or `listening-true-false` when those resources introduce or illustrate a concept.

For central concepts, prefer developed blocks with multiple paragraphs, key ideas, internal subsections, an example, and a closing/transfer prompt. Do not use a short accordion or image as the only explanation of a new concept.

```json
{
  "type": "theory-block",
  "title": "Convolución como operación local",
  "eyebrow": "Base conceptual",
  "body": [
    "La convolución transforma una imagen calculando cada salida desde una vecindad local.",
    "El kernel define qué patrón se resalta o se atenúa."
  ],
  "keyIdeas": [
    {"icon": "grid_on", "text": "La operación usa una ventana local."},
    {"icon": "tune", "text": "Cambiar el kernel cambia el efecto visual."}
  ],
  "sections": [
    {
      "title": "Cómo se calcula",
      "body": ["Se superpone el kernel sobre una región de la imagen y se suman productos punto a punto."],
      "formula": "s=\\sum_i\\sum_j I(i,j)K(i,j)",
      "formulaNote": "Esta forma simplificada explica el cálculo de un píxel de salida."
    }
  ],
  "example": {
    "title": "Ejemplo guiado",
    "body": ["Un kernel de suavizado reduce variaciones pequeñas antes de detectar bordes."]
  },
  "closing": ["Antes de ejecutar código, decide qué señal quieres conservar y qué variación quieres reducir."]
}
```

### accordion (SCORM or PDF static)

Use accordions for organization, comparison, common errors, or frequently confused ideas after the main concept has been explained. **Mandatory in every thematic SCORM section.** Each item must be relatively extensive: `body` should hold **two to three paragraphs** (an array of two or three strings) that complement and extend the theory already shown — nuances, comparisons, misconceptions, applied implications, or edge cases. Do not use shallow one-line accordion theory and do not use the accordion as the primary explanation.

```json
{
  "type": "accordion",
  "title": "Conceptos",
  "items": [
    {
      "icon": "lightbulb",
      "title": "Concepto",
      "open": true,
      "body": [
        "Primer párrafo que retoma la teoría previa y la profundiza con un matiz o una distinción relevante.",
        "Segundo párrafo que conecta el concepto con un ejemplo, una implicación práctica o un error frecuente.",
        "Tercer párrafo opcional que cierra con una comparación, una condición límite o una transferencia al contexto disciplinar."
      ]
    }
  ]
}
```

### flashcards (SCORM only)

**Mandatory in every thematic SCORM section.** Each `definition` must give a real, section-specific explanation or relationship, not a single word.

```json
{
  "type": "flashcards",
  "title": "Flashcards",
  "cards": [{"term": "Término", "definition": "Definición.", "icon": "quiz"}]
}
```

### carousel (SCORM only)

Slides can contain text, image, or formula. **Mandatory in every thematic SCORM section.** Give each slide developed `title` plus `body`/`description` content, not bare labels.

```json
{
  "type": "carousel",
  "title": "Carrusel",
  "slides": [
    {"label": "Paso 1", "title": "Título", "body": ["Texto."], "icon": "menu_book"},
    {"label": "Fórmula", "formula": "x+y=z", "description": "Descripción."}
  ]
}
```

### formula

All math must be LaTeX.
Formula components should include `context`, `variables`, and `explanation` unless the same formula is already fully explained inside a preceding `theory-block`.
Dedicated formula fields (`latex`, `formula`, `variables[].symbol`, `sections[].formula`, `slides[].formula`, `steps[].formula`) must be raw KaTeX-compatible LaTeX WITHOUT `$...$` delimiters, with JSON-escaped backslashes, for example `\\frac{a}{b}`.
Math embedded inside any prose string (titles, body, description, note, intro, key ideas, table cells, captions, quiz/feedback, list items, etc.) MUST be wrapped in `$...$` for inline math or `$$...$$` for display math; the SCORM and PDF renderers convert these to KaTeX. Example: `"body": ["La profundidad de bits fija los niveles con $L = 2^b$."]`. Never leave prose math as plain text like `2^b`. Escape a literal dollar sign in prose as `\\$`.

```json
{
  "type": "formula",
  "title": "Fórmula",
  "context": ["Explica qué problema resuelve la expresión y cuándo se usa."],
  "latex": "a_1x_1+a_2x_2=b",
  "variables": [{"symbol": "x_1", "description": "descripción."}],
  "explanation": ["Explica cómo leer la expresión y qué decisión permite tomar."]
}
```

### table

```json
{
  "type": "table",
  "title": "Tabla",
  "columns": ["Columna 1", "Columna 2"],
  "rows": [{"cells": ["Dato", {"badge": "Valor", "tone": "success"}]}]
}
```

### stepper

Use steppers for guided practice and procedures. Do not use them as a decorative list: include a task statement, intermediate reasoning, and a final check or conclusion.

In mathematics sections this is the required component for worked exercises/examples: each thematic SCORM section must include **between two and four resolved exercises** rendered as steppers, with LaTeX in `statement` and `steps[].formula` and a closing `final: true` result step.

```json
{
  "type": "stepper",
  "title": "Paso a paso",
  "statement": "Enunciado.",
  "steps": [
    {"title": "Comprender el dato", "body": "Explica qué se identifica primero.", "final": false},
    {"title": "Aplicar el procedimiento", "body": "Describe la acción guiada.", "formula": "x=1", "final": false},
    {"title": "Verificar", "body": "Indica cómo revisar si el resultado tiene sentido.", "final": true}
  ]
}
```

### chart

Use Chart.js-compatible data only.
Use charts when they add analytical value: trends, comparisons, distributions, correlations, confusion/error matrices, performance curves, uncertainty, or decision evidence. Do not use a generic chart as filler.

Every chart must carry two distinct text fields, both required in SCORM and PDF:

- `description` (hilo conductor): connects the chart to the theory shown earlier in the same section and explains why it appears now. Renders **above** the chart.
- `note` (lectura del gráfico): describes and interprets the graphic itself — axes, series, the trend/pattern/comparison, and the disciplinary conclusion. Renders **below** the chart, under a "Lectura del gráfico" label.

Do not swap these roles or merge them. `description` connects to prior theory; `note` describes the graphic.

**Chart labels are PLAIN TEXT, never LaTeX.** Chart.js renders `labels`, `datasets[].label`, and any axis/plugin title (`options.scales.*.title.text`, `options.plugins.title.text`) as plain text — it cannot render KaTeX. Do NOT put `$...$` or LaTeX commands in those fields, or they will show raw (e.g. `$\\sigma$`). Write them with readable Unicode instead: `σ`, `μ`, `Δ`, `∇`, superscripts `²`/`³`/`ⁿ`, subscripts `₀`/`ᵢ`/`ₜ`, `×`, `·`, `√`. Examples: use `"Varianza entre clases σ²_b(t)"`, not `"$\\sigma_b^2(t)$"`; use `"Error máximo Δ/2"`, not `"$\\Delta/2$"`. Rich mathematical notation that needs true LaTeX belongs in the chart `title` and `note` (which DO render KaTeX via `$...$`), not in the data labels. (The renderer also sanitizes LaTeX in chart labels as a safety net, but author them as plain Unicode from the start.)

```json
{
  "type": "chart",
  "chartType": "bar",
  "title": "Varianza entre clases $\\sigma_b^2$ por umbral",
  "description": ["Hilo conductor: cómo se relaciona este gráfico con la teoría anterior y por qué lo observamos ahora."],
  "note": "Lectura del gráfico: descripción de los ejes y series, el patrón/comparación que muestra y la conclusión disciplinar que debe extraer el estudiante.",
  "height": "300px",
  "labels": ["t=50", "t=100", "t=150"],
  "datasets": [{"label": "σ²_b(t)", "data": [1, 2, 3]}],
  "options": {}
}
```
Note how `title` uses `$\\sigma_b^2$` (rendered with KaTeX) while the dataset `label` uses plain Unicode `σ²_b(t)` (Chart.js plain text).

The SCORM renderer prints `description` above the chart and `note` below it under a "Lectura del gráfico" label. The PDF renderer prints `description` above the chart and centers `note` (or `descriptiveNote`/`caption`) below it.

### image / figure

Use this component for conceptual or illustrative visual material that is not a quantitative chart. Do not use it for datasets that should be Chart.js.

When the visual asset is not available yet, leave `src` empty and include a precise `prompt`. The prompt should describe exactly what the author must generate or design, including visual elements, labels, style, and learning purpose.

```json
{
  "type": "image",
  "title": "Matriz de píxeles",
  "assetId": "image-matrix",
  "src": "",
  "alt": "Matriz 6 por 6 con valores de intensidad y su imagen en escala de grises.",
  "caption": "La figura permite relacionar coordenadas, intensidad y representación visual.",
  "prompt": "Crear una figura didáctica en español con una matriz 6x6 de valores de intensidad a la izquierda y su visualización en escala de grises a la derecha; incluir etiquetas x, y, píxel e intensidad."
}
```

When the same conceptual image must appear in SCORM and PDF, assign the same `assetId` in both branches. The app upload control uses `assetId` to synchronize the loaded image across matching SCORM/PDF image components.

### code

Code components should include enough instruction for a learner to know what to do with the snippet. In SCORM, include `instructions` and usually `expectedOutput`.
Instructions must explicitly say where and how to run, execute, or trace the fragment. For compiled/interpreted languages, include the tool or environment, file creation step, terminal commands, sample input, and expected output. For pseudocode, state whether to trace it manually or run it in a tool such as PSeInt, then give the steps.
**Python por defecto en materias cuantitativas.** Para resolver/verificar ejercicios en matemáticas, estadística, ingeniería, ciencia de datos y similares, usa **exclusivamente Python** (`"language": "python"`, `"languageLabel": "Python"`) con librerías estándar (`numpy`, `sympy`, `pandas`, `scipy`, `matplotlib` solo si la gráfica es el objeto de estudio). Cada sección temática SCORM de una asignatura cuantitativa debe incluir **al menos un `code` en Python** que resuelva o verifique un ejercicio del tema y se vincule al stepper manual. No uses otros lenguajes ni pseudocódigo para resolver ejercicios cuantitativos (ver `component-selection.md` → Code Gate).

```json
{
  "type": "code",
  "title": "Código",
  "language": "python",
  "languageLabel": "Python",
  "fileName": "ejemplo.py",
  "instructions": [
    "Lee el fragmento e identifica la entrada, el procesamiento y la salida.",
    "Guarda el archivo como ejemplo.py y ejecútalo desde una terminal con python ejemplo.py.",
    "Ejecuta el código con un caso pequeño o modifica el parámetro indicado."
  ],
  "code": "print('hola')",
  "expectedOutput": ["Describe qué debería aparecer y cómo interpretarlo."]
}
```

### quiz (SCORM only)

Single-answer multiple choice.
Each option should include feedback. Correct feedback should reinforce the concept; incorrect feedback should point to what to review.

```json
{
  "type": "quiz",
  "title": "Chequeo",
  "questions": [{
    "prompt": "Pregunta.",
    "options": [
      {"text": "Correcta", "correct": true, "feedback": "Correcto: esta opción aplica el criterio trabajado y conserva la relación conceptual esperada."},
      {"text": "Incorrecta", "correct": false, "feedback": "Revisa el concepto central: esta opción confunde la causa con la consecuencia."}
    ]
  }]
}
```

### evaluation-activity (SCORM activity metadata or PDF printable)

Use for qualitative evaluation, rubrics, and activity instructions. In PDF, this component is printable; in SCORM, it can describe or accompany an interactive activity.

```json
{
  "type": "evaluation-activity",
  "title": "Actividad evaluativa",
  "learningOutcomeIds": ["RA1"],
  "criterion": "Criterio de evaluación.",
  "evidence": "Producto o desempeno esperado.",
  "technique": "Estudio de caso",
  "instrument": "Rúbrica analítica",
  "weight": "20%",
  "evaluationMoment": "avance",
  "participationType": "individual",
  "feedback": {
    "strengths": "Fortalezas a observar.",
    "improvement": "Aspectos por mejorar.",
    "reinforcement": "Accion de refuerzo.",
    "nextStep": "Siguiente paso."
  },
  "rubric": {
    "type": "analitica",
    "levels": ["No acreditable", "Deficiente", "Insuficiente", "Aceptable", "Bueno", "Muy bueno", "Sobresaliente"],
    "criteria": [{"name": "Criterio", "descriptors": {}}]
  }
}
```

### listening-true-false (SCORM only)

For English/listening activities.
Include purpose, listening focus, audio/transcript when available, and feedback per statement.

```json
{
  "type": "listening-true-false",
  "title": "Listening · True/False",
  "audio": {"title": "Audio title", "src": "audio.mp3", "transcript": ["Optional transcript."]},
  "trueLabel": "V",
  "falseLabel": "F",
  "statements": [{"text": "Statement.", "answer": true, "feedback": "Correcto: la afirmación coincide con la idea principal del audio."}]
}
```

### matching (SCORM only)

Use for relationships such as word-meaning, concept-function, case-principle, process-step, or metric-interpretation. Include meaningful `feedbackCorrect` and `feedbackIncomplete` when useful.

```json
{
  "type": "matching",
  "title": "Match word and meaning",
  "pairs": [{"word": "Word", "meaning": "Meaning"}],
  "options": ["Meaning"]
}
```

### multi-select (SCORM only)

Several options may be correct.
Use when the learner must discriminate multiple valid criteria or decisions; include enough incorrect options to reveal misconceptions and feedback for review.

```json
{
  "type": "multi-select",
  "title": "Multiple selection",
  "prompt": "Select all correct options.",
  "options": [{"text": "Option", "correct": true}]
}
```

### fill-blank (SCORM only)

Use for terminology, grammar, formula parts, process steps, or short reasoning completions. Include accepted variants in `answers`.

```json
{
  "type": "fill-blank",
  "title": "Fill in the blank",
  "prompt": "Complete the sentence.",
  "parts": [
    "Text before ",
    {"placeholder": "answer", "answers": ["answer", "alternative"]},
    " text after."
  ]
}
```

### Other Supported Types

- `video`
- `metrics`
- `podcast`
- `timeline`
- `tabs`
- `reflection`
- `summary`
- `callout`
- `saberes-link` (SCORM only; ver sección dedicada abajo)
- `references`
- `downloads`
- `evaluation-activity`

Use their existing field names from the template project.

### `trigger-question` — pregunta detonadora (SCORM y PDF, recomendado al inicio de cada tema)

Banner **verde oscuro** (fondo `primary-container` #1a2403, acento lima) con **UNA pregunta** que abre el tema y
activa los saberes previos. Se renderiza en SCORM (`renderTrigger`) y en PDF (`.pdf-trigger`). **No** muestra
ningún título tipo "Pregunta detonadora": es solo el banner con la pregunta (y un `eyebrow` corto opcional).

- Va como **primer componente** de la sección (intro/seccion-1) o al inicio del tema, una sola pregunta.
- Campos: `question` (la pregunta; obligatorio), `eyebrow` (rótulo corto, por defecto "Para empezar"),
  `icon` (opcional, por defecto `help`).
- La pregunta debe ser abierta, retadora y conectada al contexto de ingeniería del tema.

```json
{ "type": "trigger-question", "eyebrow": "Para empezar", "question": "¿Cómo decidirías, sin ejecutar el programa, si un algoritmo terminará siempre?" }
```

### `saberes-link` — puente al Documento de Saberes (SCORM only, obligatorio por tema)

Componente **dedicado y llamativo** que articula el SCORM con el Documento de Saberes (PDF). Reemplaza al
`callout` que antes se usaba para este aviso. Se renderiza como un banner de marca (superficie oscura +
acento lima, ícono `menu_book`, titular en mayúsculas) mediante `renderSaberesLink` en
`assets/content-renderer.js`. Es **solo informativo**: no enlaza ni redirige; refuerza la articulación
SCORM↔PDF.

- Cada sección temática SCORM (`seccion-1` … `seccion-5`) debe incluir **exactamente uno**, normalmente
  como cierre del tema (último o penúltimo componente del `componentOrder`).
- No usar en `intro` ni en `pdf.sections` (es SCORM only). **PROHIBIDO en el branch PDF cualquier aviso que
  remita al Documento de Saberes** (ni `saberes-link` ni un `callout` tipo "Puedes profundizar en el Documento
  de Saberes", "versión impresa del tema", "el recurso SCORM ofrece…"): el PDF **ES** el Documento de Saberes,
  así que remitir a él desde el propio PDF es circular (equivale a "revisa el SCORM estando en el SCORM"). En
  el PDF, los `callout` solo se usan para cierres/transiciones, advertencias o recomendaciones del propio tema.
- Campos: `heading` (titular destacado), `body` (1–2 párrafos con qué amplía el Documento de Saberes),
  `eyebrow` (rótulo superior, por defecto "Documento de Saberes"), `reference` (opcional: capítulo/páginas
  sugeridas a consultar), `cta` (opcional: frase de invitación), `icon` (opcional, por defecto `menu_book`).
- `heading`, `body`, `reference` y `cta` deben ser **específicos del tema** (no repetir el mismo texto entre
  secciones); solo `eyebrow` e `icon` pueden ser fijos.

```json
{
  "type": "saberes-link",
  "eyebrow": "Documento de Saberes",
  "icon": "menu_book",
  "heading": "Profundiza sobre este tema en el Documento de Saberes",
  "body": [
    "El desarrollo ampliado de este tema —con más ejemplos, demostraciones y referencias— está en el Documento de Saberes (PDF) de la asignatura."
  ],
  "reference": "Capítulo 2 · Sistemas lineales · págs. 18-26",
  "cta": "Consulta el Documento de Saberes (PDF) de la asignatura"
}
```

(El alias `documento-saberes` se acepta como `type` equivalente.)

## PDF-Specific Components

### text / theory

```json
{
  "type": "text",
  "title": "Concepto central",
  "body": ["Párrafo 1.", "Párrafo 2."]
}
```

### list

```json
{
  "type": "list",
  "title": "Mapa del documento",
  "ordered": true,
  "items": ["Paso 1.", "Paso 2."]
}
```

### example

```json
{
  "type": "example",
  "title": "Ejemplo 1",
  "context": ["Enunciado del ejemplo."],
  "formula": "x+y=z",
  "solution": ["Solución comentada."]
}
```

### exercise-set

Los bancos de ejercicios del PDF deben ser **variados, no mecánicos ni repetitivos**: mezcla tipos en lugar
de clonar el mismo enunciado con números cambiados. **Cada ejercicio lleva un campo `kind`** que la plantilla
PDF usa para darle una presentación diferenciada (etiqueta, ícono y color por tipo). Valores de `kind`
**exactos** que reconoce el render (usa estos literales; otro valor cae a `practico`):

| `kind` | Para qué | Campos típicos |
|---|---|---|
| `practico` | ejercicio de procedimiento/cálculo | `prompt`, `formula`, `answer` |
| `codigo` | escribir/ejecutar código | `prompt`, `code`, `language` (def. `python`), `expectedOutput` |
| `consulta` | buscar/consultar una fuente o dato | `prompt`, `steps[]`, `deliverable` |
| `investigacion` | indagación más amplia con pasos | `prompt`, `steps[]`, `deliverable` |
| `reflexion` | pregunta de reflexión/criterio | `prompt` |
| `analisis` | analizar/justificar/detectar error | `prompt`, `formula` |

Campos de cada item: `kind`, `title` (opcional, breve), `prompt`/`statement`/`body` (enunciado, admite
LaTeX `$...$`), `steps[]` (lista de pasos para consulta/investigación), `code` + `language`
(para `codigo`), `expectedOutput`, `formula`, `answer` (respuesta esperada), `deliverable` (qué entrega).
Mezcla tipos: incluye `practico` pero que no sean la mayoría; usa `codigo` para Python, `consulta`/
`investigacion` para indagación con fuentes APA 7, y `reflexion`/`analisis` para razonamiento.

```json
{
  "type": "exercise-set",
  "title": "Banco de ejercicios",
  "items": [
    {"kind": "practico", "title": "Solución por eliminación", "prompt": "Resuelve el sistema por eliminación.", "formula": "x=1", "answer": "x=1, y=2."},
    {"kind": "analisis", "prompt": "Justifica si el sistema tiene solución única e identifica el error en el procedimiento mostrado."},
    {"kind": "codigo", "prompt": "Verifica la solución con numpy y compara con tu resultado manual.", "language": "python", "code": "import numpy as np\nA = np.array([[2,1],[1,3]])\nb = np.array([4,5])\nprint(np.linalg.solve(A, b))", "expectedOutput": "[1.4 1.2]"},
    {"kind": "investigacion", "prompt": "Investiga una aplicación real de los sistemas lineales en tu programa.", "steps": ["Busca una fuente académica reciente", "Resume el caso en 5 líneas", "Relaciónalo con un saber del tema"], "deliverable": "Párrafo con la cita en APA 7."}
  ]
}
```

## Validation Rules

- No component id may appear in `componentOrder` unless it exists in the same section's `components`.
- No SCORM section id may appear in `scorm.sectionOrder` unless it exists in `scorm.sections`.
- No PDF section id may appear in `pdf.sectionOrder` unless it exists in `pdf.sections`.
- New asignatura packages must produce N JSON files (one per tema, N variable derived from the syllabus), each with six SCORM sections and six PDF sections.
- Do not put interactive SCORM activity components inside `pdf.sections`.
- Every thematic SCORM section (`seccion-1` through `seccion-5`) must include at least three components whose `type` is `theory-block` or `concept-block`. The `intro` section is not counted for this requirement.
- In thematic SCORM sections, `componentOrder` should distribute the required theory blocks through the section as theory -> two or three complementary components -> theory -> two or three complementary components -> theory -> practice/validation/closure.
- Every complementary component should have a disciplinary reason traceable to the section concept and RA. Use `component-selection.md` to reject weak charts, formulas, images, code snippets, or interactions.
- Charts must represent meaningful quantitative evidence such as distributions, histograms, confusion/error patterns, correlations, performance curves, latency budgets, uncertainty, or decision comparisons. Do not invent generic chart series as filler.
- Formulas must be conceptually central, explained, and used in the section. Do not include formulas that do not advance the explanation, example, practice, or decision.
- Images/figures must teach visual, spatial, process, artifact, matrix, scene, or architecture understanding. If that is not the need, choose table, stepper, callout, code, or text.
- In SCORM, no image, figure, visual prompt, video, podcast, audio, listening, or listening true/false component should appear before a substantial `theory-block` or `concept-block` in the same section.
- In SCORM, no formula, code, chart, or formative activity should be the first real explanation of a concept.
- Central `theory-block` components should not be shallow; use enough body, key ideas, subsections, example, and closing content for the concept.
- Guided practice should include steps, not only a prompt.
- Code and pseudocode components in SCORM should include instructions, where/how to execute or trace, sample input when useful, and expected output/interpretation.
- Formulas should include context and explanation unless explained in the same theory block.
- Charts should have an instructional reason and PDF charts should include `note`, `caption`, or `description`.
- Shared SCORM/PDF images should use the same `assetId`.
- Do not leave placeholders in production JSON.
- Use enough sections and textual density to satisfy any requested minimum page count.
- References must be included for academic content unless the user says not to.
- Full-package generation must pass a content-uniqueness validation before final delivery. When available, run `node aprendizaje-guiado-scorm/scripts/validate_content_package.js <generated-json-files>` and treat duplicate long strings or repeated 12-word sequences across thematic sections as blocking errors.
