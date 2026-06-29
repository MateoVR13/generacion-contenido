# Metodología — Aprendizaje Guiado (AG)

Fuente: AN-VIR-001 Anexo 04, `Escenario de aprendizaje/AG DOCUMENTO DE SABERES`, prompt maestro DS.

## Principio

AG es una ruta guiada por **etapas progresivas** que llevan al estudiante "desde conceptos básicos hasta la
aplicación compleja e integradora", con acompañamiento docente, práctica y retroalimentación. No se organiza
por momentos fijos como ABPr/ABI/ABR/ABC.

## Estructura del documento de saberes (CRÍTICO)

- Se divide en el **número de temas que el docente considere necesarios** para garantizar el cumplimiento del
  resultado de aprendizaje. **N es VARIABLE**, no fijo (ni 7 ni ningún número predeterminado).
- Cada **tema = una etapa progresiva**. La extensión total (por créditos) se reparte entre los N temas.
- Cada tema contiene "elementos teóricos y prácticos que se articulen con los resultados de aprendizaje y el
  propósito de la temática".
- Se deriva N del syllabus (nº de RA, saberes, unidades temáticas) y **se valida con el docente** en el
  instrumento del Pipeline 1. El docente puede ajustar N, fusionar o dividir temas.

## Tabla de diseño global AG (obligatoria)

| Tema | Resultado(s) de aprendizaje | Propósito por etapa | Preguntas orientadoras |
|---|---|---|---|
| 1 | … | … | … |
| 2 | … | … | … |
| n | … | … | … |

- **Propósito por etapa**: qué logra el estudiante al completar el tema.
- **Preguntas orientadoras**: inducen la comprensión global de cada tema; al menos una por RA.

## Escenario inicial AG

A diferencia de las metodologías por momentos (que plantean problema/reto/caso), el escenario inicial de AG
es un documento que **relaciona los RA con un propósito específico y preguntas orientadoras** que inducen al
estudiante a la comprensión global de cada etapa o tema (propósito + ≥1 pregunta orientadora por RA).

## Componentes y material por créditos

Igual que el resto: componentes didácticos 2/3/4 y material complementario 3/5/7 según 2/3/4 créditos
(ver `lineamientos-ua.md`). Los componentes se eligen según el saber y la etapa (no por cuota).

## Relación con la skill de contenido

La **Fase 5** delega la generación del Documento de Saberes a la skill `aprendizaje-guiado-scorm`, pasándole:
N temas validados, propósito y preguntas orientadoras por tema, extensión por créditos, y las decisiones del
docente. Esa skill produce el JSON que alimenta la plantilla SCORM/PDF.

> Nota de alineación: la skill `aprendizaje-guiado-scorm` actual asume 7 contenidos fijos (hallazgo de la
> auditoría). Esta skill de virtualización es la fuente de verdad de N: pasa el N validado explícitamente y
> NO acepta el 7 por defecto. Si la skill SCORM se corrige (plan P0), ambas quedarán consistentes.
