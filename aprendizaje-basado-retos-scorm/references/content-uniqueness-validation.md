# Content Uniqueness Validation

Use this reference before writing or finalizing any package of four JSON files. Passing the structural contract is not enough: every scenario/content and every thematic section must be academically unique, clearly aligned with learning outcomes, and free of repeated boilerplate.

## Diversity Blueprint

Before drafting text, create an internal 4 x 5 blueprint for the package. Do not include it in the JSON unless the app later supports it.

For each `contenido-01` through `contenido-04`, and each `seccion-1` through `seccion-5`, define:

- Content number and content title.
- Section id and section title.
- RA alignment: which RA is evidenced and how the section evidences it.
- Unique disciplinary concept, not a generic label.
- Unique learner action: trace, design, compare, debug, implement, calculate, evaluate, justify, document, or transfer.
- Unique example or case with concrete data, context, or constraint.
- Unique visual artifact: flowchart, memory diagram, matrix, table, timeline, decision map, chart, architecture, or other discipline-fit representation.
- Unique code/pseudocode fragment when code is used.
- Unique misconception or error pattern.
- Unique guided practice and evidence.

Generate the JSON only after the blueprint shows 35 distinct thematic sections. If two rows could swap titles and still make sense, they are too generic.

The introductory section of each content must also be content-specific. It may share fixed methodology labels, but its purpose, route, presaberes, examples, and evidence must refer to that content's actual scope.

## Non-Repetition Rules

The following are production errors:

- Reusing the same explanatory paragraph across sections or contents with only the section name changed.
- Reusing the same `keyIdeas`, bullets, table rows, exercise prompts, expected answers, quiz feedback, closing prompts, examples, or practice steps across thematic sections.
- Reusing generic sentences such as "esta sección desarrolla...", "la teoría se estudia...", "en trabajo autónomo...", "la solución aceptable...", or equivalent filler in multiple sections.
- Reusing a code/pseudocode scaffold when the concept requires a different operation, data structure, memory behavior, or control flow.
- Reusing image prompts with only the concept name substituted.
- Reusing the same PDF section structure and paragraph pattern for all five sections of a content.

Allowed repetition is limited to stable metadata, labels, institutional name, methodology name, RA wording, rubric level names, APA references, file naming conventions, and required interface labels. These may repeat, but they must not become the body of the learning content.

## RA Alignment Rules

Declaring `learningOutcomeIds` is not enough.

Each section and major component must show its RA alignment through the task itself:

- For RA1, include evidence of control structures, algorithm design, traces, pseudocode, modularity, testing, or structured programming decisions.
- For RA2, include evidence of memory allocation, pointer reasoning, data lifetime, dynamic structures, resource release, memory-risk analysis, or comparison of space usage.
- If a section supports both RA1 and RA2, show the bridge explicitly, for example how a control decision interacts with memory ownership or data structure behavior.

Do not use the same generic RA sentence across sections. Explain the specific evidence in that section.

## PDF Uniqueness Rules

Each PDF section must read as a specific study-guide chapter, not as a repeated shell.

For every `pdf-seccion-1` through `pdf-seccion-5`:

- Write a unique theoretical explanation focused on the section's concept.
- Include a section-specific example with concrete values, data, constraints, or scenario.
- Include exercises whose prompts and expected answers are specific to the concept.
- Use visual prompts that describe the actual artifact needed for that concept.
- Do not include irrelevant memory language in RA1-only sections or generic code-review language in non-code concepts.

## SCORM Uniqueness Rules

For every `seccion-1` through `seccion-5`:

- The three required theory blocks must develop different sub-concepts of that section, not repeat a generic introduction, generic representation, and generic quality paragraph across all sections.
- Complementary components must be section-specific. A table about decisions, a stepper about practice, or a quiz about evidence must use the section's actual concept and misconception.
- Feedback must explain the misconception being tested in that section.

## Automated Similarity Gate

Before finalizing generated files, run the package validator when a local Node.js runtime is available:

```bash
node aprendizaje-basado-retos-scorm/scripts/validate_content_package.js <slug-asignatura>-contenido-01.json <slug-asignatura>-contenido-02.json <slug-asignatura>-contenido-03.json <slug-asignatura>-contenido-04.json
```

Treat any duplicate-content finding as blocking. Revise the content, examples, exercises, prompts, feedback, and code until the validator passes.

If the validator is unavailable, perform the same audit manually:

1. Extract all long learner-facing strings from `scorm.sections` and `pdf.sections`.
2. Ignore metadata, references, rubric level names, and fixed UI labels.
3. Search for repeated strings longer than 70 characters.
4. Search for repeated 12-word sequences across different thematic sections.
5. Rewrite duplicated sections with concept-specific explanations, data, cases, exercises, and feedback.

## Repair Strategy

When repeated content is detected:

- Do not simply replace synonyms.
- Rebuild the section from the disciplinary concept.
- Change the example data, scenario, operation, control flow, memory model, or evidence.
- Rewrite exercises so the expected answer cannot be copied from another section.
- Rewrite code or pseudocode to demonstrate the specific concept.
- Rewrite feedback so it names the exact misconception or decision in that section.
