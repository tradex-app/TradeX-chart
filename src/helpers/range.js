// range.js

import { ms2Interval } from "../utils/time"

export function getRange( data, start=0, end=data.length-1 ) {
  let r = {}
  if (start > end) [start, end] = [end, start]
  r.data = data
  r.dataLength = (end > (data.length - 1)) ? data.length - 1 : end
  r.indexStart = (start < 0) ? 0 : start
  r.indexEnd = (end > (data.length - 1)) ? data.length - 1 : end
  r.Length = r.indexEnd - r.indexStart
  r.timeStart = data[0][0]
  r.timeFinish = data[r.dataLength - 1][0]
  r.timeMin = data[r.indexStart][0]
  r.timeMax = data[r.indexEnd][0]
  r.interval = data[r.indexStart+1][0] - data[r.indexStart][0]
  r.intervalStr = ms2Interval(r.interval)
  r = {...r, ...maxMinPriceVol(data, start, end)}
  r.height = r.priceMax - r.priceMin
  r.volumeHeight = r.volumeMax - r.volumeMin
  r.scale = (r.dataLength - 1) / (r.Length)
  return r
}

/**
 * Find price maximum and minimum, volume maximum and minimum
 *
 * @export
 * @param {array} data
 * @param {number} [start=0]
 * @param {number} [end=data.length-1]
 * @return {object}  
 */
export function maxMinPriceVol( data, start=0, end=data.length-1 ) {
  let i = start,
      l = end;
  let priceMin  = data[0][3]
  let priceMax  = data[0][2]
  let volumeMin = data[0][5]
  let volumeMax = data[0][5]

  while(i < l) {
    priceMin  = (data[i][3] < priceMin) ? data[i][3] : priceMin
    priceMax  = (data[i][2] > priceMax) ? data[i][2] : priceMax
    volumeMin = (data[i][5] < volumeMin) ? data[i][5] : volumeMin
    volumeMax = (data[i][5] > volumeMax) ? data[i][5] : volumeMax
    i++
  }

  return {
    priceMin: priceMin,
    priceMax: priceMax,
    volumeMin: volumeMin,
    volumeMax: volumeMax
  }
}