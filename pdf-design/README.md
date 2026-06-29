# Diseño editorial del PDF (libro-guía) — imágenes base por facultad

Esta carpeta contiene los **prompts** para generar las imágenes base que usa la guía
PDF (vista imprimible tamaño **carta**) de la plantilla SCORM/PDF. El PDF se rediseñó
como un **libro-guía editorial**: portada a sangre, página de propósito, tabla de
contenido editorial y una **página separadora por tema**, con un tema visual distinto
para cada una de las **tres facultades** de la Universidad de América.

## Las tres facultades (clave de tema)

| Clave (`faculty`) | Facultad / área | Carpeta de imágenes |
|---|---|---|
| `ingenieria`   | Ingeniería, ciencia y tecnología | `assets/pdf/ingenieria/` |
| `economicas`   | Ciencias económicas, administrativas y empresariales | `assets/pdf/economicas/` |
| `arquitectura` | Arquitectura, diseño, creatividad, territorio y sostenibilidad | `assets/pdf/arquitectura/` |

La facultad se determina automáticamente en `assets/editor.js` (`pdfFaculty`): se lee
`subject.faculty` / `pdf.faculty` / `subject.syllabus.extractedFields.faculty` si está
explícita, o se **infiere del nombre del programa** (`subject.program`). Si no se puede
determinar, se usa el tema `default` (verde institucional) sin imagen.

## Qué imágenes generar (3 por facultad = 9 + opcionales)

Por cada facultad se necesitan **tres** imágenes:

| Archivo | Uso en el PDF | Tamaño (px, 300 dpi) | Proporción |
|---|---|---|---|
| `portada.jpg`   | Fondo a sangre de la **portada** (página 1) | 2550 × 3300 | Carta vertical (8.5×11") |
| `separador.jpg` | Fondo a sangre de la **página separadora** de cada tema | 2550 × 3300 | Carta vertical |
| `encabezado.jpg`| (Reservado) banda de encabezado opcional | 2550 × 600 | Banda horizontal |

> El CSS ya referencia estas rutas. Solo debes **generar las imágenes y colocarlas** en
> `assets/pdf/<facultad>/` con esos nombres exactos. Mientras no existan, el PDF usa el
> color sólido de la facultad como fondo (degrada con elegancia, no se rompe).

### Reglas para que el texto encima sea legible

- La portada y el separador llevan un **velo oscuro** por CSS (degradado negro
  translúcido) para que el título blanco contraste. Por eso las imágenes deben tener
  **zonas medias/oscuras** o permitir oscurecer; evita imágenes muy claras y saturadas
  en el centro-inferior (ahí va el título).
- Composición **vertical**, con el “peso” visual hacia arriba y los **dos tercios
  inferiores más despejados** (ahí va el bloque de título y el número de tema grande).
- **Sin texto** dentro de la imagen (los textos los pone el PDF). Sin logos (el PDF
  añade el logo de la U de América en blanco).
- Estética **editorial, sobria, institucional**; nada de stock genérico ni collage.

## Paleta de marca (Universidad de América)

- Verde institucional profundo: `#172006`
- Lima de marca (acento): `#c0f500`
- Dorado: `#f0b300`

Cada facultad ajusta el acento (definido en el CSS, no en la imagen) — pero las
imágenes deben **armonizar** con ese acento:

| Facultad | Tinta base sugerida | Acento del tema |
|---|---|---|
| Ingeniería   | azul-petróleo / acero `#0f2a3f` | cian `#2bb7d4` |
| Económicas   | verde profundo `#123a2a` | verde esmeralda `#33c08a` |
| Arquitectura | terracota/tierra `#3a2418` | ámbar `#e08a3c` |

## Cómo generar

1. Abre el prompt correspondiente en `prompts/` (uno por imagen).
2. Genera la imagen en un modelo de imagen (Midjourney, DAL·E, Firefly, etc.) en
   proporción carta vertical (2550×3300) o recórtala a esa proporción.
3. Expórtala como `.jpg` de buena calidad y nómbrala **exactamente** como la tabla.
4. Colócala en `assets/pdf/<facultad>/`.
5. Abre la vista PDF de una asignatura de esa facultad y verifica contraste del título.

El detalle de archivos esperados está en [`manifest.json`](manifest.json).
