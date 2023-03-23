// inidicators.js
// exports the list of default indicators 
// the list can be extended / merged with a custom list on chart start()

import BB from "../indicators/BB"
import DMI from "../indicators/DMI"
import EMA from "../indicators/EMA"
import RSI from "../indicators/RSI";
import SMA from "../indicators/SMA"
import Volume from "../indicators/Volume"

export default {
  ADX: {id: "ADX", name: "Average Direction", event: "addIndicator"},
  BB: {id: "BB", name: "Bollinger Bands", event: "addIndicator", ind: BB},
  DMI: {id: "DMI", name: "Directional Movement", event: "addIndicator", ind: DMI},
  EMA: {id: "EMA", name: "Exponential Moving Average", event: "addIndicator", ind: EMA},
  RSI: {id: "RSI", name: "Relative Strength Index", event: "addIndicator", ind: RSI},
  SMA: {id: "SMA", name: "Simple Moving Average", event: "addIndicator", ind: SMA},
  Vol: {id: "Vol", name: "Volume", event: "addIndicator", ind: Volume},
}
