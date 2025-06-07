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
let nodeDefinitions = [
  {id: "node1", tracking: [undefined]},
  {id: "node2", tracking: ["node2"]},
]

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

    this.start()
  }

  get inCnt() { return Line.#cnt }
  set colour(colour) {
    let c = new Colour(colour)
    this.#colour = (c.isValid) ? colour : this.#colour
  }
  get colour() { return this.#colour }
  set lineWidth(width) { this.#lineWidth = (isNumber(width)) ? width : this.#lineWidth }
  get lineWidth() { return this.#lineWidth }
  get nodeDefinitions() { return nodeDefinitions }

  validateSettings(s) {
    if (!isObject(s)) return false

    this.colour = s?.colour
    this.lineWidth = s?.width
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

  render(ctx, scene) {

    let n = this.nodeList

    if (n.done.length !== 2) return

    let x1 = n.done[0].x
    let y1 = n.done[0].y
    let x2 = n.done[1].x
    let y2 = n.done[1].y

    ctx.save();

    ctx.lineWidth = this.lineWidth
    ctx.strokeStyle = this.colour

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke()
    ctx.closePath()

    ctx.restore()
  }
}

const stateMachineConfig = {

}