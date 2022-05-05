// import { ref, watch } from '../src/utils/reactive.mjs'
// const { ref, watch } = require("../src/utils/reactive")

function isArray (value) {
  return Array.isArray(value)
}

function isObject (value) {
  return (
  typeof value === 'object' &&
  !Array.isArray(value) &&
  value !== null)
}

function ref(v) {
  let x = v
  // const subs = []

  const makeRef = (v) => {
    v = {
      set value(v) { 
        if (x !== v) {
          for (let sub of this.__subs__) {
            sub(v, x)
          }
        }
        x = v
      },
      get value() { return x },

      __subs__: [],
      __observer__(cb) { this.__subs__.push(cb) }
    }
    return v
  }

  if (isObject(v)) {
    if ("__observer__" in v) return new Error ("ref() target is already reactive")
    else {
      // iterate over properties and add getters and setters
      for (p in v) {
        let _ref = ref(p)
        _ref.__subs__ = []
        _ref.__observer__ = (cb) => { subs.push(cb) }
        watch(_ref, (newVal, oldVal) => {

        })
      }
      return v
    }
  }
  else if (isArray(v)) {

  }
  else {
    return makeRef(v)
  }
}

function watch(v, cb) {
  if (isObject(v) && "__observer__" in v && typeof v.__observer__ === "function") {
    v.__observer__(cb)
  }
  else
    throw new Error("watch() requires a reactive value")
}

// ----------------------------------

let y = ref("abc")
watch(y, (newVal, oldVal) => {
  console.log(`y - newVal: ${newVal}, oldVal: ${oldVal}`)
})
y.value = "def"

let z = ref("xyz")
watch(z, (newVal, oldVal) => {
  console.log(`z - newVal: ${newVal}, oldVal: ${oldVal}`)
})
z.value = "hij"

let o = {
  a: "123",
  b: "456"
}
watch (0, (newVal, oldVal) => {
  console.log(`z - newVal: ${newVal}, oldVal: ${oldVal}`)
})
o.a = "abc"
