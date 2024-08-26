import { ITradeData } from 'tradex-chart';
import { sampleOHLCV, tradeData } from './PEPEUSDT';

const hasEnvVar = process.env.NEXT_PUBLIC_TX_BASE_URL
  ? process.env.NEXT_PUBLIC_TX_BASE_URL?.length > 0
  : false;

export const fetchOHLCVData = async ({
  selectedInterval,
  ticker
}: {
  selectedInterval: string;
  ticker: string;
}) => {
  try {
    console.log('fetching ohlcv data', selectedInterval, ticker);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return sampleOHLCV as number[][];
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
