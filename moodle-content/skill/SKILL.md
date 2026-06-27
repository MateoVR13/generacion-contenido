---
name: moodle-content
description: Generate the validated `moodle`-rooted JSON that feeds the moodle-content template renderer to build the institutional Moodle classroom wrapper around a virtual asignatura's SCORM. Use when you must create the Moodle "envoltura" (welcome page, one page per learning moment, and a closing page) from a syllabus (PDF or text) plus a written methodology (AG, ABPr, ABI, ABR, or ABC). The skill produces ONLY JSON (never HTML; the renderer emits inline-styled HTML pasteable into Moodle): a welcome page with hero, learning outcomes, start activities, roadmap, course-at-a-glance and support resources; one moment page per methodology moment with moment banner, intro+video, SCORM link, practice link and APA complementary material; and a closing page with synthesis, next steps and optional final evaluation. Adapts to the methodology — AG = 7 "Contenido" pages, ABPr = 3, ABI/ABR/ABC = 4 "Momento" pages with the official UA moment names — extracts learning outcomes, APA references and moments from the syllabus, reuses the SCORM skill's `subject` JSON when present, never invents video/SCORM/syllabus/practice URLs (leaves empty fields with clear TODO placeholders), keeps the unified UA brand inline-only, and validates the result with the bundled Node validator.
---

# Moodle Content (envoltura institucional)

Esta skill genera el **JSON `moodle`** que alimenta el renderer `../template/`. El
renderer construye el HTML con **todos los estilos inline** (Moodle no admite
`<script>` ni CSS externo en el contenido). La skill **solo produce JSON**; nunca HTML.

Entrada: **syllabus (PDF o texto) + metodología por escrito** (`AG` | `ABPr` | `ABI` |
`ABR` | `ABC`). Salida: un único archivo JSON con raíz `moodle` que describe la
envoltura del curso en Moodle: una página de bienvenida, una página por momento de la
metodología, y una página de cierre.

Flujo del proyecto: `syllabus + metodología → [esta skill] → JSON → [renderer template] → HTML inline pegable`.

## Core Workflow

1. Identifica la **metodología** (código `AG`/`ABPr`/`ABI`/`ABR`/`ABC`) y el **syllabus**
   de entrada. Si el usuario no declara la metodología, pídela: es obligatoria y fija el
   número de páginas `moment`.
2. Antes de generar JSON, lee:
   - `references/json-contract.md` (contrato campo a campo del JSON `moodle`)
   - `references/component-catalog.md` (qué componente usar y con qué datos del syllabus)
   - `references/metodologias-ua.md` (las metodologías UA, sus momentos y nombres oficiales)
3. Extrae del syllabus, sin inventar: **título**, **programa**, **descripción**,
   **Resultados de Aprendizaje (RA)**, **referencias APA**, y los **temas/momentos**.
   Marca como faltante lo que no aparezca; no inventes metadatos institucionales,
   créditos, porcentajes, fechas, códigos ni referencias.
4. Si existe el `subject` JSON de la skill SCORM hermana de la misma asignatura
   (`<slug>-contenido-NN.json`), **reutilízalo** como fuente (título, programa, RA,
   bibliografía, metodología, momentos). Ver la tabla de reutilización en
   `json-contract.md`. La entrada primaria sigue siendo syllabus + metodología.
5. Pide solo lo **esencial faltante** que bloquee la generación: nombre de la
   asignatura, metodología, y (si el usuario quiere personalizarlos) logo, datos del
   docente o URLs reales. No interrogues por datos que pueden quedar como TODO.
6. Construye el árbol `moodle`:
   - `branding` (logo default si no se da otro), `course` (con `methodology`,
     `momentLabelSingular`, `momentCountLabel`).
   - `pageOrder` = `["bienvenida", "momento-1", …, "momento-N", "cierre"]`.
   - `pages`: una `welcome`, **N** `moment` (N = nº de momentos de la metodología), una
     `closing`. Cada página con su array `components`.
7. Rellena los componentes con datos reales del syllabus. Para todo lo que sea un
   enlace de Moodle o un recurso externo aún inexistente (video, SCORM, práctica,
   syllabus PDF, cronograma, recursos, infografía, evaluación final), deja el campo de
   URL como `""` y añade un campo hermano `"todo"` con instrucción clara. **No inventes
   URLs ni datos personales del docente ni fechas.**
8. Redacta los textos guía (descripción del curso, intro de cada momento, CTA de
   práctica) según el **enfoque didáctico** de la metodología: proyecto (ABPr),
   investigación (ABI), reto (ABR), caso (ABC) o ruta guiada (AG).
9. Genera **JSON únicamente** (raíz `moodle`), salvo que el usuario pida explicación.
   Nombre de archivo sugerido: `<slug-asignatura>-moodle.json`.
10. Valida con el validador incluido antes de devolver:
    `node moodle-content/skill/scripts/validate_moodle_json.js <archivo.json>`.
    Corrige hasta que pase (exit 0).

## Reglas no negociables

### Esquema JSON exacto
- Raíz **`moodle`** (nunca `course`, `subject`, `scorm` ni `pdf` como raíz).
- Obligatorios: `moodle.course.title`, `moodle.course.methodology.code`,
  `moodle.course.methodology.name`, `moodle.pageOrder`, `moodle.pages`.
- `pageOrder` y `pages` deben ser consistentes: cada clave de `pageOrder` existe en
  `pages` y cada clave de `pages` está en `pageOrder` (sin huérfanas, sin duplicados).
- Cada página tiene `type` ∈ `welcome` | `moment` | `closing` y un array `components`.
- Cada componente tiene `type` válido **y permitido para el tipo de su página** (ver
  `component-catalog.md` y `json-contract.md`).
- Exactamente **una** página `welcome` y **una** página `closing`.
- Las páginas `moment` llevan `momentNumber` y `momentName`.

### Marca unificada, solo-inline
- Marca UA unificada con las skills SCORM (`identidad_marca.md` del proyecto SCORM y la
  sección "Marca" de `../../DESIGN.md`): acento principal lima `#c0f500`, secundario
  ámbar `#f0b300`, fondo oscuro `#1a2403`, tipografías Montserrat (títulos) / Inter
  (cuerpo), logo `branding.logoUrl` (default `https://i.postimg.cc/c1tGwQnF/Logo-UA.png`).
- La skill **no escribe estilos ni HTML**: el renderer aplica la marca inline. **Ningún
  campo del JSON puede contener** `<script>`, `<style>`, `<link>`, manejadores `on*=`,
  `javascript:`, ni etiquetas de documento. El único HTML permitido es texto
  enriquecido inline (`<em>`, `<strong>`, `<a href>`) en campos *rich* como las
  referencias APA (`complementary.items[].apa`).

### Adaptación por metodología
La metodología fija el **número de páginas `moment`**, la **etiqueta del momento**
(`momentLabelSingular`), los **nombres de momento** (`momentName`) y el **enfoque** de
los textos. La estructura interna de cada página NO cambia.

| Código | Nombre | Nº páginas `moment` | `momentLabelSingular` | Nombres de momento |
|---|---|---|---|---|
| `AG` | Aprendizaje Guiado | **7** | `Contenido` | Libres (temas/etapas del curso) |
| `ABPr` | Aprendizaje Basado en Proyectos | **3** | `Momento` | Diagnóstico Inicial · Análisis y Diseño · Conclusiones |
| `ABI` | Aprendizaje Basado en Investigación | **4** | `Momento` | Problematización · Desarrollo teórico · Metodología e implementación · Resultados y conclusiones |
| `ABR` | Aprendizaje Basado en Retos | **4** | `Momento` | Definición del reto · Ideación · Solución e implementación · Validación y evaluación |
| `ABC` | Aprendizaje Basado en Casos | **4** | `Momento` | Presentación y análisis del caso · Análisis micro caso 1 · Análisis micro caso 2 · Conclusiones |

- AG usa etiqueta **"Contenido"**, 7 páginas momento, chip "7 Contenidos" (coherente con
  la skill `aprendizaje-guiado-scorm`, que genera 7 contenidos). Los `momentName` de AG
  son los temas/etapas del curso (del syllabus).
- ABPr/ABI/ABR/ABC usan etiqueta **"Momento"**; cada página `moment` corresponde a un
  momento oficial cuyo `momentName` es el nombre exacto de `metodologias-ua.md`. El chip
  refleja el nº ("3 Momentos" / "4 Momentos").
- El enfoque de los textos (descripción del curso, intro de momentos, CTA de práctica)
  se redacta según la didáctica: proyecto / investigación / reto / caso / ruta guiada.

### Extracción del syllabus y datos faltantes
- Extrae del syllabus: título, programa, descripción, RA (→ `learning-outcomes` y
  `summary`), referencias APA (→ `resources` y `complementary`), y temas/momentos
  (→ claves `momento-N`, `momentName`).
- Pide solo lo esencial faltante que bloquee la generación.
- **No inventes** URLs de video, SCORM, práctica, syllabus PDF, cronograma, recursos,
  infografía ni evaluación; ni datos del docente; ni fechas. Cuando falten:
  - URLs/embeds (`href`, `videoEmbedUrl`, `embedUrl`, `previewUrl`, `photoUrl`, `src`):
    déjalos como `""` y añade un campo hermano `"todo"` con instrucción clara para el
    autor (ej. `"todo": "Pegar URL del paquete SCORM en Moodle"`).
  - Fechas (`opensAt`, `closesAt`): `""`.
  - Datos del docente: omítelos o déjalos `""` con `todo`.
- Reutiliza el `subject` JSON de la skill SCORM cuando exista (tabla en `json-contract.md`).

## Quality Checklist

Antes de devolver el JSON:

- Raíz `moodle`; sin `course`/`subject` como raíz.
- `moodle.course.title`, `methodology.code` (válido) y `methodology.name` presentes.
- `momentLabelSingular` correcto: "Contenido" para AG, "Momento" para el resto.
- `momentCountLabel` coherente con el nº de momentos.
- `pageOrder` ↔ `pages` consistentes (sin huérfanas, sin duplicados).
- Exactamente una `welcome` y una `closing`.
- Nº de páginas `moment` = nº de momentos de la metodología (AG=7, ABPr=3, ABI=ABR=ABC=4).
- Cada página `moment` tiene `momentNumber` y `momentName`; los `momentName` de
  ABPr/ABI/ABR/ABC son los nombres oficiales exactos.
- Cada componente tiene `type` válido y permitido para el tipo de su página.
- Los RA del syllabus alimentan `learning-outcomes` (y se reflejan en `summary`).
- Las referencias APA salen del syllabus (no inventadas) en `resources`/`complementary`,
  con `<em>` en títulos.
- Todas las URLs ausentes están como `""` + `todo`; ninguna URL inventada.
- Sin datos de docente inventados; sin fechas inventadas.
- Ningún campo contiene `<script>`/`<style>`/`<link>`/`on*=`/`javascript:`; solo texto
  enriquecido inline permitido en campos *rich*.
- Textos guía redactados según el enfoque didáctico de la metodología.
- Español correcto: tildes, signos de apertura `¿`/`¡`, sin mojibake.
- El validador pasa: `node moodle-content/skill/scripts/validate_moodle_json.js <archivo.json>` (exit 0).

## Resources

- `references/json-contract.md` — contrato completo del JSON `moodle`: forma raíz,
  `branding`, `course`, `pageOrder`, `pages`, y cada componente con sus campos y
  ejemplos. Léelo antes de generar.
- `references/component-catalog.md` — catálogo de componentes: cuándo usar cada uno y
  qué datos del syllabus lo alimentan, más la cardinalidad por metodología.
- `references/metodologias-ua.md` — las metodologías UA (ABPr/ABI/ABR/ABC) y sus
  momentos oficiales; AG está en la skill `aprendizaje-guiado-scorm`. Úsalo para fijar
  nº de momentos, nombres y enfoque didáctico.
- `scripts/validate_moodle_json.js` — validador Node: comprueba raíz `moodle`,
  consistencia `pageOrder`↔`pages`, tipos de página, cardinalidad de momentos por
  metodología, tipos de componente válidos/permitidos por página, y ausencia de
  contenido activo (`<script>`/`<style>`/`on*=`/`javascript:`). Pasa `node --check`.
- `../../DESIGN.md` — contrato maestro del proyecto (esquema, marca, reglas del renderer).
- `../template/` — renderer que consume este JSON y emite el HTML inline pegable.
