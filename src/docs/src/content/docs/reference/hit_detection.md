---
title: "Hit Detection"
description: "How to make use of pixel perfect hit detection for pointers"
---

The TradeX-chart [Canvas Extension Layers](../canvas_extension_layers) (CEL)provides and API for pixel perfect [hit detection](../canvas_extension_layers#hit-detection) of pointers.

The Hit Detection API is accessible for each layer created with CEL via the hit property.

```javascript
const layer = new CEL.Layer(cfg);
const hit = layer.hit
```
However you typically will be accessing this through your own [custom indicator](../indicators/#custom-indicators) or [overlays](../overlays/#custom-overlays).

The Hit Detection is a non-visible ``<canvas></canvas>`` of the same dimensions as it's parent layer. As it is a HTML canvas element, all of the same canvas methods are used to draw on it.

Typically, the image (icon, line, candle) that you draw on your indicator or overlay layer, you repeat on the hit layer, but with one major difference.

Images drawn on the hit layer are of one single colour and that colour is provided to you by the Hit API.

```javascript
const hit = layer.hit
const col = hit.getIndexValue(key)
```
The ``key`` or ``ID`` value provided to ``getIndexValue(key)`` is a unique user assigned ``number`` for each item on the layer that you wish to detect any pointer interaction with.

The returned value is used as the fill or stroke on the Hit canvas.

```javascript
const ctx = layer.scene.context
const hit = layer.hit
const col = hit.getIndexValue(key)

ctx.stroke = col
ctx.fillStyle = col
// draw something
```

Your custom indicator or overlay would subscribe to one of the chart pointer events and on a pointer event, test if the pointer x,y position returns a match from the Hit API.

```javascript
constructor() {
  this.core.on("primary_pointerdown", this.isSelected.bind(this))
}

isSelected(e) {
  const x = e[0]
  const y = e[1]
  const k = this.layer.hit.getIntersection(x,y)

  // no hit on layer
  if (k == -1) return

  switch(k) {
    case 0: 
      // do something for first item
      break;
    case 1:
      // do something for second item
      break;
  }
}
```

The Hit API can test for a potential maximum of 16777216 items, but effectively, this would very likely be much less owing to browser resource limitations.