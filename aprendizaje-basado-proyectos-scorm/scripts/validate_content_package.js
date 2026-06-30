#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
const files = args.length
  ? args
  : fs.readdirSync(process.cwd()).filter((file) => /-contenido-\d\d\.json$/i.test(file)).sort();

if (!files.length) {
  console.error("No JSON content files were provided or found.");
  process.exit(2);
}

const MIN_EXACT_CHARS = 70;
const NGRAM_SIZE = 12;
const MAX_NGRAM_LOCATIONS = 1;

const ignoredPathParts = [
  ".subject.",
  ".labels.",
  ".methodology.",
  ".syllabus.",
  ".references",
  "-referencias",
  ".referencias",
  ".rubric.",
  ".levels",
  ".bibliography",
  ".source.",
  ".extractedFields.",
  ".missingFields",
  ".guideLabel",
  ".institution",
  ".year",
  ".contentNumber",
  ".contentTotal",
  "-ruta-abpr",
  "-trabajo",
  ".latex",
  ".formula",
  ".studentAction",
  ".feedbackRoute",
  ".evidence",
  ".methodologyMoment",
  ".instructions",
  "-ruta-abpr",
  "-trabajo",
  "intro-tema",
  "intro-presentacion",
  "intro-estructura",
  "intro-uso",
  "pdf-intro.components.pdf-callout",
  "sections.intro.intro",
  "sections.pdf-intro.intro"
];

const ignoredShortValues = new Set([
  "Diagnóstico Inicial",
  "Análisis y Diseño",
  "Conclusiones",
  "Universidad de América",
  "GUÍA DE ESTUDIO VIRTUAL"
]);

function normalize(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[“”"'.:;(),¿?¡!]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function display(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function isIgnoredPath(location) {
  return ignoredPathParts.some((part) => location.includes(part));
}

function isLearnerFacingString(value, location) {
  if (typeof value !== "string") return false;
  if (ignoredShortValues.has(value)) return false;
  if (isIgnoredPath(location)) return false;
  if (location.endsWith(".type") || location.endsWith(".icon") || location.endsWith(".src") || location.endsWith(".assetId")) return false;
  if (location.endsWith(".language") || location.endsWith(".languageLabel") || location.endsWith(".fileName")) return false;
  // El código (`.code`) es legítimamente reutilizable: un mismo snippet (validación, recorrido, función)
  // puede enseñarse en una sección, repetirse en su versión PDF y reaparecer en el banco de ejercicios.
  // No es prosa de aprendizaje; exigir unicidad textual del código forzaría variaciones artificiales.
  if (location.endsWith(".code")) return false;
  return display(value).length >= MIN_EXACT_CHARS;
}

function sectionKey(location) {
  const file = (location.match(/^([^.]*)/) || ["", "package"])[1];
  const match = location.match(/\.((?:pdf-)?seccion-\d)\b/);
  if (match) return `${file}:${match[1].replace(/^pdf-/, "")}`;
  const intro = location.match(/\.((?:pdf-)?intro)\b/);
  return intro ? `${file}:intro` : `${file}:global`;
}

function walk(value, location, strings) {
  if (typeof value === "string") {
    if (isLearnerFacingString(value, location)) {
      strings.push({
        location,
        section: sectionKey(location),
        raw: display(value),
        norm: normalize(value)
      });
    }
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => walk(item, `${location}.${index}`, strings));
    return;
  }
  if (value && typeof value === "object") {
    Object.entries(value).forEach(([key, item]) => walk(item, `${location}.${key}`, strings));
  }
}

function ngrams(words, size) {
  const out = [];
  for (let i = 0; i <= words.length - size; i += 1) {
    out.push(words.slice(i, i + size).join(" "));
  }
  return out;
}

const strings = [];
for (const file of files) {
  const fullPath = path.resolve(process.cwd(), file);
  const data = JSON.parse(fs.readFileSync(fullPath, "utf8"));
  walk(data.scorm && data.scorm.sections ? data.scorm.sections : {}, `${path.basename(file)}.scorm.sections`, strings);
  walk(data.pdf && data.pdf.sections ? data.pdf.sections : {}, `${path.basename(file)}.pdf.sections`, strings);
}

const exact = new Map();
for (const item of strings) {
  if (!exact.has(item.norm)) exact.set(item.norm, []);
  exact.get(item.norm).push(item);
}

const exactIssues = Array.from(exact.values())
  .filter((items) => new Set(items.map((item) => item.location)).size > 1)
  .filter((items) => new Set(items.map((item) => item.section)).size > 1);

const gramMap = new Map();
for (const item of strings) {
  const words = item.norm.split(" ").filter(Boolean);
  if (words.length < NGRAM_SIZE) continue;
  for (const gram of new Set(ngrams(words, NGRAM_SIZE))) {
    if (!gramMap.has(gram)) gramMap.set(gram, []);
    gramMap.get(gram).push(item);
  }
}

const ngramIssues = Array.from(gramMap.entries())
  .map(([gram, items]) => [gram, items.filter((item, index, arr) => arr.findIndex((other) => other.location === item.location) === index)])
  .filter(([, items]) => new Set(items.map((item) => item.section)).size > MAX_NGRAM_LOCATIONS)
  .sort((a, b) => b[1].length - a[1].length)
  .slice(0, 25);

if (exactIssues.length || ngramIssues.length) {
  console.error("Content uniqueness validation failed.");
  if (exactIssues.length) {
    console.error(`\nExact duplicate learner-facing strings: ${exactIssues.length}`);
    exactIssues.slice(0, 20).forEach((items, index) => {
      console.error(`\n[Exact ${index + 1}] ${items[0].raw.slice(0, 220)}`);
      items.slice(0, 8).forEach((item) => console.error(`  - ${item.location}`));
    });
  }
  if (ngramIssues.length) {
    console.error(`\nRepeated ${NGRAM_SIZE}-word sequences across thematic sections: ${ngramIssues.length}`);
    ngramIssues.slice(0, 20).forEach(([gram, items], index) => {
      console.error(`\n[Ngram ${index + 1}] ${gram}`);
      items.slice(0, 8).forEach((item) => console.error(`  - ${item.location}`));
    });
  }
  process.exit(1);
}

console.log(`Content uniqueness validation passed for ${files.length} file(s).`);
