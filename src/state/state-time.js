// state-chart.js

const config = {
  id: "time",
  initial: "idle",
  context: {},
  states: {
    idle: {
      onEnter(stateMachine, data) {
        console.log('idle: onEnter')
      },
      onExit(stateMachine, data) {
        console.log('idle: onExit')
      },
      on: {
        resize: {
          target: 'resize',
          action: (stateMachine, data) => {
            console.log('Time: transition action for "resize" in "idle" state')
          },
        },
        xAxis_scale: {
          target: 'scale',
          action: (stateMachine, data) => {
            console.log('Time: transition action for "xAxis_scale" in "idle" state')
          },
        },
        xAxis_inc: {
          target: 'incremental',
          action: (stateMachine, data) => {
            console.log('Time: transition action for "xAxis_inc" in "idle" state')
          },
        },
        xAxis_log: {
          target: 'logarithmic',
          action: (stateMachine, data) => {
            console.log('Time: transition action for "xAxis_log" in "idle" state')
          },
        },
        xAxis_100: {
          target: 'percentual',
          action: (stateMachine, data) => {
            console.log('Time: transition action for "xAxis_100" in "idle" state')
          },
        },
        chart_pan: {
          target: 'chart_pan',
          action: (stateMachine, data) => {
            console.log('Time: transition action for "chart_pan" in Scale "idle" state')
          },
        },
      }
    },
    resize: {
      onEnter(stateMachine, data) {
        console.log('resize: onEnter')
      },
      onExit(stateMachine, data) {
        console.log('reize: onExit')
      },
      on: {
        someEvent: {
          target: '',
          action: (stateMachine, data) => {
            console.log('Time: transition action for event in "idle" state')
          },
        },
      }
    },
    chart_pan: {
      onEnter(stateMachine, data) {
        console.log('Time: chart_pan: onEnter')
      },
      onExit(stateMachine, data) {
        console.log('Time: chart_pan: onExit')
      },
      on: {
        chart_pan: {
          target: 'chart_pan',
          action: (stateMachine, data) => {
            console.log('Time: transition action for "chart_panDone" in "chart_pan" state')
            stateMachine.context.origin.draw()
          },
        },
        chart_panDone: {
          target: 'idle',
          action: (stateMachine, data) => {
            console.log('Time: transition action for "chart_panDone" in "chart_pan" state')
            stateMachine.context.origin.draw()
          },
        },
      }
    },
  }
}

export default config
