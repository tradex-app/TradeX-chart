# Example Setup

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

Returns a ``Map()`` of all existing chart panes.
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
chart0.MainPane.chartPanes.removeChartPane("TX_lixi72el_tc8_0-RSI__20_1")

chart0.MainPane.chartPanes.get("TX_lixi72el_tc8_0-RSI__20_1").remove() 
```


## Indicators

### Add



### Remove
```javascript
chart1.MainPane.chartPanes.get("TradeX_test-Chart_2").removeIndicator("TradeX_test-Chart_2-BB_4")

chart1.MainPane.chartPanes.get("TradeX_test-RSI__20_3").indicators["TradeX_test-RSI__20_3-RSI_5"].instance.remove()
```