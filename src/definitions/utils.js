// utils.js

import { camera, chart, clock, config } from "./icons"

export default [
  {
    id: "indicators",
    name: "Indicators", 
    icon: chart, 
    event: "utils_indicators",
    sub: [],
  },
  {
    id: "timezone",
    name: "Timezone", 
    icon: clock, 
    event: "utils_timezone",
  },
  {
    id: "screenshot",
    name: "Screenshot", 
    icon: camera, 
    event: "utils_screenshot",
  },
  {
    id: "settings",
    name: "Settings", 
    icon: config, 
    event: "utils_settings",
  },

  // {name: "Save", icon: "./assets/svg/", event: "utils_save"},
  // {name: "Load", icon: "./assets/svg/", event: "utils_load"},
  // {name: "Refresh", icon: "./assets/svg/", event: "utils_refresh"},
]
