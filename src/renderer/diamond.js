/**
 * Render filled diamond
 * @param {object} ctx - canvas reference
 * @param {string} colour - CSS colour format
 * @param {object} pos - {x:x, y:y}
 * @param {number} width - pixel distance
 * @param {number} height - pixel distance
 */
export function renderFilledDiamond (ctx, colour, pos, width, height) {
  ctx.fillStyle = colour
  ctx.beginPath()
  ctx.moveTo(pos.x - width / 2, pos.y)
  ctx.lineTo(pos.x, pos.y - height / 2)
  ctx.lineTo(pos.x + width / 2, pos.y)
  ctx.lineTo(pos.x, pos.y + height / 2)
  ctx.closePath()
  ctx.fill()
}
