import { IIndicators } from "../utils/types";
import LINES from "./LINES";
import DCA from "./DCA";
import RSI14 from "./RSI14";
import { ColorsEnum } from "../../theme";

const AVAILABLE_INDICATORS: IIndicators = {
  AROON: {
    id: "AROON",
    name: "Aroon",
    event: "addIndicator",
    ind: undefined,
    offChart: true,
  },
  BB: {
    id: "BB",
    name: "Bollinger Bands",
    event: "addIndicator",
    ind: undefined,
  },
  EMA: {
    id: "EMA",
    name: "Exponential Moving Average",
    event: "addIndicator",
    ind: undefined,
  },
  RSI14: {
    id: "RSI14",
    name: "Relative Strength Index",
    event: "addIndicator",
    ind: RSI14,
    offChart: true,
  },
  SMA: {
    id: "SMA",
    name: "Simple Moving Average",
    event: "addIndicator",
    ind: undefined,
  },
  SR: {
    id: "SR",
    name: "SR",
    event: "addIndicator",
    ind: LINES,
    customSettings: {
      inputsBaseProps: {
        colours: [ColorsEnum.Green, ColorsEnum.Red],
        labels: [true, true],
      },
      legendInputs: ["support", "resistance"],
      values: [27320, 28050],
    },
  },
  DCA: {
    id: "DCA",
    name: "DCA",
    event: "addIndicator",
    ind: DCA,
    customSettings: {
      inputsBaseProps: {
        colours: [ColorsEnum.Green],
        labels: [true],
      },
      legendInputs: ["Entry Points"],
      values: {
        currentPrice: 28548,
        averagingOrdersAmount: 700,
        averagingOrdersQuantity: 5,
        averagingOrdersPercentage: 0.4,
        amountMultiplier: 1.3,
        stepMultiplier: 1.25,
      },
    },
  },
  //BROKEN ATM
  //   STOCH: {
  //     id: "STOCH",
  //     name: "Stochastic Oscillator",
  //     event: "addIndicator",
  //     ind: undefined,
  //     offChart: true,
  //   },
};

export const SelectedIndicators = (
  selectedIndicators: string[],
): IIndicators => {
  const filteredIndicators: IIndicators = {};

  selectedIndicators.forEach((indicator) => {
    if (AVAILABLE_INDICATORS[indicator]) {
      filteredIndicators[indicator] = AVAILABLE_INDICATORS[indicator];
    }
  });
  return filteredIndicators;
};

export default AVAILABLE_INDICATORS;
