#!/usr/bin/env node
"use strict";
// Valida el estado-proyecto.json contra los lineamientos UA para ABR.
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

// ABR: 4 momentos fijos (un archivo por momento).
const N_MOMENTOS = 4;
const MOMENTOS_ABR = ["Definición del reto", "Ideación", "Solución e implementación", "Validación y evaluación"];

// Métricas oficiales por créditos.
const BY_CREDITS = {
  2: { min: 30, max: 35, comp: 2, mat: 3 },
  3: { min: 40, max: 45, comp: 3, mat: 5 },
  4: { min: 50, max: 55, comp: 4, mat: 7 },
};

if (st.metodologia !== "ABR") errors.push(`metodologia debe ser "ABR", es "${st.metodologia}"`);

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

// ABR: 4 momentos FIJOS, no un N variable. Desde Fase 2 deben existir los 4 momentos.
if (fase >= 2) {
  if (!Array.isArray(st.momentos)) {
    errors.push("momentos no definido (ABR: deben planearse los 4 momentos fijos en F2)");
  } else if (st.momentos.length !== N_MOMENTOS) {
    errors.push(`momentos.length=${st.momentos.length}; ABR exige exactamente ${N_MOMENTOS} momentos fijos (${MOMENTOS_ABR.join(", ")})`);
  }
  // Escenario inicial ABR: situación-contexto + reto + preguntas direccionadoras (desde Fase 2).
  if (!st.escenarioInicial || !st.escenarioInicial.reto)
    warnings.push("escenarioInicial.reto no definido (ABR: el escenario inicial debe plantear situación-contexto + reto + preguntas direccionadoras en F2)");
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

// Condición de cierre del Pipeline 2 (modelo de 2 pasos): deben existir los DOS JSON finales.
// Documento de Saberes (4 archivos, uno por momento) + JSON de Moodle. Verifica en disco junto al estado.
if (st.pipeline2Completo === true) {
  const dir = require("path").dirname(require("path").resolve(file));
  // (a) Documento de Saberes: 4 archivos <slug>-contenido-NN.json en documento-saberes/
  let dsCount = 0;
  const dsDir = require("path").join(dir, "documento-saberes");
  if (fs.existsSync(dsDir)) {
    dsCount = fs.readdirSync(dsDir).filter((f) => /-contenido-\d\d\.json$/i.test(f)).length;
  }
  if (dsCount === 0)
    errors.push("Pipeline 2 marcado completo pero NO hay JSON del Documento de Saberes (documento-saberes/<slug>-contenido-NN.json). El Paso 2 debe generarlos, no dejar solo el esquema.");
  else if (dsCount !== N_MOMENTOS)
    errors.push(`Documento de Saberes: ${dsCount} JSON encontrados, se esperaban ${N_MOMENTOS} (uno por momento ABR).`);
  // (b) JSON de Moodle en fase-7-montaje-lms/
  const lmsDir = require("path").join(dir, "fase-7-montaje-lms");
  const hasMoodle = fs.existsSync(lmsDir) && fs.readdirSync(lmsDir).some((f) => /\.moodle\.json$/i.test(f));
  if (!hasMoodle)
    errors.push("Pipeline 2 marcado completo pero NO hay JSON de Moodle (fase-7-montaje-lms/<slug>-ABR.moodle.json).");
  // (c) Material complementario: debe haber pasado por revisión docente (no quedar "propuesto").
  const mat = Array.isArray(st.materialComplementario) ? st.materialComplementario : [];
  if (mat.length === 0)
    warnings.push("Pipeline 2 completo sin materialComplementario en el estado (debió proponerse en Fase 2 y aprobarse en el instrumento).");
  const sinRevisar = mat.filter((m) => !m.estado || m.estado === "propuesto");
  if (sinRevisar.length)
    errors.push(`Material complementario sin revisión docente (estado "propuesto"): ${sinRevisar.map((m) => m.id || "?").join(", ")}. El profesor debe aprobarlo/ajustarlo/quitarlo en el instrumento antes de incluirlo en los momentos.`);
}

// Pipeline 1: al cerrar (gate pendiente), el material complementario debe estar PROPUESTO en el estado
// (la propuesta es parte del instrumento que el docente revisa).
if (st.pipeline === 1 && fase >= 2) {
  const mat = Array.isArray(st.materialComplementario) ? st.materialComplementario : [];
  if (mat.length === 0)
    warnings.push("Fase 2+: aún no hay material complementario propuesto en el estado; debe proponerse para que el docente lo revise en el instrumento.");
}

// Bibliografía en inglés ≥ 30% (internacionalización syllabus UA). Aplica desde Fase 2.
if (fase >= 2) {
  const mat = (Array.isArray(st.materialComplementario) ? st.materialComplementario : [])
    .filter((m) => !m.estado || m.estado !== "rechazado"); // los que entran al curso
  if (mat.length) {
    const conIdioma = mat.filter((m) => m.idioma);
    if (conIdioma.length < mat.length)
      warnings.push(`Material sin campo 'idioma': ${mat.filter((m) => !m.idioma).map((m) => m.id || "?").join(", ")} (necesario para verificar el 30% en inglés).`);
    const en = mat.filter((m) => m.idioma === "en").length;
    const pct = Math.round((en / mat.length) * 100);
    if (en < Math.ceil(mat.length * 0.3))
      errors.push(`Bibliografía en inglés ${pct}% (${en}/${mat.length}); el syllabus UA exige ≥30%. Agrega/sustituye fuentes en inglés (mínimo ${Math.ceil(mat.length * 0.3)} de ${mat.length}).`);
  }
}

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
