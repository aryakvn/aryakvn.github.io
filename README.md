# aryakvn — personal portfolio

Personal portfolio site for **Arya Kavian** — full-stack web developer based in
Qa'emshahr, Iran. Static site, deployed to GitHub Pages via GitHub Actions.

Live: <https://aryakvn.ir/>

## Pages

- `index.html` — hero / landing
- `resume.html` — experience, skills, education
- `projects.html` — selected open-source and client work
- `blog.html` — field notes / writing
- `contact.html` — direct contact, social links, message form

## Stack

- Vanilla **HTML / CSS / JavaScript** — no framework, no build step
- Typography: **Fraunces** (display serif), **Geist** (UI), **JetBrains Mono** (metadata)
- Theme: retro warm-black with vermillion + amber accents
- Deployed via **GitHub Actions** → **GitHub Pages**

## Local preview

```bash
npm run dev
# serves the site at http://localhost:3000 via `npx serve`
```

Or open `index.html` directly in a browser — there is no build step.

## Deploy

Push to `main`. The workflow at `.github/workflows/deploy.yml` uploads the
repository root as the Pages artifact and publishes it.

To enable: in the repo settings → **Pages** → **Source: GitHub Actions**.

## Project layout

```
.
├── index.html
├── resume.html
├── projects.html
├── blog.html
├── contact.html
├── css/main.css            # full stylesheet (design tokens + components)
├── js/main.js              # vanilla interactions (clock, reveal, cursor, filters)
├── DESIGN_LANGUAGE.md      # reference design system this site is built on
├── .github/workflows/
│   └── deploy.yml          # GitHub Pages deploy
├── .nojekyll
└── package.json
```

## A note on AI assistance

This project was developed with the assistance of generative-AI coding
assistants. The design direction, content, structure, and final review are
human-authored; the AI helped with scaffolding, CSS authoring, copy drafting,
and accessibility / responsive boilerplate. Where the AI generated content
that would not be accurate without verification (experience, projects,
external links), it was reviewed against real public sources (GitHub,
LinkedIn, the project website) before publishing.

## License

Personal portfolio — code is MIT, content is © Arya Kavian.
