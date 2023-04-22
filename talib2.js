import * as talib from './node_modules/talib-web/lib/index.esm'
import data from './data/1minute.js'
import { isPromise } from './src/utils/typeChecks';

const wasm = "./node_modules/talib-web/lib/talib.wasm"

// async function main() {
//   try {

    // const wait = function(v, cb) {
    //   if (!isPromise(v)) cb(v)
    //   set
    // }

    const ta = talib.init(wasm);

    if(isPromise(ta)) console.log("ta === promise")

    const inReal = []

    let i = 0
    for (let v of data.ohlcv) {
      if (i++ > 9)
       inReal.push(v[4])
    }

    const result = talib.BBANDS({inReal: inReal, timePeriod: 20})

    document.write(JSON.stringify(result))

  // } catch (e) {
  //   console.error(e)
  // }
// };

await main()
