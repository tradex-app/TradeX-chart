---
title: Canvas Methods
---


TradeX-chart provides a collection of ``canvas`` drawing methods.

They are available via the exported ``canvas`` object.

```javascript
import { canvas } from 'tradex-chart'
```
And also via the ``Indicator`` class used for [building custom indicators](../indicators/#custom-indicators), accessable via the ``plot( plots, type, opts )`` method.

* [``createCanvas``](#createcanvas)
* [``fillStroke``](#fillstroke)
* [``renderLine``](#renderline)
* [``renderLineHorizontal``](#renderlinehorizontal)
* [``renderLineVertical``](#renderlinevertical)
* [``renderPathStroke``](#renderpathstroke)
* [``renderPathClosed``](#renderpathclosed)
* [``renderSpline``](#renderspline)
* [``renderRect``](#renderrect)
* [``renderRectFill``](#renderrectfill)
* [``renderRectStroke``](#renderrectstroke)
* [``renderRectRound``](#renderrectround)
* [``renderRectRoundFill``](#renderrectroundfill)
* [``renderRectRoundStroke``](#renderrectroundstroke)
* [``renderPolygonRegular``](#renderpolygonregular)
* [``renderPolygonIrregular``](#renderpolygonirregular)
* [``renderTriangle``](#rendertriangle)
* [``renderDiamond``](#renderdiamond)
* [``renderCircle``](#rendercircle)
* [``renderImage``](#renderimage)
* [``renderText``](#rendertext)
* [``renderTextBG``](#rendertextbg)

## createCanvas
Create a HTML canvas element

* @param {number} w - width in pixels
* @param {number} h - height in pixels
* @return {canvas}  - HTML canvas element

## fillStroke
Fill and Stroke a Path

* @param {canvas} ctx - HTML Canvas
* @param {string} fill - colour #rrggbb(aa)
* @param {string} stroke - colour #rrggbb(aa)
* @param {number} with - pixel stroke width

## renderLine
Render line - open path

* @param {Object} ctx - canvas reference
* @param {Array} coords - array of x y coords ``[{x:x, y:y}, ...]``
* @param {Object} opts 

## renderLineHorizontal
Draw a horizontal straight line

* @param {Object} ctx - canvas reference
* @param {number} y - canvas pixel position
* @param {number} left - canvas pixel position
* @param {number} right - canvas pixel position
* @param {Object} opts 

## renderLineVertical
Draw a vertical straight line

* @param {Object} ctx - canvas reference
* @param {number} x - canvas pixel position
* @param {number} top - canvas pixel position
* @param {number} bottom - canvas pixel position
* @param {Object} opts 

## renderPath
Draw a path

* @param {Object} ctx - canvas reference
* @param {Array} coords - array of x y coords [{x:x, y:y}, ...]
* @param {Object} style - {width, stroke, fill, dash}
* @param {function} strokeFill

## renderPathStroke
Render an open path of multiple points

* @param {Object} ctx - canvas reference
* @param {Array} coords - array of x y coords ``[{x:x, y:y}, ...]``
* @param {Object} style - {width, stroke, dash}

## renderPathClosed
Render unfilled closed path of multiple points

* @param {Object} ctx - canvas reference
* @param {Array} coords - array of x y coords ``[{x:x, y:y}, ...]``
* @param {Object} style - {width, stroke, fill, dash}

## renderSpline
Draw Spline of multiple points

* @param {canvas} ctx - HTML Canvas
* @param {Array} points - array of points ``[{x:x, y:y}, ...]``
* @param {number} tension

## renderRect
Stroked and or Filled rectangle

* @param {Object} ctx - canvas reference
* @param {number} x - canvas pixel position
* @param {number} y - canvas pixel position
* @param {number} w - width pixel distance
* @param {number} h - height pixel distance
* @param {Object} opts - {fill, size, border}

## renderRectFill
Filled rectangle

* @param {Object} ctx - canvas reference
* @param {number} x - canvas pixel position
* @param {number} y - canvas pixel position
* @param {number} w - width pixel distance
* @param {number} h - height pixel distance
* @param {string} opts - CSS colour format

## renderRectStroke
Rounded rectangle

* @param {Object} ctx - canvas reference
* @param {number} x - canvas pixel position
* @param {number} y - canvas pixel position
* @param {number} w - width pixel distance
* @param {number} h - height pixel distance
* @param {Object} opts - {border, size}

## renderRectRound
Rounded filled rectangle with border

* @param {Object} ctx - canvas reference
* @param {number} x - canvas pixel position
* @param {number} y - canvas pixel position
* @param {number} w - width pixel distance
* @param {number} h - height pixel distance
* @param {number} r - radius pixel distance
* @param {Object} opts - {fill, border, size}

## renderRectRoundFill
Rounded filled rectangle

* @param {Object} ctx - canvas reference
* @param {number} x - canvas pixel position
* @param {number} y - canvas pixel position
* @param {number} w - width pixel distance
* @param {number} h - height pixel distance
* @param {number} r - radius pixel distance
* @param {Object} opts - CSS colour format

## renderRectRoundStroke
Rounded rectangle

* @param {Object} ctx - canvas reference
* @param {number} x - canvas pixel position
* @param {number} y - canvas pixel position
* @param {number} w - width pixel distance
* @param {number} h - height pixel distance
* @param {number} r - radius pixel distance
* @param {Object} opts - {border, size}

## renderPolygonRegular
Draw Regular Polygon 

* @param {canvas} ctx - HTML Canvas
* @param {number} x
* @param {number} y
* @param {number} radius
* @param {number} sides
* @param {number} rotateAngle - 90 degrees(negative direction i.e., -Math.PI/2) 
* @param {Object} opts - {fill, size, border, rotate}

## renderPolygonIrregular
Draw Irregular Polygon

* @param {canvas} ctx - HTML Canvas
* @param {Array} points - array of points ``[{x:x, y:y}, ...]``
* @param {Object} opts - {fill, size, border, rotate}

## renderTriangle
Render triangle

* @param {Object} ctx - canvas reference
* @param {number} x - canvas pixel position
* @param {number} y - canvas pixel position
* @param {number} h - height pixel distance
* @param {Object} opts - {fill, size, border, rotate}

## renderDiamond
Render diamond

* @param {Object} ctx - canvas reference
* @param {number} x - canvas pixel position
* @param {number} y - canvas pixel position
* @param {number} w - width pixel distance
* @param {number} h - height pixel distance
* @param {Object} opts - {fill, size, border, rotate}

## renderCircle
Draw a solid circle with border

* @param {Object} ctx - canvas reference
* @param {number} x - canvas pixel position
* @param {number} y - canvas pixel position
* @param {number} r - radius pixel distance
* @param {Object} opts - {border, size, fill}

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

## renderText
Text

* @param {Object} ctx - canvas reference
* @param {number} x - canvas pixel position
* @param {number} y - canvas pixel position
* @param {Object} opts - {text, colour}

## renderTextBG
draw text with background

* @export
* @param {canvas} ctx - HTML Canvas
* @param {string} txt
* @param {number} x
* @param {number} y
* @param {Object} opts - styling options
