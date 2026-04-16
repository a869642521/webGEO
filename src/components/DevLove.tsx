import { DEV_LOVE_TWEETS } from '../data/devLoveTweets';

export function DevLove() {
  return (
    <section className="dev-love">
      <div className="container">
        <div className="dev-love__header">
          <h2>Developer love</h2>
        </div>
        <div className="tweets-grid">
          {DEV_LOVE_TWEETS.map((t) => (
            <div key={t.handle} className="tweet-card">
              <div className="tweet-card__header">
                <div className="tweet-avatar" style={{ background: t.bg }}>
                  {t.initials}
                </div>
                <div>
                  <div className="tweet-name">{t.name}</div>
                  <div className="tweet-handle">{t.handle}</div>
                </div>
              </div>
              <p className="tweet-text">{t.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
