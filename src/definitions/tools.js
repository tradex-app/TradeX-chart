// tools.js

import { cursor, line, fibonacci, range, text, measure, del } from "./icons"

export default [
  {
    id: "cursor",
    name: "Cursor",
    icon: cursor,
    action: (e, mediator) => {
      console.log("Cursor Selected")
    },
  },
  {
    id: "line",
    name: "Line",
    icon: line,
    action: (e, mediator) => {
      console.log("Line tool")
    },
    sub: {}
  },
  {
    id: "fibonacci",
    name: "Fibonacci",
    icon: fibonacci,
    action: (e, mediator) => {
      console.log("Fibonacci tool")
    },
    sub: {}
  },
  {
    id: "range",
    name: "Range",
    icon: range,
    action: (e, mediator) => {
      console.log("Range tool")
    },
    sub: {}
  },
  {
    id: "text",
    name: "Text",
    icon: text,
    action: (e, mediator) => {
      console.log("Text tool")
    },
    sub: {}
  },
  {
    id: "measure",
    name: "Measure",
    icon: measure,
    action: (e, mediator) => {
      console.log("Measure tool")
    },
  },
  {
    id: "delete",
    name: "Delete",
    icon: del,
    action: (e, mediator) => {
      console.log("Delete tool")
    },
  }
]