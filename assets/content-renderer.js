/* ===========================================================================
   Plantilla JSON SCORM/PDF - Motor de renderizado.
   =========================================================================== */
(function () {
  "use strict";

  let currentContent = null;

  function isScormRuntime() {
    try {
      return new URLSearchParams(window.location.search).get("scorm") === "1";
    } catch (err) {
      return false;
    }
  }

  if (isScormRuntime() && document.body) {
    document.body.classList.add("scorm-runtime");
  }

  function byId(id) {
    return document.getElementById(id);
  }

  function scormContent(content) {
    const scorm = content.scorm || {};
    return {
      labels: scorm.labels || content.labels || {},
      sectionOrder: scorm.sectionOrder || content.sectionOrder || [],
      sections: scorm.sections || content.sections || {}
    };
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function attr(value) {
    return escapeHtml(value);
  }

  function rich(value) {
    if (value && typeof value === "object" && typeof value.html === "string") return value.html;
    return escapeHtml(value);
  }

  function editScope(path) {
    return path ? ' data-edit-scope="' + attr(path) + '"' : "";
  }

  function editableText(field, value, className, tagName) {
    const tag = tagName || "span";
    if (isScormRuntime() || !field || (value && typeof value === "object" && typeof value.html === "string")) {
      return '<' + tag + (className ? ' class="' + className + '"' : "") + ">" + rich(value) + "</" + tag + ">";
    }
    return '<' + tag + (className ? ' class="' + className + '"' : "") + ' contenteditable="plaintext-only" spellcheck="true" data-edit-field="' + attr(field) + '">' + rich(value) + "</" + tag + ">";
  }

  function asArray(value) {
    if (Array.isArray(value)) return value;
    if (value == null || value === "") return [];
    return [value];
  }

  function firstText(value, fallback) {
    return value == null || value === "" ? fallback : value;
  }

  function hasPdfGuide(content) {
    return !!(content && content.pdf && content.pdf.sections && Object.keys(content.pdf.sections).length);
  }

  function pdfGuideSection(content) {
    const subject = (content && content.subject) || {};
    const pdf = (content && content.pdf) || {};
    const contentNumber = subject.contentNumber ? "Contenido " + subject.contentNumber : "Contenido";
    const runtime = isScormRuntime();
    return {
      _generated: true,
      kind: "material",
      icon: "picture_as_pdf",
      navLabel: "Guía PDF",
      title: "Guía de estudio PDF",
      intro: [
        "Consulta la versión imprimible del contenido con teoría, ejemplos, ejercicios, evaluación y referencias."
      ],
      componentOrder: ["material-pdf-download"],
      components: {
        "material-pdf-download": {
          type: "downloads",
          title: "Material complementario",
          description: "La guía PDF acompaña este recurso SCORM como material de estudio imprimible.",
          items: [
            {
              title: pdf.title || subject.contentTitle || subject.title || "Guía de estudio",
              meta: contentNumber + " · PDF",
              description: pdf.subtitle || pdf.purpose || "Versión imprimible del contenido.",
              href: runtime ? "guia-estudio.html" : "#",
              download: false,
              action: runtime ? "" : "pdf-preview",
              buttonLabel: runtime ? "Abrir PDF" : "Abrir vista PDF",
              icon: "picture_as_pdf"
            }
          ]
        }
      }
    };
  }

  function paragraphList(items, className, field) {
    const isArray = Array.isArray(items);
    return asArray(items).map(function (item, index) {
      const itemField = field ? field + (isArray ? "." + index : "") : "";
      return editableText(itemField, item, className, "p");
    }).join("");
  }

  function listItemText(item) {
    if (item && typeof item === "object") return item.text || item.label || item.title || "";
    return item;
  }

  function listItemField(collection, index, item) {
    if (item && typeof item === "object") {
      if (item.text != null) return collection + "." + index + ".text";
      if (item.label != null) return collection + "." + index + ".label";
      if (item.title != null) return collection + "." + index + ".title";
      return "";
    }
    return collection + "." + index;
  }

  function objectTextField(base, object, keys) {
    for (let i = 0; i < keys.length; i += 1) {
      if (object && object[keys[i]] != null) return base ? base + "." + keys[i] : keys[i];
    }
    return "";
  }

  function icon(name, className) {
    return '<span class="material-symbols-outlined ' + (className || "") + '" aria-hidden="true">' + escapeHtml(name || "check_circle") + "</span>";
  }

  function toneClasses(tone) {
    const tones = {
      success: "bg-secondary-container text-on-secondary-container",
      warning: "bg-tertiary-fixed text-on-tertiary-fixed",
      error: "bg-error-container text-on-error-container",
      dark: "bg-primary-container text-secondary-fixed",
      light: "bg-surface-container-high text-on-surface"
    };
    return tones[tone] || tones.success;
  }

  function sectionTitle(component, readOnly) {
    if (!component.title) return "";
    if (readOnly) return '<h3 class="font-h3 text-h3 text-primary mb-md border-l-4 border-secondary-fixed pl-base">' + rich(component.title) + "</h3>";
    return editableText("title", component.title, "font-h3 text-h3 text-primary mb-md border-l-4 border-secondary-fixed pl-base", "h3");
  }

  function sectionDescription(component, readOnly) {
    if (!component.description) return "";
    if (readOnly) {
      return '<div class="mb-md space-y-sm">' + asArray(component.description).map(function (item) {
        return '<p class="text-sm text-on-surface-variant">' + rich(item) + "</p>";
      }).join("") + "</div>";
    }
    return '<div class="mb-md space-y-sm">' + paragraphList(component.description, "text-sm text-on-surface-variant", "description") + "</div>";
  }

  function componentShell(id, component, body, extraClass, basePath) {
    const readOnly = !basePath;
    return '<section id="' + attr(id) + '"' + editScope(basePath) + ' data-component-type="' + attr(component.type || "custom") + '" class="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg hard-shadow ' + (extraClass || "") + '">' +
      sectionTitle(component, readOnly) +
      sectionDescription(component, readOnly) +
      body +
      "</section>";
  }

  function renderTheoryBlock(id, component, basePath) {
    const bodyText = component.body || component.content || component.paragraphs;
    const body = bodyText ? '<div class="theory-block-body space-y-sm">' + paragraphList(bodyText, "text-on-surface leading-relaxed", component.body ? "body" : component.content ? "content" : "paragraphs") + "</div>" : "";
    const keyIdeas = asArray(component.keyIdeas || component.highlights).map(function (item, index) {
      return '<li class="flex gap-sm items-start rounded bg-white/70 border border-outline-variant p-sm">' +
        icon((item && item.icon) || "check_circle", "text-secondary-fixed shrink-0 mt-xs") +
        editableText(listItemField(component.keyIdeas ? "keyIdeas" : "highlights", index, item), listItemText(item), "text-sm text-on-surface-variant", "span") +
        "</li>";
    }).join("");
    const sections = asArray(component.sections).map(function (section, index) {
      const titleField = objectTextField("sections." + index, section, ["title", "label"]);
      const bodyField = section && section.body != null ? "sections." + index + ".body" : "sections." + index + ".content";
      const formulaBlock = section.formula
        ? '<div class="formula-block bg-white border-l-4 border-primary p-md rounded-r overflow-x-auto" data-formula="' + attr(section.formula) + '"></div>' +
          (section.formulaNote ? editableText("sections." + index + ".formulaNote", section.formulaNote, "text-sm text-on-surface-variant mt-sm", "p") : "")
        : "";
      return '<article class="theory-mini-section rounded-lg border border-outline-variant bg-surface p-md">' +
        editableText(titleField, section.title || section.label || ("Idea " + (index + 1)), "font-bold text-primary mb-sm", "h4") +
        '<div class="space-y-sm">' + paragraphList(section.body || section.content, "text-sm text-on-surface-variant", bodyField) + "</div>" +
        formulaBlock +
        "</article>";
    }).join("");
    const example = component.example ? '<div class="theory-example rounded-lg border border-[#9bd9e1] bg-[#eaf9fc] p-md">' +
      editableText(objectTextField("example", component.example, ["title", "label"]), component.example.title || component.example.label || "Ejemplo", "font-bold text-primary mb-sm", "h4") +
      paragraphList(component.example.body || component.example.content, "text-sm text-on-surface-variant", component.example.body ? "example.body" : "example.content") +
      "</div>" : "";
    const closing = component.closing ? '<div class="theory-closing rounded-lg border-l-4 border-secondary-fixed bg-[#f4ffd7] p-md">' + paragraphList(component.closing, "text-sm text-primary", "closing") + "</div>" : "";
    const content = '<div class="theory-block rounded-lg border border-outline-variant bg-surface-container-low p-md space-y-md">' +
      (component.eyebrow ? editableText("eyebrow", component.eyebrow, "font-label-caps text-label-caps text-secondary uppercase", "p") : "") +
      body +
      (keyIdeas ? '<div><p class="font-label-caps text-label-caps uppercase text-on-surface-variant mb-sm">Ideas clave</p><ul class="grid grid-cols-1 md:grid-cols-2 gap-sm">' + keyIdeas + "</ul></div>" : "") +
      (sections ? '<div class="grid grid-cols-1 gap-sm">' + sections + "</div>" : "") +
      example +
      closing +
      "</div>";
    return componentShell(id, component, content, "theory-component", basePath);
  }

  function renderObjectives(id, component, basePath) {
    const items = asArray(component.items).map(function (item, index) {
      const text = listItemText(item);
      const itemIcon = item && typeof item === "object" ? item.icon : "check_circle";
      return '<li class="flex items-start gap-sm bg-surface-container-low border border-outline-variant rounded-lg p-md">' +
        icon(itemIcon || "check_circle", "text-secondary mt-xs shrink-0") +
        editableText(listItemField("items", index, item), text, "text-sm text-on-surface-variant") +
        "</li>";
    }).join("");

    return componentShell(id, component, '<ul class="grid grid-cols-1 md:grid-cols-2 gap-md">' + items + "</ul>", "", basePath);
  }

  function renderPriorKnowledge(id, component, basePath) {
    const listName = component.prompts ? "prompts" : "items";
    const prompts = asArray(component.prompts || component.items).map(function (item, index) {
      return '<li class="flex gap-sm items-start">' +
        icon((item && item.icon) || "psychology_alt", "text-secondary-fixed shrink-0 mt-xs") +
        editableText(listItemField(listName, index, item), listItemText(item)) +
        "</li>";
    }).join("");

    const body = '<div class="bg-primary-container text-on-primary rounded-lg p-md">' +
      editableText("eyebrow", component.eyebrow || "Antes de empezar", "font-label-caps text-label-caps text-secondary-fixed uppercase mb-sm", "p") +
      '<ul class="space-y-sm text-sm text-on-primary">' + prompts + "</ul>" +
      "</div>";

    return componentShell(id, component, body, "", basePath);
  }

  function renderCallout(id, component, basePath) {
    const body = '<div class="rounded-lg p-md border-l-4 border-secondary-fixed ' + toneClasses(component.tone || "light") + '">' +
      '<div class="flex items-start gap-sm">' +
      icon(component.icon || "tips_and_updates", "shrink-0 mt-xs") +
      '<div class="space-y-sm">' + paragraphList(component.body || component.text, "text-sm", component.body ? "body" : "text") + "</div>" +
      "</div>" +
      "</div>";
    return componentShell(id, component, body, "", basePath);
  }

  function renderAccordion(id, component, basePath) {
    const items = asArray(component.items).map(function (item, index) {
      const titleField = objectTextField("items." + index, item, ["title", "label"]);
      const bodyField = item && item.body != null ? "items." + index + ".body" : "items." + index + ".content";
      return '<details class="border border-outline-variant rounded overflow-hidden group hard-shadow" ' + (item.open || index === 0 ? "open" : "") + ">" +
        '<summary class="flex justify-between items-center p-md cursor-pointer list-none bg-surface hover:bg-surface-container-high transition-colors">' +
        '<span class="flex items-center gap-sm font-bold uppercase tracking-wider text-sm">' +
        icon(item.icon || "lightbulb", "text-primary") + editableText(titleField, item.title || item.label || ("Concepto " + (index + 1))) +
        "</span>" +
        icon("expand_more", "group-open:rotate-180 transition-transform") +
        "</summary>" +
        '<div class="p-md border-t border-outline-variant space-y-sm">' +
        paragraphList(item.body || item.content, "text-sm text-on-surface-variant", bodyField) +
        "</div>" +
        "</details>";
    }).join("");
    return componentShell(id, component, '<div class="space-y-base">' + items + "</div>", "", basePath);
  }

  function renderFlashcards(id, component, basePath) {
    const collection = component.cards ? "cards" : "items";
    const cards = asArray(component.cards || component.items).map(function (card, index) {
      const termField = objectTextField(collection + "." + index, card, ["term", "front", "title"]);
      const definitionField = objectTextField(collection + "." + index, card, ["definition", "back", "body"]);
      return '<div class="flashcard h-56 cursor-pointer" data-flashcard tabindex="0" role="button" aria-label="Voltear tarjeta">' +
        '<div class="flashcard-inner relative w-full h-full border border-outline-variant rounded-lg hover:hard-shadow transition-all">' +
        '<div class="flashcard-front absolute inset-0 bg-surface flex flex-col justify-center items-center p-md text-center rounded-lg">' +
        icon(card.icon || "quiz", "text-secondary text-4xl mb-sm") +
        editableText(termField, card.term || card.front || card.title, "font-h3 text-[20px]", "h4") +
        '<span class="mt-auto bg-primary-container text-secondary-fixed font-label-caps font-bold tracking-wider text-[10px] px-sm py-xs rounded-full">VOLTEAR</span>' +
        "</div>" +
        '<div class="flashcard-back absolute inset-0 bg-primary-container text-white flex flex-col justify-center items-center p-md text-center rounded-lg gap-sm">' +
        editableText(definitionField, card.definition || card.back || card.body, "text-sm text-on-primary", "p") +
        "</div>" +
        "</div>" +
        "</div>";
    }).join("");
    return componentShell(id, component, '<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-md">' + cards + "</div>", "", basePath);
  }

  function renderSlide(slide, index) {
    const base = "slides." + index;
    if (slide.formula) {
      return '<div class="carousel-slide shrink-0 w-full" data-carousel-slide>' +
        '<div class="p-lg bg-primary-container min-h-[280px] flex flex-col justify-center items-center text-center">' +
        editableText(objectTextField(base, slide, ["label", "title"]), slide.label || slide.title, "font-label-caps text-label-caps text-secondary-fixed mb-md uppercase") +
        '<div class="formula-block formula-on-dark flex items-center justify-center w-full max-w-full" data-formula="' + attr(slide.formula) + '"></div>' +
        editableText(base + ".description", slide.description || "", "text-sm text-on-primary-container mt-md max-w-lg", "p") +
        "</div>" +
        "</div>";
    }

    if (slide.image && slide.image.src) {
      return '<div class="carousel-slide shrink-0 w-full" data-carousel-slide>' +
        '<div class="grid grid-cols-1 md:grid-cols-2">' +
        '<div class="aspect-video md:aspect-auto md:min-h-[280px] bg-surface-container-low overflow-hidden">' +
        '<img class="w-full h-full object-cover" src="' + attr(slide.image.src) + '" alt="' + attr(slide.image.alt || "") + '" loading="lazy"/>' +
        "</div>" +
        '<div class="p-lg flex flex-col justify-center bg-surface">' +
        editableText(base + ".label", slide.label || "", "font-label-caps text-label-caps text-secondary mb-sm uppercase") +
        editableText(base + ".title", slide.title || "", "font-h3 text-h3 text-primary mb-md", "h4") +
        paragraphList(slide.body || slide.description, "text-sm text-on-surface-variant", slide.body ? base + ".body" : base + ".description") +
        "</div>" +
        "</div>" +
        "</div>";
    }

    return '<div class="carousel-slide shrink-0 w-full" data-carousel-slide>' +
      '<div class="p-xl bg-surface min-h-[280px] flex flex-col justify-center items-center text-center">' +
      icon(slide.icon || "menu_book", "text-5xl text-secondary mb-md") +
      editableText(base + ".title", slide.title || "", "font-h2 text-h2 text-primary mb-md", "h4") +
      '<div class="space-y-sm max-w-xl w-full">' + paragraphList(slide.body || slide.description, "text-sm text-on-surface-variant", slide.body ? base + ".body" : base + ".description") + "</div>" +
      "</div>" +
      "</div>";
  }

  function renderCarousel(id, component, basePath) {
    const slides = asArray(component.slides).map(renderSlide).join("");
    const body = '<div class="carousel relative border border-outline-variant rounded-lg overflow-hidden" data-carousel>' +
      '<div class="carousel-track flex transition-transform duration-500 ease-out" data-carousel-track>' + slides + "</div>" +
      '<button class="carousel-arrow absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary/80 text-on-primary flex items-center justify-center hover:bg-primary transition-colors" data-carousel-prev aria-label="Slide anterior">' + icon("chevron_left") + "</button>" +
      '<button class="carousel-arrow absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary/80 text-on-primary flex items-center justify-center hover:bg-primary transition-colors" data-carousel-next aria-label="Slide siguiente">' + icon("chevron_right") + "</button>" +
      "</div>" +
      '<div class="flex justify-center gap-sm mt-md" data-carousel-dots></div>';
    return componentShell(id, component, body, "", basePath);
  }

  function renderFormula(id, component, basePath) {
    const variables = asArray(component.variables).map(function (item, index) {
      return '<li class="flex items-start gap-sm">' +
        '<span class="formula-inline shrink-0 font-bold" data-formula-inline="' + attr(item.symbol || item.formula || "") + '"></span>' +
        '<span class="text-sm text-on-surface-variant">es ' + editableText("variables." + index + ".description", item.description || "") + "</span>" +
        "</li>";
    }).join("");

    const context = component.context ? '<div class="mb-md space-y-sm">' + paragraphList(component.context, "text-sm text-on-surface-variant", "context") + "</div>" : "";
    const explanation = component.explanation ? '<div class="mt-md rounded-lg border border-outline-variant bg-surface-container-low p-md space-y-sm">' +
      '<p class="font-label-caps text-label-caps text-primary uppercase">Cómo leerla</p>' +
      paragraphList(component.explanation, "text-sm text-on-surface-variant", "explanation") +
      "</div>" : "";
    const body = context +
      '<div class="formula-block bg-surface-container-low border-l-4 border-primary p-lg rounded-r flex items-center justify-center min-h-[100px] overflow-x-auto" data-formula="' + attr(component.latex || component.formula || "") + '"></div>' +
      (variables ? '<div class="mt-lg"><p class="font-label-caps text-label-caps text-on-surface-variant uppercase mb-sm">Donde:</p><ul class="space-y-sm">' + variables + "</ul></div>" : "") +
      explanation;
    return componentShell(id, component, body, "", basePath);
  }

  function renderTableCell(cell) {
    if (cell && typeof cell === "object") {
      if (cell.badge) {
        return '<span class="inline-flex px-base py-xs font-bold text-xs uppercase rounded ' + toneClasses(cell.tone) + '">' + rich(cell.badge) + "</span>";
      }
      if (cell.html) return cell.html;
      return rich(cell.text || cell.value);
    }
    return rich(cell);
  }

  function renderTable(id, component, basePath) {
    const headers = asArray(component.columns).map(function (column, index) {
      const field = column && typeof column === "object" ? "columns." + index + ".label" : "columns." + index;
      return '<th class="text-left p-md font-label-caps text-label-caps">' + editableText(field, column.label || column) + "</th>";
    }).join("");
    const rows = asArray(component.rows).map(function (row, rowIndex) {
      const rowHasCells = row && row.cells;
      const cells = asArray(rowHasCells ? row.cells : row).map(function (cell, index) {
        const cellBase = rowHasCells ? "rows." + rowIndex + ".cells." + index : "rows." + rowIndex + "." + index;
        const field = cell && typeof cell === "object"
          ? cellBase + "." + (cell.badge != null ? "badge" : cell.text != null ? "text" : "value")
          : cellBase;
        return '<td class="p-md ' + (index === 0 ? "font-bold" : "") + '">' + (cell && cell.html ? cell.html : editableText(field, cell && typeof cell === "object" ? (cell.badge || cell.text || cell.value) : cell)) + "</td>";
      }).join("");
      return '<tr class="border-b border-outline-variant last:border-b-0">' + cells + "</tr>";
    }).join("");
    const body = '<div class="overflow-x-auto rounded border border-outline-variant"><table class="w-full border-collapse">' +
      '<thead><tr class="bg-primary text-on-primary">' + headers + "</tr></thead>" +
      "<tbody>" + rows + "</tbody>" +
      "</table></div>";
    return componentShell(id, component, body, "", basePath);
  }

  function renderStepper(id, component, basePath) {
    const steps = asArray(component.steps).map(function (step, index) {
      const final = step.final || index === asArray(component.steps).length - 1;
      return '<li class="step-item ' + (final ? "step-item-final" : "") + '">' +
        '<span class="step-marker ' + (final ? "step-marker-final" : "") + '" aria-hidden="true">' + (final ? icon("check", "text-base") : escapeHtml(index + 1)) + "</span>" +
        '<div class="step-content">' +
        editableText("steps." + index + ".title", step.title, "font-bold text-body-md text-primary mb-xs", "h4") +
        paragraphList(step.body || step.description, "text-sm text-on-surface-variant mb-sm", step.body ? "steps." + index + ".body" : "steps." + index + ".description") +
        (step.formula ? '<div class="step-formula formula-block ' + (final ? "step-formula-result" : "") + '" data-formula="' + attr(step.formula) + '"></div>' : "") +
        "</div>" +
        "</li>";
    }).join("");
    const statement = component.statement ? editableText("statement", component.statement, "text-sm text-on-surface-variant mb-lg", "p") : "";
    return componentShell(id, component, statement + '<ol class="step-solver">' + steps + "</ol>", "", basePath);
  }

  function renderChart(id, component, basePath) {
    const config = {
      type: component.chartType || component.kind || "bar",
      data: {
        labels: component.labels || [],
        datasets: component.datasets || []
      },
      options: component.options || {}
    };
    const legend = asArray(component.legend).map(function (item, index) {
      return '<span class="inline-flex items-center gap-xs"><span class="w-3 h-3 rounded-full" style="background:' + attr(item.color || "#060b00") + '"></span>' + editableText("legend." + index + ".label", item.label) + "</span>";
    }).join("");
    const headerLegend = legend ? '<div class="flex items-center gap-md text-sm mb-md">' + legend + "</div>" : "";
    const body = headerLegend +
      '<div class="relative" style="height:' + attr(component.height || "320px") + '"><canvas data-chart="' + attr(config.type) + '" data-chart-config="' + attr(JSON.stringify(config)) + '" aria-label="' + attr(component.ariaLabel || component.title || "Grafico") + '"></canvas></div>';
    return componentShell(id, component, body, "", basePath);
  }

  function renderImageFigure(id, component, basePath) {
    const src = component.src || (component.image && component.image.src) || "";
    const alt = component.alt || (component.image && component.image.alt) || component.title || "Imagen del contenido";
    const prompt = component.prompt || component.imagePrompt || "";
    const assetId = component.assetId || "";
    const caption = component.caption || component.note || component.description || "";
    const source = component.source || "";
    const imageBlock = src
      ? '<img class="w-full h-full object-contain bg-white" src="' + attr(src) + '" alt="' + attr(alt) + '" loading="lazy"/>'
      : '<div class="visual-placeholder min-h-[260px] flex flex-col items-center justify-center text-center gap-sm p-lg">' +
        icon(component.icon || "image", "text-5xl text-secondary-fixed") +
        '<p class="font-label-caps text-label-caps text-primary uppercase">Imagen pendiente</p>' +
        (prompt ? editableText("prompt", prompt, "max-w-2xl text-sm text-on-surface-variant", "p") : '<p class="max-w-2xl text-sm text-on-surface-variant">Agrega <code>src</code> cuando la imagen esté lista.</p>') +
        "</div>";
    const actions = isScormRuntime() ? "" : '<div class="visual-actions flex flex-wrap items-center gap-sm p-sm border-b border-outline-variant bg-white">' +
      '<label class="visual-upload-btn inline-flex items-center gap-xs rounded bg-primary text-on-primary hover:opacity-90 px-base py-sm font-label-caps text-label-caps cursor-pointer">' +
      icon("upload_file", "text-base") + '<span>' + (src ? "Cambiar imagen" : "Cargar imagen") + '</span>' +
      '<input class="hidden" type="file" accept="image/*" data-image-upload data-image-path="' + attr(basePath) + '" data-image-asset-id="' + attr(assetId) + '"/>' +
      "</label>" +
      (src ? '<button type="button" class="visual-clear-btn inline-flex items-center gap-xs rounded border border-outline-variant bg-surface px-base py-sm font-label-caps text-label-caps text-primary hover:bg-surface-container-high" data-image-clear data-image-path="' + attr(basePath) + '" data-image-asset-id="' + attr(assetId) + '">' + icon("delete", "text-base") + "Quitar</button>" : "") +
      '<span class="text-xs text-on-surface-variant">' + (assetId ? "Se sincroniza con PDF: " + escapeHtml(assetId) : "Imagen local del componente") + "</span>" +
      "</div>";
    const body = '<figure class="visual-figure overflow-hidden rounded-lg border border-outline-variant bg-surface-container-low">' +
      actions +
      '<div class="visual-frame">' + imageBlock + "</div>" +
      (caption ? '<figcaption class="border-t border-outline-variant bg-surface px-md py-sm text-sm text-on-surface-variant">' + paragraphList(caption, "", caption === component.description ? "description" : caption === component.note ? "note" : "caption") + (source ? '<p class="mt-xs text-xs text-outline">' + editableText("source", source) + "</p>" : "") + "</figcaption>" : "") +
      "</figure>";
    return componentShell(id, component, body, "", basePath);
  }

  function languageClass(language) {
    const map = {
      js: "javascript",
      javascript: "javascript",
      py: "python",
      python: "python",
      html: "xml",
      css: "css",
      json: "json",
      bash: "bash",
      shell: "bash"
    };
    const key = String(language || "text").toLowerCase();
    return map[key] || key;
  }

  function renderCode(id, component, basePath) {
    const lang = languageClass(component.language);
    const label = component.languageLabel || String(component.language || "Texto").toUpperCase();
    const instructions = component.instructions ? '<div class="rounded-lg border border-outline-variant bg-surface-container-low p-md mb-md">' +
      '<p class="font-label-caps text-label-caps text-primary uppercase mb-sm">Antes de ejecutar</p>' +
      '<ol class="space-y-xs list-decimal pl-lg">' + asArray(component.instructions).map(function (item, index) {
        return '<li>' + editableText(listItemField("instructions", index, item), listItemText(item), "text-sm text-on-surface-variant", "span") + "</li>";
      }).join("") + "</ol></div>" : "";
    const body = instructions + '<div class="code-card bg-[#1e1e1e] rounded-lg overflow-hidden shadow-2xl border-l-8 border-secondary" data-code-block>' +
      '<div class="flex items-center justify-between gap-md px-md py-sm bg-[#2d2d2d] border-b border-white/10">' +
      '<div class="flex items-center gap-sm min-w-0">' +
      '<div class="flex gap-xs shrink-0"><span class="w-3 h-3 rounded-full bg-red-500"></span><span class="w-3 h-3 rounded-full bg-yellow-500"></span><span class="w-3 h-3 rounded-full bg-green-500"></span></div>' +
      editableText("fileName", component.fileName || "fragmento", "font-label-caps text-[10px] text-white/60 tracking-widest uppercase truncate") +
      "</div>" +
      '<div class="flex items-center gap-sm shrink-0">' +
      editableText(component.languageLabel ? "languageLabel" : "language", label, "font-label-caps text-[10px] text-secondary-fixed tracking-widest uppercase") +
      '<button type="button" data-copy-code class="inline-flex items-center gap-xs rounded bg-white/10 text-white hover:bg-white/20 px-sm py-xs font-label-caps text-[10px] transition-colors" aria-label="Copiar código">' +
      icon("content_copy", "text-base") + '<span data-copy-label>Copiar</span>' +
      "</button>" +
      "</div>" +
      "</div>" +
      '<pre class="m-0 p-md font-code text-code overflow-x-auto"><code class="language-' + attr(lang) + '">' + escapeHtml(component.code || "") + "</code></pre>" +
      "</div>" +
      (component.expectedOutput ? '<div class="mt-md rounded-lg border-l-4 border-secondary-fixed bg-[#f4ffd7] p-md">' +
        '<p class="font-label-caps text-label-caps text-primary uppercase mb-sm">Resultado esperado</p>' +
        paragraphList(component.expectedOutput, "text-sm text-primary", "expectedOutput") +
        "</div>" : "");
    return componentShell(id, component, body, "", basePath);
  }

  function renderVideo(id, component, basePath) {
    const hasSource = !!component.src;
    const body = '<div class="relative w-full rounded-lg overflow-hidden border border-outline-variant" style="aspect-ratio:16/9; background:#1e1e1e;">' +
      '<iframe class="absolute inset-0 w-full h-full" style="border:0;" src="' + attr(component.src || "") + '" title="' + attr(component.videoTitle || component.title || "Video") + '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen loading="lazy"></iframe>' +
      (hasSource ? "" : '<div class="absolute inset-0 flex flex-col items-center justify-center text-center gap-sm pointer-events-none">' + icon("play_circle", "text-secondary-fixed text-6xl") + '<p class="font-label-caps text-label-caps text-white/70 uppercase">Inserta aqui la URL del video</p></div>') +
      "</div>" +
      (component.meta ? editableText("meta", component.meta, "text-xs text-outline mt-sm", "p") : "");
    return componentShell(id, component, body, "", basePath);
  }

  function renderMetrics(id, component, basePath) {
    const metrics = asArray(component.items).map(function (metric, index) {
      const dark = index === 0 || metric.emphasis;
      return '<div class="' + (dark ? "bg-primary-container text-on-primary" : "bg-surface-container-lowest border border-outline-variant") + ' rounded-xl p-md hard-shadow" data-edit-scope="' + attr(basePath) + '">' +
        editableText("items." + index + ".label", metric.label, "font-label-caps text-[10px] " + (dark ? "text-secondary-fixed" : "text-on-surface-variant") + " uppercase mb-xs", "p") +
        editableText("items." + index + ".value", metric.value, "font-h2 text-h2 " + (dark ? "text-secondary-fixed" : "text-primary"), "p") +
        (metric.note ? editableText("items." + index + ".note", metric.note, "text-xs mt-xs " + (dark ? "text-on-primary-container" : "text-on-surface-variant"), "p") : "") +
        "</div>";
    }).join("");
    return '<div id="' + attr(id) + '" data-component-type="' + attr(component.type || "metrics") + '" class="grid grid-cols-2 md:grid-cols-4 gap-md">' + metrics + "</div>";
  }

  function renderPodcast(id, component, basePath) {
    const body = '<div class="podcast bg-primary-container text-on-primary rounded-lg p-md" data-podcast data-src="' + attr(component.src || "") + '">' +
      '<div class="flex items-center gap-md">' +
      '<span class="shrink-0 w-16 h-16 rounded-lg bg-secondary-fixed text-primary flex items-center justify-center" aria-hidden="true">' + icon("podcasts", "text-4xl") + "</span>" +
      '<div class="min-w-0">' + editableText("eyebrow", component.eyebrow || "Episodio", "font-label-caps text-label-caps text-secondary-fixed uppercase mb-xs", "p") + editableText(component.episodeTitle ? "episodeTitle" : "title", component.episodeTitle || component.title, "font-h3 text-[20px] text-on-primary leading-tight truncate", "h4") + "</div>" +
      "</div>" +
      '<div class="flex items-center gap-sm mt-md">' +
      '<button type="button" data-pc-back class="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-on-primary flex items-center justify-center transition-colors" aria-label="Retroceder 10 segundos">' + icon("replay_10", "text-[22px]") + "</button>" +
      '<button type="button" data-pc-play class="w-12 h-12 rounded-full bg-secondary-fixed text-primary flex items-center justify-center hover:scale-105 transition-transform" aria-label="Reproducir o pausar"><span class="material-symbols-outlined text-[30px]" data-pc-icon aria-hidden="true">play_arrow</span></button>' +
      '<button type="button" data-pc-fwd class="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-on-primary flex items-center justify-center transition-colors" aria-label="Avanzar 10 segundos">' + icon("forward_10", "text-[22px]") + "</button>" +
      '<div class="flex-1 flex items-center gap-sm"><span class="font-code text-[11px] text-on-primary/80 tabular-nums" data-pc-current>0:00</span><div data-pc-bar class="relative flex-1 h-2 rounded-full bg-white/15 cursor-pointer overflow-hidden"><div data-pc-fill class="absolute left-0 top-0 h-full w-0 bg-secondary-fixed rounded-full"></div></div><span class="font-code text-[11px] text-on-primary/80 tabular-nums" data-pc-duration>0:00</span></div>' +
      '<button type="button" data-pc-rate class="font-label-caps text-[11px] font-bold text-primary bg-secondary-fixed rounded px-base py-1 hover:opacity-90 transition-opacity" aria-label="Cambiar velocidad de reproduccion">1x</button>' +
      "</div>" +
      '<audio data-pc-audio preload="metadata" class="hidden"></audio>' +
      "</div>" +
      (component.body ? editableText("body", component.body, "text-sm text-on-surface-variant mt-md", "p") : "");
    return componentShell(id, component, body, "", basePath);
  }

  function renderTimeline(id, component, basePath) {
    const items = asArray(component.items).map(function (item, index) {
      const accent = index % 2 === 1;
      return '<div class="flex-1 relative z-10 text-center px-sm">' +
        '<div class="w-12 h-12 rounded-full ' + (accent ? "bg-secondary-fixed text-primary" : "bg-primary-container text-secondary-fixed") + ' flex items-center justify-center mb-md mx-auto ring-4 ring-surface-container-lowest">' + icon(item.icon || "flag") + "</div>" +
        editableText(objectTextField("items." + index, item, ["date", "label"]), item.date || item.label, "font-label-caps text-label-caps text-primary mb-1", "p") +
        editableText("items." + index + ".title", item.title, "font-bold text-body-md mb-xs", "h4") +
        editableText(objectTextField("items." + index, item, ["body", "description"]), item.body || item.description, "text-sm text-on-surface-variant", "p") +
        "</div>";
    }).join("");
    const body = '<div class="relative flex flex-col md:flex-row gap-base md:gap-0 mt-8">' +
      '<div class="hidden md:block absolute top-6 left-0 right-0 h-1 bg-surface-variant z-0"></div>' +
      items +
      "</div>";
    return componentShell(id, component, body, "", basePath);
  }

  function renderTabs(id, component, basePath) {
    const tabs = asArray(component.tabs);
    const buttons = tabs.map(function (tab, index) {
      return '<button class="tab-btn px-lg py-md font-label-caps text-label-caps border-b-4 ' + (index === 0 ? "border-secondary-fixed text-primary" : "border-transparent text-on-surface-variant hover:bg-surface-container") + '" data-tab="' + index + '">' + editableText(objectTextField("tabs." + index, tab, ["label", "title"]), tab.label || tab.title) + "</button>";
    }).join("");
    const panes = tabs.map(function (tab, index) {
      return '<div class="tab-pane space-y-sm ' + (index === 0 ? "" : "hidden") + '" data-pane="' + index + '">' +
        editableText(objectTextField("tabs." + index, tab, ["title", "label"]), tab.title || tab.label, "font-h3 text-[20px] mb-sm", "h4") +
        paragraphList(tab.body || tab.content, "text-sm text-on-surface-variant", tab.body ? "tabs." + index + ".body" : "tabs." + index + ".content") +
        "</div>";
    }).join("");
    const body = '<div class="border border-outline-variant overflow-hidden rounded-lg" data-tabs>' +
      '<div class="flex overflow-x-auto border-b border-outline-variant bg-surface-container-low">' + buttons + "</div>" +
      '<div class="p-md min-h-[160px]">' + panes + "</div>" +
      "</div>";
    return componentShell(id, component, body, "", basePath);
  }

  function renderQuiz(id, component, basePath) {
    const questions = asArray(component.questions).map(function (question, questionIndex) {
      const options = asArray(question.options).map(function (option, optionIndex) {
        return '<button type="button" data-quiz-option data-correct="' + (option.correct ? "true" : "false") + '" data-feedback="' + attr(option.feedback || "") + '" aria-pressed="false" class="quiz-option text-left border border-outline-variant rounded-lg p-md bg-surface hover:bg-surface-container-high transition-colors">' +
          editableText(objectTextField("questions." + questionIndex + ".options." + optionIndex, option, ["text", "label"]), option.text || option.label) +
          "</button>";
      }).join("");
      return '<div class="border border-outline-variant rounded-lg p-md bg-surface-container-low" data-quiz-question>' +
        '<p class="font-label-caps text-[10px] text-on-surface-variant uppercase mb-xs">Pregunta ' + (questionIndex + 1) + "</p>" +
        editableText(objectTextField("questions." + questionIndex, question, ["prompt", "title"]), question.prompt || question.title, "font-bold text-primary mb-md", "h4") +
        '<div class="grid grid-cols-1 md:grid-cols-2 gap-sm">' + options + "</div>" +
        '<p class="hidden quiz-feedback mt-md text-sm rounded p-sm" data-quiz-feedback></p>' +
        "</div>";
    }).join("");
    return componentShell(id, component, '<div class="space-y-md">' + questions + "</div>", "", basePath);
  }

  function renderEvaluationActivity(id, component, basePath) {
    function chip(label, value) {
      if (value == null || value === "" || (Array.isArray(value) && value.length === 0)) return "";
      const text = Array.isArray(value) ? value.join(", ") : value;
      return '<span class="inline-flex items-center gap-xs rounded-full bg-surface-container-high border border-outline-variant px-base py-xs text-xs text-on-surface-variant">' +
        '<strong class="text-primary">' + rich(label) + ":</strong> " + rich(text) +
        "</span>";
    }

    const meta = [
      chip("RA", component.learningOutcomeIds || component.learningOutcomes || component.ra),
      chip("Momento", component.evaluationMoment),
      chip("Participacion", component.participationType),
      chip("Tecnica", component.technique),
      chip("Instrumento", component.instrument),
      chip("Peso", component.weight)
    ].join("");

    const feedback = component.feedback || {};
    const feedbackItems = [
      ["Fortalezas", feedback.strengths],
      ["Por mejorar", feedback.improvement],
      ["Refuerzo", feedback.reinforcement],
      ["Siguiente paso", feedback.nextStep]
    ].filter(function (item) { return item[1]; }).map(function (item) {
      return '<li><strong>' + rich(item[0]) + ":</strong> " + rich(item[1]) + "</li>";
    }).join("");

    const rubric = component.rubric || {};
    const rubricCriteria = asArray(rubric.criteria).map(function (criterion, index) {
      const descriptors = criterion.descriptors && typeof criterion.descriptors === "object"
        ? Object.keys(criterion.descriptors).map(function (level) {
          return '<li><strong>' + rich(level) + ":</strong> " + rich(criterion.descriptors[level]) + "</li>";
        }).join("")
        : '<li>' + rich(criterion.descriptors || criterion.description || "") + "</li>";
      return '<div class="border border-outline-variant rounded-lg p-md bg-surface">' +
        editableText(objectTextField("rubric.criteria." + index, criterion, ["name", "title"]), criterion.name || criterion.title || "Criterio", "font-bold text-primary mb-sm", "h4") +
        '<ul class="space-y-xs text-xs text-on-surface-variant">' + descriptors + "</ul>" +
        "</div>";
    }).join("");

    const body = '<div class="space-y-md">' +
      (meta ? '<div class="flex flex-wrap gap-sm">' + meta + "</div>" : "") +
      '<div class="grid grid-cols-1 md:grid-cols-2 gap-md">' +
      '<div class="rounded-lg bg-surface-container-low border border-outline-variant p-md">' +
      '<p class="font-label-caps text-label-caps uppercase text-secondary mb-xs">Criterio</p>' +
      editableText("criterion", component.criterion || "", "text-sm text-on-surface-variant", "p") +
      "</div>" +
      '<div class="rounded-lg bg-surface-container-low border border-outline-variant p-md">' +
      '<p class="font-label-caps text-label-caps uppercase text-secondary mb-xs">Evidencia</p>' +
      editableText("evidence", component.evidence || "", "text-sm text-on-surface-variant", "p") +
      "</div>" +
      "</div>" +
      (feedbackItems ? '<div class="rounded-lg border-l-4 border-secondary-fixed bg-tertiary-fixed text-on-tertiary-fixed p-md"><p class="font-label-caps text-label-caps uppercase mb-sm">Ruta de retroalimentacion</p><ul class="space-y-xs text-sm">' + feedbackItems + "</ul></div>" : "") +
      (rubric.levels ? '<p class="text-xs text-on-surface-variant"><strong>Niveles:</strong> ' + rich(asArray(rubric.levels).join(", ")) + "</p>" : "") +
      (rubricCriteria ? '<div class="grid grid-cols-1 md:grid-cols-2 gap-md">' + rubricCriteria + "</div>" : "") +
      "</div>";

    return componentShell(id, component, body, "", basePath);
  }

  function renderListeningTrueFalse(id, component, basePath) {
    const audio = component.audio || {};
    const statements = asArray(component.statements || component.items).map(function (item, index) {
      const answer = item.answer === true || item.correct === true;
      return '<div class="border border-outline-variant rounded-lg p-md bg-surface-container-low" data-binary-question>' +
        '<p class="font-label-caps text-[10px] text-on-surface-variant uppercase mb-xs">Enunciado ' + (index + 1) + "</p>" +
        editableText(objectTextField((component.statements ? "statements" : "items") + "." + index, item, ["text", "statement"]), item.text || item.statement, "font-bold text-primary mb-md", "p") +
        '<div class="flex flex-wrap gap-sm">' +
        '<button type="button" data-binary-option data-correct="' + (answer ? "true" : "false") + '" data-feedback="' + attr(item.feedback || "") + '" aria-pressed="false" class="quiz-option min-w-20 text-center border border-outline-variant rounded-lg px-md py-sm bg-surface hover:bg-surface-container-high transition-colors">' + rich(component.trueLabel || "V") + "</button>" +
        '<button type="button" data-binary-option data-correct="' + (!answer ? "true" : "false") + '" data-feedback="' + attr(item.feedback || "") + '" aria-pressed="false" class="quiz-option min-w-20 text-center border border-outline-variant rounded-lg px-md py-sm bg-surface hover:bg-surface-container-high transition-colors">' + rich(component.falseLabel || "F") + "</button>" +
        "</div>" +
        '<p class="hidden quiz-feedback mt-md text-sm rounded p-sm" data-binary-feedback></p>' +
        "</div>";
    }).join("");

    const audioBlock = '<div class="bg-primary-container text-on-primary rounded-lg p-md mb-md">' +
      '<div class="flex items-center gap-md mb-md">' +
      '<span class="shrink-0 w-12 h-12 rounded-lg bg-secondary-fixed text-primary flex items-center justify-center" aria-hidden="true">' + icon("headphones", "text-3xl") + "</span>" +
      '<div class="min-w-0">' + editableText("eyebrow", component.eyebrow || "Listening", "font-label-caps text-label-caps text-secondary-fixed uppercase mb-xs", "p") + editableText(audio.title != null ? "audio.title" : "audioTitle", audio.title || component.audioTitle || "[Título del audio]", "font-h3 text-[20px] text-on-primary leading-tight truncate", "h4") + "</div>" +
      "</div>" +
      (audio.src ? '<audio class="w-full" src="' + attr(audio.src) + '" controls preload="metadata"></audio>' : '<div class="border border-white/20 rounded p-md text-sm text-on-primary-container">[Ruta del audio pendiente: agrega audio.src en el JSON.]</div>') +
      (audio.transcript ? '<details class="mt-md"><summary class="cursor-pointer font-label-caps text-label-caps text-secondary-fixed uppercase">Transcripción</summary><div class="mt-sm text-sm text-on-primary">' + paragraphList(audio.transcript, "mb-sm", "audio.transcript") + "</div></details>" : "") +
      "</div>";

    return componentShell(id, component, audioBlock + '<div class="space-y-md">' + statements + "</div>", "", basePath);
  }

  function renderMatching(id, component, basePath) {
    const pairs = asArray(component.pairs || component.items);
    const shuffled = asArray(component.options).length ? asArray(component.options) : pairs.map(function (pair) { return pair.meaning || pair.definition || pair.value; });
    const options = ['<option value="">[Selecciona una opción]</option>'].concat(shuffled.map(function (option) {
      const value = option.value || option.meaning || option.definition || option.label || option;
      const label = option.label || option.meaning || option.definition || option.value || option;
      return '<option value="' + attr(value) + '">' + rich(label) + "</option>";
    })).join("");

    const rows = pairs.map(function (pair, index) {
      const correct = pair.meaning || pair.definition || pair.value || "";
      return '<div class="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(220px,1.3fr)] gap-sm items-center border border-outline-variant rounded-lg p-md bg-surface-container-low">' +
        '<div><p class="font-label-caps text-[10px] text-on-surface-variant uppercase mb-xs">Palabra ' + (index + 1) + '</p>' + editableText(objectTextField("pairs." + index, pair, ["word", "term"]), pair.word || pair.term, "font-h3 text-[20px] text-primary", "p") + "</div>" +
        '<select data-match-select data-correct="' + attr(correct) + '" class="activity-select w-full rounded border-outline-variant bg-surface">' + options + "</select>" +
        "</div>";
    }).join("");

    const body = '<div class="space-y-md" data-matching-activity data-feedback-correct="' + attr(component.feedbackCorrect || "Todo está correcto.") + '" data-feedback-incomplete="' + attr(component.feedbackIncomplete || "Revisa las relaciones marcadas.") + '">' +
      rows +
      '<div class="flex flex-wrap items-center gap-sm"><button type="button" data-check-matching class="inline-flex items-center gap-sm py-sm px-lg font-label-caps text-label-caps rounded bg-primary text-on-primary hover:opacity-90 transition-opacity hard-shadow">' + icon("fact_check", "text-base") + "Comprobar</button>" +
      '<p class="hidden activity-feedback text-sm rounded p-sm" data-activity-feedback></p></div>' +
      "</div>";
    return componentShell(id, component, body, "", basePath);
  }

  function renderMultiSelect(id, component, basePath) {
    const options = asArray(component.options).map(function (option, index) {
      return '<label class="activity-check-option flex items-start gap-sm border border-outline-variant rounded-lg p-md bg-surface hover:bg-surface-container-high transition-colors">' +
        '<input type="checkbox" data-multi-option data-correct="' + (option.correct ? "true" : "false") + '" class="mt-1 rounded border-outline-variant text-primary focus:ring-secondary-fixed"/>' +
        '<span><span class="font-label-caps text-[10px] text-on-surface-variant uppercase">Opción ' + (index + 1) + '</span>' + editableText(objectTextField("options." + index, option, ["text", "label"]), option.text || option.label, "block text-sm text-on-surface") + "</span>" +
        "</label>";
    }).join("");

    const body = '<div data-multiselect-activity data-feedback-correct="' + attr(component.feedbackCorrect || "Selección correcta.") + '" data-feedback-incomplete="' + attr(component.feedbackIncomplete || "Revisa las opciones seleccionadas.") + '">' +
      editableText(objectTextField("", component, ["prompt", "question"]), component.prompt || component.question || "[Enunciado de selección múltiple.]", "font-bold text-primary mb-md", "p") +
      '<div class="grid grid-cols-1 md:grid-cols-2 gap-sm">' + options + "</div>" +
      '<div class="flex flex-wrap items-center gap-sm mt-md"><button type="button" data-check-multiselect class="inline-flex items-center gap-sm py-sm px-lg font-label-caps text-label-caps rounded bg-primary text-on-primary hover:opacity-90 transition-opacity hard-shadow">' + icon("checklist", "text-base") + "Comprobar</button>" +
      '<p class="hidden activity-feedback text-sm rounded p-sm" data-activity-feedback></p></div>' +
      "</div>";
    return componentShell(id, component, body, "", basePath);
  }

  function answerList(value) {
    return asArray(value).map(function (item) {
      return String(item).trim().toLowerCase();
    }).filter(Boolean);
  }

  function renderFillBlank(id, component, basePath) {
    const textParts = asArray(component.parts || component.items).map(function (part, index) {
      const listName = component.parts ? "parts" : "items";
      if (typeof part === "string") return editableText(listName + "." + index, part);
      const answers = answerList(part.answers || part.answer);
      return '<label class="inline-flex items-center gap-xs mx-xs my-xs">' +
        '<span class="sr-only">Espacio ' + (index + 1) + "</span>" +
        '<input type="text" data-fill-input data-answers="' + attr(answers.join("|")) + '" placeholder="' + attr(part.placeholder || "[respuesta]") + '" class="activity-input min-w-32 rounded border-outline-variant bg-surface px-sm py-xs font-code text-sm"/>' +
        "</label>";
    }).join("");

    const body = '<div data-fill-blank-activity data-feedback-correct="' + attr(component.feedbackCorrect || "Respuestas correctas.") + '" data-feedback-incomplete="' + attr(component.feedbackIncomplete || "Revisa los espacios marcados.") + '">' +
      (component.prompt ? editableText("prompt", component.prompt, "font-bold text-primary mb-md", "p") : "") +
      '<div class="bg-surface-container-low border border-outline-variant rounded-lg p-md leading-8">' + textParts + "</div>" +
      '<div class="flex flex-wrap items-center gap-sm mt-md"><button type="button" data-check-fill-blank class="inline-flex items-center gap-sm py-sm px-lg font-label-caps text-label-caps rounded bg-primary text-on-primary hover:opacity-90 transition-opacity hard-shadow">' + icon("edit_note", "text-base") + "Comprobar</button>" +
      '<p class="hidden activity-feedback text-sm rounded p-sm" data-activity-feedback></p></div>' +
      "</div>";
    return componentShell(id, component, body, "", basePath);
  }

  function renderReflection(id, component, basePath) {
    const listName = component.prompts ? "prompts" : "items";
    const prompts = asArray(component.prompts || component.items).map(function (item, index) {
      return '<li class="flex items-start gap-md border-b border-outline-variant last:border-b-0 py-md">' +
        '<span class="bg-secondary-fixed text-primary font-bold w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm">' + (index + 1) + "</span>" +
        editableText(listItemField(listName, index, item), listItemText(item), "text-sm text-on-surface-variant", "p") +
        "</li>";
    }).join("");
    return componentShell(id, component, '<ol>' + prompts + "</ol>", "", basePath);
  }

  function renderSummary(id, component, basePath) {
    const items = asArray(component.items).map(function (item, index) {
      return '<li class="flex items-start gap-sm">' +
        icon((item && item.icon) || "done_all", "text-secondary shrink-0 mt-xs") +
        editableText(listItemField("items", index, item), listItemText(item), "text-sm text-on-surface-variant") +
        "</li>";
    }).join("");
    return componentShell(id, component, '<ul class="grid grid-cols-1 md:grid-cols-2 gap-md">' + items + "</ul>", "", basePath);
  }

  function renderReferences(id, component, basePath) {
    const refs = asArray(component.items).map(function (ref, index) {
      const tone = index % 2 === 0 ? "bg-secondary-fixed text-primary" : "bg-tertiary-fixed text-on-tertiary-fixed";
      return '<li class="apa-ref flex gap-md items-start border-b border-outline-variant last:border-b-0 pb-md">' +
        '<span class="' + tone + ' font-bold w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm">' + String(index + 1).padStart(2, "0") + "</span>" +
        '<div class="flex-1">' + editableText(objectTextField("items." + index, ref, ["text", "reference"]), ref.text || ref.reference, "text-body-md text-on-surface", "p") +
        editableText("items." + index + ".type", ref.type || "Referencia", "font-label-caps text-[10px] text-on-surface-variant uppercase mt-xs", "p") + "</div>" +
        "</li>";
    }).join("");
    return componentShell(id, component, '<ol class="space-y-md">' + refs + "</ol>", "", basePath);
  }

  function renderDownloads(id, component, basePath) {
    const docs = asArray(component.items).map(function (doc, index) {
      const isPdfPreview = doc.action === "pdf-preview";
      const titleField = basePath ? "items." + index + ".title" : "";
      const metaField = basePath ? "items." + index + ".meta" : "";
      const descriptionField = basePath ? "items." + index + ".description" : "";
      const buttonField = basePath ? "items." + index + ".buttonLabel" : "";
      const control = isPdfPreview
        ? '<button type="button" data-open-pdf-preview class="inline-flex items-center justify-center gap-sm py-sm px-lg font-label-caps text-label-caps rounded bg-primary text-on-primary hover:opacity-90 transition-opacity hard-shadow">' + icon("picture_as_pdf", "text-base") + editableText(buttonField, doc.buttonLabel || "Abrir vista PDF") + "</button>"
        : '<a href="' + attr(doc.href || "#") + '" ' + (doc.download === false ? "" : "download") + ' class="inline-flex items-center justify-center gap-sm py-sm px-lg font-label-caps text-label-caps rounded bg-primary text-on-primary hover:opacity-90 transition-opacity hard-shadow">' + icon("download", "text-base") + editableText(buttonField, doc.buttonLabel || "Descargar") + "</a>";
      return '<article class="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg hard-shadow flex flex-col">' +
        '<div class="flex items-start gap-md mb-md">' +
        '<span class="w-14 h-14 shrink-0 rounded-lg bg-error-container text-on-error-container flex items-center justify-center" aria-hidden="true">' + icon(doc.icon || "picture_as_pdf", "text-3xl") + "</span>" +
        '<div class="min-w-0">' + editableText(titleField, doc.title, "font-h3 text-[20px] text-primary leading-tight", "h3") +
        editableText(metaField, doc.meta || "PDF", "font-label-caps text-[10px] text-on-surface-variant uppercase mt-xs", "p") + "</div>" +
        "</div>" +
        editableText(descriptionField, doc.description || "", "text-sm text-on-surface-variant mb-lg flex-1", "p") +
        control +
        "</article>";
    }).join("");
    const readOnly = !basePath;
    return '<section id="' + attr(id) + '"' + editScope(basePath) + ' data-component-type="' + attr(component.type || "downloads") + '" class="space-y-md">' +
      sectionTitle(component, readOnly) +
      sectionDescription(component, readOnly) +
      '<div class="grid grid-cols-1 md:grid-cols-2 gap-lg">' + docs + "</div>" +
      "</section>";
  }

  function renderComponent(sectionId, id, component, readOnly) {
    const type = String(component.type || "").toLowerCase();
    const basePath = readOnly ? "" : "scorm.sections." + sectionId + ".components." + id;
    const renderers = {
      objectives: renderObjectives,
      "learning-objectives": renderObjectives,
      "theory-block": renderTheoryBlock,
      theory: renderTheoryBlock,
      "concept-block": renderTheoryBlock,
      "prior-knowledge": renderPriorKnowledge,
      accordion: renderAccordion,
      flashcards: renderFlashcards,
      carousel: renderCarousel,
      formula: renderFormula,
      table: renderTable,
      stepper: renderStepper,
      chart: renderChart,
      code: renderCode,
      video: renderVideo,
      metrics: renderMetrics,
      podcast: renderPodcast,
      timeline: renderTimeline,
      tabs: renderTabs,
      image: renderImageFigure,
      figure: renderImageFigure,
      "visual-prompt": renderImageFigure,
      quiz: renderQuiz,
      "knowledge-check": renderQuiz,
      "evaluation-activity": renderEvaluationActivity,
      evaluation: renderEvaluationActivity,
      "listening-true-false": renderListeningTrueFalse,
      listening: renderListeningTrueFalse,
      matching: renderMatching,
      "word-match": renderMatching,
      "multi-select": renderMultiSelect,
      multiselect: renderMultiSelect,
      "fill-blank": renderFillBlank,
      "fill-in-the-blank": renderFillBlank,
      reflection: renderReflection,
      summary: renderSummary,
      callout: renderCallout,
      references: renderReferences,
      downloads: renderDownloads
    };
    const renderer = renderers[type];
    if (renderer) return renderer(id, component, basePath);

    return componentShell(id, component, '<p class="text-sm text-on-surface-variant">Tipo de componente no soportado: <code class="font-code">' + escapeHtml(type || "sin tipo") + "</code></p>", "", basePath);
  }

  function renderSection(sectionId, section) {
    const readOnly = !!section._generated;
    const componentOrder = section.componentOrder || Object.keys(section.components || {});
    const components = componentOrder.map(function (componentId) {
      const component = section.components && section.components[componentId];
      return component ? renderComponent(sectionId, componentId, component, readOnly) : "";
    }).join("");
    const headerScope = readOnly ? "" : ' data-edit-scope="scorm.sections.' + attr(sectionId) + '"';
    const badge = section.badge || section.navLabel || section.title;
    const title = section.title || section.navLabel;
    const badgeHtml = readOnly
      ? '<span class="font-label-caps text-label-caps bg-secondary-fixed text-primary px-base py-xs rounded inline-block mb-md">' + rich(badge) + "</span>"
      : editableText(objectTextField("", section, ["badge", "navLabel", "title"]), badge, "font-label-caps text-label-caps bg-secondary-fixed text-primary px-base py-xs rounded inline-block mb-md");
    const titleHtml = readOnly
      ? '<h1 class="font-h1 text-h1 text-primary mb-md">' + rich(title) + "</h1>"
      : editableText(objectTextField("", section, ["title", "navLabel"]), title, "font-h1 text-h1 text-primary mb-md", "h1");
    const introHtml = readOnly
      ? asArray(section.intro || section.description).map(function (item) {
        return '<p class="text-on-surface-variant">' + rich(item) + "</p>";
      }).join("")
      : paragraphList(section.intro || section.description, "text-on-surface-variant", section.intro ? "intro" : "description");

    return '<section id="' + attr(sectionId) + '" class="theme-section space-y-lg hidden" data-theme-panel="' + attr(sectionId) + '" data-section-kind="' + attr(section.kind || "theory") + '">' +
      '<header class="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg hard-shadow"' + headerScope + ">" +
      badgeHtml +
      titleHtml +
      '<div class="space-y-sm max-w-3xl">' + introHtml + "</div>" +
      "</header>" +
      components +
      "</section>";
  }

  function isIntroSection(sectionId, section) {
    const id = String(sectionId || "").toLowerCase();
    const kind = String((section && section.kind) || "").toLowerCase();
    return id === "intro" || id.indexOf("intro") === 0 || kind === "intro" || kind === "introduction";
  }

  function navSectionNumber(sectionId, section, thematicIndex) {
    const idMatch = String(sectionId || "").match(/(?:seccion|section|tema|fase)[-_ ]?([1-5])$/i);
    if (idMatch) return idMatch[1];
    return String(Math.min(5, Math.max(1, thematicIndex + 1)));
  }

  function renderTheoryNav(sectionId, section, thematicIndex, active) {
    const intro = isIntroSection(sectionId, section);
    const sectionNumber = intro ? "" : navSectionNumber(sectionId, section, thematicIndex);
    const pill = intro
      ? '<span class="w-6 h-6 shrink-0 flex items-center justify-center text-secondary">' + icon("flag", "text-base") + "</span>"
      : '<span data-nav-pill class="w-6 h-6 shrink-0 rounded-full overflow-hidden ' + (active ? "bg-secondary-fixed text-primary" : "bg-surface-container-high text-on-surface-variant") + ' font-bold text-xs leading-none flex items-center justify-center text-center">' + escapeHtml(sectionNumber) + "</span>";
    return '<li><a href="#' + attr(sectionId) + '" data-section="' + attr(sectionId) + '"' + (active ? ' aria-current="true"' : "") + ' class="theme-link flex items-center gap-sm px-base py-sm rounded border-l-4 border-transparent text-on-surface hover:bg-surface-container-high transition-colors">' +
      pill +
      '<span data-nav-label class="truncate">' + rich(section.navLabel || section.title) + "</span>" +
      "</a></li>";
  }

  function renderMaterialNav(sectionId, section) {
    return '<li><a href="#' + attr(sectionId) + '" data-section="' + attr(sectionId) + '" class="theme-link material-link flex items-center gap-sm px-base py-sm rounded border-l-4 border-transparent text-on-surface hover:bg-surface-container-high transition-colors">' +
      icon(section.icon || "menu_book", "text-secondary text-xl") +
      '<span data-nav-label>' + rich(section.navLabel || section.title) + "</span>" +
      "</a></li>";
  }

  function orderedSections(content) {
    const source = content.sections ? content : scormContent(content);
    const sections = source.sections || {};
    return asArray(source.sectionOrder || Object.keys(sections)).map(function (sectionId) {
      return [sectionId, sections[sectionId]];
    }).filter(function (entry) {
      return !!entry[1];
    });
  }

  function orderedScormSections(content) {
    const source = scormContent(content);
    const entries = orderedSections(source);
    if (hasPdfGuide(content) && !(source.sections || {})["material-pdf"]) {
      entries.push(["material-pdf", pdfGuideSection(content)]);
    }
    return entries;
  }

  function renderNavigation(content) {
    const theoryNav = byId("theory-nav");
    const materialNav = byId("material-nav");
    const entries = orderedScormSections(content);
    const theory = entries.filter(function (entry) { return (entry[1].kind || "theory") !== "material"; });
    const material = entries.filter(function (entry) { return (entry[1].kind || "theory") === "material"; });

    if (theoryNav) {
      let thematicIndex = 0;
      theoryNav.innerHTML = theory.map(function (entry, index) {
        const currentIndex = thematicIndex;
        if (!isIntroSection(entry[0], entry[1])) thematicIndex += 1;
        return renderTheoryNav(entry[0], entry[1], currentIndex, index === 0);
      }).join("");
    }
    if (materialNav) {
      materialNav.innerHTML = material.map(function (entry) {
        return renderMaterialNav(entry[0], entry[1]);
      }).join("");
    }
  }

  function renderMetadata(content) {
    const subject = content.subject || {};
    const title = firstText(subject.title, "Plantilla JSON SCORM/PDF");
    const program = firstText(subject.program, "Programa academico");
    const contentNumber = firstText(subject.contentNumber, "01");

    document.title = title + " · Contenido " + contentNumber;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && subject.description) metaDescription.setAttribute("content", subject.description);

    const values = {
      "sidebar-subject-title": title,
      "sidebar-content-number": contentNumber,
      "banner-subject-program": title + " · " + program,
      "banner-content-label": "Contenido " + contentNumber,
      "banner-content-number": contentNumber,
      "theory-nav-label": scormContent(content).labels.theoryNav || "Contenido Teorico",
      "material-nav-label": scormContent(content).labels.materialNav || "Material Complementario"
    };

    Object.keys(values).forEach(function (id) {
      const node = byId(id);
      if (node) node.textContent = values[id];
    });
  }

  function validateContent(content) {
    if (!content || typeof content !== "object") throw new Error("El JSON no es un objeto valido.");
    const source = scormContent(content);
    if (!source.sections || typeof source.sections !== "object") throw new Error("El JSON debe incluir scorm.sections.");
    if (!orderedSections(source).length) throw new Error("El JSON no contiene secciones SCORM renderizables.");
  }

  function renderContent(content) {
    validateContent(content);
    currentContent = JSON.parse(JSON.stringify(content));
    renderMetadata(content);
    renderNavigation(content);

    const root = byId("content-root");
    const loading = byId("loading-state");
    if (!root) return;

    root.innerHTML = orderedScormSections(content).map(function (entry) {
      return renderSection(entry[0], entry[1]);
    }).join("");

    if (loading) loading.classList.add("hidden");
    document.dispatchEvent(new CustomEvent("subject:content-rendered", { detail: { content: currentContent } }));
  }

  function renderError(error) {
    const root = byId("content-root");
    const loading = byId("loading-state");
    if (loading) loading.classList.add("hidden");
    if (!root) return;
    root.innerHTML = '<section class="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg hard-shadow">' +
      '<span class="font-label-caps text-label-caps bg-error-container text-on-error-container px-base py-xs rounded inline-block mb-md">JSON</span>' +
      '<h1 class="font-h1 text-h1 text-primary mb-md">No se pudo cargar el contenido</h1>' +
      '<p class="text-on-surface-variant max-w-2xl mb-md">' + escapeHtml(error.message || error) + "</p>" +
      '<p class="text-sm text-on-surface-variant max-w-2xl">Sirve esta carpeta con un servidor local, carga un archivo JSON desde la barra superior o llama <code class="font-code">window.loadSubjectContent(json)</code> desde otro script.</p>' +
      "</section>";
  }

  async function loadJson() {
    if (window.SUBJECT_CONTENT) return window.SUBJECT_CONTENT;
    if (window.SUBJECT_DEFAULT_CONTENT) return window.SUBJECT_DEFAULT_CONTENT;

    const params = new URLSearchParams(window.location.search);
    const source = params.get("content");
    if (!source) return null;
    const response = await fetch(source, { cache: "no-store" });
    if (!response.ok) throw new Error("No se encontro " + source + " (" + response.status + ").");
    return response.json();
  }

  function start() {
    loadJson().then(function (content) {
      if (content) renderContent(content);
    }).catch(renderError);
  }

  window.loadSubjectContent = renderContent;
  window.setSubjectContentSnapshot = function (content) {
    currentContent = content ? JSON.parse(JSON.stringify(content)) : null;
  };
  window.getSubjectContent = function () {
    return currentContent ? JSON.parse(JSON.stringify(currentContent)) : null;
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
