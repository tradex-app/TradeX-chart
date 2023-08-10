import * as talib from './node_modules/talib-web/lib/index.esm'
import data from './data/1minute.js'

const wasm = "./node_modules/talib-web/lib/talib.wasm"

/**
 * main
 * @async
 */
async function main() {
  try {
    await talib.init(wasm);
    const inReal = []

    let i = 0
    for (let v of data.ohlcv) {
      if (i++ > 9)
       inReal.push(v[4])
    }

    const result = talib.BBANDS({inReal: inReal, timePeriod: 20})

    document.write(JSON.stringify(result))

  } catch (e) {
    console.error(e)
  }
};

await main()
