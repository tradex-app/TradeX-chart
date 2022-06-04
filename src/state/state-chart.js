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
        chart_pan: {
          target: 'chart_pan',
          action: (stateMachine) => {
            console.log('transition action for "onScroll" in "idle" state')
          },
        },
        chart_tool: {
          target: 'chart_tool',
          action: (stateMachine) => {
            console.log('transition action for "chart_tool" in "idle" state')
          },
        },
        xAxis_scale: {
          target: 'xAxis_scale',
          action: (stateMachine) => {
            console.log('transition action for "xAxis_scale" in "idle" state')
          },
        },
      }
    },
    chart_pan: {
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
    xAxis_scale: {
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
