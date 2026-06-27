# Expert Component Selection

Use this reference before generating any SCORM/PDF JSON content. The goal is to select HTML components because they teach the discipline better, not because the template has many available components.

## Expert Role

Before writing JSON, assume a combined expert role:

- Disciplinary expert for the asignatura.
- Senior instructional designer for virtual learning.
- Educational multimedia/UX specialist.
- Assessment designer aligned to RA.

This role must decide which components best represent each concept, method, practice, evidence, and evaluation need.

## Internal Component Blueprint

Before generating a JSON file, create an internal component blueprint for every thematic section (`seccion-1` through `seccion-5`). Do not include the blueprint in the JSON unless the app later supports it.

Use this decision matrix mentally or in draft:

| Field | Decision |
|---|---|
| Section concept | What must the student understand or do? |
| RA supported | Which learning outcome is evidenced? |
| Knowledge type | Conceptual, procedural, mathematical, visual-spatial, computational, communicative, normative, analytical, evaluative. |
| Best component family | Theory, visual, formula, code, chart, table, stepper, interaction, reflection, evaluation. |
| Selected component | Exact supported component type. |
| Why this component | What it teaches that plain text cannot. |
| Rejected alternatives | Components that would be decorative, weak, or misleading. |
| Evidence | What the learner can observe, run, calculate, compare, or submit. |

Generate the section only after the component choices make disciplinary sense.

## Selection Rules

- Treat the supported component list as a menu, not a checklist.
- Do not force charts, formulas, code, images, accordions, or interactions into every section.
- Select components from the concept outward: first identify the disciplinary representation, then choose the HTML component.
- Every non-theory component must add one of these values: visualize an invisible structure, execute a procedure, compare alternatives, expose an error pattern, support a decision, validate understanding, or produce evidence.
- If a component does not improve understanding, practice, evidence, or assessment, remove it.
- Prefer fewer high-value components over many generic components.
- Do not use a generic chart with invented labels such as "Caso base" or "Variación" unless those values come from a meaningful disciplinary comparison.
- Do not use formulas as decoration. A formula is justified only when it is central to the concept, used in an example, connected to a visual/code/practice component, and explained in context.
- Do not use images as decoration. Use `image`/`figure` when spatial, visual, process, artifact, matrix, diagram, scene, or comparison understanding matters.
- Do not use code only because the asignatura is technical. Use `code` when executing, tracing, modifying, or debugging the snippet advances the RA.
- Do not use accordions/tabs as the main explanation. Use them to compare, organize, or correct misconceptions after theory is established.
- Although components are a menu, three of them are obligatory in every thematic SCORM section regardless of discipline: `carousel`, `flashcards`, and `accordion`. Choose strong, section-specific content for each so they reinforce (never replace) the theory. The accordion in particular must be relatively extensive: each item holds two to three paragraphs that complement the theoretical content already shown.

## Component Fit By Knowledge Type

| Knowledge type | Strong components | Avoid when |
|---|---|---|
| Conceptual foundation | `theory-block`, `concept-block`, `summary`, `callout`, `accordion` | Avoid replacing theory with shallow accordions or isolated images. |
| Visual-spatial representation | `image`, `figure`, `visual-prompt`, `carousel`, `table` | Avoid Chart.js if the data is not quantitative. |
| Mathematical reasoning | `formula`, `stepper`, `example`, `chart`, `exercise-set` | Avoid formulas without context, variables, example, or decision value. |
| Computational procedure | `code`, `stepper`, `table`, `image`, `quiz` | Avoid code without execution instructions, expected output, or interpretation. |
| Quantitative comparison | `chart`, `table`, `metrics` | Avoid charts with invented or irrelevant data. |
| Process/workflow | `stepper`, `timeline`, `image`, `table`, `callout` | Avoid static paragraphs when ordered action is the learning target. |
| Terminology and relationships | `matching`, `flashcards`, `table`, `accordion` | Avoid if terms are not central or already obvious. |
| Decision and misconception checks | `quiz`, `multi-select`, `reflection`, `callout` | Avoid questions that test trivia instead of concept use. |
| Language/listening practice | `listening-true-false`, `matching`, `fill-blank`, `flashcards` | Avoid in non-language courses unless the RA explicitly needs language practice. |

## Discipline Defaults

These are starting points only. Override them when the section concept demands it.

### Mathematics

Prefer `theory-block`, `formula`, `stepper`, `example`, `chart`, `table`, `exercise-set`.

Use charts for graphs of functions, geometric interpretation, convergence, error behavior, or comparison of solution methods. Use formulas only when they are explained and used. Use steppers for derivations and worked exercises.

**Mandatory for mathematics sections:** every thematic SCORM section (`seccion-1` through `seccion-5`) must contain **between two and four worked exercises/examples ("ejercicios/ejemplos resueltos") presented with the `stepper` component**. Each stepper shows the full resolution as ordered steps with intermediate reasoning, LaTeX in `statement` and `steps[].formula`, and a closing `final: true` verification/result step. These solved-exercise steppers are required even when the section also uses standalone `formula` or `chart` components, and they coexist with the section's mandatory `carousel`, `flashcards`, and `accordion`. Mirror the resolved exercises in the PDF branch with `stepper`, `example`, or `exercise-set`.

### Programming, Algoritmia, And Software

Prefer `theory-block`, `code`, `stepper`, `table`, `image`/flow diagram, `quiz`, `exercise-set`.

Use code when the learner must run, trace, test, debug, or modify. Use diagrams for memory, control flow, data structures, architecture, and pipelines. Use charts only for measured complexity, runtime, memory, or error comparisons.

### Vision Artificial, Data, And Computing Visual Systems

Prefer `theory-block`, `image`, `figure`, `visual-prompt`, `code`, `table`, `stepper`, `formula`, `chart`, `quiz`.

Use images/figures for pixel matrices, color channels, kernels, convolution windows, masks, contours, bounding boxes, camera pipelines, embedded architecture, and before/after visual comparisons. Use formulas for central operators such as convolution, gradient, thresholding, normalization, IoU, precision/recall, loss, latency, or memory footprint, only in sections where that operator is being taught. Use charts for histograms, distributions, confusion matrices, precision/recall tradeoffs, latency budgets, FPS comparisons, error by class, or measured performance. Do not use generic line charts for topics such as Python environment setup; use a workflow diagram, dependency table, code setup block, or checklist instead.

Examples:

- For "imagen digital y píxeles", choose `image` with matrix representation, `table` for channels/types, `code` for NumPy array inspection, and optionally `formula` for tensor shape. Do not use a generic performance chart.
- For "entorno Python", choose `code`, `stepper`, `table`, and workflow `image`. Use a latency formula only in a section about real-time execution.
- For "matriz de confusión", choose `chart` or `table` because quantitative error structure is the object of study.
- For "convolución", choose `image` showing window/kernel/output pixel, `formula`, `stepper`, and `code`.

### Engineering And Physical Systems

Prefer `theory-block`, `image`/system diagram, `formula`, `chart`, `table`, `stepper`, `case`, `evaluation-activity`.

Use charts for measured response, constraints, uncertainty, trend, residuals, or tradeoffs. Use diagrams for systems, flows, assemblies, experiments, and architecture.

### Languages

Prefer `theory-block`, `listening-true-false`, `matching`, `fill-blank`, `flashcards`, `tabs`, `reflection`, `quiz`.

Use audio/listening only with purpose, transcript or listening focus, and feedback. Use matching for word-meaning or function-form relations. Use fill-blank for grammar, vocabulary, and sentence completion.

### Law And Social Sciences

Prefer `theory-block`, `timeline`, `table`, `accordion`, `case`, `reflection`, `quiz`, `exercise-set`.

Use charts only when comparing quantitative evidence. Use timelines, actor maps, argument maps, norm/process flows, and case tables when they better represent the concept.

## Chart Gate

Before selecting `chart`, answer yes to at least one:

- Is there real or plausible quantitative data that teaches the concept?
- Does the chart reveal a trend, distribution, correlation, uncertainty, error pattern, confusion matrix, performance curve, latency budget, or comparison needed for a decision?
- Will the learner read the chart to make a disciplinary conclusion?

If not, use `image`, `table`, `stepper`, `callout`, `summary`, or `code` instead.

When a chart passes the gate, it must carry two distinct text fields, both required in SCORM and PDF:

- `description` (hilo conductor): connects the chart to the theory shown earlier in the same section and explains why this chart appears now. Renders above the chart.
- `note` (lectura del gráfico): describes and interprets the graphic itself — axes, series, the trend/pattern/comparison, and the conclusion the learner should reach. Renders below the chart.

Do not swap these roles and do not omit either one. The thread connects to prior theory; the note describes the graphic.

## Formula Gate

Before selecting `formula`, answer yes to all:

- Is the expression central to the section concept?
- Is it introduced by prior theory?
- Are variables defined?
- Is there an explanation of how to read it?
- Is it used in an example, practice, visual, code, chart, or decision?

If not, remove the formula or move it to a section where it is central.

## Image/Figure Gate

Before selecting `image` or `figure`, answer yes to at least one:

- Does the concept require spatial, visual, process, artifact, matrix, scene, or architecture understanding?
- Would a learner understand the concept faster by seeing structure rather than reading more text?
- Can the image prompt be specific enough for manual generation or upload?

If yes, provide `assetId`, empty `src`, precise `prompt`, `alt`, and `caption`. Reuse the same `assetId` in SCORM and PDF when the same asset should synchronize.

## Code Gate

Before selecting `code`, answer yes to at least one:

- Does running or tracing the snippet evidence RA?
- Does the code expose a data structure, transformation, algorithm, metric, or failure mode?
- Can the learner modify a parameter and interpret the effect?

If yes, include language, language label, file name, instructions, exact terminal commands when applicable, sample input or no-input note, expected output, and failure interpretation.

## Final Component Audit

Before writing files, audit each `seccion-1` through `seccion-5`:

- It has three theory/concept blocks, and each is immediately followed by a cluster of two or three complementary components.
- It includes at least one `carousel`, at least one `flashcards`, and at least one `accordion`, distributed across its three component clusters.
- Every `accordion` item is relatively extensive (two to three complementary paragraphs that extend the theory), never one-line labels, and the accordion is not used as the primary theoretical explanation.
- If the asignatura is mathematics (or the section RA is procedural-mathematical), it includes between two and four worked exercises/examples rendered with `stepper`.
- It is conceptually and textually unique within the full four-file package; no paragraph, bullet, prompt, example, feedback, visual prompt, practice step, or code scaffold is reused as a shell.
- Each theory block prepares the components that follow.
- Every formula passes the Formula Gate.
- Every formula also passes `math-latex-validation.md`: raw LaTeX only, JSON-escaped backslashes, no `$...$` delimiters, balanced syntax, and KaTeX-compatible commands.
- Every chart passes the Chart Gate and carries both a `description` (hilo conductor to prior theory) and a `note` (descriptive reading of the graphic).
- Every image/figure passes the Image/Figure Gate.
- Every code block passes the Code Gate.
- Interactive activities test meaningful decisions or misconceptions.
- PDF uses printable equivalents and excludes interactive components.
- Components vary by discipline and section purpose; they are not cloned across all sections.
