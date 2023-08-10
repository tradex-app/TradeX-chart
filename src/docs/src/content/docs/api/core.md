---
title: core
---

## Classes

<dl>
<dt><a href="#TradeXchart">TradeXchart</a> ⇐ <code>Tradex_chart</code></dt>
<dd></dd>
</dl>

## Members

<dl>
<dt><a href="#version">version</a> ⇒ <code>string</code></dt>
<dd></dd>
<dt><a href="#name">name</a> ⇒ <code>string</code></dt>
<dd></dd>
<dt><a href="#shortName">shortName</a> ⇒ <code>string</code></dt>
<dd></dd>
<dt><a href="#config">config</a> ⇒ <code>object</code></dt>
<dd></dd>
<dt><a href="#Chart">Chart</a> ⇒ <code>object</code></dt>
<dd></dd>
<dt><a href="#ChartPanes">ChartPanes</a> ⇒ <code>Map</code></dt>
<dd></dd>
<dt><a href="#Indicators">Indicators</a> ⇒ <code>object</code></dt>
<dd></dd>
<dt><a href="#state">state</a> ⇒ <code>State</code></dt>
<dd></dd>
<dt><a href="#allData">allData</a> ⇒ <code>object</code></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#start">start(cfg)</a></dt>
<dd><p>Target element has been validated as a mount point, 
let&#39;s start building</p>
</dd>
<dt><a href="#on">on(topic, handler, context)</a> ⇒ <code>boolean</code></dt>
<dd><p>Subscribe to a topic</p>
</dd>
<dt><a href="#off">off(topic, handler)</a> ⇒ <code>boolean</code></dt>
<dd><p>Unsubscribe from a topic</p>
</dd>
<dt><a href="#emit">emit(topic, data)</a> ⇒ <code>boolean</code></dt>
<dd><p>Publish a topic</p>
</dd>
<dt><a href="#execute">execute(topic, data, cb)</a></dt>
<dd><p>Execute a task</p>
</dd>
<dt><a href="#stopStream">stopStream()</a></dt>
<dd><p>stop a chart stream
will halt any updates to price or indicators</p>
</dd>
<dt><a href="#jumpToIndex">jumpToIndex(start, nearest, centre)</a></dt>
<dd><p>set Range start index</p>
</dd>
<dt><a href="#jumpToTS">jumpToTS(ts, nearest, centre)</a></dt>
<dd><p>set Range start to time stamp</p>
</dd>
<dt><a href="#jumpToStart">jumpToStart(centre)</a></dt>
<dd><p>set Range start to state data start</p>
</dd>
<dt><a href="#jumpToEnd">jumpToEnd(centre)</a></dt>
<dd><p>set Range start to state data end</p>
</dd>
<dt><a href="#mergeData">mergeData(merge, newRange)</a></dt>
<dd><p>Merge a block of data into the chart state.
Used for populating a chart with back history.
Merge data must be formatted to a Chart State.
Optionally set a new range upon merge.</p>
</dd>
<dt><a href="#isIndicator">isIndicator(i)</a> ⇒ <code>boolean</code></dt>
<dd><p>validate indicator</p>
</dd>
<dt><a href="#setIndicators">setIndicators(i, flush)</a> ⇒ <code>boolean</code></dt>
<dd><p>import Indicators</p>
</dd>
<dt><a href="#addIndicator">addIndicator(i, name, params)</a> ⇒ <code>Indicator</code> | <code>false</code></dt>
<dd><p>add an indicator - default or registered user defined</p>
</dd>
<dt><a href="#getIndicator">getIndicator(i)</a> ⇒ <code>Indicator</code> | <code>false</code></dt>
<dd><p>retrieve indicator by ID</p>
</dd>
<dt><a href="#removeIndicator">removeIndicator(i)</a> ⇒ <code>boolean</code></dt>
<dd><p>remove an indicator - default or registered user defined</p>
</dd>
<dt><a href="#indicatorSettings">indicatorSettings(i, s)</a> ⇒ <code>Object</code></dt>
<dd><p>set or get indicator settings</p>
</dd>
<dt><a href="#hasStateIndicator">hasStateIndicator(i, dataset)</a> ⇒ <code>Indicator</code> | <code>false</code></dt>
<dd><p>Does current chart state have indicator</p>
</dd>
<dt><a href="#calcAllIndicators">calcAllIndicators()</a></dt>
<dd><p>calculate all indicators currently in use</p>
</dd>
</dl>

<a name="TradeXchart"></a>

## TradeXchart ⇐ <code>Tradex\_chart</code>
**Kind**: global class  
**Extends**: <code>Tradex\_chart</code>  

* [TradeXchart](#TradeXchart) ⇐ <code>Tradex\_chart</code>
    * [new TradeXchart()](#new_TradeXchart_new)
    * [.create(container, [txCfg], state)](#TradeXchart.create) ⇒ <code>instance</code>
    * [.destroy(chart)](#TradeXchart.destroy)
    * [.destroy()](#TradeXchart.destroy)
    * [.setDimensions(w, h)](#TradeXchart.setDimensions)
    * [.setPricePrecision(pricePrecision)](#TradeXchart.setPricePrecision)
    * [.setVolumePrecision(volumePrecision)](#TradeXchart.setVolumePrecision)
    * [.addTheme(theme)](#TradeXchart.addTheme) ⇒ <code>instance</code>
    * [.setTheme(theme)](#TradeXchart.setTheme) ⇒ <code>boolean</code>
    * [.setStream(stream)](#TradeXchart.setStream) ⇒ <code>instance</code>
    * [.getRange(start, end)](#TradeXchart.getRange)
    * [.setRange(start, end)](#TradeXchart.setRange)
    * [.resize(width, height)](#TradeXchart.resize) ⇒ <code>boolean</code>
    * [.refresh()](#TradeXchart.refresh)

<a name="new_TradeXchart_new"></a>

### new TradeXchart()
The root class for the entire chart

<a name="TradeXchart.create"></a>

### TradeXchart.create(container, [txCfg], state) ⇒ <code>instance</code>
Create a new TradeXchart instance

**Kind**: static method of [<code>TradeXchart</code>](#TradeXchart)  
**Returns**: <code>instance</code> - TradeXchart  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| container | <code>DOM\_element</code> |  | HTML element to mount the chart on |
| [txCfg] | <code>Object</code> | <code>{}</code> | chart config |
| state | <code>Object</code> |  | chart state |

<a name="TradeXchart.destroy"></a>

### TradeXchart.destroy(chart)
Destroy a chart instance, clean up and remove data

**Kind**: static method of [<code>TradeXchart</code>](#TradeXchart)  

| Param | Type |
| --- | --- |
| chart | <code>instance</code> | 

<a name="TradeXchart.destroy"></a>

### TradeXchart.destroy()
Stop all chart event processing and remove the chart from DOM.
In other words, destroy the chart.

**Kind**: static method of [<code>TradeXchart</code>](#TradeXchart)  
<a name="TradeXchart.setDimensions"></a>

### TradeXchart.setDimensions(w, h)
Set chart width and height

**Kind**: static method of [<code>TradeXchart</code>](#TradeXchart)  

| Param | Type | Description |
| --- | --- | --- |
| w | <code>number</code> | width in pixels |
| h | <code>number</code> | height in pixels |

<a name="TradeXchart.setPricePrecision"></a>

### TradeXchart.setPricePrecision(pricePrecision)
Set the price accuracy

**Kind**: static method of [<code>TradeXchart</code>](#TradeXchart)  

| Param | Type | Description |
| --- | --- | --- |
| pricePrecision | <code>number</code> | Price accuracy |

<a name="TradeXchart.setVolumePrecision"></a>

### TradeXchart.setVolumePrecision(volumePrecision)
Set the volume accuracy

**Kind**: static method of [<code>TradeXchart</code>](#TradeXchart)  

| Param | Type | Description |
| --- | --- | --- |
| volumePrecision | <code>number</code> | Volume accuracy |

<a name="TradeXchart.addTheme"></a>

### TradeXchart.addTheme(theme) ⇒ <code>instance</code>
Add a theme to the chart,
if no current theme is set, make this the current one.

**Kind**: static method of [<code>TradeXchart</code>](#TradeXchart)  
**Returns**: <code>instance</code> - - theme instance  

| Param | Type | Description |
| --- | --- | --- |
| theme | <code>Object</code> | Volume accuracy |

<a name="TradeXchart.setTheme"></a>

### TradeXchart.setTheme(theme) ⇒ <code>boolean</code>
Set the chart theme

**Kind**: static method of [<code>TradeXchart</code>](#TradeXchart)  

| Param | Type | Description |
| --- | --- | --- |
| theme | <code>string</code> | theme identifier |

<a name="TradeXchart.setStream"></a>

### TradeXchart.setStream(stream) ⇒ <code>instance</code>
specify a chart stream

**Kind**: static method of [<code>TradeXchart</code>](#TradeXchart)  

| Param | Type |
| --- | --- |
| stream | <code>Object</code> | 

<a name="TradeXchart.getRange"></a>

### TradeXchart.getRange(start, end)
initialize range

**Kind**: static method of [<code>TradeXchart</code>](#TradeXchart)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| start | <code>number</code> | <code>0</code> | index |
| end | <code>number</code> | <code>0</code> | index |

<a name="TradeXchart.setRange"></a>

### TradeXchart.setRange(start, end)
set start and end of range

**Kind**: static method of [<code>TradeXchart</code>](#TradeXchart)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| start | <code>number</code> | <code>0</code> | index |
| end | <code>number</code> |  | index |

<a name="TradeXchart.resize"></a>

### TradeXchart.resize(width, height) ⇒ <code>boolean</code>
Resize the chart

**Kind**: static method of [<code>TradeXchart</code>](#TradeXchart)  
**Returns**: <code>boolean</code> - - success or failure  

| Param | Type | Description |
| --- | --- | --- |
| width | <code>number</code> | pixels |
| height | <code>number</code> | pixels |

<a name="TradeXchart.refresh"></a>

### TradeXchart.refresh()
refresh / redraw the chart

**Kind**: static method of [<code>TradeXchart</code>](#TradeXchart)  
<a name="version"></a>

## version ⇒ <code>string</code>
**Kind**: global variable  
**Returns**: <code>string</code> - - return TradeX Chart version number  
<a name="name"></a>

## name ⇒ <code>string</code>
**Kind**: global variable  
**Returns**: <code>string</code> - - user defined chart name  
<a name="shortName"></a>

## shortName ⇒ <code>string</code>
**Kind**: global variable  
**Returns**: <code>string</code> - - user defined short chart name  
<a name="config"></a>

## config ⇒ <code>object</code>
**Kind**: global variable  
**Returns**: <code>object</code> - - current chart configuration including defaults  
<a name="Chart"></a>

## Chart ⇒ <code>object</code>
**Kind**: global variable  
**Returns**: <code>object</code> - - primary chart pane - displays price history (candles)  
<a name="ChartPanes"></a>

## ChartPanes ⇒ <code>Map</code>
**Kind**: global variable  
**Returns**: <code>Map</code> - - all chart panes, primary and secondary  
<a name="Indicators"></a>

## Indicators ⇒ <code>object</code>
**Kind**: global variable  
**Returns**: <code>object</code> - - all chart indicators in use, grouped by chart panes  
<a name="state"></a>

## state ⇒ <code>State</code>
**Kind**: global variable  
**Returns**: <code>State</code> - - current state instance  
<a name="allData"></a>

## allData ⇒ <code>object</code>
**Kind**: global variable  
**Returns**: <code>object</code> - - all state datasets  
<a name="start"></a>

## start(cfg)
Target element has been validated as a mount point, 
let's start building

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| cfg | <code>Object</code> | chart configuration |

<a name="on"></a>

## on(topic, handler, context) ⇒ <code>boolean</code>
Subscribe to a topic

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| topic | <code>string</code> | The topic name |
| handler | <code>function</code> | The function or method that is called |
| context | <code>Object</code> | The context the function(s) belongs to |

<a name="off"></a>

## off(topic, handler) ⇒ <code>boolean</code>
Unsubscribe from a topic

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| topic | <code>string</code> | The topic name |
| handler | <code>function</code> | function to remove |

<a name="emit"></a>

## emit(topic, data) ⇒ <code>boolean</code>
Publish a topic

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| topic | <code>string</code> | The topic name |
| data | <code>Object</code> | The data to publish |

<a name="execute"></a>

## execute(topic, data, cb)
Execute a task

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| topic | <code>string</code> | The topic name |
| data | <code>Object</code> | The data that gets published |
| cb | <code>function</code> | callback method |

<a name="stopStream"></a>

## stopStream()
stop a chart stream
will halt any updates to price or indicators

**Kind**: global function  
<a name="jumpToIndex"></a>

## jumpToIndex(start, nearest, centre)
set Range start index

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| start | <code>number</code> |  | starting index of state data |
| nearest | <code>boolean</code> | <code>true</code> | limit range start - no out of range values |
| centre | <code>boolean</code> | <code>true</code> | center the range on the start value |

<a name="jumpToTS"></a>

## jumpToTS(ts, nearest, centre)
set Range start to time stamp

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ts | <code>number</code> |  | timestamp |
| nearest | <code>boolean</code> | <code>true</code> | limit range start - no out of range values |
| centre | <code>boolean</code> | <code>true</code> | center the range on the start value |

<a name="jumpToStart"></a>

## jumpToStart(centre)
set Range start to state data start

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| centre | <code>boolean</code> | <code>true</code> | center the range on the start value |

<a name="jumpToEnd"></a>

## jumpToEnd(centre)
set Range start to state data end

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| centre | <code>boolean</code> | <code>true</code> | center the range on the end value |

<a name="mergeData"></a>

## mergeData(merge, newRange)
Merge a block of data into the chart state.
Used for populating a chart with back history.
Merge data must be formatted to a Chart State.
Optionally set a new range upon merge.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| merge | <code>Object</code> |  | merge data must be formatted to a Chart State |
| newRange | <code>boolean</code> \| <code>object</code> | <code>false</code> | false | {start: number, end: number} |

<a name="isIndicator"></a>

## isIndicator(i) ⇒ <code>boolean</code>
validate indicator

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| i | <code>class</code> | indicator class |

<a name="setIndicators"></a>

## setIndicators(i, flush) ⇒ <code>boolean</code>
import Indicators

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| i | <code>Object</code> |  | indicators {id, name, event, ind} |
| flush | <code>boolean</code> | <code>false</code> | expunge default indicators |

<a name="addIndicator"></a>

## addIndicator(i, name, params) ⇒ <code>Indicator</code> \| <code>false</code>
add an indicator - default or registered user defined

**Kind**: global function  
**Returns**: <code>Indicator</code> \| <code>false</code> - - indicator instance or false  

| Param | Type | Description |
| --- | --- | --- |
| i | <code>string</code> | indicator |
| name | <code>string</code> | identifier |
| params | <code>Object</code> | {settings, data} |

<a name="getIndicator"></a>

## getIndicator(i) ⇒ <code>Indicator</code> \| <code>false</code>
retrieve indicator by ID

**Kind**: global function  
**Returns**: <code>Indicator</code> \| <code>false</code> - - indicator instance or false  

| Param | Type | Description |
| --- | --- | --- |
| i | <code>string</code> | indicator ID |

<a name="removeIndicator"></a>

## removeIndicator(i) ⇒ <code>boolean</code>
remove an indicator - default or registered user defined

**Kind**: global function  
**Returns**: <code>boolean</code> - - success / failure  

| Param | Type | Description |
| --- | --- | --- |
| i | <code>string</code> \| <code>Indicator</code> | indicator id or Indicator instance |

<a name="indicatorSettings"></a>

## indicatorSettings(i, s) ⇒ <code>Object</code>
set or get indicator settings

**Kind**: global function  
**Returns**: <code>Object</code> - - settings  

| Param | Type | Description |
| --- | --- | --- |
| i | <code>string</code> \| <code>Indicator</code> | indicator id or Indicator instance |
| s | <code>Object</code> | settings |

<a name="hasStateIndicator"></a>

## hasStateIndicator(i, dataset) ⇒ <code>Indicator</code> \| <code>false</code>
Does current chart state have indicator

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| i | <code>string</code> |  | indicator id or name |
| dataset | <code>string</code> | <code>&quot;searchAll&quot;</code> |  |

<a name="calcAllIndicators"></a>

## calcAllIndicators()
calculate all indicators currently in use

**Kind**: global function  
