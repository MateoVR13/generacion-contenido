# Mathematical Expression Validation

Use this reference before writing or returning any generated JSON that contains mathematical notation. The goal is to prevent expressions that are pedagogically valid but fail to render correctly in the SCORM/PDF app.

## Where To Search

Collect every expression from:

- `latex`
- `formula`
- `variables[].symbol`
- `sections[].formula`
- `slides[].formula`
- `steps[].formula`
- `items[].formula`
- `exercises[].formula`
- Short inline math-like fragments inside explanatory text, examples, captions, feedback, or code comments when they are meant to render as notation.

If a math expression appears in prose, it must still render as notation. Either move it into a formula-capable field, or keep it in the prose string wrapped in `$...$` (inline) / `$$...$$` (display). Do not leave it as plain text such as `2^b` or `G_x`.

## JSON Escaping Rules

- In JSON files, LaTeX commands need escaped backslashes: write `\\frac{a}{b}`, `\\sum_{i=1}^{n}`, `\\sqrt{x}`, `\\hat{y}`, `\\begin{bmatrix}1 & 0 \\\\ 0 & 1\\end{bmatrix}`.
- Do not use single backslashes such as `\frac` or `\sum` inside JSON strings. They can become invalid JSON escapes or render incorrectly.
- **Dedicated formula fields** (`latex`, `formula`, `variables[].symbol`, `sections[].formula`, `slides[].formula`, `steps[].formula`): raw LaTeX only, NO delimiters (`$`, `$$`, `\\(`, `\\[`).
- **Math embedded in prose strings** (titles, body, description, note, intro, keyIdeas, table cells, captions, quiz/feedback, list items, etc.): wrap each expression in `$...$` (inline) or `$$...$$` (display). The app converts these to KaTeX in SCORM and PDF. Escape a literal dollar sign in prose as `\\$`.
- **Chart data labels are the exception: plain text, never LaTeX.** `chart.labels`, `chart.datasets[].label`, and axis/plugin titles (`options.scales.*.title.text`, `options.plugins.title.text`) are rendered by Chart.js as plain text and cannot use KaTeX. Do not wrap them in `$...$` and do not put LaTeX commands there; use readable Unicode (`σ`, `Δ`, `∇`, `²`, `₀`, `×`, `√`). The chart `title` and `note` are prose and DO use `$...$`.
- The same escaping rules for backslashes apply inside `$...$` (e.g. `"...$\\sqrt{x}$..."`).

## Syntax Checklist

For each expression, verify:

- Braces `{}` are balanced.
- Parentheses `()`, brackets `[]`, and matrix delimiters are balanced.
- Every `\\left` has a matching `\\right`.
- Fractions use `\\frac{numerator}{denominator}`.
- Roots use `\\sqrt{value}` or `\\sqrt[n]{value}`.
- Sums and products define readable bounds, for example `\\sum_{i=1}^{n}`.
- Integrals define limits when needed, for example `\\int_{a}^{b} f(x)\\,dx`.
- Subscripts and superscripts are grouped when longer than one character: `x_{ij}`, `e^{-\\lambda t}`.
- Accents are grouped: `\\hat{y}`, `\\bar{x}`, `\\vec{v}`.
- Matrices use supported environments such as `bmatrix`, `pmatrix`, or `matrix`, with rows separated by `\\\\` and columns by `&`.
- Text inside math uses `\\text{...}`. Example: `\\text{error}=y-\\hat{y}`.

## KaTeX Compatibility

Prefer standard KaTeX-safe commands:

- Arithmetic and algebra: `+`, `-`, `\\cdot`, `\\times`, `\\frac`, `\\sqrt`, `\\leq`, `\\geq`, `\\neq`, `\\approx`
- Sets and logic: `\\in`, `\\notin`, `\\subset`, `\\cup`, `\\cap`, `\\forall`, `\\exists`, `\\Rightarrow`
- Calculus: `\\lim`, `\\sum`, `\\prod`, `\\int`, `\\partial`, `\\nabla`
- Linear algebra: `\\mathbf{x}`, `\\vec{x}`, `\\begin{bmatrix}...\\end{bmatrix}`
- Statistics and ML: `\\mathbb{E}`, `\\operatorname{Var}`, `\\arg\\max`, `\\arg\\min`, `\\log`, `\\exp`, `\\sigma`

Avoid unsupported or unnecessary display macros, custom commands, packages, `\\newcommand`, TikZ, raw HTML, or notation that depends on a LaTeX package unavailable to KaTeX.

- **No combines un espacio fino con un superíndice/subíndice (`\\,^` o `\\,_`).** KaTeX 0.16.x del template
  falla al parsear `\\,^{\\circ}` ("Got group of unknown type: 'internal'") y la expresión se renderiza en rojo.
  Para grados escribe `^{\\circ}` directamente (p. ej. `78^{\\circ}\\mathrm{C}`), sin el `\\,` previo. El
  espacio fino `\\,` solo es válido cuando va seguido de texto/comando normal (`49.6\\,\\mathrm{mm}`), nunca
  inmediatamente antes de `^` o `_`.

## Instructional Validation

A mathematically valid expression is not enough. Confirm that:

- The expression is central to the concept being taught.
- A preceding theory block introduces why the expression appears.
- Variables are defined in `variables` or immediately around the formula.
- The explanation tells the learner how to read the expression.
- The expression is used in an example, step, chart, image, code fragment, exercise, decision, or feedback.

If an expression fails the instructional validation, remove it, replace it with a better representation, or move it to the section where it is actually taught.

## Common Fixes

| Problem | Bad | Correct JSON value |
| --- | --- | --- |
| Delimiters included | `$x^2+1$` | `x^2+1` |
| Single backslash | `\frac{a}{b}` | `\\frac{a}{b}` |
| Ungrouped subscript | `x_ij` | `x_{ij}` |
| Ungrouped exponent | `e^-lambda t` | `e^{-\\lambda t}` |
| Plain words in math | `error = real - predicho` | `\\text{error}=y-\\hat{y}` |
| Matrix line break not escaped | `\\begin{bmatrix}1 & 0 \\ 0 & 1\\end{bmatrix}` | `\\begin{bmatrix}1 & 0 \\\\ 0 & 1\\end{bmatrix}` |
| Forced decorative formula | `Q=\\frac{valor}{costo}` without use | Remove it or replace with a table, stepper, or explanation. |

## Final Pass

Before finalizing JSON, state internally for each file:

1. All math fields were found.
2. Each expression is delimiter-free raw LaTeX.
3. Each JSON string escapes backslashes.
4. Braces, delimiters, and environments are balanced.
5. Commands are KaTeX-compatible.
6. Variables and reading guidance are present where relevant.
7. No formula is decorative or disconnected from theory, example, practice, or evaluation.
