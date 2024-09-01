'use client';

import React, { useEffect, useState } from 'react';
import useChart from './hooks/useChart';
import { CHART_OPTIONS, DEFAULT_RANGE_LIMIT } from './utils';
import { fetchOHLCVData, fetchTXData } from './fetchers';
import FullScreenWrapper from '../FullScreen/FullScreenWrapper';
import FullScreenButton from '../FullScreen/FullScreenButton';
import Toolbar from './Toolbar';
import { IIndicatorToolbar, ITokenChartProps } from './utils/types'; // don't change this, these are from the wrapper not the module
import { IIndicator, ITradeData, ITradeX } from '../../../types'; // import from 'tradex-chart';
import Chart from '@/components/tradeX/Chart';
import { AVAILABLE_INDICATORS as loadIndicators } from '@/components/tradeX/indicators/availbleIndicators';

const TradingChart = (props: ITokenChartProps) => {
  const { toolbar, defaults, ...config } = props;
  const [symbol, setSymbol] = useState(config.title);
  const [tokensList, setTokensList] = useState<string[]>([]);
  const [firstLoad, setFirstLoad] = useState(true);
  /*   const [isEnd, setIsEnd] = useState(false);
   */ /*const [endDate, setEndDate] = useState(new Date()); */
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
    resetData,
    handleCreateState,
    handleUseState,
    stateKeys
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

  /*   const handleRangeChange = () => {
    setEndDate(new Date(end - 1));
  };
 */
  /*   const requestData = async () => {
    if (isLoading) return;

    try {
      let newData;
      setIsLoading(true);
      if (symbol) {
        const ticker = symbol + 'USDT';
        newData = await fetchOHLCVData({
          end,
          selectedInterval,
          ticker: ticker,
          first: firstLoad
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
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }; */

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

  /*   useEffect(() => {
    if (!symbol || !selectedInterval || isEnd || !defaults?.showTradeData)
      return;
    handleFetchTXData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [symbol, selectedInterval, endDate]); */

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        //const response = await fetch('/api/available-tokens');
        //const data = await response.json();
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setTokensList(['BTCUSDT', 'ETHUSDT', 'LINKUSDT']);
        handleTokenChange('BTCUSDT');
      } catch (error) {
        console.error('Error fetching tokens:', error);
      }
    };
    fetchTokens();
  }, []);

  /*   useEffect(() => {
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
  }, [symbol]); */

  /*   useEffect(() => {
    if (!endDate || !selectedInterval || isLoading) {
      return;
    }

    requestData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endDate, selectedInterval]);
 */
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
    if (!chartX) return;
    function kline_Binance(
      chart: {
        mergeData: (arg0: { ohlcv: any }, arg1: boolean, arg2: boolean) => void;
      },
      start: number,
      limit = 100
    ) {
      const url = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${selectedInterval}&startTime=${start}&limit=${limit}`;
      console.log(url);
      if (!isLoading) {
        try {
          fetch(url)
            .then((r) => r.json())
            .then((d) => {
              console.log(d);
              chart.mergeData({ ohlcv: d }, false, true);
              setIsLoading(false);
            });
        } catch (e) {
          console.error(e);
          setIsLoading(false);
        }
      }
    }

    const registerRangeLimt = (chart: ITradeX) => {
      console.log('registering range limit');
      const list = chart.state.list();
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
          kline_Binance(e.chart, start, limit);
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
                  setFirstLoad(true);
                  /* setEndDate(new Date()); */
                  setData([]);
                  setSelectedInterval(value);
                  /* setIsEnd(false); */
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
