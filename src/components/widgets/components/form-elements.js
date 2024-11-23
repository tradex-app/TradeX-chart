// form-elements.js

import { dashedPatterns } from "../../../definitions/style"
import { limit } from "../../../utils/number"
import { isArray, isNumber, isObject } from "../../../utils/typeChecks"
import { provideEventListeners } from "./listeners"


export function populateMetaInputs(def) {
  let input = def.input
  let metaIn = def.meta.input
  for (let i in metaIn) {
    metaIn[i].value = input[i]
  }
}

/**
 * ensure all tab fields provide data-oldval, data-default
 * @export
 * @param {Object} entries
 */
export function dataOldDefault(entries) {

  if (isArray(entries)) {
    for (let entry of entries) {
      dataOldDefault(entry)
    }
  }

  else if (isObject(entries)) {
    for (let field in entries) {

      let f = (isObject(entries[field])) ? entries[field] : entries
      let keys = Object.keys(f)

      if (!keys.includes("data-oldval"))
        f["data-oldval"] = f?.value
      if (!keys.includes("data-default")) {
        f["data-default"] = (!!f?.default) ? 
          f?.default :
          f?.value
      }
    }
  }
}

export function outputValueNumber(i, v, change) {
  let listeners = [change]
  return {
    type: "number",
    min: `0`,
    d: v,
    listeners,
    fn: (el) => {
      provideEventListeners(`#${i}`, listeners)(el)
    }
  }
}

export function configField(i, label, type, value, defaultValue, min, max, fn, title, options) {
  defaultValue = defaultValue || value
  title = title || label
  if (isNumber(min) && isNumber(max) && min > max) {
    [max, min] = [min, max]
  }
  else if (isNumber(min) && isNumber(max)) {
    value = limit(value, min, max)
  }

  let f = {
    entry: i,
    label,
    type,
    value,
    default: defaultValue,
    "data-oldval": value, 
    "data-default": defaultValue, 
    $function: fn,
    title
  }

  if (isNumber(min)) f.min = min
  if (isNumber(max)) f.max = max
  if (isObject(options) && Object.keys(options).length) f.options = options
  return f
}


export function configInputNumber(input, i, v) {
  input[i] = configField(i, i, "number", v, v)
  input[i].$function = provideEventListeners(
    `#${i}`, 
  [{
    event: "change", 
    fn: (e)=>{
      // console.log(`#${i} = ${e.target.value}`)
    }
  }]
)
}

export function fieldTargetUpdate(target, value, style) {
  for (let e in style ) {
    for (let o in style[e]) {
      if (isObject(style[e][o]) && style[e][o].entry == target) {
        style[e][o]["data-oldval"] = style[e][o].value
        style[e][o].value = value
      }
    }
  }
}

export function defaultOutputField({id, label, value, type, min, max, defaultValue, fns}) {

  let c, fn, listeners, options;
  const {change, provideInputColour} = {...fns}

  switch(type) {
    case "number":
      listeners = [change]
      fn = (el) => {
        provideEventListeners(`#${id}`, listeners)(el)
      }
      break;

    case "color":
      listeners = [change, over, out]
      fn = (el) => {
        provideInputColour(el, `#${id}`)
        provideEventListeners(`#${id}`, listeners)(el)
      }
      type = "text"
      break;

    case "dash":
      listeners = [change]
      fn = (el) => {
        provideEventListeners(`#${id}`, listeners)(el)
      }
      type = "select"
      let patterns = {}
      for (let d in dashedPatterns) {
        patterns[d] = dashedPatterns[d].toString()
      }
      options = patterns
      break;
  }
  return configField(id, label, type, value, value, min, max, fn, label, options)
}

const over = {
  event: "pointerover",
  fn: (e) => {
    e.target.style.border = "1px solid #f00;"
  }
}
const out = {
  event: "pointerout",
  fn: (e) => {
    e.target.style.border = "none;"
  }
}

