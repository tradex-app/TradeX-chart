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
| Chart High Low                         | hiLo   | optional |
| [Chart News Events](../../news_events) | events | optional |
| Chart Streaming Candle                 |        |          |
| [Chart Trades](../../trades)           | trades | optional |
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

**Scale Price Line** and **Chart Watermark** are always present, but must be enabled via the [chart config](../02_configuration).

The following ovelays are added via the [initial chart state](../state) supplied by the chart config.

* Chart High Low
* Chart Events
* Chart Trades

```javascript
chart.Chart.addOverlays()
```

## Custom Overlays

TradeX-chart exports the ``Overlay`` class for you extend to build your own custom overlays.

```javascript
import { overlays } from "tradex-chart"
```

The [TradeX-chart GitHub repository](https://github.com/tradex-app/TradeX-chart/tree/master/src/components/overlays) is a good starting point for examples of how to build overlays.

### Basic Overlay

The foundation of an overlay looks like the following:

```javascript
import { overlays } from "tradex-chart"

export default class customOverlay extends Overlay {

  constructor(target, xAxis=false, yAxis=false, theme, parent) {
    // instantiate parent class Overlay
    super(target, xAxis, yAxis, theme, parent)
  }

  set position(p) { this.target.setPosition(p[0], p[1]) }

  draw(range=this.core.range) {
  
    // draw your overlay
  }
}
```
