// inidicators.js
// exports the list of default indicators 
// the list can be extended / merged with a custom list on chart start()
// Docs - https://hackape.github.io/talib.js/modules/_index_.html


import AROON from "../indicators/AROON";
import BB from "../indicators/BB"
// import DX from "../indicators/DX"
import EMA from "../indicators/EMA"
import MA from "../indicators/MA"
import MA_Multi from "../indicators/MA_Multi"
import RSI from "../indicators/RSI";
import SMA from "../indicators/SMA"
import STOCH from "../indicators/STOCH";
import Volume from "../indicators/Volume"

export const IndicatorClasses = {
  AROON,
  BB,
  EMA,
  MA,
  MA_Multi,
  RSI,
  SMA,
  STOCH,
  VOL: Volume,
}

export default {
  // ADX: {id: "ADX", name: "Average Direction", event: "addIndicator"},
  AROON: {id: "AROON", name: "Aroon", event: "addIndicator", ind: AROON},
  BB: {id: "BB", name: "Bollinger Bands", event: "addIndicator", ind: BB},
  // DX: {id: "DX", name: "Directional Movement", event: "addIndicator", ind: DX},
  EMA: {id: "EMA", name: "Exponential Moving Average", event: "addIndicator", ind: EMA},
  MA_Multi: {id: "MA", name: "Moving Average", event: "addIndicator", ind: MA_Multi},
  RSI: {id: "RSI", name: "Relative Strength Index", event: "addIndicator", ind: RSI},
  SMA: {id: "SMA", name: "Simple Moving Average", event: "addIndicator", ind: SMA},
  STOCH: {id: "STOCH", name: "Stochastic Oscillator", event: "addIndicator", ind: STOCH},
  VOL: {id: "VOL", name: "Volume", event: "addIndicator", ind: Volume},
}
