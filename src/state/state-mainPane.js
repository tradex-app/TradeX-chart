// state-chart.js

export default
{
  id: "main",
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
        addIndicator: {
          target: 'addIndicator',
          action (data) {
            // console.log('offChart: transition from "idle" to "addIndicator" state')
          },
        },
        divider_mousedown: {
          target: 'divider_mousedown',
          action (data) {
            // console.log('offChart: transition from "idle" to "addIndicator" state')
          },
        },
        resize: {
          target: 'resize',
          action (data) {
            // console.log('offChart: transition from "idle" to "addIndicator" state')
          },
        },
      }
    },
    addIndicator: {
      onEnter(data) {
        // console.log(`${this.id}: state: "${this.state}" - onEnter`)

        this.context.origin.addIndicator(data) 
      },
      onExit(data) {
        // console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`)
      },
      on: {
        addIndicatorDone: {
          target: "idle",
          action (data) {
            // console.log('transition action for "onIdle" in "addIndicator" state')

          },
        }
      }
    },
    divider_mousedown: {
      onEnter(data) {
        console.log(`${this.id}: state: "${this.state}" - onEnter`)

        this.context.divider = data
      },
      onExit(data) {
        console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`)
      },
      on: {
        main_mousemove: {
          target: "divider_mousemove",
          action (data) {
            console.log(`${this.id}: transition from "${this.state}" to "ilde"`)
          },
        },
        main_mouseup: {
          target: "idle",
          action (data) {
            console.log(`${this.id}: transition from "${this.state}" to "ilde"`)
          },
        }
      }
    },
    divider_mousemove: {
      onEnter(data) {
        console.log(`${this.id}: state: "${this.state}" - onEnter`)

        let divider = this.context.divider
        this.context.pair = this.context.origin.resizeRowPair(divider, data) 
      },
      onExit(data) {
        console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`)
      },
      on: {
        main_mousemove: {
          target: "divider_mousemove",
          action (data) {
            console.log(`${this.id}: transition from "${this.state}" to "ilde"`)
          },
        },
        main_mouseup: {
          target: "idle",
          action (data) {
            this.actions.removeProperty.call(this)

            console.log(`${this.id}: transition from "${this.state}" to "ilde"`)
          },
        },
        divider_mouseup: {
          target: "idle",
          action (data) {
            this.actions.removeProperty.call(this)

            console.log(`${this.id}: transition from "${this.state}" to "ilde"`)
          },
        }
      }
    },
    resize: {
      onEnter(data) {
        console.log(`${this.id}: state: "${this.state}" - onEnter`)
        this.context.origin.setDimensions(data)
      },
      onExit(data) {
        console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`)
      },
      on: {
        always: {
          target: 'idle',
          condition: 'resizeDone',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to "idle"`)
          },
        },
      },
    }
  },
  guards: {
    resizeDone (context, event, { cond }) { return true }
  },
  actions: {
    removeProperty () {
      let active = this.context.pair.active,
      prev = this.context.pair.prev;

      active.element.style.removeProperty('user-select');
      // active.element.style.removeProperty('pointer-events');
      prev.element.style.removeProperty('user-select');
      // prev.element.style.removeProperty('pointer-events');
    }
  }
}
