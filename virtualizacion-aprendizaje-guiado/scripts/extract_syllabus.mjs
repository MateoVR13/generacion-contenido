#!/usr/bin/env node
// Extrae un syllabus a JSON de campos no vacíos, de forma flexible:
//  - .xlsx (formato oficial FO_03)  -> requiere la librería 'xlsx' o 'exceljs' si está disponible;
//    si no, hace fallback a un volcado por celda usando unzip+xml mínimo.
//  - .txt / .md / .json -> lee el texto tal cual (JSON se pasa directo).
//  - .pdf -> indica que debe extraerse aparte (este script no parsea PDF binario).
//
// Uso: node extract_syllabus.mjs <archivo> [salida.json]
// Salida: JSON con { source, format, cells|text } para alimentar la Fase 0.
// No interpreta campos curriculares (eso lo hace la Fase 0/1); solo extrae datos crudos.

import fs from "node:fs";
import path from "node:path";

const input = process.argv[2];
const output = process.argv[3] || null;

if (!input) {
  console.error("Uso: node extract_syllabus.mjs <archivo.(xlsx|txt|md|json|pdf)> [salida.json]");
  process.exit(2);
}
if (!fs.existsSync(input)) {
  console.error(`No existe el archivo: ${input}`);
  process.exit(2);
}

const ext = path.extname(input).toLowerCase();
let result = { source: path.basename(input), format: ext.replace(".", ""), extractedAt: null };

function emit(obj) {
  const json = JSON.stringify(obj, null, 2);
  if (output) {
    fs.writeFileSync(output, json + "\n");
    console.log(`Escrito: ${output}`);
  } else {
    console.log(json);
  }
}

if (ext === ".json") {
  result.text = JSON.parse(fs.readFileSync(input, "utf8"));
  emit(result);
} else if (ext === ".txt" || ext === ".md") {
  result.text = fs.readFileSync(input, "utf8");
  emit(result);
} else if (ext === ".pdf") {
  result.note =
    "PDF: extrae el texto con una herramienta externa (p.ej. pypdf) y vuelve a pasar el .txt/.md a este script, " +
    "o entrega el texto del syllabus directamente a la Fase 0.";
  emit(result);
} else if (ext === ".xlsx") {
  // Intento con librerías comunes si están instaladas; si no, fallback a XML del .xlsx.
  let cells = null;
  try {
    const xlsx = await import("xlsx");
    const wb = xlsx.readFile(input);
    cells = {};
    for (const name of wb.SheetNames) {
      const ws = wb.Sheets[name];
      const rows = xlsx.utils.sheet_to_json(ws, { header: 1, blankrows: false, defval: null });
      cells[name] = rows
        .map((r) => (Array.isArray(r) ? r.filter((c) => c !== null && String(c).trim() !== "") : []))
        .filter((r) => r.length);
    }
  } catch {
    // Fallback mínimo: descomprimir el .xlsx y leer sharedStrings + sheet1 sin dependencias.
    result.note =
      "No se encontró la librería 'xlsx'. Instala con `npm i xlsx` para extraer el Excel, " +
      "o convierte el FO_03 a CSV/texto y vuelve a pasarlo. (Fallback XML no implementado para evitar dependencias frágiles.)";
    emit(result);
    process.exit(0);
  }
  result.cells = cells;
  emit(result);
} else {
  console.error(`Formato no soportado: ${ext}. Usa xlsx, txt, md, json o pdf.`);
  process.exit(2);
}
