// range.js

import indicators from "../definitions/indicators"
import { DAY_MS, ms2Interval, WEEK_MS } from "../utils/time"
import { LIMITFUTURE, LIMITPAST, MINCANDLES } from "../definitions/chart"
import { isNumber } from "../utils/typeChecks"

export function getRange( allData, start=0, end=allData.chart.length-1 ) {
  let r = allData
  r.dataLength = r.data.length - 1

  // check and correct start and end argument order
  if (start > end) [start, end] = [end, start]

  // minimum range constraint
  if ((end - start) < MINCANDLES) end = start + MINCANDLES + 1

  // set out of history bounds limits
  start = (start < LIMITPAST * -1) ? LIMITPAST * -1 : start
  end = (end < (LIMITPAST * -1) + MINCANDLES) ? (LIMITPAST * -1) + MINCANDLES + 1 : end
  start = (start > r.dataLength + LIMITFUTURE - MINCANDLES) ? r.dataLength + LIMITFUTURE - MINCANDLES - 1: start
  end = (end > r.dataLength + LIMITFUTURE) ? r.dataLength + LIMITFUTURE : end
  
  r.value = (index) => { return rangeValue(r, index)}
  r.interval = r.data[1][0] - r.data[0][0]
  r.intervalStr = ms2Interval(r.interval)
  r.indexStart = start
  r.indexEnd = end
  r.Length = r.indexEnd - r.indexStart
  r.timeStart = r.value(0)[0]
  r.timeFinish = r.value(r.dataLength)[0]
  r.timeDuration = r.timeFinish - r.timeStart
  r.timeMin = r.value(r.indexStart)[0]
  r.timeMax = r.value(r.indexEnd)[0]
  r.rangeDuration = r.timeMax - r.timeMin
  r = {...r, ...maxMinPriceVol(r.data, r.indexStart, r.indexEnd)}
  r.height = r.priceMax - r.priceMin
  r.volumeHeight = r.volumeMax - r.volumeMin
  r.scale = (r.Length) / (r.dataLength)
  return r
}

export function inRange(t, range) {
  if (t >= range.timeStart && t <= range.timeFinish)
    return true
  else return false
}

export function rangeValue( range, index ) {
  // return last value as default
  if (!isNumber(index)) index = range.data.length - 1

  let v = range.data[index]
  if (v !== undefined) return v
  else {
    const len = range.data.length - 1
    v = [null, null, null, null, null, null]
    if (index < 0) {
      v[0] = range.data[0][0] + (range.interval * index)
      return v
    }
    else if (index > len) {
      v[0] = range.data[len][0] + (range.interval * (index - len))
      return v
    }
    else return null
  }
}

export function rangeOnchartValue( range, indicator, index ) {
  const len = range.onchart[indicator].length - 1
  const value = null
}

export function rangeOffchartValue( range, indicator, index ) {
}

export function rangeDatasetValue( range, indicator, index ) {
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

  let l = data.length-1
  let i = (start < 0) ? 0 : start
      i = (start >= data.length) ? l - MINCANDLES : i
  let c = (end < 0) ? MINCANDLES : end
      c = (end >= l) ? l : c
  
  // let i = start,
  //     c = end;
  let priceMin  = data[i][3]
  let priceMax  = data[i][2]
  let volumeMin = data[i][5]
  let volumeMax = data[i][5]

  while(i++ < c) {
    priceMin  = (data[i][3] < priceMin) ? data[i][3] : priceMin
    priceMax  = (data[i][2] > priceMax) ? data[i][2] : priceMax
    volumeMin = (data[i][5] < volumeMin) ? data[i][5] : volumeMin
    volumeMax = (data[i][5] > volumeMax) ? data[i][5] : volumeMax
  }

  return {
    priceMin: priceMin * 0.995,
    priceMax: priceMax * 1.005,
    volumeMin: volumeMin,
    volumeMax: volumeMax
  }
}


// Detects candles interval
export function detectInterval(ohlcv) {

  let len = Math.min(ohlcv.length - 1, 99)
  let min = Infinity
  ohlcv.slice(0, len).forEach((x, i) => {
      let d = ohlcv[i+1][0] - x[0]
      if (d === d && d < min) min = d
  })
  // This saves monthly chart from being awkward
  // if (min >= WEEK_MS * 4 && min <= DAY_MS * 30) {
  //     return DAY_MS * 31
  // }
  return min
}

