import { ITradeX } from '../../../../types';

export const livePrice_Binance = (
  chart: ITradeX,
  symbol: string,
  interval: string
) => {
  const newWs = new WebSocket(
    `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_${interval}`
  );

  newWs.onmessage = (evt) => {
    const msg = evt.data;
    const obj = JSON.parse(msg);

    if (obj && obj.k) {
      const filteredData = {
        t: obj.k.t, // timestamp
        o: obj.k.o, // open price
        h: obj.k.h, // high price
        l: obj.k.l, // low price
        c: obj.k.c, // close price
        v: obj.k.v // volume
      };
      // console.log(filteredData)
      chart?.stream?.onTick(filteredData);
    }
  };

  newWs.onopen = () => {
    console.log('WebSocket connection opened');
    chart?.stream?.start();
  };

  newWs.onerror = (error) => {
    console.error('WebSocket error:', error);
  };

  newWs.onclose = () => {
    console.log('WebSocket connection closed');
  };

  return newWs;
};
