---
title: Default Indicators
---

# Currently Implemented Indicators

More indicators will be implemented. The plan is that the chart will ship with a select few or none, and the bundle of indicators published as an extension to the chart, allowing you to selectively import the indicators that you require, rather than all at once.

Read the [indicators](../indicators/) to learn how to use them on your chart.

* ADX - Average Directional Movement Index
* AROON
* ATR - Average True Range
* ATR - Average True Range
* BB - Bollinger Bands
* CCI - Community Channel Index
* CMO - Change Momentum Oscillator
* DMI - Directional Movement Indicator
* DX - Directional Index
* EMA - Exponential Moving Average
* MA - Moving Average
* MACD - Moving Average Convergence Divergence
* MFI - Money Flow Index
* OBV - On Balance Volume
* PPO - Percentage Price Oscillator
* PSAR - Parabolic Stop and Reverse
* ROC - Rate of Change
* RSI - Relative Strength Index
* SMA -  Simple Moving Average
* STOCHRSI - Stochastic RSI
* Volume

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
