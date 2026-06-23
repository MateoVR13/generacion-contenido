---
name: ova-json-content
description: Generate validated `subject`-based JSON packages for virtual asignatura SCORM/PDF exports. Use when Codex must create, revise, expand, or validate the seven reusable content JSON files required for a 100% virtual asignatura, especially from an attached syllabus PDF or mandatory content requirements, including per-PDF minimum page length, fixed Aprendizaje Guiado methodology, six-section content structure, expert discipline-based HTML component selection, unique non-repetitive content across the 7x5 thematic matrix, theory-first SCORM sequencing with at least three theory blocks per thematic section, instructional component depth, qualitative evaluation, validated LaTeX math, Chart.js chart data, visual prompts/images, code and pseudocode execution instructions, PDF metadata, references, and downloadable material.
---

# SCORM/PDF JSON Content

## Core Workflow

1. Convert the user request and any provided syllabus into a package of **seven** reusable `subject` JSON files for SCORM/PDF.
2. Ask for missing essentials only when they block generation: asignatura name, target level, language, syllabus source, and **minimum pages per PDF**. The page extension always applies to each of the seven PDFs, not to the total package.
3. Before producing a complete JSON artifact, read:
   - `references/json-contract.md`
   - `references/instructional-content-requirements.md`
   - `references/component-selection.md`
   - `references/math-latex-validation.md`
   - `references/content-uniqueness-validation.md`
4. For complete asignatura generation, also read the bundled mandatory references:
   - `references/syllabus_ejemplo_estructura.md`
   - `references/lineamientos_virtualidad.md`
   - `references/evaluacion_cualitativa_pregrado.md`
   - `references/estrategias_didacticas_comunicativas.md`
   - `references/identidad_marca.md`
   - `references/meta_prompt_maestro_cursos_virtuales.md`
5. Use only the files inside this `ova-json-content/` folder as the skill's reusable reference base; do not depend on `../requisitos-contenido/` or external attachments unless the user provides new source material in the current task.
6. If a syllabus PDF is attached, extract it first and store the academic mapping in `subject.syllabus`. Mark missing fields in `subject.syllabus.missingFields`; do not invent institutional metadata, credits, percentages, dates, codes, or references.
7. Generate JSON only, unless the user asks for explanation.
8. For new asignatura generation, write exactly seven artifacts in the current project root using this naming pattern: `<slug-asignatura>-contenido-01.json` through `<slug-asignatura>-contenido-07.json`. Do not create, overwrite, or replace `content.json` for generated asignatura content.
9. Do not automatically load or apply the generated JSON files in the app. Do not call browser/app loader functions. The author will load each JSON manually with the UI or with `?content=<slug-asignatura>-contenido-01.json` when they decide to review it.
10. Keep the JSON compatible with the SCORM/PDF app:
   - Root key is `subject`, not `course`.
   - SCORM content lives in `scorm.sectionOrder` and `scorm.sections`.
   - PDF metadata and printable content live in `pdf`, `pdf.sectionOrder`, and `pdf.sections`.
   - `sectionOrder` and each `componentOrder` must match real object keys in their own branch.
   - Every component needs a stable id and a `type`.
11. Use only **AG - Aprendizaje Guiado** as methodology for generated virtual asignaturas. Do not use project, challenge, research, case, or any non-AG active methodology unless the app and institutional rules are explicitly changed later.
12. Each of the seven JSON files must contain exactly six SCORM sections and exactly six PDF sections: one introductory section plus five content sections.
13. Before generating text, create an internal 7 x 5 diversity blueprint for the full package using `references/content-uniqueness-validation.md`. Each content and each thematic section must have a distinct concept, RA evidence, example/case, visual artifact, code or trace task, misconception, practice, and feedback. Do not include the blueprint in JSON unless the app later supports it.
14. Before generating each JSON file, perform an internal expert component-selection pass for every thematic section. Choose components from the supported template list according to discipline, RA, concept type, evidence needed, and branch (SCORM/PDF). Do not include weak charts, formulas, images, code blocks, or interactions just to fill a pattern.
15. Make the requested minimum extension explicit through `pdf.sections` in every JSON file; do not rely on SCORM interactive activities to create PDF pages.
16. Draft each thematic SCORM section (`seccion-1` through `seccion-5`) as a coherent learning sequence with **at least three substantial theory blocks**. Use repeated cycles of theory first, then two or three expert-selected complementary components, then another theory block, until the section has enough conceptual development, examples/visualizations, guided practice, formative validation, and closure/transfer.
17. Run a dedicated mathematical-expression validation pass before writing files or returning JSON. Collect every `latex`, `formula`, `variables[].symbol`, step formula, slide formula, exercise formula, and math-like expression embedded in text; validate it with `references/math-latex-validation.md`; fix malformed LaTeX instead of leaving uncertain notation.
18. Run a dedicated content-uniqueness validation pass before finalizing. If Node.js is available, run `node ova-json-content/scripts/validate_content_package.js <generated-json-files>`. Treat repeated learner-facing paragraphs, bullets, examples, exercises, feedback, code scaffolds, or visual prompts as blocking defects and rewrite them conceptually.
19. Run a final content-quality pass before returning JSON: verify sequence, density, orthography, visual usefulness, formula context, mathematical rendering, code/pseudocode execution instructions, feedback, PDF/SCORM separation, component-selection rationale, RA alignment, and content uniqueness.
20. Do not invent unsupported rendering patterns. Use only supported component types unless the user also asks to extend the app.

## Non-Negotiable Content Rules

- Use syllabus learning outcomes as the backbone for sections, activities, exercises, and evaluation.
- Every major component should declare or clearly evidence the RA/learning outcome it supports.
- Design SCORM as an active Moodle learning experience, not as a file repository.
- Treat every asignatura as 100% virtual and generated as seven content JSON files. Do not generate a single all-course JSON for a new asignatura.
- Every generated JSON must represent one content number (`subject.contentNumber`: `01` to `07`) and should include `subject.contentTotal: "07"`.
- Every generated JSON must have these six internal sections in both `scorm.sectionOrder` and `pdf.sectionOrder`: introductory section, section 1, section 2, section 3, section 4, section 5. Use stable ids such as `intro`, `seccion-1`, `seccion-2`, `seccion-3`, `seccion-4`, `seccion-5` and PDF ids such as `pdf-intro`, `pdf-seccion-1`, ..., `pdf-seccion-5`.
- Across the full package, the 35 thematic sections (`7 contenidos x 5 secciones`) must be conceptually and textually unique. Do not reuse paragraph shells, bullets, table rows, exercise prompts, expected answers, examples, code/pseudocode scaffolds, feedback, image prompts, or closing prompts with only the topic name changed.
- Repetition is allowed only for stable metadata, institutional labels, methodology names, RA wording, rubric level names, file naming conventions, references, and required UI labels. Learner-facing theory, PDF study-guide text, practice, feedback, examples, and visual prompts must be section-specific.
- Declaring `learningOutcomeIds` is not sufficient RA alignment. Each section and major component must show how its specific task, example, code, visual, practice, or evaluation evidences the RA.
- In every generated JSON, each thematic SCORM section (`seccion-1` through `seccion-5`) must contain **at least three** `theory-block` or `concept-block` components. Do not count `intro` toward this requirement. If the user explicitly requests a single-unit JSON instead of seven files, apply the same rule to that unit's five thematic SCORM sections.
- Structure each thematic SCORM section as repeated instructional cycles: `theory-block`/`concept-block` -> two or three complementary components -> `theory-block`/`concept-block` -> two or three complementary components -> `theory-block`/`concept-block` -> practice/validation/closure. Complementary components may include image/figure, formula, chart, table, code, accordion, tabs, flashcards, carousel, stepper, quiz, matching, multi-select, fill-blank, callout, summary, or reflection, but only when they add learning value and are preceded by the theory that contextualizes them.
- Before selecting complementary components, apply the expert role in `references/component-selection.md`. Select components because they are the strongest disciplinary representation for the concept, not because the template supports them.
- Treat the component list as a menu, not a quota. For example, mathematics usually benefits from formulas, graphs and steppers; algoritmia usually benefits from code, tracing, flow/memory diagrams and steppers; visión artificial usually benefits from images/figures of matrices, channels, kernels, masks, contours, code, tables, and only meaningful charts such as histograms, confusion matrices, error distributions, latency budgets or measured performance curves.
- Charts must pass the Chart Gate in `component-selection.md`; do not use generic charts with invented labels or vague "quality/cost" series when a diagram, table, matrix image, code block, or stepper would teach better.
- Formulas must pass the Formula Gate in `component-selection.md`; do not include expressions unless they are central to the section, explained, used, and connected to an example, visual, code, chart, practice, or decision.
- Images/figures and code must pass their gates in `component-selection.md`; use visual prompts for spatial/visual/process concepts and code only when execution, tracing, modification, or debugging supports the RA.
- Use `subject.methodology.code: "AG"`, `subject.methodology.name: "Aprendizaje Guiado"`, and `subject.methodology.moments: ["Fase 1", "Fase 2", "Fase 3", "Fase 4"]` in every JSON.
- Never write learner-facing text that labels the content as an object/virtual-learning-object acronym. Use "este contenido", "la asignatura", "esta ruta de aprendizaje", "este recurso SCORM", "la guía" or the specific theme name, depending on context.
- For methodology planning tables, routes, and `subject.methodology.moments`, use **Fase** as the label. Write `Fase 1`, `Fase 2`, `Fase 3`, `Fase 4`; do not write `Etapa` or `Tema o etapa`.
- The asignatura presentation must introduce the discipline, purpose, scope, methodology, expected student work, and professional/academic value. Do not use the opening to list isolated technical topics or project slogans.
- Do not begin a SCORM topic with a highly technical diagnostic question, media resource, formula, code block, chart, or isolated activity. Diagnostic questions should check broad prior knowledge after the asignatura has been contextualized.
- For complete academic content, include purpose, student action, estimated time, evidence/reflection, and feedback/evaluation route when applicable.
- Keep evaluation qualitative, formative, continuous, collaborative, and centered on RA. Do not reduce evaluation to numeric grades or accumulated percentages.
- If percentages appear in the syllabus or prompt, keep them as transparent activity/deliverable weights tied to criteria, evidence, rubrics, and feedback.
- Put every mathematical expression in LaTeX fields: `latex`, `formula`, `variables[].symbol`, or formula-capable components.
- Do not wrap JSON math fields with `$...$`, `$$...$$`, `\(...\)`, or `\[...\]`. The renderer supplies the math container; fields should contain the raw LaTeX expression only.
- Escape LaTeX backslashes correctly inside JSON strings. JSON content must contain `\\frac`, `\\sum`, `\\sqrt`, `\\hat`, `\\begin{bmatrix}`, etc., not single-backslash sequences that JSON can corrupt.
- Validate every expression against KaTeX-compatible syntax: balanced braces, paired `\\left`/`\\right`, correct fraction/sum/integral/subscript/superscript structure, and no unsupported or decorative commands.
- Use `\\text{...}` for words, units, or labels inside formulas. Do not leave Spanish or English prose directly inside mathematical mode.
- Put every chart as Chart.js-compatible data: `chartType`, `labels`, `datasets`, and optional `options`.
- Do not describe charts as images.
- Use charts only when they add analytical value: comparison, trend, distribution, correlation, composition, uncertainty, performance, confusion/error patterns, or decision evidence. Do not add generic bar charts as visual filler.
- For PDF charts, include a descriptive `note`, `caption`, or `description`; it prints centered below the chart.
- Do not put math as plain prose when it should render as notation.
- Do not place formulas as isolated decoration. Every formula component should include `context` and `explanation`, or appear inside a `theory-block` section that explains why the expression matters and how to read it.
- Use `code` components for code snippets and set `language`, `languageLabel`, `fileName`, and `code`.
- Code components in SCORM should include `instructions` and, when useful, `expectedOutput` so the learner knows what to do before and after reading or running the snippet.
- Code and pseudocode components must tell the learner where and how to execute or trace the fragment. In `instructions`, include the intended environment/tool, how to create or open the file, exact terminal commands when applicable, sample input, what to inspect or modify, expected output, and how to interpret failures or surprising results. For pseudocode, specify whether to trace it manually in a table or run it in a tool such as PSeInt, and describe the steps.
- Use `theory-block`/`concept-block` components for substantial SCORM explanation before formulas, code, charts, visual prompts, or checks. Avoid using accordions as the only theoretical development when the concept needs sustained explanation.
- For complex concepts, a SCORM `theory-block` should usually include at least 3 developed body paragraphs, 3-5 key ideas, 1-3 internal subsections, an example, and a closing/transfer prompt. Short one-paragraph theory is acceptable only for minor transitions.
- Distribute the three required theory blocks across the section's conceptual progression. Do not satisfy the rule by stacking three theory blocks at the beginning and then placing all complementary components afterward; each block should prepare the next cluster of examples, media, formulas, code, practice, or validation.
- Accordions, tabs, flashcards, carousels, and summaries are support components. They may organize, compare, or reinforce ideas, but they must not replace the main theoretical explanation. Their items should contain meaningful explanations, not one-line labels.
- In SCORM, every complementary media component (`image`, `figure`, `visual-prompt`, `video`, `podcast`, `audio`, `listening`, or `listening-true-false`) must be preceded in the same section by a substantial `theory-block` or `concept-block`. Media should reinforce an explained concept; it must not be the learner's first theoretical encounter with the topic.
- Use `image`/`figure` components for conceptual visual resources that are not quantitative charts and are pedagogically necessary for the discipline: diagrams, maps, processes, artifacts, matrices, experimental setups, legal timelines, grammar situations, case maps, conceptual frameworks, workflows, or visual comparisons. If the image is not available yet, leave `src` empty and provide a precise `prompt`, `alt`, and `caption` so the author can generate or load the image manually in the editor.
- When the same image should be used by SCORM and PDF, give both image components the same `assetId`. The app's image upload control synchronizes `src` across matching `assetId` values.
- Every guided practice must include actual steps. Use `stepper` when the learner should follow a process; include a statement, ordered steps, intermediate reasoning, and a final verification or reflection.
- Every formative activity (`quiz`, `listening-true-false`, `matching`, `multi-select`, `fill-blank`) should include clear correct and incorrect feedback. Correct feedback should reinforce why the answer works; incorrect feedback should point to the concept to review without merely saying "incorrecto".
- For SCORM English/asignatura language activities, prefer:
  - `listening-true-false`
  - `matching`
  - `multi-select`
  - `fill-blank`
  - `quiz`
  - `flashcards`
- For PDF, do not use interactive components such as listening, video, podcast, quiz, matching, multi-select, fill-blank, tabs, carousel, or flashcards.
- For PDF, use printable/editorial components: `text`, `theory-block`, `list`, `formula`, `table`, `chart`, `image`, `figure`, `code`, `callout`, `example`, `exercise-set`, `evaluation-activity`, `references`.
- PDF content must be a printable study guide, not a dump of SCORM components. Include theory, worked examples, meaningful charts, useful tables, relevant conceptual images, code when printable, exercises, evaluation instruments, and references.
- PDF sections must be written as distinct study-guide chapters. Do not start every PDF section with the same explanation pattern or reuse generic sentences such as "esta sección impresa desarrolla...", "la teoría se estudia...", "en trabajo autónomo..." or equivalent filler.
- Place PDF exercises at the end of `pdf.sectionOrder`, before references when references are present.
- Use APA 7 references for academic content.
- Before finalizing Spanish content, check accents, opening punctuation (`¿`, `¡`), agreement, capitalization, and mojibake/corrupt characters. Do not leave malformed text such as `Presentaci?n`, `te?rico`, or missing opening question marks.

## Quality Checklist

Before finalizing JSON:

- Check that mandatory project requirements and syllabus inputs were used or explicitly marked as unavailable.
- Check `subject.syllabus` exists when a syllabus PDF was provided.
- Check missing syllabus fields are listed instead of invented.
- Check new asignatura generation produced exactly seven files named `<slug-asignatura>-contenido-01.json` through `<slug-asignatura>-contenido-07.json`, not `content.json`.
- Check every generated file has `subject.contentNumber`, `subject.contentTotal: "07"`, and consistent title/metadata for that content.
- Check every generated file has exactly six SCORM sections and exactly six PDF sections: intro plus five content sections.
- Check the 7 x 5 diversity blueprint was applied: every thematic section has a distinct disciplinary concept, RA evidence, example/case, visual artifact, code or trace task, misconception, practice, and feedback.
- Check no long learner-facing sentence or paragraph is repeated across thematic sections or contents, except stable metadata and fixed institutional labels.
- Check each thematic SCORM section (`seccion-1` through `seccion-5`) contains at least three `theory-block` or `concept-block` components, and that complementary components are grouped after the theory block that explains them.
- Check that an expert component-selection pass was applied: every chart, formula, image/figure, code block, interaction, table, stepper, accordion, or summary has a clear disciplinary reason and is not decorative filler.
- Check charts pass the Chart Gate, formulas pass the Formula Gate, images/figures pass the Image/Figure Gate, and code passes the Code Gate from `references/component-selection.md`.
- Check generated learner-facing content does not use object/virtual-learning-object labels or acronyms; it should speak directly as content, asignatura, SCORM resource, guide, or theme.
- Check methodology moments and tables use `Fase`, never `Etapa` or `Tema o etapa`.
- Check the only methodology is AG - Aprendizaje Guiado; do not use any other methodology name, code, moments, labels, or structure.
- Check learning outcomes are connected to sections, activities, exercises, and evaluation.
- Validate that `scorm.sectionOrder` references existing `scorm.sections` ids.
- Validate that `pdf.sectionOrder` references existing `pdf.sections` ids.
- Validate that each `componentOrder` references existing component ids in its own section.
- Check each component has `type` and `title`.
- Check PDF metadata and printable sections exist: `guideLabel`, `institution`, `title`, `subtitle`, `purpose`, `structure`, `year`, `pdf.sectionOrder`, and `pdf.sections`.
- Check references and material sections are present when the user requests a full SCORM/PDF package.
- Check SCORM may include interactive/video/audio activities, but PDF includes only theory, examples, printable exercises, references, LaTeX math, and Chart.js charts.
- Check SCORM component order: no image, video, audio, podcast, listening, or other media resource may appear before a substantial theory/context block in its section.
- Check evaluative activities declare RA, criterion, evidence, technique, instrument, weight if applicable, evaluation moment, participation type, feedback route, and qualitative level/rubric descriptors.
- Check language consistency: Spanish labels for Spanish content, English prompts for English activities when requested.
- Check that the presentation introduces the asignatura before entering technical content.
- Check every SCORM theme has a coherent path: context/theory first, then visual/formula/code/chart, then practice, then validation or reflection.
- Check theory components are not superficial: no concept should appear only as an image, formula, accordion label, or chart without prior explanation.
- Check guided practice components include real steps, not only an enunciado.
- Check code and pseudocode components include instructions, language, file name, where/how to execute or trace, copyable code, expected output, and interpretation.
- Check formulas include context, variables when relevant, and explanation that connects them to the concept or task.
- Run the LaTeX validation pass from `references/math-latex-validation.md` and check that every math field is raw KaTeX-compatible LaTeX, JSON-escaped correctly, delimiter-free, balanced, readable, and instructionally connected.
- Run the content uniqueness validation pass from `references/content-uniqueness-validation.md`; when possible execute `node ova-json-content/scripts/validate_content_package.js <generated-json-files>` and revise until it passes.
- Check charts are useful for the discipline and not decorative filler.
- Check shared images between SCORM and PDF use the same `assetId` and image prompts are actionable when `src` is empty.
- Check formative activities include meaningful feedback for correct and incorrect paths.
- Ensure no placeholder text remains unless the user explicitly asked for a blank template.

## Page Extension Heuristic

For minimum printed pages, apply the requested page count to each PDF inside each generated JSON:

- 1 page: cover-like summary or one compact section.
- 3-5 pages: 3-5 sections, each with intro plus 1-2 components.
- 6-10 pages: 5+ sections, examples, practice, evaluation, references.
- 10+ pages: include table of contents, scenario/presentation, prior knowledge, multiple themes, applied cases, practice bank, evaluation, frequent errors, transfer, synthesis, and references.

Use `pdf.sections` and enough paragraph/example/exercise content to support the requested printed length.

## Resources

- Read `references/json-contract.md` for supported keys, component fields, and examples.
- Read `references/instructional-content-requirements.md` for syllabus ingestion, mandatory instructional requirements, active methodology, virtuality, evaluation, PDF/SCORM separation, and academic quality rules.
- Read `references/component-selection.md` before generating content to choose the most appropriate HTML components for each discipline, content and section.
- Read `references/math-latex-validation.md` before writing any JSON that contains mathematical expressions.
- Read `references/content-uniqueness-validation.md` before generating or revising a full seven-file package, and before revising any PDF/SCORM content where repetition was detected.
- Read `references/syllabus_ejemplo_estructura.md` when extracting or validating syllabus fields.
- Read `references/lineamientos_virtualidad.md` when designing SCORM/Moodle learning flow.
- Read `references/evaluacion_cualitativa_pregrado.md` when generating activities, rubrics, evaluation moments, feedback, or percentages.
- Read `references/estrategias_didacticas_comunicativas.md` when planning methodology, moments, HTML components, activities, and course sequence.
- Read `references/identidad_marca.md` when setting institutional tone, logo usage, PDF/SCORM branding, colors, and editorial style.
- Read `references/meta_prompt_maestro_cursos_virtuales.md` when the user requests deep, extensive, premium, advanced, executive, or full-course content.
- Use `assets/logo-blanco.png` and `assets/logo-negro.png` as bundled brand assets when a generated artifact needs local logo references.
