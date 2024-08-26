const root = {keys: "bear hawk"}
import * as talib from '../node_modules/talib-web/lib/index.esm'
const wasm = "node_modules/talib-web/lib/talib.wasm"
import filteredData from "./1minute"
// import filteredData from "./data_btc_1m"


export default {
  id: "TradeX_test",
  title: String(root.keys),
  symbol: String(root.keys),
  height: 800,
  utils: {},
  tools: {},
  timeFrame: "1m",
  rangeStartTS: undefined,
  rangeLimit: 30,
  theme: {
      candle: {
          Type: "candle_solid",
          UpBodyColour: "#32d32295",
          UpWickColour: "#32d322",
          DnBodyColour: "#d3222295",
          DnWickColour: "#d32222"
      },
      volume: {
          Height: 15,
          UpColour: "#32d32250",
          DnColour: "#d3222250"
      },
      xAxis: {
          tickMarker: true
      },
      yAxis: {
          tickMarker: false
      },
      chart: {
          Background: "#141414",
          BorderColour: "#141414",
          GridColour: "#303030",
          TextColour: "#c0c0c0"
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
      text: String(root.keys) + "1m"
  },
  isCrypto: true,
  logs: false,
  infos: true,
  warnings: true,
  errors: true,
  // stream: streamVal,
  maxCandleUpdate: 250,
  talib: talib,
  wasm: wasm,
  state:
    {
        ohlcv: filteredData.ohlcv,
        primary: [
            {
                "name": "EMA, 30",
                "type": "EMA",
                "data": [],
                "settings": { input: {timePeriod: 30} }
            }
        ],
        secondary: [
            {
                "name": "RSI 20",
                "type": "RSI",
                "data": [],
            }
        ]
    }
}