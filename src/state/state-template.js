// state-chart.js

const config = {
  id: "template",
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
        someEvent: {
          target: '',
          action: (stateMachine, data) => {
            console.log('transition action for event in "idle" state')
          },
        },
      }
    }
  }
}

export default config