import React, { useEffect, useState, memo } from "react";
import useChart from "./hooks/useChart";
import { CHART_OPTIONS, DEFAULT_RANGE_LIMIT } from "./utils";
import {
  ColumnAccessorEnum,
  LevelResolutionEnum,
  RangeLimitEnum,
  RangeResolutionEnum,
} from "./utils/enums";

import { fetchAvailableTimeframes, fetchOHLCVData } from "./fetchers";
import FullScreenWrapper from "../FullScreen/FullScreenWrapper";
import FullScreenButton from "../FullScreen/FullScreenButton";
import Toolbar from "./Toolbar";
import Chart from "./Chart";
import AVAILABLE_INDICATORS from "./indicators/availbleIndicators";

type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

interface IPropsBase {
  tokenId?: number;
  symbol?: string;
  chartData?: any;
  tradeData?: any;
  level?: any; //TODO
  ranges?: any; //TODO
  config?: {
    toolbar?: {
      timeframe?: boolean;
      indicators?: boolean;
      typeSelector?: boolean;
      fullscreenButton?: boolean;
    };
    generalTokenChart?: boolean;
    defaults?: {
      timeframe?: string;
      chartType?: any;
      indicatorOptions?: any;
    };
  };
}

type IProps = RequireAtLeastOne<IPropsBase, "tokenId" | "chartData">;

const defaultConfig = {
  toolbar: {
    timeframe: true,
    indicators: true,
    typeSelector: true,
    fullscreenButton: true,
  },
  generalTokenChart: true,
  defaults: {
    timeframe: "1h",
    chartType: CHART_OPTIONS[0],
  },
  availableIndicators: AVAILABLE_INDICATORS,
};

let end;

interface AvailabilityType {
  base: string;
  timeframes?: string[];
}

const TokenChart: React.FC<IProps> = (props) => {
  const {
    tokenId,
    symbol,
    config = defaultConfig,
    chartData,
    tradeData,
  } = props;
  const [availability, setAvailability] = useState<AvailabilityType | null>(
    null,
  );
  const [title, setTitle] = useState(`${symbol}/${availability?.base || ""}`);
  const [firstLoad, setFirstLoad] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [endDate, setEndDate] = useState(new Date());
  const [indicators, setIndicators] = useState([]);
  const [selectedInterval, setSelectedInterval] = useState(
    config?.defaults?.timeframe || "1h",
  );
  const [intervals, setIntervals] = useState([]);
  const [showPlaceHolder, setShowPlaceHolder] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const mergedConfig = { ...defaultConfig, ...config };

  const {
    chartX,
    setChartX: setChart,
    data,
    setData,
    handleMergeData,
    //
    handleRemoveIndicator,
    handleAddIndicator,
    getIndicatorId,
  } = useChart();

  const [selectedChartType, setSelectedChartType] = useState(
    mergedConfig?.defaults?.chartType || CHART_OPTIONS[0],
  );

  const fetchTimeframes = async () => {
    let availableTimeframes = [
      {
        pair_id: undefined,
        target: undefined,
        base: "USD",
        timeframes: ["1m", "5m", "15m", "30m", "1h", "4h", "12h", "1d"],
      },
    ];
    if (tokenId) {
      availableTimeframes = await fetchAvailableTimeframes({
        tokenId: +tokenId,
      });
    }

    setAvailability(
      availableTimeframes.find((pair) => pair.base === "USDT") ||
        availableTimeframes[0],
    );
  };

  const handleSelectIndicator = (indicator) => {
    if (indicators.find((element) => element.value === indicator.value)) {
      const indicatorId = getIndicatorId(indicator.value);

      if (!indicatorId) return;

      setIndicators(
        indicators.filter((element) => element.value !== indicator.value),
      );

      handleRemoveIndicator(indicatorId);
      return;
    }

    setIndicators([...indicators, indicator]);
    handleAddIndicator(indicator);
  };

  const handleRangeChange = () => {
    setEndDate(new Date(end - 1));
  };

  const requestData = async () => {
    if (isLoading || isEnd) return;

    const resolution = selectedInterval;

    try {
      console.log("FETCH CHART DATA");
      let newData = chartData;
      setIsLoading(true);
      if (tokenId) {
        newData = await fetchOHLCVData({
          end: endDate,
          resolution,
          tokenId,
          first: firstLoad,
        });
      }

      end = newData[0][0];
      setFirstLoad(false);

      if (data.length) {
        setData([...newData, ...data]);
      } else {
        setData(newData);
      }

      // update onchart
      setIndicators([...indicators.filter((indicator) => !indicator.isD2T)]);

      handleMergeData(newData);
    } catch (error) {
      setIsEnd(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setTitle(`${symbol}/${availability?.base || ""}`);
  }, [availability, symbol]);

  useEffect(() => {
    setData([]);
    setFirstLoad(true);
    setIsEnd(false);

    setSelectedInterval(mergedConfig?.defaults?.timeframe);
    setEndDate(new Date());
  }, [tokenId]);

  useEffect(() => {
    if (!availability) return;

    setIntervals(availability.timeframes);
  }, [availability]);

  useEffect(() => {
    fetchTimeframes();
  }, [tokenId]);

  useEffect(() => {
    if (!endDate || !selectedInterval || isLoading) {
      return;
    }

    requestData();
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

  if (!availability) {
    return <div />;
  }

  return (
    <FullScreenWrapper>
      {({ handle, isIOS }) => (
        <>
          <div className="toolbar">
            {mergedConfig.toolbar?.timeframe ||
            mergedConfig.toolbar?.indicators ||
            mergedConfig.toolbar?.typeSelector ? (
              <Toolbar
                config={mergedConfig}
                intervals={intervals}
                onSelectInterval={(value) => {
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
              />
            ) : null}
            {mergedConfig.toolbar?.fullscreenButton ? (
              <FullScreenButton handle={handle} isIOS={isIOS} />
            ) : null}
          </div>
          <div className="relative full-size">
            {(mergedConfig.generalTokenChart ? data.length > 0 : chartData) && (
              <Chart
                title={title}
                data={data || chartData}
                tradeData={tradeData}
                chartType={selectedChartType}
                onRangeChange={handleRangeChange}
                rangeLimit={
                  RangeLimitEnum[selectedInterval] || DEFAULT_RANGE_LIMIT
                }
                chartX={chartX}
                setChart={setChart}
                onchart={indicators}
                customIndicators={AVAILABLE_INDICATORS}
              />
            )}
          </div>
        </>
      )}
    </FullScreenWrapper>
  );
};

export default memo(TokenChart);
