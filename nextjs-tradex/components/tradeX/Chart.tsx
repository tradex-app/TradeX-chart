'use client';
import { FC, useEffect } from 'react';
import config from './utils/config';
import { useTheme } from 'next-themes';
import { IProps, ITradeX } from 'tradex-chart';
import ColorsEnum from '../theme/colors';
import 'tradex-chart';

const Chart: FC<IProps> = ({
  // visual
  title,
  chartType = 'area',
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

  // Register custom indicators to the chart
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

  // Register event listener for range change
  const registerRangeChangeEvent = (chart: ITradeX) => {
    if (!chart || typeof chart.on !== 'function') {
      console.warn(
        'Chart object is either undefined or missing the on method.'
      );
      return;
    }
    chart.on('setRange', (e) => {
      if (!e) return;

      console.log('Range change event detected:', e);

      if (e[0] <= 0 && onRangeChange) {
        onRangeChange();
      }
    });
  };

  const renderChart = () => {
    try {
      console.log('Rendering chart...');

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
      console.log('Chart element appended to DOM.');

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

      if (onRangeChange) {
        registerRangeChangeEvent(chart);
      }
      const isLightTheme = theme === 'light';

      if (typeof chart.start === 'function') {
        console.log('Starting the chart with configuration:', {
          ...config({
            title,
            symbol: title,
            type: chartType,
            rangeLimit,
            isLightTheme
          }),
          state
        });

        chart.start({
          ...config({
            title,
            symbol: title,
            type: chartType,
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
      console.log('Chart rendering complete.');
    } catch (err) {
      console.error(`Failed to render chart: ${title}`, err);
    }
  };

  useEffect(() => {
    if (!chartX) return;

    console.log('Applying theme settings based on current theme:', theme);

    if (theme === 'light') {
      chartX.theme?.setProperty('chart.GridColour', ColorsEnum.SelectorLight);
      return;
    }

    chartX.theme?.setProperty('chart.GridColour', ColorsEnum.Selector);
  }, [chartX, theme]);

  useEffect(() => {
    console.log('Initial chart rendering...');
    renderChart();
  }, []);

  useEffect(() => {
    if (!chartX) return;

    console.log('Chart type changed. Applying new type:', chartType);

    chartX.theme?.setProperty('candle.Type', chartType?.value);
  }, [chartType, chartX]);

  return (
    <div className="w-full h-full">
      <div id={chartAccessor} className="h-full" />
    </div>
  );
};

export default Chart;
