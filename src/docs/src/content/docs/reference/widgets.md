---
title: Widgets
description: How to use TradeX Chart widgets
---
TradeX Chart has a number of widgets, but only a select number are exposed to the developer to make use of. The others are used by default with certain chart components.

Widgets accessible via the API:

* Config Dialogue
* [Dialogue](#dialogue)
* Progress
* Window

Widgets are not [chart overlays](../overlays). They are their own special component type that float above all of the other chart components.

Widgets iterates through the registered widget classes and adding the ones required immediately. eg. Chart pane divider

Those widgets not immediately required, such as Dialogue, can be added later via the API.

# Config, Dialogue, Window

[Window class](#Window) `./src/components/widgets/window.js` is the parent for Dialogue and Config.

[Dialogue](#Dialogue) (modal) `./src/components/widgets/dialogue.js` extends Window. It provides an optional title bar, drag bar, close icon.

[Config Dialogues](#Config) `./src/components/widgets/configDialouge.js` then further extend the Dialogue class (to be implemented), by offering special content formatting and positioning for form elements.

## Window

Window provides a basic floating box with Event Listener that will close the it if you click anywhere outside of it. (TODO: close on key stroke) Windows accept HTML content. Windows will automatically reposition if a chart resize crops or hides them.

TODO: Window API documentation

## Dialogue

A dialogue in essence is floating box layer which presents information over the chart content. By default, the dialogue will also inherit the click outside of behavior from Window that closes it.

Dialogues have the following configurable properties with some being optional.

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
| offFocus   | number  | no       | timeout before close on click outside is active.                                                            |

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

# Config Dialogue

**TO BE IMPLEMENTED**

Building upon the ancestor classes of Window and Dialogue, Config offers special formatting and content handling, specifically for forms.

The class allows for overriding the default handling of the form via a custom callback.

Config events can also be subscribed for further customization of the Config behaviour.
