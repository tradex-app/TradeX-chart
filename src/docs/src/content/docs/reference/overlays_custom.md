---
title: Custom Overlays
description: Building your own overlays
---

## Special Cases

You may occasionally have the need where your indicator spans a number of regions on the chart. For instance the [Price High Low overlay](../overlays_custom.md) draws the price on the Price Scale / Y Axis, as well as on the Primary Chart Pane.

This overlay demonstrates how one overlay can insert other (related) overlays into other panes, start them and even modify the execution of the other.

``./src/components/overlays/chart-highLow.js``