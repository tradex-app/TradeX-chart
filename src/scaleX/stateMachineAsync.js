// stateMachine.js
// a simple Finite State Machine with async support
import {
  isArray,
  isAsyncFunction,
  isFunction,
  isObject,
  isString
} from "../utils/typeChecks"
import {doStructuredClone, idSanitize, valuesInArray} from "../utils/utilities"

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
  
  // Race condition protection
  #transitionMutex = false
  #eventQueue = []
  #processing = false
  #transitionCounter = 0

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
  get isPending() { return this.#pendingTransitions.size > 0 }

  getStateOverview() {
    return {
      current: this.#state,
      previous: this.#statePrev,
      context: this.#context,
      status: this.#status
      pending: this.#pendingTransitions.size
    }
  }

  async notify(event, data) {
    // Add event to queue for sequential processing
    return new Promise((resolve, reject) => {
      this.#eventQueue.push({ event, data, resolve, reject })
      this.#processEventQueue()
    })
  }

  async #processEventQueue() {
    // Prevent concurrent queue processing
    if (this.#processing) {
      return
    }

    this.#processing = true

    try {
      while (this.#eventQueue.length > 0) {
        const { event, data, resolve, reject } = this.#eventQueue.shift()
        
        try {
          const result = await this.#executeTransition(event, data)
          resolve(result)
        } catch (error) {
          reject(error)
        }
      }
    } finally {
      this.#processing = false
    }
  }

  async #executeTransition(event, data) {
    // Status check
    if (this.#noExecute()) {
        this.#core?.warn(`StateMachine not running. Status: ${this.#status}`)
        return false
    }

    if (!isObject(this.#config)) 
      return false

    // Create unique transition ID for tracking
    const transitionId = `${this.#state}-${event}-${++this.#transitionCounter}-${Date.now()}`
    this.#pendingTransitions.add(transitionId)

    try {
      // Capture initial state for validation
      const initialState = this.#state
      
      this.#event = event
      this.#eventData = data

      // Set status to await if we have async operations
      const oldStatus = this.#status
      if (this.#status === "running") {
        this.#status = "await"
      }

      // Validate state hasn't changed during async operations
      this.#validateTransition(initialState, event)

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

      // Validate state hasn't changed before executing transition
      this.#validateTransition(initialState, event)

      // Execute onExit (may be async)
      if (currentStateConfig?.onExit) {
        await this.#executeFunction(currentStateConfig.onExit, data)
      }

      // Execute transition action (may be async)
      await this.#executeFunction(destinationTransition.action, data)

      // Atomic state update
      this.#updateState(destinationState, event, data)

      // Execute onEnter (may be async)
      const destinationStateConfig = this.#config.states[destinationState]
      if (destinationStateConfig?.onEnter) {
        await this.#executeFunction(destinationStateConfig.onEnter, data)
      }

      // Restore status if it was running
      if (oldStatus === "running" && this.#status === "await") {
        this.#status = "running"
      }

      // Handle transient transitions with recursion protection
      await this.#handleTransientTransitions(destinationState, data, transitionId)

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
      // Use the new queue-based system for consistency
      return await this.notify('', data)
    }
    return false
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

  /**
   * Validate that state hasn't changed during async operations
   * @param {string} expectedState - The state we expect to be in
   * @param {string} event - The event being processed
   * @throws {Error} If state has changed unexpectedly
   */
  #validateTransition(expectedState, event) {
    if (this.#state !== expectedState) {
      const error = `State changed from ${expectedState} to ${this.#state} during ${event} transition`
      this.#core?.error(error)
      throw new Error(error)
    }
  }

  /**
   * Atomically update state variables
   * @param {string} newState - New state to transition to
   * @param {string} event - Event that triggered the transition
   * @param {*} data - Event data
   */
  #updateState(newState, event, data) {
    this.#statePrev = this.#state
    this.#state = newState
    this.#event = event
    this.#eventData = data
  }

  /**
   * Handle transient transitions with recursion protection
   * @param {string} destinationState - State to check for transient transitions
   * @param {*} data - Event data
   * @param {string} parentTransitionId - ID of parent transition to prevent infinite recursion
   */
  async #handleTransientTransitions(destinationState, data, parentTransitionId) {
    // Prevent infinite recursion by limiting depth
    const maxRecursionDepth = 10
    const currentDepth = this.#pendingTransitions.size
    
    if (currentDepth > maxRecursionDepth) {
      this.#core?.warn(`Maximum transient transition depth (${maxRecursionDepth}) exceeded`)
      return
    }

    // Check for transient transitions (null event or 'always')
    const stateConfig = this.#config.states[destinationState]
    if (!stateConfig?.on) return

    const transient = stateConfig.on[''] || stateConfig.on?.always
    if (!transient) return

    // Process transient transitions
    if (isArray(transient)) {
      for (let transition of transient) {
        await this.#executeTransientTransition(transition, data, parentTransitionId)
      }
    } else if (isObject(transient) && isString(transient.target)) {
      await this.#executeTransientTransition(transient, data, parentTransitionId)
    }
  }

  /**
   * Execute a single transient transition
   * @param {Object} transition - Transition configuration
   * @param {*} data - Event data
   * @param {string} parentTransitionId - Parent transition ID
   */
  async #executeTransientTransition(transition, data, parentTransitionId) {
    const transitionId = `transient-${parentTransitionId}-${++this.#transitionCounter}`
    this.#pendingTransitions.add(transitionId)

    try {
      // Check condition if present
      const condition = transition?.condition?.type || transition?.condition || false
      if (condition && !(await this.#conditionGuard.call(this, condition, transition.condition))) {
        return false
      }

      // Execute transition action if present
      if (transition.action) {
        await this.#executeFunction(transition.action, data)
      }

      // Update state
      this.#updateState(transition.target, '', data)

      // Recursively handle any further transient transitions
      await this.#handleTransientTransitions(transition.target, data, transitionId)
      
      return true
    } finally {
      this.#pendingTransitions.delete(transitionId)
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
      this.#core?.warn(`StateMachine can only start from a stopped status`)
      return false
    }
    this.#status = "running"
    return true
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
    return true
  }

  /** Expunge state and event listeners, free memory */
  async destroy() {
    await this.stop()
    
    // Clear event queue and reject any pending promises
    while (this.#eventQueue.length > 0) {
      const { reject } = this.#eventQueue.shift()
      reject(new Error('State machine destroyed'))
    }
    
    // Reset processing state
    this.#processing = false
    this.#transitionMutex = false
    
    this.#unsubscribe()
    this.#config = null
    this.#context = null
    this.#actions = null
    this.#guards = null
    this.#pendingTransitions.clear()
  }

  #subscribe() {
    this.#events = new Set()

    for (let state in this.#config.states) {
      for (let event in this.#config.states[state].on) {
        let cb = async (data) => await this.notify(event, data)
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
    const missing = required.filter(r => ! keys.includes(r))
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
        core?.error(`StateMachine config: target state '${event.target}' not found in states`)
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
