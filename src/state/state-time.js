// state-chart.js

export default
{
  id: "time",
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
            // console.log(`${stateMachine.id}: transition from "${stateMachine.state}" to  "resize"`)
          },
        },
        xAxis_scale: {
          target: 'scale',
          action: (stateMachine, data) => {
            // console.log(`${stateMachine.id}: transition from "${stateMachine.state}" to  "scale"`)
          },
        },
        xAxis_inc: {
          target: 'incremental',
          action: (stateMachine, data) => {
            // console.log(`${stateMachine.id}: transition from "${stateMachine.state}" to  "incremental"`)
          },
        },
        xAxis_log: {
          target: 'logarithmic',
          action: (stateMachine, data) => {
            // console.log(`${stateMachine.id}: transition from "${stateMachine.state}" to  "logarithmic"`)
          },
        },
        xAxis_100: {
          target: 'percentual',
          action: (stateMachine, data) => {
            // console.log(`${stateMachine.id}: transition from "${stateMachine.state}" to  "percentual"`)
          },
        },
        chart_pan: {
          target: 'chart_pan',
          action: (stateMachine, data) => {
            // console.log(`${stateMachine.id}: transition from "${stateMachine.state}" to  "chart_pan"`)
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
            // console.log('Time: transition action for event in "idle" state')
          },
        },
      }
    },
    chart_pan: {
      onEnter(stateMachine, data) {
        // console.log(`${stateMachine.id}: state: "${stateMachine.state}" - onEnter`)
      },
      onExit(stateMachine, data) {
        // console.log(`${stateMachine.id}: state: "${stateMachine.state}" - onExit (${stateMachine.event})`)
      },
      on: {
        chart_pan: {
          target: 'chart_pan',
          action: (stateMachine, data) => {
            // console.log(`${stateMachine.id}: transition from "${stateMachine.state}" to "chart_pan"`)
            // stateMachine.context.origin.draw()
          },
        },
        chart_panDone: {
          target: 'idle',
          action: (stateMachine, data) => {
            // console.log(`${stateMachine.id}: transition from "${stateMachine.state}" to "chart_panDone"`)
            // stateMachine.context.origin.draw()
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
            // console.log(`${stateMachine.id}: transition from "${stateMachine.state}" to "chart_pan"`)
            // stateMachine.context.origin.draw()
          },
        },
      }
    },
  },
  guards: {
    zoomDone: (context, event, { cond }) => { return true }
  }
}
