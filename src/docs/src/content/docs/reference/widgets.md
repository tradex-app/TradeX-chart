---
title: Widgets
description: How to use TradeX Chart widgets
---
TradeX Chart has a number of widgets, but only a select number are exposed to the developer to make use of. The others are used by default with certain chart components.

* [Dialogue](#dialogue)
* Progress

## Dialogue

A dialogue in essence is floating box layer which presents information over the chart content. Dialogues have the following three configurable properties with some being optional.

### Dialogue Config


| Name       | Type    | Required | Description                                                                                                 |
| :----------- | --------- | :--------- | ------------------------------------------------------------------------------------------------------------- |
| dragBar    | boolean | no       | Enables the user to click and drag the dialogue, positioning it where they see fit                          |
| closeIcon  | boolean | no       | Close / remove the dialogue from the chart                                                                  |
| title      | string  | no       | Title displayed the top of the dialoge                                                                      |
| content    | string  | yes      | Without HTML content, a dialogue is pointless so it is required that you provide some. =)                   |
| dimensions | Object  | yes      | {w, h} object specifying width and height in pixels                                                         |
| position   | Object  | yes      | ``{x, y, z}`` object specifying position in pixels                                                          |
| styles     | Object  | no       | ``{window, dragBar, closeIcon, title, content}`` object of [styleable dialogue features](#dialogue-styling) |

If no ``position`` is specified, then the dialogue will default to positioning in the center of the chart.

### Initialize and Start Dialogue

The dialogue can be initialized with a config before it is displayed

```javascript
// instantiate and start dialogue
const config = {dragBar, closeIcon, title, content, position, styles}
const dialogue = chart.WidgetsG.insert("Dialogue", config)
      dialogue.start()
```

### Display Dialogue

Calling ``dialogue.open()`` will display the pre-configured dialogue. However you can optionally pass a new configuration to the dialogue when it opens to change or update it's content.

```javascript
const config = {title, content, position, styles}
// display dialogue
dialogue.open(config)
```

### Hide Dialogue

``dialogue.close()`` will cause the dialogue to be hidden from display.

### Remove

``dialogue.remove()`` will remove the dialogue from the chart, rendering it no longer accessible.

### Dialogue Styling

There are five elements of the dialogue that can be styled.


| Name      | Description                                         |
| :---------- | ----------------------------------------------------- |
| window    | parent element hostng the others                    |
| dragBar   | optional bar at the top to allow manual positioning |
| closeIcon | optional close icon                                 |
| title     | optional title                                      |
| content   | what you want to display                            |

Each entry of the ``styles`` property is an object containing CSS properties and values.

```javascript
const config = {
  dragBar: true,
  dimensions: {w: 199, y: 100}
  position: {x: 100, y: 100},
  styles: {
    dragBar: { background: "#888" }
    title: { color: "#ccc" }
  }
}
```
