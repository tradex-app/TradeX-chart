import React, { useEffect, useState, memo } from "react";
import useChart from "./hooks/useChart";
import { CHART_OPTIONS, DEFAULT_RANGE_LIMIT } from "./utils";
import {
  ColumnAccessorEnum,
  LevelResolutionEnum,
  RangeFromTimeframe,
  RangeLimitEnum,
  RangeResolutionEnum,
  SecondsFromTimeframe,
} from "./utils/enums";

import { fetchAvailableTimeframes, fetchOHLCVData } from "./fetchers";
import FullScreenWrapper from "../FullScreen/FullScreenWrapper";
import Toolbar from "./Toolbar";
import Chart from "./Chart";
import AVAILABLE_INDICATORS, {
  SelectedIndicators,
} from "./indicators/availbleIndicators";
import { SelectedOverlays } from "./overlays/availableOverlays";
import { sampleOHLCV } from "./15min_btc";

let end;

const TokenChart = memo(({ tokenId, symbol, config, tradeData }: any) => {
  const [availability, setAvailability] = useState();
  const [title, setTitle] = useState(`${symbol} || ""}`);
  const [firstLoad, setFirstLoad] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [endDate, setEndDate] = useState(new Date());
  const [indicators, setIndicators] = useState([]); //TODO REVISE MAYBE ADD MAX INDICATORS
  const [overlays, setOverlays] = useState([]);
  const [selectedRange, setSelectedRange] = useState(null);
  const [selectedInterval, setSelectedInterval] = useState(
    config?.defaults.timeframe || "1h"
  );
  const [intervals, setIntervals] = useState([]);
  const [ranges, setRanges] = useState(config?.defaults.ranges || []);
  const [showPlaceHolder, setShowPlaceHolder] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    chartX,
    setChartX: setChart,
    data,
    setData,
    handleMergeData,
    handleRemoveIndicator,
    handleAddIndicator,
    handleAddOverlay,
    getIndicatorId,
  } = useChart();

  const [selectedChartType, setSelectedChartType] = useState(
    config?.defaults.chartType || CHART_OPTIONS[0]
  );

  const resolvedIndicators = SelectedIndicators(
    config.defaults?.availableIndicators
  );

  const resolvedOverlays = config.defaults?.availableOverlays
    ? SelectedOverlays(config.defaults?.availableOverlays)
    : undefined;

  const fetchTimeframes = async () => {
    setAvailability(config.defaults.availability);
  };

  const handleSelectIndicator = (indicator) => {
    handleAddIndicator(indicator);
  };

  const handleRangeChange = () => {
    setEndDate(new Date(end - 1));
  };

  useEffect(() => {
    if (config && "title" in config) {
      setTitle(config.title);
    }
  }, [config]);

  useEffect(() => {
    if (chartX) {
      const { preloadIndicators, preloadOverlays } = config.defaults;
      if (
        config &&
        Array.isArray(preloadIndicators) &&
        preloadIndicators.length > 0
      ) {
        preloadIndicators.forEach(handleAddIndicator);
      }
      if (
        config &&
        Array.isArray(preloadOverlays) &&
        preloadOverlays.length > 0
      ) {
        preloadOverlays.forEach(handleAddOverlay);
      }
    }
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

  if (!availability) {
    return <div />;
  }

  const paddingCandles = config?.defaults?.paddingCandles || 0;
  const paddingSeconds =
    paddingCandles * +SecondsFromTimeframe[selectedInterval]; //TODO ENUM PADDING FROM TIMEFRAME
  const paddingTS =
    paddingCandles && new Date().getTime() + paddingSeconds * 1000;

  // console.log("Date", new Date().getTime()); //TODO ADD PADDING
  // console.log("paddingTS", paddingTS); //TODO

  return (
    <FullScreenWrapper>
      {({ handle, isIOS }) => (
        <>
          <div className="flex gap-2 items-center">
            {(config.toolbar?.timeframe ||
              config.toolbar?.indicators ||
              config.toolbar?.typeSelector) && (
              <Toolbar
                handle={handle}
                isIOS={isIOS}
                config={config}
                intervals={intervals}
                ranges={ranges}
                onSelectInterval={(value) => {
                  setFirstLoad(true);
                  setEndDate(new Date());
                  setData([]);
                  setSelectedInterval(value);
                  setIsEnd(false);
                  setSelectedRange(null);
                }}
                selectedInterval={selectedInterval}
                selectedChart={selectedChartType}
                onSelectChart={setSelectedChartType}
                hasChartTypeSelection
                indicators={indicators}
                onSelectIndicators={handleSelectIndicator}
                selectedRange={selectedRange}
                onSelectedRange={(value) => {
                  const newInterval = RangeFromTimeframe[value] || "5m";
                  setSelectedRange(value);
                  setSelectedInterval(newInterval);
                  setFirstLoad(true);
                  setEndDate(new Date());
                  setData([]);
                  setIsEnd(false);
                }}
              />
            )}
          </div>
          <div className="relative h-full">
            {data.length > 0 && (
              <Chart
                title={title}
                data={sampleOHLCV}
                markers={[]}
                chartType={selectedChartType}
                onRangeChange={handleRangeChange}
                rangeLimit={
                  selectedRange
                    ? +RangeLimitEnum[selectedRange]
                    : DEFAULT_RANGE_LIMIT
                }
                chartX={chartX}
                setChart={setChart}
                onchart={indicators}
                indicatorsList={resolvedIndicators}
                // overlaysList={resolvedOverlays}
                paddingTS={paddingTS}
              />
            )}
            {isLoading && (
              <div
                className="absolute z-2 top-0 h-full w-full"
                style={{ minWidth: "500px" }}
              >
                <div>Loading</div>
              </div>
            )}
            {!data.length && !isLoading && !firstLoad && <div>No data</div>}
          </div>
        </>
      )}
    </FullScreenWrapper>
  );
});

export default TokenChart;
