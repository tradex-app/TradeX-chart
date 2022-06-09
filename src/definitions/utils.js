// utils.js

import { camera, chart, clock, config } from "./icons"

export default [
  {
    id: "indicators",
    name: "Indicators", 
    icon: chart, 
    action: (e, mediator) => {
      mediator.emit("utils_indicators", e)
    }
  },
  {
    id: "timezone",
    name: "Timezone", 
    icon: clock, 
    action: (e, mediator) => {
      mediator.emit("utils_timezone", e)
    }
  },
  {
    id: "settings",
    name: "Settings", 
    icon: config, 
    action: (e, mediator) => {
      mediator.emit("utils_settings", e)
    }
  },
  {
    id: "screenshot",
    name: "Screenshot", 
    icon: camera, 
    action: (e, mediator) => {
      mediator.emit("utils_screenshot", e)
    }
  },
  // {name: "Save", icon: "./assets/svg/", action: () => {}},
  // {name: "Load", icon: "./assets/svg/", action: () => {}},
  // {name: "Refresh", icon: "./assets/svg/", action: () => {}},
]
