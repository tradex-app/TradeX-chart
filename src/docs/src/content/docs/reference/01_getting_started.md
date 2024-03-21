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
```html
<!-- jsdelivr -->
<script src="https://cdn.jsdelivr.net/npm/tradex-chart/dist/tradex-chart.umd.min.js"></script>

<!-- unpkg -->
<script src="https://unpkg.com/tradex-chart/dist/tradex-chart.umd.js"></script>
```

## Step 1.  Creating the Chart

TradeX Chart is a custom HTML element, which can be used in your HTML like any other element.
```html
<tradex-chart></tradex-chart>
```
Or created and inserted into the DOM via JavaScript
```javascript
import { Chart } from 'tradex-chart'

// Create an empty chart and insert it into the DOM
let chart = document.createElement("tradex-chart")
let mount = document.getElementByID("#mount")
    mount.appendChild(chart)
```


## Step 2.  Configure the Chart

When the chart has mounted on the DOM, will display as empty as it has no data.

Without a configuration, the chart won't do anything useful, so you need define a few things. The [Configuration](../02_configuration) documentation will explain what options are available.

```javascript
chart.use(config)
```
