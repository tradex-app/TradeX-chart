// state-chart.js

export const config = {
  id: "template",
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
        someEvent: {
          target: '',
          action: (stateMachine) => {
            console.log('transition action for event in "idle" state')
          },
        },
      }
    }
  }
}
