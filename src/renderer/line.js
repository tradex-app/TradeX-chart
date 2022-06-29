
import { renderPath } from './path'

/**
 * Draw a horizontal straight line
 * @param ctx
 * @param y
 * @param left
 * @param right
 */
export function renderHorizontalLine (ctx, y, left, right) {
  ctx.beginPath()
  const correction = (ctx.lineWidth % 2) ? 0.5 : 0
  ctx.moveTo(left, y + correction)
  ctx.lineTo(right, y + correction)
  ctx.stroke()
  ctx.closePath()
}

/**
 * Draw a vertical straight line
 * @param ctx
 * @param x
 * @param top
 * @param bottom
 */
export function renderVerticalLine (ctx, x, top, bottom) {
  ctx.beginPath()
  const correction = (ctx.lineWidth % 2) ? 0.5 : 0
  ctx.moveTo(x + correction, top)
  ctx.lineTo(x + correction, bottom)
  ctx.stroke()
  ctx.closePath()
}

/**
 * Render line - open path
 * @param ctx
 * @param coordinates
 */
export function renderLine (ctx, coordinates, style) {
  renderPath(ctx, coordinates, style, () => {
    ctx.stroke()
    ctx.closePath()
  })
}
