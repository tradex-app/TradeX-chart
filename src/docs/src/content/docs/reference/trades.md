---
title: Trades
description: Trade data and markers
---

Currently trade data can only be added to the chart via the [initial data state provide via the config](../state). It will be in the near future be possible to add trades via the API.

## Trade Markers

Trade makers representing buy or sell, are placed on the primary chart pane, above the individual price history intervals (candles) they are associated with via their timestamp.

TradeX Chart provides a number of marker icon options. Their size and colour is also configurable. The [theming configuration](../themes#trades) has more details.

## Trade Entry

An individual trade entry has the following format:

```javascript
const trade = {
  timestamp: 1558605600000, // number - time stamp
  id: "012336352",          // string - trade id
  side: "buy",              // string - buy or sell
  price: 7590,              // number
  amount: 0.25,             // number
  filled: 0.25,             // number
  average: 7845,            // number
  total: 1961,              // number
  tag: "Bot ABC - BTC/USDT" // string - user defined identifier
}
```

## Add Trade

A single trade can be added to the chart data state via the following:

```javascript
chart.addTrade(trade)
```
Where the [trade entry object format](#trade-entry) is defined in the previous section. ``addTrade()`` will validate the trade entry and return a boolean as the result.

## Remove Trade

Not implemented yet.

## Trade State Data

The [chart State Data](../state) provides a collection of all of the trades that can be displayed on the chart. [Trade entries (objects)](#trade-entry) are grouped by timestamp in an array as it may be possible that multiple trades may be executed on the same time interval (candle).

```javascript
const config = {
ohlcv: [],
primary: [],
secondary: [],
trades: {
  1558605600000: [
    {
      timestamp: 1558605600000,
      id: "012336352",
      side: "buy",
      price: 7590,
      amount: 0.25,
      filled: 0.25,
      average: 7845,
      total: 1961,
      tag: "Bot ABC - BTC/USDT"
    }
  ],
  1558670400000: [
    {
      timestamp: 1558670400000,
      id: "012335353",
      side: "sell",
      price: 7844,
      amount: 0.25,
      filled: 0.25,
      average: 7845,
      total: 1961,
      tag: "Bot ABC - BTC/USDT"
    }
  ]
}
}
```

