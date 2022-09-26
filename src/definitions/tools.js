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
    event: "tool_activated",
  },
  {
    id: "line",
    name: "Line",
    icon: line,
    event: "tool_activated",
    class: Line,
    sub: [
      {
        id: "ray",
        name: "Ray",
        icon: line,
        event: "tool_activated",
        class: Line,
      },
      {
        id: "hRay",
        name: "Horizontal Ray",
        icon: line,
        event: "tool_activated",
        class: Line,
      },
      {
        id: "vRay",
        name: "Vertical Ray",
        icon: line,
        event: "tool_activated",
        class: Line,
      },
    ]
  },
  {
    id: "fibonacci",
    name: "Fibonacci",
    icon: fibonacci,
    event: "tool_activated",
    class: Fibonacci,
    sub: [
      {
        id: "fib",
        name: "Not Implemented Yet",
        icon: line,
      }
    ]
  },
  {
    id: "range",
    name: "Range",
    icon: range,
    event: "tool_activated",
    class: Range,
    sub: [
      {
        id: "rng",
        name: "Not Implemented Yet",
        icon: line,
      }
    ]
  },
  {
    id: "text",
    name: "Text",
    icon: text,
    event: "tool_activated",
    class: Text,
    sub: [
      {
        id: "txt",
        name: "Not Implemented Yet",
        icon: line,
      }
    ]
  },
  {
    id: "measure",
    name: "Measure",
    icon: measure,
    event: "tool_activated",
    class: Measure,
  },
  {
    id: "delete",
    name: "Delete",
    icon: del,
    event: "tool_activated",
    class: undefined,
  }
]

export const lineConfig = {
  colour: "#8888AACC",
  lineWidth: 1
}

