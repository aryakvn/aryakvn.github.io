# R—K Design Language Guide
### A system for building editorial, high-presence digital experiences

> Derived from analysis of [raviklaassens.com](https://www.raviklaassens.com/).
> Use this guide to reproduce the same visual language, layout logic, animations, and interaction patterns for any purpose or stack.

---

## 1. Philosophy

This design system is built around **editorial restraint** and **intentional tension** — between large and small, static and kinetic, sparse and dense. Every element earns its space. The aesthetic communicates confidence without decoration.

**Core principles:**
- **Presence over prettiness.** Design should feel like a statement, not an ornament.
- **Typography is the hero.** Layouts are built around type hierarchies, not UI components.
- **Motion implies meaning.** Animations are purposeful — they reveal, guide, and impress.
- **Contrast at every level.** Color, scale, weight, and pacing all operate through contrast.
- **Restraint creates impact.** White space (or dark space) is used aggressively.

---

## 2. Color System

### Base Palette

```css
:root {
  /* Backgrounds */
  --color-bg:           #0b0b0b;   /* Near-black base */
  --color-bg-elevated:  #111111;   /* Slightly lifted surface (cards, panels) */
  --color-bg-subtle:    #161616;   /* Dividers, hover states */

  /* Foreground */
  --color-fg:           #f0ede8;   /* Warm off-white — primary text */
  --color-fg-muted:     #7a7673;   /* Secondary labels, metadata */
  --color-fg-faint:     #3a3835;   /* Decorative text, disabled states */

  /* Accent */
  --color-accent:       #f0ede8;   /* Same as fg — the "accent" is contrast, not hue */
  --color-accent-warm:  #d4c9b8;   /* Warm cream for hover highlights */

  /* Borders */
  --color-border:       rgba(240, 237, 232, 0.10);  /* Subtle dividers */
  --color-border-hover: rgba(240, 237, 232, 0.25);
}
```

### Color Rules
- **No bright accent colors.** The system avoids blues, greens, reds, or any saturated hue as branding.
- **The only "color" is contrast.** Light-on-dark is the entire palette.
- **Use opacity, not tint.** Muted tones are created by reducing opacity of `--color-fg`, not by mixing grays.
- **Warm bias.** Both dark and light tones lean warm (slight yellow/brown undertone), never cool or sterile.

---

## 3. Typography

### Type Scale

The typeface is a **high-contrast serif for display** + **geometric sans-serif for UI and body**, with optional **monospace for metadata/labels**.

```css
:root {
  /* Families */
  --font-display:  'Freight Display', 'Playfair Display', Georgia, serif;
  --font-ui:       'Neue Haas Grotesk', 'Inter', 'Helvetica Neue', sans-serif;
  --font-mono:     'Söhne Mono', 'JetBrains Mono', 'Courier New', monospace;

  /* Scale (fluid using clamp) */
  --text-xs:   clamp(0.65rem,  0.9vw,  0.75rem);   /* 10–12px — micro labels */
  --text-sm:   clamp(0.75rem,  1.0vw,  0.875rem);  /* 12–14px — metadata */
  --text-base: clamp(0.875rem, 1.2vw,  1rem);      /* 14–16px — body */
  --text-md:   clamp(1rem,     1.5vw,  1.25rem);   /* 16–20px — subheadings */
  --text-lg:   clamp(1.25rem,  2.5vw,  2rem);      /* 20–32px — section intros */
  --text-xl:   clamp(2rem,     4vw,    3.5rem);    /* 32–56px — section headings */
  --text-2xl:  clamp(3rem,     6vw,    6rem);      /* 48–96px — hero/display */
  --text-3xl:  clamp(4rem,     9vw,    10rem);     /* 64–160px — oversized accent */

  /* Weight */
  --weight-regular: 400;
  --weight-medium:  500;
  --weight-bold:    700;

  /* Leading */
  --leading-tight:  0.95;
  --leading-snug:   1.1;
  --leading-normal: 1.45;
  --leading-loose:  1.7;

  /* Tracking */
  --tracking-tight:  -0.03em;
  --tracking-normal:  0em;
  --tracking-wide:    0.08em;
  --tracking-wider:   0.18em;
}
```

### Typographic Rules

| Role | Font | Size | Weight | Tracking | Transform |
|------|------|------|--------|----------|-----------|
| Hero headline | `--font-display` | `--text-2xl` | Bold | `--tracking-tight` | Mixed case |
| Section heading | `--font-display` | `--text-xl` | Bold | `--tracking-tight` | Mixed case |
| Body intro | `--font-display` or UI | `--text-lg` | Regular | Normal | Mixed case |
| Body text | `--font-ui` | `--text-base` | Regular | Normal | Mixed case |
| Nav links | `--font-ui` | `--text-sm` | Medium | `--tracking-wide` | Mixed case |
| UI labels | `--font-ui` | `--text-xs` | Medium | `--tracking-wider` | Uppercase |
| Metadata / dates | `--font-mono` | `--text-xs` | Regular | Normal | Mixed case |
| Decorative markers | `--font-ui` | `--text-xs` | Medium | `--tracking-wider` | Uppercase |

### Special Typography Patterns

**Em-dash as brand separator:**
```
R—K       (en-dash or em-dash between initials, never a hyphen)
2024—Future
August 2024—NOW
```

**Oversized decorative text:**
Large, very low-opacity text placed in the layout as a structural element (not readable at a glance), e.g., a section name rotated or placed at an angle in the background.

**Mixed hierarchy sentences:**
A pattern where H2 and H3 alternate to create a multi-tempo reading rhythm:
```html
<h2>Design shapes the world not as decoration,</h2>
<h3>but as a force that leaves a mark.</h3>
<h3>It defines how your brand is perceived</h3>
<h3>and how it's experienced.</h3>
```

---

## 4. Layout & Grid

### Spacing Scale

```css
:root {
  --space-1:   4px;
  --space-2:   8px;
  --space-3:   12px;
  --space-4:   16px;
  --space-5:   24px;
  --space-6:   32px;
  --space-7:   48px;
  --space-8:   64px;
  --space-9:   96px;
  --space-10:  128px;
  --space-11:  180px;
  --space-12:  240px;

  --page-gutter:    clamp(20px, 5vw, 80px);
  --section-gap:    clamp(80px, 12vw, 160px);
  --content-max:    1400px;
}
```

### Grid System

Use a **12-column grid** with a generous gutter. Layouts are **asymmetric** — not everything aligns to center. Typical column spans:

- Hero text: 8–10 cols, left-aligned
- Section labels/markers: 2–3 cols
- Project cards: 4–6 cols (2-up grid)
- Body copy: 6–7 cols
- Decorative sidebar elements: 1–2 cols

```css
.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--space-6);
  padding-inline: var(--page-gutter);
}
```

### Section Structure

Each major section follows this pattern:

```
[SECTION_LABEL]      ← small uppercase label, left (e.g. "R—K")
[SECTION_TITLE]      ← slightly larger, muted (e.g. "Works")
[SECTION_DATE]       ← metadata (e.g. "August 2024—NOW")
───────────────────────────────────────────────
[SECTION_TAGLINE]    ← longer italic or serif subheading
[MAIN CONTENT]       ← grid, list, or text block
```

### Full-Viewport Sections

The hero and major sections span `100dvh`. Content is vertically centered or pinned near the bottom using flex or grid.

```css
.hero {
  min-height: 100dvh;
  display: grid;
  align-content: end;
  padding-block-end: var(--space-9);
}
```

---

## 5. Navigation

### Structure

Fixed top navigation bar with:
- **Logo/wordmark** on the far left (e.g. `R—K`)
- **Primary links** center or right-aligned
- **Utility toggles** (sound, time, theme) far right

```
[Logo]          [Link] [Link] [Link] [Link] [Link]     [Sound] [Clock]
```

### Nav Behavior
- Fixed/sticky, no background on scroll start → subtle blur + border appears after scroll threshold
- Links have no underlines; hover triggers a subtle **opacity fade + vertical micro-shift** (2–3px `translateY`)
- Active page link has no heavy indicator — just slightly higher opacity

```css
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: var(--space-5) var(--page-gutter);
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background 0.4s ease, backdrop-filter 0.4s ease;
}

.nav.scrolled {
  background: rgba(11, 11, 11, 0.7);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border);
}

.nav-link {
  font-family: var(--font-ui);
  font-size: var(--text-sm);
  letter-spacing: var(--tracking-wide);
  color: var(--color-fg-muted);
  text-decoration: none;
  transition: color 0.25s ease, transform 0.25s ease;
}

.nav-link:hover {
  color: var(--color-fg);
  transform: translateY(-2px);
}
```

### Mobile Nav

On mobile, collapse to a **full-screen overlay menu**:
- Dark background fills the viewport
- Links animate in staggered (each item delays by 60ms)
- Close via the same toggle

---

## 6. Components

### 6.1 Section Marker

A decorative duo that labels every section. Always in a flex row, left-aligned.

```html
<div class="section-marker">
  <span class="marker-brand">R—K</span>
  <span class="marker-name">Works</span>
</div>
```

```css
.section-marker {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.marker-brand {
  font-family: var(--font-ui);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--color-fg-muted);
}

.marker-name {
  font-family: var(--font-ui);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--color-fg-faint);
}
```

### 6.2 Project Card (Dual-Image Hover)

Cards have **two image states**: a default and a hover image that cross-fades on hover.

```html
<a class="project-card" href="/project">
  <div class="card-media">
    <img class="img-default" src="thumb.webp" alt="Project Name" />
    <img class="img-hover"   src="thumb-hover.webp" alt="Project Name Hover" />
  </div>
  <div class="card-meta">
    <h4 class="card-title">Project Name</h4>
    <span class="card-category">Identity + Art Direction</span>
  </div>
</a>
```

```css
.project-card {
  display: block;
  text-decoration: none;
  color: var(--color-fg);
}

.card-media {
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border-radius: 2px;
  background: var(--color-bg-elevated);
}

.card-media img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.5s ease, transform 0.6s ease;
}

.img-hover {
  opacity: 0;
}

.project-card:hover .img-default {
  opacity: 0;
}

.project-card:hover .img-hover {
  opacity: 1;
}

.project-card:hover .card-media img {
  transform: scale(1.04);
}

.card-meta {
  padding-top: var(--space-4);
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.card-title {
  font-family: var(--font-ui);
  font-size: var(--text-base);
  font-weight: var(--weight-medium);
}

.card-category {
  font-family: var(--font-ui);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--color-fg-muted);
}
```

### 6.3 Insight / Blog Card

Similar to a project card but uses a **"+" icon** on hover as a secondary signal.

```html
<a class="insight-card" href="/insights/article">
  <div class="card-media">
    <img src="thumb.webp" alt="" />
    <div class="card-plus">+</div>
  </div>
  <div class="card-meta">
    <h4 class="card-title">When is it time for a Rebrand?</h4>
    <div class="card-byline">
      <span>4m read-time.</span>
      <span>Mon 9 March '26</span>
      <span>Author: Ravi Klaassens</span>
    </div>
  </div>
</a>
```

```css
.card-plus {
  position: absolute;
  top: var(--space-4);
  right: var(--space-4);
  width: 32px;
  height: 32px;
  border: 1px solid var(--color-border);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: var(--color-fg);
  opacity: 0;
  transform: rotate(-45deg);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.insight-card:hover .card-plus {
  opacity: 1;
  transform: rotate(0deg);
}
```

### 6.4 Ticket / CTA Block

A **distinctive ticket-shaped CTA** using SVG clip-path or border-radius tricks. Acts as a high-visibility call to action.

```html
<a class="ticket-cta" href="/contact">
  <div class="ticket-content">
    <h2>For Agencies</h2>
    <p>Your agency a hand short? I'm here to slot in and ride along with your team.</p>
    <span class="ticket-link">Read info →</span>
  </div>
</a>
```

```css
.ticket-cta {
  display: block;
  position: relative;
  padding: var(--space-8) var(--space-7);
  background: var(--color-fg);
  color: var(--color-bg);
  text-decoration: none;
  /* Ticket notch via radial cutouts */
  clip-path: polygon(
    0% 0%,
    calc(50% - 16px) 0%,
    calc(50% - 16px) 0%,
    50% 0%,
    calc(50% + 16px) 0%,
    100% 0%,
    100% 100%,
    calc(50% + 16px) 100%,
    50% 100%,
    calc(50% - 16px) 100%,
    0% 100%
  );
  /* Better: use SVG background for notched ticket shape */
  transition: transform 0.4s ease;
}

.ticket-cta:hover {
  transform: scale(1.02);
}
```

> **Implementation note:** For a true ticket cutout, render the shape with an SVG or apply `border-radius` + negative margin tricks. The original site uses an SVG image with the notch built in.

### 6.5 Numbered Process List

```html
<ol class="process-list">
  <li class="process-item">
    <span class="process-number">1.</span>
    <div>
      <h3 class="process-title">Discovery</h3>
      <p class="process-desc">Understanding the company, goals, and context.</p>
    </div>
  </li>
  <!-- ... -->
</ol>
```

```css
.process-list { list-style: none; padding: 0; }

.process-item {
  display: grid;
  grid-template-columns: 3rem 1fr;
  gap: var(--space-5);
  padding-block: var(--space-6);
  border-top: 1px solid var(--color-border);
}

.process-item:last-child { border-bottom: 1px solid var(--color-border); }

.process-number {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-fg-muted);
  padding-top: 0.25em;
}

.process-title {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: var(--weight-bold);
  margin-bottom: var(--space-2);
}
```

### 6.6 Live Clock

A real-time clock displayed in the nav or hero — a detail that signals attention to craft.

```js
function LiveClock({ timezone = 'Europe/Amsterdam', label = 'CET' }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const tick = () => {
      const t = new Date().toLocaleTimeString('en-GB', {
        timeZone: timezone,
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setTime(t);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [timezone]);

  return (
    <div className="live-clock">
      <span className="clock-time">{time}</span>
      <span className="clock-label">{label}</span>
    </div>
  );
}
```

```css
.live-clock {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-fg-muted);
  letter-spacing: 0.03em;
  line-height: 1.3;
}
```

### 6.7 Sound Toggle

A minimal button that mutes/unmutes ambient audio (if present). Represented as just a text label that toggles.

```html
<button class="sound-toggle" aria-label="Toggle sound">
  <span class="sound-label">Sound</span>
  <span class="sound-indicator" aria-hidden="true"></span>
</button>
```

```css
.sound-toggle {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--color-fg-muted);
  font-family: var(--font-ui);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  transition: color 0.25s ease;
}

.sound-toggle:hover { color: var(--color-fg); }

.sound-indicator {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-fg-muted);
  transition: background 0.25s ease;
}

.sound-toggle.active .sound-indicator {
  background: var(--color-fg);
}
```

### 6.8 Footer

Dense information footer with contact details, availability, and social links.

```
[Contact info (left)]               [Tagline (center)]    [Social links (right)]
work@email.com →
+31 6 00 000 000 →
Start collaboration →

                    Building for agencies           Instagram @handle
                    freelancers & brands            LinkedIn @handle
                    
                    Availability from
                    late May '26
```

---

## 7. Animations & Motion

This is where the design's character lives. Motion is **smooth, deliberate, and generous in duration**.

### 7.1 Scroll-Triggered Entrance Animations

Every content block enters with a combination of **opacity** + **vertical translate**. Use `IntersectionObserver` (vanilla) or a library like Framer Motion / GSAP ScrollTrigger.

**Default entrance:**
```css
.reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.reveal.in-view {
  opacity: 1;
  transform: translateY(0);
}
```

**Staggered children (e.g. nav links, card grids):**
```css
.reveal-child {
  opacity: 0;
  transform: translateY(24px);
  transition-property: opacity, transform;
  transition-duration: 0.6s;
  transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
}

.reveal-child:nth-child(1) { transition-delay: 0ms; }
.reveal-child:nth-child(2) { transition-delay: 60ms; }
.reveal-child:nth-child(3) { transition-delay: 120ms; }
.reveal-child:nth-child(4) { transition-delay: 180ms; }

.in-view .reveal-child {
  opacity: 1;
  transform: none;
}
```

**JS observer:**
```js
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(el => {
      if (el.isIntersecting) {
        el.target.classList.add('in-view');
        observer.unobserve(el.target); // fire once
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
```

### 7.2 Hero Text Animation

On page load, the hero headline animates in line-by-line using a **split-text** technique:

```js
// Split each line into a wrapper with overflow:hidden
// Then animate each line's inner span from translateY(100%) → translateY(0)
const lines = heroEl.querySelectorAll('.line');

lines.forEach((line, i) => {
  line.style.transitionDelay = `${i * 100}ms`;
  line.classList.add('reveal-line');
});
```

```css
.line-wrapper {
  overflow: hidden;
  display: block;
}

.reveal-line {
  display: block;
  transform: translateY(110%);
  transition: transform 1s cubic-bezier(0.16, 1, 0.3, 1);
}

.loaded .reveal-line {
  transform: translateY(0);
}
```

### 7.3 Page Transition

Between route changes, a **full-screen overlay** slides in, then out, giving the impression of a controlled handoff between pages.

```js
// Overlay slides down to cover the screen → new page renders → overlay slides up
// Use CSS + class toggling, or a library like Swup / Barba.js
```

```css
.page-transition {
  position: fixed;
  inset: 0;
  background: var(--color-bg);
  z-index: 9999;
  transform: translateY(-100%);
  transition: transform 0.6s cubic-bezier(0.76, 0, 0.24, 1);
}

.page-transition.enter { transform: translateY(0); }
.page-transition.exit  { transform: translateY(100%); }
```

### 7.4 Custom Cursor

Replace the default cursor with a custom one — a small circle that **lags slightly** behind the real cursor position for a fluid, organic feel.

```js
const cursor = document.querySelector('.cursor');
let mouseX = 0, mouseY = 0;
let curX = 0, curY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  curX += (mouseX - curX) * 0.12;
  curY += (mouseY - curY) * 0.12;
  cursor.style.transform = `translate(${curX}px, ${curY}px)`;
  requestAnimationFrame(animateCursor);
}
animateCursor();
```

```css
* { cursor: none; }

.cursor {
  position: fixed;
  top: -8px;
  left: -8px;
  width: 16px;
  height: 16px;
  border: 1px solid var(--color-fg);
  border-radius: 50%;
  pointer-events: none;
  z-index: 10000;
  transition: width 0.3s ease, height 0.3s ease, background 0.3s ease;
  will-change: transform;
}

/* Expand on hover over links/buttons */
a:hover ~ .cursor,
button:hover ~ .cursor {
  width: 40px;
  height: 40px;
  background: rgba(240, 237, 232, 0.08);
  top: -20px;
  left: -20px;
}
```

### 7.5 Image Hover Parallax

On desktop, cards subtly shift their inner image on mouse move (parallax within the card bounds):

```js
card.addEventListener('mousemove', (e) => {
  const rect = card.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width  - 0.5;
  const y = (e.clientY - rect.top)  / rect.height - 0.5;
  img.style.transform = `scale(1.04) translate(${x * 10}px, ${y * 10}px)`;
});

card.addEventListener('mouseleave', () => {
  img.style.transform = 'scale(1) translate(0, 0)';
});
```

### 7.6 Horizontal Marquee / Ticker

Repeating text ticker used as a section separator or ambient element.

```html
<div class="marquee" aria-hidden="true">
  <div class="marquee-track">
    <span>The Cavalry is here</span>
    <span>R—K</span>
    <span>The Cavalry is here</span>
    <span>R—K</span>
    <!-- duplicated for seamless loop -->
  </div>
</div>
```

```css
.marquee {
  overflow: hidden;
  white-space: nowrap;
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  padding-block: var(--space-4);
  font-family: var(--font-display);
  font-size: var(--text-xl);
  color: var(--color-fg-faint);
}

.marquee-track {
  display: inline-flex;
  gap: var(--space-8);
  animation: marquee-scroll 18s linear infinite;
}

@keyframes marquee-scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
```

### 7.7 Timing Reference

| Interaction | Duration | Easing |
|---|---|---|
| Link hover | 200–250ms | `ease` |
| Card hover (image) | 500–600ms | `ease` |
| Reveal entrance | 700–900ms | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Hero line reveal | 900–1100ms | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Page transition | 600ms | `cubic-bezier(0.76, 0, 0.24, 1)` |
| Cursor lag | ~120ms effective | `rAF lerp at 0.12` |
| Marquee loop | 18–24s | `linear` |

---

## 8. Responsiveness

### Breakpoints

```css
/* Mobile first */
:root {
  --bp-sm:  480px;
  --bp-md:  768px;
  --bp-lg:  1024px;
  --bp-xl:  1280px;
  --bp-2xl: 1600px;
}

@media (min-width: 768px)  { /* tablet+ */ }
@media (min-width: 1024px) { /* desktop */ }
@media (min-width: 1280px) { /* large desktop */ }
```

### Responsive Rules

| Element | Mobile | Tablet | Desktop |
|---|---|---|---|
| Hero headline | `clamp(2.5rem, 10vw, 5rem)` | scales up | `clamp(5rem, 8vw, 10rem)` |
| Navigation | Hidden, hamburger | Hidden, hamburger | Full horizontal |
| Project grid | 1 column | 2 columns | 2–3 columns |
| Insight cards | 1 column | 2 columns | 4 columns |
| Section gap | 60px | 100px | 140–160px |
| Page gutter | 20px | 40px | 60–80px |
| Custom cursor | Disabled | Disabled | Enabled |
| Parallax effects | Disabled | Disabled | Enabled |

### Mobile-Specific Behavior
- Remove custom cursor entirely on touch devices (`@media (hover: none)`)
- Replace parallax with simpler fade entrance
- Hamburger menu triggers full-viewport overlay nav
- Ticket CTA stacks vertically
- Clock/Sound toggle may be hidden or moved to mobile nav overlay

---

## 9. Micro-copy & Voice Patterns

The writing style is confident, terse, and slightly editorial:

- **Short declarative statements:** "Leave yours." / "The Cavalry is here."
- **No filler words.** Every word justifies its place.
- **Em-dashes for rhythm:** "Design & Code—for those who refuse to settle."
- **Lowercase casual labels:** "From the desk"
- **Date formats:** `Mon 9 March '26` / `August 2024—NOW`
- **Abbreviated year:** `'26` not `2026`
- **Arrow CTAs:** `Get in touch →` / `Read info →`
- **Availability notes:** Precise and time-specific: "Availability from late May '26"

---

## 10. Page Templates

### 10.1 Home Page Flow

```
[NAVIGATION — fixed]
[HERO — 100dvh, large statement, marquee at bottom]
[WORKS — project grid, 2-up, scroll-triggered]
[TICKET CTA — for agencies / for brands]
[INSIGHTS — 4-up card grid]
[FOOTER — contact + socials]
```

### 10.2 About / Info Page

```
[NAVIGATION]
[PAGE HEADER — H1 + section marker]
[SPLIT SECTION — body text left, portrait image right]
[CAPABILITIES — inline list or two-column]
[PROCESS — numbered accordion/list]
[TESTIMONIAL — large pull quote]
[SELECTED WORKS — mini grid]
[CTA — contact block]
[FOOTER]
```

### 10.3 Project Archive Page

```
[NAVIGATION]
[PROJECT HERO — full-bleed image or video + title overlay]
[PROJECT META — client, role, year, scope in small grid]
[CONTENT SECTIONS — full-bleed images, text + image pairs]
[NEXT PROJECT — link with thumbnail]
[FOOTER]
```

---

## 11. Implementation Notes by Stack

### Vanilla HTML/CSS/JS
- Use `IntersectionObserver` for scroll reveals
- Use CSS custom properties for all tokens
- Implement cursor, clock, sound toggle in vanilla JS
- Use `rAF` loop for cursor interpolation
- CSS `@keyframes` for marquee

### React / Next.js
- Use `framer-motion` for page transitions and scroll reveals (`useInView`, `motion.div`)
- Use `next/image` for optimized dual-image card setup
- Context or Zustand for sound state
- `useEffect` + `setInterval` for live clock

### Vue / Nuxt
- `@vueuse/motion` or GSAP for animations
- `useIntersectionObserver` from VueUse for scroll reveals
- Composable for live clock

### Astro
- Islands architecture: keep animations in framework islands
- Use CSS for all static entrance animations
- Svelte or React island for interactive clock, cursor, sound

### GSAP (any stack)
```js
// Preferred animation library for maximum control
gsap.registerPlugin(ScrollTrigger, SplitText);

gsap.from('.hero-line', {
  yPercent: 110,
  stagger: 0.1,
  duration: 1.2,
  ease: 'expo.out',
  scrollTrigger: { trigger: '.hero', start: 'top 80%' }
});
```

---

## 12. Do's and Don'ts

### ✅ Do
- Use lots of breathing room — sections should feel spacious
- Let type carry visual weight; resist adding decorative elements
- Animate on scroll, not immediately on load (except the hero)
- Use serif display fonts for headings, sans-serif for UI
- Keep the color palette to 2–3 values max
- Use the em-dash `—` as a signature separator
- Make the footer dense with real information (contact, availability, socials)
- Add micro-details: live clock, sound toggle, numbered sections
- Use `cubic-bezier(0.16, 1, 0.3, 1)` (expo-out-like) for entrance transitions

### ❌ Don't
- Don't use bright accent colors or gradients
- Don't add drop shadows or heavy border-radius (max 2–4px)
- Don't use animations under 300ms for major reveals — they'll feel cheap
- Don't center-align body text or large blocks (left-align is the rule)
- Don't use stock icons or generic UI kits — all decoration should be typographic
- Don't bloat the nav with dropdowns or mega-menus
- Don't use horizontal scrolling for main content (marquees are the exception)
- Don't forget `prefers-reduced-motion` — wrap all non-essential animations

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

*End of R—K Design Language Guide. Adapt the tokens, keep the philosophy.*
