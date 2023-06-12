// custom-indicator.js
// proof of concept for user defined indicators

// import { Indicator } from "tradex-chart"
import { Indicator, Range, uid } from "./src"

export default class Test extends Indicator {

  name = "Test Custom Inicator"
  shortName = "Test"

  timePeriod = 20

  #defaultStyle = {
    stroke: "#0088cc",
    lineWidth: "1",
    dash: undefined,
  }

  style = {}

  static inCnt = 0
  static onChart = true
  // static scale is required for off chart indicators
  // static scale = YAXIS_TYPES[0] // YAXIS_TYPES - default
  static colours = []


  /**
   * Creates an instance of Test.
   * @param {object} target - canvas scene
   * @param {object} xAxis - timeline axis instance
   * @param {object} yAxis - scale axis instance
   * @param {object} config - theme / styling
   * @param {object} parent - (on/off)chart pane instance that hosts the indicator
   * @param {object} params - contains minimum of overlay instance
   * @memberof Test
   */
  constructor(target, xAxis=false, yAxis=false, config, parent, params) {
    super(target, xAxis, yAxis, config, parent, params)

    const overlay = params.overlay
    // initialize indicator values
    this.id = params.overlay?.id || uid(this.shortName)
    // merge user defined settings (if any) with defaults
    this.style = (overlay?.settings?.style) 
      ? { ...this.#defaultStyle, ...overlay.settings.style } 
      : { ...this.#defaultStyle, ...config.style }
    // calculate back history if missing
    this.calcIndicatorHistory()
    // enable processing of price stream
    this.setUpdateValue = (value) => { 
      this.updateValue(value) 
    }
    // add the indicator legend to the chart pane
    this.addLegend()
  }

  /**
   * define where indicator should be displayed
   * valid returned values can be: true, false (boolean), both (string)
   * @readonly
   */
  get onChart() { return Test.onChart }

  /**
   * return inputs required to display indicator legend on chart pane
   * legends can display multiple values
   * @param {array} [pos=this.chart.cursorPos] - optional
   * @return {object} - {inputs, colours, labels}
   */
  legendInputs(pos=this.chart.cursorPos) {
    if (this.overlay.data.length == 0) return false

    // determine which legend labels to display
    let labels = [false]
    // c - retrieve data index
    let {c, colours} = super.legendInputs(pos)
    // build an object of input keys (labels) and values
    let inputs = {x: this.scale.nicePrice(this.overlay.data[c][1])}

    /**
      @param {object} inputs - property names are used as labels
      @param {array} colours - array of #rrggbb(aa) values
      @param {array} labels - array of which input labels to dispaly [true, false, ...]
    */
    return {inputs, colours, labels}
  }

  /**
   * process new candle stream value
   * @param {array} candle - [timestamp, open, high, low, close, volume]
   * @memberof Test
   */
  updateValue(candle) {
    this.value = candle
  }

  calcIndicator(range=this.range) {
    let start, end;
    // number of values to use in indicator calculation
    let p = this.timePeriod

    // is it a Range instance?
    if(range instanceof Range) {
      // if not calculate entire history
      start = 0
      end = range.dataLength - p + 1
    }
    else if ( "indexStart" in range || "indexEnd" in range ||
              "tsStart" in range ||  "tsEnd" in range ) {
      start = range.indexStart || this.Timeline.t2Index(range.tsStart || 0) || 0
      end = range.indexEnd || this.Timeline.t2Index(range.tsEnd) || this.range.Length - 1
      end - p
    }
    else return false

    // if not enough data for calculation fail
    if ( end - start < p ) return false

    let data = [];
    let i, v, entry;

    while (start < end) {
      v = 0
      for (i=0; i<p; i++) {
        v += this.range.value(start)[4]
      }
      v /= p
      data.push([this.range.value(start + p - 1)[0], v])
      start++
    }
    return data
  }

  calcIndicatorHistory() {
    // if overlay history is missing, calculate it
    if (this.overlay.data.length < this.timePeriod) {
      const data = this.calcIndicator()
      if (data) this.overlay.data = data
    }
  }
  
  /**
   * draw the indicator
   * @param {object} range - current displayed range of candles
   */
  draw(range=this.range) {
    // minimum of two candles are required for this indicator
    if (this.overlay.data.length < 2 ) return false
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
    let style = {}

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
  }
}
