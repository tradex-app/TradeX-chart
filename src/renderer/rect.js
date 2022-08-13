
/**
 * Rounded filled rectangle with border
 * @param ctx
 * @param fillStyle
 * @param borderStyle
 * @param borderSize
 * @param x
 * @param y
 * @param width
 * @param height
 * @param borderRadius
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
 * @param ctx
 * @param style
 * @param x
 * @param y
 * @param width
 * @param height
 */
export function renderFillRect (ctx, x, y, width, height, style) {
  ctx.fillStyle = style
  ctx.fillRect(x, y, width, height)
}

/**
 * Rounded rectangle
 * @param ctx
 * @param borderStyle
 * @param borderSize
 * @param x
 * @param y
 * @param w
 * @param h
 * @param r
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
 * @param ctx
 * @param style
 * @param x
 * @param y
 * @param w
 * @param h
 * @param r
 */
export function renderFillRoundRect (ctx, x, y, w, h, r, style) {
  ctx.fillStyle = style
  renderRoundRect(ctx, x, y, w, h, r)
  ctx.fill()
}

/**
 * Rounded rectangle
 * @param ctx
 * @param x
 * @param y
 * @param w
 * @param h
 * @param r
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
