// custom-indicator.js
// proof of concept for user defined indicators

// import { Indicator } from "tradex-chart"
import { Indicator, uid } from "./src"

export default class Test extends Indicator {

  name = "Test Custom Inicator"
  shortName = "Test"

  #defaultStyle = {}

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
    this.ID = params.overlay?.id || uid(this.shortName)
    // merge user defined settings (if any) with defaults
    this.style = (overlay?.settings?.style) ? {...this.#defaultStyle, ...overlay.settings.style} : {...this.#defaultStyle, ...config.style}
    // calculate back history if missing
    this.calcIndicatorHistory()
    // enable processing of price stream
    this.setUpdateValue = (value) => { this.updateValue(value) }
    // add the indicator legend to the chart pane
    this.addLegend()
  }

  /**
   * define where indicator should be displayed
   * valid returned values can be: true, false (boolean), both (string)
   * @readonly
   */
  get onChart() { return true }

  /**
   * return inputs required to display indicator legend on chart pane
   * @return {object} - {inputs, colours, labels}
   */
  legendInputs() {
    let labels = [false]
    let inputs = {x: 0}
    let colours = ["#ccc"]

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

  calcIndicatorHistory() {

  }
  
  /**
   * draw the indicator
   * @param {object} range - current displayed range of candles
   */
  draw(range) {
    console.log("draw custom indicator")

    // minimum of two candles are required for this indicator
    if (this.overlay.data.length < 2 ) return false
    // clear the indicator overlay (chart layer)
    this.scene.clear()

    // draw your indicator...

    // render the 
    this.target.viewport.render();
  }
}