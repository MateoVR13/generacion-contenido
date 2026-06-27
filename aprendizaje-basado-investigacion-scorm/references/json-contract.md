# SCORM/PDF JSON Contract

Use this contract for JSON consumed by the SCORM/PDF template app.

## Root Shape

New asignatura generation produces four independent JSON files, one per Aprendizaje Basado en Investigación moment:

- `<slug-asignatura>-contenido-01.json` — Problematización
- `<slug-asignatura>-contenido-02.json` — Desarrollo teórico
- `<slug-asignatura>-contenido-03.json` — Metodología e implementación
- `<slug-asignatura>-contenido-04.json` — Resultados y conclusiones

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
  "contentNumber": "01",
  "contentTotal": "04",
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
    "code": "ABI",
    "name": "Aprendizaje Basado en Investigación",
    "rationale": "Justificación breve.",
    "moments": ["Problematización", "Desarrollo teórico", "Metodología e implementación", "Resultados y conclusiones"]
  }
}
```

`subject.syllabus` is required when a syllabus PDF or syllabus text was provided. Keep `missingFields` explicit instead of inventing data.

`subject.methodology` is required for full asignatura package generation. For virtual asignaturas, always use ABI - Aprendizaje Basado en Investigación:

```json
"methodology": {
  "code": "ABI",
  "name": "Aprendizaje Basado en Investigación",
  "rationale": "Ruta de investigación que lleva al estudiante a problematizar, fundamentar teóricamente, diseñar metodología y presentar resultados y conclusiones.",
  "moments": ["Problematización", "Desarrollo teórico", "Metodología e implementación", "Resultados y conclusiones"]
}
```

Do not use other methodology codes, names, or moments for generated virtual asignatura JSON.

Optional instructional metadata may appear on sections and components:

```json
{
  "learningOutcomeIds": ["RA1"],
  "methodologyMoment": "Problematización",
  "estimatedTime": "45 minutos",
  "studentAction": "Leer, resolver y contrastar.",
  "evidence": "Respuesta argumentada o producto esperado.",
  "feedbackRoute": "Retroalimentación automática, docente o entre pares."
}
```

## SCORM Branch

SCORM is the interactive web branch. It may include video, podcast, listening, quizzes, matching, multi-select, fill-blank, tabs, carousel, flashcards, and downloadable material.

Each key in `scorm.sections` is the HTML id. It must appear in `scorm.sectionOrder`.

For each of the four content JSON files, `scorm.sectionOrder` must contain exactly six ids:

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

For complete asignatura generation, the package contains 20 thematic sections: four contents times five thematic sections. These 20 sections must be unique in concept, explanation, example, activity, visual support, assessment, and RA evidence.

Before generating JSON, create an internal 4 x 5 diversity blueprint. Each row must define a distinct disciplinary concept, RA evidence, learner action, example/case, visual artifact, code or trace task when relevant, misconception, guided practice, and feedback. If two sections can exchange their titles without changing the body, the content fails the contract.

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

For each of the four content JSON files, `pdf.sectionOrder` must contain exactly six ids:

```json
["pdf-intro", "pdf-seccion-1", "pdf-seccion-2", "pdf-seccion-3", "pdf-seccion-4", "pdf-seccion-5"]
```

Each PDF uses the same minimum page extension requested by the user. Do not divide the requested pages across the four files.

Each PDF section must be a unique printable chapter. It must include concept-specific theory, examples, exercises, expected answers, visuals, and evaluation criteria. Do not repeat a generic "study guide" paragraph pattern across all five sections.

```json
"pdf": {
  "guideLabel": "GUÍA DE ESTUDIO VIRTUAL",
  "kicker": "Aprendizaje basado en investigación · Práctica aplicada · Autoevaluación",
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
- `references`
- `downloads`
- `evaluation-activity`

Use their existing field names from the template project.

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
  "title": "Mapa de la guía",
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

```json
{
  "type": "exercise-set",
  "title": "Banco de ejercicios",
  "items": [
    {"prompt": "Ejercicio 1.", "formula": "x=1", "answer": "Respuesta opcional."}
  ]
}
```

## Validation Rules

- No component id may appear in `componentOrder` unless it exists in the same section's `components`.
- No SCORM section id may appear in `scorm.sectionOrder` unless it exists in `scorm.sections`.
- No PDF section id may appear in `pdf.sectionOrder` unless it exists in `pdf.sections`.
- New asignatura packages must produce four JSON files, each with six SCORM sections and six PDF sections.
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
- Full-package generation must pass a content-uniqueness validation before final delivery. When available, run `node aprendizaje-basado-investigacion-scorm/scripts/validate_content_package.js <generated-json-files>` and treat duplicate long strings or repeated 12-word sequences across thematic sections as blocking errors.
