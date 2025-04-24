// fibonacci

import Tool from "../components/overlays/chart-tools"

let nameShort = "fib"
let nameLong = 'Fibonacci'

export default class Fibonacci extends Tool {

  static #cnt = 0
  static get inCnt() { return Fibonacci.#cnt++ }

  get name() { return nameLong }
  get shortName() { return nameShort }

  constructor(cfg) {

    const { target, xAxis=false, yAxis=false, theme, parent, params } = cfg
    super(target, xAxis, yAxis, theme, parent, params)
    this.validateSettings(params?.settings)
  }

  draw() {}

}
