// colourPicker.js
// <tradex-colourpicker></tradex-colourpicker>

import element from "./classes/element"
import tradexSlider from "./slider"

import Colour from "../../utils/colour"
import CEL from "../primitives/canvas"
import { renderCheckerBoard } from "../../renderer/checkered"
import { linearGradient } from "../../renderer/fill"
import { isElement, isVisible } from "../../utils/DOM"
import { isArray, isNumber, isObject, isString } from "../../utils/typeChecks"
import { EventHandlers } from "../../utils/utilities"
import { GlobalStyle, WindowStyle } from "../../definitions/style"



const MIXERSIZE = 128
const sliderW = 20
const sliderH = MIXERSIZE

const colours = [
  "#f88", "#fc8", "#ff8", "#cf8", "#8f8", "#8ff", "#4cf", "#88f", "#c8f", "#f8f",
  "#f00", "#fc0", "#ff0", "#8f0", "#0f0", "#0ff", "#08f", "#00f", "#80f", "#f0f",
  "#800", "#840", "#880", "#480", "#080", "#088", "#048", "#008", "#408", "#808",
  "#000", "#222", "#333", "#444", "#666", "#888", "#aaa", "#ccc", "#eee", "#fff"
]
export const colours2 = [
  "#263238","#B71C1C","#BF360C","#FF6F00","#827717","#194D33","#006064","#0D47A1","#311B92","#880E4F",
  "#455A64","#D32F2F","#E64A19","#FFA000","#AFB42B","#388E3C","#0097A7","#1976D2","#512DA8","#C2185B",
  "#607D8B","#F44336","#FF5722","#FFC107","#CDDC39","#4CAF50","#00BCD4","#2196F3","#673AB7","#E91E63",
  "#90A4AE","#E57373","#FF8A65","#FFD54F","#DCE775","#81C784","#4DD0E1","#64B5F6","#9575CD","#F06292",
  "#CFD8DC","#FFCDD2","#FFCCBC","#FFECB3","#F0F4C3","#C8E6C9","#B2EBF2","#BBDEFB","#D1C4E9","#F8BBD0"
]



// const template = document.createElement('template')

// template.innerHTML = `
// <style>
//   .colourpicker {
//     display: grid;
//     grid-template-columns: [first] ${MIXERSIZE}px [second] ${sliderW}px;
//     grid-template-rows: [mixer] 2em [fields] 2em [swatches] 1fr;
//     row-gap: 5px;
//     border: 1px solid #aaa;
//     border-radius: 5px;
//     box-shadow: ${WindowStyle.SHADOW};
//     background: #ccc;
//     color: #444;
//     padding: 5px;
//   }
//   .hex {
//     font-weight: bold;
//   }
//   .number {
//     width: 2em;
//   }
//   .colval {
//     width: 6em;
//   }

//   .default .mixer {
//     display: none;
//   }

//   .mixer {
//     position: relative;
//     grid-column-start: 1;
//     grid-row-start: 1;
//     grid-row-end: 2;
//   }
//   .mixer .viewport {
//     position: absolute;
//   }
//   .mixer .checks {
//     top: 0;
//     left: 0;
//   }
//   .mixer .rgbv {
//     top: 0;
//     left: 0;
//     opacity: 1;
//   }

//   .palette {
//     grid-column-start: 1;
//     grid-column-end: span 2;
//     grid-row-start: 3;
//     display: flex;
//     width: 150px;
//     flex-flow: wrap;
//     justify-content: space-around;
//     row-gap: 2px;
//     column-gap: 2px;
//   }
//   .palette button {
//     width: 12px;
//     height: 12px;
//     border: 1px;
//     border-radius: 3px;
//   }

//   tradex-slider[orient="vertical"] {
//     grid-column-start: 2;
//     grid-row-start: 1;
//     grid-row-end: span 3;
//     width: ${sliderW}px;
//   }
//   tradex-slider[orient="horizontal"] {
//     grid-column-start: 1;
//     grid-column-end: 3;
//     grid-row-start: 1;
//     width: ${sliderW}px;
//   }

//   span {
//     grid-column-start: 2;
//     grid-row-start: 1;
//     padding-left: .5em;
//     padding-top: .25em;
//     font-weight: bold;
//   }

//   .fields {
//     grid-column-start: 1;
//     grid-column-end: 3;
//     grid-row-start: 2;
//     grid-row-end: 3;
//   }

//   .fields input {
//     border: 1px solid #888;
//     border-radius: 3px;
//     font-size: ${GlobalStyle.FONTSIZE};
//   }

// </style>
// <div class="colourpicker default">
//   <tradex-slider max="255" min="0" step="1" value="255" orient="horizontal" width="${MIXERSIZE}" ></tradex-slider>
//   <span>A</span>
//   <div class="fields">
//     <input type="text" class="colval"/>
//     <button class="submit ok">OK</button>
//   </div>
// </div>
// `

// // enum for state management
// class PickerState {
//   static opened = new PickerState("opened")
//   static active = new PickerState("active")
//   static closed = new PickerState("closed")

//   constructor(name) {
//     this.name = name
//   }
// }

// export default class tradeXColourPicker extends element {

//   #picker
//   #elMixer
//   #elPalette
//   #elValue
//   #elModel
//   #elRGB
//   #elAlpha
//   #elSubmit
//   #elR
//   #elG
//   #elB
//   #elA
//   #elColVal
//   #elRGBV
//   #elChecker
//   #elASlider
//   #canvas = {
//     size: MIXERSIZE // 256
//   }
//   #colour
//   #target
//   #windowEvents = {}
//   #state = PickerState.closed
//   #config = { cfg: "default" }

//   constructor () {
//     super(template)
//   }

//   destroy() {
//     // TODO: remove all event listeners
//     this.#picker.remove()
//   }

//   connectedCallback() {
//     super.connectedCallback(
//       () => {
//         // set a default value
//         this.#colour = new Colour("#f00")
//         this.#picker = this.shadowRoot.querySelector('.colourpicker')
//         this.build()
//         this.#elMixer = this.shadowRoot.querySelector('.mixer')
//         this.#elPalette = this.shadowRoot.querySelector('.palette')
//         // this.#elValue = this.shadowRoot.querySelector('.value')
//         // this.#elModel = this.shadowRoot.querySelector('.model')
//         // this.#elRGB = this.shadowRoot.querySelector('.rgb')
//         this.#elAlpha = this.shadowRoot.querySelector('.alpha')
//         this.#elSubmit = this.shadowRoot.querySelector('.submit')

//         // this.#elR = this.shadowRoot.querySelector('.r')
//         // this.#elG = this.shadowRoot.querySelector('.g')
//         // this.#elB = this.shadowRoot.querySelector('.b')
//         // this.#elA = this.shadowRoot.querySelector('.a')

//         this.#elColVal = this.shadowRoot.querySelector('.colval')
//         this.#elRGBV = this.shadowRoot.querySelector('.rgbv')
//         this.#elChecker = this.shadowRoot.querySelector('.checker')
//         this.#elASlider = this.shadowRoot.querySelector('tradex-slider')

//         // add handler for manual editing of colour value
//         const onColValChange = (e) => {
//           this.setColour(e.target.value)
//           this.#target.dispatchEvent(new Event('change'))
//         }
//         this.#elColVal.addEventListener("change", onColValChange)
//         this.#elSubmit.addEventListener('click', this.close.bind(this))
//         this.#elASlider.addEventListener('input', this.#onASliderChange.bind(this))
//         this.#elASlider.addEventListener('pointerup', this.#onASliderChange.bind(this))
//       }
//     )
//   }

//   disconnectedCallback() {
//     super.disconnectedCallback()
//   }

//   get elMixer() { return this.#elMixer }
//   get elPalette() { return this.#elPalette }
//   get elColVal() { return this.#elColVal }
//   get elModel() { return this.#elModel }
//   get elRGB() { return this.#elRGB }
//   get elAlpha() { return this.#elAlpha }
//   get elSubmit() { return this.#elSubmit }
//   set colour(c) { this.setColour(c) }
//   get colour() { return this.#colour }
//   set target(t) { this.#target = t }
//   get target() { return this.#target }
//   set state(s) { if (s instanceof PickerState) this.#state = s }
//   get state() { return this.#state }

//   /**
//    * set or get rgba
//    * @param {string|boolean} [c=false]
//    * @return {boolean}  
//    * @memberof tradeXColourPicker
//    */
//   setColour(c) {
//     let colour
//     if (!isString(c)) return false

//     colour = new Colour(c)
//     if (colour.isValid) {
//       this.#colour = colour
//       this.#elColVal.value = colour.value.hexa
//       this.#elASlider.value = Math.floor(255 * colour.value.a)
//       if (isElement(this.#target)) {
//         this.#target.value = colour.value.hexa
//         this.#target.dispatchEvent(new Event('change'))
//       }
//       this.#elRGBV.style.opacity = colour.value.a
//       return true
//     }
//     else return false
//   }

//   setAlpha(a) {
//     let x = (a*1).toString(16).toUpperCase()
//         x = ('00' + x).slice(-2)
//     let rgba = this.#colour.hex + x
//     this.setColour(rgba)
//   }

//   #onASliderChange(v) {
//     this.setAlpha(v.target.value)
//   }

//   onOutsideClickListener(e) {
//     if (
//         !this.contains(e.target) &&
//         this.state === PickerState.opened
//       ) {
//       this.state = PickerState.active
//       this.classList.toggle("active")
//       document.removeEventListener('click', this.#windowEvents.click)
//       delete this.#windowEvents.click
//     }

//     if (
//       !this.contains(e.target) &&
//       e.target?.type === "color" &&
//       (
//         this.state === PickerState.closed ||
//         this.state === PickerState.active
//       )
//     ) {
//       this.state = PickerState.opened
//       this.classList.add("active")
//       this.setColour(e.target.value)
//       e.preventDefault()
//     }
//     else if (
//       !this.contains(e.target)  &&
//       e.target.tagName === "LABEL" &&
//       this.state === PickerState.closed
//     ) {
//       const id = e.target.htmlFor
//       const target = e.target.parentElement.querySelector(`#${id}`)
//       if (target?.type === "color") {
//         this.state = PickerState.opened
//         this.classList.add("active")
//         this.setColour(target.value)
//         e.preventDefault()
//       }
//     }
//     // else if (
//     //   !this.contains(e.target)  &&
//     //   e.target.tagName === "LABEL" &&
//     //   this.state === PickerState.active
//     // ) {
//     //   this.state = PickerState.opened
//     //   this.classList.add("active")
//     // }
//     else if (
//       !this.contains(e.target)  &&
//       e.target.tagName === "LABEL" &&
//       this.state === PickerState.opened
//     ) {
//       this.state = PickerState.closed
//       this.classList.remove("active")
//       e.preventDefault()
//     }
//     else if (
//       !this.contains(e.target)
//     ) {
//       this.state = PickerState.closed
//       this.classList.remove("active")
//     }
//   }

//   onCanvasClick(e) {
//     const x = e.clientX
//     const y = e.clientY
//     const i = this.#canvas.mixer.layers.rgbv.hit.getIntersection(x,y)
//     const c = this.#canvas.mixer.layers.rgbv.hit.getIndexValue(i)
//     console.log(c)
//   }

//   position(x, y, container) {
//     if (!isNumber(x) ||
//         !isNumber(y) ||
//         !isElement(container))
//         return false

//     this.top = y
//     this.left = x
//   }

//   open(colour, target, config) {
//     if ( this.state !== PickerState.closed ) return false

//     if ( config?.cfg == "gradient" ) {
//       // display gradient component
//     }
//     else {
//       this.#config.cfg == "default"
//       this.#elASlider.setAttribute("orient", "horizontal")
//       this.#elASlider.setAttribute("width", MIXERSIZE)
//       this.#elASlider.setAttribute("height", "")
//     }

//     this.setColour(colour)
//     this.target = target
//     this.state = PickerState.opened
//     this.classList.add("active")

//     setTimeout(() => {
//       // click event outside of window
//       this.#windowEvents.click = this.onOutsideClickListener.bind(this)
//       document.addEventListener('click', this.#windowEvents.click)
//     }, 250)

//     return true 
//   }

//   close() {
//     this.state = PickerState.closed
//     this.classList.remove("active")
//   }

//   /**
//    * build the more complex picker components
//    */
//   build() {
//     this.#picker.appendChild(this.mixerNode())
//     this.#picker.appendChild(this.paletteNode())
//   }

//   /**
//    * palette of colour swatches
//    * @returns {HTMLElement}
//    */
//   paletteNode() {

//     let palette = ''
//     for (let c of colours2) {
//       palette += `<button style="background: ${c};" data-colour="${c}"></button>`
//     }

//     const container = document.createElement("div")
//     container.classList.add("palette")
//     container.style.display = "flex"
//     container.innerHTML = palette

//     // add functionality to swatches
//     const swatches = container.querySelectorAll("button")
//     for (let s of swatches) {
//       // add listener to update picker and target
//       s.addEventListener("click", (e) => {
//         const colour = e.target.getAttribute("data-colour")
//         this.colour = colour
//         this.#target.value = colour
//         this.#target.dispatchEvent(new Event('change'))
//       })
//     }

//     return container
//   }

//   /**
//    * palette of rgb gradients
//    * @returns {HTMLElement}
//    */
//   mixerNode() {
//     return this.canvasNode("mixer")
//   }

//   canvasNode(type) {
//     const element = document.createElement("div")
//     element.classList.add(type)
//     element.addEventListener("click", this.onCanvasClick.bind(this))

//     const viewport = this.viewportNode("checks")
//     element.appendChild(viewport.container)
//     const viewport2 = this.viewportNode("rgbv")
//     element.appendChild(viewport2.container)
//     // isImage()
//     viewport.container.style.cursor = "url(), 0, 0, copy"

//     const view = viewport.viewport
//     const view2 = viewport2.viewport

//     const layers = {}
//     const size = this.#canvas.size
//     const cfg = {x: 0, y: 0, width: size, height: size}
//     this.#canvas.layers = layers
//     this.#canvas.view = view

//     layers.grid = new CEL.Layer(cfg)
//     view.addLayer(layers.grid)
//     layers.rgbv = new CEL.Layer(cfg)
//     view2.addLayer(layers.rgbv)

//     this.#canvas[type] = {element, viewport, layers}

//     let ctx = layers.rgbv.scene.context
//     let grd = [0, 0, size, 0]
//     linearGradient(ctx, grd, ["#f00f", "#ff0f", "#0f0f", "#0fff", "#00ff", "#f0ff", "#f00f"])
//     ctx.fillRect(0, 0, size, size); 

//     ctx = layers.rgbv.scene.context
//     grd = [0, 0, 0, size]
//     linearGradient(ctx, grd, ["#fff", "#0000", "#000"])
//     ctx.fillRect(0, 0, size, size); 

//     ctx = layers.grid.scene.context
//     renderCheckerBoard(ctx, 8, 16, 16, "#fff", "#ccc")

//     view.render()
//     view2.render()

//     return element
//   }

//   viewportNode(id) {
//     const container = document.createElement("div")
//     container.classList.add("viewport")
//     container.classList.add(id)

//     // create viewport
//     const viewport = new CEL.Viewport({
//       width: this.#canvas.size,
//       height: this.#canvas.size,
//       container
//     });

//     const canvas = viewport.scene.canvas
//     return {viewport, container, canvas}
//   }

//   colourValueNode() {
//     let c = ``
//     return c
//   }

//   colourModelNode() {
//     let m = ``
//     return m
//   }

//   rgbSliderNode() {
//     let n = ``
//     return n
//   }

//   alphaSliderNode() {
//     let n = ``
//     return n
//   }

//   submitNode() {
//     let n = ``
//     return n
//   }

//   gradient(ctx, col1, col2, end) {
//     let grad = [0, 0, 0, 0]
//     let rect = end
//     let stop = [col1, col2]
//     linearGradient(ctx, grad, stop)
//   }

//   compositeLayers() {
//     const layers = this.#canvas.layers
//     const layer = ["rgb", "value"]
//     const ctx = layers.rgbv.scene.context
//     // ctx.globalCompositeOperation = "multiply"; // for values // "screen"; for colours

//     for (let l of layer) {
//       ctx.drawImage(
//         layers[l].scene.canvas,
//         layers[l].x,
//         layers[l].y,
//         layers[l].width,
//         layers[l].height
//       )
//     }

//     const ctx2 = layers.composite.scene.context
//     const l = "rgbv"
//     ctx2.globalAlpha = 1 / (255 / this.#colour.a)
//     ctx2.drawImage(
//       layers[l].scene.canvas,
//       layers[l].x,
//       layers[l].y,
//       layers[l].width,
//       layers[l].height
//     )
//   }

//   inputColorUpgrade(el) {
//     if(!isElement(el)) return false

//     const replacement = this.inputColorReplacement()
//     el.style.display = "none"
//     el.insert.insertAdjacentElement('afterend', replacement)
//   }

//   inputColorReplacement() {

//   }
// }

// customElements.get('tradex-colourpicker') || window.customElements.define('tradex-colourpicker', tradeXColourPicker)


const template2 = document.createElement('template')

const width = 24
const height = width

template2.innerHTML = `
<style>
  .swatch {
    display: inline-block;
    position: relative;
  }
  .swatch,
  .swatch .overlay {
    width: ${width}px;
    height: ${height}px;
  }
  .swatch canvas,
  .swatch .overlay {
    position: absolute;
    top: 0;
    left: 0;
  }
  input {
    width: 6em;
    vertical-align: super;
  }
  tradex-colourpicker {
    display: none;
    position: absolute;
    z-index: 1;
  }
  tradex-colourpicker.active {
    display: block;
  }
</style>
<div class="colourInput">
  <div class="swatch">
    <canvas width="${width}" height="${height}"></canvas>
    <div class="overlay"></div>
  </div>
  <input minlength="4" maxlength="9" pattern="#?([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})">
  <tradex-colourpicker></tradex-colourpicker>
</div>
`
export class tradeXColourInput extends element {

  #target
  #swatch
  #canvas
  #overlay
  #input
  #picker


  constructor () {
    super(template2)
  }

  destroy() {
    // TODO: remove all event listeners
  }

  connectedCallback() {
    super.connectedCallback(
      () => {
        this.#picker = this.shadowRoot.querySelector('tradex-colourpicker')
        this.#picker.style.display = ""
        this.#swatch = this.shadowRoot.querySelector('.swatch')
        this.#canvas = this.shadowRoot.querySelector('canvas')
        this.#overlay = this.shadowRoot.querySelector('.overlay')
        this.#input = this.shadowRoot.querySelector('input')
        this.height = this.getAttribute("height") * 1 || this.height
        this.width = this.getAttribute("width") * 1 || this.width
        this.setTarget()
        this.eventsListen()

        const ctx = this.#canvas.getContext("2d")
        renderCheckerBoard(ctx, 8, 16, 16, "#fff", "#ccc")
      }
    )
  }

  disconnectedCallback() {
    super.disconnectedCallback()

    this.#target.removeEventListener("change", this.onTargetChange.bind(this))

  }

  set target(t) { if (isString(t)) this.setTarget(t)}
  get target() { return this.#target }


  setTarget(t) {
    if (isElement(this.#target))
      this.#target.removeEventListener("change", this.onTargetChange.bind(this))

    if (isString(t)) {
      this.#target = document.getElementById(t)
      this.setAttribute("target", t)
    }
    else if (isElement(t)) {
      this.#target = t
      this.setAttribute("target", t.id)
    }
    else return false

    const target = this.#target
    if (isElement(target) &&
        target.type == "text") {

      const id = target.id
      const parent = target.parentElement
      const value = target.value
      const input = `
            <input type="text" id="${id}" minlength="4" maxlength="9" style="display:none" value="${value}"/>
            `      
      target.insertAdjacentElement('afterend', this)
      target.insertAdjacentHTML('beforebegin', input);
      target.id = ""
      const newTarget = parent.querySelector(`#${id}`)
            newTarget.addEventListener("change", this.onTargetChange.bind(this))
      this.#input.value = value
      this.#overlay.style.background = value
      this.#picker.setColour(value)
      this.#target.remove()
      this.#target = newTarget

      return true
    }
    return false
  }

  eventsListen() {
    this.#swatch.addEventListener("click", this.onSwatchClick.bind(this))
  }

  onSwatchClick(e) {
    this.openPicker()
  }

  onTargetChange(e) {
    const value = new String(e.target.value)
    if (value !== this.#picker.colour.value.rgba) {
      this.#picker.setColour(value)
      this.#input.value = value
      this.#overlay.style.background = value
    }
  }

  openPicker() {
    this.#picker.open(this.#target.value, this.#target)
  }

  closePicker() {
    this.#picker.close()
  }

}

customElements.get('tradex-colourinput') || window.customElements.define('tradex-colourinput', tradeXColourInput)
