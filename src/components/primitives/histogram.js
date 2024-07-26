// histogram.js
// draws histogram for indicators

import { chartBar } from "../../renderer/chart";
import { renderRect } from "../../renderer/rect";

export default class Histogram {

  constructor(scene, theme) {
    this.scene = scene
    this.ctx = this.scene.context
    this.width = this.scene.width
    this.cfg = theme
  }

  draw(data) {
    const ctx = this.ctx
    const cfg = this.cfg
    const hgt = this.scene.height
    const opts = { 
      fill: "", 
      stroke: "",
      width: 1 }
      let h;

    for (let d of data) {
      let {w, x, y, zero: z} = d

      x = x - (w / 2)

      if (y < z) {
        h = z - y
        opts.fill = "#0f0"
      }
      else {
        h = y - z
        y = z
        opts.fill = "#f00"
      }


      // h = (y < z) ? z - y : y - z


      renderRect(ctx, x, y, w, h, opts)
    }
  }
}
