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
    if (!currentStateConfig) {
      this.#core?.warn(`No config for state: ${this.#state}`)
      return false
    }

    const destinationTransition = currentStateConfig.on[event] || currentStateConfig.on.always
    if (destinationTransition) {
      
      // conditional (guard) check
      try {
        const condition = destinationTransition?.condition || false
        if (condition && !this.#transitionGuard.call(this, condition, data)) {
          this.#core?.warn(`Condition prevents transition for state: ${this.#state}`)
          return false
        }
      } catch (error) {
        this.#core?.error(`Condition (guard) check generated an error: ${error.message}`)
        return false
      }

      // Action check
      const action = destinationTransition?.action || false
      if (!isFunction(action)) {
        if (isArray(action)) {
          if (!this.#transitionActionValidate(action)) {
            this.#core?.error(`Event ${event} actions are not functions`)
            return false
          }
        }
        else
        if (!(action in this.#config.actions)) {
          this.#core?.error(`Event ${event} action does not refer to an actions function`)
          return false
        }
        else {
          this.#core?.error(`Event ${event} action is not an inline function`)
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
        const action = this.#transitionAction(destinationTransition.action, event, data)
        // if (!action) return false
      }

      this.#progressState(destinationState)

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
    }

    return this.getStateOverview()
  }

  #noExecute() {
    return this.#statusNoExecute.includes(this.#status)
  }

  #progressState(target) {
    this.#statePrev = this.#state
    this.#state = target
  }

  #transitionAction(action, event = null, data = {}) {
    try {
      if (isArray(action)) {
        action.forEach(act => { 
          act = this.#processFunctions(this.#actions, action)
          act.call(this, data)
        })
      }
      else {
        const act = this.#processFunctions(this.#actions, action)
        return act.call(this, data)
      }
    } 
    catch (error) {
      this.#core?.error(`Error in ${event} action: ${error.message}`)
      return false
    }
  }

  #transitionActionValidate(action) {
    if (isArray(action)) {
      return action.every(act => { this.#processFunctions(this.#actions, act) })
    }
    else {
      return this.#processFunctions(this.#actions, action)
    }
  }

  #transitionGuard(cond, event = null, data = {}) {
    try {
      if (isArray(cond)) {
        return cond.every(f => { this.#processFunctions(this.#guards, f) })
      }
      else {
        const func = this.#processFunctions(this.#guards, cond)
        return func.call(this, data)
      }
    } 
    catch (error) {
      this.#core?.error(`Error in ${event} condition (guard): ${error.message}`)
      return false
    }
  }

  #processFunctions(type, func) {
    if (!func) return false

    let fn;
    if (isString(func)) {
      fn = type[func]
    } else
    if (isFunction(func)) {
      fn = func
    }

    if (!fn) return false

    return fn
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

              if (! StateMachine.#validateSingleTransition(evt, eventName, stateName, c, core))
                return false
            }
          }

          // validate single transition
          else {
            if (! StateMachine.#validateSingleTransition(event, eventName, stateName, c, core))
              return false
          }
        }
      }
    }
    
    // State Machine config valid
    return true
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
        return StateMachine.#validateFunction(event.action, "actions", eventName, stateName, cfg, core) 
      }

      // Validate condition reference or inline function
      if ("condition" in event) {
        return StateMachine.#validateFunction(event.condition, "guards", eventName, stateName, cfg, core) 
      }
    }
    return true
  }

    /**
   * Validate a Function property, action, condition (guard) - supports inline functions, string references, and arrays
   * @param {Function|string|Array} func - The execution to validate
   * @param {"actions"|"guards"} type - action or condition (guard) property
   * @param {string} eventName - Event name for error reporting
   * @param {string} stateName - State name for error reporting
   * @param {Object} cfg - Configuration object
   * @param {Object} core - Core object for logging
   * @returns {boolean} - Whether the execution is valid
   */
    static #validateFunction(func, type, eventName, stateName, cfg, core) {
      if (!func) return true
      if (!["actions", "guards"].includes(type)) return false
  
      // Handle array of executions
      if (isArray(func)) {
        for (let i = 0; i < func.length; i++) {
          if (!StateMachine.#validateFunction(func[i], type, eventName, stateName, cfg, core)) {
            return false
          }
        }
        return true
      }
  
      // Handle string reference to an action or guards object
      if (isString(func)) {
        if (!cfg[type] || !isFunction(cfg[type][func])) {
          core?.error(`StateMachine config: event '${eventName}'.${type} '${func}' in state '${stateName}' does not refer to a valid ${type} function`)
          return false
        }
        return true
      }
  
      // Handle inline function
      if (isFunction(func)) {
        return true
      }
  
      // Invalid execution type
      core?.error(`StateMachine config: event '${eventName}'.${type} in state '${stateName}' must be a function, string reference, or array`)
      return false
    }
}

