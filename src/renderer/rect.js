
/**
 * Rounded filled rectangle with border
 * @param {object} ctx - canvas reference
 * @param {string} fillStyle - CSS colour format
 * @param {string} borderStyle - CSS colour format
 * @param {number} borderSize - pixel width
 * @param {number} x - canvas pixel position
 * @param {number} y - canvas pixel position
 * @param {number} width - pixel distance
 * @param {number} height - pixel distance
 * @param {number} borderRadius - pixel distance
 */
export function renderStrokeFillRoundRect (
  ctx, x, y, width, height, 
  borderSize, borderRadius, fillStyle, borderStyle
) {
  renderFillRoundRect(ctx, x, y, width, height, borderRadius, fillStyle)
  renderStrokeRoundRect(ctx, x, y, width, height, borderRadius, borderStyle, borderSize)
}

/**
 * Filled rectangle
 * @param {object} ctx - canvas reference
 * @param {string} style - CSS colour format
 * @param {number} x - canvas pixel position
 * @param {number} y - canvas pixel position
 * @param {number} width - pixel distance
 * @param {number} height - pixel distance
 */
export function renderFillRect (ctx, x, y, width, height, style) {
  ctx.fillStyle = style
  ctx.fillRect(x, y, width, height)
}

/**
 * Rounded rectangle
 * @param {object} ctx - canvas reference
 * @param {string} borderStyle - CSS colour format
 * @param {number} borderSize - pixel width
 * @param {number} x - canvas pixel position
 * @param {number} y - canvas pixel position
 * @param {number} w - width pixel distance
 * @param {number} h - height pixel distance
 * @param {number} r - radius pixel distance
 */
export function renderStrokeRoundRect (
  ctx, x, y, w, h, r,
  borderStyle, borderSize
  ) {
  ctx.lineWidth = borderSize
  ctx.strokeStyle = borderStyle
  renderRoundRect(ctx, x, y, w, h, r)
  ctx.stroke()
}

/**
 * Rounded filled rectangle
 * @param {object} ctx - canvas reference
 * @param {string} style - CSS colour format
 * @param {number} x - canvas pixel position
 * @param {number} y - canvas pixel position
 * @param {number} w - width pixel distance
 * @param {number} h - height pixel distance
 * @param {number} r - radius pixel distance
 */
export function renderFillRoundRect (ctx, x, y, w, h, r, style) {
  ctx.fillStyle = style
  renderRoundRect(ctx, x, y, w, h, r)
  ctx.fill()
}

/**
 * Rounded rectangle
 * @param {object} ctx - canvas reference
 * @param {number} x - canvas pixel position
 * @param {number} y - canvas pixel position
 * @param {number} w - width pixel distance
 * @param {number} h - height pixel distance
 * @param {number} r - radius pixel distance
 */
export function renderRoundRect (ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}
