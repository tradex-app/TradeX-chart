import Head from "next/head";
import Link from "next/link";

const TradeXChartPage = () => {
  return (
    <div className="container">
      <Head>
        <title>TradeX-chart Info</title>
      </Head>

      <h1 className="mt-5 mb-4">TradeX-chart</h1>
      <p className="lead">
        TradeX-chart is a highly customizable stock trade chart with one
        dependency written in plain JavaScript; use it with any framework or
        backend.
      </p>

      <section className="mb-4">
        <h2>Resources</h2>
        <ul>
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

      <section className="mb-4">
        <h2>Features</h2>
        <ul>
          {/* Add features list here */}
          <li>Plain JavaScript with no framework dependencies</li>
          <li>All chart features and functions accessible via API</li>
          <li>
            State object defines chart configuration, indicators and tools
          </li>
          <li>Custom themes</li>
          <li>Custom indicators</li>
          <li>High frequency chart candles updates</li>
          {/* ... more features */}
        </ul>
      </section>

      <section>
        <h2>Support & Contributing</h2>
        <p>
          For the latest news on TradeX-chart, feedback, feature requests, and
          community, join us over on{" "}
          <Link href="https://discord.com/">Discord</Link> or
          <Link href="https://github.com/tradex-app/TradeX-chart">GitHub</Link>.
        </p>
      </section>

      <style jsx>{`
        .container {
          font-family: Arial, sans-serif;
        }
        .lead {
          font-size: 1.25rem;
        }
      `}</style>
    </div>
  );
};

export default TradeXChartPage;
