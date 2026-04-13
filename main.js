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

// Scroll reveal
const revealEls = document.querySelectorAll(
  '.feature-item, .hiw__step, .use-card, .tweet-card, .stat-card, .logo-pill'
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
