# Canvas Methods 

TradeX-chart provides a collection of ``canvas`` drawing methods.

They are available via the exported ``canvas`` object.

```javascript
import { canvas } from 'tradex-chart'
```
And also via the ``Indicator`` class used for building custom indicators.

```javascript
import { Indicator } from 'tradex-chart'
```
## renderLine
Render line - open path

* @param {object} ctx - canvas reference
* @param {array} coords - array of x y coords [{x:x, y:y}, ...]
* @param {object} opts 

## renderLineHorizontal
Draw a horizontal straight line

* @param {object} ctx - canvas reference
* @param {number} y - canvas pixel position
* @param {number} left - canvas pixel position
* @param {number} right - canvas pixel position
* @param {object} opts 

## renderLineVertical
Draw a vertical straight line

* @param {object} ctx - canvas reference
* @param {number} x - canvas pixel position
* @param {number} top - canvas pixel position
* @param {number} bottom - canvas pixel position
* @param {object} opts 
## renderPathStroke
Render an open path of multiple points

* @param {object} ctx - canvas reference
* @param {array} coords - array of x y coords [{x:x, y:y}, ...]
* @param {object} style - {width, stroke, dash}
## renderPathClosed
Render unfilled closed path of multiple points

* @param {object} ctx - canvas reference
* @param {array} coords - array of x y coords [{x:x, y:y}, ...]
* @param {object} style - {width, stroke, fill, dash}
## renderSpline
Draw Spline of multiple points

* @param {canvas} ctx - HTML Canvas
* @param {array} points - array of points [{x, y}, {x, y}...]
* @param {number} tension
## renderRect
Stroked and or Filled rectangle

* @param {object} ctx - canvas reference
* @param {number} x - canvas pixel position
* @param {number} y - canvas pixel position
* @param {number} w - width pixel distance
* @param {number} h - height pixel distance
* @param {object} opts - {fill, size, border}
## renderRectRound
Rounded filled rectangle with border

* @param {object} ctx - canvas reference
* @param {number} x - canvas pixel position
* @param {number} y - canvas pixel position
* @param {number} w - width pixel distance
* @param {number} h - height pixel distance
* @param {number} r - radius pixel distance
* @param {object} opts - {fill, border, size}
## renderPolygonRegular
Draw Regular Polygon 

* @param {canvas} ctx - HTML Canvas
* @param {number} x
* @param {number} y
* @param {number} radius
* @param {number} sides
* @param {number} rotateAngle - 90 degrees(negative direction i.e., -Math.PI/2) 
* @param {object} opts - {fill, size, border, rotate}
## renderPolygonIrregular
Draw Irregular Polygon

* @param {canvas} ctx - HTML Canvas
* @param {array} points - array of points [{x, y}, {x, y}...]
* @param {object} opts - {fill, size, border, rotate}
## renderTriangle
Render triangle

* @param {object} ctx - canvas reference
* @param {number} x - canvas pixel position
* @param {number} y - canvas pixel position
* @param {number} h - height pixel distance
* @param {object} opts - {fill, size, border, rotate}
## renderDiamond
Render diamond

* @param {object} ctx - canvas reference
* @param {number} x - canvas pixel position
* @param {number} y - canvas pixel position
* @param {number} w - width pixel distance
* @param {number} h - height pixel distance
* @param {object} opts - {fill, size, border, rotate}
## renderCircle
Draw a solid circle with border

* @param {object} ctx - canvas reference
* @param {number} x - canvas pixel position
* @param {number} y - canvas pixel position
* @param {number} r - radius pixel distance
* @param {object} opts - {border, size, fill}
## renderImage
Draw image to canvas
https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images

* @param {canvas} cxt
* @param {image} image - (CSSImageValue or HTMLImageElement or SVGImageElement or HTMLVideoElement or HTMLCanvasElement or ImageBitmap or OffscreenCanvas)
* @param {number} sx - x or source x
* @param {number} sy - y or source y
* @param {number} sWidth - width or source width
* @param {number} sHeight - height or source height
* @param {number} dx - destination x
* @param {number} dy - destination y
* @param {number} dWidth - destination width
* @param {number} dHeight - destination height
