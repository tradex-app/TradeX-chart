// form-elements.js

import { dashedPatterns } from "../../../definitions/style"
import { limit } from "../../../utils/number"
import { isArray, isBoolean, isNumber, isObject, isString } from "../../../utils/typeChecks"
import { provideEventListeners } from "./listeners"
import { InputPeriodEnable } from "../../overlays/indicator"
import { diff } from "../../../utils/utilities"


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

export function configInputObject(input, i, v) {
  if (i instanceof InputPeriodEnable) {

    input[i.period] = configField(i.period, i.period, "number", v, v)

    input.$function = function (el) {
      const elm = el.querySelector(`#${i.period}`)
      const checkBox = document.createElement("input")
            checkBox.id = `"enable${i.period}`
            checkBox.checked = i.enable
            checkBox.addEventListener("change", (e) => {
              if (e.currentTarget.checked) {
                console.log(`enable ${e.currentTarget.id}`)
              }
              else {
                console.log(`disable ${e.currentTarget.id}`)
              }
            })
      if (!!elm) {
        elm.insertAdjacentElement("beforebegin", checkBox)
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

export function validateInputs(d, s, api) {
  const input = {...d.input, ...s}
  delete input.style
  d.input = input
  for (let def of api.options) {
    if (!(def.name in d.input))
      d.input[def.name] = api.options[def.name]
  }
  validate(d.input, api.options, d)
}

export function validate(src, def, d) {
  let dm = d.meta
  let val;
  for (let f of def) {
    val =  (typeof src[f.name] == "object") ? 
      src[f.name]?.value :
      src[f.name]
    // if input value is type is incorrect, use the default
    src[f.name] = (typeof val !== f.type) ?
      f.defaultValue : val

    if ("range" in def)
      src[f.name] = limit(src[f.name], f.range.min, f.range.max)

    const n = configField(
      f?.name,
      f?.displayName,
      f?.type,
      src[f.name],    // value
      f?.defaultValue,
      f?.range?.min,
      f?.range?.max,
      undefined,
      f?.hint,
    )

    dm.input[f.name] = {...n, ...dm.input[f.name]}

    // if (f.name in d.input)
    //   dm.input[f.name].value = d.input[f.name]
  }
}

/**
* if definition output is empty build it from api
* ensure all output are arrays
* @param {object} d 
* @param {object} api 
* @param {array} oo 
*/
export function validateOutputs(d, api, oo) {
 // set up all defaults to be arrays
 if (Object.keys(d.output).length == 0) {
   for (let o of api.outputs) {
     d.output[o.name] = []
   }
 }
 // default output order
 let doo = true
 if (Object.keys(d.meta.output).length > 0) {
   doo = false
   for (let o of d.meta.output) {
     if (isObject(o))
       oo.push(o.name)
   }
 }

 // ensure all definition outputs are arrays
 for (let o in d.output) {
   if (!isArray(d.output[o])) 
     d.output[o] = []
   if (doo)
     oo.push(o)
 }
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

