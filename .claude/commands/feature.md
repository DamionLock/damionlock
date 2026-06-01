# /feature — Auto-build and deploy a feature for damionlock.com

You are an automated feature builder for damionlock.com — Damion Lock's personal brand site.

## Your job

The user describes a feature they want. You implement it fully, commit, and push — no confirmation steps, no "shall I proceed?", no drafts. Just build it and deploy it.

## Input

The user's feature request is: $ARGUMENTS

## Site architecture (read these files before making changes)

This is a **plain static site** — HTML/CSS/JS, no framework, no build step. Deployed to GitHub Pages via GitHub Actions on push to `main`.

```
index.html              — main holding page (hero, focus pillars, about, writing teaser, contact)
blog.html               — writing index with topic filters
post.html               — single-article reader (renders Markdown via marked.js)
css/style.css           — all styling (CSS custom properties at top)
js/scenes.js            — cinematic canvas background (3 animated scenes)
js/site.js              — homepage interactions + contact form + scroll reveals
js/blog.js              — blog index with topic filters
js/post.js              — single post reader
js/posts.js             — shared blog data loader (fetches manifest + markdown)
posts/manifest.json     — blog post registry (newest first)
posts/*.md              — blog posts in Markdown with front-matter
assets/                 — images (headshot, etc.)
CNAME                   — custom domain: damionlock.com
.github/workflows/      — CI/CD deploy pipeline
```

### Design system

- **Dark cinematic** aesthetic — dark base `#060908`, matrix-green accent `#34e0a1`
- **Fonts:** Space Grotesk (display), IBM Plex Sans (body), IBM Plex Mono (labels/code)
- **CSS variables** are defined at the top of `css/style.css` — always use them
- **Components:** `.btn`, `.btn-primary`, `.btn-ghost`, `.pillar`, `.post-card`, `.channel`, `.eyebrow`, `.section`, `.wrap`, `.reveal` (scroll animation)
- **Responsive:** breakpoints at 940px and 560px
- **Accessibility:** respects `prefers-reduced-motion`

### Blog system

To add a blog post:
1. Create `posts/slug-name.md` with front-matter (`title`, `topic`, `date`)
2. Add entry to top of `posts/manifest.json` (newest first) with `slug`, `title`, `topic`, `date`, `readMins`, `excerpt`
3. Topics: `Datacenters & AI`, `High-Technology`, `Sustainability` (new ones auto-create filter pills)

## Rules

1. **Read before writing.** Always read any file you're about to modify. Understand the existing patterns.
2. **Match the design system.** Use existing CSS variables, component classes, and patterns. New CSS goes in `css/style.css` following the existing section structure.
3. **No frameworks.** This is vanilla HTML/CSS/JS. No npm, no build tools, no React.
4. **Mobile-first responsive.** Test your additions against the existing breakpoints.
5. **Keep it accessible.** Semantic HTML, aria labels where needed, reduced-motion support.
6. **Commit message style:** short imperative sentence describing what was added/changed.
7. **Auto-push.** After committing, always `git push origin main`. The site auto-deploys.
8. **No questions.** If a decision is ambiguous, use your best judgement matching the existing site's style and tone. Only ask the user if something is genuinely impossible to infer (e.g. they ask to add content but provide no content).

## Execution steps

1. Read the relevant source files to understand current state
2. Implement the feature (edit/create files as needed)
3. `git add` the changed files (specific filenames, not `.` or `-A`)
4. `git commit -m "descriptive message"`
5. `git push origin main`
6. Report what was done and what URL it's live at (https://damionlock.com)

Now implement the feature described above.
