// state-chart.js

export default
{
  id: "main",
  initial: "idle",
  context: {},
  states: {
    idle: {
      onEnter(stateMachine, data) {
        // console.log(`${stateMachine.id}: state: "${stateMachine.state}" - onEnter`)
      },
      onExit(stateMachine, data) {
        // console.log(`${stateMachine.id}: state: "${stateMachine.state}" - onExit (${stateMachine.event})`)
      },
      on: {
        addIndicator: {
          target: 'addIndicator',
          action: (stateMachine, data) => {
            // console.log('offChart: transition from "idle" to "addIndicator" state')
          },
        },
        divider_mousedown: {
          target: 'divider_mousedown',
          action: (stateMachine, data) => {
            // console.log('offChart: transition from "idle" to "addIndicator" state')
          },
        },
        resize: {
          target: 'resize',
          action: (stateMachine, data) => {
            // console.log('offChart: transition from "idle" to "addIndicator" state')
          },
        },
      }
    },
    addIndicator: {
      onEnter(stateMachine, data) {
        // console.log(`${stateMachine.id}: state: "${stateMachine.state}" - onEnter`)

        stateMachine.context.origin.addIndicator(data) 
      },
      onExit(stateMachine, data) {
        // console.log(`${stateMachine.id}: state: "${stateMachine.state}" - onExit (${stateMachine.event})`)
      },
      on: {
        addIndicatorDone: {
          target: "idle",
          action: (stateMachine, data) => {
            // console.log('transition action for "onIdle" in "addIndicator" state')

          },
        }
      }
    },
    divider_mousedown: {
      onEnter(stateMachine, data) {
        console.log(`${stateMachine.id}: state: "${stateMachine.state}" - onEnter`)

        stateMachine.context.divider = data
      },
      onExit(stateMachine, data) {
        console.log(`${stateMachine.id}: state: "${stateMachine.state}" - onExit (${stateMachine.event})`)
      },
      on: {
        main_mousemove: {
          target: "divider_mousemove",
          action: (stateMachine, data) => {
            console.log(`${stateMachine.id}: transition from "${stateMachine.state}" to "ilde"`)
          },
        },
        main_mouseup: {
          target: "idle",
          action: (stateMachine, data) => {
            console.log(`${stateMachine.id}: transition from "${stateMachine.state}" to "ilde"`)
          },
        }
      }
    },
    divider_mousemove: {
      onEnter(stateMachine, data) {
        console.log(`${stateMachine.id}: state: "${stateMachine.state}" - onEnter`)

        let divider = stateMachine.context.divider
        stateMachine.context.pair = stateMachine.context.origin.resizeRowPair(divider, data) 
      },
      onExit(stateMachine, data) {
        console.log(`${stateMachine.id}: state: "${stateMachine.state}" - onExit (${stateMachine.event})`)
      },
      on: {
        main_mousemove: {
          target: "divider_mousemove",
          action: (stateMachine, data) => {
            console.log(`${stateMachine.id}: transition from "${stateMachine.state}" to "ilde"`)
          },
        },
        main_mouseup: {
          target: "idle",
          action: (stateMachine, data) => {
            stateMachine.actions.removeProperty(stateMachine)

            console.log(`${stateMachine.id}: transition from "${stateMachine.state}" to "ilde"`)
          },
        },
        divider_mouseup: {
          target: "idle",
          action: (stateMachine, data) => {
            stateMachine.actions.removeProperty(stateMachine)

            console.log(`${stateMachine.id}: transition from "${stateMachine.state}" to "ilde"`)
          },
        }
      }
    },
    resize: {
      onEnter(stateMachine, data) {
        console.log(`${stateMachine.id}: state: "${stateMachine.state}" - onEnter`)
        stateMachine.context.origin.setDimensions(data)
      },
      onExit(stateMachine, data) {
        console.log(`${stateMachine.id}: state: "${stateMachine.state}" - onExit (${stateMachine.event})`)
      },
      on: {
        always: {
          target: 'idle',
          condition: 'resizeDone',
          action: (stateMachine, data) => {
            // console.log(`${stateMachine.id}: transition from "${stateMachine.state}" to "idle"`)
          },
        },
      },
    }
  },
  guards: {
    resizeDone: (context, event, { cond }) => { return true }
  },
  actions: {
    removeProperty: (stateMachine) => {
      let active = stateMachine.context.pair.active,
      prev = stateMachine.context.pair.prev;

      active.element.style.removeProperty('user-select');
      // active.element.style.removeProperty('pointer-events');
      prev.element.style.removeProperty('user-select');
      // prev.element.style.removeProperty('pointer-events');
    }
  }
}
