/* post.js — single article reader (renders Markdown via marked) */
(function () {
  const nav = document.querySelector(".nav");
  const onScroll = () => nav && nav.classList.toggle("scrolled", window.scrollY > 40);
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  const slug = new URLSearchParams(location.search).get("slug");
  const root = document.getElementById("article");

  if (!slug) { root.innerHTML = err("No article selected."); finish(); return; }

  Promise.all([PostsAPI.manifest(), PostsAPI.body(slug)])
    .then(([list, md]) => {
      const meta = list.find(p => p.slug === slug);
      if (!meta) throw new Error();
      document.title = `${meta.title} — Damion Lock`;
      const html = window.marked ? marked.parse(md) : `<pre>${md.replace(/</g,"&lt;")}</pre>`;
      root.innerHTML = `
        <a class="back" href="blog.html"><span>←</span> All writing</a>
        <span class="topic">${meta.topic}</span>
        <h1>${meta.title}</h1>
        <div class="a-meta"><span>${PostsAPI.fmtDate(meta.date)}</span><span>·</span><span>${meta.readMins} min read</span><span>·</span><span>Damion Lock</span></div>
        <div class="prose">${html}</div>`;
      finish();
    })
    .catch(() => { root.innerHTML = err("Article not found."); finish(); });

  // theme toggle
  const toggle = document.querySelector(".theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      const next = current === "light" ? "dark" : "light";
      if (next === "dark") { document.documentElement.removeAttribute("data-theme"); localStorage.removeItem("theme"); }
      else { document.documentElement.setAttribute("data-theme", next); localStorage.setItem("theme", next); }
    });
  }

  function err(msg) { return `<a class="back" href="blog.html"><span>←</span> All writing</a><p class="empty-state">${msg}</p>`; }
  function finish() { const y = document.getElementById("year"); if (y) y.textContent = new Date().getFullYear(); }
})();
