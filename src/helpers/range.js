// range.js

import { ms2Interval } from "../utils/time"

export function getRange( data, start=0, end=data.length-1 ) {
  let r = {}
  r.dataLen = data.length
  r.dataTimeS = data[0][0]
  r.dataTimeE = data[r.dataLen - 1][0]
  r.indexS = start
  r.indexE = end
  r.len = end - start
  r.timeS = data[r.indexS][0]
  r.timeE = data[r.indexE][0]
  r.interval = data[r.indexS+1][0] - data[r.indexS][0]
  r.intervalStr = ms2Interval(r.interval)
  r.minTime = data[r.indexS][0]
  r.maxTime = data[r.indexE-1][0]
  r = {...r, ...maxMinPriceVol(data, start, end)}
  r.scale = (r.dataLen - 1) / (r.len)
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
  if (start > end) [start, end] = [end, start]
  const l = (end > (data.length - 1)) ? data.length - 1 : end
  let i = (start < 0) ? 0 : start
  let minPrice  = data[0][3]
  let maxPrice  = data[0][2]
  let minVolume = data[0][5]
  let maxVolume = data[0][5]

  while(i < l) {
    minPrice  = (data[i][3] < minPrice) ? data[i][3] : minPrice
    maxPrice  = (data[i][2] > maxPrice) ? data[i][2] : maxPrice
    minVolume = (data[i][5] < minVolume) ? data[i][5] : minVolume
    maxVolume = (data[i][5] > maxVolume) ? data[i][5] : maxVolume
    i++
  }

  return {
    minPrice: minPrice,
    maxPrice: maxPrice,
    minVolume: minVolume,
    maxVolume: maxVolume
  }
}