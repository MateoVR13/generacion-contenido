# Auditoría — aprendizaje-basado-investigacion-scorm (ABI)

Fecha: 2026-06-27 · Auditor: Diseño Instruccional UA
Base oficial: `scratchpad/oficial-ua.md` + `scratchpad/docs-txt/` (texto plano de los .docx/.xlsx oficiales)
Skill auditada: `/Users/eximius/Documents/Programming/generacion-contenido/aprendizaje-basado-investigacion-scorm/`

---

## Resumen ejecutivo

**Alineación global: MEDIA.**

La skill ABI acierta en lo estructural mayor: usa exclusivamente la metodología ABI, fija **4 momentos** (uno por archivo JSON 01–04), respeta el enfoque investigativo (problema → marco teórico → método → resultados) y refleja correctamente la evaluación cualitativa de pregrado (PL-GAP-007: niveles cualitativos, auto/co/heteroevaluación, momentos inicial/avance/final). Sin embargo presenta desviaciones literales y de métricas que un auditor debe corregir:

- **CRÍTICO (literal de momento):** el Momento 3 oficial se llama **"Metodológico y de implementación"** (`Escenario_de_aprendizaje__ABI_DOCUMENTO_DE_SABERES_.docx.txt:50`), pero la skill lo escribe **"Metodología e implementación"** en TODA su superficie (SKILL.md, 3 references, el contrato JSON y hasta la lista blanca del validador). La propia skill exige usar "los nombres oficiales", y los está fijando mal.
- **ALTO (métricas por créditos):** la tabla oficial 2/3/4 créditos → **30-35 / 40-45 / 50-55 págs**, **2/3/4 componentes**, **3/5/7 material complementario** (`ABI_DOCUMENTO_DE_SABERES_.docx.txt:14-18`) no está implementada. La skill usa una heurística libre de "páginas por PDF" pedida al usuario (SKILL.md:11,167-176) y solo deja una nota orientativa de componentes (instructional-content-requirements.md:124).
- **ALTO (diagnóstica 10 vs 15):** la diagnóstica oficial es de **10 preguntas que contesta el estudiante** (se elaboran 15 para aleatorizar) (`Recurso_evaluación_diagnóstica_Pre.docx.txt:2,42`). La skill resume "Evaluacion diagnostica: 15 preguntas" (estrategias_didacticas_comunicativas.md:55), confundiendo el banco con lo que responde el estudiante.
- **MEDIO (catálogo de componentes):** los "componentes" de la skill son tipos de render HTML/SCORM (theory-block, carousel, flashcards, accordion, chart…); no existe correspondencia explícita con el **catálogo oficial de componentes didácticos** (infografía animada, podcast, cómic, OVA, mapa conceptual/mental, línea de tiempo, juegos didácticos) (`Componentes_Didácticos.docx.txt:1-19`).
- **MEDIO (originalidad y escenarios):** la regla oficial de **similitud máxima 30%** y APA 7 (`ABI_DOCUMENTO_DE_SABERES_.docx.txt:23,31`) no aparece como regla; el **escenario inicial ABI** (introducción 1 pág · contexto/líneas 2-3 págs · pregunta de investigación ½ pág · anexos) está apenas insinuado, no especificado con su estructura/extensión oficial.

La skill es funcional y mayormente coherente con el enfoque, pero requiere ajustes de literal, parametrización por créditos y trazabilidad al catálogo/escenarios oficiales para alcanzar alineación alta.

---

## 1. Alineación metodológica

La skill fija ABI = 4 momentos, uno por archivo JSON (SKILL.md:27,52; instructional-content-requirements.md:67-94), lo que coincide con el oficial: *"La presente didáctica se divide en cuatro momentos de aprendizaje"* (`ABI_DOCUMENTO_DE_SABERES_.docx.txt:4`). El orden y el enfoque (problematización → teórico → metodológico → resultados) son correctos. El problema está en el **literal del Momento 3** y en la **no incorporación de las preguntas guía oficiales**.

| Momento | Oficial (saberes ABI) | Skill | Veredicto |
|---|---|---|---|
| 1 | **Problematización** (`:32`) | Problematización | OK |
| 2 | **Desarrollo teórico** (`:43`) | Desarrollo teórico | OK |
| 3 | **Metodológico y de implementación** (`:50`) | **Metodología e implementación** | DESVIACIÓN LITERAL |
| 4 | **Resultados y conclusiones** (`:58`) | Resultados y conclusiones | OK |

### Hallazgos

**1.1 [CRÍTICA] El nombre del Momento 3 está mal escrito en toda la skill.**
- Oficial: `ABI_DOCUMENTO_DE_SABERES_.docx.txt:50` → *"Momento 3: Metodológico y de implementación"*.
- Skill (todas las ocurrencias dicen "Metodología e implementación"):
  - `SKILL.md:27`, `SKILL.md:52`, `SKILL.md:66`, `SKILL.md:69`, `SKILL.md:129`, `SKILL.md:140`
  - `references/instructional-content-requirements.md:71,81,93`
  - `references/json-contract.md:11,72,86`
  - `references/estrategias_didacticas_comunicativas.md:26,28,50,58`
  - `scripts/validate_content_package.js:63`
  - `agents/openai.yaml:4`
- Agravante: la propia skill ordena "use the official ABI moment names … do not invent other moment names" (`SKILL.md:69,140`), pero el valor que fija como "oficial" es incorrecto. Y el validador lo blinda en su lista de valores ignorados (`validate_content_package.js:63`), perpetuando el error.
- **Recomendación:** reemplazar globalmente `Metodología e implementación` → `Metodológico y de implementación` en SKILL.md, las 3 references, json-contract.md, el array `subject.methodology.moments`, openai.yaml y la `ignoredShortValues` del validador. Es un cambio de literal de bajo costo y alto impacto de cumplimiento.

**1.2 [ALTA] La skill no incorpora las preguntas guía oficiales de cada momento.**
- El documento de saberes oficial define, por momento, las preguntas que el contenido DEBE responder; p.ej. M1: *"¿Cuáles son las principales líneas de investigación…? ¿Cuáles son los principales problemas…? ¿Qué autores y teorías…?"* (`ABI_DOCUMENTO_DE_SABERES_.docx.txt:37-39`); M3: *"¿Qué enfoque y métodos de análisis…? ¿Qué herramientas…? ¿Qué ejemplos y casos…?"* (`:53-55`); M4: *"¿Cómo se definen los principales hallazgos? ¿Cómo se analizan e interpretan…? ¿Cómo se establecen conclusiones y recomendaciones?"* (`:62-64`).
- La skill describe el enfoque ABI de forma genérica (instructional-content-requirements.md:64-65) pero no traslada estas preguntas guía como criterio de contenido por archivo 01-04.
- **Recomendación:** añadir a `instructional-content-requirements.md` (o a una tabla nueva) las preguntas guía oficiales por momento, y exigir que el `intro`/teoría de cada archivo 01-04 las responda explícitamente.

**1.3 [MEDIA] Notas oficiales por momento (material complementario sugerido) ausentes.**
- Oficial M1: *"se sugiere incluir en el material complementario la descripción de lo que significa la investigación y cómo se formula una pregunta de investigación"* (`:41`); M3: *"…cómo se define la población y la muestra (si aplica)"* (`:56`).
- La skill no recoge estas sugerencias específicas de material complementario por momento.
- **Recomendación:** incluir estas notas como guía de material complementario en los archivos 01 y 03.

**1.4 [BAJA] Nomenclatura de unidad: "Escenario de aprendizaje" vs "momento".**
- La skill obliga a etiquetar cada unidad numerada como **"Escenario de aprendizaje NN"** (SKILL.md:68). El oficial llama "Escenario de aprendizaje" al conjunto del documento de saberes y a cada unidad la trata como **"Momento N"**. No es un error de metodología, pero conviene verificar que la etiqueta visible no choque con la lectura oficial de "momento de aprendizaje".
- **Recomendación:** documentar la equivalencia (unidad numerada = momento ABI) para evitar confusión entre "escenario" (conjunto) y "momento" (unidad).

---

## 2. Cobertura de componentes

El catálogo oficial de **componentes didácticos** (`Componentes_Didácticos.docx.txt:1-19`) es una lista de **piezas de medios producidas** para "fortalecer, ampliar y profundizar": infografía animada, video, videos explicativos, videos interactivos, imagen interactiva, líneas de tiempo, mapas conceptuales, mapa mental, podcast, cómics-historietas, OVA, y juegos didácticos (emparejamientos, arrastrar y soltar, completar frases, preguntas y respuestas, crucigrama-memoria, escenario de decisiones).

La skill, en cambio, trabaja con **tipos de render HTML/SCORM**: theory-block, concept-block, accordion, flashcards, carousel, formula, table, stepper, chart, image/figure, code, quiz, matching, multi-select, fill-blank, video, podcast, timeline, listening-true-false (json-contract.md:289-627). Hay solapamiento parcial pero **no una correspondencia explícita** con el catálogo oficial.

| Componente oficial | ¿Cubierto por la skill? | Tipo skill más cercano | Observación |
|---|---|---|---|
| Infografía animada | NO nombrado | `image`/`figure` (estático) | No hay tipo "infografía"; la skill genera prompt de imagen, no infografía animada. |
| Video | Sí | `video` (json-contract.md:204,624) | OK conceptual. |
| Videos explicativos | Parcial | `video` | No distingue "explicativo" (docente+pizarra). |
| Videos interactivos | NO | — | No hay video con pausas/interacción. |
| Imagen interactiva | NO (≈) | `image` + `figure` | Imagen estática con prompt; sin puntos sensibles. |
| Líneas de tiempo | Sí | `timeline` (json-contract.md:627) | OK (PDF); verificar variante SCORM animada. |
| Mapa conceptual | NO nombrado | `image`/`figure` o `table` | No existe tipo dedicado. |
| Mapa mental | NO nombrado | `image`/`figure` | No existe tipo dedicado. |
| Podcast | Sí | `podcast` (json-contract.md:205,626) | OK. |
| Cómics-historietas | NO | — | Sin soporte. |
| OVA | NO (y prohibido nombrarlo) | — | SKILL.md:67 prohíbe etiquetar contenido como "objeto/OVA"; correcto para no auto-rotularse, pero significa que el componente OVA del catálogo no se produce. |
| Juegos didácticos | Parcial | `quiz`, `matching`, `multi-select`, `fill-blank` | Cubre emparejamientos (matching), preguntas/respuestas (quiz), completar (fill-blank). Faltan: arrastrar y soltar, crucigrama-memoria, escenario de decisiones. |

### Hallazgos

**2.1 [MEDIA] La skill no mapea sus tipos de render al catálogo oficial de componentes didácticos.**
- Oficial: `Componentes_Didácticos.docx.txt:1-19`. Skill: lista de tipos en `json-contract.md` y `component-selection.md`; no hay tabla de equivalencia ni mención a infografía/mapa conceptual/mapa mental/cómic/OVA/juegos por su nombre oficial.
- **Recomendación:** agregar a `component-selection.md` una tabla "componente didáctico oficial → tipo(s) de render de la skill", y declarar explícitamente cuáles del catálogo NO se generan en SCORM/PDF (cómic, video interactivo, imagen interactiva, OVA) para que el adecuador los produzca por fuera.

**2.2 [MEDIA] Faltan tipos de juego didáctico oficiales.**
- Oficial: emparejamientos · arrastrar y soltar · completar frases · preguntas y respuestas · crucigrama-memoria · **escenario de decisiones** (`Componentes_Didácticos.docx.txt:14-19`).
- Skill: cubre matching/fill-blank/quiz/multi-select; no hay "arrastrar y soltar", "crucigrama-memoria" ni "escenario de decisiones".
- **Recomendación:** o bien declarar estos juegos como fuera del alcance SCORM/PDF de la skill, o documentar el mapeo (p.ej. "escenario de decisiones" ≈ `quiz` ramificado / `stepper` de decisión) para no perder la intención didáctica oficial.

**2.3 [BAJA] Mapa conceptual / mapa mental sin representación dedicada.**
- Son componentes oficiales explícitos (`:8-9`). La skill los degradaría a `image`/`figure` con prompt, lo que es aceptable pero no garantiza la pieza esperada.
- **Recomendación:** indicar en la selección de componentes que los mapas conceptual/mental se entregan como `image`/`figure` con prompt estructurado, citando su origen en el catálogo oficial.

> Nota positiva: las obligaciones de la skill (carousel + flashcards + accordion extensos por sección, stepper para matemáticas) son refuerzos pedagógicos válidos, pero son reglas propias de la skill, **no** del catálogo oficial; conviene no presentarlas como exigencias institucionales.

---

## 3. Evaluación y escenarios

La skill refleja bien la **Política de Evaluación Cualitativa de Pregrado (PL-GAP-007)**: niveles cualitativos completos (instructional-content-requirements.md:210-219; evaluacion_cualitativa_pregrado.md:21-31), evaluación formativa/continua/colaborativa, auto/co/heteroevaluación (instructional-content-requirements.md:208-236; evaluacion_cualitativa_pregrado.md:73), momentos inicial/avance/final (evaluacion_cualitativa_pregrado.md:50-58) y porcentajes como pesos transparentes, no como nota. El componente `evaluation-activity` declara RA, criterio, evidencia, técnica, instrumento, peso, momento, tipo de participación, feedback y rúbrica (json-contract.md:538-560) — alineado con la política. El alineamiento ABI↔Wiki es excelente: la Wiki oficial tiene **4 páginas (problematización, teórico, metodológico, resultados)** (`Recurso_Wiki___investigación.docx.txt:3`) que calzan 1:1 con los 4 momentos ABI.

### Hallazgos

**3.1 [ALTA] Diagnóstica: la skill dice 15 preguntas; el oficial son 10 (banco de 15 para aleatorizar).**
- Oficial: *"actividad de revisión automática de **10 preguntas**… Los estudiantes contestarán 10 preguntas, pero se solicita que el docente elabore 15 preguntas para configurar de forma aleatoria"* (`Recurso_evaluación_diagnóstica_Pre.docx.txt:2,42`).
- Skill: *"Evaluacion diagnostica: 15 preguntas cuando aplique"* (`estrategias_didacticas_comunicativas.md:55`). Conflaciona el banco con lo que responde el estudiante y omite la mecánica 10-respondidas/15-banco y la **revisión automática**.
- También falta el vínculo con el **"Balance inicial"** de la política (`Recurso_evaluación_diagnóstica_Pre.docx.txt:1`).
- **Recomendación:** corregir a "diagnóstica: **10 preguntas que responde el estudiante**, banco de 15 para aleatorización, revisión automática, retroalimentación por pregunta (concepto a reforzar/referencia)", y mencionar el insumo para el Balance inicial.

**3.2 [MEDIA] Cuestionario (15 disponibles / 10 contestadas + retroalimentación) no especificado.**
- Oficial: *"cuestionario de mínimo 15 preguntas, los estudiantes contestarán 10… cada pregunta… con su respectiva retroalimentación"* (`Recurso_Cuestionario_Pre.docx.txt:1,3`); insumo del **"Balance de seguimiento"** reflejado en la Wiki (`:64`).
- Skill: tiene `quiz` y `evaluation-activity` genéricos, pero ninguna regla con la mecánica 15/10 ni la retroalimentación positiva/negativa por pregunta como recurso oficial.
- **Recomendación:** añadir una regla de cuestionario formativo (mín. 15 / contesta 10 / 2 intentos / retroalimentación positiva y negativa por pregunta) y enlazarlo al Balance de seguimiento.

**3.3 [MEDIA] Foro tipo debate no está parametrizado.**
- Oficial: *"foro tipo debate… al menos 1 pregunta de apertura… se sugiere que el docente sea el primero en participar"* (`Recurso_Foro_Pre.docx.txt:1,3`).
- Skill: menciona "foro" solo como ejemplo de interacción colaborativa (lineamientos_virtualidad.md:42); no fija tipo debate, pregunta de apertura ni participación inicial del docente.
- **Recomendación:** documentar el foro como recurso evaluativo tipo debate con sus reglas oficiales.

**3.4 [MEDIA] Tareas formativa/sumativa y coevaluativo (taller por fases) sin reglas dedicadas.**
- Oficial: tarea con objetivo, contexto, paso a paso en lenguaje al estudiante, evidencia/producto, tiempo, rúbrica (`Recurso_Coevaluativo_Pre.docx.txt:14-32`); coevaluativo = **taller por fases** (configuración, envío, evaluación entre pares, calificación) y **formativo sin nota** (`:4-11`); la **sumativa es la actividad de la última semana** que integra todos los momentos/RA (oficial-ua.md §5).
- Skill: cubre el concepto de evaluación formativa/sumativa y coevaluación a alto nivel (instructional-content-requirements.md:208-236), pero sin la mecánica de taller por fases ni la regla "última semana = sumativa que integra todo".
- **Recomendación:** añadir reglas concretas para coevaluación (taller 4 fases, formativo) y para la sumativa integradora de cierre.

**3.5 [ALTA] Escenario inicial ABI: estructura y extensión oficiales no especificadas.**
- Oficial: **Introducción (1 pág)** · **Descripción del contexto = líneas de investigación (2-3 págs)** · **Planteamiento de la pregunta de investigación (máx ½ pág)** · **Anexos** (`Escenario_inicial__ABI_Escenario_inicial.docx.txt:1-8`).
- Skill: menciona "escenario inicial con líneas de investigación… ejemplos de preguntas/problemas" (estrategias_didacticas_comunicativas.md:10) y "4 a 5 páginas" (`:56`), pero esa extensión genérica **contradice** la estructura granular oficial de ABI (1 + 2-3 + ½ pág + anexos) y no nombra sus 4 secciones.
- **Recomendación:** definir el escenario inicial ABI con sus 4 partes y extensiones oficiales; alinear el dato "4-5 páginas" con la suma real (~3.5-4.5 págs + anexos) o reemplazarlo por la estructura oficial.

**3.6 [BAJA] Wiki: aprovechar el mapeo 4 momentos ↔ 4 páginas.**
- Oficial: Wiki colaborativa de 4 páginas = los 4 momentos ABI (`Recurso_Wiki___investigación.docx.txt:3`). La skill no documenta esta correspondencia, que es un encaje natural y fuerte de ABI.
- **Recomendación:** documentar que la Wiki de 4 páginas evidencia los 4 momentos ABI (1 página por archivo 01-04).

---

## 4. Métricas y otros

| Métrica oficial | Valor oficial | Skill | Veredicto |
|---|---|---|---|
| Extensión doc saberes por créditos | 30-35 / 40-45 / 50-55 págs, Arial 12, 1.15 (`ABI_DOCUMENTO_DE_SABERES_.docx.txt:14`) | Heurística libre por "páginas por PDF" pedida al usuario (SKILL.md:11,167-176) | DESALINEADO |
| Nº componentes por créditos | 2 / 3 / 4 (`:16`) | Nota orientativa 2/3/4 (instructional-content-requirements.md:124; estrategias:59) | PARCIAL (no obligatorio, no por crédito en SKILL.md) |
| Material complementario por créditos | 3 / 5 / 7 recursos (`:18`) | "graduar según créditos" sin números (estrategias:60) | DESALINEADO |
| Similitud máxima | 30% (`:23,31`) | No mencionado en ninguna parte | AUSENTE |
| Citación | APA 7 + "Elaboración propia" (`:20-22`) | APA 7 sí (SKILL.md:118); "Elaboración propia" no | PARCIAL |
| Última semana = sumativa | Sí (oficial-ua.md §2,§5) | No fijado | AUSENTE |

### Hallazgos

**4.1 [ALTA] No hay parametrización por créditos (extensión, componentes, material complementario).**
- Oficial: tabla idéntica para las 5 metodologías (`ABI_DOCUMENTO_DE_SABERES_.docx.txt:12-18`): 2 cr→30-35 pp/2 comp/3 rec; 3 cr→40-45 pp/3 comp/5 rec; 4 cr→50-55 pp/7 rec.
- Skill: la extensión se basa en "minimum pages per PDF" pedida al usuario (SKILL.md:11) con heurística genérica (SKILL.md:167-176), sin anclar a créditos; el nº de componentes es solo orientativo (instructional-content-requirements.md:124); el material complementario no tiene número por crédito.
- **Recomendación:** añadir una tabla de parametrización por créditos como regla dura: detectar créditos del syllabus y fijar extensión total (30-55 pp), nº de componentes (2/3/4) y material complementario (3/5/7). Nota importante: la extensión oficial es del **documento de saberes completo** dividido entre los 4 momentos (`:42,49,57,65`), no "por PDF" como asume la skill — revisar esta interpretación.

**4.2 [MEDIA] Regla de similitud máxima 30% ausente.**
- Oficial: *"el porcentaje máximo permitido de similitud es de 30%"* (`ABI_DOCUMENTO_DE_SABERES_.docx.txt:23,31`).
- Skill: tiene una sólida validación de unicidad **interna** (content-uniqueness-validation.md, validate_content_package.js) pero nunca menciona el umbral institucional del 30% de similitud externa.
- **Recomendación:** incorporar la regla de originalidad 30% como criterio explícito (y diferenciarla de la unicidad intra-paquete que ya valida).

**4.3 [BAJA] "Elaboración propia" para recursos creados no se exige.**
- Oficial: *"Si crea gráficos, tablas… indíquelo en la citación del recurso ('Elaboración propia')"* (`:20`).
- Skill: usa APA 7 (SKILL.md:118) pero no pide la etiqueta "Elaboración propia" para artefactos creados (charts, tablas, imágenes generadas).
- **Recomendación:** exigir "Elaboración propia" en `caption`/`note` de charts/tablas/imágenes creadas por la skill.

**4.4 [BAJA] Encaje en el proceso de virtualización por fases.**
- Oficial: el documento de saberes (lo que produce esta skill) es producto de la **Fase 5** del proceso PL-VIR-001 (oficial-ua.md §6). La skill modela "Etapas 0-4" en sus references (estrategias:34-42; lineamientos:27-35), que **no coinciden** con la numeración oficial de 11 fases (0-10) y describen un subproceso propio.
- **Recomendación:** alinear la nomenclatura de fases con PL-VIR-001 (0-10) o aclarar que las "Etapas 0-4" de la skill son un submodelo de diseño, situándolo dentro de la Fase 5 oficial.

---

## 5. Tabla de gaps priorizados

| Severidad | Foco | Gap | Recomendación |
|---|---|---|---|
| Crítica | Alineación metodológica | Momento 3 escrito "Metodología e implementación" en toda la skill; oficial = "Metodológico y de implementación" (`ABI_DOCUMENTO_DE_SABERES_.docx.txt:50` vs SKILL.md:27/52/66/69/129/140, instructional-content-requirements.md:71/81/93, json-contract.md:11/72/86, estrategias:26/28/50/58, validate_content_package.js:63, openai.yaml:4) | Reemplazo global del literal en SKILL, references, json-contract, openai.yaml y `ignoredShortValues` del validador. |
| Alta | Métricas | Sin parametrización por créditos (30-55 pp / 2-3-4 comp / 3-5-7 mat. compl.); extensión asumida "por PDF" no por documento completo (`:12-18,42` vs SKILL.md:11,167-176) | Tabla dura por créditos; corregir que la extensión es del documento de saberes dividido entre 4 momentos. |
| Alta | Evaluación y escenarios | Diagnóstica "15 preguntas" en la skill; oficial = 10 contestadas / 15 banco / revisión automática (`Recurso_evaluación_diagnóstica_Pre.docx.txt:2,42` vs estrategias:55) | Corregir a 10/15 + revisión automática + retroalimentación + Balance inicial. |
| Alta | Alineación metodológica | Preguntas guía oficiales por momento (M1-M4) no incorporadas como criterio de contenido (`:37-39,46-48,53-55,62-64`) | Añadir las preguntas guía por momento y exigir que cada archivo 01-04 las responda. |
| Alta | Evaluación y escenarios | Escenario inicial ABI sin estructura/extensión oficiales (intro 1p · contexto 2-3p · pregunta ½p · anexos) (`Escenario_inicial__ABI_Escenario_inicial.docx.txt:1-8` vs estrategias:10,56) | Especificar las 4 partes y extensiones del escenario inicial ABI. |
| Media | Cobertura de componentes | Sin mapeo al catálogo oficial; faltan infografía animada, video interactivo, imagen interactiva, mapa conceptual/mental, cómic, OVA, juegos (arrastrar/crucigrama/escenario de decisiones) (`Componentes_Didácticos.docx.txt:1-19`) | Tabla de equivalencia componente oficial→render; declarar lo no soportado. |
| Media | Evaluación y escenarios | Cuestionario (15/10 + retroalimentación, Balance seguimiento), foro debate, coevaluativo (taller 4 fases, formativo), sumativa de cierre sin reglas dedicadas | Añadir reglas por recurso evaluativo oficial pregrado. |
| Media | Métricas | Similitud máxima 30% no mencionada (`:23,31`) | Incorporar la regla de originalidad 30% (distinta de la unicidad intra-paquete). |
| Baja | Métricas | "Elaboración propia" no exigida para artefactos creados (`:20`) | Pedir la etiqueta en caption/note de charts/tablas/imágenes generadas. |
| Baja | Otro | "Etapas 0-4" de la skill no coinciden con las 11 fases oficiales (0-10); documento de saberes = Fase 5 (oficial-ua.md §6) | Alinear nomenclatura o situar el submodelo dentro de la Fase 5. |
| Baja | Cobertura de componentes | Mapa conceptual/mental sin tipo dedicado (`:8-9`) | Documentar entrega como image/figure con prompt estructurado. |
| Baja | Alineación metodológica | Notas oficiales de material complementario por momento (M1, M3) ausentes (`:41,56`) | Recoger las sugerencias en archivos 01 y 03. |

---

### Nota de método
No se modificó la skill; esta es una auditoría documental. Las referencias `archivo:linea` del lado skill apuntan a `/Users/eximius/Documents/Programming/generacion-contenido/aprendizaje-basado-investigacion-scorm/`; las del lado oficial a `scratchpad/docs-txt/` y a `scratchpad/oficial-ua.md`.
