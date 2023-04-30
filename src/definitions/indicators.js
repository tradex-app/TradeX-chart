// inidicators.js
// exports the list of default indicators 
// the list can be extended / merged with a custom list on chart start()
// Docs - https://hackape.github.io/talib.js/modules/_index_.html

// import talib from "talib-wasm"

import BB from "../indicators/BB"
import DMI from "../indicators/DMI"
import EMA from "../indicators/EMA"
import RSI from "../indicators/RSI";
import SMA from "../indicators/SMA"
import Volume from "../indicators/Volume"

// const params = {talib: talib}
const params = {}

export default {
  ADX: {id: "ADX", name: "Average Direction", event: "addIndicator", params: params},
  BB: {id: "BB", name: "Bollinger Bands", event: "addIndicator", ind: BB, params: params},
  DMI: {id: "DMI", name: "Directional Movement", event: "addIndicator", ind: DMI, params: params},
  EMA: {id: "EMA", name: "Exponential Moving Average", event: "addIndicator", ind: EMA, params: params},
  RSI: {id: "RSI", name: "Relative Strength Index", event: "addIndicator", ind: RSI, params: params},
  SMA: {id: "SMA", name: "Simple Moving Average", event: "addIndicator", ind: SMA, params: params},
  Vol: {id: "Vol", name: "Volume", event: "addIndicator", ind: Volume, params: params},
}
