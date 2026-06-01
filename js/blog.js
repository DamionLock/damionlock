/* blog.js — writing index with topic filters */
(function () {
  const nav = document.querySelector(".nav");
  const onScroll = () => nav && nav.classList.toggle("scrolled", window.scrollY > 40);
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  const grid = document.getElementById("blogGrid");
  const filtersWrap = document.getElementById("filters");
  let all = [], active = "All";

  const card = (p) => `
    <a class="post-card" href="post.html?slug=${encodeURIComponent(p.slug)}">
      <span class="topic">${p.topic}</span>
      <h3>${p.title}</h3>
      <p class="ex">${p.excerpt}</p>
      <div class="meta"><span>${PostsAPI.fmtDate(p.date)}</span><span>·</span><span>${p.readMins} min read</span></div>
      <span class="read">Read article <span class="arr">→</span></span>
    </a>`;

  function render() {
    const list = active === "All" ? all : all.filter(p => p.topic === active);
    grid.innerHTML = list.length ? list.map(card).join("") : `<p class="empty-state">No posts in this topic yet.</p>`;
  }

  PostsAPI.manifest().then(list => {
    all = list;
    const topics = ["All", ...new Set(list.map(p => p.topic))];
    filtersWrap.innerHTML = topics.map((t, i) => `<button class="${i===0?'active':''}" data-t="${t}">${t}</button>`).join("");
    filtersWrap.querySelectorAll("button").forEach(b => b.addEventListener("click", () => {
      active = b.dataset.t;
      filtersWrap.querySelectorAll("button").forEach(x => x.classList.toggle("active", x === b));
      render();
    }));
    render();
  }).catch(() => { grid.innerHTML = `<p class="empty-state">Could not load posts.</p>`; });

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

  const y = document.getElementById("year"); if (y) y.textContent = new Date().getFullYear();
})();
