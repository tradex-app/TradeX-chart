// line.js

import { line } from '../definitions/icons'
import { renderPath } from './path'

/**
 * Draw a horizontal straight line
 * @param ctx
 * @param y
 * @param left
 * @param right
 */
export function renderHorizontalLine (ctx, y, left, right, style) {
  const coordinates = [{x:left, y:y}, {x:right, y:y}]
  renderPath(ctx, coordinates, style, () => {
    ctx.stroke()
    ctx.closePath()
  })
}

/**
 * Draw a vertical straight line
 * @param ctx
 * @param x
 * @param top
 * @param bottom
 */
export function renderVerticalLine (ctx, x, top, bottom, style) {
  coordinates = [{x:x, y:top}, {x:x, y,bottom}]
  renderPath(ctx, coordinates, style, () => {
    ctx.stroke()
    ctx.closePath()
  })
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
