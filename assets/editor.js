/* ===========================================================================
   Plantilla JSON SCORM/PDF - Herramientas de autoria, PDF y SCORM.
   =========================================================================== */
(function () {
  "use strict";

  const state = {
    content: null,
    selectedSectionId: null,
    selectedComponentId: null
  };

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

  function qs(selector, root) {
    return (root || document).querySelector(selector);
  }

  function qsa(selector, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(selector));
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
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

  function asArray(value) {
    if (Array.isArray(value)) return value;
    if (value == null || value === "") return [];
    return [value];
  }

  function pretty(value) {
    return JSON.stringify(value, null, 2);
  }

  function setStatus(message, ok) {
    const status = qs("#json-status");
    if (!status) return;
    status.textContent = message || "";
    status.classList.toggle("text-secondary", !!ok);
    status.classList.toggle("text-error", ok === false);
  }

  function orderedSections(content) {
    const sections = content.sections || {};
    return asArray(content.sectionOrder || Object.keys(sections)).filter(function (id) {
      return !!sections[id];
    });
  }

  function scormContent(content) {
    const scorm = content.scorm || {};
    return {
      labels: scorm.labels || content.labels || {},
      sectionOrder: scorm.sectionOrder || content.sectionOrder || [],
      sections: scorm.sections || content.sections || {}
    };
  }

  function pdfContent(content) {
    const pdf = content.pdf || {};
    return {
      sectionOrder: pdf.sectionOrder || [],
      sections: pdf.sections || {}
    };
  }

  function componentOrder(section) {
    const components = section.components || {};
    return asArray(section.componentOrder || Object.keys(components)).filter(function (id) {
      return !!components[id];
    });
  }

  function validateContent(content) {
    if (!content || typeof content !== "object") throw new Error("El JSON debe ser un objeto.");
    if (!content.subject || typeof content.subject !== "object") throw new Error("Falta la llave subject.");
    const scorm = scormContent(content);
    const pdf = pdfContent(content);
    const scormMediaTypes = ["image", "figure", "visual-prompt", "video", "podcast", "audio", "listening", "listening-true-false"];
    const scormTheoryTypes = ["theory-block", "concept-block", "theory"];
    if (!scorm.sections || typeof scorm.sections !== "object") throw new Error("Falta la llave scorm.sections.");
    if (!orderedSections(scorm).length) throw new Error("No hay secciones en scorm.sectionOrder.");
    if (!content.pdf || typeof content.pdf !== "object") throw new Error("Falta la llave pdf.");
    if (!pdf.sections || typeof pdf.sections !== "object") throw new Error("Falta la llave pdf.sections.");
    if (!orderedSections(pdf).length) throw new Error("No hay secciones en pdf.sectionOrder.");
    orderedSections(scorm).forEach(function (sectionId) {
      const section = scorm.sections[sectionId];
      let hasTheoryBeforeMedia = false;
      if (!section.title || !section.components) throw new Error("La sección " + sectionId + " no tiene title o components.");
      componentOrder(section).forEach(function (componentId) {
        const component = section.components[componentId];
        if (!component.type) throw new Error("El componente " + componentId + " no tiene type.");
        if (scormTheoryTypes.indexOf(component.type) !== -1) hasTheoryBeforeMedia = true;
        if (scormMediaTypes.indexOf(component.type) !== -1 && !hasTheoryBeforeMedia) {
          throw new Error("La sección " + sectionId + " usa el componente " + componentId + " antes de un bloque teórico. Agrega o mueve un theory-block/concept-block antes de recursos complementarios.");
        }
      });
    });
  }

  function blankTemplateContent() {
    return {
      subject: {
        id: "asignatura-sin-contenido",
        title: "[Nombre de la Asignatura]",
        program: "[Programa académico]",
        contentNumber: "01",
        description: "[Descripción breve de la asignatura.]",
        syllabus: {
          source: { type: "not-provided", fileName: "" },
          extractedFields: {},
          learningOutcomes: [],
          priorKnowledge: [],
          competencies: [],
          evaluationCriteria: [],
          topics: [],
          methodologyNotes: [],
          evaluationPlan: [],
          bibliography: { basic: [], complementary: [] },
          missingFields: []
        },
        methodology: {
          code: "",
          name: "[Metodología activa]",
          rationale: "[Justificación metodológica.]",
          moments: []
        }
      },
      scorm: {
        labels: {
          theoryNav: "Ruta de aprendizaje",
          materialNav: "Material complementario"
        },
        sectionOrder: ["tema-1"],
        sections: {
          "tema-1": {
            kind: "theory",
            theme: "1",
            badge: "Tema 1",
            navLabel: "[Nombre del tema]",
            title: "[Título del tema]",
            intro: [
              "[Introducción breve del tema.]"
            ],
            componentOrder: ["bloque-teorico", "recurso-visual", "cierre"],
            components: {
              "bloque-teorico": {
                type: "theory-block",
                title: "[Bloque de teoría]",
                eyebrow: "Base conceptual",
                body: [
                  "[Desarrollo teórico inicial.]",
                  "[Explicación complementaria.]"
                ],
                keyIdeas: [
                  { icon: "check_circle", text: "[Idea clave 1.]" },
                  { icon: "tips_and_updates", text: "[Idea clave 2.]" }
                ],
                sections: [
                  {
                    title: "[Subconcepto]",
                    body: ["[Explicación del subconcepto.]"]
                  }
                ],
                closing: ["[Cierre o conexión con la actividad.]"]
              },
              "recurso-visual": {
                type: "image",
                title: "[Recurso visual]",
                assetId: "recurso-visual-1",
                src: "",
                alt: "[Descripción accesible de la imagen.]",
                caption: "[Nota descriptiva de la imagen.]",
                prompt: "[Prompt para generar o diseñar la imagen antes de cargarla.]"
              },
              cierre: {
                type: "callout",
                title: "[Cierre formativo]",
                tone: "light",
                icon: "task_alt",
                body: ["[Indicación de cierre, reflexión o siguiente paso.]"]
              }
            }
          }
        }
      },
      pdf: {
        guideLabel: "GUÍA DE ESTUDIO VIRTUAL",
        kicker: "[Eje de aprendizaje] · [Práctica aplicada] · [Autoevaluación]",
        institution: "Universidad de América",
        year: "2026",
        title: "[Título del PDF]",
        subtitle: "[Subtítulo o alcance del contenido]",
        purpose: "[Propósito formativo del contenido.]",
        structure: "[Estructura de la guía.]",
        sectionOrder: ["pdf-tema-1"],
        sections: {
          "pdf-tema-1": {
            title: "[Título de la sección PDF]",
            intro: ["[Introducción de la sección imprimible.]"],
            componentOrder: ["pdf-teoria", "pdf-recurso-visual", "pdf-cierre"],
            components: {
              "pdf-teoria": {
                type: "text",
                title: "[Desarrollo teórico]",
                body: [
                  "[Párrafo teórico 1.]",
                  "[Párrafo teórico 2.]"
                ]
              },
              "pdf-recurso-visual": {
                type: "image",
                title: "[Recurso visual]",
                assetId: "recurso-visual-1",
                src: "",
                alt: "[Descripción accesible de la imagen.]",
                caption: "[Nota descriptiva de la imagen.]",
                prompt: "[Prompt para generar o diseñar la imagen antes de cargarla.]"
              },
              "pdf-cierre": {
                type: "callout",
                title: "[Cierre]",
                body: ["[Síntesis o recomendación final.]"]
              }
            }
          }
        }
      }
    };
  }

  function syncFromContent(content) {
    state.content = clone(content);
    const editor = qs("#json-editor");
    if (editor) editor.value = pretty(state.content);

    const subject = state.content.subject || {};
    const subjectTitle = qs("#subject-title-input");
    const subjectProgram = qs("#subject-program-input");
    const subjectContent = qs("#subject-content-input");
    if (subjectTitle) subjectTitle.value = subject.title || "";
    if (subjectProgram) subjectProgram.value = subject.program || "";
    if (subjectContent) subjectContent.value = subject.contentNumber || "";

    const scorm = scormContent(state.content);
    if (!state.selectedSectionId || !scorm.sections[state.selectedSectionId]) {
      state.selectedSectionId = orderedSections(scorm)[0] || null;
      state.selectedComponentId = null;
    }
    if (state.selectedSectionId && !state.selectedComponentId) {
      const section = scorm.sections[state.selectedSectionId];
      state.selectedComponentId = componentOrder(section)[0] || null;
    }
    renderStructureEditor();
    renderSelectedComponent();
  }

  function applyContent(content, message) {
    validateContent(content);
    state.content = clone(content);
    window.loadSubjectContent(state.content);
    setStatus(message || "JSON aplicado.", true);
  }

  function clearTemplate() {
    const ok = window.confirm("Esto limpiará el contenido cargado en la plantilla. No modifica archivos en disco hasta que descargues o reemplaces el JSON. ¿Continuar?");
    if (!ok) return;
    applyContent(blankTemplateContent(), "Plantilla limpiada.");
    openPanel();
    updateFullEditor();
    renderStructureEditor();
    renderSelectedComponent();
  }

  function openPanel() {
    const panel = qs("#json-editor-panel");
    if (panel) panel.classList.remove("translate-x-full");
  }

  function closePanel() {
    const panel = qs("#json-editor-panel");
    if (panel) panel.classList.add("translate-x-full");
  }

  function moveItem(list, id, delta) {
    const index = list.indexOf(id);
    const next = index + delta;
    if (index < 0 || next < 0 || next >= list.length) return false;
    const item = list.splice(index, 1)[0];
    list.splice(next, 0, item);
    return true;
  }

  function renderStructureEditor() {
    const host = qs("#structure-editor");
    if (!host || !state.content) return;
    const scorm = scormContent(state.content);
    host.innerHTML = orderedSections(scorm).map(function (sectionId) {
      const section = scorm.sections[sectionId];
      const components = componentOrder(section).map(function (componentId) {
        const component = section.components[componentId];
        const selected = state.selectedSectionId === sectionId && state.selectedComponentId === componentId;
        return '<div class="author-component-row ' + (selected ? "author-selected" : "") + '">' +
          '<button type="button" data-author-action="select-component" data-section-id="' + attr(sectionId) + '" data-component-id="' + attr(componentId) + '" class="author-row-label">' +
          '<span class="material-symbols-outlined text-base" aria-hidden="true">widgets</span>' +
          '<span class="truncate">' + escapeHtml(component.title || componentId) + '</span>' +
          '<span class="author-type-chip">' + escapeHtml(component.type || "custom") + "</span>" +
          "</button>" +
          '<button type="button" data-author-action="component-up" data-section-id="' + attr(sectionId) + '" data-component-id="' + attr(componentId) + '" class="author-row-btn" title="Subir">↑</button>' +
          '<button type="button" data-author-action="component-down" data-section-id="' + attr(sectionId) + '" data-component-id="' + attr(componentId) + '" class="author-row-btn" title="Bajar">↓</button>' +
          "</div>";
      }).join("");

      return '<div class="author-section-block">' +
        '<div class="author-section-row">' +
        '<button type="button" data-author-action="select-section" data-section-id="' + attr(sectionId) + '" class="author-row-label">' +
        '<span class="material-symbols-outlined text-base" aria-hidden="true">topic</span>' +
        '<span class="truncate">' + escapeHtml(section.navLabel || section.title || sectionId) + "</span>" +
        "</button>" +
        '<button type="button" data-author-action="section-up" data-section-id="' + attr(sectionId) + '" class="author-row-btn" title="Subir">↑</button>' +
        '<button type="button" data-author-action="section-down" data-section-id="' + attr(sectionId) + '" class="author-row-btn" title="Bajar">↓</button>' +
        "</div>" +
        '<div class="author-component-list">' + components + "</div>" +
        "</div>";
    }).join("");
  }

  function renderSelectedComponent() {
    const label = qs("#selected-component-label");
    const editor = qs("#component-editor");
    if (!label || !editor) return;
    if (!state.content || !state.selectedSectionId || !state.selectedComponentId) {
      label.textContent = "Selecciona un componente.";
      editor.value = "";
      return;
    }
    const scorm = scormContent(state.content);
    const component = scorm.sections[state.selectedSectionId].components[state.selectedComponentId];
    label.textContent = state.selectedSectionId + " · " + state.selectedComponentId + " · " + (component.type || "custom");
    editor.value = pretty(component);
  }

  function updateFullEditor() {
    const editor = qs("#json-editor");
    if (editor && state.content) editor.value = pretty(state.content);
  }

  function setValueAtPath(root, path, value) {
    const parts = String(path || "").split(".").filter(Boolean);
    if (!parts.length) return false;
    let target = root;
    for (let index = 0; index < parts.length - 1; index += 1) {
      const key = parts[index];
      const nextKey = parts[index + 1];
      if (target[key] == null) target[key] = /^\d+$/.test(nextKey) ? [] : {};
      target = target[key];
      if (target == null || typeof target !== "object") return false;
    }
    target[parts[parts.length - 1]] = value;
    return true;
  }

  function getValueAtPath(root, path) {
    const parts = String(path || "").split(".").filter(Boolean);
    let target = root;
    for (let index = 0; index < parts.length; index += 1) {
      if (target == null || typeof target !== "object") return null;
      target = target[parts[index]];
    }
    return target;
  }

  function isImageComponent(component) {
    const type = String(component && component.type || "").toLowerCase();
    return type === "image" || type === "figure" || type === "visual-prompt";
  }

  function syncImageAsset(content, assetId, src, fileName) {
    if (!assetId) return 0;
    let changed = 0;
    ["scorm", "pdf"].forEach(function (branch) {
      const source = content[branch];
      const sections = source && source.sections;
      if (!sections) return;
      Object.keys(sections).forEach(function (sectionId) {
        const components = sections[sectionId] && sections[sectionId].components;
        if (!components) return;
        Object.keys(components).forEach(function (componentId) {
          const component = components[componentId];
          if (isImageComponent(component) && component.assetId === assetId) {
            component.src = src;
            component.fileName = fileName || component.fileName || "";
            changed += 1;
          }
        });
      });
    });
    return changed;
  }

  function readImageFile(file) {
    return new Promise(function (resolve, reject) {
      const reader = new FileReader();
      reader.onload = function () { resolve(String(reader.result || "")); };
      reader.onerror = function () { reject(reader.error || new Error("No se pudo leer la imagen.")); };
      reader.readAsDataURL(file);
    });
  }

  function normalizeInlineText(value) {
    return String(value == null ? "" : value)
      .replace(/\u00a0/g, " ")
      .replace(/[ \t]+\n/g, "\n")
      .replace(/\n[ \t]+/g, "\n")
      .trim();
  }

  function inlineEditPath(node) {
    const editable = node && node.closest ? node.closest("[data-edit-field]") : null;
    if (!editable) return "";
    const scope = editable.closest("[data-edit-scope]");
    return [scope && scope.getAttribute("data-edit-scope"), editable.getAttribute("data-edit-field")]
      .filter(Boolean)
      .join(".");
  }

  function findSectionLink(sectionId) {
    return qsa("[data-section]").find(function (node) {
      return node.getAttribute("data-section") === sectionId;
    });
  }

  function updateNavigationLabelForPath(path) {
    const parts = String(path || "").split(".");
    if (parts[0] !== "scorm" || parts[1] !== "sections" || !parts[2]) return;
    const sectionId = parts[2];
    const field = parts[3];
    if (["title", "navLabel", "theme", "badge"].indexOf(field) === -1) return;
    const section = scormContent(state.content).sections[sectionId];
    const link = findSectionLink(sectionId);
    if (!section || !link) return;
    const label = qs("[data-nav-label]", link);
    const pill = qs("[data-nav-pill]", link);
    if (label) label.textContent = section.navLabel || section.title || sectionId;
    if (pill) pill.textContent = section.theme || (scormContent(state.content).sectionOrder.indexOf(sectionId) + 1);
  }

  function commitInlineEdit(editable, options) {
    if (!editable || !state.content) return;
    const path = inlineEditPath(editable);
    if (!path) return;
    const value = normalizeInlineText(editable.textContent);
    if (!setValueAtPath(state.content, path, value)) return;
    if (window.setSubjectContentSnapshot) window.setSubjectContentSnapshot(state.content);
    if (options && options.silent) return;
    updateNavigationLabelForPath(path);
    updateFullEditor();
    renderStructureEditor();
    renderSelectedComponent();
    setStatus("Texto actualizado en el JSON.", true);
  }

  function handleInlineEditInput(event) {
    const editable = event.target.closest("[data-edit-field]");
    if (editable) commitInlineEdit(editable, { silent: true });
  }

  function handleInlineEditBlur(event) {
    const editable = event.target.closest("[data-edit-field]");
    if (editable) commitInlineEdit(editable);
  }

  function handleInlineEditKeydown(event) {
    const editable = event.target.closest("[data-edit-field]");
    if (!editable) return;
    if (event.key === "Enter") {
      event.preventDefault();
      editable.blur();
    }
    if (event.key === "Escape") {
      event.preventDefault();
      editable.blur();
    }
  }

  function handleInlineEditClick(event) {
    const editable = event.target.closest("[data-edit-field]");
    if (!editable) return;
    event.stopPropagation();
    if (editable.closest("a,button,summary,label")) event.preventDefault();
  }

  async function handleImageUploadChange(event) {
    const input = event.target.closest("[data-image-upload]");
    if (!input) return;
    const file = input.files && input.files[0];
    if (!file) return;
    if (!/^image\//i.test(file.type || "")) {
      setStatus("El archivo seleccionado no es una imagen.", false);
      input.value = "";
      return;
    }
    try {
      state.content = state.content || window.getSubjectContent();
      const path = input.getAttribute("data-image-path");
      const assetId = input.getAttribute("data-image-asset-id") || "";
      const dataUrl = await readImageFile(file);
      if (!path || !getValueAtPath(state.content, path)) throw new Error("No se encontró el componente de imagen.");
      setValueAtPath(state.content, path + ".src", dataUrl);
      setValueAtPath(state.content, path + ".fileName", file.name);
      const synced = syncImageAsset(state.content, assetId, dataUrl, file.name);
      if (!synced) {
        const component = getValueAtPath(state.content, path);
        if (component) component.src = dataUrl;
      }
      applyContent(state.content, synced > 1 ? "Imagen cargada y sincronizada con PDF/SCORM." : "Imagen cargada en el componente.");
      updateFullEditor();
      renderSelectedComponent();
    } catch (err) {
      setStatus(err.message || "No se pudo cargar la imagen.", false);
    } finally {
      input.value = "";
    }
  }

  function handleImageClearClick(event) {
    const button = event.target.closest("[data-image-clear]");
    if (!button) return;
    event.preventDefault();
    state.content = state.content || window.getSubjectContent();
    const path = button.getAttribute("data-image-path");
    const assetId = button.getAttribute("data-image-asset-id") || "";
    if (!path || !getValueAtPath(state.content, path)) return;
    setValueAtPath(state.content, path + ".src", "");
    setValueAtPath(state.content, path + ".fileName", "");
    const synced = syncImageAsset(state.content, assetId, "", "");
    applyContent(state.content, synced > 1 ? "Imagen quitada en PDF/SCORM." : "Imagen quitada.");
    updateFullEditor();
    renderSelectedComponent();
  }

  function handleStructureClick(event) {
    const control = event.target.closest("[data-author-action]");
    if (!control || !state.content) return;
    const action = control.getAttribute("data-author-action");
    const sectionId = control.getAttribute("data-section-id");
    const componentId = control.getAttribute("data-component-id");

    if (action === "select-section") {
      state.selectedSectionId = sectionId;
      state.selectedComponentId = componentOrder(scormContent(state.content).sections[sectionId])[0] || null;
      renderStructureEditor();
      renderSelectedComponent();
      return;
    }

    if (action === "select-component") {
      state.selectedSectionId = sectionId;
      state.selectedComponentId = componentId;
      renderStructureEditor();
      renderSelectedComponent();
      return;
    }

    if (action === "section-up" || action === "section-down") {
      state.content.scorm = state.content.scorm || {};
      state.content.scorm.sectionOrder = orderedSections(scormContent(state.content));
      moveItem(state.content.scorm.sectionOrder, sectionId, action === "section-up" ? -1 : 1);
      applyContent(state.content, "Orden de secciones actualizado.");
      return;
    }

    if (action === "component-up" || action === "component-down") {
      const section = scormContent(state.content).sections[sectionId];
      section.componentOrder = componentOrder(section);
      moveItem(section.componentOrder, componentId, action === "component-up" ? -1 : 1);
      state.selectedSectionId = sectionId;
      state.selectedComponentId = componentId;
      applyContent(state.content, "Orden de componentes actualizado.");
    }
  }

  function updateSubjectFromFields() {
    if (!state.content) return;
    state.content.subject = state.content.subject || {};
    state.content.subject.title = qs("#subject-title-input").value;
    state.content.subject.program = qs("#subject-program-input").value;
    state.content.subject.contentNumber = qs("#subject-content-input").value;
    applyContent(state.content, "Datos de asignatura actualizados.");
  }

  function downloadBlob(name, blob) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  function downloadJson() {
    if (!state.content) return;
    downloadBlob("contenido-ova.json", new Blob([pretty(state.content)], { type: "application/json" }));
  }

  function icon(name) {
    return '<span class="material-symbols-outlined" aria-hidden="true">' + escapeHtml(name || "check") + "</span>";
  }

  function pdfText(items) {
    return asArray(items).map(function (item) {
      return "<p>" + escapeHtml(item) + "</p>";
    }).join("");
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

  function renderPdfComponent(component) {
    const type = String(component.type || "").toLowerCase();
    const interactiveTypes = [
      "quiz",
      "knowledge-check",
      "listening",
      "listening-true-false",
      "matching",
      "word-match",
      "multi-select",
      "multiselect",
      "fill-blank",
      "fill-in-the-blank",
      "video",
      "podcast",
      "flashcards",
      "carousel",
      "tabs"
    ];
    if (interactiveTypes.indexOf(type) !== -1) return "";

    const title = component.title ? '<h3 class="pdf-h3">' + escapeHtml(component.title) + "</h3>" : "";
    const description = component.description && type !== "chart" ? '<div class="pdf-muted">' + pdfText(component.description) + "</div>" : "";
    let body = "";

    if (type === "text" || type === "theory") {
      body = pdfText(component.body || component.content || component.paragraphs);
    } else if (type === "theory-block" || type === "concept-block") {
      const keyIdeas = asArray(component.keyIdeas || component.highlights).map(function (item) {
        return "<li>" + escapeHtml(item.text || item.label || item.title || item) + "</li>";
      }).join("");
      const sections = asArray(component.sections).map(function (section) {
        return '<div class="pdf-box"><h4>' + escapeHtml(section.title || section.label || "Idea") + "</h4>" +
          pdfText(section.body || section.content) +
          (section.formula ? '<div class="pdf-formula small" data-formula="' + attr(section.formula) + '"></div>' : "") +
          (section.formulaNote ? '<p class="pdf-muted">' + escapeHtml(section.formulaNote) + "</p>" : "") +
          "</div>";
      }).join("");
      const example = component.example ? '<div class="pdf-example"><h4>' + escapeHtml(component.example.title || component.example.label || "Ejemplo") + "</h4>" + pdfText(component.example.body || component.example.content) + "</div>" : "";
      body = pdfText(component.body || component.content || component.paragraphs) +
        (keyIdeas ? '<ul class="pdf-bullets">' + keyIdeas + "</ul>" : "") +
        sections +
        example +
        (component.closing ? '<div class="pdf-callout">' + pdfText(component.closing) + "</div>" : "");
    } else if (type === "list") {
      const ordered = component.ordered ? "ol" : "ul";
      const cls = component.ordered ? "pdf-numbered" : "pdf-bullets";
      body = "<" + ordered + ' class="' + cls + '">' + asArray(component.items).map(function (item) {
        return "<li>" + escapeHtml(item.text || item.label || item.title || item) + "</li>";
      }).join("") + "</" + ordered + ">";
    } else if (type === "example") {
      body = '<div class="pdf-example">' + pdfText(component.context || component.body || component.content) +
        (component.formula ? '<div class="pdf-formula" data-formula="' + attr(component.formula) + '"></div>' : "") +
        (component.solution ? '<h4>Solución comentada</h4>' + pdfText(component.solution) : "") +
        "</div>";
    } else if (type === "callout") {
      body = '<div class="pdf-callout pdf-callout-' + attr(component.tone || "light") + '">' + pdfText(component.body || component.text || component.content) + "</div>";
    } else if (type === "exercise" || type === "exercise-set") {
      body = asArray(component.items || component.exercises).map(function (item, index) {
        return '<div class="pdf-practice"><h4>Ejercicio ' + (index + 1) + "</h4>" +
          pdfText(item.prompt || item.statement || item.body) +
          (item.formula ? '<div class="pdf-formula small" data-formula="' + attr(item.formula) + '"></div>' : "") +
          (item.answer ? '<p class="pdf-muted"><strong>Respuesta esperada:</strong> ' + escapeHtml(item.answer) + "</p>" : "") +
          "</div>";
      }).join("");
    } else if (type === "evaluation-activity" || type === "evaluation") {
      const feedback = component.feedback || {};
      const rubric = component.rubric || {};
      const meta = [
        ["RA", asArray(component.learningOutcomeIds || component.learningOutcomes || component.ra).join(", ")],
        ["Momento", component.evaluationMoment],
        ["Participacion", component.participationType],
        ["Tecnica", component.technique],
        ["Instrumento", component.instrument],
        ["Peso", component.weight]
      ].filter(function (item) { return item[1]; }).map(function (item) {
        return "<li><strong>" + escapeHtml(item[0]) + ":</strong> " + escapeHtml(item[1]) + "</li>";
      }).join("");
      const feedbackList = [
        ["Fortalezas", feedback.strengths],
        ["Por mejorar", feedback.improvement],
        ["Refuerzo", feedback.reinforcement],
        ["Siguiente paso", feedback.nextStep]
      ].filter(function (item) { return item[1]; }).map(function (item) {
        return "<li><strong>" + escapeHtml(item[0]) + ":</strong> " + escapeHtml(item[1]) + "</li>";
      }).join("");
      const rubricCriteria = asArray(rubric.criteria).map(function (criterion) {
        const descriptors = criterion.descriptors && typeof criterion.descriptors === "object"
          ? Object.keys(criterion.descriptors).map(function (level) {
            return "<li><strong>" + escapeHtml(level) + ":</strong> " + escapeHtml(criterion.descriptors[level]) + "</li>";
          }).join("")
          : "<li>" + escapeHtml(criterion.description || criterion.descriptors || "") + "</li>";
        return '<div class="pdf-box"><h4>' + escapeHtml(criterion.name || criterion.title || "Criterio") + '</h4><ul class="pdf-bullets">' + descriptors + "</ul></div>";
      }).join("");
      body = '<div class="pdf-box">' +
        (meta ? '<ul class="pdf-bullets">' + meta + "</ul>" : "") +
        (component.criterion ? "<p><strong>Criterio:</strong> " + escapeHtml(component.criterion) + "</p>" : "") +
        (component.evidence ? "<p><strong>Evidencia:</strong> " + escapeHtml(component.evidence) + "</p>" : "") +
        (feedbackList ? '<h4>Ruta de retroalimentacion</h4><ul class="pdf-bullets">' + feedbackList + "</ul>" : "") +
        (rubric.levels ? '<p class="pdf-muted"><strong>Niveles:</strong> ' + escapeHtml(asArray(rubric.levels).join(", ")) + "</p>" : "") +
        "</div>" + rubricCriteria;
    } else if (type === "objectives" || type === "summary") {
      body = '<ul class="pdf-bullets">' + asArray(component.items).map(function (item) {
        return "<li>" + escapeHtml(item.text || item.label || item.title || item) + "</li>";
      }).join("") + "</ul>";
    } else if (type === "prior-knowledge" || type === "reflection") {
      body = '<ol class="pdf-numbered">' + asArray(component.prompts || component.items).map(function (item) {
        return "<li>" + escapeHtml(item.text || item.label || item.title || item) + "</li>";
      }).join("") + "</ol>";
    } else if (type === "accordion") {
      body = asArray(component.items).map(function (item) {
        return '<div class="pdf-box"><h4>' + escapeHtml(item.title || item.label) + "</h4>" + pdfText(item.body || item.content) + "</div>";
      }).join("");
    } else if (type === "flashcards") {
      body = '<div class="pdf-grid">' + asArray(component.cards || component.items).map(function (card) {
        return '<div class="pdf-box"><h4>' + escapeHtml(card.term || card.front || card.title) + '</h4><p>' + escapeHtml(card.definition || card.back || card.body) + "</p></div>";
      }).join("") + "</div>";
    } else if (type === "carousel") {
      body = asArray(component.slides).map(function (slide, index) {
        return '<div class="pdf-box"><h4>Slide ' + (index + 1) + " · " + escapeHtml(slide.title || slide.label || "") + "</h4>" +
          (slide.formula ? '<div class="pdf-formula" data-formula="' + attr(slide.formula) + '"></div>' : pdfText(slide.body || slide.description)) +
          (slide.description && slide.formula ? '<p>' + escapeHtml(slide.description) + "</p>" : "") +
          "</div>";
      }).join("");
    } else if (type === "formula") {
      body = (component.context ? '<div class="pdf-muted">' + pdfText(component.context) + "</div>" : "") +
        '<div class="pdf-formula" data-formula="' + attr(component.latex || component.formula || "") + '"></div>' +
        '<ul class="pdf-bullets">' + asArray(component.variables).map(function (item) {
          return '<li><span data-formula-inline="' + attr(item.symbol || "") + '"></span>: ' + escapeHtml(item.description || "") + "</li>";
        }).join("") + "</ul>" +
        (component.explanation ? '<div class="pdf-box"><h4>Cómo leerla</h4>' + pdfText(component.explanation) + "</div>" : "");
    } else if (type === "table") {
      body = '<table class="pdf-table"><thead><tr>' + asArray(component.columns).map(function (column) {
        return "<th>" + escapeHtml(column.label || column) + "</th>";
      }).join("") + "</tr></thead><tbody>" + asArray(component.rows).map(function (row) {
        return "<tr>" + asArray(row.cells || row).map(function (cell) {
          return "<td>" + escapeHtml(cell.badge || cell.text || cell.value || cell) + "</td>";
        }).join("") + "</tr>";
      }).join("") + "</tbody></table>";
    } else if (type === "stepper") {
      body = (component.statement ? '<p class="pdf-muted">' + escapeHtml(component.statement) + "</p>" : "") +
        '<ol class="pdf-numbered">' + asArray(component.steps).map(function (step) {
          return '<li><strong>' + escapeHtml(step.title) + "</strong>" + pdfText(step.body || step.description) +
            (step.formula ? '<div class="pdf-formula small" data-formula="' + attr(step.formula) + '"></div>' : "") + "</li>";
        }).join("") + "</ol>";
    } else if (type === "chart") {
      const config = { type: component.chartType || component.kind || "bar", data: { labels: component.labels || [], datasets: component.datasets || [] }, options: component.options || {} };
      const note = component.note || component.caption || component.descriptiveNote || component.description;
      body = '<figure class="pdf-chart-figure">' +
        '<div class="pdf-chart-wrap"><canvas data-pdf-chart="' + attr(JSON.stringify(config)) + '"></canvas></div>' +
        (note ? '<figcaption class="pdf-chart-note">' + pdfText(note) + "</figcaption>" : "") +
        "</figure>";
    } else if (type === "image" || type === "figure" || type === "visual-prompt") {
      const src = component.src || (component.image && component.image.src) || "";
      const prompt = component.prompt || component.imagePrompt || "";
      const alt = component.alt || (component.image && component.image.alt) || component.title || "Imagen del contenido";
      const caption = component.caption || component.note || component.description;
      body = '<figure class="pdf-image-figure">' +
        (src
          ? '<img src="' + attr(src) + '" alt="' + attr(alt) + '">'
          : '<div class="pdf-image-placeholder"><strong>Imagen pendiente</strong>' + (prompt ? pdfText(prompt) : '<p>Agrega la ruta de imagen en <code>src</code> desde el editor.</p>') + "</div>") +
        (caption ? '<figcaption>' + pdfText(caption) + "</figcaption>" : "") +
        "</figure>";
    } else if (type === "code") {
      const lang = languageClass(component.language);
      const instructions = component.instructions ? '<div class="pdf-box"><h4>Instrucciones</h4><ol class="pdf-numbered">' + asArray(component.instructions).map(function (item) {
        return "<li>" + escapeHtml(item.text || item.label || item.title || item) + "</li>";
      }).join("") + "</ol></div>" : "";
      body = instructions +
        '<div class="pdf-code-meta">' + escapeHtml(component.languageLabel || component.language || "") + " · " + escapeHtml(component.fileName || "") + '</div><pre class="pdf-code"><code class="language-' + attr(lang) + '">' + escapeHtml(component.code || "") + "</code></pre>" +
        (component.expectedOutput ? '<div class="pdf-callout"><h4>Resultado esperado</h4>' + pdfText(component.expectedOutput) + "</div>" : "");
    } else if (type === "metrics") {
      body = '<div class="pdf-grid">' + asArray(component.items).map(function (metric) {
        return '<div class="pdf-metric"><strong>' + escapeHtml(metric.value) + "</strong><span>" + escapeHtml(metric.label) + "</span></div>";
      }).join("") + "</div>";
    } else if (type === "timeline") {
      body = '<ol class="pdf-numbered">' + asArray(component.items).map(function (item) {
        return '<li><strong>' + escapeHtml(item.date || item.label) + " · " + escapeHtml(item.title) + "</strong><p>" + escapeHtml(item.body || item.description) + "</p></li>";
      }).join("") + "</ol>";
    } else if (type === "references") {
      body = '<ol class="pdf-numbered">' + asArray(component.items).map(function (ref) { return "<li>" + escapeHtml(ref.text || ref.reference) + "</li>"; }).join("") + "</ol>";
    } else if (type === "downloads") {
      body = '<ul class="pdf-bullets">' + asArray(component.items).map(function (doc) { return "<li>" + escapeHtml(doc.title) + " · " + escapeHtml(doc.meta || "") + "</li>"; }).join("") + "</ul>";
    } else {
      body = '<div class="pdf-box"><p>' + escapeHtml(type || "custom") + "</p></div>";
    }

    return '<section class="pdf-component">' + title + description + body + "</section>";
  }

  function buildPdfHtml(content) {
    const subject = content.subject || {};
    const pdf = content.pdf || {};
    const pdfSource = pdfContent(content);
    const institution = pdf.institution || "[Institución]";
    const logoBlack = new URL("assets/logo-negro.png", window.location.href).href;
    const sections = orderedSections(pdfSource).map(function (sectionId, index) {
      const section = pdfSource.sections[sectionId];
      const components = componentOrder(section).map(function (componentId) {
        return renderPdfComponent(section.components[componentId]);
      }).filter(Boolean).join("");
      return '<article id="' + attr(sectionId) + '" class="pdf-page-section">' +
        '<header class="pdf-running-header"><strong>' + escapeHtml(subject.title || "[Asignatura]") + '</strong><span>' + escapeHtml(institution) + "</span></header>" +
        '<h2 class="pdf-h2">' + (index + 1) + " " + escapeHtml(section.title || section.navLabel || sectionId) + "</h2>" +
        '<div class="pdf-intro">' + pdfText(section.intro || section.description) + "</div>" +
        components +
        "</article>";
    }).join("");

    const toc = orderedSections(pdfSource).map(function (sectionId, index) {
      const section = pdfSource.sections[sectionId];
      return '<li><a href="#' + attr(sectionId) + '">' + (index + 1) + ". " + escapeHtml(section.title || section.navLabel || sectionId) + "</a></li>";
    }).join("");

    return '<!doctype html><html lang="es"><head><meta charset="utf-8"><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><title>PDF · ' + escapeHtml(subject.title || "Asignatura") + '</title>' +
      '<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet">' +
      '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css">' +
      '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css">' +
      '<script src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js"><\/script><script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.3/dist/chart.umd.min.js"><\/script><script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"><\/script>' +
      '<style>' + pdfCss() + '</style></head><body>' +
      '<button class="print-btn" onclick="window.print()">Imprimir / guardar PDF</button>' +
      '<section class="pdf-cover"><aside><img src="' + attr(logoBlack) + '" alt="Universidad de América"><div><strong>' + escapeHtml(institution) + '</strong><span>' + escapeHtml(pdf.year || "[Año]") + '</span></div></aside><main>' +
      '<p class="pdf-cover-label">' + escapeHtml(pdf.guideLabel || "GUÍA DE ESTUDIO VIRTUAL") + '</p><p class="pdf-cover-kicker">' + escapeHtml(pdf.kicker || "Aprendizaje guiado · Práctica aplicada · Autoevaluación") + '</p>' +
      '<hr><h2>' + escapeHtml(subject.title || "[Nombre de la Asignatura]") + '</h2><h1>' + escapeHtml(pdf.title || subject.title || "[Título del PDF]") + '</h1><p class="pdf-cover-subtitle">' + escapeHtml(pdf.subtitle || "[Subtítulo del contenido]") + '</p>' +
      '<div class="pdf-cover-bottom"><h3>PROPÓSITO FORMATIVO</h3><p>' + escapeHtml(pdf.purpose || "[Propósito formativo.]") + '</p><h3>ESTRUCTURA</h3><p>' + escapeHtml(pdf.structure || "[Estructura del contenido.]") + '</p></div>' +
      '</main></section>' +
      '<section class="pdf-toc" id="contenido"><img src="' + attr(logoBlack) + '" alt=""><h1>Contenido</h1><ol>' + toc + '</ol></section>' +
      sections +
      '<script>window.addEventListener("load",function(){document.querySelectorAll("[data-formula]").forEach(function(el){try{katex.render(el.getAttribute("data-formula"),el,{displayMode:true,throwOnError:false})}catch(e){el.textContent=el.getAttribute("data-formula")}});document.querySelectorAll("[data-formula-inline]").forEach(function(el){try{katex.render(el.getAttribute("data-formula-inline"),el,{displayMode:false,throwOnError:false})}catch(e){el.textContent=el.getAttribute("data-formula-inline")}});document.querySelectorAll("[data-pdf-chart]").forEach(function(canvas){try{new Chart(canvas.getContext("2d"),JSON.parse(canvas.getAttribute("data-pdf-chart")))}catch(e){}});if(window.hljs){document.querySelectorAll("pre code").forEach(function(code){hljs.highlightElement(code)})}});<\/script>' +
      "</body></html>";
  }

  function pdfCss() {
    return `
      @page {
        size: 8.5in 11in;
        margin: 12mm 14mm 14mm;
      }
      * {
        box-sizing: border-box;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      html,
      body {
        margin: 0;
        background: #eef0ec;
        color: #172006;
        font-family: Inter, Arial, sans-serif;
        font-size: 10pt;
        line-height: 1.42;
      }
      body {
        overflow-wrap: break-word;
      }
      .print-btn {
        position: fixed;
        right: 18px;
        top: 18px;
        z-index: 9;
        background: #172006;
        color: #fff;
        border: 0;
        border-radius: 4px;
        padding: 9px 13px;
        font: 700 10pt Montserrat, sans-serif;
      }
      .pdf-cover,
      .pdf-toc,
      .pdf-page-section {
        width: 100%;
        background: #fff;
      }
      .pdf-cover {
        height: 238mm;
        max-height: 238mm;
        display: grid;
        grid-template-columns: 43mm 1fr;
        break-after: page;
        page-break-after: always;
        break-inside: avoid;
        page-break-inside: avoid;
        overflow: hidden;
      }
      .pdf-cover aside {
        color: #172006;
        padding: 16mm 7mm;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border-right: 3mm solid #c0f500;
        box-shadow: 1.2mm 0 0 #f0b300;
      }
      .pdf-cover aside img {
        width: 31mm;
        max-width: 100%;
        height: auto;
      }
      .pdf-cover aside strong {
        display: block;
        font: 800 10pt Montserrat, sans-serif;
      }
      .pdf-cover aside span {
        display: block;
        margin-top: 3mm;
        color: #73786f;
      }
      .pdf-cover main {
        min-width: 0;
        padding: 22mm 14mm 16mm;
        display: flex;
        flex-direction: column;
      }
      .pdf-cover-label {
        margin: 0 0 5mm;
        font: 800 9.5pt Montserrat, sans-serif;
        text-transform: uppercase;
        letter-spacing: .03em;
      }
      .pdf-cover-kicker {
        margin: 0;
        color: #62685f;
        font-size: 11pt;
        max-width: 112mm;
      }
      .pdf-cover hr {
        width: 100%;
        border: 0;
        border-top: 1px solid #d6d9ce;
        margin: 18mm 0 10mm;
      }
      .pdf-cover h2 {
        margin: 0 0 4mm;
        font: 700 13pt Montserrat, sans-serif;
        overflow-wrap: anywhere;
      }
      .pdf-cover h1 {
        margin: 0 0 5mm;
        font: 800 25pt/1.05 Montserrat, sans-serif;
        max-width: 118mm;
        overflow-wrap: anywhere;
      }
      .pdf-cover-subtitle {
        margin: 0;
        color: #30362d;
        font-size: 12pt;
        max-width: 116mm;
      }
      .pdf-cover-bottom {
        margin-top: auto;
        max-width: 118mm;
        padding-top: 10mm;
      }
      .pdf-cover-bottom h3 {
        margin: 0 0 2mm;
        font: 800 9.5pt Montserrat, sans-serif;
        text-transform: uppercase;
      }
      .pdf-cover-bottom p {
        margin: 0 0 5mm;
        color: #555b51;
      }
      .pdf-toc {
        min-height: 238mm;
        break-after: page;
        page-break-after: always;
        padding: 16mm 8mm;
      }
      .pdf-toc img {
        width: 36mm;
        margin-bottom: 12mm;
      }
      .pdf-toc h1 {
        margin: 0 0 5mm;
        font: 800 22pt Montserrat, sans-serif;
      }
      .pdf-toc h1:after,
      .pdf-h2:after {
        content: '';
        display: block;
        width: 28mm;
        border-bottom: 2px solid #c0f500;
        margin-top: 3mm;
      }
      .pdf-toc ol {
        list-style: none;
        padding: 0;
        margin: 10mm 0;
      }
      .pdf-toc li {
        margin: 4mm 0;
        font: 700 11pt Montserrat, sans-serif;
      }
      .pdf-toc a {
        color: #172006;
        text-decoration: none;
      }
      .pdf-toc a:hover {
        color: #4f6600;
        text-decoration: underline;
      }
      .pdf-page-section {
        padding-top: 0;
        margin-bottom: 7mm;
      }
      .pdf-running-header {
        display: flex;
        justify-content: space-between;
        gap: 10mm;
        border-bottom: 1px solid #dde1d7;
        padding-bottom: 3.5mm;
        margin-bottom: 6mm;
        color: #777d72;
        font-size: 9pt;
      }
      .pdf-running-header strong {
        color: #172006;
      }
      .pdf-h2 {
        margin: 0 0 6mm;
        font: 800 16pt Montserrat, sans-serif;
        overflow-wrap: anywhere;
      }
      .pdf-h3 {
        margin: 6mm 0 2.5mm;
        color: #172006;
        font: 800 11.5pt Montserrat, sans-serif;
      }
      .pdf-intro p,
      .pdf-component p {
        margin: 0 0 3mm;
      }
      .pdf-component {
        margin: 4.5mm 0;
      }
      .pdf-muted {
        color: #5f655b;
      }
      .pdf-box {
        border: 1px solid #dfe4d9;
        border-left: 2.5mm solid #c0f500;
        border-radius: 3px;
        padding: 3mm;
        margin: 3mm 0;
        background: #fff;
        break-inside: avoid;
        page-break-inside: avoid;
      }
      .pdf-box h4 {
        margin: 0 0 2mm;
        font: 800 10.5pt Montserrat, sans-serif;
      }
      .pdf-example,
      .pdf-practice,
      .pdf-callout {
        border: 1px solid #dfe4d9;
        border-radius: 3px;
        padding: 3mm;
        margin: 3mm 0;
        break-inside: avoid;
        page-break-inside: avoid;
      }
      .pdf-example {
        background: #eaf9fc;
        border-left: 2.5mm solid #00a8b8;
      }
      .pdf-practice {
        background: #f4ffd7;
        border-left: 2.5mm solid #c0f500;
      }
      .pdf-callout {
        background: #fff;
        border-left: 2.5mm solid #c0f500;
      }
      .pdf-callout-warning,
      .pdf-callout-error {
        background: #fff1e6;
        border-left-color: #ff7900;
      }
      .pdf-callout-dark {
        background: #172006;
        border-left-color: #c0f500;
        color: #fff;
      }
      .pdf-example h4,
      .pdf-practice h4,
      .pdf-callout h4 {
        margin: 0 0 2mm;
        font: 800 10.5pt Montserrat, sans-serif;
      }
      .pdf-bullets,
      .pdf-numbered {
        margin: 2mm 0 2mm 6mm;
        padding-left: 4mm;
      }
      .pdf-bullets li,
      .pdf-numbered li {
        margin: 1.2mm 0;
      }
      .pdf-bullets li::marker {
        color: #9ed800;
      }
      .pdf-table {
        width: 100%;
        table-layout: fixed;
        border-collapse: collapse;
        margin: 3mm 0;
        break-inside: avoid;
        page-break-inside: avoid;
        font-size: 9.5pt;
      }
      .pdf-table th {
        background: #172006;
        color: #fff;
        text-align: left;
      }
      .pdf-table th,
      .pdf-table td {
        border: 1px solid #dfe4d9;
        padding: 2.4mm;
        vertical-align: top;
      }
      .pdf-formula {
        background: #fff;
        border-left: 2mm solid #172006;
        padding: 3mm;
        margin: 3mm 0;
        overflow-x: auto;
        overflow-y: visible;
        break-inside: avoid;
        page-break-inside: avoid;
      }
      .pdf-formula .katex {
        font-size: 1.08em;
      }
      .pdf-formula.small .katex {
        font-size: .95em;
      }
      .pdf-chart-figure {
        width: 100%;
        margin: 4mm 0;
        break-inside: avoid;
        page-break-inside: avoid;
        text-align: center;
      }
      .pdf-chart-wrap {
        width: min(100%, 132mm);
        height: 58mm;
        margin: 3mm auto 2mm;
        break-inside: avoid;
        page-break-inside: avoid;
      }
      .pdf-chart-wrap canvas {
        display: block;
        margin: 0 auto;
      }
      .pdf-chart-note {
        width: min(100%, 132mm);
        margin: 0 auto;
        color: #5f655b;
        font-size: 8.8pt;
        line-height: 1.35;
        text-align: center;
      }
      .pdf-chart-note p {
        margin: 0;
      }
      .pdf-image-figure {
        width: 100%;
        margin: 4mm 0;
        break-inside: avoid;
        page-break-inside: avoid;
        text-align: center;
      }
      .pdf-image-figure img {
        display: block;
        max-width: min(100%, 138mm);
        max-height: 78mm;
        object-fit: contain;
        margin: 0 auto 2mm;
        border: 1px solid #dfe4d9;
        background: #fff;
      }
      .pdf-image-figure figcaption {
        width: min(100%, 138mm);
        margin: 0 auto;
        color: #5f655b;
        font-size: 8.8pt;
        line-height: 1.35;
      }
      .pdf-image-figure figcaption p {
        margin: 0;
      }
      .pdf-image-placeholder {
        width: min(100%, 138mm);
        min-height: 44mm;
        margin: 0 auto 2mm;
        border: 1px dashed #aeb4a8;
        border-left: 2.5mm solid #c0f500;
        background: #f7faef;
        padding: 4mm;
        text-align: left;
      }
      .pdf-image-placeholder strong {
        display: block;
        margin-bottom: 2mm;
        font: 800 9.5pt Montserrat, sans-serif;
        text-transform: uppercase;
      }
      .pdf-code-meta {
        color: #5f655b;
        font: 700 8.5pt Montserrat, sans-serif;
        text-transform: uppercase;
      }
      .pdf-code {
        background: #1e1e1e;
        color: #f5f5f5;
        padding: 3mm;
        border-radius: 3px;
        font-family: 'JetBrains Mono', Consolas, monospace;
        font-size: 8.5pt;
        white-space: pre-wrap;
        break-inside: avoid;
        page-break-inside: avoid;
      }
      .pdf-code code.hljs {
        background: transparent;
        padding: 0;
        white-space: pre-wrap;
      }
      .pdf-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 3mm;
      }
      .pdf-metric {
        background: #172006;
        color: #fff;
        border-radius: 3px;
        padding: 4mm;
      }
      .pdf-metric strong {
        display: block;
        color: #c0f500;
        font: 800 16pt Montserrat, sans-serif;
      }
      .pdf-metric span {
        font: 700 8.5pt Montserrat, sans-serif;
        text-transform: uppercase;
      }
      @media screen {
        body {
          padding: 16px 0;
        }
        .pdf-cover,
        .pdf-toc,
        .pdf-page-section {
          width: 8.5in;
          margin: 0 auto 16px;
          padding: 12mm 14mm 14mm;
          box-shadow: 0 10px 30px rgba(0,0,0,.18);
        }
        .pdf-cover,
        .pdf-toc {
          min-height: 11in;
        }
        .pdf-cover {
          padding: 0;
          min-height: auto;
        }
      }
      @media print {
        .print-btn {
          display: none;
        }
        html,
        body {
          background: #fff;
        }
        .pdf-page-section:last-child {
          break-after: auto;
          page-break-after: auto;
        }
        .pdf-page-section {
          break-after: auto;
          page-break-after: auto;
        }
      }
    `;
  }

  function openPdfPreview() {
    const content = state.content || (window.getSubjectContent && window.getSubjectContent());
    if (!content) return;
    state.content = clone(content);
    const html = buildPdfHtml(content);
    const url = URL.createObjectURL(new Blob(["\ufeff", html], { type: "text/html;charset=utf-8" }));
    window.open(url, "_blank", "noopener,noreferrer");
    window.setTimeout(function () { URL.revokeObjectURL(url); }, 60000);
  }

  function isLocalResource(value) {
    const text = String(value || "").trim();
    if (!text || text === "#") return false;
    if (/^(https?:|mailto:|tel:|data:|blob:)/i.test(text)) return false;
    return /^(assets\/|media\/|imagenes\/|images\/|audio\/|video\/|docs\/|downloads\/)/i.test(text);
  }

  function collectLocalResources(value, found) {
    if (Array.isArray(value)) {
      value.forEach(function (item) { collectLocalResources(item, found); });
      return found;
    }
    if (value && typeof value === "object") {
      Object.keys(value).forEach(function (key) {
        if (["src", "href", "poster", "thumbnail"].indexOf(key) !== -1 && isLocalResource(value[key])) {
          found.add(String(value[key]).replace(/^\.?\//, ""));
        }
        collectLocalResources(value[key], found);
      });
    }
    return found;
  }

  function scormManifest(title, resourceFiles) {
    const safeTitle = escapeHtml(title || "Asignatura");
    const files = Array.from(new Set(resourceFiles || [])).sort().map(function (file) {
      return '    <file href="' + attr(file) + '"/>\n';
    }).join("");
    return '<?xml version="1.0" encoding="UTF-8"?>\n' +
      '<manifest identifier="subject-json-scorm" version="1.0" xmlns="http://www.imsproject.org/xsd/imscp_rootv1p1p2" xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.imsproject.org/xsd/imscp_rootv1p1p2 imscp_rootv1p1p2.xsd http://www.adlnet.org/xsd/adlcp_rootv1p2 adlcp_rootv1p2.xsd">\n' +
      '  <metadata><schema>ADL SCORM</schema><schemaversion>1.2</schemaversion></metadata>\n' +
      '  <organizations default="org-1"><organization identifier="org-1"><title>' + safeTitle + '</title><item identifier="item-1" identifierref="res-1"><title>' + safeTitle + '</title></item></organization></organizations>\n' +
      '  <resources><resource identifier="res-1" type="webcontent" adlcp:scormtype="sco" href="index.html?content=content.json&amp;scorm=1">\n' +
      files +
      '  </resource></resources>\n' +
      '</manifest>';
  }

  async function exportScorm() {
    const content = state.content || (window.getSubjectContent && window.getSubjectContent());
    if (!content) return;
    state.content = clone(content);
    if (!window.JSZip) {
      setStatus("JSZip no está disponible. Revisa la conexión o el CDN.", false);
      return;
    }
    const zip = new window.JSZip();
    const baseFiles = [
      "index.html",
      "assets/theme.js",
      "assets/styles.css",
      "assets/sidebar.js",
      "assets/content-renderer.js",
      "assets/editor.js",
      "assets/logo-blanco.png",
      "assets/logo-negro.png"
    ];
    const localResources = Array.from(collectLocalResources(content, new Set()));
    const files = Array.from(new Set(baseFiles.concat(localResources)));

    for (const file of files) {
      const response = await fetch(file);
      if (!response.ok) throw new Error("No se pudo agregar " + file);
      zip.file(file, await response.blob());
    }

    zip.file("content.json", pretty(content));
    zip.file("guia-estudio.html", "\ufeff" + buildPdfHtml(content));
    zip.file("imsmanifest.xml", scormManifest(content.subject && content.subject.title, files.concat(["content.json", "guia-estudio.html"])));
    const blob = await zip.generateAsync({ type: "blob" });
    downloadBlob("scorm-package.zip", blob);
    setStatus("SCORM exportado.", true);
  }

  function attachEvents() {
    const fileInput = qs("#json-file-input");
    if (fileInput) {
      fileInput.addEventListener("change", function () {
        const file = fileInput.files && fileInput.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function () {
          try {
            applyContent(JSON.parse(String(reader.result)), "JSON cargado desde archivo.");
            openPanel();
          } catch (err) {
            setStatus(err.message, false);
          }
        };
        reader.readAsText(file, "utf-8");
      });
    }

    const panel = qs("#structure-editor");
    if (panel) panel.addEventListener("click", handleStructureClick);
    const clear = qs("#clear-template");
    if (clear) clear.addEventListener("click", clearTemplate);
    const toggle = qs("#editor-toggle");
    if (toggle) toggle.addEventListener("click", openPanel);
    const close = qs("#editor-close");
    if (close) close.addEventListener("click", closePanel);
    const sync = qs("#sync-editor");
    if (sync) sync.addEventListener("click", function () { syncFromContent(window.getSubjectContent()); setStatus("Editor sincronizado.", true); });

    ["#subject-title-input", "#subject-program-input", "#subject-content-input"].forEach(function (selector) {
      const input = qs(selector);
      if (input) input.addEventListener("change", updateSubjectFromFields);
    });

    const validateBtn = qs("#validate-json");
    if (validateBtn) validateBtn.addEventListener("click", function () {
      try {
        validateContent(JSON.parse(qs("#json-editor").value));
        setStatus("JSON válido.", true);
      } catch (err) {
        setStatus(err.message, false);
      }
    });

    const applyJson = qs("#apply-json");
    if (applyJson) applyJson.addEventListener("click", function () {
      try {
        applyContent(JSON.parse(qs("#json-editor").value), "JSON completo aplicado.");
      } catch (err) {
        setStatus(err.message, false);
      }
    });

    const applyComponent = qs("#apply-component-json");
    if (applyComponent) applyComponent.addEventListener("click", function () {
      if (!state.content || !state.selectedSectionId || !state.selectedComponentId) return;
      try {
        scormContent(state.content).sections[state.selectedSectionId].components[state.selectedComponentId] = JSON.parse(qs("#component-editor").value);
        applyContent(state.content, "Componente actualizado.");
      } catch (err) {
        setStatus(err.message, false);
      }
    });

    const download = qs("#download-json");
    if (download) download.addEventListener("click", downloadJson);
    const pdf = qs("#pdf-export");
    if (pdf) pdf.addEventListener("click", openPdfPreview);
    const scorm = qs("#scorm-export");
    if (scorm) scorm.addEventListener("click", function () {
      exportScorm().catch(function (err) { setStatus(err.message, false); });
    });

    document.addEventListener("input", handleInlineEditInput);
    document.addEventListener("blur", handleInlineEditBlur, true);
    document.addEventListener("keydown", handleInlineEditKeydown);
    document.addEventListener("click", handleInlineEditClick, true);
    document.addEventListener("change", handleImageUploadChange);
    document.addEventListener("click", handleImageClearClick);
    document.addEventListener("click", function (event) {
      const button = event.target.closest("[data-open-pdf-preview]");
      if (!button) return;
      event.preventDefault();
      openPdfPreview();
    });
  }

  if (!isScormRuntime()) {
    document.addEventListener("subject:content-rendered", function (event) {
      syncFromContent(event.detail.content);
    });

    attachEvents();
  }
})();
