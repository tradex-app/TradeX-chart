import { ICustomIndicators } from "../utils/types";
import Test from "./SnR";
import ColorsEnum from "../../theme/colors";

export const CUSTOM_INDICATORS: ICustomIndicators = {
  SNR: {
    id: "SNR",
    name: "SNR",
    event: "addIndicator",
    ind: Test,
    customSettings: {
      inputsBaseProps: {
        colours: [ColorsEnum.Red, ColorsEnum.Green],
        labels: [true, true],
      },
      legendInputs: ["support", "ressistance"],
    },
  },
};
