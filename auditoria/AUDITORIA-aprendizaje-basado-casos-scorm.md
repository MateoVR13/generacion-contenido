# Auditoría — aprendizaje-basado-casos-scorm (ABC)

Auditor: Diseño Instruccional UA · Fecha: 2026-06-27
Skill auditada: `/Users/eximius/Documents/Programming/generacion-contenido/aprendizaje-basado-casos-scorm/`
Base oficial: `scratchpad/oficial-ua.md` + `scratchpad/docs-txt/` (texto plano de los .docx oficiales)

## Resumen ejecutivo

**Alineación global: MEDIA.**

La skill ABC acierta en lo estructural duro de la metodología: usa exclusivamente ABC, define **4 momentos** (uno por archivo JSON), el momento 1 ("Presentación y análisis del caso") y el momento 4 ("Conclusiones") coinciden literalmente con el documento de saberes, y el orden es correcto. El enfoque didáctico (análisis de caso real, preguntas/micro casos, conclusiones) está bien capturado. Sin embargo hay desviaciones que requieren corrección:

- **CRÍTICO — Nombres literales de M2/M3 mal escritos.** La skill usa "Análisis **de pregunta orientadora** o micro caso 1/2" en TODOS los archivos (18 ocurrencias); el documento de saberes oficial dice "Análisis **pregunta direccionadora 1** o micro caso 1" y "…direccionadora 2 o micro caso 2". La skill además bloquea explícitamente el cambio ("Write exactly…"), por lo que perpetúa el literal incorrecto en `subject.methodology.moments`, badges y tablas.
- **ALTO — Evaluación diagnóstica fijada en "15 preguntas".** El oficial pregrado: el estudiante contesta **10**, el docente elabora **15** para aleatorización. La skill (estrategias_didacticas:53) solo dice "15 preguntas cuando aplique", omitiendo el contestará-10 / banco-15.
- **ALTO — Métricas por créditos incompletas.** Componentes 2/3/4 sí están; pero la **extensión por créditos (30–35 / 40–45 / 50–55 págs)** y el **material complementario (3/5/7 recursos)** no están parametrizados por créditos, y la **similitud máxima 30%** no se menciona en ninguna parte de la skill.
- **MEDIO — Catálogo de componentes oficial sin correspondencia.** No hay tipo dedicado para infografía animada, mapa conceptual, mapa mental, cómic/historieta, OVA ni juegos didácticos (crucigrama, escenario de decisiones, emparejamientos como "juego").
- **MEDIO — Escenario inicial ABC y recursos del escenario evaluativo** (título llamativo, 2 preguntas direccionadoras/micro casos, anexos 2 págs, foro debate, coevaluativo por fases, wiki, tarea sumativa de última semana) no están modelados; parcialmente justificable porque la skill produce el documento de saberes (Fase 5), no el aula Moodle completa.

---

## 1. Alineación metodológica

| # | Severidad | Hallazgo |
|---|---|---|
| 1.1 | **Crítica** | Nombre literal de los momentos 2 y 3 incorrecto |
| 1.2 | Baja | Momentos 1 y 4 correctos (sin acción) |
| 1.3 | Media | Preguntas guía oficiales por momento no incorporadas como regla de contenido |
| 1.4 | Baja | Número (4), orden y enfoque correctos |

### 1.1 — CRÍTICA: literal de M2/M3 ("orientadora" en vez de "direccionadora 1/2")

**Oficial** (`docs-txt/Escenario_de_aprendizaje__ABC_DOCUMENTO_DE_SABERES_.docx.txt:37,43`):
- `Momento 2: Análisis pregunta direccionadora 1 o micro caso 1`
- `Momento 3: Análisis pregunta direccionadora 2 o micro caso 2`

**Skill** (literal repetido y bloqueado):
- `SKILL.md:27` — `02 = "Análisis de pregunta orientadora o micro caso 1", 03 = "Análisis de pregunta orientadora o micro caso 2"`
- `SKILL.md:66` — `subject.methodology.moments: [...,"Análisis de pregunta orientadora o micro caso 1","Análisis de pregunta orientadora o micro caso 2",...]`
- `SKILL.md:69` — `Write exactly ... "Análisis de pregunta orientadora o micro caso 1", "Análisis de pregunta orientadora o micro caso 2" ... do not reorder or rename`
- `SKILL.md:52, 140` (checklist), `references/instructional-content-requirements.md:68-69,79,90-91`, `references/json-contract.md:10-11,72,86`, `references/estrategias_didacticas_comunicativas.md:26`

Hay **dos** errores en un mismo literal:
1. Palabra: "orientadora" debe ser "**direccionadora**" (el escenario inicial oficial y el documento de saberes usan "preguntas direccionadoras"; ver `docs-txt/Escenario_inicial__ABC_Escenario_inicial.docx.txt:4,8`).
2. Posición del número: oficial = "direccionadora **1** o micro caso 1" (el ordinal va sobre la pregunta direccionadora); skill = "orientadora o micro caso 1" (el ordinal solo queda sobre el micro caso). El nombre oficial numera ambas ramas.

Verificación de conteo: `grep "direccionadora"` en la skill = 1 ocurrencia (irrelevante, en estrategias:10); `grep "orientadora"` = 18. El término correcto está prácticamente ausente.

**Recomendación:** reemplazar globalmente los literales de los momentos 2 y 3 por `Análisis pregunta direccionadora 1 o micro caso 1` y `Análisis pregunta direccionadora 2 o micro caso 2` en SKILL.md (líneas 27, 52, 66, 69, 140), `instructional-content-requirements.md` (68-69, 79, 90-91), `json-contract.md` (10-11, 72, 86, 97) y `estrategias_didacticas_comunicativas.md` (26, 48, 56). Mantener "do not reorder or rename" pero con el literal correcto.

### 1.3 — MEDIA: preguntas guía oficiales por momento no son regla de contenido

El documento de saberes trae preguntas guía explícitas que el contenido de cada momento debe responder:
- M1 (`DOCUMENTO_DE_SABERES:35`): "¿Qué conceptos y contextos se deben tener en cuenta para abordar el caso de estudio?"; deconstruir el caso.
- M2/M3 (`:40-41,45-47`): "¿Cuál es la pregunta direccionadora o micro caso de análisis…?" y "¿Qué ejemplos son pertinentes para orientar el caso?"
- M4 (`:52-54`): conceptos/procedimientos a reforzar, oportunidades de mejora, aspectos que favorecen el resultado exitoso.

La skill describe el enfoque ABC genéricamente (`instructional-content-requirements.md:83`) pero **no exige** que cada archivo responda las preguntas guía de su momento. No aparece "deconstruir el caso", "ejemplos pertinentes para orientar el caso" ni "oportunidades de mejora" como criterio.

**Recomendación:** añadir, por momento, las preguntas guía oficiales como checklist de contenido en `instructional-content-requirements.md` (sección "Fixed Virtual Methodology"), para que el momento 4 cierre con conceptos/procedimientos a reforzar y oportunidades de mejora, y M2/M3 declaren explícitamente la pregunta direccionadora/micro caso y sus ejemplos.

### 1.2 / 1.4 — Correctos
M1 = "Presentación y análisis del caso" y M4 = "Conclusiones" coinciden 1:1 con `DOCUMENTO_DE_SABERES:32,49`. Número (4), orden (caso → direccionadora 1 → direccionadora 2 → conclusiones) y mapeo contenido-NN→momento son correctos (`SKILL.md:10,27,52`). Sin acción.

---

## 2. Cobertura de componentes

El catálogo oficial (`docs-txt/...Componentes_Didácticos.docx.txt:2-19`) define 12 familias. La skill ofrece un catálogo HTML propio (`references/json-contract.md:185-213, 624-634`). Correspondencia:

| Componente oficial | ¿Cubierto en la skill? | Tipo/equivalente en la skill |
|---|---|---|
| Infografía animada | **No** (parcial) | Solo `image`/`figure` estáticos; sin tipo de infografía |
| Video | Sí | `video` (json-contract:204) |
| Videos explicativos | Parcial | `video` genérico, sin distinción explicativo |
| Videos interactivos | **No** | No hay tipo de video con pausas/preguntas embebidas |
| Imagen interactiva (puntos sensibles) | **No** | `image` es estática; no hay hotspots |
| Línea de tiempo | Sí | `timeline` (json-contract:627) |
| Mapa conceptual | **No** | Sin tipo; se sugiere como prompt de `image` (estrategias:76) |
| Mapa mental | **No** | Igual: solo como imagen/prompt |
| Podcast | Sí | `podcast` (json-contract:205,626) |
| Cómic / historieta | **No** | Sin tipo dedicado |
| OVA | **No / por diseño** | La skill ES el OVA; además prohíbe rotular contenido como "OVA" (SKILL.md:67) |
| Juegos didácticos (emparejamientos, arrastrar y soltar, completar, P&R, crucigrama, memoria, escenario de decisiones) | Parcial | `matching`, `fill-blank`, `quiz`, `multi-select` cubren emparejamiento/completar/P&R; **faltan** crucigrama, memoria, escenario de decisiones, arrastrar-y-soltar como tales |

**Sobra / se llama distinto:** la skill agrega `flashcards`, `carousel`, `accordion`, `tabs`, `stepper`, `chart`, `code`, `formula`, `callout`, `summary`, `reflection`, `metrics`, `exercise-set`, `evaluation-activity` — útiles para un documento de saberes interactivo pero **sin etiqueta** que los vincule al catálogo oficial de "componentes didácticos". El catálogo oficial es la base de las plantillas (Guion*.docx) y el conteo por créditos (2/3/4 componentes); la skill, en cambio, obliga carousel+flashcards+accordion por sección (`SKILL.md:40,59`) — una regla propia que no proviene del catálogo oficial.

**Recomendación:**
1. Mapear explícitamente los componentes oficiales a tipos de la skill (tabla de correspondencia en `component-selection.md`), e introducir, al menos como prompt/plantilla guiada, `infografía animada`, `mapa conceptual`, `mapa mental`, `cómic` y los juegos faltantes (crucigrama, memoria, escenario de decisiones, arrastrar-y-soltar).
2. Aclarar que la regla "carousel + flashcards + accordion obligatorios por sección" es una decisión de diseño de la skill, no del catálogo oficial UA, para evitar interpretarla como requisito institucional.

---

## 3. Evaluación y escenarios

| Recurso oficial | Dato oficial | En la skill | Severidad |
|---|---|---|---|
| Evaluación diagnóstica | Contesta **10**; docente elabora **15**; revisión automática; insumo "Balance inicial" PL-GAP-007; retroalimentación por pregunta | "15 preguntas cuando aplique" (estrategias:53); sin contestará-10 / banco-15; sin "Balance inicial" | **Alta** |
| Cuestionario | mín **15**, contesta **10**; retroalimentación por pregunta | No modelado como recurso evaluativo específico | Media |
| Foro | tipo **debate**, ≥1 pregunta de apertura, docente participa primero | Mencionado como interacción/colaboración genérica (lineamientos:40); sin "debate" ni "docente primero" | Media |
| Tarea formativa | objetivo, contexto, modalidad colaborativa, paso a paso en singular | Cubierto a nivel de principios (instructional:223-236; estrategias:63-64) | Baja |
| Tarea sumativa | integra TODOS los momentos y RA; **última semana** | "última semana = sumativa" NO aparece; sí "evaluación final / RA" (instructional:56) | Media |
| Coevaluativo | taller por **fases** (configuración, envío, evaluación entre pares, calificación); formativa sin nota | Solo "coevaluación" como tipo de participación (evaluacion_cualitativa:17,73) | Media |
| Wiki / investigación | colaborativa, **4 páginas** (problematización, teórico, metodológico, resultados) | No modelado | Baja (calza con ABI, no ABC) |
| Evaluación cualitativa | formativa/continua; momentos inicial/avance/final; auto/co/heteroevaluación; escala de 8 niveles | **Bien cubierto** | — |

### 3.1 — ALTA: diagnóstica "15" vs "contesta 10 / elabora 15"

**Oficial** (`docs-txt/Escenario_evaluativo__PREGRADO__Recurso_evaluación_diagnóstica_Pre.docx.txt:2,42`): "actividad de revisión automática de **10 preguntas**… Los estudiantes contestarán 10 preguntas, pero se solicita que el docente elabore 15 preguntas para configurar de forma aleatoria." Además es insumo del "Balance inicial" de PL-GAP-007 (`:1`).

**Skill** (`references/estrategias_didacticas_comunicativas.md:53`): "Evaluacion diagnostica: 15 preguntas cuando aplique." — número simplificado a 15, sin la regla 10-contestadas / 15-banco, sin revisión automática ni vínculo con el Balance inicial.

**Recomendación:** corregir a "Evaluación diagnóstica: revisión automática; el estudiante contesta 10 preguntas y el docente elabora un banco de 15 para aleatorización; cada pregunta con retroalimentación (concepto a reforzar / referencia); insumo del Balance inicial (PL-GAP-007)." Igual criterio para el cuestionario (15 disponibles / 10 contestadas).

### 3.2 — Fortaleza: evaluación cualitativa

La skill recoge fielmente PL-GAP-007: escala de 8 niveles (`evaluacion_cualitativa_pregrado.md:24-31`, replicada en `instructional-content-requirements.md:212-219`), momentos inicial/avance/final (`evaluacion_cualitativa:54-56`), auto/co/heteroevaluación (`:16-18,73`), rúbrica analítica vs holística (`:45-46`) y campos obligatorios por actividad (`:72`). Sin acción correctiva.

### 3.3 — MEDIA: escenario inicial ABC no modelado

**Oficial** (`docs-txt/Escenario_inicial__ABC_Escenario_inicial.docx.txt:1-10`): título llamativo · Introducción (½ pág) · Descripción del contexto (1 pág) · **2 preguntas direccionadoras o micro casos** (máx ½ pág) · Anexos (2 págs) · Especificaciones técnicas del caso.

**Skill:** solo describe el escenario inicial de forma genérica ("escenario inicial con problema, contexto, pregunta direccionadora y anexos", `estrategias:10`; "4 a 5 páginas", `:54`). No exige título llamativo, ni que sean exactamente **2** preguntas direccionadoras/micro casos, ni anexos de 2 págs, ni especificaciones técnicas. Atenuante: el producto de la skill es el documento de saberes (Fase 5), no el escenario inicial (insumo previo).

**Recomendación:** documentar la estructura del escenario inicial ABC como contexto de entrada (las 2 preguntas direccionadoras del escenario inicial deben corresponder a los momentos 2 y 3), aunque no se genere; así el contenido de M2/M3 se ancla a las 2 preguntas reales del caso.

---

## 4. Métricas y otros

| Métrica oficial | Valor oficial | En la skill | Estado |
|---|---|---|---|
| Extensión doc de saberes por créditos | 30–35 / 40–45 / 50–55 págs (Arial 12, int. 1.15) | Extensión = "mínimo de páginas por PDF" definido por el usuario, aplicado a cada uno de los 4 PDF (SKILL.md:2,11,39,105; Page Extension Heuristic 167-176) | **Desalineado** |
| N.º componentes didácticos | 2 / 3 / 4 por créditos | Cubierto: "2 para 2 créditos…" (estrategias:57; instructional:124) | OK |
| Material complementario | 3 / 5 / 7 recursos | "graduar según créditos" (estrategias:58) sin cifras 3/5/7 | Parcial |
| Similitud máxima | 30% | **No mencionado** en ninguna referencia | **Falta** |
| Citación | APA 7 + "Elaboración propia" | APA 7 sí (SKILL.md:118; instructional:267); "Elaboración propia" NO mencionado | Parcial |
| Encaje en proceso de fases | Doc de saberes = Fase 5; componentes Moodle = Fase 6-7 | Referencias a fases 0-4 (lineamientos:27-33; estrategias:32-40); no nombra explícitamente que el producto es Fase 5 | Parcial |

### 4.1 — ALTA: extensión por créditos no parametrizada

La skill **reemplaza** la tabla oficial por un "mínimo de páginas que pide el usuario", aplicado a cada PDF (`SKILL.md:11`: "minimum pages per PDF"; `:39`, `:105`, heurística `167-176`). El oficial fija la extensión del documento de saberes COMPLETO en 30–55 págs según créditos (`DOCUMENTO_DE_SABERES:14`). Riesgo: cuatro PDF de "mínimo N páginas" cada uno pueden quedar por debajo o muy por encima del rango oficial total, y el rango no se ata a 2/3/4 créditos.

**Recomendación:** añadir la tabla oficial de extensión por créditos como referencia y, cuando se conozcan los créditos, derivar la extensión objetivo total (30-55) y repartirla entre los 4 momentos; mantener el "mínimo por PDF" del usuario solo como override explícito.

### 4.2 — ALTA: similitud 30% y "Elaboración propia" ausentes

El documento de saberes oficial (`DOCUMENTO_DE_SABERES:20-31`) exige: rotular recursos creados como "Elaboración propia", citar referencias en APA 7, y **similitud máxima 30%**. La skill cubre APA 7 pero **no** menciona el límite del 30% ni la etiqueta "Elaboración propia".

**Recomendación:** agregar en las reglas no negociables de SKILL.md: (a) marcar recursos propios como "Elaboración propia" en la citación, (b) declarar el límite de similitud del 30% como criterio de originalidad/validación. (La skill ya tiene validación de unicidad interna —`content-uniqueness-validation.md`— pero esa es anti-repetición entre secciones, no el umbral institucional de plagio.)

### 4.3 — MEDIA: material complementario sin cifras y fase 5 implícita

Documentar 3/5/7 recursos según créditos (hoy solo "graduar") y nombrar explícitamente que el documento de saberes generado es el **producto de Fase 5** del proceso PL-VIR-001, con los componentes Moodle correspondiendo a Fase 6-7.

---

## 5. Tabla de gaps priorizados

| Severidad | Foco | Gap | Recomendación |
|---|---|---|---|
| **Crítica** | Alineación metodológica | M2/M3 = "Análisis **de pregunta orientadora** o micro caso N"; oficial = "Análisis **pregunta direccionadora N** o micro caso N" (palabra y posición del ordinal) | Reemplazo global del literal en SKILL.md:27,52,66,69,140; instructional:68-69,79,90-91; json-contract:10-11,72,86; estrategias:26,48,56 |
| **Alta** | Evaluación | Diagnóstica fijada en "15"; oficial = contesta **10** / banco **15**, revisión automática, insumo Balance inicial | Corregir estrategias:53 con la regla 10/15 + retroalimentación + Balance inicial PL-GAP-007 |
| **Alta** | Métricas | Extensión por créditos (30-55) no parametrizada; se usa "mínimo por PDF" del usuario | Añadir tabla oficial; derivar extensión total por créditos y repartir entre 4 momentos |
| **Alta** | Métricas | Similitud máx **30%** y "Elaboración propia" ausentes | Añadirlos como reglas no negociables en SKILL.md |
| **Media** | Cobertura componentes | Sin tipo/equivalente para infografía animada, mapa conceptual, mapa mental, cómic, video interactivo, imagen interactiva, juegos (crucigrama, memoria, escenario de decisiones, arrastrar-y-soltar) | Mapear catálogo oficial→tipos de skill en component-selection.md y agregar plantillas/prompts para los faltantes |
| **Media** | Evaluación | Foro debate (docente primero), tarea sumativa de última semana, coevaluativo por fases no modelados | Documentar estos recursos del escenario evaluativo pregrado como referencia de evaluación |
| **Media** | Alineación metodológica | Preguntas guía oficiales por momento no son criterio de contenido | Incluir las preguntas guía de M1-M4 como checklist en instructional-content-requirements.md |
| **Media** | Evaluación / escenarios | Escenario inicial ABC (título llamativo, 2 preguntas direccionadoras, anexos 2 págs, especificaciones técnicas) no descrito | Documentar la estructura como insumo de entrada; anclar M2/M3 a las 2 preguntas direccionadoras del caso |
| **Baja** | Métricas | Material complementario sin cifras 3/5/7; Fase 5 implícita | Añadir cifras por créditos y nombrar el producto como Fase 5 de PL-VIR-001 |

---

### Nota de alcance
Varios gaps de evaluación y escenarios (foro, coevaluativo, wiki, escenario inicial) corresponden a recursos del aula Moodle / escenario evaluativo, mientras que esta skill produce el **documento de saberes** (Fase 5). Por eso se gradúan como media/baja y no como crítica, salvo donde la skill SÍ fija un valor que contradice al oficial (diagnóstica "15"). Los hallazgos críticos/altos (literal de momentos, métricas por créditos, similitud 30%) sí están dentro del producto directo de la skill y deben corregirse.
