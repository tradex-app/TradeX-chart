# Change Log

## [0.139.2]()

Fixed

* Divider styling

## [0.139.1](https://github.com/tradex-app/TradeX-chart/commit/3a0fb48b06543eb58510543aff01f62149e33137)

Fixed

* Spurious import causing failure

## [0.139.0](https://github.com/tradex-app/TradeX-chart/commit/824ebf646c510dac986eca3c85bc3d7b8186f8ec)

Added

* Chart Pane - collapse, expand

## [0.138.4](https://github.com/tradex-app/TradeX-chart/commit/c808d41ea00375d69d3d8a96e5e26bcfd579c752)

Updated

* Indicator - Legend - controls


## [0.138.3](https://github.com/tradex-app/TradeX-chart/commit/880365f923b2b4f7d0577f16fd03cfc3aa9ac420)

Updated

* Chart Pane - Legend - controls - icons hover highlight


## [0.138.2](https://github.com/tradex-app/TradeX-chart/commit/755f7d3eca65108afbbf5112a957077913d5d27a)

Updated

* Chart Pane - Legend - controls - icons display


## [0.138.1](https://github.com/tradex-app/TradeX-chart/commit/793ffb7693552b6480ba6341f58da34361f64558)

Fixed

* Indicator AROON - legends - nicePrice()
* Chart Pane Pairs - resize (divider)

## [0.138.0](https://github.com/tradex-app/TradeX-chart/commit/bfb9039ec8be89fbb05801e2c7c0997f49e21f2a)

Added

* Indicator - AROON

Updated

* Documentation


## [0.137.5](https://github.com/tradex-app/TradeX-chart/commit/88dcc06796889f6c6ee854c69a45190039c9943c)

Fixed

* Menu positioning on chart resize

Added

* Tools - node
* idSanitize()


## [0.137.4](https://github.com/tradex-app/TradeX-chart/commit/f4b1a381dd7c0f24b521bac3b33756852ac79a14) - 2023-08-10

Fixed

* Chart-Events - variables
* Chart-Events & Chart-Trades - using wrong hit layer

## [0.137.3](https://github.com/tradex-app/TradeX-chart/commit/b2c3d0a506becaa9c9b0f24c5b67efe5e57f918e) - 2023-08-10

Fixed

* Chart Trades - pixel perfect hit detection
* Documentation


## [0.137.2](https://github.com/tradex-app/TradeX-chart/commit/1538be7f2ec488c61766b5d49dd6c4726d90c987) - 2023-08-08

Fixed

* Chart Image Export - yAxis positioning

## [0.137.1] - 2023-08-08

Added

* Chart to image URL ``toImageURL()``
* Image download and data URL, image type options

## [0.137.0](https://github.com/tradex-app/TradeX-chart/commit/c328a052c4354375a584b93a1031d69597b6bc58) - 2023.08-08

Added

* Chart Image Snapshot Download
* CEL - layer composition

## [0.136.0](https://github.com/tradex-app/TradeX-chart/commit/8da2af9e4c93c7bf3b0976e489412181f1c541ef) - 2023-08-05

Added

* High Low Marker

## [0.135.0](https://github.com/tradex-app/TradeX-chart/commit/e26c7cbe7baaac45c9199a5d904e1cdb6fe7b9f9) - 2023-08-02

Added

* Overlay - News Events

Changed

* Config - trades, events - moved into primary
  drawings moved into primary and secondary

## [0.134.2] - 2023-08-01

Added

* svgToImage()
* isSVG()

## [0.134.1](https://github.com/tradex-app/TradeX-chart/commit/920cee8320bd3fe49ce237c6d31368158f108afa) - 2023-07-31

Fixed

* Dialogue window (not implemented message) opening when it shouldn't

## [0.134.0]/(https://github.com/tradex-app/TradeX-chart/commit/91c9b3b649f6b5972ec8d51caddbcf41a9eddc39) - 2023-07-31

Added

* Trades - Overlay

## [0.133.0](https://github.com/tradex-app/TradeX-chart/commit/91c9b3b649f6b5972ec8d51caddbcf41a9eddc39) - 2023-07-30

Added

* Legends - show / hide all

## [0.132.3](https://github.com/tradex-app/TradeX-chart/commit/62ae8b2251a397bf98b1584b227e0688bcc45230) - 2023-07-29

Fixed

* Widgets - window
* Streaming candle range auto increment
* FireFox render SVG to canvas

## [0.132.2](https://github.com/tradex-app/TradeX-chart/commit/86fdd1321ed6b2e6fbdf8c8c21826945d36cde90) - 2023-07-25

Fixed

* addChartIndicator()

## [0.132.1](https://github.com/tradex-app/TradeX-chart/commit/7593ac62f7b887900ac6834a6b0de9264bfe9722) - 2023-07-22

Fixed

* Config - range - center option

## [0.131.1](https://github.com/tradex-app/TradeX-chart/commit/e178d98a129a1154f2a738aacb5dfcefdc95919c) - 2023-07-21

Added

* Merge Indicator data

Fixed
* rangeStart

Changed

* Timeline - navigation - hidden by default
* State - mergeData - object requires "ohlcv" instead of "data"
* Automatic indicator calculation on merge = true to enable

## [0.130.0]

## [0.129.0]

## [0.128.1]

## [0.127.1]

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
