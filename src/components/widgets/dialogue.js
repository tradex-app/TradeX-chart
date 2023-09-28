// dialogue.js

import { isBoolean } from "../../utils/typeChecks";
import Window from "./window";

export default class Dialogue extends Window {

  static type = "Dialogue"

  static create(widgets, config) {

    const styles = {
      window: {"box-shadow": "rgb(0,0,0) 0px 20px 30px -10px"},
      content: {padding: "1em"},
      title: {padding: "0 1em", background: "#333"}
    }

    config.dragbar = (isBoolean(config.dragbar)) ? config.dragbar : true
    config.close = (isBoolean(config.close)) ? config.close : true
    config.styles = {...styles, ...config.styles}

    return super.create(widgets, config)
  }

  constructor(widgets, config) {
    super(widgets, config)
  }
  
  get type() { return Dialogue.type }

}