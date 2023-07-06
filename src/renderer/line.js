// line.js

import { renderPath } from './path'

/**
 * Draw a horizontal straight line
 * @param {Object} ctx - canvas reference
 * @param {number} y - canvas pixel position
 * @param {number} left - canvas pixel position
 * @param {number} right - canvas pixel position
 * @param {Object} opts 
 */
export function renderLineHorizontal (ctx, y, left, right, opts) {
  const coords = [{x:left, y:y}, {x:right, y:y}]
  renderPath(ctx, coords, opts, () => {
    ctx.stroke()
    ctx.closePath()
  })
}

/**
 * Draw a vertical straight line
 * @param {Object} ctx - canvas reference
 * @param {number} x - canvas pixel position
 * @param {number} top - canvas pixel position
 * @param {number} bottom - canvas pixel position
 * @param {Object} opts 
 */
export function renderLineVertical (ctx, x, top, bottom, opts) {
  coords = [{x:x, y:top}, {x:x, y,bottom}]
  renderPath(ctx, coords, opts, () => {
    ctx.stroke()
    ctx.closePath()
  })
}

/**
 * Render line - open path
 * @param {Object} ctx - canvas reference
 * @param {Array} coords - array of x y coords [{x:x, y:y}, ...]
 * @param {Object} opts 
 */
export function renderLine (ctx, coords, opts) {
  renderPath(ctx, coords, opts, () => {
    ctx.stroke()
    ctx.closePath()
  })
}
