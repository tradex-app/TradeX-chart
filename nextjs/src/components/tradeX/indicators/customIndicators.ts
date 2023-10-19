import ColorsEnum from "../../theme/colors";
import { IIndicators } from "../utils/types";

import LINES from "./LINES";
import DCA from "./DCA";

export const CUSTOM_INDICATORS: IIndicators = {
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
        currentPrice: 27896,
        averagingOrdersAmount: 700,
        averagingOrdersQuantity: 5,
        averagingOrdersPercentage: 0.4,
        amountMultiplier: 1.3,
        stepMultiplier: 1.25,
      },
    },
  },
};
