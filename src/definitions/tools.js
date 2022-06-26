// tools.js

import { cursor, line, fibonacci, range, text, measure, del } from "./icons"

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
    sub: [
      {
        id: "ray",
        name: "Ray",
        icon: line,
        event: "tools_ray",
        action: (e, mediator) => {
          console.log("Ray Selected")
        },
      },
      {
        id: "hRay",
        name: "HRay",
        icon: line,
        event: "tools_horizonalRay",
        action: (e, mediator) => {
          console.log("Horizontal Ray Selected")
        },
      },
      {
        id: "vRay",
        name: "VRay",
        icon: line,
        event: "tools_verticalRay",
        action: (e, mediator) => {
          console.log("Vertical Ray Selected")
        },
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
  },
  {
    id: "delete",
    name: "Delete",
    icon: del,
    event: "tools_delete",
    action: (e, mediator) => {
      console.log("Delete tool")
    },
  }
]