import * as talib from 'talib-web';
import ColorsEnum from '../../theme/colors';
import { ChartType, IConfig } from '../../../../types'; // import from 'tradex-chart';

export const CANDLE_THEME = {
  AreaLineColour: '#4c5fe7',
  AreaFillColour: ['#4c5fe780', '#4c5fe700'],

  UpBodyColour: ColorsEnum.Green,
  UpWickColour: ColorsEnum.Green,
  DnBodyColour: ColorsEnum.Primary,
  DnWickColour: ColorsEnum.Primary
};
export interface IConfigExtended {
  type?: ChartType;
  initialTitle?: string;
  defaultTitle?: string;
  initialSymbol?: string;
  rangeLimit?: number;
  isLightTheme?: boolean;
  timeFrame?: string;
  initialFetchTime?: number;
}

const LIMIT = 100;
const TIME: { [key: string]: number } = {
  sec: 1000,
  min: 60 * 1000,
  hour: 60 * 60 * 1000,
  day: 24 * 60 * 60 * 1000,
  week: 7 * 24 * 60 * 60 * 1000,
  month: 30 * 24 * 60 * 60 * 1000
};
const FACTOR = {
  '1m': LIMIT * TIME.min,
  '5m': (LIMIT * TIME.hour) / 12,
  '10m': (LIMIT * TIME.hour) / 6,
  '15m': (LIMIT * TIME.hour) / 4,
  '30m': (LIMIT * TIME.hour) / 2,
  '1h': LIMIT * TIME.hour,
  '4h': (LIMIT * TIME.day) / 6,
  '12h': (LIMIT * TIME.day) / 2,
  '1d': LIMIT * TIME.day,
  '1w': LIMIT * TIME.week,
  '1M': LIMIT * TIME.month
};

const getConfig = ({
  type = 'candle_solid',
  initialTitle = 'BTCUSDT',
  initialSymbol = 'BTCUSDT',
  rangeLimit = 96,
  isLightTheme = false,
  timeFrame = '1m',
  initialFetchTime = Math.trunc(Date.now() / 1000) * 1000 - FACTOR['1m']
}: IConfigExtended = {}): IConfig => {
  return {
    id: 'TradeX_test',
    title: initialTitle,
    symbol: initialSymbol,
    timeFrame: timeFrame,
    utils: {},

    theme: {
      candle: {
        ...CANDLE_THEME,
        Type: type
      },
      volume: {
        Height: 15,
        UpColour: '#4bc67c',
        DnColour: '#2e384f'
      },
      xAxis: {
        colourTick: '#6a6f80',
        colourLabel: '#6a6f80',
        colourCursor: '#2A2B3A',
        colourCursorBG: '#aac0f7',
        slider: '#586ea6',
        handle: '#586ea688',
        tickMarker: false
      },
      yAxis: {
        colourTick: '#6a6f80',
        colourLabel: '#6a6f80',
        colourCursor: '#2A2B3A',
        colourCursorBG: '#aac0f7',
        tickMarker: false,
        location: 'right',
        slider: '#586ea6',
        handle: '#586ea688'
      },
      chart: {
        Background: '#0f121300',
        BorderColour: '#00000000',
        BorderThickness: 1,
        GridColour: isLightTheme
          ? ColorsEnum.SelectorLight
          : ColorsEnum.Selector,
        TextColour: '#6a6f80'
      },
      onChart: {},
      offChart: {},
      time: {
        navigation: false,
        colour: '#96a9db',
        handleColour: '#586ea6'
      },
      legend: {
        colour: '#96a9db',
        controls: true
      },
      icon: {
        colour: '#748bc7',
        hover: '#96a9db'
      },
      tools: {
        location: false
      },
      utils: {
        location: false
      }
    },
    watermark: {
      display: false,
      text: ''
    },

    dca: true,
    highLow: true,
    isCrypto: true,
    logs: true,
    infos: true,
    warnings: true,
    errors: true,
    stream: {
      tfCountDown: true,
      alerts: []
    },
    maxCandleUpdate: 250,
    talib: talib,
    state: {}, // EMPTY
    progress: { loading: {} },
    callbacks: {
      indicatorSettings: {
        fn: (c: { id: any }) => {
          alert(c.id);
        },
        own: true
      }
    },
    deepValidate: false,
    status: 'default',
    isEmpty: true,
    allData: {},
    chart: {
      name: 'Primary',
      type: 'candles',
      candleType: type,
      indexed: false,
      data: [],
      settings: {}
    },
    ohlcv: [],
    inventory: [],
    primary: [],
    secondary: [],
    datasets: [],
    tools: {
      display: true,
      data: {
        ts: {}
      }
    },
    trades: {
      display: true,
      displayInfo: true,
      data: {
        ts: {}
      }
    },
    events: {
      display: true,
      displayInfo: true,
      data: {
        ts: {}
      }
    },
    annotations: {
      display: true,
      displayInfo: true,
      data: {
        ts: {}
      }
    },
    range: {
      intervalStr: timeFrame,
      timeFrame: timeFrame,
      interval: TIME[timeFrame],
      timeFrameMS: TIME[timeFrame],
      startTS: initialFetchTime,
      initialCnt: rangeLimit,
      limitFuture: rangeLimit,
      limitPast: rangeLimit,
      minCandles: rangeLimit/8,
      maxCandles: rangeLimit*8,
      yAxisBounds: 0.3,
      center: false
    },
    wasm: `${process.env.NEXT_PUBLIC_SITE_URL}/talib.wasm`
  };
};

export default getConfig;
