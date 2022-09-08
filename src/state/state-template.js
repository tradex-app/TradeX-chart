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
        someEvent: {
          target: '',
          action (data) {
            console.log('transition action for event in "idle" state')
          },
        },
      }
    }
  }
}
