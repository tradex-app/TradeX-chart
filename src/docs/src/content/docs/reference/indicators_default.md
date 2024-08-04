---
title: Default Indicators
---

# Currently Implemented Indicators

More indicators will be implemented. The plan is that the chart will ship with a select few or none, and the bundle of indicators published as an extension to the chart, allowing you to selectively import the indicators that you require, rather than all at once.

Read the [indicators](../indicators/) to learn how to use them on your chart.

```
 
    Momentum Indicators
    -----------------------------------------
    AROON - Aroon
    RSI - Relative Strength Index
    
    Overlap Studies
    -----------------------------------------
    BBANDS - Bollinger Bands
    EMA - Exponential Moving Average
    MA - Moving Average
    SMA - Simple Moving Average

    
```

## Indicator List API

The chart API provides you with two properties that will return what indicators are available to use.

```javascript
const availableIndicators = myChart.indicatorClasses
```
``indicatorClasses`` returns an object of all available indicators. The object keys can be used to [add an indicator to the chart](../indicators/#adding-indicators-to-the-chart).

```javascript
const publicIndicators = myChart.indicatorsPublic
```
``indicatorsPublic`` returns an object of all indicators available to the end user via the [Utils bar / indicator]() menu option. Each entry is an object with the following format:
```javascript
{
    id: "EMA", 
    name: "Exponential Moving Average",
    event: "addIndicator", // event to invoke when menu option is selected
    ind: EMA, // indicator class
    public: true // whether the indicator is available to the end user via Utils / Indicators menu
}
```
