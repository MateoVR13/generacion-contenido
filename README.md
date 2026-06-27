# Plantilla JSON SCORM/PDF

Plantilla reutilizable para contenido SCORM y guía PDF. El HTML conserva
la estructura visual y la interacción; el contenido real se carga desde un JSON de asignatura.

Los JSON generados para asignaturas virtuales se producen como paquete de siete archivos en la raíz. Usa el nombre de la asignatura en formato slug y el número de contenido, por ejemplo `algoritmia-computacional-contenido-01.json` hasta `algoritmia-computacional-contenido-07.json`. No uses `content.json` como salida de generación en la raíz del proyecto.

No requiere compilación. Para que el navegador pueda leer el JSON por `fetch`,
sirve la carpeta con un servidor local o desde el LMS:

```bash
python -m http.server 8000
```

Luego abre:

```text
http://localhost:8000/
```

Para cargar un JSON:

```text
http://localhost:8000/?content=mi-asignatura.json
```

También puedes usar los controles superiores del aplicativo:

- `JSON`: cargar un archivo `.json`.
- `Editar`: abrir el editor manual para modificar asignatura, textos, iconos, componentes y orden.
- `PDF`: abrir una vista imprimible con portada, tabla de contenido, logos, LaTeX y gráficos Chart.js, usando solo `pdf.sections`.
- `SCORM`: exportar un paquete `.zip` con `imsmanifest.xml`.

## Flujo de Producción

1. Usar la skill `$aprendizaje-guiado-scorm` para generar los siete archivos `<slug-asignatura>-contenido-01.json` a `<slug-asignatura>-contenido-07.json` en la raíz del proyecto.
2. Indicar en el prompt la extensión mínima esperada para cada PDF, por ejemplo: `mínimo 12 páginas por PDF`.
3. Cargar manualmente cada JSON en la plantilla con el botón `JSON` o con `?content=<slug-asignatura>-contenido-01.json`.
4. Revisar y editar manualmente textos, iconos, componentes y orden del SCORM; ajustar la guía PDF desde el JSON completo.
5. Validar el JSON desde el editor.
6. Exportar SCORM y abrir la vista PDF para imprimir/guardar como PDF.

## Contrato JSON

El JSON separa la experiencia interactiva del SCORM y la guía imprimible del PDF:

- Cada asignatura virtual tiene siete JSON de contenido.
- Cada JSON contiene seis secciones internas por rama: introducción, sección 1, sección 2, sección 3, sección 4 y sección 5.
- `scorm.sections["seccion-1"]` crea `<section id="seccion-1">` en la plantilla.
- `scorm.sectionOrder` define el orden de paneles SCORM.
- `pdf.sections["pdf-teoria"]` crea una sección en la guía imprimible.
- `pdf.sectionOrder` define el orden editorial del PDF.
- Cada `componentOrder` define el orden de componentes dentro de su sección.

El PDF no debe usar actividades interactivas (`video`, `podcast`, `listening`, `quiz`, `matching`, `multi-select`, `fill-blank`). Para PDF usa teoría, ejemplos, tablas, fórmulas, gráficos Chart.js, código estático si aplica, referencias y ejercicios imprimibles al final.

Fragmento simplificado con placeholders. En producción cada JSON debe completar `intro` y `seccion-1` a `seccion-5` en SCORM, más `pdf-intro` y `pdf-seccion-1` a `pdf-seccion-5` en PDF:

```json
{
  "subject": {
    "title": "[Nombre de la asignatura]",
    "program": "[Programa académico]",
    "contentNumber": "[N]"
  },
  "pdf": {
    "guideLabel": "GUÍA DE ESTUDIO VIRTUAL",
    "institution": "Universidad de América",
    "year": "[Año]",
    "title": "[Título del PDF]",
    "subtitle": "[Subtítulo]",
    "purpose": "[Propósito formativo]",
    "structure": "[Estructura]",
    "sectionOrder": ["pdf-teoria", "pdf-ejercicios"],
    "sections": {
      "pdf-teoria": {
        "title": "[Desarrollo teórico]",
        "intro": ["[Introducción.]"],
        "componentOrder": ["pdf-texto"],
        "components": {
          "pdf-texto": {
            "type": "text",
            "title": "[Concepto]",
            "body": ["[Texto teórico.]"]
          }
        }
      },
      "pdf-ejercicios": {
        "title": "[Ejercicios]",
        "intro": ["[Indicaciones.]"],
        "componentOrder": ["pdf-banco"],
        "components": {
          "pdf-banco": {
            "type": "exercise-set",
            "title": "[Banco de ejercicios]",
            "items": [{"prompt": "[Ejercicio 1.]"}]
          }
        }
      }
    }
  },
  "scorm": {
    "sectionOrder": ["seccion-1"],
    "sections": {
      "seccion-1": {
        "kind": "theory",
        "theme": "1",
        "badge": "Sección 1",
        "navLabel": "[Nombre del tema]",
        "title": "[Título del tema]",
        "intro": ["[Texto introductorio.]"],
        "componentOrder": ["seccion-1-codigo"],
        "components": {
          "seccion-1-codigo": {
            "type": "code",
            "title": "[Fragmento de código]",
            "language": "javascript",
            "languageLabel": "[Lenguaje]",
            "fileName": "[archivo.ext]",
            "code": "// [Código de ejemplo]"
          }
        }
      }
    }
  }
}
```

## Componentes Disponibles

La plantilla incluye displays para:

SCORM/interactivos:

- `objectives`: objetivos de aprendizaje.
- `prior-knowledge`: activación de saberes previos.
- `accordion`: conceptos desplegables.
- `flashcards`: tarjetas con volteo.
- `carousel`: carrusel con texto, imagen o fórmula.
- `formula`: LaTeX con explicación de variables.
- `table`: tabla comparativa.
- `stepper`: resolución paso a paso.
- `chart`: gráficos Chart.js (`line`, `bar`, `doughnut`).
- `code`: fragmento con lenguaje visible, resaltado de sintaxis y botón copiar.
- `video`: iframe responsivo.
- `metrics`: indicadores/KPIs.
- `podcast`: reproductor de audio.
- `timeline`: línea de tiempo.
- `tabs`: pestañas.
- `quiz`: chequeo formativo con retroalimentación.
- `listening-true-false`: audio tipo listening con respuestas V/F.
- `matching`: relacionar palabra con significado.
- `multi-select`: selección múltiple con varias respuestas correctas.
- `fill-blank`: completar espacios en una frase o párrafo.
- `reflection`: preguntas metacognitivas.
- `summary`: síntesis o ideas para llevar.
- `callout`: nota destacada.
- `references`: referencias bibliográficas.
- `downloads`: material descargable.

PDF/imprimibles:

- `text` / `theory`: bloques teóricos.
- `list`: listas ordenadas o no ordenadas.
- `example`: ejemplos comentados.
- `exercise-set`: banco de ejercicios imprimibles.
- `formula`, `table`, `chart`, `code`, `callout`, `references`: versiones estáticas/editoriales para la guía.

## Archivos

```text
plantilla-scorm-pdf/
├── index.html
├── mi-asignatura.json
├── assets/
│   ├── theme.js
│   ├── styles.css
│   ├── sidebar.js
│   └── content-renderer.js
└── README.md
```

## Notas Técnicas

- KaTeX renderiza fórmulas en `formula`, `stepper` y slides con `formula`.
- Chart.js renderiza los componentes `chart`.
- Highlight.js aplica el resaltado de sintaxis en `code`.
- `window.loadSubjectContent(json)` permite cargar contenido desde otro script.
- Todo contenido matemático debe ir en LaTeX.
- Todo gráfico debe ser un componente `chart` con datos compatibles con Chart.js.
- La skill del proyecto está en `aprendizaje-guiado-scorm/`.
