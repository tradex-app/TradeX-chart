// config.js
// default chart config

import { defaultTheme, TX_MAXH, TX_MAXW } from "./style"

const title = "Empty"

export const defaultConfig = {
  id: undefined,
  title: title,
  symbol: title,
  width: TX_MAXW,
  height: TX_MAXH,
  utils: {},
  tools: {},
  timeFrame: "1m",
  range: {
    startTS: undefined,
  },
  theme: defaultTheme,
  watermark: {
    text: title
  },
  trades: { 
    display: true,
    displayInfo: true 
  },
  isCrypto: true,
  logs: false,
  infos: true,
  warnings: true,
  highLow: true,
  errors: true,
  stream: {},
  maxCandleUpdate: 250,
  talib: undefined,
  wasm: undefined,
  state: {},
  callbacks: {}
}
