# Prompt — Infografía animada · Tema 3: Determinantes, inversa y regla de Cramer

> Este archivo NO es el recurso: es el **prompt listo para ejecutar** que produce el copy/estructura
> de la infografía animada. Sepáralo de la producción (Fase 6 → producción).

## Contexto

- **Asignatura:** Álgebra Lineal (Ingeniería, transversal), código 131. 3 créditos, **100% virtual, teórica**.
- **Metodología:** Aprendizaje Guiado (AG). **Tema 3 = etapa comparativa/decisional** de la ruta.
- **Resultado de aprendizaje:** RA2 — Aplica diferentes métodos de solución de sistemas de ecuaciones
  lineales para modelar y resolver problemas de ingeniería, interpretando los resultados en su contexto.
- **Propósito de la etapa:** calcular determinantes e inversas y resolver sistemas con la regla de Cramer.
- **Preguntas orientadoras:**
  1. ¿Qué información aporta el determinante sobre un sistema?
  2. ¿Cuándo conviene Cramer frente a Gauss-Jordan?
- **Criterio de evaluación asociado:** CE2.
- **Fuentes autorizadas (APA 7, no inventar otras):**
  - Larson, R. (2010). *Fundamentos de álgebra lineal* (6.ª ed.). Cengage Learning. (base)
  - Grossman, S. I. (2008). *Álgebra lineal*. McGraw-Hill. (base)
- **Enfoque transversal:** un mini-ejemplo de decisión de método ambientado en ingeniería (p. ej.
  un sistema 2×2 o 3×3 de un caso industrial/mecánico), sin centrar en petróleos.

## Objetivo pedagógico del recurso

Que el estudiante **sintetice y memorice los criterios de decisión** sobre determinantes, inversa y regla
de Cramer: qué informa el determinante (det = 0 ⇒ singular / sin solución única; det ≠ 0 ⇒ invertible y
solución única) y cuándo conviene cada método frente a Gauss-Jordan, en una pieza visual escaneable.

## Instrucción de generación

Genera el **copy y la estructura completa de una infografía animada** (formato oficial UA: íconos +
gráficos que transmiten el concepto de forma sencilla, con animación por bloques). Define la pieza por
**paneles/escenas animadas**; para cada panel entrega: **título corto**, **microcopy** (1–2 frases en
Inter, claras), **elemento visual/ícono sugerido**, **fórmula en LaTeX** si aplica, y **orden de animación**.

Paneles mínimos:
1. **Portada:** título "Determinantes, inversa y Cramer", RA2 y pregunta orientadora 1.
2. **¿Qué es el determinante?** definición breve + fórmula 2×2 `det = ad − bc` en LaTeX e idea del 3×3.
3. **Qué te dice el determinante:** dos ramas animadas — `det ≠ 0` (invertible, solución única) vs
   `det = 0` (singular, sin solución única). Conecta con la pregunta orientadora 1.
4. **Matriz inversa:** condición de existencia y fórmula `A⁻¹ = (1/det A)·adj(A)` (LaTeX).
5. **Regla de Cramer:** fórmula `xᵢ = det(Aᵢ)/det(A)` (LaTeX) y condición de uso (det ≠ 0).
6. **¿Cramer o Gauss-Jordan?** tabla/criterios de decisión: tamaño del sistema, una incógnita vs todas,
   costo de cálculo. Responde la pregunta orientadora 2.
7. **Mini-caso de ingeniería (transversal):** un sistema pequeño donde se justifica el método elegido.
8. **Cierre:** síntesis de 3 ideas clave + referencia a Larson (2010)/Grossman (2008) para profundizar.

Requisitos de contenido:
- Toda expresión matemática en **LaTeX**; correcta y verificable.
- Incluir **un error frecuente** (p. ej. usar Cramer con det = 0; confundir adj con transpuesta).
- Texto muy breve por panel (la infografía no es un texto corrido); jerarquía clara.

## Requisitos de marca y accesibilidad

- Paleta UA: fondo `#fbf8fb`/`#f5f3f5`; acento verde `#c0f500` para datos clave/badges; terciario
  `#f0b300`/`#ffe086` para apoyos; bloques institucionales sobre `#1a2403`/`#060b00`.
- Tipografía: **Montserrat** (títulos, etiquetas, números grandes), **Inter** (microcopy),
  **JetBrains Mono** para fórmulas textuales; fórmulas formales en LaTeX.
- **Logo UA** solo en portada o cierre. No usarlo como decoración repetida.
- Accesibilidad: **texto alternativo por panel**, contraste mínimo AA, no codificar significado solo por
  color (acompañar las ramas det≠0 / det=0 con etiqueta e ícono); si la versión animada lleva audio,
  incluir transcripción; orden de lectura lógico para lectores de pantalla.

## Restricciones

- **APA 7**; citar solo Larson (2010) y/o Grossman (2008). No inventar fuentes, años, páginas, DOI ni enlaces.
- Rotular **"Elaboración propia"** la infografía, íconos compuestos y el mini-caso.
- **Similitud externa ≤ 30%**: redacción y ejemplo originales.
- No inventar datos curriculares; lo faltante = brecha.
- Enfoque transversal a las ingenierías; no centrar en petróleos.

## Salida esperada

Documento en Markdown con:
- **Storyboard por paneles**: tabla **Panel | Título | Microcopy | Visual/ícono | LaTeX | Animación**.
- **Texto alternativo** redactado para cada panel.
- Lista de **assets** (íconos, fórmulas LaTeX, paleta hex) para el diseñador.
- Guion de animación (secuencia y tiempos aproximados).
- Pie: "Elaboración propia. Universidad de América." y referencias APA usadas.
Listo para el diseñador gráfico e-learning / herramienta de animación.
