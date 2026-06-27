# Component Catalog — moodle-content

Catálogo de los componentes del JSON `moodle`: para qué sirve cada uno, cuándo
usarlo, y qué datos del **syllabus + metodología** lo alimentan. Los nombres y
campos exactos están en `json-contract.md`; aquí decides *cuándo* y *con qué datos*.

La envoltura Moodle es la capa institucional que rodea al SCORM: presenta el curso,
guía por momentos y enlaza el contenido teórico (SCORM), la práctica y la evaluación
que ya viven en Moodle. **No** desarrolla teoría (eso lo hacen las skills SCORM); su
trabajo es orientar, contextualizar y enlazar.

---

## Mapa rápido: página → componentes

| Página | Componentes (orden típico) |
|---|---|
| `welcome` | `hero` → `learning-outcomes` → `activities` → `roadmap` → `course-glance` → `resources` → `footer` |
| `moment` | `moment-banner` → `moment-intro` → `roadmap`(opc) → `scorm-link` → `workshop` → `practice-link`(opc) → `complementary` → `footer` |
| `closing` | `closing-hero` → `summary` → `next-steps` → `final-evaluation`(opc) → `footer` |

Reutilizables entre páginas: `roadmap`, `footer`, y los banners CTA (`scorm-link`,
`practice-link`, `final-evaluation`).

---

## Componentes de `welcome`

### `hero`
- **Cuándo:** siempre; abre la página de bienvenida.
- **Función:** portada del curso con título, descripción, chips y video de presentación.
- **Datos del syllabus:** título de la asignatura, programa, descripción/justificación.
  El enfoque de la `description` se redacta según la metodología (proyecto /
  investigación / reto / caso / ruta guiada). Chips: programa + nombre de metodología
  + `momentCountLabel`.
- **Video:** si el usuario da una URL Synthesia/YouTube, úsala; si no, `videoEmbedUrl: ""` + `todo`.

### `learning-outcomes`
- **Cuándo:** siempre que el syllabus declare RA.
- **Función:** grid de cards con los Resultados de Aprendizaje.
- **Datos del syllabus:** `learningOutcomes` (literal). `label` = verbo/etiqueta del RA
  (Modelo, Analizo, Resuelvo…); `text` = enunciado completo. Si reutilizas el `subject`
  SCORM, toma `subject.syllabus.learningOutcomes`.

### `activities`
- **Cuándo:** siempre; "Actividades de Inicio" del curso.
- **Función:** cards de actividades diagnósticas/sociales (diagnóstica, foro de
  presentación, bitácora, acuerdos).
- **Datos del syllabus:** plan de evaluación inicial / actividades de apertura. Las
  URLs (`button.href`) y fechas (`opensAt`/`closesAt`) van vacías + `todo` si no se
  conocen — son enlaces de Moodle que el autor pega.

### `roadmap`
- **Cuándo:** opcional pero recomendado; infografía de la hoja de ruta del curso.
- **Función:** embebe por iframe una infografía externa (ej. Netlify).
- **Datos:** ninguno textual; `embedUrl` es una URL externa que el autor pega
  (`""` + `todo` si no se conoce).

### `course-glance`
- **Cuándo:** cuando el usuario provea datos del docente y/o PDFs de syllabus/cronograma.
- **Función:** hasta 3 cards: docente (foto, nombre, rol, bio, tags), syllabus (preview
  PDF + botón), cronograma (preview PDF + botón).
- **Datos:** docente — **solo** si el usuario los da (nunca inventes nombre/foto/bio).
  PDFs — URLs vacías + `todo`.

### `resources`
- **Cuándo:** siempre que haya bibliografía o recursos de apoyo.
- **Función:** cards de recursos (e-book, video, artículo, software) con badge tipo·nivel.
- **Datos del syllabus:** bibliografía básica/complementaria → título y descripción.
  `kind` clasifica el recurso (colorea el icono); `href` vacío + `todo` si no hay URL.

### `footer`
- **Cuándo:** siempre; cierra cada página.
- **Datos:** título del curso; el año viene de `branding.year`.

---

## Componentes de `moment`

(Una página `moment` por cada momento de la metodología — ver cardinalidad abajo.)

### `moment-banner`
- **Cuándo:** siempre; abre la página del momento.
- **Función:** banner con icono, eyebrow ("curso · Momento N"), título y subtítulo.
- **Datos:** `title` = `"<momentLabelSingular> <momentNumber>"` ("Contenido 3" en AG,
  "Momento 1" en el resto); `subtitle` = `momentName` (tema libre en AG; nombre oficial
  del momento en ABPr/ABI/ABR/ABC, ver `metodologias-ua.md`).

### `moment-intro`
- **Cuándo:** siempre; contextualiza el momento y enlaza su video.
- **Función:** texto introductorio + video del momento.
- **Datos:** el `body` orienta el momento según el enfoque didáctico (qué se trabaja en
  este momento del proyecto/investigación/reto/caso/ruta). Toma el tema del syllabus y la
  intención del momento. `videoEmbedUrl` vacío + `todo` si no se conoce.

### `roadmap`
- **Cuándo:** opcional; reutiliza la infografía si aporta orientación dentro del momento.

### `scorm-link`
- **Cuándo:** siempre; es el enlace al contenido teórico SCORM de ese momento.
- **Función:** banner CTA → paquete SCORM en Moodle.
- **Datos:** `href` = URL del SCORM en Moodle → vacío + `todo` (el autor lo pega tras
  publicar el paquete). El texto del CTA puede mencionar el documento de saberes del
  momento.

### `practice-link`
- **Cuándo:** cuando el momento tenga práctica/ejercicios asociados en Moodle.
- **Función:** banner CTA → actividad de práctica.
- **Datos:** `href` vacío + `todo`. El enfoque del texto sigue la didáctica (resolver,
  prototipar, analizar caso, investigar…).

### `complementary`
- **Cuándo:** siempre que el momento tenga material de apoyo/lecturas.
- **Función:** lista de referencias APA del momento.
- **Datos del syllabus:** bibliografía asociada al tema del momento; cada item lleva la
  referencia APA literal (`<em>` para títulos) y `href` vacío + `todo` si no hay URL.

### `footer`
- **Cuándo:** siempre; con `context` = "curso · Momento N" / "· Contenido N".

---

## Componentes de `closing`

### `closing-hero`
- **Cuándo:** siempre; abre el cierre del curso.
- **Función:** felicitación y síntesis del recorrido.
- **Datos:** texto de cierre; refleja el logro integral del curso según la metodología.

### `summary`
- **Cuándo:** siempre; síntesis de lo aprendido.
- **Función:** cards/lista de logros y competencias alcanzadas.
- **Datos del syllabus:** deriva de los RA (`learning-outcomes`); cada item resume un RA
  como logro alcanzado.

### `next-steps`
- **Cuándo:** siempre; rutas de profundización y siguientes pasos.
- **Función:** recomendaciones, asignaturas/temas siguientes, evaluación.
- **Datos:** mapa curricular/competencias del syllabus; `href` vacío + `todo` si enlaza
  a Moodle.

### `final-evaluation`
- **Cuándo:** opcional; cuando haya evaluación sumativa final en Moodle.
- **Función:** banner CTA → evaluación final.
- **Datos:** `href` vacío + `todo`.

### `footer`
- **Cuándo:** siempre.

---

## Cardinalidad de páginas `moment` por metodología

Fuente: `metodologias-ua.md` y `../../DESIGN.md`.

| Código | Nombre | Nº páginas `moment` | `momentLabelSingular` | Nombres de momento |
|---|---|---|---|---|
| `AG` | Aprendizaje Guiado | 7 | `Contenido` | Libres (temas/etapas del curso) |
| `ABPr` | Aprendizaje Basado en Proyectos | 3 | `Momento` | Diagnóstico Inicial · Análisis y Diseño · Conclusiones |
| `ABI` | Aprendizaje Basado en Investigación | 4 | `Momento` | Problematización · Desarrollo teórico · Metodología e implementación · Resultados y conclusiones |
| `ABR` | Aprendizaje Basado en Retos | 4 | `Momento` | Definición del reto · Ideación · Solución e implementación · Validación y evaluación |
| `ABC` | Aprendizaje Basado en Casos | 4 | `Momento` | Presentación y análisis del caso · Análisis micro caso 1 · Análisis micro caso 2 · Conclusiones |

El chip del hero (`momentCountLabel`) refleja el nº: "7 Contenidos" (AG),
"3 Momentos" (ABPr), "4 Momentos" (ABI/ABR/ABC).

---

## Cuándo NO usar un componente

- No uses `course-glance` con datos de docente inventados; omítelo o deja `todo`.
- No uses `roadmap` si no hay infografía real planeada (deja `embedUrl: ""` + `todo` o
  no lo incluyas).
- No uses banners CTA (`scorm-link`/`practice-link`/`final-evaluation`) con `href`
  inventado; siempre `""` + `todo` cuando el enlace de Moodle aún no exista.
- No metas teoría en la envoltura Moodle: la teoría es del SCORM. Aquí solo orientas y
  enlazas.
