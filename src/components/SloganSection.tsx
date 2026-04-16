import { useState } from 'react';

type TabId = 'tutorials' | 'access' | 'scraping';

export function SloganSection() {
  const [tab, setTab] = useState<TabId>('tutorials');

  return (
    <section className="slogan-section">
      <div className="container slogan__inner">
        <h2 className="slogan__title">
          Anything you do with a web browser,
          <br />
          <span className="slogan__highlight">you can do with Browserbase.</span>
        </h2>
        <div className="slogan__tabs">
          <button type="button" className={`tab-btn${tab === 'tutorials' ? ' tab-btn--active' : ''}`} onClick={() => setTab('tutorials')}>
            Browserbase tutorials
          </button>
          <button type="button" className={`tab-btn${tab === 'access' ? ' tab-btn--active' : ''}`} onClick={() => setTab('access')}>
            Web data access
          </button>
          <button type="button" className={`tab-btn${tab === 'scraping' ? ' tab-btn--active' : ''}`} onClick={() => setTab('scraping')}>
            Web scraping
          </button>
        </div>
        <div className="slogan__panels">
          <div className={`slogan__panel${tab === 'tutorials' ? ' active' : ''}`} data-panel="tutorials">
            <div className="panel__preview">
              <div className="browser-mock">
                <div className="browser-mock__bar">
                  <span className="code-dot red" />
                  <span className="code-dot yellow" />
                  <span className="code-dot green" />
                  <div className="browser-mock__url">browserbase.com/sessions</div>
                </div>
                <div className="browser-mock__content">
                  <div className="session-item">
                    <span className="session-status active" />
                    session_x82ja · running
                  </div>
                  <div className="session-item">
                    <span className="session-status active" />
                    session_9kqpz · running
                  </div>
                  <div className="session-item">
                    <span className="session-status done" />
                    session_m3nry · completed
                  </div>
                  <div className="session-item">
                    <span className="session-status done" />
                    session_7wxlq · completed
                  </div>
                </div>
              </div>
            </div>
            <div className="panel__text">
              <h3>Get your agent up &amp; running</h3>
              <ul>
                <li>Spin up browser sessions via API in seconds</li>
                <li>Connect to any AI model or framework</li>
                <li>Monitor sessions with live replay</li>
                <li>Scale from 1 to 10,000 sessions instantly</li>
              </ul>
              <a href="#" className="btn btn--primary">
                View tutorials →
              </a>
            </div>
          </div>
          <div className={`slogan__panel${tab === 'access' ? ' active' : ''}`} data-panel="access">
            <div className="panel__preview">
              <div className="browser-mock">
                <div className="browser-mock__bar">
                  <span className="code-dot red" />
                  <span className="code-dot yellow" />
                  <span className="code-dot green" />
                  <div className="browser-mock__url">api.browserbase.com/fetch</div>
                </div>
                <div className="browser-mock__content">
                  <div className="data-row">
                    <span className="data-key">title:</span> <span className="data-val">&quot;YC Top Stories&quot;</span>
                  </div>
                  <div className="data-row">
                    <span className="data-key">url:</span> <span className="data-val">&quot;news.ycombinator.com&quot;</span>
                  </div>
                  <div className="data-row">
                    <span className="data-key">items:</span> <span className="data-val">[30 results]</span>
                  </div>
                  <div className="data-row">
                    <span className="data-key">format:</span> <span className="data-val">&quot;markdown&quot;</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="panel__text">
              <h3>Access 85% of the web APIs can&apos;t reach</h3>
              <ul>
                <li>Bypass login walls and dynamic content</li>
                <li>Convert any page to clean markdown</li>
                <li>Handle JavaScript-heavy pages</li>
                <li>Extract structured data at scale</li>
              </ul>
              <a href="#" className="btn btn--primary">
                View docs →
              </a>
            </div>
          </div>
          <div className={`slogan__panel${tab === 'scraping' ? ' active' : ''}`} data-panel="scraping">
            <div className="panel__preview">
              <div className="browser-mock">
                <div className="browser-mock__bar">
                  <span className="code-dot red" />
                  <span className="code-dot yellow" />
                  <span className="code-dot green" />
                  <div className="browser-mock__url">dashboard · live scrape</div>
                </div>
                <div className="browser-mock__content">
                  <div className="scrape-row">
                    <span className="scrape-icon">↓</span> amazon.com · 1,240 prices
                  </div>
                  <div className="scrape-row">
                    <span className="scrape-icon">↓</span> linkedin.com · 890 profiles
                  </div>
                  <div className="scrape-row">
                    <span className="scrape-icon">↓</span> indeed.com · 3,420 jobs
                  </div>
                  <div className="scrape-row">
                    <span className="scrape-icon spin">↻</span> g2.com · in progress…
                  </div>
                </div>
              </div>
            </div>
            <div className="panel__text">
              <h3>Watch the whole web at once</h3>
              <ul>
                <li>Track prices, job listings, competitor moves</li>
                <li>Thousands of concurrent sessions</li>
                <li>Residential proxies built-in</li>
                <li>Auto-retry on CAPTCHA and blocks</li>
              </ul>
              <a href="#" className="btn btn--primary">
                View examples →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
