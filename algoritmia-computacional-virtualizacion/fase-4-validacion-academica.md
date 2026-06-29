# Fase 4 — Validación académica · Algoritmia Computacional I

> Pipeline 1 (AG) · Consolidación F0–F4 → **instrumento de validación docente**. Cierre del Pipeline 1.

## Salida del Pipeline 1

- **`instrumento-validacion-docente.md`** — documento editable para el docente (8 secciones).
- **`instrumento-validacion-docente.json`** — espejo para re-ingerir las respuestas en el Pipeline 2.
- **`evaluacion/diagnostica-algoritmia-computacional.json`** — banco diagnóstico (15 preguntas, `propuesto`).
- (Opcional) `.docx` con `scripts/build_instrumento_docx.py` si se requiere para socializar.

## Matriz de validación (qué debe confirmar el docente)

| Sección del instrumento | Qué valida | Estado |
|---|---|---|
| 0. Metodología | Aprueba AG o elige otra (alternativa: ABPr) | pendiente |
| 1. Identificación | RA, saberes, evaluación, créditos/horas | pendiente |
| 2. Naturaleza | Teórico-práctica; recursos de simulación (Python/PSeInt) | pendiente |
| 3. Temas + subtemas | N=6 temas, propósitos, preguntas, cobertura de subtemas | pendiente |
| 4. Actividades y talleres | 6 talleres propuestos (aprobar/quitar/ajustar) | pendiente |
| 5. Recursos y material | 3 componentes + 5 materiales (40% inglés) | pendiente |
| 6. Evaluación | diagnóstica 10/15, formativas, sumativa, banco de 15 | pendiente |
| 7. Feedback | énfasis, fuentes obligatorias, ética | pendiente |
| 8. Brechas | 5 brechas a resolver | pendiente |

## Matriz de brechas (resumen)

| # | Brecha | Severidad | Propuesta |
|---|---|---|---|
| 1 | Código de la asignatura no expuesto | Menor | Solicitar al programa |
| 2 | Lenguaje/entorno no fijado | Media | Proponer Python + PSeInt; confirmar |
| 3 | Ponderaciones no declaradas | Media | Pesos cualitativos; el docente define |
| 4 | Bibliografía 100% español (lineamiento ≥30% inglés) | Media | M3 (Think Python) y M4 (NumPy/Nature) → 40% inglés; verificar edición/URL |
| 5 | Reparto de saberes RA2 | Menor | Temas 5 y 6; confirmar |

## Coherencia global (diseño inverso)

RA → evidencia (talleres + proyecto) → AG → 6 temas con subtemas → actividades/talleres por tema → recursos
(3 componentes + 5 materiales). Cadena coherente y trazable al syllabus. Ninguna fase inventó datos
curriculares; lo faltante quedó declarado como brecha.

## Cierre del Pipeline 1 — GATE

`gate: "pendiente-validacion-docente"`. **DETENER aquí.** No se genera contenido (Documento de Saberes,
recursos, Moodle) hasta recibir el instrumento **respondido** por el docente. Con el instrumento diligenciado
se arranca el **Pipeline 2 (Fases 5–10)**.
