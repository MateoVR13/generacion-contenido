/* ===========================================================================
   Plantilla JSON SCORM/PDF - Herramientas de autoria, PDF y SCORM.
   =========================================================================== */
(function () {
  "use strict";

  const state = {
    content: null,
    editorBranch: "scorm",
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

  // Convert inline LaTeX delimited by $...$ ($$...$$ for display math) in prose into KaTeX
  // placeholders rendered by the PDF load script. LaTeX travels in an attribute; prose is escaped.
  // Use this instead of escapeHtml for any learner-facing PDF text that may contain math.
  function mathText(value) {
    let raw = String(value == null ? "" : value);
    if (raw.indexOf("$") === -1) return escapeHtml(raw);
    // Protect a literal escaped \$ (e.g. prices) so it is never treated as a delimiter.
    const sentinel = " ESCD ";
    raw = raw.replace(/\\\$/g, sentinel);
    const pattern = /\$\$([\s\S]+?)\$\$|\$([^$]+?)\$/g;
    let out = "";
    let last = 0;
    let match;
    while ((match = pattern.exec(raw)) !== null) {
      out += escapeHtml(raw.slice(last, match.index));
      const display = match[1] != null;
      const latex = (display ? match[1] : match[2]).split(sentinel).join("$");
      const flag = display ? "data-math-block" : "data-math-inline";
      out += '<span class="inline-math" ' + flag + '="' + attr(latex) + '"></span>';
      last = pattern.lastIndex;
    }
    out += escapeHtml(raw.slice(last));
    return out.split(sentinel).join("$");
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

  // The structure editor can edit either the SCORM or the PDF branch. branchContent() returns the
  // currently-active branch so renderStructureEditor / selection / reorder all operate on it.
  function branchContent(content) {
    return state.editorBranch === "pdf" ? pdfContent(content) : scormContent(content);
  }

  function setEditorBranch(branch) {
    if (branch !== "scorm" && branch !== "pdf") return;
    if (state.editorBranch === branch) return;
    state.editorBranch = branch;
    // Reset selection to the first section/component of the newly active branch.
    state.selectedSectionId = null;
    state.selectedComponentId = null;
    if (state.content) {
      const src = branchContent(state.content);
      state.selectedSectionId = orderedSections(src)[0] || null;
      if (state.selectedSectionId) state.selectedComponentId = componentOrder(src.sections[state.selectedSectionId])[0] || null;
    }
    updateBranchTabs();
    renderStructureEditor();
    renderSelectedComponent();
    updateMainView();
  }

  function updateBranchTabs() {
    ["scorm", "pdf"].forEach(function (b) {
      const btn = qs('[data-editor-branch="' + b + '"]');
      if (btn) btn.classList.toggle("author-tab-active", state.editorBranch === b);
    });
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

    const branch = branchContent(state.content);
    if (!state.selectedSectionId || !branch.sections[state.selectedSectionId]) {
      state.selectedSectionId = orderedSections(branch)[0] || null;
      state.selectedComponentId = null;
    }
    if (state.selectedSectionId && !state.selectedComponentId) {
      const section = branch.sections[state.selectedSectionId];
      state.selectedComponentId = componentOrder(section)[0] || null;
    }
    updateBranchTabs();
    renderStructureEditor();
    renderSelectedComponent();
    updateMainView();
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
    updateMainView();
  }

  function closePanel() {
    const panel = qs("#json-editor-panel");
    if (panel) panel.classList.add("translate-x-full");
    updateMainView();
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
    const scorm = branchContent(state.content);
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
    const scorm = branchContent(state.content);
    const sec = scorm.sections[state.selectedSectionId];
    const component = sec && sec.components[state.selectedComponentId];
    if (!component) { label.textContent = "Selecciona un componente."; editor.value = ""; return; }
    label.textContent = state.editorBranch.toUpperCase() + " · " + state.selectedSectionId + " · " + state.selectedComponentId + " · " + (component.type || "custom");
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

  // Downscale + compress an uploaded image before embedding it as a data URL in the JSON.
  // Large originals embedded raw (multi-MB base64, duplicated across assetId matches and clones)
  // are what saturate the page. We cap the longest side and re-encode. PNGs with transparency
  // stay PNG; everything else becomes JPEG to keep the data URL small.
  const MAX_IMAGE_DIMENSION = 1600;
  const JPEG_QUALITY = 0.85;
  function loadImageElement(dataUrl) {
    return new Promise(function (resolve, reject) {
      const img = new Image();
      img.onload = function () { resolve(img); };
      img.onerror = function () { reject(new Error("No se pudo decodificar la imagen.")); };
      img.src = dataUrl;
    });
  }
  async function compressImageFile(file) {
    const original = await readImageFile(file);
    const isPng = /^image\/png$/i.test(file.type || "");
    // Animated GIFs and SVGs lose meaning if rasterized; keep them as-is.
    if (/^image\/(gif|svg\+xml)$/i.test(file.type || "")) return original;
    let img;
    try {
      img = await loadImageElement(original);
    } catch (err) {
      return original; // if it cannot be decoded, fall back to the raw data URL
    }
    const w = img.naturalWidth || img.width;
    const h = img.naturalHeight || img.height;
    if (!w || !h) return original;
    const scale = Math.min(1, MAX_IMAGE_DIMENSION / Math.max(w, h));
    const targetW = Math.max(1, Math.round(w * scale));
    const targetH = Math.max(1, Math.round(h * scale));
    const canvas = document.createElement("canvas");
    canvas.width = targetW;
    canvas.height = targetH;
    const ctx = canvas.getContext("2d");
    if (!ctx) return original;
    if (!isPng) { ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, targetW, targetH); }
    ctx.drawImage(img, 0, 0, targetW, targetH);
    let out;
    try {
      out = canvas.toDataURL(isPng ? "image/png" : "image/jpeg", isPng ? undefined : JPEG_QUALITY);
    } catch (err) {
      return original;
    }
    // Use whichever is smaller (re-encoding tiny images can grow them).
    return out && out.length < original.length ? out : original;
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
    const isPdf = path.indexOf("pdf.") === 0;
    if (!isPdf) updateNavigationLabelForPath(path);
    updateFullEditor();
    renderStructureEditor();
    renderSelectedComponent();
    // Refresh the embedded PDF preview on commit so structural labels/math re-render, but only on
    // blur (non-silent) to avoid stealing focus mid-typing.
    if (isPdf && state.editorBranch === "pdf") renderPdfPreview();
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

  // Collect the SCORM-branch image component paths that share an assetId (these have DOM nodes
  // in the main view and need a partial re-render). PDF components are updated in the content
  // snapshot but are not rendered in the main view, so they need no DOM update.
  function scormImagePathsForAsset(content, assetId, fallbackPath) {
    const paths = [];
    const sections = content && content.scorm && content.scorm.sections;
    if (assetId && sections) {
      Object.keys(sections).forEach(function (sectionId) {
        const components = sections[sectionId] && sections[sectionId].components;
        if (!components) return;
        Object.keys(components).forEach(function (componentId) {
          const component = components[componentId];
          if (isImageComponent(component) && component.assetId === assetId) {
            paths.push("scorm.sections." + sectionId + ".components." + componentId);
          }
        });
      });
    }
    if (!paths.length && fallbackPath && /^scorm\./.test(fallbackPath)) paths.push(fallbackPath);
    return paths;
  }

  // Apply an image change (set or clear src) without re-cloning/re-rendering the whole document.
  // Mutates the renderer's snapshot + the editor's copy, then re-renders only the affected nodes.
  function applyImageChange(path, assetId, src, fileName, message) {
    const content = window.getSubjectContent();
    if (!content || !getValueAtPath(content, path)) {
      setStatus("No se encontró el componente de imagen.", false);
      return;
    }
    setValueAtPath(content, path + ".src", src);
    setValueAtPath(content, path + ".fileName", fileName);
    const synced = syncImageAsset(content, assetId, src, fileName);
    if (!synced) {
      const component = getValueAtPath(content, path);
      if (component) { component.src = src; component.fileName = fileName; }
    }
    // Keep both snapshots in sync without a full re-render.
    state.content = content;
    if (window.setSubjectContentSnapshot) window.setSubjectContentSnapshot(content);
    // Partial DOM update for the affected SCORM image nodes.
    const paths = scormImagePathsForAsset(content, assetId, path);
    if (window.updateSubjectImage) window.updateSubjectImage(paths, { src: src, fileName: fileName });
    // Refresh only the selected-component editor view (cheap); skip dumping the whole document.
    renderSelectedComponent();
    setStatus(message + (synced > 1 ? " (sincronizada con PDF/SCORM)" : ""), true);
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
      const path = input.getAttribute("data-image-path");
      const assetId = input.getAttribute("data-image-asset-id") || "";
      const dataUrl = await compressImageFile(file);
      applyImageChange(path, assetId, dataUrl, file.name, "Imagen cargada.");
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
    const path = button.getAttribute("data-image-path");
    const assetId = button.getAttribute("data-image-asset-id") || "";
    applyImageChange(path, assetId, "", "", "Imagen quitada.");
  }

  function handleStructureClick(event) {
    const control = event.target.closest("[data-author-action]");
    if (!control || !state.content) return;
    const action = control.getAttribute("data-author-action");
    const sectionId = control.getAttribute("data-section-id");
    const componentId = control.getAttribute("data-component-id");

    const branchKey = state.editorBranch; // "scorm" | "pdf"

    if (action === "select-section") {
      state.selectedSectionId = sectionId;
      state.selectedComponentId = componentOrder(branchContent(state.content).sections[sectionId])[0] || null;
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
      state.content[branchKey] = state.content[branchKey] || {};
      state.content[branchKey].sectionOrder = orderedSections(branchContent(state.content));
      moveItem(state.content[branchKey].sectionOrder, sectionId, action === "section-up" ? -1 : 1);
      applyContent(state.content, "Orden de secciones actualizado.");
      return;
    }

    if (action === "component-up" || action === "component-down") {
      const section = branchContent(state.content).sections[sectionId];
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
      return "<p>" + mathText(item) + "</p>";
    }).join("");
  }

  // Chart.js renders axis/legend/dataset/title labels as PLAIN TEXT (no KaTeX). Convert any
  // LaTeX/$...$ in those fields to readable Unicode so charts never show raw "$\sigma$".
  // Rich notation belongs in chart title/note, not in labels.
  var CHART_LATEX_UNICODE = {
    "\\alpha": "α", "\\beta": "β", "\\gamma": "γ", "\\delta": "δ", "\\epsilon": "ε", "\\varepsilon": "ε",
    "\\zeta": "ζ", "\\eta": "η", "\\theta": "θ", "\\vartheta": "ϑ", "\\iota": "ι", "\\kappa": "κ",
    "\\lambda": "λ", "\\mu": "μ", "\\nu": "ν", "\\xi": "ξ", "\\pi": "π", "\\rho": "ρ", "\\sigma": "σ",
    "\\tau": "τ", "\\upsilon": "υ", "\\phi": "φ", "\\varphi": "φ", "\\chi": "χ", "\\psi": "ψ", "\\omega": "ω",
    "\\Gamma": "Γ", "\\Delta": "Δ", "\\Theta": "Θ", "\\Lambda": "Λ", "\\Xi": "Ξ", "\\Pi": "Π",
    "\\Sigma": "Σ", "\\Phi": "Φ", "\\Psi": "Ψ", "\\Omega": "Ω",
    "\\nabla": "∇", "\\partial": "∂", "\\infty": "∞", "\\times": "×", "\\cdot": "·", "\\pm": "±",
    "\\leq": "≤", "\\geq": "≥", "\\neq": "≠", "\\approx": "≈", "\\sim": "∼", "\\propto": "∝",
    "\\rightarrow": "→", "\\to": "→", "\\leftarrow": "←", "\\Rightarrow": "⇒", "\\sum": "Σ", "\\prod": "∏",
    "\\int": "∫", "\\sqrt": "√", "\\in": "∈", "\\forall": "∀", "\\exists": "∃", "\\circ": "∘"
  };
  var CHART_SUP = { "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹", "n": "ⁿ", "i": "ⁱ", "+": "⁺", "-": "⁻", "x": "ˣ", "y": "ʸ" };
  var CHART_SUB = { "0": "₀", "1": "₁", "2": "₂", "3": "₃", "4": "₄", "5": "₅", "6": "₆", "7": "₇", "8": "₈", "9": "₉", "i": "ᵢ", "j": "ⱼ", "n": "ₙ", "x": "ₓ", "a": "ₐ", "+": "₊", "-": "₋", "t": "ₜ" };
  function chartMapScript(seq, table) {
    var out = "";
    for (var i = 0; i < seq.length; i += 1) { if (table[seq[i]] == null) return null; out += table[seq[i]]; }
    return out;
  }
  function latexToPlainText(value) {
    if (typeof value !== "string" || (value.indexOf("$") === -1 && value.indexOf("\\") === -1 && value.indexOf("^") === -1 && value.indexOf("_") === -1)) return value;
    var s = String(value).replace(/\\\$/g, " DOLLAR ");
    s = s.replace(/\$\$?([^$]*)\$\$?/g, "$1");
    s = s.replace(/\\(?:left|right|displaystyle|text|mathrm|mathbf|operatorname)\b/g, "");
    s = s.replace(/\\frac\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g, "$1/$2");
    s = s.replace(/\\sqrt\s*\{([^{}]*)\}/g, "√($1)");
    Object.keys(CHART_LATEX_UNICODE).forEach(function (cmd) { s = s.split(cmd).join(CHART_LATEX_UNICODE[cmd]); });
    s = s.replace(/\^\{([^{}]*)\}|\^(\S)/g, function (m, g1, g2) { var seq = g1 != null ? g1 : g2; var u = chartMapScript(seq, CHART_SUP); return u != null ? u : "^" + seq; });
    s = s.replace(/_\{([^{}]*)\}|_(\S)/g, function (m, g1, g2) { var seq = g1 != null ? g1 : g2; var u = chartMapScript(seq, CHART_SUB); return u != null ? u : "_" + seq; });
    s = s.replace(/[{}]/g, "").replace(/\\,|\\;|\\!|\\ /g, " ").replace(/\\/g, "");
    s = s.replace(/ DOLLAR /g, "$").replace(/\s+/g, " ").trim();
    return s;
  }
  function sanitizeChartConfigText(config) {
    if (!config || typeof config !== "object") return config;
    if (config.data) {
      if (Array.isArray(config.data.labels)) config.data.labels = config.data.labels.map(latexToPlainText);
      if (Array.isArray(config.data.datasets)) config.data.datasets.forEach(function (ds) { if (ds && typeof ds.label === "string") ds.label = latexToPlainText(ds.label); });
    }
    var opts = config.options;
    if (opts) {
      if (opts.plugins && opts.plugins.title && typeof opts.plugins.title.text === "string") opts.plugins.title.text = latexToPlainText(opts.plugins.title.text);
      if (opts.scales) Object.keys(opts.scales).forEach(function (k) { var ax = opts.scales[k]; if (ax && ax.title && typeof ax.title.text === "string") ax.title.text = latexToPlainText(ax.title.text); });
    }
    return config;
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
      "tabs",
      "saberes-link",
      "documento-saberes"
    ];
    if (interactiveTypes.indexOf(type) !== -1) return "";

    const title = component.title ? '<h3 class="pdf-h3">' + mathText(component.title) + "</h3>" : "";
    const description = component.description ? '<div class="pdf-muted">' + pdfText(component.description) + "</div>" : "";
    let body = "";

    if (type === "text" || type === "theory") {
      body = pdfText(component.body || component.content || component.paragraphs);
    } else if (type === "theory-block" || type === "concept-block") {
      const keyIdeas = asArray(component.keyIdeas || component.highlights).map(function (item) {
        return "<li>" + mathText(item.text || item.label || item.title || item) + "</li>";
      }).join("");
      const sections = asArray(component.sections).map(function (section) {
        return '<div class="pdf-box"><h4>' + mathText(section.title || section.label || "Idea") + "</h4>" +
          pdfText(section.body || section.content) +
          (section.formula ? '<div class="pdf-formula small" data-formula="' + attr(section.formula) + '"></div>' : "") +
          (section.formulaNote ? '<p class="pdf-muted">' + mathText(section.formulaNote) + "</p>" : "") +
          "</div>";
      }).join("");
      const example = component.example ? '<div class="pdf-example"><h4>' + mathText(component.example.title || component.example.label || "Ejemplo") + "</h4>" + pdfText(component.example.body || component.example.content) + "</div>" : "";
      body = pdfText(component.body || component.content || component.paragraphs) +
        (keyIdeas ? '<ul class="pdf-bullets">' + keyIdeas + "</ul>" : "") +
        sections +
        example +
        (component.closing ? '<div class="pdf-callout">' + pdfText(component.closing) + "</div>" : "");
    } else if (type === "list") {
      const ordered = component.ordered ? "ol" : "ul";
      const cls = component.ordered ? "pdf-numbered" : "pdf-bullets";
      body = "<" + ordered + ' class="' + cls + '">' + asArray(component.items).map(function (item) {
        return "<li>" + mathText(item.text || item.label || item.title || item) + "</li>";
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
          (item.answer ? '<p class="pdf-muted"><strong>Respuesta esperada:</strong> ' + mathText(item.answer) + "</p>" : "") +
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
            return "<li><strong>" + mathText(level) + ":</strong> " + mathText(criterion.descriptors[level]) + "</li>";
          }).join("")
          : "<li>" + mathText(criterion.description || criterion.descriptors || "") + "</li>";
        return '<div class="pdf-box"><h4>' + mathText(criterion.name || criterion.title || "Criterio") + '</h4><ul class="pdf-bullets">' + descriptors + "</ul></div>";
      }).join("");
      body = '<div class="pdf-box">' +
        (meta ? '<ul class="pdf-bullets">' + meta + "</ul>" : "") +
        (component.criterion ? "<p><strong>Criterio:</strong> " + mathText(component.criterion) + "</p>" : "") +
        (component.evidence ? "<p><strong>Evidencia:</strong> " + mathText(component.evidence) + "</p>" : "") +
        (feedbackList ? '<h4>Ruta de retroalimentacion</h4><ul class="pdf-bullets">' + feedbackList + "</ul>" : "") +
        (rubric.levels ? '<p class="pdf-muted"><strong>Niveles:</strong> ' + mathText(asArray(rubric.levels).join(", ")) + "</p>" : "") +
        "</div>" + rubricCriteria;
    } else if (type === "objectives" || type === "summary") {
      body = '<ul class="pdf-bullets">' + asArray(component.items).map(function (item) {
        return "<li>" + mathText(item.text || item.label || item.title || item) + "</li>";
      }).join("") + "</ul>";
    } else if (type === "prior-knowledge" || type === "reflection") {
      body = '<ol class="pdf-numbered">' + asArray(component.prompts || component.items).map(function (item) {
        return "<li>" + mathText(item.text || item.label || item.title || item) + "</li>";
      }).join("") + "</ol>";
    } else if (type === "accordion") {
      body = asArray(component.items).map(function (item) {
        return '<div class="pdf-box"><h4>' + mathText(item.title || item.label) + "</h4>" + pdfText(item.body || item.content) + "</div>";
      }).join("");
    } else if (type === "flashcards") {
      body = '<div class="pdf-grid">' + asArray(component.cards || component.items).map(function (card) {
        return '<div class="pdf-box"><h4>' + mathText(card.term || card.front || card.title) + '</h4><p>' + mathText(card.definition || card.back || card.body) + "</p></div>";
      }).join("") + "</div>";
    } else if (type === "carousel") {
      body = asArray(component.slides).map(function (slide, index) {
        return '<div class="pdf-box"><h4>Slide ' + (index + 1) + " · " + mathText(slide.title || slide.label || "") + "</h4>" +
          (slide.formula ? '<div class="pdf-formula" data-formula="' + attr(slide.formula) + '"></div>' : pdfText(slide.body || slide.description)) +
          (slide.description && slide.formula ? '<p>' + mathText(slide.description) + "</p>" : "") +
          "</div>";
      }).join("");
    } else if (type === "formula") {
      body = (component.context ? '<div class="pdf-muted">' + pdfText(component.context) + "</div>" : "") +
        '<div class="pdf-formula" data-formula="' + attr(component.latex || component.formula || "") + '"></div>' +
        '<ul class="pdf-bullets">' + asArray(component.variables).map(function (item) {
          return '<li><span data-formula-inline="' + attr(item.symbol || "") + '"></span>: ' + mathText(item.description || "") + "</li>";
        }).join("") + "</ul>" +
        (component.explanation ? '<div class="pdf-box"><h4>Cómo leerla</h4>' + pdfText(component.explanation) + "</div>" : "");
    } else if (type === "table") {
      body = '<table class="pdf-table"><thead><tr>' + asArray(component.columns).map(function (column) {
        return "<th>" + mathText(column.label || column) + "</th>";
      }).join("") + "</tr></thead><tbody>" + asArray(component.rows).map(function (row) {
        return "<tr>" + asArray(row.cells || row).map(function (cell) {
          return "<td>" + mathText(cell.badge || cell.text || cell.value || cell) + "</td>";
        }).join("") + "</tr>";
      }).join("") + "</tbody></table>";
    } else if (type === "stepper") {
      body = (component.statement ? '<p class="pdf-muted">' + mathText(component.statement) + "</p>" : "") +
        '<ol class="pdf-numbered">' + asArray(component.steps).map(function (step) {
          return '<li><strong>' + mathText(step.title) + "</strong>" + pdfText(step.body || step.description) +
            (step.formula ? '<div class="pdf-formula small" data-formula="' + attr(step.formula) + '"></div>' : "") + "</li>";
        }).join("") + "</ol>";
    } else if (type === "chart") {
      // Force the canvas to fill the (now larger) .pdf-chart-wrap: with maintainAspectRatio:true
      // Chart.js derives height from a fixed ratio and ignores the wrapper height, so the chart
      // stayed small inside the wider box. responsive + maintainAspectRatio:false makes it fill it.
      const chartOptions = Object.assign({}, component.options || {}, { responsive: true, maintainAspectRatio: false });
      const config = sanitizeChartConfigText({ type: component.chartType || component.kind || "bar", data: { labels: component.labels || [], datasets: component.datasets || [] }, options: chartOptions });
      const note = component.note || component.descriptiveNote || component.caption;
      body = '<figure class="pdf-chart-figure">' +
        '<div class="pdf-chart-wrap"><canvas data-pdf-chart="' + attr(JSON.stringify(config)) + '"></canvas></div>' +
        (note ? '<figcaption class="pdf-chart-note"><span class="pdf-chart-note-label">Lectura del gráfico</span>' + pdfText(note) + "</figcaption>" : "") +
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
      // References items may be plain strings or {text|reference} objects — support both.
      body = '<ol class="pdf-numbered">' + asArray(component.items).map(function (ref) {
        const text = ref && typeof ref === "object" ? (ref.text || ref.reference || "") : ref;
        return "<li>" + escapeHtml(text) + "</li>";
      }).join("") + "</ol>";
    } else if (type === "downloads") {
      body = '<ul class="pdf-bullets">' + asArray(component.items).map(function (doc) { return "<li>" + escapeHtml(doc.title) + " · " + escapeHtml(doc.meta || "") + "</li>"; }).join("") + "</ul>";
    } else {
      body = '<div class="pdf-box"><p>' + escapeHtml(type || "custom") + "</p></div>";
    }

    return '<section class="pdf-component">' + title + description + body + "</section>";
  }

  // ----- Embedded EDITABLE PDF preview (real-time visual editing) -----
  // Renders the PDF branch inside the app with the same inline-edit contract as SCORM:
  // each component is wrapped in [data-edit-scope="pdf.sections.<sid>.components.<cid>"] and each
  // text node carries a relative [data-edit-field]. The existing input/blur listeners then commit
  // edits to state.content via setValueAtPath — no separate plumbing needed.
  // The export renderer (renderPdfComponent / buildPdfHtml) is left untouched.

  function pdfEd(field, value, tag, className) {
    const t = tag || "span";
    const cls = className ? ' class="' + className + '"' : "";
    return "<" + t + cls + ' contenteditable="plaintext-only" spellcheck="true" data-edit-field="' + attr(field) + '">' + escapeHtml(value == null ? "" : value) + "</" + t + ">";
  }

  // Editable list of paragraph strings at <field> (array). Renders one editable <p> per item.
  function pdfEdParas(field, items, className) {
    const arr = asArray(items);
    if (!arr.length) return "";
    const isArr = Array.isArray(items);
    return arr.map(function (item, i) {
      const f = isArr ? field + "." + i : field;
      return pdfEd(f, item, "p", className);
    }).join("");
  }

  // Editable <li> list (items may be strings or {text|label|title}). ordered -> <ol>.
  function pdfEdItems(field, items, ordered, listClass) {
    const arr = asArray(items);
    const tag = ordered ? "ol" : "ul";
    const lis = arr.map(function (item, i) {
      let val, sub;
      if (item && typeof item === "object") {
        sub = item.text != null ? "text" : item.label != null ? "label" : item.title != null ? "title" : null;
        val = sub ? item[sub] : "";
      } else { val = item; }
      const f = sub ? field + "." + i + "." + sub : field + "." + i;
      return "<li>" + pdfEd(f, val, "span") + "</li>";
    }).join("");
    return "<" + tag + ' class="' + (listClass || (ordered ? "pdf-numbered" : "pdf-bullets")) + '">' + lis + "</" + tag + ">";
  }

  function renderPdfComponentEditable(sectionId, componentId, component) {
    const type = String(component.type || "").toLowerCase();
    const interactive = ["quiz","knowledge-check","listening","listening-true-false","matching","word-match","multi-select","multiselect","fill-blank","fill-in-the-blank","video","podcast","flashcards","carousel","tabs","saberes-link","documento-saberes"];
    if (interactive.indexOf(type) !== -1) return "";

    const scope = "pdf.sections." + sectionId + ".components." + componentId;
    const title = component.title != null ? pdfEd("title", component.title, "h3", "pdf-h3") : "";
    const description = (component.description != null && type !== "chart") ? '<div class="pdf-muted">' + pdfEdParas("description", component.description) + "</div>" : "";
    let body = "";

    if (type === "text" || type === "theory") {
      const key = component.body != null ? "body" : component.content != null ? "content" : "paragraphs";
      body = pdfEdParas(key, component.body || component.content || component.paragraphs);
    } else if (type === "theory-block" || type === "concept-block") {
      const bodyKey = component.body != null ? "body" : component.content != null ? "content" : "paragraphs";
      const bodyHtml = pdfEdParas(bodyKey, component.body || component.content || component.paragraphs);
      const keyIdeas = asArray(component.keyIdeas || component.highlights).length
        ? '<ul class="pdf-bullets">' + asArray(component.keyIdeas || component.highlights).map(function (item, i) {
            const base = (component.keyIdeas ? "keyIdeas" : "highlights") + "." + i;
            const sub = item && typeof item === "object" ? (item.text != null ? "text" : item.label != null ? "label" : "title") : null;
            return "<li>" + pdfEd(sub ? base + "." + sub : base, sub ? item[sub] : item) + "</li>";
          }).join("") + "</ul>"
        : "";
      const sections = asArray(component.sections).map(function (section, i) {
        const sk = section.body != null ? "body" : "content";
        return '<div class="pdf-box">' + pdfEd("sections." + i + "." + (section.title != null ? "title" : "label"), section.title || section.label || "Idea", "h4") +
          pdfEdParas("sections." + i + "." + sk, section.body || section.content) +
          (section.formula ? '<div class="pdf-formula small" data-formula="' + attr(section.formula) + '"></div>' : "") +
          (section.formulaNote != null ? pdfEd("sections." + i + ".formulaNote", section.formulaNote, "p", "pdf-muted") : "") +
          "</div>";
      }).join("");
      const example = component.example ? '<div class="pdf-example">' + pdfEd("example." + (component.example.title != null ? "title" : "label"), component.example.title || component.example.label || "Ejemplo", "h4") + pdfEdParas("example." + (component.example.body != null ? "body" : "content"), component.example.body || component.example.content) + "</div>" : "";
      body = bodyHtml + keyIdeas + sections + example + (component.closing != null ? '<div class="pdf-callout">' + pdfEdParas("closing", component.closing) + "</div>" : "");
    } else if (type === "list") {
      body = pdfEdItems("items", component.items, !!component.ordered);
    } else if (type === "example") {
      const ck = component.context != null ? "context" : component.body != null ? "body" : "content";
      body = '<div class="pdf-example">' + pdfEdParas(ck, component.context || component.body || component.content) +
        (component.formula ? '<div class="pdf-formula" data-formula="' + attr(component.formula) + '"></div>' : "") +
        (component.solution != null ? "<h4>Solución comentada</h4>" + pdfEdParas("solution", component.solution) : "") + "</div>";
    } else if (type === "callout") {
      const ck = component.body != null ? "body" : component.text != null ? "text" : "content";
      body = '<div class="pdf-callout pdf-callout-' + attr(component.tone || "light") + '">' + pdfEdParas(ck, component.body || component.text || component.content) + "</div>";
    } else if (type === "exercise" || type === "exercise-set") {
      const coll = component.items != null ? "items" : "exercises";
      body = asArray(component.items || component.exercises).map(function (item, i) {
        const pk = item.prompt != null ? "prompt" : item.statement != null ? "statement" : "body";
        return '<div class="pdf-practice"><h4>Ejercicio ' + (i + 1) + "</h4>" +
          pdfEdParas(coll + "." + i + "." + pk, item.prompt || item.statement || item.body) +
          (item.formula ? '<div class="pdf-formula small" data-formula="' + attr(item.formula) + '"></div>' : "") +
          (item.answer != null ? '<p class="pdf-muted"><strong>Respuesta esperada:</strong> ' + pdfEd(coll + "." + i + ".answer", item.answer) + "</p>" : "") +
          "</div>";
      }).join("");
    } else if (type === "objectives" || type === "summary") {
      body = pdfEdItems("items", component.items, false);
    } else if (type === "prior-knowledge" || type === "reflection") {
      const coll = component.prompts != null ? "prompts" : "items";
      body = pdfEdItems(coll, component.prompts || component.items, true);
    } else if (type === "accordion") {
      body = asArray(component.items).map(function (item, i) {
        const bk = item.body != null ? "body" : "content";
        return '<div class="pdf-box">' + pdfEd("items." + i + "." + (item.title != null ? "title" : "label"), item.title || item.label, "h4") + pdfEdParas("items." + i + "." + bk, item.body || item.content) + "</div>";
      }).join("");
    } else if (type === "table") {
      body = '<table class="pdf-table"><thead><tr>' + asArray(component.columns).map(function (column, i) {
        const isObj = column && typeof column === "object";
        return "<th>" + pdfEd(isObj ? "columns." + i + ".label" : "columns." + i, isObj ? column.label : column) + "</th>";
      }).join("") + "</tr></thead><tbody>" + asArray(component.rows).map(function (row, ri) {
        const hasCells = row && row.cells;
        return "<tr>" + asArray(hasCells ? row.cells : row).map(function (cell, ci) {
          const cellBase = hasCells ? "rows." + ri + ".cells." + ci : "rows." + ri + "." + ci;
          const isObj = cell && typeof cell === "object";
          const sub = isObj ? (cell.badge != null ? "badge" : cell.text != null ? "text" : "value") : null;
          return "<td>" + pdfEd(sub ? cellBase + "." + sub : cellBase, isObj ? (cell.badge || cell.text || cell.value) : cell) + "</td>";
        }).join("") + "</tr>";
      }).join("") + "</tbody></table>";
    } else if (type === "stepper") {
      body = (component.statement != null ? pdfEd("statement", component.statement, "p", "pdf-muted") : "") +
        '<ol class="pdf-numbered">' + asArray(component.steps).map(function (step, i) {
          const sk = step.body != null ? "body" : "description";
          return "<li>" + pdfEd("steps." + i + ".title", step.title, "strong") + pdfEdParas("steps." + i + "." + sk, step.body || step.description) +
            (step.formula ? '<div class="pdf-formula small" data-formula="' + attr(step.formula) + '"></div>' : "") + "</li>";
        }).join("") + "</ol>";
    } else if (type === "formula") {
      body = (component.context != null ? '<div class="pdf-muted">' + pdfEdParas("context", component.context) + "</div>" : "") +
        '<div class="pdf-formula" data-formula="' + attr(component.latex || component.formula || "") + '"></div>' +
        '<ul class="pdf-bullets">' + asArray(component.variables).map(function (item, i) {
          return '<li><span data-formula-inline="' + attr(item.symbol || "") + '"></span>: ' + pdfEd("variables." + i + ".description", item.description || "") + "</li>";
        }).join("") + "</ul>" +
        (component.explanation != null ? '<div class="pdf-box"><h4>Cómo leerla</h4>' + pdfEdParas("explanation", component.explanation) + "</div>" : "");
    } else if (type === "references") {
      body = '<ol class="pdf-numbered">' + asArray(component.items).map(function (ref, i) {
        const isObj = ref && typeof ref === "object";
        const sub = isObj ? (ref.text != null ? "text" : "reference") : null;
        return "<li>" + pdfEd(sub ? "items." + i + "." + sub : "items." + i, isObj ? (ref.text || ref.reference) : ref) + "</li>";
      }).join("") + "</ol>";
    } else if (type === "chart") {
      // Render as a SCORM-style canvas so window.subjectEnhanceWithin builds it (and the LaTeX
      // label sanitizer in normalizeChartConfig applies). Editable description/note around it.
      const cfg = sanitizeChartConfigText({ type: component.chartType || component.kind || "bar", data: { labels: component.labels || [], datasets: component.datasets || [] }, options: Object.assign({}, component.options || {}) });
      const note = component.note != null ? component.note : (component.descriptiveNote != null ? component.descriptiveNote : component.caption);
      const noteField = component.note != null ? "note" : component.descriptiveNote != null ? "descriptiveNote" : "caption";
      body = (component.description != null ? '<div class="pdf-muted">' + pdfEdParas("description", component.description) + "</div>" : "") +
        '<figure class="pdf-chart-figure"><div class="pdf-chart-wrap" style="height:240px"><canvas data-chart="' + attr(cfg.type) + '" data-chart-config="' + attr(JSON.stringify(cfg)) + '"></canvas></div>' +
        (note != null ? '<figcaption class="pdf-chart-note"><span class="pdf-chart-note-label">Lectura del gráfico</span>' + pdfEd(noteField, note, "span") + "</figcaption>" : "") +
        "</figure>";
      return '<section class="pdf-component" data-edit-scope="' + attr(scope) + '">' + title + body + "</section>";
    } else {
      // Other non-text components (image, code, metrics, timeline, downloads): render read-only via
      // the export renderer so the preview matches the final PDF; these are edited via the JSON panel.
      return '<section class="pdf-component" data-edit-scope="' + attr(scope) + '" data-pdf-readonly="1">' + renderPdfComponent(component) + "</section>";
    }

    return '<section class="pdf-component" data-edit-scope="' + attr(scope) + '">' + title + description + body + "</section>";
  }

  function renderPdfPreview() {
    const host = qs("#pdf-preview-root");
    if (!host) return;
    if (!state.content) { host.innerHTML = ""; return; }
    const subject = state.content.subject || {};
    const pdf = state.content.pdf || {};
    const src = pdfContent(state.content);
    const sections = orderedSections(src).map(function (sectionId, index) {
      const section = src.sections[sectionId];
      const scope = "pdf.sections." + sectionId;
      const comps = componentOrder(section).map(function (cid) {
        return renderPdfComponentEditable(sectionId, cid, section.components[cid]);
      }).filter(Boolean).join("");
      return '<article class="pdf-preview-section" data-edit-scope="' + attr(scope) + '">' +
        '<header class="pdf-preview-sec-head"><span class="pdf-preview-sec-num">' + (index + 1) + "</span>" +
        pdfEd("title", section.title || section.navLabel || sectionId, "h2", "pdf-preview-sec-title") + "</header>" +
        (section.intro != null ? '<div class="pdf-preview-intro">' + pdfEdParas("intro", section.intro) + "</div>" : "") +
        comps + "</article>";
    }).join("");
    host.innerHTML = '<div class="pdf-preview-doc">' +
      '<div class="pdf-preview-banner"><span class="pdf-preview-kicker">' + escapeHtml(pdf.guideLabel || "GUÍA DE ESTUDIO VIRTUAL") + '</span>' +
      '<strong>' + escapeHtml(pdf.title || subject.title || "Guía PDF") + "</strong>" +
      '<span class="pdf-preview-hint">Edición visual en vivo · escribe directamente sobre el texto</span></div>' +
      sections + "</div>";
    // Render math + charts inside the preview (scoped enhancer; does not touch SCORM nav).
    if (window.subjectEnhanceWithin) window.subjectEnhanceWithin(host);
  }

  // Toggle main view between SCORM content and the embedded editable PDF preview.
  function updateMainView() {
    const contentRoot = qs("#content-root");
    const pdfRoot = qs("#pdf-preview-root");
    const pager = qs("#theme-pager");
    // Show the embedded editable PDF whenever the editor is in PDF mode — regardless of whether the
    // side panel is open or collapsed, so closing the panel does not drop the PDF view.
    const showPdf = state.editorBranch === "pdf";
    if (pdfRoot) pdfRoot.classList.toggle("hidden", !showPdf);
    if (contentRoot) contentRoot.classList.toggle("hidden", showPdf);
    if (pager) pager.classList.toggle("hidden", showPdf);
    // Reserve room for the side panel when it is open so the content (PDF or SCORM) is not covered.
    const shell = document.body;
    if (shell) shell.classList.toggle("author-panel-open", isPanelOpen());
    if (showPdf) renderPdfPreview();
  }

  function isPanelOpen() {
    const panel = qs("#json-editor-panel");
    return !!(panel && !panel.classList.contains("translate-x-full"));
  }

  let logoDataUrlCache = null;
  async function loadLogoDataUrl() {
    if (logoDataUrlCache) return logoDataUrlCache;
    try {
      const response = await fetch(new URL("assets/logo-negro.png", window.location.href).href);
      if (!response.ok) return "";
      const blob = await response.blob();
      logoDataUrlCache = await new Promise(function (resolve) {
        const reader = new FileReader();
        reader.onload = function () { resolve(String(reader.result || "")); };
        reader.onerror = function () { resolve(""); };
        reader.readAsDataURL(blob);
      });
      return logoDataUrlCache;
    } catch (err) {
      return "";
    }
  }

  // Mapea el programa/facultad declarado en el JSON a uno de los tres temas visuales
  // oficiales de la U de América. La facultad puede venir explícita en
  // subject.faculty / pdf.faculty / subject.syllabus.extractedFields.faculty, o se
  // infiere del nombre del programa. Devuelve la clave del tema y las rutas de imagen.
  function pdfFaculty(content) {
    const subject = content.subject || {};
    const pdf = content.pdf || {};
    const fields = (subject.syllabus && subject.syllabus.extractedFields) || {};
    const explicit = pdf.faculty || subject.faculty || fields.faculty || "";
    const program = pdf.program || subject.program || fields.program || "";
    const hay = (String(explicit) + " " + String(program)).toLowerCase();

    let key = "default";
    if (/economic|administ|empresar|negoci|contad|finan|mercad|econom/.test(hay)) key = "economicas";
    else if (/arquitect|dise[nñ]o|creativ|territor|sosten|urban|paisaj|arte/.test(hay)) key = "arquitectura";
    else if (/ingenier|sistemas|software|industrial|civil|mec[aá]nic|electr|qu[ií]mic|petr[oó]le|ambient|tecnolog|computaci|datos|telecom/.test(hay)) key = "ingenieria";
    // Si la facultad vino explícita con una de las tres claves, respétala.
    if (/^ingenieria$/.test(explicit.toLowerCase())) key = "ingenieria";
    else if (/^economicas$/.test(explicit.toLowerCase())) key = "economicas";
    else if (/^arquitectura$/.test(explicit.toLowerCase())) key = "arquitectura";

    const labels = {
      ingenieria: "Facultad de Ingeniería",
      economicas: "Ciencias Económicas y Administrativas",
      arquitectura: "Arquitectura y Diseño",
      default: pdf.facultyLabel || "Universidad de América"
    };
    const base = "assets/pdf/" + key;
    return {
      key: key,
      label: pdf.facultyLabel || labels[key] || labels.default,
      cover: base + "/portada.jpg",
      header: base + "/encabezado.jpg",
      divider: base + "/separador.jpg"
    };
  }

  function buildPdfHtml(content, logoSrc) {
    const subject = content.subject || {};
    const pdf = content.pdf || {};
    const pdfSource = pdfContent(content);
    const institution = pdf.institution || "Universidad de América";
    const fac = pdfFaculty(content);
    // logoSrc: explicit logo reference chosen by the caller.
    // - blob preview -> embedded base64 data URL (relative paths do not resolve from a blob: document)
    // - SCORM zip     -> relative "assets/logo-negro.png" (the file is bundled next to guia-estudio.html)
    // Fallback to the relative path when no logoSrc is provided.
    const logoBlack = logoSrc || "assets/logo-negro.png";
    const logoWhite = logoSrc ? logoSrc.replace("logo-negro", "logo-blanco") : "assets/logo-blanco.png";
    const totalSections = orderedSections(pdfSource).length;

    const sections = orderedSections(pdfSource).map(function (sectionId, index) {
      const section = pdfSource.sections[sectionId];
      const num = String(index + 1).padStart(2, "0");
      const sectionTitle = section.title || section.navLabel || sectionId;
      const components = componentOrder(section).map(function (componentId) {
        return renderPdfComponent(section.components[componentId]);
      }).filter(Boolean).join("");
      // Página separadora editorial a página completa, con imagen de facultad.
      const divider = '<section class="pdf-divider" id="' + attr(sectionId) + '" style="background-image:url(\'' + attr(fac.divider) + '\')">' +
        '<div class="pdf-divider__veil"></div>' +
        '<div class="pdf-divider__body">' +
        '<span class="pdf-divider__eyebrow">' + escapeHtml(subject.unitLabel || "Tema") + " · " + escapeHtml(fac.label) + "</span>" +
        '<span class="pdf-divider__num">' + num + "</span>" +
        '<h2 class="pdf-divider__title">' + escapeHtml(sectionTitle) + "</h2>" +
        (section.intro || section.description ? '<div class="pdf-divider__lead">' + pdfText(asArray(section.intro || section.description).slice(0, 1)) + "</div>" : "") +
        "</div>" +
        '<img class="pdf-divider__logo" src="' + attr(logoWhite) + '" alt="">' +
        "</section>";
      // Cuerpo del tema (la apertura repite el lead completo para arrancar la lectura).
      const body = '<article class="pdf-page-section pdf-fac-' + attr(fac.key) + '">' +
        '<div class="pdf-section-opener"><span class="pdf-section-opener__num">' + num + "</span>" +
        '<h2 class="pdf-h2">' + escapeHtml(sectionTitle) + "</h2></div>" +
        '<div class="pdf-intro">' + pdfText(section.intro || section.description) + "</div>" +
        components +
        "</article>";
      return divider + body;
    }).join("");

    const toc = orderedSections(pdfSource).map(function (sectionId, index) {
      const section = pdfSource.sections[sectionId];
      const num = String(index + 1).padStart(2, "0");
      return '<li class="pdf-toc__item"><a href="#' + attr(sectionId) + '">' +
        '<span class="pdf-toc__num">' + num + "</span>" +
        '<span class="pdf-toc__title">' + escapeHtml(section.title || section.navLabel || sectionId) + "</span>" +
        '<span class="pdf-toc__dots"></span></a></li>';
    }).join("");

    return '<!doctype html><html lang="es"><head><meta charset="utf-8"><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><title>PDF · ' + escapeHtml(subject.title || "Asignatura") + '</title>' +
      '<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800;900&family=Inter:wght@400;500;600&family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet">' +
      '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css">' +
      '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css">' +
      '<script src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js"><\/script><script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.3/dist/chart.umd.min.js"><\/script><script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"><\/script>' +
      '<style>' + pdfCss() + '</style></head><body class="pdf-fac-' + attr(fac.key) + '">' +
      '<button class="print-btn" onclick="window.print()">Imprimir / guardar PDF</button>' +
      // PORTADA editorial full-bleed con imagen de facultad.
      '<section class="pdf-cover" style="background-image:url(\'' + attr(fac.cover) + '\')">' +
      '<div class="pdf-cover__veil"></div>' +
      '<header class="pdf-cover__top"><img src="' + attr(logoWhite) + '" alt="Universidad de América"><span>' + escapeHtml(fac.label) + "</span></header>" +
      '<div class="pdf-cover__main">' +
      '<p class="pdf-cover__label">' + escapeHtml(pdf.guideLabel || "GUÍA DE ESTUDIO") + "</p>" +
      '<h1 class="pdf-cover__title">' + escapeHtml(pdf.title || subject.title || "[Título del PDF]") + "</h1>" +
      '<p class="pdf-cover__subject">' + escapeHtml(subject.title || "[Nombre de la Asignatura]") + "</p>" +
      (pdf.subtitle ? '<p class="pdf-cover__subtitle">' + escapeHtml(pdf.subtitle) + "</p>" : "") +
      "</div>" +
      '<footer class="pdf-cover__bottom"><span>' + escapeHtml(institution) + "</span><span>" + escapeHtml(subject.program || "") + "</span><span>" + escapeHtml(pdf.year || "") + "</span></footer>" +
      "</section>" +
      // PÁGINA DE CRÉDITOS / PROPÓSITO.
      '<section class="pdf-colophon"><img src="' + attr(logoBlack) + '" alt=""><div class="pdf-colophon__grid">' +
      '<div><h3>Propósito formativo</h3><p>' + escapeHtml(pdf.purpose || "[Propósito formativo.]") + "</p></div>" +
      '<div><h3>Cómo usar esta guía</h3><p>' + escapeHtml(pdf.structure || "[Estructura del contenido.]") + "</p></div>" +
      '<div><h3>Asignatura</h3><p>' + escapeHtml(subject.title || "") + "</p></div>" +
      '<div><h3>Programa</h3><p>' + escapeHtml(subject.program || "") + "</p></div>" +
      "</div></section>" +
      // TABLA DE CONTENIDO editorial.
      '<section class="pdf-toc" id="contenido"><div class="pdf-toc__head"><span class="pdf-toc__kicker">' + escapeHtml(fac.label) + '</span><h1>Contenido</h1></div><ol class="pdf-toc__list">' + toc + "</ol></section>" +
      sections +
      '<script>window.addEventListener("load",function(){document.querySelectorAll("[data-formula]").forEach(function(el){try{katex.render(el.getAttribute("data-formula"),el,{displayMode:true,throwOnError:false})}catch(e){el.textContent=el.getAttribute("data-formula")}});document.querySelectorAll("[data-formula-inline]").forEach(function(el){try{katex.render(el.getAttribute("data-formula-inline"),el,{displayMode:false,throwOnError:false})}catch(e){el.textContent=el.getAttribute("data-formula-inline")}});document.querySelectorAll("[data-math-inline]").forEach(function(el){try{katex.render(el.getAttribute("data-math-inline"),el,{displayMode:false,throwOnError:false})}catch(e){el.textContent=el.getAttribute("data-math-inline")}});document.querySelectorAll("[data-math-block]").forEach(function(el){try{katex.render(el.getAttribute("data-math-block"),el,{displayMode:true,throwOnError:false})}catch(e){el.textContent=el.getAttribute("data-math-block")}});document.querySelectorAll("[data-pdf-chart]").forEach(function(canvas){try{new Chart(canvas.getContext("2d"),JSON.parse(canvas.getAttribute("data-pdf-chart")))}catch(e){}});if(window.hljs){document.querySelectorAll("pre code").forEach(function(code){hljs.highlightElement(code)})}});<\/script>' +
      "</body></html>";
  }

  function pdfCss() {
    return `
      /* ============ Tema editorial por facultad (variables) ============ */
      :root {
        --fac-ink: #172006;        /* verde institucional profundo */
        --fac-accent: #c0f500;     /* lima de marca */
        --fac-gold: #f0b300;       /* dorado */
        --fac-tint: #f4f7ec;       /* fondo de apoyo claro */
        --fac-soft: #5f655b;       /* texto secundario */
      }
      body.pdf-fac-ingenieria  { --fac-ink:#0f2a3f; --fac-accent:#2bb7d4; --fac-gold:#f0b300; --fac-tint:#eef5f8; }
      body.pdf-fac-economicas  { --fac-ink:#123a2a; --fac-accent:#33c08a; --fac-gold:#f0b300; --fac-tint:#edf6f1; }
      body.pdf-fac-arquitectura{ --fac-ink:#3a2418; --fac-accent:#e08a3c; --fac-gold:#caa64a; --fac-tint:#f6f1ea; }

      @page {
        size: 8.5in 11in;
        margin: 16mm 17mm 18mm;
      }
      * {
        box-sizing: border-box;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      html,
      body {
        margin: 0;
        background: #e7e9e3;
        color: #1d2412;
        font-family: Inter, Arial, sans-serif;
        font-size: 10.5pt;
        line-height: 1.5;
      }
      body { overflow-wrap: break-word; }
      .print-btn {
        position: fixed;
        right: 18px; top: 18px; z-index: 9;
        background: var(--fac-ink); color: #fff;
        border: 0; border-radius: 4px; padding: 9px 13px;
        font: 700 10pt Montserrat, sans-serif;
      }
      .pdf-cover, .pdf-colophon, .pdf-toc, .pdf-divider, .pdf-page-section {
        width: 100%; background: #fff;
      }

      /* ===================== PORTADA full-bleed ===================== */
      .pdf-cover {
        position: relative;
        height: 247mm; max-height: 247mm;
        margin: -16mm -17mm 0;            /* sangra hasta el borde de la página */
        padding: 20mm 20mm 16mm;
        display: flex; flex-direction: column;
        color: #fff; overflow: hidden;
        background-color: var(--fac-ink);
        background-size: cover; background-position: center;
        break-after: page; page-break-after: always;
        break-inside: avoid; page-break-inside: avoid;
      }
      .pdf-cover__veil {
        position: absolute; inset: 0;
        background: linear-gradient(180deg, rgba(0,0,0,.30) 0%, rgba(0,0,0,.05) 38%, rgba(0,0,0,.55) 100%);
      }
      .pdf-cover > * { position: relative; z-index: 1; }
      .pdf-cover__top {
        display: flex; align-items: center; justify-content: space-between; gap: 8mm;
      }
      .pdf-cover__top img { width: 42mm; height: auto; }
      .pdf-cover__top span {
        font: 700 9pt Montserrat, sans-serif; text-transform: uppercase;
        letter-spacing: .14em; opacity: .92; text-align: right;
      }
      .pdf-cover__main { margin-top: auto; max-width: 150mm; }
      .pdf-cover__label {
        display: inline-block; margin: 0 0 6mm;
        background: var(--fac-accent); color: var(--fac-ink);
        font: 800 9.5pt Montserrat, sans-serif; text-transform: uppercase; letter-spacing: .12em;
        padding: 2mm 4mm; border-radius: 1mm;
      }
      .pdf-cover__title {
        margin: 0 0 6mm;
        font: 600 38pt/1.04 Fraunces, Georgia, serif;
        text-shadow: 0 1mm 4mm rgba(0,0,0,.35);
        overflow-wrap: anywhere;
      }
      .pdf-cover__subject {
        margin: 0; font: 700 15pt Montserrat, sans-serif;
        text-transform: uppercase; letter-spacing: .04em;
      }
      .pdf-cover__subtitle { margin: 4mm 0 0; font-size: 12pt; max-width: 140mm; opacity: .95; }
      .pdf-cover__bottom {
        position: relative; z-index: 1; margin-top: 14mm;
        display: flex; justify-content: space-between; gap: 6mm;
        border-top: .5mm solid rgba(255,255,255,.45); padding-top: 4mm;
        font: 600 8.6pt Montserrat, sans-serif; text-transform: uppercase; letter-spacing: .06em;
      }

      /* ===================== COLOFÓN / PROPÓSITO ===================== */
      .pdf-colophon {
        min-height: 247mm; padding: 4mm 2mm;
        break-after: page; page-break-after: always;
        display: flex; flex-direction: column;
      }
      .pdf-colophon img { width: 40mm; margin-bottom: 14mm; }
      .pdf-colophon__grid {
        display: grid; grid-template-columns: 1fr 1fr; gap: 10mm 12mm;
        margin-top: auto; margin-bottom: auto;
      }
      .pdf-colophon__grid h3 {
        margin: 0 0 2.5mm; color: var(--fac-ink);
        font: 800 11pt Montserrat, sans-serif; text-transform: uppercase; letter-spacing: .04em;
        padding-left: 3mm; border-left: 1.6mm solid var(--fac-accent);
      }
      .pdf-colophon__grid p { margin: 0; color: #3b4233; }

      /* ===================== TABLA DE CONTENIDO ===================== */
      .pdf-toc {
        min-height: 247mm; padding: 2mm;
        break-after: page; page-break-after: always;
      }
      .pdf-toc__head { margin-bottom: 12mm; }
      .pdf-toc__kicker {
        display: block; color: var(--fac-soft);
        font: 700 9pt Montserrat, sans-serif; text-transform: uppercase; letter-spacing: .12em;
        margin-bottom: 2mm;
      }
      .pdf-toc__head h1 {
        margin: 0; font: 600 30pt Fraunces, Georgia, serif; color: var(--fac-ink);
      }
      .pdf-toc__head h1:after {
        content: ''; display: block; width: 34mm; height: 1.6mm;
        background: var(--fac-accent); margin-top: 4mm;
      }
      .pdf-toc__list { list-style: none; padding: 0; margin: 0; }
      .pdf-toc__item { margin: 0; }
      .pdf-toc__item a {
        display: flex; align-items: baseline; gap: 4mm;
        color: var(--fac-ink); text-decoration: none;
        padding: 4mm 0; border-bottom: .3mm solid #e2e6db;
      }
      .pdf-toc__num {
        font: 800 16pt Montserrat, sans-serif; color: var(--fac-accent);
        -webkit-text-stroke: .3mm var(--fac-ink); min-width: 14mm;
      }
      .pdf-toc__title { font: 600 12.5pt Montserrat, sans-serif; flex: 0 1 auto; }
      .pdf-toc__dots { flex: 1; border-bottom: .3mm dotted #b9bfb0; transform: translateY(-1mm); }

      /* ===================== SEPARADOR DE TEMA (full page) ===================== */
      .pdf-divider {
        position: relative; height: 247mm; max-height: 247mm;
        margin: 0 -17mm; padding: 24mm 20mm;
        color: #fff; overflow: hidden;
        display: flex; flex-direction: column; justify-content: center;
        background-color: var(--fac-ink);
        background-size: cover; background-position: center;
        break-before: page; page-break-before: always;
        break-after: page; page-break-after: always;
        break-inside: avoid; page-break-inside: avoid;
      }
      .pdf-divider__veil {
        position: absolute; inset: 0;
        background: linear-gradient(135deg, rgba(0,0,0,.62) 0%, rgba(0,0,0,.30) 60%, rgba(0,0,0,.50) 100%);
      }
      .pdf-divider__body { position: relative; z-index: 1; max-width: 150mm; }
      .pdf-divider__eyebrow {
        display: block; font: 700 9.5pt Montserrat, sans-serif;
        text-transform: uppercase; letter-spacing: .16em; opacity: .92; margin-bottom: 5mm;
      }
      .pdf-divider__num {
        display: block; font: 900 84pt/0.9 Montserrat, sans-serif;
        color: var(--fac-accent); text-shadow: 0 1mm 6mm rgba(0,0,0,.4);
      }
      .pdf-divider__title {
        margin: 4mm 0 0; font: 600 30pt/1.08 Fraunces, Georgia, serif;
        text-shadow: 0 1mm 4mm rgba(0,0,0,.4); overflow-wrap: anywhere;
      }
      .pdf-divider__lead { margin-top: 6mm; max-width: 140mm; font-size: 11.5pt; opacity: .95; }
      .pdf-divider__lead p { margin: 0; }
      .pdf-divider__logo { position: absolute; right: 20mm; bottom: 20mm; z-index: 1; width: 36mm; opacity: .92; }

      /* ===================== CUERPO DE CADA TEMA ===================== */
      .pdf-page-section { padding-top: 2mm; margin-bottom: 6mm; }
      .pdf-section-opener {
        display: flex; align-items: center; gap: 5mm;
        border-bottom: 1.4mm solid var(--fac-accent);
        padding-bottom: 4mm; margin-bottom: 7mm;
      }
      .pdf-section-opener__num {
        font: 900 26pt Montserrat, sans-serif; color: var(--fac-ink);
        line-height: 1;
      }
      .pdf-h2 {
        margin: 0; flex: 1;
        font: 600 21pt/1.1 Fraunces, Georgia, serif; color: var(--fac-ink);
        overflow-wrap: anywhere;
      }
      .pdf-intro {
        font-size: 11pt; color: #2b3122; margin-bottom: 5mm;
      }
      .pdf-intro p:first-child::first-letter {
        float: left; font: 600 30pt/0.8 Fraunces, Georgia, serif;
        color: var(--fac-ink); padding: 1mm 2mm 0 0;
      }
      .pdf-h3 {
        margin: 7mm 0 2.5mm;
        color: var(--fac-ink);
        font: 700 13pt Fraunces, Georgia, serif;
      }
      .pdf-intro p,
      .pdf-component p {
        margin: 0 0 3mm;
      }
      .pdf-component {
        margin: 5mm 0;
      }
      .pdf-muted {
        color: #5f655b;
      }
      .pdf-box {
        border: 1px solid #dfe4d9;
        border-left: 2.5mm solid var(--fac-accent);
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
        background: var(--fac-tint);
        border-left: 2.5mm solid var(--fac-accent);
      }
      .pdf-callout {
        background: var(--fac-tint);
        border-left: 2.5mm solid var(--fac-accent);
      }
      .pdf-callout-warning,
      .pdf-callout-error {
        background: #fff1e6;
        border-left-color: #ff7900;
      }
      .pdf-callout-dark {
        background: var(--fac-ink);
        border-left-color: var(--fac-accent);
        color: #fff;
      }
      .pdf-example h4,
      .pdf-practice h4,
      .pdf-callout h4 {
        margin: 0 0 2mm;
        color: var(--fac-ink);
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
        color: var(--fac-accent);
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
        background: var(--fac-ink);
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
        background: var(--fac-tint);
        border-left: 2mm solid var(--fac-ink);
        padding: 3mm;
        margin: 3mm 0;
        overflow-x: auto;
        overflow-y: visible;
        break-inside: avoid;
        page-break-inside: avoid;
      }
      .pdf-formula .katex {
        font-size: 1.16em;
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
        width: min(100%, 165mm);
        height: 72.5mm;
        margin: 3mm auto 2mm;
        break-inside: avoid;
        page-break-inside: avoid;
      }
      .pdf-chart-wrap canvas {
        display: block;
        margin: 0 auto;
        width: 100% !important;
        height: 100% !important;
      }
      .pdf-chart-note {
        width: min(100%, 165mm);
        margin: 0 auto;
        color: #5f655b;
        font-size: 8.8pt;
        line-height: 1.35;
        text-align: center;
      }
      .pdf-chart-note p {
        margin: 0;
      }
      .pdf-chart-note-label {
        display: block;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        font-size: 7.6pt;
        color: #3f4a37;
        margin-bottom: 1mm;
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
        max-width: min(100%, 172.5mm);
        max-height: 97.5mm;
        object-fit: contain;
        margin: 0 auto 2mm;
        border: 1px solid #dfe4d9;
        background: #fff;
      }
      .pdf-image-figure figcaption {
        width: min(100%, 172.5mm);
        margin: 0 auto;
        color: #5f655b;
        font-size: 8.8pt;
        line-height: 1.35;
      }
      .pdf-image-figure figcaption p {
        margin: 0;
      }
      .pdf-image-placeholder {
        width: min(100%, 172.5mm);
        min-height: 55mm;
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
        background: var(--fac-ink);
        color: #fff;
        border-radius: 3px;
        padding: 4mm;
      }
      .pdf-metric strong {
        display: block;
        color: var(--fac-accent);
        font: 800 16pt Montserrat, sans-serif;
      }
      .pdf-metric span {
        font: 700 8.5pt Montserrat, sans-serif;
        text-transform: uppercase;
      }

      /* ===================== Pie de libro + numeración ===================== */
      /* Páginas interiores: número de página y pie institucional. La portada,
         colofón, TOC y separadores son full-bleed y ocultan el pie con :blank-like
         no es posible en print CSS, así que el contador corre desde la 1. */
      @page {
        @bottom-center {
          content: counter(page);
          font: 600 8.5pt Montserrat, sans-serif;
          color: #8a9080;
        }
        @bottom-left {
          content: "Universidad de América";
          font: 600 7.5pt Montserrat, sans-serif;
          color: #b3b8ab;
        }
      }
      @media screen {
        body { padding: 16px 0; }
        .pdf-colophon, .pdf-toc, .pdf-page-section {
          width: 8.5in;
          margin: 0 auto 16px;
          padding: 16mm 17mm 18mm;
          box-shadow: 0 10px 30px rgba(0,0,0,.18);
          background: #fff;
        }
        .pdf-cover, .pdf-divider {
          width: 8.5in; min-height: 11in;
          margin: 0 auto 16px;
          box-shadow: 0 10px 30px rgba(0,0,0,.22);
        }
        .pdf-colophon, .pdf-toc { min-height: 11in; }
      }
      @media print {
        .print-btn { display: none; }
        html, body { background: #fff; }
        .pdf-page-section, .pdf-page-section:last-child {
          break-after: auto; page-break-after: auto;
        }
      }
    `;
  }

  async function openPdfPreview() {
    const content = state.content || (window.getSubjectContent && window.getSubjectContent());
    if (!content) return;
    state.content = clone(content);
    // Open the tab synchronously to preserve the user-gesture context (avoids popup blocking
    // after the await below). Omit "noopener" so we keep a handle to write the document into;
    // we null out the opener afterwards to avoid reverse-tabnabbing.
    const tab = window.open("", "_blank");
    if (tab) { try { tab.opener = null; } catch (err) {} }
    const logoDataUrl = await loadLogoDataUrl();
    const html = buildPdfHtml(content, logoDataUrl);
    if (tab && !tab.closed) {
      tab.document.open();
      tab.document.write(html);
      tab.document.close();
      return;
    }
    // Popup was blocked or unavailable: fall back to a blob URL.
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

    qsa("[data-editor-branch]").forEach(function (btn) {
      btn.addEventListener("click", function () { setEditorBranch(btn.getAttribute("data-editor-branch")); });
    });

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
        branchContent(state.content).sections[state.selectedSectionId].components[state.selectedComponentId] = JSON.parse(qs("#component-editor").value);
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
