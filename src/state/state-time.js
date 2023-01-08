// state-time.js

export default
{
  id: "time",
  initial: "idle",
  context: {},
  states: {
    idle: {
      onEnter(data) {
        // console.log(`${this.id}: state: "${this.state}" - onEnter`)
      },
      onExit(data) {
        // console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`)
      },
      on: {
        resize: {
          target: 'resize',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to  "resize"`)
          },
        },
        xAxis_scale: {
          target: 'scale',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to  "scale"`)
          },
        },
        xAxis_inc: {
          target: 'incremental',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to  "incremental"`)
          },
        },
        xAxis_log: {
          target: 'logarithmic',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to  "logarithmic"`)
          },
        },
        xAxis_100: {
          target: 'percentual',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to  "percentual"`)
          },
        },
        chart_pan: {
          target: 'chart_pan',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to  "chart_pan"`)
          },
        },
        chart_zoom: {
          target: 'chart_zoom',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to  "chart_zoom"`)
          },
        },
      }
    },
    resize: {
      onEnter(data) {
        // console.log(`${this.id}: state: "${this.state}" - onEnter`)
      },
      onExit(data) {
        // console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`)
      },
      on: {
        someEvent: {
          target: '',
          action (data) {
            // console.log('Time: transition action for event in "idle" state')
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
            // console.log(`${this.id}: transition from "${this.state}" to "chart_pan"`)
            // this.context.origin.draw()
          },
        },
        chart_panDone: {
          target: 'idle',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to "chart_panDone"`)
            // this.context.origin.draw()
          },
        },
      }
    },
    chart_zoom: {
      onEnter(data) {
        // console.log(`${this.id}: state: "${this.state}" - onEnter`)
      },
      onExit(data) {
        // console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`)
      },
      on: {
        always: {
          target: 'idle',
          condition: 'zoomDone',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to "chart_pan"`)
            // this.context.origin.draw()
          },
        },
      }
    },
  },
  guards: {
    zoomDone () { return true },
  }
}
