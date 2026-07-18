# Portfolio Workflow

How this site is organized, the conventions it follows, and the exact steps
for common changes. Follow this and everything stays consistent without
having to reverse-engineer past decisions.

---

## 1. Site map

| URL / file | What it is |
|---|---|
| `index.html` | Landing page: hero, about, skills, work grid, contact |
| `projects/scott.html`, `projects/kia.html` | Standalone experience pages (no sub-projects) |
| `projects/school/` | Hub `school.html` + 9 sub-project pages |
| `projects/internship/` | Hub `internship.html` + 4 sub-project pages |
| `projects/volvo/` | Hub `volvo.html` + 2 sub-project pages |
| `projects/hardt-wip/` | Hardt.wip mini-site (`index.html`, own `wip.css`/`wip.js`) + legacy `mixtape.html` |
| `css/style.css`, `js/app.js` | Main site styles and behavior (nav, reveal, lightbox, cursor) |
| `sitemap.xml`, `robots.txt`, `site.webmanifest` | SEO/PWA plumbing |

**Rule: a project with sub-pages gets a folder; a standalone project stays a
flat file in `projects/`.** Image folders mirror project folders:
`images/<project>/` (with sub-folders per sub-project, e.g.
`images/internship/zeekr01/`).

## 2. Conventions

### Images
- Format: `.webp`, 1920×1080 for renders/covers. Logos as `.png` with alpha.
- Cover naming: `<project>_f.webp` = the "front"/cover image of a project.
- Every image that exists in `images/` must be referenced by a gallery —
  except nothing: if it's superseded, delete it (git history keeps it).
- Renders carry the SE watermark bottom-right; card CSS uses the image's
  native 16:9 ratio so the watermark is never cropped.

### Gallery items (project pages)
Each item is a `<button class="gallery-item">` with four fields that must
agree with the page's existing entries:
- `data-lightbox-src` and `<img src>`: same path.
- `alt` / `data-lightbox-alt`: the real subject, not a codeword
  ("Zeekr 001", never "car" or "08").
- `data-lightbox-title`: Title Case ("Injection Molding", "Center Console").
- `data-lightbox-type`: the tool, matching the page's existing spelling
  (e.g. "Catia v5", "Icem Surf", "Blender", "Vred").

### Covers
A project's cover = three places that must move together:
1. First `gallery-item` in its own page,
2. `og:image` in that page's `<head>`,
3. The card thumbnail on its hub page (or `index.html` for top-level).

### Meta tags
- `og:image` must be an **absolute** URL
  (`https://hardt-wip.github.io/Portfolio/images/...`) — relative paths
  silently break LinkedIn/WhatsApp previews.
- `<title>` pattern: `Page Name | Samuel Engelhardt`. Titles must be
  descriptive out of context ("Volvo AI Concept Exterior", not "Exterior").
- `canonical` must match the file's real path on GitHub Pages.

### Copy style
- No em/en dashes in prose — restructure with commas, colons, or
  parentheses. (Date ranges keep `&ndash;`: "Jun 2026 &ndash; Present".)
- Separators in labels/titles use `&middot;` (·), not dashes.
- Brand casing matters: DeLorean, Lynk & Co, ICEM Surf, Catia V5, Vred.
- Voice: first person, plain sentences, no filler superlatives
  ("meticulous", "seamless", "passionate about excellence").

### Indentation
Tabs, in both HTML and CSS. Match the surrounding file.

## 3. Recipes

### Add a new project (standalone)
1. Create `images/<name>/` and add optimized `.webp` images + a
   `<name>_f.webp` cover.
2. Copy the closest existing page (`projects/scott.html` is the simplest)
   to `projects/<name>.html`; update title/meta/canonical/og:image
   (absolute URL!), hero copy, facts list, gallery.
3. Add a `work-card` to `index.html`'s work grid pointing at the cover.
4. Add a `<url>` entry to `sitemap.xml` with today's `lastmod`.
5. Run the verification pass (section 4), commit, push.

### Add a sub-project to an existing hub
Same as above, but the page lives in the hub's folder (asset paths are
`../../images/...`), the card goes on the hub page instead of `index.html`,
and the hub's own gallery/card layout stays untouched.

### Change a cover image
Update all three cover locations (see Conventions → Covers). Nothing else.

### Retire an image
Remove its gallery block, then `git rm` the file. Don't leave orphans.

## 4. Verification pass (before every push)

```bash
# 1. serve locally
python3 -m http.server 8000 --directory /path/to/Portfolio

# 2. crawl: every href/src/data-lightbox-src on every page must be 200
#    (script pattern: parse refs from each *.html, urljoin against the
#    page URL, GET each once — zero broken refs is the pass bar)

# 3. eyeball the changed pages in a real browser at desktop AND
#    ~420px mobile width; check hover states if CSS/JS changed
```

Minimum bar: no broken references, changed pages screenshot-checked,
`og:image` still absolute, sitemap updated if URLs changed.

## 5. Git flow

- Work happens on `main` (solo project) or on a `claude/...` feature branch
  merged fast-forward into `main` when a session works alongside other
  changes.
- Commit messages: imperative summary line, then a short body explaining
  *why* when the diff alone doesn't say it. One logical change per commit
  (a rename+ref-update counts as one change).
- After every merged change: `git push origin main`. GitHub Pages deploys
  from `main`, so pushing is publishing.
- Uploaded assets (e.g. screenshots committed via GitHub web UI) get moved
  into their proper `images/` home and the original root-level file removed
  in the same commit.

## 6. Known decisions (so they don't get relitigated)

- `projects/hardt-wip/` keeps its own stylesheet (`wip.css`) on purpose —
  it's a brand space with a different voice than the portfolio.
- `mixtape.html` stays inside `projects/hardt-wip/` as the historical
  sub-page of the brand.
- The custom cursor is a ring only (no dot), 30px, instant tracking,
  gated to `pointer: fine` devices; text selection is disabled site-wide.
- Old cover variants are deleted, not archived in the tree — git history
  is the archive.
- `images/volvo/concept.pdf` is currently unreferenced; kept on purpose as
  a possible future download link. If it's still unused by the next audit,
  delete it.
