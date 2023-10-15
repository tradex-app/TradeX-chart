import * as talib from 'talib-web/lib/index.esm'
import data from '../../data/1minute.js'

const wasm = "../node_modules/talib-web/lib/talib.wasm"

(async () => {
  try {
    await talib.init(txCfg.wasm);
  } catch (e) {
    console.error(e)
  }
})();

const inReal = []

for (let v in data.ohlcv) {
  inReal.push(v[4])
}

const result = talib.BBANDS({inReal: inReal})

document.write(JSON.stringify(result))
