import { FC, useEffect } from "react";

import config from "./utils/config";
import { ColorsEnum, THEMES } from "../theme";

import { ChartType, ICustomIndicators, ITradeX } from "./utils/types";
import useTheme from "../hooks/useTheme";

interface IProps {
  title: string;
  data: number[][];
  tradeData?: any;
  chartType?: { value: ChartType };
  rangeLimit?: number;
  onchart: { name: string; value: string; data?: number[] }[];
  chartAccessor?: string;
  customIndicators?: ICustomIndicators;
  chartX: ITradeX;
  setChart: (chart: ITradeX) => void;
  onRangeChange?: () => void;
}

let isInitiated = 0;

const Chart: FC<IProps> = ({
  // visual
  title,
  chartType = null,
  rangeLimit = 96,
  // data
  data,
  onchart = [],
  tradeData,
  // config
  chartAccessor = "tradexChartContainer",
  customIndicators,
  onRangeChange,
  // chart instantiation
  chartX,
  setChart,
}) => {
  const { theme, isLightTheme } = useTheme();

  const registerIndicators = (chart: ITradeX) => {
    chart.setIndicators(customIndicators);
  };

  const registerRangeChangeEvent = (chart: ITradeX) => {
    chart.on("setRange", (e) => {
      if (!isInitiated) {
        isInitiated++;
        return;
      }

      if (e[0] <= 0) {
        onRangeChange();
      }
    });
  };

  const renderChart = async () => {
    try {
      if (document.querySelector(`#${chartAccessor} tradex-chart`)) {
        document.querySelector(`#${chartAccessor} tradex-chart`).remove();
      }

      const combinedPrimary = tradeData
        ? onchart
            .map((indicator) => ({
              name: indicator.name,
              type: indicator.value,
              data: indicator.data || [],
            }))
            .concat(tradeData)
        : onchart.map((indicator) => ({
            name: indicator.name,
            type: indicator.value,
            data: indicator.data || [],
          }));

      const mount = document.querySelector(`#${chartAccessor}`);
      const chart: ITradeX = document.createElement("tradex-chart");
      mount.appendChild(chart);
      console.log(tradeData);
      const state: {
        ohlcv: number[][];
        trades: any;
        primary?: { name: string; type: string; data: number[] }[];
      } = {
        ohlcv: data,
        primary: combinedPrimary,
        trades: tradeData,
      };

      if (onRangeChange) {
        registerRangeChangeEvent(chart);
      }

      chart.start({
        ...config({
          title,
          symbol: title,
          type: chartType?.value || "area",
          rangeLimit,
          isLightTheme,
        }),
        state,
      });

      if (customIndicators) {
        registerIndicators(chart);
      }

      setChart(chart);
    } catch (err) {
      console.log(title, err);
    }
  };

  useEffect(() => {
    if (!chartX) return;

    if (theme === THEMES.LIGHT) {
      chartX.theme.setProperty("chart.GridColour", ColorsEnum.SelectorLight);
      return;
    }

    chartX.theme.setProperty("chart.GridColour", ColorsEnum.Selector);
  }, [theme]);

  useEffect(() => {
    isInitiated = 0;

    renderChart();
  }, []);

  useEffect(() => {
    if (!chartX) return;

    chartX.theme.setProperty("candle.Type", chartType?.value);
  }, [chartType]);

  return (
    <div className="flex flex-col gap-4 p-4 h-full">
      <div id={chartAccessor} className="w-full flex justify-center h-full" />
    </div>
  );
};

export default Chart;
