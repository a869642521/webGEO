import { useState, type ReactNode } from 'react';

type TabId = 'agents' | 'workflow' | 'scraping';

const TABS: { id: TabId; label: string }[] = [
  { id: 'agents', label: 'Browser tool for agents' },
  { id: 'workflow', label: 'Workflow automation' },
  { id: 'scraping', label: 'Web scraping' },
];

interface TabData {
  bullets: ReactNode[];
  cases: string[];
}

const CONTENT: Record<TabId, TabData> = {
  agents: {
    bullets: [
      <><strong>Meet Stagehand</strong> — our open-source framework for building robust web agents.</>,
      'Real-time human-in-the-loop controls using our Live View feature for enhanced oversight and flexibility.',
      'Integrations with all major AI SDKs that work right out of the box.',
    ],
    cases: [
      'The breakthrough that allowed Coframe to revolutionize website optimization',
      'How Aomni built an AI-powered sales intelligence platform using Browserbase',
    ],
  },
  workflow: {
    bullets: [
      'Automate complex multi-step browser workflows with a single API call.',
      'Chain browser actions across multiple sites with built-in error recovery and retries.',
      'Schedule, monitor and replay workflows with full observability built in.',
    ],
    cases: [
      'How Ramp automates vendor portal interactions at scale',
      'Building reliable multi-step automations with Browserbase',
    ],
  },
  scraping: {
    bullets: [
      'Extract structured data from any website, including JavaScript-heavy SPAs and login-walled pages.',
      'Handle CAPTCHAs, rotating proxies and dynamic content with zero configuration.',
      'Scale to thousands of concurrent sessions and receive structured results immediately.',
    ],
    cases: [
      'How companies monitor prices across thousands of sites in real time',
      'Building a web intelligence pipeline with Browserbase at the core',
    ],
  },
};

function ExternalLinkIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function BrowserIllustration() {
  return (
    <svg viewBox="0 0 300 230" fill="none" xmlns="http://www.w3.org/2000/svg" className="slogan__illus-svg" aria-hidden="true">
      {/* Monitor body */}
      <rect x="38" y="14" width="210" height="156" rx="2" fill="#d8d8d8" />
      {/* Screen */}
      <rect x="48" y="24" width="190" height="112" fill="#eaecf0" />
      {/* Toolbar */}
      <rect x="48" y="24" width="190" height="22" fill="#dde0e6" />
      {/* Traffic lights */}
      <circle cx="62" cy="35" r="4" fill="#ff5f57" />
      <circle cx="76" cy="35" r="4" fill="#febc2e" />
      <circle cx="90" cy="35" r="4" fill="#28c840" />
      {/* URL bar */}
      <rect x="104" y="29" width="122" height="12" rx="6" fill="#fff" opacity="0.75" />
      {/* Content lines */}
      <rect x="56" y="58" width="156" height="7" rx="1" fill="#bcc4d0" />
      <rect x="56" y="72" width="116" height="7" rx="1" fill="#bcc4d0" />
      <rect x="56" y="86" width="136" height="7" rx="1" fill="#bcc4d0" />
      <rect x="56" y="100" width="96" height="7" rx="1" fill="#bcc4d0" />
      <rect x="56" y="114" width="126" height="7" rx="1" fill="#bcc4d0" />
      {/* Monitor stand stem */}
      <rect x="122" y="170" width="42" height="12" fill="#c4c4c4" />
      {/* Monitor stand base */}
      <rect x="106" y="181" width="74" height="6" rx="1" fill="#b4b4b4" />

      {/* Red isometric cube — overlapping monitor bottom-left */}
      {/* Top face */}
      <polygon points="34,153 60,140 86,153 60,166" fill="#ef4444" />
      {/* Left face */}
      <polygon points="34,153 60,166 60,192 34,179" fill="#b91c1c" />
      {/* Right face */}
      <polygon points="86,153 60,166 60,192 86,179" fill="#dc2626" />

      {/* Sparkle star top-left of cube */}
      <path d="M18 143 L21 135 L24 143 L32 146 L24 149 L21 157 L18 149 L10 146 Z" fill="#fbbf24" />
    </svg>
  );
}

export function SloganSection() {
  const [tab, setTab] = useState<TabId>('agents');
  const data = CONTENT[tab];

  return (
    <section className="slogan-section">
      <div className="container">
        <h2 className="slogan__title">
          Anything you do with a web browser,
          <br />
          you can do with Browserbase
        </h2>

        <div className="slogan__chrome">
          {/* Folder-tab bar */}
          <div className="slogan__tab-bar" role="tablist" aria-label="Feature categories">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={tab === t.id}
                aria-controls={`slogan-panel-${t.id}`}
                className={`slogan__tab-btn${tab === t.id ? ' slogan__tab-btn--active' : ''}`}
                onClick={() => setTab(t.id)}
              >
                <span className="slogan__tab-btn__body">{t.label}</span>
                <span className="slogan__tab-btn__tail" aria-hidden="true" />
              </button>
            ))}
          </div>

          {/* Content panel */}
          <div
            id={`slogan-panel-${tab}`}
            role="tabpanel"
            className="slogan__panel-wrap"
          >
            <div className="slogan__panel-body">
              {/* Left: illustration */}
              <div className="slogan__illus">
                <BrowserIllustration />
              </div>

              {/* Right: bullets + case study cards */}
              <div className="slogan__text-col">
                <ul className="slogan__bullets">
                  {data.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
                <div className="slogan__cases">
                  {data.cases.map((c) => (
                    <a key={c} href="#" className="case-card">
                      <span className="case-card__text">{c}</span>
                      <span className="case-card__icon">
                        <ExternalLinkIcon />
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
