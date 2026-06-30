# Fase 8 — Aseguramiento de la calidad (QA) · Algoritmia Computacional I (AG)

**Asignatura:** Algoritmia Computacional I · Tecnología en Aplicaciones Digitales Inteligentes · Facultad de Ingeniería
**Metodología:** Aprendizaje Guiado (AG) · 3 créditos · 100% virtual · módulo de 4 semanas · N = 6 Temas
**Alcance del QA:** Documento de Saberes SCORM (`documento-saberes/algoritmia-computacional-contenido-01..06.json`), envoltura Moodle (`fase-7-montaje-lms/algoritmia-computacional-AG.moodle.json`), 3 componentes didácticos (`fase-6-prompts/`), 5 materiales complementarios, banco diagnóstico (`evaluacion/diagnostica-algoritmia-computacional.json`) y talleres/rúbricas.
**Estado de partida:** instrumento **aprobado por el docente sin cambios** (ver `estado-proyecto.json`).

Este checklist verifica que lo construido cumpla decisiones validadas, normas institucionales y accesibilidad **antes de la publicación en el aula**. Es la última compuerta antes de Fase 9 (entrega).

---

## 1. Dimensiones de calidad

| # | Dimensión | Qué verifica | Artefactos clave |
|---|-----------|--------------|------------------|
| D1 | **Alineación curricular** | RA1/RA2, saberes S1–S25, criterios CE1–CE2 y competencia UC2 reflejados y trazables en cada tema. | documento-saberes, Moodle, talleres |
| D2 | **Coherencia metodológica (AG)** | Ruta guiada fundacional (concepto→funciones→proyecto); etiqueta "Tema"; progresión sin saltos. | Moodle (`unitLabel`/`momentLabel`), saberes |
| D3 | **Rigor disciplinar** | Exactitud técnica de algoritmos, pseudocódigo, Python, complejidad y memoria; orientación industrial. | documento-saberes (`code`, `stepper`, `theory-block`) |
| D4 | **Diseño instruccional** | Objetivos, preguntas orientadoras, secuencia teoría→ejemplo→práctica→evaluación, carga 40–45 págs. | documento-saberes, fase-2 |
| D5 | **Evaluación y retroalimentación** | Diagnóstica, formativas, sumativa, rúbricas CE1–CE2, auto/co/heteroevaluación, feedback positivo y negativo. | evaluación, talleres, rúbricas |
| D6 | **Recursos y referencias (APA 7)** | 5 materiales (40% inglés), 3 componentes, "Elaboración propia", citas APA 7, enlaces vigentes. | fase-6, materialComplementario |
| D7 | **Accesibilidad (WCAG 2.1 AA)** | Alt text, contraste, subtítulos/transcripción, navegación por teclado, no depender del color. | componentes, SCORM, Moodle |
| D8 | **Técnico / LMS** | JSON válido, render Moodle sin contenido activo, SCORM empaquetable, TODOs resueltos, enlaces. | validador Moodle, SCORM |
| D9 | **Integridad y estilo** | Similitud ≤30%, ortografía/gramática, marca UA, tono, sin datos inventados del syllabus. | todos |

---

## 2. Severidad y criterio de aprobación

| Nivel | Código | Definición | Acción |
|-------|:------:|-----------|--------|
| **Crítico** | 🔴 C | Error disciplinar, RA no cubierto, dato inventado, fallo de accesibilidad bloqueante, JSON/SCORM no carga, similitud >30%. | **Bloquea publicación.** Corregir y re-verificar. |
| **Mayor** | 🟠 M | Inconsistencia metodológica, rúbrica incompleta, APA mal formada, TODO crítico sin resolver, contraste < AA. | Corregir antes de publicar; admite excepción documentada por el docente. |
| **Menor** | 🟡 m | Estilo, redacción, mejora opcional de UX, TODO no bloqueante. | Registrar; corregir en esta o próxima iteración. |

**Criterio de aprobación de Fase 8:** 0 🔴 abiertos y 0 🟠 sin plan de corrección con responsable y fecha. Los 🟡 se listan en backlog.

---

## 3. Protocolo de QA

1. **Preparación** — congelar versión de artefactos; verificar que `estado-proyecto.json` esté en `fase: 8`.
2. **Automático primero** — correr validador Moodle y `python3 -m json.tool` sobre los 6 SCORM; registrar salidas.
3. **Revisión por dimensión** — recorrer §5 (matriz por dimensión/rol) marcando ✔ / ✘ / N-A con evidencia (archivo + ruta del nodo).
4. **Revisión disciplinar del docente** — D3 y D5 las firma el docente del área (compuerta académica).
5. **Accesibilidad** — recorrer §6 (WCAG) sobre componentes y SCORM.
6. **Consolidación** — registrar hallazgos con severidad en §8; calcular semáforo por dimensión.
7. **Corrección y re-test** — solo se cierra un hallazgo con re-verificación, no con "corregido".
8. **Compuerta** — aplicar criterio §2; si pasa → Fase 9; si no → iterar.

**Roles:** Diseñador instruccional (DI) · Experto disciplinar/Docente (DOC) · Editor/Corrector de estilo (EST) · Especialista LMS/Técnico (LMS) · Especialista en accesibilidad (ACC).

---

## 4. Comandos de verificación automática

```bash
# 4.1 Validación del envoltorio Moodle (debe dar OK, 0 errores / 0 advertencias)
node moodle-content/skill/scripts/validate_moodle_json.js \
  algoritmia-computacional-virtualizacion/fase-7-montaje-lms/algoritmia-computacional-AG.moodle.json

# 4.2 Los 6 SCORM del Documento de Saberes son JSON válido
for f in algoritmia-computacional-virtualizacion/documento-saberes/algoritmia-computacional-contenido-0*.json; do
  python3 -m json.tool "$f" > /dev/null && echo "OK $f" || echo "FAIL $f"
done

# 4.3 No hay contenido activo prohibido en los SCORM (script/style/link/on*=)
grep -rIlE "<script|<style|<link|on[a-z]+=" \
  algoritmia-computacional-virtualizacion/documento-saberes/ || echo "OK sin contenido activo"

# 4.4 TODOs pendientes (URLs/embeds/datos por completar en el aula)
grep -rno "\"todo\"" algoritmia-computacional-virtualizacion/ | wc -l
```

---

## 5. Matriz de verificación por dimensión y rol

### D1 · Alineación curricular — DI + DOC
- [ ] RA1 ("Reconozco…") y RA2 ("Evalúo… asignación dinámica de memoria… programación estructurada") aparecen **literales** en bienvenida y mapeados por tema. 🔴
- [ ] Mapa RA↔Tema correcto: T1–T3 RA1; T4 RA1+RA2; T5 RA2; T6 RA1+RA2. 🔴
- [ ] Saberes S1–S25 cubiertos sin huérfanos (S1–S4→T1; S7–S10→T2; S13–S15→T3; S18–S20→T4; S24→T5; S25→T6). 🔴
- [ ] CE1 y CE2 sustentan las rúbricas y los talleres. 🟠
- [ ] Competencia UC2 (proceso industrial) visible en el enfoque transversal y en el proyecto integrador. 🟠
- [ ] Cada tema declara objetivos y preguntas orientadoras del `estado-proyecto.json`. 🟠

### D2 · Coherencia metodológica AG — DI
- [ ] `unitLabel`/`momentLabelSingular` = **"Tema"**; chip "6 Temas"; `contentTotal` "06". 🟠
- [ ] Progresión fundacional sin saltos: concepto/trazado → lenguaje → control → datos → funciones/memoria → proyecto. 🔴
- [ ] AG ≠ ABPr: el proyecto final es **cierre integrador** dentro de la ruta guiada, no eje único (brecha resuelta). 🟠
- [ ] Cada tema tiene la tríada AG: teoría guiada → ejemplo resuelto/trazado → taller con evidencia. 🟠
- [ ] Carga coherente con 144 h (96 autónomo / 48 directa); colaborativo presente en T4–T5 (foro). 🟡

### D3 · Rigor disciplinar — DOC (compuerta académica)
- [ ] Pseudocódigo/flujograma del T1 con símbolos y semántica correctos; prueba de escritorio bien trazada (`stepper`). 🔴
- [ ] Código Python ejecutable y correcto en todos los `code`; sin errores de sintaxis ni de lógica. 🔴
- [ ] T2: distinción lenguaje máquina/ensamblador/alto nivel y tipos primitivos exacta. 🔴
- [ ] T3: condición de parada correcta; sin ciclos infinitos en ejemplos; anidamiento bien explicado. 🔴
- [ ] T4: cadenas/listas/tuplas/diccionarios/matrices y su recorrido/indexación correctos. 🔴
- [ ] T5: alcance de variables y **pila vs. memoria dinámica** descritos con precisión (núcleo de RA2). 🔴
- [ ] T6: análisis→diseño modular→implementación→pruebas→documentación coherente y de orientación industrial. 🟠
- [ ] Ejemplos transversales a ingeniería plausibles (mediciones, procesos industriales), sin datos inventados. 🟠

### D4 · Diseño instruccional — DI + EST
- [ ] Extensión total **40–45 páginas** repartida razonablemente entre los 6 temas. 🟠
- [ ] Secuencia interna por tema: objetivos → conocimientos previos → teoría → interactivos → quiz/actividad → enlace a saberes. 🟠
- [ ] Interactivos (`stepper`, `flashcards`, `matching`, `multi-select`, `fill-blank`, `carousel`) aportan práctica, no relleno. 🟡
- [ ] Imágenes/figuras (pila/heap, matrices, flujogramas) pertinentes y referenciadas en el texto. 🟡
- [ ] Lenguaje claro, nivel tecnólogo 1er semestre; jerga técnica definida en su primer uso. 🟡

### D5 · Evaluación y retroalimentación — DOC + DI
- [ ] Diagnóstica: banco 15, contesta 10, revisión automática, **retroalimentación positiva y negativa por pregunta**. 🔴
- [ ] Un taller formativo por tema con enunciado, evidencia y RA (los **aprobados**, `estado: aprobado`). 🟠
- [ ] T6 = proyecto integrador sumativo que integra RA1+RA2. 🔴
- [ ] Rúbrica analítica disciplinar CE1–CE2 con niveles No Evidenciable→Sobresaliente, completa y sin huecos. 🟠
- [ ] Rúbrica holística (actitud/compromiso + colaboración) presente. 🟠
- [ ] Auto/co/heteroevaluación contempladas (apropiación individual, socialización/foro, docente). 🟠
- [ ] Quizzes SCORM con feedback por ítem; sin respuestas correctas ambiguas o múltiples válidas no marcadas. 🔴
- [ ] Brecha de ponderaciones: marcada como pregunta al docente, **no inventada**. 🟠

### D6 · Recursos y referencias — EST + DI
- [ ] 5 materiales complementarios presentes; **inglés = M3 + M4 = 40%**. 🟠
- [ ] 3 componentes didácticos (Video interactivo T1, Infografía animada T3, OVA/juego T4) con prompt en `fase-6-prompts/`. 🟠
- [ ] Citas en **APA 7** correctas (autor, año, título en cursiva, editorial; ed. en inglés). 🟠
- [ ] "**Elaboración propia**" en todo recurso creado (componentes, figuras, SCORM). 🔴
- [ ] Enlace abierto de Downey (`greenteapress.com/wp/think-python-2e/`) vigente; resto con `todo` de acceso (no inventar). 🟠
- [ ] Cobertura `coberturaPorTema` respetada en las páginas `complementary` de Moodle. 🟡

### D7 · Accesibilidad — ver §6 (ACC)

### D8 · Técnico / LMS — LMS
- [ ] Validador Moodle: **OK, 0 errores / 0 advertencias** (§4.1). 🔴
- [ ] Los 6 SCORM son JSON válido (§4.2). 🔴
- [ ] Sin `<script>`/`<style>`/`<link>`/`on*=` en SCORM ni en el render Moodle (§4.3). 🔴
- [ ] Cada página de tema enlaza el SCORM correcto `contenido-0N` (1↔1). 🔴
- [ ] Paquetes SCORM empaquetan e inician en el LMS (manifest, navegación, reporte de estado). 🟠
- [ ] TODOs inventariados (§4.4): URLs de video, SCORM, tareas, cuestionario/foro, syllabus/cronograma, datos del docente. 🟠
- [ ] Ningún enlace roto; ninguna URL ficticia publicada como real. 🔴

### D9 · Integridad y estilo — EST + DOC
- [ ] **Similitud ≤ 30%** (informe antiplagio sobre el documento de saberes). 🔴
- [ ] Ortografía y gramática (español) sin errores; términos en inglés bien escritos. 🟡
- [ ] Marca **Universidad de América**, acento `#c0f500`, tipografías Montserrat/Inter/JetBrains Mono. 🟡
- [ ] No se inventaron datos del syllabus (código de asignatura, ponderaciones, docente quedan vacíos con `todo`). 🔴
- [ ] Tono institucional y consistente entre temas. 🟡

---

## 6. Accesibilidad — WCAG 2.1 nivel AA (ACC)

| WCAG | Criterio | Verificación en este aula | Sev. |
|------|----------|---------------------------|:----:|
| 1.1.1 | Contenido no textual | **Alt text** en cada `image`, figura de pila/heap, matriz y flujograma; descripción en infografía/OVA. | 🔴 |
| 1.2.2 / 1.2.3 | Subtítulos y transcripción | Subtítulos en el video interactivo (T1) y videos de intro; transcripción del audio disponible. | 🟠 |
| 1.3.1 | Información y relaciones | Encabezados/listas/tablas con estructura semántica; tablas con encabezados asociados. | 🟠 |
| 1.4.1 | Uso del color | El significado **no depende solo del color** (estados de traza, ramas if/else, correcto/incorrecto). | 🔴 |
| 1.4.3 | Contraste mínimo (AA) | Texto ≥ 4.5:1; UI ≥ 3:1. Verde `#c0f500` solo como **acento**, no como fondo de texto largo. | 🟠 |
| 1.4.4 | Redimensionar texto | Legible al 200% de zoom sin pérdida de contenido ni scroll horizontal. | 🟡 |
| 2.1.1 | Teclado | Interactivos (`stepper`, `flashcards`, `matching`, drag-and-drop del OVA) operables por teclado. | 🔴 |
| 2.4.7 | Foco visible | Indicador de foco visible en enlaces, controles de quiz e interactivos. | 🟠 |
| 3.1.x | Idioma | `lang="es"`; marcar fragmentos en inglés (M3/M4, código) cuando aplique. | 🟡 |
| 3.3.1 / 3.3.3 | Errores y sugerencias | Quizzes identifican el error y dan retroalimentación correctiva (positiva y negativa). | 🟠 |
| 4.1.2 | Nombre, rol, valor | Componentes interactivos exponen nombre/rol/estado a tecnología de apoyo. | 🟠 |

> Atención particular: el **OVA/juego didáctico del T4** (arrastrar y soltar + emparejamiento) es el de mayor riesgo de accesibilidad — exige alternativa por teclado y retroalimentación no dependiente del color.

---

## 7. Checklist general de publicación (pre-flight, una pasada rápida)

- [ ] 🔴 Validador Moodle OK + 6 SCORM JSON válidos + sin contenido activo.
- [ ] 🔴 RA1/RA2 literales y mapeo RA↔Tema correcto; S1–S25 sin huérfanos.
- [ ] 🔴 Código Python y pseudocódigo correctos (firma del docente, D3).
- [ ] 🔴 Diagnóstica con feedback +/− por ítem; proyecto integrador integra RA1+RA2.
- [ ] 🔴 "Elaboración propia" en recursos creados; similitud ≤ 30%; sin datos inventados.
- [ ] 🔴 Alt text, no-solo-color y operabilidad por teclado en interactivos.
- [ ] 🟠 5 materiales (40% inglés), APA 7, rúbricas CE1–CE2 + holística completas.
- [ ] 🟠 Cada tema enlaza su SCORM `contenido-0N`; TODOs inventariados con responsable.
- [ ] 🟠 Subtítulos/transcripción de video; contraste AA.
- [ ] 🟡 Estilo, ortografía, marca UA, zoom 200%, idioma marcado.

---

## 8. Registro de hallazgos (plantilla)

| ID | Dim. | Sev. | Artefacto · ruta del nodo | Descripción | Responsable | Estado | Re-test |
|----|:----:|:----:|---------------------------|-------------|:-----------:|:------:|:------:|
| H-001 | D? | 🔴/🟠/🟡 | `…contenido-0N.json` › … | | DI/DOC/EST/LMS/ACC | abierto/cerrado | ✔/✘ |

**Semáforo por dimensión (consolidado):** D1 ⬜ · D2 ⬜ · D3 ⬜ · D4 ⬜ · D5 ⬜ · D6 ⬜ · D7 ⬜ · D8 ⬜ · D9 ⬜
(🟢 sin abiertos · 🟡 solo menores · 🔴 críticos/mayores abiertos)

---

## 9. Compuerta de salida (Fase 8 → Fase 9)

Se aprueba el paso a entrega cuando:
1. 0 hallazgos 🔴 abiertos.
2. 0 hallazgos 🟠 sin plan de corrección (responsable + fecha) o sin excepción firmada por el docente.
3. D3 y D5 con **visto bueno disciplinar del docente**.
4. Validador Moodle en OK y 6 SCORM válidos re-verificados tras correcciones.
5. Inventario de TODOs entregado al autor del aula (lista de §4.4 / fase-7).

Al cerrar, actualizar `estado-proyecto.json` (`fase: 8`, `gate: "qa-aprobado"`) y registrar el semáforo final.
