// state-mainPain.js

import { isObject } from "../utils/typeChecks"

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
        chart_pan: {
          target: 'chart_pan',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to  "chart_pan"`)
          },
        },
        setRange: {
          target: 'setRange',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to  "setRange"`)
          },
        },
        chart_scrollTo: {
          target: 'chart_scrollTo',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to  "chart_scrollTo"`)
          },
        },
        addIndicator: {
          target: 'addIndicator',
          action (data) {
            // console.log('secondaryPane: transition from "idle" to "addIndicator" state')
          },
        },
        // divider_mousedown: {
        //   target: 'divider_mousedown',
        //   action (data) {
        //     // console.log('secondaryPane: transition from "idle" to "addIndicator" state')
        //   },
        // },
        divider_pointerdrag: {
          target: 'divider_pointerdrag',
          action (data) {
            // console.log('secondaryPane: transition from "idle" to "divider_pointerdrag" state')
            this.context.currCursor = this.context.origin.cursor
            this.context.origin.cursor = "row-resize"
          },
        },
        global_resize: {
          target: 'global_resize',
          action (data) {
            // console.log('secondaryPane: transition from "idle" to "addIndicator" state')
          },
        },
      }
    },
    chart_pan: {
      onEnter (data) {
        // console.log(`${this.id}: state: "${this.state}" - onEnter`)
        this.context.origin.cursor = "grab"
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
            this.context.origin.cursor = "grab"
          },
        },
        chart_panDone: {
          target: 'idle',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to "chart_panDone"`)
            this.context.origin.updateRange(data) 
            this.context.origin.cursor = "default"
          },
        },
      }
    },
    setRange: {
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
    chart_scrollTo: {
      onEnter (data) {
        // console.log(`${this.id}: state: "${this.state}" - onEnter`)
      },
      onExit (data) {
        // console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`)
      },
      on: {
        always: {
          target: 'idle',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to "idle"`)
            this.context.origin.updateRange(data) 
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
        // console.log(`${this.id}: state: "${this.state}" - onEnter`)
        this.context.divider = data
      },
      onExit(data) {
        // console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`)
      },
      on: {
        main_mousemove: {
          target: "divider_mousemove",
          action (data) {
            console.log(`${this.id}: transition from "${this.state}" to "divider_mousemove"`)
          },
        },
      }
    },
    divider_mousemove: {
      onEnter(data) {
        console.log(`${this.id}: state: "${this.state}" - onEnter`)

        let divider = this.context.divider
        this.context.pair = this.context.origin.resizeRowPair(divider, data) 
      },
      onExit(data) {
        // console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`)
      },
      on: {
        main_mousemove: {
          target: "divider_mousemove",
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to "ilde"`)
          },
        },
        main_mouseup: {
          target: "idle",
          action (data) {
            this.actions.removeProperty.call(this)

            // console.log(`${this.id}: transition from "${this.state}" to "ilde"`)
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
    divider_pointerdrag: {
      onEnter(data) {

      },
      onExit(data) {
        // console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`)
      },
      on: {
        divider_pointerdrag: {
          target: "divider_pointerdrag",
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to "ilde"`)
          },
        },
        divider_pointerdragend: {
          target: "idle",
          action (data) {
            // this.actions.removeProperty.call(this)
            // this.context.pair.active.Divider.setPos()
            // console.log(`${this.id}: transition from "${this.state}" to "idle"`)
            this.context.origin.cursor = this.context.currCursor
          },
        },
      }
    },
    global_resize: {
      onEnter(data) {
        // console.log(`${this.id}: state: "${this.state}" - onEnter`)
        this.context.origin.setDimensions()
      },
      onExit(data) {
        // console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`)
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
    zoomDone () { return true },
    resizeDone () { return true },
  },
  actions: {
    removeProperty () {
      let active = this.context.pair.active,
      prev = this.context.pair.prev;

      if ( isObject(active) )
        active.element.style.removeProperty('user-select');
      if ( isObject(prev) )
        prev.element.style.removeProperty('user-select');
    }
  }
}
