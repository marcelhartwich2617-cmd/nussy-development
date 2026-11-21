const KEY = "nussy-notice-ok";
const de = document.documentElement.lang === "de";
let seen = false;
try {
  seen = localStorage.getItem(KEY) === "1";
} catch (e) {}

if (!seen) {
  const el = document.createElement("div");
  el.className = "notice";
  el.setAttribute("role", "dialog");
  el.setAttribute("aria-label", de ? "Datenschutz-Hinweis" : "Privacy notice");
  el.innerHTML = de
    ? `<p>Diese Seite setzt keine Tracking-Cookies. <a href="/datenschutz.html">Datenschutz</a></p><button type="button">OK</button>`
    : `<p>This site sets no tracking cookies. <a href="/datenschutz.html">Privacy policy (German)</a></p><button type="button">OK</button>`;
  el.querySelector("button").addEventListener("click", () => {
    try {
      localStorage.setItem(KEY, "1");
    } catch (e) {}
    el.remove();
  });
  document.body.appendChild(el);
}
