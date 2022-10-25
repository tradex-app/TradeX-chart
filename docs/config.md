# Config

```javascript
const config = {
  id: "TradeX_test",
  title: "BTC/USDT",
  width: 1000,
  height: 800,
  // utils bar config
  utils: {none: true},
  // tools bar config
  tools: {none: true},
  // timeframes: s, m, h, d, M, y
  timeFrame: "1m",
  // timestamp for the chart to start on
  rangeStartTS: rangeStartTS,
  // number of candles for the chart to display on start
  rangeLimit: 30,
  // number of empty candles (time frame units) the chart will display after the last candle
  limitFuture: 200,
  // number of empty candles (time frame units) the chart will display before the first candle
  limitPast: 200,
  // minimum candles the chart will zoom to and display
  minCandles: 20,
  // maximum candles the chart will zoom to and display
  minCandles: 1000,
  // "padding" added to upper and lower price bounds for display
  yAxisBounds: 0.005,
  // chart theme
  theme: {
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
      BorderColour: "#666",
      GridColour: "#333",
      TextColour: "#ccc"
    },
    onChart: {

    },
  },
  // used for chart data validation, timestamps compared against BTC genisis block
  isCrypto: true,
  logs: false,
  infos: true,
  warnings: true,
  errors: true,
  // enable live updates for a price stream
  stream: {},
  // maximum rate in milliseconds that a live stream should be REDRAWN, does not throttle actual stream rate
  maxCandleUpdate: 250,
  // pointer to talib-web library, required if you want to see indicators
  talib: talib
}
```
