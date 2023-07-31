---
title: API Examples
---

This documentation gives example API work flows. TradeX-chart is organized in a hierarchical structure, which is reflected in the API, allowing you to reach down into the depths of the chart, giving you granular control of it's behavior and appearance.

## Chart Root

### Chart ID

if no ID is provided in the chart config, a unique one will be auto-generated.

```javascript
chart0.id

// "TX_lixo8d6m_cy8_0" 
```

### Chart State

chart0.state

chart0.reset()  
chart0.expunge()  
chart0.state.create()  
chart0.state.export()  
chart0.use()  
chart0.has()  
data  
delete  
get  
id  
isEmpty  
status  

List all states available

```javascript
chart0.list()
```

export (save) chart.state.exportState() the current chart state
create a new state const NewState = chart.state.createState() , this adds to the in memory list of states
select the new state chart.state = NewState

## Main Pane

``MainPane.chartPanes`` returns a ``Map()`` of all existing chart panes.

```javascript
chart1.MainPane.chartPanes
```

```javascript
Map { "TradeX_test-Chart_2" → {…}, "TradeX_test-RSI__20_3" → {} }
```

The chart pane IDs are used as the ``Map()`` keys.

## Chart Panes

### Remove

```javascript
chart0.ChartPanes.removeChartPane("TX_lixi72el_tc8_0-RSI__20_1")

chart0.ChartPanes.get("TX_lixi72el_tc8_0-RSI__20_1").remove() 
```
The primary chart pane (price history) cannot be deleted as it provides the main data state for the chart.

However, loading a new data state will of course remove and replace it.

### Re-order

The visual stacking of chart panes can be changed by raising or lowering them above their neighbours.

```javascript
chart0.ChartPanes.get("TX_lj4rpog3_ujm_0-RSI__20_1").reorderUp()
chart0.ChartPanes.get("TX_lj4rpog3_ujm_0-RSI__20_1").reorderDown()
```
## Primary Chart Pane

The primary chart pane that displays the price history (candles) can be accessed like so:

```javascript
chart0.Chart
```
This exposes the following methods.

### Set Visibility for Legends on Primary

´´´javascript
chart0.Chart.legendsVisibility("hide") 
```
Accepts either ``show`` or ``hide`` to toggle the visibility of all indicator legends on the Primary pane.

## Indicators

### Add

To add an "empty" indicator is as simple as:

```javascript
chart0.addIndicator("RSI", "RSI")
```

If the chart has price history data, the indicator will automatically calculate it's values with it's defaults.

However, indicators can also be added with data and or with custom settings.

```javascript
chart0.addIndicator("EMA", "EMA", {data, settings})
```
``addIndicator()`` returns the indicator instance for your own storage or manipulation.

```javascript
const myIndicator = chart0.addIndicator("RSI", "RSI")
```

### Remove

The indicator can be removed in a number of ways.

1. Directly via the instance
```javascript
const myIndicator = chart0.addIndicator("RSI", "RSI")
      myIndicator.remove()
```
2. From the root API
```javascript
chart1.removeIndicator("TradeX_test-Chart_2-BB_4")
```
3. Via the chart pane that hosts the indicator
```javascript
chart1.ChartPanes.get("TradeX_test-Chart_2").removeIndicator("TradeX_test-Chart_2-BB_4")

chart1.ChartPanes.get("TradeX_test-RSI__20_3").indicators["TradeX_test-RSI__20_3-RSI_5"].instance.remove()
```

