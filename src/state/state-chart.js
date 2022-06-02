// state-chart.js

export const config = {
  id: "chart",
  initial: "idle",
  context: {},
  states: {
    idle: {
      onEnter(stateMachine) {
        console.log('idle: onEnter')
      },
      onExit(stateMachine) {
        console.log('ilde: onExit')
      },
      on: {
        Scroll: {
          target: 'scroll',
          action: (stateMachine) => {
            console.log('transition action for "onScroll" in "idle" state')
          },
        },
        XScale: {
          target: 'XScale',
          action: (stateMachine) => {
            console.log('transition action for "onXScale" in "idle" state')
          },
        },
      }
    },
    scroll: {
      onEnter(stateMachine) {
        console.log('scroll: onEnter')
      },
      onExit(stateMachine) {
        console.log('scroll: onExit')
      },
      on: {
        Idle: {
          target: 'idle',
          action: (stateMachine) => {
            console.log('transition action for "onIdle" in "scroll" state')
          },
        },
      }
    },
    XScale: {
      onEnter(stateMachine) {
        console.log('XScale: onEnter')
      },
      onExit(stateMachine) {
        console.log('XScale: onExit')
      },
      on: {
        Idle: {
          target: 'idle',
          action: (stateMachine) => {
            console.log('transition action for "onIdle" in "XScale" state')
          },
        },
      }
    },
  }
}
