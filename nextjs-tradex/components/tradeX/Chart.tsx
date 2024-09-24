'use client';
import { FC, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import { IConfig, IIndicators, ITradeX, ThemeProps } from '../../../types'; // import from 'tradex-chart';
import ColorsEnum from '../theme/colors';
import { IChartOption, IIndicatorToolbar } from './utils/types';
import { useChartContext } from './provider/ChartProvider';

export interface IProps {
  config: IConfig;
  displayTitle: string;
  interval: string;
  initialData?: number[][];
  tradeData?: any;
  chartType?: IChartOption;
  rangeLimit?: number;
  onchart?: IIndicatorToolbar[];
  chartAccessor?: string;
  customIndicators?: IIndicators;
  onRangeChange?: () => void;
}

const TXChart: FC<IProps> = ({
  config,
  // visual
  displayTitle,
  chartType,
  // data
  interval,
  initialData = [],
  onchart = [],
  tradeData,
  // config
  chartAccessor = 'tradexChartContainer',
  customIndicators,
  onRangeChange
}) => {
  const { theme } = useTheme();
  const isChartLoadedRef = useRef(false);
  const { chartX, setChartX } = useChartContext();

  // Register custom indicators to the chart
  const registerIndicators = (chart: ITradeX) => {
    if (chart?.setIndicators && customIndicators) {
      chart.setIndicators(customIndicators);
      console.log('Custom indicators registered:', customIndicators);
    } else {
      console.error(
        'chart.setIndicators is undefined or customIndicators is not provided'
      );
    }
  };

  // Register event listener for range change, not being used, can lead to slowness
  const registerRangeChangeEvent = (chart: ITradeX) => {
    if (!chart || typeof chart.on !== 'function') {
      console.warn(
        'Chart object is either undefined or missing the on method.'
      );
      return;
    }
    chart.on('setRange', (e: any) => {
      if (!e || e.length === 0) return;
      if (e[0] <= 0 && onRangeChange) {
        onRangeChange();
      }
    });
  };

  const renderChart = () => {
    if (isChartLoadedRef.current) return;

    try {
      const existingChart = document.querySelector(
        `#${chartAccessor} tradex-chart`
      ) as ITradeX;

      if (existingChart) return;

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
        ohlcv: initialData,
        primary: combinedPrimary,
        trades: tradeData
      };

      if (onRangeChange) {
        registerRangeChangeEvent(chart);
      }
      const isLightTheme = theme === 'light';

      if (typeof chart.start === 'function') {
        chart.start({
          ...config,
          id: displayTitle + '-' + interval,
          title: displayTitle,
          symbol: displayTitle,
          timeFrame: interval,
          type: chartType,
          isLightTheme,
          state
        });
      } else {
        console.error('chart.start is undefined');
      }

      if (Object.keys(customIndicators || {}).length !== 0) {
        registerIndicators(chart);
      }
      isChartLoadedRef.current = true;
      setChartX(chart);
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
    renderChart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!chartX) return;

    chartX.theme?.setProperty(ThemeProps.CandleType, chartType?.value);
  }, [chartType, chartX]);

  return (
    <div className="w-full h-full">
      <div id={chartAccessor} className="h-full" />
    </div>
  );
};

export default TXChart;
