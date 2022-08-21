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
          target: "main_mousemove",
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
    main_mousemove: {
      onEnter(stateMachine, data) {
        console.log(`${stateMachine.id}: state: "${stateMachine.state}" - onEnter`)

        let divider = stateMachine.context.divider
        stateMachine.context.origin.resizeRowPair(divider, data) 
      },
      onExit(stateMachine, data) {
        console.log(`${stateMachine.id}: state: "${stateMachine.state}" - onExit (${stateMachine.event})`)
      },
      on: {
        main_mousemove: {
          target: "main_mousemove",
          action: (stateMachine, data) => {
            console.log(`${stateMachine.id}: transition from "${stateMachine.state}" to "ilde"`)
          },
        },
        main_mouseup: {
          target: "idle",
          action: (stateMachine, data) => {
            console.log(`${stateMachine.id}: transition from "${stateMachine.state}" to "ilde"`)
          },
        },
        divider_mouseup: {
          target: "idle",
          action: (stateMachine, data) => {
            console.log(`${stateMachine.id}: transition from "${stateMachine.state}" to "ilde"`)
          },
        }
      }
    },
  }
}
