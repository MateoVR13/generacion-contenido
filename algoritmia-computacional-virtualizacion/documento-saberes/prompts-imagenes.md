# Prompts de imágenes — Algoritmia Computacional I

Prompts extraídos de los JSON del Documento de Saberes, en orden de aparición por tema. Los prompts se reproducen **sin modificar**. El nombre de archivo sugerido se deriva del `assetId` de cada imagen.

> Las imágenes que el PDF reutiliza del SCORM (mismo `assetId`) aparecen una sola vez (no se duplican).

## Tema 01 — Fundamentos del algoritmo y su representación

### 1. El algoritmo como puente entre problema y solución

- **Archivo sugerido:** `alg-t1-puente-problema-solucion.png`
- **Caption (referencia):** El algoritmo es el procedimiento intermedio que transforma un problema en una solución reproducible. Elaboración propia.

**Prompt:**

```
Crear una figura didáctica en español, estilo plano y limpio, con tres bloques conectados por flechas de izquierda a derecha: (1) bloque 'Problema' con ícono de signo de interrogación; (2) bloque central 'Algoritmo' que muestre una lista vertical de pasos numerados 1, 2, 3; (3) bloque 'Solución / Resultado' con ícono de check. Sobre el bloque central rotular las propiedades 'finito · ordenado · no ambiguo'. Paleta institucional sobria, tipografía legible.
```

### 2. Niveles de abstracción del problema a la máquina

- **Archivo sugerido:** `alg-t1-niveles-abstraccion.png`
- **Caption (referencia):** Del problema humano a la máquina: cada nivel es más formal y más cercano al computador. Elaboración propia.

**Prompt:**

```
Crear una figura didáctica en español tipo escalera descendente de cuatro peldaños, de arriba (más humano) a abajo (más máquina): peldaño 1 'Lenguaje natural y diagrama', peldaño 2 'Pseudocódigo', peldaño 3 'Lenguaje de alto nivel (Python)', peldaño 4 'Instrucciones de máquina (bits)'. A la izquierda una flecha vertical etiquetada 'más cercano al humano' arriba y 'más cercano a la máquina' abajo. Estilo plano, paleta institucional.
```

### 3. Esquema entrada-proceso-salida

- **Archivo sugerido:** `alg-t1-esquema-eps.png`
- **Caption (referencia):** El algoritmo visto como una caja que transforma datos de entrada en resultados de salida. Elaboración propia.

**Prompt:**

```
Crear una figura didáctica en español: una caja rectangular central con la etiqueta 'PROCESO (transformación)'; a la izquierda una flecha horizontal entrando con la etiqueta 'ENTRADA: datos (sensores, parámetros, usuario)'; a la derecha una flecha horizontal saliendo con la etiqueta 'SALIDA: resultado (valor, informe, decisión)'. Bajo la caja un pequeño ejemplo: entrada peso, proceso comparar con rango, salida aceptar/rechazar. Estilo plano, paleta institucional.
```

### 4. Frontera del sistema y flujo de datos

- **Archivo sugerido:** `alg-t1-frontera-sistema.png`
- **Caption (referencia):** El recuadro punteado marca la frontera del algoritmo; las fuentes y destinos quedan fuera. Elaboración propia.

**Prompt:**

```
Crear una figura didáctica en español: un recuadro de borde punteado etiquetado 'Algoritmo (frontera del sistema)' que contiene un bloque 'Proceso'. Fuera del recuadro, a la izquierda, dos íconos con etiquetas 'Sensor' y 'Usuario' conectados con flechas hacia adentro (entradas). A la derecha, fuera del recuadro, dos íconos 'Informe' y 'Actuador' con flechas que salen del recuadro (salidas). Estilo plano, paleta institucional.
```

### 5. Símbolos normalizados del flujograma

- **Archivo sugerido:** `alg-t1-simbolos-flujograma.png`
- **Caption (referencia):** Símbolos normalizados básicos del flujograma según la convención ANSI/ISO. Elaboración propia.

**Prompt:**

```
Crear una figura didáctica en español tipo leyenda: cinco símbolos de flujograma alineados verticalmente con su forma y etiqueta: (1) óvalo redondeado = 'Inicio / Fin'; (2) paralelogramo = 'Entrada / Salida de datos'; (3) rectángulo = 'Proceso (cálculo o asignación)'; (4) rombo = 'Decisión (condición Sí/No)'; (5) flecha = 'Línea de flujo (orden)'. Dibujar cada forma con precisión geométrica, estilo plano, paleta institucional.
```

### 6. Flujograma del control de calidad de una pieza

- **Archivo sugerido:** `alg-t1-flujograma-clasificar.png`
- **Caption (referencia):** Flujograma que clasifica una pieza según su medida, con una estructura de decisión. Elaboración propia.

**Prompt:**

```
Crear un flujograma vertical en español, símbolos normalizados: óvalo 'Inicio'; paralelogramo 'Leer medida de la pieza'; rectángulo opcional omitir; rombo 'medida > 10 cm?' con salida derecha 'Sí' hacia rectángulo 'Clasificar como LARGA' y salida abajo 'No' hacia rectángulo 'Clasificar como CORTA'; ambas ramas se unen y van a paralelogramo 'Mostrar clasificación'; finalmente óvalo 'Fin'. Flechas claras, sin cruces, paleta institucional.
```

### 7. Mismo algoritmo: flujograma y pseudocódigo

- **Archivo sugerido:** `alg-t1-flujo-vs-pseudo.png`
- **Caption (referencia):** El flujograma y el pseudocódigo representan el mismo algoritmo en dos lenguajes distintos. Elaboración propia.

**Prompt:**

```
Crear una figura comparativa en español dividida en dos columnas. Columna izquierda titulada 'Flujograma': flujograma vertical Inicio, leer m, rombo 'm > 10?', Sí -> LARGA, No -> CORTA, mostrar, Fin. Columna derecha titulada 'Pseudocódigo': bloque de texto monoespaciado con 'Inicio / Leer m / Si m > 10 entonces / (sangría) clasificacion <- LARGA / Sino / (sangría) clasificacion <- CORTA / FinSi / Escribir clasificacion / Fin'. Una doble flecha entre columnas con la etiqueta 'mismo algoritmo'. Estilo plano, paleta institucional.
```

### 8. Correspondencia pseudocódigo - Python

- **Archivo sugerido:** `alg-t1-pseudo-a-python.png`
- **Caption (referencia):** Cada construcción de pseudocódigo tiene un equivalente directo en Python. Elaboración propia.

**Prompt:**

```
Crear una figura tipo tabla de dos columnas en español, encabezados 'Pseudocódigo' y 'Python'. Filas emparejadas en texto monoespaciado: 'Leer x' / 'x = float(input())'; 'Escribir r' / 'print(r)'; 'suma <- 0' / 'suma = 0'; 'Si c entonces ... Sino ... FinSi' / 'if c: ... else: ...'; 'Mientras c hacer ... FinMientras' / 'while c: ...'. Flechas que conectan cada fila. Estilo plano, paleta institucional.
```

### 9. Anatomía de una tabla de traza

- **Archivo sugerido:** `alg-t1-tabla-traza.png`
- **Caption (referencia):** En la tabla de traza, cada columna es una variable y cada fila registra el estado tras un paso. Elaboración propia.

**Prompt:**

```
Crear una figura didáctica en español de una tabla de traza. Encabezado de columnas: 'Paso', 'x1', 'x2', 'x3', 'suma', 'promedio', 'Salida'. Mostrar 4 filas de ejemplo con valores que evolucionan (suma acumulándose, promedio calculándose al final). Resaltar con color la celda que cambia en cada fila. Añadir una nota al pie: 'una columna por variable, una fila por paso'. Estilo plano, paleta institucional.
```

### 10. Tabla de traza del ciclo de conteo

- **Archivo sugerido:** `alg-t1-traza-ciclo.png`
- **Caption (referencia):** Cada fila representa una vuelta del ciclo; la columna conformes muestra el conteo final. Elaboración propia.

**Prompt:**

```
Crear una figura de tabla de traza en español del ciclo de conteo. Columnas: 'Vuelta', 'i', 'medida', 'medida <= 10?', 'conformes', y comentario. Filas: estado inicial (i=1, conformes=0); vuelta 1 (i=1, medida=9, Sí, conformes=1); vuelta 2 (i=2, medida=11, No, conformes=1); vuelta 3 (i=3, medida=8, Sí, conformes=2); salida (i=4, condición falsa, fin, conformes=2). Resaltar la celda conformes cuando cambia. Estilo plano, paleta institucional.
```

_Total Tema 01: 10 imágenes._

---

## Tema 02 — Lenguajes, tipos de datos y librerías

### 1. Pirámide de niveles de lenguaje

- **Archivo sugerido:** `img-niveles-lenguaje.png`
- **Caption (referencia):** Cada capa superior es más legible para las personas; la traducción desciende hasta el binario que ejecuta el procesador.

**Prompt:**

```
Crear una figura didáctica en español tipo pirámide de tres niveles. Base ancha: 'Lenguaje máquina' con ejemplo binario 10110000 0110001; nivel medio: 'Lenguaje ensamblador' con mnemónicos MOV AL, 61h; nivel superior: 'Lenguaje de alto nivel (Python)' con la línea caudal = area * velocidad. Flechas descendentes etiquetadas 'traducción' y un eje lateral 'mayor abstracción y portabilidad' hacia arriba. Estilo limpio, paleta institucional verde-lima.
```

### 2. Cadena de traducción del código en Python

- **Archivo sugerido:** `img-cadena-traduccion.png`
- **Caption (referencia):** El código fuente se compila a bytecode y una máquina virtual lo interpreta para ejecutarlo en el procesador.

**Prompt:**

```
Crear un diagrama de flujo horizontal en español con cuatro bloques conectados por flechas: (1) 'Código fuente (programa.py)', (2) 'Compilación a bytecode (.pyc)', (3) 'Máquina virtual de Python (interpreta)', (4) 'Procesador ejecuta'. Bajo el conjunto, una llave que abarca los pasos 2 y 3 con la etiqueta 'esto ocurre al correr python programa.py'. Estilo esquemático, paleta verde-lima institucional, fuente monoespaciada para nombres de archivo.
```

### 3. Cómo se almacena cada tipo en memoria

- **Archivo sugerido:** `img-tipos-memoria.png`
- **Caption (referencia):** Cada variable reserva en memoria un espacio cuya interpretación depende del tipo de dato asignado.

**Prompt:**

```
Crear una figura didáctica en español con cuatro 'cajas' de memoria horizontales. Caja 1: etiqueta 'int', contenido 147. Caja 2: etiqueta 'float', contenido 3.1416. Caja 3: etiqueta 'bool', contenido True. Caja 4: etiqueta 'str', contenido "motor-A12". Sobre cada caja el nombre de una variable (n_piezas, presion, en_tolerancia, codigo). Estilo esquemático, paleta institucional verde-lima, fuente monoespaciada para los valores.
```

### 4. Enteros discretos frente a reales aproximados

- **Archivo sugerido:** `img-int-vs-float.png`
- **Caption (referencia):** Los enteros caen en puntos exactos; los reales se aproximan al valor representable más cercano, lo que origina el redondeo.

**Prompt:**

```
Crear una figura didáctica en español con dos rectas numéricas superpuestas. Recta superior 'int': puntos exactos y separados en 0, 1, 2, 3 con la etiqueta 'valores discretos exactos'. Recta inferior 'float': línea continua con marcas de 'valores representables' y pequeñas zonas grises entre marcas etiquetadas 'se redondea al más cercano'; señalar 0.1 con una marca y una nota '0.1 no es exacto en binario'. Estilo esquemático, paleta verde-lima institucional.
```

### 5. Asignación: nombre que apunta a un valor

- **Archivo sugerido:** `img-variable-referencia.png`
- **Caption (referencia):** La variable es una etiqueta que puede reapuntar a otro valor cuando se reasigna.

**Prompt:**

```
Crear una figura didáctica en español en dos momentos. Momento 1: una etiqueta 'presion' con flecha hacia una celda de memoria que contiene 3.5 (float). Momento 2 (debajo, rotulado 'tras presion = 4.0'): la misma etiqueta 'presion' con la flecha ahora apuntando a una nueva celda con 4.0, y la celda anterior con 3.5 atenuada. Estilo esquemático, paleta verde-lima institucional, fuente monoespaciada para valores.
```

### 6. Tabla de traza del intercambio con variable auxiliar

- **Archivo sugerido:** `img-traza-intercambio.png`
- **Caption (referencia):** Rastrear el valor de cada variable tras cada instrucción confirma que el intercambio es correcto antes de ejecutar.

**Prompt:**

```
Crear una figura de una tabla de traza en español con encabezados de columna: 'Instrucción', 'temp', 'a', 'b'. Filas: 'inicio' (—, 7, 3); 'temp = a' (7, 7, 3); 'a = b' (7, 3, 3); 'b = temp' (7, 3, 7). Resaltar la celda que cambia en cada fila. Título 'Traza del intercambio'. Estilo tabla limpia, paleta verde-lima institucional, fuente monoespaciada para valores.
```

### 7. Flujo entrada-proceso-salida con conversión

- **Archivo sugerido:** `img-flujo-es.png`
- **Caption (referencia):** El dato cambia de tipo en el camino: entra como texto, se convierte a número, se procesa y la salida vuelve a presentarse como texto.

**Prompt:**

```
Crear un diagrama de flujo horizontal en español de cinco bloques conectados por flechas: (1) icono de teclado 'Usuario escribe 25', (2) 'input() → "25" (str)', (3) 'float() → 25.0 (float)', (4) 'Proceso: cálculo', (5) 'print() → pantalla'. Resaltar en color el bloque de conversión de tipo. Estilo esquemático, paleta verde-lima institucional, fuente monoespaciada en los valores.
```

### 8. Conversión válida frente a conversión inválida

- **Archivo sugerido:** `img-conversion-valida.png`
- **Caption (referencia):** Convertir una cadena numérica funciona; convertir texto no numérico provoca un error en tiempo de ejecución.

**Prompt:**

```
Crear una figura didáctica en español con dos caminos paralelos. Camino 1 (verde, 'correcto'): caja '"25" (str)' → flecha 'int()' → caja '25 (int)'. Camino 2 (rojo, 'falla'): caja '"abc" (str)' → flecha 'int()' → caja con icono de error 'ValueError'. Título 'Conversión de la entrada'. Estilo esquemático, fuente monoespaciada para los valores, paleta verde-lima con acento rojo solo para el error.
```

### 9. Tu programa y las librerías que importa

- **Archivo sugerido:** `img-ecosistema-librerias.png`
- **Caption (referencia):** El programa principal importa y combina herramientas de varias librerías sin reescribir su código interno.

**Prompt:**

```
Crear una figura didáctica en español con un bloque central 'mi_programa.py' y tres módulos alrededor conectados por flechas etiquetadas 'import'. Módulo 'math' (con sqrt, pi), módulo 'statistics' (con mean, stdev), módulo 'numpy' (con array, mean). Cada módulo como una caja con su icono. Estilo esquemático tipo diagrama de dependencias, paleta verde-lima institucional, fuente monoespaciada para nombres de funciones.
```

### 10. Anatomía de las formas de importar

- **Archivo sugerido:** `img-formas-import.png`
- **Caption (referencia):** Cada forma de importar determina cómo se invoca después la función: con prefijo, sin prefijo o mediante alias.

**Prompt:**

```
Crear una figura didáctica en español con tres bloques de código anotados. Bloque 1: 'import math' con flecha a 'uso: math.sqrt(16)'. Bloque 2: 'from math import sqrt' con flecha a 'uso: sqrt(16)'. Bloque 3: 'import numpy as np' con flecha a 'uso: np.mean(datos)', señalando 'np' como alias. Estilo esquemático tipo anotación de código, fuente monoespaciada, paleta verde-lima institucional.
```

_Total Tema 02: 10 imágenes._

---

## Tema 03 — Estructuras selectivas y de control

### 1. Flujograma de la estructura selectiva

- **Archivo sugerido:** `t3-s1-flujo-condicional.png`
- **Caption (referencia):** El rombo representa la condición; la bifurcación verdadero/falso muestra cómo el flujo elige un camino. Elaboración propia.

**Prompt:**

```
Crear un flujograma didáctico en español de una estructura selectiva doble (if/else). Elementos: inicio (óvalo), un rombo de decisión etiquetado '¿temperatura > umbral?', dos flechas salientes rotuladas 'Verdadero' y 'Falso'; la rama Verdadero lleva a un rectángulo 'Activar alarma', la rama Falso a un rectángulo 'Continuar proceso'; ambas confluyen en un óvalo 'fin'. Estilo limpio, paleta sobria, etiquetas legibles.
```

### 2. Cadena if / elif / else evaluada de arriba abajo

- **Archivo sugerido:** `t3-s1-cadena-elif.png`
- **Caption (referencia):** La evaluación recorre los rombos de arriba hacia abajo y se detiene en la primera condición verdadera. Elaboración propia.

**Prompt:**

```
Crear una figura didáctica en español de una cadena if/elif/else para clasificar un nivel de tanque. Tres rombos de decisión apilados verticalmente: '¿nivel < 20?' (Verdadero -> caja 'BAJO'), si Falso baja a '¿nivel <= 80?' (Verdadero -> caja 'NORMAL'), si Falso baja a un bloque final 'else -> ALTO'. Marcar con flechas la ruta 'Falso' que desciende de un rombo al siguiente y resaltar que solo se ejecuta la primera caja alcanzada. Estilo limpio, etiquetas legibles.
```

### 3. Tablas de verdad de and, or y not

- **Archivo sugerido:** `t3-s2-tablas-verdad.png`
- **Caption (referencia):** Las tablas de verdad resumen el resultado de cada operador lógico para todas las combinaciones de entradas. Elaboración propia.

**Prompt:**

```
Diseñar una figura didáctica en español con tres tablas de verdad lado a lado. Tabla 'and': columnas A, B, A and B, con filas (V,V->V), (V,F->F), (F,V->F), (F,F->F). Tabla 'or': columnas A, B, A or B, filas (V,V->V), (V,F->V), (F,V->V), (F,F->F). Tabla 'not': columnas A, not A, filas (V->F), (F->V). Usar V/F con colores suaves (verde para verdadero, gris para falso), encabezados claros y título general 'Operadores lógicos'.
```

### 4. El and como intersección de dos condiciones en una recta

- **Archivo sugerido:** `t3-s2-banda-tolerancia.png`
- **Caption (referencia):** La regla longitud >= mínimo and longitud <= máximo equivale a la intersección de dos semirrectas: solo la banda común se acepta. Elaboración propia.

**Prompt:**

```
Diseñar una figura didáctica en español sobre una recta numérica horizontal (eje 'longitud (mm)') con marcas en 49.5 (mínimo) y 50.5 (máximo). Dibujar dos franjas: una flecha/semirrecta hacia la derecha desde 49.5 etiquetada 'longitud >= 49.5' y otra hacia la izquierda desde 50.5 etiquetada 'longitud <= 50.5'; resaltar en verde la zona de intersección entre 49.5 y 50.5 con la etiqueta 'and -> ACEPTAR' y en gris las zonas exteriores con 'RECHAZAR'. Ilustra cómo el and combina dos comparaciones en un rango. Estilo limpio.
```

### 5. Flujograma de un ciclo while

- **Archivo sugerido:** `t3-s3-flujo-ciclo.png`
- **Caption (referencia):** El flujo regresa a la condición tras cada iteración; cuando la condición se vuelve falsa, el ciclo termina. Elaboración propia.

**Prompt:**

```
Crear un flujograma didáctico en español de un ciclo while. Elementos: inicio (óvalo), un rombo de decisión '¿condicion verdadera?'; rama 'Sí' lleva a un rectángulo 'Ejecutar cuerpo del ciclo' y luego una flecha que regresa hacia el rombo (formando el lazo de repetición); rama 'No' lleva al óvalo 'fin'. Resaltar la flecha de retorno como el bucle. Estilo limpio, etiquetas legibles.
```

### 6. Dónde vive el control: for definido frente a while indefinido

- **Archivo sugerido:** `t3-s3-for-vs-while.png`
- **Caption (referencia):** En el for el control lo fija la colección recorrida; en el while lo fija la condición que se reevalúa en cada vuelta. Elaboración propia.

**Prompt:**

```
Diseñar una figura comparativa en español con dos paneles. Panel izquierdo titulado 'for (definido)': una fila de cajas etiquetadas lectura[0], lectura[1], lectura[2]... con una flecha que las recorre una a una y la nota 'el número de iteraciones lo fija la colección'. Panel derecho titulado 'while (indefinido)': un rombo 'temperatura < objetivo' con un lazo de retorno hacia sí mismo y una salida cuando es falso, con la nota 'el número de iteraciones lo fija la condición'. Resaltar visualmente qué controla cada ciclo. Estilo limpio, etiquetas legibles.
```

### 7. break y continue dentro de un ciclo

- **Archivo sugerido:** `t3-s4-break-continue.png`
- **Caption (referencia):** break interrumpe el ciclo por completo; continue salta el resto del cuerpo y pasa a la siguiente iteración. Elaboración propia.

**Prompt:**

```
Diseñar una figura didáctica en español de un ciclo con break y continue. Mostrar un bucle rectangular (cuerpo del ciclo) con dos puntos de decisión internos: uno etiquetado '¿condicion de salida?' cuya rama 'Sí' tiene una flecha 'break' que sale del bucle hacia 'fin del ciclo'; otro etiquetado '¿caso a omitir?' cuya rama 'Sí' tiene una flecha 'continue' que regresa al inicio del bucle saltando el resto del cuerpo. Resaltar break en rojo y continue en azul. Etiquetas claras.
```

### 8. Los tres elementos que garantizan la parada de un while

- **Archivo sugerido:** `t3-s4-tres-elementos.png`
- **Caption (referencia):** Sin la actualización que acerca la variable de control a la condición de parada, el while nunca termina. Elaboración propia.

**Prompt:**

```
Crear una figura didáctica en español que muestre los tres elementos de un while que termina. Bloque 1 'Inicialización (antes del ciclo): producidas = 0' fuera del lazo. Bloque 2 'Condición: producidas < meta' como rombo en la cabecera del lazo. Bloque 3 'Actualización (dentro del cuerpo): producidas += 1' con una flecha que indica 'acerca la variable a la parada' apuntando de vuelta a la condición. Contrastar al lado, en gris y tachado, un cuarto bloque 'sin actualización -> ciclo infinito'. Resaltar la flecha de avance hacia la parada. Estilo limpio, etiquetas legibles.
```

### 9. Niveles de anidamiento y sangría

- **Archivo sugerido:** `t3-s5-anidamiento.png`
- **Caption (referencia):** Cada estructura interna se indenta un nivel más; la sangría revela a qué estructura pertenece cada instrucción. Elaboración propia.

**Prompt:**

```
Diseñar una figura didáctica en español que muestre el anidamiento por sangría. Representar como bloques anidados con bordes de colores: un bloque exterior 'for pieza in lote' (nivel 0), dentro un bloque 'if fuera_de_tolerancia' (nivel 1, indentado), dentro otro bloque 'if tercera_consecutiva' (nivel 2, más indentado) con la accion 'detener linea'. Mostrar líneas guía verticales que marquen cada nivel de sangría y etiquetas 'nivel 0/1/2' a la izquierda. Estilo tipo editor de código limpio.
```

### 10. Doble ciclo recorriendo una matriz de mediciones

- **Archivo sugerido:** `t3-s5-recorrido-matriz.png`
- **Caption (referencia):** El for externo selecciona la fila (sensor) y el for interno recorre sus columnas (horas), visitando cada celda una vez. Elaboración propia.

**Prompt:**

```
Diseñar una figura didáctica en español de un recorrido de matriz con doble for. Dibujar una rejilla 3x4 con encabezados de columna 'h1..h4' (horas) y de fila 'S1, S2, S3' (sensores). Trazar flechas que indiquen el orden de visita: recorre toda la fila S1 (de h1 a h4), baja a S2 y repite, etc. Etiquetar 'for externo: filas (sensores)' a la izquierda y 'for interno: columnas (horas)' arriba; añadir la nota 'cuerpo interno se ejecuta 3 x 4 = 12 veces'. Estilo limpio, celdas con valores numéricos de ejemplo.
```

_Total Tema 03: 10 imágenes._

---

## Tema 04 — Arreglos y estructuras de datos

### 1. Índices positivos y negativos de una cadena

- **Archivo sugerido:** `alg04-fig-cadena-indices.png`
- **Caption (referencia):** Cada carácter ocupa una casilla con un índice positivo (de izquierda a derecha) y uno negativo (de derecha a izquierda). Elaboración propia.

**Prompt:**

```
Crear una figura didáctica en español: la cadena 'LOTE-2024A' representada como una fila de 10 casillas contiguas, una por carácter. Encima de cada casilla, el índice positivo 0,1,2,...,9; debajo de cada casilla, el índice negativo -10,-9,...,-1. Resaltar con color la casilla del índice 0 y la del índice -1. Estilo limpio, fondo claro, monoespaciado, etiquetas legibles.
```

### 2. El slicing extrae tramos sin alterar el original

- **Archivo sugerido:** `alg04-fig-slicing.png`
- **Caption (referencia):** Cada rebanada produce una subcadena nueva; la cadena original permanece sin cambios (inmutabilidad). Elaboración propia.

**Prompt:**

```
Crear una figura didáctica en español: arriba la cadena 'LOTE-2024A' en casillas con índices. Tres llaves de colores distintos marcan los tramos: [0:4] etiquetado 'LOTE' (prefijo), [5:9] etiquetado '2024' (año) y [-1] etiquetado 'A' (línea). Debajo, una copia de la misma cadena rotulada 'original sin cambios' para ilustrar la inmutabilidad. Estilo limpio, fondo claro, etiquetas legibles.
```

### 3. Una lista como casillas indexadas que crecen

- **Archivo sugerido:** `alg04-fig-lista-append.png`
- **Caption (referencia):** append agrega un elemento en una nueva posición al final; la lista crece dinámicamente sin recrearse desde cero. Elaboración propia.

**Prompt:**

```
Crear una figura didáctica en español: una lista representada como casillas contiguas con los valores 23.5, 24.1, 22.8 y sus índices 0,1,2 encima. Una flecha curva etiquetada 'append(25.0)' apunta a una casilla nueva añadida a la derecha con valor 25.0 e índice 3, dibujada con borde punteado para indicar que es nueva. Estilo limpio, fondo claro, etiquetas legibles.
```

### 4. Crecimiento dinámico de una lista en memoria

- **Archivo sugerido:** `alg04-fig-lista-memoria.png`
- **Caption (referencia):** Cuando una lista llena su bloque reservado, el sistema reserva un bloque mayor y copia los elementos: así crece dinámicamente (RA2). Elaboración propia.

**Prompt:**

```
Crear un diagrama didáctico en español sobre el crecimiento de una lista en memoria: a la izquierda, un bloque de memoria con 4 celdas ocupadas (valores) y 2 celdas libres punteadas. Una flecha 'append cuando el bloque está lleno' lleva a la derecha a un bloque más grande con todas las celdas previas copiadas más la nueva. Etiquetar 'reserva dinámica' y 'copia de elementos'. Estilo esquemático limpio, fondo claro, etiquetas legibles.
```

### 5. Tupla como registro fijo y su desempaquetado

- **Archivo sugerido:** `alg04-fig-tupla.png`
- **Caption (referencia):** Una tupla guarda un registro fijo; el desempaquetado reparte cada campo en una variable con nombre. Elaboración propia.

**Prompt:**

```
Crear una figura didáctica en español: la tupla ('CNC-12', 220, 15) dibujada como tres casillas entre paréntesis, cada una con un pequeño candado que indica inmutabilidad. Tres flechas etiquetadas reparten los valores hacia tres variables: modelo='CNC-12', voltaje=220, potencia=15. Estilo limpio, fondo claro, etiquetas legibles.
```

### 6. Acceso por clave en un diccionario

- **Archivo sugerido:** `alg04-fig-diccionario.png`
- **Caption (referencia):** Cada clave apunta directamente a su valor; buscar por clave no exige recorrer toda la estructura. Elaboración propia.

**Prompt:**

```
Crear un diagrama didáctico en español de un diccionario: a la izquierda, tres claves de texto en cajas ('R-100', 'R-205', 'R-310'); a la derecha, tres valores numéricos (40, 12, 8). Flechas conectan cada clave con su valor. Sobre la clave 'R-205' dibujar una lupa con la etiqueta 'acceso directo al valor 12' para ilustrar la búsqueda por clave. Estilo limpio, fondo claro, etiquetas legibles.
```

### 7. Matriz como lista de listas con índices de fila y columna

- **Archivo sugerido:** `alg04-fig-matriz.png`
- **Caption (referencia):** La matriz M[i][j] se indexa por fila i y columna j desde cero; M[1][1]=24. Elaboración propia.

**Prompt:**

```
Crear una figura didáctica en español: una cuadrícula de 2 filas por 3 columnas con los valores 20,21,19 en la fila superior y 22,24,23 en la inferior. Etiquetar los índices de fila (0 arriba, 1 abajo) a la izquierda y los índices de columna (0,1,2) arriba. Resaltar con color la celda de la fila 1, columna 1 (valor 24) y rotularla 'M[1][1]'. A un lado, mostrar la misma matriz escrita como lista de listas [[20,21,19],[22,24,23]]. Estilo limpio, fondo claro, etiquetas legibles.
```

### 8. Recorrido por filas con ciclos anidados

- **Archivo sugerido:** `alg04-fig-recorrido-matriz.png`
- **Caption (referencia):** El recorrido por filas visita cada celda una vez: termina una fila antes de pasar a la siguiente. Elaboración propia.

**Prompt:**

```
Crear un diagrama didáctico en español: cuadrícula de 2 filas por 3 columnas con celdas numeradas. Dibujar flechas que muestren el orden de recorrido por filas: visitar las tres celdas de la fila 0 de izquierda a derecha (pasos 1,2,3) y luego las de la fila 1 (pasos 4,5,6), con una flecha de retorno al inicio de la siguiente fila. Etiquetar 'ciclo externo: filas' y 'ciclo interno: columnas'. Estilo limpio, fondo claro, etiquetas legibles.
```

### 9. Árbol de decisión para elegir la estructura

- **Archivo sugerido:** `alg04-fig-arbol-decision.png`
- **Caption (referencia):** Un árbol de decisión guía la elección de la estructura a partir de acceso, mutabilidad y dimensión del dato. Elaboración propia.

**Prompt:**

```
Crear un diagrama de árbol de decisión en español para elegir una estructura de datos. Nodo raíz: '¿El dato es texto?' -> Sí: 'Cadena'. No -> '¿Accedo por clave/nombre?' -> Sí: 'Diccionario'. No -> '¿Tiene dos dimensiones (filas y columnas)?' -> Sí: 'Matriz (lista de listas)'. No -> '¿El conjunto cambia durante la ejecución?' -> Sí: 'Lista'; No: 'Tupla'. Usar cajas para cada estructura final y rombos para las preguntas. Estilo limpio, fondo claro, etiquetas legibles.
```

### 10. Pipeline de datos: de la cadena al reporte

- **Archivo sugerido:** `alg04-fig-pipeline.png`
- **Caption (referencia):** Cada etapa usa la estructura adecuada: cadena para parsear, lista para acumular, diccionario para agrupar. Elaboración propia.

**Prompt:**

```
Crear un diagrama de flujo horizontal en español que muestre un pipeline de datos en cinco etapas conectadas por flechas: (1) 'Líneas de texto M01;78.5' -> (2) 'Validar y partir con split (CADENA)' -> (3) 'Convertir valor a número' -> (4) 'Acumular lecturas por máquina (LISTA)' -> (5) 'Agrupar por código (DICCIONARIO)' -> (6) 'Recorrer, promediar y reportar máquina más caliente'. Resaltar el nombre de la estructura usada en cada etapa. Estilo limpio, fondo claro, etiquetas legibles.
```

_Total Tema 04: 10 imágenes._

---

## Tema 05 — Funciones, modularidad y memoria

### 1. Anatomía de una función en Python

- **Archivo sugerido:** `fig-anatomia-funcion.png`
- **Caption (referencia):** Cada parte cumple un rol: el encabezado declara la interfaz y el cuerpo implementa la tarea.

**Prompt:**

```
Crear una figura didáctica en español que muestre la línea 'def calcular_caudal(area, velocidad):' con flechas etiquetadas señalando: 'palabra clave def', 'nombre de la función', 'parámetros', 'dos puntos'; debajo el cuerpo indentado con 'caudal = area * velocidad' y 'return caudal' etiquetados como 'cuerpo' y 'valor de retorno'. Estilo limpio, colores institucionales, tipografía monoespaciada para el código.
```

### 2. Salto y retorno del control en una llamada

- **Archivo sugerido:** `fig-flujo-llamada.png`
- **Caption (referencia):** El control salta al cuerpo en la llamada y regresa a la línea siguiente con el valor de retorno.

**Prompt:**

```
Crear un diagrama de flujo didáctico en español con dos carriles verticales: izquierda 'Programa principal' (caja 'total = calcular_caudal(...)') y derecha 'Cuerpo de la función'. Flecha etiquetada 'llamada: salta al cuerpo' del carril izquierdo al derecho, y flecha etiquetada 'return: vuelve con el valor' del derecho al izquierdo, apuntando a la línea siguiente. Indicar 'main en pausa mientras la función trabaja'. Estilo de diagrama de flujo, colores institucionales.
```

### 3. Vinculación de argumentos a parámetros

- **Archivo sugerido:** `fig-vinculacion-parametros.png`
- **Caption (referencia):** En la llamada, cada argumento llena el parámetro correspondiente según su posición o su nombre.

**Prompt:**

```
Crear una figura didáctica en español con dos filas. Arriba la definición 'def dosificar(volumen, concentracion):' con los parámetros resaltados como recipientes vacíos. Abajo la llamada 'dosificar(50, 0.3)'. Flechas que conecten 50 → volumen y 0.3 → concentracion (paso por posición). A un lado, una variante 'dosificar(concentracion=0.3, volumen=50)' mostrando que por nombre el orden no importa. Estilo esquemático, tipografía monoespaciada para el código, colores institucionales.
```

### 4. Paso de un objeto mutable por referencia

- **Archivo sugerido:** `fig-paso-referencia.png`
- **Caption (referencia):** Ambos nombres apuntan al mismo objeto: si la función modifica el objeto, el cambio es visible fuera.

**Prompt:**

```
Crear una figura didáctica en español que muestre a la izquierda el nombre 'lecturas' (programa principal) y a la derecha el nombre 'datos' (parámetro dentro de la función), ambos con flechas que apuntan a un mismo recuadro etiquetado 'objeto lista [21.0, 23.5, ...]' en una zona rotulada 'memoria dinámica (heap)'. Indicar con un texto que modificar el objeto desde la función afecta a ambos nombres. Estilo esquemático, colores institucionales.
```

### 5. Ámbitos anidados: local dentro de global

- **Archivo sugerido:** `fig-ambitos.png`
- **Caption (referencia):** El ámbito local está contenido en el global; una función ve hacia afuera, pero el exterior no ve adentro.

**Prompt:**

```
Crear una figura didáctica en español con dos cajas concéntricas: la exterior rotulada 'Ámbito global' contiene la variable 'tarifa = 1500'; dentro, una caja 'Ámbito local de calcular_costo()' contiene 'total' y 'horas'. Flechas que indiquen 'la función puede leer tarifa (global)' y 'total y horas no existen fuera de la función'. Estilo de cajas anidadas, colores institucionales.
```

### 6. La escalera de búsqueda LEGB

- **Archivo sugerido:** `fig-legb.png`
- **Caption (referencia):** Python busca un nombre peldaño por peldaño y usa la primera coincidencia que encuentra.

**Prompt:**

```
Crear una figura didáctica en español con una escalera o pila de cuatro niveles, de arriba hacia abajo: 'Local (función actual)', 'Enclosing (función contenedora)', 'Global (módulo)', 'Built-in (len, print)'. Una flecha vertical etiquetada 'orden de búsqueda' que recorre de Local a Built-in, con una marca de verificación en el primer nivel donde se encuentra el nombre. Estilo de diagrama por niveles, colores institucionales.
```

### 7. Pila y montículo durante una llamada

- **Archivo sugerido:** `fig-stack-heap.png`
- **Caption (referencia):** La pila apila un marco por llamada; el heap aloja el objeto que un nombre de la pila referencia.

**Prompt:**

```
Crear una figura didáctica en español dividida en dos columnas. Izquierda rotulada 'Pila (stack)' con dos marcos apilados: 'main: lecturas (ref)' encima 'promedio(): suma, i'; cada marco etiquetado como 'frame'. Derecha rotulada 'Memoria dinámica (heap)' con un recuadro 'objeto lista [21.0, 23.5, 22.0]'. Una flecha desde 'lecturas (ref)' en la pila hacia el objeto del heap. Anotar 'el marco se libera al volver' en la pila. Estilo esquemático, colores institucionales.
```

### 8. Pila profunda (recursión) vs. pila plana (iteración)

- **Archivo sugerido:** `fig-pila-recursion.png`
- **Caption (referencia):** La recursión apila un marco por llamada; la iteración mantiene la pila casi constante.

**Prompt:**

```
Crear una figura didáctica en español con dos columnas. Izquierda rotulada 'Recursiva' con una torre alta de marcos apilados etiquetados 'suma_recursiva(...)' que se repite muchas veces, con una marca de advertencia '¡riesgo de desbordamiento!' arriba. Derecha rotulada 'Iterativa' con solo uno o dos marcos ('main', 'suma_iterativa') y la nota 'profundidad constante'. Estilo de marcos apilados, colores institucionales.
```

### 9. De un bloque monolítico a un diseño modular

- **Archivo sugerido:** `fig-modular.png`
- **Caption (referencia):** La descomposición convierte un bloque difícil de probar en módulos independientes y reutilizables.

**Prompt:**

```
Crear una figura didáctica en español de dos columnas. Izquierda: un rectángulo grande y denso rotulado 'main(): leer + validar + calcular + reportar todo junto' con aspecto desordenado. Derecha: un 'main()' corto que llama en secuencia a cuatro cajas separadas 'leer_datos()', 'validar()', 'calcular_indicadores()' y 'reportar()', cada una con su propia entrada/salida. Flechas de composición del main a las funciones. Estilo de diagrama de bloques, colores institucionales.
```

### 10. Mapa de memoria del control de calidad modular

- **Archivo sugerido:** `fig-memoria-modular.png`
- **Caption (referencia):** La profundidad de pila es pequeña y constante; la lista intermedia del heap vive solo durante tasa_aprobacion.

**Prompt:**

```
Crear una figura didáctica en español dividida en dos zonas. Izquierda 'Pila (stack)' con tres marcos apilados: 'main()', 'tasa_aprobacion()', 'validar()'; anotar 'profundidad = 3, constante'. Derecha 'Memoria dinámica (heap)' con dos objetos: 'medidas [10.0, 10.2, 9.5, 10.1]' y 'aprobadas [10.0, 10.2, 10.1]'; flecha desde el marco 'tasa_aprobacion' hacia 'aprobadas' con la nota 'se libera al retornar'. Estilo esquemático, colores institucionales.
```

_Total Tema 05: 10 imágenes._

---

## Tema 06 — Proyecto integrador: solución algorítmica

### 1. Esquema Entrada-Proceso-Salida del caso guía

- **Archivo sugerido:** `fig-eps-calidad.png`
- **Caption (referencia):** El modelo EPS hace visible el flujo de datos del proyecto antes de escribir una sola línea de Python.

**Prompt:**

```
Crear una figura didáctica en español con tres bloques conectados por flechas de izquierda a derecha. Bloque 1 'ENTRADAS' con tres viñetas: lista de pesos de piezas, valor nominal, tolerancia. Bloque 2 'PROCESO' con dos viñetas: clasificar cada pieza (conforme/no conforme), contar conformes. Bloque 3 'SALIDAS' con dos viñetas: porcentaje de conformidad del lote, lista de piezas rechazadas. Estilo limpio, etiquetas claras, paleta industrial sobria.
```

### 2. De la descomposición a los requisitos

- **Archivo sugerido:** `fig-descomposicion-requisitos.png`
- **Caption (referencia):** La descomposición del problema genera los requisitos: cada subproblema se traduce en al menos una afirmación verificable.

**Prompt:**

```
Crear un mapa conceptual en español de izquierda a derecha. A la izquierda un nodo 'Problema: reportar conformidad de un lote'. En el centro, cuatro nodos de subproblema: 'Leer pesos', 'Clasificar pieza', 'Calcular porcentaje', 'Generar reporte'. A la derecha, tarjetas de requisito conectadas: 'R1 clasificar', 'R2 conformidad', 'R3 rechazos', 'R4 validar entrada', 'R5 memoria'. Flechas que muestran cómo cada subproblema deriva en uno o más requisitos. Estilo limpio de mapa conceptual con nodos redondeados.
```

### 3. Descomposición modular del proyecto (árbol de funciones)

- **Archivo sugerido:** `fig-arbol-modular.png`
- **Caption (referencia):** El árbol de descomposición muestra la jerarquía de funciones y qué llama a qué, antes de escribir el cuerpo de cada una.

**Prompt:**

```
Crear un diagrama de árbol jerárquico en español. Raíz: 'main()'. Segundo nivel: 'leer_pesos()', 'procesar_lote()', 'generar_reporte()'. Tercer nivel colgando de procesar_lote(): 'clasificar_pieza()' y 'calcular_conformidad()'. Flechas de llamada de arriba hacia abajo, cajas redondeadas, etiquetas de qué hace cada función debajo del nombre. Estilo técnico limpio.
```

### 4. Cohesión y acoplamiento: dos diseños comparados

- **Archivo sugerido:** `fig-cohesion-acoplamiento.png`
- **Caption (referencia):** El contraste visual muestra por qué se busca alta cohesión y bajo acoplamiento: menos flechas y responsabilidades claras.

**Prompt:**

```
Crear una figura comparativa en español con dos paneles. Panel izquierdo 'Diseño monolítico': una caja grande llamada 'procesar_todo()' con varias flechas internas enredadas y la etiqueta 'baja cohesion, alto acoplamiento'. Panel derecho 'Diseño modular': cuatro cajas pequeñas ('leer', 'clasificar', 'calcular', 'reportar') conectadas por pocas flechas ordenadas y la etiqueta 'alta cohesion, bajo acoplamiento'. Usar color para resaltar el enredo a la izquierda y el orden a la derecha. Estilo de diagrama técnico didáctico.
```

### 5. Flujograma del recorrido de clasificación

- **Archivo sugerido:** `fig-flujo-clasificacion.png`
- **Caption (referencia):** El flujograma traduce el contrato de procesar_lote en estructuras de control concretas antes de teclear el código.

**Prompt:**

```
Crear un flujograma estándar en español con símbolos clásicos. Inicio (óvalo). Proceso: 'conformes = 0; rechazos = []'. Símbolo de ciclo 'para cada peso en pesos'. Decisión (rombo): '|peso - nominal| <= tolerancia?'. Rama Sí: 'conformes += 1'. Rama No: 'rechazos.append((indice, peso))'. Al cerrar el ciclo, proceso: 'conformidad = conformes / n * 100'. Fin (óvalo). Conectores claros, estilo flujograma técnico.
```

### 6. Cómo se integran las estructuras en procesar_lote

- **Archivo sugerido:** `fig-integracion-estructuras.png`
- **Caption (referencia):** La figura muestra cómo la función orquesta una estructura iterativa, una selectiva y dos estructuras de datos en una sola unidad.

**Prompt:**

```
Crear un diagrama en español que represente la anatomía de la función procesar_lote. Una caja exterior 'procesar_lote(pesos, nominal, tolerancia)'. Dentro, un bloque etiquetado 'CICLO for (iterativa)' que envuelve un bloque 'CONDICIONAL if/else (selectiva)' con dos salidas: 'conformes += 1' y 'rechazos.append(...)'. A la derecha, dos estructuras de datos: un entero 'conformes' y una lista 'rechazos', confluyendo en un 'dict de salida'. Etiquetas que nombren cada tipo de estructura (iterativa, selectiva, datos). Estilo de diagrama de bloques técnico.
```

### 7. Las tres familias de casos de prueba

- **Archivo sugerido:** `fig-familias-prueba.png`
- **Caption (referencia):** Ubicar cada familia sobre el dominio de los datos ayuda a no olvidar los bordes ni las entradas inválidas.

**Prompt:**

```
Crear una figura didáctica en español con una recta horizontal que represente el dominio de los pesos. Marcar el valor nominal en el centro y la banda de tolerancia [nominal-t, nominal+t]. Etiquetar: en el centro de la banda 'CASOS NORMALES'; justo en los bordes de la banda 'CASOS LIMITE (valor exacto en la tolerancia)'; fuera del dominio válido (pesos negativos o lote vacío, representado aparte) 'CASOS DE ERROR'. Usar colores distintos por familia y una leyenda. Estilo de diagrama conceptual claro.
```

### 8. Pila y heap durante la ejecución de procesar_lote

- **Archivo sugerido:** `fig-pila-heap-proyecto.png`
- **Caption (referencia):** El diagrama separa lo que ocupa espacio fijo en la pila de lo que crece dinámicamente en el heap, evidencia central del RA2.

**Prompt:**

```
Crear un diagrama de memoria en español con dos columnas. Columna izquierda etiquetada 'PILA': un marco de función 'procesar_lote' con casillas pequeñas para 'nominal', 'tolerancia', 'conformes (int)', 'indice (int)'. Columna derecha etiquetada 'HEAP (memoria dinamica)': dos objetos de lista, uno 'pesos [entrada]' y otro 'rechazos []' que se muestra creciendo con una flecha. Flechas de referencia desde la pila hacia los objetos del heap. Nota visual: 'la pila es de tamano fijo; el heap crece con los rechazos'. Estilo técnico educativo.
```

### 9. Estructura de entrega del proyecto integrador

- **Archivo sugerido:** `fig-estructura-proyecto.png`
- **Caption (referencia):** Una entrega ordenada separa el código, las pruebas, los datos de ejemplo y la documentación.

**Prompt:**

```
Crear un diagrama de árbol de archivos en español. Carpeta raíz 'proyecto/'. Dentro: 'control_calidad.py' (codigo de la solucion), 'test_control_calidad.py' (pruebas automatizadas), 'README.md' (como ejecutar y que hace), 'datos_ejemplo.csv' (lote de ejemplo). A la derecha de cada archivo, una etiqueta breve de su contenido. Estilo de explorador de archivos limpio, iconos de archivo/carpeta.
```

### 10. Matriz de trazabilidad requisito - código - prueba

- **Archivo sugerido:** `fig-trazabilidad.png`
- **Caption (referencia):** La matriz de trazabilidad demuestra que ningún requisito quedó sin implementar ni sin verificar.

**Prompt:**

```
Crear una figura de matriz de trazabilidad en español con tres columnas conectadas por flechas: 'REQUISITO' (R1 clasificar, R2 conformidad, R3 rechazos, R4 validar entrada, R5 memoria), 'FUNCION/CODIGO' (clasificar_pieza, calcular_conformidad, procesar_lote, guardia ValueError, contador acumulador) y 'PRUEBA' (CP1, CP2, CP1 rechazos, CP5, analisis de memoria). Flechas que enlazan cada fila de requisito con su función y su prueba. Estilo de tabla técnica clara con tres bandas de color por columna.
```

_Total Tema 06: 10 imágenes._

---

**Total de imágenes únicas en la asignatura: 60.**
