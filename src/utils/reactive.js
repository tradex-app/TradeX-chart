import { isArray, isBoolean, isNumber, isObject, isString } from './typeChecks'

export function ref(v) {
  let x = v
  const subs = []

  if (isObject(v)) {
    if ("__observer__" in v) return new Error ("ref() target is already reactive")
    else {
      // iterate over properties and add getters and setters
      for (let p in v) {
        let _ref = ref(p)
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
      __observer__(cb) { this.subs.push(cb) }
    }
    return v
  }
}

export function watch(v, cb) {
  if (isObject(v) && "__observer__" in v && 
      typeof v.__observer__ === "function") {
    v.__observer__(cb)
  }
  else
    throw new Error("watch() requires a reactive value")
}
