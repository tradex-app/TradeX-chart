---
title: News Events
description: News Events data and markers
---

Currently event data can only be added to the chart via the [initial data state provide via the config](../state). It will be in the near future be possible to add events via the API.

## Event Markers

Event makers representing buy or sell, are placed on the primary chart pane, above the individual price history intervals (candles) they are associated with via their timestamp.

EventX Chart provides a number of marker icon options. Their size and colour is also configurable. The [theming configuration](../themes#events) has more details.

## Event Entry

An individual event entry has the following format:

```javascript
const event = {
  timestamp: 1558605600000, // number - time stamp
  id: "012336352",          // string - event id
  title: "Some Event",      // string
  content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", // string (HTML)
  url: "https://www.coindesk.com/" // string - URL
}
```

## Add Event

A single event can be added to the chart data state via the following:

```javascript
chart.addEvent(event)
```
Where the [event entry object format](#event-entry) is defined in the previous section. ``addEvent()`` will validate the event entry and return a boolean as the result.

## Remove Event

Not implemented yet.

## Event State Data

The [chart State Data](../state) provides a collection of all of the events that can be displayed on the chart. [Event entries (objects)](#event-entry) are grouped by timestamp in an array as it may be possible that multiple events may be executed on the same time interval (candle).

```javascript
const config = {
ohlcv: [],
primary: [],
secondary: [],
  events: {
    1558666800000: [
      {            
        timestamp: 1558666800000,
        id: "abc123",
        title: "Some Event",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        link: "https://www.coindesk.com/"
      }
    ]
  },
}
```
## Event Marker Event

By default, if a event marker is clicked, it will invoke the events overlay method which will display the event data over the chart.

This can be disabled via the [chart config](../../02_configuration).

```javascript
const config = {
  events: { 
    display: true,
    displayInfo: false 
  }
}
```

The chart emits a ``event_selected`` [event](../../events) which you can subscribe to and invoke your own method.

The event will pass the information for that [event entry](#event-entry) to the subscribed event listener.
