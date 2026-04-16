import { useEffect } from 'react';

const SELECTOR =
  '.feature-card, .hiw__step, .use-card, .tweet-card, .stat-card, .logo-pill';

export function useScrollReveal() {
  useEffect(() => {
    const revealEls = document.querySelectorAll(SELECTOR);
    revealEls.forEach((el, i) => {
      el.classList.add('reveal');
      (el as HTMLElement).style.transitionDelay = `${(i % 6) * 55}ms`;
    });
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -32px 0px' },
    );
    revealEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
