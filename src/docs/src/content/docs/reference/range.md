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

``merge`` is the same format as the initial [chart config state object](../state#state-config-object).  
``newRange`` will position the chart display range on the newly imported data.  
``calc`` will automatically calculate any (missing) indicator data. If you are supply indicator data in the ``merge`` this is not necessary.  

```javascript
chart.mergeData(merge, newRange=false, calc=false)
```

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

