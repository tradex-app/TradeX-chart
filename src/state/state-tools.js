// state-tools.js

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
          target: 'tool_activated',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to "idle"`)
            this.context.origin.onToolActivated(data)
          },
        },
      }
    },
    tool_activated: {
      onEnter (data) {
        // console.log(`${this.id}: state: "${this.state}" - onEnter`)
      },
      onExit (data) {
        // console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`)
      },
      on: {
        tool_targetSelected: {
          target: 'tool_addToTarget',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to "onIdle"`)
            this.context.origin.onToolTargetSelected(data)
          },
        },
      }
    },
    tool_addToTarget: {
      onEnter (data) {
        // console.log(`${this.id}: state: "${this.state}" - onEnter`)
      },
      onExit (data) {
        // console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`)
      },
      on: {
        always: {
          target: 'idle',
          condition: 'toolTarget',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to "onIdle"`)
            this.context.origin.addNewTool()
          },
        },
      }
    },
  },

  guards: {
    toolTarget () { return true }
  }
}
