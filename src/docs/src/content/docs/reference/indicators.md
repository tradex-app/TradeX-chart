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

The ``params`` object permits modification of many of the [indicator's default configuration](#indicator-parameters).

#### Indicator Parameters

All indicator parameters are optional. if no

| Property | Type | Descripttion |
|----------|------|--------------|
| id | String | indicator id - if undefined, one will be automatically generated and assigned. id can be used for restoring a chart State. |
| legendName | String | name or title prefixed to indicator data (if any) displayed on the chart |
| data | Array | any initial indicator data - if provided ``calcIndicator()`` will **not** be triggered. See [Indicator Data Format](#indicator-data-format) |
| settings | will modify the default indicator [definition](#indicator-settings) |

#### Indicator Settings

The settings object modifies the indicator's default definition object.

```javascript
myChart.addIndicator(
  "EMA", 
  "EMA_30", 
  { legendName: "Foo Baz", 
    data: [], 
    settings: { 
      style: {output: {colour: {value: "#00f"}, width: {value: 3}, dash: {value: "4,4"}}}, 
      input: {timePeriod: {value: 20}} 
    } 
  });
````

The the above example adds an EMA indicator to the chart, with a blue line, three pixels wide, [dashed styling](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash) and an input time period calculation of 20 candles.

Refer to the documentation for the settings of each individual [indicator](../indicators_default).

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

## Accessing Chart Methods, Data and Information 

The base `Indicator` class extends the `Overlay` class. See [Overlay Data and Properties](../overlays#overlaydataandproperties)

First of all, you need the indicator instance of the indicator active on the chart.

If you've added the chart programmatically the instance will be returned.

```javascript
const newRSI = myChart.addIndicator("RSI")
```

Otherwise, if the indicator has been added with the initial chart config / state, you will have to look up the instance.
myChart.Indicators - provides a list of all chart panes and their hosted indicators. eg.

```javascript
myChart.Indicators["TradesTest-Chart_1"]["ID_m02xm36u_bwl"].instance
```

where:

```javascript
myChart.Indicators[chart pane ID][indicator ID].instance
```

Primary chart indicators (EMA, BB, ect.) can also be accessed like this:

```javascript
chart0.Chart.indicators["ID_m02zn8js_lhw"].instance
```

The intance will report it's name.

```javascript
chart0.Chart.indicators["ID_m02zn8js_lhw"].instance.name
chart0.Chart.indicators["ID_m02zn8js_lhw"].instance.shortName
```
### Indicator Data and Settings

Indicator data and settings are also found grouped together under Primary Pane or Secondary Panes.

```javascript
chart0.allData.primaryPane
chart0.allData.secondaryPane
```
or similarly via the chart state

```javascript
chart0.state.allData.primaryPane
chart0.state.allData.secondaryPane
```
### Indicator Data Format

Indicator data is stored as an Array of arrays. If the indicator data array is empty, the first event that triggers the ``calcIndicator()`` method, will fill the array.

An Indicator Data array entry must contain a minimum of ``[ timestamp : integer, value : number ]``. Some indicators of course have more than one value, and are simply stored sequentially in the array. Theoretically, a custom indicator could store values of other data types.

## Modifying the Indicator Definition

Indicator input values (used in calculation) and output values (display: colour, line style) can be changed, whenever you want programmatically. 

The Indicator definition object is where the configurable values of the indicator are.

```javascript
chart0.Chart.indicators["ID_m02zn8js_lhw"].instance.definition.meta.output[0].style.colour.value = "#F00"
chart0.Chart.indicators["ID_m02zn8js_lhw"].instance.definition.meta.output[0].style.width.value = 2
```

You then need to either scroll the chart or invoke `refresh()` to update the chart with the new changes.

```javascript
chart0.refresh()
```

The majority of indicators are drawn with lines and support the following configurable outputs:

* colour - a string representing a valid CSS #RGB or #RGBA value
* line width - number of pixels
* line dash - a string of comma seperated number values. See: [MDM Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash)
