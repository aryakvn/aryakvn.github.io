# aryakavian.com

Personal site for Arya Kavian. Astro, fully static, no client framework, ~1 kB
of JavaScript (a clock and a card trick). Deploys to GitHub Pages on push.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # -> dist/
```

## Design

The site is a tarot spread on a dark table: the hero is Arya's card, sections
are numbered arcana, skills are four suits taken from the illustration
(storms, night sky, crystals, foliage), and projects are cards laid out by
hand. Aged paper, gold leaf, charcoal — not neon.

## Motion

GSAP + ScrollTrigger, all of it in `src/scripts/motion.ts`. The page is fully
readable without it — nothing is hidden in CSS, so if the script fails the
site is simply still. `prefers-reduced-motion` disables everything except the
scroll rail.

| Effect | Where |
|---|---|
| Overture: frame, card and type settle in sequence on load | `overture()` |
| Scroll-linked zoom — the card grows toward you as the hero exits | `heroZoom()` |
| Numeral turns over, then the title reveals | `sectionHeads()` |
| Suits and project cards are dealt onto the table, then handed back to CSS | `dealCards()` |
| Paper research card settles rather than lands | `researchCard()` |
| Codex lines arrive from the reading edge (flips in RTL) | `codex()` |
| Half-flip tease on the trick card | `trickTease()` |
| Gold scroll rail across the top | `rail()` |

Animations that touch elements with CSS hover states call `clearProps` when
they finish, so GSAP's inline transforms don't outrank the stylesheet.

## Where the content lives

| What | File |
|---|---|
| Name, email, timezone, social links, photo list | `src/config.ts` |
| All UI text and page copy, per language | `src/i18n/en.json`, `src/i18n/fa.json` |
| Projects | `src/content/work/<lang>/*.md` |
| Research | `src/content/research/<lang>/*.md` |
| Writing | `src/content/writing/<lang>/*.md` |
| Colours, type, spacing | `src/styles/global.css` (`:root` block) |

Entries are ordered by their `order` frontmatter field. If a language has no
entries in a collection, the English ones are shown instead — so translations
can arrive late without breaking anything.

### Adding a project

Create `src/content/work/en/my-project.md`:

```markdown
---
title: Project name
question: The question it started as.
year: '2025'
suit: bolt        # bolt | moon | crystal | leaf
tags: ['Python', 'Docker']
link: https://github.com/...
linkLabel: Source
order: 1
---

Two or three sentences. What was hard, not which framework you used.
```

### Adding photographs

Drop files in `public/photos/`, then list them in `photos` in `src/config.ts`.
The section shows an empty state until then.

### Adding a language

1. Copy `src/i18n/en.json` to `src/i18n/<code>.json` and translate it.
2. Import it in `src/i18n/index.ts` and add it to `dicts` (and to
   `RTL_LOCALES` if the script is right-to-left).
3. Add the code to `i18n.locales` in `astro.config.mjs`.
4. Create `src/pages/<code>/index.astro` — copy `src/pages/fa/index.astro`.

Persian is already wired up at `/fa/`, including RTL layout and Vazirmatn.

## Deploying

`.github/workflows/deploy.yml` builds and publishes on every push to `main`.
Once, in the repo: **Settings → Pages → Build and deployment → Source:
GitHub Actions**. Nothing else to configure — the workflow works out the site
URL and, for project pages, the `/<repo>` base path.

For a custom domain, add `public/CNAME` containing the domain.

## Before going live

- [ ] `src/config.ts` — real email, and confirm the GitHub / LinkedIn / Medium / ORCID URLs
- [ ] `src/content/work/en/` — replace the two `example-*.md` files with real projects
- [ ] `src/content/research/en/llmsecguard.md` — add the paper `link`
- [ ] `src/content/writing/en/*.md` — add article `link`s
- [ ] Delete `INSPIRATION_IMAGE.PNG` from the repo root — the hero uses the
      copy at `src/assets/the-tinkerer.png`
