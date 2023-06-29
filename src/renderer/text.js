// text.js
// collection of canvas text functions

import { CanvasStyle } from "../definitions/style"


/**
 * Measure the width of the text
 * @param {canvas} ctx - HTML Canvas
 * @param {string} text
 * @returns {number}
 */
export function calcTextWidth (ctx, text) {
  return Math.round(ctx.measureText(text).width)
}

/**
 * Create font
 * @param {string} fontSize
 * @param {string} fontFamily
 * @param {string} fontWeight
 * @returns {string}
 */
export function createFont (
  fontSize = CanvasStyle.fontSize, 
  fontWeight = CanvasStyle.fontWeight, 
  fontFamily = CanvasStyle.fontFamily
  ) {
  return `${fontWeight} ${fontSize}px ${fontFamily}`
}

/**
 * Get the width of the text box
 * @param {canvas} ctx - HTML Canvas
 * @param {string} text
 * @param {Object} opts
 * @returns {number}
 */
export function getTextRectWidth (ctx, text, opts) {
  ctx.font = createFont(opts.fontSize, opts.fontWeight, opts.fontFamily)
  const textWidth = calcTextWidth(ctx, text)
  const paddingLeft = opts.paddingLeft || 0
  const paddingRight = opts.paddingRight || 0
  const borderSize = opts.borderSize || 0
  return paddingLeft + paddingRight + textWidth + (borderSize * 2)
}

/**
 * Get the height of the text box
 * @param {Object} opts
 * @returns {number}
 */
export function getTextRectHeight (opts) {
  const paddingTop = opts.paddingTop || 0
  const paddingBottom = opts.paddingBottom || 0
  const borderSize = opts.borderSize || 0
  const fontSize = opts.fontSize || 0
  return paddingTop + paddingBottom + fontSize + (borderSize * 2)
}

/**
 * Text
 * @param {Object} ctx - canvas reference
 * @param {number} x - canvas pixel position
 * @param {number} y - canvas pixel position
 * @param {Object} opts - {text, colour}
 */
export function renderText (ctx, x, y, opts) {
  ctx.fillStyle = opts?.colour
  ctx.font = createFont(opts?.fontSize, opts?.fontWeight, opts?.fontFamily) 
  ctx.textAlign = opts?.textAlign || "start"
  ctx.textBaseLine = opts?.textBaseLine || "alphabetic"
  ctx.direction = opts?.direction || "inherit"
  ctx.lineWidth = opts?.size
  ctx.strokeStyle = opts?.border
  if (opts?.stroke)
    ctx.strokeText(opts?.text, x, y, opts?.max)
  else 
    ctx.fillText(opts?.text, x, y, opts?.max)
}

/**
 * draw text with background
 * @export
 * @param {canvas} ctx - HTML Canvas
 * @param {string} txt
 * @param {number} x
 * @param {number} y
 * @param {Object} opts - styling options
 */
export function renderTextBG(ctx, txt, x, y, opts) {

  /// lets save current state as we make a lot of changes        
  ctx.save();

  ctx.font = createFont(opts?.fontSize, opts?.fontWeight, opts?.fontFamily)
  /// draw text from top - makes life easier at the moment
  ctx.textBaseline = 'top';

  /// color for background
  ctx.fillStyle = opts.bakCol || CanvasStyle.bakCol;
  
  /// get width of text
  let width = opts.width || getTextRectWidth(ctx, txt, opts)
  let height = opts.height || getTextRectHeight(opts)

  /// draw background rect
  ctx.fillRect(x, y, width, height);

  // draw text on top
  ctx.fillStyle = opts.txtCol || CanvasStyle.txtCol;
  x = x + opts?.paddingLeft
  y = y + opts?.paddingTop
  ctx.fillText(`${txt}`, x, y);
  
  /// restore original state
  ctx.restore();
}
