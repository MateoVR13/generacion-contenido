# Fase 10 — Seguimiento · Algoritmia Computacional I

**Asignatura:** Algoritmia Computacional I · Tecnología en Aplicaciones Digitales Inteligentes · Facultad de Ingeniería
**Metodología:** Aprendizaje Guiado (AG) · 3 créditos · 100% virtual · módulo de 4 semanas (144 h)
**Estructura:** 6 Temas AG (RA1: T1–T4 · RA2: T4–T6) · diagnóstica (15, 10 contestadas) · 6 talleres formativos · proyecto integrador sumativo.
**Propósito de la fase:** monitorear la operación del aula durante el corrido del módulo para tomar decisiones a tiempo (acompañamiento, ajuste de recursos, retención) y dejar evidencia para la mejora continua.

Esta fase **no genera ni modifica contenido**: define el tablero de indicadores, su periodicidad, los responsables y los umbrales de alerta. Donde no hay dato institucional (metas exactas, plataforma de analítica, calendario), se deja `TODO` para el autor; no se inventan cifras.

## Tablero de indicadores

Los 7 indicadores se agrupan en 4 dimensiones. Cada uno define qué mide, su fórmula/fuente, periodicidad, responsable y umbral de alerta (semáforo). Las metas marcadas `TODO` deben fijarlas el programa/coordinación.

### A. Compromiso y avance del estudiante

| # | Indicador | Qué mide / Fórmula | Fuente (LMS) | Periodicidad | Responsable | Meta · Alerta (semáforo) |
|---|---|---|---|---|---|---|
| 1 | **Participación** | % de estudiantes activos en el aula = ingresos + aportes en foros (presentación + debate T4–T5) / matriculados | Logs Moodle, módulo Foro | **Semanal** (1 por semana · 4 cortes) | Docente / tutor | 🟢 ≥80% · 🟡 60–79% · 🔴 <60% `TODO` confirmar meta |
| 2 | **Uso de recursos** | % de apertura de los SCORM (doc. saberes T1–T6), material complementario (M1–M5) y videos | Informe de actividad / SCORM cmi | **Semanal** | Tutor / Coord. Virtualidad | 🟢 ≥70% del recurso del tema vigente · 🟡 50–69% · 🔴 <50% `TODO` |

### B. Desempeño y aprendizaje

| # | Indicador | Qué mide / Fórmula | Fuente | Periodicidad | Responsable | Meta · Alerta |
|---|---|---|---|---|---|---|
| 3 | **Desempeño** | Promedio y distribución de calificaciones por taller (T1–T6) y proyecto integrador, mapeados a RA1/RA2 y rúbricas CE1–CE2 (No Evidenciable→Sobresaliente) | Libro de calificaciones / rúbricas | **Por entrega** (6 talleres + proyecto) | Docente | 🟢 ≥3.5/5.0 promedio · 🟡 3.0–3.4 · 🔴 <3.0 `TODO` escala institucional |
| 4 | **Cumplimiento (entregas)** | % de evidencias entregadas a tiempo / esperadas, por tema | Tareas Moodle (fechas límite) | **Por hito** (cada taller; cierre de semana) | Docente / tutor | 🟢 ≥85% · 🟡 70–84% · 🔴 <70% `TODO` |

### C. Acompañamiento y soporte

| # | Indicador | Qué mide / Fórmula | Fuente | Periodicidad | Responsable | Meta · Alerta |
|---|---|---|---|---|---|---|
| 5 | **Soporte** | N.º de solicitudes (técnicas y académicas) y **tiempo medio de respuesta**; asistencia a encuentros sincrónicos (15 h directa) | Mesa de ayuda / mensajería / registro de sesiones | **Semanal** | Tutor / Soporte técnico | 🟢 respuesta ≤24 h hábiles · 🟡 24–48 h · 🔴 >48 h `TODO` |
| 6 | **Permanencia (retención)** | % de estudiantes que continúan activos = no abandonan ni quedan inactivos >7 días | Logs + alertas tempranas | **Semanal** | Docente / Coord. Bienestar | 🟢 ≥90% · 🟡 80–89% · 🔴 <80% (riesgo deserción) `TODO` |

### D. Calidad percibida

| # | Indicador | Qué mide / Fórmula | Fuente | Periodicidad | Responsable | Meta · Alerta |
|---|---|---|---|---|---|---|
| 7 | **Satisfacción** | Valoración del estudiante sobre claridad de recursos, talleres y acompañamiento (encuesta Likert) | Encuesta de medio módulo + encuesta final | **2 cortes**: fin semana 2 (formativa) y semana 4 (final) | Coord. Virtualidad / docente | 🟢 ≥4.0/5.0 · 🟡 3.5–3.9 · 🔴 <3.5 `TODO` |

## Calendario de seguimiento (módulo de 4 semanas)

Cadencia semanal alineada con la ruta AG (un Tema/momento por avance) y los hitos de entrega.

| Momento | Foco de monitoreo | Indicadores clave | Acción de gestión |
|---|---|---|---|
| **Línea base** (inicio) | Diagnóstica (10/15, revisión automática, sin nota) + foro de presentación | 1, 2 | Identificar prerrequisitos débiles (lógica, álgebra, matemática básica); plan de nivelación |
| **Semana 1** (T1–T2) | Arranque y primeros talleres (pseudocódigo/flujograma; tipos de datos + librería) | 1, 2, 3, 4, 5 | Contactar inactivos; reforzar entorno (Python/PSeInt) |
| **Semana 2** (T3–T4) | Control de flujo y estructuras de datos + **encuesta de medio módulo** | 3, 4, 6, 7 | Alertas tempranas de riesgo; ajustar acompañamiento |
| **Semana 3** (T5) | Funciones, modularidad y memoria (RA2); foro debate | 3, 4, 5, 6 | Tutoría focalizada a estudiantes en 🟡/🔴 |
| **Semana 4** (T6) | **Proyecto integrador** (sumativa RA1+RA2) + **encuesta final** | 3, 4, 6, 7 | Cierre de notas; consolidar tablero; informe de mejora |

## Gobernanza del tablero

- **Recolección:** automática desde Moodle (logs, SCORM `cmi`, libro de calificaciones, foros, tareas) + encuestas. `TODO` confirmar si hay plugin de analítica/dashboard institucional o si se exporta a hoja de cálculo.
- **Consolidación:** el **docente** mantiene el tablero semanal; la **Coord. de Virtualidad** consolida el cierre del módulo.
- **Decisiones por semáforo:** 🟡 → acción de acompañamiento del docente/tutor en la misma semana; 🔴 → escalamiento (Coord. Virtualidad / Bienestar / Soporte técnico) y registro de la intervención.
- **Cierre de ciclo (mejora continua):** al finalizar el módulo se redacta un breve informe con los 7 indicadores vs. meta, lecciones aprendidas y ajustes propuestos al documento de saberes, talleres o recursos para la siguiente cohorte.

## Pendientes para el autor (`TODO`)
1. Fijar las **metas y umbrales** definitivos de cada indicador con el programa (escala institucional 0–5 o porcentajes).
2. Confirmar la **plataforma/medio** de captura y visualización (plugin de analítica Moodle vs. exportación a hoja de cálculo).
3. Cargar el **calendario real** del módulo (fechas de apertura/cierre por tema y de las dos encuestas).
4. Definir el **protocolo de alertas tempranas** y los responsables de escalamiento (datos del docente/tutor están pendientes desde Fase 7).
5. Adjuntar los **instrumentos de encuesta** (medio módulo y final) y el formato del informe de cierre.
