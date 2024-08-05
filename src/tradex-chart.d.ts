declare module 'tradex-chart' {

  const ThemeProps = [
    'chart.GridColour',
    'candle.Type',
  ] as const;
  export type PropsEnum = typeof ThemeProps[number];

  export abstract class Indicator {
    static inCnt: number;
    static primaryPane: boolean;
    static scale: string; // TODO: Ccheck
    static colours: string[];
    static defaultStyle: IndicatorStyle;
    
    id: string;
    shortName: string;
    scaleOverlay: boolean;
    definition: IndicatorDefinition;

    protected data: any[]; // TODO
    protected scene: any; // TODO
    protected xAxis: any; // TODO
    protected yAxis: any; // TODO
    protected style: IndicatorStyle;
    protected core: any;
    protected state: any; // TODO
    protected range: Range;

    constructor(
      target: any, // TODO
      xAxis?: any, // TODO
      yAxis?: any, // TODO
      config?: any, // TODO
      parent?: any, // TODO
      params?: any // TODO
    );

    abstract init(): void;
    abstract calcIndicatorHistory(): boolean | any[];
    abstract calcIndicatorStream(indicator: any, params?: any, range?: Range): boolean | any[];
    abstract draw(range?: Range): void;

    protected plot(plots: any[], method: string, options: any): void;
    protected dataProxy(callback: Function, data: any): void;
    on(event: string, handler: Function): void;
    mustUpdate(): boolean;
    updated(): void;
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
    value?: string;
    name: string;
    type?: string;
    data?: number[];
    settings?: object;
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
        colours?: ColorsEnum[];
        labels?: boolean[];
      };
      legendInputs?: string[];
      values?: any;
    };
  }
  export interface IIndicators {
    [key: string]: IIndicator;
  }

  export interface IState {
    chart?: {
      type: string;
      candleType: string;
    };
    candleType?: string;
    type?: string;
    data: number[][];
    primary: IIndicator[];
  }

  export interface ITradeX extends HTMLElement {
    Indicators?: { [key: string]: unknown }[];
    theme?: { setProperty: (property: PropsEnum, value: any) => void };
    start?: (config: object) => void;
    setIndicators?: (indicators: IIndicators) => void;
    mergeData?: (data: { ohlcv: number[] }) => void;
    on?: (eventName: string, callback: (e: unknown) => void) => void;
    expunge?: () => void;
    refresh?: () => void;
    state: {
      create: (state: IState) => string;
      use: (id: string) => void;
    };
    addIndicator: (
      value: string,
      name: string,
      options: { data: number[]; settings: { custom: any } }
    ) => void;
    removeIndicator: (indicatorId: string) => void;
  }

  export interface canvas {
    [key: string]: function;
  }

  export type ChartType = "area" | "candle_solid";

  export const YAXIS_TYPES: {
    LINEAR: string;
    LOG: string;
  };

  export const YAXIS_PADDING: number;

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

  export const talibAPI: {
    [key: string]: any; // TODO: Define talib types
  };

  export const utils: {
    [key: string]: any; // TODO: Define utils types
  };

  export function uid(tag?: string = "ID"): string;

  export interface IProps {
    title: string;
    data: number[][];
    tradeData?: any;
    chartType?:  ChartType;
    rangeLimit?: number;
    onchart: { name: string; value: string; data?: number[] }[];
    chartAccessor?: string;
    customIndicators?: IIndicators;
    chartX: ITradeX;
    setChart: (chart: ITradeX) => void;
    onRangeChange?: () => void;
  }

  export function candleW(w: number): number;


  export interface RangeConfig {
    initialCnt: number;
    limitPast: number;
    limitFuture: number;
  }
  
  export interface TradesConfig {
    display: boolean;
    displayInfo: boolean;
  }


  export interface IConfig {
    title: string;
    symbol: string;
    utils: object;
    tools: object;
    range: RangeConfig;
    theme: Theme;
    trades: TradesConfig;
    deepValidate: boolean;
    isCrypto: boolean;
    logs: boolean;
    infos: boolean;
    warnings: boolean;
    errors: boolean;
    maxCandleUpdate: number;
    talib: typeof talib;
    wasm: string;
  }



  ////// THEMES //////

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

}
