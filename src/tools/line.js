// line.js
// ray, horizontal ray, vertical ray

import { isArray, isBoolean, isNumber, isObject, isString } from '../utils/typeChecks'
import Tool from "./tool";
import { lineConfig } from "../definitions/tools";
import StateMachine from '../scaleX/stateMachne';

// import tinycolor from 'tinycolor2';


export default class Line extends Tool {

  #colour = lineConfig.colour
  #lineWidth = lineConfig.lineWidth
  #stateMachine

  constructor(config) {
    super(config)
  }

  set colour(colour=this.#colour) {
    // const c = tinycolor(colour)
    // this.#colour = (c.isValid()) ? colour : this.#colour
    this.#colour = colour
  }
  get colour() { return this.#colour }
  set lineWidth(width) { this.#lineWidth = (isNumber(width)) ? width : this.#lineWidth }
  get lineWidth() { return this.#lineWidth }
  set stateMachine(config) { this.#stateMachine = new StateMachine(config, this) }
  get stateMachine() { return this.#stateMachine }

  start() {
    this.eventsListen()
    // // start State Machine 
    // stateMachineConfig.context.origin = this
    // this.#mediator.stateMachine = stateMachineConfig
    // this.#mediator.stateMachine.start()
    // this.emit(`tool_start`, this.ID)
    // // progress state from idle to active
    // this.#mediator.stateMachine.notify(`tool_${this.#name}_start`, this.ID)

    let [x1, y1] = this.cursorClick

    const scene = this.layerTool.scene
    scene.clear()
    const ctx = this.layerTool.scene.context

    ctx.save();

    ctx.lineWidth = this.lineWidth
    ctx.strokeStyle = this.colour

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(300, 150);
    ctx.stroke()
    ctx.closePath()

    ctx.restore()

    this.elViewport.render()
  }


}
