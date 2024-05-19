// MA_Multi.js
// Moving Average Multi
// Provides multiple Moving Averages in one Indicator
// https://hackape.github.io/talib.js/modules/_index_.html#ma
// https://www.investopedia.com/terms/s/ma.asp

import Indicator, { InputPeriodEnable } from "../components/overlays/indicator"
// import { MA as talibAPI } from "../definitions/talib-api";
import MA from "../indicators/MA"
import { colours2 } from "../components/views/colourPicker";

 
 export default class MA_Multi extends Indicator {

  static inCnt = 0
  static primaryPane = true
  // static scale = YAXIS_TYPES[0] // YAXIS_TYPES - default

  // colours2 10 x 5
  static colours = [
    colours2[8],
    colours2[18],
    colours2[28],
    colours2[38],
    colours2[48],
  ]
  static defaultStyle = {
    stroke1: MA_Multi.colours[0],
    width1: '1',
    stroke2: MA_Multi.colours[1],
    width2: '1',
    stroke3: MA_Multi.colours[2],
    width3: '1',
    stroke4: MA_Multi.colours[3],
    width4: '1',
    stroke5: MA_Multi.colours[4],
    width5: '1',
  }

  name = 'Moving Average Multi'
  shortName = 'MA'
  libName = 'MA'
  definition = {
    input: {
      inReal: [], 
      timePeriod1: new InputPeriodEnable(true, 5),
      timePeriod2: new InputPeriodEnable(true, 10),
      timePeriod3: new InputPeriodEnable(true, 20),
      timePeriod4: new InputPeriodEnable(true, 30),
      timePeriod5: new InputPeriodEnable(true, 50)
    },
    output: {
      output1: [],
      output2: [],
      output3: [],
      output4: [],
      output5: [],
    },
  }

  #precision = 2
  primaryPane = true
  scaleOverlay = false
  plots = [
    { key: 'MA_1', title: 'MA: ', type: 'line' },
  ]

  
  #MACnt = 3
  #MACntMax = 5
  MA = {
    MA1: {enabled: false, ma: null},
    MA2: {enabled: false, ma: null},
    MA3: {enabled: false, ma: null},
    MA4: {enabled: false, ma: null},
    MA5: {enabled: false, ma: null}
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

    // this.init(talibAPI)
    // this.init(target, xAxis, yAxis, config, parent, params) 

    // init
    const MAChildren = params.overlay.settings?.MAChildren || this.MA
    this.#MACnt = Object.keys(MAChildren).length

    this.MA.ma1 = new MA(target, xAxis=false, yAxis=false, config, parent, params)
    this.MA.ma2 = new MA(target, xAxis=false, yAxis=false, config, parent, params)
    // this.MA.ma1.primaryPane = primaryPane
    // this.MA.ma2.primaryPane = primaryPane
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

