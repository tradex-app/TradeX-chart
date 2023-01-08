// demo.js

export function internals() {
  const data = {}
  const tx = chart.Timeline.xAxis

  data.rangeLength = [`range.length:`,`${tx.range.Length}`]
  data.rangeIntervalStr = [`range.intervalStr:`,`${tx.range.intervalStr}`]
  data.rangeStart = ["range.indexStart: ", tx.indexStart]
  data.rangeEnd = ["range.indexEnd: ", tx.indexEnd]
  data.rangeStartTS = ["range.indexStart TS: ", new Date(tx.range.value(tx.indexStart)[0])]
  data.rangeEndTS = ["range.indexEnd TS: ", new Date(tx.range.value(tx.indexEnd)[0])]
  data.scrollPos = ["scrollPos:", chart.scrollPos]
  data.bufferPx = ["bufferPx:", chart.bufferPx]
  data.gradsTimeSpan = ["grads.timeSpan: ", tx.xAxisGrads.timeSpan]
  data.gradsUnits = []
  for (let u in tx.xAxisGrads.units) {
    if (tx.xAxisGrads.units[u] !== 0)
      data.gradsUnits.push(`grads.units: ${u}: ${tx.xAxisGrads.units[u]}, `)
  }
  
  data.mouseXPos = ["mouseXPos:", chart.mousePos.x]
  data.mouseRangePos = ["xPos2Index:", chart.Timeline.xPos2Index(chart.mousePos.x)]
  data.candleW = ["candleW:", chart.candleW]
  data.onChartW = ["onChartW:", chart.Chart.width]
  data.onChartLayerW = ["onChartLayerW:", chart.Chart.layerWidth]
  data.onChartViewportW = ["onChartViewportW:", chart.Chart.graph.viewport.width]
  data.candlesOnLayer = ["candlesOnLayer:", chart.candlesOnLayer]

  return data
}
