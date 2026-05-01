/* =============================================================
   ARYA KAVIAN — PORTFOLIO
   Vanilla JS interactions
   ============================================================= */

(() => {
  'use strict';

  // ----- LOADED CLASS (kicks off hero text reveal) -----
  document.addEventListener('DOMContentLoaded', () => {
    requestAnimationFrame(() => document.body.classList.add('is-loaded'));
  });

  // ----- LIVE CLOCK -----
  const clockEl = document.querySelector('[data-clock]');
  if (clockEl) {
    const tz = clockEl.dataset.tz || 'Asia/Tehran';
    const label = clockEl.dataset.label || 'TEH';
    const timeNode = document.createElement('span');
    const labelNode = document.createElement('span');
    timeNode.className = 'clock-time';
    labelNode.className = 'clock-label';
    labelNode.textContent = label;
    clockEl.appendChild(timeNode);
    clockEl.appendChild(labelNode);

    const tick = () => {
      try {
        const t = new Date().toLocaleTimeString('en-GB', {
          timeZone: tz,
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        });
        timeNode.textContent = t;
      } catch (e) {
        timeNode.textContent = new Date().toLocaleTimeString('en-GB', { hour12: false });
      }
    };
    tick();
    setInterval(tick, 1000);
  }

  // ----- NAV: scrolled state -----
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => {
      if (window.scrollY > 24) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ----- MOBILE NAV TOGGLE -----
  const navToggle = document.querySelector('.nav-toggle');
  const navOverlay = document.querySelector('.nav-overlay');
  if (navToggle && navOverlay) {
    const closeOnLink = navOverlay.querySelectorAll('a');
    navToggle.addEventListener('click', () => {
      const open = navOverlay.classList.toggle('is-open');
      navToggle.classList.toggle('is-open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    closeOnLink.forEach(a => {
      a.addEventListener('click', () => {
        navOverlay.classList.remove('is-open');
        navToggle.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }

  // ----- SCROLL REVEAL -----
  const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
  if (revealEls.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -80px 0px' });

    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in-view'));
  }

  // ----- CUSTOM CURSOR (desktop only) -----
  const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (supportsHover) {
    const cursor = document.createElement('div');
    const dot = document.createElement('div');
    cursor.className = 'cursor';
    dot.className = 'cursor-dot';
    document.body.append(cursor, dot);

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let cx = mx, cy = my;
    let dx = mx, dy = my;

    document.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
    });

    const animate = () => {
      cx += (mx - cx) * 0.18;
      cy += (my - cy) * 0.18;
      dx += (mx - dx) * 0.45;
      dy += (my - dy) * 0.45;
      cursor.style.transform = `translate(${cx - cursor.offsetWidth / 2}px, ${cy - cursor.offsetHeight / 2}px)`;
      dot.style.transform    = `translate(${dx - 2}px, ${dy - 2}px)`;
      requestAnimationFrame(animate);
    };
    animate();

    const linkSelectors = 'a, button, [role="button"], input, textarea, .filter-btn';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(linkSelectors)) cursor.classList.add('is-link');
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(linkSelectors)) cursor.classList.remove('is-link');
    });
  }

  // ----- WORK CARD: parallax (desktop only) -----
  if (supportsHover) {
    document.querySelectorAll('.work-card').forEach((card) => {
      const inner = card.querySelector('.placeholder');
      if (!inner) return;
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        inner.style.transform = `scale(1.04) translate(${x * 12}px, ${y * 12}px)`;
      });
      card.addEventListener('mouseleave', () => {
        inner.style.transform = '';
      });
    });
  }

  // ----- FILTERS (projects/blog) -----
  const filterGroups = document.querySelectorAll('[data-filter-group]');
  filterGroups.forEach((group) => {
    const buttons = group.querySelectorAll('.filter-btn');
    const targetSel = group.dataset.filterTarget;
    if (!targetSel) return;
    const items = document.querySelectorAll(targetSel);
    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        buttons.forEach((b) => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        const filter = btn.dataset.filter;
        items.forEach((item) => {
          const tags = (item.dataset.tags || '').split(' ');
          const show = filter === 'all' || tags.includes(filter);
          item.style.display = show ? '' : 'none';
        });
      });
    });
  });

  // ----- COMMAND HINT (Cmd/Ctrl-K opens contact) -----
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      window.location.href = 'contact.html';
    }
  });

  // ----- COPY EMAIL ON CLICK -----
  document.querySelectorAll('[data-copy]').forEach((el) => {
    el.addEventListener('click', async (e) => {
      e.preventDefault();
      const value = el.dataset.copy;
      try {
        await navigator.clipboard.writeText(value);
        const original = el.dataset.originalText || el.textContent;
        el.dataset.originalText = original;
        el.textContent = 'copied →';
        setTimeout(() => { el.textContent = original; }, 1600);
      } catch (err) {
        window.location.href = `mailto:${value}`;
      }
    });
  });

})();
