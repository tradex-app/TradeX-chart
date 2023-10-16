import { Indicator } from "../../../../../demo/tradex-chart.es";
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

export interface ITradeX extends HTMLElement {
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

export interface ICustomIndicators {
  [key: string]: {
    id: string;
    name: string;
    event: "addIndicator";
    ind: any;
    offChart?: boolean;
    customSettings?: {
      selectLabel?: string;
      inputsBaseProps?: {
        colours?: ColorsEnum[];
        labels?: boolean[];
      };
      legendInputs?: string[];
    };
  };
}
