// state-chart.js

const config = {
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
            console.log('transition action for "chart_pan" in "idle" state')
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
        console.log('chart_pan: onEnter')
      },
      onExit(stateMachine) {
        console.log('chart_pan: onExit')
      },
      on: {
        chart_panDone: {
          target: 'idle',
          action: (stateMachine) => {
            console.log('transition action for "chart_panDone" in "chart_pan" state')
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

export default config
