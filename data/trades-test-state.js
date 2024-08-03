
import * as talib from '../node_modules/talib-web/lib/index.esm'
const wasm = "node_modules/talib-web/lib/talib.wasm"
import ohlcv from './price-data-for-trades'
import trades from './trades'

const state = {
  id: "TradesTest",
  title: "Pepe/BTC",
  symbol: "pepebtc",
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
      ohlcv: ohlcv,
      primary: [
        trades
      ]
    }
  };

  export default state
  