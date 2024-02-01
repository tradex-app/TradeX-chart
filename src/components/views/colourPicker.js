// colourPicker.js
// <tradex-colourpicker></tradex-colourpicker>

import element from "./classes/element"
import Colour from "../../utils/colour"
import CEL from "../primitives/canvas"
import { renderCheckerBoard } from "../../renderer/checkered"
import { linearGradient } from "../../renderer/fill"


const template = document.createElement('template')

template.innerHTML = `
<style>
</style>
<div class="colourpicker">
</div>
`

export default class tradeXColourPicker extends element {

  #picker
  #elMixer
  #elPalette
  #elValue
  #elModel
  #elRGB
  #elAlpha
  #elSubmit

  #canvas = {
    size: 128 // 256
  }

  constructor () {
    super(template)
  }

  destroy() {

  }

  connectedCallback() {
    super.connectedCallback(
      () => {
        this.#picker = this.shadowRoot.querySelector('.colourpicker')
        this.build()
      }
    )

    this.#elMixer = this.shadowRoot.querySelector('.mixer')
    this.#elPalette = this.shadowRoot.querySelector('.palette')
    this.#elValue = this.shadowRoot.querySelector('.value')
    this.#elModel = this.shadowRoot.querySelector('.model')
    this.#elRGB = this.shadowRoot.querySelector('.rgb')
    this.#elAlpha = this.shadowRoot.querySelector('.alpha')
    this.#elSubmit = this.shadowRoot.querySelector('.submit')
  }

  disconnectedCallback() {
    super.disconnectedCallback()
  }

  get elMixer() { return this.#elMixer }
  get elPalette() { return this.#elPalette }
  get elValue() { return this.#elValue }
  get elModel() { return this.#elModel }
  get elRGB() { return this.#elRGB }
  get elAlpha() { return this.#elAlpha }
  get elSubmit() { return this.#elSubmit }

  build() {
    const HTML = ``
    this.#picker.innerHTML = HTML

    this.paletteNode()
    this.canvasNode()
  }

  /**
   * palette of colour swatches
   * @returns {string}
   */
  paletteNode() {
    this.canvasNode("palette")
  }

  /**
   * palette of rgb gradients
   * @returns {string}
   */
  mixerNode() {
    this.canvasNode("mixer")
  }

  canvasNode(type) {
    const element = document.createElement("div")
    element.classList.add("type")

    const viewport = this.viewportNode()
    element.appendChild(viewport.container)
    // isImage()
    viewport.container.style.cursor = "url(), 0, 0, copy"

    const view = viewport.viewport
    const layers = {}
    const cfg = {x: 0, y: 0, width: this.#canvas.size, height: this.#canvas.size}
    this.#canvas.layers = layers
    this.#canvas.view = view

    layers.red = new CEL.Layer(cfg)
    layers.green = new CEL.Layer(cfg)
    layers.blue = new CEL.Layer(cfg)
    layers.value = new CEL.Layer(cfg)
    layers.composite = new CEL.Layer(cfg)
    view.addLayer(layers.composite)
    layers.grid = new CEL.Layer(cfg)
    view.addLayer(layers.grid)

    this.#canvas[type] = {element, viewport, layers}

    let ctx = layers.red.scene.context
    let end = [0, 0, this.#canvas.size, 0]
    linearGradient(ctx, end, end, ["#f00", "#ff000000"])

    ctx = layers.green.scene.context
    linearGradient(ctx, end, end, ["#0f0", "#00ff0000"])

    ctx = layers.blue.scene.context
    linearGradient(ctx, end, end, ["#00f", "#0000ff00"])

    ctx = layers.value.scene.context
    end = [0, 0, 0, this.#canvas.size]
    linearGradient(ctx, end, end, ["#fff", "#000"])

    this.compositeLayers()

    ctx = layers.grid.scene.context
    renderCheckerBoard(ctx,8, 16, 16, "#ffffff", "#cccccc")

    view.render()
  }

  viewportNode() {

    const container = document.createElement("div")
    container.classList.add("viewport")

    // create viewport
    const viewport = new CEL.Viewport({
      width: this.#canvas.size,
      height: this.#canvas.size,
      container
    });

    const canvas = viewport.scene.canvas
    return {viewport, container, canvas}
  }

  colourValueNode() {
    let c = ``
    return c
  }

  colourModelNode() {
    let m = ``
    return m
  }

  rgbSliderNode() {
    let n = ``
    return n
  }

  alphaSliderNode() {
    let n = ``
    return n
  }

  submitNode() {
    let n = ``
    return n
  }

  gradient(ctx, col1, col2, end) {
    let grad = [0, 0, 0, 0]
    let rect = end
    let stop = [col1, col2]
    linearGradient(ctx, grad, rect, stop)
  }

  compositeLayers() {
    const layers = this.#canvas.layers
    const layer = ["red", "green", "blue", "value"]
    const ctx = layers.composite.scene.context

    for (let l of layer) {
      ctx.drawImage(
        layers[l].scene.canvas,
        layers[l].x,
        layers[l].y,
        layers[l].width,
        layers[l].height
      )
    }


  }

}


customElements.get('tradex-colourpicker') || window.customElements.define('tradex-colourpicker', tradeXColourPicker)
