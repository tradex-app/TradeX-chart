// custom-dbl-ma.js
// Double Moving Average - Secondary Chart Pane

// import { Indicator } from "tradex-chart"
import { Indicator, IndicatorClasses, Range, uid } from "./src"

const primaryPane = false

/**
 * custom indicator class
 */
export default class DblMA extends Indicator {

  static inCnt = 0
  static primaryPane = primaryPane
  // static scale is required for off chart indicators
  // static scale = YAXIS_TYPE.default
  static colours = []
  static defaultStyle = {
    stroke: "#0088cc",
    lineWidth: 1,
    dash: undefined,
  }

  name = "Test Custom Inicator"
  shortName = "DblMA"
  timePeriod = 20

  ma1
  ma2

  /**
   * Creates an instance of Test.
   * @param {Object} target - canvas scene
   * @param {Object} xAxis - timeline axis instance
   * @param {Object} yAxis - scale axis instance
   * @param {Object} config - theme / styling
   * @param {Object} parent - chart pane instance (primary|secondary) that hosts the indicator
   * @param {Object} params - contains minimum of overlay instance
   * @memberof Test
   */
  constructor(target, xAxis=false, yAxis=false, config, parent, params) {
    super(target, xAxis, yAxis, config, parent, params)

    // let settings1 = {...params.overlay.settings}
    // let settings2 = {...params.overlay.settings}
    // settings1.timePeriod = 5
    // settings2.timePeriod = 25
    params.overlay.settings.timePeriod = 5 // = settings1
    this.ma1 = new IndicatorClasses.MA(target, xAxis=false, yAxis=false, config, parent, params)
    params.overlay.settings.timePeriod = 25 // = settings2
    this.ma2 = new IndicatorClasses.MA(target, xAxis=false, yAxis=false, config, parent, params)
    this.ma1.primaryPane = primaryPane
    this.ma2.primaryPane = primaryPane

    this.init()
  }

  /**
   * return inputs required to display indicator legend on chart pane
   * legends can display multiple values
   * @param {Array} [pos=this.chart.cursorPos] - optional
   * @returns {Object} - {inputs, colours, labels}
   */
  legendInputs(pos=this.chart.cursorPos) {
    return false
  }
  // legendInputs(pos=this.chart.cursorPos) {
  //   if (this.overlay.data.length == 0) return false

  //   // determine which legend labels to display
  //   let labels = [false]
  //   // c - retrieve data index
  //   let {c, colours} = super.legendInputs(pos)
  //   // build an object of input keys (labels) and values
  //   let inputs = {x: this.scale.nicePrice(this.overlay.data[c][1])}

  //   /**
  //     @param {Object} inputs - property names are used as labels {label: string}
  //     @param {Array.<string>} colours - array of #rrggbb(aa) values
  //     @param {Array.<string>} labels - array of which input labels to dispaly [true, false, ...]
  //   */
  //   return {inputs, colours, labels}
  // }

  /**
   * calculate indicator values
   * @param {Object} range - instance of Range
   * @returns {boolean|array}
   */
  calcIndicator(range=this.range) {
    // this.ma1.overlay.data = this.ma1.calcIndicator("MA", {timePeriod: 20 }, range)
    // this.ma2.overlay.data = this.ma2.calcIndicator("MA", {timePeriod: 30 }, range)
  }
  // calcIndicator(range=this.range) {
  //   let start, end;
  //   // number of values to use in indicator calculation
  //   let p = this.timePeriod

  //   // is it a Range instance?
  //   if(range instanceof Range) {
  //     // if not calculate entire history
  //     start = 0
  //     end = range.dataLength - p + 1
  //   }
  //   else if ( "indexStart" in range || "indexEnd" in range ||
  //             "tsStart" in range ||  "tsEnd" in range ) {
  //     start = range.indexStart || this.Timeline.t2Index(range.tsStart || 0) || 0
  //     end = range.indexEnd || this.Timeline.t2Index(range.tsEnd) || this.range.Length - 1
  //     end - p
  //   }
  //   else return false

  //   // if not enough data for calculation fail
  //   if ( end - start < p ) return false

  //   let data = [];
  //   let i, v, entry;

  //   while (start < end) {
  //     v = 0
  //     for (i=0; i<p; i++) {
  //       v += this.range.value(start)[4]
  //     }
  //     v /= p
  //     data.push([this.range.value(start + p - 1)[0], v])
  //     start++
  //   }
  //   return data
  // }

  calcIndicatorHistory() {
    this.ma1.calcIndicatorHistory()
    this.ma2.calcIndicatorHistory()
  }
  
  /**
   * draw the indicator
   * @param {Object} range - current displayed range of candles
   */
  draw(range=this.range) {
    this.ma1.draw(range)
    this.ma2.draw(range)
  }
  // draw(range=this.range) {
  //   // minimum of two candles are required for this indicator
  //   if (this.overlay.data.length < 2 ) return false
  //   // only draw if update conditions are met
  //   if (!super.mustUpdate()) return false
  //   // clear the indicator overlay (chart layer)
  //   this.scene.clear()

  //   // draw your indicator...

  //   // array to hold sequence points to draw
  //   const plots = []
  //   // indicator data
  //   const data = this.overlay.data
  //   // current candle width, chart zoom modifies this
  //   const width = this.xAxis.candleW
  //   // basic plot entry
  //   const plot = {
  //     w: width,
  //   }
  //   // first timestamp in current range
  //   let t = range.value(range.indexStart)[0]
  //   let s = this.overlay.data[0][0]
  //   let c = (t - s) / range.interval
  //   let o = this.Timeline.rangeScrollOffset;
  //   let i = range.Length + o + 2
  //   let style = {}

  //   while(i) {
  //     if (c < 0 || c >= this.overlay.data.length) {
  //       plots.push({x: null, y: null})
  //     }
  //     else {
  //       plot.x = this.xAxis.xPos(data[c][0])
  //       plot.y = this.yAxis.yPos(data[c][1])
  //       plots.push({...plot})
  //     }
  //     c++
  //     i--
  //   }
  //   // process the plots
  //   this.plot(plots, "renderLine", this.style)
  //   // render the indicator
  //   this.target.viewport.render();

  //   super.updated()
  // }
}
