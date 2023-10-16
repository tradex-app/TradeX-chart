import Head from "next/head";
import styles from "../styles/Home.module.css";
import dynamic from "next/dynamic";
import { sampleOHLCV, tradeData } from "../components/tradeX/15min_btc";
import { CHART_OPTIONS } from "../components/tradeX/utils";
import ThemeContextProvider from "../components/theme/ThemeContext";
import useTheme from "../components/hooks/useTheme";

import "../styles/global.css";

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
  },
};

export default function Home({ Component }) {
  return (
    <ThemeContextProvider>
      <>
        <Head>
          <title>Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <header className="toolbar">
          <h1 className={styles.title}>Trade-X on Next.js!</h1>
          <div id="badges">
            <a
              href="https://www.npmjs.com/package/tradex-chart"
              title="Version"
            >
              <img src="https://badgen.net/npm/v/tradex-chart" alt="Version" />
            </a>
            <a
              href="https://bundlephobia.com/result?p=tradex-chart"
              title="Size"
            >
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
        </header>

        <main className={"full-size main"}>
          <Component />
        </main>

        <script type="module" src="../index.js"></script>
      </>
    </ThemeContextProvider>
  );
}
