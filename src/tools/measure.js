// measure.js

import Tool, { ChartTool } from "../components/overlays/chart-tools"

let nameShort = "measure"
let nameLong = 'Measure'

export default class Measure extends ChartTool {

  static #cnt = 0
  static get inCnt() { return Measure.#cnt++ }

  get name() { return nameLong }
  get shortName() { return nameShort }

  constructor(cfg) {

    const { target, xAxis=false, yAxis=false, theme, parent, params } = cfg
    super(target, xAxis, yAxis, theme, parent, params)
    this.validateSettings(params?.settings)
  }

  draw() {}

}
