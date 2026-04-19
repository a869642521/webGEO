import { useEffect } from 'react';

/**
 * 监听 Hero `.hero__cta` 的实际渲染宽度，写入全局 CSS 变量 `--hero-cta-width`。
 * 页脚等位置用该变量对齐 CTA 按钮组最左/最右边缘。
 * 字体载入、视口变化、CTA 文案变化都会触发重算。
 */
export function useCtaWidthSync(): void {
  useEffect(() => {
    const cta = document.querySelector<HTMLElement>('.hero__cta');
    if (!cta) return;

    const root = document.documentElement;

    const update = () => {
      const w = cta.getBoundingClientRect().width;
      if (w > 0) root.style.setProperty('--hero-cta-width', `${Math.round(w)}px`);
    };

    update();

    const ro = new ResizeObserver(update);
    ro.observe(cta);
    window.addEventListener('resize', update);

    if (document.fonts && typeof document.fonts.ready?.then === 'function') {
      document.fonts.ready.then(update).catch(() => {});
    }

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);
}
