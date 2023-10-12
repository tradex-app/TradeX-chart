import { ICustomIndicators } from "../utils/types";

export const AVAILABLE_INDICATORS: ICustomIndicators = {
    AROON: {
        id: "AROON",
        name: "Aroon",
        event: "addIndicator",
        ind: undefined,
        offChart: true
    },
    BB: {
        id: "BB",
        name: "Bollinger Bands",
        event: "addIndicator",
        ind: undefined
    },
    EMA: {
        id: "EMA",
        name: "Exponential Moving Average",
        event: "addIndicator",
        ind: undefined,
    },
    RSI: {
        id: "RSI",
        name: "Relative Strength Index",
        event: "addIndicator",
        ind: undefined,
        offChart: true
    },
    SMA: {
        id: "SMA",
        name: "Simple Moving Average",
        event: "addIndicator",
        ind: undefined
    },
    STOCH: {
        id: "STOCH",
        name: "Stochastic Oscillator",
        event: "addIndicator",
        ind: undefined,
        offChart: true
    }
  }