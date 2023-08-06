---
title: Canvas Extension Layers
description: Provides a layered functionality to HTML canvas
---
Canvas Extension Layers are a Html5 Canvas framework that enables hit detection, layering, pixel ratio management, exports, and downloads for either ``2d`` or ``webgl`` canvas modes.

## CEL

### viewports

Return an array of instantiated viewports

```javascript
const viewports = CEL.viewports;
```

## CEL.Viewport

### constructor

Create a multi-layered canvas.

```javascript
const viewport = new CEL.Viewport();
```

### scene

Return the viewport scene which all of the layers are composited into.

```javascript
const scene = viewport.scene;
```

### index

```javascript
const index = viewport.index;
```

### add()

Add a layer to the viewport.

```javascript
viewport.add(layer);
```

### render()

Render the viewport by compositing all layers into a single viewport scene canvas which is visible to the end user.

```javascript
viewport.render();
```

### setSize()

Set the viewport size in pixels and all layers in the stack which are composited into the viewport. This also includes each associated hit detection layer. This can be utilized for pointer events.

```javascript
viewport.setSize(600, 300);
```

### getIntersection()

Return the layer index, if any, for the supplied x and y coordinates. If none (transparent) then return a value of -1. This can be used for pointer detection.

```javascript
const key = viewport.getIntersection(20, 30);
```

### destroy()

```javascript
// goodbye forever
viewport.destroy();
```

## CEL.Layer

### constructor

```javascript
const layer = new CEL.Layer();
```

### scene

Draw a rectangle on the scene canvas. This will be visible to the end user.

```javascript
layer.scene.context.fillStyle = 'red';
layer.scene.context.fillRect(0, 0, 100, 50);
```

### hit

Draw a rectangle on the hit canvas for hit detection. This is not visible to the end user.

```javascript
layer.hit.context.fillStyle = layer.hit.getIndexValue(0);
layer.hit.context.fillRect(0, 0, 100, 50);
```

### visible

Set the layer visibility: true, false.

```javascript
// hide layer
layer.visible=false;
viewport.render();

// show layer
layer.visible=true;
viewport.render();
```

### setPosition()

Set the layer position relative to the viewport.

```javascript
layer.setPosition(50, 50);
```

### setSize()

```javascript
layer.setSize(600, 200);
```

### moveUp()

```javascript
layer.moveUp();
```

### moveDown()

```javascript
layer.moveDown();
```

### moveToTop()

Place the layer on the top of the stack, giving it the highest index value.

```javascript
layer.moveToTop();
```

### moveToBottom()

Place the layer at the bottom of the stack, giving it an index value of zero.

```javascript
layer.moveToBottom();
```

### getIndex()

Return the index of the layer in the stack order. A value of zero is the bottom of the layer stack with the layer order being ascending.

```javascript
const index = layer.getIndex();
```

### destroy()

Remove the layer.

```javascript
layer.destroy();
```

## CEL.Scene

### constructor

```javascript
const scene = new CEL.Scene();
```

### context

Return canvas context for drawing operations.

```javascript
const context = scene.context;
```

### canvas

Return canvas element

```javascript
const canvas = scene.canvas;
```

### setSize()

```javascript
scene.setSize(600, 200);
```

### clear()

```javascript
scene.clear();
```

### toImage()

```javascript
scene.toImage(function(image) {
  // do something with the image
});
```

### download()

```javascript
// download the canvas as an image to your computer.  Cool!
scene.download({
  fileName: 'my-file.png'
});
```

## Hit Detection

### constructor

```javascript
const hit = new CEL.Hit();
```

### canvas

Return canvas HTML element

```javascript
const canvas = hit.canvas;
```

### context

Return canvas index for drawing operations.

```javascript
const context = hit.context;
```

### setSize()

Set the hit detection layer.

```javascript
hit.setSize(600, 200);
```

### clear()

Clear the hit detection layer.

```javascript
hit.clear();
```

### getIndexValue()

Get hit value (colour) from index. This value is used as the fill or stroke value for the hit mask which is used for [pointer detection](#getintersection-1).

```javascript
function drawHitCircle(config) {
  var hit = config.layer.hit,
      context = hit.context;

  hit.clear();
  context.save();
  context.beginPath();
  context.arc(config.x, config.y, 60, 0, Math.PI*2, false);
  context.fillStyle = hit.getIndexValue(config.key);
  context.fill();
  context.restore();
}
```

### getIntersection()

``getIntersection(x, y)`` tests if a hit for coordinates. This can be used for pointer interactivity. Returns the associated layer index value or -1 if not hit.

```javascript
const dataIndex = hit.getIntersection(20, 30);
```
