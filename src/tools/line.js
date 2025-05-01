// line.js
// ray, horizontal ray, vertical ray

import { isArray, isBoolean, isNumber, isObject, isString } from '../utils/typeChecks'
import { debounce, idSanitize, uid } from '../utils/utilities';
import { ChartTool } from "../components/overlays/chart-tools"
import State from '../state/chart-state';
import { HIT_DEBOUNCE } from '../definitions/core';
import Colour from '../utils/colour';

const LINECONFIG = {
  colour: "#ffffff",
  width: 1.5
}

let nameShort = "line"
let nameLong = 'Line'

export default class Line extends ChartTool {

  get name() { return nameLong }
  get shortName() { return nameShort }

  static #cnt = 0
  static get inCnt() { return Line.#cnt++ }

  #colour = LINECONFIG.colour
  #lineWidth = LINECONFIG.width
  #stateMachine

  constructor(target, xAxis=false, yAxis=false, theme, parent, params) {

    super(target, xAxis, yAxis, theme, parent, params)
    this.validateSettings(params?.settings)
    // State.importData("tradesPositions", this.data, this.state, this.state.time.timeFrame)
  }

  get inCnt() { return Line.#cnt }
  set colour(colour) {
    let c = new Colour(colour)
    this.#colour = (c.isValid) ? colour : this.#colour
  }
  get colour() { return this.#colour }
  set lineWidth(width) { this.#lineWidth = (isNumber(width)) ? width : this.#lineWidth }
  get lineWidth() { return this.#lineWidth }

  validateSettings(s) {
    if (!isObject(s)) return false

    this.colour = s?.colour
    this.lineWidth = s?.width

    // this.posStart = s?.postStart
    // this.posEnd = s?.posEnd
  }

  start() {
    this.eventsListen()
    // // start State Machine 
    // stateMachineConfig.id = this.id
    // stateMachineConfig.context = this
    // this.#core.stateMachine = stateMachineConfig
    // this.#core.stateMachine.start()
    // this.emit(`tool_start`, this.id)
    // // progress state from idle to active
    // this.#core.stateMachine.notify(`tool_${this.#name}_start`, this.id)


  }

  destroy() {
    this.stateMachine.destroy()
  }

  draw() {
    // let [x1, y1] = this.chartPane.cursorClick

    let [x1, y1] = [0,0]

    const scene = this.scene
    scene.clear()
    const ctx = this.scene.context

    ctx.save();

    ctx.lineWidth = this.lineWidth
    ctx.strokeStyle = this.colour

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(300, 150);
    ctx.stroke()
    ctx.closePath()

    ctx.restore()

    this.target.viewport.render()
  }
}

const stateMachineConfig = {

}