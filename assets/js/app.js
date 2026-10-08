/*
 * James Patricio — Portfolio v2 · app.js
 * Vanilla JS, no dependencies, works on GitHub Pages and from file://.
 * Every feature is isolated in safe() so one failure never breaks the page.
 */
(function () {
  "use strict";

  var doc = document;
  var root = doc.documentElement;
  var SITE = window.SITE;
  var BOOT = window.__BOOT || { date: Date.now(), day: new Date().getDate(), simulated: false };

  function unhide() { root.classList.remove("i18n-pending"); }
  if (!SITE || !SITE.ui) { unhide(); console.error("[portfolio] content.js did not load"); return; }

  var CFG = SITE.config || {};
  var mqReduce = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : { matches: false };
  var mqFine = window.matchMedia ? window.matchMedia("(hover: hover) and (pointer: fine)") : { matches: false };
  var mqWide = window.matchMedia ? window.matchMedia("(min-width: 1100px)") : { matches: true };
  var hasIO = "IntersectionObserver" in window;
  var initialRenderDone = false;

  var state = {
    lang: resolveLang(),
    theme: root.getAttribute("data-theme") === "brown" ? "brown" : "wine",
    themeSrc: root.getAttribute("data-theme-src") || "auto",
    ganttIndex: 0,
    ledgerFilter: "all"
  };

  /* ---------------------------------------------------------------- utils */
  function safe(name, fn) {
    try { fn(); } catch (err) { console.error("[portfolio] " + name + " failed:", err); }
  }
  function $(sel, ctx) { return (ctx || doc).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); }
  function t(v) {
    if (v == null) return "";
    if (typeof v === "string" || typeof v === "number") return String(v);
    if (v[state.lang] != null) return v[state.lang];
    return v.en != null ? v.en : "";
  }
  function ui(key) {
    var dict = SITE.ui[state.lang] || {};
    var v = dict[key];
    if (v == null) v = (SITE.ui.en || {})[key];
    return v == null ? "" : v;
  }
  function shown(item) { return item && item.visible !== false; }
  function pad2(n) { return (n < 10 ? "0" : "") + n; }
  function clamp(v, a, b) { return Math.min(b, Math.max(a, v)); }
  function storeGet(store, k) { try { return window[store].getItem(k); } catch (e) { return null; } }
  function storeSet(store, k, v) { try { window[store].setItem(k, v); } catch (e) { /* private mode */ } }
  function storeDel(store, k) { try { window[store].removeItem(k); } catch (e) { /* private mode */ } }

  /* Small DOM builder: el("p", { class: "x", text: "..." }, [children]) */
  function el(tag, attrs, children) {
    var node = doc.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        var v = attrs[k];
        if (v == null || v === false) return;
        if (k === "class") node.className = v;
        else if (k === "text") node.textContent = v;
        else if (k === "html") node.innerHTML = v; /* only used with authored content.js strings */
        else node.setAttribute(k, v === true ? "" : v);
      });
    }
    (children || []).forEach(function (c) {
      if (c == null || c === false) return;
      node.appendChild(typeof c === "string" ? doc.createTextNode(c) : c);
    });
    return node;
  }
  function icon(name, cls) {
    var ns = "http://www.w3.org/2000/svg";
    var svg = doc.createElementNS(ns, "svg");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    if (cls) svg.setAttribute("class", cls);
    var use = doc.createElementNS(ns, "use");
    use.setAttribute("href", "#i-" + name);
    svg.appendChild(use);
    return svg;
  }
  function clear(node) { while (node && node.firstChild) node.removeChild(node.firstChild); return node; }
  function debounce(fn, ms) {
    var id;
    return function () { clearTimeout(id); id = setTimeout(fn, ms); };
  }
  function rafThrottle(fn) {
    var queued = false;
    return function () {
      if (queued) return;
      queued = true;
      window.requestAnimationFrame(function () { queued = false; fn(); });
    };
  }

  /* --------------------------------------------------------------- dates */
  var MONTHS = {
    en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    pt: ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"]
  };
  function parseYM(s) {
    if (!s) return null;
    var m = /^(\d{4})-(\d{2})$/.exec(s);
    if (!m) return null;
    return { y: +m[1], m: +m[2] };
  }
  function todayYM() { var d = new Date(); return { y: d.getFullYear(), m: d.getMonth() + 1 }; }
  function ymIndex(ym) { return ym.y * 12 + (ym.m - 1); }
  function fmtYM(ym) { return ym ? MONTHS[state.lang][ym.m - 1] + " " + ym.y : ""; }
  /* inclusive month count, same convention as LinkedIn (Feb–Oct = 9) */
  function monthsBetween(a, b) { return ymIndex(b) - ymIndex(a) + 1; }
  function fmtDuration(m) {
    var y = Math.floor(m / 12), r = m % 12, out = [];
    if (state.lang === "pt") {
      if (y) out.push(y + (y > 1 ? " anos" : " ano"));
      if (r) out.push(r + (r > 1 ? " meses" : " mês"));
    } else {
      if (y) out.push(y + " yr");
      if (r) out.push(r + " mo");
    }
    return out.join(" ");
  }
  function rangeLabel(item) {
    var s = parseYM(item.start), e = parseYM(item.end);
    var endLabel = e ? fmtYM(e) : ui("path.present");
    var dur = s ? fmtDuration(monthsBetween(s, e || todayYM())) : "";
    return { range: fmtYM(s) + " — " + endLabel, dur: dur, current: !e };
  }

  /* ------------------------------------------------------------- i18n */
  function resolveLang() {
    if (BOOT.lang === "en" || BOOT.lang === "pt") return BOOT.lang;
    if (CFG.autoDetectLang) {
      var nl = (navigator.languages && navigator.languages[0]) || navigator.language || "";
      if (/^pt/i.test(nl)) return "pt";
    }
    return CFG.defaultLang === "pt" ? "pt" : "en";
  }

  var htmlProbe = doc.createElement("template");
  function sameHTML(node, html) {
    htmlProbe.innerHTML = html;
    return htmlProbe.innerHTML === node.innerHTML;
  }

  function applyI18n() {
    /* Only write when the text differs: the English markup already in index.html
       is left untouched, so the hero is not repainted after the scripts run. */
    $$("[data-i18n]").forEach(function (n) {
      var v = ui(n.getAttribute("data-i18n"));
      if (v !== "" && n.textContent !== v) n.textContent = v;
    });
    $$("[data-i18n-html]").forEach(function (n) {
      var v = ui(n.getAttribute("data-i18n-html"));
      if (v !== "" && !sameHTML(n, v)) n.innerHTML = v;
    });
    $$("[data-i18n-attr]").forEach(function (n) {
      n.getAttribute("data-i18n-attr").split(";").forEach(function (pair) {
        var i = pair.indexOf(":");
        if (i < 1) return;
        var attr = pair.slice(0, i).trim(), v = ui(pair.slice(i + 1).trim());
        if (v !== "" && n.getAttribute(attr) !== v) n.setAttribute(attr, v);
      });
    });
    root.lang = state.lang === "pt" ? "pt-BR" : "en";
    var title = ui("meta.title");
    if (title) doc.title = title;
    var desc = $('meta[name="description"]');
    if (desc && ui("meta.description")) desc.setAttribute("content", ui("meta.description"));
    $$("[data-lang]").forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-lang") === state.lang ? "true" : "false");
    });
  }

  function setLang(lang) {
    if (lang !== "en" && lang !== "pt") return;
    if (lang === state.lang && initialRenderDone) return;
    state.lang = lang;
    storeSet("localStorage", "jp-lang", lang);
    renderAll();
  }

  /* ------------------------------------------------------------ theme */
  function dayOf() { return new Date(BOOT.date).getDate(); }
  function dailyTheme(day) { return day % 2 === 0 ? "wine" : "brown"; }

  function paintTheme(theme) {
    var apply = function () {
      root.setAttribute("data-theme", theme);
      var fav = $("#favicon");
      if (fav) fav.setAttribute("href", "assets/img/favicon-" + theme + ".svg");
      var tc = $('meta[name="theme-color"]');
      if (tc) tc.setAttribute("content", theme === "wine" ? "#0f0508" : "#0e0905");
    };
    if (doc.startViewTransition && !mqReduce.matches && initialRenderDone) {
      try { doc.startViewTransition(apply); return; } catch (e) { /* fall through */ }
    }
    apply();
  }

  function setTheme(theme, src) {
    if (theme !== "wine" && theme !== "brown") return;
    state.theme = theme;
    state.themeSrc = src;
    root.setAttribute("data-theme-src", src);
    if (src === "manual") storeSet("sessionStorage", "jp-theme", theme);
    if (src === "auto") storeDel("sessionStorage", "jp-theme");
    paintTheme(theme);
    updateThemeLabels();
  }

  function updateThemeLabels() {
    var name = ui("theme." + state.theme);
    var day = dayOf();
    var parity = ui(day % 2 === 0 ? "theme.even" : "theme.odd");
    var suffix = "";
    if (state.themeSrc === "manual" || state.themeSrc === "url") suffix = " · " + ui("theme.manual");
    else if (state.themeSrc === "date") suffix = " · sim";
    $$("[data-theme-short]").forEach(function (n) { n.textContent = name; });
    $$("[data-theme-long]").forEach(function (n) {
      n.textContent = ui("theme.day") + " " + pad2(day) + " · " + name + suffix;
    });
    $$("[data-theme-note]").forEach(function (n) {
      n.textContent = name + " (" + (state.themeSrc === "auto" || state.themeSrc === "date" ? parity : ui("theme.manual")) + ")";
    });
    var autoBtn = $("[data-theme-auto]");
    if (autoBtn) autoBtn.hidden = !(state.themeSrc === "manual" || state.themeSrc === "url");
  }

  function initTheme() {
    $$("[data-theme-toggle]").forEach(function (b) {
      b.addEventListener("click", function () {
        setTheme(state.theme === "wine" ? "brown" : "wine", "manual");
      });
    });
    var autoBtn = $("[data-theme-auto]");
    if (autoBtn) {
      autoBtn.addEventListener("click", function () {
        BOOT.date = Date.now();
        setTheme(dailyTheme(dayOf()), "auto");
      });
    }
    /* Roll over at local midnight when the page stays open (only for the daily rule). */
    var lastDay = new Date().getDate();
    function checkDay() {
      var now = new Date();
      if (now.getDate() !== lastDay) {
        lastDay = now.getDate();
        if (state.themeSrc === "auto") {
          BOOT.date = now.getTime();
          root.setAttribute("data-day", String(lastDay));
          setTheme(dailyTheme(lastDay), "auto");
        }
      }
    }
    function scheduleMidnight() {
      var now = new Date();
      var next = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 2);
      setTimeout(function () { checkDay(); scheduleMidnight(); }, Math.max(1000, next - now));
    }
    scheduleMidnight();
    doc.addEventListener("visibilitychange", function () { if (!doc.hidden) checkDay(); });
    updateThemeLabels();
  }

  /* ------------------------------------------------------------ renderers */
  function renderConsole() {
    var list = $('[data-render="console"]');
    if (!list || !SITE.console) return;
    /* index.html already ships these lines (no layout shift); rebuild only if content.js changed them */
    var current = $$("li", list).map(function (li) { return li.children[0] && li.children[0].textContent + "|" + (li.children[1] && li.children[1].textContent); }).join(";");
    var wanted = SITE.console.map(function (l) { return l.k + "|" + l.v; }).join(";");
    if (current === wanted) return;
    clear(list);
    SITE.console.forEach(function (line) {
      list.appendChild(el("li", null, [
        el("span", { class: "k", text: line.k }),
        el("span", { text: line.v }),
        el("span", { class: line.s === "200" ? "n" : "ok", text: line.s === "200" ? "200" : "✓" })
      ]));
    });
  }

  function renderBand() {
    var track = $('[data-render="band"]');
    if (!track) return;
    var items = ui("band");
    if (!Array.isArray(items) || !items.length) return;
    clear(track);
    var set = el("div", { class: "band__set", style: "display:flex" });
    items.forEach(function (w) { set.appendChild(el("span", { class: "band__item", text: w })); });
    track.appendChild(set);
    /* repeat until one set is wider than the band, then duplicate for a seamless -50% loop.
       Two reads, then writes only: no layout thrashing. */
    var band = track.parentNode;
    var bandW = band ? band.getBoundingClientRect().width : window.innerWidth;
    var setW = set.getBoundingClientRect().width;
    var reps = setW > 0 ? Math.min(8, Math.ceil(bandW / setW) - 1) : 0;
    var frag = doc.createDocumentFragment();
    for (var r = 0; r < reps; r++) {
      items.forEach(function (w) { frag.appendChild(el("span", { class: "band__item", text: w })); });
    }
    set.appendChild(frag);
    track.appendChild(set.cloneNode(true));
  }

  function renderScope() {
    var list = $('[data-render="scope"]');
    if (!list || !SITE.disciplines) return;
    clear(list);
    SITE.disciplines.filter(shown).forEach(function (d, i) {
      var chips = el("ul", { class: "chip-list", role: "list" });
      (d.tags || []).forEach(function (tag) { chips.appendChild(el("li", { class: "chip", text: t(tag) })); });
      list.appendChild(el("li", { class: "scope__row spot", "data-reveal": true, style: "--d:" + (i * 0.06) + "s" }, [
        el("span", { class: "scope__n", "aria-hidden": "true", text: pad2(i + 1) }),
        el("h3", { class: "scope__name", text: t(d.name) }),
        el("p", { class: "scope__body", text: t(d.body) }),
        chips
      ]));
    });
  }

  function renderStack() {
    var list = $('[data-render="stack"]');
    if (!list || !SITE.stack) return;
    clear(list);
    var stages = SITE.stack.filter(shown);
    list.style.setProperty("--stages", String(stages.length));
    stages.forEach(function (s, i) {
      var chips = el("ul", { class: "chip-list", role: "list" });
      (s.tools || []).forEach(function (tool) { chips.appendChild(el("li", { class: "chip", text: t(tool) })); });
      list.appendChild(el("li", { class: "stage", "data-reveal": true, style: "--d:" + (i * 0.08) + "s" }, [
        el("div", { class: "stage__node", "aria-hidden": "true" }, [
          el("span", { class: "stage__dot", text: pad2(i + 1) }),
          el("span", { class: "stage__pulse" })
        ]),
        el("p", { class: "stage__label", text: t(s.label) }),
        el("h3", { class: "stage__title", text: t(s.title) }),
        el("p", { class: "stage__desc", text: t(s.desc) }),
        chips
      ]));
    });
  }

  function renderLangs() {
    var box = $('[data-render="langs"]');
    if (!box || !SITE.languages) return;
    clear(box);
    var L = SITE.languages;
    [["stack.code", L.code], ["stack.spoken", L.spoken], ["stack.practice", L.practice], ["stack.workflow", L.workflow]].forEach(function (g) {
      if (!g[1] || !g[1].length) return;
      var chips = el("ul", { class: "chip-list", role: "list" });
      g[1].forEach(function (v) { chips.appendChild(el("li", { class: "chip", text: t(v) })); });
      box.appendChild(el("div", { class: "langs__group" }, [el("h3", { text: ui(g[0]) }), chips]));
    });
  }

  function renderPrinciples() {
    var list = $('[data-render="principles"]');
    if (!list || !SITE.principles) return;
    clear(list);
    SITE.principles.filter(shown).forEach(function (p, i) {
      list.appendChild(el("li", { class: "principle spot", "data-reveal": true, style: "--d:" + ((i % 3) * 0.08) + "s" }, [
        el("span", { class: "principle__n", "aria-hidden": "true", text: pad2(i + 1) }),
        el("h3", { text: t(p.title) }),
        el("p", { text: t(p.body) }),
        p.proof ? el("p", { class: "principle__proof", text: t(p.proof) }) : null
      ]));
    });
  }

  function experienceItems() { return (SITE.experience || []).filter(shown); }
  function kindLabel(kind) { return ui("path.kind." + (kind || "work")); }

  function descNode(item) {
    var ul = el("ul");
    (item.bullets || []).forEach(function (b) { ul.appendChild(el("li", { text: t(b) })); });
    return el("div", { class: "tl-desc" }, [ul]);
  }
  function tagsNode(item) {
    if (!item.tags || !item.tags.length) return null;
    var chips = el("ul", { class: "chip-list", role: "list" });
    item.tags.forEach(function (tag) { chips.appendChild(el("li", { class: "chip", text: tag })); });
    return chips;
  }
  function whenNode(item) {
    var r = rangeLabel(item);
    return el("p", { class: "tl-when" }, [
      r.current ? el("span", { class: "now", text: "● " + ui("path.now") + " · " }) : null,
      r.range + (r.dur ? " · " + r.dur : "")
    ]);
  }

  function renderTimeline(force) {
    var list = $('[data-render="timeline"]');
    if (!list) return;
    clear(list);
    /* the vertical timeline is only shown below 1100px (and when printing) */
    if (mqWide.matches && force !== true) return;
    list.appendChild(el("li", { class: "timeline__spine", "aria-hidden": "true" }, [el("span", { class: "tube tube--v" })]));
    experienceItems().forEach(function (item) {
      list.appendChild(el("li", { class: "tl-item", "data-reveal": true }, [
        whenNode(item),
        el("h3", { class: "tl-role", text: t(item.role) }),
        el("p", { class: "tl-org" }, [t(item.org), el("span", { class: "kind", text: " · " + t(item.place) })]),
        descNode(item),
        tagsNode(item)
      ]));
    });
  }

  function renderGantt() {
    var box = $('[data-render="gantt"]');
    if (!box) return;
    clear(box);
    /* the Gantt chart is only shown from 1100px up */
    if (!mqWide.matches) return;
    var items = experienceItems();
    if (!items.length) return;
    var now = todayYM();
    var from = { y: CFG.ganttFrom || 2020, m: 1 };
    items.forEach(function (it) { var s = parseYM(it.start); if (s && s.y < from.y) from = { y: s.y, m: 1 }; });
    var to = { y: now.y + 1, m: 1 };
    var total = ymIndex(to) - ymIndex(from);
    var pct = function (ym) { return clamp((ymIndex(ym) - ymIndex(from)) / total * 100, 0, 100); };

    var ticks = el("div", { class: "gantt__ticks", "aria-hidden": "true" });
    for (var y = from.y; y <= to.y; y++) {
      ticks.appendChild(el("span", { style: "left:" + pct({ y: y, m: 1 }).toFixed(3) + "%", text: String(y) }));
    }
    box.appendChild(el("div", { class: "gantt__axis", "aria-hidden": "true" }, [el("span", { text: "" }), ticks]));

    var rows = el("ul", { class: "gantt__rows", role: "list" });
    var grid = el("li", { class: "gantt__grid", "aria-hidden": "true" });
    rows.appendChild(grid);
    for (var gy = from.y; gy <= to.y; gy++) {
      grid.appendChild(el("i", { style: "left:" + pct({ y: gy, m: 1 }).toFixed(3) + "%" }));
    }
    var todayPos = clamp((ymIndex(now) + (new Date().getDate() / 31) - ymIndex(from)) / total * 100, 0, 100);
    grid.appendChild(el("i", { class: "today", style: "left:" + todayPos.toFixed(3) + "%", "data-label": ui("path.today") }));

    var detailId = "gantt-detail";
    if (state.ganttIndex >= items.length) state.ganttIndex = 0;

    items.forEach(function (it, i) {
      var s = parseYM(it.start) || from;
      var e = parseYM(it.end) || now;
      var left = pct(s);
      var right = pct({ y: e.m === 12 ? e.y + 1 : e.y, m: e.m === 12 ? 1 : e.m + 1 });
      var r = rangeLabel(it);
      var cls = "gantt__bar" + (it.kind === "edu" ? " gantt__bar--edu" : "") + (it.kind === "study" ? " gantt__bar--edu" : "") + (r.current ? " gantt__bar--now" : "");
      var btn = el("button", {
        type: "button",
        class: "gantt__row",
        "aria-expanded": i === state.ganttIndex ? "true" : "false",
        "aria-controls": detailId,
        "data-index": String(i)
      }, [
        el("span", { class: "gantt__label" }, [
          el("b", { text: t(it.role) }),
          el("span", { text: t(it.org) })
        ]),
        el("span", { class: "gantt__track", "aria-hidden": "true" }, [
          el("span", { class: cls, style: "left:" + left.toFixed(3) + "%;width:" + Math.max(0.8, right - left).toFixed(3) + "%" })
        ])
      ]);
      rows.appendChild(el("li", null, [btn]));
    });
    box.appendChild(rows);

    /* align the grid with the track column */
    var firstTrack = $(".gantt__track", rows);
    function alignGrid() {
      if (!firstTrack || !mqWide.matches) return;
      var rr = rows.getBoundingClientRect(), tr = firstTrack.getBoundingClientRect();
      grid.style.left = (tr.left - rr.left) + "px";
      grid.style.width = tr.width + "px";
      ticks.parentNode && (ticks.style.marginLeft = "0px");
    }
    alignGrid();
    box._alignGrid = alignGrid;

    var detail = el("div", { class: "gantt__detail", id: detailId, "aria-live": "polite" });
    box.appendChild(detail);

    function showDetail(i, animate) {
      var it = items[i];
      if (!it) return;
      state.ganttIndex = i;
      $$(".gantt__row", rows).forEach(function (b) {
        b.setAttribute("aria-expanded", b.getAttribute("data-index") === String(i) ? "true" : "false");
      });
      clear(detail);
      detail.appendChild(el("div", { class: "gantt__detail-side" }, [
        whenNode(it),
        el("h3", { class: "tl-role", text: t(it.role) }),
        el("p", { class: "tl-org" }, [t(it.org), el("span", { class: "kind", text: " · " + t(it.place) })]),
        el("p", { class: "tl-org" }, [el("span", { class: "kind", text: kindLabel(it.kind) })])
      ]));
      detail.appendChild(el("div", null, [descNode(it), tagsNode(it)]));
      if (animate && !mqReduce.matches) {
        detail.classList.remove("is-swapping");
        void detail.offsetWidth;
        detail.classList.add("is-swapping");
      }
    }
    rows.addEventListener("click", function (ev) {
      var b = ev.target.closest && ev.target.closest(".gantt__row");
      if (b) showDetail(+b.getAttribute("data-index"), true);
    });
    rows.addEventListener("keydown", function (ev) {
      if (ev.key !== "ArrowDown" && ev.key !== "ArrowUp") return;
      var btns = $$(".gantt__row", rows);
      var idx = btns.indexOf(doc.activeElement);
      if (idx < 0) return;
      ev.preventDefault();
      var next = btns[clamp(idx + (ev.key === "ArrowDown" ? 1 : -1), 0, btns.length - 1)];
      next.focus();
      showDetail(+next.getAttribute("data-index"), true);
    });
    showDetail(state.ganttIndex, false);
  }

  var STATUS_LABEL = { soon: "work.soon", internal: "work.internal", live: "work.internal", wip: "work.internal" };

  function renderWork() {
    var list = $('[data-render="work"]');
    if (!list || !SITE.work) return;
    clear(list);
    var items = SITE.work.filter(shown);
    items.forEach(function (w, i) {
      var chips = el("ul", { class: "chip-list", role: "list" });
      (w.stack || []).forEach(function (s) { chips.appendChild(el("li", { class: "chip", text: s })); });
      var link;
      if (w.link) {
        link = el("a", { class: "card__link", href: w.link, target: "_blank", rel: "noopener noreferrer" }, [
          el("span", { text: ui("work.repo") }), icon("out")
        ]);
      } else {
        link = el("span", { class: "card__link card__link--muted", text: ui(STATUS_LABEL[w.status] || "work.internal") });
      }
      var fields = el("dl", { class: "card__fields" });
      [["work.problem", w.problem], ["work.approach", w.approach], ["work.outcome", w.outcome]].forEach(function (f) {
        if (!f[1]) return;
        fields.appendChild(el("div", null, [el("dt", { text: ui(f[0]) }), el("dd", { text: t(f[1]) })]));
      });
      var titleId = "work-" + (w.id || i);
      list.appendChild(el("li", { class: "card spot", "aria-labelledby": titleId }, [
        el("div", { class: "card__top" }, [
          el("span", { text: "W/" + pad2(i + 1) + " · " + (w.year || "") }),
          el("span", { class: "tag" + (w.status === "live" ? " tag--live" : ""), text: t(w.context) })
        ]),
        el("h3", { class: "card__title", id: titleId, text: t(w.title) }),
        el("p", { class: "card__sub", text: t(w.sub) }),
        fields,
        el("div", { class: "card__foot" }, [chips, link])
      ]));
    });
    var total = $("[data-rail-total]");
    if (total) total.textContent = pad2(items.length);
    updateRail();
  }

  function renderArchive() {
    var list = $('[data-render="archive"]');
    if (!list || !SITE.archive) return;
    clear(list);
    SITE.archive.filter(shown).forEach(function (a) {
      list.appendChild(el("li", null, [
        el("a", { href: a.link, target: "_blank", rel: "noopener noreferrer" }, [
          el("span", { class: "archive__name", text: a.name }),
          el("span", { class: "archive__year", text: a.year }),
          el("span", { class: "archive__desc", text: t(a.desc) }),
          el("span", { class: "archive__stack", text: a.stack })
        ])
      ]));
    });
  }

  var AREAS = ["security", "data", "dev", "language"];
  function credentials() { return (SITE.credentials || []).filter(shown); }

  function renderQuery() {
    var q = $("[data-query]");
    if (!q) return;
    clear(q);
    var kw = function (s) { return el("span", { class: "kw", text: s }); };
    q.appendChild(kw("SELECT"));
    q.appendChild(doc.createTextNode(" year, credential, issuer "));
    q.appendChild(kw("FROM"));
    q.appendChild(doc.createTextNode(" learning "));
    if (state.ledgerFilter !== "all") {
      q.appendChild(kw("WHERE"));
      q.appendChild(doc.createTextNode(" area = '" + state.ledgerFilter + "' "));
    }
    q.appendChild(kw("ORDER BY"));
    q.appendChild(doc.createTextNode(" year "));
    q.appendChild(kw("DESC"));
    q.appendChild(doc.createTextNode(";"));
    q.appendChild(el("span", { class: "caret" }));
  }

  function renderFilters() {
    var box = $('[data-render="filters"]');
    if (!box) return;
    clear(box);
    var all = credentials();
    var opts = ["all"].concat(AREAS.filter(function (a) { return all.some(function (c) { return c.area === a; }); }));
    opts.forEach(function (a) {
      var n = a === "all" ? all.length : all.filter(function (c) { return c.area === a; }).length;
      var b = el("button", {
        type: "button",
        class: "filter",
        "data-filter": a,
        "aria-pressed": state.ledgerFilter === a ? "true" : "false"
      }, [ui("ledger." + a) + " · " + n]);
      box.appendChild(b);
    });
  }

  function renderLedger() {
    var body = $('[data-render="ledger"]');
    if (!body) return;
    clear(body);
    credentials().forEach(function (c) {
      var nameCell = el("td", { class: "c-name" }, [t(c.name)]);
      if (c.verify) {
        nameCell.appendChild(doc.createTextNode(" "));
        nameCell.appendChild(el("a", {
          class: "verify-link",
          href: c.verify,
          target: "_blank",
          rel: "noopener noreferrer",
          "aria-label": ui("ledger.verify") + ": " + t(c.name)
        }, [el("span", { text: ui("ledger.verify") }), icon("out")]));
      }
      body.appendChild(el("tr", { class: c.featured ? "is-featured" : null, "data-area": c.area }, [
        el("td", { class: "c-year", text: c.year }),
        nameCell,
        el("td", { class: "c-issuer", text: c.issuer }),
        el("td", { class: "c-area" }, [el("span", { class: "chip", text: ui("ledger." + c.area) })])
      ]));
    });
    applyLedgerFilter();
  }

  function applyLedgerFilter() {
    var rows = $$('[data-render="ledger"] tr');
    var count = 0;
    rows.forEach(function (r) {
      var show = state.ledgerFilter === "all" || r.getAttribute("data-area") === state.ledgerFilter;
      r.hidden = !show;
      if (show) count++;
    });
    var c = $("[data-ledger-count]");
    if (c) c.textContent = "→ " + count + " " + ui("ledger.rows");
    $$("[data-filter]").forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-filter") === state.ledgerFilter ? "true" : "false");
    });
    renderQuery();
  }

  function renderEducation() {
    var box = $('[data-render="education"]');
    if (!box || !SITE.education) return;
    clear(box);
    SITE.education.filter(shown).forEach(function (e, i) {
      box.appendChild(el("article", { class: "edu__item spot", "data-reveal": true, style: "--d:" + (i * 0.08) + "s" }, [
        el("p", { class: "tl-when", text: (i === 0 ? ui("ledger.education") + " · " : "") + t(e.when) }),
        el("h3", { text: t(e.title) }),
        el("p", { text: e.org }),
        e.note ? el("p", { text: t(e.note) }) : null
      ]));
    });
  }

  function renderContact() {
    var list = $('[data-render="contact"]');
    if (!list) return;
    clear(list);
    var L = CFG.links || {};
    var wa = CFG.whatsapp ? "https://wa.me/" + String(CFG.whatsapp).replace(/\D/g, "") + "?text=" + encodeURIComponent(ui("contact.whatsappText")) : "";
    var entries = [
      { key: "contact.email", icon: "mail", href: CFG.email ? "mailto:" + CFG.email : "", handle: CFG.email, ext: false },
      { key: "contact.linkedin", icon: "linkedin", href: L.linkedin, handle: "in/jamespatricio", ext: true },
      { key: "contact.github", icon: "github", href: L.github, handle: "@jnbdotdev", ext: true },
      { key: "contact.whatsapp", icon: "whatsapp", href: wa, handle: "+55 11 95718-2318", ext: true },
      { key: "contact.youtube", icon: "youtube", href: L.youtube, handle: "YouTube", ext: true },
      { key: "contact.instagram", icon: "instagram", href: L.instagram, handle: "@jnbdotdev", ext: true }
    ];
    entries.filter(function (e) { return !!e.href; }).forEach(function (e) {
      list.appendChild(el("li", null, [
        el("a", {
          class: "btn",
          href: e.href,
          target: e.ext ? "_blank" : null,
          rel: e.ext ? "noopener noreferrer" : null
        }, [
          el("span", { style: "display:inline-flex;align-items:center;gap:.6em" }, [icon(e.icon), el("span", { text: ui(e.key) })]),
          el("span", { text: e.handle || "" })
        ])
      ]));
    });
    var a = $("[data-email]");
    if (a && CFG.email) { a.href = "mailto:" + CFG.email; a.textContent = CFG.email; }
  }

  function renderStatic() {
    var since = parseYM(CFG.careerStart);
    $$("[data-since]").forEach(function (n) {
      if (!since) return;
      var yrs = Math.floor(monthsBetween(since, todayYM()) / 12);
      n.textContent = since.y + (yrs > 0 ? " · " + yrs + (state.lang === "pt" ? (yrs > 1 ? " anos" : " ano") : (yrs > 1 ? " yrs" : " yr")) : "");
    });
    $$("[data-year]").forEach(function (n) { n.textContent = String(new Date().getFullYear()); });
  }

  /* Above-the-fold work first, then the rest of the page. */
  var RENDER_STEPS = [
    ["i18n", applyI18n],
    ["theme labels", updateThemeLabels],
    ["static", renderStatic],
    ["clock", tickClock],
    ["console", renderConsole],
    ["band", renderBand],
    ["scope", renderScope],
    ["stack", renderStack],
    ["langs", renderLangs],
    ["principles", renderPrinciples],
    ["timeline", renderTimeline],
    ["gantt", renderGantt],
    ["work", renderWork],
    ["archive", renderArchive],
    ["filters", renderFilters],
    ["ledger", renderLedger],
    ["education", renderEducation],
    ["contact", renderContact]
  ];

  function afterRender() {
    if (initialRenderDone) {
      /* language switch: show freshly rendered nodes immediately, no re-animation */
      $$("[data-reveal]").forEach(function (n) { n.classList.add("is-in"); });
      safe("pulses", measurePulses);
      safe("scroll", onScroll);
    }
    unhide();
  }

  function renderAll() {
    RENDER_STEPS.forEach(function (step) { safe(step[0], step[1]); });
    afterRender();
  }

  /* First load: run the steps in ~12ms slices so the main thread never blocks for long */
  function renderAllChunked(done) {
    var i = 0;
    var now = window.performance && performance.now ? function () { return performance.now(); } : Date.now;
    (function slice() {
      var t0 = now();
      while (i < RENDER_STEPS.length && (i < 5 || now() - t0 < 12)) {
        safe(RENDER_STEPS[i][0], RENDER_STEPS[i][1]);
        i++;
        if (i === 5) unhide(); /* copy, labels and the hero are in place: safe to show the page */
      }
      if (i < RENDER_STEPS.length) setTimeout(slice, 0);
      else { unhide(); done(); }
    })();
  }

  /* ------------------------------------------------------------ behaviour */
  var clockFmt = null;
  function tickClock() {
    var nodes = $$("[data-clock]");
    if (!nodes.length) return;
    var text;
    try {
      clockFmt = clockFmt || new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: CFG.timezone || "America/Sao_Paulo" });
      text = clockFmt.format(new Date());
    } catch (e) {
      var d = new Date(Date.now() - 3 * 3600 * 1000);
      text = pad2(d.getUTCHours()) + ":" + pad2(d.getUTCMinutes());
    }
    nodes.forEach(function (n) { n.textContent = text; });
  }
  function initClock() {
    tickClock();
    var now = new Date();
    setTimeout(function () { tickClock(); setInterval(tickClock, 60000); }, (60 - now.getSeconds()) * 1000 + 50);
  }

  function initLangButtons() {
    $$("[data-lang]").forEach(function (b) {
      b.addEventListener("click", function () { setLang(b.getAttribute("data-lang")); });
    });
  }

  /* Active section + progress bars + timeline fill + dock auto-hide */
  var sections = [];
  var lastY = window.pageYOffset || 0;
  var dock = null;

  function setActive(id) {
    $$("[data-nav]").forEach(function (a) {
      if (a.getAttribute("data-nav") === id) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
    });
  }

  var lastActive = null;
  function onScroll() {
    /* ---- reads ---- */
    var y = window.pageYOffset || doc.documentElement.scrollTop || 0;
    var vh = window.innerHeight;
    var docH = doc.documentElement.scrollHeight;
    var max = Math.max(1, docH - vh);
    var probe = vh * 0.4, active = sections.length ? sections[0].id : null;
    for (var i = 0; i < sections.length; i++) {
      if (sections[i].getBoundingClientRect().top <= probe) active = sections[i].id;
    }
    if (y + vh >= docH - 4 && sections.length) active = sections[sections.length - 1].id;

    var tl = $(".timeline"), tlFill = null, lit = [];
    if (tl && tl.offsetParent !== null) {
      var r = tl.getBoundingClientRect();
      var line = vh * 0.62;
      tlFill = clamp((line - r.top) / Math.max(1, r.height), 0, 1).toFixed(4);
      lit = $$(".tl-item", tl).map(function (item) { return [item, item.getBoundingClientRect().top < line]; });
    }
    var dockVisible = dock && dock.offsetParent !== null;
    var dy = y - lastY;
    var nearBottom = y + vh >= docH - 80;

    /* ---- writes ---- */
    root.style.setProperty("--progress", clamp(y / max, 0, 1).toFixed(4));
    if (active && active !== lastActive) { setActive(active); lastActive = active; }
    if (tlFill !== null) {
      tl.style.setProperty("--fill", tlFill);
      lit.forEach(function (pair) { pair[0].classList.toggle("is-lit", pair[1]); });
    }
    if (dockVisible) {
      if (dock.contains(doc.activeElement) || nearBottom || y < 120 || dy < -6) dock.classList.remove("is-hidden");
      else if (dy > 8) dock.classList.add("is-hidden");
    }
    lastY = y;
  }

  function initScroll() {
    sections = $$("[data-section]");
    dock = $(".dock");
    var handler = rafThrottle(onScroll);
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler, { passive: true });
    if (dock) dock.addEventListener("focusin", function () { dock.classList.remove("is-hidden"); });
    /* Move focus into the target section for keyboard and screen-reader users */
    doc.addEventListener("click", function (ev) {
      var a = ev.target.closest && ev.target.closest('a[href^="#"]');
      if (!a) return;
      var id = a.getAttribute("href").slice(1);
      var target = id ? doc.getElementById(id) : null;
      if (!target) return;
      ev.preventDefault();
      var smooth = !mqReduce.matches;
      target.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      try { target.focus({ preventScroll: true }); } catch (e) { target.focus(); }
      if (history.replaceState) history.replaceState(null, "", "#" + id);
    });
    onScroll();
  }

  /* Reveal on scroll */
  var revealIO = null;
  function initReveal() {
    var nodes = $$("[data-reveal]");
    if (!hasIO || mqReduce.matches) { nodes.forEach(function (n) { n.classList.add("is-in"); }); return; }
    revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-in"); revealIO.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    nodes.forEach(function (n) { revealIO.observe(n); });
    /* safety net: never leave content hidden if an observer misfires */
    setTimeout(function () {
      nodes.forEach(function (n) {
        var r = n.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) n.classList.add("is-in");
      });
    }, 1800);
  }

  /* Pipeline pulses: measure travel distance and run only while visible */
  function measurePulses() {
    var stages = $$(".stage");
    var horizontal = mqWide.matches;
    stages.forEach(function (s, i) {
      var pulse = $(".stage__pulse", s), next = stages[i + 1];
      if (!pulse || !next) return;
      var a = $(".stage__dot", s).getBoundingClientRect();
      var b = $(".stage__dot", next).getBoundingClientRect();
      var travel = horizontal ? (b.left - a.right - 6) : (b.top - a.bottom - 6);
      pulse.style.setProperty("--travel", Math.max(0, Math.round(travel)) + "px");
    });
  }
  function initPulses() {
    var pipe = $(".pipeline");
    if (!pipe) return;
    measurePulses();
    window.addEventListener("resize", debounce(measurePulses, 150));
    if (!hasIO) { pipe.classList.add("is-live"); return; }
    new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { pipe.classList.toggle("is-live", e.isIntersecting); });
    }, { threshold: 0.15 }).observe(pipe);
  }

  /* Pause the hero map pulses when the hero is off screen */
  function initMap() {
    var map = $(".hero__map");
    if (!map || !hasIO) return;
    new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { map.classList.toggle("is-paused", !e.isIntersecting); });
    }).observe(map);
  }

  /* Pause the marquee when off screen; rebuild on width changes */
  function initBand() {
    var band = $(".band");
    if (!band) return;
    var lastW = window.innerWidth;
    window.addEventListener("resize", debounce(function () {
      if (Math.abs(window.innerWidth - lastW) > 40) { lastW = window.innerWidth; safe("band", renderBand); }
    }, 250));
    if (!hasIO) return;
    new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { band.classList.toggle("is-paused", !e.isIntersecting); });
    }).observe(band);
  }

  /* Contact: light the tube and flicker the sign once */
  function initContact() {
    var c = $(".contact");
    if (!c) return;
    var on = function () {
      c.classList.add("is-visible");
      var n = $(".contact__sign .neon-text", c);
      if (n && !mqReduce.matches) n.classList.add("is-on");
    };
    if (!hasIO) { on(); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { on(); io.disconnect(); } });
    }, { threshold: 0.25 });
    io.observe(c);
  }

  /* Copy e-mail with a fallback for file:// and older browsers */
  function initCopy() {
    var btn = $("[data-copy-email]"), status = $("[data-copy-status]");
    if (!btn || !CFG.email) return;
    var timer;
    function say(msg) {
      if (!status) return;
      status.textContent = msg;
      clearTimeout(timer);
      timer = setTimeout(function () { status.textContent = ""; }, 3200);
    }
    function legacyCopy() {
      var ta = el("textarea", { readonly: true, style: "position:fixed;top:0;left:-9999px;opacity:0" });
      ta.value = CFG.email;
      doc.body.appendChild(ta);
      ta.select();
      var ok = false;
      try { ok = doc.execCommand("copy"); } catch (e) { ok = false; }
      doc.body.removeChild(ta);
      return ok;
    }
    btn.addEventListener("click", function () {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(CFG.email).then(function () { say(ui("contact.copied")); }, function () {
          say(legacyCopy() ? ui("contact.copied") : ui("contact.copyFail"));
        });
      } else {
        say(legacyCopy() ? ui("contact.copied") : ui("contact.copyFail"));
      }
    });
  }

  /* Horizontal work rail */
  function railStep(list) {
    var card = $(".card", list);
    if (!card) return list.clientWidth * 0.8;
    var gap = parseFloat(getComputedStyle(list).columnGap || getComputedStyle(list).gap) || 16;
    return card.getBoundingClientRect().width + gap;
  }
  function updateRail() {
    var list = $('[data-render="work"]');
    if (!list) return;
    var prev = $("[data-rail-prev]"), next = $("[data-rail-next]"), pos = $("[data-rail-pos]");
    var maxScroll = list.scrollWidth - list.clientWidth;
    var x = list.scrollLeft;
    var step = railStep(list);
    var count = $$(".card", list).length;
    var idx = clamp(Math.round(x / step), 0, Math.max(0, count - 1));
    if (x >= maxScroll - 2) idx = count - 1;
    if (pos) pos.textContent = pad2(idx + 1);
    if (prev) prev.disabled = x <= 2;
    if (next) next.disabled = x >= maxScroll - 2 || maxScroll <= 2;
  }
  function initRail() {
    var list = $('[data-render="work"]');
    if (!list) return;
    var go = function (dir) {
      list.scrollBy({ left: dir * railStep(list), behavior: mqReduce.matches ? "auto" : "smooth" });
    };
    var prev = $("[data-rail-prev]"), next = $("[data-rail-next]");
    if (prev) prev.addEventListener("click", function () { go(-1); });
    if (next) next.addEventListener("click", function () { go(1); });
    list.addEventListener("scroll", rafThrottle(updateRail), { passive: true });
    window.addEventListener("resize", debounce(updateRail, 120));
    updateRail();
  }

  /* Ledger filters */
  function initLedger() {
    var box = $('[data-render="filters"]');
    if (!box) return;
    box.addEventListener("click", function (ev) {
      var b = ev.target.closest && ev.target.closest("[data-filter]");
      if (!b) return;
      state.ledgerFilter = b.getAttribute("data-filter");
      applyLedgerFilter();
    });
  }

  /* Pointer spotlight on cards (desktop pointers only) */
  function initSpotlight() {
    if (!mqFine.matches) return;
    var last = null;
    doc.addEventListener("pointermove", function (ev) {
      var card = ev.target.closest && ev.target.closest(".spot");
      if (!card) return;
      if (last && last.card === card && last.pending) { last.ev = ev; return; }
      last = { card: card, ev: ev, pending: true };
      window.requestAnimationFrame(function () {
        var r = card.getBoundingClientRect();
        card.style.setProperty("--mx", (last.ev.clientX - r.left) + "px");
        card.style.setProperty("--my", (last.ev.clientY - r.top) + "px");
        last.pending = false;
      });
    }, { passive: true });
  }

  function initResize() {
    window.addEventListener("resize", debounce(function () {
      var g = $('[data-render="gantt"]');
      if (g && g._alignGrid) safe("gantt align", g._alignGrid);
    }, 120));
    if (mqWide.addEventListener) {
      mqWide.addEventListener("change", function () {
        safe("timeline", renderTimeline);
        safe("gantt", renderGantt);
        $$('[data-render="timeline"] [data-reveal]').forEach(function (n) { n.classList.add("is-in"); });
        safe("pulses", measurePulses);
        safe("scroll", onScroll);
      });
    }
  }

  /* Printing on a wide screen: the printable layout is the vertical timeline */
  function initPrint() {
    window.addEventListener("beforeprint", function () {
      safe("timeline", function () { renderTimeline(true); });
      $$('[data-render="timeline"] [data-reveal]').forEach(function (n) { n.classList.add("is-in"); });
    });
    window.addEventListener("afterprint", function () { safe("timeline", renderTimeline); });
  }

  /* Debug helpers for testing themes offline from the console */
  window.portfolio = {
    setTheme: function (th) { setTheme(th, "manual"); },
    autoTheme: function () { BOOT.date = Date.now(); setTheme(dailyTheme(dayOf()), "auto"); },
    simulateDay: function (day) {
      var d = new Date(); d.setDate(clamp(+day || 1, 1, 28));
      BOOT.date = d.getTime();
      setTheme(dailyTheme(d.getDate()), "date");
    },
    setLang: setLang
  };

  /* ---------------------------------------------------------------- boot */
  function start() {
    renderAllChunked(boot);
  }

  function boot() {
    initialRenderDone = true;
    safe("theme", initTheme);
    safe("lang", initLangButtons);
    safe("clock", initClock);
    safe("scroll", initScroll);
    safe("reveal", initReveal);
    safe("pulses", initPulses);
    safe("band", initBand);
    safe("map", initMap);
    safe("contact", initContact);
    safe("copy", initCopy);
    safe("rail", initRail);
    safe("ledger", initLedger);
    safe("spotlight", initSpotlight);
    safe("resize", initResize);
    safe("print", initPrint);
    /* sections grew while rendering: if the URL has a #hash, land on it again */
    if (location.hash && location.hash.length > 1) {
      var target = null;
      try { target = doc.getElementById(decodeURIComponent(location.hash.slice(1))); } catch (e) { target = null; }
      if (target) target.scrollIntoView({ block: "start" });
    }
    /* fonts change metrics: re-measure once they are ready */
    if (doc.fonts && doc.fonts.ready) {
      doc.fonts.ready.then(function () {
        safe("band", renderBand);
        safe("pulses", measurePulses);
        var g = $('[data-render="gantt"]');
        if (g && g._alignGrid) safe("gantt align", g._alignGrid);
        safe("rail", updateRail);
      });
    }
  }

  if (doc.readyState === "loading") doc.addEventListener("DOMContentLoaded", start);
  else start();
})();
