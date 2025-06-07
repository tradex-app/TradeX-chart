(input) => {
  if (typeof input === "object") {
    if (input.func === "init") {
      lib.talib = input.talib
      lib.wasm = input.wasm
      lib.promise = lib.talib.init(lib.wasm)
      lib.promise.then(
        () => { lib.ready = true },
        () => { lib.ready = false }
      )
    }
  }
  else if (lib.ready && input.func in lib.talib) {
    return lib.talib[input.func](input.params)
  }
  else return false
}
const lib = {ready: false}