// state-chart.js

export default
{
  id: "offChart",
  initial: "idle",
  context: {},
  states: {
    idle: {
      onEnter(data) {
        this.context.origin.setCursor("crosshair")

        // console.log(`${this.id}: state: "${this.state}" - onEnter`)
      },
      onExit(data) {
        // console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`)
      },
      on: {
        chart_pan: {
          target: 'chart_pan',
          action (data) {
            this.context.origin.setCursor("grab")

            // console.log('transition action for "chart_pan" in "idle" state')
          },
        },
        chart_zoom: {
          target: 'chart_zoom',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to  "chart_zoom"`)
          },
        },
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
            this.context.origin.setCursor("default")

            // console.log(`${this.id}: transition from "${this.state}" to  "xAxis_scale"`)
          },
        },
      }
    },
    chart_pan: {
      onEnter(data) {
        // console.log(`${this.id}: state: "${this.state}" - onEnter`)
      },
      onExit(data) {
        // console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`)
      },
      on: {
        chart_pan: {
          target: 'chart_pan',
          action (data) {
            // console.log('offChart action for "chart_panDone" in "chart_pan" state')
            this.context.origin.updateRange(data) 
          },
        },
        chart_panDone: {
          target: 'idle',
          action (data) {
            // console.log('offChart action for "chart_panDone" in "chart_pan" state')
            this.context.origin.updateRange(data) 
          },
        },
      }
    },
    chart_zoom: {
      onEnter(data) {
        // console.log(`${this.id}: state: "${this.state}" - onEnter`)
      },
      onExit(data) {
        // console.log(`${this.id}: state: - onExit (${this.event})`)
      },
      on: {
        always: {
          target: 'idle',
          condition: 'zoomDone',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to "chart_zoom"`)
            const range = this.context.origin.range
            this.context.origin.zoomRange()
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
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to "onIdle"`)
          },
        },
      }
    },
  },
  guards: {
    zoomDone (context, event, { cond }) { return true }
  }
}
