import IntervalDropdown from './IntervalDropdown';
import { CHART_OPTIONS } from '../utils';
import ChartTypeSwitch from './ChartTypeSwitch';
import TokensDropdown from './TokensDrowpdown';
import IndicatorDropdown from './IndicatorDropdown';
import { ThemeToggle } from '@/components/theme-toggle';

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
  tokensList,
  selectedToken,
  onSelectToken
}: any) => {
  return (
    <div className="flex flex-row flex-grow mb-2">
      <div className="flex flex-row gap-2">
        {tokensList.length > 0 && (
          <TokensDropdown
            tokensList={tokensList}
            value={selectedToken}
            setValue={onSelectToken}
          />
        )}

        {config.toolbar?.timeframe && (
          <IntervalDropdown
            interval={selectedInterval}
            setValue={onSelectInterval}
            styles="w-fit"
            intervals={intervals}
          />
        )}

        {config.toolbar?.indicators && (
          <IndicatorDropdown
            indicators={indicators}
            setValue={onSelectIndicators}
          />
        )}
      </div>

      <div className="flex justify-end pl-2">
        {config.toolbar?.typeSelector && hasChartTypeSelection && (
          <ChartTypeSwitch
            items={CHART_OPTIONS}
            value={selectedChart}
            onChange={onSelectChart}
          />
        )}
      </div>
      <div className="pr-2 mr-2">
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Toolbar;
