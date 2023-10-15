// chart-newsEvents.js
// display news/events on chart

import Overlay from "./overlay"
import NewsEvent from "../primitives/newsEvent"
import { limit } from "../../utils/number"
import { debounce } from "../../utils/utilities"
import { isString } from "../../utils/typeChecks"

const newsConfig = {
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


export default class chartNewsEvents extends Overlay {

  #event
  #events = []
  #dialogue
  #debounce = (e) => debounce(this.isNewsEventSelected, 100, this)

  constructor(target, xAxis=false, yAxis=false, theme, parent, params) {

    super(target, xAxis, yAxis, theme, parent, params)

    this.#event = new NewsEvent(target, theme)
    this.emit()
    this.core.on("primary_pointerdown", debounce(this.isNewsEventSelected, 200, this), this)
    this.#dialogue = this.core.WidgetsG.insert("Dialogue", newsConfig)
    this.#dialogue.start()
  }

  destroy() {
    this.core.off("primary_pointerdown", this.#debounce)
  }

  set position(p) { this.target.setPosition(p[0], p[1]) }
  get data() { return this.overlay.data }

  isNewsEventSelected(e) {
    const x = e[0]
    const y = e[1]
    const k = this.hit.getIntersection(x,y)

    if (this.core.config?.events?.display === false ||
        this.core.config?.events?.displayInfo === false ||
        k == -1)  return

    const d = this.theme.events
    const w = limit(this.xAxis.candleW, d.iconMinDim, d.iconHeight)
    const ts = this.xAxis.pixel2T(x)
    const o = this.xAxis.scrollOffsetPx

    let tr = Object.keys(this.data)[k] * 1
    let tx = this.xAxis.xPos(ts) + o
    let ty = this.scene.height - (limit(this.xAxis.candleW, d.iconMinDim, d.iconHeight) * 1.5)
    let content = ``
    for (let t of this.data[tr]) {
      content += this.buildNewsEventHTML(t)
    }
    const config = {
      dimensions: {h: undefined, w: 150},
      position: {x: tx + (w / 2) + 1, y: ty, relativeY: "bottom"},
      content: content,
    }
    this.core.emit("event_selected", tr)
    this.#dialogue.open(config)
  }

  buildNewsEventHTML(h) {
    let t = h?.title
    let c = 
    `<style>
    h1, p {display: inline-block; font-size: 0.9em;
    max-width: 98%;
    </style>`
    if (isString(h?.url))
      t = `<a href="${h?.url}" target="${h?.target}">${t}</a>`
    c += `<h1>${t}</h1>`
    c += `<p>${h?.content}</p>`
    return c
  }

  draw(range=this.core.range) {
    if (this.core.config?.events?.display === false) return

    this.hit.clear()
    this.scene.clear()
    this.#events.length = 0

    const offset = this.xAxis.smoothScrollOffset || 0
    const event = {
      x: offset - this.xAxis.candleW,
      w: this.xAxis.candleW
    }

    let d = this.theme.events
    let o = this.core.rangeScrollOffset;
    let c = range.indexStart - o
    let i = range.Length + (o * 2)
    let x, t, k;

    while(i) {
      x = range.value( c )
      t = `${x[0]}`
      k = Object.keys(this.data).indexOf(t)
      // fetch events (if any) for timestamp
      if (k >= 0) {
        for (let tr of this.data[t]) {
          event.x = this.xAxis.xPos(x[0]) - (this.xAxis.candleW / 2)
          event.y = this.scene.height - (limit(this.xAxis.candleW, d.iconMinDim, d.iconHeight) * 1.5)
          event.key = k
          this.#events.push(this.#event.draw(event))
        }
      }
      c++
      i--
    }
    // draw mask to hit layer

  }
}