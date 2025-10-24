---
title: Introduction
description: Understanding the chart
---

## Concepts

For those wishing to render their own custom data to the chart, there are two basic concepts to understand: **Indicators** and **Overlays**.

### Overlays

**Overlays** (layers) are the basic building blocks of the chart panes (price history), time (X Axis), and price (Y Axis).

Overlays are used to represent time or price-related data, or other arbitrary elements. For instance, the grid lines representing time and price on the chart are overlays.

### Indicators

**Indicators** are meant to be an algorithmic analysis of price data, and thus have their own dataset.

They are a superset of overlays, meaning they have extended functionality: `Class Indicator extends Overlay`

Indicators can have their own separate chart pane (e.g., RSI), a legend which provides value readouts, and display controls.


