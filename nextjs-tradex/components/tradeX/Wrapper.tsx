'use client';

import React, { useEffect, useState, useCallback } from 'react';
import useChart from './hooks/useChart';
import { CHART_OPTIONS, DEFAULT_RANGE_LIMIT } from './utils';
import { fetchOHLCVData, fetchTXData } from './fetchers';
import FullScreenWrapper from '../FullScreen/FullScreenWrapper';
import FullScreenButton from '../FullScreen/FullScreenButton';
import Toolbar from './Toolbar';
import { IIndicatorToolbar, ITokenChartProps } from './utils/types';
import Chart from '@/components/tradeX/Chart';
import { AVAILABLE_INDICATORS as loadIndicators } from '@/components/tradeX/indicators/availbleIndicators';
import { ITradeX, IIndicator, ITradeData } from '../../../types';

const TradingChart = (props: ITokenChartProps) => {
  const { toolbar, defaults, ...config } = props;
  const [symbol, setSymbol] = useState(config?.symbol);
  const [tokensList, setTokensList] = useState<string[]>([]);
  const [intervals, setIntervals] = useState(toolbar?.intervals || ['1m']);
  const [isLoading, setIsLoading] = useState(false);
  const [tradeData, setTradeData] = useState<ITradeData[]>();
  const [selectedInterval, setSelectedInterval] = useState(config?.timeFrame);
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
  const [ws, setWs] = useState<WebSocket | null>(null); // Store WebSocket instance

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

    if (indicator) {
      const existingIndicator = indicators.find(
        (ind) => ind.value === indicator.id
      );

      if (existingIndicator?.selected) {
        setIndicators(
          indicators.map((ind) =>
            ind.value === indicator.id ? { ...ind, selected: false } : ind
          )
        );
        handleRemoveIndicator(indicator.id);
      } else {
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
  }, [chartX, hasInitialFetch]);

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
  }, []);

  useEffect(() => {
    const indicatorsArray = Object.values(loadIndicators);
    const mappedIndicators = indicatorsArray.map((indicator: IIndicator) => ({
      label: indicator.name,
      value: indicator.id,
      selected: false
    }));

    setIndicators(mappedIndicators);
    setSelectedInterval(config?.timeFrame);
  }, [chartX]);

  useEffect(() => {
    handleFetchTXData();
  }, [handleFetchTXData]);

  useEffect(() => {
    if (!chartX) return;

    const registerRangeLimit = (chart: ITradeX) => {
      function onRangeLimit(e: any, x: string) {
        const range = e.chart.range;
        const limit = 100;
        const start = range.timeStart - range.interval * limit;
        const end = range.timeEnd;
        const interval = range.intervalStr;

        if (x === 'past') {
          e.chart.progress.start();
          fetchOHLCVData(
            e.chart,
            start,
            limit,
            symbol,
            selectedInterval,
            isLoading
          );
        }
      }

      if (chart.on) {
        fetchInitialBinanceData();
        chart.on('range_limitPast', (e) => onRangeLimit(e, 'past'));
      }
    };

    registerRangeLimit(chartX);
  }, [chartX, selectedInterval]);

  const livePrice_Binance = (
    chart: ITradeX,
    symbol: string,
    interval: string
  ) => {
    const newWs = new WebSocket(
      `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_${interval}`
    );

    newWs.onmessage = (evt) => {
      const msg = evt.data;
      const obj = JSON.parse(msg);

      if (obj && obj.k) {
        const filteredData = {
          t: obj.k.t, // timestamp
          o: obj.k.o, // open price
          h: obj.k.h, // high price
          l: obj.k.l, // low price
          c: obj.k.c, // close price
          v: obj.k.v // volume
        };
        chart?.stream?.onTick(filteredData);
      }
    };

    newWs.onopen = () => {
      console.log('WebSocket connection opened');
      chart?.stream?.start();
    };

    newWs.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    newWs.onclose = () => {
      console.log('WebSocket connection closed');
    };

    setWs(newWs);
  };

  useEffect(() => {
    if (symbol && selectedInterval && chartX) {
      livePrice_Binance(chartX, symbol, selectedInterval);
    }

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [symbol, selectedInterval, chartX]);

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
              displayTitle={symbol}
              interval={selectedInterval}
              chartType={selectedChartType}
              rangeLimit={DEFAULT_RANGE_LIMIT}
              data={data}
              onchart={indicators}
              tradeData={tradeData}
              customIndicators={loadIndicators}
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
