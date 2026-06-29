# Metodología — Aprendizaje Basado en Proyectos (ABPr)

Fuente: AN-VIR-001 Anexo 04, `Escenario de aprendizaje/ABPr DOCUMENTO DE SABERES`, prompt maestro DS.

## Principio

ABPr organiza el aprendizaje alrededor del **diseño y desarrollo de un PROYECTO**. El contenido prepara al
estudiante para **identificar e implementar acciones de transformación, analizar el problema, planear y
diseñar la solución, y socializar el producto**, con énfasis en el **trabajo colaborativo en equipos**. No es
una ruta libre por etapas variables (como AG): se estructura en **3 momentos fijos** que conducen del
diagnóstico del problema a la entrega y socialización del proyecto.

## Estructura del documento de saberes (CRÍTICO)

- ABPr usa **3 MOMENTOS FIJOS** (no un número variable de temas). Son siempre los mismos y en este orden:
  **`["Diagnóstico Inicial", "Análisis y Diseño", "Conclusiones"]`**.
- **1 archivo JSON por momento** → 3 archivos `<slug>-contenido-01.json` … `-03.json`
  (`01` = Diagnóstico Inicial, `02` = Análisis y Diseño, `03` = Conclusiones). `unitLabel: "Momento"`,
  `contentTotal` = 3.
- Cada momento contiene "elementos teóricos y prácticos que se articulen con los resultados de aprendizaje y
  el propósito del momento", orientados a avanzar en el proyecto del equipo.
- Como los momentos son fijos, en la Fase 2 **NO se propone un N de temas**: se planean los **subtemas por
  momento** (cobertura disciplinar) y se valida con el docente en el instrumento del Pipeline 1. El docente
  ajusta subtemas, propósitos y preguntas, **no** la cantidad de momentos (siempre 3).

## Escenario inicial ABPr

A diferencia de AG (propósito + preguntas orientadoras sin problema), el escenario inicial de ABPr plantea un
**problema real + una pregunta direccionadora** que el equipo debe resolver mediante un proyecto. El estudiante
trabaja en **equipos colaborativos**: diagnostica el problema, analiza y diseña una solución, y socializa el
producto. El documento de saberes aporta las **bases conceptuales** para cada uno de esos avances.

## Tabla de diseño global ABPr (obligatoria)

| Momento | Resultado(s) de aprendizaje | Propósito del momento | Preguntas orientadoras |
|---|---|---|---|
| 1. Diagnóstico Inicial | … | Identificar y comprender el problema real; situarse frente a la pregunta direccionadora. | … |
| 2. Análisis y Diseño | … | Analizar el problema, planear y diseñar la solución; definir acciones de transformación. | … |
| 3. Conclusiones | … | Implementar, evaluar y socializar el producto del proyecto en equipo. | … |

- **Propósito del momento**: qué logra el equipo al completar ese momento dentro del proyecto.
- **Preguntas orientadoras**: inducen la comprensión global de cada momento; al menos una por RA.

## Componentes y material por créditos

Igual que el resto de metodologías: **componentes didácticos 2/3/4** y **material complementario 3/5/7** según
**2/3/4 créditos** (ver `lineamientos-ua.md`). Los componentes se eligen según el saber y el momento (no por
cuota). La bibliografía debe cumplir **≥30% en inglés** (internacionalización del syllabus UA).

## Relación con la skill de contenido

La **Fase 5 de ESTA misma skill genera el Documento de Saberes** (no delega a otra skill): produce los **3 JSON**
`<slug>-contenido-NN.json` aplicando las reglas de contenido de esta skill (ver `references/json-contract.md`,
`component-selection.md`, `instructional-content-requirements.md`, `content-uniqueness-validation.md`,
`math-latex-validation.md`). Se le pasan los parámetros validados: los 3 momentos fijos, propósito y preguntas
orientadoras por momento, subtemas por momento, RA, extensión por créditos y las decisiones del docente, con
`unitLabel: "Momento"` y `contentTotal: "03"`.
