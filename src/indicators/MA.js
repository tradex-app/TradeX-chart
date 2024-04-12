// MA.js
// Moving Average
// https://hackape.github.io/talib.js/modules/_index_.html#ma
// https://www.investopedia.com/terms/s/ma.asp

import Indicator from "../components/overlays/indicator"
import { MA as talibAPI } from "../definitions/talib-api";

 
 export default class MA extends Indicator {

  name = 'Moving Average'
  shortName = 'MA'
  libName = 'MA'
  definition = {
    input: {
      inReal: [], 
      timePeriod: 20 // 30
    },
    output: {
      output: [],
    },
  }

  #precision = 2
  primaryPane = true
  scaleOverlay = false
  plots = [
    { key: 'MA_1', title: 'MA: ', type: 'line' },
  ]

  
  static inCnt = 0
  static primaryPane = true
  // static scale = YAXIS_TYPES[0] // YAXIS_TYPES - default
  static colours = [
    "#9C27B0",
    "#9C27B0",
    "#66BB6A",
    "#66BB6A"
  ]
  static defaultStyle = {
    stroke: "#C80",
    width: '1'
  }

  /**
   * Creates an instance of MA.
   * @param {Object} target - canvas scene
   * @param {Object} xAxis - timeline axis instance
   * @param {Object} yAxis - scale axis instance
   * @param {Object} config - theme / styling
   * @param {Object} parent - chart pane instance that hosts the indicator
   * @param {Object} params - contains minimum of overlay instance
   * @memberof MA
   */
  constructor(target, xAxis=false, yAxis=false, config, parent, params) {
    
    super(target, xAxis, yAxis, config, parent, params) 

    MA.inCnt++

    this.init(talibAPI)
  }
  
  legendInputs(pos=this.chart.cursorPos) {
    if (this.overlay.data.length == 0) return false

    const inputs = {}
    const {c, colours} = super.legendInputs(pos)
    inputs.MA_1 = this.scale.nicePrice(this.overlay.data[c][1])

    return {inputs, colours}
  }

  draw(range=this.range) {
    // no update required
    if (this.overlay.data.length < 2) return

    if (!super.mustUpdate()) return

    this.scene.clear()

    const data = this.overlay.data
    const width = this.xAxis.candleW
    const plots = []
    const offset = this.xAxis.smoothScrollOffset || 0
    const plot = {
      w: width,
    }

    // account for "missing" entries because of indicator calculation
    let o = this.Timeline.rangeScrollOffset
    let d = range.data.length - this.overlay.data.length
    let c = range.indexStart - d - 2
    let i = range.Length + (o * 2) + 2

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

    this.plot(plots, "renderLine", this.style)

    this.target.viewport.render();

    super.updated()
  }

}

