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

### Fixed

- Suppress the `.trick__card` CSS transform transition during its scroll-in
  tease, so the card no longer trails the tween and drifts into place after
  the animation ends.
- Fix the contact row re-laying out when the trick card is flipped: the third
  grid track was sized to the hint text, which changes with the card.

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
