# Prompt — Video explicativo (resolución paso a paso) · Tema 1: Sistemas de ecuaciones lineales y método de Gauss-Jordan

> Este archivo NO es el recurso: es el **prompt listo para ejecutar** que produce el guion del video.
> Sepáralo de la producción (Fase 6 → producción).

## Contexto

- **Asignatura:** Álgebra Lineal (Ingeniería, transversal), código 131. 3 créditos, **100% virtual, teórica**.
- **Metodología:** Aprendizaje Guiado (AG). Este es el **Tema 1 = primera etapa progresiva** de la ruta.
- **Resultados de aprendizaje:**
  - RA1: Modela problemas de ingeniería utilizando matrices y vectores, aplicando métodos algebraicos para su resolución e interpretación.
  - RA2: Aplica diferentes métodos de solución de sistemas de ecuaciones lineales para modelar y resolver problemas de ingeniería, interpretando los resultados en su contexto.
- **Propósito de la etapa:** representar y resolver problemas con sistemas lineales mediante Gauss-Jordan.
- **Preguntas orientadoras:**
  1. ¿Cómo se traduce un problema de ingeniería a un sistema de ecuaciones?
  2. ¿Cuándo un sistema tiene solución única, infinitas o ninguna?
- **Criterios de evaluación asociados:** CE1, CE2.
- **Fuentes autorizadas (APA 7, no inventar otras):**
  - Larson, R. (2010). *Fundamentos de álgebra lineal* (6.ª ed.). Cengage Learning. (base)
  - Grossman, S. I. (2008). *Álgebra lineal*. McGraw-Hill. (base)
- **Enfoque transversal — ejemplos en 3 ingenierías distintas** (rotar; no centrar en petróleos):
  industrial (mezcla/producción), eléctrica/mecatrónica (balance en nodos), química/ambiental (balanceo
  de reacciones o mezclas).

## Objetivo pedagógico del recurso

Que el estudiante **observe modelado y resuelto, paso a paso**, un problema de ingeniería como sistema de
ecuaciones lineales y siga el procedimiento de Gauss-Jordan hasta interpretar el tipo de solución (única,
infinitas, ninguna), de modo que pueda replicarlo de forma autónoma en el taller de la etapa.

## Instrucción de generación

Genera el **guion completo de un video explicativo** de **6–9 minutos** (formato oficial UA: video
docente con pizarra/grabación y narración), estructurado en escenas. Para cada escena entrega:
**(a) lo que se ve en pantalla**, **(b) la narración (voz en off / docente)** en tono institucional y
lenguaje claro al estudiante, y **(c) el texto en pantalla / fórmula en LaTeX**.

Estructura mínima de escenas:
1. **Apertura (15–20 s):** título, RA y pregunta orientadora 1. Saludo institucional breve.
2. **Del problema al sistema:** plantea UN caso de ingeniería (elige una de las 3 áreas) y traduce el
   enunciado a un sistema de ecuaciones; explica qué representa cada variable.
3. **Matriz aumentada:** construye `[A|b]`.
4. **Gauss-Jordan paso a paso:** muestra las operaciones elementales de fila una por una, indicando la
   operación aplicada en cada transición (p. ej. `F2 → F2 − 3F1`), hasta la forma escalonada reducida.
5. **Interpretación:** lee la solución y conecta con la pregunta orientadora 2 (única / infinitas /
   ninguna) usando el rango.
6. **Variantes rápidas (transversal):** menciona en 30–45 s cómo el mismo método aplica a las otras 2
   ingenierías, sin desarrollarlas completas.
7. **Cierre (15 s):** síntesis, enlace al taller de la etapa y a la fuente (Larson, 2010) para profundizar.

Requisitos de contenido:
- Toda expresión matemática en **LaTeX**.
- Cada paso de Gauss-Jordan debe ser verificable y correcto (incluye, en notas para producción, la
  comprobación de la solución).
- Incluye un **error frecuente** comentado (p. ej. confundir filas, dividir entre pivote cero).
- Lenguaje claro, frases cortas, sin jerga innecesaria.

## Requisitos de marca y accesibilidad

- Paleta UA: fondo claro `#fbf8fb` para pizarra/lectura; acento verde `#c0f500` para resaltar pivotes y
  resultados; encabezados/cortinilla sobre `#1a2403`. Acento amarillo `#f0b300`/`#ffe086` con moderación.
- Tipografía: **Montserrat** (títulos/etiquetas en pantalla), **Inter** (texto de apoyo), **JetBrains Mono**
  para fórmulas escritas como texto. Fórmulas formales en LaTeX renderizado.
- **Logo UA** solo en cortinilla de apertura y cierre (blanco sobre fondo oscuro). No deformar ni repetir.
- Accesibilidad: entregar **guion de subtítulos sincronizables (SRT) y transcripción completa**; describir
  verbalmente cada paso para usuarios con baja visión; contraste mínimo AA; no transmitir información solo
  por color (acompañar el resaltado con etiqueta).

## Restricciones

- **APA 7** en toda mención de fuentes; citar solo Larson (2010) y/o Grossman (2008) (fuentes validadas).
  No inventar autores, años, páginas, DOI ni enlaces.
- Rotular **"Elaboración propia"** el caso, las figuras y la pizarra creados para el video.
- **Similitud externa ≤ 30%**: redacción y casos originales; no copiar enunciados de los textos.
- No inventar datos curriculares; lo faltante se reporta como brecha, no se rellena.
- No centrar los ejemplos solo en petróleos: enfoque transversal a las ingenierías.

## Salida esperada

Documento de **guion de video** en Markdown, con:
- Tabla o lista de escenas con columnas **Escena | En pantalla | Narración | Texto/LaTeX | Duración**.
- Bloque final con **transcripción completa** y **lista de subtítulos (SRT)**.
- Nota de producción: comprobación numérica de la solución y lista de assets (fórmulas LaTeX, cortinillas).
- Pie: "Elaboración propia. Universidad de América." y referencias APA usadas.
Listo para el equipo de producción audiovisual.
