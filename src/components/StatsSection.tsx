export function StatsSection() {
  return (
    <section className="stats-section">
      <div className="container stats__inner">
        <p className="stats__label">100% of the web at production scale.</p>
        <h2 className="stats__title">
          No obstacles for your agents.
          <br />
          No limits on what they can accomplish.
        </h2>
        <div className="stats__grid">
          <div className="stat-card">
            <div className="stat-card__num">36,925,870</div>
            <div className="stat-card__label">Unique Browser Sessions · March 2026</div>
          </div>
          <div className="stat-card">
            <div className="stat-card__num">800K</div>
            <div className="stat-card__label">Weekly SDK Downloads</div>
          </div>
          <div className="stat-card">
            <div className="stat-card__num">100K+</div>
            <div className="stat-card__label">Developers</div>
          </div>
          <div className="stat-card">
            <div className="stat-card__num">10,000</div>
            <div className="stat-card__label">Years Spent Browsing The Web</div>
          </div>
        </div>
      </div>
    </section>
  );
}
