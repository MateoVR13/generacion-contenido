# Metodología — Aprendizaje Basado en Retos (ABR)

Fuente: AN-VIR-001 Anexo 04, `Escenario de aprendizaje/ABR DOCUMENTO DE SABERES`, prompt maestro DS.

## Principio

El contenido prepara para resolver un **RETO**: el escenario presenta el **contexto**, define el **reto** y
plantea **preguntas direccionadoras**; el documento da las bases para **idear, diseñar e implementar** una
solución, y **validarla**. A diferencia de AG (ruta guiada por etapas progresivas, N temas variables), ABR se
organiza por **momentos fijos** que acompañan el ciclo de resolución del reto.

## Estructura del documento de saberes (CRÍTICO)

- ABR usa **4 momentos FIJOS**, no un número variable de temas:
  `["Definición del reto", "Ideación", "Solución e implementación", "Validación y evaluación"]`.
- **1 archivo JSON por momento** (4 archivos): 01 = Definición del reto, 02 = Ideación,
  03 = Solución e implementación, 04 = Validación y evaluación. `contentTotal` = `"04"`; `unitLabel: "Momento"`.
- Cada **momento** contiene "elementos teóricos y prácticos que se articulen con los resultados de aprendizaje
  y el propósito del momento", orientados a la fase correspondiente del ciclo del reto.
- La extensión total (por créditos) se reparte entre los 4 momentos.
- El docente **NO ajusta el número ni el nombre de los momentos**; valida su propósito, preguntas
  direccionadoras, subtemas y el escenario inicial en el instrumento del Pipeline 1.

## Escenario inicial ABR

El escenario inicial es: **situación-contexto + reto definido + preguntas direccionadoras**. Presenta una
situación realista que sitúa al estudiante, enuncia explícitamente el reto a resolver, y formula las preguntas
direccionadoras que guían el recorrido por los 4 momentos (al menos una por RA). No es un mero listado de
temas: encuadra todo el documento como preparación para resolver el reto.

## Tabla de diseño por momento (obligatoria)

| Momento | Resultado(s) de aprendizaje | Propósito | Preguntas direccionadoras |
|---|---|---|---|
| 1. Definición del reto | … | Comprender el contexto y delimitar el reto | … |
| 2. Ideación | … | Generar y comparar alternativas de solución | … |
| 3. Solución e implementación | … | Diseñar e implementar la solución elegida | … |
| 4. Validación y evaluación | … | Probar, validar y evaluar la solución | … |

- **Propósito**: qué logra el estudiante al completar el momento (en relación con el reto).
- **Preguntas direccionadoras**: orientan la resolución del reto en cada momento; al menos una por RA.

## Componentes y material por créditos

Igual que el resto: componentes didácticos 2/3/4 y material complementario 3/5/7 según 2/3/4 créditos
(ver `lineamientos-ua.md`). Los componentes se eligen según el saber y el momento (no por cuota).

## Relación con la skill de contenido

La **Fase 5** genera el Documento de Saberes con las references de **ESTA MISMA skill**
(`aprendizaje-basado-retos-scorm`): el Core Workflow del `SKILL.md` y `references/json-contract.md`,
`references/component-selection.md`, `references/instructional-content-requirements.md`,
`references/math-latex-validation.md`, `references/content-uniqueness-validation.md`. Se le pasan: los 4
momentos validados, el escenario inicial (situación-contexto + reto + preguntas direccionadoras), propósito y
preguntas direccionadoras por momento, extensión por créditos, y las decisiones del docente. El resultado son
los 4 JSON que alimentan la plantilla SCORM/PDF.
