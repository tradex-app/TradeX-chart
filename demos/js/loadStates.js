// loadStates.js

import { dropDown } from "./dropdown"

export function loadStates (chart, states, configs) {
  const nav = document.querySelector("nav")
  if (!!nav) {
    let links = {
      "state1": () => chart.state.use(states.state1),
      "state2": () => chart.state.use(states.state2),
      "state3":  () => chart.state.use(states.state3),
      "config1": () => chart.start(configs.config1),
      "config2": () => chart.start(configs.config2),
      "config3":  () => chart.start(configs.config3),
      // "config1": "",
      // "config2": "",
    }
    for (let [key, value] of Object.entries(links)) {
      let elm = document.createElement("button")
          elm.innerHTML = key
          elm.addEventListener("click", value)
          nav.appendChild(elm)
    }
  }
}

export function statesDropDown(chart, states) {
  const fn = (e) => {
    chart.state.use(states[e.target.value])
  }
  dropDown("nav", states, fn)
}
