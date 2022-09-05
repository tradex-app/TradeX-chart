// state-chart.js

export default
{
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
        tool_activated: {
          target: 'idle',
          action: (stateMachine, data) => {
            // console.log(`${stateMachine.id}: transition from "${stateMachine.state}" to "idle"`)
            stateMachine.context.origin.onToolActivated(data)
          },
        },
      }
    }
  }
}
