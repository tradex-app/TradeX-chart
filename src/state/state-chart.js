// state-chart.js

export default
{
  id: "chart",
  initial: "idle",
  context: {},
  states: {
    idle: {
      onEnter(stateMachine, data) {
        stateMachine.context.origin.setCursor("crosshair")

        console.log(`${stateMachine.id}: state: "${stateMachine.state}" - onEnter`)
      },
      onExit(stateMachine, data) {
        console.log(`${stateMachine.id}: state: "${stateMachine.state}" - onExit (${stateMachine.event})`)
      },
      on: {
        chart_pan: {
          target: 'chart_pan',
          action: (stateMachine, data) => {
            stateMachine.context.origin.setCursor("grab")

            console.log(`${stateMachine.id}: transition from "${stateMachine.state}" to  "chart_pan"`)
          },
        },
        chart_tool: {
          target: 'chart_tool',
          action: (stateMachine, data) => {
            console.log(`${stateMachine.id}: transition from "${stateMachine.state}" to "chart_tool"`)
          },
        },
        chart_zoom: {
          target: 'chart_zoom',
          action: (stateMachine, data) => {
            console.log(`${stateMachine.id}: transition from "${stateMachine.state}" to  "chart_zoom"`)
          },
        },
        xAxis_scale: {
          target: 'xAxis_scale',
          action: (stateMachine, data) => {
            console.log(`${stateMachine.id}: transition from "${stateMachine.state}" to  "xAxis_scale"`)
          },
        },
      }
    },
    chart_pan: {
      onEnter(stateMachine, data) {
        console.log(`${stateMachine.id}: state: "${stateMachine.state}" - onEnter`)
      },
      onExit(stateMachine, data) {
        console.log(`${stateMachine.id}: state: "${stateMachine.state}" - onExit (${stateMachine.event})`)
      },
      on: {
        chart_pan: {
          target: 'chart_pan',
          action: (stateMachine, data) => {
            console.log(`${stateMachine.id}: transition from "${stateMachine.state}" to "chart_pan"`)
            stateMachine.context.origin.updateRange(data) 
          },
        },
        chart_panDone: {
          target: 'idle',
          action: (stateMachine, data) => {
            console.log(`${stateMachine.id}: transition from "${stateMachine.state}" to "chart_panDone"`)
            stateMachine.context.origin.updateRange(data) 
          },
        },
      }
    },
    chart_zoom: {
      onEnter(stateMachine, data) {
        console.log(`${stateMachine.id}: state: "${stateMachine.state}" - onEnter`)
      },
      onExit(stateMachine, data) {
        console.log(`${stateMachine.id}: state: "${stateMachine.state}" - onExit (${stateMachine.event})`)
      },
      on: {
        always: {
          target: 'idle',
          condition: 'zoomDone',
          action: (stateMachine, data) => {
            console.log(`${stateMachine.id}: transition from "${stateMachine.state}" to "idle"`)
            stateMachine.context.origin.zoomRange(data) 
          },
        },
      }
    },
    xAxis_scale: {
      onEnter(stateMachine, data) {
        console.log(`${stateMachine.id}: state: "${stateMachine.state}" - onEnter`)
      },
      onExit(stateMachine, data) {
        console.log(`${stateMachine.id}: state: "${stateMachine.state}" - onExit (${stateMachine.event})`)
      },
      on: {
        Idle: {
          target: 'idle',
          action: (stateMachine, data) => {
            console.log(`${stateMachine.id}: transition from "${stateMachine.state}" to "onIdle"`)
          },
        },
      }
    },
  },
  guards: {
    zoomDone: (context, event, { cond }) => { return true }
  }
}
