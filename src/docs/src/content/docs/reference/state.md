---
title: State
description: The chart data state defines what information the chart displays.
---
The chart data state defines what information the chart displays.

* price history
* indicators
* trades
* drawings
* events
* annotations

Data states can be provided to the chart either via the config object at ``chart.start(config)``, or by creating a state separately and telling the chart to use it.

If no state is provided through the config at ``chart.start(config)`` then the chart will automatically use a default empty state.

Data can be then later added via a price stream (typically provided by an exchange websocket) or by merging a block of back history.

## Config

The chart config object has a state property ``config.state``. It requires a valid [state config object](#state-config-object).

## Create and Use a State

A [data state (object)](#state-config-object) must be first validated by the chart. If valid, will register it for later use and return the id key assigned to it. This means the chart can hold multiple states in memory to be used as desired allowing for easy swapping.

```javascript
const key = chart.state.create(state)
```

For more information parameters see: TODO: State API documentation

To have the chart use a state:

```javascript
chart.useState(key)
```

* will remove any indicators the chart was previously using
* stop listening for and displaying the price stream, if any
* point the chart to the new data state
* add any indicators specified in the new state
* redraw the chart

:::info
Unless a new chart title is provided in the selected state, the chart title has to be changed manually.

chart.setTitle("New Title")
:::

## Merging Data Into the State

Blocks of back history can be merged into the chart via the following method.

```javascript
chart.mergeData(data)
```

The data must be formatted as a valid [state config object](#state-config-object).

Any of the following data can be merged into the chart data:

* Price history (candles)
* Indicator data

A price history data merge into the state does the following:

* checking that time frames match between current (if any) chart data and the incoming, otherwise will fail the merge returning false
* merging the data when there is an overlap, incoming will overwrite current
* filling (null) any potential gap between between current (if any) chart data and the incoming
* **optionally** calculate indicator data for incoming data if missing

``mergeData(merge, newRange, calc)`` takes the following parameters:


| Parameter | Type    | Required | Default | Description                                                                                                     |
| ----------- | --------- | ---------- | --------- | ----------------------------------------------------------------------------------------------------------------- |
| merge     | object  | yes      | none    | An object same format as the initial[chart config state object](../state#state-config-object).                  |
| newRange  | boolean | no       | false   | Position the chart display range on the newly imported data.                                                    |
| calc      | boolean | no       | false   | Calculate any (missing) indicator data. If you are supply indicator data in the``merge`` this is not necessary. |

## Delete

Depending upon the size of the datasets the state contains, it may be beneficial to conserve memory and delete those that are no longer needed, as the chart by default retains a library of states in memory.

```javascript
chart.deleteState(key)
```

## Export

The chart can export any data state contained in memory to a JSoN object. The export will be formatted as a [state config object](#state-config-object).

```javascript
const xport = chart.exportState(key)
```

## List

Return a ``Map()`` of all [chart data states](#internal-chart-data-state) currently in memory. This includes states in use by other charts.

```javascript
const list = chart.state.list()
```

## Has

Return ``true`` or ``false`` if the specified state exists.

```javascript
const exists = chart.state.has(key)
```

## Get

Return the specified [internal data state object](#internal-chart-data-state).

```javascript
const theState = chart.state.get(key)
```

## State Config Object

The following data state config object example demonstrates the possible options that can be submitted to the chart on initial ``chart.start(config)`` as the ``config.state`` property, or at a later time as a [merge of data](#merging-data-into-the-state) into the existing chart state. Usually such a merge is done when the chart scrolls to the left / past boundary, and more back history needs to be loaded into the chart. ``chart.mergeData(data)``

```javascript
{

  // [timestamp, open, hight, low, close, volume]
  ohlcv: [],

  // list of indicators and overlays for the primary chart pane (price history)
  primary: [
    // indicator
    {
      name: "EMA 25",
      type: "EMA",
      settings: {},
      data: {}
    },
    // list of trades
    {
      name: "Trades",
      type: "trades",
      settings: {},
      data: {}
    },
    // list of news / events
    {
      name: "Events",
      type: "events",
      settings: {},
      data: {}
    },
    // list of drawing tools used
    {
      name: "Drawings",
      type: "drawings",
      settings: {},
      data: {}
    },
    // list of user defined annotations
    {
      name: "Annotations",
      type: "annotations",
      settings: {},
      data: {}
    }
  ],

  // list of indicators and overlays not displayed on the primary chart pane
  secondary: [
    // indicator
    {
      name: "RSI 20",
      type: "RSI",
      settings: {},
      data: {},
      drawings: {}
    },
  ],

  // user defined data
  datasets: [],


}
```

:::note
State Config properties are optional, you do not have to include all of them for the state to be valid.
:::

### Time Series Datasets - Candles and Indicators

:::note
The chart expects all time series datasets to be contiguous, having no gaps in the data.
:::

Any gaps in time series data should be filled with a "null" entry such as the following:

```javascript
// [number, number, number, number, number, number]
[timestamp, null, null, null, null, null]
```

For candle and standard indicator data, the chart expects the values of each entry array to be **numbers**. Some exchanges return their data as strings and thus must be converted to numbers.

All timestamps must be **milliseconds**!

So check your exchange data carefully and feed the chart a diet of good data.

## Internal Chart Data State
