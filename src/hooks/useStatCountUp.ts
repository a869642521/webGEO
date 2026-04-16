import { useEffect } from 'react';

function animateNumber(el: HTMLElement, target: number, duration = 1800) {
  const suffix = el.dataset.suffix || '';
  const finalText = el.dataset.final || el.textContent || '';
  const start = performance.now();
  const update = (now: number) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - (1 - progress) ** 3;
    el.textContent = Math.floor(eased * target).toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = finalText;
  };
  requestAnimationFrame(update);
}

export function useStatCountUp() {
  useEffect(() => {
    const statNums = document.querySelectorAll('.stat-card__num');
    const statObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.dataset.final = el.textContent || '';
            const raw = (el.textContent || '').replace(/[^0-9]/g, '');
            if (raw) animateNumber(el, parseInt(raw, 10));
            statObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.3 },
    );
    statNums.forEach((el) => statObserver.observe(el));
    return () => statObserver.disconnect();
  }, []);
}
