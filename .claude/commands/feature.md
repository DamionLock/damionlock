Implement a feature for damionlock.com and deploy it live. No questions, no confirmations — just build and ship.

## The feature request

$ARGUMENTS

## How this site works

damionlock.com is a plain static site (HTML/CSS/JS) deployed to GitHub Pages via GitHub Actions. Every push to `main` auto-deploys within a minute. There is no build step, no framework, no npm.

### Files you'll be working with

Read any file before modifying it. Here's the map:

| File | What it does |
|------|-------------|
| `index.html` | Main holding page — hero with animated canvas, focus pillars, about, writing teaser, contact form |
| `blog.html` | Writing index with topic filter pills |
| `post.html` | Single-article reader (renders Markdown via marked.js CDN) |
| `css/style.css` | All styling — CSS custom properties at the top, section-commented |
| `js/scenes.js` | Cinematic canvas background — 3 animated scenes that crossfade |
| `js/site.js` | Homepage: nav scroll state, scroll-reveal observer, blog teaser loader, contact form, year |
| `js/blog.js` | Blog index: topic filters, card rendering |
| `js/post.js` | Post reader: fetches markdown, renders via marked |
| `js/posts.js` | Shared blog API: manifest fetch, markdown fetch, date formatting |
| `posts/manifest.json` | Blog post registry — newest first, drives both blog index and homepage teaser |
| `posts/*.md` | Blog posts — Markdown with YAML front-matter |
| `assets/` | Images (headshot, etc.) |

### Design system

The visual language is dark and cinematic — inherited from one93nine.com with a matrix-green accent. Everything is driven by CSS custom properties defined at the top of `css/style.css`:

- **Palette:** dark base `--bg: #060908`, accent `--accent: #34e0a1`, soft text `--ink-soft: #aebab3`
- **Typography:** `--display` (Space Grotesk) for headings, `--body` (IBM Plex Sans) for text, `--mono` (IBM Plex Mono) for labels/code/buttons
- **Layout:** `--maxw: 1240px`, `.wrap` for centered containers, `.section` for vertical rhythm
- **Components:** `.btn .btn-primary` (green CTA), `.btn-ghost` (outline), `.pillar` (feature card), `.post-card` (blog card), `.channel` (contact row), `.eyebrow` (section label with accent line)
- **Animation:** `.reveal` class + IntersectionObserver in site.js for scroll-triggered fade-up
- **Responsive:** collapses to single-column at 940px, font adjusts at 560px
- **Motion:** respects `prefers-reduced-motion` media query

Always use the existing CSS variables rather than hardcoding colours or fonts. New CSS goes in `css/style.css` following the existing commented-section pattern.

### Adding a blog post

1. Create `posts/your-slug.md` with front-matter: `title`, `topic`, `date`
2. Add an entry to the **top** of `posts/manifest.json` with: `slug`, `title`, `topic`, `date`, `readMins`, `excerpt`
3. Standard topics: `Datacenters & AI`, `High-Technology`, `Sustainability` — new topics auto-generate filter pills

## How to execute

1. **Read first.** Read every file you plan to change so you understand the current state and patterns.
2. **Build the feature.** Edit or create files as needed. Match the existing design system, patterns, and code style. Vanilla HTML/CSS/JS only.
3. **Make it responsive.** Anything new should work at all breakpoints (check the existing `@media` queries in style.css).
4. **Ship it.** Stage the specific files you changed, commit with a clear imperative message, and push:
   ```
   git add <specific files>
   git commit -m "Add <what you built>"
   git push origin main
   ```
5. **Report back.** Tell the user what was built, which files changed, and that it's deploying to https://damionlock.com.

## Decision-making

Use your best judgement for any ambiguous decisions — match the existing site's style, tone, and patterns. The only reason to ask the user a question is if they've asked for something that genuinely cannot be inferred (e.g. "add a testimonial" with no testimonial text provided). Otherwise, just build it.

Now implement the feature.
