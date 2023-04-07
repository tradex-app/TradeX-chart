// state-scale.js

export default 
{
  id: "scale",
  initial: "idle",
  context: {},
  states: {
    idle: {
      onEnter(data) {
        this.context.origin.setCursor("ns-resize")

        // console.log(`${this.id}: state: "${this.state}" - onEnter`)
      },
      onExit(data) {
        // console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`)
      },
      on: {
        resize: {
          target: 'resize',
          action (data) {
            // console.log('transition action for "resize" in "idle" state')
          },
        },
        yAxis_scale: {
          target: 'scale',
          action (data) {
            // console.log('transition action for "yAxis_scale" in "idle" state')
          },
        },
        yAxis_inc: {
          target: 'incremental',
          action (data) {
            // console.log('transition action for "yAxis_inc" in "idle" state')
          },
        },
        yAxis_log: {
          target: 'logarithmic',
          action (data) {
            // console.log('transition action for "yAxis_log" in "idle" state')
          },
        },
        yAxis_100: {
          target: 'percentual',
          action (data) {
            // console.log('transition action for "yAxis_100" in "idle" state')
          },
        },
        setRange: {
          target: 'setRange',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to  "setRange"`)
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
            // console.log('transition action for event in "idle" state')
          },
        },
      }
    },
    setRange: {
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
            // console.log(`${this.id}: transition from "${this.state}" to "idle"`)
            this.context.origin.draw()
          },
        },
      }
    },
  },
  guards: {
    receiver () { return (this.eventData.scale.ID == this.context.origin.ID) },
    zoomDone () { return true },
  }
}

