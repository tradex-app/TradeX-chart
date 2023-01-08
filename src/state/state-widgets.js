// state-widgets.js

export default
{
  id: "widgets",
  initial: "idle",
  context: {},
  states: {
    idle: {
      onEnter(data) {
        console.log(`${this.id}: state: "${this.state}" - onEnter`)
      },
      onExit(data) {
        console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`)
      },
      on: {
        openMenu: {
          target: 'openMenu',
          action (data) {
            console.log(`${this.id}: transition from "${this.state}" to "openMenu" on ${this.event}`)
          },
        },
      }
    },
    openMenu: {
      onEnter(data) {
        console.log(`${this.id}: state: "${this.state}" - onEnter`)

        // this.context.instances[data.menu].open()
        // this.context.instances[data.menu].offMenu()

      },
      onExit(data) {
        console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`)

        // this.context.instances[data.menu].close()
      },
      on: {
        closeMenu: {
          target: "idle",
          action (data) {
            console.log(`${this.id}: transition from "${this.state}" to "idle" on "${this.event}"`)
          },
        },
      }
    },
    openWindow: {
      onEnter(data) {
        console.log(`${this.id}: state: "${this.state}" - onEnter`)

        // this.context.instances[data.menu].open()
        // this.context.instances[data.menu].offMenu()

      },
      onExit(data) {
        console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`)

        // this.context.instances[data.menu].close()
      },
      on: {
        closeWindow: {
          target: "idle",
          action (data) {
            console.log(`${this.id}: transition from "${this.state}" to "idle" on "${this.event}"`)
          },
        },
      }
    },
  }
}
