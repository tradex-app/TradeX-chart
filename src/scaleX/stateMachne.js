// stateMachine.js
// a simple Finite State Machine

import { isArray, isFunction, isObject, isString } from "../utils/typeChecks"
import { isArrayEqual, uid } from "../utils/utilities"

/**
 * Finite State Machine
 * @export
 * @class StateMachine
 */
export default class StateMachine {

  #id
  #state
  #statePrev
  #context
  #config
  #mediator
  #status = "stopped"
  #events
  #event
  #eventData
  #actions
  #statuses = ["await", "idle", "running", "stopped"]

  /**
   * Instantiate state machine
   * @param {object} config - state definition
   * @param {object} mediator - module mediate provides event handling
   */
  constructor(config, mediator) {
    if (!StateMachine.validateConfig(config)) return false

    this.#id = config.id
    this.#config = config
    this.#state = config.initial
    this.#context = config.context
    this.#actions = config.actions
    this.#mediator = mediator

    this.#subscribe()
  }

  /** @type {string} */
  get id() { return this.#id }
  get state() { return this.#state }
  get previousSate() { return this.#statePrev }
  get context() { return this.#context }
  get mediator() { return this.#mediator }
  get status() { return this.#status }
  get event() { return this.#event }
  get eventData() { return this.#eventData }
  get actions() { return this.#actions }

  notify(event, data) {
    this.#event = event
    this.#eventData = data
    const currStateConfig = this.#config.states[this.#state]
      let destTransition = currStateConfig.on[event]
    if ( !destTransition 
      || !isFunction(destTransition.action)
      || this.#status !== "running") {
      return false
    }
    let cond = destTransition?.condition?.type || destTransition?.condition || false
    if ( cond
      && !this.condition.call(this, cond, destTransition.condition)) {
      return false
    }
    const destState = destTransition.target
    const destStateConfig = this.#config.states[destState]

    currStateConfig?.onExit.call(this, data)
    destTransition.action.call(this, data)

    this.#statePrev = this.#state
    this.#state = destState

    destStateConfig?.onEnter.call(this, data)

    // null event - immediately transition (transient transition)
    if ( this.#config.states[destState]?.on
      && (this.#config.states[destState].on[''] 
      || this.#config.states[destState].on?.always) ) {

        const transient
          = this.#config.states[destState].on[''] 
          || this.#config.states[destState].on.always

        // Do we have an array of conditions to check?
        if (isArray(transient)) {
          for (let transition of transient) {
            let cond = transition?.condition?.type || transition?.condition || false
            if (
                this.condition.call(this, cond, transition.condition) 
                && isString(transition.target)
              ) {
              transition?.action.call(this, data)
              this.#statePrev = this.#state
              this.#state = transition?.target
              this.notify(null, null)
            }
          }
        }
        // otherwise if only one condition
        else if (isObject(transient) && isString(transient.target)) {
          let cond = transient?.condition?.type || transient?.condition || false
          if (
              this.condition.call(this, cond, transient.condition)
              && isString(transient.target)
            ) {
            transient?.action.call(this, data)
            this.#statePrev = this.#state
            this.#state = transient.target
            this.notify(null, null)
          }
        }
    }

    return this.#state
  }

  condition(cond, event=null, params={}) {
    return (cond)? this.#config.guards[cond].call(this, this.#context, event, params) : false
  }

  canTransition(event) {
    const currStateConfig = this.#config.states[this.#state]
    return event in currStateConfig.on
  }

  /** commence state machine execution */
  start() { this.#status = "running" }
  /** stop state machine execution */
  stop() { this.#status = "stopped" }
  /** Expunge state and event listeners, free memory */
  destroy() { 
    this.#unsubscribe()
    this.#config = null
  }

  #subscribe() {
    this.#events = new Set()

    for (let state in this.#config.states) {
      for (let event in this.#config.states[state].on) {
        this.#events.add(event)
      }
    }

    for (let event of this.#events) {
      this.#mediator.on(event, this.notify.bind(this, event), this.context)
    }
  }

  #unsubscribe() {
    for (let event of this.#events) {
      this.#mediator.off(event, this.notify)
    }
  }

  /**
   * @static
   * @param {object} c - state definition
   * @returns {boolean} - valid true or false
   */
  static validateConfig(c) {
    if (!isObject(c)) return false

    const required = ["id", "initial", "context", "states"]
      let keys = Object.keys(c)

    if (!isArrayEqual(required, keys)) return false

    if (!(c.initial in c.states)) return false

    for (let state in c.states) {
      if (!isObject(c.states[state])) return false
      if ("onEnter" in c.states[state] && !isFunction(c.states[state].onEnter)) return false
      if ("onExit" in c.states[state] && !isFunction(c.states[state].onExit)) return false
      if ("on" in c.states[state]) {
        for (let e in c.states[state].on) {
          let event = c.states[state].on[e]
          if (!isString(event.target)) return false
          if ("action" in event && !isFunction(event.action)) return false
        }
      }
    }

    return true
  }

}

