// stateMachine.js
// a simple Finite State Machine with async support
import {
  isArray,
  isAsyncFunction,
  isFunction,
  isObject,
  isString
} from "../utils/typeChecks"
import {idSanitize, valuesInArray} from "../utils/utilities"

/**
 * Finite State Machine with async support
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
  #pendingTransitions = new Set()

  #statuses = ["await", "idle", "running", "stopped", "paused"]
  #statusNoExecute = ["stopped", "paused"]

  /**
   * Instantiate state machine
   * @param {Object} config - state definition
   * @param {Object} context
   */
  constructor(config, context) {
    this.#core = context.core
    if (! StateMachine.validateConfig(config, this.#core)) {
      const msg = `StateMachine config is invalid`
      this.#core?.error(msg)
      throw new Error(msg)
    }

    const cfg = {
      ...config
    }
    this.id = cfg.id
    this.#config = cfg
    this.#state = cfg.initial
    this.#context.origin = context
    this.#actions = cfg.actions
    this.#guards = cfg.guards

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
  get isPending() { return this.#pendingTransitions.size > 0 }

  getStateOverview() {
    return {
      current: this.#state, 
      previous: this.#statePrev, 
      context: this.#context, 
      status: this.#status,
      pending: this.#pendingTransitions.size
    }
  }

  async notify(event, data) {
    // Status check
    if (this.#noExecute()) {
        this.#core?.warn(`StateMachine not running. Status: ${this.#status}`)
        return false
    }

    if (!isObject(this.#config)) 
      return false

    // Create transition ID for tracking
    const transitionId = `${this.#state}-${event}-${Date.now()}`
    this.#pendingTransitions.add(transitionId)

    try {
      this.#event = event
      this.#eventData = data

      // Set status to await if we have async operations
      const oldStatus = this.#status
      if (this.#status === "running") {
        this.#status = "await"
      }

      // Null checks
      const currentStateConfig = this.#config.states[this.#state]
      if (! currentStateConfig || ! currentStateConfig.on) {
        this.#core?.warn(`No state config or transitions for state: ${
          this.#state
        }`)
        return false
      }

      // transition check
      const destinationTransition = currentStateConfig.on[event]
      if (! destinationTransition) {
        this.#core?.warn(`No valid transitions for state: ${this.#state}`)
        return false
      }

      // conditional (guard) check
      const condition = destinationTransition?.condition?.type || destinationTransition?.condition || false
      if (condition && !(await this.#conditionGuard.call(this, condition, destinationTransition.condition))) {
        this.#core?.warn(`Condition prevents transition for state: ${this.#state}`)
        return false
      }

      // Action check
      if (!isFunction(destinationTransition.action) && !isAsyncFunction(destinationTransition.action)) {
        this.#core?.error(`No action function for transition ${this.#state} -> ${event}`)
        return false
      }

      // Destination check
      const destinationState = destinationTransition.target
      if (! destinationState || !this.#config.states[destinationState]) {
        this.#core?.error(`Invalid destination state: ${destinationState}`)
        return false
      }

      // Execute onExit (may be async)
      if (currentStateConfig?.onExit) {
        await this.#executeFunction(currentStateConfig.onExit, data)
      }

      // Execute transition action (may be async)
      await this.#executeFunction(destinationTransition.action, data)

      this.#statePrev = this.#state
      this.#state = destinationState

      // Execute onEnter (may be async)
      const destinationStateConfig = this.#config.states[destinationState]
      if (destinationStateConfig?.onEnter) {
        await this.#executeFunction(destinationStateConfig.onEnter, data)
      }

      // Restore status if it was running
      if (oldStatus === "running" && this.#status === "await") {
        this.#status = "running"
      }

      // null event - immediately transition (transient transition)
      if (this.#config.states[destinationState]?.on && (this.#config.states[destinationState].on[''] || this.#config.states[destinationState].on?.always)) {
        const transient = this.#config.states[destinationState].on[''] || this.#config.states[destinationState].on.always
        
        // Do we have an array of conditions to check?
        if (isArray(transient)) {
          for (let transition of transient) {
            await this.transitionExecute(transition, data)
          }
        }
        // otherwise if only one condition
        else if (isObject(transient) && isString(transient.target)) {
          await this.transitionExecute(transient, data)
        }
      }

      return this.#state
    } catch (error) {
      this.#core?.error(`Error during state transition: ${error.message}`)
      throw error
    } finally {
      this.#pendingTransitions.delete(transitionId)
    }
  }

  async transitionExecute(transition, data) {
    if (this.#noExecute()) {
        this.#core?.warn(`StateMachine not running. Status: ${this.#status}`)
        return false
    }
        
    let cond = transition?.condition?.type || transition?.condition || false
    if ((await this.#conditionGuard.call(this, cond, transition.condition)) && isString(transition.target)) {
      await this.#conditionActionExecute(transition, data)
    }
  }

  #noExecute() {
    return this.#statusNoExecute.includes(this.#status)
  }

  async #conditionGuard(cond, event = null, params = {}) {
    if (!cond) return false
    
    const guardFunction = this.#config.guards[cond]
    if (isAsyncFunction(guardFunction)) {
      return await guardFunction.call(this, this.#context, event, params)
    } else {
      return guardFunction.call(this, this.#context, event, params)
    }
  }

  async #conditionActionExecute(condition, data) {
    if (condition?.action) {
      await this.#executeFunction(condition.action, data)
    }
    this.#statePrev = this.#state
    this.#state = condition.target
    await this.notify(null, null)
  }

  async #executeFunction(fn, data) {
    if (isAsyncFunction(fn)) {
      return await fn.call(this, data)
    } else if (isFunction(fn)) {
      return fn.call(this, data)
    }
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
      this.#core.warn(`StateMachine can only start from a stopped status`)
      return
    }
    this.#status = "running"
  }

  /** stop state machine execution */
  async stop() {
    // Wait for pending transitions to complete
    while (this.#pendingTransitions.size > 0) {
      await new Promise(resolve => setTimeout(resolve, 10))
    }
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
      this.#core.warn(`StateMachine cannot resume when stopped`)
      return
    }
    this.#status = this.#statusOld
  }

  /** Expunge state and event listeners, free memory */
  async destroy() {
    await this.stop()
    this.#unsubscribe()
    this.#config = null
    this.#context = null
    this.#actions = null
    this.#pendingTransitions.clear()
  }

  #subscribe() {
    this.#events = new Set()
    for (let state in this.#config.states) {
      for (let event in this.#config.states[state].on) {
        let cb = async (data) => await this.notify(event, data)
        this.#events.add({topic: event, cb})
        this.#core.on(event, cb, this.context)
      }
    }
  }

  #unsubscribe() {
    const events = this.#events?.values()
    if (! events) 
      return

    for (let e of events) {
      this.#core.off(e.topic, e.cb, this.context)
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
      core.error(`StateMachine config must be an object`)
      return false
    }

    const required = ["id", "initial", "context", "states"]
    let keys = Object.keys(c)
    const missing = required.filter(r => ! keys.includes(r))
    if (missing.length > 0) {
      core?.error(`StateMachine config is missing required properties: ${
        missing.join(', ')
      }`)
      return false
    }

    if (!(c.initial in c.states)) {
      core.error(`StateMachine config the initial state is not found`)
      return false
    }

    // Validate actions
    if (c.actions && !isObject(c.actions)) {
      core?.error(`StateMachine config: actions must be an object`)
      return false
    }

    if (c.actions) {
      for (let actionName in c.actions) {
        if (!isFunction(c.actions[actionName]) && !isAsyncFunction(c.actions[actionName])) {
          core?.error(`StateMachine config: action '${actionName}' must be a function or async function`)
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
        if (!isFunction(c.guards[guardName]) && !isAsyncFunction(c.guards[guardName])) {
          core?.error(`StateMachine config: guard '${guardName}' must be a function or async function`)
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

      if ("onEnter" in state && !isFunction(state.onEnter) && !isAsyncFunction(state.onEnter)) {
        core?.error(`StateMachine config: onEnter for state '${stateName}' must be a function or async function`)
        return false
      }

      if ("onExit" in state && !isFunction(state.onExit) && !isAsyncFunction(state.onExit)) {
        core?.error(`StateMachine config: onExit for state '${stateName}' must be a function or async function`)
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
        core?.error(`StateMachine config: target state '${event.target}' in state not found`)
        return false
      }

      if ("action" in event && isString(event.action) && !isFunction(cfg.actions[event.action]) && !isAsyncFunction(cfg.actions[event.action])) {
        core?.error(`StateMachine config: event '${eventName}'.action ${
          event.action
        } in state '${stateName}' does not refer to a valid actions function`)
        return false
      } 
      else if ("action" in event && !isFunction(event.action) && !isAsyncFunction(event.action)) {
        core?.error(`StateMachine config: action for event '${eventName}' in state '${stateName}' must be a function or async function`)
        return false
      }
    }
    return true
  }
}
