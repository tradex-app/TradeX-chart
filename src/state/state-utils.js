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
        utils_indicators: {
          target: 'utils_indicators',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to "idle"`)
            this.context.origin.onIndicators(data)
          },
        },
        utils_timezone: {
          target: 'utils_timezone',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to "idle"`)
            this.context.origin.onTimeZone(data)
          },
        },
        utils_settings: {
          target: 'utils_settings',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to "idle"`)
            this.context.origin.onSettings(data)
          },
        },
        utils_screenshot: {
          target: 'utils_screenshot',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to "idle"`)
            this.context.origin.onScreenshot(data)
          },
        }
      }
    },
    utils_indicators: {
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
  },

  guards: {
    toolTarget () { return true }
  }
}
