import fs from "node:fs/promises";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const inputPath = "FO_03_Syllabus_desde_el_enfoque_de_resultados_de_aprendizaje_para_pregrado_y_posgrado_v6 (3).xlsx";
const outputPath = "syllabus_inspection.ndjson";
const cellsOutputPath = "syllabus_nonempty_cells.json";

function columnName(index) {
  let name = "";
  let n = index + 1;
  while (n > 0) {
    const rem = (n - 1) % 26;
    name = String.fromCharCode(65 + rem) + name;
    n = Math.floor((n - 1) / 26);
  }
  return name;
}

const blob = await FileBlob.load(inputPath);
const workbook = await SpreadsheetFile.importXlsx(blob);

const overview = await workbook.inspect({
  kind: "workbook,sheet,table,region",
  maxChars: 25000,
  tableMaxRows: 60,
  tableMaxCols: 20,
  tableMaxCellChars: 300,
  summary: "Syllabus workbook overview",
});

await fs.writeFile(outputPath, overview.ndjson, "utf8");

const sheet = workbook.worksheets.getItem("SYLLABUS");
const usedRange = sheet.getUsedRange();
const values = usedRange.values;
const nonEmptyCells = [];

for (let rowIndex = 0; rowIndex < values.length; rowIndex += 1) {
  for (let colIndex = 0; colIndex < values[rowIndex].length; colIndex += 1) {
    const value = values[rowIndex][colIndex];
    if (value !== null && value !== undefined && String(value).trim() !== "") {
      nonEmptyCells.push({
        cell: `${columnName(colIndex)}${rowIndex + 1}`,
        row: rowIndex + 1,
        col: columnName(colIndex),
        value,
      });
    }
  }
}

await fs.writeFile(cellsOutputPath, JSON.stringify(nonEmptyCells, null, 2), "utf8");

console.log(`Wrote ${outputPath}`);
console.log(`Wrote ${cellsOutputPath}`);
console.log(`Non-empty cells: ${nonEmptyCells.length}`);
