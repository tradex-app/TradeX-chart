'use client';

import React, { useEffect, useState } from 'react';
import useChart from './hooks/useChart';
import { CHART_OPTIONS, DEFAULT_RANGE_LIMIT } from './utils';
import { fetchOHLCVData, fetchTXData } from './fetchers';
import FullScreenWrapper from '../FullScreen/FullScreenWrapper';
import FullScreenButton from '../FullScreen/FullScreenButton';
import Toolbar from './Toolbar';
import dynamic from 'next/dynamic';
import { IIndicatorToolbar, ITokenChartProps } from './utils/types';
import { IIndicator, ITradeData } from 'tradex-chart';

const Chart = dynamic(() => import('@/components/tradeX/Chart'), {
  ssr: false
});

let end: number;

const TradingChart = (props: ITokenChartProps) => {
  const { loadIndicators, toolbar, defaults, ...config } = props;
  const [symbol, setSymbol] = useState(config.title);
  const [tokensList, setTokensList] = useState<string[]>([]);
  const [firstLoad, setFirstLoad] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [endDate, setEndDate] = useState(new Date());
  const [intervals, setIntervals] = useState(toolbar?.intervals || ['1h']);
  const [showPlaceHolder, setShowPlaceHolder] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tradeData, setTradeData] = useState<ITradeData[]>();
  const [selectedInterval, setSelectedInterval] = useState(
    defaults?.timeframe || '1h'
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
        customSettings: {}
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
      let newData;
      setIsLoading(true);
      if (symbol) {
        const ticker = symbol + 'USDT';
        newData = await fetchOHLCVData({
          selectedInterval,
          ticker: ticker
        });
      }
      if (newData) {
        end = newData[0][0];
        //console.log('end', end);
        setFirstLoad(false);

        setIsEnd(true); // TODO REMOVE LATER when merging logic is done

        if (data.length) {
          setData([...newData, ...data]);
        } else {
          setData(newData);
        }

        handleMergeData(newData);
      }
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
    setTradeData(tx);
  };

  useEffect(() => {
    if (!symbol || !selectedInterval || isEnd || !defaults?.showTradeData)
      return;
    handleFetchTXData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [symbol, selectedInterval, endDate]);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        //const response = await fetch('/api/available-tokens');
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
    const indicatorsArray = Object.values(loadIndicators);
    const mappedIndicators = indicatorsArray.map((indicator: IIndicator) => ({
      label: indicator.name,
      value: indicator.id,
      selected: false
    }));

    setIndicators(mappedIndicators);
    setSelectedInterval(defaults?.timeframe || '5m');
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
                  setFirstLoad(true);
                  setEndDate(new Date());
                  setData([]);
                  setSelectedInterval(value);
                  setIsEnd(false);
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
              onRangeChange={handleRangeChange}
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
