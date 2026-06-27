# Metodologías de la Universidad de América (fuente: AN-VIR-001, Anexos 01-05)

Las cinco didácticas oficiales para asignaturas 100% virtuales. La #04 (Aprendizaje Guiado) YA está
implementada como skill `aprendizaje-guiado-scorm` y NO se toca. Estas son las otras cuatro.

Cada metodología organiza el documento de saberes por sus **momentos de aprendizaje**. En el modelo de
esta plataforma:
- **Cada momento de aprendizaje = un archivo JSON = una pestaña de Moodle.**
- **Cada archivo JSON mantiene internamente: intro + 5 secciones temáticas SCORM** (idéntico a AG),
  con 3 bloques teóricos por sección, carrusel/flashcards/acordión obligatorios, etc.
- El número de archivos por asignatura = número de momentos de la metodología.
- Nombre de archivo: `<slug-asignatura>-contenido-NN.json` (se MANTIENE el patrón de AG).
- Todas las skills son SOLO para generación de contenido teórico (documento de saberes), igual que AG.

---

## ABPr — Aprendizaje Basado en Proyectos
- Skill dir: `aprendizaje-basado-proyectos-scorm`
- methodology.code: `ABPr`
- methodology.name: `Aprendizaje Basado en Proyectos`
- **3 momentos** → contentTotal `"03"`, contentNumber `01`..`03`:
  1. `Diagnóstico Inicial`
  2. `Análisis y Diseño`
  3. `Conclusiones`
- methodology.moments: `["Diagnóstico Inicial", "Análisis y Diseño", "Conclusiones"]`
- Enfoque didáctico: el contenido teórico prepara al estudiante para diseñar y desarrollar un PROYECTO.
  El escenario inicial plantea un problema con pregunta direccionadora; el documento de saberes da las
  bases teóricas/conceptuales para identificar e implementar acciones de transformación, analizar
  problemáticas, y construir el proyecto. Énfasis en trabajo colaborativo en equipos, planeación del
  proyecto, diseño de la solución, socialización del producto.

## ABI — Aprendizaje Basado en Investigación
- Skill dir: `aprendizaje-basado-investigacion-scorm`
- methodology.code: `ABI`
- methodology.name: `Aprendizaje Basado en Investigación`
- **4 momentos** → contentTotal `"04"`, contentNumber `01`..`04`:
  1. `Problematización`
  2. `Desarrollo teórico`
  3. `Metodología e implementación`
  4. `Resultados y conclusiones`
- methodology.moments: `["Problematización", "Desarrollo teórico", "Metodología e implementación", "Resultados y conclusiones"]`
- Enfoque didáctico: el contenido teórico guía al estudiante a formular y desarrollar una INVESTIGACIÓN.
  Escenario inicial: líneas de investigación disciplinar, ejemplos de preguntas/problemas de
  investigación. El documento de saberes explica importancia de marcos teóricos/contextuales,
  metodologías de investigación de la disciplina, y presentación de resultados/análisis/conclusiones.
  Énfasis en planteamiento del problema, marco teórico, diseño metodológico, resultados.

## ABR — Aprendizaje Basado en Retos
- Skill dir: `aprendizaje-basado-retos-scorm`
- methodology.code: `ABR`
- methodology.name: `Aprendizaje Basado en Retos`
- **4 momentos** → contentTotal `"04"`, contentNumber `01`..`04`:
  1. `Definición del reto`
  2. `Ideación`
  3. `Solución e implementación`
  4. `Validación y evaluación`
- methodology.moments: `["Definición del reto", "Ideación", "Solución e implementación", "Validación y evaluación"]`
- Enfoque didáctico: el contenido teórico prepara al estudiante para abordar y resolver un RETO.
  Escenario inicial: contexto de la situación, definición del reto, preguntas direccionadoras que
  orientan la exploración. El documento de saberes da las bases para idear, diseñar e implementar una
  solución al reto, validarla y evaluarla. Énfasis en ideación, prototipado/solución, validación.

## ABC — Aprendizaje Basado en Casos
- Skill dir: `aprendizaje-basado-casos-scorm`
- methodology.code: `ABC`
- methodology.name: `Aprendizaje Basado en Casos`
- **4 momentos** → contentTotal `"04"`, contentNumber `01`..`04`:
  1. `Presentación y análisis del caso`
  2. `Análisis de pregunta orientadora o micro caso 1`
  3. `Análisis de pregunta orientadora o micro caso 2`
  4. `Conclusiones`
- methodology.moments: `["Presentación y análisis del caso", "Análisis de pregunta orientadora o micro caso 1", "Análisis de pregunta orientadora o micro caso 2", "Conclusiones"]`
- Enfoque didáctico: el contenido teórico guía el análisis de un CASO real de la disciplina.
  Escenario inicial: presentación del caso. El documento de saberes desarrolla el análisis del caso y de
  micro-casos/preguntas orientadoras, con bases teóricas para interpretarlos, culminando en
  conclusiones. Énfasis en análisis crítico de situaciones reales, preguntas orientadoras, micro casos.

---

## Reglas de transformación (qué cambiar respecto a la copia de AG)

La copia base es la skill AG (`aprendizaje-guiado-scorm`) clonada. Hay que reemplazar TODO lo
AG-específico por lo de la metodología destino, SIN romper la maquinaria genérica (contrato JSON,
selección de componentes, LaTeX, evaluación cualitativa, marca, validador).

1. **Frontmatter `name:`** en SKILL.md → el dir de la skill destino (ej. `aprendizaje-basado-proyectos-scorm`).
2. **Metodología**: toda mención de "AG", "Aprendizaje Guiado", `methodology.code: "AG"`,
   `methodology.name: "Aprendizaje Guiado"` → la sigla y nombre destino.
3. **Momentos / Fases**: AG usa `moments: ["Fase 1".."Fase 4"]` y la etiqueta "Fase". Reemplazar por los
   momentos oficiales de la metodología destino (lista exacta arriba). La regla de AG que dice 'usar
   "Fase" y no "Etapa"' debe reescribirse para usar los nombres de momento de la metodología destino.
4. **Número de contenidos**: AG = 7 archivos (`contentTotal "07"`, `01..07`, "siete", "seven", "7 x 5").
   Reemplazar por el número de momentos de la metodología (ABPr=3, ABI/ABR/ABC=4). Ej. ABPr: "tres
   archivos", `contentTotal "03"`, `01..03`. La matriz de diversidad "7 x 5" pasa a "N x 5" (N=nº momentos).
   El número de archivos = número de momentos, y CADA archivo corresponde a UN momento de aprendizaje.
5. **Mapeo archivo↔momento**: documentar que cada archivo NN representa el momento NN de la metodología
   (ej. ABPr contenido-01 = "Diagnóstico Inicial", -02 = "Análisis y Diseño", -03 = "Conclusiones").
   El `subject.contentNumber` y un campo de momento deben reflejarlo. Usar `subject.methodology.moments`
   para la lista global y dejar claro en las reglas que el contenido NN desarrolla el momento NN.
6. **Estructura interna intacta**: SIGUE siendo intro + 5 secciones SCORM por archivo, 3 bloques teóricos
   por sección temática, carrusel+flashcards+acordión obligatorios, steppers en matemáticas, charts con
   description+note, etc. NO cambiar nada de esto. Las 5 secciones internas NO son los momentos.
7. **Enfoque didáctico**: donde el texto de AG describe "ruta guiada por fases / preguntas orientadoras"
   adaptarlo al enfoque de la metodología (proyecto / investigación / reto / caso) según el resumen arriba.
   El escenario inicial y la presentación deben reflejar la didáctica destino.
8. **validate_content_package.js**: en `ignoredShortValues` reemplazar `"Fase 1".."Fase 4"` por los
   momentos de la metodología destino (strings exactos). En `ignoredPathParts` el `-ruta-ag` puede
   renombrarse al slug de ruta de la metodología (ej. `-ruta-abpr`) o dejarse genérico; mantener los
   demás ignores. El validador debe seguir pasando `node --check`.
9. **agents/openai.yaml**: actualizar `$<skill-name>`, `display_name`, `short_description` y
   `default_prompt` para la metodología destino (sigla, nombre, nº de momentos/archivos).
10. **Referencias** (`estrategias_didacticas_comunicativas.md`, `lineamientos_virtualidad.md`,
    `instructional-content-requirements.md`, `json-contract.md`, `content-uniqueness-validation.md`,
    `component-selection.md`): reemplazar menciones de AG/Fases/7-contenidos por la metodología destino.
    En `estrategias_didacticas_comunicativas.md` la tabla "Metodologia | Momentos oficiales" y el
    "Documento inicial esperado" deben describir la metodología destino y sus momentos reales.
11. **NO** dejar ninguna mención residual de "Aprendizaje Guiado", "AG", o "Fase 1-4" en la skill
    destino (salvo que sea una comparación legítima, que no debería haberla). El validador y node --check
    deben pasar.
