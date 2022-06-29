export const defaultOptions = {
  fontSize: 12,
  fontWeight: "normal",
  fontFamily: 'Helvetica Neue',
  paddingLeft: 3,
  paddingRight: 3,
  paddingTop: 2,
  paddingBottom: 2,
  borderSize: 0,
  txtCol: "#000",
  bakCol: "#CCC"
}

/**
 * Get screen ratio
 * @param canvas
 * @returns {number}
 */
export function getPixelRatio (canvas) {
  return (canvas.ownerDocument && canvas.ownerDocument.defaultView && canvas.ownerDocument.defaultView.devicePixelRatio) || 2
}

/**
 * Measure the width of the text
 * @param ctx
 * @param text
 * @returns {number}
 */
export function calcTextWidth (ctx, text) {
  return Math.round(ctx.measureText(text).width)
}

/**
 * Create font
 * @param fontSize
 * @param fontFamily
 * @param fontWeight
 * @returns {string}
 */
export function createFont (
  fontSize = defaultOptions.fontSize, 
  fontWeight = defaultOptions.fontWeight, 
  fontFamily = defaultOptions.fontFamily
  ) {
  return `${fontWeight} ${fontSize}px ${fontFamily}`
}

/**
 * Get the width of the text box
 * @param ctx
 * @param text
 * @param options
 * @returns {number}
 */
export function getTextRectWidth (ctx, text, options) {
  ctx.font = createFont(options.fontSize, options.fontWeight, options.fontFamily)
  const textWidth = calcTextWidth(ctx, text)
  const paddingLeft = options.paddingLeft || 0
  const paddingRight = options.paddingRight || 0
  const borderSize = options.borderSize || 0
  return paddingLeft + paddingRight + textWidth + (borderSize * 2)
}

/**
 * Get the height of the text box
 * @param options
 * @returns {number}
 */
export function getTextRectHeight (options) {
  const paddingTop = options.paddingTop || 0
  const paddingBottom = options.paddingBottom || 0
  const borderSize = options.borderSize || 0
  const fontSize = options.fontSize || 0
  return paddingTop + paddingBottom + fontSize + (borderSize * 2)
}

/**
 * draw text with background
 * @export
 * @param {canvas} ctx
 * @param {string} txt
 * @param {number} x
 * @param {number} y
 * @param {object} options - styling options
 */
export function drawTextBG(ctx, txt, x, y, options) {

  /// lets save current state as we make a lot of changes        
  ctx.save();

  ctx.font = createFont(options?.fontSize, options?.fontWeight, options?.fontFamily)
  /// draw text from top - makes life easier at the moment
  ctx.textBaseline = 'top';

  /// color for background
  ctx.fillStyle = options.bakCol || defaultOptions.bakCol;
  
  /// get width of text
  let width = getTextRectWidth(ctx, txt, options)
  let height = getTextRectHeight(options)

  /// draw background rect
  ctx.fillRect(x, y, width, height);

  // draw text on top
  ctx.fillStyle = options.txtCol || defaultOptions.txtCol;
  x = x + options?.paddingLeft
  y = y + options?.paddingTop
  ctx.fillText(txt, x, y);
  
  /// restore original state
  ctx.restore();
}


function drawSpline(points, tension) {
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);

  var t = (tension != null) ? tension : 1;
  for (var i = 0; i < points.length - 1; i++) {
      var p0 = (i > 0) ? points[i - 1] : points[0];
      var p1 = points[i];
      var p2 = points[i + 1];
      var p3 = (i != points.length - 2) ? points[i + 2] : p2;

      var cp1x = p1.x + (p2.x - p0.x) / 6 * t;
      var cp1y = p1.y + (p2.y - p0.y) / 6 * t;

      var cp2x = p2.x - (p3.x - p1.x) / 6 * t;
      var cp2y = p2.y - (p3.y - p1.y) / 6 * t;

      ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
  }
  ctx.stroke();
}

