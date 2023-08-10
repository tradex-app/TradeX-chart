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

Set layer size and associated hit detection layer

```javascript
layer.setSize(600, 200);
```

### setComposition()

Set layer composition / blending mode.

```javascript
layer.setCompositin("multiply");
```

| Value            | Description                                                                                                                                          |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| source-over      | **Default**<br>Displays the source over the destination                                                                                              |
| source-atop      | Displays the source on top of the destination. The part of the source image that is outside the destination is not shown                             |
| source-in        | Displays the source in the destination. Only the part of the source that is INSIDE the destination is shown, and the destination is transparent      |
| source-out       | Displays the source out of the destination. Only the part of the source that is OUTSIDE the destination is shown, and the destination is transparent |
| destination-over | Displays the destination over the source                                                                                                             |
| destination-atop | Displays the destination on top of the source. The part of the destination that is outside the source is not shown                                   |
| destination-in   | Displays the destination in the source. Only the part of the destination that is INSIDE the source is shown, and the source is transparent           |
| destination-out  | Displays the destination out of the source. Only the part of the destination that is OUTSIDE the source is shown, and the source is transparent      |
| lighter          | Displays the source + the destination                                                                                                                |
| copy             | Displays the source. The destination is ignored                                                                                                      |
| xor              | The source is combined by using an exclusive OR with the destination                                                                                 |
| multiply         |                                                                                                                                                      |
| screen           |                                                                                                                                                      |
| overlay          |                                                                                                                                                      |
| darken           |                                                                                                                                                      |
| lighten          |                                                                                                                                                      |
| color-dodge      |                                                                                                                                                      |
| color-burn       |                                                                                                                                                      |
| hard-light       |                                                                                                                                                      |
| soft-light       |                                                                                                                                                      |
| difference       |                                                                                                                                                      |
| exclusion        |                                                                                                                                                      |
| hue              |                                                                                                                                                      |
| saturation       |                                                                                                                                                      |
| color            |                                                                                                                                                      |
| luminosity       |                                                                                                                                                      |

### move()

Change the stacking order of the layer. It accepts one parameter of type ``string`` from the following values: ``"up", "down", "top", "bottom"`` or of type ``number`` specifying which layer order to set it to with the lowest layer having a value of zero. Negative values will position the layer after the topmost layer.

```javascript
// move to top of layer stack
layer.move("top");
```

### moveUp()

Move layer on position up the stack.

```javascript
layer.moveUp();
```

### moveDown()

Move layer on position down the stack.

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


| Parameter | Type     | Description                                                  | Required |
| ----------- | ---------- | :------------------------------------------------------------- | ---------- |
| type      | string   | image type, "image/png" (default), "image/jpg", "image/webp" | false    |
| quality   | number   | image quality                                                | false    |
| cb        | function | callback to receive the data URL                             | true     |

```javascript
const cb = function(imageURL) {
  // do something with the image
}
scene.toImage(type, quality, cb);
```

A callback function is **required** to receive the data URL. ``toImage`` will export a ``.png`` image by default.

### export()

``export()`` will trigger a file download, exporting a ``.png`` image snapshot of the scene.


| Parameter | Type     | Description                                                  | Required |
| :---------- | ---------- | :------------------------------------------------------------- | ---------- |
| cfg       | object   | {fileName}                                                   | false    |
| cb        | function | alternative handler                                          | false    |
| type      | string   | image type, "image/png" (default), "image/jpg", "image/webp" | false    |
| quality   | number   | image quality                                                | false    |

```javascript
// download the canvas as an image to your computer.
const cfg = {fileName: 'my-file.png'}
scene.export(cfg, null, type, quality);
```

By default, ``export()`` will export a ``.png`` image for download. If no file name is supplied, it will use the chart id by default.

## Hit Detection

Canvas Extension Layers provides an API for pixel perfect hit detection of pointers. 

:::note
Hit detection is automatically provided with each layer.
:::

```javascript
const layer = new CEL.Layer(cfg);
const hit = layer.hit
```
See [Hit Detection](../hit_detection) for information on how to implement it.

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

