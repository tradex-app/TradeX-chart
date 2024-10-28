import { ITradeData } from '../../../types'; // 'tradex-chart';

import { sampleOHLCV, tradeData } from './PEPEUSDT';

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
