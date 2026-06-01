/* ============================================================
   site.js — homepage interactions
   ============================================================ */
(function () {
  // nav scroll state
  const nav = document.querySelector(".nav");
  const onScroll = () => nav && nav.classList.toggle("scrolled", window.scrollY > 40);
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  // reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));

  // blog teaser — render latest 3 posts
  const teaser = document.getElementById("postTeaser");
  if (teaser && window.PostsAPI) {
    PostsAPI.manifest().then(list => {
      const latest = list.slice(0, 3);
      teaser.innerHTML = latest.map(p => `
        <a class="post-card reveal" href="post.html?slug=${encodeURIComponent(p.slug)}">
          <span class="topic">${p.topic}</span>
          <h3>${p.title}</h3>
          <p class="ex">${p.excerpt}</p>
          <div class="meta"><span>${PostsAPI.fmtDate(p.date)}</span><span>·</span><span>${p.readMins} min read</span></div>
          <span class="read">Read article <span class="arr">→</span></span>
        </a>`).join("");
      teaser.querySelectorAll(".reveal").forEach(el => io.observe(el));
    }).catch(() => { teaser.innerHTML = `<p class="empty-state">Blog posts will appear here.</p>`; });
  }

  // contact form (Formspree). Replace the endpoint in index.html (data-endpoint).
  const form = document.getElementById("leadForm");
  if (form) {
    const status = form.querySelector(".form-status");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const endpoint = form.getAttribute("data-endpoint") || "";
      status.className = "form-status";
      if (!endpoint || endpoint.includes("YOUR_FORM_ID")) {
        status.textContent = "Form not yet connected — add your Formspree ID. (See README)";
        status.classList.add("err"); return;
      }
      const btn = form.querySelector("button[type=submit]");
      const orig = btn.innerHTML; btn.innerHTML = "Sending…"; btn.disabled = true;
      try {
        const res = await fetch(endpoint, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
        if (res.ok) { form.reset(); status.textContent = "Thank you — I'll be in touch shortly."; status.classList.add("ok"); }
        else throw new Error();
      } catch { status.textContent = "Something went wrong. Email me directly instead."; status.classList.add("err"); }
      finally { btn.innerHTML = orig; btn.disabled = false; }
    });
  }

  // year
  const y = document.getElementById("year"); if (y) y.textContent = new Date().getFullYear();
})();
