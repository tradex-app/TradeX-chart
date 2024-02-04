// fill.js

import { isNumber, isString } from "../utils/typeChecks"
import { CanvasStyle } from "../definitions/style"

/**
 * 
 * @param {canvas} ctx 
 * @param {Array} grad
 * @param {Array} rect 
 * @param {Array} stops 
 */
export function linearGradient(ctx, grad=[], stops=[]) {

  // Create gradient
  let [x1, y1, x2, y2] = grad
  const grd = ctx.createLinearGradient(x1, y1, x2, y2);

  let i = 0
  for (let stop of stops) {
    grd.addColorStop(i++, stop)
  }

  // Fill with gradient
  ctx.fillStyle = grd;
}


/**
 * Fill and Stroke a Path
 * @param {canvas} ctx - HTML Canvas
 * @param {string} fill - colour #rrggbb(aa)
 * @param {string} stroke - colour #rrggbb(aa)
 * @param {number} width - pixel stroke width
 */
export function fillStroke(ctx, fill, stroke, width) {
  if (isString(fill)) {
    ctx.fillStyle = fill
    ctx.fill()
  }
  if (isNumber(width) && width > 0) {
    ctx.lineWidth = width
    ctx.strokeStyle = stroke || CanvasStyle.stroke
    ctx.stroke()
  }
}
