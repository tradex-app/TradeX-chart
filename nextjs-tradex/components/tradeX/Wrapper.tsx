'use client';

import React, { useEffect, useState, useCallback } from 'react';
import useChart from './hooks/useChart';
import { CHART_OPTIONS, DEFAULT_RANGE_LIMIT } from './utils';
import { fetchOHLCVData, fetchTXData } from './fetchers';
import FullScreenWrapper from '../FullScreen/FullScreenWrapper';
import FullScreenButton from '../FullScreen/FullScreenButton';
import Toolbar from './Toolbar';
import { IIndicatorToolbar, ITokenChartProps } from './utils/types'; // don't change this, these are from the wrapper not the module
import Chart from '@/components/tradeX/Chart';
import { AVAILABLE_INDICATORS as loadIndicators } from '@/components/tradeX/indicators/availbleIndicators';
import {ITradeX, IIndicator, ITradeData } from '../../../types';

const TradingChart = (props: ITokenChartProps) => {
  const { toolbar, defaults, ...config } = props;
  const [symbol, setSymbol] = useState();
  const [tokensList, setTokensList] = useState<string[]>([]);
  const [intervals, setIntervals] = useState(toolbar?.intervals || ['1m']);
  const [showPlaceHolder, setShowPlaceHolder] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tradeData, setTradeData] = useState<ITradeData[]>();
  const [selectedInterval, setSelectedInterval] = useState(
    defaults?.timeframe || '1m'
  );
  const [selectedChartType, setSelectedChartType] = useState(
    defaults?.chartType || CHART_OPTIONS[0]
  );
  const [indicators, setIndicators] = useState<IIndicatorToolbar[]>([
    {
      value: '',
      label: '',
      selected: false
    }
  ]);
  const [hasInitialFetch, setHasInitialFetch] = useState(false);

  const {
    chartX,
    setChartX: setChart,
    data,
    setData,
    handleMergeData,
    handleRemoveIndicator,
    handleAddIndicator,
    getIndicatorId,
    resetData
  } = useChart();

  const handleSelectIndicator = (indicatorValue: string) => {
    const indicator = loadIndicators[indicatorValue];
    console.log('indicator to add/remove', indicator);

    if (indicator) {
      const existingIndicator = indicators.find(
        (ind) => ind.value === indicator.id
      );

      if (existingIndicator?.selected) {
        // If the indicator is already selected, remove it
        setIndicators(
          indicators.map((ind) =>
            ind.value === indicator.id ? { ...ind, selected: false } : ind
          )
        );
        handleRemoveIndicator(indicator.id);
      } else {
        // If the indicator is not selected, add it
        const newIndicator = {
          value: indicator.id,
          label: indicator.name,
          selected: true
        };

        setIndicators(
          indicators.map((ind) =>
            ind.value === newIndicator.value ? { ...ind, selected: true } : ind
          )
        );

        const indicatorToAdd = {
          value: indicator.id,
          name: indicator.name,
          data: [],
          customSettings: {}
        };

        handleAddIndicator(indicatorToAdd);
      }
    }
  };

  const handleTokenChange = (value: React.SetStateAction<string>) => {
    const upperCaseValue = (value as string).toUpperCase();
    setSymbol(upperCaseValue);
    setHasInitialFetch(false);
  };

  const handleFetchTXData = useCallback(async () => {
    if (!symbol || !selectedInterval) return;
    try {
      const tx = await fetchTXData({
        tf: selectedInterval,
        token: symbol,
        to: 1000
      });
      setTradeData(tx);
    } catch (error) {
      console.error('Error fetching TX data:', error);
    }
  }, [symbol, selectedInterval]);

  const fetchInitialBinanceData = useCallback(async () => {
    if (!chartX || !symbol || !selectedInterval || hasInitialFetch) return;
    setIsLoading(true);
    try {
      const LIMIT = 100;
      const TIME = {
        sec: 1000,
        min: 60 * 1000,
        hour: 60 * 60 * 1000,
        day: 24 * 60 * 60 * 1000,
        week: 7 * 24 * 60 * 60 * 1000,
        month: 30 * 24 * 60 * 60 * 1000
      };
      const FACTOR = {
        '1m': LIMIT * TIME.min,
        '5m': (LIMIT * TIME.hour) / 12,
        '10m': (LIMIT * TIME.hour) / 6,
        '15m': (LIMIT * TIME.hour) / 4,
        '30m': (LIMIT * TIME.hour) / 2,
        '1h': LIMIT * TIME.hour,
        '4h': (LIMIT * TIME.day) / 6,
        '12h': (LIMIT * TIME.day) / 2,
        '1d': LIMIT * TIME.day,
        '1w': LIMIT * TIME.week,
        '1M': LIMIT * TIME.month
      };
      const start = Math.trunc(Date.now() / 1000) * 1000 -
        // @ts-ignore
        (FACTOR[selectedInterval] || FACTOR['1m']);
      const url = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${selectedInterval}&startTime=${start}&limit=${LIMIT}`;
      const response = await fetch(url);
      const data = await response.json();
      chartX.mergeData({ ohlcv: data }, false, true);
      setHasInitialFetch(true);
    } catch (error) {
      console.error('Error fetching initial Binance data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [chartX, symbol, selectedInterval, hasInitialFetch]);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        //const response = await fetch('/api/available-tokens');
        //const data = await response.json();
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setTokensList(['BTCUSDT', 'ETHUSDT', 'LTCUSDT']);
        handleTokenChange('BTCUSDT');
      } catch (error) {
        console.error('Error fetching tokens:', error);
      }
    };
    fetchTokens();
  }, []);

  useEffect(() => {
    const indicatorsArray = Object.values(loadIndicators);
    const mappedIndicators = indicatorsArray.map((indicator: IIndicator) => ({
      label: indicator.name,
      value: indicator.id,
      selected: false
    }));

    setIndicators(mappedIndicators);
    setSelectedInterval(defaults?.timeframe || '5m');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartX]);

  useEffect(() => {
    if (!data.length && !isLoading) {
      const timeoutId = setTimeout(() => {
        setShowPlaceHolder(true);
      }, 200);

      return () => clearTimeout(timeoutId);
    }
    setShowPlaceHolder(false);
  }, [data.length, isLoading]);

  useEffect(() => {
    fetchInitialBinanceData();
  }, [fetchInitialBinanceData]);

  useEffect(() => {
    handleFetchTXData();
  }, [handleFetchTXData]);

  useEffect(() => {
    if (!chartX) return;

    const registerRangeLimt = (chart: ITradeX) => {
      console.log('registering range limit');
      // @ts-ignore
      const list = chart?.state?.list();
      console.log(list);
      function onRangeLimit(e: any, x: string) {
        const range = e.chart.range;
        const limit = 100;
        const start = range.timeStart - range.interval * limit;
        const end = range.timeEnd;
        const interval = range.intervalStr;
        if (x == 'past') {
          console.log('past triggered');
          e.chart.progress.start();
          fetchInitialBinanceData();
        }
        if (x == 'future') {
          console.log('future triggered');
        }
      }

      if (chart.on) {
        console.log('EVENTS REGISTERED');
        chart.on('range_limitPast', (e) => onRangeLimit(e, 'past'));
        chart.on('range_limitFuture', (e) => onRangeLimit(e, 'future'));
      }
    };

    registerRangeLimt(chartX);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartX, selectedInterval]);

  return (
    <FullScreenWrapper>
      {({ handle, isIOS }: { handle: any; isIOS: boolean }) => (
        <div className="flex flex-col h-full w-full min-h-[400px]">
          <div className="flex flex-row">
            {(toolbar?.timeframe ||
              toolbar?.indicators ||
              toolbar?.typeSelector) && (
              <Toolbar
                config={toolbar}
                intervals={intervals}
                selectedInterval={selectedInterval}
                indicators={indicators}
                tokensList={tokensList}
                selectedToken={symbol}
                selectedChart={selectedChartType}
                onSelectIndicators={handleSelectIndicator}
                onSelectChart={setSelectedChartType}
                onSelectToken={handleTokenChange}
                onSelectInterval={(value: React.SetStateAction<string>) => {
                  setData([]);
                  setSelectedInterval(value);
                  setHasInitialFetch(false);
                }}
              />
            )}
            {toolbar?.fullscreenButton && (
              <div className="flex mr-4">
                <FullScreenButton handle={handle} isIOS={isIOS} />
              </div>
            )}
          </div>
          <div className="flex flex-grow w-full h-[600px]" key={symbol}>
            <Chart
              config={config}
              chartType={selectedChartType}
              displayTitle={symbol}
              rangeLimit={DEFAULT_RANGE_LIMIT}
              data={data}
              onchart={indicators}
              tradeData={tradeData}
              customIndicators={loadIndicators}
              // @ts-ignore
              chartX={chartX}
              setChart={setChart}
            />
          </div>
        </div>
      )}
    </FullScreenWrapper>
  );
};

export default TradingChart;
