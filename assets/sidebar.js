/* ===========================================================================
   Plantilla JSON SCORM/PDF - Interacciones de interfaz.
   =========================================================================== */
(function () {
  "use strict";

  const C = {
    primary: "#060b00",
    primaryContainer: "#1a2403",
    secondary: "#4f6600",
    secondaryFixed: "#c0f500",
    tertiary: "#cea600",
    outlineVariant: "#c6c8ba",
    onSurfaceVariant: "#46483e"
  };

  const chartInstances = new WeakMap();
  let activeSectionId = null;

  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebar-overlay");
  const menuBtn = document.getElementById("menu-btn");
  const bannerName = document.getElementById("banner-theme-name");
  const pager = document.getElementById("theme-pager");
  const prevBtn = document.getElementById("prev-theme");
  const nextBtn = document.getElementById("next-theme");

  function qs(selector, root) {
    return (root || document).querySelector(selector);
  }

  function qsa(selector, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(selector));
  }

  function navLinks() {
    return qsa(".theme-link");
  }

  function theoryLinks() {
    return navLinks().filter(function (link) {
      return !link.classList.contains("material-link");
    });
  }

  function closeSidebar() {
    if (!sidebar || !overlay) return;
    sidebar.classList.add("-translate-x-full");
    overlay.classList.add("hidden");
  }

  function openSidebar() {
    if (!sidebar || !overlay) return;
    sidebar.classList.remove("-translate-x-full");
    overlay.classList.remove("hidden");
  }

  function theoryIndex() {
    const links = theoryLinks();
    for (let i = 0; i < links.length; i++) {
      if (links[i].getAttribute("aria-current") === "true") return i;
    }
    return -1;
  }

  function setActiveLink(link) {
    navLinks().forEach(function (item) {
      item.removeAttribute("aria-current");
      if (!item.classList.contains("material-link")) {
        const pill = qs("[data-nav-pill]", item);
        if (pill) {
          pill.classList.remove("bg-secondary-fixed", "text-primary");
          pill.classList.add("bg-surface-container-high", "text-on-surface-variant");
        }
      }
    });

    link.setAttribute("aria-current", "true");
    if (!link.classList.contains("material-link")) {
      const pill = qs("[data-nav-pill]", link);
      if (pill) {
        pill.classList.add("bg-secondary-fixed", "text-primary");
        pill.classList.remove("bg-surface-container-high", "text-on-surface-variant");
      }
    }
  }

  function showSection(sectionId, options) {
    const opts = options || {};
    const panels = qsa("[data-theme-panel]");
    const link = navLinks().find(function (item) {
      return item.getAttribute("data-section") === String(sectionId);
    });
    if (!link || !panels.length) return;

    panels.forEach(function (panel) {
      panel.classList.toggle("hidden", panel.getAttribute("data-theme-panel") !== String(sectionId));
    });

    setActiveLink(link);
    activeSectionId = sectionId;

    if (bannerName) {
      const label = qs("[data-nav-label]", link);
      bannerName.textContent = label ? label.textContent.trim() : link.textContent.trim();
    }

    const isMaterial = link.classList.contains("material-link");
    const theory = theoryLinks();
    if (pager) pager.classList.toggle("hidden", isMaterial || theory.length <= 1);
    if (!isMaterial) {
      const idx = theoryIndex();
      if (prevBtn) prevBtn.disabled = idx <= 0;
      if (nextBtn) nextBtn.disabled = idx >= theory.length - 1;
    }

    initCharts(sectionId);
    renderFormulas();
    highlightCode();

    if (opts.updateHash !== false && window.history && window.location.hash !== "#" + sectionId) {
      window.history.replaceState(null, "", "#" + sectionId);
    }
    if (opts.scroll !== false) window.scrollTo({ top: 0, behavior: "smooth" });

    document.dispatchEvent(new CustomEvent("subject:section-shown", { detail: { sectionId: sectionId } }));
  }

  function initChrome() {
    if (menuBtn) menuBtn.addEventListener("click", openSidebar);
    if (overlay) overlay.addEventListener("click", closeSidebar);
  }

  function initDelegatedEvents() {
    if (document.documentElement.getAttribute("data-subject-events") === "ready") return;
    document.documentElement.setAttribute("data-subject-events", "ready");

    document.addEventListener("click", function (event) {
      const navLink = event.target.closest(".theme-link");
      if (navLink) {
        event.preventDefault();
        showSection(navLink.getAttribute("data-section"));
        if (window.matchMedia("(max-width: 1023px)").matches) closeSidebar();
        return;
      }

      const copyBtn = event.target.closest("[data-copy-code]");
      if (copyBtn) {
        copyCode(copyBtn);
        return;
      }

      const flashcard = event.target.closest("[data-flashcard]");
      if (flashcard) {
        flashcard.classList.toggle("flipped");
        return;
      }

      const tabBtn = event.target.closest(".tab-btn");
      if (tabBtn) {
        activateTab(tabBtn);
        return;
      }

      const quizOption = event.target.closest("[data-quiz-option]");
      if (quizOption) {
        evaluateQuizOption(quizOption);
        return;
      }

      const binaryOption = event.target.closest("[data-binary-option]");
      if (binaryOption) {
        evaluateBinaryOption(binaryOption);
        return;
      }

      const matchingBtn = event.target.closest("[data-check-matching]");
      if (matchingBtn) {
        evaluateMatching(matchingBtn);
        return;
      }

      const multiBtn = event.target.closest("[data-check-multiselect]");
      if (multiBtn) {
        evaluateMultiSelect(multiBtn);
        return;
      }

      const fillBtn = event.target.closest("[data-check-fill-blank]");
      if (fillBtn) {
        evaluateFillBlank(fillBtn);
      }
    });

    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        const links = theoryLinks();
        const idx = theoryIndex();
        if (idx > 0) showSection(links[idx - 1].getAttribute("data-section"));
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        const links = theoryLinks();
        const idx = theoryIndex();
        if (idx >= 0 && idx < links.length - 1) showSection(links[idx + 1].getAttribute("data-section"));
      });
    }
  }

  function enhanceRenderedContent() {
    initCarousels();
    initPodcasts();
    renderFormulas();
    highlightCode();

    const requested = decodeURIComponent((window.location.hash || "").replace(/^#/, ""));
    const initialLink = requested ? qs('.theme-link[data-section="' + CSS.escape(requested) + '"]') : null;
    const active = initialLink || qs('.theme-link[aria-current="true"]') || qs(".theme-link");
    if (active) showSection(active.getAttribute("data-section"), { scroll: false, updateHash: !!requested });
  }

  function renderFormulas() {
    if (typeof katex === "undefined") return;
    qsa("[data-formula]").forEach(function (el) {
      const source = el.getAttribute("data-formula");
      if (!source) return;
      try {
        katex.render(source, el, { displayMode: true, throwOnError: false });
      } catch (err) {
        el.textContent = source;
      }
    });
    qsa("[data-formula-inline]").forEach(function (el) {
      const source = el.getAttribute("data-formula-inline");
      if (!source) return;
      try {
        katex.render(source, el, { displayMode: false, throwOnError: false });
      } catch (err) {
        el.textContent = source;
      }
    });
    // Inline math embedded in prose via $...$ ($$...$$ for display) -> see withInlineMath().
    qsa("[data-math-inline]").forEach(function (el) {
      if (el.getAttribute("data-math-done")) return;
      const source = el.getAttribute("data-math-inline");
      if (!source) return;
      try {
        katex.render(source, el, { displayMode: false, throwOnError: false });
        el.setAttribute("data-math-done", "1");
      } catch (err) {
        el.textContent = source;
      }
    });
    qsa("[data-math-block]").forEach(function (el) {
      if (el.getAttribute("data-math-done")) return;
      const source = el.getAttribute("data-math-block");
      if (!source) return;
      try {
        katex.render(source, el, { displayMode: true, throwOnError: false });
        el.setAttribute("data-math-done", "1");
      } catch (err) {
        el.textContent = source;
      }
    });
  }

  function highlightCode() {
    if (!window.hljs) return;
    qsa("pre code").forEach(function (code) {
      if (code.getAttribute("data-highlighted") === "yes") return;
      window.hljs.highlightElement(code);
    });
  }

  function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }

    return new Promise(function (resolve, reject) {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
        resolve();
      } catch (err) {
        reject(err);
      } finally {
        document.body.removeChild(textarea);
      }
    });
  }

  function copyCode(button) {
    const block = button.closest("[data-code-block]");
    const code = block ? qs("code", block) : null;
    const label = qs("[data-copy-label]", button);
    if (!code) return;

    const original = label ? label.textContent : "";
    copyToClipboard(code.textContent).then(function () {
      button.classList.add("bg-secondary-fixed", "text-primary");
      if (label) label.textContent = "Copiado";
      window.setTimeout(function () {
        button.classList.remove("bg-secondary-fixed", "text-primary");
        if (label) label.textContent = original || "Copiar";
      }, 1600);
    }).catch(function () {
      if (label) label.textContent = "No copiado";
      window.setTimeout(function () {
        if (label) label.textContent = original || "Copiar";
      }, 1600);
    });
  }

  function activateTab(button) {
    const group = button.closest("[data-tabs]");
    if (!group) return;
    const index = button.getAttribute("data-tab");
    qsa(".tab-pane", group).forEach(function (pane) {
      pane.classList.toggle("hidden", pane.getAttribute("data-pane") !== index);
    });
    qsa(".tab-btn", group).forEach(function (item) {
      const active = item === button;
      item.classList.toggle("border-secondary-fixed", active);
      item.classList.toggle("text-primary", active);
      item.classList.toggle("border-transparent", !active);
      item.classList.toggle("text-on-surface-variant", !active);
    });
  }

  function celebrateCorrect() {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const burst = document.createElement("div");
    const colors = ["#c0f500", "#00a8b8", "#ff7900", "#ffe086", "#1a2403"];
    burst.className = "confetti-burst";
    for (let i = 0; i < 42; i += 1) {
      const piece = document.createElement("span");
      piece.className = "confetti-piece";
      piece.style.left = Math.round(Math.random() * 100) + "vw";
      piece.style.background = colors[i % colors.length];
      piece.style.animationDelay = Math.round(Math.random() * 180) + "ms";
      piece.style.setProperty("--confetti-x", (Math.round(Math.random() * 220) - 110) + "px");
      burst.appendChild(piece);
    }
    document.body.appendChild(burst);
    window.setTimeout(function () {
      if (burst.parentNode) burst.parentNode.removeChild(burst);
    }, 1300);
  }

  function evaluateQuizOption(button) {
    const question = button.closest("[data-quiz-question]");
    if (!question) return;
    const correct = button.getAttribute("data-correct") === "true";
    const feedback = qs("[data-quiz-feedback]", question);

    qsa("[data-quiz-option]", question).forEach(function (option) {
      option.classList.remove("quiz-option-correct", "quiz-option-wrong");
      option.setAttribute("aria-pressed", "false");
    });

    button.setAttribute("aria-pressed", "true");
    button.classList.add(correct ? "quiz-option-correct" : "quiz-option-wrong");
    if (correct) celebrateCorrect();

    if (feedback) {
      feedback.textContent = button.getAttribute("data-feedback") || (correct ? "Muy bien: la respuesta es correcta." : "Revisa la retroalimentación e intenta de nuevo.");
      feedback.classList.remove("hidden");
      feedback.classList.toggle("quiz-feedback-correct", correct);
      feedback.classList.toggle("quiz-feedback-wrong", !correct);
    }
  }

  function setActivityFeedback(root, ok) {
    const feedback = qs("[data-activity-feedback]", root);
    if (!feedback) return;
    feedback.textContent = ok ? (root.getAttribute("data-feedback-correct") || "Correcto.") : (root.getAttribute("data-feedback-incomplete") || "Revisa las respuestas.");
    feedback.classList.remove("hidden", "quiz-feedback-correct", "quiz-feedback-wrong");
    feedback.classList.add(ok ? "quiz-feedback-correct" : "quiz-feedback-wrong");
    if (ok) celebrateCorrect();
  }

  function evaluateBinaryOption(button) {
    const question = button.closest("[data-binary-question]");
    if (!question) return;
    const correct = button.getAttribute("data-correct") === "true";
    const feedback = qs("[data-binary-feedback]", question);

    qsa("[data-binary-option]", question).forEach(function (option) {
      option.classList.remove("quiz-option-correct", "quiz-option-wrong");
      option.setAttribute("aria-pressed", "false");
    });

    button.setAttribute("aria-pressed", "true");
    button.classList.add(correct ? "quiz-option-correct" : "quiz-option-wrong");
    if (correct) celebrateCorrect();

    if (feedback) {
      feedback.textContent = button.getAttribute("data-feedback") || (correct ? "Muy bien: la respuesta es correcta." : "Revisa el recurso y vuelve a intentarlo.");
      feedback.classList.remove("hidden", "quiz-feedback-correct", "quiz-feedback-wrong");
      feedback.classList.add(correct ? "quiz-feedback-correct" : "quiz-feedback-wrong");
    }
  }

  function evaluateMatching(button) {
    const root = button.closest("[data-matching-activity]");
    if (!root) return;
    let ok = true;
    qsa("[data-match-select]", root).forEach(function (select) {
      const correct = select.getAttribute("data-correct");
      const itemOk = select.value === correct;
      ok = ok && itemOk;
      select.classList.toggle("activity-input-correct", itemOk);
      select.classList.toggle("activity-input-wrong", !itemOk);
    });
    setActivityFeedback(root, ok);
  }

  function evaluateMultiSelect(button) {
    const root = button.closest("[data-multiselect-activity]");
    if (!root) return;
    let ok = true;
    qsa("[data-multi-option]", root).forEach(function (input) {
      const expected = input.getAttribute("data-correct") === "true";
      const itemOk = input.checked === expected;
      const label = input.closest(".activity-check-option");
      ok = ok && itemOk;
      if (label) {
        label.classList.toggle("activity-option-correct", itemOk);
        label.classList.toggle("activity-option-wrong", !itemOk);
      }
    });
    setActivityFeedback(root, ok);
  }

  function normalizeAnswer(value) {
    return String(value || "").trim().toLowerCase().replace(/\s+/g, " ");
  }

  function evaluateFillBlank(button) {
    const root = button.closest("[data-fill-blank-activity]");
    if (!root) return;
    let ok = true;
    qsa("[data-fill-input]", root).forEach(function (input) {
      const answers = String(input.getAttribute("data-answers") || "").split("|").map(normalizeAnswer).filter(Boolean);
      const itemOk = answers.indexOf(normalizeAnswer(input.value)) !== -1;
      ok = ok && itemOk;
      input.classList.toggle("activity-input-correct", itemOk);
      input.classList.toggle("activity-input-wrong", !itemOk);
    });
    setActivityFeedback(root, ok);
  }

  function initCarousels() {
    qsa("[data-carousel]").forEach(function (root) {
      if (root.getAttribute("data-carousel-ready") === "true") return;
      root.setAttribute("data-carousel-ready", "true");

      const track = qs("[data-carousel-track]", root);
      const slides = qsa("[data-carousel-slide]", root);
      const dotsHost = qs("[data-carousel-dots]", root.parentElement);
      if (!track || !slides.length) return;
      let index = 0;

      const dots = slides.map(function (_, i) {
        const dot = document.createElement("button");
        dot.className = "carousel-dot";
        dot.setAttribute("aria-label", "Ir al slide " + (i + 1));
        dot.addEventListener("click", function () { go(i); });
        if (dotsHost) dotsHost.appendChild(dot);
        return dot;
      });

      function go(i) {
        index = (i + slides.length) % slides.length;
        track.style.transform = "translateX(-" + (index * 100) + "%)";
        dots.forEach(function (dot, di) {
          if (di === index) dot.setAttribute("aria-current", "true");
          else dot.removeAttribute("aria-current");
        });
      }

      const prev = qs("[data-carousel-prev]", root);
      const next = qs("[data-carousel-next]", root);
      if (prev) prev.addEventListener("click", function () { go(index - 1); });
      if (next) next.addEventListener("click", function () { go(index + 1); });
      go(0);
    });
  }

  // Chart.js renders axis ticks, legend labels, dataset labels and axis/plugin titles as PLAIN
  // TEXT — it cannot render KaTeX. So any LaTeX/$...$ in those fields would show raw (e.g. "$\sigma$").
  // This converts such text to readable Unicode and strips delimiters. Rich notation belongs in the
  // chart title/note (which DO render KaTeX), not in labels.
  var LATEX_TO_UNICODE = {
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
  var SUPERSCRIPTS = { "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹", "n": "ⁿ", "i": "ⁱ", "+": "⁺", "-": "⁻", "x": "ˣ", "y": "ʸ" };
  var SUBSCRIPTS = { "0": "₀", "1": "₁", "2": "₂", "3": "₃", "4": "₄", "5": "₅", "6": "₆", "7": "₇", "8": "₈", "9": "₉", "i": "ᵢ", "j": "ⱼ", "n": "ₙ", "x": "ₓ", "a": "ₐ", "+": "₊", "-": "₋", "t": "ₜ" };

  function mapScript(seq, table) {
    var out = "";
    for (var i = 0; i < seq.length; i += 1) {
      if (table[seq[i]] == null) return null; // unmappable -> caller keeps a plain fallback
      out += table[seq[i]];
    }
    return out;
  }

  function latexToPlainText(value) {
    if (typeof value !== "string" || value.indexOf("$") === -1 && value.indexOf("\\") === -1 && value.indexOf("^") === -1 && value.indexOf("_") === -1) return value;
    var s = String(value).replace(/\\\$/g, " DOLLAR ");
    s = s.replace(/\$\$?([^$]*)\$\$?/g, "$1"); // drop $...$ / $$...$$ delimiters, keep inner
    s = s.replace(/\\(?:left|right|displaystyle|text|mathrm|mathbf|operatorname)\b/g, ""); // drop wrappers
    s = s.replace(/\\frac\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g, "$1/$2"); // \frac{a}{b} -> a/b
    s = s.replace(/\\sqrt\s*\{([^{}]*)\}/g, "√($1)"); // \sqrt{x} -> √(x)
    Object.keys(LATEX_TO_UNICODE).forEach(function (cmd) {
      s = s.split(cmd).join(LATEX_TO_UNICODE[cmd]);
    });
    // superscripts/subscripts: ^{...}, ^x, _{...}, _x
    s = s.replace(/\^\{([^{}]*)\}|\^(\S)/g, function (m, g1, g2) { var seq = g1 != null ? g1 : g2; var u = mapScript(seq, SUPERSCRIPTS); return u != null ? u : "^" + seq; });
    s = s.replace(/_\{([^{}]*)\}|_(\S)/g, function (m, g1, g2) { var seq = g1 != null ? g1 : g2; var u = mapScript(seq, SUBSCRIPTS); return u != null ? u : "_" + seq; });
    s = s.replace(/[{}]/g, "").replace(/\\,|\\;|\\!|\\ /g, " ").replace(/\\/g, ""); // strip leftover braces/spacing/backslashes
    s = s.replace(/ DOLLAR /g, "$").replace(/\s+/g, " ").trim();
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
      if (opts.scales) Object.keys(opts.scales).forEach(function (k) {
        var ax = opts.scales[k];
        if (ax && ax.title && typeof ax.title.text === "string") ax.title.text = latexToPlainText(ax.title.text);
      });
    }
    return config;
  }

  function normalizeChartConfig(raw) {
    let config;
    try {
      config = raw ? JSON.parse(raw) : {};
    } catch (err) {
      config = {};
    }

    const type = config.type || "bar";
    const palette = [C.primaryContainer, C.secondary, C.tertiary, C.secondaryFixed, C.primary];
    const datasets = ((config.data && config.data.datasets) || []).map(function (dataset, index) {
      const next = Object.assign({}, dataset);
      if (type === "line") {
        next.borderColor = next.borderColor || palette[index % palette.length];
        next.backgroundColor = next.backgroundColor || "rgba(6, 11, 0, 0.08)";
        next.tension = next.tension == null ? 0.35 : next.tension;
        next.fill = next.fill == null ? true : next.fill;
        next.pointRadius = next.pointRadius == null ? 4 : next.pointRadius;
      } else if (type === "doughnut") {
        next.backgroundColor = next.backgroundColor || palette;
        next.borderColor = next.borderColor || "#ffffff";
        next.borderWidth = next.borderWidth == null ? 2 : next.borderWidth;
      } else {
        next.backgroundColor = next.backgroundColor || palette;
        next.borderRadius = next.borderRadius == null ? 4 : next.borderRadius;
      }
      return next;
    });

    const baseOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { font: { family: "Inter" }, color: C.onSurfaceVariant }
        }
      }
    };

    return sanitizeChartConfigText({
      type: type,
      data: {
        labels: (config.data && config.data.labels) || [],
        datasets: datasets
      },
      options: Object.assign({}, baseOptions, config.options || {})
    });
  }

  function buildChart(canvas) {
    if (typeof Chart === "undefined" || chartInstances.has(canvas)) return;
    const config = normalizeChartConfig(canvas.getAttribute("data-chart-config"));
    const ctx = canvas.getContext("2d");
    chartInstances.set(canvas, new Chart(ctx, config));
  }

  function initCharts(sectionId) {
    const panel = qs('[data-theme-panel="' + CSS.escape(String(sectionId)) + '"]');
    if (!panel) return;
    qsa("canvas[data-chart]", panel).forEach(buildChart);
  }

  function initPodcasts() {
    function fmtTime(s) {
      if (!isFinite(s) || s < 0) s = 0;
      const m = Math.floor(s / 60);
      const sec = Math.floor(s % 60);
      return m + ":" + (sec < 10 ? "0" : "") + sec;
    }

    qsa("[data-podcast]").forEach(function (root) {
      if (root.getAttribute("data-podcast-ready") === "true") return;
      root.setAttribute("data-podcast-ready", "true");

      const audio = qs("[data-pc-audio]", root);
      const playBtn = qs("[data-pc-play]", root);
      const icon = qs("[data-pc-icon]", root);
      const back = qs("[data-pc-back]", root);
      const fwd = qs("[data-pc-fwd]", root);
      const bar = qs("[data-pc-bar]", root);
      const fill = qs("[data-pc-fill]", root);
      const cur = qs("[data-pc-current]", root);
      const dur = qs("[data-pc-duration]", root);
      const rateBtn = qs("[data-pc-rate]", root);
      if (!audio || !playBtn) return;

      const src = root.getAttribute("data-src");
      if (src) audio.src = src;

      function setIcon(name) {
        if (icon) icon.textContent = name;
      }

      playBtn.addEventListener("click", function () {
        if (!audio.src) return;
        if (audio.paused) audio.play(); else audio.pause();
      });
      audio.addEventListener("play", function () { setIcon("pause"); });
      audio.addEventListener("pause", function () { setIcon("play_arrow"); });
      audio.addEventListener("ended", function () { setIcon("play_arrow"); });
      audio.addEventListener("loadedmetadata", function () {
        if (dur) dur.textContent = fmtTime(audio.duration);
      });
      audio.addEventListener("timeupdate", function () {
        const pct = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
        if (fill) fill.style.width = pct + "%";
        if (cur) cur.textContent = fmtTime(audio.currentTime);
      });

      if (back) back.addEventListener("click", function () { audio.currentTime = Math.max(0, audio.currentTime - 10); });
      if (fwd) fwd.addEventListener("click", function () { audio.currentTime = Math.min(audio.duration || 0, audio.currentTime + 10); });

      if (bar) {
        bar.addEventListener("click", function (event) {
          if (!audio.duration) return;
          const rect = bar.getBoundingClientRect();
          const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
          audio.currentTime = ratio * audio.duration;
        });
      }

      const rates = [1, 1.25, 1.5, 2, 0.75];
      let ri = 0;
      if (rateBtn) {
        rateBtn.addEventListener("click", function () {
          ri = (ri + 1) % rates.length;
          audio.playbackRate = rates[ri];
          rateBtn.textContent = rates[ri] + "x";
        });
      }
    });
  }

  initChrome();
  initDelegatedEvents();

  document.addEventListener("subject:content-rendered", enhanceRenderedContent);
  window.addEventListener("load", function () {
    renderFormulas();
    highlightCode();
    if (activeSectionId) initCharts(activeSectionId);
  });

  // Enhance an arbitrary subtree (e.g. the embedded PDF preview): render KaTeX formulas/inline-math,
  // build any SCORM-style charts (canvas[data-chart]) within it, and highlight code. Does NOT touch
  // SCORM navigation, so it is safe to call on the PDF preview root.
  function enhanceWithin(root) {
    if (!root) return;
    renderFormulas();
    highlightCode();
    qsa("canvas[data-chart]", root).forEach(buildChart);
  }

  window.subjectShowSection = showSection;
  window.subjectEnhanceContent = enhanceRenderedContent;
  window.subjectEnhanceWithin = enhanceWithin;
})();
