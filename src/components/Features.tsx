import { useCallback, useState, type CSSProperties, type ReactNode } from 'react';
import { RubikCubeWrap } from './RubikCubeWrap';

type FeatureItem = {
  id: string;
  title: string;
  style: CSSProperties;
  icon: ReactNode;
  bullets: string[];
};

const FEATURE_ITEMS: FeatureItem[] = [
  {
    id: '1',
    title: 'Search API',
    style: {
      ['--feature-accent' as string]: '#E53935',
      ['--feature-on-accent' as string]: '#ffffff',
      ['--feature-panel-bg' as string]: 'rgb(252 235 235)',
    },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square" strokeLinejoin="miter">
        <circle cx="10.5" cy="10.5" r="7" />
        <path d="M15.5 15.5 21 21" />
      </svg>
    ),
    bullets: [
      'Web search built for agents. Find relevant websites based on a single query.',
      'Structured results you can pass straight into models or RAG pipelines.',
    ],
  },
  {
    id: '2',
    title: 'Fetch API',
    style: {
      ['--feature-accent' as string]: '#FB8C00',
      ['--feature-on-accent' as string]: '#ffffff',
      ['--feature-panel-bg' as string]: 'rgb(255 244 230)',
    },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square" strokeLinejoin="miter">
        <path d="M13 2.5H5.5a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2V8.5L13 2.5z" />
        <path d="M13 2.5v6h6.5" />
      </svg>
    ),
    bullets: [
      'Convert any URL into HTML, JSON or markdown for your agent instantly.',
      'Skip headless boilerplate—one request, clean output.',
    ],
  },
  {
    id: '3',
    title: 'Browser-as-a-Service',
    style: {
      ['--feature-accent' as string]: '#FDD835',
      ['--feature-on-accent' as string]: '#1a1a1a',
      ['--feature-panel-bg' as string]: 'rgb(255 251 235)',
    },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square" strokeLinejoin="miter">
        <rect x="2.5" y="4" width="19" height="13" />
        <path d="M8 20.5h8M12 17v3.5" />
      </svg>
    ),
    bullets: [
      'Give your agent a real browser. Navigate interactive sites and perform complex actions.',
      'Full rendering for SPAs, JavaScript-heavy pages, and dynamic UIs.',
    ],
  },
  {
    id: '4',
    title: 'Auth & Sessions',
    style: {
      ['--feature-accent' as string]: '#43A047',
      ['--feature-on-accent' as string]: '#ffffff',
      ['--feature-panel-bg' as string]: 'rgb(236 246 237)',
    },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square" strokeLinejoin="miter">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    bullets: [
      'Handle login flows, cookies and persistent sessions automatically.',
      'Reuse authenticated state across runs without re-entering credentials.',
    ],
  },
  {
    id: '5',
    title: 'Observability',
    style: {
      ['--feature-accent' as string]: '#00ACC1',
      ['--feature-on-accent' as string]: '#ffffff',
      ['--feature-panel-bg' as string]: 'rgb(230 247 249)',
    },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square" strokeLinejoin="miter">
        <polyline points="2 12 6 12 9 3 15 21 18 12 22 12" />
      </svg>
    ),
    bullets: [
      'Live session replay, logs and structured traces for every browser task.',
      'Debug agent failures with full context—no local reproduction required.',
    ],
  },
  {
    id: '6',
    title: 'Parallel Sessions',
    style: {
      ['--feature-accent' as string]: '#1E88E5',
      ['--feature-on-accent' as string]: '#ffffff',
      ['--feature-panel-bg' as string]: 'rgb(233 243 252)',
    },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square" strokeLinejoin="miter">
        <rect x="2.5" y="2.5" width="19" height="19" fill="none" />
        <rect x="2.5" y="8.5" width="13" height="13" fill="none" />
        <rect x="2.5" y="14.5" width="7" height="7" fill="none" />
        <rect x="2.5" y="18.5" width="3" height="3" fill="currentColor" stroke="none" />
      </svg>
    ),
    bullets: [
      'Spin up thousands of concurrent browser sessions and return answers immediately.',
      'Elastic concurrency without provisioning or managing your own fleet.',
    ],
  },
];

function ChevronIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square" strokeLinejoin="miter" aria-hidden="true">
      <path d="M2.5 4.25L6 7.75L9.5 4.25" />
    </svg>
  );
}

export function Features() {
  const [openId, setOpenId] = useState<string | null>(null);

  const onToggle = useCallback((id: string) => {
    setOpenId((cur) => (cur === id ? null : id));
  }, []);

  return (
    <section className="features" id="features">
      <div className="container features__inner">
        <div className="features__bg" aria-hidden="true">
          <div className="features__bg-grid" />
          <RubikCubeWrap />
        </div>
        <div className="features__main">
          <div className="features__header">
            <h2 className="features__title">FEATURES</h2>
          </div>
          <div className="features__list">
            <ul className="feature-cards">
              {FEATURE_ITEMS.map((f) => {
                const active = openId === f.id;
                return (
                  <li key={f.id} className={`feature-card${active ? ' feature-card--active' : ''}`} style={f.style}>
                    <button
                      type="button"
                      className="feature-card__toggle"
                      aria-expanded={active}
                      aria-controls={`feature-panel-${f.id}`}
                      id={`feature-label-${f.id}`}
                      onClick={() => onToggle(f.id)}
                    >
                      <span className="feature-card__head">
                        <span className="feature-card__icon" aria-hidden="true">
                          {f.icon}
                        </span>
                        <span className="feature-card__title">{f.title}</span>
                      </span>
                      <span className="feature-card__chevron" aria-hidden="true">
                        <ChevronIcon />
                      </span>
                    </button>
                    <div
                      className={`feature-card__panel${active ? ' feature-card__panel--open' : ''}`}
                      id={`feature-panel-${f.id}`}
                      role="region"
                      aria-labelledby={`feature-label-${f.id}`}
                      aria-hidden={!active}
                    >
                      <div className="feature-card__panel-inner">
                        <ul className="feature-card__bullets">
                          {f.bullets.map((b) => (
                            <li key={b}>{b}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
