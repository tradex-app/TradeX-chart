// chart-trades.js
// display trades on chart

import Overlay from "./overlay"
import Trade from "../primitives/trade"
import { limit } from "../../utils/number"
import { debounce } from "../../utils/utilities"
import { isObject } from "../../utils/typeChecks"
import { HIT_DEBOUNCE } from "../../definitions/core"


const tradeConfig = {
  bounded: true,
  dragBar: false,
  closeIcon: false,
  content: "",
  styles: {
    window: {
      width: "15em",
      zindex: "10"
    },
    content: {
      overflow: "hidden",
      padding: "0 1em"
    }
  }
}


export default class chartTrades extends Overlay {

  #trade
  #trades = []
  #data
  #dialogue


  constructor(target, xAxis=false, yAxis=false, theme, parent, params) {

    super(target, xAxis, yAxis, theme, parent, params)

    this.settings = params.settings
    this.#trade = new Trade(target, theme)
    this.core.on("primary_pointerdown", this.onPrimaryPointerDown, this)
    this.#dialogue = this.core.WidgetsG.insert("Dialogue", tradeConfig)
    this.#dialogue.start()
  }

  destroy() {
    this.core.off("primary_pointerdown", this.onPrimaryPointerDown, this)
  }

  set position(p) { this.target.setPosition(p[0], p[1]) }
  get data() { return this.overlay.data }
  get settings() { return this.params.settings }
  set settings(s) { this.doSettings(s) }

  doSettings(s) {
    if (!isObject(s)) return false

    let t = this.theme.trades
    for (let e in s) {
      if (s[e] === undefined) continue
      t[e] = s[e]
    }
  }

  onPrimaryPointerDown(e) {
    if (this.core.MainPane.stateMachine.state !== "chart_pan") 
      debounce(this.isTradeSelected, HIT_DEBOUNCE, this)(e)
  }

  /**
   * Display trade info if makrer selected
   * @param {array} e - pointer event [x, y]
   * @memberof chartTrades
   */
  isTradeSelected(e) {
    const evt = e[2].domEvent.srcEvent
    // const DOM = this.chart.element.DOM
    const DOM = (evt.target || evt.srcElement).getBoundingClientRect()
    const x = evt.clientX - (DOM.right - DOM.width)
    const y = evt.clientY - DOM.top
    const k = this.hit.getIntersection(x,y)
    // do not display if...
    if (this.core.config?.trades?.display === false ||
        this.core.config?.trades?.displayInfo === false ||
        k == -1)  return

    console.log("isTradeSelected()")

    const d = this.theme.trades
    const w = limit(this.xAxis.candleW, d.iconMinDim, d.iconWidth)
    const ts = this.xAxis.pixel2T(x)
    const c = this.core.range.valueByTS(ts)
    const o = this.xAxis.scrollOffsetPx
    const iPos = this.core.dimensions

    // retrieve trade
    let tr = Object.keys(this.data)[k] * 1
    // adjust position to scroll position
    let tx = this.xAxis.xPos(ts) + o
    // negative values required as widgets start positioned below chart content
    let ty = (y - (w * 1.5)) - iPos.height
    let content = ``
    for (let t of this.data[tr]) {
      content += this.buildTradeHTML(t)
    }
    const config = {
      dimensions: {h: undefined, w: 150},
      position: {x: tx + (w / 2) + 1, y: ty},
      content: content,
      offFocus: HIT_DEBOUNCE + 1
    }
    this.core.emit("trade_selected", tr)
    this.#dialogue.open(config)
  }

  buildTradeHTML(h) {
    let c = 
    `<style>
    dt, dd {display: inline-block; font-size: 0.9em;}
    dt {min-width: 40%;}
    dd {min-width: 60%; margin: 0;}
    </style>`
    c += `<dl>`
    for (let k in h) {
      if (k == "timestamp") continue
      c += `<dt>${k}</dt><dd>${h[k]}</dd>`
    }
    c += `</dl>`
    return c
  }

  draw(range=this.core.range) {
    if (!super.mustUpdate()) return

    if (this.core.config?.trades?.display === false) return

    this.hit.clear()
    this.scene.clear()
    this.#trades.length = 0

    const offset = this.xAxis.smoothScrollOffset || 0
    const trade = {
      x: offset - this.xAxis.candleW,
      w: this.xAxis.candleW
    }

    let d = this.theme.trades
    let o = this.core.rangeScrollOffset;
    let c = range.indexStart - o
    let i = range.Length + (o * 2)
    let x, t, k;

    while(i) {
      x = range.value( c )
      t = `${x[0]}`
      k = Object.keys(this.data).indexOf(t)
      // fetch trades (if any) for timestamp
      if (k >= 0) {
        for (let tr of this.data[t]) {
          trade.x = this.xAxis.xPos(x[0]) - (this.xAxis.candleW / 2)
          trade.y = this.yAxis.yPos(x[2]) - (limit(this.xAxis.candleW, d.iconMinDim, d.iconHeight) * 1.5)
          trade.side = tr.side
          trade.key = k
          this.#trades.push(this.#trade.draw(trade))
        }
      }
      c++
      i--
    }

    super.updated()
  }
}