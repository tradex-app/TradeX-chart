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
        tool_selected: {
          target: 'tool_selected',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to "idle"`)
            this.context.origin.onToolSelected(data)
          },
        },
        tool_deselected: {
          target: 'tool_deselected',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to "idle"`)
            this.context.origin.onToolDeselected(data)
          },
        },
        tool_deleted: {
          target: 'tool_deleted',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to "idle"`)
            this.context.origin.onToolDeleted(data)
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
        tool_selected: {
          target: 'tool_addToTarget',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to "onIdle"`)
            this.context.origin.onToolTargetSelected(data)
          },
        },
      }
    },
    tool_selected: {
      onEnter (data) {
        // console.log(`${this.id}: state: "${this.state}" - onEnter`)
      },
      onExit (data) {
        // console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`)
      },
      on: {
        // always: {
        //   target: 'idle',
        //   condition: 'toolTarget',
        //   action (data) {
        //     // console.log(`${this.id}: transition from "${this.state}" to "onIdle"`)
        //     this.context.origin.addNewTool()
        //   },
        // },
      }
    },
    tool_deselected: {
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
        //     // console.log(`${this.id}: transition from "${this.state}" to "onIdle"`)
        //     this.context.origin.addNewTool()
          },
        },
      }
    },
    tool_deleted: {
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
        //     // console.log(`${this.id}: transition from "${this.state}" to "onIdle"`)
        //     this.context.origin.addNewTool()
          },
        },
      }
    },
  },

  guards: {
    toolTarget () { return true }
  }
}
