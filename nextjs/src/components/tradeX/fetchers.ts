import { apiFe } from "../../api/base";
import { FACTOR, LIMIT } from "./utils";

export const fetchAvailableTimeframes = async ({
  tokenId,
}: {
  tokenId: number;
}) => {
  try {
    const { data } = await apiFe.get(
      `/ohlcv/available-timeframes?coin_id=${tokenId}`
    );

    return data;
  } catch (err) {
    console.error("Something went wrong. Try again later");
    return [];
  }
};

export const fetchOHLCVData = async ({
  end,
  resolution,
  tokenId,
  first,
  base,
}: {
  end: Date;
  resolution: string;
  tokenId: number;
  first: boolean;
  base?: number;
}) => {
  let factor = FACTOR[resolution];

  if (resolution === "1m" && first) {
    factor *= 6;
  }

  if (resolution === "5m" && first) {
    factor *= 4;
  }

  const start = Math.floor((end.getTime() - factor) / 1000);

  let url = `/ohlcv?target_cc_id=${tokenId}&start=${start}&end=${Math.floor(
    end.getTime() / 1000
  )}&resolution=${resolution}&source=1&limit=${LIMIT}&response_format=array`;

  if (base) url += `&base_cc_id=${base}`;
  // 109151
  try {
    const response = await apiFe.get(url);

    if (response.status === 200) {
      const data =
        response.data
          .map(([timestamp, open, high, low, close, volume]) => [
            timestamp * 1000,
            open,
            high,
            low,
            close,
            volume,
          ])
          .reverse() ?? [];
      console.log(data)
      return data;
    }
  } catch (error) {
    console.error("Something went wrong. Try again later");
    return [];
  }
};
