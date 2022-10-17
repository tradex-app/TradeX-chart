// line.js

import { renderPath } from './path'

/**
 * Draw a horizontal straight line
 * @param {object} ctx - canvas reference
 * @param {number} y - canvas pixel position
 * @param {number} left - canvas pixel position
 * @param {number} right - canvas pixel position
 */
export function renderHorizontalLine (ctx, y, left, right, style) {
  const coords = [{x:left, y:y}, {x:right, y:y}]
  renderPath(ctx, coords, style, () => {
    ctx.stroke()
    ctx.closePath()
  })
}

/**
 * Draw a vertical straight line
 * @param {object} ctx - canvas reference
 * @param {number} x - canvas pixel position
 * @param {number} top - canvas pixel position
 * @param {number} bottom - canvas pixel position
 */
export function renderVerticalLine (ctx, x, top, bottom, style) {
  coords = [{x:x, y:top}, {x:x, y,bottom}]
  renderPath(ctx, coords, style, () => {
    ctx.stroke()
    ctx.closePath()
  })
}

/**
 * Render line - open path
 * @param {object} ctx - canvas reference
 * @param {array} coords - array of x y coords [{x:x, y:y}, ...]
 */
export function renderLine (ctx, coords, style) {
  renderPath(ctx, coords, style, () => {
    ctx.stroke()
    ctx.closePath()
  })
}
