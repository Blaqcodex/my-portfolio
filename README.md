<div align="center">

# THABISO NENE

### FULL STACK DEVELOPER · FOUNDER · GRAPHIC DESIGNER

**Durban, South Africa**

[thabisonene.com](https://thabisonene.com/) · [GitHub](https://github.com/Blaqcodex) · [LinkedIn](https://linkedin.com/thabiso-nene)

*Software, entrepreneurship and visual design — brought together with intention.*

</div>

---

## The portfolio

A personal portfolio designed like a title sequence: near-black, warm amber, expressive type, a little grain, and motion that knows when to be still.

The work on display spans full-stack systems, a community farming website, and responsive portfolios and landing pages. The skills section covers software, data, visual design and development workflow. No invented proficiency ratings; just the toolkit.

## A touch of motion

- **Spring-following cursor and magnetic controls** — responsive, restrained, and limited to fine pointers.
- **Tilted project cards** — a few degrees of movement, then a soft return.
- **Hero particle field** — gently reacts to the pointer, with particle count and canvas resolution kept in check.
- **Scroll reveals and subtle parallax** — adds depth to the story without getting in the way.

Every effect respects `prefers-reduced-motion`. Touch devices get a simpler experience, and off-screen animation takes a break.

## Behind the frame

| Path | What lives there |
| --- | --- |
| `index.html` | Page content, visual tokens, responsive styling, metadata and accessible fallbacks |
| `src/effects.js` | Cursor, magnetic controls, card tilt, particles and parallax |
| `src/lib/physics/spring.js` | Small, reusable spring solver |
| `img/thabiso.jpg` | Portrait JPEG fallback |
| `img/thabiso-640.webp`, `img/thabiso-960.webp` | Responsive WebP portrait sources |
| `CNAME` | Custom domain for GitHub Pages |

### The motion, under the hood

The shared spring uses **190 stiffness** and **25 damping**. Its time step is capped at **1/30 second**, so a paused browser tab cannot turn one frame into a slingshot. Magnetic controls use a softer **150 / 22** spring; card tilt uses **120 / 20** and stays within four degrees.

The canvas tops out at **28 particles** for fine pointers and **12** for coarse pointers, with device-pixel ratio capped at **1.5**. The field pauses off-screen and when the document is hidden. There are no animation packages to install or maintain.

## Run it locally

This is a static site, served from the repository root. No package install or build step is needed. Serve it over HTTP so the browser can load the JavaScript module:

```sh
python -m http.server 8000
```

Then open [localhost:8000](http://localhost:8000). Stop the server with `Ctrl+C`.

## Make it yours

- **Skills:** Add to the `TODO` array in `index.html` only after a new skill is confirmed. Don’t guess proficiency or years.
- **Portrait:** Replace `img/thabiso.jpg` and regenerate its 640px and 960px WebP companions at the same aspect ratio. The page prefers WebP and falls back to JPEG.
- **Motion:** Keep effects transform/opacity-led, frame-bounded, capped for mobile, and optional for reduced-motion visitors.

## Before publishing

There is no configured build or lint command. Run the available JavaScript syntax checks:

```sh
node --check src/effects.js
node --check src/lib/physics/spring.js
```

Then preview the site locally at narrow and wide sizes. Check keyboard navigation, the contact form, portrait loading and reduced-motion mode in browser developer tools.

The custom domain is configured via `CNAME`. GitHub Pages deploys from `main`; merge the feature branch into `main` for these changes to appear on the live site.
