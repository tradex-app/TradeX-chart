---
title: State
---

The chart data state defines what information the chart displays. 

* price history
* indicators
* trades
* drawings
* annotations

Data states can be provided to the chart either via the config object at ``chart.start(config)``, or by creating a state separately and telling the chart to use it.

If no state is provided through the config at ``chart.start(config)`` then the chart will automatically use a default empty state.

Data can be then later added via a price stream (typically provided by an exchange websocket) or by merging a block of back history.

## Config

The chart config object has a state property ``config.state``. It requires a valid [data state object](#state-object). 

## Create and Use a State

A [data state (object)](#state-object) must be first validated by the chart. If valid, will register it for later use and return the id key assigned to it. This means the chart can hold multiple states in memory to be used as desired allowing for easy swapping.

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
The data must be formatted as a valid chart state.

A data merge into the state does the following:

* checking that time frames match between current (if any) chart data and the incoming, otherwise will fail the merge returning false
* merging the data when there is an overlap, incoming will overwrite current
* filling (null) any potential gap between between current (if any) chart data and the incoming
* calculate indicator data for incoming data if missing

## Delete

Depending upon the size of the datasets the state contains, it may be beneficial to conserve memory and delete those that are no longer needed, as the chart by default retains a library of states in memory.

```javascript
chart.deleteState(key)
```

## Export

The chart can export any data state contained in memory to a JSoN object.

```javascript
const xport = chart.exportState(key)
```

## List

Return a ``Map()`` of all chart states currently in memory. This includes states in use by other charts.

```javascript
const list = chart.state.list()
```

## Has

Return ``true`` or ``false`` if the specified state exists.

```javascript
const exists = chart.state.has(key)
```

## Get

Return the specified state object.

```javascript
const theState = chart.state.get(key)
```

## State Object

The following data state object example demonstrates all possible options.

```javascript
{​​
chart: Object { type: "candles", candleType: "CANDLE_SOLID", indexed: false, … }
​​​
candleType: "CANDLE_SOLID"

type: "candles"
​​​
data: Array(10002) [ (6) […], (6) […], (6) […], … ]
​​​
indexed: false
​​​​
settings: Object {  }
​​​​​​​
datasets: Array []
​​
secondary: Array []
​​
primary: Array []
}
```