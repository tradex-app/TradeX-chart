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
  fontSize = defaultOptions.fontSize, 
  fontWeight = defaultOptions.fontWeight, 
  fontFamily = defaultOptions.fontFamily
  ) {
  return `${fontWeight} ${fontSize}px ${fontFamily}`
}

/**
 * Get the width of the text box
 * @param {canvas} ctx - HTML Canvas
 * @param {string} text
 * @param {object} options
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
 * @param {object} options
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
 * @param {canvas} ctx - HTML Canvas
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
  let width = options.width || getTextRectWidth(ctx, txt, options)
  let height = options.height || getTextRectHeight(options)

  /// draw background rect
  ctx.fillRect(x, y, width, height);

  // draw text on top
  ctx.fillStyle = options.txtCol || defaultOptions.txtCol;
  x = x + options?.paddingLeft
  y = y + options?.paddingTop
  ctx.fillText(`${txt}`, x, y);
  
  /// restore original state
  ctx.restore();
}

/**
 * Draw Spline
 *
 * @export
 * @param {canvas} ctx - HTML Canvas
 * @param {array} points - array of points [{x, y}, {x, y}...]
 * @param {number} tension
 */
export function drawSpline(ctx, points, tension) {
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

/**
 * Draw Regular Polygon 
 *
 * @export
 * @param {canvas} ctx - HTML Canvas
 * @param {number} x
 * @param {number} y
 * @param {number} radius
 * @param {number} sides
 * @param {number} rotateAngle - 90 degrees(negative direction i.e., -Math.PI/2) 
 */
export function regularPolygon (ctx, x, y, radius, sides, rotateAngle) {
  if (sides < 3) return;
  var a = (Math.PI * 2)/sides;
  ctx.beginPath();
  ctx.translate(x,y);
  ctx.rotate(rotateAngle);
  ctx.moveTo(radius,0);
  for (var i = 1; i < sides; i++) {
  ctx.lineTo(radius*Math.cos(a*i),radius*Math.sin(a*i));
  }
  ctx.closePath();
}

/**
 * Draw Irregular Polygon
 *
 * @export
 * @param {canvas} ctx - HTML Canvas
 * @param {array} points - array of points [{x, y}, {x, y}...]
 */
export function drawPolygon (ctx, points) {
  if (points.length > 0) {
    ctx.beginPath();
    var point = points[0];
    ctx.moveTo(point.x, point.y); // point 1
    for (var i = 1; i < points.length; ++i) {
      point = points[i];
      ctx.lineTo(point.x, point.y); // point from 2 up to (points.length - 1)
    }
    ctx.closePath(); // go back to point 1
    ctx.stroke(); // draw stroke line
  }
};

export function drawCircle(ctx, x, y, radius, fill, stroke, strokeWidth) {
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, 2 * Math.PI, false)
  fillStroke(ctx, fill, stroke, strokeWidth)
}

/**
 * Fill and Stroke a Path
 *
 * @export
 * @param {canvas} ctx - HTML Canvas
 * @param {string} fill
 * @param {string} stroke
 * @param {number} strokeWidth
 */
export function fillStroke(ctx, fill, stroke, strokeWidth) {
  if (fill) {
    ctx.fillStyle = fill
    ctx.fill()
  }
  if (stroke) {
    ctx.lineWidth = strokeWidth || 1
    ctx.strokeStyle = stroke
    ctx.stroke()
  }
}