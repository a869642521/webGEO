import { useCallback, useEffect, useState } from 'react';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleMenu = useCallback(() => {
    setMenuOpen((o) => !o);
  }, []);

  useEffect(() => {
    const links = document.querySelector('.navbar__links') as HTMLElement | null;
    const actions = document.querySelector('.navbar__actions') as HTMLElement | null;
    if (!links || !actions) return;
    if (!menuOpen) {
      links.style.display = '';
      actions.style.display = '';
      actions.style.top = '';
      return;
    }
    links.style.cssText =
      'display:flex;flex-direction:column;position:absolute;top:64px;left:0;right:0;background:rgba(255,255,255,.98);backdrop-filter:blur(20px);padding:16px 24px;border-bottom:1px solid rgba(0,0,0,.06);gap:0;z-index:99;';
    actions.style.cssText =
      'display:flex;flex-direction:column;position:absolute;left:0;right:0;background:rgba(255,255,255,.98);backdrop-filter:blur(20px);padding:0 24px 16px;z-index:99;gap:8px;';
    actions.style.top = `${64 + links.offsetHeight}px`;
  }, [menuOpen]);

  return (
    <header className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="container navbar__inner">
        <a href="#" className="navbar__logo">
          <span className="logo-mark-b" aria-hidden="true">
            B
          </span>
          <span className="logo-text">Browserbase</span>
        </a>
        <nav className="navbar__links">
          <a href="#" className="nav-link nav-link--dropdown">
            Products{' '}
            <svg className="nav-chevron" width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
              <path d="M2.5 3.5L5 6l2.5-2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="#" className="nav-link nav-link--dropdown">
            Solutions{' '}
            <svg className="nav-chevron" width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
              <path d="M2.5 3.5L5 6l2.5-2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="#" className="nav-link nav-link--dropdown">
            Resources{' '}
            <svg className="nav-chevron" width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
              <path d="M2.5 3.5L5 6l2.5-2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="#" className="nav-link">
            Pricing
          </a>
          <a href="#" className="nav-link nav-link--external">
            Docs{' '}
            <svg className="nav-external" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </nav>
        <div className="navbar__actions">
          <a href="#" className="navbar__text-action">
            Log in
          </a>
          <a href="#" className="btn btn--primary btn--nav">
            Sign Up
          </a>
          <a href="#" className="btn btn--outline-dark btn--nav">
            Get a Demo
          </a>
        </div>
        <button type="button" className="navbar__hamburger" aria-label="Menu" onClick={toggleMenu}>
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
