# Plan — Skills de virtualización por metodología (UA)

Automatizar el proceso de virtualización de `prueba_fases/` (11 fases + Documento de Saberes) de forma
**token-eficiente**, garantizando cumplimiento de los lineamientos UA. Validado contra `prueba_fases/`,
los DOCUMENTOS DE SABERES oficiales y la auditoría previa.

## Arquitectura: 2 pipelines con validación docente en medio

```
SYLLABUS (Excel FO_03 / PDF / texto)
      │
      ▼
┌── PIPELINE 1 · Fases 0-4 (Análisis y planeación) ─────────────┐
│  F0 Alistamiento · F1 Análisis syllabus · F2 Planeación       │
│  didáctica · F3 Diseño evaluación · F4 Validación académica   │
│  SALIDA: INSTRUMENTO DE VALIDACIÓN DOCENTE (.md + .docx + JSON)│
└───────────────────────────────────────────────────────────────┘
      │
      ▼  [ El docente responde: valida contenido/actividades/recursos,
         indica si es práctica → recursos de simulación, actividades
         del estudiante, sugerencias y feedback ]
      ▼
┌── PIPELINE 2 · Fases 5-10 (Generación de contenido) ──────────┐
│  F5 Documento de Saberes (→ reutiliza skill SCORM)            │
│  F6 Recursos e-learning + GENERA LOS PROMPTS de contenido     │
│  F7 Montaje LMS (→ conecta con moodle-content)                │
│  F8 QA · F9 Implementación · F10 Seguimiento                  │
│  SALIDA: Documento de Saberes + recursos + prompts + plan LMS │
└───────────────────────────────────────────────────────────────┘
```

## Estructura: 5 skills nuevas (una por metodología)

`virtualizacion-aprendizaje-guiado`, `virtualizacion-abpr`, `virtualizacion-abi`,
`virtualizacion-abr`, `virtualizacion-abc`.

Cada skill contiene las 11 fases + 2 pipelines, **alineadas a SU metodología** (momentos, componentes,
páginas por crédito, recursos, instrumento docente y prompts de Fase 6 específicos).

```
virtualizacion-<metodologia>/
├── SKILL.md                      # orquesta: cuándo usar, los 2 pipelines, gates, reglas
├── references/
│   ├── pipeline-1-fases-0-4.md   # contrato de cada fase 0-4 + entregables + token budget
│   ├── pipeline-2-fases-5-10.md  # contrato de cada fase 5-10
│   ├── instrumento-docente.md    # plantilla del instrumento (específico de la metodología)
│   ├── fase-6-prompts.md         # cómo generar los prompts de contenido (específico)
│   ├── metodologia.md            # momentos, componentes, páginas/crédito, evaluación de ESTA metodología
│   ├── lineamientos-ua.md        # PL-VIR-001, métricas por crédito, evaluación cualitativa, similitud 30%
│   └── (referencias compartidas copiadas: marca, evaluación, componentes)
├── scripts/
│   ├── extract_syllabus.mjs      # extrae syllabus de Excel FO_03 / texto a JSON (flexible)
│   ├── project_state.js          # lee/actualiza el estado acumulado del proyecto
│   └── validate_phase.js         # valida cumplimiento de lineamientos por fase
├── templates/
│   ├── instrumento-docente.md    # plantilla rellenable .md
│   └── estado-proyecto.schema.json
└── agents/openai.yaml
```

## Token-eficiencia (estrategia "ambas combinadas")

1. **Estado acumulado** (`estado-proyecto.json`): un archivo compacto que cada fase lee/actualiza solo con
   las DECISIONES clave (créditos, metodología, RA, momentos, evaluación, brechas). Barato de cargar.
2. **Artefacto por fase** en disco (`fase-N-<nombre>.md`): la salida detallada se escribe a archivo y NO se
   recarga en contexto salvo que una fase posterior lo necesite explícitamente.
3. Entre fases solo viaja el **resumen estructurado** (del estado), no el texto completo. Reduce
   drásticamente el contexto reusado respecto al proceso conversacional original.
4. La Fase 5 (Documento de Saberes) **invoca la skill SCORM** de la metodología → no se duplica la lógica
   de contenido. La Fase 7 **conecta con moodle-content**.

## Pipeline 1 → Instrumento de validación docente (salida clave)

Documento editable (.md + .docx + JSON espejo) que el docente responde. Contenido específico por
metodología, p. ej.:
- Validación de RA, saberes y su traducción a momentos/temas.
- Propuesta de actividades del estudiante por momento (¿correctas? ¿faltan?).
- Recursos didácticos y material complementario propuestos (cantidad por créditos).
- **Si la asignatura es práctica**: qué recursos de simulación/laboratorio consultar.
- Plan de evaluación (diagnóstica/formativa/sumativa, Gate, rúbricas).
- Espacios para sugerencias y feedback libre del docente.
- (ABR) reto + 3 preguntas direccionadoras · (ABC) caso + 2 micro-casos · (ABI) líneas de investigación ·
  (ABPr) problema + pregunta direccionadora · (AG) temas/etapas + propósitos + preguntas orientadoras.

El documento validado por el docente = **entrada del Pipeline 2**.

## Alineación con la auditoría (se corrige al construir, integrado)

Las skills nuevas nacen ya alineadas a los lineamientos oficiales (no arrastran los hallazgos de la
auditoría): N temas variables en AG; nombres de momento literales correctos; extensión por créditos
(30-35/40-45/50-55 pág); diagnóstica 10/banco 15; material 3/5/7; componentes 2/3/4; similitud ≤30%;
"Elaboración propia"; preguntas guía por momento. Las skills SCORM existentes que invoca la Fase 5 se
corregirán en una pasada previa mínima (solo los literales P0) o se documenta el override desde la
orquestadora — a definir al implementar.

## Cómo se construye

1. Consolidar la fuente oficial de fases (resúmenes compactos de cada fase 0-10 + Fase 5 DS) en un doc maestro.
2. Construir la **skill plantilla** para UNA metodología (ej. ABR, la mejor alineada) completa y verificada.
3. Replicar a las otras 4 adaptando `metodologia.md`, instrumento y prompts de Fase 6 (vía workflow paralelo).
4. Verificación adversarial: cada skill cubre las 11 fases, produce el instrumento docente, respeta token-
   budget (artefacto+estado), y cumple lineamientos por metodología. Scripts pasan `node --check`.

## Entregable
5 skills `virtualizacion-*` funcionales + un ejemplo de ejecución del Pipeline 1 (instrumento docente) para
una asignatura de muestra, demostrando la cadena.

## No incluido (confirmar)
- No se ejecuta una virtualización real completa de una asignatura (solo se construyen las skills + demo del
  instrumento). La generación masiva de contenido se hará cuando uses las skills.
- No se aplica aún el plan completo de auditoría a las skills SCORM (solo lo mínimo para que Fase 5 funcione).
