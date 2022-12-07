// utils.js

import { camera, chart, clock, config } from "./icons"

export default [
  {
    id: "indicators",
    name: "Indicators", 
    icon: chart, 
    event: "utils_indicators",
    sub: [],
    // action: (e, core) => {
    //   core.emit("utils_indicators", e)
    // }
  },
  {
    id: "timezone",
    name: "Timezone", 
    icon: clock, 
    event: "utils_timezone",
    // action: (e, core) => {
    //   core.emit("utils_timezone", e)
    // }
  },
  {
    id: "screenshot",
    name: "Screenshot", 
    icon: camera, 
    event: "utils_screenshot",
    // action: (e, core) => {
    //   core.emit("utils_screenshot", e)
    // }
  },
  {
    id: "settings",
    name: "Settings", 
    icon: config, 
    event: "utils_settings",
    // action: (e, core) => {
    //   core.emit("utils_settings", e)
    // }
  },

  // {name: "Save", icon: "./assets/svg/", event: "utils_save", action: () => {}},
  // {name: "Load", icon: "./assets/svg/", action: () => {}},
  // {name: "Refresh", icon: "./assets/svg/", action: () => {}},
]
