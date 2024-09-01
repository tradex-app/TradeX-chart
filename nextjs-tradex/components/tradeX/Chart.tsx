'use client';
import { FC, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { IConfig, IIndicators, ITradeX, ThemeProps } from '../../../types'; // import from 'tradex-chart';
import ColorsEnum from '../theme/colors';
import { IChartOption, IIndicatorToolbar } from './utils/types';
//import { Chart } from '../../../src'; // import 'tradex-chart';

export interface IProps {
  config: IConfig;
  displayTitle: string;
  data: number[][];
  tradeData?: any;
  chartType?: IChartOption;
  rangeLimit?: number;
  onchart: IIndicatorToolbar[];
  chartAccessor?: string;
  customIndicators?: IIndicators;
  chartX: ITradeX;
  setChart: (chart: ITradeX) => void;
}

const Chart: FC<IProps> = ({
  config,
  // visual
  displayTitle,
  chartType,
  rangeLimit = 96,
  // data
  data,
  onchart = [],
  tradeData,
  // config
  chartAccessor = 'tradexChartContainer',
  customIndicators,
  // chart instantiation
  chartX,
  setChart
}) => {
  const { theme } = useTheme();

  const registerIndicators = (chart: ITradeX) => {
    if (chart.setIndicators && customIndicators) {
      chart.setIndicators(customIndicators);
      console.log('Custom indicators registered:', customIndicators);
    } else {
      console.error(
        'chart.setIndicators is undefined or customIndicators is not provided'
      );
    }
  };

  const renderChart = () => {
    try {
      const existingChart = document.querySelector(
        `#${chartAccessor} tradex-chart`
      ) as ITradeX;

      if (existingChart) {
        console.log('Existing chart found. Setting reference.');
        // existingChart.remove();
        setChart(existingChart);
        return;
      }

      const combinedPrimary = tradeData ? [...onchart, ...tradeData] : onchart;

      const mount = document.querySelector(`#${chartAccessor}`);
      const chart = document.createElement('tradex-chart') as ITradeX;
      if (!mount) {
        console.warn('Mount point not found.');
        return;
      }
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

      console.log('State prepared:', state);

      const isLightTheme = theme === 'light';

      if (typeof chart.start === 'function') {
        chart.start({
          ...config,
          title: displayTitle,
          symbol: displayTitle,
          type: chartType,
          rangeLimit,
          isLightTheme,
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
      console.error(`Failed to render chart: ${displayTitle}`, err);
    }
  };

  useEffect(() => {
    if (!chartX) return;
    if (theme === 'light') {
      chartX.theme?.setProperty(
        ThemeProps.ChartGridColour,
        ColorsEnum.SelectorLight
      );
      return;
    }
    chartX.theme?.setProperty(ThemeProps.ChartGridColour, ColorsEnum.Selector);
  }, [chartX, theme]);

  useEffect(() => {
    if (!chartX) return;
    chartX.theme?.setProperty(ThemeProps.CandleType, chartType?.value);
  }, [chartType, chartX]);

  useEffect(() => {
    renderChart();
  }, []);

  return (
    <div className="w-full h-full">
      <div id={chartAccessor} className="h-full" />
    </div>
  );
};

export default Chart;
