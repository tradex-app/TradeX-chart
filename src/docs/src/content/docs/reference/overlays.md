---
title: Overlays
description: Overlays in the simplest form are a chart pane layer
---
Overlays in the simplest form are a layer, that exist either on:

* Primary chart (candlestick price view)
* Secondary chart panes (indicators that don't live on the primary chart)
* Y Axis price scale
* X Axis time line

![Chart Overlay Regions](../../../assets/Overly-Regions.png)

## Features

Overlays (layers) have the following features:

* passive, responding the price date range that chart is viewing eg.:
  * candles
  * indicators
* active, can respond to input such as the cursor / mouse / pointer position eg.:
  * cursor cross hair,
  * floating timeline label,
  * Y Axis floating live streaming price label
* static remain fixed and do not scroll with the chart or cursor / mouse / pointer eg:
  * watermark - can be text or image
* stacked, which means their visual order can be changed
* visibility can be toggled on or off
* can be arbitrarily added or removed
* can have their own visual theme
* have access to the in-built canvas methods for drawing to the overlay, lines,
* boxes, circles, text, images...
* automatically resize with the chart or pane displaying them.

## Built-in Overlays


| Name                                   | Key    | Default  |
| ---------------------------------------- | -------- | ---------- |
| Chart Candles                          |        |          |
| Chart Cursor                           |        |          |
| Chart Grid                             |        |          |
| Chart High Low                         |        | optional |
| [Chart News Events](../overlays_news_events) | events | optional |
| Chart Streaming Candle                 |        |          |
| [Chart Trades](../overlays_trades)           | trades | optional |
| Chart Volume                           |        |          |
| Chart Watermark                        |        | optional |
| [Indicators](../../indicators)         |        | optional |
| Scale Cursor                           |        |          |
| Scale Labels                           |        |          |
| Scale Price Line                       |        | optional |
| Time Cursor                            |        |          |
| Time Labels                            |        |          |

:::note
[Indicators](../indicators.md) are a special (child) class of overlays.
Both standard and custom indicators are extensions of the indicator class.
Indicators draw a visual interpretation (calculation) of either the price history data (candles) or their own unique dataset.
:::

## Adding Optional Overlays

To add indicators to the chart, refer to the [indicator documentation](../indicators).

Optional overlays are always present, but must be enabled via the [chart config](../02_configuration).

* Scale Price Line - ``stream: {}`` see: [Streaming Price Data](../streaming_price_data)
* Chart High Low - ``hightLow: true``
* Chart Watermark - ``watermark: { text: "text goes here" }`` see: TODO: Watermark Options

The following ovelays are an exception and are added via the [initial chart state](../state) supplied by the chart config, because they may provide a dataset to be included in the chart data state. See their corresponding documentation for more detail.

* [Chart News Events](../../news_events)
* [Chart Trades](../../trades)

## Custom Overlays

TradeX-chart exports the ``Overlay`` class for you extend to build your own custom overlays.

```javascript
import { overlays } from "tradex-chart"
```

The [TradeX-chart GitHub repository](https://github.com/tradex-app/TradeX-chart/tree/master/src/components/overlays) is a good starting point for examples of how to build overlays.

### Basic Custom Overlay

The foundation of an overlay looks like the following:

```javascript
import { overlays } from "tradex-chart"

export default class customOverlay extends Overlay {

  constructor(target, xAxis=false, yAxis=false, theme, parent) {
    // instantiate parent class Overlay
    super(target, xAxis, yAxis, theme, parent)
  }

  // position() will pan / scroll your overlay with the rest of the chart
  set position(p) { this.target.setPosition(p[0], p[1]) }
  // if you want your overlay NOT to pan / scroll, then replace the above with:
  // set position(p) { this.target.setPosition(0, 0) }

  // draw your overlay
  draw(range=this.core.range) {
    // clear the layer provided to your overlay
    this.scene.clear()
    // HTML canvas context
    const ctx = this.scene.context
    ctx.save();

    // draw something on the canvas

    ctx.restore()
  }
}
```

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

TODO:

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


### Adding a Custom Overlay to the Chart

TODO:
