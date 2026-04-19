import hiwStepBg from '../assets/hiw-step-bg.png';

export function HowItWorks() {
  return (
    <section className="how-it-works" id="how">
      <div className="container">
        <div className="hiw__header">
          <h2 className="hiw__title">Zero setup. Real results.</h2>
          <p className="hiw__lead">Spin up a browser, connect your model, and execute your first task in minutes.</p>
        </div>
        <div className="hiw__steps">
          <div className="hiw__step" aria-hidden="true">
            <img className="hiw__step-img" src={hiwStepBg} alt="" loading="lazy" decoding="async" />
          </div>
        </div>
      </div>
    </section>
  );
}
