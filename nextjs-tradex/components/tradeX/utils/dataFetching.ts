import { ITradeX } from '../../../../types';

function kline_Binance(
  chart: { range?: any; timeData?: any },
  symbol: string,
  start: number,
  limit = 100,
  interval: number // '1m' TODO CHECK IF IT ACCEPtS STRING AND MS
) {
  if (typeof interval == 'number')
    interval = chart.timeData.ms2Interval(interval);
  const url = `https://api.binance.com/api/v3/klines?symbol=${symbol.toUpperCase()}&interval=${interval}&startTime=${start}&limit=${limit}`;
  return new Promise((resolve, reject) => {
    try {
      fetch(url)
        .then((r) => r.json())
        .then((d) => {
          console.log(d);
          resolve({ ohlcv: d });
          // return {ohlcv: d}
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

function onWSMessage(
  evt: { data: any },
  chart: { stream: { onTick: (arg0: any) => void } },
  onTick: (arg0: any) => void
) {
  let msg = evt.data;
  let obj = JSON.parse(msg);
  if (typeof obj === 'object' && obj.k) {
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

export function onRangeLimit(
  e: { chart: { range: any } },
  sym: string,
  tf: number,
  ts: number
) {
  const range = e.chart.range;
  const limit = 100;
  const start = ts - tf * limit;
  // const end = range.timeEnd
  const interval = range.intervalStr;
  let x = 'past';
  if (x == 'past') {
    // e.chart.progress.start()
    return kline_Binance(e.chart, sym, start, limit, tf);
  }
  if (x == 'future') {
  }
}

export function livePrice_Binance(
  chart: ITradeX,
  symbol: string,
  interval = '1m',
  onTick: any
) {
  if (typeof interval === 'number') {
    interval = chart.timeData.ms2Interval(interval);
  }
  // var ws = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@aggTrade");
  var ws = new WebSocket(
    `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_${interval}`
  );
  // @ts-ignore
  ws.onmessage = (evt) => onWSMessage.call(this, evt, chart, onTick);
}
