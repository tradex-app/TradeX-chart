// state-chart.js

export const config = {
  id: "scale",
  initial: "idle",
  context: {},
  states: {
    idle: {
      onEnter(stateMachine) {
        console.log('idle: onEnter')
      },
      onExit(stateMachine) {
        console.log('idle: onExit')
      },
      on: {
        resize: {
          target: 'resize',
          action: (stateMachine) => {
            console.log('transition action for "resize" in "idle" state')
          },
        },
        yAxis_scale: {
          target: 'scale',
          action: (stateMachine) => {
            console.log('transition action for "yAxis_scale" in "idle" state')
          },
        },
        yAxis_inc: {
          target: 'incremental',
          action: (stateMachine) => {
            console.log('transition action for "yAxis_inc" in "idle" state')
          },
        },
        yAxis_log: {
          target: 'logarithmic',
          action: (stateMachine) => {
            console.log('transition action for "yAxis_log" in "idle" state')
          },
        },
        yAxis_100: {
          target: 'percentual',
          action: (stateMachine) => {
            console.log('transition action for "yAxis_100" in "idle" state')
          },
        },
      }
    },
    resize: {
      onEnter(stateMachine) {
        console.log('resize: onEnter')
      },
      onExit(stateMachine) {
        console.log('reize: onExit')
      },
      on: {
        someEvent: {
          target: '',
          action: (stateMachine) => {
            console.log('transition action for event in "idle" state')
          },
        },
      }
    },
  }
}
