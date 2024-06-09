import * as talib from './node_modules/talib-web/lib/index.esm'
import data from './data/1minute.js'
import talibParams from './talib-params.js';

const wasm = "./node_modules/talib-web/lib/talib.wasm"

/**
 * main
 * @async
 */
async function main(talib, wasm, data) {
  try {
    await talib.init(wasm);
    const inReal = []
    const period = 12
    const fastD_Period = 20
    const fastK_Period = 20

    let i = 0
    for (let v of data.ohlcv) {
      // if (i++ < period+((fastD_Period+fastK_Period)*2))
      if (i++ < 52) // data.ohlcv.length)
       inReal.push(v[4])
    }
    console.time()
    // const result = talib.BBANDS({inReal: inReal, timePeriod: 20, startIdx: 0, endIndex: 29})
    // const p = {inReal: inReal, timePeriod: 20, startIdx: 0, endIndex: 29}
    // const p = {inReal, timePeriod: period, fastK_Period: 5}
    const p = {
      inReal,       
      fastPeriod: 12,
      slowPeriod: 26,
      signalPeriod: 9,
      startIdx:10
    }

    const params = talibParams

    console.log(p.inReal)
    console.log(talibParams.inReal)

    // p.inReal = talibParams.inReal
    // talibParams.inReal = p.inReal


    const result = talib.MACD(p)
    // const result = talib.RSI(p)



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



