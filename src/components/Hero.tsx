import { RubikCubeWrap } from './RubikCubeWrap';

const LOGOS = [
  { domain: 'notion.so', name: 'Notion' },
  { domain: 'microsoft.com', name: 'Microsoft' },
  { domain: 'clay.com', name: 'clay' },
  { domain: 'daydream.com', name: 'daydream' },
  { domain: 'code.visualstudio.com', name: 'VSCode' },
  { domain: 'zapier.com', name: 'Zapier' },
  { domain: 'linear.app', name: 'Linear' },
  { domain: 'stripe.com', name: 'Stripe' },
];

export function Hero() {
  return (
    <section className="hero">
      <div className="container hero__inner">
        <div className="hero__announce" role="note">
          <span className="hero__announce-mark" aria-hidden="true">
            B
          </span>
          <span className="hero__announce-x" aria-hidden="true">
            ×
          </span>
          <span className="hero__announce-cat">new</span>
          <span className="hero__announce-copy">
            <span className="hero__announce-copy__full">
              Introducing our Search API: Web search, built for agents
            </span>
            <span className="hero__announce-copy__short">Introducing our Search API</span>
          </span>
          <span className="hero__announce-arrow" aria-hidden="true">
            &gt;
          </span>
        </div>

        <RubikCubeWrap />

        <div className="hero__copy">
          <h1 className="hero__title">
            <span className="hero__title-part">We help AI</span>
            <span className="hero__title-part">use the web.</span>
          </h1>
          <p className="hero__sub">
            Autonomously read, write, and perform tasks on the web with a headless browser.
          </p>
          <div className="hero__cta">
            <a href="#" className="btn btn--primary btn--lg">
              Try for free
            </a>
            <a href="#" className="btn btn--outline-dark btn--lg">
              Get a demo
            </a>
          </div>
          <p className="hero__note">No credit card required.</p>
        </div>

        <div className="logo-wall">
          <p className="logo-wall__label">Trusted by AI-first companies worldwide</p>
          <div className="logo-wall__logos">
            {LOGOS.map(({ domain, name }) => (
              <div key={domain} className="logo-pill">
                <img
                  className="logo-pill__icon"
                  src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
                  alt=""
                  width={22}
                  height={22}
                  loading="lazy"
                  decoding="async"
                />
                <span className="logo-pill__name">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
