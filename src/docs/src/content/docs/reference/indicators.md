---
title: Indicators
---
TradeX-chart provides a set of [default indicators](../indicators_default) based upon TA-Lib. The chart uses a Web Assembly version of the library, [talib-web](https://github.com/newproplus/talib-web).

It is also possible to build and add your own [custom indicators](../indicators_custom) to the chart also.

Indicators are grouped as:

* **Primary Chart Pane** - those displayed atop the price history (candles)
* **Secondary Chart Panes** - those displayed in their own pane.

## Adding Indicators to the Chart

Indicators can be added via the following methods:

* [API](#adding-indicators-via-api)
* [State](#adding-indicators-via-the-data-state)
* [Utils Bar](#adding-indicators-via-the-utils-bar)

### Adding Indicators Via API

To add an "empty" indicator is as simple as:

```javascript
const i = "RSI"
const name = "RSI_1"
myInd = chart0.addIndicator(i, name)
```

If the chart has price history data, the indicator will automatically calculate it's values with it's defaults.

However, indicators can also be added with data and or with custom settings.

```javascript
const data = [ [1543572000000, 4079.63478779] ]
const settings = {style:{}}
const params = {data, settings}
const myInd = chart0.addIndicator("EMA", "EMA_1", params)
```


| Parameters | Type   | Required | Description                             |
| ------------ | -------- | ---------- | ----------------------------------------- |
| indicator  | string | yes      | identifier the chart is registered with |
| name       | string | yes      | text label used in legends              |
| params     | object | no       | optional indicator configuration        |

The third argument **params** is an object that can optionally contain array ``data`` and or an object ``settings``.

Each entry in the ``data`` array requires an array with minimum of [timestamp, value] depending upon the indicator.

The ``settings`` object can contain an object ``style`` and or individual input settings specific to the indicator.

The ``params.settings.style`` object is how indicator an indicator can have it's default style (theme) modified. 

### Adding Indicators Via the Data State

Indicators can be added via [a valid chart state](state).

### Adding Indicators Via the Utils Bar

The chart GUI can add indicators via the Utils Bar with Indicators icon. Firstly the Utils bar needs to be enabled in the chart config.

Clicking on the Indicators icon will open a menu listing all of the indicators currently registered with the chart, including any custom indicators. Simply selecting the indicator from the list with the pointer will add it to the chart.

TODO: add screenshot

## Indicator Removal

Removal of Indicators can be done via:

* API - programmatically ``chart.removeIndicator("TradeX_test-Chart_2-BB_4")``
* GUI - indicator legend bar controls

## Default Indicators

The [Default Indicators documentation](../indicators_default) lists all of the currently available indicators.

TradeX-chart may or may not implement all of the indicators provided by TA-Lib.

More will be implemented soon.

## Custom Indicators

[Custom Idicators](../indicators_custom) are in important feature of TradeX-chart. They are an extension of the default indicator class and thus inherit all of their methods and properties. The documentation will show you how to [define](../indicators_custom#minimal-custom-indicator-definition), [register](../indicators_custom#registering-custom-indicators) and [how data is passed to them](../indicators_custom#how-the-indicator-updates).
