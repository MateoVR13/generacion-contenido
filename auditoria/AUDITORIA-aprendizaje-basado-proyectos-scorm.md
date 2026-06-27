# Auditoría — aprendizaje-basado-proyectos-scorm (ABPr)

Auditor: Diseño Instruccional, Universidad de América.
Alcance: SKILL.md, references/*.md, scripts/validate_content_package.js, agents/openai.yaml de
`/Users/eximius/Documents/Programming/generacion-contenido/aprendizaje-basado-proyectos-scorm/`
contra los documentos oficiales en `scratchpad/docs-txt/` y la base consolidada `scratchpad/oficial-ua.md`.

## Resumen ejecutivo

**Alineación global: MEDIA-ALTA.**

- **Estructura metodológica casi correcta.** La skill fija ABPr con 3 momentos y mapea cada archivo a un momento, lo cual coincide con el documento de saberes oficial (3 momentos). Sin embargo, el **nombre literal del Momento 3 está mal**: la skill usa "Conclusiones" (plural) de forma sistemática, mientras el oficial dice **"Momento 3: Conclusión"** (singular). Hallazgo de literal, alto por su carácter sistemático.
- **Métrica de extensión NO alineada.** El oficial fija extensión por créditos (30–35 / 40–45 / 50–55 págs, Arial 12, interlineado 1.15). La skill ignora esa tabla y usa una extensión libre "por PDF" pedida por el usuario (SKILL.md:2, 11, 39, 169–176). Brecha crítica de parametrización.
- **Material complementario por créditos ausente.** El oficial exige 3/5/7 recursos para 2/3/4 créditos; la skill solo dice "graduar según créditos" sin la cifra (estrategias:58). El nº de componentes 2/3/4 sí está correcto (estrategias:57; instructional:122).
- **Evaluación diagnóstica con número equivocado.** El oficial pregrado: el estudiante contesta **10**, el docente elabora **15** para aleatorizar. La skill dice "Evaluacion diagnostica: 15 preguntas cuando aplique" (estrategias:53), perdiendo el matiz 10-contestadas/15-banco.
- **Catálogo oficial de componentes didácticos no mapeado.** Infografía animada, mapa conceptual, mapa mental, podcast, cómic, OVA, línea de tiempo y juegos didácticos (catálogo oficial) no están enlazados con los tipos render de la skill (theory-block, carousel, flashcards, accordion, chart, stepper...). Solo `podcast` y `timeline` existen como tipos (json-contract); faltan infografía/mapa/cómic/OVA/juegos como conceptos.
- **Aspectos bien resueltos:** similitud 30% no exigida pero APA 7 sí; metodología ABPr única bien blindada; evaluación cualitativa, momentos inicial/avance/final y auto/co/heteroevaluación bien cubiertos (evaluacion_cualitativa_pregrado.md); escenario inicial con problema + pregunta direccionadora + anexos presente (estrategias:10; SKILL.md:70).

---

## 1. Alineación metodológica

| Severidad | Hallazgo | Evidencia oficial | Evidencia skill | Recomendación |
|---|---|---|---|---|
| **Alta** | Nombre literal del Momento 3 incorrecto: "Conclusiones" vs oficial "Conclusión" (singular). | `Escenario_de_aprendizaje__ABPr_DOCUMENTO_DE_SABERES.docx.txt:50` → "Momento 3: Conclusión". | SKILL.md:27, 52, 66, 69, 128, 140; instructional-content-requirements.md:69,78,92; estrategias:26,56; json-contract.md:11,71,85. Todas usan "Conclusiones". | Cambiar el literal del momento 3 a **"Conclusión"** en `subject.methodology.moments`, tablas de ruta, labels y mapeo de archivo (o documentar explícitamente que se pluraliza por decisión editorial). |
| **Media** | Nombres M1/M2 correctos pero conviene fijar literal exacto. | Oficial: "Momento 1: Diagnóstico inicial", "Momento 2: Análisis y diseño" (saberes:32,42). | Skill usa "Diagnóstico Inicial" / "Análisis y Diseño" (capitalización distinta a la oficial "inicial"/"diseño" en minúscula). | Aceptable como título; no es crítico. Mantener consistencia. |
| **Media** | Las **preguntas guía oficiales por momento** no están incorporadas como contrato de contenido. El oficial lista preguntas específicas que el texto debe responder (p. ej. M1: ¿qué temas para entender el contexto?, ¿qué conceptos/teorías?, ¿qué orientaciones de análisis?, ¿procedimientos clave?, **¿quiénes participan / qué roles?**). | saberes:35–40 (M1), 45–48 (M2), 53–56 (M3). | La skill describe el enfoque ABPr en general (SKILL.md:70; instructional:84) pero no obliga a responder las preguntas guía literales de cada momento. | Añadir a `instructional-content-requirements.md` un bloque "Preguntas guía por momento ABPr" con las preguntas oficiales de M1/M2/M3 como checklist de cobertura del contenido. Especial atención a la pregunta de **roles/participantes del proyecto** (M1), hoy no exigida. |
| **Baja** | Posible confusión interna 6 secciones SCORM (intro + 5) vs 3 momentos oficiales. | El oficial divide la extensión "entre los 3 momentos" (saberes:41,49,57). | SKILL.md:36,53 fija intro+5 secciones por archivo. | Correcto: cada archivo = 1 momento, y dentro 5 secciones temáticas. Documentar que las 5 secciones son subdivisión interna del momento, no momentos nuevos (ya implícito; reforzar para evitar lectura errónea). |

**Observación positiva:** la skill bloquea correctamente el uso de otras metodologías (AG/ABR/ABI/ABC) — SKILL.md:35,141; estrategias:20 — y no comete los errores de literal de momento detectados en otras metodologías (ABI/ABC). El error aquí es acotado al plural de "Conclusión".

---

## 2. Cobertura de componentes

El catálogo oficial (Componentes_Didácticos.docx.txt:2–19) define componentes **didácticos de producción** (lo que el gestor entrega para ampliar el saber). La skill, en cambio, define **tipos de render HTML/SCORM** (theory-block, accordion, carousel, flashcards, chart, stepper, code, etc. en json-contract.md:185–212). Son dos taxonomías distintas y la skill **no establece la correspondencia** entre ambas.

| Componente oficial | Evidencia oficial | ¿Cubierto en la skill? | Brecha |
|---|---|---|---|
| Infografía animada | Componentes_Didácticos:2 | No por nombre | Sin tipo ni mapeo; podría representarse con `image`/`figure`+`carousel` pero no se indica. |
| Video / Videos explicativos / Video interactivos | Componentes_Didácticos:3–5 | Parcial (`video` en json-contract.md:204 zona SCORM) | No distingue explicativo vs interactivo; sin guion/formato. |
| Imagen interactiva | Componentes_Didácticos:6 | Parcial (`image`/`figure`/`visual-prompt`) | "Puntos sensibles" interactivos no modelados. |
| Líneas de tiempo | Componentes_Didácticos:7 | Sí (`timeline`, json-contract.md:626; component-selection.md:59,109,111) | OK. |
| Mapas conceptuales | Componentes_Didácticos:8 | No por nombre | Mencionado como composición visual (estrategias:76) pero sin tipo ni mapeo a componente. |
| Mapa mental | Componentes_Didácticos:9 | No | Ausente. |
| Podcast | Componentes_Didácticos:10 | Sí (`podcast`, json-contract.md:204) | OK (SCORM; excluido de PDF, SKILL.md:113). |
| Comics-historietas | Componentes_Didácticos:11 | No | Ausente; podría mapearse a `carousel`/`image` pero no se indica. |
| Objeto virtual de aprendizaje (OVA) | Componentes_Didácticos:12 | No (y además la skill prohíbe nombrar "OVA" al estudiante, SKILL.md:67) | El paquete SCORM es de hecho un OVA; conviene aclarar la relación. |
| Juegos didácticos (emparejamientos, arrastrar/soltar, completar, P&R, crucigrama-memoria, escenario de decisiones) | Componentes_Didácticos:13–19 | Parcial: `matching` (emparejamientos), `fill-blank` (completar), `quiz` (P&R), `multi-select`. | Faltan: arrastrar y soltar, crucigrama/memoria, escenario de decisiones. |

| Severidad | Hallazgo | Recomendación |
|---|---|---|
| **Alta** | No existe tabla de correspondencia "componente didáctico oficial → tipo render de la skill". El gestor no puede verificar que cubre el catálogo oficial. | Añadir en `component-selection.md` una tabla de mapeo oficial→render (infografía animada→image/figure+carousel; mapa conceptual/mental→image/figure con prompt de diagrama; cómic→carousel/image; juegos→matching/fill-blank/quiz/multi-select; escenario de decisiones→quiz ramificado/`case`; línea de tiempo→timeline; podcast→podcast; OVA→el propio paquete). |
| **Media** | Componentes oficiales sin equivalente: arrastrar y soltar, crucigrama/memoria, escenario de decisiones, mapa mental, cómic. | Declarar cuáles se soportan, cuáles se aproximan y cuáles requieren extender la app, en vez de omitirlos. |
| **Baja** | Componentes obligatorios de la skill (carousel/flashcards/accordion en cada sección, SKILL.md:59) son reglas internas de diseño, no del catálogo oficial. | No es un defecto, pero conviene aclarar que esa obligatoriedad es propia de la skill y no proviene del documento oficial de componentes. |

---

## 3. Evaluación y escenarios

| Severidad | Hallazgo | Evidencia oficial | Evidencia skill | Recomendación |
|---|---|---|---|---|
| **Alta** | Diagnóstica: número equivocado. Oficial = estudiante contesta **10**, docente elabora **15** para aleatorizar; cada pregunta con retroalimentación. | `Escenario_evaluativo__PREGRADO__Recurso_evaluación_diagnóstica_Pre.docx.txt:2,12,42` ("revisión automática de 10 preguntas"; "contestarán 10... elabore 15"). | estrategias_didacticas_comunicativas.md:53 "Evaluacion diagnostica: 15 preguntas cuando aplique." | Corregir a: "diagnóstica de **10 preguntas contestadas**, banco de **15** para aleatorización, **con retroalimentación por pregunta** (concepto a reforzar / referencia)". |
| **Alta** | Recursos evaluativos oficiales no instrumentados por nombre: **cuestionario** (min 15, contesta 10, retro por pregunta), **foro de debate** (≥1 pregunta de apertura, docente participa primero), **tarea formativa**, **tarea sumativa** (integra todos los momentos/RA, última semana), **coevaluativo (taller por fases)**, **wiki/investigación (4 páginas)**. | `oficial-ua.md:71–84`; Recurso_Cuestionario_Pre, Recurso_Foro_Pre, Recurso_Tarea_sumativa, Recurso_Coevaluativo_Pre, Recurso_Wiki___investigación (docs-txt). | La skill solo trata evaluación de forma genérica (diagnóstica/formativa/sumativa, momentos, auto/co/hetero) en evaluacion_cualitativa_pregrado.md; no nombra ni parametriza cuestionario/foro/tarea/coevaluativo/wiki. | Añadir a `evaluacion_cualitativa_pregrado.md` (o nueva referencia) las fichas oficiales de cada recurso evaluativo con sus parámetros (cuestionario 15/10, foro debate apertura + docente primero, sumativa última semana integradora, coevaluativo por fases, wiki 4 páginas). |
| **Media** | "Última semana = actividad evaluativa sumativa" no está en la skill. | oficial-ua.md:33; tarea sumativa integra todos los momentos/RA. | No aparece regla de cierre sumativo en última semana. | Incorporar la regla de cierre sumativo integrador en la última semana. |
| **Baja** | Escala cualitativa y momentos inicial/avance/final bien cubiertos. | PL-GAP-007. | evaluacion_cualitativa_pregrado.md:50–58 (momentos 10–25% / 50% / 100%), 208–217 (niveles), 73 (auto/co/hetero); estrategias:30. | Mantener. Alineado. |
| **Baja** | Escenario inicial ABPr bien orientado (problema + contexto + pregunta direccionadora + anexos). | `Escenario_inicial__ABPr_Escenario_inicial.docx.txt:1–9`. | SKILL.md:70; estrategias:10. | Alineado en concepto. Falta la **extensión oficial por bloque** (intro ½ pág, contexto 1 pág, problema máx ½ pág, anexos 2 págs + especificaciones técnicas del proyecto). La skill dice "4 a 5 páginas" globales (estrategias:54). Ajustar a la descomposición oficial. |

---

## 4. Métricas y otros

| Severidad | Hallazgo | Evidencia oficial | Evidencia skill | Recomendación |
|---|---|---|---|---|
| **Crítica** | Extensión del documento de saberes por créditos NO implementada. Oficial: 30–35 / 40–45 / 50–55 págs (2/3/4 créditos), Arial 12, interlineado 1.15. | saberes:14 (tabla); oficial-ua.md:28. | SKILL.md:2,11,39,169–176 usan "minimum pages per PDF" pedido por el usuario, aplicado por archivo, sin tabla por créditos ni tipografía. | Parametrizar la extensión por créditos como regla oficial por defecto (30–35/40–45/50–55 al total dividido entre 3 momentos, Arial 12, 1.15), permitiendo override del usuario solo si lo pide explícitamente. |
| **Alta** | Material complementario por créditos (3/5/7) ausente como cifra. | saberes:18; oficial-ua.md:30. | estrategias:58 solo "graduar... segun creditos y complejidad" (sin números). | Fijar 3/5/7 recursos para 2/3/4 créditos. |
| **Media** | Similitud máxima 30% (regla oficial de originalidad) no mencionada. | saberes:23,27,31; oficial-ua.md:32. | No aparece en SKILL.md ni referencias (grep sin coincidencias; la skill tiene su propio control de unicidad interno en content-uniqueness-validation.md, distinto de la regla institucional). | Añadir regla "similitud máxima 30% verificada con herramienta de gestión de referencias" y "Elaboración propia" en citaciones de recursos creados. |
| **Baja** | Nº de componentes 2/3/4 por créditos: correcto. | saberes:16. | instructional:122; estrategias:57. | Mantener. |
| **Baja** | APA 7: correcto. | saberes:6,21,22. | SKILL.md:118; instructional:265. | Mantener. |
| **Media** | Encaje en el proceso de fases: la skill referencia Fases 0–4 (lineamientos_virtualidad.md:27–33; estrategias:32–40) pero no explicita que el documento de saberes que genera es **producto de Fase 5** (PL-VIR-001 v02). | oficial-ua.md:96. | Solo cubre 0–4. | Añadir nota de que el artefacto de la skill corresponde a la Fase 5 (diseño tecnopedagógico/disciplinar) y que componentes Moodle son Fase 6–7. |
| **Baja** | "Elaboración propia" en recursos creados no se exige. | saberes:20. | No aparece. | Incluir como regla de citación. |

---

## 5. Tabla de gaps priorizados

| Severidad | Foco | Gap | Recomendación |
|---|---|---|---|
| Crítica | Métricas | Extensión por créditos (30–35/40–45/50–55 págs, Arial 12, 1.15) no implementada; se usa páginas libres por PDF. | Parametrizar extensión oficial por créditos como default. |
| Alta | Alineación metodológica | Momento 3 = "Conclusiones" (plural) en vez del oficial "Conclusión" (singular), de forma sistemática. | Renombrar a "Conclusión" en moments, labels, tablas y mapeo. |
| Alta | Evaluación y escenarios | Diagnóstica fijada en "15 preguntas" en vez de 10 contestadas / 15 de banco + retro por pregunta. | Corregir a 10 contestadas, 15 banco, retroalimentación por pregunta. |
| Alta | Evaluación y escenarios | Cuestionario, foro debate, tarea formativa/sumativa, coevaluativo, wiki no instrumentados por nombre/parámetros oficiales. | Añadir fichas oficiales de cada recurso evaluativo. |
| Alta | Cobertura de componentes | Catálogo oficial (infografía animada, mapa conceptual/mental, cómic, OVA, juegos didácticos) sin mapeo a tipos render. | Tabla de correspondencia oficial→render en component-selection.md. |
| Alta | Métricas | Material complementario 3/5/7 por créditos sin la cifra. | Fijar 3/5/7 para 2/3/4 créditos. |
| Media | Alineación metodológica | Preguntas guía oficiales por momento (incl. roles/participantes en M1) no exigidas como checklist. | Incorporar preguntas guía M1/M2/M3 como cobertura obligatoria. |
| Media | Métricas | Similitud máxima 30% y "Elaboración propia" no mencionadas. | Añadir reglas de originalidad y citación oficiales. |
| Media | Evaluación y escenarios | Escenario inicial sin descomposición de extensión oficial por bloque + especificaciones técnicas del proyecto. | Ajustar a intro ½ / contexto 1 / problema ½ / anexos 2 págs. |
| Media | Otro | No se explicita que el artefacto es producto de Fase 5 del proceso PL-VIR-001. | Añadir nota de encaje en fases. |
