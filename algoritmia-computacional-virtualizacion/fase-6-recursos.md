# Fase 6 — Recursos e-learning · Algoritmia Computacional I (AG)

Asignatura: **Algoritmia Computacional I** · Tecnología en Aplicaciones Digitales Inteligentes ·
Facultad de Ingeniería · Metodología **Aprendizaje Guiado (AG)** · **3 créditos** · 100% virtual.
Estado: instrumento **aprobado por el docente sin cambios** (ver `estado-proyecto.json`).

Para 3 créditos corresponden **3 componentes didácticos** (creados) + **5 materiales complementarios**
(curados, 40% en inglés). Lenguaje de ejemplos: Python (+ pseudocódigo/PSeInt en el Tema 1).
Enfoque transversal a las ingenierías, orientación a procesos industriales.

---

## 1. Material complementario aprobado (5 · 40% inglés)

| ID | Referencia (APA 7) | Tipo | Idioma | Temas | Justificación |
|----|--------------------|------|:------:|:-----:|---------------|
| M1 | Joyanes Aguilar, L. (2013). *Fundamentos generales de programación*. McGraw-Hill Interamericana. | Libro base | es | 1, 2, 3 | Fuente disciplinar primaria: fundamentos, pseudocódigo y estructuras. |
| M2 | Oviedo Regino, E. (2005). *Lógica de programación*. Ecoe Ediciones. | Libro complementario | es | 1, 3 | Refuerza la lógica algorítmica y las estructuras de control. |
| M3 | Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2009). *Introduction to algorithms* (3rd ed.). MIT Press. | Libro complementario | **en** | 3, 4, 5 | Referencia internacional clave en algoritmos y estructuras de datos. |
| M4 | Downey, A. B. (2015). *Think Python: How to think like a computer scientist* (2nd ed.). O'Reilly Media. | Recurso abierto (libro en línea) | **en** | 2, 4, 5 | Texto abierto para tipos de datos, estructuras y funciones; apoyo autónomo. |
| M5 | Molina Martínez, J. y Jiménez Buendía, M. (2012). *Programación gráfica para ingenieros*. Alfaomega. | Libro complementario | es | 6 | Aplicación a soluciones de ingeniería; sustenta el proyecto integrador. |

Idioma inglés: M3 + M4 = **2 de 5 = 40%**. ✔

**Enlaces / acceso (TODO de curaduría, no inventar):**
- M1: verificar acceso en biblioteca externa-digital.
- M2: verificar acceso institucional-digital.
- M3: verificar edición/acceso en base de datos institucional.
- M4: enlace abierto `https://greenteapress.com/wp/think-python-2e/` (verificar vigencia).
- M5: verificar acceso institucional-físico.

---

## 2. Componentes didácticos creados (3)

Selección del **catálogo oficial UA** según pertinencia para programación y para la ruta guiada (AG):
del concepto y trazado de algoritmos, al control de flujo, a las estructuras de datos.

| NN | Componente (catálogo UA) | Tema | RA | Saberes | Evidencia / taller que apoya | Prompt |
|----|--------------------------|:----:|----|---------|------------------------------|--------|
| 01 | **Video interactivo** (video explicativo con pausas) — "Prueba de escritorio: traza paso a paso de un algoritmo" | 1 | RA1 | S1–S4 | Taller 1: pseudocódigo + flujograma + tabla de traza | `fase-6-prompts/01-video-interactivo.md` |
| 02 | **Infografía animada** — "Mapa de decisiones: estructuras selectivas y de control" | 3 | RA1 | S13–S15 | Taller 3: programa con condicionales/ciclos + explicación del flujo | `fase-6-prompts/02-infografia-animada.md` |
| 03 | **OVA / Juego didáctico** (emparejamiento + arrastrar y soltar + escenario de decisiones) — "¿Qué estructura de datos uso?" | 4 | RA1, RA2 | S18–S20 | Taller 4: modelar datos de ingeniería con la estructura adecuada y recorrerla | `fase-6-prompts/03-ova-juego-didactico.md` |

### Justificación de la selección (3 créditos → 3 componentes)
- **Video interactivo (Tema 1):** la prueba de escritorio es la competencia fundacional de RA1; el formato
  con pausas obliga al estudiante a predecir el estado de las variables antes de continuar (aprendizaje
  guiado activo). Cubre la base que sostiene todos los temas siguientes.
- **Infografía animada (Tema 3):** el control de flujo (selectivas/iterativas) es el núcleo de RA1 y el
  punto donde más errores conceptuales aparecen (ciclos infinitos, anidamiento). La infografía animada
  sintetiza el "cuándo uso qué" de forma escaneable y reutilizable.
- **OVA / juego didáctico (Tema 4):** las estructuras de datos articulan RA1 y RA2; el juego interactivo
  (emparejar estructura↔caso, arrastrar datos a la estructura correcta, decidir el recorrido) consolida
  la transferencia a casos de ingeniería con retroalimentación inmediata.

---

## 3. Cobertura por tema

| Tema | RA | Material complementario | Componente didáctico creado |
|------|----|-------------------------|-----------------------------|
| 1 Fundamentos del algoritmo y su representación | RA1 | M1, M2 | **C01 Video interactivo** (prueba de escritorio) |
| 2 Lenguajes, tipos de datos y librerías | RA1 | M1, M4 | (apoyado por C01 y por los `code` del Documento de Saberes) |
| 3 Estructuras selectivas y de control | RA1 | M1, M2, M3 | **C02 Infografía animada** (mapa de decisiones) |
| 4 Arreglos y estructuras de datos | RA1, RA2 | M3, M4 | **C03 OVA / juego didáctico** (¿qué estructura uso?) |
| 5 Funciones, modularidad y memoria | RA2 | M3, M4 | (apoyado por steppers de pila/heap del Documento de Saberes) |
| 6 Proyecto integrador: solución algorítmica | RA1, RA2 | M5 | (integra C01–C03 + componentes del Documento de Saberes) |

**Lectura de cobertura:** los 6 temas quedan cubiertos por material complementario; los 3 componentes
creados se ubican en los temas de mayor densidad conceptual y mayor valor de interacción (1, 3 y 4),
y se reutilizan transversalmente como recurso de repaso en los temas 2, 5 y 6. Los temas sin componente
creado propio se apoyan en los recursos dinamizadores embebidos en el Documento de Saberes (steppers de
traza, code Python, figuras de pila/heap y de matrices, charts analíticos).

---

## 4. Marca y accesibilidad (común a los 3 prompts)

- Institución: **Universidad de América** (marca académica, no tema del contenido).
- Paleta: Primary `#060b00`, Primary container `#1a2403`, acento verde `#c0f500`, acentos
  `#f0b300`/`#ffe086`, Surface `#fbf8fb`, Surface low `#f5f3f5`, Outline `#c6c8ba`. Verde como acento,
  no como fondo de texto largo.
- Tipografía: **Montserrat** (títulos/etiquetas), **Inter** (cuerpo), **JetBrains Mono** (código).
- Accesibilidad: texto alternativo en toda imagen/animación, contraste AA, subtítulos en video,
  transcripción del audio, navegación por teclado en interactivos, no depender solo del color.
- APA 7; "**Elaboración propia**" en todo recurso creado; similitud ≤ 30%; no inventar fuentes ni datos
  del syllabus.

---

## 5. Trazabilidad

Cada componente referencia su **Formato oficial** UA en
`insumos-institucionales/Escenario de aprendizaje/COMPONENTES DIDÁCTICOS/Formatos_*.docx`
(plantilla a diligenciar en producción). La separación Fase 6 → producción se mantiene: aquí se entregan
los **prompts**, no el contenido final del recurso.
