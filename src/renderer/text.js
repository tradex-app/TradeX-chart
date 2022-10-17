/**
 * Text
 * @param {object} ctx - canvas reference
 * @param {string} colour - CSS colour format
 * @param {number} x - canvas pixel position
 * @param {number} y - canvas pixel position
 * @param {string} text - text content
 */
export function renderText (ctx, color, x, y, text) {
  ctx.fillStyle = color
  ctx.fillText(text, x, y)
}
