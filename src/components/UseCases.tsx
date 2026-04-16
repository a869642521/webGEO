const CARDS = [
  { icon: '🤖', title: 'Build agents that never sleep', text: 'Send your agent to search, organize, and act on data while you do literally anything else.' },
  { icon: '🔓', title: 'Access the 85% APIs can\'t reach', text: 'Your agent logs in, navigates, and pulls data from any website, login walls included.' },
  { icon: '🔍', title: 'Catch broken flows early', text: 'Run agents that click through your product continuously and alert you the moment something breaks.' },
  { icon: '⚡', title: 'Research at scale', text: 'Spin up thousands of concurrent browser sessions and return answers immediately.' },
  { icon: '📋', title: 'Let agents fill in blanks', text: 'Job applications, vendor portals, government forms. Agents that act on the web, not just read it.' },
  { icon: '📊', title: 'Move data at agent speed', text: 'Upload files, trigger downloads, and process records across hundreds of sites in parallel.' },
];

export function UseCases() {
  return (
    <section className="use-cases">
      <div className="container">
        <div className="use-cases__header">
          <span className="section-label">Use cases</span>
          <h2>What will you build?</h2>
        </div>
        <div className="use-cases__grid">
          {CARDS.map((c) => (
            <div key={c.title} className="use-card">
              <div className="use-card__icon">{c.icon}</div>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
