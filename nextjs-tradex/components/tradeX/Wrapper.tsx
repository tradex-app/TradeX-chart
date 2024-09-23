'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { CHART_OPTIONS, DEFAULT_RANGE_LIMIT } from './utils';
import { fetchOHLCVData, fetchTXData } from './fetchers';
import FullScreenWrapper from '../FullScreen/FullScreenWrapper';
import FullScreenButton from '../FullScreen/FullScreenButton';
import Toolbar from './Toolbar';
import { IIndicatorToolbar, ITokenChartProps } from './utils/types';
import Chart from '@/components/tradeX/Chart';
import { CUSTOM_INDICATORS } from '@/components/tradeX/indicators/availbleIndicators';
import { ITradeData } from '../../../types';
import { Chart as TXChart } from '../../../src'; // import { Chart as TXChart } from 'tradex-chart';
import { livePrice_Binance } from './utils/ws';
import { useChartContext } from './provider/ChartProvider';

// INSTANTIATE CHART MODULE
TXChart; // DO NOT REMOVE THIS

const TradingChart = (props: ITokenChartProps) => {
  const { toolbar, defaults, ...config } = props;
  const [symbol, setSymbol] = useState(config?.symbol);
  const [tokensList, setTokensList] = useState<string[]>([]);
  const [intervals, setIntervals] = useState(toolbar?.intervals || ['1m']);
  const [isLoading, setIsLoading] = useState(false);
  const [tradeData, setTradeData] = useState<ITradeData[]>();
  const [selectedInterval, setSelectedInterval] = useState(config?.timeFrame);
  const [indicators, setIndicators] = useState<IIndicatorToolbar[]>();
  const [hasInitialFetch, setHasInitialFetch] = useState(false);
  const wsRef = useRef<WebSocket>();
  const [selectedChartType, setSelectedChartType] = useState(
    defaults?.chartType || CHART_OPTIONS[0]
  );
  const { chartX, handleAddIndicator } = useChartContext();

  const indicatorsEffectTriggered = useRef(false);

  const handleSelectIndicator = (indicatorValue: string) => {
    const indicatorClass = indicatorValue;
    const indicatorName = indicatorValue;
    const indicatorProps = {
      //id: "string", // user defined or automatic
      legendName: indicatorValue // legend title
      // data: [],
      // settings: {
      //   style: {
      //     output: {
      //       colour: {value: "#0f0"},
      //       width: {value: 3}, dash: "4,4"}
      //     },
      //     input: {timePeriod: {value: 15}
      //    }
      //  }
    };
    handleAddIndicator(indicatorClass, indicatorName, indicatorProps);
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

  const fetchInitialHistory = useCallback(async () => {
    if (!chartX || !symbol || !selectedInterval || hasInitialFetch) return;
    setIsLoading(true);

    try {
      fetchOHLCVData(
        chartX,
        config?.range.startTS,
        config?.range.limitPast,
        symbol,
        selectedInterval,
        isLoading
      );
      setHasInitialFetch(true);
    } catch (error) {
      console.error('Error fetching initial Binance data:', error);
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartX, hasInitialFetch]);

  // TOKEN LIST
  useEffect(() => {
    const fetchTokens = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setTokensList(['BTCUSDT', 'ETHUSDT', 'LTCUSDT']);
        handleTokenChange('BTCUSDT');
      } catch (error) {
        console.error('Error fetching tokens:', error);
      }
    };
    fetchTokens();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initializeChart = useCallback(async () => {
    if (!chartX || !symbol || !selectedInterval) return;
    console.log('chartX', chartX);
    console.log('Symbol:', symbol);
    console.log('Selected Interval:', selectedInterval);

    if (
      indicatorsEffectTriggered.current ||
      !chartX ||
      !chartX?.indicatorClasses
    )
      return;
    indicatorsEffectTriggered.current = true;

    const registeredIndicators = chartX.indicatorClasses;

    const mappedRegisteredIndicators = Object.entries(registeredIndicators).map(
      ([key, IndClass]) => ({
        label: (IndClass as any).nameShort || key,
        value: key,
        tooltip: (IndClass as any).nameLong || key,
        selected: false
      })
    );
    setIndicators(mappedRegisteredIndicators);

    setIsLoading(true);
    try {
      // Fetch transactions
      const tx = await fetchTXData({
        tf: selectedInterval,
        token: symbol,
        to: 1000
      });
      setTradeData(tx);

      // Fetch initial history
      await fetchOHLCVData(
        chartX,
        config?.range.startTS,
        config?.range.limitPast,
        symbol,
        selectedInterval,
        isLoading
      );
      // Register range limit
      chartX?.on?.('range_limitPast', (e: any) => {
        const range = e.chart.range;
        const limit = 100;
        const start = range.timeStart - range.interval * limit;
        fetchOHLCVData(
          e.chart,
          start,
          limit,
          symbol,
          selectedInterval,
          isLoading
        );
      });

      // Initialize WebSocket
      if (wsRef.current) {
        wsRef.current.close();
      }
      wsRef.current = livePrice_Binance(chartX, symbol, selectedInterval);

      setHasInitialFetch(true);
    } catch (error) {
      console.error('Error initializing chart:', error);
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartX, symbol, selectedInterval]);

  useEffect(() => {
    if (chartX && symbol && selectedInterval && !hasInitialFetch) {
      initializeChart();
    }
  }, [chartX, symbol, selectedInterval, hasInitialFetch, initializeChart]);

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
          <div className="flex flex-grow w-full h-[600px]">
            <Chart
              config={config}
              displayTitle={symbol}
              interval={selectedInterval}
              chartType={selectedChartType}
              rangeLimit={DEFAULT_RANGE_LIMIT}
              onchart={indicators}
              tradeData={tradeData}
              customIndicators={CUSTOM_INDICATORS}
            />
          </div>
        </div>
      )}
    </FullScreenWrapper>
  );
};

export default TradingChart;
