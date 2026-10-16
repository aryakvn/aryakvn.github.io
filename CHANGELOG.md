# Changelog

<!--
Maintained for both humans and Claude Code to reference. Before
implementing a feature or fix, check the entries below first — it may
already be done, which saves searching the whole codebase.

Format (based on Keep a Changelog: https://keepachangelog.com/en/1.1.0/):
- New entries go under "## [Unreleased]" until a release is cut.
- Categories: Added, Changed, Fixed, Deprecated, Removed, Security.
  Only add a category heading once it has an entry under it.
- One bullet per entry, imperative mood, one line where possible:
    - Add CSV export to the reports page. (Refs: JIRA-482, #210)
- Include "(Refs: ...)" only when there's an external reference — a Jira
  key, GitHub issue/PR number, Trello card title/URL, or similar tracker
  ID. Comma-separate multiple references. Omit the parenthetical entirely
  if there's nothing to reference.
- To cut a release: rename "## [Unreleased]" to "## [X.Y.Z] - YYYY-MM-DD"
  and start a fresh, empty "## [Unreleased]" section above it.
- Never delete or rewrite past entries — only append.
-->

## [Unreleased]

### Added

- Add a multilingual (en/fa) products section: `products` content collection, archive at `/products/`, single pages at `/products/<slug>/`, and small cards on the home page.
- Add SEO for products: per-page title/description, canonical and hreflang (only for translated pages), Open Graph/Twitter tags, JSON-LD (Product/SoftwareApplication, CollectionPage, BreadcrumbList), `sitemap.xml` and `robots.txt`.
- Make products sellable: `model` (saas/license), `price`, `priceAmount`/`currency` fields, price on cards and pages, "how to get it" block with prefilled email (and optional phone via `site.phone`) instead of online checkout, Offer JSON-LD only when a numeric price is set.
- Add the first product, TOTP CLI, with a placeholder image to replace.
- Add a mobile menu (≤720px): burger button that morphs to an X and a nav panel that wipes open/closed via clip-path with staggered links; closes on link click, Escape, or resize to desktop.
- Add DanMa, the school management platform, as the products page's product (en + fa, image built from the DanMa teaser frames); remove the TOTP CLI placeholder product.

### Changed

- Replace the product page's source link with a permanent "Call me" button; product CTAs are now only Email me and Call me, and the unused `link`/`linkLabel` product fields are removed.
- Rename the DanMa product to Danik (en + fa); its URL moves to `/products/danik/`.
- Rewrite the Danik product page (en + fa) to pitch it as an online academy platform; shorten its summary to fit the 200-char limit.
- Renumber the home page section numerals (research to contact) to make room for Products; Base layout now takes `path`, `title`, `description`, `image`, `alternates` and `jsonLd`.

### Fixed

- Suppress the `.trick__card` CSS transform transition during its scroll-in
  tease, so the card no longer trails the tween and drifts into place after
  the animation ends.
- Fix the contact row re-laying out when the trick card is flipped: the third
  grid track was sized to the hint text, which changes with the card.
- Force `https://` on the site URL so canonicals, hreflang, `sitemap.xml` and
  `robots.txt` stop pointing at `http://` duplicates (Search Console:
  "Duplicate without user-selected canonical").
- Fix slight horizontal scroll on phones: the hero photo's scroll zoom pushed
  it past the screen edge; `.hero` now clips its own x-overflow.

### Added

- Add a live film-grain and dust layer over the whole page, plus a print
  vignette, so the ground reads as aged stock rather than flat black.
- Add a newspaper dateline strip under the topbar (volume, city, press run),
  with `press` copy in both locales.
- Add a magazine drop cap and small-caps opening line to the about prose
  (Latin only — a Persian drop cap breaks the joined word).
- Add a halftone dot screen over the hero plate, the way a printed
  reproduction of it would have been screened.
- Add a slowly turning vinyl groove disc behind the contact section, visible
  through the sheen crossing the grooves.
- Add a typewriter-ribbon ink impression to utility type (labels, numerals,
  section notes).
