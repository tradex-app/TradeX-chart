/* eslint-disable @typescript-eslint/default-param-last */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Indicator, Range, uid } from "tradex-chart";

export default class SNR extends Indicator {
  static inCnt = 0;

  static primaryPane = true;

  static colours = [];

  name = "";

  shortName = "";

  timePeriod = 20;

  #defaultStyle = {
    stroke: "#0088cc",
    lineWidth: "1",
    dash: undefined,
  };

  style = {};

  customSettings;

  constructor(target, xAxis = false, yAxis = false, config, parent, params) {
    super(target, xAxis, yAxis, config, parent, params);

    const overlay = params.overlay;
    this.shortName = params.overlay?.name;

    this.customSettings = params.overlay?.settings?.custom;

    this.id = params.overlay?.id || uid(this.shortName);

    this.style = overlay?.settings?.style
      ? { ...this.#defaultStyle, ...overlay.settings.style }
      : { ...this.#defaultStyle, ...config.style };

    this.calcIndicatorHistory();

    this.setUpdateValue = (value) => {
      this.updateValue(value);
    };

    this.addLegend();
  }

  // eslint-disable-next-line class-methods-use-this
  get primaryPane() {
    return SNR.primaryPane;
  }

  get defaultStyle() {
    return this.#defaultStyle;
  }

  legendInputs(pos = this.chart.cursorPos) {
    if (this.overlay.data.length == 0) return false;

    const labels = [false];
    const { c, colours } = super.legendInputs(pos);
    const inputs = {};

    if (this.customSettings?.legendInputs?.length) {
      this.customSettings?.legendInputs.forEach(
        (legendInput: string, index: number) => {
          inputs[legendInput] = this.scale.nicePrice(
            this.overlay.data[c][index + 1]
          );
        }
      );
    } else {
      inputs.x = this.scale.nicePrice(this.overlay.data[c][1]);
    }

    return {
      inputs,
      colours: this.customSettings?.inputsBaseProps?.colours || colours,
      labels: this.customSettings?.inputsBaseProps?.labels || labels,
    };
  }

  updateValue(candle) {
    this.value = candle;
  }

  calcIndicator(range = this.range) {
    let start;
    let end;

    const p = this.timePeriod;

    if (range instanceof Range) {
      start = 0;
      end = range.dataLength - p + 1;
    } else if (
      "indexStart" in range ||
      "indexEnd" in range ||
      "tsStart" in range ||
      "tsEnd" in range
    ) {
      start =
        range.indexStart || this.Timeline.t2Index(range.tsStart || 0) || 0;
      end =
        range.indexEnd ||
        this.Timeline.t2Index(range.tsEnd) ||
        this.range.Length - 1;
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      end - p;
    } else return false;
    if (end - start < p) return false;

    const data = [];
    let i;
    let v;
    let entry;

    while (start < end) {
      v = 0;
      for (i = 0; i < p; i++) {
        v += this.range.value(start)[4];
      }
      v /= p;
      data.push([this.range.value(start + p - 1)[0], v]);
      start++;
    }
    return data;
  }

  calcIndicatorHistory() {
    if (this.overlay.data.length < this.timePeriod) {
      const data = this.calcIndicator();
      if (data) this.overlay.data = data;
    }
  }

  draw(range = this.range) {
    if (this.overlay.data.length < 2) return false;

    const plots = this.customSettings?.legendInputs?.length
      ? this.customSettings.legendInputs.reduce(
          (accumulator, value) => ({ ...accumulator, [value]: [] }),
          {}
        )
      : [];

    this.scene.clear();

    const data = this.overlay.data;

    const plot = {
      w: this.xAxis.candleW,
    };

    if (Array.isArray(plots)) {
      const t = range.value(range.indexStart)[0];
      const s = this.overlay.data[0][0];
      let c = (t - s) / range.interval;
      const o = this.Timeline.rangeScrollOffset;
      let i = range.Length + o + 2;

      const style = {
        stroke:
          this.customSettings?.inputsBaseProps?.colours[0] || this.style.stroke,
      };

      while (i) {
        if (c < 0 || c >= this.overlay.data.length) {
          plots.push({ x: null, y: null });
        } else {
          plot.x = this.xAxis.xPos(data[c][0]);
          plot.y = this.yAxis.yPos(data[c][1]);
          plots.push({ ...plot });
        }
        c++;
        i--;
      }

      this.plot(plots, "renderLine", style);
    } else {
      Object.keys(plots).forEach((plotName, index) => {
        const start = {
          x: this.xAxis.xPos(range.data[0][0]),
          y: this.yAxis.yPos(data[0][index + 1]),
        };

        plots[plotName].push({ ...plot, ...start });

        const end = {
          x: this.xAxis.xPos(range.data[range.data.length - 1][0]),
          y: this.yAxis.yPos(data[0][index + 1]),
        };

        plots[plotName].push({ ...plot, ...end });
      });

      Object.keys(plots).forEach((plotName, index) => {
        const style = {
          stroke:
            this.customSettings?.inputsBaseProps?.colours[index] ||
            this.style.stroke,
        };

        this.plot(plots[plotName], "renderLine", style);
      });
    }

    this.target.viewport.render();
  }
}
