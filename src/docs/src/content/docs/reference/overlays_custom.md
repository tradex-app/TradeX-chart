---
title: Custom Overlays
description: Building your own overlays
---
TradeX-chart allows you to build your own custom overlays to be used in any of the chart panes as defined in the [Overlay documentation](../overlays).

## Defining a Custom Overlay

All overlays, whether default, custom and even indicators inherit the `Overlay` class.

This is exported by the TradeX for you to use in your own custom overlays.

```javascript
import { Overlay } from "tradex-chart"

class CustomOverlay extends Overlay {

  constructor(target, xAxis=false, yAxis=false, theme, parent, params) {

    super(target, xAxis, yAxis, theme, parent, params)
  }

  // update position with chart scrolling / panning
  set position(p) { this.target.setPosition(p[0], p[1]) }
  // or when fixed position and does not scroll / pan with the chart
  // set position(p) { this.target.setPosition(0, 0) }

  // draw your overlay - invoked automatically by the chart
  draw() {
    // check if the overlay should draw
    if (!super.mustUpdate()) return

    // clear the layer provided to your overlay
    this.scene.clear()
    // HTML canvas context
    const ctx = this.scene.context
    ctx.save();

    // draw something on the canvas

    ctx.restore()
    // reset the draw status
    super.updated()
  }
}
```

Please refer to the [default overlays in the repository](https://github.com/tradex-app/TradeX-chart/tree/master/src/components/overlays) as examples of what can be done with an overlay.

### What the Parent Overlay Class Provides

The parent ``Overlay`` class provides everything needed to draw on the chart.


| Name    | Description                                            |
| --------- | -------------------------------------------------------- |
| core    | [chart root API](../../api/core)                       |
| parent  | pane that overlay is applied to                        |
| config  | [chart config](../02_configuration)                    |
| theme   | [chart theme](../themes)                               |
| params  | parameters that the overlay was created with           |
| target  | layer methods and properties                           |
| scene   | layer canvas provided to the overlay                   |
| chart   | chart pane                                             |
| xAxis   | methods and properties for the timeline                |
| yAxis   | methods and properties for the (price) scale           |
| context | "chart", "xAxis", "yAxis" - where the overlay is added |
| plots   | methods to draw on the overlay or any other canvas     |

### Drawing on the Overlay

TODO:

#### Using plot() to Draw on the Overlay

The ``plot()`` method provides the following functions to draw on the overlay or any other canvas:

* [``createCanvas``](../canvas_methods#createcanvas)
* [``fillStroke``](../canvas_methods#fillstroke)
* [``renderLine``](../canvas_methods#renderline)
* [``renderLineHorizontal``](../canvas_methods#renderlinehorizontal)
* [``renderLineVertical``](../canvas_methods#renderlinevertical)
* [``renderPathStroke``](../canvas_methods#renderpathstroke)
* [``renderPathClosed``](../canvas_methods#renderpathclosed)
* [``renderSpline``](../canvas_methods#renderspline)
* [``renderRect``](../canvas_methods#renderrect)
* [``renderRectFill``](../canvas_methods#renderrectfill)
* [``renderRectStroke``](../canvas_methods#renderrectstroke)
* [``renderRectRound``](../canvas_methods#renderrectround)
* [``renderRectRoundFill``](../canvas_methods#renderrectroundfill)
* [``renderRectRoundStroke``](../canvas_methods#renderrectroundstroke)
* [``renderPolygonRegular``](../canvas_methods#renderpolygonregular)
* [``renderPolygonIrregular``](../canvas_methods#renderpolygonirregular)
* [``renderTriangle``](../canvas_methods#rendertriangle)
* [``renderDiamond``](../canvas_methods#renderdiamond)
* [``renderCircle``](../canvas_methods#rendercircle)
* [``renderImage``](../canvas_methods#renderimage)
* [``renderText``](../canvas_methods#rendertext)
* [``renderTextBG``](../canvas_methods#rendertextbg)

## Registering an Overlay

Custom overlays must first be registered with the chart before they can be used.

```javascript
import MyOverlayClass from './src/myOverlayClass.js'

const overlays = {
  myOverlay: {
    class: MyOverlayClass, 
    location: "chartPane"
  }
}
const result = chart0.setCustomOverlays(overlays)
```

``setCustomOverlays()`` will return an object

## Special Cases

You may occasionally have the need where your overlay appears on multiple panes of the chart. For instance the [Price High Low overlay](../overlays_custom.md) draws the price on the Price Scale / Y Axis, as well as on the Primary Chart Pane.

This overlay demonstrates how one overlay can insert other (related) overlays into other panes, start them and even modify the execution of the other.

``./src/components/overlays/chart-highLow.js``

## Active Optional Overlays

Provide a list of optional overlays currently active on the chart.

The lists of available overlays are grouped by **chart panes**:

* ``mainPane``
* ``primaryPane``
* ``secondaryPane``
* ``scale``
* ``timeline``

``chart0.customOverlays()`` returns all of the currently available custom overlays.

``chart0.optionalOverlays()`` returns all of the currently available optional overlays, which also includes the custom overlays.

Each overlay entry is an object.

```javascript
{
  class: overlayClass,
  instance: instanceOfOverlayClass,
  layer: {} // canvas layer object,
  location: "primaryPane" // any of the above chart panes
}
```

## List of Available Overlays

There are a number of methods for revealing what optional overlays are available on the chart, including any registered custom overlays.

```javascript
chart0.hasOverlay(key)
```
``hasOverlay()`` returns a pointer to the overlay class or false

```javascript
chart0.overlayKeys()
```
``overlayKeys()`` returns an array of overlay keys (IDs)

```javascript
chart0.overlayEntries(key)
```
``ovrlayEntries()`` returns an object of key and overlay pairs


## Adding an Overlay

```javascript
chart0.addOverlay("custom", "chartPane")
```

Add an overlay from target graph (pane)

**addOverlay(key, targetID)**


| Parameter | Type   | Description                                                    |
| ----------- | -------- | ---------------------------------------------------------------- |
| key       | string | overlay ID                                                     |
| targetID  | string | target pane ID - mainPane, chartPane, chartScale, timeline, ID |

The ``key`` must be any of available optional overlays registered with the chart.

## Removing an Overlay

```javascript
chart0.removeOverlay("custom", "chartPane")
```

Remove an overlay from target graph (pane)

**removeOverlay(key, targetID)**


| Parameter | Type   | Description                                                    |
| ----------- | -------- | ---------------------------------------------------------------- |
| key       | string | overlay ID                                                     |
| targetID  | string | target pane ID - mainPane, chartPane, chartScale, timeline, ID |
