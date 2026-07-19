# Samuel Engelhardt — Portfolio

Design portfolio of Samuel Engelhardt, Surface Designer & Digital Modeler.
Live at **[hardt-wip.github.io/Portfolio](https://hardt-wip.github.io/Portfolio/)**.

Hand-built static site: vanilla HTML, CSS, and JavaScript. No frameworks,
no build step — what's in the repo is what ships. Hosted on GitHub Pages
from `main`.

## Structure

| Path | What it is |
|---|---|
| `index.html` | Landing page (hero, about, skills, work grid, contact) |
| `projects/` | Project pages — hubs with sub-pages get a folder, standalone pages stay flat |
| `projects/hardt-wip/` | Hardt.wip personal brand mini-site (own CSS/JS on purpose) |
| `images/<project>/` | Image assets, mirroring the project folders |
| `css/style.css`, `js/app.js` | Main site styles and behavior |
| `404.html` | Custom not-found page (URLs have moved over time) |

Conventions, change recipes, and the pre-push verification pass are
documented in [WORKFLOW.md](WORKFLOW.md).
