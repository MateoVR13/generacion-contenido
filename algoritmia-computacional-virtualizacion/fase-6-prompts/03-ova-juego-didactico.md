# Prompt — OVA / Juego didáctico (emparejamiento + arrastrar y soltar + escenario de decisiones) · Tema 4: Arreglos y estructuras de datos

> Recurso creado para producción. Referencia los Formatos oficiales UA de **Objeto Virtual de Aprendizaje
> (OVA)** y de **Juegos didácticos** en
> `insumos-institucionales/Escenario de aprendizaje/COMPONENTES DIDÁCTICOS/Formatos_*.docx`.

## Contexto
- **Asignatura:** Algoritmia Computacional I (Tecnología en Aplicaciones Digitales Inteligentes, Facultad
  de Ingeniería). Metodología **Aprendizaje Guiado (AG)**, 3 créditos, 100% virtual.
- **RA1:** "Reconozco las principales estructuras de programación para la generación de algoritmos
  computacionales utilizando herramientas de control."
- **RA2:** "Evalúo adecuadamente la asignación dinámica de memoria en un computador para la ejecución de
  algoritmos, a partir de programación estructurada."
- **Tema 4 — propósito:** organizar datos en cadenas, listas, tuplas, diccionarios y arreglos
  multidimensionales (matrices); recorrerlos e indexarlos. Saberes S18–S20.
- **Preguntas orientadoras:** ¿Qué estructura representa mejor mis datos? ¿Cuándo conviene una tupla
  (inmutable) frente a una lista? ¿Cómo recorro una matriz?
- **Evidencia que apoya:** Taller 4 — modelar un conjunto de datos de ingeniería con la estructura
  adecuada (lista/diccionario/matriz) y recorrerla para calcular un resultado.
- **Fuentes autorizadas (APA 7):**
  - Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2009). *Introduction to algorithms*
    (3rd ed.). MIT Press. [M3]
  - Downey, A. B. (2015). *Think Python: How to think like a computer scientist* (2nd ed.).
    O'Reilly Media. [M4]
- **Ejemplos transversales a 3 ingenierías** (orientación industrial):
  - *Industrial:* lista de tiempos de ciclo de una línea; diccionario `pieza → defecto`; matriz
    `estación × turno` con la producción.
  - *Mecatrónica:* tupla `(x, y, z)` de una posición fija; lista de lecturas de un sensor en el tiempo.
  - *Sistemas/Software:* cadena con un identificador a validar; diccionario `usuario → permisos`.

## Objetivo pedagógico del recurso
Que el estudiante **seleccione la estructura de datos adecuada** para un caso de ingeniería y **decida el
recorrido/indexación** correctos, recibiendo retroalimentación inmediata. Articula RA1 (uso de estructuras)
y RA2 (consciencia de cómo se organizan/asignan los datos en memoria, mutabilidad vs. inmutabilidad).

## Instrucción de generación
Genera el **guion completo del OVA interactivo** con tres mini-juegos encadenados y su lógica de
retroalimentación. No produzcas el OVA renderizado; produce su especificación lista para producción.
Entrega:

1. **Ficha del recurso** (según Formato oficial OVA): título, tema, RA1+RA2, propósito, dedicación
   sugerida, instrucciones de uso, relación con la evidencia (Taller 4), criterios de logro.
2. **Pantalla de bienvenida:** objetivo, instrucciones y barra de progreso de los 3 retos.
3. **Reto 1 — Emparejamiento (estructura ↔ caso):** mínimo **6 pares** que asocien una estructura
   (cadena, lista, tupla, diccionario, matriz 2D) con un caso de ingeniería de los ejemplos
   transversales. Entrega los pares correctos y, por cada distractor plausible, su retroalimentación.
4. **Reto 2 — Arrastrar y soltar (poblar la estructura):** dado un conjunto de datos, el estudiante
   arrastra cada dato al "contenedor" correcto (p. ej. llaves de un diccionario, celdas de una matriz
   `fila × columna`, posiciones de una lista). Define el estado inicial, la solución correcta y la
   retroalimentación por error frecuente (índice fuera de rango, confundir clave con valor).
5. **Reto 3 — Escenario de decisiones (recorrido/indexación):** un caso industrial (p. ej. calcular la
   producción total de una matriz `estación × turno`); el estudiante elige entre varias estrategias de
   recorrido (recorrer filas, recorrer columnas, doble bucle) y de indexación; cada decisión muestra
   consecuencias y retroalimentación. Incluir, al final, el **snippet Python** correcto del recorrido.
6. **Cierre / retroalimentación global:** puntaje, resumen "qué estructura para qué dato", *callout*
   "Profundiza en el Documento de Saberes, Tema 4" e invitación al Taller 4.
7. **Banco de ítems y feedback:** lista completa de ítems, opciones, respuesta correcta y
   retroalimentación (positiva y de error) por ítem.

## Tono y lenguaje
Institucional, claro, motivador. Instrucciones de juego breves y sin ambigüedad; retroalimentación que
enseña (explica el porqué, no solo "correcto/incorrecto").

## Requisitos de marca y accesibilidad
- Institución: **Universidad de América** (marca, no tema).
- Paleta UA: fondo claro `#fbf8fb`/`#f5f3f5`; encabezados/HUD `#1a2403`; acierto/acento `#c0f500`;
  pistas/advertencias `#f0b300`/`#ffe086`; bordes/contenedores `#c6c8ba`. Verde como acento.
- Tipografía: **Montserrat** (títulos/botones), **Inter** (instrucciones/feedback), **JetBrains Mono**
  (estructuras y snippet Python).
- Accesibilidad: **navegación por teclado** y alternativa al arrastrar y soltar (selección por clic);
  **texto alternativo** de cada elemento e ícono; contraste AA; retroalimentación no dependiente solo del
  color (ícono + texto); foco visible.

## Restricciones
- APA 7 en las referencias citadas; **"Elaboración propia"** en la ficha y créditos del OVA.
- Similitud ≤ 30%; redacción original; no copiar literalmente de M3/M4.
- No inventar datos del syllabus ni fuentes; apoyo bibliográfico solo en M3 y M4.
- Estructuras, pares, soluciones y el snippet Python correctos y verificables; coherencia industrial.

## Salida esperada
Documento con **ficha del recurso**, **guion de las pantallas y los 3 retos**, **lógica de
retroalimentación**, **banco completo de ítems** y **snippet Python del recorrido**, listo para que el
equipo de producción construya el OVA/juego en la herramienta correspondiente (separación Fase 6 →
producción). Formato Markdown estructurado.
