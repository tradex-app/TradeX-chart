// tools.js

import cursor from "../assets/svg/cursor.svg"
import line from "../assets/svg/line.svg"
import fibonacci from "../assets/svg/fibonacci.svg"
import range from "../assets/svg/range.svg"
import text from "../assets/svg/text.svg"
import measure from "../assets/svg/measure.svg"
import del from "../assets/svg/delete.svg"

export default [
  {
    id: "cursor",
    name: "Cursor",
    icon: cursor,
    action: () => {
      console.log("Cursor Selected")
    },
  },
  {
    id: "line",
    name: "Line",
    icon: line,
    action: () => {
      console.log("Line tool")
    },
    sub: {}
  },
  {
    id: "fibonacci",
    name: "Fibonacci",
    icon: fibonacci,
    action: () => {
      console.log("Fibonacci tool")
    },
    sub: {}
  },
  {
    id: "range",
    name: "Range",
    icon: range,
    action: () => {
      console.log("Range tool")
    },
    sub: {}
  },
  {
    id: "text",
    name: "Text",
    icon: text,
    action: () => {
      console.log("Text tool")
    },
    sub: {}
  },
  {
    id: "measure",
    name: "Measure",
    icon: measure,
    action: () => {
      console.log("Measure tool")
    },
  },
  {
    id: "delete",
    name: "Delete",
    icon: del,
    action: () => {
      console.log("Delete tool")
    },
  }
]