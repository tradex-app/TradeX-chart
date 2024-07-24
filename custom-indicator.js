// custom-indicator.js
// proof of concept for user defined indicators

// import { Indicator } from "tradex-chart"
import { Indicator, Range, uid } from "./src"
import { isArray, isObject } from "./src/utils/typeChecks"

/**
 * custom indicator class
 */
export default class Test extends Indicator {

  static inCnt = 0
  static primaryPane = true
  // static scale is required for off chart indicators
  // static scale = YAXIS_TYPES[0] // YAXIS_TYPES - default
  static colours = []
  static defaultStyle = {
    output: {
      colour: "#0088cc",
      width: 1,
      dash: [],
    }
  }

  get name() {return "Test Custom Inicator" }
  shortName = "Test"
  timePeriod = 20

  definition = {
    output: {
      output: []
    },
    meta: {
      output: [
        {name: "output", type: "custom", plot: "line"}
      ]
    }
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
   * calculate indicator values
   * @param {Object} range - instance of Range
   * @returns {boolean|array}
   */
/*
  calcIndicator (indicator, params={}, range, output=this.definition.output) {

    // if (this.noCalc(indicator, range)) return false

    // get the period 
    let d = this.getTimePeriod()
    // params.timePeriod = params.timePeriod || this.definition.input.timePeriod || DEFAULT_PERIOD
    let start, end;
    let p = d
    let t = p + (params?.padding || 0)
    let od = this.overlay.data

    // is it a Range instance?
    if (range instanceof Range) {
      start = 0
      end = range.dataLength - t + 1
    }
    else if ( isObject(range) ) {
      start = range?.indexStart || this.Timeline.t2Index(range?.tsStart || 0) || 0
      end = range?.indexEnd || this.Timeline.t2Index(range?.tsEnd) || range.dataLength - t + 1
      end - t
    }
    else return false

    // check if a full or only partial calculation is required
    if (!isArray(od)) return false
    // full calculation required
    // full calculation required
    else if (od.length == 0) { }
    // partial calculation required
    else if (od.length + t !== range.dataLength) {
      // new data in the past?
      if (od[0][0] > range.value(t)[0]) {
        start = 0
        end = range.getTimeIndex(od[0][0]) - t
        end = limit(end, t, range.dataLength - 1)
      }
      // new data in the future ?
      else if (od[ od.length - 1 ][0] < range.value( range.dataLength - 1 )[0]) {
        start = od.length - 1 + t
        start = limit(start, 0, range.dataLength)
        end = range.dataLength - 1
      }
      // something is wrong
      else return false
    }
    // up to date, no need to calculate
    else return false

    // if not enough data for calculation fail
    if ( end < t ) return false
    if ( end - start < t ) {
      start -= (t + p) - (end - start)
    }

    let data = [];
    let entry, input, value;

    while (start < end) {
      // fetch the data required to calculate the indicator
      input = this.indicatorInput(start, start + t)
      // params = {...params, ...input}
      // // let hasNull = params.inReal.find(element => element === null)
      // // if (hasNull) return false

      // entry = this.TALib[indicator](params)
      entry = [input.close[0]]
      value = this.formatValue(entry)

      // store entry with timestamp
      data.push([range.value(start + p - 1)[0], ...value])
      // data.push([range.value(start - 1)[0], ...v])

      start++
    }
    return data
  }

*/

  
  calcIndicator (indicator, params={}, range, output) {
    // number of values to use in indicator calculation
    let p = this.getTimePeriod()
    let start, end;
    let t = p + (params?.padding || 0)

    // is it a Range instance?
    if(range instanceof Range) {
      // if not calculate entire history
      start = 0
      end = range.dataLength - t + 1
    }
    else if ( isObject(range) ) {
      start = range?.indexStart || this.Timeline.t2Index(range?.tsStart || 0) || 0
      end = range?.indexEnd || this.Timeline.t2Index(range?.tsEnd) || range.dataLength - t + 1
      end - t
    }
    else return false

    // if not enough data for calculation fail
    if ( end < t ) return false
    if ( end - start < t ) {
      start -= (t + p) - (end - start)
    }

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

  calcIndicatorStream (indicator, params, range=this.range) {
    // if (this.noCalc(indicator, range) ||
    //     !(range instanceof Range)
    //     ) return false

    if (!(range instanceof Range)) return false

    // let entry = this.TALib[indicator](params)
    // let entry = {output: [params.close[0]]}
    let end = range.dataLength
    let time = range.value(end)[0]
    // let value = this.formatValue(entry)
    let value = [params.close[0]]

    return [time, ...value]
  }
  
  /**
   * draw the indicator
   * @param {Object} range - current displayed range of candles
   */
  draw() {
    super.draw()
  }

  /*
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

    super.updated()
  }
  */
}
