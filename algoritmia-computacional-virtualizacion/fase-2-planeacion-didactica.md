# Fase 2 — Planeación didáctica (diseño inverso, AG) · Algoritmia Computacional I

> Pipeline 1 (AG) · PROPUESTA, sujeta a validación docente. 3 créditos · 144 h · DS 40–45 págs · 3 componentes
> didácticos · 5 materiales complementarios (≥30% inglés).

## Justificación de AG

Asignatura fundacional de programación con saberes en progresión acumulativa y evidencia por talleres + un
proyecto integrador al cierre. Encaja con **Aprendizaje Guiado**: ruta por temas/etapas de lo básico a lo
complejo, con práctica y retroalimentación. El proyecto final se incluye como **tema integrador** (Tema 6), no
como eje estructurante (lo que descartaría hacia ABPr). Ver `recomendacion-metodologia.md`.

## Número de temas propuesto: **N = 6** (a validar)

Derivado de los 13 saberes normalizados, agrupados en una progresión coherente. El docente puede fusionar,
dividir o reordenar.

| # | Tema (propuesto) | RA | Propósito por etapa | Preguntas orientadoras |
|---|---|---|---|---|
| 1 | Fundamentos del algoritmo y representación | RA1 | Comprender qué es un algoritmo y representarlo (flujograma, pseudocódigo) antes de programar. | ¿Qué hace que un procedimiento sea un algoritmo? · ¿Cómo paso de un problema a pseudocódigo sin ambigüedad? |
| 2 | Lenguaje de programación, tipos de datos y librerías | RA1 | Traducir algoritmos a un lenguaje (Python), con tipos de datos y librerías. | ¿Por qué un lenguaje de alto nivel frente a máquina/ensamblador? · ¿Qué tipo de dato/librería para cada problema? |
| 3 | Estructuras selectivas y de control | RA1 | Controlar el flujo con decisiones y repeticiones. | ¿Cuándo selectiva vs. repetitiva? · ¿Cómo evito ciclos infinitos y errores de borde? |
| 4 | Arreglos unidimensionales (cadenas, listas, tuplas, diccionarios) | RA1 | Organizar y manipular colecciones en una dimensión. | ¿Qué estructura según mutabilidad/acceso? · ¿Cómo recorro y transformo una colección? |
| 5 | Arreglos multidimensionales y memoria | RA2 | Representar estructuras vectoriales/matriciales y evaluar uso de memoria. | ¿Cómo represento y recorro una matriz? · ¿Cómo afecta la asignación dinámica de memoria a la ejecución? |
| 6 | Funciones y proyecto integrador | RA2 | Modularizar con funciones y aplicar todo en un proyecto estructurado. | ¿Cómo descompongo en funciones reutilizables? · ¿Cómo integro estructuras, arreglos y funciones? |

## Subtemas relevantes por tema (solo listado, a validar — cobertura disciplinar)

- **Tema 1:** concepto de algoritmo (E-P-S) · características de un buen algoritmo · flujograma (símbolos) ·
  pseudocódigo (convenciones) · del problema al pseudocódigo (trazado).
- **Tema 2:** lenguajes (máquina/ensamblador/alto nivel) · variables y tipos de datos · operadores y
  expresiones · entrada/salida básica · uso e importación de librerías.
- **Tema 3:** selectivas (if/elif/else) · selección múltiple · ciclos definidos (for) · ciclos indefinidos
  (while) · control de flujo (break/continue) y trazado.
- **Tema 4:** cadenas y operaciones · listas · tuplas (inmutabilidad) · diccionarios (clave-valor) ·
  recorrido y búsqueda.
- **Tema 5:** matrices (representación/recorrido) · operaciones vectoriales/matriciales · asignación dinámica
  de memoria (concepto) · eficiencia y consumo de memoria · NumPy (vectores/matrices).
- **Tema 6:** definición y llamada de funciones · parámetros, retorno y alcance · descomposición modular ·
  programación estructurada integrada · proyecto final (diseño y construcción).

## Ruta del estudiante

Bienvenida → Escenario inicial (propósito + ≥1 pregunta orientadora por RA) → Temas 1–6 (cada uno: estudio de
saberes + taller + apropiación individual + socialización) → Evaluación sumativa integradora (Proyecto final)
→ Cierre.

## Distribución de horas (144 h, referencia 3 créditos)

Bienvenida 2 · Escenario preliminar 3 · Estudio de saberes 40 · Recursos didácticos 15 · Material
complementario 15 · Evaluaciones individuales 15 · Evaluaciones colaborativas 33 · Sincrónicos 15 ·
Comunicados/foros 6.

## Material complementario propuesto (5 para 3 créditos · a validar)

| # | Referencia (APA 7) | Tipo | Idioma | Tema(s) | Justificación |
|---|---|---|---|---|---|
| M1 | Joyanes Aguilar, L. (2008). *Fundamentos de programación* (4.ª ed.). McGraw-Hill. | Libro base (digital) | ES | 1,2,3 | Base de algoritmo, pseudocódigo y estructuras. |
| M2 | Oviedo Regino, E. (2005). *Lógica de programación*. Ecoe. | Libro complementario (digital) | ES | 1,3 | Refuerza lógica y estructuras de control. |
| M3 | Downey, A. B. (2015). *Think Python* (2nd ed.). O'Reilly. | Libro abierto (inglés) | EN | 2,4,6 | Tipos de datos, colecciones y funciones en Python (abierto). |
| M4 | Harris, C. R., et al. (2020). Array programming with NumPy. *Nature, 585*, 357–362. | Artículo/doc (inglés) | EN | 5 | Arreglos vectoriales/matriciales y memoria con NumPy. |
| M5 | Molina Martínez, J. y Jiménez Buendía, M. (2012). *Programación gráfica para ingenieros*. Alfaomega. | Libro complementario (físico) | ES | 4,6 | Programación aplicada a ingeniería; apoya el proyecto. |

**Cobertura por tema:** T1→M1,M2 · T2→M1,M3 · T3→M1,M2 · T4→M3,M5 · T5→M4 · T6→M3,M5.

**Internacionalización (≥30% inglés):** 2 de 5 materiales en inglés (M3, M4) = **40%** → **cumple**.
> Brecha resuelta como propuesta: la bibliografía básica del syllabus era 100% español; M3 y M4 (inglés) se
> proponen para validación. M3/M4 llevan `todo` de verificación de edición/URL (no se inventan datos).

## Recursos proyectados (a confirmar con el docente)

- Entorno **Python** (intérprete/IDE o entorno online) — el syllabus apunta a Python por librerías y
  colecciones; confirmar.
- Visualizador de flujogramas/pseudocódigo (p. ej. PSeInt) para el Tema 1 — confirmar.

## Cierre F2

Planeación propuesta (6 temas + subtemas + material complementario con 40% inglés + cobertura). Todo marcado
como PROPUESTO para el instrumento docente. **Estado → fase 3.**
