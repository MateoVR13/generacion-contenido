# Fase 6 — Generación de los prompts de contenido

En la Fase 6 se generan, por cada recurso didáctico aprobado, un **prompt listo para ejecutar** que produce
el contenido de ese recurso. Un archivo de prompt por recurso, en `fase-6-prompts/<NN>-<tipo>.md`.

## Catálogo oficial de componentes didácticos (UA) y su prompt

Cada prompt debe instanciar el recurso con los datos VALIDADOS por el docente (tema, propósito, RA, fuentes,
ejemplos por facultad). Tipos del catálogo oficial:

- **Infografía animada** / **Infografía**: íconos+gráficos que transmiten un concepto de forma sencilla.
- **Video** / **Video explicativo** (docente con pizarra/grabación) / **Video interactivo** (con pausas).
- **Imagen interactiva** (puntos sensibles que amplían info).
- **Línea de tiempo** (cronológica, animada).
- **Mapa conceptual** / **Mapa mental**.
- **Podcast** (audio que amplía/profundiza).
- **Cómic / historieta** (narrativa visual).
- **Objeto Virtual de Aprendizaje (OVA)** (recursos dinamizadores combinados, interactivo).
- **Juegos didácticos**: emparejamientos, arrastrar y soltar, completar frases, preguntas y respuestas,
  crucigrama, memoria, escenario de decisiones.

(Las plantillas de formato oficiales están en
`insumos-institucionales/Escenario de aprendizaje/COMPONENTES DIDÁCTICOS/Formatos_*.docx`.)

## Estructura de cada prompt generado

Cada `fase-6-prompts/<NN>-<tipo>.md` debe contener:

```
# Prompt — <Tipo de recurso> · Tema <N>: <título>
## Contexto
- Asignatura, RA, propósito del momento/tema, según la metodología de la asignatura.
- Fuentes base/complementarias autorizadas (APA), ejemplos por 3 facultades si aplica.
## Objetivo pedagógico del recurso
## Instrucción de generación
- Qué producir exactamente (guion / copy / estructura del recurso según su Formato oficial).
- Tono institucional, lenguaje claro al estudiante.
## Requisitos de marca y accesibilidad
- Paleta UA, Montserrat/Inter, texto alternativo, contraste.
## Restricciones
- APA 7; "Elaboración propia" en recursos creados; similitud ≤30%; no inventar fuentes/datos.
## Salida esperada
- Formato concreto (texto/guion/estructura) listo para producción o para el renderer correspondiente.
```

## Reglas

- Genera **solo los recursos aprobados por el docente** y en la cantidad por créditos (2/3/4).
- Si la asignatura es práctica, incluye prompts para los recursos de **simulación** que indicó el docente.
- Cada prompt referencia el Formato oficial del componente cuando exista.
- No generes el contenido del recurso aquí: generas el PROMPT que lo producirá (separación Fase 6 → producción).
