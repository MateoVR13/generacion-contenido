# Pipeline 1 — Fases 0–4 (análisis y planeación) → Instrumento de validación docente

Objetivo del pipeline: a partir del syllabus, producir el **instrumento de validación docente** que el
profesor responde antes de generar contenido. Cada fase escribe `fase-N-<nombre>.md` y actualiza
`estado-proyecto.json`. Entre fases solo viaja el estado compacto.

Diseño inverso: RA → evidencias de evaluación → metodología → actividades → recursos.

---

## Fase 0 — Alistamiento institucional
- **Entrada:** syllabus (extraído a JSON con `scripts/extract_syllabus.mjs`).
- **Hacer:** identificar asignatura, código, programa, nivel, modalidad, créditos, horas, RA, saberes,
  técnica/criterios de evaluación, bibliografía. Aplicar parametrización por créditos (`lineamientos-ua.md`).
- **Entregables (`fase-0-alistamiento.md`):** ficha de configuración inicial; tabla de
  decisiones/brechas/recomendaciones; mapa de insumos disponibles/faltantes; roles iniciales; alertas.
- **Estado:** `creditos`, `duracionModular`, `horas{}`, `asignatura{}`, `brechas[]`.
- **Cierre:** créditos confirmados; si faltan → brecha crítica.

## Fase 1 — Análisis del syllabus
- **Hacer:** análisis curricular. Identificar unidad de competencia, RA, saberes, criterios y técnica de
  evaluación, relación con perfil de egreso, coherencia RA–contenidos–evaluación.
- **Entregables (`fase-1-analisis-syllabus.md`):** síntesis curricular; competencia/unidad; RA; saberes;
  criterios; coherencia; créditos confirmados; inconsistencias/vacíos por validar.
- **Estado:** `ra[]`, `saberes[]`, `competencia`, `criteriosEvaluacion[]`, `coherencia`, `vacios[]`.

## Fase 2 — Planeación didáctica (diseño inverso, AG)
- **Hacer:** diseñar la planeación virtual desde el RA y la configuración por créditos. Justificar AG.
  **Proponer el N de temas AG** (derivado de RA/saberes/unidades) con su tabla de diseño (Tema | RA |
  propósito por etapa | preguntas orientadoras). Definir ruta de navegación, actividades
  sincrónicas/asincrónicas, distribución de horas, documento y recursos proyectados, secuencia evaluativa.
- **PROPONER LOS SUBTEMAS RELEVANTES por tema (solo listado, a validar).** Para cada tema, deriva del
  syllabus/saberes **los subtemas más relevantes que el contenido debería cubrir, únicamente listados, sin
  desarrollarlos** (3–7 por tema como referencia, no exhaustivos). Sirven para que el docente valide la
  **cobertura disciplinar** en el instrumento. No inventes subtemas que el syllabus no respalde; lo que no
  esté soportado, decláralo como brecha. Van a la sección 3 del instrumento docente (tabla aparte de subtemas).
- **PROPONER EL MATERIAL COMPLEMENTARIO** (cantidad por créditos: 3/5/7) como una **matriz revisable**:
  cada material con `id` (M1, M2…), referencia **APA** (partiendo de la bibliografía del syllabus; marcar
  como brecha/`todo` lo que no esté en el syllabus, **sin inventar fuentes**), `tipo` (capítulo de libro
  base, libro complementario, recurso abierto, etc.), `idioma` (`es`/`en`), `tema(s) asociado(s)` y
  `justificacion`. Define la **cobertura por tema** (qué materiales cubren cada tema). Esta propuesta va al
  instrumento docente para su **revisión y aprobación** (no se incluye en los escenarios hasta que el
  profesor la valide).
- **REGLA DE BIBLIOGRAFÍA EN INGLÉS (≥ 30%):** del total de recursos bibliográficos/material complementario
  de la asignatura, **al menos el 30% debe estar en inglés** (requisito de internacionalización del syllabus
  UA). Para las cuotas por créditos esto es: 2 cr → ≥1 de 3; 3 cr → ≥2 de 5; 4 cr → ≥3 de 7. Marca el
  `idioma` de cada material y reporta el % en inglés. Si el syllabus no aporta fuentes en inglés suficientes,
  decláralo como brecha y propón fuentes en inglés reconocidas (con `todo` de verificación), sin inventar
  datos. El validador comprueba este umbral.
- **Entregables (`fase-2-planeacion-didactica.md`):** configuración didáctica; justificación AG; RA eje; ruta
  del estudiante; tabla de N temas AG (PROPUESTA, a validar); distribución de horas; recursos proyectados;
  **matriz de material complementario propuesto + cobertura por tema (PROPUESTA, a validar)**.
- **Estado:** `nTemasPropuesto`, `temas[]{titulo, ra, propositoEtapa, preguntasOrientadoras[], subtemas[]}`,
  `rutaNavegacion`, `recursosProyectados`,
  `materialComplementario[]{id, apa, tipo, temas[], justificacion, estado:"propuesto", href, todo}`,
  `coberturaPorTema{temaN:[ids]}`.

## Fase 3 — Diseño de evaluación
- **Hacer:** estrategia evaluativa alineada al RA y AG, cualitativa (`lineamientos-ua.md`). Mapa de
  evaluación; diagnóstica (10/15); formativas de seguimiento (**taller por escenario/tema**); sumativa
  integradora (última semana); rúbricas analítica/holística; foro debate, wiki, coevaluación-taller.
  Ponderación como brecha+propuesta si falta.
- **DIAGNÓSTICA — REDACTAR el banco propuesto (va al instrumento).** Genera ya en el Pipeline 1 las
  **15 preguntas** de prerrequisitos (de los "conocimientos/RA previos" del syllabus): enunciado, 4 opciones,
  respuesta correcta y retroalimentación por pregunta. Se entregan EN el instrumento (o como anexo adjunto)
  para que el docente las **apruebe/ajuste/quite**. Estado inicial `"propuesto"`. NO se publica nada sin
  revisión docente. Archivo propuesto: `evaluacion/diagnostica-<slug>.json` (con `estado:"propuesto"`).
- **TALLERES por escenario — REDACTAR el propuesto por tema (va al instrumento).** Para cada tema, propón el
  taller (enunciado, evidencia, RA, criterio, instrucciones) en la tabla de la sección 4; el docente lo
  valida. Estado inicial `"propuesto"`.
- **Entregables (`fase-3-diseno-evaluacion.md`):** mapa general de evaluación; **banco diagnóstico propuesto
  (15 preguntas)**; **talleres por escenario propuestos**; formativas; sumativa; rúbricas; instrumentos
  complementarios; momentos inicial/avance/final; auto/co/hetero.
- **Estado:** `evaluacion{diagnostica{contestadas:10, banco:15, archivo, estado:"propuesto"},
  formativas[], talleresPorTema[]{tema, enunciado, evidencia, ra, estado:"propuesto"}, sumativa,
  rubricas[], momentos[]}`.

## Fase 4 — Validación académica → INSTRUMENTO DOCENTE
- **Hacer:** consolidar F0–F4 en el **instrumento de validación docente** (ver `instrumento-docente.md` y la
  plantilla `templates/instrumento-validacion-docente.md`). Construir matriz de validación, matriz de brechas
  y las preguntas que el docente debe responder.
- **Entregables:**
  - `fase-4-validacion-academica.md` (paquete de validación + matrices).
  - **`instrumento-validacion-docente.md`** (+ `.docx` con `scripts/build_instrumento_docx.py` si se pide,
    + `.json` espejo para re-ingerir respuestas).
- **Estado:** `instrumentoGenerado: true`, `gate: "pendiente-validacion-docente"`.
- **Cierre del Pipeline 1:** DETENER. No generar contenido hasta recibir el instrumento respondido.

---

## Token budget (Pipeline 1)
- Lee el syllabus una vez (a JSON en estado). No lo recargues completo en cada fase: usa los campos del estado.
- Cada fase produce su `.md` y actualiza el estado; la siguiente fase lee SOLO el estado (compacto).
- El instrumento se ensambla desde el estado + la plantilla, no re-derivando F0–F3.
