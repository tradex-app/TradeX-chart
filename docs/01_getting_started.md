---
title: Getting Started
description: How to set up and use TradeX Chart
---

## Get TradeX Chart

TradeX Chart supports multiple download methods, you can get it through package management tools such as ``npm``, ``yarn``, or ``CDN``.

### npm
```bash
npm install tradex-chart --save
```
### yarn
```bash
yarn add tradex-chart
```

### CDN
You can use `jsDelivr`, `unpkg` or others.
```bash
<script src=" https://cdn.jsdelivr.net/npm/tradex-chart@0.128.1/dist/tradex-chart.umd.min.js "></script>
```

## Creating the Chart

TradeX Chart is a custom HTML element. It must be created and inserted into the DOM.

```javascript
import { Chart } from 'tradex-chart'

// Create an empty chart and insert it into the DOM
let chart = document.createElement("tradex-chart")
let mount = document.getElementByID("#mount")
    mount.appendChild(chart)
```

Without a configuration, the chart won't do anything useful, so you need define a few things. The following section, [Configuration](../02_configuration), will show you what is possible.
