// slider.js
// horizontal, vertical, double, custom styling
// <tradex-slider></tradex-slider>

import element from "./classes/element"

const template = document.createElement('template')
template.innerHTML = `
<style>
  input[type="range"][orient="vertical"] {
    writing-mode: bt-lr;
    appearance: slider-vertical;
    padding: 0;
    margin: 0;
    border: 0;
  }
</style>
<div class="slider">
</div>
`
const attrList = ["min", "max", "value", "step", "orient", "width", "height"]

export default class tradexSlider extends element {

  #id
  #elSlider
  #elSliderInput
  #sliderCnt = 1
  #orient
  #attributes = {}


  constructor () {
    super(template)
  }

  destroy() {

  }

  connectedCallback() {
    super.connectedCallback(
      () => {

        // store attributes
        for (let a of attrList) {
          let attr = this.getAttribute(a)
          if (!!attr) this.#attributes[a] = attr
        }

        this.#elSlider = this.shadowRoot.querySelector('.slider')
        this.mount()
        this.#elSliderInput = this.shadowRoot.querySelector('#s1')
        this.#elSliderInput.addEventListener("input", this.#onSliderChange.bind(this))
        // this.#elSliderInput.addEventListener("pointerup", this.#onSliderChange.bind(this))
      }
    )
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    // this.#tabsSlot.removeEventListener("slotchange", this.#onSlotChange)
  }

  set value(v) { this.#attributes.value = v }
  get value() { return this.#attributes.value }
  set min(m) { this.#attributes.min = m }
  get min() { return this.#attributes.min }
  set max(m) { this.#attributes.max = m }
  get max() { return this.#attributes.max }
  set step(s) { this.#attributes.step = s }
  get step() { return this.#attributes.step }

  #onSliderChange(e) {
    this.value = e.target.value
    const onChange = new CustomEvent("change", {
      detail: {value: this.value},
      bubbles: true,
      cancelable: true,
      composed: false,
    })
    this.dispatchEvent(onChange)
  }

  mount() {
    const id = `s${this.#sliderCnt}`
    const klass = ``
    const params = { id, klass, ...this.#attributes  }

    this.#elSlider.innerHTML = this.insertRange( params )
  }

  insertRange({id, klass, min, max, value, step, orient, width, height}) {
    
    let style = ``
        style += (!!width) ? `width: ${width}px; ` : ``
        style += (!!height) ? `height: ${height}px; ` : ``

    return `<input type="range" id="${id}" class="${klass}" style="${style}" min="${min}" max="${max}" value="${value}" step="${step}" orient="${orient}" width="${width}" height="${height}"/>`
  }

}

customElements.get('tradex-slider') || window.customElements.define('tradex-slider', tradexSlider)
