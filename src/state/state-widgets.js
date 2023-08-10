// state-widgets.js

export default
{
  id: "widgets",
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
        menu_open: {
          target: 'menu_open',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to "menu_open" on ${this.event}`)
          },
        },
        window_open: {
          target: 'window_open',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to "menu_open" on ${this.event}`)
          },
        },
      }
    },
    menu_open: {
      onEnter(data) {
        // console.log(`${this.id}: state: "${this.state}" - onEnter`)

        // this.context.instances[data.menu].open()
        // this.context.instances[data.menu].menu_off()

      },
      onExit(data) {
        // console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`)

        // this.context.instances[data.menu].close()
      },
      on: {
        menu_close: {
          target: "idle",
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to "idle" on "${this.event}"`)
          },
        },
      }
    },
    window_open: {
      onEnter(data) {
        // console.log(`${this.id}: state: "${this.state}" - onEnter`)

        // this.context.instances[data.menu].open()
        // this.context.instances[data.menu].menu_off()

      },
      onExit(data) {
        // console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`)

        // this.context.instances[data.menu].close()
      },
      on: {
        window_close: {
          target: "idle",
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to "idle" on "${this.event}"`)
          },
        },
      }
    },
  }
}
