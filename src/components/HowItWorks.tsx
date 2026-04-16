export function HowItWorks() {
  return (
    <section className="how-it-works" id="how">
      <div className="container">
        <div className="hiw__header">
          <span className="section-label">How it works</span>
          <h2>Zero setup. Real results.</h2>
          <p>Spin up a browser, connect your model, and execute your first task in minutes.</p>
        </div>
        <div className="hiw__steps">
          <div className="hiw__step">
            <div className="step-number">01</div>
            <div className="step-content">
              <h3>Create a browser session</h3>
              <p>Spin up a browser instance, configure your environment, and prepare it to run tasks across the web.</p>
            </div>
            <div className="step-code">
              <div className="code-block">
                <div className="code-block__header">
                  <span className="code-dot red" />
                  <span className="code-dot yellow" />
                  <span className="code-dot green" />
                  <span className="code-block__title">session.ts</span>
                </div>
                <pre>
                  <code>
                    <span className="c-purple">import</span> <span className="c-white">Browserbase</span>{' '}
                    <span className="c-purple">from</span> <span className="c-green">&quot;@browserbasehq/sdk&quot;</span>
                    <span className="c-white">;</span>
                    {'\n\n'}
                    <span className="c-blue">const</span> <span className="c-white">bb</span> <span className="c-purple">=</span>{' '}
                    <span className="c-blue">new</span> <span className="c-yellow">Browserbase</span>
                    <span className="c-white">(</span>
                    <span className="c-white">{'{'}</span>
                    {'\n  '}
                    <span className="c-white">apiKey:</span> <span className="c-white">process.env.</span>
                    <span className="c-orange">BROWSERBASE_API_KEY</span>
                    <span className="c-white">,</span>
                    {'\n'}
                    <span className="c-white">{'}'});</span>
                    {'\n\n'}
                    <span className="c-blue">const</span> <span className="c-white">session</span> <span className="c-purple">=</span>{' '}
                    <span className="c-purple">await</span> <span className="c-white">bb.sessions.</span>
                    <span className="c-yellow">create</span>
                    <span className="c-white">(</span>
                    <span className="c-white">{'{'}</span>
                    {'\n  '}
                    <span className="c-white">projectId:</span> <span className="c-white">process.env.</span>
                    <span className="c-orange">BROWSERBASE_PROJECT_ID</span>
                    <span className="c-white">,</span>
                    {'\n'}
                    <span className="c-white">{'}'});</span>
                  </code>
                </pre>
              </div>
            </div>
          </div>

          <div className="hiw__step">
            <div className="step-number">02</div>
            <div className="step-content">
              <h3>Choose your model</h3>
              <p>Connect AI to the browser session so it can interpret pages, make decisions, and drive interactions autonomously.</p>
            </div>
            <div className="step-code">
              <div className="code-block">
                <div className="code-block__header">
                  <span className="code-dot red" />
                  <span className="code-dot yellow" />
                  <span className="code-dot green" />
                  <span className="code-block__title">agent.ts</span>
                </div>
                <pre>
                  <code>
                    <span className="c-blue">const</span> <span className="c-white">stagehand</span> <span className="c-purple">=</span>{' '}
                    <span className="c-blue">new</span> <span className="c-yellow">Stagehand</span>
                    <span className="c-white">(</span>
                    <span className="c-white">{'{'}</span>
                    {'\n  '}
                    <span className="c-white">sessionId:</span> <span className="c-white">session.id,</span>
                    {'\n  '}
                    <span className="c-white">modelName:</span> <span className="c-green">&quot;gpt-4o&quot;</span>
                    <span className="c-white">,</span>
                    {'\n  '}
                    <span className="c-white">modelClientOptions:</span> <span className="c-white">{'{'}</span>
                    {'\n    '}
                    <span className="c-white">apiKey:</span> <span className="c-white">process.env.</span>
                    <span className="c-orange">OPENAI_API_KEY</span>
                    <span className="c-white">,</span>
                    {'\n  '}
                    <span className="c-white">{'}'},</span>
                    {'\n'}
                    <span className="c-white">{'}'});</span>
                    {'\n'}
                    <span className="c-purple">await</span> <span className="c-white">stagehand.</span>
                    <span className="c-yellow">init</span>
                    <span className="c-white">();</span>
                  </code>
                </pre>
              </div>
            </div>
          </div>

          <div className="hiw__step">
            <div className="step-number">03</div>
            <div className="step-content">
              <h3>Execute your first task</h3>
              <p>Run your first workflow end-to-end, from navigation to action, and see results directly in the browser.</p>
            </div>
            <div className="step-code">
              <div className="code-block">
                <div className="code-block__header">
                  <span className="code-dot red" />
                  <span className="code-dot yellow" />
                  <span className="code-dot green" />
                  <span className="code-block__title">task.ts</span>
                </div>
                <pre>
                  <code>
                    <span className="c-purple">await</span> <span className="c-white">stagehand.page.</span>
                    <span className="c-yellow">goto</span>
                    <span className="c-white">(</span>
                    {'\n  '}
                    <span className="c-green">&quot;https://news.ycombinator.com&quot;</span>
                    {'\n'}
                    <span className="c-white">);</span>
                    {'\n\n'}
                    <span className="c-blue">const</span> <span className="c-white">results</span> <span className="c-purple">=</span>{' '}
                    <span className="c-purple">await</span> <span className="c-white">stagehand.page.</span>
                    <span className="c-yellow">extract</span>
                    <span className="c-white">(</span>
                    <span className="c-white">{'{'}</span>
                    {'\n  '}
                    <span className="c-white">instruction:</span> <span className="c-green">&quot;Get the top 5 stories&quot;</span>
                    <span className="c-white">,</span>
                    {'\n'}
                    <span className="c-white">{'}'});</span>
                    {'\n\n'}
                    <span className="c-white">console.</span>
                    <span className="c-yellow">log</span>
                    <span className="c-white">(results);</span>
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
