# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Personal site for Arya Kavian. Astro 5, static output, no UI framework. GSAP is
the only runtime dependency that ships. Deploys to GitHub Pages on push to
`main` via `.github/workflows/deploy.yml`.

## Commands

```bash
npm run dev      # http://localhost:4321
npm run build    # -> dist/ ; also the only content validation there is
npm run check    # astro check (types + templates)
```

No test suite. `npm run build` is the check that matters: content collections
are Zod-validated at build time, so a bad frontmatter value is a hard failure
(`InvalidContentEntryDataError`), not a warning. Run it after touching anything
in `src/content/`.

## Architecture

**Content is data, not markup.** Three sources, in order of how often they
change:

| What | Where |
|---|---|
| Name, email, socials, photo list | `src/config.ts` |
| Every string on the page, per locale | `src/i18n/en.json`, `src/i18n/fa.json` |
| Projects / research / writing entries | `src/content/<collection>/<lang>/*.md` |

`src/components/Home.astro` is the whole page — every section, and its scoped
CSS. It reads from all three sources and holds no copy of its own. Adding a
section means adding a key to both locale files, not hardcoding English.

**i18n.** `src/i18n/index.ts` owns `t()`, `dir()` and a base-aware `href()`.
Locale pages are thin: `src/pages/index.astro` and `src/pages/fa/index.astro`
both just render `<Home lang=... />`. `forLocale()` falls back to English when
a collection has no entries in the requested language, so translations can
arrive late. RTL is driven by `dir` on `<html>`; `global.css` swaps to
Vazirmatn under `:root[dir='rtl']`, and motion mirrors via the `rtl` multiplier
in `motion.ts`.

**Base path.** `astro.config.mjs` reads `SITE_URL` / `BASE_PATH` from the
environment; the deploy workflow injects them from `actions/configure-pages`.
Never hardcode a leading `/` in a link — use `href()`.

## Motion — three rules, each of which was a bug

All animation lives in `src/scripts/motion.ts`, imported once from
`Base.astro`. Nothing is hidden in CSS, so the page reads fine if the script
never runs. `prefers-reduced-motion` leaves only the scroll rail.

- **Never animate the same property of the same element twice.** A scrubbed
  tween records its start values on first render — which happens mid-intro. The
  hero exists as `.hero__type` wrapping the lines precisely so the overture can
  animate the children while the scrub animates the wrapper.
- **`.card` transitions `transform`.** Before tweening a transform on one, set
  `transition: 'none'`, and `clearProps` on complete — otherwise the browser
  eases toward a value GSAP rewrites every frame, and the release snaps.
  `clearProps` is also what hands the element back to CSS `:hover`.
- **No `scroll-behavior: smooth`, and `overflow-x: clip` not `hidden`.** Both
  break ScrollTrigger — `smooth` fights scrub, `hidden` makes `body` a scroll
  container so triggers measure the wrong scroller. Anchor scrolling goes
  through ScrollToPlugin in `smoothAnchors()`.

## Styling

`src/styles/global.css` holds the tokens (`:root`), the card surface and the
page frame; everything else is Astro-scoped inside its component. Scoped styles
**cannot** reach into a child component — `Glyph.astro` is sized and coloured
through the inherited `--glyph-size` / `--glyph-color` custom properties for
exactly this reason. Reach for a custom property before `:global()`.

`define:vars` emits `const` declarations into the inline script. Redeclaring
one of those names in the script body kills the whole script with a
`SyntaxError` — this is why the trick card's element is `hintEl`, not `hint`.
