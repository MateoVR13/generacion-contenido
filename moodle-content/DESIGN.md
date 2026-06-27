# moodle-content — Diseño maestro

Proyecto independiente para generar los **componentes HTML que se pegan en el aula de Moodle**
(la "envoltura" institucional que rodea al SCORM). Dos piezas:

1. **`template/`** — renderer local (HTML + JS, abrir en navegador) que carga un JSON y emite
   **HTML con estilos 100% inline** (Moodle NO permite `<script>` ni CSS externo en el contenido).
   El autor copia el HTML generado y lo pega en el editor HTML de cada página de Moodle.
2. **`skill/`** — skill `moodle-content`: recibe **syllabus + metodología** (ABPr/ABI/ABR/ABC/AG) y
   genera el **JSON** que alimenta el renderer.

Flujo: `syllabus + metodología → [skill] → JSON → [template renderer] → HTML inline pegable`.

---

## Marca (unificada con las skills SCORM, identidad_marca.md)

Solo CSS inline. Tokens:

| Rol | Color |
|---|---|
| Fondo institucional oscuro | `#1a2403` |
| Degradado oscuro (heros/banners) | `linear-gradient(135deg,#1a2403 0%,#1a4d3a 100%)` |
| **Acento principal (lima)** | `#c0f500` |
| Acento secundario (ámbar) | `#f0b300` |
| Texto principal | `#1a2403` / `#2c2e26` |
| Texto tenue | `#5a5c52` |
| Superficie clara | `#ffffff` |
| Superficie suave / chips | `#f5f3f5` / `#eef7d6` (lima muy claro) |
| Borde | `#cdd4c4` / `#e3e0d5` |

- Tipografía: `Montserrat` (títulos, labels, botones, caps), `Inter` (cuerpo). Declaradas inline por
  `font-family` (Moodle suele tener Montserrat/Inter o degrada a sans-serif; no se importan fuentes).
- Logo: URL pública configurable (`branding.logoUrl`), default `https://i.postimg.cc/c1tGwQnF/Logo-UA.png`.
- Acentos lima sobre fondo oscuro; texto oscuro sobre fondo claro; el lima NO como fondo de texto largo.
- El acento del ejemplo era dorado `#e6b400`; se reemplaza por lima `#c0f500` para unificar. El ámbar
  `#f0b300` queda disponible como secundario donde el ejemplo usaba dorado en badges/botones puntuales.

---

## Esquema JSON de entrada (root key: `moodle`)

```json
{
  "moodle": {
    "branding": {
      "logoUrl": "https://i.postimg.cc/c1tGwQnF/Logo-UA.png",
      "institution": "Universidad de América",
      "faculty": "Facultad de Ingeniería",
      "year": "2026"
    },
    "course": {
      "title": "Análisis Vectorial",
      "program": "Pregrado en Ingeniería",
      "methodology": { "code": "AG", "name": "Aprendizaje Guiado" },
      "momentLabelSingular": "Contenido",      // etiqueta visible por momento; depende de metodología
      "momentCountLabel": "7 Contenidos"        // chip del hero
    },
    "pageOrder": ["bienvenida", "momento-1", "momento-2", "...", "cierre"],
    "pages": {
      "bienvenida": { "type": "welcome", "components": [ ... ] },
      "momento-1":  { "type": "moment", "momentNumber": "1", "momentName": "...", "components": [ ... ] },
      "cierre":     { "type": "closing", "components": [ ... ] }
    }
  }
}
```

- Cada **página** tiene `type` (`welcome` | `moment` | `closing`) y un array `components`.
- Cada **componente** tiene `type` y campos propios (ver inventario abajo).
- `pageOrder` lista las páginas en orden. El renderer emite un bloque HTML por página (cada bloque es lo
  que se pega en una página de Moodle distinta).
- El número de páginas `moment` = número de momentos de la metodología.

---

## Tipos de página y componentes que admite cada una

### Página `welcome` (Bienvenida del curso — nivel asignatura)
1. `hero` — degradado oscuro, logo marca de agua, eyebrow (programa·unidad), título curso, descripción,
   chips (programa, metodología, nº momentos), y opcional video de presentación (`videoEmbedUrl`, Synthesia/YouTube).
2. `learning-outcomes` — grid de cards de RA. Cada RA: número, verbo/etiqueta (Modelo/Analizo/Resuelvo…), texto.
3. `activities` — "Actividades de Inicio": lista de cards (diagnóstica, foro, bitácora…). Cada una:
   icono(emoji), paso/etiqueta, título, descripción, opcional `details` (summary+texto), fechas (abre/cierra), botón (href+label).
4. `roadmap` — infografía embebida por iframe (`embedUrl`, ej. Netlify). Alto configurable.
5. `course-glance` — "Tu Curso de un Vistazo": grid de hasta 3 cards: docente (foto, nombre, título, bio, tags),
   syllabus (preview PDF iframe + botón), cronograma (preview PDF iframe + botón).
6. `resources` — "Recursos de Apoyo": grid de cards (tipo+nivel badge, icono, título, descripción, href).
   Tipos: e-book, video, artículo, software (cada uno con su color de icono).
7. `footer` — pie institucional (logo, título curso, copyright, nota).

### Página `moment` (una por momento de la metodología)
1. `moment-banner` — banner verde con icono, eyebrow (curso · Momento N), título ("Contenido N"/"Momento N"
   según etiqueta), subtítulo (tema del momento).
2. `moment-intro` — intro + video del momento (texto + `videoEmbedUrl` Synthesia).
3. `roadmap` — (reutilizable) infografía embebida.
4. `scorm-link` — banner CTA → contenido teórico SCORM en Moodle (`href`). Icono, eyebrow, título, descripción, botón.
5. `practice-link` — banner CTA → ejercicios/práctica en Moodle (`href`).
6. `complementary` — "Material Complementario": lista de referencias APA. Cada item: nombre del recurso,
   referencia APA (con `<em>` para títulos), href "Ver recurso".
7. `footer` — pie con "curso · Momento N".

### Página `closing` (Cierre del curso — síntesis final)
1. `closing-hero` — hero de cierre (felicitación / síntesis del recorrido).
2. `summary` — síntesis de lo aprendido: cards o lista de logros/competencias alcanzadas (deriva de RA).
3. `next-steps` — recomendaciones / rutas de profundización / evaluación final (cards o lista).
4. `final-evaluation` — opcional: banner CTA → evaluación sumativa final en Moodle.
5. `footer`.

Componentes **reutilizables** entre páginas: `roadmap`, `footer`, y los banners CTA (`scorm-link`,
`practice-link`, `final-evaluation` comparten estructura de "banner con botón").

---

## Adaptación por metodología

La metodología cambia: la **etiqueta del momento**, el **número de páginas `moment`**, y el **enfoque** de
los textos guía (intro de cada momento, descripción del curso). Estructura interna de cada página NO cambia.

| Código | Nombre | Nº momentos = nº páginas `moment` | Etiqueta de momento sugerida | Nombres de momento |
|---|---|---|---|---|
| **AG**  | Aprendizaje Guiado | 7 | "Contenido" | (libres: temas/etapas del curso) |
| **ABPr**| Aprendizaje Basado en Proyectos | 3 | "Momento" | Diagnóstico Inicial · Análisis y Diseño · Conclusiones |
| **ABI** | Aprendizaje Basado en Investigación | 4 | "Momento" | Problematización · Desarrollo teórico · Metodología e implementación · Resultados y conclusiones |
| **ABR** | Aprendizaje Basado en Retos | 4 | "Momento" | Definición del reto · Ideación · Solución e implementación · Validación y evaluación |
| **ABC** | Aprendizaje Basado en Casos | 4 | "Momento" | Presentación y análisis del caso · Análisis micro caso 1 · Análisis micro caso 2 · Conclusiones |

- AG mantiene "Contenido NN" y 7 páginas momento (coherente con la skill `aprendizaje-guiado-scorm` que
  genera 7 contenidos). Para AG el chip del hero es "7 Contenidos".
- Para ABPr/ABI/ABR/ABC, cada página `moment` corresponde a un momento oficial; el chip del hero refleja
  el nº y el banner de cada momento muestra su nombre oficial.
- El enfoque de los textos (descripción del curso, intro de momentos, CTA de práctica) se redacta según la
  didáctica: proyecto / investigación / reto / caso / ruta guiada. (Igual criterio que las skills SCORM.)
- Reutiliza, cuando exista, el `subject` JSON de la skill SCORM correspondiente para extraer título,
  programa, RA (`syllabus.learningOutcomes`), referencias (`syllabus.bibliography`) y momentos. Pero la
  entrada primaria de la skill `moodle-content` es **syllabus + metodología por escrito**.

---

## Reglas del renderer (template/)

- Salida = HTML con **todos los estilos inline** (`style="..."`). Sin clases CSS propias salvo utilidades
  inocuas que Moodle ya trae (`img-fluid`); sin `<script>`, sin `<style>` en el output pegable.
- El renderer local SÍ usa JS para construir el HTML, pero ese JS NO va al output. El output es HTML puro.
- Debe haber un botón "Copiar HTML" por página y un textarea/preview.
- Cargar JSON por `<input type=file>` o `?json=archivo.json`.
- Escapar texto de usuario; permitir un subconjunto de HTML inline en campos marcados como rich (ej. `<em>`,
  `<strong>`, `<a>`) para las referencias APA.
- Responsivo con `clamp()` y `grid auto-fit` como el ejemplo. Compatible con el ancho de Moodle.
- Validar que no se emita JS/CSS externo en el output (test automatizable).
</content>
