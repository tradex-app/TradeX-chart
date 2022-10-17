/**
 * Draw a circle
 * @param {object} ctx - canvas reference
 * @param {string} borderColour - CSS colour format
 * @param {number} borderSize - pixel width
 * @param {object} pos - {x:x, y:y}
 * @param {number} radius - pixel distance
 */
export function renderStrokedCircle (ctx, borderColour, borderSize, pos, radius) {
  ctx.lineWidth = borderSize
  ctx.strokeStyle = borderColour
  ctx.beginPath()
  ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2)
  ctx.closePath()
  ctx.stroke()
}

/**
 * Draw a solid circle
 * @param {object} ctx - canvas reference
 * @param {string} fillColour - CSS colour format
 * @param {object} pos - {x:x, y:y}
 * @param {number} radius - pixel distance
 */
export function renderFilledCircle (ctx, fillColour, pos, radius) {
  ctx.fillStyle = fillColour
  ctx.beginPath()
  ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2)
  ctx.closePath()
  ctx.fill()
}
