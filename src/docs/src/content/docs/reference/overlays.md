---
title: Overlays
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

Here's a list of the current in-built overlays:

* chart candles
* chart cursor
* chart grid
* chart streaming candle
* chart trades
* chart volume
* chart watermark
* ([indicators](indicators.md))
* scale cursor
* scale labels
* scale price line
* time cursor
* time labels

Note that [indicators](indicators.md) are a special (child) class of overlays. Both standard and custom indicators are extensions of the indicator class. This hints at what you can achieve by extending the overlay class yourself.

## Customization

For a standard chart, you will not have to have to concern yourself with overlays. Many config options, influence certain overlays. You don't even have to know they are there or how they function.

But if you wish to modify what information the chart displays or it's functionality, you will have engage directly with them.

TradeX-chart exports the ``Overlay`` class for you extend upon to build custom overlays
