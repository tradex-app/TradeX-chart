// chart-newsEvents.js
// display news/events on chart

import Overlay from "./overlay"
import NewsEvent from "../primitives/newsEvent"
import { limit } from "../../utils/number"
import { debounce } from "../../utils/utilities"

const config = {
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

  constructor(target, xAxis=false, yAxis=false, theme, parent) {

    super(target, xAxis=false, yAxis=false, theme, parent)

    this.#event = new NewsEvent(target.scene, theme)
      this.emit()
      this.core.on("primary_pointerdown", debounce(this.isNewsEventSelected, 200, this), this)
      this.#dialogue = this.core.WidgetsG.insert("Dialogue", config)
      this.#dialogue.start()
  }

  destroy() {
    this.core.off("primary_pointerdown", this.#debounce)
  }

  set position(p) { this.target.setPosition(p[0], p[1]) }
  get events() { return this.core.state.data?.events }

  isNewsEventSelected(e) {
    if (this.core.config?.events?.display === false ||
        this.core.config?.events?.displayInfo === false) return

    const x = e[0]
    const y = e[1]
    const d = this.theme.events
    const w = limit(this.xAxis.candleW, d.iconMinDim, d.iconHeight)
    const ts = this.xAxis.pixel2T(x)
    const c = this.core.range.valueByTS(ts)
    for (let tr in this.events) {
      tr *= 1
      if (ts === tr) {
        let tx = this.xAxis.xPos(ts)
        let ty = this.yAxis.yPos(c[2]) - (w * 1.5)
        if ((x >= tx - (w / 2) &&
            x <= tx + (w / 2)) &&
            (y >= ty &&
            y <= ty + w)) {
              console.log("event ",ts," selected")
              let content = ``
              for (let t of this.events[tr]) {
                content += this.buildNewsEventHTML(t)
              }
              const config = {
                dimensions: {h: 150, w: 150},
                position: {x: tx + (w / 2) + 1, y: ty},
                content: content,
              }
              this.core.emit("event_selected", tr)
              this.#dialogue.open(config)
            }
      }
    }
  }

  buildNewsEventHTML(h) {
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
    if (this.core.config?.events?.display === false) return

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
    let x, t;

    while(i) {
      x = range.value( c )
      t = `${x[0]}`
      // fetch events (if any) for timestamp
      if (Object.keys(this.events).indexOf(t) >= 0) {
        for (let tr of this.events[t]) {
          event.x = this.xAxis.xPos(x[0]) - (this.xAxis.candleW / 2)
          event.y = this.yAxis.yPos(x[2]) - (limit(this.xAxis.candleW, d.iconMinDim, d.iconHeight) * 1.5)
          event.side = tr.side
          this.#events.push(this.#event.draw(event))
        }
      }
      c++
      i--
    }
    // draw mask to hit layer

  }
}