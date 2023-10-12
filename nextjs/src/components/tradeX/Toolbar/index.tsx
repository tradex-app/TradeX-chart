import IntervalsFilter from "./IntervalsFilter";
import IndicatorDropdown from "./IndicatorDropdown";
import { CHART_OPTIONS } from "../utils";
import Switch from "../../theme/Switch";

const Toolbar = ({
  config,
  intervals,
  selectedInterval,
  onSelectInterval,
  hasChartTypeSelection = false,
  selectedChart,
  onSelectChart,
  indicators,
  onSelectIndicators,
}) => {
  return (
    <div className="flex items-center gap-2 flex-wrap grow justify-between">
      <div className="flex flex-wrap gap-[inherit]">
        {config.toolbar?.timeframe && (
          <IntervalsFilter
            interval={selectedInterval}
            onChangeInterval={onSelectInterval}
            styles="w-fit"
            intervals={intervals}
          />
        )}

        {config.toolbar?.indicators && (
          <IndicatorDropdown indicators={config.availableIndicators} value={indicators} onChange={onSelectIndicators} />
        )}
      </div>

      <div>
        {config.toolbar?.typeSelector && hasChartTypeSelection && (
          <Switch
            items={CHART_OPTIONS}
            value={selectedChart}
            onChange={onSelectChart}
            fontSize="text-xs"
            variant="primary"
          />
        )}
      </div>
    </div>
  );
};

export default Toolbar;
