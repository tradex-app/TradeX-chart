import * as talib from './node_modules/talib-web/lib/index.esm'
import data from './data/1minute.js'

const wasm = "./node_modules/talib-web/lib/talib.wasm"

/**
 * main
 * @async
 */
async function main(talib, wasm, data) {
  try {
    await talib.init(wasm);
    const inReal = []

    let i = 0
    for (let v of data.ohlcv) {
      if (i++ > 9)
       inReal.push(v[4])
    }
    console.time()
    const result = talib.BBANDS({inReal: inReal, timePeriod: 20, startIdx: 0, endIndex: 29})
    console.timeEnd()
    document.write(JSON.stringify(result))
    console.log(result)

  } catch (e) {
    console.error(e)
  }
};

(async (talib, wasm, data) => {
  await main(talib, wasm, data)
})(talib, wasm, data)



