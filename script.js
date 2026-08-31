/* ============================================================
   script.js — YiChi Zhang Personal Page
   ============================================================ */

// ── Nav scroll effect ──────────────────────────────────────
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
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
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const siblings = Array.from(
      entry.target.parentElement.querySelectorAll('.reveal:not(.visible)')
    );
    const index = siblings.indexOf(entry.target);
    setTimeout(() => entry.target.classList.add('visible'), index * 80);
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
revealElements.forEach(el => revealObserver.observe(el));

// ── Active nav link on scroll ──────────────────────────────
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const id = entry.target.getAttribute('id');
    navAnchors.forEach(a => {
      a.style.color = a.getAttribute('href') === `#${id}` ? 'var(--accent-hot)' : '';
    });
  });
}, { threshold: 0.3 });
sections.forEach(s => sectionObserver.observe(s));

// ── Typed cursor on hero name ──────────────────────────────
const heroName = document.querySelector('.hero-name');
if (heroName) {
  const cursor = document.createElement('span');
  cursor.textContent = '_';
  cursor.style.cssText = `
    display:inline-block; color:var(--accent-hot);
    font-size:0.6em; vertical-align:middle; margin-left:6px;
    animation:blink 1.2s step-end infinite;
  `;
  const style = document.createElement('style');
  style.textContent = '@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}';
  document.head.appendChild(style);
  heroName.appendChild(cursor);
}

// ══════════════════════════════════════════════════════════
//  🌗  DARK ↔ LIGHT THEME TOGGLE
//  Uses data-theme attribute on <html> for reliable CSS variable switching
// ══════════════════════════════════════════════════════════
const bwToggle   = document.getElementById('bw-toggle');
const bwIconSun  = document.getElementById('bw-icon-sun');
const bwIconMoon = document.getElementById('bw-icon-moon');
const htmlEl     = document.documentElement;

// Migrate old localStorage key
localStorage.removeItem('bw-mode');

let lightActive = localStorage.getItem('theme') === 'light';

function applyTheme(isLight) {
  htmlEl.setAttribute('data-theme', isLight ? 'light' : 'dark');
  bwToggle.classList.toggle('active', isLight);
  bwIconSun.style.display  = isLight ? 'none'  : 'block'; // sun = dark mode shown
  bwIconMoon.style.display = isLight ? 'block' : 'none';  // moon = light mode shown
  bwToggle.title = isLight ? '切换为黑色主题' : '切换为白色主题';
  bwToggle.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
}

applyTheme(lightActive);

bwToggle.addEventListener('click', () => {
  lightActive = !lightActive;
  applyTheme(lightActive);
  localStorage.setItem('theme', lightActive ? 'light' : 'dark');
});

// ══════════════════════════════════════════════════════════
//  🌐  LANGUAGE TOGGLE  (EN ↔ 中文)
// ══════════════════════════════════════════════════════════
const langToggle = document.getElementById('lang-toggle');
const langLabel  = document.getElementById('lang-label');

let lang = localStorage.getItem('lang') || 'en';

function applyLang(l) {
  document.documentElement.lang = l === 'zh' ? 'zh-CN' : 'en';
  langLabel.textContent = l === 'zh' ? 'EN' : '中文';
  langToggle.classList.toggle('active', l === 'zh');

  document.querySelectorAll('[data-en][data-zh]').forEach(el => {
    const text = l === 'zh' ? el.dataset.zh : el.dataset.en;
    if (text !== undefined) el.innerHTML = text;
  });
}

applyLang(lang);

langToggle.addEventListener('click', () => {
  lang = lang === 'en' ? 'zh' : 'en';
  applyLang(lang);
  localStorage.setItem('lang', lang);
});

// ══════════════════════════════════════════════════════════
//  📧  EMAIL MODAL
// ══════════════════════════════════════════════════════════
const emailModal    = document.getElementById('email-modal');
const modalClose    = document.getElementById('modal-close');
const emailTriggers = [
  document.getElementById('hero-email-btn'),
  document.getElementById('hero-contact-btn'),
  document.getElementById('contact-email-btn'),
].filter(Boolean);

function openModal() {
  emailModal.classList.add('open');
  document.body.style.overflow = 'hidden';
  modalClose.focus();
}
function closeModal() {
  emailModal.classList.remove('open');
  document.body.style.overflow = '';
}

emailTriggers.forEach(btn => btn.addEventListener('click', openModal));
modalClose.addEventListener('click', closeModal);

// Close on backdrop click
emailModal.addEventListener('click', (e) => {
  if (e.target === emailModal) closeModal();
});

// Close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && emailModal.classList.contains('open')) closeModal();
});

// Copy to clipboard buttons
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', async () => {
    const email = btn.dataset.target;
    try {
      await navigator.clipboard.writeText(email);
      const span = btn.querySelector('span');
      const originalText = span ? span.textContent : '';
      btn.classList.add('copied');
      if (span) span.textContent = lang === 'zh' ? '已复制！' : 'Copied!';
      setTimeout(() => {
        btn.classList.remove('copied');
        if (span) span.textContent = lang === 'zh' ? '复制' : 'Copy';
      }, 2000);
    } catch {
      // Fallback: select text
      const addr = btn.closest('.modal-email-row').querySelector('.modal-email-addr');
      const range = document.createRange();
      range.selectNode(addr);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
    }
  });
});

// ── Console Easter egg ────────────────────────────────────
console.log('%c YiChi Zhang ', 'background:#c0392b;color:#fff;font-size:18px;font-family:monospace;padding:4px 12px;border-radius:2px;');
console.log('%c Knight9-Zhang · Researcher & Developer ', 'color:#888;font-family:monospace;font-size:12px;');
console.log('%c \'王朝可复亦可覆\' ', 'color:#c0392b;font-family:monospace;font-size:11px;');
