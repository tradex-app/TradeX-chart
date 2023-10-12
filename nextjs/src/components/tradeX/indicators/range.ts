/* eslint-disable */
// @ts-nocheck

import BaseIndicator from "./Base";
import { ColorsEnum } from "../../../../theme";

export default class Range extends BaseIndicator {
  name = "Range";

  shortName = "Range";

  libName = "Range";

  definition = {
    output: {
      low: [],
      mid: [],
      high: [],
    },
  };

  indicatorDefinition = {
    name: "Range",
    camelCaseName: "range",
    inputs: [],
    options: [],
    outputs: [],
  };

  inputsBaseProps = {
    colours: [ColorsEnum.Yellow, ColorsEnum.Yellow, ColorsEnum.Yellow],
    labels: [true, true, true],
  };

  plots = [{ key: "RANGE_1", title: "RANGE", type: "line" }];

  static primaryPane = true;

  get primaryPane() {
    return Range.primaryPane;
  }

  constructor(target, xAxis = false, yAxis = false, config, parent, params) {
    super(target, xAxis, yAxis, config, parent, params);

    this.createD2TIndicator(config, params, this.indicatorDefinition);
  }

  legendInputs() {
    if (this.overlay.data.length === 0) return false;

    return {
      inputs: {
        High: this.createIndicatorLegendInput(this.overlay.data[0][1]),
        Mid: this.createIndicatorLegendInput(this.overlay.data[0][2]),
        Low: this.createIndicatorLegendInput(this.overlay.data[0][3]),
      },
      colours: this.inputsBaseProps.colours,
      labels: this.inputsBaseProps.labels,
    };
  }

  draw(range = this.range) {
    if (this.overlay.data.length < 2) return false;

    const plots = { lower: [], middle: [], upper: [] };
    this.drawD2TIndicator(plots, range, this.inputsBaseProps);
  }
}
