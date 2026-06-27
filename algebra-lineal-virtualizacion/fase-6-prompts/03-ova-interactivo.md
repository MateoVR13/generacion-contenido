# Prompt — Objeto Virtual de Aprendizaje (OVA) interactivo · Tema 5: Rectas, planos y aplicaciones del álgebra lineal

> Este archivo NO es el recurso: es el **prompt listo para ejecutar** que produce la estructura/guion
> del OVA. Sepáralo de la producción (Fase 6 → producción).

## Contexto

- **Asignatura:** Álgebra Lineal (Ingeniería, transversal), código 131. 3 créditos, **100% virtual, teórica**.
- **Metodología:** Aprendizaje Guiado (AG). **Tema 5 = etapa integradora** y de cierre de la ruta.
- **Resultados de aprendizaje (integra los tres):**
  - RA1: Modela problemas de ingeniería utilizando matrices y vectores.
  - RA2: Aplica diferentes métodos de solución de sistemas de ecuaciones lineales, interpretando resultados.
  - RA3: Evalúa la aplicación de los conceptos y procesos de la teoría de matrices en la representación y
    solución de sistemas de ecuaciones lineales, analizando su pertinencia en distintos campos.
- **Propósito de la etapa:** modelar rectas y planos en el espacio y **evaluar aplicaciones** (rotaciones y
  traslaciones, criptografía, circuitos eléctricos), integrando lo aprendido.
- **Preguntas orientadoras:**
  1. ¿Cómo se describen rectas y planos en el espacio?
  2. ¿En qué campos se aplican y por qué son pertinentes?
- **Actividad del tema (ajuste validado por el docente):** "Taller: hallar ecuaciones de recta y plano,
  gráfica, y puntos de intersección entre planos y rectas, y entre rectas y rectas."
- **Criterios de evaluación asociados:** CE1, CE2, CE3.
- **Fuentes autorizadas (APA 7, no inventar otras):**
  - Larson, R. (2010). *Fundamentos de álgebra lineal* (6.ª ed.). Cengage Learning. (base)
  - Grossman, S. I. (2008). *Álgebra lineal*. McGraw-Hill. (base)
- **Enfoque transversal — ejemplos en 3 ingenierías distintas** para las aplicaciones: p. ej. mecánica/
  mecatrónica (rotaciones y traslaciones de un sólido o brazo robótico), telecomunicaciones/sistemas
  (criptografía con matrices), eléctrica/energías (circuitos / leyes de Kirchhoff como sistema lineal).

## Objetivo pedagógico del recurso

Que el estudiante **consolide e integre** los aprendizajes del curso: formule ecuaciones de recta y plano
en el espacio, las visualice en 3D, determine intersecciones (recta–plano, recta–recta) y **valore la
pertinencia** (RA3) de las aplicaciones del álgebra lineal en distintos campos de la ingeniería, como apoyo
directo al taller integrador de la etapa.

## Instrucción de generación

Genera la **estructura y los guiones de un OVA interactivo** (formato oficial UA: recursos dinamizadores
combinados, navegable e interactivo), organizado en **secciones/pantallas**. Para cada sección entrega:
**objetivo, contenido teórico breve, elemento interactivo, instrucciones al estudiante, dedicación sugerida
y relación con la evidencia/reflexión** (criterio editorial UA para recursos navegables).

Secciones mínimas:
1. **Bienvenida e integración:** RA1–RA3, propósito de cierre y preguntas orientadoras; mapa de cómo el
   tema integra los temas previos (sistemas, matrices, determinantes, vectores).
2. **Rectas en el espacio:** ecuación vectorial, paramétrica y simétrica (LaTeX). Interactivo: el
   estudiante ingresa punto y vector director y el OVA muestra la recta en una **figura 3D**.
3. **Planos en el espacio:** ecuación general y vectorial (LaTeX), vector normal. Interactivo: construir el
   plano desde 3 puntos o punto+normal, con visualización 3D.
4. **Intersecciones (núcleo del taller):**
   - recta–plano (punto, contenida, paralela sin corte),
   - recta–recta (se cortan, paralelas, **alabeadas**).
   Interactivo: comprobador que, dados los datos, devuelve el tipo de intersección y el punto si existe,
   conectándolo con la resolución del sistema (Gauss-Jordan/Cramer) — cierre del hilo del curso.
5. **Aplicaciones y pertinencia (RA3):** tres mini-casos en 3 ingenierías distintas (rotaciones/
   traslaciones, criptografía, circuitos). Interactivo: pregunta de **decisión/valoración** donde el
   estudiante argumenta por qué el álgebra lineal es pertinente en cada caso.
6. **Autoevaluación formativa:** 3–5 ítems con **retroalimentación por opción** (refuerzo + referencia),
   coherente con la evaluación cualitativa del proyecto.
7. **Cierre y puente al taller:** instrucciones para el taller integrador y a la sumativa final;
   referencias APA.

Requisitos de contenido:
- Toda expresión matemática en **LaTeX**; gráficos cuantitativos (si los hay) en **Chart.js**; figuras 3D
  con nota descriptiva.
- Procedimientos y resultados correctos y verificables (incluir comprobaciones en notas de producción).
- Incluir **errores frecuentes** (p. ej. confundir rectas paralelas con alabeadas; olvidar el vector normal).
- Tono institucional, lenguaje claro al estudiante; cada recurso navegable con propósito, instrucciones,
  dedicación sugerida y relación con evidencia/reflexión.

## Requisitos de marca y accesibilidad

- Paleta UA: fondo claro `#fbf8fb`/`#f5f3f5` para lectura; acento verde `#c0f500` para botones activos,
  progreso y datos clave; terciario `#f0b300`/`#ffe086` con moderación; sidebar/encabezados sobre
  `#1a2403`/`#060b00`; bordes/tablas `#c6c8ba`.
- Tipografía: **Montserrat** (títulos/etiquetas/botones), **Inter** (cuerpo/instrucciones), **JetBrains
  Mono** (fórmulas textuales/código); fórmulas formales en LaTeX.
- **Logo UA** en footer/área institucional o portada del OVA, no dentro del título del tema; no deformar.
- Accesibilidad: **texto alternativo** en toda figura 3D y diagrama; navegación por teclado; contraste AA;
  no codificar el tipo de intersección solo por color (usar etiqueta + ícono); las interacciones deben
  tener equivalente textual; subtítulos/transcripción en cualquier audio/video embebido.

## Restricciones

- **APA 7**; citar solo Larson (2010) y/o Grossman (2008). No inventar fuentes, años, páginas, DOI ni enlaces.
- Rotular **"Elaboración propia"** las figuras 3D, casos, ítems y esquemas creados.
- **Similitud externa ≤ 30%**: redacción, casos e ítems originales.
- No inventar datos curriculares; lo faltante = brecha.
- Mantener el **enfoque transversal** a las ingenierías; no centrar en petróleos.
- Respetar el ajuste del docente en la actividad del tema (recta/plano, gráfica e intersecciones).

## Salida esperada

Documento en Markdown con:
- **Mapa de navegación** del OVA (secciones y flujo).
- Por sección: **objetivo · teoría breve · interactivo (descripción funcional + datos de entrada/salida) ·
  instrucciones al estudiante · dedicación sugerida · relación con evidencia/reflexión · LaTeX**.
- Banco de **autoevaluación** con retroalimentación por opción.
- **Textos alternativos** de las figuras 3D y lista de **assets** (figuras, fórmulas LaTeX, paleta hex).
- Especificación lista para el renderer/SCORM (campos editables desde JSON cuando aplique).
- Pie: "Elaboración propia. Universidad de América." y referencias APA usadas.
Listo para el equipo de producción e-learning / montaje SCORM.
