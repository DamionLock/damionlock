/* ============================================================
   posts.js — shared blog data loader
   Posts are version-controlled Markdown files in /posts.
   /posts/manifest.json lists them (newest first).
   Add a post: drop a .md file in /posts and add an entry here.
   ============================================================ */
window.PostsAPI = (function () {
  const TOPIC_COLORS = {
    "Datacenters & AI": "#34e0a1",
    "High-Technology": "#34e0a1",
    "Sustainability": "#34e0a1"
  };
  async function manifest() {
    const res = await fetch("posts/manifest.json", { cache: "no-store" });
    if (!res.ok) throw new Error("manifest");
    return res.json();
  }
  async function body(slug) {
    const res = await fetch(`posts/${slug}.md`, { cache: "no-store" });
    if (!res.ok) throw new Error("post");
    let txt = await res.text();
    // strip optional front-matter (--- ... ---)
    txt = txt.replace(/^---[\s\S]*?---\s*/, "");
    return txt;
  }
  function fmtDate(iso) {
    try { return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }); }
    catch { return iso; }
  }
  return { manifest, body, fmtDate, TOPIC_COLORS };
})();
