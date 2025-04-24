// text.js

import Tool, { ChartTool } from "../components/overlays/chart-tools"

let nameShort = "text"
let nameLong = 'Text'

export default class Text extends ChartTool {

  static #cnt = 0
  static get inCnt() { return Text.#cnt++ }

  get name() { return nameLong }
  get shortName() { return nameShort }

  constructor(cfg) {

    const { target, xAxis=false, yAxis=false, theme, parent, params } = cfg
    super(target, xAxis, yAxis, theme, parent, params)
    this.validateSettings(params?.settings)
  }

  draw() {}

}
