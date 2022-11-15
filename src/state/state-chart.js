// state-chart.js

export default
{
  id: "chart",
  initial: "idle",
  context: {},
  states: {
    idle: {
      onEnter (data) {
        this.context.origin.setCursor("crosshair")

        // console.log(`${this.id}: state: "${this.state}" - onEnter`)
      },
      onExit (data) {
        // console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`)
      },
      on: {
        chart_pan: {
          target: 'chart_pan',
          action (data) {
            this.context.origin.setCursor("grab")

            // console.log(`${this.id}: transition from "${this.state}" to  "chart_pan"`)
          },
        },
        chart_zoom: {
          target: 'chart_zoom',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to  "chart_zoom"`)
          },
        },
        xAxis_scale: {
          target: 'xAxis_scale',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to  "xAxis_scale"`)
          },
        },
        chart_yAxisRedraw: {
          target: 'chart_yAxisRedraw',
          action (data) {
            // console.log('Scale: from "idle" to "chart_pan" state')
          },
        },
        chart_tool: {
          target: 'chart_tool',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to "chart_tool"`)
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
      onEnter (data) {
        // console.log(`${this.id}: state: "${this.state}" - onEnter`)
      },
      onExit (data) {
        // console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`)
      },
      on: {
        chart_pan: {
          target: 'chart_pan',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to "chart_pan"`)
            this.context.origin.updateRange(data) 
          },
        },
        chart_panDone: {
          target: 'idle',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to "chart_panDone"`)
            this.context.origin.updateRange(data) 
          },
        },
      }
    },
    chart_zoom: {
      onEnter (data) {
        // console.log(`${this.id}: state: "${this.state}" - onEnter`)
      },
      onExit (data) {
        // console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`)
      },
      on: {
        always: {
          target: 'idle',
          condition: 'zoomDone',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to "idle"`)
            this.context.origin.zoomRange(data) 
          },
        },
      }
    },
    xAxis_scale: {
      onEnter (data) {
        // console.log(`${this.id}: state: "${this.state}" - onEnter`)
      },
      onExit (data) {
        // console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`)
      },
      on: {
        Idle: {
          target: 'idle',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to "onIdle"`)
          },
        },
      }
    },
    chart_yAxisRedraw: {
      onEnter(data) {
        // console.log('${this.id}: chart_pan: onEnter')
      },
      onExit(data) {
        // console.log('${this.id}: chart_pan: onExit')
      },
      on: {
        always: {
          target: 'idle',
          condition: 'yAxisRedraw',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to "onIdle"`)
            this.context.origin.drawGrid()
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
    priceMaxMin () { return true },
    toolSelectedThis (conditionType, condition) { 
      if (this.eventData === this.context.origin)
        return true
      else
        return false
     },
    yAxisRedraw () { return true },
    zoomDone () { return true },

  }
}
