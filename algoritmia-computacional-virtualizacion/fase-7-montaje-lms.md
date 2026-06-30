# Fase 7 — Montaje LMS (moodle-content)

**Asignatura:** Algoritmia Computacional I · Tecnología en Aplicaciones Digitales Inteligentes · Facultad de Ingeniería
**Metodología:** Aprendizaje Guiado (AG) · 3 créditos · 100% virtual · módulo de 4 semanas
**Artefacto generado:** `fase-7-montaje-lms/algoritmia-computacional-AG.moodle.json`
**Estado validador:** `OK` (0 errores, 0 advertencias) — AG con N variable de temas.

## Qué se generó

JSON de envoltura institucional Moodle (root `moodle`) que el renderer `moodle-content/template/`
convierte en HTML 100% inline pegable en cada página del aula. Sigue el contrato
`moodle-content/skill/references/json-contract.md` y la forma de render del ejemplo
`ejemplos/analisis-vectorial-AG.moodle.json`.

### Estructura de páginas (`pageOrder`, 8 páginas)

1. `bienvenida` (welcome)
2–7. `momento-1` … `momento-6` (moment) — **una por tema AG**
8. `cierre` (closing)

Etiqueta de momento: **"Tema"** (`momentLabelSingular: "Tema"`), coherente con `unitLabel: "Tema"`
de los documentos de saberes SCORM. Chip del hero: **"6 Temas"**. El validador trata AG como
N variable (≥1 página `moment`); 6 páginas de momento → OK.

### Página de bienvenida
- `hero` (programa, AG, "6 Temas", "3 créditos · 100% virtual"; video con `todo`).
- `learning-outcomes`: RA1 "Reconozco…" y RA2 "Evalúo…" (literales del syllabus, etiqueta del verbo).
- `activities`: **diagnóstica** (enlazada; banco `evaluacion/diagnostica-algoritmia-computacional.json`,
  10 de 15, revisión automática, sin nota) + **foro de presentación**. URLs y fechas vacías + `todo`.
- `course-glance`: docente (vacío + `todo`, no se inventan datos), syllabus y cronograma (PDF + `todo`).
- `resources`: Joyanes 2013, Cormen 2009 (EN), Downey 2015 (EN, enlace abierto real), Python/PSeInt.
- `footer`.

### Páginas de tema (1 por tema, en orden)
Cada una incluye: `moment-banner` · `moment-intro` (video con `todo`) · `scorm-link` (SCORM del
documento de saberes correspondiente, `contenido-0N`) · **`workshop`** (taller detallado aprobado:
objetivo, contexto, pasos, entregable, forma de entrega, rúbrica por criterios, retroalimentación,
RA, chips de tiempo/modalidad/momento) · **`complementary`** (material aprobado según
`coberturaPorTema`, con `tipo`, `apa`, `justificacion`) · `footer`.

| Tema | Título | RA | Taller (evidencia) | Material (cobertura) |
|---|---|---|---|---|
| 1 | Fundamentos del algoritmo y su representación | RA1 | Diseño/trazado: pseudocódigo + flujograma + prueba de escritorio | M1, M2 |
| 2 | Lenguajes, tipos de datos y librerías | RA1 | Programa Python con tipos de datos + 1 librería | M1, M4 |
| 3 | Estructuras selectivas y de control | RA1 | Problema con selectivas+iterativas y condición de parada | M1, M2, M3 |
| 4 | Arreglos y estructuras de datos | RA1, RA2 | Modelar datos de ingeniería (lista/dicc./matriz) y recorrer | M3, M4 |
| 5 | Funciones, modularidad y memoria | RA2 | Refactorizar en funciones + análisis de memoria | M3, M4 |
| 6 | Proyecto integrador: solución algorítmica | RA1, RA2 | Proyecto final industrial (análisis→diseño→impl.→pruebas→doc.) | M5 |

Los talleres y el material son los **aprobados por el docente** (estado-proyecto.json: talleres
`estado: aprobado`, materiales `estado: aprobado`). No se inventaron fuentes ni datos del syllabus.
`practice-link` se omite (opcional): el `workshop` ya aporta la práctica detallada de cada tema.

### Página de cierre
- `closing-hero` (síntesis del recorrido, 6 temas).
- `summary`: 2 logros mapeados 1:1 con RA1/RA2.
- `next-steps`: proyecto integrador final + rutas de continuidad (POO, estructuras avanzadas, IA).
- `final-evaluation`: CTA al proyecto integrador (evidencia sumativa que integra RA1+RA2).
- `footer`.

## Convención TODO (datos faltantes)
Toda URL/embed desconocida queda como `""` con un campo hermano `"todo"` explícito:
- Videos de presentación y de cada tema (Synthesia/YouTube).
- Paquetes SCORM por tema (subir `contenido-0N` y pegar URL).
- Tareas de Moodle de cada taller y del proyecto integrador.
- Cuestionario diagnóstico y foro (URL + fechas de apertura/cierre).
- Syllabus PDF, cronograma PDF, recursos de apoyo, datos del docente.

El único enlace real incluido es el recurso abierto de Downey (Think Python 2e),
ya presente y verificado en `estado-proyecto.json` (`href` de M4).

## Branding
Lima `#c0f500` como acento (lo aplica el renderer); logo default UA; institución/facultad/año
en `branding`. No se emite `<script>`, `<style>`, `<link>` ni manejadores `on*=` (verificado por
el validador, que escanea contenido activo prohibido).

## Validación

```
$ node moodle-content/skill/scripts/validate_moodle_json.js \
    algoritmia-computacional-virtualizacion/fase-7-montaje-lms/algoritmia-computacional-AG.moodle.json
OK    algoritmia-computacional-AG.moodle.json

Validation passed for 1 file(s).
```

## Pendientes para el autor en Moodle
1. Subir los 6 paquetes SCORM (documento de saberes `contenido-01..06`) y pegar sus URLs.
2. Crear las 6 tareas de taller + el proyecto integrador y enlazarlas.
3. Crear el cuestionario diagnóstico y el foro de presentación; definir fechas.
4. Grabar/pegar los videos (presentación + uno por tema).
5. Cargar syllabus y cronograma en PDF; completar datos del docente.
6. Abrir el JSON en el renderer `moodle-content/template/`, copiar el HTML de cada página y pegarlo
   en la página correspondiente del aula.
