---
name: seleccion-metodologia-ua
description: Paso 0 del proceso de virtualización de la Universidad de América. A partir del syllabus, asume el rol de Adecuador pedagógico (PL-VIR-001) y RECOMIENDA la metodología de aprendizaje más óptima entre las cinco oficiales (AG, ABPr, ABI, ABR, ABC), con justificación basada en el resultado de aprendizaje, los saberes, la naturaleza de la asignatura (teórica/práctica), la técnica/evidencia de evaluación y el tipo de producto esperado. Produce un documento de recomendación con comparativa de las cinco metodologías y casilla de validación docente, y deriva a la skill de virtualización correspondiente (virtualizacion-<metodología>). Úsala ANTES de elegir una skill de virtualización, cuando no esté decidida la metodología o se quiera fundamentar la elección.

---

# Selección de metodología de aprendizaje (Paso 0 · UA)

Skill previa al proceso de virtualización. Analiza el syllabus y **recomienda la metodología de aprendizaje
más óptima** para la asignatura, con el rigor del rol institucional responsable de esa decisión. Su salida
alimenta el instrumento de validación docente y determina con qué skill de virtualización se continúa.

## Rol

Asume el rol de **Adecuador pedagógico** (PL-VIR-001): el responsable institucional de convertir el syllabus
en una ruta virtual por resultados de aprendizaje y de seleccionar la metodología activa. La recomendación
se emite y firma desde este rol (puede apoyarse en el experto disciplinar para matices del área).

## Cuándo usar

- Aún no está decidida la metodología de la asignatura.
- Se quiere **fundamentar** la elección de metodología desde el syllabus antes de generar contenido.
- Es el **Paso 0**: precede a `virtualizacion-<metodología>` (AG/ABPr/ABI/ABR/ABC).

## Core Workflow

1. **Extrae el syllabus** (Excel FO_03 / PDF / texto) a los campos clave: RA, saberes, naturaleza
   (teórica/práctica), técnica y evidencia de evaluación, producto esperado, créditos, perfil/competencia.
   No inventes datos; lo faltante es brecha.
2. **Aplica la matriz de decisión** de `references/matriz-metodologias.md`: puntúa el ajuste de cada una de
   las cinco metodologías oficiales a la asignatura (alto/medio/bajo) según las señales del syllabus.
3. **Recomienda la metodología óptima** (la de mayor ajuste) con **justificación** explícita anclada al
   syllabus (qué señales la sustentan) y una **comparativa de las cinco** (por qué se descartan las otras).
4. **Produce el documento de recomendación** (`templates/recomendacion-metodologia.md`): rol, metodología
   recomendada, justificación, tabla comparativa de las 5, y **casilla de validación docente** (aprobar la
   recomendada o elegir otra, con espacio para justificar). Este documento encabeza el instrumento del
   Pipeline 1.
5. **Deriva** a la skill de virtualización correspondiente: `virtualizacion-aprendizaje-guiado` (AG),
   `virtualizacion-abpr`, `virtualizacion-abi`, `virtualizacion-abr`, `virtualizacion-abc`. La metodología
   no se considera fijada hasta que el docente valide la recomendación.

## Reglas

- **Solo recomienda; el docente valida.** La metodología definitiva la confirma el profesor (Adecuador
  pedagógico + programa académico). El documento incluye siempre la opción de cambiarla.
- Las cinco metodologías oficiales son las de AN-VIR-001 / PL-VIR-001; no inventes otras.
- Recomendación **fundamentada en el syllabus**, no por preferencia. Si el syllabus no da señales
  suficientes (p. ej. no aclara naturaleza ni evidencia), decláralo como brecha y recomienda con la
  evidencia disponible, marcando el supuesto.
- La recomendación es coherente con el diseño inverso: RA → evidencia de evaluación → metodología.

## Señales rápidas (resumen; detalle en `references/matriz-metodologias.md`)

- Producto = **proyecto/prototipo** con fases diagnóstico→diseño→cierre → **ABPr**.
- Eje = **pregunta/problema de investigación**, marcos teóricos, método, resultados → **ABI**.
- Eje = **reto** abierto con ideación y solución validada → **ABR**.
- Análisis de **casos reales / situaciones** con preguntas direccionadoras → **ABC**.
- Asignatura **teórica fundacional**, progresión por temas/etapas, sin proyecto/reto/caso como eje → **AG**.

## Salida

`recomendacion-metodologia.md` (rol, metodología recomendada + por qué, comparativa de las 5, validación
docente) → se antepone al instrumento del Pipeline 1 de la skill de virtualización elegida.

## Resources

- `references/matriz-metodologias.md` — señales del syllabus → metodología, y criterios de puntuación.
- `templates/recomendacion-metodologia.md` — plantilla del documento de recomendación.
- `scripts/extract_syllabus.mjs` — extrae el syllabus (Excel/PDF/texto) a JSON.
