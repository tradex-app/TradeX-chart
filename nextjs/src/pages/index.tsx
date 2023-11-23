import styles from "../styles/Home.module.css";
import dynamic from "next/dynamic";
import { sampleOHLCV, tradeData } from "../components/tradeX/15min_btc";
import { CHART_OPTIONS } from "../components/tradeX/utils";
import useTheme from "../components/hooks/useTheme";
import { IConfig } from "../components/tradeX/utils/types";
import DCA from "../components/tradeX/overlays/dca";

const TokenChart = dynamic(() => import("../components/tradeX/Wrapper"), {
  ssr: false,
});

export const chartConfig: IConfig = {
  toolbar: {
    timeframe: true,
    indicators: false,
    range: true,
    typeSelector: true,
    fullscreenButton: true,
  },
  defaults: {
    paddingCandles: null,
    chartType: CHART_OPTIONS[0],
    timeframe: "1h",
    ranges: ["1d", "1w", "15d", "1M", "1Y"],
    availableIndicators: ["BB", "EMA"],
    preloadIndicators: [],
    availableOverlays: ["DCA"],
    preloadOverlays: [
      {
        DCA: {
          class: DCA,
          location: "chartPane",
        },
      },
    ],
  },
  indicatorData: {
    level: null,
    ranges: null,
  },
  trades: {
    display: false,
    displayInfo: false,
  },
} as IConfig;

export default function Home() {
  const { isLightTheme, theme, switchTheme } = useTheme();
  const handleSwitch = () => {
    const swap = isLightTheme ? "dark" : "light";
    localStorage.setItem("theme", swap);
    switchTheme();
  };

  return (
    <>
      <div className={`${styles.grid} ${styles["full-size"]} ${theme}`}>
        <TokenChart
          symbol={"BTC"}
          config={chartConfig}
          chartData={sampleOHLCV}
          tradeData={tradeData}
        />
      </div>
      <div className={styles.themeSwitch}>
        <button onClick={handleSwitch}>{!isLightTheme ? "🌞" : "🌙"}</button>
      </div>
    </>
  );
}
