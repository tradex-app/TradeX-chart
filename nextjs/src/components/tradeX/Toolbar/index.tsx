import IntervalsFilter from "./IntervalsFilter";
import IndicatorDropdown from "./IndicatorDropdown";
import { CHART_OPTIONS } from "../utils";
import Switch from "../../Switch";
import FunctionSVG from "./assets/function.svg";
import CandleSVG from "./assets/candlestick.svg";
import CalendarSVG from "./assets/calendar.svg";
import FullScreenButton from "../../FullScreen/FullScreenButton";

const Toolbar = ({
  handle,
  isIOS,
  config,
  intervals,
  ranges,
  selectedInterval,
  onSelectInterval,
  selectedRange,
  onSelectedRange,
  hasChartTypeSelection = false,
  selectedChart,
  onSelectChart,
  indicators,
  onSelectIndicators,
}) => {
  const handleTimeframeClick = (value) => {
    onSelectInterval(value);
  };

  const handleRangeClick = (value) => {
    onSelectedRange(value);
  };

  return (
    <div className="flex items-center gap-2 flex-wrap grow justify-between">
      <div className="flex flex-wrap gap-[inherit]">
        {config.toolbar?.timeframe && (
          <IntervalsFilter
            active={selectedInterval}
            onChangeInterval={handleTimeframeClick}
            intervals={intervals}
            icon={CandleSVG}
          />
        )}

        {config.toolbar?.range && (
          <IntervalsFilter
            active={selectedRange}
            onChangeInterval={handleRangeClick}
            intervals={ranges}
            icon={CalendarSVG}
          />
        )}

        {config.toolbar?.indicators && (
          <IndicatorDropdown
            indicators={config.defaults.availableIndicators}
            onChange={onSelectIndicators}
            icon={FunctionSVG}
          />
        )}
      </div>
      <div className="flex flex-wrap gap-[inherit]">
        {config.toolbar?.typeSelector && hasChartTypeSelection && (
          <Switch
            items={CHART_OPTIONS}
            value={selectedChart}
            onChange={onSelectChart}
            fontSize="text-xs"
            variant="primary"
          />
        )}
        {config.toolbar?.fullscreenButton && (
          <FullScreenButton handle={handle} isIOS={isIOS} />
        )}
      </div>
    </div>
  );
};

export default Toolbar;
