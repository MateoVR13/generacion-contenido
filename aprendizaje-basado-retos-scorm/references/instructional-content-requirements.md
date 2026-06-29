# Instructional Content Requirements

Use these requirements when generating, revising, expanding, or validating SCORM/PDF JSON content for an asignatura.

## Mandatory Source Priority

1. Treat an attached syllabus PDF as the primary academic source for the asignatura.
2. Read the internal mandatory references bundled with this skill before generating complete content:
   - `syllabus_ejemplo_estructura.md`
   - `lineamientos_virtualidad.md`
   - `evaluacion_cualitativa_pregrado.md`
   - `estrategias_didacticas_comunicativas.md`
   - `identidad_marca.md`
3. Do not copy a syllabus format mechanically. Extract academic facts, learning outcomes, evaluation criteria, methodology clues, topics, and bibliography.
4. Mark missing syllabus fields in `subject.syllabus.missingFields`; do not invent institutional data, codes, credits, dates, programs, percentages, or bibliographic sources.

## Syllabus Ingestion

Capture syllabus data under `subject.syllabus`:

```json
{
  "source": {"type": "pdf", "fileName": "syllabus.pdf"},
  "extractedFields": {
    "code": "",
    "faculty": "",
    "program": "",
    "level": "",
    "type": "",
    "modality": "",
    "semester": "",
    "credits": "",
    "hours": {"total": "", "autonomous": "", "directTeaching": ""},
    "updatedAt": "",
    "version": ""
  },
  "learningOutcomes": [{"id": "RA1", "text": ""}],
  "priorKnowledge": [],
  "competencies": [],
  "evaluationCriteria": [],
  "topics": [],
  "methodologyNotes": [],
  "evaluationPlan": [],
  "bibliography": {"basic": [], "complementary": []},
  "missingFields": []
}
```

Use syllabus learning outcomes as the backbone for SCORM sections, PDF theory sections, activities, evaluation, and exercises. Every major component should either declare or clearly evidence the RA it supports.

## Virtuality Rules

- Design a learning experience, not a repository of files.
- Every SCORM HTML/resource should include purpose, student action, estimated time or workload, evidence/reflection, and evaluation or feedback route when applicable.
- Balance autonomous work, teacher guidance, interaction, collaboration, and accessibility.
- Include diagnostic, formative, and final/summative evaluation with feedback.
- Do not leave videos, podcasts, links, readings, or downloads without context; each resource needs use instructions, suggested duration or dedication, guiding questions, and relation to an activity or evidence.
- Do not introduce a technical topic through a complementary resource alone. Before any image, diagram prompt, video, podcast, audio, listening activity, or similar media component, include a substantial theoretical/contextual block in the same SCORM section that explains what the learner is about to observe and why it matters.
- Do not make the first learner action a narrow technical question unless the concept has already been introduced. Presaberes and diagnostics should activate prior knowledge at an accessible level, then lead into the new topic.

## Fixed Virtual Methodology

Generated asignaturas are 100% virtual and must use only ABR - Aprendizaje Basado en Retos. Do not choose or mention other active methodologies in generated JSON.

Official ABR learning moments (one JSON file per moment, in this order):

- Definición del reto
- Ideación
- Solución e implementación
- Validación y evaluación

The content theory prepares the learner to tackle and solve a CHALLENGE: the initial scenario presents the situation context, defines the challenge, and poses direction-setting questions that guide exploration; the knowledge document gives the bases to ideate, design and implement a solution to the challenge, then validate and evaluate it. Emphasis on ideation, prototyping/solution, and validation.

Represent the selected methodology under:

```json
"methodology": {
  "code": "ABR",
  "name": "Aprendizaje Basado en Retos",
  "rationale": "",
  "moments": ["Definición del reto", "Ideación", "Solución e implementación", "Validación y evaluación"]
}
```

Use diagnostic, formative, and final evaluation inside the ABR route; those evaluation moments do not replace the official learning moments.

## Four Content Package Structure

Every new asignatura generation must produce exactly four independent JSON files, one per ABR learning moment:

1. `<slug-asignatura>-contenido-01.json` → Definición del reto
2. `<slug-asignatura>-contenido-02.json` → Ideación
3. `<slug-asignatura>-contenido-03.json` → Solución e implementación
4. `<slug-asignatura>-contenido-04.json` → Validación y evaluación

Each JSON file must include:

- `subject.contentNumber` from `01` to `04`.
- `subject.contentTotal: "04"`.
- `subject.methodology.code: "ABR"`.
- Six SCORM sections: `intro`, `seccion-1`, `seccion-2`, `seccion-3`, `seccion-4`, `seccion-5`.
- Six PDF sections: `pdf-intro`, `pdf-seccion-1`, `pdf-seccion-2`, `pdf-seccion-3`, `pdf-seccion-4`, `pdf-seccion-5`.
- At least three substantial `theory-block` or `concept-block` components inside every thematic SCORM section (`seccion-1` through `seccion-5`). Do not count the introductory section toward this minimum.

The user-provided PDF extension applies to each PDF file. If the user requests "mínimo 12 páginas", each of the four `pdf` branches must support 12 printable pages.

Across the full package, the 20 thematic sections must be different. A package that repeats the same theoretical shell, practice steps, exercise pattern, expected answer, feedback, visual prompt, or code scaffold with only topic names changed does not meet academic quality requirements, even if the JSON structure is valid.

## Course Structure Expectations

When generating a complete asignatura package, include the following as appropriate to scope:

- Welcome and asignatura overview.
- Virtual teacher or guidance presence.
- Diagnostic evaluation or presaberes activity.
- Initial scenario with problem/context/guiding question when methodology calls for it.
- Initial methodological document that explains organization, methodology, activities, formats, weights when applicable, evaluation, phases, final deliverable, and expectations.
- Weekly or thematic knowledge documents organized by methodology moments.
- Didactic components to strengthen, expand, or deepen concepts.
- Complementary material with clear purpose and student instructions.
- Individual and collaborative activities.
- Evaluation instruments and feedback guidance.

For 2, 3, and 4 credit asignaturas, orient didactic components as 2, 3, and 4 components respectively when the user or syllabus does not set another quantity.

## SCORM Thematic Sequence

Before drafting each SCORM theme, apply `component-selection.md`: identify the disciplinary representation that best teaches the concept and select supported HTML components from that evidence need. Do not choose a chart, formula, image, code block, interaction, or accordion just because the layout needs variety.

Before drafting text, apply `content-uniqueness-validation.md`: plan the 4 x 5 package as a diversity matrix and ensure every thematic section has unique RA evidence, example/case, visual artifact, code or trace task, misconception, guided practice, feedback, and transfer.

Each SCORM theme should follow a visible instructional line. Adapt the components to the discipline, but keep the logic:

1. **Orientar:** brief theme title, purpose, relevance, and connection with the asignatura or RA.
2. **Explicar ciclo 1:** include a substantial `theory-block`/`concept-block` before any media, formula, code, chart, or validation activity.
3. **Visualizar o ejemplificar ciclo 1:** use two or three expert-selected complementary components such as image, figure, table, chart, example, formula, case, conversation, norm, process, dataset, code, or support activity only after the concept is explained and only when the component is the right representation for the discipline.
4. **Explicar ciclo 2:** include a second substantial `theory-block`/`concept-block` that develops the next concept, method, contrast, error pattern, or application condition.
5. **Complementar ciclo 2:** add two or three components that apply, compare, visualize, calculate, practice, or validate the second theory block. Replace weak charts/formulas with diagrams, tables, code, steppers, or reflections when those better teach the concept.
6. **Explicar ciclo 3:** include a third substantial `theory-block`/`concept-block` that closes the conceptual progression and prepares transfer, synthesis, or higher-level practice.
7. **Aplicar, validar y cerrar:** include guided practice with real steps (`stepper` when procedural), a worked example, case analysis, language practice, disciplinary task, quiz, matching, multi-select, fill-blank, reflection, checklist, summary, or transfer guidance with useful feedback.

Do not use this sequence mechanically, but do not reduce the theory count below three blocks in `seccion-1` through `seccion-5`. If a theme appears too short for three theory blocks, expand it into sub-concepts, common errors, interpretation, method conditions, applications, or transfer instead of replacing theory with support components. Never skip the explanation step when the next component depends on it.

## Component Depth Requirements

- `theory-block` / `concept-block`: for central concepts, include 3+ developed paragraphs, 3-5 key ideas, 1-3 internal subsections, one example or mini-case, and a closing prompt. For minor transitions, a shorter block is acceptable.
- Theory blocks must be concept-specific. Do not reuse the same explanatory paragraphs, key ideas, evidence statements, examples, or closing prompts across sections or contents.
- SCORM theory density: every thematic SCORM section (`seccion-1` through `seccion-5`) must include at least three `theory-block` or `concept-block` components. These blocks should be distributed through the section as theory -> 2-3 complementary components -> theory -> 2-3 complementary components -> theory -> practice/validation/closure. Do not stack the three theory blocks at the beginning as a workaround.
- Component selection: every complementary component must pass the relevant gate in `component-selection.md`. A chart needs meaningful quantitative evidence; a formula needs conceptual centrality and use; an image/figure needs visual-spatial value; a code block needs executable or traceable learning value.
- `accordion` / `tabs`: use for comparison, organization, myths/errors, categories, or frequently confused ideas. Each item should include enough explanation to stand alone; avoid isolated definitions of one sentence unless the concept was fully developed earlier.
- `stepper`: use for guided practice, procedures, problem solving, implementation, analysis, reading strategies, legal reasoning, experiment design, or language production. Include a statement, ordered steps, intermediate reasoning, and a final verification.
- `formula`: introduce the problem the expression solves, show the LaTeX expression, define variables, explain how to read it, and connect it to a decision, example, graph, code, or exercise.
- `code`: include prerequisites or assumptions, where and how to run or trace the fragment, what to inspect or modify, exact commands when applicable, sample input, expected output, and interpretation of possible errors.
- `chart`: include a learning reason. The chart should help compare, detect a pattern, read uncertainty, evaluate performance, inspect errors, understand distribution, or support a decision.
- `image` / `figure`: include `alt`, `caption`, and a precise `prompt` when `src` is empty. If the same visual belongs in PDF and SCORM, share `assetId`.
- Interactive checks: include feedback for correct and incorrect choices. Feedback should name the concept, explain why the answer works or fails, and suggest what to review.

## PDF Versus SCORM

The same JSON can include both branches, but the branches do not contain the same component set.

- SCORM may include interactive, multimedia, and Moodle-oriented activities.
- PDF must include only printable theory, explanations, examples, practice, evaluation instruments, references, glossary, and annexes.
- Do not put video, podcast, listening, matching, multi-select, fill-blank, quiz, tabs, carousel, flashcards, or other interactive components in `pdf.sections`.
- If SCORM has an interactive activity, translate its learning value into printable PDF form only when needed: explanation, case, exercise, rubric, reflection, checklist, or practice bank.
- PDF should be visually varied but printable: combine developed paragraphs, callouts, examples, formulas, tables, centered Chart.js charts with notes, conceptual images, code snippets, exercises, rubrics, and references according to the discipline.
- PDF content must not be generated from a repeated section shell. Every `pdf-seccion-*` requires a unique explanation, unique example, unique exercise set, unique expected answers, and unique visual or code rationale aligned to that section's RA evidence.
- Avoid large empty jumps or isolated one-line sections in PDF. If a section is short, merge it with a related section or add explanatory context, example, table, figure, or exercise.

## Academic Quality Requirements

Adapt content to the discipline instead of forcing a generic structure:

- Mathematics: definitions, theorems, proofs, models, worked exercises.
- Physics: laws, principles, experiments, models, measurement.
- Languages: communicative functions, grammar, vocabulary, listening/reading/writing/speaking practice.
- Law: norms, doctrine, jurisprudence, cases, argumentation.
- Engineering: systems, designs, constraints, simulations, implementation.
- Social sciences: theories, methods, context, evidence, interpretation.

For each substantial module/theme, include only the relevant subset of:

- Introduction, objectives, and relation to the asignatura.
- Rigorous concepts, origins, context, importance, and applications.
- Principles, laws, rules, standards, frameworks, models, or systems.
- Methodologies and comparison when useful.
- Progressive examples from basic to advanced.
- Analogies only when they clarify without sacrificing rigor.
- Real cases, successes/failures, common errors, myths, and good practices when relevant.
- Applications in academic, professional, social, technological, or international contexts.
- Tools, emerging technologies, AI, automation, data analytics, risks, ethics, regulation, and future trends when relevant.
- Executive summary, transfer guidance, and recommendations.

Answer, when relevant: what it is, why it exists, how it works, how to implement it, where it is used, when to use it, when to avoid it, risks, and how to measure results.

Use discipline-appropriate visual evidence and component selection:

- Engineering, computing, data, and science: diagrams of systems, matrices/tensors, workflows, experimental setups, confusion matrices, correlations, distributions, residual/error plots, performance curves, simulations, architecture diagrams, and before/after comparisons.
- Mathematics and physics: graphs, geometric diagrams, tables of values, worked derivations, measurement diagrams, model assumptions, and comparison of solution methods.
- Languages: dialogue cards, listening scripts, pronunciation/intonation cues, vocabulary maps, grammar contrast tables, communicative situations, and task models.
- Law and social sciences: timelines, case maps, actor maps, norm/process flows, argument maps, evidence tables, comparative frameworks, and scenario analyses.
- Business and administration: process maps, dashboards, KPI trends, decision matrices, segmentation charts, risk maps, and case evidence.

Do not force a chart, formula, image, code block, or interaction just to decorate. If a visual does not clarify a concept, support a decision, or improve practice, use text, table, list, callout, stepper, or another better-fitting component instead.

## Evaluation Requirements

Pregrado evaluation must be qualitative, formative, continuous, collaborative, and centered on learning outcomes.

Use these qualitative performance levels:

- Sobresaliente
- Muy bueno
- Bueno
- Aceptable
- Insuficiente
- Deficiente
- No acreditable
- Perdida por fallas

Do not design evaluation only as accumulated percentages or numeric grades. If percentages appear in the syllabus or user prompt, include them as transparent weights tied to activities, deliverables, criteria, evidence, rubrics, and feedback.

Every evaluative activity should declare:

- Learning outcome / RA.
- Criterion.
- Evidence.
- Technique.
- Instrument.
- Percentage or weight when applicable.
- Evaluation moment: initial, progress/formative, or final.
- Participation type: individual, collaborative, autoevaluation, coevaluation, or heteroevaluation.
- Feedback route: strengths, improvement points, reinforcement actions, and next step.
- Expected qualitative level or rubric descriptors.

Use analytic rubrics for disciplinary knowledge and doing. Use holistic rubrics for being, being with others, attitude, commitment, communication, perseverance, responsible technology use, and collaboration.

## Exercises And Practice

For full academic content, build exercises at multiple cognitive levels:

1. Comprehension.
2. Application.
3. Analysis.
4. Design or creation.
5. Real problem solving.

**Variedad obligatoria de tipos de ejercicio (sobre todo en el PDF).** Los ejercicios no pueden ser todos mecánicos ni repetitivos. En el PDF, cada `exercise-set`/banco de ejercicios debe **mezclar varios tipos** y no clonar el mismo patrón con números cambiados. Combina, según la disciplina:

- **Mecánicos / de procedimiento:** cálculo o aplicación directa de un método (sí se incluyen, pero no pueden ser el único tipo ni la mayoría aplastante).
- **Analíticos / de razonamiento:** interpretar, justificar, demostrar, comparar métodos, encontrar el error en un procedimiento, decidir cuándo aplica un teorema, analizar casos límite.
- **Ejecución en Python:** resolver, verificar o explorar el problema escribiendo/ejecutando un script en Python (p. ej. `numpy`/`sympy`/`pandas`/`scipy`); el enunciado dice qué programar, qué ejecutar y cómo interpretar la salida. Usa exclusivamente Python para estos.
- **Consulta / investigación:** buscar y contrastar una fuente, indagar una aplicación real, definir un término con referencia, o investigar un caso/dato del dominio (con producto entregable claro).
- **Aplicación contextual / transferencia:** modelar una situación real de la disciplina o del programa académico.

Por ejemplo, en matemáticas o estadística no entregues cinco ejercicios idénticos de "calcule X"; incluye uno o dos mecánicos, uno analítico (interpretar/justificar/hallar el error), uno de ejecución en Python y uno de consulta/investigación o aplicación real. Innova en el enunciado: evita la plantilla repetitiva.

Include detailed solutions in the PDF when the user asks for teacher-ready or self-study material. For student-only guides, include answers only when pedagogically appropriate.

For SCORM guided practice, do not present only an exercise statement. Include steps, hints, decision points, expected observations, and a closing check. For PDF exercises, group them by difficulty, type, or RA and include instructions, assumptions, data, expected deliverable, and rubric/checklist when relevant. Make explicit the type of each exercise (mecánico, analítico, ejecución en Python, consulta/investigación, aplicación) so the bank is visibly varied.

## Visual And Technical Rules

- All mathematical expressions must be LaTeX.
- Before finalizing JSON, run the mathematical-expression validation pass in `math-latex-validation.md` for every `latex`, `formula`, `variables[].symbol`, step formula, slide formula, exercise formula, and inline expression intended to render as notation.
- Mathematical expressions in SCORM must be prepared instructionally: introduce the problem the expression solves, explain each symbol, state how to read the expression, and connect it with an activity, image, code fragment, or decision.
- All quantitative charts must be Chart.js data with `chartType`, `labels`, `datasets`, and optional `options`.
- Do not use screenshots or images for charts.
- For PDF charts, always include `note`, `caption`, or `description`; the note should tell the reader what to observe and why it matters.
- For conceptual diagrams, prefer supported non-image components such as tables, timelines, steppers, lists, summaries, or callouts when they communicate the idea clearly. Use `image` or `figure` when the learning value depends on visual perception, for example matrices de píxeles, ruido, bordes, mapas de características, geometría de cámara, segmentación o flujos de visión artificial.
- In SCORM, place conceptual explanation before complementary visual material. A visual resource can illustrate, compare, or deepen a concept, but it must not replace the first explanation of that concept.
- If an image asset is not available during JSON generation, do not invent a file path. Leave `src` empty and include `prompt`, `alt`, and `caption` so the author can generate or load the image manually in the editor.
- Image prompts should be production-ready: specify language, labels, objects, layout, visual style, learning purpose, and any required annotations. Do not ask for vague "nice illustrations".
- Do not fake a Chart.js chart for a non-quantitative diagram.
- Code snippets must use the `code` component with `language`, `languageLabel`, `fileName`, and `code`.
- Code snippets and pseudocode must include instructions and expected interpretation when they are part of SCORM learning, not just pasted code. The instructions must say where to execute or trace them, how to create/open the file, commands or tool steps, sample input, expected output, and what errors or surprises mean.
- References must use APA 7 when generating academic content.
- Run content uniqueness validation before finalizing. If Node.js is available, run `node aprendizaje-basado-retos-scorm/scripts/validate_content_package.js <generated-json-files>` and revise until repeated learner-facing content is eliminated.

## Editorial Tone

Write in an academic, clear, close, and orienting voice. Maintain teacher presence: anticipate doubts, explain decisions, guide practice, and connect every activity to learning value.

Before finalizing Spanish JSON, run an editorial pass for accents, opening punctuation marks (`¿`, `¡`), malformed characters, agreement, capitalization, and abrupt topic transitions. Do not leave mojibake or placeholder text in production JSON.
