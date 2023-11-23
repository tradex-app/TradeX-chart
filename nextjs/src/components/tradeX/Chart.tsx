import { FC, useEffect } from "react";

import config from "./utils/config";
import { ChartType, IIndicators, IOverlay, ITradeX } from "./utils/types";
import useTheme from "../hooks/useTheme";
import { ColorsEnum, THEMES } from "../theme";

interface IProps {
  title: string;
  data: number[][];
  paddingTS?: number;
  markers?: any;
  chartType?: { value: ChartType };
  rangeLimit?: number;
  onchart: { name: string; value: string; data?: number[] }[];
  chartAccessor?: string;
  indicatorsList?: IIndicators;
  overlaysList?: IOverlay[];
  chartX: ITradeX;
  setChart: (chart: ITradeX) => void;
  onRangeChange?: () => void;
}

const Chart: FC<IProps> = ({
  title,
  paddingTS,
  chartType = null,
  rangeLimit = 96,
  data,
  onchart = [],
  markers,
  chartAccessor = "tradexChartContainer",
  indicatorsList,
  overlaysList,
  onRangeChange,
  chartX,
  setChart,
}) => {
  const { theme, isLightTheme } = useTheme();

  const registerIndicators = (chart: ITradeX) => {
    if (indicatorsList) {
      console.log("REGISTERED INDICATORS LIST", indicatorsList);
      chart.setIndicators(indicatorsList);
    }
  };

  const registerOverlays = (chart: ITradeX) => {
    if (overlaysList) {
      console.log("REGISTERED OVERLAYS LIST", overlaysList);
      chart.setCustomOverlays(overlaysList);
    }
  };

  const registerRangeChangeEvent = (chart: ITradeX) => {
    if (!chart || typeof chart.on !== "function") {
      console.warn(
        "Chart object is either undefined or missing the on method."
      );
      return;
    }
    chart.on("setRange", (e) => {
      if (!e) return;

      if (e[0] <= 0 && onRangeChange) {
        onRangeChange();
      }
    });
  };

  const renderChart = async () => {
    try {
      const existingChartElement = document.querySelector(
        `#${chartAccessor} tradex-chart`
      );
      if (existingChartElement) {
        existingChartElement.remove();
      }

      const combinedPrimary = markers ? [...onchart, ...markers] : onchart;

      const mount = document.querySelector(`#${chartAccessor}`);
      const chart: ITradeX = document.createElement("tradex-chart");

      if (mount) {
        mount.appendChild(chart);
      }

      const state = {
        ohlcv: data,
        primary: combinedPrimary,
      };

      if (onRangeChange) {
        registerRangeChangeEvent(chart);
      }

      if (typeof chart.start === "function") {
        chart.start({
          ...config({
            title,
            symbol: title,
            type: chartType?.value || "area",
            rangeLimit,
            isLightTheme,
            // paddingTS,
          }),
          state,
        });
      }

      if (indicatorsList) {
        registerIndicators(chart);
      }
      if (overlaysList) {
        registerOverlays(chart);
      }

      setChart(chart);
    } catch (err) {
      console.error(`Failed to render chart: ${title}`, err);
    }
  };

  useEffect(() => {
    if (!chartX) return;

    if (theme === THEMES.LIGHT) {
      chartX.theme.setProperty("chart.GridColour", ColorsEnum.SelectorLight);
      return;
    }
  }, [theme]);

  useEffect(() => {
    renderChart();
  }, []);

  useEffect(() => {
    if (chartX && chartType) {
      chartX.theme.setProperty("candle.Type", chartType.value);
    }
  }, [chartType]);

  useEffect(() => {
    if (chartX) {
      chartX.setTitle(title);
    }
  }, [title]);

  return (
    <div className="flex flex-col gap-4 pt-4 h-full">
      <div id={chartAccessor} className="w-full flex justify-center h-full" />
    </div>
  );
};

export default Chart;
