// stateMachine.js
// a simple Finite State Machine

import {
  isArray,
  isAsyncFunction,
  isFunction,
  isObject,
  isString
} from "../utils/typeChecks"
import { doStructuredClone, idSanitize, valuesInArray } from "../utils/utilities"

/**
 * Finite State Machine
 * @export
 * @class StateMachine
 */
export default class StateMachine {

  #id
  #state
  #statePrev
  #context = {}
  #config
  #core
  #status = "stopped"
  #statusOld = ""
  #events
  #event
  #eventData
  #actions
  #guards
  #statuses = ["await", "idle", "running", "stopped", "paused"]
  #statusNoExecute = ["stopped", "paused"]

  /**
   * Instantiate state machine
   * @param {Object} config - state definition
   * @param {Object} context
   */
  constructor(config, context) {
    this.#core = context.core
    if (!StateMachine.validateConfig(config, this.#core)) {
      const msg = `StateMachine config is invalid`
      this.#core?.error(msg)
      throw new Error(msg)
    }

    const cfg = doStructuredClone(config)

    this.id = cfg.id
    this.#config = cfg
    this.#state = cfg.initial
    this.#context.origin = context
    this.#actions = cfg?.actions || {}
    this.#guards = cfg?.guards || {}

    // Enter initial state
    this.#subscribe()
  }

  /** @type {string} */
  set id(id) { this.#id = idSanitize(id) }
  get id() { return this.#id }
  get state() { return this.#state }
  get previousState() { return this.#statePrev }
  get context() { return this.#context }
  get core() { return this.#core }
  get status() { return this.#status }
  get event() { return this.#event }
  get events() { return this.#events }
  get eventData() { return this.#eventData }
  get actions() { return this.#actions }
  get guards() { return this.#guards }

  getStateOverview() {
    return {
      current: this.#state,
      previous: this.#statePrev,
      context: this.#context,
      status: this.#status
    }
  }

  notify(event, data) {
    // Status check
    if (this.#noExecute()) {
      this.#core?.warn(`StateMachine not running. Status: ${this.#status}`)
      return false
    }

    if (!isObject(this.#config))
      return false

    this.#event = event
    this.#eventData = data

    // Null checks
    const currentStateConfig = this.#config.states[this.#state]
    if (!currentStateConfig || !currentStateConfig.on) {
      this.#core?.warn(`No state config or transitions for state: ${this.#state}`)
      return false
    }

    const destinationTransition = currentStateConfig.on[event] || currentStateConfig.on?.always
    if (destinationTransition) {
      
      // conditional (guard) check
      try {
        const condition = destinationTransition?.condition || false
        if (condition && !this.#evaluateCondition(condition, data)) {
          this.#core?.warn(`Condition prevents transition for state: ${this.#state}`)
          return false
        }
      } catch (error) {
        this.#core?.error(`Condition (guard) check generated an error: ${error.message}`)
        return false
      }

      // Action check
      if (!isFunction(destinationTransition?.action)) {
        if (!(destinationTransition.action in this.#config.actions)) {
          this.#core?.error(`Destination transition action does not refer to an actions function`)
          return false
        }
        else {
          this.#core?.error(`Destination transition action is not a function`)
          return false
        }
      }
  
      // Destination check
      const destinationState = destinationTransition?.target
      if (!destinationState || !this.#config.states[destinationState]) {
        this.#core?.error(`Invalid destination state: ${destinationState}`)
        return false
      }

      // Execute onExit
      if (currentStateConfig?.onExit) {
        try {
          currentStateConfig.onExit.call(this, data)
        } catch (error) {
          this.#core?.error(`Error in onExit for state ${this.#state}: ${error.message}`)
          return false
        }
      }

      // Execute transition action
      if (destinationTransition.action) {
        try {
          destinationTransition.action.call(this, data)
        } catch (error) {
          this.#core?.error(`Error in transition action ${this.#state} -> ${event}: ${error.message}`)
          return false
        }
      }

      this.#statePrev = this.#state
      this.#state = destinationState

      // Execute onEnter
      const destinationStateConfig = this.#config.states[destinationState]
      if (destinationStateConfig?.onEnter) {
        try {
          destinationStateConfig.onEnter.call(this, data)
        } catch (error) {
          this.#core?.error(`Error in onEnter for state ${destinationState}: ${error.message}`)
          return false
        }
      }

      // null event or always - immediately transition (transient transition)
      if (this.#config.states[destinationState]?.on && (this.#config.states[destinationState].on[''] || this.#config.states[destinationState].on?.always)) {

        const transient = this.#config.states[destinationState].on[''] || this.#config.states[destinationState].on.always

        // Do we have an array of conditions to check?
        if (isArray(transient)) {
          for (let transition of transient) {
            this.transitionExecute(transition, data)
          }
        }
        // Handle single transient transition
        else if (isObject(transient) && isString(transient.target)) {
          this.transitionExecute(transient, data)
        }
      }
    }

    return this.getStateOverview()
  }

  transitionExecute(transition, data) {
    if (this.#noExecute()) {
      this.#core?.warn(`StateMachine not running. Status: ${this.#status}`)
      return false
    }

    try {
      let cond = transition?.condition || false
      if (!cond || this.#evaluateCondition(cond, data) && isString(transition.target)) {
        this.#conditionActionExecute(transition, data)
        return true
      }
    } catch (error) {
      this.#core?.error(`Condition (guard) check generated an error: ${error.message}`)
      return false
    }
    return false
  }

  #noExecute() {
    return this.#statusNoExecute.includes(this.#status)
  }

  /**
   * Evaluate a condition (guard) - supports inline functions, string references, and arrays
   * @param {Function|string|Array} condition - The condition to evaluate
   * @param {*} data - Event data to pass to the guard function
   * @returns {boolean} - Result of condition evaluation
   */
  #evaluateCondition(condition, data) {
    if (!condition) return false

    // Handle array of conditions (all must pass)
    if (isArray(condition)) {
      return condition.every(cond => this.#evaluateCondition(cond, data))
    }

    let guardFn

    // Handle string reference to guards object
    if (isString(condition)) {
      guardFn = this.#guards[condition]
      if (!guardFn) {
        this.#core?.error(`Guard function '${condition}' not found in guards object`)
        return false
      }
    } 
    // Handle inline function
    else if (isFunction(condition)) {
      guardFn = condition
    }
    else {
      this.#core?.error(`Invalid condition type: must be function, string, or array`)
      return false
    }

    try {
      return guardFn.call(this, this.#context, this.#event, data)
    } catch (error) {
      this.#core?.error(`Error in guard '${condition}': ${error.message}`)
      return false
    }
  }

  #conditionGuard(cond, event = null, params = {}) {
    return this.#evaluateCondition(cond, params)
  }

  #conditionActionExecute(condition, data) {
    // Execute condition action if present
    if (condition?.action) {
      try {
        condition.action.call(this, data)
        return true
      } catch (error) {
        this.#core?.error(`StateMachine: Error in condition action: ${error.message}`)
        return false
      }
    }
    this.#statePrev = this.#state
    this.#state = condition.target
    this.notify(null, null)
  }

  canTransition(event) {
    const currentStateConfig = this.#config.states[this.#state]
    return currentStateConfig && currentStateConfig.on && currentStateConfig.on[event] !== undefined
  }

  can(event) {
    return this.canTransition(event)
  }

  is(state) {
    return this.state === state
  }

  /** commence state machine execution */
  start() {
    if (this.#status !== "stopped") {
      this.#core?.warn(`StateMachine can only start from a stopped status`)
      return false
    }
    this.#status = "running"
    return true
  }

  /** stop state machine execution */
  stop() {
    this.#status = "stopped"
  }

  /** pause state machine execution */
  pause() {
    this.#statusOld = this.#status
    this.#status = "paused"
  }

  /** resume state machine execution */
  resume() {
    if (this.#status === "stopped") {
      this.#core?.warn(`StateMachine cannot resume when stopped`)
      return false
    }
    this.#status = this.#statusOld
    return true
  }

  /** Expunge state and event listeners, free memory */
  destroy() {
    this.stop()
    this.#unsubscribe()
    this.#config = null
    this.#context = null
    this.#actions = null
    this.#guards = null
  }

  #subscribe() {
    this.#events = new Set()

    for (let state in this.#config.states) {
      const stateConfig = this.#config.states[state]
      if (!stateConfig.on) continue

      for (let event in stateConfig.on) {
        if (event === '' || event === 'always') continue // Skip transient events

        let cb = this.notify.bind(this, event)
        this.#events.add({topic: event, cb})
        this.#core?.on(event, cb, this.context)
      }
    }
  }

  #unsubscribe() {
    const events = this.#events?.values()
    if (!events) return

    for (let e of events) {
      this.#core?.off(e.topic, e.cb, this.context)
    }
    this.#events.clear()
  }

  /**
   * @static
   * @param {Object} c - state definition
   * @param {object} core - application core functionalities
   * @returns {boolean} - valid true or false
   */
  static validateConfig(c, core) {
    if (!isObject(c)) {
      core?.error(`StateMachine config must be an object`)
      return false
    }

    const required = ["id", "initial", "context", "states"]
    let keys = Object.keys(c)
    const missing = required.filter(r => !keys.includes(r))
    if (missing.length > 0) {
      core?.error(`StateMachine config is missing required properties: ${missing.join(', ')}`)
      return false
    }

    if (!(c.initial in c.states)) {
      core?.error(`StateMachine config: the initial state '${c.initial}' is not found in states`)
      return false
    }

    // Validate actions
    if (c.actions && !isObject(c.actions)) {
      core?.error(`StateMachine config: actions must be an object`)
      return false
    }

    if (c.actions) {
      for (let actionName in c.actions) {
        if (!isFunction(c.actions[actionName])) {
          core?.error(`StateMachine config: action '${actionName}' must be a function`)
          return false
        }
      }
    }

    // Validate guards
    if (c.guards && !isObject(c.guards)) {
      core?.error(`StateMachine config: guards must be an object`)
      return false
    }

    if (c.guards) {
      for (let guardName in c.guards) {
        if (!isFunction(c.guards[guardName])) {
          core?.error(`StateMachine config: guard '${guardName}' must be a function`)
          return false
        }
      }
    }

    // Validate states
    for (let stateName in c.states) {
      const state = c.states[stateName]

      if (!isObject(state)) {
        core?.error(`StateMachine config: state '${stateName}' must be an object`)
        return false
      }

      if ("onEnter" in state && !isFunction(state.onEnter)) {
        core?.error(`StateMachine config: onEnter for state '${stateName}' must be a function`)
        return false
      }

      if ("onExit" in state && !isFunction(state.onExit)) {
        core?.error(`StateMachine config: onExit for state '${stateName}' must be a function`)
        return false
      }

      if ("on" in state) {
        if (!isObject(state.on)) {
          core?.error(`StateMachine config: transitions 'on' for state '${stateName}' must be an object`)
          return false
        }

        for (let eventName in state.on) {
          const event = state.on[eventName]

          if (!isObject(event) && !isArray(event)) {
            core?.error(`StateMachine config: event '${eventName}' in state '${stateName}' must be object or array`)
            return false
          }

          // Validate array of transitions (transient transitions)
          if (isArray(event)) {
            for (let i = 0; i < event.length; i++) {
              const evt = event[i]
              if (!StateMachine.#validateSingleTransition(evt, eventName, stateName, c, core))
                return false
            }
          }
          // validate single transition
          else {
            if (!StateMachine.#validateSingleTransition(event, eventName, stateName, c, core))
              return false
          }
        }
      }
    }

    return true
  }

  /**
   * Validate a condition (guard) - supports inline functions, string references, and arrays
   * @param {Function|string|Array} condition - The condition to validate
   * @param {string} eventName - Event name for error reporting
   * @param {string} stateName - State name for error reporting
   * @param {Object} cfg - Configuration object
   * @param {Object} core - Core object for logging
   * @returns {boolean} - Whether the condition is valid
   */
  static #validateCondition(condition, eventName, stateName, cfg, core) {
    if (!condition) return true

    // Handle array of conditions
    if (isArray(condition)) {
      for (let i = 0; i < condition.length; i++) {
        if (!StateMachine.#validateCondition(condition[i], eventName, stateName, cfg, core)) {
          return false
        }
      }
      return true
    }

    // Handle string reference to guards object
    if (isString(condition)) {
      if (!cfg.guards || !isFunction(cfg.guards[condition])) {
        core?.error(`StateMachine config: event '${eventName}'.condition '${condition}' in state '${stateName}' does not refer to a valid guards function`)
        return false
      }
      return true
    }

    // Handle inline function
    if (isFunction(condition)) {
      return true
    }

    // Invalid condition type
    core?.error(`StateMachine config: event '${eventName}'.condition in state '${stateName}' must be a function, string reference, or array`)
    return false
  }

  static #validateSingleTransition(event, eventName, stateName, cfg, core) {
    if (isObject(event) && !isArray(event)) {
      if (!isString(event.target)) {
        core?.error(`StateMachine config: event '${eventName}' in state '${stateName}' must have string target`)
        return false
      }

      if (!(event.target in cfg.states)) {
        core?.error(`StateMachine config: target state '${event.target}' not found in states`)
        return false
      }

      // Validate action reference or inline function
      if ("action" in event) {
        if (isFunction(event.action)) {
          // Inline function is valid
        } else if (isString(event.action)) {
          if (!cfg.actions || !isFunction(cfg.actions[event.action])) {
            core?.error(`StateMachine config: event '${eventName}'.action '${event.action}' in state '${stateName}' does not refer to a valid actions function`)
            return false
          }
        } else if (isArray(event.action)) {
          // Validate array of actions
          for (let i = 0; i < event.action.length; i++) {
            const action = event.action[i]
            if (isFunction(action)) {
              // Inline function is valid
            } else if (isString(action)) {
              if (!cfg.actions || !isFunction(cfg.actions[action])) {
                core?.error(`StateMachine config: event '${eventName}'.action[${i}] '${action}' in state '${stateName}' does not refer to a valid actions function`)
                return false
              }
            } else {
              core?.error(`StateMachine config: event '${eventName}'.action[${i}] in state '${stateName}' must be a function or string reference`)
              return false
            }
          }
        } else {
          core?.error(`StateMachine config: event '${eventName}'.action in state '${stateName}' must be a function, string reference, or array`)
          return false
        }
      }

      // Validate condition using the new validation method
      if ("condition" in event) {
        if (!StateMachine.#validateCondition(event.condition, eventName, stateName, cfg, core)) {
          return false
        }
      }
    }
    return true
  }
}

