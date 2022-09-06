// state-chart.js

export default
{
  id: "template",
  initial: "idle",
  context: {},
  states: {
    idle: {
      onEnter(data) {
        console.log('idle: onEnter')
      },
      onExit(data) {
        console.log('idle: onExit')
      },
      on: {
        tool_activated: {
          target: 'idle',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to "idle"`)
            this.context.origin.onToolActivated(data)
          },
        },
      }
    }
  }
}
