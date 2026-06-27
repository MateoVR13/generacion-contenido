# Identidad De Marca Para SCORM Y PDF

Referencia interna de marca para generar JSON compatible con la plantilla SCORM y PDF.

## Institucion

- Nombre institucional: Universidad de America.
- En PDF y SCORM usar la institucion como marca academica, no como tema del contenido.
- Mantener un tono institucional: academico, claro, cercano, formativo y orientador.

## Logos Incluidos En La Skill

La skill incluye copias de los logos en:

- `assets/logo-blanco.png`
- `assets/logo-negro.png`

Uso recomendado:

- SCORM/sidebar sobre fondo oscuro: `logo-blanco.png`.
- PDF/portada o fondos claros: `logo-negro.png`.
- No deformar, recortar ni aplicar efectos al logo.
- No usar el logo como decoracion repetitiva; usarlo en portada, tabla de contenido, footer/sidebar o cierre institucional.

## Paleta Base De La Plantilla

Colores principales tomados del sistema visual actual:

| Token | Color | Uso |
|---|---:|---|
| Primary | `#060b00` | Texto principal, fondos oscuros, acentos sobrios. |
| Primary container | `#1a2403` | Header, sidebar, bloques institucionales. |
| Secondary fixed | `#c0f500` | Acento verde, badges, lineas de progreso, botones activos. |
| Tertiary accent | `#f0b300` / `#ffe086` | Acentos secundarios y apoyo visual. |
| Surface | `#fbf8fb` | Fondo general claro. |
| Surface low | `#f5f3f5` | Tarjetas suaves y bloques de lectura. |
| Outline variant | `#c6c8ba` | Bordes, separadores y tablas. |

Reglas:

- Usar el verde `#c0f500` como acento, no como fondo dominante de textos largos.
- Mantener fondos claros para lectura extensa.
- Reservar fondos oscuros para encabezados, sidebar, portada, metricas o bloques institucionales.
- Evitar que el diseño se vuelva monocromatico; combinar fondo claro, texto oscuro y acentos verdes/amarillos con moderacion.

## Tipografia

La plantilla usa:

- Montserrat: titulos, etiquetas, botones, caps y jerarquia editorial.
- Inter: cuerpo de texto, instrucciones, parrafos y lectura extendida.
- JetBrains Mono: codigo, formulas textuales y fragmentos tecnicos.

Reglas:

- Titulos cortos, claros y escaneables.
- Texto teorico en parrafos breves, con progresion conceptual.
- No escribir bloques extensos dentro de botones, badges o etiquetas.

## Criterios Editoriales Para PDF

- Tamaño carta.
- Portada institucional limpia, sin saturar con elementos visuales.
- Graficos centrados con nota descriptiva debajo.
- Toda expresion matematica en LaTeX.
- Todo grafico cuantitativo en Chart.js.
- PDF sin interacciones: teoria, ejemplos, ejercicios, rubricas, referencias, glosario y anexos.

## Criterios Editoriales Para SCORM

- Sidebar con logo en footer o area institucional, no dentro del titulo de la asignatura.
- Header con acciones de autoria claras y espaciadas.
- Componentes navegables, editables y reutilizables desde JSON.
- Videos, podcasts, lecturas y enlaces deben tener proposito, instrucciones, dedicacion sugerida y relacion con evidencia o reflexion.

## Uso En La Generacion JSON

Al generar `<slug-asignatura>-contenido-01.json` a `<slug-asignatura>-contenido-07.json`:

- Llenar `pdf.institution` con `Universidad de America` cuando el usuario no indique otra institucion.
- Mantener `pdf.guideLabel`, `pdf.kicker`, `pdf.purpose` y `pdf.structure` con tono institucional.
- No incluir descripciones de marca como contenido tematico de la asignatura.
- No insertar rutas de logo dentro del JSON salvo que un componente de recurso o portada lo requiera explicitamente.
- No escribir ni reemplazar `content.json` con contenido de una asignatura generada.
- No cargar automaticamente el JSON en la plantilla; el autor decide cuando revisarlo.
