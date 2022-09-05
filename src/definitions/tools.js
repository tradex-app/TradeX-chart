// tools.js

import { cursor, line, fibonacci, range, text, measure, del } from "./icons"

import Fibonacci from "../tools/fibonacci"
import Line from "../tools/line"
import Measure from "../tools/measure"
import Range from "../tools/range"
import Text from "../tools/text"

export default [
  {
    id: "cursor",
    name: "Cursor",
    icon: cursor,
    event: "tools_cursor",
    action: (e, mediator) => {
      console.log("Cursor Selected")
    },
  },
  {
    id: "line",
    name: "Line",
    icon: line,
    event: "tools_line",
    action: (e, mediator) => {
      console.log("Line tool")
    },
    class: Line,
    sub: [
      {
        id: "ray",
        name: "Ray",
        icon: line,
        event: "tools_ray",
        action: (e, mediator) => {
          console.log("Ray Selected")
        },
        class: Line,
      },
      {
        id: "hRay",
        name: "Horizontal Ray",
        icon: line,
        event: "tools_horizonalRay",
        action: (e, mediator) => {
          console.log("Horizontal Ray Selected")
        },
        class: Line,
      },
      {
        id: "vRay",
        name: "Vertical Ray",
        icon: line,
        event: "tools_verticalRay",
        action: (e, mediator) => {
          console.log("Vertical Ray Selected")
        },
        class: Line,
      },
    ]
  },
  {
    id: "fibonacci",
    name: "Fibonacci",
    icon: fibonacci,
    event: "tools_fibonacci",
    action: (e, mediator) => {
      console.log("Fibonacci tool")
    },
    class: Fibonacci,
    sub: []
  },
  {
    id: "range",
    name: "Range",
    icon: range,
    event: "tools_range",
    action: (e, mediator) => {
      console.log("Range tool")
    },
    class: Range,
    sub: []
  },
  {
    id: "text",
    name: "Text",
    icon: text,
    event: "tools_text",
    action: (e, mediator) => {
      console.log("Text tool")
    },
    class: Text,
    sub: []
  },
  {
    id: "measure",
    name: "Measure",
    icon: measure,
    event: "tools_measure",
    action: (e, mediator) => {
      console.log("Measure tool")
    },
    class: Measure,
  },
  {
    id: "delete",
    name: "Delete",
    icon: del,
    event: "tools_delete",
    action: (e, mediator) => {
      console.log("Delete tool")
    },
    class: undefined,
  }
]