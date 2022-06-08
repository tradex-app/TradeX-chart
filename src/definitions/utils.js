// utils.js

import chart from "../assets/svg/chart.svg"
import clock from "../assets/svg/clock.svg"
import config from "../assets/svg/config.svg"
import camera from "../assets/svg/camera.svg"


export default [
  {
    id: "indicators",
    name: "Indicators", 
    icon: chart, 
    action: () => {
      console.log("Indicators Menu")
    }
  },
  {
    id: "timezone",
    name: "Timezone", 
    icon: clock, 
    action: () => {
      console.log("Set timezone")
    }
  },
  {
    id: "style",
    name: "Style", 
    icon: config, 
    action: () => {
      console.log("Modify chart theme")
    }
  },
  {
    id: "screenshot",
    name: "Screenshot", 
    icon: camera, 
    action: () => {
      console.log("Save chart screenshot")
    }
  },
  // {name: "Save", icon: "./assets/svg/", action: () => {}},
  // {name: "Load", icon: "./assets/svg/", action: () => {}},
  // {name: "Refresh", icon: "./assets/svg/", action: () => {}},
]
