/* ============================================================
   script.js — YiChi Zhang Personal Page
   ============================================================ */

// ── Nav scroll effect ──────────────────────────────────────
const nav = document.getElementById('nav');
const onScroll = () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ── Mobile nav toggle ──────────────────────────────────────
const navToggle = document.getElementById('nav-toggle');
const navLinks  = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ── Scroll Reveal ──────────────────────────────────────────
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const siblings = Array.from(
          entry.target.parentElement.querySelectorAll('.reveal:not(.visible)')
        );
        const index = siblings.indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

revealElements.forEach(el => revealObserver.observe(el));

// ── Active nav link on scroll ──────────────────────────────
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navAnchors.forEach(a => {
          a.style.color = a.getAttribute('href') === `#${id}`
            ? 'var(--accent-hot)' : '';
        });
      }
    });
  },
  { threshold: 0.3 }
);

sections.forEach(s => sectionObserver.observe(s));

// ── Typed cursor on hero name ──────────────────────────────
const heroName = document.querySelector('.hero-name');
if (heroName) {
  const cursor = document.createElement('span');
  cursor.textContent = '_';
  cursor.style.cssText = `
    display: inline-block;
    color: var(--accent-hot);
    font-size: 0.6em;
    vertical-align: middle;
    margin-left: 6px;
    animation: blink 1.2s step-end infinite;
  `;
  const style = document.createElement('style');
  style.textContent = `@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`;
  document.head.appendChild(style);
  heroName.appendChild(cursor);
}

// ══════════════════════════════════════════════════════════
//  🌗  BLACK & WHITE TOGGLE
// ══════════════════════════════════════════════════════════
const bwToggle   = document.getElementById('bw-toggle');
const bwIconSun  = document.getElementById('bw-icon-sun');
const bwIconMoon = document.getElementById('bw-icon-moon');

let bwActive = localStorage.getItem('bw-mode') === 'true';

function applyBW(state) {
  document.body.classList.toggle('bw-mode', state);
  bwToggle.classList.toggle('active', state);
  // sun icon visible when color mode (click switches to BW)
  // moon icon visible when BW mode active (click restores color)
  bwIconSun.style.display  = state ? 'none'         : 'block';
  bwIconMoon.style.display = state ? 'block'        : 'none';
  bwToggle.setAttribute('aria-label', state
    ? 'Switch to color mode'
    : 'Switch to black and white mode');
}

applyBW(bwActive);

bwToggle.addEventListener('click', () => {
  bwActive = !bwActive;
  applyBW(bwActive);
  localStorage.setItem('bw-mode', bwActive);
});

// ══════════════════════════════════════════════════════════
//  🌐  LANGUAGE TOGGLE  (EN ↔ 中文)
// ══════════════════════════════════════════════════════════
const langToggle = document.getElementById('lang-toggle');
const langLabel  = document.getElementById('lang-label');

let lang = localStorage.getItem('lang') || 'en';

/**
 * For each element that has both data-en and data-zh attributes,
 * set its innerHTML to the translation for the current language.
 * Elements without a data-zh keep their original content.
 */
function applyLang(l) {
  document.documentElement.lang = l === 'zh' ? 'zh-CN' : 'en';
  langLabel.textContent = l === 'zh' ? 'EN' : '中文';
  langToggle.classList.toggle('active', l === 'zh');

  document.querySelectorAll('[data-en][data-zh]').forEach(el => {
    const text = l === 'zh' ? el.dataset.zh : el.dataset.en;
    if (text !== undefined) {
      // Use innerHTML so tags like <strong> inside the strings render
      el.innerHTML = text;
    }
  });
}

applyLang(lang);

langToggle.addEventListener('click', () => {
  lang = lang === 'en' ? 'zh' : 'en';
  applyLang(lang);
  localStorage.setItem('lang', lang);
});

// ── Console Easter egg ────────────────────────────────────
console.log('%c YiChi Zhang ', 'background:#c0392b;color:#fff;font-size:18px;font-family:monospace;padding:4px 12px;border-radius:2px;');
console.log('%c Knight9-Zhang · Researcher & Developer ', 'color:#888;font-family:monospace;font-size:12px;');
console.log('%c \'不积跬步，无以至千里\' ', 'color:#c0392b;font-family:monospace;font-size:11px;');
