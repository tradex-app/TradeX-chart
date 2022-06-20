// state-chart.js

export default
{
  id: "chart",
  initial: "idle",
  context: {},
  states: {
    idle: {
      onEnter(stateMachine, data) {
        console.log('idle: onEnter')
      },
      onExit(stateMachine, data) {
        console.log('ilde: onExit')
      },
      on: {
        chart_pan: {
          target: 'chart_pan',
          action: (stateMachine, data) => {
            console.log('transition action for "chart_pan" in "idle" state')
          },
        },
        chart_tool: {
          target: 'chart_tool',
          action: (stateMachine, data) => {
            console.log('transition action for "chart_tool" in "idle" state')
          },
        },
        xAxis_scale: {
          target: 'xAxis_scale',
          action: (stateMachine, data) => {
            console.log('transition action for "xAxis_scale" in "idle" state')
          },
        },
      }
    },
    chart_pan: {
      onEnter(stateMachine, data) {
        console.log('chart_pan: onEnter')
      },
      onExit(stateMachine, data) {
        console.log('chart_pan: onExit')
      },
      on: {
        chart_pan: {
          target: 'chart_pan',
          action: (stateMachine, data) => {
            console.log('transition action for "chart_panDone" in "chart_pan" state')
            stateMachine.context.origin.updateRange(data) 
          },
        },
        chart_panDone: {
          target: 'idle',
          action: (stateMachine, data) => {
            console.log('transition action for "chart_panDone" in "chart_pan" state')
            stateMachine.context.origin.updateRange(data) 
          },
        },
      }
    },
    xAxis_scale: {
      onEnter(stateMachine, data) {
        console.log('XScale: onEnter')
      },
      onExit(stateMachine, data) {
        console.log('XScale: onExit')
      },
      on: {
        Idle: {
          target: 'idle',
          action: (stateMachine, data) => {
            console.log('transition action for "onIdle" in "XScale" state')
          },
        },
      }
    },
  }
}
