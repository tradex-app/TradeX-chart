// state-offChart.js

export default
{
  id: "offChart",
  initial: "idle",
  context: {},
  states: {
    idle: {
      onEnter(data) {
        this.context.origin.cursor = "crosshair"

        // console.log(`${this.id}: state: "${this.state}" - onEnter`)
      },
      onExit(data) {
        // console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`)
      },
      on: {
        chart_tool: {
          target: 'chart_tool',
          action (data) {
            // console.log('transition action for "chart_tool" in "idle" state')
          },
        },
        xAxis_scale: {
          target: 'xAxis_scale',
          action (data) {
            // console.log('transition action for "xAxis_scale" in "idle" state')
          },
        },
        offChart_mouseDown: {
          target: 'offChart_mouseDown',
          action (data) {
            // console.log('transition action for "xAxis_scale" in "idle" state')
          },
        },
        offChart_mouseUp: {
          target: 'offChart_mouseUp',
          action (data) {
            // console.log('transition action for "xAxis_scale" in "idle" state')
          },
        },
        tool_activated: {
          target: 'tool_activated',
          action (data) {
            this.context.origin.cursor = "default"

            // console.log(`${this.id}: transition from "${this.state}" to  "xAxis_scale"`)
          },
        },
      }
    },
    xAxis_scale: {
      onEnter(data) {
        // console.log(`${this.id}: state: "${this.state}" - onEnter`)
      },
      onExit(data) {
        // console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`)
      },
      on: {
        Idle: {
          target: 'idle',
          action (data) {
            // console.log('transition action for "onIdle" in "XScale" state')
          },
        },
      }
    },
    offChart_mouseDown: {
      onEnter(data) {
        // console.log(`${this.id}: state: "${this.state}" - onEnter`)
      },
      onExit(data) {
        // console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`)
      },
      on: {
        Idle: {
          target: 'idle',
          action (data) {
            // console.log('transition action for "onIdle" in "XScale" state')
          },
        },
      }
    },
    offChart_mouseUp: {
      onEnter(data) {
        // console.log(`${this.id}: state: "${this.state}" - onEnter`)
      },
      onExit(data) {
        // console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`)
      },
      on: {
        Idle: {
          target: 'idle',
          action (data) {
            // console.log('transition action for "onIdle" in "XScale" state')
          },
        },
      }
    },
    tool_activated: {
      onEnter(data) {
        // console.log(`${this.id}: state: "${this.state}" - onEnter`)
      },
      onExit(data) {
        // console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`)
      },
      on: {
        tool_targetSelected: {
          target: 'idle',
          condition: 'toolSelectedThis',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to "onIdle"`)
            console.log("tool_targetSelected:", data)
          },
        },
      }
    },
  },
  guards: {
    zoomDone () { return true },
    toolSelectedThis (conditionType, condition) { 
      if (this.eventData === this.context)
        return true
      else
        return false
     },
  }
}
