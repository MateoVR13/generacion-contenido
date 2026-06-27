# Pipeline 2 — Fases 5–10 (generación de contenido)

**Entrada obligatoria:** el `instrumento-validacion-docente` RESPONDIDO por el docente (más
`estado-proyecto.json`). Si no está respondido, no arrancar: el gate humano es obligatorio.

Primer paso del Pipeline 2: **ingerir las respuestas del docente** (del `.md`/`.json` respondido) y
actualizar `estado-proyecto.json`: N temas final, ajustes a propósitos/preguntas, actividades del estudiante
aprobadas, recursos (incluidos los de **simulación/laboratorio si la asignatura es práctica**), sugerencias y
feedback. A partir de aquí todo se genera con los valores VALIDADOS.

---

## Fase 5 — Diseño tecnopedagógico y disciplinar (Documento de Saberes)
- **Hacer:** producir el Documento de Saberes AG (N temas validados, extensión por créditos).
- **Salida OBLIGATORIA: los N archivos JSON finales** `<slug>-contenido-NN.json` (uno por tema, modelo AG
  = N temas = N archivos), conformes al contrato de la plantilla SCORM/PDF
  (`../../aprendizaje-guiado-scorm/references/json-contract.md`). Estos JSON son cargables directamente en
  la plantilla; **no basta con dejar un esquema en Markdown**. El esquema de contenido es solo un paso
  intermedio interno: la Fase 5 NO se considera cerrada hasta que existan los N JSON parseables y válidos.
- **Reutiliza la skill `aprendizaje-guiado-scorm`** para el contrato y las reglas de componentes (3 bloques
  teóricos por sección, carrusel/flashcards/acordión, steppers en LaTeX, charts con description+note).
  Pásale los parámetros validados (N temas, propósito/preguntas orientadoras por tema, RA, extensión por
  créditos, decisiones del docente) y `unitLabel: "Tema"`, `contentTotal` = N.
- Cada concepto central: definición, contexto teórico, principios, relevancia, aplicación en AG, ejemplos
  transversales (varias ingenierías/áreas), errores frecuentes, preguntas de reflexión, relación con
  evidencia, APA. Toda la matemática en LaTeX.
- **Entregables (todos obligatorios):**
  - `documento-saberes/<slug>-contenido-01.json … -NN.json` (los JSON de la plantilla SCORM/PDF).
  - `fase-5-documento-saberes.md` (mapa de coherencia, distribución de páginas, checklist de rigor).
  - (intermedio) `documento-saberes/esquema-contenido.md`.
- **Validar:** `node ../../aprendizaje-guiado-scorm/scripts/validate_content_package.js documento-saberes/<slug>-contenido-*.json`
  (unicidad) + parseabilidad + estructura. Corregir antes de cerrar.
- **Estado:** `documentoSaberes{archivos[], paginasPorTema{}}`.

## Fase 6 — Diseño gráfico y recursos e-learning → GENERA LOS PROMPTS
- **Hacer:** desarrollar los recursos didácticos (2/3/4 según créditos) y material complementario (3/5/7).
- Por cada recurso: tipo, título, objetivo pedagógico, público, **copy/guion completo**, jerarquía,
  indicaciones visuales, texto alternativo (accesibilidad), brief de diseño, relación con evaluación.
- **GENERAR LOS PROMPTS de generación de contenido** por recurso/componente didáctico oficial — ver
  `fase-6-prompts.md`. Un prompt por recurso, listo para ejecutar en la herramienta correspondiente.
- **Entregables:** `fase-6-recursos.md` + carpeta `fase-6-prompts/` con un archivo de prompt por recurso.
- **Estado:** `recursos[]{tipo, titulo, promptFile}`.

## Fase 7 — Montaje en LMS (Moodle)
- **Hacer:** plan de montaje del aula: estructura, secciones, orden de navegación, actividades, foros, tareas,
  cuestionarios, wikis, rúbricas.
- **Reutiliza `moodle-content`**: genera el JSON de los componentes Moodle (bienvenida, página por tema,
  cierre) que el renderer convierte en HTML pegable. Pasa el N de temas validado (AG: páginas por tema).
- **Entregables:** JSON de moodle-content + `fase-7-montaje-lms.md` (plan de aula, orden de navegación,
  configuración por sección).

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
- Fase 5 y Fase 7 delegan a las skills SCORM/moodle-content; no reproducir su contenido en contexto.
- Cada fase escribe su artefacto y actualiza el estado; no recargar artefactos previos salvo necesidad.
