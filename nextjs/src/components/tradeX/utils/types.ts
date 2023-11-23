import { Indicator } from "tradex-chart";
import { ReactNode } from "react";
import { ChartResolutionEnum } from "./enums";
import { ColorsEnum } from "../../theme/";

export type ChartType = "area" | "candle_solid";

export interface IChartOption {
  id: number;
  label: string;
  value: ChartType;
  icon: ReactNode;
}

export interface IOverlay {
  [key: string]: {
    class: unknown;
    location: string;
  };
}

export interface ITradeX extends HTMLElement {
  setCustomOverlays(overlaysList: IOverlay[]): unknown;
  setTitle(title: string): unknown;
  Indicators?: { [key: string]: unknown }[];
  theme?: { setProperty: (property: string, value: any) => void };
  start?: (config: object) => void;
  setIndicators?: (indicators: {
    [key: string]: {
      id: string;
      name: string;
      event: string;
      ind: typeof Indicator;
    };
  }) => void;
  mergeData?: (data: { ohlcv: number[] }) => void;
  on?: (eventName: string, callback: (e: unknown) => void) => void;
}

export interface IIndicatorOption {
  id: number;
  name: string;
  value: string;
  isD2T?: boolean;
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
  sup_or_res: "S" | "R";
}

export interface IIndicators {
  [key: string]: {
    id: string;
    name: string;
    event: "addIndicator";
    ind: unknown;
    offChart?: boolean;
    customSettings?: {
      selectLabel?: string;
      inputsBaseProps?: {
        colours?: ColorsEnum[];
        labels?: boolean[];
      };
      legendInputs?: string[];
      values?: any;
    };
  };
}

export interface IToolbar {
  timeframe: boolean;
  range: boolean;
  indicators: boolean;
  typeSelector: boolean;
  fullscreenButton: boolean;
}

export interface IPreloadIndicator {
  name: string;
  value: string;
  customSettings?: any;
}

export interface IConfig {
  title?: string;
  toolbar?: IToolbar;
  defaults?: {
    paddingCandles?: number;
    availability?: IAvailability;
    timeframe?: string;
    ranges?: string[];
    chartType?: IChartOption;
    availableIndicators?: string[];
    preloadIndicators?: IPreloadIndicator[];
    availableOverlays: string[];
    preloadOverlays: IOverlay[];
  };
  indicatorData?: {
    level?: any; // TODO
    ranges?: any; // TODO
  };
  trades: {
    display: boolean;
    displayInfo: boolean;
  };
}
export interface IAvailability {
  pair_id: number;
  target: string;
  base: string;
  timeframes: string[];
}
