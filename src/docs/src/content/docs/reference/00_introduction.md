---
title: Introduction
description: Understanding the chart
---

## Concepts

For those wishing to render their own custom data to the chart their are two basic concepts to understand: Indicators and Overlays.

**Overlays** (layers) are the basic building blocks of the chart panes (price history), time (X Axis), price (Y Axis).

Overlays are use to represent time or price related data, or other arbitrary things. For instance, the grid lines representing time and price on the chart are Overlays.

**Indicators** are Indicators are meant to be an algorithmic analysis of price data, and thus have their own dataset.

They are a superset of Overlays, meaning they have extended functionality. ``Class Indicator extends Overlay``

Indicators can have their own separate chart pane, eg. RSI, have a legend, which provide the values readout, and display controls.


