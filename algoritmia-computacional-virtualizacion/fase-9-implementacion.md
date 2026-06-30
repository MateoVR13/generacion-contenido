# Fase 9 — Implementación (guía operativa del aula) · Algoritmia Computacional I

**Asignatura:** Algoritmia Computacional I · Tecnología en Aplicaciones Digitales Inteligentes · Facultad de Ingeniería
**Metodología:** Aprendizaje Guiado (AG) · 3 créditos · 100% virtual · módulo de **4 semanas** · 6 temas (RA1, RA2)
**Estado de entrada:** instrumento aprobado por el docente sin cambios (ver `estado-proyecto.json`, `feedbackDocente`).
**Propósito:** definir cómo se acompaña, dinamiza y temporiza el aula ya montada (Fase 7) durante la operación del módulo.

Esta guía no inventa datos del syllabus. Toda fecha/URL/dato del docente queda como **TODO** para el autor (coherente con la convención de la Fase 7).

## 1. Roles de acompañamiento

| Rol | Responsable | Función en el aula | Canal principal |
|---|---|---|---|
| **Tutor (docente)** | Docente de la asignatura | Conducción académica: dinamiza foros, retroalimenta talleres con rúbrica (CE1–CE2), aclara dudas disciplinares, conduce los encuentros sincrónicos, evalúa el proyecto integrador. | Encuentros sincrónicos, foros, mensajería, tareas Moodle |
| **Consejero (acompañamiento integral)** | Consejería académica del programa | Seguimiento a la permanencia: detecta rezago/inactividad, contacta a estudiantes en riesgo, deriva a bienestar, refuerza hábitos de estudio autónomo. | Mensajería, alertas tempranas, reportes de progreso |

El **tutor** lidera lo cognitivo y evaluativo; el **consejero** lidera lo socioafectivo y la retención. Ambos comparten el panel de progreso del LMS para activar alertas tempranas (inactividad > 1 semana, taller no entregado).

## 2. Acompañamiento (distribución de horas · de `estado-proyecto.json`)

Docencia directa total 48 h. En el componente virtual PL-VIR-001 (3 cr): **15 h directa virtual + 6 h indirecta virtual**, con 90 h individuales y 33 h colaborativas en el trabajo autónomo (144 h totales).

| Tipo | Horas | Concreción en el aula |
|---|---|---|
| **Directa virtual** | **15 h** | Encuentros sincrónicos (tutorías grupales), apertura/cierre de cada tema, sesiones de resolución de talleres y de avance del proyecto. |
| **Indirecta virtual** | **6 h** | Dinamización asíncrona: respuesta en foros, mensajería, retroalimentación escrita de talleres, anuncios. |
| Autónomo individual | 90 h | Estudio de los 6 documentos de saberes (SCORM), material complementario, talleres individuales. |
| Autónomo colaborativo | 33 h | Foros de debate, coevaluación, trabajo de equipo del proyecto integrador. |

> Brecha abierta (`estado-proyecto.json` → `brechas`): equivalencia 48 h directa (syllabus) ↔ 15+6 h virtual (PL-VIR-001). Esta guía opera sobre el marco virtual 15+6; **confirmar la equivalencia con el programa** antes de publicar la carga.

## 3. Tutorías (encuentros sincrónicos)

Aproximadamente **un encuentro sincrónico por semana** (≈3–4 h directas/semana dentro de las 15 h), grabado y publicado para asincronía.

| Semana | Foco del encuentro | Temas | Resultado esperado |
|---|---|---|---|
| 1 | Bienvenida, ruta AG, diagnóstica; del concepto de algoritmo al lenguaje | T1–T2 | Pseudocódigo/flujograma y primer programa con tipos/librería |
| 2 | Control de flujo y estructuras de datos | T3–T4 | Programa con selectivas/iterativas; modelado con estructura adecuada |
| 3 | Funciones, modularidad y memoria; lanzamiento del proyecto | T5 + T6 (inicio) | Refactor modular + análisis de memoria; plan del proyecto |
| 4 | Acompañamiento al proyecto y cierre | T6 | Entrega del proyecto integrador (sumativa RA1+RA2) |

Cada encuentro: agenda breve → dudas de los SCORM → resolución guiada del taller del tema → próximos pasos. **TODO:** fechas/horas y enlace de videoconferencia.

## 4. Foros

| Foro | Tipo | Momento | Evaluación |
|---|---|---|---|
| **Presentación** | Social / ambientación | Semana 1 (con la diagnóstica) | No calificable (participación) |
| **Foro de debate T4–T5** | Académico / colaborativo | Semanas 2–3 | Coevaluación + heteroevaluación (rúbrica holística) |
| **Dudas técnicas (Q&A)** | Permanente | Todo el módulo | No calificable; dinamizado por el tutor |

El foro de debate (estructuras de datos y modularidad/memoria) es la principal evidencia **colaborativa** y alimenta la coevaluación. Pauta de moderación del tutor: responder en ≤ 48 h hábiles, reorientar con preguntas, cerrar cada hilo con una síntesis.

## 5. Mensajería

- **Anuncios (tablón):** apertura de tema, recordatorios de entrega, publicación de grabaciones. Cadencia mínima semanal (tutor).
- **Mensajería 1:1:** retroalimentación privada, gestión de dificultades; el **consejero** la usa para alertas tempranas y seguimiento a inactividad.
- **Tiempos de respuesta de referencia:** mensajes ≤ 24–48 h hábiles; retroalimentación de talleres ≤ 5 días hábiles tras el cierre.

## 6. Cronograma de 4 semanas (alineado a los 6 temas)

Diseño inverso: del concepto de algoritmo al proyecto integrador. Cada tema abre con su SCORM (documento de saberes `contenido-0N`) + recurso didáctico, y cierra con su taller formativo (estado `aprobado`).

| Semana | Temas | Saberes | RA | Actividades clave | Evidencias / hitos |
|---|---|---|---|---|---|
| **1** | T1 Fundamentos del algoritmo · T2 Lenguajes, tipos y librerías | S1–S3, S7–S10 | RA1 | Diagnóstica (10/15, automática) · foro de presentación · SCORM T1–T2 · encuentro 1 | Diagnóstica resuelta · **Taller T1** (pseudocódigo + flujograma + traza) · **Taller T2** (programa con tipos + 1 librería) |
| **2** | T3 Estructuras selectivas y de control · T4 Arreglos y estructuras de datos | S13–S15, S18–S20 | RA1 (T3) · RA1, RA2 (T4) | SCORM T3–T4 · inicio foro de debate · encuentro 2 | **Taller T3** (selectivas + iterativas con parada) · **Taller T4** (modelar y recorrer estructura/matriz) |
| **3** | T5 Funciones, modularidad y memoria · T6 (lanzamiento) | S24, RA2 · S25 | RA2 | SCORM T5 · cierre foro de debate · encuentro 3 · planteamiento del proyecto | **Taller T5** (refactor modular + análisis de memoria) · plan/diseño del proyecto |
| **4** | T6 Proyecto integrador | S25 | RA1, RA2 | Acompañamiento al proyecto · encuentro 4 · cierre · auto/co/heteroevaluación | **Proyecto integrador final** (código + pruebas + documentación) — sumativa RA1+RA2 |

**Hitos transversales:** momentos de evaluación inicial (S1) / avance (S2–S3) / final (S4); autoevaluación, coevaluación y heteroevaluación a lo largo del módulo.

> Brecha abierta: el syllabus **no define ponderaciones** por actividad (`estado-proyecto.json` → `brechas`). Si el programa las exige, comunicarlas como pesos transparentes con criterios cualitativos. **TODO docente.**

## 7. Pendientes del autor (TODO)

1. Definir y publicar **fechas** de las 4 semanas, encuentros sincrónicos y aperturas/cierres de talleres, foros y diagnóstica.
2. Cargar **enlaces** de videoconferencia y grabaciones; completar **datos del docente/consejero**.
3. Confirmar la **equivalencia de horas** 48 h ↔ 15+6 h con el programa.
4. Confirmar **ponderaciones** (o ratificar evaluación cualitativa sin pesos).
5. Activar el **panel de alertas tempranas** compartido tutor–consejero.

Insumos ya disponibles: aula montada (`fase-7-montaje-lms/`), 6 SCORM de saberes (`documento-saberes/`), banco diagnóstico (`evaluacion/`), talleres y material aprobados (`estado-proyecto.json`).
