# Prompt — Infografía animada · Tema 3: Estructuras selectivas y de control

> Recurso creado para producción. Referencia el Formato oficial UA del componente **Infografía animada /
> Infografía** en `insumos-institucionales/Escenario de aprendizaje/COMPONENTES DIDÁCTICOS/Formatos_*.docx`.

## Contexto
- **Asignatura:** Algoritmia Computacional I (Tecnología en Aplicaciones Digitales Inteligentes, Facultad
  de Ingeniería). Metodología **Aprendizaje Guiado (AG)**, 3 créditos, 100% virtual.
- **RA1:** "Reconozco las principales estructuras de programación para la generación de algoritmos
  computacionales utilizando herramientas de control."
- **Tema 3 — propósito:** controlar el flujo del algoritmo con estructuras selectivas (if/elif/else,
  operadores lógicos) e iterativas (for/while, control de iteración, anidamiento). Saberes S13–S15.
- **Preguntas orientadoras:** ¿Cuándo uso una estructura selectiva vs. iterativa? ¿Cómo evito ciclos
  infinitos? ¿Cuándo anidar y cuándo no?
- **Evidencia que apoya:** Taller 3 — resolver un problema con estructuras selectivas e iterativas (con
  condición de parada correcta) y explicar el control de flujo.
- **Fuentes autorizadas (APA 7):**
  - Joyanes Aguilar, L. (2013). *Fundamentos generales de programación*. McGraw-Hill Interamericana. [M1]
  - Oviedo Regino, E. (2005). *Lógica de programación*. Ecoe Ediciones. [M2]
  - Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2009). *Introduction to algorithms*
    (3rd ed.). MIT Press. [M3]
- **Ejemplos transversales a 3 ingenierías** (orientación industrial):
  - *Industrial:* `if` para clasificar lotes por calidad; `while` para procesar una cola de pedidos
    hasta vaciarla.
  - *Mecatrónica:* `for` que recorre lecturas de un sensor; `if/elif/else` que decide el estado de un actuador.
  - *Sistemas/Software:* `while` con condición de parada que reintenta una conexión hasta N intentos.

## Objetivo pedagógico del recurso
Que el estudiante distinga **cuándo** usar cada estructura de control y reconozca el patrón de una
condición de parada correcta, mediante una síntesis visual escaneable que sirva de mapa de decisión y
de material de repaso reutilizable.

## Instrucción de generación
Genera el **guion de contenido + especificación visual** de una **infografía animada** (formato vertical,
animación por capas/scroll), con el copy exacto de cada bloque. Entrega:

1. **Ficha del recurso** (según Formato oficial): título, tema, RA, propósito, dedicación sugerida,
   relación con la evidencia (Taller 3).
2. **Estructura por bloques** (cada bloque = una capa animada con su micro-animación descrita):
   - **B1 · Título + idea fuerza:** "El control de flujo decide qué pasos se ejecutan y cuántas veces".
   - **B2 · Estructuras selectivas:** `if` / `if-else` / `if-elif-else`; rol de los operadores lógicos
     (`and`, `or`, `not`); mini-diagrama de bifurcación animado.
   - **B3 · Estructuras iterativas:** `for` (recorrido conocido) vs. `while` (condición); animar una
     iteración avanzando.
   - **B4 · Árbol de decisión "¿qué uso?":** ¿el número de repeticiones se conoce de antemano? → `for`;
     ¿depende de una condición? → `while`; ¿solo eligir entre caminos? → selectiva. Representar como
     diagrama animado de decisión.
   - **B5 · Condición de parada y ciclos infinitos:** cómo garantizar que el ciclo termine (la variable
     de control debe avanzar hacia la condición de salida); ejemplo de error y su corrección.
   - **B6 · Anidamiento:** cuándo combinar selectiva dentro de iterativa, con una advertencia sobre la
     legibilidad.
   - **B7 · Cierre:** *callout* "Profundiza en el Documento de Saberes, Tema 3" + invitación al Taller 3.
3. **Especificación de íconos y micro-animaciones** por bloque (qué entra, qué se resalta, en qué orden).
4. **Snippets ilustrativos** breves en **pseudocódigo y/o Python** dentro de los bloques B2, B3 y B5
   (correctos y mínimos), usando los ejemplos transversales.

## Tono y lenguaje
Institucional, claro, escaneable. Títulos cortos en Montserrat; copy breve en Inter; nada de párrafos
largos dentro de la infografía.

## Requisitos de marca y accesibilidad
- Institución: **Universidad de América** (marca, no tema).
- Paleta UA: fondo claro `#fbf8fb`/`#f5f3f5`; encabezados y bloques institucionales `#1a2403`; acento
  verde `#c0f500` para el camino/decisión resaltada; `#f0b300`/`#ffe086` para advertencias (ciclo
  infinito). Verde como acento, no como fondo de texto.
- Tipografía: **Montserrat** (títulos), **Inter** (copy), **JetBrains Mono** (snippets de código).
- Accesibilidad: **texto alternativo** descriptivo de cada capa animada y del árbol de decisión; versión
  estática equivalente; contraste AA; no usar solo color para indicar el camino correcto (añadir ícono o
  etiqueta).

## Restricciones
- APA 7 en las referencias citadas; **"Elaboración propia"** en la ficha y créditos.
- Similitud ≤ 30%; redacción original; no copiar definiciones literales de M1/M2/M3.
- No inventar datos del syllabus ni fuentes; apoyo bibliográfico solo en M1, M2, M3.
- Snippets de código y árbol de decisión correctos y verificables.

## Salida esperada
Documento con la **ficha del recurso**, el **copy por bloque (B1–B7)**, la **especificación visual y de
animación** y los **snippets ilustrativos**, listo para que diseño/animación produzca la infografía
(separación Fase 6 → producción). Formato Markdown estructurado.
