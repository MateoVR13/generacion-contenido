# Esquema de contenido — Documento de saberes

## Álgebra Lineal · Aprendizaje Guiado (AG) · 100% Virtual · 3 créditos

> **Insumo para la skill `aprendizaje-guiado-scorm`.** Este documento define, tema por tema (5 temas = 5 escenarios de aprendizaje), el contenido del documento de saberes: propósito, 3 bloques teóricos por sección, 2-4 ejercicios resueltos tipo `stepper` con procedimiento en LaTeX, componentes complementarios sugeridos (con carrusel / flashcards / acordión obligatorios), marcas de figuras y charts, y un **ejemplo aplicado en 3 ingenierías distintas** (enfoque transversal). Toda la matemática va en LaTeX (`$...$` en prosa; LaTeX crudo en campos `formula`/`statement`/`steps[].formula`).
>
> **Convenciones de marcado en este esquema:**
> - `[FIGURA]` = imagen/figura conceptual (componente `image`/`figure`, no cuantitativo).
> - `[CHART]` = gráfico Chart.js (con `description` = hilo conductor y `note` = lectura del gráfico).
> - `[STEPPER]` = ejercicio resuelto paso a paso (LaTeX en `statement` y `steps[].formula`, paso `final: true`).
> - **Enfoque transversal confirmado:** los ejemplos y ejercicios se generalizan a varias ingenierías (industrial, mecánica, mecatrónica, petróleos, química, ambiental, energías). NO se centra solo en petróleos.
> - **Profundidad:** pregrado, riguroso, segundo semestre, campo básico de fundamentación matemática.
> - **Bibliografía base (APA 7):** Larson (2010) y Grossman (2008); se cita en cada tema donde corresponde.

---

## Mapa global de los 5 temas (escenarios de aprendizaje)

| # | Tema | RA | Steppers | Carrusel / Flashcards / Acordión | Charts / Figuras |
|---|------|----|---------:|----------------------------------|------------------|
| 1 | Sistemas de ecuaciones lineales y Gauss-Jordan | RA1, RA2 | 4 | sí / sí / sí | 1 chart, 2 figuras |
| 2 | Matrices y operaciones | RA1 | 3 | sí / sí / sí | 1 chart, 2 figuras |
| 3 | Determinantes, inversa y regla de Cramer | RA2 | 4 | sí / sí / sí | 1 chart, 2 figuras |
| 4 | Vectores en el plano y el espacio | RA1, RA2 | 4 | sí / sí / sí | 1 chart, 2 figuras |
| 5 | Rectas, planos y aplicaciones | RA1, RA2, RA3 | 3 | sí / sí / sí | 1 chart, 2 figuras |

**Total: 18 steppers de ejercicios resueltos** distribuidos en los 5 temas (rango 3-4 por tema, cumpliendo el mínimo de 2-4 que exige la skill para matemáticas).

Cada tema en la sección SCORM se estructura en **3 ciclos** (bloque teórico → 2-3 componentes complementarios), con los steppers de ejercicios resueltos como práctica guiada dentro de los ciclos, y el ejemplo transversal en el ciclo de transferencia. El branch PDF refleja teoría, ejemplos resueltos (`stepper`/`example`), ejercicios (`exercise-set`) y referencias.

---

# TEMA 1 — Sistemas de ecuaciones lineales y método de Gauss-Jordan

**RA asociados:** RA1, RA2 · **Saber:** S1 · **Criterios:** CE1, CE2

### Propósito
Que el estudiante traduzca situaciones de ingeniería a sistemas de ecuaciones lineales, los represente matricialmente y los resuelva con el método de Gauss-Jordan, interpretando si la solución es única, infinita o inexistente y qué significa cada caso en el contexto del problema modelado.

### Pregunta(s) orientadora(s)
- ¿Cómo se traduce un problema de ingeniería a un sistema de ecuaciones lineales?
- ¿Cuándo un sistema tiene solución única, infinitas soluciones o ninguna?

## Bloques teóricos (3)

**Bloque teórico 1 — De la situación al sistema lineal.**
Idea central: una ecuación lineal $a_1x_1 + a_2x_2 + \dots + a_nx_n = b$ relaciona variables de decisión mediante coeficientes constantes; un sistema reúne $m$ ecuaciones con $n$ incógnitas y representa restricciones simultáneas de un problema de ingeniería (balances, mezclas, flujos). Se introduce la representación matricial $A\mathbf{x}=\mathbf{b}$ y la matriz aumentada $[A\,|\,\mathbf{b}]$.
Key ideas: linealidad (sin productos ni potencias de incógnitas); incógnitas vs. coeficientes; equivalencia entre forma escalar y forma matricial. `[FIGURA 1.1]` esquema "problema → ecuaciones → matriz aumentada".

**Bloque teórico 2 — Operaciones elementales y forma escalonada reducida.**
Idea central: las tres operaciones elementales de fila (intercambio $R_i \leftrightarrow R_j$, escalamiento $R_i \to kR_i$ con $k\neq0$, combinación $R_i \to R_i + kR_j$) producen sistemas equivalentes (misma solución). El objetivo de Gauss-Jordan es llevar la matriz a forma escalonada reducida por filas (RREF), con pivotes $1$ y ceros encima y debajo.
Key ideas: equivalencia por filas; pivote y columna pivote; diferencia entre eliminación gaussiana (escalonada) y Gauss-Jordan (escalonada reducida). Cita: Larson (2010) presenta el algoritmo de eliminación; Grossman (2008) enfatiza la interpretación del rango.

**Bloque teórico 3 — Existencia y unicidad de la solución.**
Idea central: el número de pivotes (rango de $A$) frente al número de incógnitas determina el tipo de solución. Si $\operatorname{rango}(A)=\operatorname{rango}([A|\mathbf{b}])=n$ → solución única; si $\operatorname{rango}(A)=\operatorname{rango}([A|\mathbf{b}])<n$ → infinitas soluciones (variables libres); si $\operatorname{rango}(A)<\operatorname{rango}([A|\mathbf{b}])$ → sistema inconsistente (sin solución).
Key ideas: variable libre y parámetro; sistema homogéneo $A\mathbf{x}=\mathbf{0}$ siempre consistente; lectura física de "infinitas soluciones" (grados de libertad) y de "sin solución" (restricciones incompatibles). `[CHART 1]`.

## Ejercicios resueltos tipo stepper (4)

**[STEPPER 1.1] — Sistema 3×3 con solución única (Gauss-Jordan completo).**
Statement: resolver $\begin{cases} x+y+z=6 \\ 2x-y+z=3 \\ x+2y-z=2 \end{cases}$ por Gauss-Jordan.
Pasos (LaTeX en `steps[].formula`):
1. Matriz aumentada $\left[\begin{array}{ccc|c} 1&1&1&6 \\ 2&-1&1&3 \\ 1&2&-1&2 \end{array}\right]$.
2. $R_2 \to R_2 - 2R_1$, $R_3 \to R_3 - R_1$: $\left[\begin{array}{ccc|c} 1&1&1&6 \\ 0&-3&-1&-9 \\ 0&1&-2&-4 \end{array}\right]$.
3. $R_2 \to -\tfrac{1}{3}R_2$ y eliminación en columna 2.
4. Reducir columna 3 hasta RREF.
5. `final: true`: solución $x=1,\;y=2,\;z=3$; verificación sustituyendo en las 3 ecuaciones.

**[STEPPER 1.2] — Sistema con infinitas soluciones (variable libre y parametrización).**
Statement: resolver $\begin{cases} x+2y-z=3 \\ 2x+4y-2z=6 \end{cases}$.
Pasos: matriz aumentada; $R_2 \to R_2 - 2R_1$ produce fila nula; identificar variable libre $z=t$; despejar $x=3-2y+t$ con $y=s$ libre. `final: true`: conjunto solución $\{(3-2s+t,\,s,\,t):s,t\in\mathbb{R}\}$; interpretación: 2 grados de libertad.

**[STEPPER 1.3] — Sistema inconsistente (detección de incompatibilidad).**
Statement: $\begin{cases} x+y=2 \\ 2x+2y=5 \end{cases}$.
Pasos: matriz aumentada; $R_2 \to R_2 - 2R_1$ produce $0=1$. `final: true`: fila $[0\;0\,|\,1]$ ⇒ sistema sin solución; interpretación: rectas paralelas / restricciones incompatibles.

**[STEPPER 1.4] — Modelado transversal: balance de un proceso (3 corrientes).**
Statement: un proceso mezcla tres corrientes con concentraciones conocidas para alcanzar una meta; plantear y resolver el sistema $A\mathbf{x}=\mathbf{b}$ de caudales $x_1,x_2,x_3$.
Pasos: traducir restricciones (balance de masa total + balance por componente) a 3 ecuaciones; armar $[A|\mathbf{b}]$; Gauss-Jordan; `final: true`: caudales y verificación de no-negatividad (factibilidad física).

## Componentes complementarios sugeridos
- **Carrusel (obligatorio):** "Ruta Gauss-Jordan" — slides: (1) matriz aumentada, (2) hacer pivote, (3) anular columna, (4) RREF, (5) leer solución. Cada slide con `title` + `body` desarrollados y `formula`.
- **Flashcards (obligatorio):** términos — *matriz aumentada*, *pivote*, *RREF*, *rango*, *variable libre*, *sistema homogéneo*, *consistente/inconsistente*. Definiciones específicas, no de una palabra.
- **Acordión (obligatorio):** "Errores frecuentes y matices" — items de 2-3 párrafos: (a) confundir eliminación gaussiana con Gauss-Jordan; (b) olvidar actualizar el término independiente al operar filas; (c) interpretar mal una fila nula vs. una fila $0=k$.
- **Formula component:** condición de Rouché-Frobenius vía rango: $\operatorname{rango}(A)$ vs. $\operatorname{rango}([A|\mathbf{b}])$.
- **Quiz (SCORM):** clasificar 3 sistemas por tipo de solución, con retroalimentación por opción.
- **`[CHART 1]` (Chart.js, tipo bar):** "Tipo de solución según rango" — labels: `rango(A)=rango([A|b])=n`, `rango(A)=rango([A|b])<n`, `rango(A)<rango([A|b])`; dataset: número de soluciones (1, ∞, 0) representado cualitativamente. `description` = hilo conductor con el bloque teórico 3; `note` = lectura que conecta rango con grados de libertad.
- **`[FIGURA 1.2]`:** interpretación geométrica en $\mathbb{R}^2$ — tres pares de rectas (secantes = única; coincidentes = infinitas; paralelas = ninguna).

## EJEMPLO APLICADO EN 3 INGENIERÍAS (transversal)
- **Ingeniería Industrial — mezcla de productos / programación de producción.** Tres líneas producen lotes con consumos distintos de tres insumos; hallar el plan $\mathbf{x}$ que agota exactamente los inventarios. Sistema $A\mathbf{x}=\mathbf{b}$ con $A$ = consumos, $\mathbf{b}$ = inventarios; solución única ⇒ plan factible. $A=\begin{bmatrix}2&1&1\\1&3&2\\1&1&4\end{bmatrix}$, $\mathbf{b}=\begin{bmatrix}40\\50\\60\end{bmatrix}$.
- **Ingeniería Mecánica/Mecatrónica — equilibrio estático de una estructura.** Sumatoria de fuerzas y momentos en una armadura simple produce un sistema lineal en las tensiones de las barras $T_1,T_2,T_3$; resolver con Gauss-Jordan e interpretar signos (tracción/compresión).
- **Ingeniería Química/Ambiental — balanceo de una reacción / mezcla de soluciones.** Coeficientes estequiométricos o volúmenes de soluciones a distinta concentración para alcanzar una concentración objetivo; el sistema puede tener infinitas soluciones (familia estequiométrica) o única (mezcla con volumen total fijo).

## Referencias del tema (APA 7)
Larson (2010), cap. de sistemas lineales y eliminación de Gauss-Jordan. Grossman (2008), introducción a sistemas y rango. Recursos creados: "Elaboración propia".

---

# TEMA 2 — Matrices y operaciones

**RA asociados:** RA1 · **Saber:** S2 · **Criterios:** CE1, CE3

### Propósito
Que el estudiante opere con matrices (suma, producto por escalar, producto matricial, transpuesta) e interprete la matriz como un objeto que representa y transforma información en ingeniería (tablas de consumo, operadores, grafos, transformaciones), reconociendo las propiedades y restricciones de cada operación.

### Pregunta(s) orientadora(s)
- ¿Qué representa una matriz en un problema real?
- ¿Cómo se combinan operaciones matriciales para modelar un proceso?

## Bloques teóricos (3)

**Bloque teórico 1 — La matriz como estructura de datos y tipos especiales.**
Idea central: una matriz $A=[a_{ij}]_{m\times n}$ organiza información en filas y columnas; el índice $a_{ij}$ ubica el dato (fila $i$, columna $j$). Tipos: fila, columna, cuadrada, diagonal, identidad $I_n$, triangular, simétrica, nula.
Key ideas: dimensión/orden; significado de fila y columna en un modelo; matriz identidad como "elemento neutro" del producto. `[FIGURA 2.1]` anatomía de una matriz con índices señalados.

**Bloque teórico 2 — Suma, escalar y producto matricial.**
Idea central: la suma y el escalamiento son entrada a entrada (requieren igual orden); el producto $AB$ está definido solo si las columnas de $A$ igualan las filas de $B$, y $(AB)_{ij}=\sum_{k}a_{ik}b_{kj}$. El producto NO es conmutativo en general: $AB\neq BA$.
Key ideas: compatibilidad de dimensiones $(m\times p)(p\times n)=(m\times n)$; no conmutatividad; el producto como combinación de filas por columnas. Cita: Grossman (2008) desarrolla el producto y sus propiedades; Larson (2010) enfatiza la interpretación como composición.

**Bloque teórico 3 — Propiedades algebraicas y transpuesta.**
Idea central: asociatividad $(AB)C=A(BC)$, distributividad $A(B+C)=AB+AC$, pero no conmutatividad ni ley de cancelación general. La transpuesta $A^{T}$ intercambia filas y columnas, con $(AB)^{T}=B^{T}A^{T}$; matriz simétrica $A=A^{T}$.
Key ideas: propiedades que SÍ se conservan vs. las que NO; transpuesta y simetría; uso de la matriz identidad y la nula. `[CHART 2]`.

## Ejercicios resueltos tipo stepper (3)

**[STEPPER 2.1] — Producto matricial paso a paso (compatibilidad e interpretación).**
Statement: dadas $A=\begin{bmatrix}1&2\\3&0\\-1&4\end{bmatrix}$ ($3\times2$) y $B=\begin{bmatrix}2&-1&0\\1&3&5\end{bmatrix}$ ($2\times3$), calcular $AB$.
Pasos: verificar compatibilidad $(3\times2)(2\times3)=(3\times3)$; calcular cada $(AB)_{ij}=\sum_k a_{ik}b_{kj}$ mostrando una entrada con detalle, p. ej. $(AB)_{11}=1\cdot2+2\cdot1=4$; `final: true`: matriz resultante $3\times3$ y verificación dimensional.

**[STEPPER 2.2] — Combinación lineal de matrices y transpuesta.**
Statement: con $A,B$ del orden $2\times2$, calcular $2A-3B^{T}$ y verificar $(AB)^{T}=B^{T}A^{T}$.
Pasos: calcular $B^{T}$; escalar $2A$ y $3B^{T}$; restar entrada a entrada; calcular $AB$, su transpuesta y $B^{T}A^{T}$; `final: true`: ambas coinciden ⇒ propiedad verificada.

**[STEPPER 2.3] — Aplicación transversal: matriz de consumo × vector de producción.**
Statement: una matriz de requerimientos $R$ (insumos × productos) multiplicada por un vector de producción $\mathbf{p}$ da el consumo total de insumos $\mathbf{c}=R\mathbf{p}$. Calcular $\mathbf{c}$ y luego el costo total $\mathbf{k}^{T}\mathbf{c}$.
Pasos: identificar dimensiones; ejecutar $R\mathbf{p}$; multiplicar por el vector de costos unitarios; `final: true`: consumo por insumo y costo total, con interpretación de cada componente.

## Componentes complementarios sugeridos
- **Carrusel (obligatorio):** "Anatomía del producto matricial" — slides: compatibilidad, fila×columna, suma de productos, entrada resultante, no conmutatividad.
- **Flashcards (obligatorio):** *orden de una matriz*, *matriz identidad*, *transpuesta*, *matriz simétrica*, *producto matricial*, *combinación lineal de matrices*, *no conmutatividad*.
- **Acordión (obligatorio):** "Propiedades: lo que se conserva y lo que no" — items de 2-3 párrafos: (a) por qué $AB\neq BA$ con contraejemplo; (b) por qué $AB=0$ no implica $A=0$ o $B=0$; (c) transpuesta del producto e implicaciones en simetría.
- **Table component:** comparativo suma vs. producto (definición, condición de dimensiones, conmutatividad, neutro).
- **Matching (SCORM):** tipo de matriz ↔ definición/uso.
- **`[CHART 2]` (Chart.js, tipo bar agrupado):** "Costo por insumo según escenario de producción" — labels: insumos; datasets: dos planes de producción $\mathbf{p}_1,\mathbf{p}_2$; muestra cómo el producto $R\mathbf{p}$ redistribuye consumo. `description` conecta con el bloque 2 (producto como modelo); `note` interpreta qué insumo domina y por qué.
- **`[FIGURA 2.2]`:** diagrama "fila por columna" del producto, con flechas de la fila de $A$ y la columna de $B$ hacia la entrada resultante.

## EJEMPLO APLICADO EN 3 INGENIERÍAS (transversal)
- **Ingeniería Industrial — matriz de requerimientos de materiales (BOM).** $R$ relaciona componentes con productos; $R\mathbf{p}$ entrega el consumo de componentes para un plan $\mathbf{p}$; el costo total es $\mathbf{k}^{T}R\mathbf{p}$.
- **Ingeniería Mecatrónica/Mecánica — transformación de coordenadas / rotación.** Una matriz de rotación $R(\theta)=\begin{bmatrix}\cos\theta&-\sin\theta\\\sin\theta&\cos\theta\end{bmatrix}$ aplicada a un vector de posición transforma coordenadas de un mecanismo; el producto encadenado modela rotaciones sucesivas (no conmutatividad ⇒ el orden importa).
- **Ingeniería Energías/Ambiental — matriz de adyacencia de una red.** Una matriz $A$ de conexiones de una red (eléctrica, hídrica o de transporte) y su potencia $A^2$ revelan rutas de longitud 2 entre nodos; interpretación de $a_{ij}$ como flujo o conexión directa.

## Referencias del tema (APA 7)
Grossman (2008), capítulo de matrices y operaciones. Larson (2010), álgebra de matrices y propiedades. Recursos creados: "Elaboración propia".

---

# TEMA 3 — Determinantes, inversa y regla de Cramer

**RA asociados:** RA2 · **Saber:** S3 · **Criterios:** CE2, CE3

### Propósito
Que el estudiante calcule determinantes (2×2, 3×3 y por cofactores), obtenga la inversa de una matriz cuadrada cuando exista, y resuelva sistemas mediante la regla de Cramer, valorando cuándo conviene cada método frente a Gauss-Jordan y qué información aporta el determinante sobre la existencia de solución.

### Pregunta(s) orientadora(s)
- ¿Qué información aporta el determinante sobre un sistema?
- ¿Cuándo conviene Cramer frente a Gauss-Jordan?

## Bloques teóricos (3)

**Bloque teórico 1 — Determinante: definición y cálculo.**
Idea central: el determinante $\det(A)$ es un escalar asociado a una matriz cuadrada. Para $2\times2$: $\det\begin{bmatrix}a&b\\c&d\end{bmatrix}=ad-bc$. Para $3\times3$: regla de Sarrus o expansión por cofactores $\det(A)=\sum_{j}(-1)^{i+j}a_{ij}M_{ij}$, donde $M_{ij}$ es el menor.
Key ideas: menor y cofactor; expansión por la fila/columna con más ceros; interpretación geométrica como área/volumen orientado. `[FIGURA 3.1]` paralelogramo (2×2) y paralelepípedo (3×3) cuyo área/volumen es $|\det|$.

**Bloque teórico 2 — Inversa de una matriz cuadrada.**
Idea central: $A^{-1}$ cumple $AA^{-1}=A^{-1}A=I$ y existe si y solo si $\det(A)\neq0$ (matriz no singular). Métodos: fórmula $A^{-1}=\frac{1}{\det(A)}\operatorname{adj}(A)$ y método de Gauss-Jordan sobre $[A\,|\,I]\to[I\,|\,A^{-1}]$.
Key ideas: matriz singular vs. no singular; adjunta (transpuesta de cofactores); la inversa resuelve $A\mathbf{x}=\mathbf{b}$ como $\mathbf{x}=A^{-1}\mathbf{b}$. Cita: Larson (2010) desarrolla adjunta e inversa; Grossman (2008) relaciona invertibilidad con rango completo.

**Bloque teórico 3 — Regla de Cramer y comparación de métodos.**
Idea central: si $\det(A)\neq0$, cada incógnita es $x_i=\dfrac{\det(A_i)}{\det(A)}$, donde $A_i$ reemplaza la columna $i$ por $\mathbf{b}$. Cramer es elegante para sistemas pequeños y para despejar una sola variable, pero costoso para sistemas grandes frente a Gauss-Jordan.
Key ideas: condición $\det(A)\neq0$ (única solución); criterio de elección de método (tamaño, número de variables requeridas); $\det(A)=0$ ⇒ Cramer no aplica. `[CHART 3]`.

## Ejercicios resueltos tipo stepper (4)

**[STEPPER 3.1] — Determinante 3×3 por cofactores.**
Statement: calcular $\det\begin{bmatrix}2&1&3\\0&-1&2\\1&4&1\end{bmatrix}$.
Pasos: elegir expansión por la primera columna (tiene un cero); calcular menores $M_{11}, M_{31}$; aplicar signos de cofactor; `final: true`: valor numérico y verificación con regla de Sarrus.

**[STEPPER 3.2] — Inversa por Gauss-Jordan $[A|I]\to[I|A^{-1}]$.**
Statement: hallar $A^{-1}$ para $A=\begin{bmatrix}2&1\\5&3\end{bmatrix}$.
Pasos: verificar $\det(A)=1\neq0$; armar $[A|I]$; operaciones de fila hasta RREF en el bloque izquierdo; `final: true`: $A^{-1}=\begin{bmatrix}3&-1\\-5&2\end{bmatrix}$ y comprobación $AA^{-1}=I$.

**[STEPPER 3.3] — Resolver un sistema por regla de Cramer.**
Statement: resolver $\begin{cases}2x+y=5\\x+3y=10\end{cases}$ con Cramer.
Pasos: $\det(A)=5$; construir $A_1$ y $A_2$ reemplazando columnas por $\mathbf{b}$; $x=\det(A_1)/\det(A)$, $y=\det(A_2)/\det(A)$; `final: true`: $x=1,\;y=3$ y verificación por sustitución.

**[STEPPER 3.4] — Aplicación transversal: análisis de un circuito / red por Cramer.**
Statement: un sistema $2\times2$ (o $3\times3$) de corrientes de malla $\begin{cases}R_1 I_1 + R_{12} I_2 = V_1\\ R_{21} I_1 + R_2 I_2 = V_2\end{cases}$; despejar $I_2$ con Cramer.
Pasos: identificar $A,\mathbf{b}$; calcular $\det(A)$ (verificar no singular); $A_2$; $I_2=\det(A_2)/\det(A)$; `final: true`: corriente con signo e interpretación del sentido.

## Componentes complementarios sugeridos
- **Carrusel (obligatorio):** "Tres caminos para resolver $A\mathbf{x}=\mathbf{b}$" — slides: Gauss-Jordan, inversa $\mathbf{x}=A^{-1}\mathbf{b}$, Cramer, criterio de elección.
- **Flashcards (obligatorio):** *determinante*, *menor*, *cofactor*, *adjunta*, *matriz singular/no singular*, *inversa*, *regla de Cramer*.
- **Acordión (obligatorio):** "Cuándo y por qué" — items de 2-3 párrafos: (a) qué significa $\det(A)=0$ (no invertible, sistema no único); (b) costo computacional de Cramer vs. Gauss-Jordan al crecer $n$; (c) errores al construir la adjunta (signos de cofactores, transponer).
- **Formula component:** propiedades del determinante ($\det(AB)=\det(A)\det(B)$, $\det(A^{T})=\det(A)$, efecto de operaciones de fila).
- **Multi-select (SCORM):** seleccionar todas las condiciones que garantizan invertibilidad.
- **`[CHART 3]` (Chart.js, tipo line):** "Operaciones requeridas vs. tamaño $n$: Cramer vs. Gauss-Jordan" — labels: $n=2,3,4,5,6$; datasets: conteo aproximado de operaciones de cada método. `description` conecta con el bloque 3 (criterio de elección); `note` lee la curva que crece más rápido en Cramer y la conclusión práctica.
- **`[FIGURA 3.2]`:** esquema de la construcción de $A_i$ (sustituir la columna $i$ por $\mathbf{b}$) para Cramer.

## EJEMPLO APLICADO EN 3 INGENIERÍAS (transversal)
- **Ingeniería Eléctrica/Energías — corrientes de malla.** Las leyes de Kirchhoff producen un sistema lineal en las corrientes; Cramer despeja una corriente concreta sin resolver todo el sistema; $\det(A)\neq0$ garantiza red bien planteada.
- **Ingeniería Mecánica/Mecatrónica — invertir una matriz de transformación.** Para deshacer una transformación geométrica de un mecanismo se usa $A^{-1}$; $\det(A)$ indica si la transformación es reversible (no degenerada).
- **Ingeniería Petróleos/Química — sistema de balance con única solución.** Un balance de materia $2\times2$ o $3\times3$ con $\det(A)\neq0$ asegura mezcla con solución única; el determinante advierte cuándo las restricciones son linealmente dependientes (mezcla mal especificada).

## Referencias del tema (APA 7)
Larson (2010), determinantes, adjunta, inversa y Cramer. Grossman (2008), invertibilidad y propiedades del determinante. Recursos creados: "Elaboración propia".

---

# TEMA 4 — Vectores en el plano y el espacio

**RA asociados:** RA1, RA2 · **Saber:** S4 · **Criterios:** CE1, CE2

### Propósito
Que el estudiante represente y opere vectores en $\mathbb{R}^2$ y $\mathbb{R}^3$ (suma, escalar, magnitud), y aplique el producto punto (ángulo, proyección, ortogonalidad) y el producto cruz (vector normal, área) para modelar e interpretar magnitudes físicas y geométricas en ingeniería.

### Pregunta(s) orientadora(s)
- ¿Qué miden el producto punto y el producto cruz?
- ¿Cómo se usan los vectores para modelar magnitudes en ingeniería?

## Bloques teóricos (3)

**Bloque teórico 1 — Vectores, operaciones básicas y magnitud.**
Idea central: un vector $\mathbf{v}=(v_1,v_2,v_3)$ tiene magnitud y dirección; la suma es componente a componente, el escalar reescala, y la magnitud es $\|\mathbf{v}\|=\sqrt{v_1^2+v_2^2+v_3^2}$. Vector unitario $\hat{\mathbf{v}}=\mathbf{v}/\|\mathbf{v}\|$.
Key ideas: representación geométrica (flecha) y algebraica (componentes); suma por regla del paralelogramo; vectores base $\mathbf{i},\mathbf{j},\mathbf{k}$. `[FIGURA 4.1]` vector en $\mathbb{R}^3$ con componentes y magnitud.

**Bloque teórico 2 — Producto punto: ángulo, proyección y ortogonalidad.**
Idea central: $\mathbf{u}\cdot\mathbf{v}=u_1v_1+u_2v_2+u_3v_3=\|\mathbf{u}\|\,\|\mathbf{v}\|\cos\theta$. De aquí el ángulo $\cos\theta=\dfrac{\mathbf{u}\cdot\mathbf{v}}{\|\mathbf{u}\|\,\|\mathbf{v}\|}$, la ortogonalidad ($\mathbf{u}\cdot\mathbf{v}=0$) y la proyección $\operatorname{proy}_{\mathbf{v}}\mathbf{u}=\dfrac{\mathbf{u}\cdot\mathbf{v}}{\|\mathbf{v}\|^2}\mathbf{v}$.
Key ideas: el punto da un escalar; signo del producto e interpretación del ángulo (agudo/recto/obtuso); proyección como "sombra" de un vector sobre otro. Cita: Larson (2010) y Grossman (2008) desarrollan producto interno y proyección.

**Bloque teórico 3 — Producto cruz: normal y área.**
Idea central: en $\mathbb{R}^3$, $\mathbf{u}\times\mathbf{v}$ es un vector perpendicular a ambos, con $\|\mathbf{u}\times\mathbf{v}\|=\|\mathbf{u}\|\,\|\mathbf{v}\|\sin\theta$ = área del paralelogramo. Se calcula con el determinante simbólico $\begin{vmatrix}\mathbf{i}&\mathbf{j}&\mathbf{k}\\u_1&u_2&u_3\\v_1&v_2&v_3\end{vmatrix}$.
Key ideas: el cruz da un vector (no conmutativo: $\mathbf{u}\times\mathbf{v}=-\mathbf{v}\times\mathbf{u}$); regla de la mano derecha; aplicaciones (normal a un plano, momento/torque, área). `[CHART 4]`.

## Ejercicios resueltos tipo stepper (4)

**[STEPPER 4.1] — Magnitud, vector unitario y suma.**
Statement: dados $\mathbf{u}=(3,-4,12)$ y $\mathbf{v}=(1,2,2)$, hallar $\|\mathbf{u}\|$, $\hat{\mathbf{u}}$ y $\mathbf{u}+2\mathbf{v}$.
Pasos: $\|\mathbf{u}\|=\sqrt{3^2+(-4)^2+12^2}=13$; $\hat{\mathbf{u}}=\tfrac{1}{13}(3,-4,12)$; calcular $\mathbf{u}+2\mathbf{v}$ componente a componente; `final: true`: resultados y verificación $\|\hat{\mathbf{u}}\|=1$.

**[STEPPER 4.2] — Ángulo entre dos vectores con producto punto.**
Statement: hallar el ángulo entre $\mathbf{u}=(1,2,2)$ y $\mathbf{v}=(2,0,1)$.
Pasos: $\mathbf{u}\cdot\mathbf{v}=4$; $\|\mathbf{u}\|=3$, $\|\mathbf{v}\|=\sqrt{5}$; $\cos\theta=\dfrac{4}{3\sqrt{5}}$; `final: true`: $\theta=\arccos\!\left(\tfrac{4}{3\sqrt{5}}\right)\approx53.4^\circ$ e interpretación (ángulo agudo).

**[STEPPER 4.3] — Proyección de un vector sobre otro.**
Statement: proyectar $\mathbf{u}=(4,3)$ sobre $\mathbf{v}=(1,0)$ y sobre $\mathbf{v}=(3,4)$.
Pasos: aplicar $\operatorname{proy}_{\mathbf{v}}\mathbf{u}=\frac{\mathbf{u}\cdot\mathbf{v}}{\|\mathbf{v}\|^2}\mathbf{v}$ en ambos casos; `final: true`: vectores proyección e interpretación (componente de $\mathbf{u}$ en la dirección de $\mathbf{v}$).

**[STEPPER 4.4] — Producto cruz, área y vector normal (transversal).**
Statement: dados $\mathbf{u}=(1,0,2)$ y $\mathbf{v}=(0,3,1)$, hallar $\mathbf{u}\times\mathbf{v}$, el área del paralelogramo y un vector normal unitario.
Pasos: determinante simbólico $3\times3$; componentes del producto cruz; $\|\mathbf{u}\times\mathbf{v}\|$ = área; normalizar; `final: true`: vector normal, área e interpretación (normal a un plano / superficie).

## Componentes complementarios sugeridos
- **Carrusel (obligatorio):** "Punto vs. cruz" — slides: definición del punto (escalar), del cruz (vector), ángulo, ortogonalidad, área/normal.
- **Flashcards (obligatorio):** *magnitud*, *vector unitario*, *producto punto*, *ángulo entre vectores*, *proyección*, *producto cruz*, *ortogonalidad*.
- **Acordión (obligatorio):** "Distinciones clave" — items de 2-3 párrafos: (a) punto da escalar, cruz da vector; (b) no conmutatividad del cruz y regla de la mano derecha; (c) significado físico del signo del producto punto (trabajo, alineación).
- **Formula component:** desigualdad de Cauchy-Schwarz y relación $\mathbf{u}\cdot\mathbf{v}=\|\mathbf{u}\|\|\mathbf{v}\|\cos\theta$.
- **Fill-blank / quiz (SCORM):** completar la interpretación del ángulo según el signo del producto punto.
- **`[CHART 4]` (Chart.js, tipo line o scatter):** "Producto punto y magnitud de la proyección según el ángulo $\theta$" — labels: ángulos $0^\circ,30^\circ,60^\circ,90^\circ,120^\circ,180^\circ$; dataset: $\cos\theta$ y/o componente proyectada. `description` conecta con el bloque 2; `note` lee cómo el producto punto cae a cero en $90^\circ$ (ortogonalidad) y se vuelve negativo en ángulos obtusos.
- **`[FIGURA 4.2]`:** proyección de $\mathbf{u}$ sobre $\mathbf{v}$ (sombra) y, aparte, $\mathbf{u}\times\mathbf{v}$ perpendicular al plano de $\mathbf{u},\mathbf{v}$.

## EJEMPLO APLICADO EN 3 INGENIERÍAS (transversal)
- **Ingeniería Mecánica — fuerzas y trabajo.** La resultante de fuerzas es una suma vectorial; el trabajo $W=\mathbf{F}\cdot\mathbf{d}$ usa el producto punto; el torque $\boldsymbol{\tau}=\mathbf{r}\times\mathbf{F}$ usa el producto cruz.
- **Ingeniería Mecatrónica/Industrial — alineación y similitud (coseno).** El coseno del ángulo entre dos vectores mide alineación de direcciones (control de orientación de un robot, similitud entre perfiles/vectores de características).
- **Ingeniería Ambiental/Energías — flujo a través de una superficie.** El flujo de un campo a través de un área usa el producto punto con el vector normal $\hat{\mathbf{n}}$, y el área orientada se obtiene con el producto cruz de los bordes de la superficie.

## Referencias del tema (APA 7)
Larson (2010), vectores, producto interno y producto vectorial. Grossman (2008), $\mathbb{R}^n$, producto escalar y cruz. Recursos creados: "Elaboración propia".

---

# TEMA 5 — Rectas, planos y aplicaciones del álgebra lineal

**RA asociados:** RA1, RA2, RA3 · **Saber:** S5 · **Criterios:** CE1, CE2, CE3

### Propósito
Que el estudiante determine ecuaciones de rectas y planos en el espacio, los grafique, halle intersecciones (plano-recta, recta-recta) y evalúe aplicaciones del álgebra lineal (rotaciones y traslaciones, criptografía con matrices, circuitos eléctricos), integrando lo aprendido y valorando su pertinencia en distintos campos de la ingeniería (RA3, carácter integrador del tema).

### Pregunta(s) orientadora(s)
- ¿Cómo se describen rectas y planos en el espacio?
- ¿En qué campos se aplican y por qué son pertinentes?

> **Nota:** la actividad del tema fue ajustada por el docente → "Taller: hallar ecuaciones de recta y plano, gráfica, y puntos de intersección entre planos y rectas, y entre rectas y rectas". El contenido de este tema prioriza ese objetivo.

## Bloques teóricos (3)

**Bloque teórico 1 — Ecuación de la recta en el espacio.**
Idea central: una recta queda definida por un punto $P_0=(x_0,y_0,z_0)$ y un vector director $\mathbf{d}=(a,b,c)$. Forma vectorial $\mathbf{r}(t)=P_0+t\mathbf{d}$; paramétrica $x=x_0+at,\;y=y_0+bt,\;z=z_0+ct$; simétrica $\dfrac{x-x_0}{a}=\dfrac{y-y_0}{b}=\dfrac{z-z_0}{c}$.
Key ideas: papel del vector director; conversión entre formas; rectas paralelas (directores proporcionales), secantes y alabeadas (cruzadas). `[FIGURA 5.1]` recta con punto base y vector director.

**Bloque teórico 2 — Ecuación del plano y posiciones relativas.**
Idea central: un plano queda definido por un punto y un vector normal $\mathbf{n}=(A,B,C)$; ecuación general $A(x-x_0)+B(y-y_0)+C(z-z_0)=0$, es decir $Ax+By+Cz=D$. El normal se obtiene con producto cruz de dos vectores del plano.
Key ideas: el normal define la orientación; planos paralelos (normales proporcionales) y perpendiculares; ángulo entre planos vía sus normales. Cita: Larson (2010) y Grossman (2008) desarrollan rectas y planos en $\mathbb{R}^3$.

**Bloque teórico 3 — Intersecciones y aplicaciones del álgebra lineal.**
Idea central: hallar intersecciones es resolver sistemas lineales: plano∩recta (sustituir la paramétrica en la ecuación del plano → un valor de $t$); recta∩recta (igualar paramétricas → sistema; única solución = se cortan, sin solución = paralelas/alabeadas). Aplicaciones: rotaciones/traslaciones (matrices), criptografía (cifrado de Hill con matriz invertible), circuitos (sistemas lineales).
Key ideas: la geometría se reduce a álgebra lineal; criterio de intersección según el tipo de solución del sistema; pertinencia disciplinar (RA3). `[CHART 5]`.

## Ejercicios resueltos tipo stepper (3)

**[STEPPER 5.1] — Ecuación de la recta por dos puntos y conversión de formas.**
Statement: hallar la recta que pasa por $A=(1,0,2)$ y $B=(3,4,6)$ en forma vectorial, paramétrica y simétrica.
Pasos: vector director $\mathbf{d}=B-A=(2,4,4)$; forma vectorial $\mathbf{r}(t)=(1,0,2)+t(2,4,4)$; paramétricas; simétrica $\frac{x-1}{2}=\frac{y}{4}=\frac{z-2}{4}$; `final: true`: verificación de que $A$ y $B$ satisfacen las ecuaciones.

**[STEPPER 5.2] — Ecuación del plano por tres puntos (normal con producto cruz).**
Statement: hallar el plano que pasa por $P=(1,0,0)$, $Q=(0,2,0)$, $R=(0,0,3)$.
Pasos: vectores $\overrightarrow{PQ}$ y $\overrightarrow{PR}$; normal $\mathbf{n}=\overrightarrow{PQ}\times\overrightarrow{PR}$; ecuación $A(x-1)+By+Cz=0$ → $Ax+By+Cz=D$; `final: true`: ecuación general y verificación con los tres puntos.

**[STEPPER 5.3] — Intersección plano-recta y recta-recta (núcleo del taller del docente).**
Statement: (a) hallar la intersección de la recta $\mathbf{r}(t)=(1,1,0)+t(1,0,2)$ con el plano $2x+y-z=5$; (b) determinar si las rectas $\mathbf{r}_1(t)=(0,0,0)+t(1,1,1)$ y $\mathbf{r}_2(s)=(1,0,0)+s(0,1,1)$ se cortan.
Pasos (a): sustituir paramétricas en el plano → ecuación en $t$ → punto de corte. Pasos (b): igualar $\mathbf{r}_1(t)=\mathbf{r}_2(s)$ → sistema $3\times2$ en $t,s$; resolver y verificar consistencia. `final: true`: punto de intersección en (a); clasificación (se cortan / paralelas / alabeadas) en (b) con su justificación. `[FIGURA 5.2]` representa ambas intersecciones.

## Componentes complementarios sugeridos
- **Carrusel (obligatorio):** "De la geometría al sistema lineal" — slides: recta (punto+director), plano (punto+normal), intersección plano-recta, intersección recta-recta, aplicaciones.
- **Flashcards (obligatorio):** *vector director*, *vector normal*, *forma paramétrica*, *forma simétrica*, *rectas alabeadas*, *cifrado de Hill*, *matriz de rotación*.
- **Acordión (obligatorio):** "Aplicaciones y su pertinencia (RA3)" — items de 2-3 párrafos: (a) rotaciones/traslaciones con matrices y por qué el orden importa; (b) criptografía: cifrado de Hill, condición de matriz invertible $\det\not\equiv0$ y descifrado con $A^{-1}$; (c) circuitos: por qué las leyes de Kirchhoff producen sistemas lineales y cómo se resuelven con los métodos de los temas previos.
- **Formula component:** distancia de un punto a un plano $d=\dfrac{|Ax_0+By_0+Cz_0-D|}{\sqrt{A^2+B^2+C^2}}$.
- **Stepper / matching (SCORM):** clasificar pares de rectas (secantes / paralelas / alabeadas) según su sistema.
- **`[CHART 5]` (Chart.js, tipo bar):** "Tipo de relación entre dos rectas según la solución del sistema" — labels: solución única, sin solución (paralelas), inconsistente sin paralelismo (alabeadas); dataset cualitativo. `description` conecta con el bloque 3; `note` lee cómo el tipo de solución del sistema clasifica la relación geométrica.
- **`[FIGURA 5.2]`:** plano con una recta que lo atraviesa (punto de corte) y dos rectas en el espacio mostrando intersección vs. cruce sin corte.

## EJEMPLO APLICADO EN 3 INGENIERÍAS (transversal)
- **Ingeniería Mecatrónica/Mecánica — rotaciones y traslaciones (robótica/CAD).** Matrices de rotación y traslación posicionan un brazo o una pieza; la trayectoria es una recta paramétrica $\mathbf{r}(t)$ y la intersección con una superficie (plano) determina el punto de contacto/colisión.
- **Ingeniería de Sistemas/Industrial — criptografía (cifrado de Hill).** Un bloque de texto se cifra con $\mathbf{c}=A\mathbf{m}\ (\mathrm{mod}\ 26)$ usando una matriz invertible módulo 26; el descifrado usa $A^{-1}$; integra inversa, determinante y producto matricial de los temas previos.
- **Ingeniería Eléctrica/Energías — circuitos eléctricos.** Las mallas de un circuito generan un sistema lineal; resolverlo (Gauss-Jordan/Cramer) da corrientes y voltajes; geométricamente, cada ecuación es un plano y la solución, su intersección.

## Referencias del tema (APA 7)
Larson (2010), rectas y planos en el espacio, aplicaciones del álgebra lineal (rotaciones, criptografía). Grossman (2008), geometría en $\mathbb{R}^3$ y aplicaciones. Recursos creados: "Elaboración propia".

---

## Notas de implementación para la skill `aprendizaje-guiado-scorm`

1. **Estructura SCORM por tema:** 3 ciclos `theory-block → 2-3 complementarios`, con carrusel + flashcards + acordión distribuidos (no apilados). Los steppers de ejercicios resueltos van como práctica guiada dentro de los ciclos; el ejemplo transversal en el ciclo de cierre/transferencia.
2. **Matemática:** prosa con `$...$`; campos `formula`/`statement`/`steps[].formula` en LaTeX crudo con backslashes escapados (`\\frac`, `\\begin{bmatrix}`, `\\sqrt`, `\\times`, `\\cdot`). Cada stepper cierra con paso `final: true` (verificación/resultado).
3. **Charts:** etiquetas en texto plano Unicode; `description` = hilo conductor con la teoría previa; `note` = lectura del gráfico. Nunca describir un chart como imagen.
4. **Figuras:** componente `image`/`figure` con `prompt`, `alt`, `caption`; mismo `assetId` si se comparte SCORM/PDF.
5. **PDF:** reflejar teoría, ejemplos resueltos (`stepper`/`example`), bancos de ejercicios (`exercise-set`) al final antes de referencias; sin componentes interactivos.
6. **Evaluación:** diagnóstica (10/banco 15, retro por pregunta); formativas por momento; sumativa integradora (tema 5); rúbricas analítica (CE1-CE3) y holística; auto/co/heteroevaluación; evaluación cualitativa, sin ponderaciones (no existen).
7. **Transversalidad:** mantener ejemplos generalizados a varias ingenierías en los 5 temas. NO centrar solo en petróleos.
8. **APA 7:** Larson (2010) y Grossman (2008) en cada tema; "Elaboración propia" en recursos creados; similitud ≤ 30%.
