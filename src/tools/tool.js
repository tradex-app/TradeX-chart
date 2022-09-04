// tool.js
// base class for chart drawing tools

import { uid } from "../utils/utilities"


export default class Tool {

  static #cnt = 0
  static #instances = {}

  #ID
  #inCnt = null
  #config

  constructor(config) {
    this.#config = config
    this.#inCnt = config.cnt
    this.#ID = this.#config.offChartID || uid("TX_Tool_")
  }

  get inCnt() { return this.#inCnt }

  static create(row, config) {
    const cnt = ++Tool.#cnt
    
    config.cnt = cnt
    config.toolID = `${config.toolID}_${cnt}`
    config.row = row

    const tool = new config.tool(config)

    Tool.#instances[cnt] = tool

    return tool
  }

  static destroy(tool) {
    if (tool.constructor.name === "Tool") {
      const inCnt = tool.inCnt
      delete Tool.#instances[inCnt]
    }
  }

}