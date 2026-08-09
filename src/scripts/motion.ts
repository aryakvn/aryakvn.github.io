import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

/**
 * Motion for the deck. Everything here is decoration on top of a page that
 * already works: nothing is hidden by CSS, so if this script never runs the
 * site reads exactly the same, just still.
 *
 * Reduced motion gets nothing but the scroll rail.
 */
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
const rtl = document.documentElement.dir === 'rtl' ? -1 : 1;

gsap.registerPlugin(ScrollTrigger);

const qs = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll(sel)) as T[];

/** Hand the element back to CSS once GSAP is done with it, so :hover still works. */
const release = (targets: gsap.TweenTarget) => () => gsap.set(targets, { clearProps: 'all' });

function rail() {
  const bar = document.querySelector('.rail__fill');
  if (!bar) return;
  gsap.fromTo(
    bar,
    { scaleX: 0 },
    {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
    },
  );
}

/** The card is dealt, then the type settles onto it. */
function overture() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.9 } });

  // opacity only — the corner marks carry their own mirroring transforms
  tl.from('.frame svg', { opacity: 0, duration: 1.4, stagger: 0.06 })
    .from('.topbar__inner > *', { opacity: 0, y: -10, stagger: 0.08 }, 0.1)
    .from('.hero__arcana', { opacity: 0, y: 14, letterSpacing: '0.6em' }, 0.25)
    .from(
      '.plate',
      { opacity: 0, y: 48, scale: 0.93, filter: 'blur(10px)', duration: 1.5, ease: 'expo.out' },
      0.35,
    )
    .from('.hero__name', { opacity: 0, y: 24, letterSpacing: '0.28em', duration: 1.2 }, 0.75)
    .from('.hero__role', { opacity: 0, y: 12 }, 1.0)
    .from('.hero__tagline', { opacity: 0, y: 16 }, 1.15)
    .from('.hero__intro', { opacity: 0, y: 16 }, 1.25)
    .from('.hero__cta > *', { opacity: 0, y: 14, stagger: 0.1 }, 1.35)
    .from('.hero__domains li', { opacity: 0, y: 10, stagger: 0.07 }, 1.45)
    .add(release(['.hero__cta > *', '.frame svg', '.topbar__inner > *']));
}

/** Scroll away and the card comes toward you instead of politely leaving. */
function heroZoom() {
  const plate = document.querySelector('.plate__inner');
  if (!plate) return;

  gsap
    .timeline({
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.6,
      },
    })
    .to(plate, { scale: 1.22, yPercent: 8, ease: 'none' }, 0)
    .to('.plate img', { yPercent: -7, scale: 1.06, ease: 'none' }, 0)
    .to(
      ['.hero__name', '.hero__role', '.hero__tagline', '.hero__intro', '.hero__cta', '.hero__domains'],
      { y: -34, opacity: 0.18, ease: 'none', stagger: 0.02 },
      0,
    );
}

/** Numeral first, then the title, the way a card is turned over. */
function sectionHeads() {
  qs('.section').forEach((section) => {
    const numeral = section.querySelector('.numeral');
    const title = section.querySelector('h2');
    const note = section.querySelector('.note');
    const intro = section.querySelector('.section-intro');

    gsap
      .timeline({
        scrollTrigger: { trigger: section, start: 'top 76%' },
        defaults: { ease: 'power3.out', duration: 0.8 },
      })
      .from(numeral, { opacity: 0, scale: 0.6, rotate: -12 })
      .from(title, { opacity: 0, y: 22, skewY: 2 }, '-=0.55')
      .from(note, { opacity: 0, x: 18 * rtl }, '-=0.6')
      .from(intro, { opacity: 0, y: 14 }, '-=0.55');
  });
}

/** Cards land on the table in sequence, then go back to being CSS's problem. */
function dealCards() {
  ScrollTrigger.batch('.suit, .spread > .entry', {
    start: 'top 88%',
    onEnter: (batch) =>
      gsap.from(batch, {
        opacity: 0,
        y: 56,
        rotate: () => gsap.utils.random(-4, 4),
        scale: 0.97,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.11,
        onComplete: release(batch),
      }),
  });
}

/** The paper card is heavier: it settles rather than lands. */
function researchCard() {
  const paper = document.querySelector('.entry--paper');
  if (!paper) return;

  gsap.from(paper, {
    scrollTrigger: { trigger: paper, start: 'top 82%' },
    opacity: 0,
    scale: 0.95,
    y: 40,
    duration: 1.3,
    ease: 'expo.out',
    onComplete: release(paper),
  });
}

/** Codex entries arrive as lines of type, from the reading edge. */
function codex() {
  const rows = qs('.codex__row');
  if (!rows.length) return;

  gsap.from(rows, {
    scrollTrigger: { trigger: '.codex', start: 'top 82%' },
    opacity: 0,
    x: -28 * rtl,
    duration: 0.8,
    ease: 'power3.out',
    stagger: 0.09,
  });
}

/** A half-flip when the trick scrolls in — enough to say "this is clickable". */
function trickTease() {
  const card = document.querySelector('.trick__card');
  if (!card) return;

  gsap
    .timeline({ scrollTrigger: { trigger: card, start: 'top 80%' } })
    .from(card, { opacity: 0, y: 40, duration: 0.9, ease: 'power3.out' })
    .to(card, { rotationY: -22, duration: 0.5, ease: 'power2.inOut' })
    .to(card, { rotationY: 0, duration: 0.7, ease: 'power2.out', onComplete: release(card) });
}

/** Footer meta ticks in like a machine reporting for duty. */
function colophon() {
  gsap.from('.colophon__meta div, .colophon__links li', {
    scrollTrigger: { trigger: '.colophon', start: 'top 88%' },
    opacity: 0,
    y: 12,
    duration: 0.6,
    ease: 'power2.out',
    stagger: 0.06,
  });
}

rail();

if (!reduced.matches) {
  overture();
  heroZoom();
  sectionHeads();
  dealCards();
  researchCard();
  codex();
  trickTease();
  colophon();

  // Images finish loading after the triggers are built; positions move.
  window.addEventListener('load', () => ScrollTrigger.refresh());
}
