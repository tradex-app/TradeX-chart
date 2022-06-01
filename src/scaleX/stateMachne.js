// stateMachine.js
// a simple Finite State Machine

import { isFunction, isObject, isString } from "../utils/typeChecks"
import { isArrayEqual } from "../utils/utilities"

export default class StateMachine {

  #state
  #statePrev
  #context
  #config
  #status = "idle"
  #statuses = ["await", "idle", "running", "stopped"]

  constructor(config) {
    this.#config = config
    this.#state = config.initialState
    this.#context = config.context
  }

  get state() { return this.#state }
  get previousSate() { return this.#statePrev }
  get context() { return this.#context }
  get status() { return this.#status }

  transition(event) {
    const currStateConfig = this.#config[this.#state]
    const destTransition = currStateConfig.transitions[event]
    if ( !destTransition 
      || !isFunction(destTransition.action)
      || this.#status !== "running") {
      return false
    }
    const destState = destTransition.target
    const destStateConfig = this.#config[destState]

    destTransition.action(this)
    currStateConfig.actions?.onExit(this)
    destStateConfig.actions?.onEnter(this)

    this.#statePrev = this.#state
    this.#state = destState

    return this.#state
  }

  canTransition(event) {
    const currStateConfig = this.#config[this.#state]
    return event in currStateConfig.transitions
  }

  set_status(s) {
    if (!isString(s)) return false

    switch(s) {
      case "start": this.#status = "running"; break;
      case "stop": this.#status = "stopped"; break;
    }

    return this.status
  }

  static validateConfig(c) {
    if (!isObject(c)) return false

    let keys = Object.keys(c)

    if (!(keys.includes("initialState"))) return false

    const states = keys.filter(k => k !== "initialState")

    const stateKeys = ["actions", "transitions"]
    for (state in states) {
      keys = Object.keys(c[state])
      if (!isArrayEqual(keys, stateKeys)) return false

      for (let action in c[state].actions) {
        if (!isFunction(action)) return false
      }

      for (let event in c[state].transitions) {
        if (!(states.includes(c[state].transitions[event]?.target))) return false
        if (!isFunction(c[state].transitions[event].action)) return false
      }
    }

    return true
  }

}

