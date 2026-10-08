/*
 * boot.js — runs synchronously in <head>, before the first paint, so the
 * correct theme and language are applied without a flash.
 * Kept as an external file so the Content-Security-Policy can forbid inline scripts.
 */
/* Theme + language boot. Runs before first paint so there is no flash.
   Daily rule: even day of month -> wine, odd day -> brown (visitor's local date).
   Test overrides:  ?theme=wine | ?theme=brown | ?theme=auto  ·  ?date=2026-10-03  ·  ?lang=pt */
(function () {
  var d = document.documentElement, p = null, now = new Date(), src = "auto";
  try { p = new URLSearchParams(window.location.search); } catch (e) {}
  var qd = p && p.get("date");
  if (qd && /^\d{4}-\d{2}-\d{2}$/.test(qd)) {
    var a = qd.split("-"), t = new Date(+a[0], +a[1] - 1, +a[2], 12, 0, 0);
    if (!isNaN(t.getTime()) && t.getDate() === +a[2]) { now = t; src = "date"; }
  }
  var day = now.getDate(), theme = day % 2 === 0 ? "wine" : "brown", stored = null;
  var qt = p && p.get("theme");
  try {
    if (qt === "auto") sessionStorage.removeItem("jp-theme");
    stored = sessionStorage.getItem("jp-theme");
  } catch (e) {}
  if (qt === "wine" || qt === "brown") { theme = qt; src = "url"; }
  else if (stored === "wine" || stored === "brown") { theme = stored; src = "manual"; }
  d.setAttribute("data-theme", theme);
  d.setAttribute("data-theme-src", src);
  d.setAttribute("data-day", String(day));
  window.__BOOT = { date: now.getTime(), simulated: src === "date", day: day };

  var lang = null, ql = p && p.get("lang");
  if (ql === "en" || ql === "pt") lang = ql;
  if (!lang) { try { var sl = localStorage.getItem("jp-lang"); if (sl === "en" || sl === "pt") lang = sl; } catch (e) {} }
  if (!lang && d.getAttribute("data-lang-auto") === "true") {
    var nl = (navigator.languages && navigator.languages[0]) || navigator.language || "";
    if (/^pt/i.test(nl)) lang = "pt";
  }
  if (lang) { window.__BOOT.lang = lang; d.lang = lang === "pt" ? "pt-BR" : "en"; }
  if (lang === "pt") {
    d.classList.add("i18n-pending");
    setTimeout(function () { d.classList.remove("i18n-pending"); }, 2500);
  }
  d.classList.add("js");
  /* font preloads (skipped on file://, where Chrome blocks preload fetches) */
  if (location.protocol !== "file:") {
    ["fraunces-normal", "instrument-sans", "jetbrains-mono"].forEach(function (f) {
      var l = document.createElement("link");
      l.rel = "preload"; l.as = "font"; l.type = "font/woff2"; l.crossOrigin = "anonymous";
      l.href = "assets/fonts/" + f + ".woff2";
      document.head.appendChild(l);
    });
  }
  var fav = document.getElementById("favicon");
  if (fav) fav.href = "assets/img/favicon-" + theme + ".svg";
  var tc = document.querySelector('meta[name="theme-color"]');
  if (tc) tc.content = theme === "wine" ? "#0f0508" : "#0e0905";
})();
