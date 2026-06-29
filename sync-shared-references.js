#!/usr/bin/env node
"use strict";
/*
 * sync-shared-references.js
 * -------------------------
 * Las 5 skills de virtualización (aprendizaje-*-scorm) comparten un conjunto de
 * archivos GENÉRICOS idénticos (lineamientos, proceso de fases, pipeline DS, scripts
 * de extracción/instrumento, validación LaTeX, evaluación cualitativa). Para no editar
 * lo mismo 5 veces, se mantiene UNA fuente canónica (aprendizaje-guiado-scorm) y este
 * script propaga esos archivos a las otras 4 skills.
 *
 * Uso:
 *   node sync-shared-references.js          # copia desde la canónica a las demás
 *   node sync-shared-references.js --check  # solo verifica que estén sincronizadas (exit 1 si no)
 *
 * NO sincroniza los archivos ESPECÍFICOS por metodología (json-contract.md,
 * component-selection.md, instructional-content-requirements.md,
 * content-uniqueness-validation.md, identidad_marca.md, lineamientos_virtualidad.md,
 * estrategias_didacticas_comunicativas.md, syllabus_ejemplo_estructura.md,
 * SKILL.md, los pipeline-*-fases-*.md, instrumento-docente.md, metodologia-*.md,
 * templates/*, validate_phase.js, validate_content_package.js): esos varían por
 * metodología y se editan en cada skill.
 */

const fs = require("fs");
const path = require("path");

const CANONICAL = "aprendizaje-guiado-scorm";
const TARGETS = [
  "aprendizaje-basado-casos-scorm",
  "aprendizaje-basado-investigacion-scorm",
  "aprendizaje-basado-proyectos-scorm",
  "aprendizaje-basado-retos-scorm",
];

// Archivos GENÉRICOS idénticos en las 5 skills (relativos a la raíz de cada skill).
const SHARED = [
  "references/lineamientos-ua.md",
  "references/proceso-fases-ua.md",
  "references/pipeline-documento-saberes.md",
  "references/fase-6-prompts.md",
  "references/math-latex-validation.md",
  "references/evaluacion_cualitativa_pregrado.md",
  "scripts/extract_syllabus.mjs",
  "scripts/build_instrumento_docx.py",
];

const root = __dirname;
const check = process.argv.includes("--check");
let drift = 0;
let copied = 0;

for (const rel of SHARED) {
  const src = path.join(root, CANONICAL, rel);
  if (!fs.existsSync(src)) {
    console.error(`FALTA en la canónica: ${CANONICAL}/${rel}`);
    drift++;
    continue;
  }
  const srcBuf = fs.readFileSync(src);
  for (const t of TARGETS) {
    const dst = path.join(root, t, rel);
    const same = fs.existsSync(dst) && fs.readFileSync(dst).equals(srcBuf);
    if (same) continue;
    if (check) {
      console.error(`DESINCRONIZADO: ${t}/${rel}`);
      drift++;
    } else {
      fs.mkdirSync(path.dirname(dst), { recursive: true });
      fs.writeFileSync(dst, srcBuf);
      console.log(`copiado → ${t}/${rel}`);
      copied++;
    }
  }
}

if (check) {
  if (drift) {
    console.error(`\n${drift} archivo(s) desincronizado(s). Ejecuta: node sync-shared-references.js`);
    process.exit(1);
  }
  console.log(`OK — los ${SHARED.length} archivos compartidos están sincronizados en las 5 skills.`);
  process.exit(0);
}

console.log(`\nListo. ${copied} copia(s) actualizada(s). Fuente canónica: ${CANONICAL}.`);
process.exit(0);
