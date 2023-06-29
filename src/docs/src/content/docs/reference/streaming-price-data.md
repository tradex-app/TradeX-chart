---
title: Streaming Price Data to the Chart
---

Looking at the back history is useful, but working with live prices is where things turn interesting.

## Requirements

Four things are required to stream live price data to the chart

1. Data source, typically a WebSocket connection
2. Chart config file must have a ``stream: {}`` definition
3. Function to call the ``chart.stream.onTick(data)`` method
4. Data passed to ``onTick()`` formatted correctly

## Data Source

Your own code is responsible for opening and maintaining the connection, along with dealing with any errors the source returns.

The chart has been tested to high data rates and performs well. The chart redraw / refresh rate when displaying a stream can be throttled through config option:

``maxCandleUpdate: 250``

The option is specified in milliseconds. Of note is that the render engine will also simply ignore too many frame render requests if it cannot keep up with the browser screen refresh.

## Chart Config Stream Definition

The chart config must include at least the following to initialize the chart stream API.

``stream: {}``

The stream will then be displayed with all of the defaults. The chart stream stream features can be modified with the following options:


| Options     | Values  | Description                                                          |
| :------------ | --------- | ---------------------------------------------------------------------- |
| priceLine   | boolean | display a horizonal priceline accross the chart<br />defaul:``true`` |
| tfCountDown | boolean | display the time remaining for the current candle timeframe          |
| alerts      | array   | list of price alert objects                                          |

## Invoking onTick() Method

The chart element must first be created and appended to an element in the DOM. The config, which includes the stream definition, is passed to the chart via the following API call:

``chart.start(config)``

If the config and the stream definition are valid, the chart stream must be initilized.

``chart.stream.start()``

Your WebSocket callback can then pass data to the chart with:

``chart.stream.onTick(data)``

## Stream Data Format

TradeX-chart expects the data stream to be KLine data, a rolling update of the current candle (timeframe period).

```javascript
{
  t: timeStamp // timestamp of current candle in milliseconds
  o: open  // open price
  h: high  // high price
  c: close  // close price
  v: volume // volume
}
```

## Price Alerts

Price Alerts can be invoked via the stream config or programmatically via the API.

Each price alert requires there things:

1. Trigger price - number
2. Condition - function
3. Handler - function

### Programatic Alerts

```javascript
function handler($,p,c) {console.log(`alert`,$,p[4],c[4])} 

function alertTest ($, p, c) {
  if ($ > p[4] && $ < c[4]) return true
  else return false
}

myChart.stream.alerts.add(13010, alertTest, handler)
```

### Stream Config Defined Alerts

```javascript

const chartConfig = {
  stream: {
    alerts: [
      {price: 30000, alertTest, handler},
    ]
  }
}

```
