# Instrumento de validación docente (ABR) — contrato

Es la **salida del Pipeline 1** y la **entrada del Pipeline 2**. Lo responde el profesor que estará a cargo
de la virtualización. Debe ser claro, editable y específico de ABR. Se entrega en `.md` (+ `.docx` opcional +
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

3. **Estructura por momentos ABR (4 momentos fijos)** — tabla propuesta en F2, el docente valida:
   | Momento | RA asociado | Propósito | Preguntas direccionadoras | ¿Aprobado? / ajustes |
   - Los **4 momentos son fijos** en ABR: `Definición del reto`, `Ideación`, `Solución e implementación`,
     `Validación y evaluación`. **El docente NO cambia el número ni el nombre de los momentos**; valida el
     **propósito** y las **preguntas direccionadoras** de cada uno, y confirma el **escenario inicial**
     (situación-contexto + reto definido + preguntas direccionadoras).
   - ¿El **escenario inicial** (situación-contexto, reto y preguntas direccionadoras) es pertinente y reta al
     estudiante de forma realista? ¿Los propósitos y preguntas direccionadoras son correctos disciplinarmente?
   - **Subtemas relevantes por momento (solo listado, requiere validación del profesor).** Además de los
     momentos, presenta —en una TABLA aparte— **los subtemas más relevantes de cada momento, únicamente
     listados, sin desarrollarlos**. Una fila por momento con: momento, lista de subtemas relevantes
     propuestos, columna **¿Completos?** (`[ ] Sí [ ] Ajustar`) y una columna para que el profesor
     **agregue/quite** subtemas. Su fin es validar la **cobertura disciplinar** antes de generar contenido.
     Reglas: lista solo los subtemas **realmente relevantes** (3–7 por momento como referencia, no
     exhaustivos), derivados del syllabus/saberes; no inventes subtemas que el syllabus no respalde; **no
     escribas explicaciones ni párrafos**, solo el nombre de cada subtema separado por `·` o en viñetas cortas.

4. **Actividades y TALLERES del estudiante por momento (requiere aprobación del profesor):**
   - Presenta, como TABLA revisable, el **taller propuesto por cada momento**: momento, enunciado del
     taller, evidencia esperada, RA/criterio, y columna **¿Aprobado?** (`[ ] Aprobar [ ] Quitar [ ] Ajustar`).
   - Para cada momento, ¿qué **actividades** debe realizar el estudiante (individuales y colaborativas)?
   - ¿Los talleres y actividades propuestos son pertinentes? ¿Qué agregar/cambiar?
   - Regla: el taller se redacta/incluye completo en el momento **salvo que el profesor lo marque "Quitar"**;
     lo que marque "Ajustar" se corrige antes de generarlo. **Ningún taller entra en un momento sin esta
     revisión docente.**

5. **Recursos didácticos y material complementario** (cantidades por créditos: componentes 2/3/4,
   material 3/5/7):
   - ¿Qué recursos didácticos sugiere (infografía, video, podcast, mapa, OVA, juego…) y para qué momento?
   - **MATERIAL COMPLEMENTARIO PROPUESTO (requiere aprobación del profesor).** Presenta la matriz propuesta
     en la Fase 2 como una TABLA revisable, una fila por material: `#` (M1, M2…), referencia APA, tipo,
     **idioma (ES/EN)**, momento(s) asociado(s), justificación, y una columna **¿Aprobado?** con casillas
     `[ ] Aprobar [ ] Quitar [ ] Ajustar`. Incluye filas en blanco para que el profesor **agregue** material.
     Indica la cobertura por momento. Regla: el material se incluirá en los momentos **salvo que el profesor
     lo marque "Quitar"**; lo que marque "Ajustar" se corrige antes de incluirlo. **El material complementario
     NO entra en ningún momento de aprendizaje hasta pasar por esta revisión docente.**
   - **Bibliografía en inglés (≥ 30%).** Indica bajo la tabla el porcentaje de material en inglés y declara
     que, por internacionalización (syllabus UA), **al menos el 30% del total debe estar en inglés**. Si la
     propuesta no llega al 30%, señálalo para que el profesor agregue/sustituya fuentes en inglés.

6. **Evaluación** (propuesta en F3, el docente valida):
   - Diagnóstica (10/15), formativas de seguimiento, sumativa integradora, foro debate, wiki, coevaluación.
   - ¿Las evidencias y rúbricas son adecuadas? ¿Ponderaciones si aplica?
   - **BANCO DIAGNÓSTICO PROPUESTO (requiere aprobación del profesor).** Presenta las **15 preguntas
     propuestas** de prerrequisitos (enunciado, opciones, respuesta correcta, retroalimentación) como lista
     revisable, cada una con `[ ] Aprobar [ ] Quitar [ ] Ajustar` y filas para que el profesor **agregue**.
     El banco solo se finaliza con las preguntas aprobadas/ajustadas por el profesor. **Ninguna pregunta
     diagnóstica se publica sin esta revisión docente.** (Si el banco es extenso, puede adjuntarse como anexo
     del instrumento, pero debe ir CON el instrumento para su validación.)

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
