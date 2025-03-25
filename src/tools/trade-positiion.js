// trade-position.js

import { isArray, isBoolean, isNumber, isObject, isString } from '../utils/typeChecks'
import { debounce } from '../utils/utilities';
import Tool from "../components/overlays/chart-tools"
import State from '../state/chart-state';
import StateMachine from '../scaleX/stateMachne';
import  ToolNode, { nodeRender, NodeState, } from '../components/primitives/node';
import { HIT_DEBOUNCE } from '../definitions/core';

const tradePositionDef = {
  styles: {
    positionRange: {
      width: "50px",
      "max-width": "50%",
      "min-width": "10%"
    }
  }
}


export default class TradePosition extends Tool {

  static isOverlay = true


  #stateMachine

  constructor(target, xAxis=false, yAxis=false, theme, parent, params) {
    super(target, xAxis=false, yAxis=false, theme, parent, params)
    this.settings = params.settings
    State.importData("tradesPositions", this.data, this.state, this.state.time.timeFrame)
  }

    set position(p) { this.target.setPosition(p[0], p[1]) }
    get data() { return this.overlay.data }
    get settings() { return this.params.settings }
    set settings(s) { this.doSettings(s) }
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

    doSettings(s) {
      if (!isObject(s)) return false
  
      let t = this.theme.trades
      for (let e in s) {
        if (s[e] === undefined) continue
        t[e] = s[e]
      }
    }

    onPrimaryPointerDown(e) {
      if (this.core.MainPane.stateMachine.state !== "chart_pan") 
        debounce(this.isTradePositionSelected, HIT_DEBOUNCE, this)(e)
    }

    /**
     * Is a Trade Posiition Tool selected?
     * @param {array} e - pointer event [x, y]
     * @returns {boolean}
     */
    isTradePositionSelected(e) {
      const evt = e[2].domEvent.srcEvent
      // const DOM = this.chart.element.DOM
      const DOM = (evt.target || evt.srcElement).getBoundingClientRect()
      const x = evt.clientX - (DOM.right - DOM.width)
      const y = evt.clientY - DOM.top
      const k = this.hit.getIntersection(x,y)

      if (this.core.config?.tradesPositions?.display === false ||
        this.core.config?.tools?.display === false ||
        k == -1)
        return false
      else 
        return true
    }
  
    canTradePositionDraw() {
      if (!super.mustUpdate() ||
          !isObject(this.data) ||
          Object.keys(this.data).length == 0 ||
          this.core.config?.tools?.display === false
          ) return false
      else return true
    }

    draw(range=this.core.range) {
      if (!this.canTradePositionDraw()) return
  
      this.hit.clear()
      this.scene.clear()

      super.updated()
    }

}
