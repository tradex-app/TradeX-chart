'use client';
import { FC, useEffect } from 'react';
import config from './utils/config';
import { useTheme } from 'next-themes';
import { IProps, ITradeX } from 'tradex-chart';
import ColorsEnum from '../theme/colors';

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
  chartAccessor = 'tradexChartContainer',
  customIndicators,
  onRangeChange,
  // chart instantiation
  chartX,
  setChart
}) => {
  const { theme } = useTheme();

  const registerIndicators = (chart: ITradeX) => {
    if (chart.setIndicators && customIndicators) {
      chart.setIndicators(customIndicators);
    } else {
      console.error(
        'chart.setIndicators is undefined or customIndicators is not provided'
      );
    }
  };

  const registerRangeChangeEvent = (chart: ITradeX) => {
    if (!chart || typeof chart.on !== 'function') {
      console.warn(
        'Chart object is either undefined or missing the on method.'
      );
      return;
    }
    chart.on('setRange', (e) => {
      if (!e) return;

      if (e[0] <= 0 && onRangeChange) {
        onRangeChange();
      }
    });
  };

  const renderChart = async () => {
    try {
      const existingChart = document.querySelector(
        `#${chartAccessor} tradex-chart`
      );
      if (existingChart) {
        existingChart.remove();
      }

      const combinedPrimary = tradeData ? [...onchart, ...tradeData] : onchart;

      const mount = document.querySelector(`#${chartAccessor}`);
      const chart: ITradeX = document.createElement('tradex-chart');
      if (!mount) return;
      mount.appendChild(chart);
      const state: {
        ohlcv: number[][];
        trades: any;
        primary?: { name: string; type: string; data: number[] }[];
      } = {
        ohlcv: data,
        primary: combinedPrimary,
        trades: tradeData
      };

      if (onRangeChange) {
        registerRangeChangeEvent(chart);
      }
      const isLightTheme = theme === 'light';

      if (typeof chart.start === 'function') {
        chart.start({
          ...config({
            title,
            symbol: title,
            type: chartType?.value || 'area',
            rangeLimit,
            isLightTheme
          }),
          state
        });
      } else {
        console.error('chart.start is undefined');
      }

      if (customIndicators) {
        registerIndicators(chart);
      }

      setChart(chart);
    } catch (err) {
      console.error(`Failed to render chart: ${title}`, err);
    }
  };

  useEffect(() => {
    if (!chartX) return;

    if (theme === 'light') {
      chartX.theme?.setProperty('chart.GridColour', ColorsEnum.SelectorLight);
      return;
    }

    chartX.theme?.setProperty('chart.GridColour', ColorsEnum.Selector);
  }, [chartX, theme]);

  useEffect(() => {
    renderChart();
  }, []);

  useEffect(() => {
    if (!chartX) return;

    chartX.theme?.setProperty('candle.Type', chartType?.value);
  }, [chartType, chartX]);

  return (
    <div className="flex flex-col gap-4 p-4 h-full">
      <div id={chartAccessor} className="w-full flex justify-center h-full" />
    </div>
  );
};

export default Chart;
