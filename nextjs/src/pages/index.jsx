import styles from "../styles/Home.module.css";
import dynamic from "next/dynamic";
import { sampleOHLCV, tradeData } from "../components/tradeX/15min_btc";
import { CHART_OPTIONS } from "../components/tradeX/utils";
import useTheme from "../components/hooks/useTheme";

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

export default function Home() {
  const { isLightTheme, theme, switchTheme } = useTheme();
  const handleSwitch = () => {
    const swap = isLightTheme ? "dark" : "light";
    localStorage.setItem("theme", swap);
    switchTheme();
  };

  return (
    <>
      <div className={`${styles.grid} ${styles["full-size"]}`}>
        <TokenChart
          symbol={"BTC"}
          config={chartConfig}
          chartData={sampleOHLCV}
          tradeData={tradeData}
        />
      </div>
      <div className={styles.themeSwitch}>
        {/* <button onClick={handleSwitch}>{!isLightTheme ? "🌞" : "🌙"}</button> */}
      </div>
    </>
  );
}
