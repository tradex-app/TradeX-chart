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

function makeRef(v, k) {
  let x = v[k]
  v.__subs__ = {}
  v.__observer__ = function (cb) { v.__subs__[k](cb) }

  v = {
    __last__: v,
    __subs__: [],
    __observer__(cb) { this.__subs__.push(cb) },

    set value(v) { 
      if (this.__last__ !== v) {
        for (let sub of this.__subs__) {
          sub(v, this.__last__)
        }
      }
      this.__last__ = v
    },
    get value() { return x }
  }
  return v
}

function reactive(v) {
  if (isObject(v)) {
    if ("__observer__" in v) return new Error ("ref() target is already reactive")
    else {
      // iterate over properties to add getters and setters
      for (let k in v) {
        if (isObject(v[k])) {
          makeRef(v, k)
        }

        v[k] = makeRef(v,k)
        watch(v[k], (newVal, oldVal) => {
          for (let sub of v.__subs__) {
            sub(newVal, oldVal)
          }
        })
      }
      v.__subs__ = []
      v.__observer__ = function (cb) { v.__subs__.push(cb) }

      return v
    }
  }
  else if (isArray(v)) {

  }
  else {
    return makeRef(v)
  }
}


/**
 * @param {*} v
 * @returns {Object}  
 */
function ref(v) {

  if (isObject(v)) {
    if ("__observer__" in v) return new Error ("ref() target is already reactive")
    else {
      return reactive(v)
    }
  }
  else if (isArray(v)) {

  }
  else {
    v = {
      __last__: v,
      __subs__: [],
      __observer__(cb) { this.__subs__.push(cb) },
  
      set value(v) { 
        if (this.__last__ !== v) {
          for (let sub of this.__subs__) {
            sub(v, this.__last__)
          }
        }
        this.__last__ = v
      },
      get value() { return x }
    }
    return v
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

let o = ref (
  {
    a: "123",
    b: "456"
  }
)
watch (o, (newVal, oldVal) => {
  console.log(`o - newVal: ${newVal}, oldVal: ${oldVal}`)
})
o.a = "abc"
