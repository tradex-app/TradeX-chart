import { ITradeData, ITradeX } from '../../../types'; // import from 'tradex-chart';
import { sampleOHLCV, tradeData } from './PEPEUSDT';

const hasEnvVar = process.env.NEXT_PUBLIC_TX_BASE_URL
  ? process.env.NEXT_PUBLIC_TX_BASE_URL?.length > 0
  : false;

export const fetchOHLCVData = async (
  chart: ITradeX,
  start: number,
  limit = 100,
  symbol: string,
  selectedInterval: string,
  isLoading: boolean
) => {
  try {
    if (isLoading || !chart) return;
    const url = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${selectedInterval}&startTime=${start}&limit=${limit}`;

    const date = new Date(start).toLocaleString();
    console.log('Symbol', symbol);
    console.log('Selected Interval', selectedInterval);
    console.log('Start', date);
    console.log('Limit', limit);

    try {
      fetch(url)
        .then((r) => r.json())
        .then((d) => {
          // @ts-ignore
          chart.mergeData({ ohlcv: d });
          console.log('End', new Date(d[d.length - 1][0]).toLocaleString());
        });
    } catch (e) {
      console.error(e);
    }
  } catch (error) {
    console.error('Error fetching ohlcv data:', error);
  }
};

export const fetchTXData = async ({
  tf,
  token,
  to
}: {
  tf: string;
  token: string;
  to: number;
}) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2500));
    return tradeData as ITradeData[];
  } catch (error) {
    console.error('Error fetching ohlcv data:', error);
  }
};

function kline_Binance() {}
