import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
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
      ['--feature-accent' as string]: '#1565C0',
      ['--feature-on-accent' as string]: '#ffffff',
      ['--feature-panel-bg' as string]: 'rgb(232 240 253)',
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
      ['--feature-accent' as string]: '#1976D2',
      ['--feature-on-accent' as string]: '#ffffff',
      ['--feature-panel-bg' as string]: 'rgb(227 242 253)',
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
      ['--feature-accent' as string]: '#5C6BC0',
      ['--feature-on-accent' as string]: '#ffffff',
      ['--feature-panel-bg' as string]: 'rgb(237 242 252)',
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
  {
    id: '7',
    title: 'Webhooks',
    style: {
      ['--feature-accent' as string]: '#7E57C2',
      ['--feature-on-accent' as string]: '#ffffff',
      ['--feature-panel-bg' as string]: 'rgb(241 236 252)',
    },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square" strokeLinejoin="miter">
        <path d="M8.5 9.5 6 12l2.5 2.5M15.5 9.5 18 12l-2.5 2.5" />
        <path d="M12 6v2.5M12 15.5V18" />
        <circle cx="12" cy="12" r="3.5" />
      </svg>
    ),
    bullets: [
      'Subscribe to session lifecycle events—started, finished, failed—with signed payloads you verify server-side.',
      'Build automations that react the moment a browser task completes, without polling.',
    ],
  },
  {
    id: '8',
    title: 'Regions & Latency',
    style: {
      ['--feature-accent' as string]: '#3949AB',
      ['--feature-on-accent' as string]: '#ffffff',
      ['--feature-panel-bg' as string]: 'rgb(235 238 252)',
    },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square" strokeLinejoin="miter">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a15 15 0 0 0 0 18M12 3a15 15 0 0 1 0 18" />
      </svg>
    ),
    bullets: [
      'Run browser sessions in regions close to your users or target sites to cut round-trip latency.',
      'Pin workloads to a geography for compliance while keeping the same API surface everywhere.',
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

const FEATURES_CAROUSEL_MQ = '(max-width: 768px)';
// 与 CSS padding-inline: 30px 同步；ul 是 offsetParent，card_i.offsetLeft = 30 + (i-1)*100vw
const CAROUSEL_GUTTER = 30;

export function Features() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [isCarousel, setIsCarousel] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(FEATURES_CAROUSEL_MQ).matches,
  );
  const [carouselIndex, setCarouselIndex] = useState(0);
  const featureListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const mq = window.matchMedia(FEATURES_CAROUSEL_MQ);
    const apply = () => setIsCarousel(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  const syncCarouselIndex = useCallback(() => {
    const el = featureListRef.current;
    if (!el || !isCarousel) return;
    const n = el.children.length;
    if (n === 0) return;
    let best = 0;
    let bestDist = Infinity;
    for (let i = 0; i < n; i++) {
      const child = el.children[i] as HTMLElement;
      const dist = Math.abs(el.scrollLeft - (child.offsetLeft - CAROUSEL_GUTTER));
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    }
    setCarouselIndex((prev) => (prev === best ? prev : best));
  }, [isCarousel]);

  const scrollCarouselTo = useCallback((index: number) => {
    const el = featureListRef.current;
    if (!el) return;
    const child = el.children[index] as HTMLElement | undefined;
    if (!child) return;
    el.scrollTo({ left: child.offsetLeft - CAROUSEL_GUTTER, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (!isCarousel) return;
    const el = featureListRef.current;
    if (!el) return;
    syncCarouselIndex();
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(syncCarouselIndex);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    const ro = new ResizeObserver(() => {
      syncCarouselIndex();
    });
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', onScroll);
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [isCarousel, syncCarouselIndex]);

  const onToggle = useCallback((id: string) => {
    setOpenId((cur) => (cur === id ? null : id));
  }, []);

  return (
    <section className="features" id="features">
      <div className="features__bleed" aria-hidden="true">
        <div className="features__bg-grid" />
      </div>
      <div className="container features__inner">
        <div className="features__bg" aria-hidden="true">
          <RubikCubeWrap />
        </div>
        <div className="features__main">
          <div className="features__header">
            <h2 className="features__title">FEATURES</h2>
          </div>
          <div className="features__list">
            <ul ref={featureListRef} className="feature-cards">
              {FEATURE_ITEMS.map((f) => {
                const active = openId === f.id;
                const expanded = isCarousel || active;
                return (
                  <li key={f.id} className={`feature-card${expanded ? ' feature-card--active' : ''}`} style={f.style}>
                    <button
                      type="button"
                      className="feature-card__toggle"
                      aria-expanded={expanded}
                      aria-controls={`feature-panel-${f.id}`}
                      id={`feature-label-${f.id}`}
                      tabIndex={isCarousel ? -1 : undefined}
                      onClick={() => {
                        if (!isCarousel) onToggle(f.id);
                      }}
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
                      className={`feature-card__panel${expanded ? ' feature-card__panel--open' : ''}`}
                      id={`feature-panel-${f.id}`}
                      role="region"
                      aria-labelledby={`feature-label-${f.id}`}
                      aria-hidden={!expanded}
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
            {isCarousel && (
              <div className="features__carousel-dots" role="tablist" aria-label="功能分页">
                {FEATURE_ITEMS.map((f, i) => (
                  <button
                    key={f.id}
                    type="button"
                    role="tab"
                    aria-selected={i === carouselIndex}
                    aria-label={`${f.title}，第 ${i + 1} 项，共 ${FEATURE_ITEMS.length} 项`}
                    className={`features__carousel-dot${i === carouselIndex ? ' features__carousel-dot--active' : ''}`}
                    onClick={() => scrollCarouselTo(i)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
