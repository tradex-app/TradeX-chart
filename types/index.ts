export interface ITradeX extends HTMLElement {
  range: any;
  indicatorClasses: () => string[];
  stream: any;
  Indicators?: { [key: string]: unknown }[];
  theme?: {
    setProperty: (
      property: 'chart.GridColour' | 'candle.Type',
      value: any
    ) => void;
  };
  start?: (config: object) => void;
  setIndicators?: (indicators: IIndicators) => void;
  mergeData?: (data: { ohlcv: number[] }) => void;
  on?: (eventName: string, callback: (e: unknown) => void) => void;
  expunge?: () => void;
  refresh?: () => void;
  state: {
    value: any;
    delete: (key: string) => boolean;
    key: string;
    list: () => IState[];
    create: (state: IState | string | undefined) => IState;
    use: (state: IState | string | undefined) => IState;
  };
  addIndicator: (
    value: string,
    name: string,
    options: { data: number[]; settings: { custom: any } }
  ) => void;
  removeIndicator: (indicatorId: string) => void;
}

export abstract class Indicator {
  static inCnt: number;
  static primaryPane: boolean;
  static scale: string; // TODO: Ccheck
  static colours: string[];
  static defaultStyle: IndicatorStyle;

  // id: string;
  // shortName: string;
  // scaleOverlay: boolean;
  // definition: IndicatorDefinition;

  protected data: any[] | undefined; // TODO
  protected scene: any; // TODO
  protected xAxis: any; // TODO
  protected yAxis: any; // TODO
  protected style: IndicatorStyle | undefined;
  protected core: any;
  protected state: any; // TODO
  protected range: Range | undefined;

  // constructor(
  //   target: any, // TODO
  //   xAxis?: any, // TODO
  //   yAxis?: any, // TODO
  //   config?: any, // TODO
  //   parent?: any, // TODO
  //   params?: any // TODO
  // );

  abstract init(): void;
  abstract calcIndicatorHistory(): boolean | any[];
  abstract calcIndicatorStream(
    indicator: any,
    params?: any,
    range?: Range
  ): boolean | any[];
  abstract draw(range?: Range): void;

  // protected plot(plots: any[], method: string, options: any): void;
  // protected dataProxy(callback: Function, data: any): void;
  // on(event: string, handler: Function): void;
  // mustUpdate(): boolean;
  // updated(): void;
}

export interface IndicatorStyle {
  [key: string]: {
    colour: { value: string };
  };
}

export interface IndicatorDefinition {
  output: {
    [key: string]: any[];
  };
  meta: {
    output: Array<{
      name: string;
      type: string;
      plot: string;
    }>;
    outputLegend: {
      [key: string]: {
        labelStr: string;
        label: boolean;
        value: boolean;
      };
    };
  };
}

export interface IIndicator {
  id: string;
  name: string;
  event: 'addIndicator';
  ind: unknown;
  offChart?: boolean;
  customSettings?: {
    selectLabel?: string;
    inputsBaseProps?: {
      colours?: string[];
      labels?: boolean[];
    };
    legendInputs?: string[];
    values?: any;
  };
}
export interface IIndicators {
  [key: string]: IIndicator;
}

export interface ITradeData {
  name: string;
  type: string;
  settings: { 'z-index': number; legend: boolean };
  data: {
    [key: string]: {
      timestamp: number;
      id: string;
      side: string;
      price: number;
      amount: number;
      filled: number;
      average: number;
      total: number;
      tag: string;
    }[];
  };
}

export interface IState {
  value: any;
  version: string; // packageJSON.version
  id: string;
  key: string;
  status: string;
  isEmpty: boolean;
  allData: Record<string, any>; // TODO
  chart: any; // TODO
  ohlcv: any[];
  views: any[];
  primary: any[];
  secondary: any[];
  datasets: any[];
  tools: Tools;
  trades: Trades;
  events: Events;
  annotations: Annotations;
  range: Range;
}

interface Tools {
  display: boolean;
  data: {
    ts: Record<string, any>; // TODO
  };
}

interface Trades extends Tools {
  displayInfo: boolean;
}

interface Events extends Tools {
  displayInfo: boolean;
}

interface Annotations extends Tools {
  displayInfo: boolean;
}

export interface Canvas {
  [key: string]: (...args: any[]) => any;
}

export type ChartType = 'area' | 'candle_solid';

export type YAXIS_TYPES = {
  LINEAR: string;
  LOG: string;
  RELATIVE: string;
};

export type YAXIS_PADDING = number;

export interface Range {
  start: number;
  end: number;
  value: () => number[];
  getTimeIndex: (timestamp: number) => number;
  indexStart: number;
  indexEnd: number;
  timeMax: number;
  timeMin: number;
  Length: number;
  timeFrameMS: number;
  secondaryMaxMin?: { [key: string]: { [key: string]: number } };
}

export type talibAPI = {
  [key: string]: any; // TODO: Define talib types
};

export type utils = {
  [key: string]: any; // TODO: Define utils types
};

export interface RangeConfig {
  intervalStr: string;
  timeFrame: string;
  interval: number;
  timeFrameMS: number;
  startTS: number;
  initialCnt: number;
  limitPast: number;
  limitFuture: number;
  minCandles: number;
  maxCandles: number;
  yAxisBounds: number;
  center: boolean;
}

export interface TradesConfig {
  display: boolean;
  displayInfo: boolean;
  data: {
    ts: {};
  };
}

export type IndicatorSettingsCallback = {
  fn: (c: { id: any }) => void;
  own: boolean;
};

export interface IConfig {
  id: string;
  title: string;
  timeFrame: string;
  symbol: string;
  utils: object;
  range: RangeConfig;
  theme: Theme;
  watermark: {
    display: boolean;
    text: string;
  };
  trades: TradesConfig;
  deepValidate: boolean;
  status: string;
  isEmpty: boolean;
  allData: object;
  isCrypto: boolean;
  logs: boolean;
  dca: boolean;
  highLow: boolean;
  stream: {
    tfCountDown: boolean;
    alerts: any[];
  };
  state: IState | {};
  chart: {
    name: 'Primary' | 'Secondary';
    type: 'candles';
    candleType: ChartType;
    indexed: boolean;
    data: [];
    settings: {};
  };
  ohlcv: any[];
  inventory: any[];
  events: {
    display: boolean;
    displayInfo: boolean;
    data: {
      ts: {};
    };
  };
  annotations: {
    display: boolean;
    displayInfo: boolean;
    data: {
      ts: {};
    };
  };
  primary: any[];
  secondary: any[];
  datasets: any[];
  tools: Tools;
  progress: { loading: {} };
  callbacks: {
    indicatorSettings: IndicatorSettingsCallback;
  };
  infos: boolean;
  warnings: boolean;
  errors: boolean;
  maxCandleUpdate: number;
  talib: any; // TODO
  wasm: string;
}

// THEMES //

export interface CandleTheme {
  AreaLineColour: string;
  AreaFillColour: string[];
  UpBodyColour: string;
  UpWickColour: string;
  DnBodyColour: string;
  DnWickColour: string;
  Type?: string;
}

export interface VolumeTheme {
  Height: number;
  UpColour: string;
  DnColour: string;
}

export interface AxisTheme {
  colourTick: string;
  colourLabel: string;
  colourCursor: string;
  colourCursorBG: string;
  slider: string;
  handle: string;
  tickMarker: boolean;
  location?: string;
}

export interface ChartTheme {
  Background: string;
  BorderColour: string;
  BorderThickness: number;
  GridColour: string;
  TextColour: string;
}

export interface TimeTheme {
  navigation: boolean;
  colour: string;
  handleColour: string;
}

export interface LegendTheme {
  colour: string;
  controls: boolean;
}

export interface IconTheme {
  colour: string;
  hover: string;
}

export interface Theme {
  candle: CandleTheme;
  volume: VolumeTheme;
  xAxis: AxisTheme;
  yAxis: AxisTheme;
  chart: ChartTheme;
  onChart: object;
  offChart: object;
  time: TimeTheme;
  legend: LegendTheme;
  icon: IconTheme;
  tools: {
    location: boolean;
  };
  utils: {
    location: boolean;
  };
}
