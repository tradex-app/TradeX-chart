import { ChartType, IConfig } from '../../../../types';
import { ChartResolutionEnum } from './enums';

export interface IChartOption {
  id: number;
  label: string;
  value: ChartType;
  info?: string;
  icon?: any;
}

export interface IIndicatorOption {
  id: number;
  name: string;
  value: string;
  isCustom?: boolean;
  data?: number[];
}

export interface IInterval {
  id: ChartResolutionEnum;
  value: ChartResolutionEnum;
}

export interface ITechnicalIndicator {
  indicator: string;
  values: { [resolution: string]: number };
}

export interface ILevelIndicator extends ITechnicalIndicator {
  sup_or_res: 'S' | 'R';
}

export interface ITokenChartProps extends IConfig {
  toolbar?: ToolbarConfig;
  defaults?: {
    timeframe?: string;
    chartType?: IChartOption;
    showTradeData?: boolean;
  };
}

export interface IIndicatorToolbar {
  label: string;
  value: string;
  tooltip: string;
}

export interface IStatesToolbar {
  label: string;
  value: string;
  selected: boolean;
}

export interface ToolbarConfig {
  intervals: string[];
  timeframe: boolean;
  indicators: boolean;
  states: boolean;
  typeSelector: boolean;
  fullscreenButton: boolean;
  themeSwitcher: boolean;
}
