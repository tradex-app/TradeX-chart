// state-chart.js

const config = {
  id: "scale",
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
            console.log('transition action for "resize" in "idle" state')
          },
        },
        yAxis_scale: {
          target: 'scale',
          action: (stateMachine, data) => {
            console.log('transition action for "yAxis_scale" in "idle" state')
          },
        },
        yAxis_inc: {
          target: 'incremental',
          action: (stateMachine, data) => {
            console.log('transition action for "yAxis_inc" in "idle" state')
          },
        },
        yAxis_log: {
          target: 'logarithmic',
          action: (stateMachine, data) => {
            console.log('transition action for "yAxis_log" in "idle" state')
          },
        },
        yAxis_100: {
          target: 'percentual',
          action: (stateMachine, data) => {
            console.log('transition action for "yAxis_100" in "idle" state')
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
            console.log('transition action for event in "idle" state')
          },
        },
      }
    },
  }
}

export default config
