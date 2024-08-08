import * as talib from './node_modules/talib-web/lib/index.esm'
import data from './data/1minute.js'
import { isPromise } from './src/utils/typeChecks';

const wasm = "./node_modules/talib-web/lib/talib.wasm"

const obj = {
  "isPrimary": false,
  "timePeriod": 8,
  "inReal": [
    4079.63478779,
    4033.5,
    4055.6,
    4059.1719252,
    4060,
    4049.2,
    4089.6691106,
    4073.2,
    4049.7,
    4042.1554296,
    4031.3,
    4005,
    4022.7,
    4039.5,
    4052
  ],
  "open": [
    4239.4,
    4082.2,
    4035.6,
    4055.6,
    4059.1,
    4060.5,
    4049.2,
    4089.9,
    4073.7,
    4049.9,
    4042.1,
    4031.3,
    4005,
    4022.8,
    4038.5
  ],
  "high": [
    4239.6,
    4082.2,
    4072.78348726,
    4100,
    4076.6,
    4060.5,
    4092.7,
    4098.6,
    4084.3,
    4074.5,
    4058.2,
    4054.8,
    4026.5,
    4065,
    4065
  ],
  "low": [
    4079.6,
    4020.2,
    3965,
    4035,
    4014.1,
    3987.2,
    4035,
    4060,
    4045.3,
    4041,
    4025,
    3953.5,
    3953.6,
    4018.9,
    4010.1
  ],
  "close": [
    4079.63478779,
    4033.5,
    4055.6,
    4059.1719252,
    4060,
    4049.2,
    4089.6691106,
    4073.2,
    4049.7,
    4042.1554296,
    4031.3,
    4005,
    4022.7,
    4039.5,
    4052
  ],
  "volume": [
    2993.45281556,
    3216.95571165,
    2157.50135341,
    1660.6115119,
    1070.09946267,
    1530.46774287,
    922.84509291,
    793.81081878,
    382.60686566,
    587.91082169,
    399.88361961,
    1462.60523159,
    818.53015592,
    971.06384284,
    726.79477438
  ]
}

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


    // obj.low = low
    // obj.high = high
    // obj.close = close
    const result2 = talib.ADX(obj)

    document.write(JSON.stringify(result2))


  } catch (e) {
    console.error(e)
  }
};

(async (talib, wasm, data) => {
  await main(talib, wasm, data)
})(talib, wasm, data)

