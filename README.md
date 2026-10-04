# Thabiso Nene — Portfolio

A static, mobile-first portfolio hosted from the repository root on GitHub Pages at [thabisonene.com](https://thabisonene.com/). The existing HTML, Tailwind CDN, and browser JavaScript setup is retained; there is no package manifest, bundler, or framework build step.

## Run locally

Serve the repository root over HTTP so the browser can load the JavaScript module:

```sh
python -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000). Stop the server with `Ctrl+C`.

## Structure

- `index.html` contains the page content, design tokens, responsive styles, accessibility fallbacks, and non-module form/navigation behavior.
- `src/effects.js` initializes pointer-only cursor, magnetic-button, and card-tilt effects plus the capped hero canvas field.
- `src/lib/physics/spring.js` exports the shared spring stepper and its documented frame-safety constants.
- `img/thabiso.jpg` is the JPEG portrait fallback. `img/thabiso-640.webp` and `img/thabiso-960.webp` are responsive WebP sources.
- `CNAME` configures the custom GitHub Pages domain.

## Motion and physics

The spring solver uses stiffness `190` and damping `25` for a quick, restrained settle. Each frame is capped at `1/30` second so a suspended tab cannot cause a large simulation step. Magnetic elements use a softer stiffness of `150` and damping of `22`; tilt uses `120` and `20`, with rotation limited to four degrees.

The fine-pointer-only cursor, magnetic buttons, and tilt effects update with `requestAnimationFrame`. Small scroll-linked offsets move only the hero's blurred background layers. The hero field caps at 28 particles for fine pointers and 12 for coarse pointers, limits canvas pixel ratio to 1.5, and pauses outside the viewport or while the document is hidden. Physics and parallax are disabled or made immediately readable when `prefers-reduced-motion: reduce` is active. Keep new effects within these constraints.

## Content and portrait updates

Add a skill to the `TODO` array in `index.html` only after it has been confirmed. Do not infer expertise or duration.

Replace `img/thabiso.jpg` with the updated portrait and regenerate the 640px and 960px WebP derivatives at the matching image ratio. The `<picture>` source uses those derivatives when WebP is supported and falls back to the JPEG; the inline fallback remains available if the portrait cannot be loaded.

## Checks

There is no configured build or lint command in this repository. Before publishing, check JavaScript syntax with Node:

```sh
node --check src/effects.js
node --check src/lib/physics/spring.js
```

Also open the page through the local HTTP server, test a narrow and wide viewport, check keyboard navigation and the contact form, and emulate reduced motion in browser developer tools.
