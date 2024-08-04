import * as talib from './node_modules/talib-web/lib/index.esm'
import data from './data/1minute.js'
import { isPromise } from './src/utils/typeChecks';

const wasm = "./node_modules/talib-web/lib/talib.wasm"

async function main(talib, wasm, data) {

  try {

    // const wait = function(v, cb) {
    //   if (!isPromise(v)) cb(v)
    //   set
    // }

    // const ta = talib.init(wasm);

    // if(isPromise(ta)) console.log("ta === promise")

    await talib.init(wasm);

    const high = []
    const low = []
    const close = []

    let i = 0
    for (let v of data.ohlcv) {
      if (i++ > 9) {
        high.push(v[2])
        low.push(v[3])
        close.push(v[4])
      }
    }

    const result = talib.ADX({high, low, close})

    document.write(JSON.stringify(result))

  } catch (e) {
    console.error(e)
  }
};

(async (talib, wasm, data) => {
  await main(talib, wasm, data)
})(talib, wasm, data)

