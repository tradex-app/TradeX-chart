/* eslint-disable */
// @ts-nocheck

import { ColorsEnum } from "../../../../theme";
import BaseIndicator from "./Base";

export default class Level extends BaseIndicator {
  name = "Level";

  libName = "Level";

  shortName = "Level";

  definition = {
    output: {
      resistance: [],
      support: [],
    },
  };

  indicatorDefinition = {
    name: "Level",
    camelCaseName: "level",
    inputs: [],
    options: [],
    outputs: [],
  };

  inputsBaseProps = {
    colours: [ColorsEnum.Red, ColorsEnum.Green],
    labels: [true, true],
  };

  plots = [{ key: "LEVEL_1", title: "LEVEL", type: "line" }];

  static primaryPane = true;

  get primaryPane() {
    return Level.primaryPane;
  }

  static onChart = true;

  get onChart() {
    return Level.onChart;
  }

  constructor(target, xAxis = false, yAxis = false, config, parent, params) {
    super(target, xAxis, yAxis, config, parent, params);

    this.createD2TIndicator(config, params, this.indicatorDefinition);
  }

  legendInputs() {
    if (this.overlay.data.length === 0) return false;

    return {
      inputs: {
        Resistance: this.createIndicatorLegendInput(this.overlay.data[0][1]),
        Support: this.createIndicatorLegendInput(this.overlay.data[0][2]),
      },
      colours: this.inputsBaseProps.colours,
      labels: this.inputsBaseProps.labels,
    };
  }

  draw(range = this.range) {
    if (this.overlay.data.length < 2) return false;

    const plots = { resistance: [], support: [] };
    this.drawD2TIndicator(plots, range, this.inputsBaseProps);
  }
}
