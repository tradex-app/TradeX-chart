
const drawingToolNodeStateMachine = {
  id: 'drawingToolNode',
  initial: 'idle',
  context: {
    tool: null
  },
  states: {
    idle: {
      onEnter(data) {
        // console.log(`${this.id}: state: "${this.state}" - onEnter`)
      },
      onExit(data) {
        // console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`)
      },
      on: {
        tool_begin: {
          target: 'tool_begin'
        }
      }
    },
    tool_begin: {
      on: {
        node_create: {
          target: 'node_create',
          actions: []
        }
      }
    }
  },
  actions: {

  },
  guards: {
    isVisible () {},
    isEditable () {},
    isActive() {},
    isSelected () {},
    isDone () {},
    isHover () {},
    isDrag () {},
    isTracking () {},
    isDestroyed () {},
    canDelete () {}
  }
}
