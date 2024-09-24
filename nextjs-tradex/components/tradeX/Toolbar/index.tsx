import IntervalDropdown from './IntervalDropdown';
import { CHART_OPTIONS } from '../utils';
import ChartTypeSwitch from './ChartTypeSwitch';
import TokensDropdown from './TokensDropdown';
import IndicatorDropdown from './IndicatorDropdown';
import { ThemeToggle } from '@/components/theme-toggle';
import { IChartOption, IIndicatorToolbar } from '../utils/types';
import StateDropdown from './StateDropdown';
import { PrintState } from './Buttons';

const Toolbar = ({
  config,
  intervals,
  selectedInterval,
  selectedChart,
  indicators,
  tokensList,
  selectedToken,
  onSelectIndicators,
  onSelectChart,
  onSelectToken,
  onSelectInterval
}: {
  config: any;
  intervals: string[];
  selectedInterval: string;
  selectedChart: IChartOption;
  indicators?: IIndicatorToolbar[];
  tokensList: any[];
  selectedToken: string;
  onSelectIndicators: (value: any) => void;
  onSelectChart: (value: IChartOption) => void;
  onSelectToken: (value: string) => void;
  onSelectInterval: (value: string) => void;
}) => {
  return (
    <div className="flex flex-row flex-grow mb-2 items-center">
      <div className="flex flex-row gap-2 items-center">
        {tokensList.length > 0 && (
          <TokensDropdown
            tokensList={tokensList}
            value={selectedToken}
            setValue={onSelectToken}
          />
        )}

        {config?.timeframe && (
          <IntervalDropdown
            interval={selectedInterval}
            setValue={onSelectInterval}
            styles="w-fit"
            intervals={intervals}
          />
        )}

        {config?.indicators && (
          <IndicatorDropdown
            indicators={indicators}
            setValue={onSelectIndicators}
          />
        )}

        {config?.states && <StateDropdown />}
      </div>
      <PrintState key="printState" />
      <div className="flex justify-end pl-2 items-center">
        {config?.typeSelector && (
          <ChartTypeSwitch
            items={CHART_OPTIONS}
            value={selectedChart}
            onChange={onSelectChart}
          />
        )}
      </div>
      {config?.themeSwitcher && (
        <div className="pr-2 mr-2">
          <ThemeToggle />
        </div>
      )}
    </div>
  );
};

export default Toolbar;
