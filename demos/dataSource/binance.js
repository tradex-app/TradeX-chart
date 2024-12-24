export function livePrice_Binance(
  chart,
  symbol = "btcusdt",
  interval = "1m",
  onTick
) {
  if (typeof interval === "number") {
    interval = chart.timeData.ms2Interval(interval);
  }
  // var ws = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@aggTrade");
  var ws = new WebSocket(
    `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_${interval}`
  );

  ws.onmessage = (evt) => onWSMessage.call(this, evt, chart, onTick);
}

function onWSMessage(evt, chart, onTick) {
  let msg = evt.data;
  let obj = JSON.parse(msg);
  if (typeof obj === "object" && obj.k) {
    /* KLine data passed to the chart
        {
          t: timeStamp // timestamp of current candle in milliseconds
          o: open  // open price
          h: high  // high price
          l. low // low price
          c: close  // close price
          v: volume // volume
        }
      */
    // console.log(obj.k)
    if (!!onTick) onTick(obj.k);
    else chart.stream.onTick(obj.k);
  }
}

let waiting = false;

export function kline_Binance(
  chart,
  symbol = "BTCUSDT",
  start,
  limit = 100,
  interval = "1m"
) {
  symbol = symbol.toUpperCase();
  if (!waiting) {
    waiting = true;
    const url = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&startTime=${start}&limit=${limit}`;
    try {
      fetch(url)
        .then((r) => r.json())
        .then((d) => {
          console.log(d);
          chart.mergeData({ ohlcv: d }, false, true);
          waiting = false;
        })
        .catch((e) => {
          e.text().then((eMsg) => {
            console.error(eMsg);
            waiting = false;
          });
        });
    } catch (e) {
      console.error(e);
      waiting = false;
    }
  }
}

function kline_Binance2(
  chart,
  symbol = "BTCUSDT",
  start,
  limit = 100,
  interval = "1m"
) {
  symbol = symbol.toUpperCase();
  if (symbol == "testusdt") symbol = "BTCUSDT";
  if (typeof interval == "number")
    interval = chart.timeData.ms2Interval(interval);
  const url = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&startTime=${start}&limit=${limit}`;
  return new Promise((resolve, reject) => {
    try {
      fetch(url)
        .then((r) => r.json())
        .then((d) => {
          console.log(d);
          resolve({ ohlcv: d });
        })
        .catch((e) => {
          console.error(e);
          reject(e);
        });
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
}

function onRangeLimit(e, x="past") {
  let start;
  const range = e.chart.range
  const limit = 100
  const interval = range.intervalStr
  if (x == "past") {
    start = range.timeStart - (range.interval * limit)
  }
  if (x == "future") {
    start = range.timeEnd
  }
  kline_Binance(e.chart, undefined, start, limit, interval)
}

export function onRangeLimit2(e, sym, tf, ts, x = "past") {
  let start;
  const range = e.chart.range;
  const limit = 100;
  const interval = range.intervalStr;
  if (x == "future") {
    start = ts;
  } else {
    start = ts - tf * limit;
  }

  return kline_Binance2(e.chart, sym, start, limit, tf);
}
