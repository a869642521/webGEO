// Tab switching
const tabBtns = document.querySelectorAll('.tab-btn');
const panels  = document.querySelectorAll('.slogan__panel');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;
    tabBtns.forEach(b => b.classList.remove('tab-btn--active'));
    panels.forEach(p  => p.classList.remove('active'));
    btn.classList.add('tab-btn--active');
    document.querySelector(`[data-panel="${target}"]`)?.classList.add('active');
  });
});

// Feature cards — accordion (one open at a time; click active to close all)
document.querySelectorAll('.feature-card').forEach((card) => {
  const btn = card.querySelector('.feature-card__toggle');
  const panel = card.querySelector('.feature-card__panel');
  if (!btn || !panel) return;
  btn.addEventListener('click', () => {
    const wasActive = card.classList.contains('feature-card--active');
    document.querySelectorAll('.feature-card').forEach((c) => {
      c.classList.remove('feature-card--active');
      const b = c.querySelector('.feature-card__toggle');
      const p = c.querySelector('.feature-card__panel');
      b?.setAttribute('aria-expanded', 'false');
      p?.setAttribute('hidden', '');
    });
    if (!wasActive) {
      card.classList.add('feature-card--active');
      btn.setAttribute('aria-expanded', 'true');
      panel.removeAttribute('hidden');
    }
  });
});

// Scroll reveal
const revealEls = document.querySelectorAll(
  '.feature-card, .hiw__step, .use-card, .tweet-card, .stat-card, .logo-pill'
);
revealEls.forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${(i % 6) * 55}ms`;
});
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });
revealEls.forEach(el => observer.observe(el));

// Navbar scroll class
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// Mobile hamburger
const hamburger = document.getElementById('hamburger');
hamburger?.addEventListener('click', () => {
  const links   = document.querySelector('.navbar__links');
  const actions = document.querySelector('.navbar__actions');
  const isOpen  = links.style.display === 'flex';
  if (isOpen) {
    links.style.display = '';
    actions.style.display = '';
  } else {
    links.style.cssText   = 'display:flex;flex-direction:column;position:absolute;top:64px;left:0;right:0;background:rgba(255,255,255,.98);backdrop-filter:blur(20px);padding:16px 24px;border-bottom:1px solid rgba(0,0,0,.06);gap:0;z-index:99;';
    actions.style.cssText = 'display:flex;flex-direction:column;position:absolute;left:0;right:0;background:rgba(255,255,255,.98);backdrop-filter:blur(20px);padding:0 24px 16px;z-index:99;gap:8px;';
    actions.style.top = (64 + links.offsetHeight) + 'px';
  }
});

// Stats count-up animation
function animateNumber(el, target, duration = 1800) {
  const start  = performance.now();
  const update = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target).toLocaleString() + (el.dataset.suffix || '');
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = el.dataset.final;
  };
  requestAnimationFrame(update);
}

const statNums    = document.querySelectorAll('.stat-card__num');
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el  = entry.target;
      el.dataset.final = el.textContent;
      const raw = el.textContent.replace(/[^0-9]/g, '');
      if (raw) animateNumber(el, parseInt(raw, 10));
      statObserver.unobserve(el);
    }
  });
}, { threshold: 0.3 });
statNums.forEach(el => statObserver.observe(el));

// ── 8 independent mini-cube scatter on hover ──────────────────────
(function () {
  const scene = document.querySelector('.rubik-scene');
  if (!scene) return;

  const OFFSET  = 26;  // px: resting distance from rubik center to mini-cube center
  const SCATTER = 42;  // px: additional outward travel on hover

  const cubes = scene.querySelectorAll('.mcube');

  cubes.forEach(cube => {
    const dx = parseInt(cube.dataset.x, 10);
    const dy = parseInt(cube.dataset.y, 10);
    const dz = parseInt(cube.dataset.z, 10);

    const bx = dx * OFFSET;
    const by = dy * OFFSET;
    const bz = dz * OFFSET;

    // store base transform so JS owns positioning
    cube.style.transform = `translate3d(${bx}px,${by}px,${bz}px)`;

    scene.addEventListener('mouseenter', () => {
      const sx = bx + dx * SCATTER;
      const sy = by + dy * SCATTER;
      const sz = bz + dz * SCATTER;
      // add a small tilt per cube for organic feel
      const rx = dy * -12;
      const ry = dx * 12;
      cube.style.transform = `translate3d(${sx}px,${sy}px,${sz}px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });

    scene.addEventListener('mouseleave', () => {
      cube.style.transform = `translate3d(${bx}px,${by}px,${bz}px)`;
    });
  });
}());
