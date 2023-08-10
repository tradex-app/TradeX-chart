// rect.js

import { isNumber, isString } from "../utils/typeChecks";
import { CanvasStyle } from "../definitions/style";

/**
 * Rounded rectangle
 * @param {Object} ctx - canvas reference
 * @param {number} x - canvas pixel position
 * @param {number} y - canvas pixel position
 * @param {number} w - width pixel distance
 * @param {number} h - height pixel distance
 * @param {Object} opts - {border, size}
 */
export function renderRectStroke (ctx, x, y, w, h, opts) {
  ctx.lineWidth = opts?.width || CanvasStyle.borderWidth
  ctx.strokeStyle = opts?.border || CanvasStyle.stroke
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.stroke()
}

/**
 * Filled rectangle
 * @param {Object} ctx - canvas reference
 * @param {number} x - canvas pixel position
 * @param {number} y - canvas pixel position
 * @param {number} w - width pixel distance
 * @param {number} h - height pixel distance
 * @param {string} opts - CSS colour format
 */
export function renderRectFill (ctx, x, y, w, h, opts) {
  ctx.fillStyle = opts?.fill || CanvasStyle.fill
  ctx.fillRect(x, y, w, h)
}

/**
 * Stroked and Filled rectangle
 * @param {Object} ctx - canvas reference
 * @param {number} x - canvas pixel position
 * @param {number} y - canvas pixel position
 * @param {number} w - width pixel distance
 * @param {number} h - height pixel distance
 * @param {Object} opts - {fill, size, border}
 */
export function renderRect (ctx, x, y, w, h, opts) {
  if (isString(opts.fill)) 
    renderRectFill(ctx, x, y, w, h, opts)
  if (isNumber(opts.width) && opts.width > 0)
    renderRectStroke(ctx, x, y, w, h, opts)
}

/**
 * Rounded rectangle
 * @param {Object} ctx - canvas reference
 * @param {number} x - canvas pixel position
 * @param {number} y - canvas pixel position
 * @param {number} w - width pixel distance
 * @param {number} h - height pixel distance
 * @param {number} r - radius pixel distance
 * @param {Object} opts - {border, size}
 */
export function renderRectRoundStroke (
  ctx, x, y, w, h, r, opts
  ) {
  ctx.lineWidth = opts?.width || CanvasStyle.borderWidth
  ctx.strokeStyle = opts?.border || CanvasStyle.stroke
  renderRectRoundPath(ctx, x, y, w, h, r)
  ctx.stroke()
}

/**
 * Rounded filled rectangle
 * @param {Object} ctx - canvas reference
 * @param {number} x - canvas pixel position
 * @param {number} y - canvas pixel position
 * @param {number} w - width pixel distance
 * @param {number} h - height pixel distance
 * @param {number} r - radius pixel distance
 * @param {Object} opts - CSS colour format
 */
export function renderRectRoundFill (ctx, x, y, w, h, r, opts) {
  ctx.fillStyle = opts?.fill || CanvasStyle.fill
  renderRectRoundPath(ctx, x, y, w, h, r)
  ctx.fill()
}

/**
 * Rounded rectangle
 * @param {Object} ctx - canvas reference
 * @param {number} x - canvas pixel position
 * @param {number} y - canvas pixel position
 * @param {number} w - width pixel distance
 * @param {number} h - height pixel distance
 * @param {number} r - radius pixel distance
 */
export function renderRectRoundPath (ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

/**
 * Rounded filled rectangle with border
 * @param {Object} ctx - canvas reference
 * @param {number} x - canvas pixel position
 * @param {number} y - canvas pixel position
 * @param {number} w - width pixel distance
 * @param {number} h - height pixel distance
 * @param {number} r - radius pixel distance
 * @param {Object} opts - {fill, border, size}
 */
export function renderRectRound (
  ctx, x, y, w, h, r, opts
) {
  if (isString(opts.fill)) 
    renderRectRoundFill(ctx, x, y, w, h, r, opts?.fill)
  if (isNumber(opts.width) && opts.width > 0)
    renderRectRoundStroke(ctx, x, y, w, h, r, opts?.border, opts?.width)
}
