---
name: virtualizacion-aprendizaje-guiado
description: Orquesta la virtualización completa de una asignatura de la Universidad de América con metodología Aprendizaje Guiado (AG), siguiendo el proceso oficial de 11 fases (0–10) de PL-VIR-001 v02. Úsala cuando se deba virtualizar una asignatura AG a partir de un syllabus (Excel FO_03, PDF o texto): ejecuta el Pipeline 1 (Fases 0–4) para producir un INSTRUMENTO DE VALIDACIÓN DOCENTE que el profesor responde, y luego el Pipeline 2 (Fases 5–10) que, con el instrumento validado, genera el Documento de Saberes (vía la skill aprendizaje-guiado-scorm), los recursos e-learning y sus prompts de generación (Fase 6), el montaje LMS (vía moodle-content), y los entregables de QA, implementación y seguimiento. AG usa N temas variables (no fijos), extensión por créditos (30–55 págs), evaluación cualitativa, similitud ≤30% y APA 7. Diseñada para máxima eficiencia de tokens mediante estado acumulado compacto y artefactos por fase en disco.
---

# Virtualización de asignaturas — Aprendizaje Guiado (AG)

Orquesta el proceso oficial de virtualización de la Universidad de América (PL-VIR-001 v02, 11 fases
0–10) para asignaturas con metodología **Aprendizaje Guiado**. Produce, de forma token-eficiente, todos
los artefactos que exigen los lineamientos, con un gate de validación docente entre el análisis y la
generación de contenido.

## Cuándo usar esta skill

- El usuario quiere virtualizar una asignatura AG desde un syllabus (Excel FO_03, PDF o texto).
- Necesita el **instrumento de validación docente** (salida del Pipeline 1) para socializar con el profesor.
- Tiene el instrumento ya respondido por el docente y quiere **generar el contenido** (Pipeline 2).
- Solo aplica a **Aprendizaje Guiado**. Para otras metodologías usa la skill `virtualizacion-<metodología>`
  correspondiente (abpr, abi, abr, abc).

## Arquitectura: 2 pipelines con gate docente

```
SYLLABUS (Excel FO_03 / PDF / texto)
   │
   ▼  PIPELINE 1 · Fases 0–4 (análisis y planeación)
   │     F0 Alistamiento → F1 Análisis syllabus → F2 Planeación didáctica
   │     → F3 Diseño de evaluación → F4 Validación académica
   ▼
INSTRUMENTO DE VALIDACIÓN DOCENTE  (instrumento-validacion-docente.md + .docx + .json)
   │
   ▼  [ GATE HUMANO: el docente valida contenido/actividades/recursos, indica si la
   │    asignatura es práctica (→ recursos de simulación), propone actividades del
   │    estudiante, da sugerencias y feedback. Devuelve el instrumento respondido. ]
   ▼  PIPELINE 2 · Fases 5–10 (generación de contenido)
   │     F5 Documento de Saberes (→ skill aprendizaje-guiado-scorm)
   │     F6 Recursos e-learning + GENERA LOS PROMPTS de contenido
   │     F7 Montaje LMS (→ moodle-content)
   │     F8 QA · F9 Implementación · F10 Seguimiento
   ▼
CONTENIDO COMPLETO + plan de aula + indicadores
```

## Core Workflow

1. **Identifica el modo.** ¿El usuario pide el instrumento docente (Pipeline 1), o ya tiene el instrumento
   respondido y quiere generar contenido (Pipeline 2)? Si no está claro, pregúntalo.
2. **Ubica el proyecto.** Trabaja dentro de una carpeta de proyecto por asignatura:
   `<slug-asignatura>-virtualizacion/`. Crea ahí `estado-proyecto.json` y los artefactos `fase-N-*.md`.
3. **Lee primero** las referencias necesarias (no todas a la vez — solo las de la fase en curso):
   - Siempre: `references/lineamientos-ua.md` (métricas por créditos, evaluación, similitud 30%, APA),
     `references/metodologia-ag.md` (N temas variables, etapas progresivas, escenario AG).
   - Pipeline 1: `references/pipeline-1-fases-0-4.md` + `references/instrumento-docente.md`.
   - Pipeline 2: `references/pipeline-2-fases-5-10.md` + `references/fase-6-prompts.md`.
4. **Extrae el syllabus** con `scripts/extract_syllabus.mjs` (Excel FO_03 / texto) o PDF a JSON; guarda en
   `estado-proyecto.json`. **No inventes** datos curriculares: lo faltante se declara como brecha.
5. **Ejecuta las fases en orden**, una a la vez. Cada fase: lee el estado, produce su artefacto en disco,
   actualiza el estado con sus decisiones clave (resumen compacto). No recargues artefactos previos salvo
   que la fase lo requiera explícitamente.
6. **Pipeline 1 termina** generando el instrumento docente (Fase 4). DETENTE ahí: el contenido no se genera
   hasta que el docente valide. Indícalo claramente al usuario.
7. **Pipeline 2 arranca** con el instrumento docente respondido como entrada. Aplica las decisiones/feedback
   del docente (N temas final, actividades, recursos de simulación si es práctica, sugerencias).
8. **Fase 5** produce **los N archivos JSON del Documento de Saberes** (`<slug>-contenido-NN.json`, uno por
   tema), usando el contrato y las reglas de `aprendizaje-guiado-scorm`. NO se queda en el esquema Markdown.
   Paraleliza por tema si es grande (sigue siendo parte del Paso 2). **Fase 7** produce el **JSON de Moodle**
   con `moodle-content`. Ambos JSON son condición de cierre del Pipeline 2.
9. **Valida cada fase** con `scripts/validate_phase.js` (cumplimiento de lineamientos) y, al cerrar el
   Pipeline 2, confirma que existen y validan los DOS JSON (Documento de Saberes + Moodle). Corrige antes de avanzar.
10. **Genera solo JSON/artefactos**; no cargues nada automáticamente en la app ni en Moodle.

## Reglas no negociables (alineadas a los lineamientos UA)

- **AG = N temas VARIABLES.** El documento de saberes se divide en "el número de temas que el docente
  considere necesarios" (Tema 1…n). Deriva N del syllabus y **valídalo con el docente** en el instrumento.
  Nunca asumas un número fijo (ni 7). Cada tema = una etapa progresiva (de conceptos básicos a aplicación
  compleja e integradora).
- **Tabla de diseño AG**: Temas | Resultados de aprendizaje | Propósitos por etapa | Preguntas orientadoras.
  El escenario inicial AG = propósito + ≥1 pregunta orientadora por RA (no es un problema/reto/caso).
- **Extensión por créditos** (documento de saberes completo, repartido entre los N temas; Arial 12, 1.15):
  2 cr = 30–35 págs · 3 cr = 40–45 págs · 4 cr = 50–55 págs. Si es 1 crédito → declarar brecha.
- **Componentes didácticos**: 2 (2 cr) / 3 (3 cr) / 4 (4 cr). **Material complementario**: 3 / 5 / 7.
- **Evaluación cualitativa (PL-GAP-007)**: formativa, continua; momentos inicial/avance/final;
  auto/co/heteroevaluación. **Diagnóstica** = 10 preguntas contestadas / banco de 15, revisión automática,
  retroalimentación por pregunta, insumo del Balance inicial. **Sumativa** integra todos los temas/RA
  (última semana). **Foro** tipo debate. No reducir la evaluación a notas/porcentajes.
- **Similitud externa ≤ 30%** (originalidad institucional, verificada con gestión de referencias). Distinta
  de la unicidad intra-paquete.
- **APA 7** en todo; rotular **"Elaboración propia"** los recursos creados (gráficos, tablas, esquemas).
- **No inventar** RA, competencias, criterios, saberes, políticas ni fuentes. Lo faltante = brecha declarada
  con propuesta de resolución.
- **Gate humano obligatorio** entre Pipeline 1 y Pipeline 2: no generar contenido sin el instrumento docente
  validado.
- **Parametrización por créditos (PL-VIR-001)** antes de configurar: créditos, duración modular, distribución
  de horas por componente pedagógico. Si el syllabus no informa créditos → brecha crítica.

## Eficiencia de tokens (obligatorio)

- **Estado acumulado**: `estado-proyecto.json` (ver `templates/estado-proyecto.schema.json`) — solo
  decisiones clave compactas. Cada fase lo lee/actualiza; es lo único que viaja entre fases.
- **Artefacto por fase**: `fase-N-<nombre>.md` en disco — la salida detallada. NO se recarga en contexto
  salvo que una fase posterior lo necesite explícitamente.
- No repitas en contexto el texto completo de fases anteriores; trabaja desde el estado compacto.
- Para subfases DS de la Fase 5, delega a `aprendizaje-guiado-scorm` (esa skill ya tiene su propio flujo).

## Salidas por pipeline

**Pipeline 1** → `instrumento-validacion-docente.md` (+ `.docx` vía `scripts/build_instrumento_docx.py` si se
pide, + `.json` espejo) y `fase-0-*.md … fase-4-*.md`, `estado-proyecto.json`.

**Pipeline 2** → genera TODO de forma automática a partir del instrumento diligenciado. Entregables:
- **Los N JSON del Documento de Saberes** `documento-saberes/<slug>-contenido-01.json … -NN.json`
  (cargables en la plantilla SCORM/PDF). **No quedarse en el esquema Markdown** (ver Fase 5).
- Recursos e-learning + sus prompts (`fase-6-recursos.md`, `fase-6-prompts/`).
- **El JSON de Moodle** `fase-7-montaje-lms/<slug>-<MET>.moodle.json` (cargable en el renderer moodle-content).
- Checklists de QA (Fase 8), guía de implementación (Fase 9), tablero de indicadores (Fase 10).

## Modelo de 2 pasos (regla rectora)

Todo el proceso se ejecuta en **exactamente 2 pasos**, sin pasos manuales intermedios:

1. **Paso 1 — Pipeline 1** (Fases 0–4): syllabus → `instrumento-validacion-docente` (.md/.docx/.json). FIN.
2. **Paso 2 — Pipeline 2** (Fases 5–10): instrumento diligenciado → **TODOS los entregables, incluidos los
   DOS JSON finales** (Documento de Saberes para la plantilla SCORM/PDF **y** componentes Moodle). FIN.

**Condición de cierre del Pipeline 2 (obligatoria):** no se considera terminado hasta que existan, validados
y parseables: (a) los N JSON `<slug>-contenido-NN.json`, y (b) el JSON `<slug>-<MET>.moodle.json`. Si la
generación de contenido es grande, paralelízala (un sub-paso por tema) DENTRO del Pipeline 2 — sigue siendo
un solo paso para el usuario. Nunca dejar el Documento de Saberes como esquema pendiente de un tercer paso.

## Quality Checklist

- Créditos confirmados y parametrización aplicada antes de configurar.
- N temas derivado del syllabus y marcado para validación docente (nunca fijo).
- Extensión, nº de componentes y material complementario coinciden con la tabla por créditos.
- Evaluación: diagnóstica 10/15, sumativa integradora, foro debate, cualitativa con auto/co/hetero.
- Instrumento docente cubre: validación RA→temas, actividades del estudiante, recursos (y simulación si es
  práctica), evaluación, sugerencias/feedback, y el bloque AG (propósitos + preguntas orientadoras por tema).
- Ninguna fase inventa datos; las brechas están declaradas.
- Estado compacto actualizado y artefactos en disco; sin recarga innecesaria de contexto.
- Similitud ≤30%, APA 7, "Elaboración propia" aplicados.
- Fase 5 reusa `aprendizaje-guiado-scorm`; Fase 7 reusa `moodle-content`.

## Resources

- `references/lineamientos-ua.md` — PL-VIR-001/PL-GAP-007: métricas por créditos, evaluación, similitud, APA.
- `references/metodologia-ag.md` — AG: N temas, etapas progresivas, tabla de diseño, escenario AG.
- `references/pipeline-1-fases-0-4.md` — contrato de las fases 0–4 + entregables + token budget.
- `references/pipeline-2-fases-5-10.md` — contrato de las fases 5–10.
- `references/instrumento-docente.md` — qué debe contener el instrumento de validación docente (AG).
- `references/fase-6-prompts.md` — cómo generar los prompts de contenido por recurso (Fase 6).
- `templates/instrumento-validacion-docente.md` — plantilla rellenable del instrumento.
- `templates/estado-proyecto.schema.json` — esquema del estado acumulado.
- `scripts/extract_syllabus.mjs` — extrae el syllabus (Excel FO_03 / texto) a JSON.
- `scripts/validate_phase.js` — valida cumplimiento de lineamientos por fase.
- `scripts/build_instrumento_docx.py` — convierte el instrumento .md a .docx (opcional).
