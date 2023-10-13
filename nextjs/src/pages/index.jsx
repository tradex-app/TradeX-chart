import Head from "next/head";
import styles from "../styles/Home.module.css";
import dynamic from "next/dynamic";
import { sampleOHLCV, tradeData } from "../components/tradeX/15min_btc";
import { CHART_OPTIONS } from "../components/tradeX/utils";
import ThemeContextProvider from "../components/theme/ThemeContext";
import useTheme from '../components/hooks/useTheme';

const TokenChart = dynamic(() => import("../components/tradeX/Wrapper"), {
  ssr: false,
});


const chartConfig = {
  toolbar: {
  timeframe: true,
  indicators: true,
  typeSelector: true,
  fullscreenButton: true,
},
generalTokenChart: true,
defaults: {
  timeframe: "1h",
  chartType: CHART_OPTIONS[0],
}
};

export default function Home() {
  const { isLightTheme, theme, switchTheme } = useTheme();
  const handleSwitch = () => {
    const swap = isLightTheme ? "dark" : "light";
    localStorage.setItem("theme", swap );
    switchTheme();
  }

  return (
  <ThemeContextProvider>
    <div className={styles.container}>
      <Head>
        <title>Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>Trade-X on Next.js!</h1>
        <div id="badges">
          <a href="https://www.npmjs.com/package/tradex-chart" title="Version">
            <img src="https://badgen.net/npm/v/tradex-chart" alt="Version" />
          </a>
          <a href="https://bundlephobia.com/result?p=tradex-chart" title="Size">
            <img
              src="https://badgen.net/bundlephobia/minzip/tradex-chart"
              alt="Size"
            />
          </a>
          <a
            href="https://github.com/tradex-app/TradeX-chart/blob/master/LICENSE"
            title="License"
          >
            <img
              src="https://badgen.net/github/license/tradex-app/tradex-chart"
              alt="License"
            />
          </a>
          <a href="https://github.com/tradex-app/TradeX-chart" title="GitHub">
            <img
              src="https://badgen.net/badge/icon/github?icon=github&label"
              alt="GitHub"
            />
          </a>
          <a href="https://www.npmjs.com/package/tradex-chart" title="NPM">
            <img
              src="https://badgen.net/badge/icon/npm?icon=npm&label"
              alt="NPM"
            />
          </a>
        </div>
        <div className={styles.grid}>
          <TokenChart
            symbol={"BTC"}
            config={chartConfig}
            chartData={sampleOHLCV}
            tradeData={tradeData}
          />
        </div>
        <div className={styles.themeSwitch}>
          <button onClick={handleSwitch}>
            {!isLightTheme ? "🌞" : "🌙"}
          </button>
        </div>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel" className={theme === 'dark' ? styles.invertedLogo : styles.logo} />
        </a>
      </footer>

      <style jsx>{`
        main {
          width: 100%;
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
      <script type="module" src="../index.js"></script>
    </div>
    </ThemeContextProvider>
  );
}
