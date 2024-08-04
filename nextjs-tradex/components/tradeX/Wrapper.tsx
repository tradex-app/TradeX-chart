'use client';

import React, { useEffect, useState, memo } from 'react';
import useChart from './hooks/useChart';
import { CHART_OPTIONS, DEFAULT_RANGE_LIMIT } from './utils';
import { fetchOHLCVData, fetchTXData } from './fetchers';
import FullScreenWrapper from '../FullScreen/FullScreenWrapper';
import FullScreenButton from '../FullScreen/FullScreenButton';
import Toolbar from './Toolbar';
import Chart from './Chart';
import AVAILABLE_INDICATORS from './indicators/availbleIndicators';
import { IConfig } from 'tradex-chart';

const defaultConfig = {
  toolbar: {
    timeframe: true,
    indicators: false,
    typeSelector: false,
    fullscreenButton: true
  },
  defaults: {
    timeframe: '5m',
    chartType: CHART_OPTIONS[0]
  },
  availableIndicators: AVAILABLE_INDICATORS
};

let end: number;

const TokenChart: React.FC<IConfig> = (props) => {
  const { config = defaultConfig, showTradeData } = props;
  const [symbol, setSymbol] = useState('PEPE');
  const [tokensList, setTokensList] = useState([]);

  const [firstLoad, setFirstLoad] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [endDate, setEndDate] = useState(new Date());
  const [indicators, setIndicators] = useState([]);
  const [selectedInterval, setSelectedInterval] = useState(
    config?.defaults?.timeframe || '5m'
  );
  const [intervals, setIntervals] = useState([
    '1m',
    '5m',
    '15m',
    '30m',
    '1h',
    '12h',
    '1d'
  ]);
  const [showPlaceHolder, setShowPlaceHolder] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tradeData, setTradeData] = useState([]);

  const mergedConfig = { ...defaultConfig, ...config };

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

  const [selectedChartType, setSelectedChartType] = useState(
    mergedConfig?.defaults?.chartType || CHART_OPTIONS[0]
  );

  const handleSelectIndicator = (indicatorValue: string) => {
    console.log('handleSelectIndicator', indicatorValue);
    console.log('indicators', indicators);
    // Find the indicator from AVAILABLE_INDICATORS
    const indicator = AVAILABLE_INDICATORS[indicatorValue];
    console.log('indicator to add', indicator);

    if (indicator) {
      const newIndicator = {
        value: indicator.id,
        label: indicator.name,
        selected: true
      };

      // Update the indicators array
      const updatedIndicators = indicators.map((ind) =>
        ind.value === newIndicator.value ? { ...ind, selected: true } : ind
      );

      setIndicators(updatedIndicators);

      // Prepare the indicator to add with additional settings
      const indicatorToAdd = {
        value: indicator.id,
        name: indicator.name,
        data: [],
        settings: {}
      };

      handleAddIndicator(indicatorToAdd);
    }
  };

  const handleRangeChange = () => {
    setEndDate(new Date(end - 1));
  };

  const requestData = async () => {
    if (isLoading || isEnd) return;

    try {
      let newData = [];
      setIsLoading(true);
      if (symbol) {
        const ticker = symbol + 'USDT';
        newData = await fetchOHLCVData({
          selectedInterval,
          ticker: ticker
        });
      }
      console.log('newData', newData);
      end = newData[0][0];
      console.log('end', end);
      setFirstLoad(false);

      setIsEnd(true); // TODO REMOVE LATER when merging logic is done

      if (data.length) {
        setData([...newData, ...data]);
      } else {
        setData(newData);
      }

      handleMergeData(newData);
    } catch (error) {
      setIsEnd(true);
    } finally {
      setIsLoading(false);
    }
  };
  const handleTokenChange = (value: React.SetStateAction<string>) => {
    const upperCaseValue = (value as string).toUpperCase();
    setSymbol(upperCaseValue);
  };

  const handleFetchTXData = async () => {
    if (!symbol) return;
    const tx = await fetchTXData({
      tf: selectedInterval,
      token: symbol,
      to: 1000
    });
    console.log('tx', tx);
    setTradeData(tx);
  };

  useEffect(() => {
    if (!symbol || !selectedInterval || isEnd || !showTradeData) return;
    handleFetchTXData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [symbol, selectedInterval, endDate]);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        //const response = await fetch('/api/tokens');
        //const data = await response.json();
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setTokensList(['PEPE', 'WBTC', 'ETH']);
      } catch (error) {
        console.error('Error fetching tokens:', error);
      }
    };
    fetchTokens();
  }, []);

  useEffect(() => {
    setData([]);
    setFirstLoad(true);
    setIsEnd(false);
    const indicatorsArray = Object.values(mergedConfig.availableIndicators);
    const mappedIndicators = indicatorsArray.map((indicator: any) => ({
      label: indicator.name,
      value: indicator.id,
      selected: false
    }));

    setIndicators(mappedIndicators);
    setSelectedInterval(mergedConfig?.defaults?.timeframe || '5m');
    setEndDate(new Date());
  }, [symbol]);

  useEffect(() => {
    if (!endDate || !selectedInterval || isLoading) {
      return;
    }

    requestData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endDate, selectedInterval]);

  useEffect(() => {
    if (!data.length && !isLoading) {
      const timeoutId = setTimeout(() => {
        setShowPlaceHolder(true);
      }, 200);

      return () => clearTimeout(timeoutId);
    }
    setShowPlaceHolder(false);
  }, [data.length, isLoading]);

  return (
    <FullScreenWrapper>
      {({ handle, isIOS }: { handle: any; isIOS: boolean }) => (
        <>
          <div className="flex flex-grow">
            {mergedConfig.toolbar?.timeframe ||
            mergedConfig.toolbar?.indicators ||
            mergedConfig.toolbar?.typeSelector ? (
              <Toolbar
                config={mergedConfig}
                intervals={intervals}
                onSelectInterval={(value: React.SetStateAction<string>) => {
                  setFirstLoad(true);
                  setEndDate(new Date());
                  setData([]);
                  setSelectedInterval(value);
                  setIsEnd(false);
                }}
                selectedInterval={selectedInterval}
                selectedChart={selectedChartType}
                onSelectChart={setSelectedChartType}
                hasChartTypeSelection
                indicators={indicators}
                onSelectIndicators={handleSelectIndicator}
                tokensList={tokensList}
                selectedToken={symbol}
                onSelectToken={handleTokenChange}
              />
            ) : null}
            {mergedConfig.toolbar?.fullscreenButton ? (
              <div className="flex mr-4">
                <FullScreenButton handle={handle} isIOS={isIOS} />
              </div>
            ) : null}
          </div>
          <div className="relative" key={symbol}>
            {data.length > 0 && (
              <div className="h-[600px] w-full">
                <Chart
                  title={symbol}
                  data={data}
                  tradeData={tradeData}
                  chartType={selectedChartType}
                  onRangeChange={handleRangeChange}
                  rangeLimit={DEFAULT_RANGE_LIMIT}
                  // @ts-ignore
                  chartX={chartX}
                  // @ts-ignore
                  setChart={setChart}
                  onchart={indicators}
                  customIndicators={AVAILABLE_INDICATORS}
                />
              </div>
            )}
          </div>
        </>
      )}
    </FullScreenWrapper>
  );
};

export default memo(TokenChart);
