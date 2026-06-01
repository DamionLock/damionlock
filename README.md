# damionlock.com

A cinematic personal holding page + Markdown blog for **Damion Lock** — covering Datacenters & AI, high-technology innovation, and sustainability.

Built as plain static files (HTML/CSS/JS), deployed automatically to **GitHub Pages** on every push. No build step, no framework, no server costs.

---

## What's in here

```
index.html              ← the holding page (hero, focus, about, writing, contact)
blog.html               ← writing index with topic filters
post.html               ← single-article reader (renders Markdown)
css/style.css           ← all styling (brand tokens at the top)
js/scenes.js            ← the cinematic cycling background (3 animated scenes)
js/site.js              ← homepage interactions + contact form
js/blog.js  js/post.js  ← blog index + reader logic
js/posts.js             ← shared posts loader
posts/                  ← YOUR BLOG POSTS (Markdown) + manifest.json
assets/                 ← images (your headshot, etc.)
CNAME                   ← custom domain (damionlock.com)
.nojekyll               ← tells Pages to serve files as-is
.github/workflows/      ← the CI/CD pipeline (auto-deploy)
```

---

## 1 · One-time setup (≈ 10 minutes)

### a. Put the code on GitHub

1. Create a new repository on GitHub (e.g. `damionlock`). Keep it **public** (Pages is free on public repos).
2. Upload these files — either drag-and-drop in the GitHub web UI, or from your machine:

   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/damionlock.git
   git push -u origin main
   ```

### b. Turn on GitHub Pages (via Actions)

1. In your repo, go to **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
   That's it — the workflow in `.github/workflows/deploy.yml` does the rest. Every push to `main` redeploys automatically.

### c. Point your domain at it

In your domain registrar's DNS settings for `damionlock.com`, add these records:

| Type  | Name / Host | Value                  |
|-------|-------------|------------------------|
| A     | @           | `185.199.108.153`      |
| A     | @           | `185.199.109.153`      |
| A     | @           | `185.199.110.153`      |
| A     | @           | `185.199.111.153`      |
| CNAME | www         | `<your-username>.github.io` |

Then back in **Settings → Pages**, enter `damionlock.com` as the **Custom domain** (the `CNAME` file already declares it) and tick **Enforce HTTPS** once it's available (can take up to a few hours for the certificate).

DNS changes can take anywhere from minutes to ~24h to propagate.

---

## 2 · Daily use — updating the site securely

Your single source of truth is the GitHub repo. **You never touch a server.**

- **Edit text or design?** Change the file, commit, push (or edit directly in the GitHub web editor and click *Commit*). The site rebuilds and goes live in ~1 minute.
- Because everything goes through your GitHub account, updates are as secure as your account — turn on **2-factor authentication** and you're set.

### Writing a new blog post

Posts are just Markdown files. To publish one:

1. **Create the file** `posts/my-post-slug.md`. Optional front-matter at the top is ignored by the reader but nice for your records:

   ```markdown
   ---
   title: My great post
   topic: Sustainability
   date: 2026-06-01
   ---

   Your post body in **Markdown**. Headings, lists, quotes, links, code — all supported.
   ```

2. **Register it** in `posts/manifest.json` (newest first). Add an object:

   ```json
   {
     "slug": "my-post-slug",
     "title": "My great post",
     "topic": "Sustainability",
     "date": "2026-06-01",
     "readMins": 4,
     "excerpt": "One-sentence teaser shown on cards."
   }
   ```

   - `slug` **must** match the filename (without `.md`).
   - `topic` controls which filter pill it appears under. Stick to your three: `Datacenters & AI`, `High-Technology`, `Sustainability` (or add new ones — pills are generated automatically).

3. Commit & push. The post appears on `/blog.html` and the latest three surface on the homepage.

---

## 3 · Wiring up the contact form

The contact form posts to **[Formspree](https://formspree.io)** (free tier: 50 submissions/month, no backend needed).

1. Sign up at formspree.io, create a form, and copy its endpoint (looks like `https://formspree.io/f/abcdwxyz`).
2. In `index.html`, find the form and replace the placeholder:

   ```html
   <form id="leadForm" data-endpoint="https://formspree.io/f/YOUR_FORM_ID">
   ```

   …with your real endpoint. Commit & push. Submissions now arrive in your inbox.

Until you do this, the form shows a friendly "not yet connected" message instead of failing silently. You can also just rely on the email / LinkedIn links in the contact section.

> Prefer a calendar booking link (Calendly etc.) instead? Swap the form for a button — happy to wire that up.

---

## 4 · The cinematic background

`js/scenes.js` renders three custom animated scenes that crossfade every ~7 seconds — **Datacenters & AI**, **High-Technology Innovation**, **Sustainability** — with a live label/ticker in the hero. It's drawn on a `<canvas>`, so there are **no video files** to host (keeps the repo light and Pages fast) and it respects `prefers-reduced-motion`.

**Want real footage instead?** Drop your clips in `assets/`, replace `<canvas id="scene">` in `index.html` with a stacked set of `<video>` elements, and I can write the crossfade logic for them. Tell me and I'll do it.

---

## Personalise the details

Search-and-replace these placeholders with your real info:

- `hello@damionlock.com` → your email
- `https://www.linkedin.com/` → your LinkedIn URL
- The stats in the **About** section (`18+ years`, `500+ projects`, `7+ industries`)
- The bio copy in the **About** and **Hero** sections

---

*Technology, from inception.*
