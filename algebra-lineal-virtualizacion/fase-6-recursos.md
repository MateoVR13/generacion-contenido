# Fase 6 — Recursos e-learning · Álgebra Lineal (AG, 3 créditos)

Asignatura **teórica, 100% virtual**, transversal a las ingenierías (industrial, mecánica,
mecatrónica, petróleos, química, ambiental, energías). Metodología **Aprendizaje Guiado (AG)**:
ruta por etapas progresivas (un tema = una etapa) desde lo conceptual hasta la aplicación
integradora. Parametrización por créditos (PL-VIR-001 v02, 3 cr): **3 componentes didácticos**
y **5 materiales complementarios**.

Los componentes se eligen **según el saber y la etapa, no por cuota**. Como la asignatura es
teórica, **no se requieren recursos de simulación** (confirmado en `estado-proyecto.json`).

---

## 1. Componentes didácticos (3)

| # | Componente (catálogo oficial UA) | Tema asociado | RA | Justificación pedagógica (AG) |
|---|---|---|---|---|
| 01 | **Video explicativo** con resolución paso a paso (pizarra/grabación con narración) | **Tema 1 — Sistemas de ecuaciones lineales y método de Gauss-Jordan** | RA1, RA2 | Es la **primera etapa** y el saber más procedimental: traducir un problema a un sistema y resolverlo por Gauss-Jordan. El video modela el "cómo" de forma guiada (lo que el documento de saberes no muestra en movimiento), reduce la carga cognitiva del estudiante autónomo y fija la rutina de cálculo que sostiene todo el curso. Aborda las preguntas orientadoras "¿cómo se traduce un problema a un sistema?" y "¿cuándo hay solución única, infinita o ninguna?". |
| 02 | **Infografía animada** | **Tema 3 — Determinantes, inversa y regla de Cramer** | RA2 | Etapa **comparativa/decisional**: qué informa el determinante y cuándo conviene Cramer frente a Gauss-Jordan o la inversa. La infografía animada sintetiza criterios de decisión, fórmulas clave y condiciones (det = 0 / det ≠ 0) en una pieza escaneable y memorable, ideal para consolidar un cuerpo de reglas que de otro modo se dispersa en el texto. Responde directamente a las preguntas orientadoras del tema. |
| 03 | **Objeto Virtual de Aprendizaje (OVA) interactivo** | **Tema 5 — Rectas, planos y aplicaciones del álgebra lineal** | RA1, RA2, RA3 | Etapa **integradora** del AG (cierra los tres RA). Un OVA combina lectura guiada, figura 3D interactiva, ejemplos por ingeniería y comprobación de intersecciones (recta–plano, recta–recta), apoyando el taller ajustado por el docente: "hallar ecuaciones de recta y plano, gráfica e intersecciones". Su interactividad permite **evaluar la pertinencia** (RA3) de las aplicaciones (rotaciones/traslaciones, criptografía, circuitos) en distintos campos. |

**Cobertura RA:** RA1 (comp. 01, 03) · RA2 (comp. 01, 02, 03) · RA3 (comp. 03) → los 3 RA quedan cubiertos.

**Temas 2 y 4:** se apoyan en las figuras y *steppers* del propio Documento de Saberes (tabla de
operaciones matriciales; figura geométrica de vectores) más los materiales complementarios M2 y M4,
sin consumir un componente didáctico adicional (que excedería la cuota de 3 para 3 créditos).

**Marca y accesibilidad (común a los 3):** paleta UA (Primary `#060b00`, Primary container
`#1a2403`, acento verde `#c0f500`, terciario `#f0b300`/`#ffe086`, Surface `#fbf8fb`); tipografía
Montserrat (títulos), Inter (cuerpo), JetBrains Mono (fórmulas textuales/código); logo UA solo en
portada/cierre (blanco sobre fondo oscuro, negro sobre claro); texto alternativo en toda imagen,
subtítulos/transcripción en audio y video, contraste AA, expresiones matemáticas en LaTeX y gráficos
cuantitativos en Chart.js.

---

## 2. Material complementario (5)

Bibliografía y recursos de ampliación en **APA 7**, partiendo de las fuentes base validadas
(Larson, 2010; Grossman, 2008). Se rotula "Elaboración propia" lo creado y se respeta similitud ≤30%.
Los recursos web son de acceso institucional/abierto reconocido; **el equipo debe verificar URL, edición
y vigencia antes del montaje** (no se inventan DOI ni enlaces).

| # | Material complementario | Tipo | Tema(s) asociado(s) | Justificación |
|---|---|---|---|---|
| M1 | Larson, R. (2010). *Fundamentos de álgebra lineal* (6.ª ed.). Cengage Learning. **Cap. de sistemas lineales y método de Gauss-Jordan.** | Capítulo de libro base | Tema 1 (y transversal) | Fuente disciplinar primaria para la etapa fundacional: definiciones, teoremas y ejercicios de sistemas y eliminación. Anclaje teórico del video (comp. 01). |
| M2 | Grossman, S. I. (2008). *Álgebra lineal*. McGraw-Hill. **Cap. de matrices y operaciones; cap. de determinantes e inversa.** | Capítulos de libro base | Temas 2 y 3 | Cubre el álgebra matricial y los determinantes con un enfoque aplicado distinto al de Larson; da profundidad a las etapas 2 y 3 y soporta la infografía (comp. 02). |
| M3 | Khan Academy. (s. f.). *Álgebra lineal* [curso en línea, recursos abiertos en español]. https://es.khanacademy.org/math/linear-algebra | Recurso abierto (video + ejercicios) | Temas 1–4 (refuerzo) | Ejercitación autónoma adicional y explicaciones alternativas para el estudiante 100% virtual; útil como apoyo de nivelación de la diagnóstica. *(Verificar enlace y disponibilidad de subtítulos.)* |
| M4 | Anton, H., & Rorres, C. (2013). *Álgebra lineal con aplicaciones* (10.ª ed., trad.). Limusa Wiley. **Caps. de vectores en R² y R³, producto punto y producto cruz.** | Libro complementario | Tema 4 | Texto fuerte en interpretación geométrica y aplicaciones de vectores (fuerzas, geometría), pertinente para el enfoque transversal a varias ingenierías. *(Verificar edición/año disponible en biblioteca.)* |
| M5 | Lay, D. C., Lay, S. R., & McDonald, J. J. (2016). *Álgebra lineal y sus aplicaciones* (5.ª ed., trad.). Pearson. **Caps. de rectas/planos, transformaciones lineales y aplicaciones (criptografía, circuitos).** | Libro complementario | Tema 5 (integrador) | Referencia clave en transformaciones y aplicaciones del álgebra lineal; sustenta el OVA (comp. 03) y la etapa integradora (RA3). *(Verificar edición/año disponible.)* |

**Cobertura por tema:** T1 → M1, M3 · T2 → M2, M3 · T3 → M2, M3 · T4 → M3, M4 · T5 → M5.

---

## 3. Prompts de generación

Un prompt por componente didáctico, listo para ejecutar, en `fase-6-prompts/`:

- `fase-6-prompts/01-video-explicativo.md` — Tema 1 (RA1, RA2)
- `fase-6-prompts/02-infografia-animada.md` — Tema 3 (RA2)
- `fase-6-prompts/03-ova-interactivo.md` — Tema 5 (RA1, RA2, RA3)

> Los materiales complementarios **no** requieren prompt de generación (son fuentes externas/referencias
> APA, no contenido a producir). La Fase 6 separa la generación del *prompt* de la producción del recurso.

---

## 4. Alertas heredadas (sin resolver en esta fase)

- **Horas:** equivalencia 48 h docencia directa (syllabus) vs 15 h acompañamiento directo (PL-VIR-001)
  no indicada por el docente → mantener alerta para Programa/Coordinación de Virtualidad.
- **URL y ediciones** de M3, M4, M5: verificar vigencia/disponibilidad antes del montaje (Fase 7).
