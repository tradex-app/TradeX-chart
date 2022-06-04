// stateMachine.js
// a simple Finite State Machine

import { isFunction, isObject, isString } from "../utils/typeChecks"
import { isArrayEqual } from "../utils/utilities"

export default class StateMachine {

  #state
  #statePrev
  #context
  #config
  #mediator
  #status = "stopped"
  #event
  #statuses = ["await", "idle", "running", "stopped"]

  constructor(config, mediator) {
    this.#config = config
    this.#state = config.initial
    this.#context = config.context
    this.#mediator = mediator

    if (!StateMachine.validateConfig) return false

    this.#subscribe()
  }

  get state() { return this.#state }
  get previousSate() { return this.#statePrev }
  get context() { return this.#context }
  get mediator() { return this.#mediator }
  get status() { return this.#status }
  get event() { return this.#event }

  notify(event, data) {
    this.#event = event
    const currStateConfig = this.#config.states[this.#state]
    const destTransition = currStateConfig.on[event]
    if ( !destTransition 
      || !isFunction(destTransition.action)
      || this.#status !== "running") {
      return false
    }
    const destState = destTransition.target
    const destStateConfig = this.#config.states[destState]

    destTransition.action(this, data)
    currStateConfig?.onExit(this, data)
    destStateConfig?.onEnter(this, data)

    this.#statePrev = this.#state
    this.#state = destState

    return this.#state
  }

  canTransition(event) {
    const currStateConfig = this.#config.states[this.#state]
    return event in currStateConfig.on
  }

  start() { this.#status = "running" }
  stop() { this.#status = "stopped" }

  #subscribe() {
    const events = new Set()

    for (let state in this.#config.states) {
      for (let event in this.#config.states[state].on) {
        events.add(event)
      }
    }

    for (let event of events) {
      this.#mediator.on(event, (data) => {this.notify(event, data)})
    }
  }

  static validateConfig(c) {
    if (!isObject(c)) return false

    const required = ["id", "initial", "context", "states"]
      let keys = Object.keys(c)

    if (!isArrayEqual(required, keys)) return false

    if (!(c.initial in c.states)) return false

    for (state in c.states) {
      if ("onEnter" in c.states[state] && !isFunction(c.states[state])) return false
      if ("onExit" in c.states[state] && !isFunction(c.states[state])) return false
      if ("on" in c.states[state]) {
        for (let event of c.states[state].on) {
          if (!isString(event.target)) return false
          if ("action" in event && !isFunction(event.action)) return false
        }
      }
    }

    return true
  }

}

