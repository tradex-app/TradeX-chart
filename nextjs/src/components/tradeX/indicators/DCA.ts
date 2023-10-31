// @ts-nocheck
import { Indicator, Range, uid } from "tradex-chart";
export default class DCA extends Indicator {
  static primaryPane = true;

  name = "DCA";
  shortName = "DCA";

  customSettings;
  customValues;

  calculatedEntryPoints = [];

  constructor(target, xAxis = false, yAxis = false, config, parent, params) {
    super(target, xAxis, yAxis, config, parent, params);

    this.shortName = params.overlay?.name || "DCA";
    this.id = params.overlay?.id || uid(this.shortName);

    this.customSettings = params.overlay?.settings?.custom || {};
    this.customValues = this.customSettings.values || {};

    this.calcIndicatorHistory();
    this.addLegend();
  }

  get primaryPane() {
    return DCA.primaryPane;
  }

  legendInputs(pos = this.chart.cursorPos) {
    const roundedEntryPoints = this.calculatedEntryPoints.map((point) =>
      parseFloat(point.toPrecision(4)),
    );
    const inputs = {
      "Entry Points": roundedEntryPoints,
    };
    const colours = [
      this.customSettings.inputsBaseProps?.colours[0] || "#000000",
    ];
    const labels = [true];
    return { inputs, colours, labels };
  }

  updateValue(candle) {
    this.value = candle;
  }

  calcIndicator() {
    const {
      currentPrice: _currentPrice,
      averagingOrdersAmount: _averagingOrdersAmount,
      averagingOrdersQuantity: _averagingOrdersQuantity,
      averagingOrdersPercentage: _averagingOrdersPercentage,
      amountMultiplier: _amountMultiplier,
      stepMultiplier: _stepMultiplier,
    } = this.customValues;

    let currentPrice = _currentPrice;
    let averagingOrdersAmount = _averagingOrdersAmount;
    let averagingOrdersQuantity = _averagingOrdersQuantity;
    let averagingOrdersPercentage = _averagingOrdersPercentage;
    let amountMultiplier = _amountMultiplier;
    let stepMultiplier = _stepMultiplier;

    if (
      !currentPrice ||
      !averagingOrdersAmount ||
      !averagingOrdersQuantity ||
      !averagingOrdersPercentage ||
      !amountMultiplier ||
      !stepMultiplier
    ) {
      return;
    }

    this.calculatedEntryPoints = [];
    let nextEntryPrice = currentPrice;
    let nextEntryAmount = averagingOrdersAmount;

    for (let i = 0; i < averagingOrdersQuantity; i++) {
      this.calculatedEntryPoints.push(nextEntryPrice);

      nextEntryPrice -= nextEntryPrice * (averagingOrdersPercentage / 100);
      nextEntryAmount *= amountMultiplier;
      averagingOrdersPercentage *= stepMultiplier;
    }
  }

  calcIndicatorHistory() {
    this.calcIndicator();
  }

  draw(range = this.range) {
    if (this.calculatedEntryPoints.length < 1) return false;

    this.scene.clear();

    const style = {
      stroke: this.customSettings.inputsBaseProps?.colours[0] || "#000000",
    };

    this.calculatedEntryPoints.forEach((entryPoint) => {
      const y = this.yAxis.yPos(entryPoint);
      const xStart = this.xAxis.xPos(range.data[0][0]);
      const xEnd = this.xAxis.xPos(range.data[range.data.length - 1][0]);

      this.plot(
        [
          { x: xStart, y },
          { x: xEnd, y },
        ],
        "renderLine",
        style,
      );
    });

    this.target.viewport.render();
  }
}
