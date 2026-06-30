# Pipeline 2 — Fases 5–10 (generación de contenido)

**Entrada obligatoria:** el `instrumento-validacion-docente` RESPONDIDO por el docente (más
`estado-proyecto.json`). Si no está respondido, no arrancar: el gate humano es obligatorio.

Primer paso del Pipeline 2: **ingerir las respuestas del docente** (del `.md`/`.json` respondido) y
actualizar `estado-proyecto.json`: caso y micro-casos / preguntas orientadoras validados, ajustes a
propósitos/preguntas por momento, actividades del estudiante aprobadas, recursos (incluidos los de
**simulación/laboratorio si la asignatura es práctica**), sugerencias y feedback. A partir de aquí todo se
genera con los valores VALIDADOS. Los **4 momentos son fijos**: el docente valida su contenido (caso,
micro-casos, propósito, preguntas, subtemas), no su número.

---

## Fase 5 — Diseño tecnopedagógico y disciplinar (Documento de Saberes)
- **Hacer:** producir el Documento de Saberes ABC (4 momentos fijos validados, extensión por créditos).
- **Salida OBLIGATORIA: los 4 archivos JSON finales** `<slug>-contenido-01.json … -04.json` (uno por momento,
  modelo ABC = 4 momentos = 4 archivos), conformes al contrato de la plantilla SCORM/PDF
  (`references/json-contract.md` de ESTA skill). El mapeo momento↔archivo es fijo: `01` = "Presentación y
  análisis del caso", `02` = "Análisis de pregunta orientadora o micro caso 1", `03` = "Análisis de pregunta
  orientadora o micro caso 2", `04` = "Conclusiones". Estos JSON son cargables directamente en la plantilla;
  **no basta con dejar un esquema en Markdown**. El esquema de contenido es solo un paso intermedio interno: la
  Fase 5 NO se considera cerrada hasta que existan los 4 JSON parseables y válidos.
- **La generación la hace ESTA misma skill** (`aprendizaje-basado-casos-scorm` es a la vez orquestador y motor
  de contenido — no delega a otra skill). Aplica el contrato y las reglas de componentes de SUS propias
  references: `references/json-contract.md`, `references/component-selection.md`,
  `references/instructional-content-requirements.md`, `references/content-uniqueness-validation.md`,
  `references/math-latex-validation.md` (3 bloques teóricos por sección, carrusel/flashcards/acordión, steppers
  en LaTeX, charts con description+note). Usa los parámetros validados (caso, micro-casos/preguntas
  orientadoras por momento, propósito por momento, RA, subtemas, extensión por créditos, decisiones del
  docente) y `unitLabel: "Momento"`, `contentTotal` = "04". Las reglas de generación de contenido viven en el
  `SKILL.md` de esta skill (Core Workflow + Non-Negotiable Content Rules).
- Cada concepto central: definición, contexto teórico, principios, relevancia, aplicación en el análisis del
  caso/micro-caso, ejemplos transversales (varias ingenierías/áreas), errores frecuentes, preguntas de
  reflexión, relación con evidencia, APA. Toda la matemática en LaTeX.
- **El branch PDF es el DOCUMENTO DE SABERES con narrativa, no un volcado de bullets** (ver `references/json-contract.md`
  → "Narrativa guiada"). Cada sección PDF: párrafo-puente de apertura que conecta con la anterior → teoría
  como prosa guiada con citas APA → figura/`image` con pie y lectura → ejemplo/`code` contextualizado →
  cierre/transición (`callout`). Voz docente, progresión clara, lectura agradable.
- **Ejercicios diferenciados por `kind`** en cada `exercise-set` (practico, codigo, consulta, investigacion,
  reflexion, analisis) — nunca un bloque uniforme de "Ejercicio 1, 2, 3". Cada `kind` usa sus campos
  (`code`+`language`+`expectedOutput` para codigo; `steps[]`+`deliverable` para consulta/investigacion).
- **Código en cada tema (asignaturas de programación/cuantitativas):** incluye al menos un ejemplo de código
  (componente `code`) contextualizado y un ejercicio `kind:codigo`; en temas conceptuales prioriza
  pseudocódigo/diagrama pero mantén un ejercicio aplicado.
- **Entregables (todos obligatorios):**
  - `documento-saberes/<slug>-contenido-01.json … -04.json` (los JSON de la plantilla SCORM/PDF).
  - `fase-5-documento-saberes.md` (mapa de coherencia, distribución de páginas, checklist de rigor).
  - (intermedio) `documento-saberes/esquema-contenido.md`.
- **Validar:** `node scripts/validate_content_package.js documento-saberes/<slug>-contenido-*.json`
  (unicidad) + parseabilidad + estructura. Corregir antes de cerrar.
- **Estado:** `documentoSaberes{archivos[], paginasPorMomento{}}`.

### Fase 5b — Evaluaciones APROBADAS (banco diagnóstico + talleres por escenario)
El banco diagnóstico y los talleres se **redactaron y propusieron en el Pipeline 1** (van en el instrumento).
El Pipeline 2 **NO los crea de cero**: toma los **aprobados/ajustados por el profesor** y los finaliza:
- **Banco diagnóstico (nivel asignatura):** parte de `evaluacion/diagnostica-<slug>.json` (propuesto en P1).
  Aplica los "Ajustar" del docente, **descarta los marcados "Quitar"**, agrega los que el profesor añadió.
  Son **preguntas de selección múltiple** (4 opciones) con **retroalimentación positiva** (refuerza por qué
  es correcta) y **negativa** (concepto a reforzar + referencia). El estudiante contesta 10 de las aprobadas.
  Marca `estado:"aprobado"`. **Regenera el GIFT** `evaluacion/diagnostica-<slug>.gift` desde el JSON ya
  aprobado (mismas reglas de la Fase 3: `::Qnn::`, `=`/`~`, `#` retro, `// prerrequisito`, LaTeX `\(...\)`,
  escape de `~=#{}:`) — es el artefacto que el docente **importa al banco de preguntas de Moodle** (Banco de
  preguntas → Importar → formato GIFT). Es nivel asignatura: se enlaza desde la página de bienvenida del JSON
  de Moodle (el `href` del quiz se rellena tras crear el cuestionario con las preguntas importadas).
- **Talleres por escenario:** cada momento lleva su taller (aprobado en P1) redactado completo dentro de su
  JSON (`quiz`/`evaluation-activity`/`exercise-set` con enunciado, evidencia, RA, criterio y
  retroalimentación). La **sumativa integradora** (todos los momentos/RA, última semana) en el último
  escenario (Conclusiones) o `evaluacion/sumativa-<slug>.json`.
- **Regla de gobernanza:** ni la diagnóstica ni los talleres se publican sin haber pasado por la revisión del
  profesor en el instrumento (igual que el material complementario).
- **Estado:** `evaluacion.diagnostica.estado: "aprobado"`, `evaluacion.diagnostica.archivo`, `evaluacion.diagnostica.archivoGift`,
  `evaluacion.talleresPorMomento[].estado: "aprobado"`.

## Fase 6 — Diseño gráfico y recursos e-learning → GENERA LOS PROMPTS
- **Hacer:** desarrollar los recursos didácticos (2/3/4 según créditos) y el material complementario (3/5/7).
- **MATERIAL COMPLEMENTARIO = SOLO EL APROBADO POR EL PROFESOR.** No se propone aquí de nuevo: se toma de
  `estado.materialComplementario` (propuesto en Fase 2 y revisado en el instrumento). Incluye los materiales
  con `estado` distinto de `"rechazado"` (regla: se incluye lo propuesto salvo lo que el profesor marcó
  "Quitar"); aplica los "Ajustar" del docente; agrega los materiales nuevos que el profesor añadió. **No
  inventes material nuevo ni incluyas material sin revisión docente.** Respeta la `coberturaPorMomento`.
- Por cada recurso didáctico: tipo, título, objetivo pedagógico, público, **copy/guion completo**, jerarquía,
  indicaciones visuales, texto alternativo (accesibilidad), brief de diseño, relación con evaluación.
- **GENERAR LOS PROMPTS de generación de contenido** por recurso/componente didáctico oficial — ver
  `fase-6-prompts.md`. Un prompt por recurso, listo para ejecutar en la herramienta correspondiente.
- **Entregables:** `fase-6-recursos.md` (incluye la tabla de material complementario aprobado + cobertura por
  momento) + carpeta `fase-6-prompts/` con un archivo de prompt por recurso.
- **Estado:** `recursos[]{tipo, titulo, promptFile}`; `materialComplementario[].estado` actualizado a
  `"aprobado"`/`"rechazado"`/`"ajustado"` según el instrumento.
- **El material complementario aprobado se inserta en el componente `complementary` de CADA escenario/momento
  según la cobertura** (Fase 7 / JSON de Moodle) y, cuando aplique, en `references` del Documento de Saberes.

## Fase 7 — Montaje en LMS (Moodle)
- **Hacer:** plan de montaje del aula: estructura, secciones, orden de navegación, actividades, foros, tareas,
  cuestionarios, wikis, rúbricas.
- **Reutiliza `moodle-content`**: genera el JSON de los componentes Moodle (bienvenida, página por momento,
  cierre) que el renderer convierte en HTML pegable. Pasa los 4 momentos validados (ABC: una página por
  momento). El archivo de Moodle se nombra **`<slug>-ABC.moodle.json`**.
- **Entregables:** JSON de moodle-content (`<slug>-ABC.moodle.json`) + `fase-7-montaje-lms.md` (plan de aula,
  orden de navegación, configuración por sección).

## Fase 8 — Pruebas de usuario y calidad (QA)
- **Producto:** checklists/plantillas (no contenido nuevo): dimensiones de calidad, escala de severidad,
  protocolo, matriz por dimensión/rol, checklist general, de accesibilidad y de evaluación/retroalimentación.
- **Entregable:** `fase-8-qa.md` con los checklists rellenables.

## Fase 9 — Implementación y acompañamiento
- **Producto:** guía/plantillas operativas (humano-dependiente): roles (tutor, consejero), acompañamiento
  directo/indirecto, tutorías, foros, mensajería, cronograma de acompañamiento.
- **Entregable:** `fase-9-implementacion.md`.

## Fase 10 — Seguimiento y mejora continua
- **Producto:** tablero de indicadores: participación, desempeño académico, cumplimiento de actividades, uso
  de recursos, soporte, alertas de permanencia, satisfacción; periodicidad y responsables.
- **Entregable:** `fase-10-seguimiento.md`.

---

## Token budget (Pipeline 2)
- Ingerir el instrumento respondido una sola vez → estado. Luego trabajar desde el estado.
- Fase 5 aplica las reglas de contenido del propio `SKILL.md` (Core Workflow); Fase 7 delega a
  `moodle-content`. No reproducir su contenido completo en contexto.
- Cada fase escribe su artefacto y actualiza el estado; no recargar artefactos previos salvo necesidad.
