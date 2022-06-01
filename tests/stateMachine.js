
function createMachine(config) {
  const machine = {
    value: config.initialState,
    context: config.context,
    transition(event) {
      const currStateConfig = config[this.value]
      const destTransition = currStateConfig.transitions[event]
      if (!destTransition) {
        return
      }
      const destState = destTransition.target
      const destStateConfig = config[destState]

      destTransition.action()
      currStateConfig.actions?.onExit()
      destStateConfig.actions?.onEnter()

      this.value = destState

      return this.value
    },
    get state() { return this.value }
  }
  return machine
}

function isFunction (value) {
  return value && typeof value === 'function'
}

function isString (value) {
  return typeof value === 'string'
}

class StateMachine {

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

}



const config = {
  initialState: 'off',
  off: {
    actions: {
      onEnter() {
        console.log('off: onEnter')
      },
      onExit() {
        console.log('off: onExit')
      },
    },
    transitions: {
      switch: {
        target: 'on',
        action() {
          console.log('transition action for "switch" in "off" state')
        },
      },
    },
  },
  on: {
    actions: {
      onEnter() {
        console.log('on: onEnter')
      },
      onExit() {
        console.log('on: onExit')
      },
    },
    transitions: {
      switch: {
        target: 'off',
        action() {
          console.log('transition action for "switch" in "on" state')
        },
      },
    },
  },
}

const machine = createMachine(config)

let state = machine.state
console.log(`current state: ${state}`)
state = machine.transition('switch')
console.log(`current state: ${state}`)
state = machine.transition('switch')
console.log(`current state: ${state}`)


const machine2 = new StateMachine(config)
console.log(`status: ${machine2.status}`)
machine2.set_status("start")
console.log(`status: ${machine2.status}`)
state = machine2.state
console.log(`current state: ${state}`)
state = machine2.transition('switch')
console.log(`current state: ${state}`)
state = machine2.transition('switch')
console.log(`current state: ${state}`)