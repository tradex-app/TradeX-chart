---
title: Events
---

TradeX-chart provides a publish and subscribe messaging model. The chart supports multiple subscriptions to an event.

It is also possible to use the chart to generate your on events.

## Subscribing

Once the chart is initialized with the ``chart.start()`` method, any event the chart generates can be subscribed to with the ``chart.on(topic, handler)`` method.

* @param {string}   topic   - event name
* @param {function} handler - function or method
* @param {Object}   context - context the function belongs to

```javascript
chart.on("stream_candleUpdate", onSomeEven, this)
```

The handler will be passed one parameter if any dependent upon the event.

```javascript
function onSomeEvent(data) { console.log(data) }
```
Event handlers will be executed in first in last out order.

## Unsubscribing

Unsubscribing from the event uses the ``chart.off(string, function, this)`` method.

* @param {string}   topic   - event name
* @param {function} handler - function or method
* @param {Object}   context - context the function belongs to

```javascript
chart.off("stream_candleUpdate", onSomeEvent, this)
```

## Event Publishing

The same method that the chart uses internally is also exposed on the public API. Developers can take advantage of this for their own purposes and generate their own events and use the same subscribe and unsubscribe methods detailed above.

* @param {String} topic - The topic name
* @param {Object} data  - The data to publish

```javascript
chart.emit("some_event", {value: "foo"})
```

## Event List

The following list of events is not exhaustive as the chart is still under heavy development and subject to change until the release of version 1.0.

* chart_IndicatorAdd
* chart_pan
* chart_panDone
* chart_paneAdd
* chart_paneDestroy
* chart_paneRefresh
* chart_primaryPointerDown
* chart_render
* chart_rowsResize
* chart_secondaryAdd
* chart_scrollUpdate
* chart_yAxisRedraw
* chart_zoomDone
* divider_pointerDrag
* divider_pointerDragEnd
* Error
* event_selected
* global_resize
* main_mouseMove
* range_limitFuture
* range_limitPast
* range_set
* state_eventAdded
* state_exported
* state_deleted
* state_mergeComplete
* state_tradeAdded
* stream_candleFirst
* stream_candleNew
* stream_candleUpdate
* stream_Error
* stream_Listening
* stream_None
* stream_Started
* stream_Stopped
* trade_selected
* trade_added
