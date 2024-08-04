// range.js
// provides primitives for drawing ranges / channels

import { renderLineHorizontal } from "../../renderer/line";
import { renderRectFill } from "../../renderer/rect";

/**
  style: {
    fill: #rrggbbaa,
    style: width, stroke, fill, dash}
  }
*/


/**
 * Render high low range markers with optional range fill
 *   style: {
        fill: #rrggbbaa,
        style: width, stroke, fill, dash}
      }
 * @param {Object} ctx - canvas reference
 * @param {number} high
 * @param {number} low
 * @param {number} w
 * @param {number} h
 * @param {object} style
 */
export function renderHighLowRange(ctx, high, low, w, h, style) {
  let cw = ctx.canvas.width
  let ch = ctx.canvas.height
  let y1 = Math.round(ch * (style.high / 100))
  let y2 = Math.round(ch * (style.low / 100))
  let d = y1 - y2

  renderRectFill(ctx, 0, y2, cw, d, style)
  renderLineHorizontal(ctx, y1, 0, cw, style)
  renderLineHorizontal(ctx, y2, 0, cw, style)

}
