// config.js
// default chart config

import { defaultTheme, TX_MAXH, TX_MAXW } from "./style"
import { MAX_CRYPTO_PRECISION } from "./core"
// import * as talib from "talib-web/lib/index.esm"
import * as talib from '../wasm/index.esm'
import wasm from '../wasm/talib.wasm.dataURI'

export const initialEmptyState = "initialEmptyState"
export const defaultTitle = "Empty"

export const defaultConfig = {
  id: undefined,
  title: defaultTitle,
  symbol: defaultTitle,
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
    display: false,
    text: defaultTitle
  },
  trades: { 
    display: true,
    displayInfo: true 
  },
  precision: MAX_CRYPTO_PRECISION,
  isCrypto: true,
  logs: false,
  infos: true,
  warnings: true,
  highLow: false,
  errors: true,
  stream: {},
  maxCandleUpdate: 250,
  talib,
  wasm,
  state: {},
  stateInheritPrevious: true,
  callbacks: {}
}
