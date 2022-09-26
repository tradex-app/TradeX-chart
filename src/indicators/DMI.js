// DMI.js

import indicator from "../components/overlays/inidcator"
import { 
  YAXIS_TYPES
} from "../definitions/chart";

export default class DMI extends indicator {
  name = 'Directional Movement Index'
  shortName = 'DMI'
  onChart = false
  calcParams = [20]
  checkParamCount = false
  plots = [
    { key: 'DMI_1', title: ' ', type: 'line' },
  ]
  defaultStyle = {
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
  style = {}
  overlay
  TALib

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

    this.overlay = overlay
    this.style = {...this.defaultStyle, ...config.style}
    this.TALib = xAxis.mediator.api.core.TALib
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

  draw(range) {
    this.scene.clear()

    const data = this.overlay.data
    const width = this.xAxis.candleW
    const x2 = this.scene.width + (this.xAxis.bufferPx * 2)
    const y1 = this.yAxis.yPos(100 - this.style.defaultHigh)
    const y2 = this.yAxis.yPos(100 - this.style.defaultLow)

  }
}