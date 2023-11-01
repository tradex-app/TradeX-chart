import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import ThemeContextProvider from "../components/theme/ThemeContext";
import ColorsEnum from "../components/theme/colors";

import "../styles/global.css";

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
          <div style={{ display: 'flex', gap: '10px' }}>
            <Link href="/"
              style={{
                backgroundColor: ColorsEnum.BrandBlue,
                color: 'white',
                padding: '10px 20px',
                borderRadius: '12px',
                textDecoration: 'none'
              }}>
                Chart
            </Link>
            <Link href="/info"
           style={{
                backgroundColor: ColorsEnum.BrandBlue,
                color: 'white',
                padding: '10px 20px',
                borderRadius: '12px',
                textDecoration: 'none'
              }}>
                Info
            </Link>
            </div>
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
