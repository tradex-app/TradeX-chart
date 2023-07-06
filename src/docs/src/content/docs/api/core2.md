---
title: core
---

* * *

## Class: exports



## Class: TradeXchart
The root class for the entire chart


## Class: exports


**version**:  
**name**:  
**shortName**:  
**config**:  
**Chart**:  
**ChartPanes**:  
**Indicators**:  
**state**:  
**allData**:  
### exports.create(container, txCfg, state) 

Create a new TradeXchart instance

**Parameters**

**container**: `DOM_element`, HTML element to mount the chart on

**txCfg**: `Object`, chart config

**state**: `Object`, chart state

**Returns**: `instance`, TradeXchart

### exports.destroy(chart) 

Destroy a chart instance, clean up and remove data

**Parameters**

**chart**: `instance`, Destroy a chart instance, clean up and remove data


### exports.start(cfg) 

Target element has been validated as a mount point, 
let's start building

**Parameters**

**cfg**: `Object`, chart configuration


### exports.destroy() 

Stop all chart event processing and remove the chart from DOM.
In other words, destroy the chart.


### exports.on(topic, handler, context) 

Subscribe to a topic

**Parameters**

**topic**: `string`, The topic name

**handler**: `function`, The function or method that is called

**context**: `Object`, The context the function(s) belongs to

**Returns**: `boolean`

### exports.off(topic, handler) 

Unsubscribe from a topic

**Parameters**

**topic**: `string`, The topic name

**handler**: `function`, function to remove

**Returns**: `boolean`

### exports.emit(topic, data) 

Publish a topic

**Parameters**

**topic**: `string`, The topic name

**data**: `Object`, The data to publish

**Returns**: `boolean`

### exports.execute(topic, data, cb) 

Execute a task

**Parameters**

**topic**: `string`, The topic name

**data**: `Object`, The data that gets published

**cb**: `function`, callback method


### exports.setDimensions(w, h) 

Set chart width and height

**Parameters**

**w**: `number`, width in pixels

**h**: `number`, height in pixels


### exports.setPricePrecision(pricePrecision) 

Set the price accuracy

**Parameters**

**pricePrecision**: `number`, Price accuracy


### exports.setVolumePrecision(volumePrecision) 

Set the volume accuracy

**Parameters**

**volumePrecision**: `number`, Volume accuracy


### exports.addTheme(theme) 

Add a theme to the chart,
if no current theme is set, make this the current one.

**Parameters**

**theme**: `Object`, Volume accuracy

**Returns**: `instance`, - theme instance

### exports.setTheme(theme) 

Set the chart theme

**Parameters**

**theme**: `string`, theme identifier

**Returns**: `boolean`

### exports.setStream(stream) 

specify a chart stream

**Parameters**

**stream**: `Object`, specify a chart stream

**Returns**: `instance`

### exports.stopStream() 

stop a chart stream
will halt any updates to price or indicators


### exports.getRange(start, end) 

initialize range

**Parameters**

**start**: `number`, index

**end**: `number`, index


### exports.setRange(start, end) 

set start and end of range

**Parameters**

**start**: `number`, index

**end**: `number`, index


### exports.jumpToIndex(start, nearest, centre) 

set Range start index

**Parameters**

**start**: `number`, starting index of state data

**nearest**: `boolean`, limit range start - no out of range values

**centre**: `boolean`, center the range on the start value


### exports.jumpToTS(ts, nearest, centre) 

set Range start to time stamp

**Parameters**

**ts**: `number`, timestamp

**nearest**: `boolean`, limit range start - no out of range values

**centre**: `boolean`, center the range on the start value


### exports.jumpToStart(centre) 

set Range start to state data start

**Parameters**

**centre**: `boolean`, center the range on the start value


### exports.jumpToEnd(centre) 

set Range start to state data ende

**Parameters**

**centre**: `boolean`, center the range on the end value


### exports.mergeData(merge, newRange) 

Merge a block of data into the chart state.
Used for populating a chart with back history.
Merge data must be formatted to a Chart State.
Optionally set a new range upon merge.

**Parameters**

**merge**: `Object`, merge data must be formatted to a Chart State

**newRange**: `boolean | object`, false | {start: number, end: number}


### exports.isIndicator(i) 

validate indicator

**Parameters**

**i**: `class`, indicator class


### exports.setIndicators(i, flush) 

import Indicators

**Parameters**

**i**: `Object`, indicators {id, name, event, ind}

**flush**: `boolean`, expunge default indicators

**Returns**: , boolean

### exports.addIndicator(i, name, params) 

add an indicator - default or registered user defined

**Parameters**

**i**: `string`, indicator

**name**: `string`, identifier

**params**: `Object`, {settings, data}

**Returns**: `Indicator | false`, - indicator instance or false

### exports.getIndicator(i) 

retrieve indicator by ID

**Parameters**

**i**: `string`, indicator ID


### exports.removeIndicator(i) 

remove an indicator - default or registered user defined

**Parameters**

**i**: `string | Indicator`, indicator id or Indicator instance

**Returns**: `boolean`, - success / failure

### exports.indicatorSettings(i, s) 

set or get indicator settings

**Parameters**

**i**: `string | Indicator`, indicator id or Indicator instance

**s**: `Object`, settings

**Returns**: `boolean`, - success / failure

### exports.hasStateIndicator(i, dataset) 

Does current chart state have indicator

**Parameters**

**i**: `string`, indicator id or name

**dataset**: `string`, Does current chart state have indicator

**Returns**: , indicator or false

### exports.resize(width, height) 

Resize the chart

**Parameters**

**width**: `number`, pixels

**height**: `number`, pixels

**Returns**: `boolean`, - success or failure

### exports.refresh() 

refresh / redraw the chart




* * *










