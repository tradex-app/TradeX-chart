// state-chart.js

export default 
{
  id: "scale",
  initial: "idle",
  context: {},
  states: {
    idle: {
      onEnter(stateMachine, data) {
        // console.log(`${stateMachine.id}: state: "${stateMachine.state}" - onEnter`)
      },
      onExit(stateMachine, data) {
        // console.log(`${stateMachine.id}: state: "${stateMachine.state}" - onExit (${stateMachine.event})`)
      },
      on: {
        resize: {
          target: 'resize',
          action: (stateMachine, data) => {
            // console.log('transition action for "resize" in "idle" state')
          },
        },
        yAxis_scale: {
          target: 'scale',
          action: (stateMachine, data) => {
            // console.log('transition action for "yAxis_scale" in "idle" state')
          },
        },
        yAxis_inc: {
          target: 'incremental',
          action: (stateMachine, data) => {
            // console.log('transition action for "yAxis_inc" in "idle" state')
          },
        },
        yAxis_log: {
          target: 'logarithmic',
          action: (stateMachine, data) => {
            // console.log('transition action for "yAxis_log" in "idle" state')
          },
        },
        yAxis_100: {
          target: 'percentual',
          action: (stateMachine, data) => {
            // console.log('transition action for "yAxis_100" in "idle" state')
          },
        },
        chart_pan: {
          target: 'chart_pan',
          action: (stateMachine, data) => {
            // console.log('Scale: from "idle" to "chart_pan" state')
          },
        },
        chart_zoom: {
          target: 'chart_zoom',
          action: (stateMachine, data) => {
            // console.log(`${stateMachine.id}: transition from "${stateMachine.state}" to  "chart_zoom"`)
          },
        },
      }
    },
    resize: {
      onEnter(stateMachine, data) {
        // console.log(`${stateMachine.id}: state: "${stateMachine.state}" - onEnter`)
      },
      onExit(stateMachine, data) {
        // console.log(`${stateMachine.id}: state: "${stateMachine.state}" - onExit (${stateMachine.event})`)
      },
      on: {
        someEvent: {
          target: '',
          action: (stateMachine, data) => {
            // console.log('transition action for event in "idle" state')
          },
        },
      }
    },
    chart_pan: {
      onEnter(stateMachine, data) {
        // console.log('Scale: chart_pan: onEnter')
      },
      onExit(stateMachine, data) {
        // console.log('Scale: chart_pan: onExit')
      },
      on: {
        chart_pan: {
          target: 'chart_pan',
          action: (stateMachine, data) => {
            // console.log('Scale: transition action for "chart_panDone" in "chart_pan" state')
            stateMachine.context.origin.draw()
          },
        },
        chart_panDone: {
          target: 'idle',
          action: (stateMachine, data) => {
            // console.log('Scale: transition action for "chart_panDone" in "chart_pan" state')
            stateMachine.context.origin.draw() 
          },
        },
      }
    },
    chart_zoom: {
      onEnter(stateMachine, data) {
        // console.log(`${stateMachine.id}: state: "${stateMachine.state}" - onEnter`)
      },
      onExit(stateMachine, data) {
        // console.log(`${stateMachine.id}: state: "${stateMachine.state}" - onExit (${stateMachine.event})`)
      },
      on: {
        always: {
          target: 'idle',
          condition: 'zoomDone',
          action: (stateMachine, data) => {
            // console.log(`${stateMachine.id}: transition from "${stateMachine.state}" to "chart_zoom"`)
            stateMachine.context.origin.draw()
          },
        },
      }
    },
  },
  guards: {
    zoomDone: (context, event, { cond }) => { return true }
  }
}

