---
title: How To
description: A list of quick specific tasks.
---

Guides lead a user through a specific task they want to accomplish, often with a sequence of steps.
Writing a good guide requires thinking about what your users are trying to do.

## Chart Title

Change the title displayed top left before OHLCV

```javascript
chart.setTitle("New Title")
```

## Chart Watermark

Use a text watermark behind chart content

```javascript
chart0.config.watermark.text = "abc"
```

Use an image watermark behind chart content

```javascript
chart0.config.watermark.imgURL = "./watermark.svg"
```
This option accepts either:

* an image file URL
* a data:URL eg. ``"data:image/gif;base64,R0lGODlhCwALAIAAAAAA3pn/ZiH5BAEAAAEALAAAAAALAAsAAAIUhA+hkcuO4lmNVindo7qyrIXiGBYAOw=="``

## Further reading

- Read [about how-to guides](https://diataxis.fr/how-to-guides/) in the Diátaxis framework
