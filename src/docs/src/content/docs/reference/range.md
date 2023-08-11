---
title: Range
description: Temporal subset of chart data displayed to the user
---

The chart range determines what subset of price data is displayed to the user via a start and end bound.

## Initial Range Config

On ``chart.start(config)`` the chart will look for a starting timestamp in the provided config. If none is found, it will default to displaying the latest price records (candles).

```javascript
const config = {
  range: {
    // range starting timestamp, chart will display data from here
    // if undefined, the range will position by default at the end of the price history ie. the most recent price records (candles)
    startTS: 1543572000000,
    // initial number of price records (candles) the chart will display
    initialCnt: 40,
    // maximum number of empty future price records (candles) the chart will display after the last candle
    limitFuture: 200,
    // maximum number of empty past price records (candles) the chart will display before the last candle
    limitPast: 200,
    // minimum number of price records (candles) the chart will display (minimum zoom)
    minCandles: 20,
    // padding top and bottom of price history (candles) and chart border so they don't touch
    yAxisBounds: 0.3,
    // center the chart on the startTS, ranter than place startTS on the left
    center: true
  }
}
```
### startTS - center - initialCnt

On first starting ``chart.start()``, the chart will present the range, ``initialCnt`` the number of viewable price records (candles), starting from the start timestamp ``startTS``. If none is specified, the chart will present the last, most recent price history. ``center`` will place the ``startTS`` in the center of the chart.

:::note
All timestamps must be in milliseconds!
:::

### minCandles

``minCandles`` is the minimum number of price records (candles) that the chart will display. This is also the minimum zoom level. If not specified, the chart will use a default.

### limitFuture - limitPast

These limits are the "padding" / "empty" candles at the end or start of the price data history. Say you have 1000 price records (candles) ``limitFuture`` and ``limitPast`` will then allow the chart to scroll, say for example, another 50 to the past, or future, depending upon what you define. If you add more data (merge) to the chart it doesn't matter, the padding is always present on either end no matter the dataset size. The chart will use defaults if neither are specified.

### yAxisBounds

``yAxisBounds`` determines the amount of padding between the chart border and the highest and lowest price records (candles). If ot specified a default will be used. This value is only used in automatic display mode, where the chart can only be scrolled / panned left or right In manual mode when the chart can be panned up, down, left or right, this value is ignored, until the display mode is reset to automatic again.

## Set Range

``setRange(start, end)`` expects price history data index values for ``start`` and ``end``. 

It is more likely that you will want to reference your price data via timestamps. In that case [Jump to Timestamp](#jump-to-timestamp) ``jumpToTS(ts)`` is preferable.

```javascript
chart.setRange(start, end)
```

## Jump to Index

Position the chart display range on the specified data history index.

``limited`` will limit the range start to in bounds values of the data history.
``center`` will center the display range on the start value.

```javascript
chart.jumpToIndex(start, limited=true, center=true)
```

## Jump to Timestamp

Position the chart display range on the specified timestamp.

``limited`` will limit the range start to in bounds values of the data history.
``center`` will center the display range on the start value.

```javascript
chart.jumpToTS(ts, limited=true, center=true)
```

## Jump to Start

Position the chart display range on the earliest (first) data history value.

``center`` will center the display range on the start value.

```javascript
chart.jumpToStart(center=false) 
```

## Jump to End

Position the chart display range on the most recent (last) data history value.

``center`` will center the display range on the start value.

```javascript
chart.jumpToEnd(center=true)
```

## Merge Data

Merge any of the following data into the chart data:

* Price history (candles)
* Indicator data

```javascript
chart.mergeData(merge, newRange=false, calc=false)
```
Refer to [Merging Data Into the State](../state/#merging-data-into-the-state) for further information.

# Range Instance

The range instance can be referenced from the root API.

```javascript
chart.range
```

It provides several helper methods and status for handling the range, indexes and timestamps.

## Value

Return the value (array) at price history index. If price history index, out of bounds will return null filled entry (array).

If the ``id`` is specified, then it will return the matching indicator data.

```javascript
chart.range.value (index, id)
```

## ValueByTS

## Get Data By ID

## Get Time Index

## In Range

## In Price History

## In Render Range

## Range Index

## Snapshot

# Range Exports

TradeX Chart also exports it's internal Range module. 

```javascript
import { range } from "tradex-chart"
```

Included is a helper function you might find useful.

## Detect Interval

Detects candles interval from an array of ohlcv values (price history). It requires an minimum of two entries, otherwise it cannot make any comparison. The returned interval value is in milliseconds.

```javascript
import { detectInterval } from "tradex-chart"

const history = [
  [timestamp, open, high, low, close, volume],
  [timestamp, open, high, low, close, volume],
  [timestamp, open, high, low, close, volume],
]
// returns the interval in millisecons
const tfms = detectInterval(history)
```

