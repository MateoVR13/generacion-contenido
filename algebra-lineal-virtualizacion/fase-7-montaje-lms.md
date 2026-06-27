# Fase 7 — Montaje en LMS (Moodle) · Álgebra Lineal (AG)

Plan de aula para la **envoltura institucional en Moodle** que rodea al SCORM de Álgebra Lineal.
Asignatura **teórica, 100 % virtual, transversal a las ingenierías**, metodología **Aprendizaje Guiado (AG)**, 3 créditos, 4 semanas.

- JSON fuente: `fase-7-montaje-lms/algebra-lineal-AG.moodle.json` (raíz `moodle`).
- Renderer: `../moodle-content/template/` → genera el HTML inline pegable página por página.
- Marca: lima `#c0f500` (acento principal), ámbar `#f0b300` (secundario), fondo oscuro `#1a2403`, Montserrat/Inter, logo UA. Todo el estilo lo aplica el renderer; el JSON no lleva HTML salvo `<em>`/`<strong>` en referencias APA.

> **Nota de cardinalidad (AG = 7 vs 5):** la skill `moodle-content` y su validador asumen por defecto **7 "Contenidos"** para AG (coherentes con la skill `aprendizaje-guiado-scorm`, que genera 7 escenarios). Para **Álgebra Lineal el docente validó 5 temas** (`estado-proyecto.json`: `nTemasFinal: 5`, todos `aprobadoDocente: true`). Se respeta la decisión curricular validada → **5 páginas de momento**. Por ello el validador reporta una única discrepancia esperada (`AG requires 7 moment pages, found 5`); todo lo demás pasa. **No se inventan 2 contenidos** para cuadrar el número (regla del proyecto: no inventar datos curriculares). El autor/coordinación de virtualidad debe ajustar el default del validador a 5 para esta asignatura si requiere exit 0.

---

## 1. Estructura y orden de navegación

Una sección Moodle por página del JSON. Orden de `pageOrder`:

| # | Página Moodle | Tipo | Etiqueta visible | RA |
|---|---|---|---|---|
| 0 | Bienvenida | `welcome` | Bienvenida del curso | RA1·RA2·RA3 |
| 1 | Contenido 1 | `moment` | Sistemas de ecuaciones lineales y Gauss-Jordan | RA1, RA2 |
| 2 | Contenido 2 | `moment` | Matrices y operaciones | RA1 |
| 3 | Contenido 3 | `moment` | Determinantes, inversa y regla de Cramer | RA2 |
| 4 | Contenido 4 | `moment` | Vectores en el plano y el espacio | RA1, RA2 |
| 5 | Contenido 5 | `moment` | Rectas, planos y aplicaciones | RA1, RA2, RA3 |
| 6 | Cierre | `closing` | Cierre del curso | RA1·RA2·RA3 |

- Etiqueta AG: **"Contenido N"** (`momentLabelSingular: "Contenido"`); chip del hero **"5 Contenidos"**.
- Formato de curso sugerido: **Temas (Topics)** con 7 secciones, en orden de la tabla; o **Pestañas/Onetopic** para que cada página sea una pestaña navegable.

---

## 2. Configuración por sección

### Sección 0 — Bienvenida (`welcome`)
Componentes del JSON: `hero`, `learning-outcomes`, `activities`, `course-glance`, `resources`, `footer`.
- **Etiqueta HTML (Label)** con el HTML generado por el renderer para esta página (pegar en el editor HTML, modo código fuente).
- **Actividades de inicio** a montar como módulos Moodle reales y enlazar desde las CTA del HTML:
  - **Cuestionario diagnóstico** (`mod/quiz`): 10 preguntas contestadas de un **banco de 15**, **retroalimentación por pregunta**, 1 intento, formativo (no califica). Insumo del **Balance inicial**.
  - **Foro de presentación** (`mod/forum`, tipo "debate sencillo" o "uso general"): intervención inicial ≥ 80 palabras + 2 respuestas.
  - **Balance inicial** (`mod/assign` o `mod/quiz` de autoevaluación): registro del momento inicial.
- **Course-glance:** completar datos del docente (no inventar), subir PDF de **syllabus** y **cronograma**, pegar sus URLs.
- **Recursos:** Larson (2010) y Grossman (2008) como e-books/fichas; serie de video y software (GeoGebra / calculadora matricial).

### Secciones 1–5 — Contenidos (`moment`)
Cada una con: `moment-banner`, `moment-intro` (texto + video), `scorm-link`, `practice-link`, `complementary`, `footer`.
- **Paquete SCORM** (`mod/scorm`) por contenido → documento de saberes interactivo del tema (extensión total 40–45 págs repartida entre los 5 temas). Pegar su URL en `scorm-link`.
- **Práctica/taller** (`mod/assign` y, en Contenido 4, también `mod/forum`) → enlazar desde `practice-link`.
- **Video del momento** (Synthesia) → `moment-intro.videoEmbedUrl` (placeholder).
- **Material complementario:** Larson y Grossman en APA 7 (campo `apa` con `<em>`).
- Talleres por contenido (formativos): C1 modelar/resolver sistema (Gauss-Jordan); C2 operaciones matriciales aplicadas; C3 Cramer e inversa + comparar métodos; **C4 vectores aplicados + foro debate**; **C5 (ajuste del docente)** hallar ecuaciones de recta y plano, graficar y hallar intersecciones plano-recta y recta-recta.

### Sección 6 — Cierre (`closing`)
Componentes: `closing-hero`, `summary` (RA1–RA3), `next-steps`, `final-evaluation`, `footer`.
- **Taller integrador final** (`mod/assign`) en la **última semana**, integra los 5 contenidos (modela, resuelve, evalúa pertinencia — RA1–RA3). Enlazar desde `final-evaluation` y desde `next-steps`.
- **Auto/coevaluación** de cierre con rúbricas analítica (CE1–CE3) y holística.

---

## 3. Foros, tareas, cuestionarios, wikis y rúbricas

**Foros (`mod/forum`)**
- Foro de presentación (Bienvenida).
- Foro de debate (Contenido 4): interpretación y aplicación de producto punto/cruz en varias ingenierías.

**Cuestionarios (`mod/quiz`)**
- Diagnóstico (Bienvenida): 10/15, retro por pregunta, formativo.
- (Opcional) banco de práctica por contenido si se desea autoevaluación automatizada; el diseño base usa **talleres/tareas**, no cuestionarios sumativos.

**Tareas (`mod/assign`)**
- Taller formativo por contenido (C1–C5), con C5 según el ajuste del docente.
- Taller integrador final (Cierre), sumativo, última semana.
- Balance inicial y auto/coevaluación de cierre.

**Wikis (`mod/wiki`)** — opcional, no exigido por el diseño validado. Si se usa: glosario colaborativo de álgebra lineal o bitácora de resolución por equipos en la actividad colaborativa del Contenido 5.

**Rúbricas (Advanced grading en `mod/assign`)**
- **Analítica disciplinar** alineada a **CE1, CE2, CE3**, escala No Acreditable → Sobresaliente. Aplicar al taller integrador final y a talleres formativos clave.
- **Holística** de actitud/compromiso/colaboración para foros y actividad colaborativa.
- **Participación:** autoevaluación, coevaluación y heteroevaluación (momentos inicial, de avance y final).

> **Sin ponderaciones:** el docente confirmó que **no existen pesos/porcentajes institucionales por actividad**. La calificación se gestiona con rúbricas cualitativas, no con pesos numéricos. Configurar el libro de calificaciones en consecuencia (escalas cualitativas / sin ponderación obligatoria).

---

## 4. Placeholders que el autor debe completar (todos como `""` + `todo` en el JSON)

- Videos (Synthesia/YouTube): presentación del curso y uno por contenido (5).
- Paquetes **SCORM** por contenido (5) — URLs `mod/scorm`.
- Talleres/tareas y foros — URLs `mod/assign` / `mod/forum` (incluye foro C4, taller integrador final, balance inicial, auto/coevaluación).
- Cuestionario diagnóstico — URL `mod/quiz` + fechas.
- **Syllabus** y **cronograma** en PDF — URLs `pluginfile`.
- Recursos de apoyo (e-books, serie de video, software) — URLs.
- Datos del docente (nombre, foto, título, bio) — no inventar.
- Fechas de apertura/cierre — `opensAt`/`closesAt` vacíos hasta definir el calendario.

---

## 5. Alertas heredadas (mantener visibles para Coordinación de Virtualidad)

- **Horas:** equivalencia 48 h docencia directa (syllabus) vs 15 h acompañamiento (PL-VIR-001, 3 cr) **no indicada por el docente** → mantener alerta.
- **Cardinalidad AG:** 5 temas validados vs default 7 del pipeline (ver nota superior).
- **Similitud ≤ 30 %** y **"Elaboración propia"** en todo recurso creado; APA 7 en referencias.

---

## 6. Validación

```
node /Users/eximius/Documents/Programming/generacion-contenido/moodle-content/skill/scripts/validate_moodle_json.js \
  /Users/eximius/Documents/Programming/generacion-contenido/algebra-lineal-virtualizacion/fase-7-montaje-lms/algebra-lineal-AG.moodle.json
```

Resultado: **FAIL por una sola causa esperada** — `methodology "AG" requires 7 moment pages, found 5` (decisión curricular validada de 5 temas). El resto de comprobaciones (raíz `moodle`, consistencia `pageOrder`↔`pages`, 1 welcome + 1 closing, tipos de componente válidos/permitidos por página, ausencia de `<script>`/`<style>`/`on*=`/`javascript:`) **pasa**. Para obtener exit 0 sin alterar el currículo, ajustar `MOMENTS_BY_METHODOLOGY.AG` (o añadir excepción por asignatura) en el validador del proyecto `moodle-content`.
