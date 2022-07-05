// state-chart.js

export default
{
  id: "widgets",
  initial: "idle",
  context: {},
  states: {
    idle: {
      onEnter(stateMachine, data) {
        console.log(`${stateMachine.id}: state: "${stateMachine.state}" - onEnter`)
      },
      onExit(stateMachine, data) {
        console.log(`${stateMachine.id}: state: "${stateMachine.state}" - onExit (${stateMachine.event})`)
      },
      on: {
        openMenu: {
          target: 'openMenu',
          action: (stateMachine, data) => {
            console.log(`${stateMachine.id}: transition from "${stateMachine.state}" to "openMenu" on ${stateMachine.event}`)
          },
        },
      }
    },
    openMenu: {
      onEnter(stateMachine, data) {
        console.log(`${stateMachine.id}: state: "${stateMachine.state}" - onEnter`)

        // stateMachine.context.origin.instances[data.menu].open()
        // stateMachine.context.origin.instances[data.menu].offMenu()

      },
      onExit(stateMachine, data) {
        console.log(`${stateMachine.id}: state: "${stateMachine.state}" - onExit (${stateMachine.event})`)

        // stateMachine.context.origin.instances[data.menu].close()
      },
      on: {
        closeMenu: {
          target: "idle",
          action: (stateMachine, data) => {
            console.log(`${stateMachine.id}: transition from "${stateMachine.state}" to "idle" on "${stateMachine.event}"`)
          },
        },
      }
    },
    openWindow: {
      onEnter(stateMachine, data) {
        console.log(`${stateMachine.id}: state: "${stateMachine.state}" - onEnter`)

        // stateMachine.context.origin.instances[data.menu].open()
        // stateMachine.context.origin.instances[data.menu].offMenu()

      },
      onExit(stateMachine, data) {
        console.log(`${stateMachine.id}: state: "${stateMachine.state}" - onExit (${stateMachine.event})`)

        // stateMachine.context.origin.instances[data.menu].close()
      },
      on: {
        closeWindow: {
          target: "idle",
          action: (stateMachine, data) => {
            console.log(`${stateMachine.id}: transition from "${stateMachine.state}" to "idle" on "${stateMachine.event}"`)
          },
        },
      }
    },
  }
}
