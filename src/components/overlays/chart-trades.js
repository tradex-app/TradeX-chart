// chart-trades.js
// display trades on chart

import Overlay from "./overlay"
import Trade from "../primitives/trade"
import State from "../../state/chart-state"
import { limit } from "../../utils/number"
import { debounce } from "../../utils/utilities"
import { isObject } from "../../utils/typeChecks"
import { HIT_DEBOUNCE } from "../../definitions/core"
import { isValidTimestamp } from "../../utils/time"
import { WinState } from "../widgets/window"


const tradeDialogue = {
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
  #trades
  #data
  #dialogue
  #currentSelected
  #lastSelected


  constructor(target, xAxis=false, yAxis=false, theme, parent, params) {

    super(target, xAxis, yAxis, theme, parent, params)

    this.settings = params.settings
    State.importData("trades", this.data, this.state, this.state.time.timeFrame)
    this.#trade = new Trade(target, theme)
    this.core.on("chart_primaryPointerDown", this.onPrimaryPointerDown, this)
    tradeDialogue.parent = this
    this.#dialogue = this.core.WidgetsG.insert("Dialogue", tradeDialogue)
    this.#dialogue.start()
  }

  destroy() {
    this.core.off("chart_primaryPointerDown", this.onPrimaryPointerDown, this)
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
        k == -1) {
          this.#dialogue.close()
          return
        }

    const d = this.theme.trades
    const w = limit(this.xAxis.candleW, d.iconMinDim, d.iconWidth)
    const ts = this.xAxis.pixel2T(x)
    const c = this.core.range.valueByTS(ts)
    const o = this.xAxis.scrollOffsetPx
    const iPos = this.core.dimensions

    // retrieve trade
    let tr = this.#trades[k].trade.entry
    // adjust position to scroll position
    let tx = this.xAxis.xPos(ts) + o
    // negative values required as widgets start positioned below chart content
    let ty = (y - (w * 1.5)) - iPos.height
    let content = this.buildTradeHTML(tr)
    const config = {
      dimensions: {h: undefined, w: 150},
      position: {x: tx + (w / 2) + 1, y: ty},
      content: content,
      offFocus: HIT_DEBOUNCE + 1
    }
    this.#lastSelected = this.#currentSelected
    this.#currentSelected = tr
    this.core.emit("trade_selected", tr)

    if (this.#lastSelected === this.#currentSelected &&
        this.#dialogue.state === WinState.closed)
      this.#dialogue.open(config)
    else
    if (this.#lastSelected !== this.#currentSelected) {
      this.#dialogue.close()
      this.#dialogue.open(config)
    }
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

  canTradesDraw() {
    if (!super.mustUpdate() ||
        !isObject(this.data) ||
        Object.keys(this.data).length == 0 ||
        this.core.config?.events?.display === false
        ) return false
    else return true
  }

  draw(range=this.core.range) {
    if (!this.canTradesDraw()) return

    this.hit.clear()
    this.scene.clear()
    this.#trades = []

    const w = this.xAxis.candleW
    const offset = this.xAxis.smoothScrollOffset || 0
    const tradeObj = {
      x: offset - w,
      w: w
    }

    let d = this.theme.trades
    let h = limit(w, d.iconMinDim, d.iconHeight)
    let o = this.core.rangeScrollOffset;
    let c = range.indexStart - o
    let i = range.Length + (o * 2)
    let j = 0
    let x, t, k;
    let yb, ys;
    let hit, trade;

    while(i) {
      x = range.value( c )
      t = `${x[0]}`
      k = Object.keys(this.data).indexOf(t)
      // fetch trades (if any) for timestamp
      if (k >= 0) {
        yb = this.yAxis.yPos(x[3]) + (limit(w, d.iconMinDim, d.iconHeight) * 0.5)
        ys = this.yAxis.yPos(x[2]) - (limit(w, d.iconMinDim, d.iconHeight) * 1.5)
        // loop over trade entries for timestamp (candle)
        for (let tr of this.data[t]) {
          trade = {...tradeObj}
          trade.x = this.xAxis.xPos(x[0]) - (w / 2)
          trade.entry = tr
          trade.side = tr.side
          trade.key = j
          trade.y = (tr.side === "buy") ? yb : ys
          hit = this.#trade.draw(trade)
          this.#trades[j] = {
            key: j,
            trade,
            hit
          }
          j++
          if (tr.side === "buy") yb += h
          else ys -= h
        }
      }
      c++
      i--
    }

    super.updated()
  }
}
