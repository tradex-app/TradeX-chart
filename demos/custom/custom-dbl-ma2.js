// custom-indicator.js
// proof of concept for user defined indicators

// import { Indicator } from "tradex-chart"
// import { Indicator, Range, uid } from "./src"
import { Indicator, IndicatorClasses, Range, uid, YAXIS_TYPE } from "../../src"


/**
 * custom indicator class
 */
export default class DblMA extends Indicator {

  static inCnt = 0
  static primaryPane = false
  static compositePane = true
  static scale = YAXIS_TYPE.default
  static colours = []
  static defaultStyle = {
    stroke: "#0088cc",
    lineWidth: 1,
    dash: undefined,
  }

  name = "Test Custom Inicator"
  shortName = "DblMA2"
  definition = {
    input: {
      inReal: [], 
      timePeriod: 20 // 30
    },
    output: {
      output: [],
    },
  }

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

    if (this.overlay.data.length == 0) return false

    // determine which legend labels to display
    let labels = [false]
    // c - retrieve data index
    let {c, colours} = super.legendInputs(pos)
    // build an object of input keys (labels) and values
    let inputs = {x: this.scale.nicePrice(this.overlay.data[c][1])}

    /**
      @param {Object} inputs - property names are used as labels {label: string}
      @param {Array.<string>} colours - array of #rrggbb(aa) values
      @param {Array.<string>} labels - array of which input labels to dispaly [true, false, ...]
    */
    return {inputs, colours, labels}
  }

  /**
   * calculate indicator values
   * @param {Object} range - instance of Range
   * @returns {boolean|array}
   */
  calcIndicator(indicator, params={}, range=this.range) {
    let result1 = super.calcIndicator("MA", {timePeriod: 5}, range)
    let result2 = super.calcIndicator("MA", {timePeriod: 20}, range)

    if (!result1 && !result2) return false

    for (let i=0; i<result1.length; i++) {
      result1[i][2] = result2[i][1]
    }
    return result1
  }

  // calcIndicatorHistory() {
  //   // if overlay history is missing, calculate it
  //   const calc = () => {
  //     const data = this.calcIndicator()
  //     if (data) this.overlay.data = data

  //   }



  //   if (this.overlay.data.length < this.timePeriod) {
  //     const data = this.calcIndicator()
  //     if (data) this.overlay.data = data
  //   }
  // }
  
  /**
   * draw the indicator
   * @param {Object} range - current displayed range of candles
   */
  draw(range=this.range) {
    // minimum of two candles are required for this indicator
    if (this.overlay.data.length < 2 ) return false
    // only draw if update conditions are met
    if (!super.mustUpdate()) return false
    // clear the indicator overlay (chart layer)
    this.scene.clear()

    // draw your indicator...

    // array to hold sequence points to draw
    const plots = []
    // indicator data
    const data = this.overlay.data
    // current candle width, chart zoom modifies this
    const width = this.xAxis.candleW
    // basic plot entry
    const plot = {
      w: width,
    }
    // first timestamp in current range
    let t = range.value(range.indexStart)[0]
    let s = this.overlay.data[0][0]
    let c = (t - s) / range.interval
    let o = this.Timeline.rangeScrollOffset;
    let i = range.Length + o + 2

    while(i) {
      if (c < 0 || c >= this.overlay.data.length) {
        plots.push({x: null, y: null})
      }
      else {
        plot.x = this.xAxis.xPos(data[c][0])
        plot.y = this.yAxis.yPos(data[c][1])
        plots.push({...plot})
      }
      c++
      i--
    }
    // process the plots
    this.plot(plots, "renderLine", this.style)
    // render the indicator
    this.target.viewport.render();

    super.updated()
  }
}
