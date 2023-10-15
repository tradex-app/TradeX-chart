// dialogue.js

import { isBoolean, isObject } from "../../utils/typeChecks";
import Window from "./window";

export default class Dialogue extends Window {

  static type = "Window"

  static create(widgets, cfg) {

    const styles = {
      window: {"box-shadow": "rgb(0,0,0) 0px 20px 30px -10px"},
      content: {padding: "1em"},
      title: {padding: "0 1em", background: "#333"}
    }

    cfg.dragBar = (isBoolean(cfg?.dragBar)) ? cfg.dragBar : true
    cfg.close = (isBoolean(cfg?.close)) ? cfg.close : true
    cfg.styles = (isObject(cfg?.styles)) ? {...styles, ...cfg.styles} : styles
    cfg.class = "dialogue"

    return super.create(widgets, cfg)
  }

  constructor(widgets, config) {
    super(widgets, config)
  }
  
  get type() { return Dialogue.type }

}
