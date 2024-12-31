import Link from 'next/link';

export const Info = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <p className="text-lg font-semibold">
        TradeX-chart is a highly customizable stock trade chart with one
        dependency written in plain JavaScript; use it with any framework or
        backend.
      </p>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Resources</h2>
        <ul className="list-disc list-inside">
          <li>
            <Link href="https://github.com/tradex-app/TradeX-chart">
              GitHub Repository
            </Link>
          </li>
          <li>
            <Link href="https://tradex-app.github.io/TradeX-chart/reference/">
              Documentation
            </Link>
          </li>
          <li>
            <Link href="https://www.npmjs.com/package/tradex-chart">
              NPM Package
            </Link>
          </li>
          <li>
            <Link href="https://tradex-chart.guildmedia.net/">Demo</Link>
          </li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Features</h2>
        <ul className="list-disc list-inside">
          <li>Plain JavaScript with no framework dependencies</li>
          <li>All chart features and functions accessible via API</li>
          <li>
            State object defines chart configuration, indicators and tools
          </li>
          <li>Custom themes</li>
          <li>Custom indicators</li>
          <li>High frequency chart candles updates</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Support & Contributing</h2>
        <p>
          For the latest news on TradeX-chart, feedback, feature requests, and
          community, join us over on{' '}
          <Link href="https://discord.gg/6XS9tDrcdq">Discord</Link> or
          <Link href="https://github.com/tradex-app/TradeX-chart">GitHub</Link>.
        </p>
      </section>
    </div>
  );
};
