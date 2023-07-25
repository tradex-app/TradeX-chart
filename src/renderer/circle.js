// circle.js

/**
 * Draw a solid circle with border
 * @param {Object} ctx - canvas reference
 * @param {number} x - canvas pixel position
 * @param {number} y - canvas pixel position
 * @param {number} r - radius pixel distance
 * @param {Object} opts - {border, size, fill}
 */
export function renderCircle (ctx, x, y, r, opts) {

  ctx.beginPath()
  ctx.arc(x, y, r, 0, Math.PI * 2)
  ctx.closePath()

  fillStroke(ctx, opts?.fill, opts?.stroke, opts?.width)
}
