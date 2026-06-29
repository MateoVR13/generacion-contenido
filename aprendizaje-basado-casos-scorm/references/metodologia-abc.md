# Metodología — Aprendizaje Basado en Casos (ABC)

Fuente: AN-VIR-001 Anexo 04, `Escenario de aprendizaje/ABC DOCUMENTO DE SABERES`, prompt maestro DS.

## Principio

El estudiante analiza un **CASO real**: el escenario presenta el caso y el Documento de Saberes desarrolla el
análisis del caso y de preguntas orientadoras/micro-casos, con las bases teóricas para interpretarlos,
culminando en conclusiones. A diferencia de AG (ruta por etapas progresivas con N temas variables), ABC se
organiza por **momentos fijos** que recorren el ciclo de análisis de un caso disciplinar.

## Estructura del documento de saberes (CRÍTICO)

- Se divide en **4 MOMENTOS FIJOS** (no variables): un archivo JSON por momento, en este orden exacto:
  1. **Presentación y análisis del caso**
  2. **Análisis de pregunta orientadora o micro caso 1**
  3. **Análisis de pregunta orientadora o micro caso 2**
  4. **Conclusiones**
- Cada **momento = un archivo** (modelo ABC = 4 momentos = 4 archivos). La extensión total (por créditos) se
  reparte entre los 4 momentos.
- Cada momento contiene los elementos teóricos y prácticos que permiten interpretar el caso / micro-casos y
  articularlos con los resultados de aprendizaje y el propósito del momento.
- Los 4 momentos son fijos: **no se derivan del syllabus ni se ajustan en número**. Lo que se valida con el
  docente en el instrumento del Pipeline 1 es el CASO, los micro-casos / preguntas orientadoras, los subtemas
  por momento, el propósito y las preguntas orientadoras de cada momento (no el número de momentos).

## Tabla de diseño global ABC (obligatoria)

| Momento | Resultado(s) de aprendizaje | Propósito del momento | Preguntas orientadoras |
|---|---|---|---|
| Presentación y análisis del caso | … | … | … |
| Análisis de pregunta orientadora o micro caso 1 | … | … | … |
| Análisis de pregunta orientadora o micro caso 2 | … | … | … |
| Conclusiones | … | … | … |

- **Propósito del momento**: qué logra el estudiante al completar el momento (presentar/analizar el caso,
  resolver el micro-caso 1, resolver el micro-caso 2, integrar conclusiones).
- **Preguntas orientadoras**: inducen la comprensión y el análisis del caso/micro-caso de cada momento; al
  menos una por RA asociado al momento.

## Escenario inicial ABC

El escenario inicial de ABC es un **Caso real disciplinar + micro-casos / preguntas orientadoras**. El primer
momento presenta el caso real (contexto, datos, actores, problema disciplinar) y plantea el análisis; los
momentos 2 y 3 desarrollan el análisis de cada pregunta orientadora o micro-caso; el momento 4 integra las
conclusiones. El caso y los micro-casos deben ser reales del dominio de la asignatura; lo que no esté
soportado por el syllabus/fuentes se declara como brecha (no se inventan datos del caso).

## Subtemas por momento

Para cada uno de los 4 momentos se proponen —solo listados, sin desarrollarlos— los **subtemas relevantes**
que el contenido debería cubrir para sostener el análisis del caso/micro-caso (3–7 por momento como
referencia, derivados del syllabus/saberes). El docente valida la **cobertura disciplinar** en el instrumento.

## Componentes y material por créditos

Igual que el resto: componentes didácticos 2/3/4 y material complementario 3/5/7 según 2/3/4 créditos
(ver `lineamientos-ua.md`). Los componentes se eligen según el saber y el momento (no por cuota).

## Relación con la skill de contenido

La **Fase 5** genera el Documento de Saberes ABC con las **references de ESTA misma skill**
(`aprendizaje-basado-casos-scorm`): `json-contract.md`, `component-selection.md`,
`instructional-content-requirements.md`, `content-uniqueness-validation.md`, `math-latex-validation.md`. No
delega a otra skill: esta skill es a la vez el orquestador de fases y el motor de contenido. Pásale los
parámetros validados (caso, micro-casos/preguntas orientadoras por momento, propósito por momento, RA,
subtemas, extensión por créditos, decisiones del docente) y `unitLabel: "Momento"`, `contentTotal` = "04".
Produce los **4 JSON** `<slug>-contenido-01.json … -04.json` (uno por momento) que alimentan la plantilla
SCORM/PDF.
