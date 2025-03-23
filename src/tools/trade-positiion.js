// trade-position.js

import { isArray, isBoolean, isNumber, isObject, isString } from '../utils/typeChecks'
import Tool from "../components/overlays/chart-tools"
// import { lineConfig } from "../definitions/tools";
import StateMachine from '../scaleX/stateMachne';
import  ToolNode, { nodeRender, NodeState, } from '../components/primitives/node';


export default class TradePosition extends Tool {

  #colour = lineConfig.colour
  #lineWidth = lineConfig.width
  #stateMachine

  constructor(config) {
    super(config)
  }

    set stateMachine(config) { this.#stateMachine = new StateMachine(config, this) }
    get stateMachine() { return this.#stateMachine }

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

    }

}
