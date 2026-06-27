# moodle-content JSON Contract

Contrato completo del JSON que la skill `moodle-content` genera y que el renderer
`../template/` consume para emitir el HTML inline pegable en Moodle. Este documento
desarrolla a nivel de campo el esquema resumido en `../../DESIGN.md`.

La skill **solo genera este JSON**. No emite HTML: el renderer construye el HTML
con todos los estilos inline (Moodle no admite `<script>` ni CSS externo en el
contenido). No incluyas marcado, estilos, ni clases CSS propias en ningún campo.

---

## Forma raíz

La raíz es **`moodle`** (no `course`, no `subject`):

```json
{
  "moodle": {
    "branding": { },
    "course": { },
    "pageOrder": [ ],
    "pages": { }
  }
}
```

Obligatorio:

- `moodle.course.title`
- `moodle.course.methodology.code` (uno de `AG` | `ABPr` | `ABI` | `ABR` | `ABC`)
- `moodle.course.methodology.name`
- `moodle.pageOrder` (array de claves de página, en orden)
- `moodle.pages` (objeto con una entrada por clave)

Reglas de consistencia (las verifica `scripts/validate_moodle_json.js`):

- Cada entrada de `pageOrder` existe como clave en `pages`, y cada clave de `pages`
  aparece en `pageOrder` (sin huérfanas, sin duplicadas).
- Exactamente **una** página `welcome` y **una** página `closing`.
- El número de páginas `moment` = número de momentos de la metodología declarada
  (AG=7, ABPr=3, ABI=ABR=ABC=4).
- `pages[x].type` ∈ `welcome | moment | closing`.
- Cada componente tiene `type` válido y permitido para el `type` de su página.
- Ningún campo contiene `<script>`, `<style>`, `<link>`, manejadores `on*=`,
  `javascript:` ni etiquetas de documento.

---

## `branding`

Identidad institucional. Si no se conoce un valor, omite el campo (el renderer usa
defaults) — no inventes URLs.

```json
"branding": {
  "logoUrl": "https://i.postimg.cc/c1tGwQnF/Logo-UA.png",
  "institution": "Universidad de América",
  "faculty": "Facultad de Ingeniería",
  "year": "2026"
}
```

| Campo | Tipo | Notas |
|---|---|---|
| `logoUrl` | string (URL) | Default `https://i.postimg.cc/c1tGwQnF/Logo-UA.png`. Si el usuario da otro logo, úsalo; si no, este default. |
| `institution` | string | Default "Universidad de América". |
| `faculty` | string | Opcional; del syllabus si está. |
| `year` | string | Del syllabus o del contexto; si no, año actual. |

---

## `course`

Metadatos de la asignatura y de la metodología.

```json
"course": {
  "title": "Análisis Vectorial",
  "program": "Pregrado en Ingeniería",
  "description": "Texto de presentación de la asignatura (1-2 párrafos), redactado según el enfoque didáctico de la metodología.",
  "methodology": {
    "code": "AG",
    "name": "Aprendizaje Guiado",
    "moments": ["Contenido 1", "Contenido 2", "..."]
  },
  "momentLabelSingular": "Contenido",
  "momentCountLabel": "7 Contenidos"
}
```

| Campo | Tipo | Obligatorio | Notas |
|---|---|---|---|
| `title` | string | sí | Título de la asignatura (del syllabus). |
| `program` | string | no | Programa académico (del syllabus). |
| `description` | string | no | Presentación del curso; enfoque según metodología (proyecto / investigación / reto / caso / ruta guiada). |
| `methodology.code` | string | sí | `AG` \| `ABPr` \| `ABI` \| `ABR` \| `ABC`. |
| `methodology.name` | string | sí | Nombre oficial (ver `metodologias-ua.md`). |
| `methodology.moments` | array<string> | no | Lista de nombres de momento. Para AG son temas libres del curso; para las demás, los nombres oficiales de `metodologias-ua.md`. Su longitud coincide con el nº de páginas `moment`. |
| `momentLabelSingular` | string | sí | Etiqueta visible por momento: **`"Contenido"` para AG**, **`"Momento"` para ABPr/ABI/ABR/ABC**. |
| `momentCountLabel` | string | sí | Chip del hero: `"7 Contenidos"` (AG), `"3 Momentos"` (ABPr), `"4 Momentos"` (ABI/ABR/ABC). |

---

## `pageOrder`

Array ordenado de claves. Convención de claves (slugs estables):

```json
"pageOrder": ["bienvenida", "momento-1", "momento-2", "momento-3", "cierre"]
```

- Primera entrada: la página `welcome` (clave sugerida `bienvenida`).
- Entradas intermedias: una por momento (`momento-1` … `momento-N`).
- Última entrada: la página `closing` (clave sugerida `cierre`).

---

## `pages`

Objeto con una entrada por clave de `pageOrder`. Cada página declara `type` y un
array `components`. Las páginas `moment` añaden `momentNumber` y `momentName`.

```json
"pages": {
  "bienvenida": { "type": "welcome", "components": [ ] },
  "momento-1":  { "type": "moment", "momentNumber": "1", "momentName": "Diagnóstico Inicial", "components": [ ] },
  "cierre":     { "type": "closing", "components": [ ] }
}
```

| Campo de página | Tipo | Aplica a | Notas |
|---|---|---|---|
| `type` | string | todas | `welcome` \| `moment` \| `closing`. |
| `components` | array<object> | todas | Lista ordenada; el renderer emite cada componente en orden. |
| `momentNumber` | string | `moment` | "1", "2", … (string para conservar ceros si se desea). |
| `momentName` | string | `moment` | Tema del momento (AG) o nombre oficial del momento (resto). |

Cada componente es un objeto con `type` y sus campos. El renderer ignora campos
desconocidos; no añadas campos de estilo.

---

# Componentes por tipo de página

Componentes **reutilizables** entre páginas: `roadmap`, `footer`, y los banners CTA
(`scorm-link`, `practice-link`, `final-evaluation`) que comparten estructura de
"banner con botón". Texto enriquecido permitido solo en campos marcados como *rich*
(referencias APA): `<em>`, `<strong>`, `<a href>`. Nunca `<script>`/`<style>`.

---

## Página `welcome`

### `hero`
Banner de portada del curso (degradado oscuro, logo marca de agua, video opcional).

```json
{
  "type": "hero",
  "eyebrow": "Pregrado en Ingeniería · Asignatura",
  "title": "Análisis Vectorial",
  "description": "Descripción introductoria del curso.",
  "chips": ["Pregrado en Ingeniería", "Aprendizaje Guiado", "7 Contenidos"],
  "video": {
    "label": "Video de presentación",
    "provider": "synthesia",
    "videoEmbedUrl": ""
  }
}
```

| Campo | Tipo | Notas |
|---|---|---|
| `eyebrow` | string | Línea superior (programa · sección). |
| `title` | string | Título del curso. |
| `description` | string | 1-2 frases. |
| `chips` | array<string> | Programa, metodología, `momentCountLabel`. |
| `video` | object \| null | Opcional. Si no hay URL, deja `videoEmbedUrl: ""` y añade `"todo": "Pegar URL del video de presentación (Synthesia/YouTube)"`. **No inventes la URL.** |
| `video.provider` | string | `synthesia` \| `youtube` \| `vimeo`. |

### `learning-outcomes`
Grid de cards de Resultados de Aprendizaje (RA), extraídos del syllabus.

```json
{
  "type": "learning-outcomes",
  "title": "Resultados de Aprendizaje",
  "subtitle": "Lo que serás capaz de hacer al finalizar.",
  "items": [
    { "number": "1", "label": "Modelo", "text": "Modela campos vectoriales y sus operadores diferenciales." },
    { "number": "2", "label": "Analizo", "text": "Analiza la circulación y el flujo en campos vectoriales." }
  ]
}
```

| Campo de item | Tipo | Notas |
|---|---|---|
| `number` | string | "1", "2", … |
| `label` | string | Verbo/etiqueta breve (Modelo, Analizo, Resuelvo…). Derivable del verbo del RA. |
| `text` | string | Enunciado del RA (literal del syllabus). |

### `activities`
"Actividades de Inicio": diagnóstica, foro de presentación, bitácora, etc.

```json
{
  "type": "activities",
  "title": "Actividades de Inicio",
  "items": [
    {
      "icon": "🧭",
      "step": "Paso 1",
      "title": "Evaluación diagnóstica",
      "description": "Reconoce tus saberes previos.",
      "details": { "summary": "¿Qué evalúa?", "text": "Conceptos previos de cálculo vectorial." },
      "opensAt": "",
      "closesAt": "",
      "button": { "label": "Ir a la actividad", "href": "" }
    }
  ]
}
```

| Campo de item | Tipo | Notas |
|---|---|---|
| `icon` | string (emoji) | 1 emoji. |
| `step` / `label` | string | Etiqueta de paso. |
| `title`, `description` | string | — |
| `details` | object | Opcional: `summary` + `text` (acordeón). |
| `opensAt`, `closesAt` | string | Fechas; si no las da el syllabus, deja `""`. **No inventes fechas.** |
| `button` | object | `label` + `href`. Si no hay URL de Moodle, `href: ""` + `"todo": "..."`. |

### `roadmap` (reutilizable)
Infografía embebida por iframe.

```json
{ "type": "roadmap", "title": "Hoja de Ruta del Curso", "embedUrl": "", "height": 760, "todo": "Pegar URL de la infografía (Netlify u otra)" }
```

| Campo | Tipo | Notas |
|---|---|---|
| `embedUrl` | string (URL) | Si no se conoce, `""` + `todo`. **No inventes URLs.** |
| `height` | number | Alto en px (default 760). |

### `course-glance`
"Tu Curso de un Vistazo": hasta 3 cards (docente, syllabus, cronograma).

```json
{
  "type": "course-glance",
  "title": "Tu Curso de un Vistazo",
  "teacher": {
    "photoUrl": "", "name": "", "role": "", "bio": "", "tags": []
  },
  "syllabus": { "title": "Syllabus", "previewUrl": "", "button": { "label": "Abrir Syllabus", "href": "" }, "todo": "Pegar URL del PDF del syllabus" },
  "schedule": { "title": "Cronograma", "previewUrl": "", "button": { "label": "Abrir Cronograma", "href": "" }, "todo": "Pegar URL del PDF del cronograma" }
}
```

Datos del docente: solo si el usuario los provee; nunca inventes nombre/foto/bio.
URLs de PDF: `""` + `todo` si no se conocen.

### `resources`
"Recursos de Apoyo": cards de e-book, video, artículo, software.

```json
{
  "type": "resources",
  "title": "Recursos de Apoyo",
  "items": [
    { "kind": "e-book", "level": "Básico", "icon": "📘", "title": "...", "description": "...", "href": "" }
  ]
}
```

| Campo de item | Tipo | Notas |
|---|---|---|
| `kind` | string | `e-book` \| `video` \| `articulo` \| `software` (el renderer colorea el icono por tipo). |
| `level` | string | Básico/Intermedio/Avanzado (badge). |
| `icon` | string (emoji) | — |
| `title`, `description` | string | Derivable de la bibliografía del syllabus. |
| `href` | string | URL del recurso; `""` si no se conoce. **No inventes URLs.** |

### `footer` (reutilizable)
Pie institucional.

```json
{ "type": "footer", "courseTitle": "Análisis Vectorial", "note": "Material institucional de apoyo.", "context": "" }
```

| Campo | Tipo | Notas |
|---|---|---|
| `courseTitle` | string | Título del curso. |
| `context` | string | En páginas `moment`: "curso · Momento N" / "curso · Contenido N". |
| `note` | string | Nota/copyright opcional (el año sale de `branding.year`). |

---

## Página `moment`

### `moment-banner`
Banner del momento (degradado oscuro, icono cuadrado, eyebrow, título, subtítulo).

```json
{
  "type": "moment-banner",
  "icon": "📐",
  "eyebrow": "Análisis Vectorial · Momento 1",
  "title": "Momento 1",
  "subtitle": "Diagnóstico Inicial"
}
```

| Campo | Tipo | Notas |
|---|---|---|
| `eyebrow` | string | "curso · Momento N" (o "· Contenido N" en AG). |
| `title` | string | `"<momentLabelSingular> <momentNumber>"`: "Contenido 3" (AG) o "Momento 1" (resto). |
| `subtitle` | string | `momentName` del momento. |
| `icon` | string (emoji) | — |

### `moment-intro`
Introducción + video del momento.

```json
{
  "type": "moment-intro",
  "title": "Introducción",
  "body": "Texto que contextualiza el momento según el enfoque didáctico.",
  "video": { "label": "Video del momento", "provider": "synthesia", "videoEmbedUrl": "", "todo": "Pegar URL del video del momento" }
}
```

`video.videoEmbedUrl`: `""` + `todo` si no se conoce. **No inventes la URL.**

### `roadmap` (reutilizable)
Igual estructura que en `welcome`.

### `scorm-link` (banner CTA reutilizable)
CTA al contenido teórico SCORM en Moodle.

```json
{
  "type": "scorm-link",
  "icon": "🎓",
  "eyebrow": "Contenido Teórico",
  "title": "Material Interactivo SCORM",
  "description": "Estudia el documento de saberes interactivo de este momento.",
  "button": { "label": "Abrir contenido", "href": "" },
  "todo": "Pegar URL del paquete SCORM en Moodle"
}
```

`button.href`: `""` + `todo` si no se conoce. **No inventes URLs de SCORM.**

### `workshop` (taller detallado del escenario) — página `moment`
Taller **completo e instruccional**, listo para pegar en Moodle (no es solo un botón). Una página `moment`
debe llevar el `workshop` del tema con su contenido redactado; el `practice-link` queda como CTA opcional.

```json
{
  "type": "workshop",
  "icon": "✏️",
  "title": "Taller del Tema 1 — Modelado y solución de sistemas",
  "subtitle": "Taller del escenario de aprendizaje",
  "estimatedTime": "3 horas",
  "participationType": "Individual",
  "evaluationMoment": "Formativo (avance)",
  "learningOutcomeIds": ["RA1", "RA2"],
  "objective": "Que modeles un problema de tu disciplina como sistema lineal y lo resuelvas con Gauss-Jordan.",
  "context": "A partir del caso adjunto, identifica las variables y relaciones y plantea el sistema.",
  "steps": [
    "Identifica las incógnitas y escribe qué representa cada una con sus unidades.",
    "Plantea las ecuaciones y la matriz aumentada $[A\\,|\\,b]$.",
    "Aplica Gauss-Jordan hasta la forma escalonada reducida.",
    "Clasifica el tipo de solución por el rango e interprétala en el contexto."
  ],
  "deliverable": "Documento con el planteamiento, la reducción paso a paso y la interpretación del resultado.",
  "submission": "Sube un PDF a la tarea del Tema 1 en Moodle antes del cierre de la semana.",
  "rubric": [
    {"criterio": "Modelado", "descriptor": "Plantea correctamente el sistema y su matriz aumentada."},
    {"criterio": "Procedimiento", "descriptor": "Aplica Gauss-Jordan sin errores y verifica."},
    {"criterio": "Interpretación", "descriptor": "Clasifica la solución y la explica en el contexto."}
  ],
  "feedback": {"strengths": "...", "improvement": "..."},
  "href": "",
  "buttonLabel": "Entregar el taller →",
  "todo": "Crear la tarea del taller en Moodle y pegar su URL."
}
```

| Campo | Tipo | Notas |
|---|---|---|
| `title`, `subtitle`, `icon` | string | encabezado del taller. |
| `estimatedTime`, `participationType`, `evaluationMoment` | string | chips (tiempo, modalidad, momento). |
| `learningOutcomeIds` | array | RA que evidencia (chip 🎯). En 1ª persona en el texto del RA. |
| `objective` / `objetivo` | string\|array (*rich*) | objetivo del taller. |
| `context` / `statement` / `enunciado` | string\|array (*rich*) | planteamiento. |
| `steps` / `pasos` | array (*rich*) | pasos numerados (Paso 1, 2…). |
| `deliverable` / `evidence` | string\|array (*rich*) | qué entregar. |
| `submission` | string\|array (*rich*) | cómo/dónde entregar. |
| `rubric` / `criterios` | array<{criterio, descriptor}>\|array<string> | criterios de evaluación. |
| `feedback` | {strengths, improvement}\|string | retroalimentación. |
| `href`, `buttonLabel`, `todo` | string | CTA de entrega; `href:""` si no se conoce (no inventes URLs). |

**Gobernanza:** el taller se redacta y propone en el Pipeline 1 (instrumento docente) y solo se incluye aquí
si el profesor lo aprobó (ver la skill de virtualización).

### `practice-link` (banner CTA reutilizable)
CTA a ejercicios/práctica en Moodle. Mismos campos que `scorm-link`
(`icon`, `eyebrow`, `title`, `description`, `button`, `todo`). Úsalo como complemento del `workshop`
(p. ej. enlace a ejercicios adicionales), no como sustituto del taller detallado.

```json
{
  "type": "practice-link",
  "icon": "✏️",
  "eyebrow": "Práctica",
  "title": "Ejercicios y aplicación",
  "description": "Resuelve la práctica asociada a este momento.",
  "button": { "label": "Ir a la práctica", "href": "" },
  "todo": "Pegar URL de la actividad de práctica en Moodle"
}
```

### `complementary`
"Material Complementario": referencias APA (campo *rich*).

```json
{
  "type": "complementary",
  "title": "Material Complementario",
  "subtitle": "Material complementario seleccionado para este tema (cobertura por tema).",
  "items": [
    {
      "resourceName": "Larson (2010) — Fundamentos de álgebra lineal",
      "tipo": "Capítulo de libro base",
      "apa": "Larson, R. (2010). <em>Fundamentos de álgebra lineal</em> (6.ª ed.). Cengage Learning. Cap. de sistemas lineales y método de Gauss-Jordan.",
      "justificacion": "Fuente disciplinar primaria para la etapa fundacional: definiciones, teoremas y ejercicios.",
      "href": "",
      "todo": "Pegar URL/ubicación en biblioteca institucional."
    }
  ]
}
```

| Campo de item | Tipo | Notas |
|---|---|---|
| `resourceName` | string | Nombre/etiqueta del recurso (autor + obra). |
| `tipo` | string | Tipo de recurso: "Capítulo de libro base", "Libro complementario", "Recurso abierto (video + ejercicios)", etc. Se muestra como chip. |
| `apa` | string (*rich*) | Referencia APA 7; `<em>` para títulos. Literal de la bibliografía/material complementario; **no inventes fuentes**. |
| `justificacion` | string (*rich*) | Por qué este recurso y para qué tema (de la tabla de material complementario de la Fase 6). |
| `href` | string | "Ver recurso"; `""` si no se conoce. **No inventes URLs.** |
| `todo` | string | (opcional) Nota para el autor (verificar edición, pegar URL, etc.). |

**Material complementario por tema (cobertura):** el componente `complementary` de cada página `moment`
debe listar los materiales que cubren ESE tema según la matriz de cobertura definida en la Fase 6 (p. ej.
T1 → M1, M3 · T2 → M2, M3 · …). Cada material es un item con `resourceName`, `tipo`, `apa`, `justificacion`.
El número total de materiales del curso respeta la cuota por créditos (3/5/7).

### `footer` (reutilizable)
Con `context` = "curso · Momento N" / "curso · Contenido N".

---

## Página `closing`

### `closing-hero`
Hero de cierre (felicitación / síntesis del recorrido).

```json
{ "type": "closing-hero", "eyebrow": "Cierre del curso", "title": "Has completado el recorrido", "description": "Síntesis del trayecto realizado." }
```

### `summary`
Síntesis de lo aprendido (deriva de los RA).

```json
{
  "type": "summary",
  "title": "Lo que aprendiste",
  "items": [
    { "icon": "✅", "title": "Modelado vectorial", "text": "Dominas el modelado de campos vectoriales." }
  ]
}
```

`items` puede mapear 1:1 con los RA de `learning-outcomes`.

### `next-steps`
Recomendaciones / rutas de profundización / evaluación.

```json
{
  "type": "next-steps",
  "title": "Próximos pasos",
  "items": [
    { "icon": "📈", "title": "Profundiza", "text": "Continúa con Cálculo Tensorial.", "href": "" }
  ]
}
```

### `final-evaluation` (banner CTA, opcional)
CTA a la evaluación sumativa final en Moodle. Mismos campos que `scorm-link`.

```json
{
  "type": "final-evaluation",
  "icon": "🏁",
  "eyebrow": "Evaluación final",
  "title": "Evaluación sumativa del curso",
  "description": "Demuestra el logro integral de los resultados de aprendizaje.",
  "button": { "label": "Ir a la evaluación", "href": "" },
  "todo": "Pegar URL de la evaluación final en Moodle"
}
```

### `footer` (reutilizable)

---

## Convención para datos faltantes (TODO)

Nunca inventes URLs de video, SCORM, práctica, syllabus PDF, cronograma, recursos, ni
datos personales del docente, ni fechas. Cuando falten:

- URLs y embeds: deja el campo (`href`, `videoEmbedUrl`, `embedUrl`, `previewUrl`,
  `photoUrl`, `src`) como `""` y añade un campo hermano `"todo"` con una instrucción
  clara para el autor (ej. `"todo": "Pegar URL del paquete SCORM en Moodle"`).
- Fechas (`opensAt`, `closesAt`): `""`.
- Datos del docente: omite o deja `""` con `todo`.

Sí puedes y debes extraer del syllabus: título, programa, RA, referencias APA,
momentos/temas, criterios, y descripción del curso.

---

## Reutilización del `subject` JSON de la skill SCORM

Cuando exista el `subject` JSON de la skill SCORM hermana de la misma asignatura
(`<slug>-contenido-NN.json`), reutiliza sus campos como fuente:

| Origen (`subject` SCORM) | Destino (`moodle`) |
|---|---|
| `subject.title` | `course.title` |
| `subject.program` | `course.program` |
| `subject.description` | `course.description` (re-enfocada a la página Moodle) |
| `subject.methodology.code` / `.name` / `.moments` | `course.methodology.*` |
| `subject.syllabus.learningOutcomes` | `learning-outcomes.items` |
| `subject.syllabus.bibliography` | `resources.items` y `complementary.items` (APA) |
| momentos de la metodología | claves `momento-N`, `momentName`, `momentCountLabel` |

La entrada primaria de la skill sigue siendo **syllabus + metodología por escrito**;
el `subject` SCORM es una fuente de reutilización, no un requisito.
