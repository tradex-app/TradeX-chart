// inidicators.js

import EMA from "../indicators/EMA"
import RSI from "../indicators/RSI";

export default {
  ADX: {id: "ADX", name: "Average Direction", event: "addIndicator"},
  BB: {id: "BB", name: "Bollinger Bands", event: "addIndicator", ind: ""},
  EMA: {id: "EMA", name: "Exponential Moving Average", event: "addIndicator", ind: EMA},
  DMI: {id: "DMI", name: "Directional Movement", event: "addIndicator", },
  RSI: {id: "RSI", name: "Relative Strength Index", event: "addIndicator", ind: RSI},
}