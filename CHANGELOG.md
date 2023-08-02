# Change Log

## [0.135.0] - 2023-07-02

Added

* Overlay - News Events

Changed

* Config - trades, events - moved into primary
  drawings moved into primary and secondary

## [0.127.0] - 2023-06-22

Added

* Indicator - invokeConfig()
* Indicator - settings()

## [0.126.0] - 2023-06-21

Added

* Indicator - visibility

Changed

* Use shorter API path - chart.chartPanes instead of chart.MainPane.chartPanes

## [0.125.0] - 2023-06-20

Added

* Indicators - add via api
* Indicators - remove via api or chart GUI
* Indicators - re-order via api or chart GUI

Fixed

* Price Y Axis scale smooth scaling with mouse pointer

## [0.124.1] - 2023-06-17

Changed

* Divider - drag - refactored from MainPane to chart pane resize()
* Cursor - set, get refactored

FIXED

* Divider - drag - display

## [0.124.0] - 2023-06-17

Added 

* Indicators - remove via API and GUI

Changed 

* ChartPane - guard - no remove primary, no user destroy()

Fixed

* Legend - properly remove icon events
* Indicators - remove legend on destroy()

## [0.123.0] - 2023-06-14

Changed

* Chart View - remove via API and legend icon

Fixed

* Cleaned up event unsubscribing
* StateMachine - unsubscribe incorrect function reference
* StateMachine configs now provide id
* further id sanitation throughout TradeX

## [0.122.0] - 2023-06-12

Added

* Legend Controls - re-order chart panes
* xMap()

Changed

* Chart.js - now provides both onChart offChart
* Reorganize canvas helper functions
* IDs -  standardized throughout TradeX component
* console output moved to internal methods

Fixed

* Property Naming clean up - ID -> id for standardization
* Legends - refactored which() into onMouseClick()
* Legend - title
* Pane / View sizing issue
* Divider - pointer over / enter

## [0.121.11] - 2023-05-27

Added

* chart padding, the space above and below the candle range can now be set via the config.

## [0.121.10] - 2023-05-26

Added

* Theme - setProperty, getProperty using path "candle.Type"
* isTouch - touch device flag
* Legends - set deselect on chart drag

## [0.121.9] - 2023-05-24

Fixed

* Pointer drag , and move events that start within the chart and cross outside of it.
* Chart Cursor - crosshair, X and Y scale cursor positioning

## [0.121.8] - 2023-05-22

Added

* Mjolnir integration - touch device support
* Keys - cursor up / down set chart zoom
* Config Options - disable: time navigation, legend controls

Fixed

* Mouse Left Zoom Lock - prevent unintended zoom on touch pads
* timeline tick rendering
* Chart Cursor - crosshair, X and Y scale cursor positioning

## [0.121.7] - 2023-05-12

Fixed

* Theme - list, hot swapping, modify values, delete
* Divider - uses theme definition
* Off Chart - separator (top border) uses theme definition
* Candles - use current theme definition

## [0.121.6] - 2023-05-12

Added

* chart state export - chart.state.exportState()


## [0.121.4] - 2023-05-12

Fixed

* incorrect Rows size on chart starting with fixed size

## [0.121.3] - 2023-05-11

Fixed

* customElements.define() - define once

## [0.121.2] - 2023-05-10

Fixed

* replaced constructor.name comparisons with instanceof, to eliminate issue with minify changing class names

## [0.121.1] - 2023-05-07

Added

* Custom Indicators

Fixed

* TALib - indicator history calculation on chart.start() now queued until talib is ready

## [0.120.1] - 2023-04-26

Added

* Indicator API
* Indicators - calculate indicators on mergeData()

Fixed

* edge case empty scaleGrads
* min chart heightt - accounts for Utils bar
* mergeData()

## [0.120.1] - 2023-04-23

Added

* Legends - optional labels

Fixed

* Indicator - Bollinger Bands - legend

## [0.120.0] - 2023-04-23

Added

* Indicator - calculate back history on start if not provided in the config state
* TALib - async ready status now implemented
* TALib - function input output definitions to ensure correct data in / out
* Indicators - can use TALib input output definitions

Fixed

* Indicators - fixed range pointers for back history and live price stream
* Indicators - BB, DMI, EMA, RSI, SMA - data length check on draw()

## [0.119.0] - 2023-04-07

Added

* User Defined Chart Alerts - invoked via API or config

## [0.118.0] - 2023-04-10

Changed

* Refactored onChart and offChart code out to chart parent class

Fixed

* Y Scale grads sync to current range
* Y Scale price line default width

## [0.117.7] - 2023-04-06

Added

* Event - STREAM_FIRSTVALUE

Fixed

* X grid sync timeline on streaming

## [0.117.6] - 2023-04-05

Changed

* Timeline - now uses Graph to manage overlays

## [0.117.5] - 2023-04-03

Changed

* Scale - now uses Graph to manage overlays

## [0.117.4] - 2023-04-01

Changed

* Obsolete input Controller removed and replaced with Input class

Fixed

* Update (draw() render()) on/offCharts on setDimensions() (resize)

## [0.117.3] - 2023-03-31

Fixed

* Time scale drag to zoom candle history range

## [0.117.2] - 2023-03-30

Fixed

* Centering on first stream candle of empty chart

## [0.117.1] - 2023-03-30

Fixed

* Stream - ensure tick values are numbers

## [0.117.0] - 2023-03-27

Added

* Watermark

## [0.116.1] - 2023-03-26

Fixed

* Stream - current candle / time frame count down calculation

## [0.116.0] - 2023-03-26

Added

* Stream - current candle / time frame count down option on  Axis

## [0.115.0] - 2023-03-23

Added

* Utils Bar - enable / disable

## [0.114.0] - 2023-03-23

Added

* Tool Bar - enable / disable

## [0.113.3] - 2023-03-22

Changed

* Chart now expects Kline data for price stream
* Chart exports class Overlay for external  Overlays
* Chart exports class Indicator for external Indicators
* All Overlays now extend from class Overlay

Fixed

* Components - views (web components) - resizing

## [0.103.5] - 2022-09-23

Fixed

* Stream - live candle positioning

## [0.103.3] - 2022-09-22

Added

* Scale - yAxis - dynamic gradation placement option added to the fixed option

Fixed

* FIXED: Chart X Grid on zoom - now updates

## [0.103.0] - 2022-09-14

Fixed

* Stream - new candle creation time - now matches chart time frame

## [0.103.0] - 2022-09-14

Added

* Live Stream - stream candle

## [0.102.0] - 2022-09-09

Added

* Live Stream - Scale - Price Line indicator

## [0.101.2] - 2022-08-25

Added

* CHANGELOG.md

Changed

Fixed

* Time Line cursor layer width

## [0.101.0] - 2022-08-24

Added

* Reactive Resize - chart can be hooked up to an event that watches for an element size change and force a chart resize, making it reactive.

Changed

Fixed

## [0.100.2] - 2022-08-22

Added

Changed

Fixed

* Divider / Splitter - prevent drag select while moving

## [0.100.1] - 2022-08-22

Added

* State Machine - Actions

Changed

Fixed

* Divider / Splitter - minimum row height limit on resize

## [0.100.0] - 2022-08-21

Added

* Chart Rows - Chart and Off Chart - now resize on divider / splitter drag

Changed

Fixed
