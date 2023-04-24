# Change Log

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
