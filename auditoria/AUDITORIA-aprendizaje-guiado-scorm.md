# Auditoría — aprendizaje-guiado-scorm (AG)

Auditor: Diseño Instruccional, Universidad de América
Fecha: 2026-06-27
Skill auditada: `/Users/eximius/Documents/Programming/generacion-contenido/aprendizaje-guiado-scorm/`
Base oficial: `scratchpad/oficial-ua.md` + `scratchpad/docs-txt/*` (texto plano de los .docx/.xlsx oficiales)

---

## Resumen ejecutivo

**Alineación global: BAJA.**

La skill es sólida en ingeniería de contenido (separación SCORM/PDF, validación LaTeX/KaTeX, unicidad 7×5, profundidad de bloques teóricos, evaluación cualitativa), pero **contradice el modelo metodológico oficial de Aprendizaje Guiado en su núcleo**: impone una estructura fija que el documento de saberes oficial no define, y choca con las métricas y el catálogo de componentes institucionales.

- **CRÍTICO — Estructura metodológica inventada.** El documento de saberes AG dice literalmente que "la presente didáctica se divide en el **número de temas que el docente considere necesarios**" (Tema 1, 2, 3 … n), sin número fijo. La skill impone **7 contenidos × 5 secciones temáticas fijas (35 secciones)** y **4 "Fase 1–4"** como momentos oficiales. Ni los "7 contenidos", ni las "5 secciones", ni las "4 fases" existen en el oficial.
- **CRÍTICO — Etiqueta "Fase" prohíbe lo que el oficial usa.** La skill obliga a `Fase 1…4` y **prohíbe expresamente "Etapa" y "Tema o etapa"** (SKILL.md:69), pero la tabla de diseño oficial usa columnas **"Temas"** y **"Propósitos por etapa"**. La skill prohíbe el vocabulario oficial.
- **ALTA — Métricas por créditos ausentes.** El oficial fija extensión por créditos (30–35 / 40–45 / 50–55 págs) y material complementario (3/5/7 recursos). La skill usa una heurística de páginas propia ("mínimo de páginas por PDF" definido por el usuario) y no liga la extensión a créditos. Solo los componentes (2/3/4) están bien.
- **ALTA — Evaluación diagnóstica con número equivocado.** El oficial: el estudiante contesta **10**, el docente elabora **15** para aleatorizar. La skill dice "**Evaluacion diagnostica: 15 preguntas**" (estrategias:53) sin la distinción 10-contestadas/15-banco.
- **MEDIA — Catálogo de componentes desalineado por nombre.** El catálogo oficial nombra infografía animada, mapa conceptual/mental, podcast, cómic, línea de tiempo, OVA y juegos didácticos (crucigrama, emparejamientos, arrastrar y soltar, escenario de decisiones). La skill trabaja con una taxonomía de app distinta (theory-block, accordion, flashcards, carousel, stepper, chart…); solo `timeline` y `podcast` coinciden por nombre. No hay mapeo explícito oficial↔app.

---

## 1. Alineación metodológica

> Foco: que momentos/temas, su número, nombres, orden y enfoque coincidan con el documento de saberes AG y el escenario inicial, y que se respeten las preguntas guía.

### Hallazgo 1.1 — AG es "N temas variables", la skill impone 7 contenidos fijos · **Severidad: CRÍTICA**

**Oficial:** "La presente didáctica se divide en el **número de temas que el docente considere necesarios** para garantizar el cumplimiento del resultado de aprendizaje" y "Agregue tantas filas sean necesarias según el número de temas correspondientes" — `docs-txt/Escenario_de_aprendizaje__AG_DOCUMENTO_DE_SABERES.docx.txt:4-5`, además "Tema 1 / Tema 2 / Tema 3 / **Tema n**" (líneas 6-17) y "NOTA: replique la estructura según la cantidad de temas a desarrollar" (línea 49).

**Skill:** impone un paquete rígido de **siete** archivos JSON, cada uno con seis secciones (intro + 5 temáticas), o sea 35 secciones temáticas fijas:
- "Convert the user request … into a package of **seven** reusable `subject` JSON files" — `SKILL.md:10`
- "Each of the seven JSON files must contain exactly six SCORM sections and exactly six PDF sections: one introductory section plus five content sections" — `SKILL.md:36`
- "Across the full package, the **35 thematic sections (7 contenidos x 5 secciones)** must be … unique" — `SKILL.md:54`
- "Every new asignatura generation must produce exactly seven independent JSON files" — `references/instructional-content-requirements.md:87`

**Evidencia del choque:** el oficial nunca menciona "7 contenidos" ni "5 secciones"; el número de temas es decisión docente atada al RA y a los créditos.

**Recomendación:** sustituir la regla "7 archivos × 5 secciones fijas" por **N temas variables** derivados del syllabus/RA (mínimo razonable, sin tope fijo). El número de unidades debe nacer del análisis curricular y de la tabla "Temas / RA / Propósitos por etapa / Preguntas orientadoras", no de un número impuesto.

### Hallazgo 1.2 — "Fase 1–4" inexistente en AG; la skill prohíbe el vocabulario oficial · **Severidad: CRÍTICA**

**Oficial:** AG **no define fases**. El documento de saberes estructura el contenido en **Temas** y la tabla de diseño global tiene la columna **"Propósitos por etapa"** y **"Temas / Resultados de aprendizaje / Propósitos por etapa / Preguntas orientadoras"** — `docs-txt/Escenario_de_aprendizaje__AG_DOCUMENTO_DE_SABERES.docx.txt:45`.

**Skill:** fija cuatro fases como "momentos oficiales" y prohíbe usar "Etapa"/"Tema o etapa":
- "Official AG moments: Fase 1 / Fase 2 / Fase 3 / Fase 4" — `references/instructional-content-requirements.md:65-70`
- `subject.methodology.moments: ["Fase 1", "Fase 2", "Fase 3", "Fase 4"]` — `SKILL.md:66`
- "use **Fase** as the label … **do not write `Etapa` or `Tema o etapa`**" — `SKILL.md:69`
- "Check methodology moments and tables use `Fase`, never `Etapa` or `Tema o etapa`" — `SKILL.md:140`
- Tabla "AG - Aprendizaje Guiado | Fase 1; Fase 2; Fase 3; Fase 4" — `references/estrategias_didacticas_comunicativas.md:26`
- El validador incluso lista "Fase 1…4" como metadata repetible permitida — `scripts/validate_content_package.js:61-64`

**Evidencia del choque:** la skill no solo inventa 4 fases (que no existen en AG), sino que **prohíbe exactamente la palabra que el oficial sí emplea** ("etapa", en "Propósitos por etapa"; "tema", en "Temas").

> Nota de contexto: las "Fase 0–10" del proceso de virtualización (PL-VIR-001) son fases del **proceso de producción**, no momentos del documento de saberes AG. La skill parece haber confundido ambos planos: el producto que genera (documento de saberes) es salida de la **Fase 5** del proceso (`oficial-ua.md:96`), y dentro de él no hay "fases", hay temas.

**Recomendación:** eliminar "Fase 1–4" como momentos de AG. Usar la nomenclatura oficial: **"Tema 1 … Tema n"** y la tabla **Temas / RA / Propósitos por etapa / Preguntas orientadoras**. Retirar la prohibición de "Etapa/Tema o etapa" (que es el término oficial) y, en su lugar, prohibir "Fase" como etiqueta de unidad didáctica del documento de saberes. Ajustar `subject.methodology.moments`, `methodologyMoment`, el validador (`ignoredShortValues`) y todas las referencias.

### Hallazgo 1.3 — Preguntas orientadoras / propósito por etapa no operacionalizados · **Severidad: ALTA**

**Oficial:** cada tema se diseña con la tabla **"Temas | Resultados de aprendizaje | Propósitos por etapa | Preguntas orientadoras"** — `docs-txt/Escenario_de_aprendizaje__AG_DOCUMENTO_DE_SABERES.docx.txt:45-48`. El escenario inicial de AG es precisamente "preguntas orientadoras" (propósito + ≥1 pregunta orientadora por RA) — `oficial-ua.md:67`.

**Skill:** no exige que cada tema declare su **propósito por etapa** ni su(s) **pregunta(s) orientadora(s)** como campos estructurales. La estructura impuesta es "intro + 5 secciones" con bloques teóricos, sin la cuadrícula oficial RA↔propósito↔pregunta orientadora. La regla más cercana, "Use syllabus learning outcomes as the backbone" (`SKILL.md:48`), no captura la columna "Preguntas orientadoras" ni "Propósitos por etapa".

**Recomendación:** añadir como obligatorio que cada tema/unidad lleve `propositoEtapa` y `preguntasOrientadoras[]` derivadas del RA, y que el contenido del tema responda esas preguntas (escenario inicial de AG = preguntas orientadoras, no problema/reto/caso).

### Hallazgo 1.4 — "Escenario de aprendizaje NN" como etiqueta de la unidad · **Severidad: MEDIA**

**Skill:** "Each numbered unit is called an **'Escenario de aprendizaje'**, not 'Contenido'" — `SKILL.md:68`. El oficial llama a la unidad **"Tema"** dentro del documento de saberes; "Escenario de aprendizaje" es, en la taxonomía oficial, el **macro-escenario** (carpeta `Escenario de aprendizaje/` que agrupa documento de saberes + componentes + material), no cada unidad numerada. Hay riesgo de colisión terminológica con el oficial.

**Recomendación:** alinear el rótulo de la unidad con el término oficial ("Tema NN") o documentar explícitamente la equivalencia para evitar que "Escenario de aprendizaje 03" se confunda con el escenario macro.

---

## 2. Cobertura de componentes

> Foco: que los componentes generados cubran/correspondan al catálogo oficial de componentes didácticos.

### Catálogo oficial vs. taxonomía de la skill

Catálogo oficial (`docs-txt/Escenario_de_aprendizaje__COMPONENTES_DIDÁCTICOS__Componentes_Didácticos.docx.txt:2-19`) frente a los tipos soportados por la skill (`references/json-contract.md`, `references/component-selection.md`):

| Componente oficial | ¿Cubierto por la skill? | Tipo(s) de la skill / observación |
|---|---|---|
| Infografía animada | No (por nombre) | Sin tipo equivalente; podría aproximarse con `image`/`figure`, pero no es lo mismo ni se nombra |
| Video | Parcial | `video` existe (SCORM), pero el oficial distingue "Video" genérico |
| Videos explicativos (docente/pizarra/pantalla) | No explícito | No hay tipo `video-explicativo` ni guion de docente |
| Videos interactivos (pausas/participación) | No | Sin tipo de video con pausas interactivas |
| Imagen interactiva (puntos sensibles) | No | `image`/`figure` son estáticas; no hay "hotspots" |
| Líneas de tiempo | Sí (por nombre) | `timeline` — `references/json-contract.md:630`, `component-selection.md:59` |
| Mapas conceptuales | No (por nombre) | Solo mención textual de "mapa conceptual" como composición visual (`estrategias:76`); sin tipo de componente |
| Mapa mental | No | Sin tipo de componente |
| Podcast | Sí (por nombre) | `podcast` — `references/json-contract.md:208,629` |
| Comics-historietas | No | Sin tipo de componente |
| Objeto virtual de aprendizaje (OVA) | No — y además **prohibido nombrarlo** | `SKILL.md:67` prohíbe etiquetar el contenido como OVA/objeto de aprendizaje |
| Juegos didácticos (emparejamientos, arrastrar y soltar, completar frases, preguntas y respuestas, crucigrama-memoria, escenario de decisiones) | Parcial | `matching`≈emparejamientos, `fill-blank`≈completar frases, `quiz`/`multi-select`≈preguntas y respuestas; **faltan** arrastrar y soltar, crucigrama-memoria, escenario de decisiones |

**Hallazgo 2.1 — Desalineación de nomenclatura del catálogo · Severidad: MEDIA.** La skill define una taxonomía orientada a la app (theory-block, accordion, flashcards, carousel, stepper, chart, table, code…) que no mapea explícitamente al catálogo oficial. La intención es válida (los componentes de la skill son los "renderizables"), pero no existe una **tabla de correspondencia** oficial↔skill, lo que dificulta auditar cobertura y puede dejar fuera componentes oficiales solicitados por un programa.

**Hallazgo 2.2 — Componentes oficiales sin equivalente · Severidad: MEDIA.** Sin equivalente: infografía animada, imagen interactiva, mapa conceptual, mapa mental, cómic, OVA, y los juegos "arrastrar y soltar", "crucigrama-memoria", "escenario de decisiones". Algunos (mapa conceptual/mental, imagen interactiva, cómic) son recursos didácticos centrales del catálogo.

**Hallazgo 2.3 — Prohibición de "OVA" · Severidad: BAJA.** `SKILL.md:67` prohíbe usar el acrónimo OVA en texto al estudiante; sin embargo, el oficial lista "Objeto virtual de aprendizaje (OVA)" como componente didáctico legítimo (`Componentes_Didácticos.docx.txt:12`). La prohibición es razonable para no etiquetar TODO el contenido como OVA, pero no debería impedir referirse al componente OVA cuando un tema lo requiera.

**Recomendación (sección 2):** (a) añadir una **tabla de mapeo oficial↔skill** en `component-selection.md`; (b) declarar qué componentes oficiales se cubren con cuáles tipos de la app y cuáles quedan fuera por limitación del renderizador; (c) si la app lo permite, agregar tipos/variantes para imagen interactiva, mapa conceptual/mental y los juegos faltantes (arrastrar y soltar, crucigrama, escenario de decisiones); (d) suavizar la prohibición de "OVA" para distinguir "no etiquetar todo el contenido como OVA" de "poder usar un componente OVA".

---

## 3. Evaluación y escenarios

> Foco: diagnóstica, cuestionario, foro, tareas formativa/sumativa, coevaluación, wiki, escenario inicial/evaluativo, evaluación cualitativa y momentos.

### Hallazgo 3.1 — Diagnóstica: número de preguntas incorrecto · **Severidad: ALTA**

**Oficial:** "actividad de revisión automática de **10 preguntas**" y "Los estudiantes contestarán **10 preguntas**, pero se solicita que el docente elabore **15 preguntas** para configurar de forma aleatoria" — `docs-txt/Escenario_evaluativo__PREGRADO__Recurso_evaluación_diagnóstica_Pre.docx.txt:2,12,42`. Cada pregunta con retroalimentación (concepto a reforzar / referencia) — líneas 10,20,30,40. Es insumo del "Balance inicial" (PL-GAP-007) — línea 1.

**Skill:** "**Evaluacion diagnostica: 15 preguntas** cuando aplique" — `references/estrategias_didacticas_comunicativas.md:53`. No menciona la regla "10 contestadas de 15 disponibles" ni el rol de insumo del Balance inicial.

**Recomendación:** corregir a **diagnóstica = 10 preguntas que contesta el estudiante, 15 elaboradas para aleatorización**; exigir retroalimentación por pregunta (positiva/negativa, con concepto a reforzar y referencia) y declarar que alimenta el "Balance inicial".

### Hallazgo 3.2 — Cuestionario (15 banco / 10 contestadas + retro) no especificado · **Severidad: MEDIA**

**Oficial:** "cuestionario de **mínimo 15 preguntas**, los estudiantes contestarán **10**" con retroalimentación por pregunta; alimenta el "Balance de seguimiento" reflejado en la Wiki — `docs-txt/Escenario_evaluativo__PREGRADO__Recurso_Cuestionario_Pre.docx.txt:1,64`.

**Skill:** no fija la regla 15/10 del cuestionario formativo. La evaluación se trata genéricamente ("diagnostic, formative, and final/summative" — `instructional-content-requirements.md:56`), sin la métrica del cuestionario ni su vínculo con el Balance de seguimiento / Wiki.

**Recomendación:** añadir regla de cuestionario formativo (banco ≥15, 10 contestadas, 2 intentos como ejemplo oficial, retro por pregunta) y su relación con el Balance de seguimiento y la Wiki.

### Hallazgo 3.3 — Foro debate, coevaluación (taller) y wiki no modelados · **Severidad: MEDIA**

**Oficial:** recursos evaluativos pregrado incluyen **foro tipo debate** (≥1 pregunta de apertura, docente participa primero), **coevaluativo** (taller por fases: configuración, envío, evaluación entre pares, calificación) y **wiki/investigación** (actividad colaborativa de 4 páginas: problematización, teórico, metodológico, resultados) — `oficial-ua.md:78,81,82`; archivos `Recurso_Foro_Pre.docx.txt`, `Recurso_Coevaluativo_Pre.docx.txt`, `Recurso_Wiki___investigación.docx.txt`.

**Skill:** menciona foro/coevaluación de forma genérica ("incluir interaccion o colaboracion: foro, coevaluacion…" — `lineamientos_virtualidad.md:40`; "autoevaluacion, coevaluacion y heteroevaluacion" — `estrategias:30`), pero **no modela** la estructura específica del foro debate (pregunta de apertura + participación docente primero), del taller coevaluativo por fases ni de la wiki de 4 páginas.

**Recomendación:** incorporar plantillas/recursos para foro debate, taller coevaluativo por fases y wiki/investigación de 4 secciones, alineadas a los formatos oficiales pregrado.

### Hallazgo 3.4 — Tarea sumativa última semana / integración de momentos y RA · **Severidad: MEDIA**

**Oficial:** "la **última semana** será destinada para la actividad evaluativa **sumativa**" — `AG_DOCUMENTO_DE_SABERES.docx.txt:50`; la sumativa integra TODOS los momentos y RA — `oficial-ua.md:80`.

**Skill:** no fija que la última unidad/semana sea sumativa integradora. La evaluación sumativa se menciona, pero sin la regla temporal ni la integración explícita de todos los temas/RA.

**Recomendación:** añadir regla: la última semana = tarea evaluativa sumativa integradora de todos los temas y RA; declarar RA, criterio, evidencia, técnica, instrumento, momento (final), participación, retroalimentación y nivel cualitativo.

### Hallazgo 3.5 — Evaluación cualitativa y momentos: BIEN alineado · **Severidad: BAJA (fortaleza)**

**Oficial:** evaluación formativa, continua, cualitativa; momentos inicial/avance/final; auto/co/heteroevaluación; rúbrica analítica (saber/hacer) y holística (ser/ser con otros) — `oficial-ua.md:84`, PL-GAP-007.

**Skill:** `references/evaluacion_cualitativa_pregrado.md` reproduce fielmente PL-GAP-007: tipos obligatorios (líneas 13-18), escala cualitativa (20-31), momentos inicial 10-25% / avance 50% / final 100% (50-56), rúbricas analítica/holística (42-48), y la regla "toda actividad declara RA, criterio, evidencia, técnica, instrumento, peso, momento, participación, retroalimentación y nivel cualitativo" (72). **Esta es la parte mejor alineada de la skill.** Mantener.

---

## 4. Métricas y otros

> Foco: extensión por créditos, nº componentes, material complementario, similitud máx 30%, APA 7, encaje en el proceso de fases.

### Hallazgo 4.1 — Extensión NO ligada a créditos · **Severidad: ALTA**

**Oficial:** extensión del documento de saberes por créditos: **2 créditos 30–35 págs · 3 créditos 40–45 · 4 créditos 50–55**, Arial 12, interlineado 1.15 — `AG_DOCUMENTO_DE_SABERES.docx.txt:25-27`.

**Skill:** la extensión la define el usuario como "minimum pages per PDF" y se aplica a cada uno de los 7 PDFs (`SKILL.md:11,39`; `instructional-content-requirements.md:106`); la "Page Extension Heuristic" (`SKILL.md:167-176`) usa rangos genéricos (1 / 3-5 / 6-10 / 10+ págs) **sin relación con créditos**. Además, aplicar la extensión "a cada uno de los 7 PDFs" puede multiplicar arbitrariamente la extensión total respecto a la regla oficial (que es por documento de saberes total según créditos).

**Recomendación:** parametrizar la extensión por créditos (30-35 / 40-45 / 50-55) como regla por defecto, y especificar Arial 12 / interlineado 1.15. Reconciliar el modelo "7 PDFs × N páginas" con la extensión total oficial del documento de saberes.

### Hallazgo 4.2 — Material complementario no graduado a 3/5/7 · **Severidad: MEDIA**

**Oficial:** **3 / 5 / 7 recursos** para 2 / 3 / 4 créditos — `AG_DOCUMENTO_DE_SABERES.docx.txt:30-31`.

**Skill:** "Material complementario: graduar lecturas, videos y enlaces segun creditos y complejidad" — `estrategias:58`; no fija las cantidades 3/5/7. (El número de **componentes** 2/3/4 sí está correcto — `estrategias:57`, `instructional-content-requirements.md:125`.)

**Recomendación:** fijar material complementario = 3 (2 cr) / 5 (3 cr) / 7 (4 cr) recursos.

### Hallazgo 4.3 — Similitud máxima 30% ausente · **Severidad: ALTA**

**Oficial:** "el porcentaje máximo permitido de **similitud es de 30%**" (regla de originalidad, verificada con gestión de referencias) — `AG_DOCUMENTO_DE_SABERES.docx.txt:36,40,44`.

**Skill:** **no menciona el 30% de similitud** en ningún archivo (grep sin resultados). La skill tiene una fuerte validación de **unicidad interna** (no repetir entre secciones — `content-uniqueness-validation.md`), pero eso es repetición intra-paquete, no la regla institucional de **similitud externa máx 30%**.

**Recomendación:** añadir regla explícita de similitud externa ≤30% y la verificación con herramientas de gestión de referencias, además de la unicidad interna ya existente.

### Hallazgo 4.4 — APA 7 y "Elaboración propia": alineado · **Severidad: BAJA (fortaleza)**

**Oficial:** citar todo en APA 7; "Elaboración propia" para recursos creados — `AG_DOCUMENTO_DE_SABERES.docx.txt:33-35`.

**Skill:** "Use APA 7 references" — `SKILL.md:118`; `instructional-content-requirements.md:268`. **Falta** la convención "Elaboración propia" para recursos creados (gráficos, tablas, esquemas).

**Recomendación:** añadir la regla "Elaboración propia" en la citación de recursos propios.

### Hallazgo 4.5 — Encaje en el proceso de fases (PL-VIR-001) · **Severidad: BAJA**

**Oficial:** el documento de saberes (lo que genera la skill SCORM) es producto de la **Fase 5** del proceso de virtualización de 11 fases (0-10) — `oficial-ua.md:88-97`.

**Skill:** las referencias mencionan "Fases 0 a 4" como aplicación de planeación (`lineamientos_virtualidad.md:27-33`; `estrategias:32-40`), pero el proceso oficial tiene 11 fases (0-10) y el producto de la skill es la Fase 5. La skill no ubica con precisión su salida en la Fase 5 ni reconoce las fases 5-10. (Confusión adicional con el uso de "Fase" como momento AG — ver Hallazgo 1.2.)

**Recomendación:** documentar que la skill produce el documento de saberes de la **Fase 5** dentro del proceso de 11 fases; separar conceptualmente "fases del proceso" de "momentos/temas del documento de saberes".

---

## 5. Tabla de gaps priorizados

| Severidad | Foco | Gap | Recomendación |
|---|---|---|---|
| **Crítica** | Alineación metodológica | AG es "N temas variables" (Tema 1…n) pero la skill impone 7 contenidos × 5 secciones = 35 fijas (`SKILL.md:10,36,54`) | Derivar N temas del syllabus/RA; eliminar el número fijo 7×5 |
| **Crítica** | Alineación metodológica | "Fase 1–4" inventado como momentos AG y prohibición de "Etapa/Tema o etapa" que el oficial sí usa (`SKILL.md:66,69`; `instructional-content-requirements.md:65-70`) | Usar "Tema 1…n" + tabla Temas/RA/Propósitos por etapa/Preguntas orientadoras; retirar prohibición del vocabulario oficial; ajustar validador (`validate_content_package.js:61-64`) |
| **Alta** | Métricas | Extensión no ligada a créditos (oficial 30-35/40-45/50-55) — `SKILL.md:167-176` | Parametrizar por créditos; Arial 12 / interlineado 1.15 |
| **Alta** | Métricas | Similitud máx 30% ausente en toda la skill | Añadir regla de similitud externa ≤30% |
| **Alta** | Evaluación | Diagnóstica = 15 en la skill (`estrategias:53`) vs. 10 contestadas / 15 banco oficial | Corregir a 10/15 + retro por pregunta + Balance inicial |
| **Alta** | Alineación metodológica | Propósito por etapa y preguntas orientadoras no operacionalizados por tema | Exigir `propositoEtapa` y `preguntasOrientadoras[]` por tema |
| **Media** | Cobertura componentes | Catálogo oficial sin mapeo a la taxonomía de la app; faltan infografía, imagen interactiva, mapa conceptual/mental, cómic, OVA, juegos (arrastrar/soltar, crucigrama, escenario de decisiones) | Tabla de mapeo oficial↔skill; agregar tipos faltantes donde la app lo permita |
| **Media** | Evaluación | Cuestionario 15/10 + retro + Balance de seguimiento/Wiki no especificado | Añadir regla de cuestionario formativo |
| **Media** | Evaluación | Foro debate, taller coevaluativo por fases y wiki de 4 páginas no modelados | Plantillas para foro/coevaluación/wiki oficiales |
| **Media** | Evaluación | Sumativa última semana / integración de todos los temas y RA no fijada (`AG_DOCUMENTO_DE_SABERES.docx.txt:50`) | Regla: última semana = sumativa integradora |
| **Media** | Métricas | Material complementario no graduado a 3/5/7 (`estrategias:58`) | Fijar 3/5/7 recursos por créditos |
| **Media** | Alineación metodológica | "Escenario de aprendizaje NN" como unidad colisiona con el macro-escenario oficial (`SKILL.md:68`) | Alinear con "Tema NN" o documentar la equivalencia |
| **Baja** | Cobertura componentes | Prohibición de "OVA" choca con el componente OVA oficial (`SKILL.md:67`) | Distinguir "no etiquetar todo como OVA" de "componente OVA" |
| **Baja** | Métricas | Falta convención "Elaboración propia" (oficial `AG_…:33`) | Añadir regla "Elaboración propia" |
| **Baja** | Otros | Encaje en proceso de fases impreciso (producto = Fase 5 de 11) | Documentar salida en Fase 5; separar "fases del proceso" de "temas del documento" |

---

### Fortalezas confirmadas (mantener)

- Evaluación cualitativa PL-GAP-007 reproducida con fidelidad (`references/evaluacion_cualitativa_pregrado.md`): tipos, escala, momentos inicial/avance/final, rúbricas analítica/holística, auto/co/heteroevaluación.
- Componentes didácticos por créditos = 2/3/4 correcto (`estrategias:57`).
- Validación LaTeX/KaTeX, unicidad de contenido 7×5, separación SCORM/PDF y profundidad de bloques teóricos: ingeniería de contenido robusta (aunque la estructura 7×5 contradice el modelo oficial).
- APA 7 presente (`SKILL.md:118`).
