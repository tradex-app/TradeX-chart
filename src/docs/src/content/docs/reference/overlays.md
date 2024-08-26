---
title: Overlays
description: Overlays in the simplest form are a chart pane layer
---
Overlays in the simplest form are a layer, that exist either on:

* Primary Chart Pane (candlestick price view)
* Secondary Chart Panes (indicators that don't live on the primary chart)
* Y Axis price scale
* X Axis time line
* Main Pane, which lives below all other panes

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

## Overlay Data and Properties

The ``Overlay`` class provides everything needed to draw on or interact with the chart. The `core` property points to the root of the chart and thus gives you access to everything else contained therein.


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
| data    | if the overlay is an indicator, data is found here    |
| context | "chart", "xAxis", "yAxis" - where the overlay is added |
| plots   | methods to draw on the overlay or any other canvas     |

## Built-in Overlays

The chart is built by layering a number of default overlays. Any [custom overlays](../overlays_custom) or [Indicators](../indicators) are thus simply further layers atop these.

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
[Indicators](../indicators) are a special (child) class of overlays.
Both standard and custom indicators are extensions of the indicator class.
Indicators draw a visual interpretation (calculation) of either the price history data (candles) or their own unique dataset.
:::

## Adding Optional Overlays

To add indicators to the chart, refer to the [indicator documentation](../indicators).

Optional overlays are always present, and can be enabled via: 

* [chart config](../02_configuration)
* [addOverlay()](../overlays_custom#addinganoverlay) API method

The current list of optional overlays is as follows:

* Scale Price Line - ``stream: {}`` see: [Streaming Price Data](../streaming_price_data)
* Chart High Low - ``hightLow: true``
* Chart Watermark - ``watermark: { text: "text goes here" }`` see: TODO: Watermark Options

The following ovelays are an exception and are added via the [initial chart state](../state) supplied by the chart config, because they may provide a dataset to be included in the chart data state. See their corresponding documentation for more detail.

* [Chart News Events](../../news_events)
* [Chart Trades](../../trades)

## Custom Overlays

Please refer to the [Custom Overlays](../overlays_custom) documentation to find out how to [define](../overlays_custom/#definingacustomoverlay), [register](../overlays_custom#registeringanoverlay), [add](../overlays_custom#addinganoverlay) and [remove](../overlays_custom#removinganoverlay) overlays via the API.


