# Auditoría — aprendizaje-basado-retos-scorm (ABR)

Auditor: Diseño Instruccional UA · Fecha: 2026-06-27
Skill auditada: `/Users/eximius/Documents/Programming/generacion-contenido/aprendizaje-basado-retos-scorm/`
Base oficial: `scratchpad/oficial-ua.md` + `scratchpad/docs-txt/*` (texto extraído de los .docx/.xlsx oficiales).

## Resumen ejecutivo

**Alineación global: MEDIA.**

- **Lo metodológico está fuerte:** la skill usa los 4 momentos oficiales de ABR con su nombre literal exacto y en el orden correcto (Definición del reto, Ideación, Solución e implementación, Validación y evaluación), uno por archivo JSON. Es la metodología mejor anclada de las cinco. No hay errores de literal como los de otras skills.
- **Gap crítico en métricas por créditos:** la skill NO implementa la tabla oficial de extensión por créditos (30-35 / 40-45 / 50-55 págs); en su lugar usa una "minimum pages per PDF" arbitraria definida por el usuario (`SKILL.md:11`). Tampoco implementa material complementario 3/5/7 ni el tope de **similitud máxima 30%**.
- **Gap crítico en componentes didácticos:** el catálogo de componentes de la skill (theory-block, chart, stepper, flashcards, carousel, accordion, tabs, code…) es un set de render HTML, NO el catálogo oficial (infografía animada, video explicativo/interactivo, imagen interactiva, línea de tiempo, mapa conceptual, mapa mental, podcast, cómic, OVA, juegos didácticos). Cobertura casi nula de infografía, video explicativo/interactivo, imagen interactiva, mapa mental, cómic y juegos didácticos.
- **Gap alto en evaluación:** la diagnóstica oficial es de **10 preguntas** (banco de 15, contesta 10); la skill dice "Evaluacion diagnostica: 15 preguntas" (`references/estrategias_didacticas_comunicativas.md:53`). El cuestionario (15/10 + retroalimentación), foro debate, wiki, coevaluación-taller y tareas formativa/sumativa no se modelan como recursos evaluativos oficiales con su estructura.
- **Gap medio en escenario inicial:** la skill menciona el escenario inicial pero NO codifica su estructura oficial ABR (Idea general 1 pág · Definición del reto + **3 preguntas direccionadoras** 1 pág · Anexos 2 págs · Especificaciones técnicas del reto).

---

## 1. Alineación metodológica

| Aspecto | Oficial (docs-txt) | Skill | Veredicto |
|---|---|---|---|
| Nº de momentos | 4 (`Escenario_de_aprendizaje__ABR_DOCUMENTO_DE_SABERES.docx.txt:4` "cuatro momentos de aprendizaje") | 4, uno por archivo (`SKILL.md:10`,`27`) | OK |
| M1 | "Momento 1: Definición del reto" (`...ABR_DOCUMENTO...:32`) | "Definición del reto" (`SKILL.md:66`) | OK literal |
| M2 | "Momento 2: Ideación" (`...ABR_DOCUMENTO...:39`) | "Ideación" (`SKILL.md:66`) | OK literal |
| M3 | "Momento 3: Solución e implementación" (`...ABR_DOCUMENTO...:45`) | "Solución e implementación" (`SKILL.md:66`) | OK literal |
| M4 | "Momento 4: Validación y evaluación" (`...ABR_DOCUMENTO...:51`) | "Validación y evaluación" (`SKILL.md:66`) | OK literal |
| Etiqueta no usar Fase/Etapa | n/a | Prohíbe explícitamente "Fase/Etapa/Tema o etapa" (`SKILL.md:69`,`140`) | OK, refuerza el literal |

**Hallazgo 1.1 — Preguntas guía por momento no codificadas (severidad: alta).**
El documento de saberes oficial trae, en cada momento, preguntas concretas que el contenido DEBE responder. Ej. M1: "¿Qué elementos teóricos y prácticos se articulan con el resultado de aprendizaje? / ¿Cuál sería la mejor estrategia para enfocar el reto en el campo disciplinar? / ¿Qué ejemplos son pertinentes en la definición del reto?" (`Escenario_de_aprendizaje__ABR_DOCUMENTO_DE_SABERES.docx.txt:34-37`); M2 (`:42-43`), M3 (`:48-49`), M4 (`:53-55`). La skill nombra los momentos pero NO incorpora estas preguntas guía como criterio de generación/validación: en `SKILL.md` y `references/instructional-content-requirements.md:72` solo hay una descripción genérica del enfoque ABR ("ideation, prototyping/solution, and validation"), sin las preguntas literales por momento.
*Recomendación:* añadir a `references/instructional-content-requirements.md` un bloque por momento con sus preguntas guía oficiales y exigir en el Quality Checklist que cada contenido NN responda explícitamente las preguntas de su momento.

**Hallazgo 1.2 — Énfasis de cada momento poco normado (severidad: media).**
El oficial define instrucciones de redacción por momento (M1 "Finalice este momento planteando el reto de manera concreta y clara" `:33`; M2 "proyecte ideas y posturas de autores… empresas" `:40`; M3 "contrasten soluciones a retos del área" `:46`; M4 "procesos de validación, evaluación y control de calidad de las soluciones" `:52`). La skill no traduce este énfasis específico a reglas de contenido por archivo (cada `contenido-NN` debería heredar el foco de su momento).
*Recomendación:* documentar por archivo NN el propósito redaccional oficial del momento correspondiente.

**Hallazgo 1.3 — La extensión NO se reparte entre los 4 momentos (severidad: alta).**
El oficial es explícito: "la extensión total del documento… debe dividirse entre los 4 momentos de aprendizaje" (`...ABR_DOCUMENTO...:38`,`44`,`50`,`57`). La skill hace lo contrario: aplica la extensión a CADA PDF por separado, no como reparto del total —"The page extension always applies to each of the four PDFs, not to the total package" (`SKILL.md:11`), reiterado en `references/json-contract.md:223` ("Do not divide the requested pages across the four files"). Esto contradice el modelo oficial donde el documento de saberes es UN documento de 30-55 págs repartido en los 4 momentos.
*Recomendación:* alinear el modelo de extensión con la tabla por créditos (ver §4) y permitir reparto del total entre los 4 contenidos.

---

## 2. Cobertura de componentes

Catálogo oficial (`Escenario_de_aprendizaje__COMPONENTES_DIDÁCTICOS__Componentes_Didácticos.docx.txt:1-19`) vs. menú de la skill (`references/json-contract.md:185-213`, `SKILL.md:58`).

| Componente oficial | ¿En la skill? | Evidencia |
|---|---|---|
| Infografía animada | **No** | 0 hits de "infograf" en SKILL.md/references |
| Video | Parcial (`video` como tipo) | `references/json-contract.md:204` |
| Videos explicativos (docente/pizarra) | **No** (no hay tipo ni concepto) | 0 hits "video explic" |
| Videos interactivos (pausas) | **No** | 0 hits "video interact" |
| Imagen interactiva (puntos sensibles) | **No** (solo `image`/`figure` estática) | 0 hits "imagen interact"; `SKILL.md:101` |
| Líneas de tiempo | Sí (`timeline`) | `references/component-selection.md:59` |
| Mapas conceptuales | Marginal (1 mención, sin tipo dedicado) | 1 hit "mapa concept" |
| Mapa mental | **No** | 0 hits "mapa mental/mind map" |
| Podcast | Sí (`podcast`) | `references/json-contract.md:205` |
| Cómics-historietas | **No** | 0 hits "comic/cómic/historieta" |
| Objeto virtual de aprendizaje (OVA) | Marginal; además la skill PROHÍBE etiquetar el contenido como OVA (`SKILL.md:67`) | 1 hit "OVA" |
| Juegos didácticos (emparejamientos, arrastrar y soltar, completar, P&R, crucigrama-memoria, escenario de decisiones) | **No** como "juego"; existen primitivos parciales (`matching`≈emparejamiento, `fill-blank`≈completar, `quiz`≈P&R) pero sin nombrar ni cubrir crucigrama/memoria/arrastrar-soltar/escenario de decisiones | 0 hits "juego/crucigrama/arrastrar"; `references/json-contract.md:206-213` |

**Hallazgo 2.1 — El catálogo de la skill es un set de render, no el catálogo didáctico oficial (severidad: crítica).**
La skill genera componentes de capa HTML (theory-block, chart, stepper, flashcards, carousel, accordion, tabs, code, formula, table…) que NO corresponden uno-a-uno a los componentes didácticos oficiales. Faltan por completo: **infografía animada, video explicativo, video interactivo, imagen interactiva, mapa mental, cómic, y los juegos didácticos por nombre** (crucigrama, memoria, arrastrar y soltar, escenario de decisiones). Esto significa que un autor no puede solicitar los componentes que la UA define como propios de su catálogo.
*Recomendación:* añadir a `references/component-selection.md` una tabla de correspondencia "componente oficial UA → tipo(s) JSON soportado(s)" y, donde no exista equivalente (infografía animada, video explicativo/interactivo, imagen interactiva, mapa mental, cómic, juegos didácticos), declarar el gap y/o extender el contrato de componentes. Como mínimo, mapear `matching`→Emparejamientos, `fill-blank`→Completar frases, `quiz`→Preguntas y respuestas explícitamente.

**Hallazgo 2.2 — Conteo de componentes por créditos no implementado como regla dura (severidad: alta).**
Oficial: 2 componentes (2 créditos), 3 (3 créditos), 4 (4 créditos) (`...ABR_DOCUMENTO...:15-16`). La skill lo menciona como orientación blanda — "orient didactic components as 2, 3, and 4 components respectively when the user or syllabus does not set another quantity" (`references/instructional-content-requirements.md:124`; `references/estrategias_didacticas_comunicativas.md:57`) — pero NO lo aplica al artefacto: las reglas de componentes de `SKILL.md:40,57-60` imponen, por sección temática, mínimo 3 theory-blocks + carousel + flashcards + accordion obligatorios, lo que produce >>4 componentes por sección y desacopla totalmente la generación del conteo oficial por créditos.
*Recomendación:* separar conceptualmente "componentes didácticos oficiales" (entregable por créditos: 2/3/4) de "componentes de render SCORM" (los bloques HTML). El conteo 2/3/4 debe ser una restricción declarada del paquete, no una nota.

---

## 3. Evaluación y escenarios

**Hallazgo 3.1 — Diagnóstica: número de preguntas incorrecto (severidad: alta).**
Oficial: "actividad de revisión automática de **10 preguntas**"; "Los estudiantes contestarán 10 preguntas, pero se solicita que el docente elabore 15 preguntas para configurar de forma aleatoria" (`Escenario_evaluativo__PREGRADO__Recurso_evaluación_diagnóstica_Pre.docx.txt:2,42`). La skill dice "Evaluacion diagnostica: 15 preguntas cuando aplique" (`references/estrategias_didacticas_comunicativas.md:53`), confundiendo el banco (15) con la actividad (10 contestadas). Tampoco vincula la diagnóstica al "Balance inicial" de PL-GAP-007 (`...diagnóstica_Pre:1`).
*Recomendación:* corregir a "10 preguntas que contesta el estudiante, banco de 15 para aleatorización"; cada pregunta con retroalimentación (concepto a reforzar / referencia); marcar la diagnóstica como insumo del Balance inicial.

**Hallazgo 3.2 — Cuestionario formativo no modelado con su estructura oficial (severidad: media).**
Oficial: "cuestionario de mínimo **15 preguntas**, los estudiantes contestarán **10**… cada pregunta… retroalimentación"; tipos de pregunta definidos; el resultado alimenta el "Balance de seguimiento" reflejado en la Wiki (`Escenario_evaluativo__PREGRADO__Recurso_Cuestionario_Pre.docx.txt:1-3,64`). La skill solo tiene tipos genéricos `quiz`/`knowledge-check` (`references/json-contract.md:207`) sin la regla 15/10 ni el vínculo con el Balance de seguimiento/Wiki.
*Recomendación:* añadir plantilla de cuestionario (15 ítems, 10 contestados, tipos oficiales, retroalimentación positiva/negativa, vínculo con Balance de seguimiento).

**Hallazgo 3.3 — Foro debate, Wiki, Coevaluativo y Tareas formativa/sumativa no modelados como recursos oficiales (severidad: alta).**
Los recursos evaluativos oficiales pregrado (`Escenario_evaluativo__PREGRADO__Recurso_Foro_Pre.docx.txt`, `...Recurso_Wiki___investigación.docx.txt`, `...Recurso_Coevaluativo_Pre.docx.txt`, `...Recurso_Tarea_formativa_Pre.docx.txt`, `...Recurso_Tarea_sumativa.docx.txt`) definen estructuras concretas: foro tipo **debate** con ≥1 pregunta de apertura y docente que participa primero; coevaluativo como **taller por fases** (configuración, envío, evaluación entre pares, calificación); wiki colaborativa de 4 páginas; tarea formativa/sumativa con objetivo, contexto, modalidad y paso a paso. La skill apenas menciona "foro/coevaluacion/trabajo compartido" como ejemplo de interacción (`references/lineamientos_virtualidad.md:42`) y no tiene plantillas para ninguno; grep de "foro/wiki/coevaluaci/tarea formativa/tarea sumativa/debate" devuelve cero coincidencias estructurales en SKILL.md.
*Recomendación:* incorporar al contrato un recurso evaluativo tipo `evaluation-activity` por cada instrumento oficial (diagnóstica, cuestionario, foro-debate, tarea formativa, tarea sumativa, coevaluativo-taller, wiki) con sus campos oficiales.

**Hallazgo 3.4 — Escenario inicial ABR sin estructura oficial (severidad: media).**
Oficial ABR (`Escenario_inicial__ABR_Escenario_inicial.docx.txt:1-7`): Idea general (1 pág) · Definición del reto + **3 preguntas direccionadoras** (1 pág) · Anexos (2 págs) · Especificaciones técnicas del reto. La skill solo enuncia el escenario inicial de forma genérica ("initial scenario presents the situation context, defines the challenge, and poses direction-setting questions" `references/instructional-content-requirements.md:72`; "Escenario inicial: texto de 4 a 5 paginas" `references/estrategias_didacticas_comunicativas.md:54`) y NO fija las 3 preguntas direccionadoras ni la subdivisión en páginas (idea general / reto / anexos / especificaciones técnicas).
*Recomendación:* documentar la plantilla de escenario inicial ABR con sus 4 bloques y la exigencia explícita de 3 preguntas direccionadoras.

**Hallazgo 3.5 — Evaluación cualitativa y momentos: bien cubierto (positivo, severidad: baja).**
La skill recoge correctamente la escala cualitativa (Sobresaliente…No acreditable), auto/co/heteroevaluación, momentos inicial/avance/final y el principio formativo (`references/evaluacion_cualitativa_pregrado.md:11-58,73`; `references/instructional-content-requirements.md:206-234`; `SKILL.md:73,151`). Solo conviene reforzar el vínculo explícito de cada instrumento con su momento (inicial=diagnóstica, avance=cuestionario/formativa, final=sumativa).

---

## 4. Métricas y otros

**Hallazgo 4.1 — Tabla de extensión por créditos ausente (severidad: crítica).**
Oficial: 30-35 (2 cr.) / 40-45 (3 cr.) / 50-55 (4 cr.) págs, Arial 12, interlineado 1.15 (`...ABR_DOCUMENTO...:14`). La skill NO contiene esta tabla en ningún archivo (grep "30 a 35/40 a 45/50 a 55" → 0 hits). Usa una heurística de páginas arbitraria definida por el usuario y aplicada por PDF (`SKILL.md:167-176`, `references/json-contract.md:223`). Tampoco normaliza fuente/interlineado.
*Recomendación:* sustituir la heurística libre por la tabla oficial por créditos (con Arial 12 / 1.15) como default cuando se conozcan los créditos; permitir override solo si el usuario lo pide.

**Hallazgo 4.2 — Material complementario 3/5/7 no implementado (severidad: alta).**
Oficial: 3 recursos (2 cr.) / 5 (3 cr.) / 7 (4 cr.) (`...ABR_DOCUMENTO...:17-18`). La skill solo dice "graduar lecturas, videos y enlaces segun creditos y complejidad" (`references/estrategias_didacticas_comunicativas.md:58`) sin los números. Grep "3 recursos/5 recursos/7 recursos" → 0 hits.
*Recomendación:* fijar 3/5/7 por créditos como regla dura.

**Hallazgo 4.3 — Similitud máxima 30% ausente (severidad: alta).**
Oficial: "el porcentaje máximo permitido de similitud es de 30%" + "Elaboración propia" para recursos creados (`...ABR_DOCUMENTO...:20-23,31`). La skill tiene un "Automated Similarity Gate" interno de no-repetición entre secciones (`references/content-uniqueness-validation.md:71`) pero NO menciona el umbral oficial del 30% de similitud externa ni la etiqueta "Elaboración propia". El único "30%" presente es el de pérdida por fallas, que es otra cosa (`references/evaluacion_cualitativa_pregrado.md:37-38`).
*Recomendación:* añadir como regla de originalidad el tope de 30% de similitud y la convención "Elaboración propia"/APA 7 para recursos.

**Hallazgo 4.4 — APA 7: bien cubierto (severidad: baja).**
La skill exige APA 7 (`SKILL.md:118`), alineado con el oficial (`...ABR_DOCUMENTO...:22`). OK.

**Hallazgo 4.5 — Encaje en el proceso de fases / Fase 5 (severidad: media).**
El documento de saberes (lo que genera esta skill) es producto de la **Fase 5** del proceso PL-VIR-001 (oficial-ua.md §6). La skill usa una numeración propia "Etapas 0-4" (`references/estrategias_didacticas_comunicativas.md:32-40`, `references/lineamientos_virtualidad.md:27-35`) que no es el proceso de 11 fases (0-10) oficial y puede confundirse con él. No declara que su salida corresponde a la Fase 5.
*Recomendación:* alinear la referencia de proceso con las 11 fases oficiales y declarar que el documento de saberes ABR es entregable de la Fase 5; renombrar "Etapas 0-4" para evitar choque con las fases 0-10.

**Hallazgo 4.6 — Etiqueta de unidad "Escenario de aprendizaje" (severidad: baja, observación).**
La skill obliga a llamar cada unidad "Escenario de aprendizaje NN" en lo visible (`SKILL.md:68`). El término oficial del entregable es "Documento de saberes" / "momento de aprendizaje"; "Escenario de aprendizaje" es el nombre de la carpeta/familia de documentos oficiales (Escenario de aprendizaje, Escenario inicial, Escenario evaluativo), no de la unidad numerada. Verificar que no genere ambigüedad con el escenario inicial/evaluativo.
*Recomendación:* confirmar con el área la nomenclatura visible de la unidad numerada; considerar "Momento de aprendizaje NN" para no colisionar con los escenarios oficiales.

---

## 5. Tabla de gaps priorizados

| Severidad | Foco | Gap | Recomendación |
|---|---|---|---|
| Crítica | Métricas | Sin tabla de extensión por créditos (30-35/40-45/50-55 págs); usa páginas arbitrarias por PDF (`SKILL.md:11,167-176`) | Implementar tabla oficial por créditos (Arial 12, 1.15) como default |
| Crítica | Componentes | Catálogo es set de render HTML, no el catálogo didáctico oficial; faltan infografía animada, video explicativo/interactivo, imagen interactiva, mapa mental, cómic, juegos didácticos | Tabla de correspondencia oficial→JSON y/o extender contrato; declarar gaps |
| Alta | Alineación | Preguntas guía oficiales por momento no codificadas (`...ABR_DOCUMENTO...:34-55`) | Incluir las preguntas guía por momento como criterio de generación/validación |
| Alta | Alineación | Extensión aplicada por PDF en vez de repartida entre los 4 momentos (`SKILL.md:11`) | Permitir reparto del total y alinear con tabla por créditos |
| Alta | Componentes | Conteo 2/3/4 por créditos es nota blanda, no regla (`instructional-content-requirements.md:124`) | Volverlo restricción dura del entregable de componentes didácticos |
| Alta | Evaluación | Diagnóstica = 15 en la skill; oficial = 10 contestadas / banco 15 (`...diagnóstica_Pre:2,42`) | Corregir a 10/15 + retroalimentación + Balance inicial |
| Alta | Evaluación | Foro-debate, Wiki, Coevaluativo-taller, Tareas formativa/sumativa sin plantilla oficial | Añadir recurso evaluativo por cada instrumento oficial pregrado |
| Alta | Métricas | Material complementario 3/5/7 no implementado (`...ABR_DOCUMENTO...:17-18`) | Fijar 3/5/7 por créditos como regla dura |
| Alta | Métricas | Similitud máx 30% y "Elaboración propia" ausentes (`...ABR_DOCUMENTO...:20-23`) | Añadir regla de originalidad 30% + etiqueta Elaboración propia |
| Media | Evaluación | Cuestionario formativo sin estructura 15/10 ni vínculo Balance/Wiki (`...Cuestionario_Pre:1,64`) | Plantilla de cuestionario con tipos oficiales y retroalimentación |
| Media | Evaluación | Escenario inicial ABR sin estructura oficial ni 3 preguntas direccionadoras (`...inicial__ABR:1-7`) | Plantilla con Idea general/Reto+3 preguntas/Anexos/Especificaciones |
| Media | Alineación | Énfasis redaccional por momento no normado (`...ABR_DOCUMENTO...:33,40,46,52`) | Documentar el foco oficial de cada contenido NN |
| Media | Otros | Proceso "Etapas 0-4" no es el de 11 fases; no declara Fase 5 | Alinear con 11 fases y marcar salida como Fase 5 |
| Baja | Otros | Nomenclatura "Escenario de aprendizaje NN" puede colisionar con escenarios oficiales (`SKILL.md:68`) | Validar nomenclatura visible con el área |
| Baja | Evaluación | Cualitativa/momentos/auto-co-hetero bien cubiertos | Reforzar vínculo instrumento↔momento |
| Baja | Métricas | APA 7 bien cubierto (`SKILL.md:118`) | Mantener |
