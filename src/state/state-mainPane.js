// state-chart.js

export default
{
  id: "main",
  initial: "idle",
  context: {},
  states: {
    idle: {
      onEnter(stateMachine, data) {
        console.log(`${stateMachine.id}: state: "${stateMachine.state}" - onEnter`)
      },
      onExit(stateMachine, data) {
        console.log(`${stateMachine.id}: state: "${stateMachine.state}" - onExit (${stateMachine.event})`)
      },
      on: {
        addIndicator: {
          target: 'addIndicator',
          action: (stateMachine, data) => {
            console.log('offChart: transition from "idle" to "addIndicator" state')
          },
        },
      }
    },
    addIndicator: {
      onEnter(stateMachine, data) {
        console.log(`${stateMachine.id}: state: "${stateMachine.state}" - onEnter`)

        stateMachine.context.origin.addIndicator(data) 
      },
      onExit(stateMachine, data) {
        console.log(`${stateMachine.id}: state: "${stateMachine.state}" - onExit (${stateMachine.event})`)
      },
      on: {
        addIndicatorDone: {
          target: "idle",
          action: (stateMachine, data) => {
            console.log('transition action for "onIdle" in "addIndicator" state')

          },
        }
      }
    }
  }
}
