#!/usr/bin/env node
"use strict";
// Valida el estado-proyecto.json contra los lineamientos UA para AG.
// Uso: node validate_phase.js <estado-proyecto.json>
// Exit 0 si cumple las reglas aplicables a la fase actual; 1 si hay errores; 2 si error de uso.

const fs = require("fs");

const file = process.argv[2];
if (!file) { console.error("Uso: node validate_phase.js <estado-proyecto.json>"); process.exit(2); }
if (!fs.existsSync(file)) { console.error(`No existe: ${file}`); process.exit(2); }

let st;
try { st = JSON.parse(fs.readFileSync(file, "utf8")); }
catch (e) { console.error(`JSON inválido: ${e.message}`); process.exit(2); }

const errors = [];
const warnings = [];

// Métricas oficiales por créditos.
const BY_CREDITS = {
  2: { min: 30, max: 35, comp: 2, mat: 3 },
  3: { min: 40, max: 45, comp: 3, mat: 5 },
  4: { min: 50, max: 55, comp: 4, mat: 7 },
};

if (st.metodologia !== "AG") errors.push(`metodologia debe ser "AG", es "${st.metodologia}"`);

const fase = Number(st.fase);
if (Number.isNaN(fase) || fase < 0 || fase > 10) errors.push(`fase fuera de rango (0-10): ${st.fase}`);

// Créditos: obligatorios desde Fase 0.
if (st.creditos == null) {
  errors.push("creditos no definido (brecha crítica: requerido antes de configurar)");
} else if (![1, 2, 3, 4].includes(st.creditos)) {
  warnings.push(`creditos atípico: ${st.creditos} (esperado 2-4; 1 = brecha de lineamiento)`);
} else if (st.creditos === 1) {
  warnings.push("1 crédito: declarar brecha de lineamiento para extensión y validar institucionalmente");
} else {
  const ref = BY_CREDITS[st.creditos];
  if (st.extension) {
    if (st.extension.minPaginas && st.extension.minPaginas !== ref.min)
      warnings.push(`extension.minPaginas=${st.extension.minPaginas}; oficial para ${st.creditos} cr = ${ref.min}`);
    if (st.extension.maxPaginas && st.extension.maxPaginas !== ref.max)
      warnings.push(`extension.maxPaginas=${st.extension.maxPaginas}; oficial = ${ref.max}`);
  } else if (fase >= 2) {
    warnings.push(`extension no fijada; oficial para ${st.creditos} cr = ${ref.min}-${ref.max} págs`);
  }
  if (st.nComponentesDidacticos != null && st.nComponentesDidacticos !== ref.comp)
    errors.push(`nComponentesDidacticos=${st.nComponentesDidacticos}; oficial para ${st.creditos} cr = ${ref.comp}`);
  if (st.nMaterialComplementario != null && st.nMaterialComplementario !== ref.mat)
    errors.push(`nMaterialComplementario=${st.nMaterialComplementario}; oficial para ${st.creditos} cr = ${ref.mat}`);
}

// AG: N temas variable, no fijo. No debe estar "hardcodeado" a 7.
if (fase >= 2) {
  const n = st.nTemasFinal ?? st.nTemasPropuesto;
  if (n == null) {
    errors.push("nTemasPropuesto/nTemasFinal no definido (AG: N debe derivarse del syllabus en F2)");
  } else if (!Number.isInteger(n) || n < 1) {
    errors.push(`nTemas inválido: ${n}`);
  }
  if (Array.isArray(st.temas) && n != null && st.temas.length !== n)
    warnings.push(`temas.length=${st.temas.length} ≠ nTemas=${n}`);
}

// Gate: Pipeline 2 requiere validación docente.
if (st.pipeline === 2 && st.gate !== "validado-docente")
  errors.push(`Pipeline 2 sin gate validado (gate="${st.gate}"): el docente debe validar el instrumento antes de generar contenido`);

// Evaluación diagnóstica: 10 contestadas / banco 15 (desde Fase 3).
if (fase >= 3 && st.evaluacion && st.evaluacion.diagnostica) {
  const d = st.evaluacion.diagnostica;
  if (d.contestadas != null && d.contestadas !== 10)
    errors.push(`diagnostica.contestadas=${d.contestadas}; oficial = 10`);
  if (d.banco != null && d.banco < 15)
    warnings.push(`diagnostica.banco=${d.banco}; oficial ≥ 15`);
}

// RA presentes desde Fase 1.
if (fase >= 1 && (!Array.isArray(st.ra) || st.ra.length === 0))
  errors.push("ra vacío (Fase 1 debe identificar al menos un RA del syllabus)");

// Reporte.
if (warnings.length) {
  console.error(`Advertencias (${warnings.length}):`);
  warnings.forEach((w) => console.error(`  warn  ${w}`));
}
if (errors.length) {
  console.error(`\nValidación FALLÓ (${errors.length} error/es) — fase ${st.fase}, pipeline ${st.pipeline}:`);
  errors.forEach((e) => console.error(`  ERROR ${e}`));
  process.exit(1);
}
console.log(`OK — estado válido para fase ${st.fase} (pipeline ${st.pipeline}). ${warnings.length} advertencia(s).`);
process.exit(0);
