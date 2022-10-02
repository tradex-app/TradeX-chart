// DMI.js

import indicator from "../components/overlays/inidcator"
import { 
  YAXIS_TYPES
} from "../definitions/chart";
import { uid } from "../utils/utilities"

export default class DMI extends indicator {
  #ID
  #name = 'Directional Movement Index'
  #shortName = 'DMI'
  #onChart = false
  #precision = 2
  #calcParams = [20]
  #checkParamCount = false
  #scaleOverlay = true
  #plots = [
    { key: 'DMI_1', title: ' ', type: 'line' },
  ]
  #defaultStyle = {
    strokeStyle: "#C80",
    lineWidth: '1',
    defaultHigh: 75,
    defaultLow: 25,
    highLowLineWidth: 1,
    highLowStyle: "dashed",
    highStrokeStyle: "#848",
    lowStrokeStyle: "#848",
    highLowRangeStyle: "#22002220"
  }
  #style = {}

  // YAXIS_TYPES - percent
  static scale = YAXIS_TYPES[1]

  /**
 * Creates an instance of DMI.
 * @param {object} target - canvas scene
 * @param {object} overlay - data for the overlay
 * @param {instance} xAxis - timeline axis
 * @param {instance} yAxis - scale axis
 * @param {object} config - theme / styling
 * @memberof DMI
 */
  constructor(target, overlay, xAxis, yAxis, config) {
    super(target, xAxis, yAxis, config)

    this.#ID = uid(this.#shortName)
    this.style = {...this.defaultStyle, ...config.style}
  }

  get ID() { return this.#ID }
  get name() { return this.#name }
  get shortName() { return this.#shortName }
  get onChart() { return this.#onChart }
  get style() { return this.#style }
  get plots() { return this.#plots }

  indicatorStream() {
    // return indicator stream
  }

  calcIndicator(input) {
    this.overlay.data = this.TALib.DMI(input)
  }

  regeneratePlots (params) {
    return params.map((_, index) => {
      const num = index + 1
      return { key: `dmi${num}`, title: `DMI${num}: `, type: 'line' }
    })
  }

  updateIndicator (input) {

  }

  draw(range) {
    this.scene.clear()

    const data = this.overlay.data
    const width = this.xAxis.candleW
    const x2 = this.scene.width + (this.xAxis.bufferPx * 2)
    const y1 = this.yAxis.yPos(100 - this.style.defaultHigh)
    const y2 = this.yAxis.yPos(100 - this.style.defaultLow)

  }
}