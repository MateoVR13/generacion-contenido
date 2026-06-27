# Fase 8 — QA · Checklists de calidad del aula virtual · Álgebra Lineal (AG)

Plantillas **rellenables** para el aseguramiento de calidad del aula virtual de **Álgebra Lineal**
(asignatura **teórica, 100 % virtual, transversal a las ingenierías**, metodología **Aprendizaje Guiado (AG)**,
3 créditos, 4 semanas, **5 contenidos** validados por el docente — `estado-proyecto.json: nTemasFinal: 5`).

> **Alcance.** Este documento NO genera contenido nuevo: son listas de verificación, escalas y matrices para
> auditar lo ya producido (documento de saberes 40–45 págs, SCORM por contenido, recursos, montaje en Moodle).
> Marca cada ítem con `[ ]` (pendiente), `[x]` (cumple) o `[N/A]` (no aplica). Registra hallazgos con su
> severidad en la sección 9 (bitácora).

Convención de marcado por ítem: **C** = Cumple · **NC** = No cumple · **P** = Parcial · **NA** = No aplica.

---

## 1. Dimensiones de calidad

| # | Dimensión | Qué evalúa | Evidencia / artefacto fuente |
|---|---|---|---|
| D1 | **Pedagógica / didáctica (AG)** | Alineación RA ↔ saberes ↔ actividades ↔ evaluación; secuencia de Aprendizaje Guiado; preguntas orientadoras; progresión por contenidos | `fase-2-planeacion-didactica.md`, `estado-proyecto.json` (temas, RA) |
| D2 | **Disciplinar / rigor matemático** | Corrección de definiciones, teoremas, procedimientos (Gauss-Jordan, determinantes, Cramer, vectores, rectas/planos); notación; resultados de ejercicios | `documento-saberes/`, SCORM |
| D3 | **Contenido y curaduría** | Extensión 40–45 págs repartida en 5 temas; 3 componentes didácticos; 5 materiales complementarios; enfoque transversal a ingenierías; sin invención de datos | `fase-5-documento-saberes.md`, `fase-6-recursos.md` |
| D4 | **Multimedia / recursos** | Videos (Synthesia), imágenes, gráficas, software (GeoGebra/calculadora matricial); calidad técnica; subtítulos; "Elaboración propia" | `fase-6-recursos.md`, `fase-6-prompts/` |
| D5 | **Técnico-funcional (LMS/SCORM)** | Empaquetado y arranque SCORM; navegación; enlaces; módulos Moodle; tracking/reporte; sin `<script>`/`<style>`/`on*=` en JSON | `fase-7-montaje-lms/`, validador `validate_moodle_json.js` |
| D6 | **Accesibilidad (WCAG 2.1 AA)** | Contraste, navegación por teclado, lectores de pantalla, alt-text, **accesibilidad de la matemática (MathML/LaTeX legible)**, subtítulos | Aula montada, SCORM, ver §6 |
| D7 | **Evaluación y retroalimentación** | Diagnóstica 10/15 con retro por pregunta; formativas por momento; sumativa integradora; rúbricas analítica (CE1–CE3) y holística; auto/co/heteroevaluación | `fase-3-diseno-evaluacion.md`, ver §7 |
| D8 | **Marca e identidad visual** | Paleta lima/ámbar/fondo oscuro, tipografías Montserrat/Inter, logo UA, consistencia de plantilla | `referencias/identidad_marca.md`, renderer |
| D9 | **Lenguaje, estilo y normativa** | Ortografía/redacción, registro académico, claridad para virtualidad; APA 7; **similitud ≤ 30 %**; "Elaboración propia" | `referencias/lineamientos_virtualidad.md`, informe de similitud |
| D10 | **Integridad de datos curriculares** | RA/saberes/CE sin alteración; brechas registradas (horas, ponderaciones) visibles; nada inventado | `estado-proyecto.json`, `fase-4-validacion-academica.md` |

---

## 2. Escala de severidad

| Nivel | Etiqueta | Definición | Acción / SLA sugerido |
|---|---|---|---|
| **S1** | **Crítico / Bloqueante** | Impide el uso o la acreditación: SCORM no arranca, error matemático que induce a aprendizaje incorrecto, RA/CE alterado, pérdida de datos de evaluación, contenido inaccesible total | Bloquea publicación. Corregir antes de liberar. |
| **S2** | **Mayor** | Afecta seriamente la experiencia o la validez: enlace roto a actividad evaluable, rúbrica ausente, falta de retroalimentación por pregunta, incumplimiento de accesibilidad AA en elemento clave, similitud > 30 % | Corregir antes de la apertura del aula. |
| **S3** | **Menor** | Afecta calidad pero no el aprendizaje ni la acreditación: inconsistencia de marca, errata, alt-text mejorable, formato APA con desviación leve | Corregir en la iteración previa al inicio o primera semana. |
| **S4** | **Cosmético / Mejora** | Pulido o recomendación opcional: redacción mejorable, sugerencia de recurso adicional | Backlog; no bloquea. |

Regla de cierre: **0 abiertos en S1 y S2** para publicar; **S3** con plan de corrección fechado; **S4** documentados.

---

## 3. Protocolo de pruebas

**Entornos / dispositivos**

- [ ] Navegadores: Chrome, Firefox, Safari, Edge (última versión).
- [ ] Dispositivos: escritorio, tableta, móvil (responsive).
- [ ] Conexión: prueba en banda ancha y en conexión limitada (carga de video/SCORM).
- [ ] Roles de prueba en Moodle: **estudiante**, **docente**, **invitado/visitante** (si aplica).

**Pasos**

1. [ ] Preparar copia de prueba del aula (curso staging) sin afectar producción.
2. [ ] Matricular usuarios de prueba por rol.
3. [ ] Ejecutar el validador del JSON Moodle (ver comando abajo) y registrar el resultado.
4. [ ] Recorrer la navegación completa: Bienvenida → Contenidos 1–5 → Cierre.
5. [ ] Abrir cada SCORM, completar al menos una página interactiva y verificar **tracking** (estado/nota en libro de calificaciones).
6. [ ] Probar cada actividad evaluable (diagnóstico, talleres, foros, taller integrador) extremo a extremo.
7. [ ] Verificar retroalimentación por pregunta del diagnóstico y rúbricas en las tareas.
8. [ ] Pasar la lista de accesibilidad (§6) con teclado y lector de pantalla.
9. [ ] Registrar cada hallazgo en la bitácora (§9) con dimensión + severidad.
10. [ ] Reprueba (retest) de los hallazgos corregidos.

**Validador técnico del montaje**

```
node /Users/eximius/Documents/Programming/generacion-contenido/moodle-content/skill/scripts/validate_moodle_json.js \
  /Users/eximius/Documents/Programming/generacion-contenido/algebra-lineal-virtualizacion/fase-7-montaje-lms/algebra-lineal-AG.moodle.json
```

> **Discrepancia esperada (no es defecto):** `methodology "AG" requires 7 moment pages, found 5` por la decisión
> curricular validada de **5 temas**. Todo lo demás debe pasar. No inventar contenidos para cuadrar el número.

---

## 4. Matriz de QA por dimensión

Marca C / NC / P / NA y anota severidad si NC/P.

| Dimensión | Criterio verificable | Resultado | Severidad | Evidencia / nota |
|---|---|---|---|---|
| D1 Pedagógica | Cada contenido declara propósito, preguntas orientadoras y actividad alineada al/los RA | | | |
| D1 | Secuencia AG visible (activar → explorar → estructurar → aplicar → evaluar) | | | |
| D2 Disciplinar | Definiciones/teoremas correctos (sistemas, matrices, determinantes, vectores, rectas/planos) | | | |
| D2 | Procedimientos resueltos sin errores; resultados verificados (Gauss-Jordan, Cramer, producto punto/cruz, intersecciones) | | | |
| D2 | Notación matemática consistente y bien renderizada (LaTeX/MathML) | | | |
| D3 Contenido | Extensión total 40–45 págs repartida entre los 5 temas | | | |
| D3 | 3 componentes didácticos y 5 materiales complementarios presentes | | | |
| D3 | Enfoque **transversal** a varias ingenierías (no solo petróleos) | | | |
| D4 Multimedia | Videos con audio claro, subtítulos y duración adecuada | | | |
| D4 | Imágenes/gráficas legibles, con fuente o "Elaboración propia" | | | |
| D5 Técnico | SCORM arranca y reporta estado/nota en todos los contenidos | | | |
| D5 | Validador Moodle pasa salvo la discrepancia esperada de cardinalidad | | | |
| D5 | Sin enlaces rotos; todos los placeholders completados | | | |
| D6 Accesibilidad | Cumple WCAG 2.1 AA (ver §6 detallada) | | | |
| D7 Evaluación | Diagnóstica, formativas, sumativa, rúbricas y participación configuradas (ver §7) | | | |
| D8 Marca | Paleta, tipografías y logo UA consistentes en todas las páginas | | | |
| D9 Lenguaje | Sin erratas; APA 7 correcto; similitud ≤ 30 % verificada | | | |
| D10 Integridad | RA/CE/saberes intactos; brechas (horas, cardinalidad) visibles | | | |

---

## 5. Matriz de QA por rol

### 5.1 Estudiante
- [ ] Puede ver y recorrer Bienvenida → Contenidos 1–5 → Cierre sin bloqueos.
- [ ] Abre cada SCORM y su progreso se guarda al reingresar.
- [ ] Realiza el diagnóstico (10/15) y recibe **retroalimentación por pregunta**.
- [ ] Entrega los talleres formativos y el taller integrador final; ve la rúbrica.
- [ ] Participa en foros (presentación y debate del Contenido 4).
- [ ] Accede a los 5 materiales complementarios y a los recursos (Larson, Grossman, software).
- [ ] Los videos cargan, con subtítulos.
- [ ] Encuentra instrucciones claras de qué hacer y cuándo (sin fechas inventadas).

### 5.2 Docente
- [ ] Ve entregas, calificaciones y rúbricas (analítica CE1–CE3 y holística) operativas.
- [ ] La retroalimentación cualitativa es registrable por actividad.
- [ ] El libro de calificaciones refleja escalas cualitativas (**sin ponderaciones** numéricas obligatorias).
- [ ] Reportes de SCORM/quiz disponibles (intentos, estado, tiempos).
- [ ] Foros configurados con su rol de moderación/apertura.
- [ ] Datos del docente completos (nombre, foto, título, bio) — **no inventados**.

### 5.3 Administrador / Coordinación de Virtualidad
- [ ] Curso creado con formato y secciones correctos; matrícula y roles operativos.
- [ ] Paquetes SCORM cargados y enlazados; URLs `pluginfile` válidas (syllabus, cronograma).
- [ ] Validador del JSON ejecutado y resultado archivado.
- [ ] **Alertas heredadas visibles:** equivalencia de horas (48 h directa vs 15 h acompañamiento, no indicada) y cardinalidad AG (5 vs 7).
- [ ] Copia de seguridad / restauración del curso probada.

---

## 6. Checklist de accesibilidad (WCAG 2.1 AA + matemática)

**Perceptible**
- [ ] Contraste de texto ≥ 4.5:1 (≥ 3:1 para texto grande) — verificar paleta lima/ámbar sobre fondo oscuro.
- [ ] Toda imagen/gráfica tiene **texto alternativo** descriptivo (o `alt=""` si es decorativa).
- [ ] Videos con **subtítulos** sincronizados; transcripción disponible cuando aporta valor.
- [ ] El color no es el único medio para transmitir información.

**Operable**
- [ ] Navegación completa **por teclado** (tab/enter/flechas) en Moodle y dentro del SCORM.
- [ ] Foco visible en todos los controles interactivos.
- [ ] Sin contenido que parpadee > 3 veces/seg.

**Comprensible**
- [ ] Idioma de la página declarado (`lang="es"`).
- [ ] Estructura de encabezados jerárquica y consistente.
- [ ] Instrucciones y mensajes de error claros en actividades.

**Robusto / matemática**
- [ ] Fórmulas accesibles: **MathML** o LaTeX renderizado (MathJax) con texto alternativo legible por lector de pantalla — no imágenes de ecuaciones sin alt.
- [ ] Tablas (matrices, sistemas) con encabezados correctos y leíbles por lector de pantalla.
- [ ] SCORM compatible con tecnología de asistencia (probado con NVDA/VoiceOver).
- [ ] Documentos descargables (PDF) etiquetados/accesibles.

---

## 7. Checklist de evaluación y retroalimentación

**Diagnóstica (inicial)**
- [ ] **10 preguntas contestadas** de un **banco de 15** (aleatorización).
- [ ] Cubre prerrequisitos (operaciones algebraicas, ecuaciones 1.º/2.º, sistemas 2×2, función lineal, coordenadas).
- [ ] **Retroalimentación por pregunta** (concepto a reforzar + referencia).
- [ ] Formativa (no califica); alimenta el **Balance inicial**.

**Formativas (por momento)**
- [ ] T1–T2: taller de modelación/solución de sistemas y operaciones matriciales (RA1, RA2).
- [ ] T3–T4: taller de determinantes/Cramer/vectores + **foro debate** (RA2, RA1).
- [ ] T5: actividad colaborativa de aplicación integradora (RA3).
- [ ] Cada formativa tiene retroalimentación cualitativa registrable.
- [ ] Tema 5 = actividad ajustada por el docente: **recta y plano, gráfica e intersecciones plano-recta y recta-recta**.

**Sumativa (final)**
- [ ] Taller integrador en la **última semana**, integra los 5 contenidos (modela, resuelve, evalúa pertinencia — RA1–RA3).
- [ ] Asociado a rúbrica analítica + holística.

**Rúbricas**
- [ ] **Analítica disciplinar** alineada a **CE1, CE2, CE3**, escala No Acreditable → Sobresaliente.
- [ ] **Holística** de actitud/compromiso y trabajo colaborativo.
- [ ] Visibles para el estudiante antes de la entrega.

**Auto / co / heteroevaluación**
- [ ] **Autoevaluación** (compromiso) en momentos inicial/avance/final.
- [ ] **Coevaluación** en la actividad colaborativa (T5).
- [ ] **Heteroevaluación** del docente con criterios y retroalimentación.

**Integridad evaluativa**
- [ ] **Sin ponderaciones** numéricas obligatorias (confirmado por el docente): calificación cualitativa por rúbricas.
- [ ] Fechas de apertura/cierre coherentes con el calendario (no inventadas).

---

## 8. Checklist general (resumen ejecutivo de salida)

- [ ] Todas las dimensiones D1–D10 revisadas y registradas en §4.
- [ ] **0 hallazgos abiertos S1 y S2.**
- [ ] S3 con plan de corrección fechado; S4 documentados en backlog.
- [ ] Validador Moodle ejecutado; única discrepancia = cardinalidad AG esperada.
- [ ] SCORM de los 5 contenidos arrancan y reportan.
- [ ] Diagnóstica con retro por pregunta + rúbricas operativas.
- [ ] Accesibilidad WCAG 2.1 AA verificada (incl. matemática).
- [ ] Marca UA consistente; APA 7 correcto; **similitud ≤ 30 %** verificada; "Elaboración propia" donde corresponde.
- [ ] Enfoque transversal a las ingenierías confirmado.
- [ ] RA/CE/saberes intactos; **alertas de horas y cardinalidad** visibles para Coordinación de Virtualidad.
- [ ] Retest de correcciones completado.
- [ ] **Visto bueno final** — Responsable: __________ · Fecha: __________

---

## 9. Bitácora de hallazgos (rellenable)

| # | Fecha | Dimensión (D1–D10) | Rol | Descripción del hallazgo | Severidad (S1–S4) | Responsable | Estado | Fecha cierre |
|---|---|---|---|---|---|---|---|---|
| 1 | | | | | | | Abierto / Cerrado | |
| 2 | | | | | | | | |
| 3 | | | | | | | | |
| 4 | | | | | | | | |
| 5 | | | | | | | | |

---

## 10. Alertas a mantener visibles (heredadas)

- **Horas:** equivalencia 48 h docencia directa (syllabus) vs 15 h acompañamiento (PL-VIR-001, 3 cr) **no indicada por el docente** → alerta abierta.
- **Cardinalidad AG:** 5 temas validados vs default 7 del pipeline → discrepancia esperada del validador.
- **Similitud ≤ 30 %** y **"Elaboración propia"** en todo recurso creado; **APA 7** en referencias.
- **No inventar** datos curriculares ni fechas; lo faltante = brecha registrada.
