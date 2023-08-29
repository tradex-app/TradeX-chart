---
title: core - documentation.js
---

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

*   [TradeXchart][1]
    *   [start][2]
        *   [Parameters][3]
    *   [on][4]
        *   [Parameters][5]
    *   [off][6]
        *   [Parameters][7]
    *   [emit][8]
        *   [Parameters][9]
    *   [execute][10]
        *   [Parameters][11]
    *   [delayedSetRange][12]
    *   [updateRange][13]
        *   [Parameters][14]
    *   [isIndicator][15]
        *   [Parameters][16]
    *   [setIndicators][17]
        *   [Parameters][18]
    *   [addIndicator][19]
        *   [Parameters][20]
    *   [getIndicator][21]
        *   [Parameters][22]
    *   [removeIndicator][23]
        *   [Parameters][24]
    *   [indicatorSettings][25]
        *   [Parameters][26]
    *   [hasStateIndicator][27]
        *   [Parameters][28]
    *   [create][29]
        *   [Parameters][30]
    *   [destroy][31]
        *   [Parameters][32]
    *   [destroy][33]
    *   [setDimensions][34]
        *   [Parameters][35]
    *   [setPricePrecision][36]
        *   [Parameters][37]
    *   [setVolumePrecision][38]
        *   [Parameters][39]
    *   [addTheme][40]
        *   [Parameters][41]
    *   [setTheme][42]
        *   [Parameters][43]
    *   [setStream][44]
        *   [Parameters][45]
    *   [getRange][46]
        *   [Parameters][47]
    *   [setRange][48]
        *   [Parameters][49]
    *   [mergeData][50]
        *   [Parameters][51]
    *   [resize][52]
        *   [Parameters][53]
    *   [refresh][54]

## TradeXchart

The root class for the entire chart

### start

Target element has been validated as a mount point,
let's start building

#### Parameters

*   `cfg` **[object][55]** chart configuration

### on

Subscribe to a topic

#### Parameters

*   `topic` **[String][56]** The topic name
*   `handler` **[Function][57]** The function or method that is called
*   `context` **[Object][55]** The context the function(s) belongs to

### off

Unsubscribe from a topic

#### Parameters

*   `topic` **[String][56]** The topic name
*   `handler` **[Function][57]** function to remove

### emit

Publish an topic

#### Parameters

*   `topic` **[String][56]** The topic name
*   `data` **[Object][55]** The data to publish

### execute

Execute a task

#### Parameters

*   `channel` &#x20;
*   `data` **[Object][55]** The data that gets published
*   `cb` **[Function][57]** callback method
*   `topic` **[String][56]** The topic name

### delayedSetRange

When chart is empty postpone range setting
until first candle, then position on last

### updateRange

Calculate new range index / position from position difference
typically mouse drag or cursor keys

#### Parameters

*   `pos` **[array][58]** \[x2, y2, x1, y1, xdelta, ydelta]

### isIndicator

validate indicator

#### Parameters

*   `i` **class** indicator class

### setIndicators

import Indicators

#### Parameters

*   `i` **[object][55]** indicators {id, name, event, ind}
*   `flush` **[boolean][59]** expunge default indicators (optional, default `false`)

Returns **any** boolean

### addIndicator

add an indicator - default or registered user defined

#### Parameters

*   `i` **[string][56]** indicator
*   `name` **[string][56]** identifier (optional, default `i`)
*   `params` **[object][55]** {settings, data} (optional, default `{}`)

Returns **(Indicator | `false`)** indicator instance or false

### getIndicator

retrieve indicator by ID

#### Parameters

*   `i` **[string][56]** indicator ID

### removeIndicator

remove an indicator - default or registered user defined

#### Parameters

*   `i` **([string][56] | Indicator)** indicator id or Indicator instance

Returns **[boolean][59]** success / failure

### indicatorSettings

set or get indicator settings

#### Parameters

*   `i` **([string][56] | Indicator)** indicator id or Indicator instance
*   `s` **[object][55]** settings

Returns **[boolean][59]** success / failure

### hasStateIndicator

Does current chart state have indicator

#### Parameters

*   `i` **[string][56]** indicator id or name
*   `dataset` **[string][56]**  (optional, default `"searchAll"`)

Returns **any** indicator or false

### create

Create a new TradeXchart instance

#### Parameters

*   `txCfg` **[object][55]** chart config (optional, default `{}`)
*   `container` **DOM\_element** HTML element to mount the chart on
*   `state` **[object][55]** chart state

Returns **instance**&#x20;

### destroy

Destroy a chart instance, clean up and remove data

#### Parameters

*   `chart` **instance**&#x20;

### destroy

Stop all chart event processing and remove the chart from DOM.
In other words, destroy the chart.

### setDimensions

Set chart width and height

#### Parameters

*   `w` **[number][60]** width in pixels
*   `h` **[number][60]** height in pixels

### setPricePrecision

Set the price accuracy

#### Parameters

*   `pricePrecision` **[number][60]** Price accuracy

### setVolumePrecision

Set the volume accuracy

#### Parameters

*   `volumePrecision` **[number][60]** Volume accuracy

### addTheme

Add a theme to the chart,
if no current theme is set, make this the current one.

#### Parameters

*   `theme` **[object][55]** Volume accuracy

Returns **instance** theme instance

### setTheme

Set the chart theme

#### Parameters

*   `ID` &#x20;
*   `theme` **[string][56]** theme identifier

### setStream

specify a chart stream

#### Parameters

*   `stream` **[object][55]**&#x20;

Returns **instance**&#x20;

### getRange

initialize range

#### Parameters

*   `start` **[number][60]** index (optional, default `0`)
*   `end` **[number][60]** index (optional, default `0`)
*   `config`   (optional, default `{}`)

### setRange

set start and end of range

#### Parameters

*   `start` **[number][60]** index (optional, default `0`)
*   `end` **[number][60]** index (optional, default `this.rangeLimit`)

### mergeData

Merge a block of data into the chart state.
Used for populating a chart with back history.
Merge data must be formatted to a Chart State.
Optionally set a new range upon merge.

#### Parameters

*   `merge` **[object][55]** merge data must be formatted to a Chart State
*   `newRange` **([boolean][59] | [object][55])** false | {start: number, end: number} (optional, default `false`)
*   `calc`   (optional, default `true`)

### resize

Resize the chart

#### Parameters

*   `width` **[number][60]** pixels
*   `height` **[number][60]** pixels

Returns **[boolean][59]** success or failure

### refresh

refresh / redraw the chart

[1]: #tradexchart

[2]: #start

[3]: #parameters

[4]: #on

[5]: #parameters-1

[6]: #off

[7]: #parameters-2

[8]: #emit

[9]: #parameters-3

[10]: #execute

[11]: #parameters-4

[12]: #delayedsetrange

[13]: #updaterange

[14]: #parameters-5

[15]: #isindicator

[16]: #parameters-6

[17]: #setindicators

[18]: #parameters-7

[19]: #addindicator

[20]: #parameters-8

[21]: #getindicator

[22]: #parameters-9

[23]: #removeindicator

[24]: #parameters-10

[25]: #indicatorsettings

[26]: #parameters-11

[27]: #hasstateindicator

[28]: #parameters-12

[29]: #create

[30]: #parameters-13

[31]: #destroy

[32]: #parameters-14

[33]: #destroy-1

[34]: #setdimensions

[35]: #parameters-15

[36]: #setpriceprecision

[37]: #parameters-16

[38]: #setvolumeprecision

[39]: #parameters-17

[40]: #addtheme

[41]: #parameters-18

[42]: #settheme

[43]: #parameters-19

[44]: #setstream

[45]: #parameters-20

[46]: #getrange

[47]: #parameters-21

[48]: #setrange

[49]: #parameters-22

[50]: #mergedata

[51]: #parameters-23

[52]: #resize

[53]: #parameters-24

[54]: #refresh

[55]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[56]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[57]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function

[58]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array

[59]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean

[60]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number