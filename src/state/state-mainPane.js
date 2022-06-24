// state-chart.js

export default
{
  id: "main",
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
        addIndicator: {
          target: 'addIndicator',
          action: (stateMachine, data) => {
            console.log('transition action for event in "idle" state')
          },
        },
      }
    },
    addIndicator: {
      onEnter(stateMachine, data) {
        console.log('addIndicator: onEnter')

        stateMachine.context.origin.addIndicator(data) 
      },
      onExit(stateMachine, data) {
        console.log('addIndicator: onExit')
      },
      on: {
        addIndicatorDone: {
          target: "idle",
          action: (stateMachine, data) => {
            console.log(`${data} addIndicatorDone: transition to "idle" state`)
          },
        }
      }
    }
  }
}
