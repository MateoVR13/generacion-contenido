#!/usr/bin/env node
"use strict";

/**
 * Validator for the `moodle` content JSON consumed by the moodle-content
 * template renderer (../template/).
 *
 * Checks:
 *  - root key is `moodle` (not `course`/`subject`)
 *  - branding/course minimal metadata present
 *  - methodology.code is one of AG | ABPr | ABI | ABR | ABC
 *  - pageOrder references existing keys in pages, and vice versa (no orphans)
 *  - every page.type is one of welcome | moment | closing
 *  - exactly one welcome page and one closing page
 *  - number of `moment` pages == number of moments of the declared methodology
 *    (AG=N variable según temas del docente, ABPr=3, ABI=ABR=ABC=4)
 *  - each component.type is valid AND allowed on its page type
 *  - no learner-facing/style field contains <script>, <style>, on*= handlers,
 *    javascript: URLs, or external CSS/JS (the renderer emits inline-only HTML)
 *
 * Usage:
 *   node validate_moodle_json.js <file1.json> [file2.json ...]
 *   node validate_moodle_json.js            (validates *-moodle*.json in cwd)
 *
 * Exit codes:
 *   0  all files valid
 *   1  one or more validation errors
 *   2  usage / file / parse error
 */

const fs = require("fs");
const path = require("path");

// ---------------------------------------------------------------------------
// Configuration tables
// ---------------------------------------------------------------------------

const VALID_PAGE_TYPES = new Set(["welcome", "moment", "closing"]);

// Number of `moment` pages required per methodology code.
// Número de momentos por metodología. AG es VARIABLE (N temas que el docente
// considere necesarios, según el documento de saberes oficial UA): se valida
// como "al menos 1", no un número fijo. Las demás tienen momentos fijos.
const MOMENTS_BY_METHODOLOGY = {
  AG: null,
  ABPr: 3,
  ABI: 4,
  ABR: 4,
  ABC: 4
};

// Components allowed on each page type. Reusable components (roadmap, footer,
// and the CTA banners) appear in more than one list on purpose.
const COMPONENTS_BY_PAGE = {
  welcome: new Set([
    "hero",
    "learning-outcomes",
    "activities",
    "roadmap",
    "course-glance",
    "resources",
    "footer"
  ]),
  moment: new Set([
    "moment-banner",
    "moment-intro",
    "roadmap",
    "scorm-link",
    "workshop",
    "practice-link",
    "complementary",
    "footer"
  ]),
  closing: new Set([
    "closing-hero",
    "summary",
    "next-steps",
    "final-evaluation",
    "footer"
  ])
};

// Union of every known component type (for "unknown type" diagnostics).
const ALL_COMPONENT_TYPES = new Set(
  Object.values(COMPONENTS_BY_PAGE).reduce(
    (acc, set) => acc.concat(Array.from(set)),
    []
  )
);

// Patterns that must never appear in any string value: Moodle forbids active
// content in pasted HTML and the renderer is inline-only.
const FORBIDDEN_PATTERNS = [
  { re: /<\s*script\b/i, label: "<script> tag" },
  { re: /<\s*style\b/i, label: "<style> tag" },
  { re: /<\s*link\b/i, label: "<link> tag" },
  { re: /<\s*iframe\b[^>]*srcdoc/i, label: "iframe srcdoc" },
  { re: /\son[a-z]+\s*=/i, label: "inline event handler (on*=)" },
  { re: /javascript\s*:/i, label: "javascript: URL" },
  { re: /<\s*\/?\s*(html|head|body)\b/i, label: "document-level tag" }
];

// ---------------------------------------------------------------------------
// CLI args
// ---------------------------------------------------------------------------

const args = process.argv.slice(2);
const files = args.length
  ? args
  : fs
      .readdirSync(process.cwd())
      .filter((file) => /moodle.*\.json$/i.test(file))
      .sort();

if (!files.length) {
  console.error("No moodle JSON files were provided or found.");
  console.error("Usage: node validate_moodle_json.js <file.json> [...]");
  process.exit(2);
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Recursively scan every string value for forbidden active-content patterns. */
function scanForbidden(value, location, errors) {
  if (typeof value === "string") {
    for (const { re, label } of FORBIDDEN_PATTERNS) {
      if (re.test(value)) {
        errors.push(`${location}: contains forbidden ${label}`);
      }
    }
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item, i) => scanForbidden(item, `${location}[${i}]`, errors));
    return;
  }
  if (value && typeof value === "object") {
    Object.entries(value).forEach(([k, v]) =>
      scanForbidden(v, `${location}.${k}`, errors)
    );
  }
}

function validateFile(file) {
  const errors = [];
  const warnings = [];
  const fullPath = path.resolve(process.cwd(), file);

  let data;
  try {
    data = JSON.parse(fs.readFileSync(fullPath, "utf8"));
  } catch (err) {
    errors.push(`could not read/parse JSON: ${err.message}`);
    return { errors, warnings };
  }

  // --- root key -----------------------------------------------------------
  if (!data || typeof data !== "object") {
    errors.push("file root is not an object");
    return { errors, warnings };
  }
  if (!data.moodle) {
    const wrong = ["course", "subject", "scorm", "pdf"].find((k) => data[k]);
    errors.push(
      `root key must be "moodle"${wrong ? ` (found "${wrong}")` : ""}`
    );
    return { errors, warnings };
  }
  const moodle = data.moodle;

  // --- branding / course metadata ----------------------------------------
  if (!moodle.branding || typeof moodle.branding !== "object") {
    warnings.push('moodle.branding is missing (renderer falls back to defaults)');
  }
  if (!moodle.course || typeof moodle.course !== "object") {
    errors.push("moodle.course is missing");
  } else {
    if (!moodle.course.title) errors.push("moodle.course.title is required");
    if (!moodle.course.methodology || typeof moodle.course.methodology !== "object") {
      errors.push("moodle.course.methodology is required");
    }
  }

  // --- methodology --------------------------------------------------------
  const methodology = moodle.course && moodle.course.methodology;
  const code = methodology && methodology.code;
  let expectedMoments = null;
  if (!code) {
    errors.push("moodle.course.methodology.code is required");
  } else if (!(code in MOMENTS_BY_METHODOLOGY)) {
    errors.push(
      `moodle.course.methodology.code "${code}" is invalid (use AG|ABPr|ABI|ABR|ABC)`
    );
  } else {
    expectedMoments = MOMENTS_BY_METHODOLOGY[code];
  }

  // --- pageOrder / pages consistency -------------------------------------
  const pageOrder = Array.isArray(moodle.pageOrder) ? moodle.pageOrder : null;
  const pages = moodle.pages && typeof moodle.pages === "object" ? moodle.pages : null;

  if (!pageOrder) errors.push("moodle.pageOrder must be an array");
  if (!pages) errors.push("moodle.pages must be an object");

  if (pageOrder && pages) {
    const pageKeys = Object.keys(pages);
    // every pageOrder entry exists in pages
    for (const key of pageOrder) {
      if (!(key in pages)) {
        errors.push(`pageOrder references "${key}" which is missing from pages`);
      }
    }
    // every page key appears in pageOrder (no orphans)
    for (const key of pageKeys) {
      if (!pageOrder.includes(key)) {
        errors.push(`page "${key}" exists in pages but is missing from pageOrder`);
      }
    }
    // duplicates in pageOrder
    const seen = new Set();
    for (const key of pageOrder) {
      if (seen.has(key)) errors.push(`pageOrder lists "${key}" more than once`);
      seen.add(key);
    }
  }

  // --- per-page validation ------------------------------------------------
  let welcomeCount = 0;
  let closingCount = 0;
  let momentCount = 0;

  if (pages) {
    for (const [key, page] of Object.entries(pages)) {
      const loc = `pages.${key}`;
      if (!page || typeof page !== "object") {
        errors.push(`${loc} is not an object`);
        continue;
      }
      const ptype = page.type;
      if (!VALID_PAGE_TYPES.has(ptype)) {
        errors.push(
          `${loc}.type "${ptype}" is invalid (use welcome|moment|closing)`
        );
        continue;
      }
      if (ptype === "welcome") welcomeCount += 1;
      if (ptype === "closing") closingCount += 1;
      if (ptype === "moment") {
        momentCount += 1;
        if (page.momentNumber === undefined || page.momentNumber === null || page.momentNumber === "") {
          warnings.push(`${loc} (moment) has no momentNumber`);
        }
        if (!page.momentName) {
          warnings.push(`${loc} (moment) has no momentName`);
        }
      }

      // components
      const components = page.components;
      if (!Array.isArray(components)) {
        errors.push(`${loc}.components must be an array`);
        continue;
      }
      const allowed = COMPONENTS_BY_PAGE[ptype];
      components.forEach((comp, i) => {
        const cloc = `${loc}.components[${i}]`;
        if (!comp || typeof comp !== "object") {
          errors.push(`${cloc} is not an object`);
          return;
        }
        const ctype = comp.type;
        if (!ctype) {
          errors.push(`${cloc} is missing "type"`);
          return;
        }
        if (!ALL_COMPONENT_TYPES.has(ctype)) {
          errors.push(`${cloc}.type "${ctype}" is not a known component type`);
          return;
        }
        if (!allowed.has(ctype)) {
          errors.push(
            `${cloc}.type "${ctype}" is not allowed on a "${ptype}" page`
          );
        }
      });
    }
  }

  // --- page-count cardinality --------------------------------------------
  if (welcomeCount !== 1) {
    errors.push(`expected exactly 1 welcome page, found ${welcomeCount}`);
  }
  if (closingCount !== 1) {
    errors.push(`expected exactly 1 closing page, found ${closingCount}`);
  }
  if (expectedMoments !== null && momentCount !== expectedMoments) {
    errors.push(
      `methodology "${code}" requires ${expectedMoments} moment pages, found ${momentCount}`
    );
  } else if (expectedMoments === null && code && momentCount < 1) {
    // AG: número de temas variable, pero debe haber al menos 1 página de momento.
    errors.push(
      `methodology "${code}" (temas variables) requires at least 1 moment page, found ${momentCount}`
    );
  }

  // --- forbidden active content ------------------------------------------
  scanForbidden(moodle, "moodle", errors);

  return { errors, warnings };
}

// ---------------------------------------------------------------------------
// Run
// ---------------------------------------------------------------------------

let failed = 0;
for (const file of files) {
  const { errors, warnings } = validateFile(file);
  const name = path.basename(file);
  if (errors.length) {
    failed += 1;
    console.error(`FAIL  ${name}`);
    errors.forEach((e) => console.error(`  ERROR  ${e}`));
    warnings.forEach((w) => console.error(`  warn   ${w}`));
  } else {
    console.log(`OK    ${name}${warnings.length ? `  (${warnings.length} warning(s))` : ""}`);
    warnings.forEach((w) => console.log(`  warn   ${w}`));
  }
}

if (failed) {
  console.error(`\nValidation failed for ${failed} of ${files.length} file(s).`);
  process.exit(1);
}
console.log(`\nValidation passed for ${files.length} file(s).`);
process.exit(0);
