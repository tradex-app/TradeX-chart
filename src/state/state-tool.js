
const drawingToolStateMachine = {
  id: 'drawingTool',
  initial: 'idle',
  context: {
    tool: null
  },
  states: {
    idle: {
      onEnter(data) {
        this.context.origin.clearActiveTools()
        this.context.core.emit("tool_idle")
      },
      onExit(data) {
        // console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`)
      },
      on: {
        tool_create: {
          target: 'tool_create',
          condition: 'canCreate',
          action: 'enterChartToolMod'
        },
        tool_add: {
          target: 'tool_add',
          condition: 'canCreate',
          action: 'enterChartToolMod'
        },
        tool_select: {
          target: 'tool_select',
          condition: 'canSelect',
          action: 'enterChartToolMod'
        },
        tool_delete: {
          target: 'tool_delete',
          condition: 'canDelete',
        }
      }
    },
    tool_create: {
      onEnter (data) {
      },
      on: {

      }
    },
    tool_add: {
      onEnter (data) {
        this.actions.toolActive(data)
      },
      on: {

      }
    },
    tool_select: {
      onEnter (data) {
        this.actions.toolActive(data)
      },
      on: {
        always: {
          target: 'tool_active',

        },
      }
    },
    tool_deselect: {
      onEnter (data) {

      },
      on: {

      }
    },
    tool_delete: {
      onEnter (data) {
        this.actions.exitChartToolMode(data)
      },
      on: {

      }
    },
    tool_active: {
      onEnter (data) {
      },
      on: {
        tool_deselect: {
          target: 'tool_deselect',
          action: 'enterChartToolMod'
        },
        tool_delete: {
          target: 'tool_delete',
          condition: 'canDelete',
        }
      }
    },
  },
  actions: {
    enterChartToolMode (data) {
      this.core.emit(`chart_enterToolMode`, data)
    },
    exitChartToolMode (data) {
      this.core.emit(`chart_exitToolMode`, data)
    },
    toolActive (data) {},
    confirmDelete (data) {},
  },
  guards: {
    isVisible (data) {},
    isEditable (data) {},
    isActive(data) {},
    isSelected (data) {},
    isDone (data) {},
    isHover (data) {},
    isDrag (data) {},
    isDestroyed (data) {},
    canCreate (data) {},
    canDelete (data) {},
    canSelect (data) {},
  }
}
