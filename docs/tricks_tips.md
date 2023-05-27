# Tricks and Tips

The following are currently miscellaneous tricks and tips that have not been organized under other documentation entries.

## Manipulating Price Charts and Indicators

Set **price chart** to manual scaling and positioning

```javascript
chart0.MainPane.chart.scale.setScaleRange()
```

Set **price chart** to automatic scaling and positioning

```javascript
chart0.MainPane.chart.scale.resetScaleRange()
```

There are similar method call for the off chart indicators. To access these is a little more complicated because the off chart indicators are stored in a ``Map()``, so you need the specific ID to access it.

Set price chart to manual scaling and positioning

```javascript
chart0.MainPane.offCharts.get("ID_li4jyoel_tc6.OffChart").scale.setScaleRange(0)
```

Set price chart to automatic scaling and positioning

```javascript
chart0.MainPane.offCharts.get("ID_li4jyoel_tc6.OffChart").scale.resetScaleRange(0)
```
