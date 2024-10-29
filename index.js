import { Chart, DOM } from './src'
import { LIMITFUTURE, LIMITPAST, MINCANDLES, MAXCANDLES, YAXIS_BOUNDS } from "./src/definitions/chart"
import * as talib from './node_modules/talib-web/lib/index.esm'

// let state = undefined
import state1 from './data/1hour.js'
import state2 from './data/data_btc_1m.js'
import state3 from './data/ohlcv_15m_BTC.js'
import decimals from './data/ohlcv_1d_IMPT'
import btcusdt_15min from './data/btcusdt_15min'
// import state4 from './data/seconds.js'
// import state from './data/seconds-indicator'
import tradesTestState from './data/trades-test-state.js'

import TEST from './custom-indicator'
import DblMA from './custom-dbl-ma.js'
import DblMA2 from './custom-dbl-ma2.js'
import CustomOverlay from './custom-overlay'
import chartDCA from './chart-dca'
import TradeFlow from './trade-flow.js'


const wasm = "node_modules/talib-web/lib/talib.wasm"

import bearHawk from './data/bear-hawk.js'
import { text } from './src/definitions/icons.js'
import { loadStates } from './demo/js/loadStates.js'
import { loadTimeFrame } from './demo/js/loadTimeFrame.js'

// build a split state to test all merge features
const state1_5a = {primary:[], secondary:[]}
const state1_5b = {primary:[], secondary:[]}
let l = state1.ohlcv.length
state1_5a.ohlcv = state1.ohlcv.slice(0,l/2)
state1_5b.ohlcv = state1.ohlcv.slice(l/2)

const exclude = ["trades","events","drawings","annotations","hiLo"]
// split the indicators
for (let p of state1.primary) {
  if (exclude.includes(p.type)) continue

  let l = p.data.length
  let pra = {
    name: p.name,
    type: p.type,
    settings: p.settings
  }
  let prb = {...pra}

  pra.data = p.data.slice(0,l/2)
  prb.data = p.data.slice(l/2)
  state1_5a.primary.push(pra)
  state1_5b.primary.push(prb)
}

for (let p of state1.secondary) {
  let l = p.data.length
  let pra = {
    name: p.name,
    type: p.type,
    settings: p.settings
  }
  let prb = {...pra}

  pra.data = p.data.slice(0,l/2)
  prb.data = p.data.slice(l/2)
  state1_5a.secondary.push(pra)
  state1_5b.secondary.push(prb)
}

let state4 = {
  "ohlcv": [
      [
          1663333201000,
          19139.4,
          19139.6,
          19179.6,
          19179.63478779,
          441.1
      ],
      [
          1663333202000,
          19182.2,
          19182.2,
          19120.2,
          19133.5,
          445.2
      ],
      [
          1663333203000,
          19134.2,
          19182.2,
          19120.2,
          19133.5,
          434.3
      ]
  ],
primary: [
  {
    "name": "SMA, 5",
    "type": "SMA",
    "data": [],
    "settings": {timePeriod: 5}
  }
],
"secondary": [
  {
    "name": "RSI, 20",
    "type": "RSI",
    "data": [],
    "settings": {timePeriod: 20}
  },
]
}

let state5 = {
  "ohlcv": [],
  "primary": [
    {
      "name": "EMA, 25",
      "type": "EMA",
      "data": [],
      "settings": {timePeriod: 25}
  },
  {
      "name": "EMA, 43",
      "type": "EMA",
      "data": [],
      "settings": {timePeriod: 43}
  },
  ],
  "secondary": [
    {
      "name": "RSI, 20",
      "type": "RSI",
      "data": [],
      "settings": {timePeriod: 20}
    }
  ]
}
let state9 = {
  "ohlcv": [

  ],
primary: [
  {
    "name": "SMA, 5",
    "type": "SMA",
    "data": [],
    "settings": {timePeriod: 5}
  }
],
"secondary": [
  {
    "name": "RSI, 20",
    "type": "RSI",
    "data": [],
    "settings": {timePeriod: 20}
  },
]
}

// let rangeStartTS = 1558429200000 // 21/05/2019, 11:00:00 - 1 hour price
// let rangeStartTS = 1663059600000 // seconds price
let rangeStartTS = undefined
let streamVal = {
  tfCountDown: true,
  alerts: []
}
let interval = 500
let streamInit = false

const config1 = {
  // id: "TradeX_test",
  title: "BTC/USDT",
  symbol: "btcusdt",
  // width: 600,
  // height: 500,
  utils: {},
  tools: {},
  timeFrame: "1m",
  range: {
    startTS: rangeStartTS, // state1.ohlcv.slice(-1)[0][0],
    initialCnt: 40,
    limitFuture: LIMITFUTURE,
    limitPast: LIMITPAST,
    minCandles: MINCANDLES,
    maxCandles: MAXCANDLES,
    yAxisBounds: 0.3,
    center: false
  },
  theme: {
    candle: {
      Type: "candle_down_hollow",
      UpBodyColour: "#FAEB2488",
      UpWickColour: "#FAEB24",
      DnBodyColour: "#F900FE88",
      DnWickColour: "#F900FE",
    },
    volume: {
      Height: 15,
      UpColour: "#FAEB2444",
      DnColour: "#F900FE44",
    },
    xAxis: {
      tickMarker: false,
    },
    yAxis: {
      tickMarker: false,
    },
    chart: {
      Background: "#141414",
      BorderColour: "#141414",
      GridColour: "#303030",
      TextColour: "#c0c0c0"
    },
    primaryPane: {

    },
    tools: {
      location: false
    },
    utils: {
      location: false
    },
    time: {
      navigation: false
    },
    legend: {
       controls: true
    }
  },
  watermark: {
    display: true,
    text: "BTC/USDT"
  },
  trades: { 
      display: true,
      displayInfo: true 
    },
  dca: true,
  highLow: true,
  isCrypto: true,
  logs: true,
  infos: true,
  warnings: true,
  errors: true,
  stream: streamVal,
  maxCandleUpdate: 250,
  talib: talib,
  wasm: wasm,
  state: state1,
  callbacks: {
    indicatorSettings: {fn: (c)=>{ alert(c.id) }, own: true}
  }
}
window.config1 = config1

const config2 = {
  id: "TradeX_test",
  title: "BTC/USDT",
  symbol: "btcusdt",
  // width: 1000,
  // height: 800,
  utils: {},
  tools: {},
  timeFrame: "1m",
  // range: {
  //   startTS: state2.ohlcv.slice(-15)[0][0], // rangeStartTS,
  // },
  theme: {
    title: {
      display: true,
    },
    candle: {
      Type: "candle_solid",
      UpBodyColour: "#00F04088",
      UpWickColour: "#0F4",
      DnBodyColour: "#F0004088",
      DnWickColour: "#F04",
    },
    volume: {
      Height: 15,
      UpColour: "#00F04044",
      DnColour: "#F0004044",
    },
    chart: {
      Background: "#141414",
      BorderColour: "#444",
      GridColour: "#333",
      TextColour: "#ccc"
    },
    primaryPane: {

    },
    utils: {
      location: false
    },
  },
  isCrypto: true,
  logs: false,
  infos: true,
  warnings: true,
  highLow: true,
  errors: true,
  stream: streamVal,
  maxCandleUpdate: 250,
  talib: talib,
  wasm: wasm,
  state: state2,
  progress: {loading:{}}
}
window.config2 = config2

const config3 = {
  id: "TradeX_Blue",
  title: "BTC/USDT",
  symbol: "btcusdt",
  // width: 1000,
  // height: 800,
  utils: {},
  tools: {},
  timeFrame: "1m",
  range: {
    startTS: rangeStartTS,
    limitFuture: 10,
  },
  theme: {
    candle: {
      Type: "candle_solid",
      UpBodyColour: "#02FFFF88",
      UpWickColour: "#02FFFF",
      DnBodyColour: "#F900FE88",
      DnWickColour: "#F900FE",
    },
    volume: {
      Height: 15,
      UpColour: "#02FFFF44",
      DnColour: "#F900FE44",
    },
    xAxis: {
      colourTick: "#96a9db",
      colourLabel: "#96a9db",
      colourCursor: "#2A2B3A",
      colourCursorBG: "#aac0f7",
      // fontFamily: XAxisStyle.FONTFAMILY,
      // fontSize: XAxisStyle.FONTSIZE,
      // fontWeight: XAxisStyle.FONTWEIGHT,
      // line: "#656565"
      slider: "#586ea6",
      handle: "#586ea688",
    },
    yAxis: {
      colourTick: "#96a9db",
      colourLabel: "#96a9db",
      colourCursor: "#2A2B3A",
      colourCursorBG: "#aac0f7",
      // fontFamily: YAxisStyle.FONTFAMILY,
      // fontSize: YAxisStyle.FONTSIZE,
      // fontWeight: YAxisStyle.FONTWEIGHT,
      // line: "#656565"
    },
    chart: {
      Background: "#2A2B3A",
      BorderColour: "#586ea6",
      BorderThickness: 1,
      GridColour: "#313647",
      TextColour: "#96a9db"
    },
    primaryPane: {

    },
    secondaryPane: {

    },
    utils: {
      location: true
    },
    tools: {
      location: true
    },
    time: {
      // font: LegendStyle.font,
      colour: "#96a9db",
      handleColour: "#586ea6",
    },
    legend: {
      colour: "#96a9db",
    },
    icon: {
      colour: "#748bc7",
      hover: "#96a9db"
    }
  },
  isCrypto: true,
  logs: false,
  infos: true,
  warnings: true,
  highLow: true,
  errors: true,
  stream: streamVal,
  maxCandleUpdate: 250,
  talib: talib,
  wasm: wasm,
  state: {

  }
}
window.config3 = config3

const config4 = {
  id: "TradeX_test",
  title: "FUN/USDT",
  symbol: "funusdt",
  // width: 1000,
  // height: 800,
  utils: {},
  tools: {},
  timeFrame: "1s",
  range: {
    startTS: state4.ohlcv.slice(-1)[0][0] - (15000),
    initialCnt: 40
  },
  theme: {
    candle: {
      Type: "candle_down_hollow",
      AreaLineColour: "#08C5F5",

      UpBodyColour: "#08C5F588",
      UpWickColour: "#08C5F5",
      DnBodyColour: "#F6243888",
      DnWickColour: "#F62438",
    },
    volume: {
      Height: 15,
      UpColour: "#08C5F544",
      DnColour: "#0805F544",
    },
    xAxis: {
      tickMarker: false,
    },
    yAxis: {
      tickMarker: false,
      location:"left"
    },
    chart: {
      Background: "#141414",
      BorderColour: "#141414",
      GridColour: "#333",
      TextColour: "#ccc"
    },
    primaryPane: {

    },
    utils: {
      location: true
    },
  },
  isCrypto: true,
  logs: false,
  infos: true,
  warnings: true,
  highLow: true,
  errors: true,
  stream: {
    tfCountDown: false,
    alerts: []
  },
  maxCandleUpdate: 250,
  talib: talib,
  wasm: wasm,
  state: state4
}
window.config4 = config4

const config5 = {
  id: "Midnight",
  title: "ETH/USDT",
  symbol: "ethusdt",
  // width: 1000,
  // height: 800,
  utils: {},
  tools: {},
  timeFrame: "1m",
  range: {
    startTS: rangeStartTS,
  },
  theme: {
    candle: {
      Type: "area",
      AreaLineColour: "#4c5fe7",
      AreaFillColour: ["#4c5fe780", "#4c5fe700"],

      UpBodyColour: "#4c5fe7",
      UpWickColour: "#4c5fe7",
      DnBodyColour: "#4c5fe7",
      DnWickColour: "#4c5fe7",
    },
    volume: {
      Height: 15,
      UpColour: "#4bc67c",
      DnColour: "#2e384f",
    },
    xAxis: {
      colourTick: "#6a6f80",
      colourLabel: "#6a6f80",
      colourCursor: "#2A2B3A",
      colourCursorBG: "#aac0f7",
      // fontFamily: XAxisStyle.FONTFAMILY,
      // fontSize: XAxisStyle.FONTSIZE,
      // fontWeight: XAxisStyle.FONTWEIGHT,
      // line: "#656565"
      slider: "#586ea6",
      handle: "#586ea688",
      tickMarker: false,
    },
    yAxis: {
      colourTick: "#6a6f80",
      colourLabel: "#6a6f80",
      colourCursor: "#2A2B3A",
      colourCursorBG: "#aac0f7",
      // fontFamily: YAxisStyle.FONTFAMILY,
      // fontSize: YAxisStyle.FONTSIZE,
      // fontWeight: YAxisStyle.FONTWEIGHT,
      // line: "#656565"
      tickMarker: false,
      location:"left",
    },
    chart: {
      Background: "#0f1213",
      BorderColour: "#00000000",
      BorderThickness: 1,
      GridColour: "#191e26",
      TextColour: "#6a6f80"
    },
    primaryPane: {

    },
    secondaryPane: {

    },
    time: {
      // font: LegendStyle.font,
      colour: "#96a9db",
      handleColour: "#586ea6",
    },
    legend: {
      colour: "#96a9db",
    },
    icon: {
      colour: "#748bc7",
      hover: "#96a9db"
    },
    tools: {
      location: false
    },
    utils: {
      location: false
    }
  },
  watermark: {
    text: "ETH/USDT",
    textColour: "#13171e"
  },
  isCrypto: true,
  logs: false,
  infos: true,
  warnings: true,
  highLow: true,
  errors: true,
  stream: streamVal,
  maxCandleUpdate: 250,
  talib: talib,
  wasm: wasm,
}
window.config5 = config5

const config6 = {
  id: "Midnight",
  title: "BTC/USDT",
  symbol: "btcusdt",
  // width: 1000,
  // height: 800,
  utils: {},
  tools: {},
  timeFrame: "1h",
  range: {
    startTS: state1_5b.ohlcv[0][0] // rangeStartTS,
  },
  theme: {
    candle: {
      Type: "candle_solid",
      AreaLineColour: "#4c5fe7",
      AreaFillColour: ["#4c5fe780", "#4c5fe700"],

      UpBodyColour: "#4c5fe7",
      UpWickColour: "#4c5fe7",
      DnBodyColour: "#2e384f88",
      DnWickColour: "#2e384f",
    },
    volume: {
      Height: 15,
      UpColour: "#4bc67c",
      DnColour: "#2e384f",
    },
    xAxis: {
      colourTick: "#6a6f80",
      colourLabel: "#6a6f80",
      colourCursor: "#2A2B3A",
      colourCursorBG: "#aac0f7",
      // fontFamily: XAxisStyle.FONTFAMILY,
      // fontSize: XAxisStyle.FONTSIZE,
      // fontWeight: XAxisStyle.FONTWEIGHT,
      // line: "#656565"
      slider: "#586ea6",
      handle: "#586ea688",
      tickMarker: false,
    },
    yAxis: {
      colourTick: "#6a6f80",
      colourLabel: "#6a6f80",
      colourCursor: "#2A2B3A",
      colourCursorBG: "#aac0f7",
      // fontFamily: YAxisStyle.FONTFAMILY,
      // fontSize: YAxisStyle.FONTSIZE,
      // fontWeight: YAxisStyle.FONTWEIGHT,
      // line: "#656565"
      tickMarker: false,
      location:"left",
    },
    chart: {
      Background: "#0f1213",
      BorderColour: "#00000000",
      BorderThickness: 1,
      GridColour: "#191e26",
      TextColour: "#6a6f80"
    },
    primaryPane: {

    },
    secondaryPane: {

    },
    time: {

    },
    legend: {
      colour: "#96a9db",
    },
    icon: {
      colour: "#748bc7",
      hover: "#96a9db"
    },
    tools: {
      location: false
    },
    utils: {
      location: false
    }
  },
  watermark: {
    text: "ETH/USDT",
    textColour: "#13171e"
  },
  isCrypto: true,
  logs: false,
  infos: true,
  warnings: true,
  errors: true,
  stream: streamVal,
  maxCandleUpdate: 250,
  talib: talib,
  wasm: wasm,
  state: state1_5b
}
window.config6 = config6

const config7 = {
  // id: "TradeX_test",
  title: "BTC/USDT",
  symbol: "btcusdt",
  // width: 600,
  // height: 500,
  utils: {},
  tools: {},
  timeFrame: "15m",
  range: {
    startTS: rangeStartTS, // state1.ohlcv.slice(-1)[0][0],
    initialCnt: 30,
    limitFuture: LIMITFUTURE,
    limitPast: LIMITPAST,
    minCandles: MINCANDLES,
    maxCandles: MAXCANDLES,
    yAxisBounds: 0.3,
    center: true
  },
  theme: {
    candle: {
      Type: "candle_down_hollow",
      UpBodyColour: "#FAEB2488",
      UpWickColour: "#FAEB24",
      DnBodyColour: "#F900FE88",
      DnWickColour: "#F900FE",
    },
    volume: {
      Height: 15,
      UpColour: "#FAEB2444",
      DnColour: "#F900FE44",
    },
    xAxis: {
      tickMarker: false,
    },
    yAxis: {
      tickMarker: false,
    },
    chart: {
      Background: "#141414",
      BorderColour: "#141414",
      GridColour: "#303030",
      TextColour: "#c0c0c0"
    },
    primaryPane: {

    },
    tools: {
      location: false
    },
    utils: {
      location: false
    },
    time: {
      navigation: false
    },
    legend: {
       controls: true
    }
  },
  watermark: {
    text: "BTC/USDT"
  },
  highLow: true,
  isCrypto: true,
  logs: true,
  infos: true,
  warnings: true,
  errors: true,
  stream: streamVal,
  maxCandleUpdate: 250,
  talib: talib,
  wasm: wasm,
  state: state3,
  callbacks: {
    indicatorSettings: {fn: (c)=>{ alert(c.id) }, own: true}
  }
}
window.config7 = config7

const config8 = {
  // id: "TradeX_test",
  title: "IMPT/USDT",
  symbol: "imptusdt",
  // width: 600,
  // height: 500,
  utils: {},
  tools: {},
  timeFrame: "1d",
  range: {
    startTS: rangeStartTS, // state1.ohlcv.slice(-1)[0][0],
    initialCnt: 30,
    limitFuture: LIMITFUTURE,
    limitPast: LIMITPAST,
    minCandles: MINCANDLES,
    maxCandles: MAXCANDLES,
    yAxisBounds: 0.3,
    center: true
  },
  theme: {
    candle: {
      Type: "candle_down_hollow",
      UpBodyColour: "#FAEB2488",
      UpWickColour: "#FAEB24",
      DnBodyColour: "#F900FE88",
      DnWickColour: "#F900FE",
    },
    volume: {
      Height: 15,
      UpColour: "#FAEB2444",
      DnColour: "#F900FE44",
    },
    xAxis: {
      tickMarker: false,
    },
    yAxis: {
      tickMarker: false,
    },
    chart: {
      Background: "#141414",
      BorderColour: "#141414",
      GridColour: "#303030",
      TextColour: "#c0c0c0"
    },
    primaryPane: {

    },
    tools: {
      location: false
    },
    utils: {
      location: false
    },
    time: {
      navigation: false
    },
    legend: {
       controls: true
    }
  },
  watermark: {
    text: "BTC/USDT"
  },
  highLow: true,
  isCrypto: true,
  logs: true,
  infos: true,
  warnings: true,
  errors: true,
  stream: streamVal,
  maxCandleUpdate: 250,
  talib: talib,
  wasm: wasm,
  state: decimals,
  callbacks: {
    indicatorSettings: {fn: (c)=>{ alert(c.id) }, own: true}
  }
}
window.config8 = config8

const dre =   {
  id: "Midnight",
  title: "BTC/USDT",
  symbol: "btcusdt",
    utils: {},
    tools: {},
    range: {
      initialCnt: 30,
      limitPast: 96 / 12,
      limitFuture: 96,
    },
    theme: {
    candle: {
      Type: "candle_solid",
      AreaLineColour: "#4c5fe7",
      AreaFillColour: ["#4c5fe780", "#4c5fe700"],

      UpBodyColour: "#4c5fe7",
      UpWickColour: "#4c5fe7",
      DnBodyColour: "#2e384f88",
      DnWickColour: "#2e384f",
    },
      volume: {
        Height: 15,
        UpColour: "#4bc67c",
        DnColour: "#2e384f",
      },
      xAxis: {
        colourTick: "#6a6f80",
        colourLabel: "#6a6f80",
        colourCursor: "#2A2B3A",
        colourCursorBG: "#aac0f7",
        slider: "#586ea6",
        handle: "#586ea688",
        tickMarker: false,
      },
      yAxis: {
        colourTick: "#6a6f80",
        colourLabel: "#6a6f80",
        colourCursor: "#2A2B3A",
        colourCursorBG: "#aac0f7",
        tickMarker: false,
        location: "right",
      },
    chart: {
      Background: "#0f1213",
      BorderColour: "#00000000",
      BorderThickness: 1,
      GridColour: "#191e26",
      TextColour: "#6a6f80"
    },
      onChart: {},
      offChart: {},
      time: {
        navigation: false,
        colour: "#96a9db",
        handleColour: "#586ea6",
      },
      legend: {
        colour: "#96a9db",
        controls: true,
      },
      icon: {
        colour: "#748bc7",
        hover: "#96a9db",
      },
      tools: {
        location: false,
      },
      utils: {
        location: false,
      }
    },
    // trades: { 
    //   display: true,
    //   displayInfo: true 
    // },
    deepValidate: false,
  isCrypto: true,
  logs: false,
  infos: true,
  warnings: true,
  errors: true,
  maxCandleUpdate: 250,
  talib,
  wasm: wasm,
  state: {
    ohlcv: btcusdt_15min,
    primary: [
      {
        "name": "Trades",
        "type": "trades",
        "settings": {
            "z-index": 5,
            "legend": false
        },
        data: {
          1695906000000: [
              {
                timestamp: 1695906000000,
                id: "012336352",
                side: "buy",
                price: 27032,
                amount: 0.25,
                filled: 0.25,
                average: 27032,
                total: 27032,
                tag: "Bot ABC - BTC/USDT"
              }
            ],
            1695945600000: [
              {
                timestamp: 1695945600000,
                id: "012335353",
                side: "sell",
                price: 27032,
                amount: 0.25,
                filled: 0.25,
                average: 27032,
                total: 27032,
                tag: "Bot ABC - BTC/USDT"
              }
            ],
            1696327200000: [
              {
                timestamp: 1696327200000,
                id: "012335354",
                side: "sell",
                price: 27550.6,
                amount: 0.25,
                filled: 0.25,
                average: 27550.6,
                total: 27550.6,
                tag: "Bot ABC - BTC/USDT"
              }
            ]
          }
        }
      ]
    }
  };

const configs = [

  // {config: bearHawk, stream: null},
  // {config: tradesTestState, stream: null},
  // {config: config1, stream: null},
  // {config: config2, stream: null},

  {config: config2, stream: null}, //stream: (chart) => {new Stream(chart, interval, null, chart.stream.onTick.bind(chart.stream))}},
  // {config: config3, stream: (chart) => {livePrice_Binance(chart, "btcusdt", config3.timeFrame)}},
  // {config: config4, stream: (chart) => {new Stream(chart, interval, null, chart.stream.onTick.bind(chart.stream))}},
  // {config: config5, stream: (chart) => {livePrice_Binance(chart, "ethusdt", config5.timeFrame)}},
  // {config: config6, stream: null},
  // {config: config8, stream: null},
  // {config: config7, stream: null},
  // {config: config9, stream: (chart) => {new Stream(chart, interval, null, chart.stream.onTick.bind(chart.stream))}}, // {setInterval(stream.bind(chart), interval)}},
  // {config: config9, stream: (chart) => {livePrice_Binance(chart, "linkusdt", config9.timeFrame)}},
  
  // {config: dre, stream: null},
]

const main = DOM.findBySelector('main')
const add = document.querySelector("#add")
      add.onclick = addChart


function addChart() {
  let chart = document.createElement("tradex-chart")
  let section = document.createElement("section")
      section.setAttribute('style', 'cursor: crosshair'); // added default cursor as crosshair here to avoid messing with candle rendering
      section.appendChild(chart)
      main.appendChild(section)

  let {config, stream} = configs[(chart.inCnt) % configs.length]
      chart.start(config)
      chart.refresh()
      window["chart"+chart.inCnt] = chart

  // if (typeof chart?.stream?.start === "function") {
  //   // chart is ready and waiting for a websocket stream
  //   chart.stream.start()
  //   if (typeof stream === "function") stream(chart)
  // }
}


function test(e) {
  console.log(this.id, e)
}
/*
// const chart = Chart.create(mount, config, state)
const chart = document.createElement("tradex-chart")
chart.id = "test"
document.getElementById("app").appendChild(chart)
window.chart = chart
chart.init(config)
chart.start()

console.log("API: id:", chart.id)
console.log("API: name:", chart.name)
console.log("API: height:", chart.height)

const infoBox = {}
      infoBox.el = DOM.findBySelector('#info')
      infoBox.out = function (info) {
        let inf = `<ul style="color:#FFF; text-align:left;">`
        for (let i in info) {
          inf += `<li>${info[i][0]} <span>${info[i][1]}</span></li>`
        }
        inf += "</ul>"
        infoBox.el.innerHTML = inf
      }

chart.on("range_set", (e) => { infoBox.out(demo.internals()) })
chart.on("chart_pan", (e) => { infoBox.out(demo.internals()) })
chart.on("main_mouseMove", (e) => { infoBox.out(demo.internals()) })
infoBox.out(demo.internals())
// test()

let time = chart.range.value()[0]
*/

function getRandomInt(min, max) {
  return Math.random() * (max - min) + min;
}


class Stream {

  chart
  tick = {t: null, p: null, q: null}
  candle = []
  time
  tf
  tfms

  constructor(chart, interval, tickerCb, klineCb) {

    this.chart = chart
    this.interval = interval
    this.time = (chart.stream.lastTick) ? chart.stream.lastTick.t : chart.range.value()[0]
    this.tf = chart.config.timeFrame
    this.tfms = chart.time.timeFrameMS // TIMEUNITSVALUESSHORT[tf]
    this.candle = chart.range.value()
    this.tickerCb = (typeof tickerCb === "function") ? tickerCb : false
    this.klineCb = (typeof klineCb === "function") ? klineCb : false

    let r = this.chart.range
    this.max = r.valueDiff / (this.tfms / this.interval) || 1

    setInterval(this.ticker.bind(this), interval)
  }

  get volumeInc() {
    let r = this.chart.range
    let max = r.volumeDiff || 1
    return getRandomInt(0, max) / (this.tfms / this.interval)
  }

  get priceInc() {
    let factor2 = getRandomInt(0, 10) % 2
    let sign = (Math.floor(factor2) === 1) ? 1 : -1

    return getRandomInt(0, this.max) * sign
  }

  ticker() {

    this.tick.t = this.tick.t || this.candle[0] || Date.now()
    this.tick.p = this.tick.p || this.candle[4] || 1
    this.tick.q = this.tick.q || this.candle[5] || 1

    let price = this.tick.p + this.priceInc
        price = (price < 0) ? Math.abs(this.priceInc) : price
    let time = this.tick.t + this.interval
    this.tick = {t: time, p: price, q: this.volumeInc}

    if (this.tickerCb) this.tickerCb(this.tick)
    if (this.klineCb) this.kline()
  }

  kline() {
    let t = this.candle[0]
    let c = [...this.candle]
    let p = this.tick.p

    if (this.tick.t - t >= this.tfms ) {
      t = this.tick.t - (this.tick.t % this.tfms)
      c = [t, p, p, p, p, this.volumeInc]
      c 
    }
    else {
      c[2] = (c[2] < p ) ? p : c[2]
      c[3] = (c[3] > p ) ? p : c[3]
      c[4] = p
      c[5] += this.tick.q
    }
    this.candle = c
    this.klineCb({t: t, o: c[1], h: c[2], l: c[3], c: c[4], v: c[5]})
  }
}

function livePrice_Binance(chart, symbol="btcusdt", interval="1m", onTick) {
  if (typeof interval === "number") {
    interval = chart.timeData.ms2Interval(interval)
  }
  // var ws = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@aggTrade");
  var ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_${interval}`);

  ws.onmessage = (evt) => onWSMessage.call(this, evt, chart, onTick)
}

function onWSMessage (evt, chart, onTick) { 
  let msg = evt.data;
  let obj = JSON.parse(msg);
  if (typeof obj === "object" && obj.k) { 

    /* KLine data passed to the chart
      {
        t: timeStamp // timestamp of current candle in milliseconds
        o: open  // open price
        h: high  // high price
        l. low // low price
        c: close  // close price
        v: volume // volume
      }
    */
    // console.log(obj.k)
    if (!!onTick) onTick(obj.k)
    else chart.stream.onTick(obj.k)   
  }
};

let waiting = false

function kline_Binance(chart, symbol="BTCUSDT", start, limit=100, interval="1m") {
  symbol = symbol.toUpperCase()
  if (!waiting) {
    waiting = true
    const url = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&startTime=${start}&limit=${limit}`;
    try {
      fetch(url)
      .then(r => r.json())
      .then(d => {
        console.log(d)
        chart.mergeData({ohlcv: d}, false, true)
        waiting = false
      })
      .catch(e => {
        e.text().then( eMsg => {
          console.error(eMsg)
          waiting = false
        })
      })
    }
    catch(e) {
      console.error(e)
      waiting = false
    }
  }
}

function kline_Binance2(chart, symbol="BTCUSDT", start, limit=100, interval="1m") {
  symbol = symbol.toUpperCase()
  if (symbol == "testusdt") symbol = "BTCUSDT"
  if (typeof interval == "number") interval = chart.timeData.ms2Interval(interval)
  const url = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&startTime=${start}&limit=${limit}`;
  return new Promise((resolve, reject) => {
    try {
      fetch(url)
      .then(r => r.json())
      .then(d => {
        console.log(d)
        resolve({ohlcv: d})
      })
      .catch(e => {
        console.error(e)
        reject(e)
      })
    }
    catch(e) {
      console.error(e)
      reject(e)
    }
  })
}

function onRangeLimit(e, x="past") {
  let start;
  const range = e.chart.range
  const limit = 100
  const interval = range.intervalStr
  if (x == "past") {
    start = range.timeStart - (range.interval * limit)
  }
  if (x == "future") {
    start = range.timeEnd
  }
  kline_Binance(e.chart, undefined, start, limit, interval)
}

function onRangeLimit2(e, sym, tf, ts, x="past") {
  let start;
  const range = e.chart.range
  const limit = 100
  const interval = range.intervalStr
  if (x == "future") {
    start = ts 
  }
  else {
    start = ts - (tf * limit)
  }
  
  return kline_Binance2(e.chart, sym, start, limit, tf)
}

function once (chart) {
  const tick = {
    t: Date.now(), // timestamp of current candle in milliseconds
    o: 28000,  // open price
    h: 28100,  // high price
    l: 28060,
    c: 28080,  // close price
    v: 3 // volume
  }
  chart.stream.onTick(tick)  
  tick.t = Date.now()
  tick.c = 28083
  chart.stream.onTick(tick)  
}

function h($,p,c) {console.log(`alert`,$,p[4],c[4])} 

function alertTest ($, p, c) {
  if ($ > p[4] && $ < c[4]) return true
  else return false
}

// Add some charts

addChart()
// addChart()
// addChart()
// addChart()
// addChart()
// addChart()

document.getElementById("fullscreen").addEventListener("click", (e) => {
  chart0.requestFullscreen()
})

// add custom indicator definition
chart0.setIndicators({
  TEST: {id: "TEST", name: "Custom Indicator", event: "addIndicator", ind: TEST},
  DBLMA: {id: "DBLMA", name: "Double Moving Average", event: "addIndicator", ind: DblMA },
  // DBLMA2: {id: "DBLMA2", name: "Double Moving Average", event: "addIndicator", ind: DblMA2 },
  TRDFLO: {id: "TRDFLO", name: "Trade Flow", event: "addIndicator", ind: TradeFlow },
})
/*

chart0.addIndicator("VOL")
chart0.addIndicator("MA")
chart0.addIndicator("TEST", "Test1", {data: [], settings: {test: true}})
chart0.addIndicator("TRDFLO", "TradeFlow1", {data: [], settings: {test: true}})

// chart0.addIndicator("DBLMA", "DblMA", {data: [], settings: {}})

// chart0.addIndicator("DMI", "DMI1", {data: []})
*/
// chart0.on("range_limitPast", (e) => onRangeLimit(e, "past"))
// chart0.on("range_limitFuture", (e) => onRangeLimit(e, "future"))


// chart0.on("stream_candleFirst", () => {
//   chart0.state.dataSource.historyAdd({
//     rangeLimitPast: (e, sym, tf, ts) => { return onRangeLimit2(e, sym, tf, ts) },
//     // rangeLimitFuture: (e) => onRangeLimit2(e, sym, tf, ts)
//   })
// })
// chart0.state.dataSource.tickerAdd(
//   {
//     start: (symbol, tf, onTick) => { livePrice_Binance(chart0, symbol, tf, onTick) },
//     stop: () => {}
//   },
//   {
//     symbol: "btcusdt",
//     tf: 60000
//   }
// )

state1.dataSource.source.rangeLimitFuture = (e, sym, tf, ts) => { return onRangeLimit2(e, sym, tf, ts, "future") }

chart0.state.dataSource.startTickerHistory({
  rangeLimitPast: (e, sym, tf, ts) => { return onRangeLimit2(e, sym, tf, ts, "past") },
  // rangeLimitFuture: (e, sym, tf, ts) => { return onRangeLimit2(e, sym, tf, ts, "future") },
  start: (symbol, tf, onTick) => { livePrice_Binance(chart0, symbol, tf, onTick) },
  stop: () => {},
  symbol: "btcusdt",
  tf: 60000
})

chart0.on("range_limitFuture", () => console.log("range_limitFuture"))

// onRangeLimit({chart: chart0})


/*
// register custom overlay
chart0.setCustomOverlays({
  // custom: {
  //   class: CustomOverlay,
  //   location: "primaryPane"
  // },
  dca: {
    class: chartDCA,
    location: "primaryPane"
  }
})
// add custom overlays
// chart0.addOverlay("custom", "chartPane")
// chart0.addOverlay("dca", "chartPane")

// add an alert
if (typeof chart1 === "object") {
  chart1.stream.alerts.add(13010, alertTest, h)
  chart1.on("range_limitPast", (e) => onRangeLimit(e, "past"))
  chart1.on("range_limitFuture", (e) => onRangeLimit(e, "future"))
}

// chart2.addIndicator("VOL", "VOL", {settings:{isPrimary: false}})

// test merging indicator data
if (typeof chart5 === "object")
  chart5.mergeData(state1_5a, false)
*/

const states = { state1, state2, state3 }
const cfgs = { config1, config2, config3 }

loadTimeFrame(chart0)
loadStates(chart0, states, cfgs)
