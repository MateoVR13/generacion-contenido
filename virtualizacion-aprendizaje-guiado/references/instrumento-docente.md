# Instrumento de validación docente (AG) — contrato

Es la **salida del Pipeline 1** y la **entrada del Pipeline 2**. Lo responde el profesor que estará a cargo
de la virtualización. Debe ser claro, editable y específico de AG. Se entrega en `.md` (+ `.docx` opcional +
`.json` espejo). La plantilla rellenable está en `templates/instrumento-validacion-docente.md`.

## Propósito

Que el docente **valide y enriquezca** lo que el análisis automático (F0–F4) propuso, ANTES de generar
contenido: confirmar que el contenido, las actividades y los recursos son correctos y coherentes con la
asignatura, y aportar lo que solo el experto disciplinar sabe.

## Secciones obligatorias

1. **Identificación y configuración** (precargada desde F0–F1, el docente confirma o corrige):
   asignatura, programa, créditos, modalidad, RA, saberes, técnica de evaluación. Campo: ¿es correcto? / ajustes.

2. **Naturaleza de la asignatura**:
   - ¿La asignatura es teórica, práctica o teórico-práctica?
   - **Si es práctica**: ¿qué recursos de **simulación / laboratorio / software** deben consultarse o
     integrarse? (ej. simuladores, laboratorios virtuales, datasets, herramientas). ¿Qué prácticas debe
     realizar el estudiante?

3. **Estructura de temas AG (N variable)** — tabla propuesta en F2, el docente valida:
   | Tema (propuesto) | RA asociado | Propósito por etapa | Preguntas orientadoras | ¿Aprobado? / ajustes |
   - ¿El **número de temas (N)** es adecuado? ¿Fusionar, dividir, reordenar, agregar o quitar temas?
   - ¿Los propósitos y preguntas orientadoras son correctos disciplinarmente?

4. **Actividades del estudiante por tema**:
   - Para cada tema, ¿qué **actividades** debe realizar el estudiante (individuales y colaborativas)?
   - ¿Las actividades propuestas son pertinentes? ¿Qué agregar/cambiar?

5. **Recursos didácticos y material complementario** (cantidades por créditos: componentes 2/3/4,
   material 3/5/7):
   - ¿Qué recursos didácticos sugiere (infografía, video, podcast, mapa, OVA, juego…) y para qué tema?
   - ¿Qué **bibliografía/material complementario** específico recomienda? (fuentes reales, APA).

6. **Evaluación** (propuesta en F3, el docente valida):
   - Diagnóstica (10/15), formativas de seguimiento, sumativa integradora, foro debate, wiki, coevaluación.
   - ¿Las evidencias y rúbricas son adecuadas? ¿Ponderaciones si aplica?

7. **Sugerencias y feedback libre del docente**:
   - Observaciones generales, errores a evitar, énfasis disciplinares, ejemplos/casos preferidos, fuentes
     base obligatorias, advertencias éticas/legales.

8. **Brechas declaradas** (de F0–F4) que el docente debe resolver o confirmar:
   - Lista de datos faltantes/inconsistencias detectadas, cada una con su pregunta concreta.

## Reglas de redacción del instrumento

- Lenguaje claro dirigido al docente; cada sección explica qué se le pide y por qué.
- Precargar lo derivado del syllabus (no preguntar lo que ya se sabe); pedir validación, no re-captura.
- Campos de respuesta visibles (`> Respuesta:` / casillas `[ ] Aprobado [ ] Ajustar`).
- El `.json` espejo replica cada pregunta con un campo `respuesta` vacío para re-ingerir las respuestas.
- No inventar: lo que falta se presenta como pregunta/brecha, no como dato asumido.
